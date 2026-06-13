import type { DemoActivity } from "@/lib/demo/types";

export type AnomalyReminderCode =
  | "feeding-earlier-than-usual"
  | "wet-diapers-decreased"
  | "sleep-suddenly-longer";

export interface AnomalyReminder {
  code: AnomalyReminderCode;
  severity: "watch" | "urgent";
  title: string;
  message: string;
  suggestion: string;
  detectedAt: string;
  metrics: Record<string, number>;
}

export interface AnomalyReminderResult {
  generatedAt: string;
  reminders: AnomalyReminder[];
}

interface DetectAnomalyRemindersOptions {
  now?: Date;
}

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

function roundOne(value: number) {
  return Math.round(value * 10) / 10;
}

function activityTime(activity: DemoActivity) {
  if (activity.category === "sleep" && activity.sleepStart) {
    return Date.parse(activity.sleepStart);
  }

  return Date.parse(activity.timestamp);
}

function isWetDiaper(activity: DemoActivity) {
  return (
    activity.category === "diaper" &&
    (!activity.diaperType || ["wet", "both", "mix"].includes(activity.diaperType))
  );
}

function feedingReminder(activities: DemoActivity[], now: Date): AnomalyReminder | null {
  const times = activities
    .filter((activity) => activity.category === "feeding")
    .map(activityTime)
    .filter((time) => Number.isFinite(time) && time <= now.getTime())
    .sort((a, b) => a - b);

  if (times.length < 4) return null;

  const intervals = times.slice(1).map((time, index) => (time - times[index]) / HOUR_MS);
  const latestInterval = intervals[intervals.length - 1];
  const baselineIntervals = intervals.slice(0, -1);
  const baseline =
    baselineIntervals.reduce((sum, interval) => sum + interval, 0) / baselineIntervals.length;
  const difference = baseline - latestInterval;

  if (difference <= 0.5) return null;

  return {
    code: "feeding-earlier-than-usual",
    severity: "watch",
    title: "这次喂养比平时早",
    message: `最近一次喂养间隔约 ${roundOne(latestInterval)} 小时，比平时约 ${roundOne(
      baseline
    )} 小时的节奏早了 ${roundOne(difference)} 小时。`,
    suggestion: "先观察宝宝是否有明显饥饿信号、猛长期或上一餐吃得少；如果同时精神差、吃奶明显减少或湿尿布变少，建议联系儿科医生。",
    detectedAt: now.toISOString(),
    metrics: {
      baselineFeedingIntervalHours: roundOne(baseline),
      latestFeedingIntervalHours: roundOne(latestInterval),
      differenceHours: roundOne(difference),
    },
  };
}

function wetDiaperReminder(activities: DemoActivity[], now: Date): AnomalyReminder | null {
  const nowMs = now.getTime();
  const wetDiapers = activities
    .filter(isWetDiaper)
    .map(activityTime)
    .filter((time) => Number.isFinite(time) && time <= nowMs);

  const recentCount = wetDiapers.filter((time) => nowMs - time <= DAY_MS).length;
  const baselineDays = [1, 2, 3]
    .map((dayOffset) => {
      const end = nowMs - dayOffset * DAY_MS;
      const start = end - DAY_MS;
      return wetDiapers.filter((time) => time > start && time <= end).length;
    })
    .filter((count) => count > 0);

  if (baselineDays.length < 2) return null;

  const baseline = baselineDays.reduce((sum, count) => sum + count, 0) / baselineDays.length;
  const decreased = recentCount <= baseline - 1 && recentCount < baseline * 0.75;
  if (!decreased) return null;

  return {
    code: "wet-diapers-decreased",
    severity: recentCount === 0 ? "urgent" : "watch",
    title: "湿尿布比平时少",
    message: `最近 24 小时湿尿布约 ${recentCount} 次，前几天日均约 ${roundOne(baseline)} 次。`,
    suggestion: "湿尿布减少可能和进食、补水或身体状态有关。请结合吃奶、精神、嘴唇是否干、哭是否有眼泪一起看；如果明显减少或宝宝没精神，尽快联系儿科医生。",
    detectedAt: now.toISOString(),
    metrics: {
      recentWetDiapers: recentCount,
      baselineWetDiapersPerDay: roundOne(baseline),
    },
  };
}

function sleepDurationHours(activity: DemoActivity) {
  if (!activity.sleepStart || !activity.sleepEnd) return null;

  const start = Date.parse(activity.sleepStart);
  const end = Date.parse(activity.sleepEnd);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return null;

  return (end - start) / HOUR_MS;
}

function sleepReminder(activities: DemoActivity[], now: Date): AnomalyReminder | null {
  const sleeps = activities
    .filter((activity) => activity.category === "sleep")
    .map((activity) => ({ time: activityTime(activity), duration: sleepDurationHours(activity) }))
    .filter(
      (sleep): sleep is { time: number; duration: number } =>
        Number.isFinite(sleep.time) && sleep.time <= now.getTime() && sleep.duration !== null
    )
    .sort((a, b) => a.time - b.time);

  if (sleeps.length < 3) return null;

  const latest = sleeps[sleeps.length - 1].duration;
  const baselineDurations = sleeps.slice(0, -1).map((sleep) => sleep.duration);
  const baseline =
    baselineDurations.reduce((sum, duration) => sum + duration, 0) / baselineDurations.length;
  const difference = latest - baseline;

  if (difference <= 1 || latest < baseline * 1.25) return null;

  return {
    code: "sleep-suddenly-longer",
    severity: "watch",
    title: "这次睡眠比平时长",
    message: `最近一次睡眠约 ${roundOne(latest)} 小时，平时这一类记录约 ${roundOne(
      baseline
    )} 小时。`,
    suggestion: "偶尔睡久可能只是累了或补觉。醒来后看精神、吃奶和尿布是否正常；如果宝宝很难叫醒、呼吸异常、发烧或进食明显减少，请及时联系医生。",
    detectedAt: now.toISOString(),
    metrics: {
      latestSleepHours: roundOne(latest),
      baselineSleepHours: roundOne(baseline),
      differenceHours: roundOne(difference),
    },
  };
}

export function detectAnomalyReminders(
  activities: DemoActivity[],
  options: DetectAnomalyRemindersOptions = {}
): AnomalyReminderResult {
  const now = options.now ?? new Date();
  const reminders = [
    feedingReminder(activities, now),
    wetDiaperReminder(activities, now),
    sleepReminder(activities, now),
  ].filter((reminder): reminder is AnomalyReminder => reminder !== null);

  return {
    generatedAt: now.toISOString(),
    reminders,
  };
}
