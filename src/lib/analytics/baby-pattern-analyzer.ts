import type { DemoActivity, ActivityCategory } from "@/lib/demo/types";

export type PatternAnomalyCode =
  | "feeding-insufficient-data"
  | "feeding-average-interval-short"
  | "feeding-average-interval-long"
  | "feeding-max-interval-long"
  | "sleep-insufficient-data"
  | "sleep-average-interval-short"
  | "sleep-average-interval-long"
  | "sleep-max-interval-long";

export interface PatternAnomaly {
  code: PatternAnomalyCode;
  severity: "info" | "watch" | "urgent";
  message: string;
}

interface PatternMetric {
  count: number;
  averageIntervalHours: number | null;
  maxIntervalHours: number | null;
  intervalsHours: number[];
}

export interface BabyPatternAnalysis {
  windowDays: number;
  startedAt: string;
  endedAt: string;
  feeding: PatternMetric;
  sleep: PatternMetric;
  anomalies: PatternAnomaly[];
}

interface AnalyzeBabyPatternsOptions {
  now?: Date;
  lookbackDays?: number;
}

const MIN_LOOKBACK_DAYS = 3;
const MAX_LOOKBACK_DAYS = 7;
const HOUR_MS = 60 * 60 * 1000;

function clampLookbackDays(days: number) {
  return Math.min(MAX_LOOKBACK_DAYS, Math.max(MIN_LOOKBACK_DAYS, days));
}

function roundHours(value: number) {
  return Math.round(value * 10) / 10;
}

function activityTime(activity: DemoActivity) {
  if (activity.category === "sleep" && activity.sleepStart) {
    return Date.parse(activity.sleepStart);
  }

  return Date.parse(activity.timestamp);
}

function calculateMetric(activities: DemoActivity[], category: ActivityCategory): PatternMetric {
  const times = activities
    .filter((activity) => activity.category === category)
    .map(activityTime)
    .filter((time) => Number.isFinite(time))
    .sort((a, b) => a - b);

  const intervalsHours = times
    .slice(1)
    .map((time, index) => roundHours((time - times[index]) / HOUR_MS));

  const totalIntervalHours = intervalsHours.reduce((sum, interval) => sum + interval, 0);

  return {
    count: times.length,
    averageIntervalHours:
      intervalsHours.length > 0 ? roundHours(totalIntervalHours / intervalsHours.length) : null,
    maxIntervalHours: intervalsHours.length > 0 ? Math.max(...intervalsHours) : null,
    intervalsHours,
  };
}

function feedingAnomalies(metric: PatternMetric): PatternAnomaly[] {
  const anomalies: PatternAnomaly[] = [];
  if (metric.count < 2) {
    anomalies.push({
      code: "feeding-insufficient-data",
      severity: "info",
      message: "Not enough feeding logs to calculate a reliable interval.",
    });
    return anomalies;
  }

  if (metric.averageIntervalHours !== null && metric.averageIntervalHours < 1) {
    anomalies.push({
      code: "feeding-average-interval-short",
      severity: "watch",
      message: "Average feeding interval is unusually short.",
    });
  }

  if (metric.averageIntervalHours !== null && metric.averageIntervalHours > 6) {
    anomalies.push({
      code: "feeding-average-interval-long",
      severity: "watch",
      message: "Average feeding interval is longer than expected.",
    });
  }

  if (metric.maxIntervalHours !== null && metric.maxIntervalHours > 8) {
    anomalies.push({
      code: "feeding-max-interval-long",
      severity: "watch",
      message: "One feeding gap is especially long.",
    });
  }

  return anomalies;
}

function sleepAnomalies(metric: PatternMetric): PatternAnomaly[] {
  const anomalies: PatternAnomaly[] = [];
  if (metric.count < 2) {
    anomalies.push({
      code: "sleep-insufficient-data",
      severity: "info",
      message: "Not enough sleep logs to calculate a reliable interval.",
    });
    return anomalies;
  }

  if (metric.averageIntervalHours !== null && metric.averageIntervalHours < 1.5) {
    anomalies.push({
      code: "sleep-average-interval-short",
      severity: "watch",
      message: "Average sleep interval is unusually short.",
    });
  }

  if (metric.averageIntervalHours !== null && metric.averageIntervalHours > 8) {
    anomalies.push({
      code: "sleep-average-interval-long",
      severity: "watch",
      message: "Average sleep interval is longer than expected.",
    });
  }

  if (metric.maxIntervalHours !== null && metric.maxIntervalHours > 10) {
    anomalies.push({
      code: "sleep-max-interval-long",
      severity: "watch",
      message: "One sleep gap is especially long.",
    });
  }

  return anomalies;
}

export function analyzeBabyPatterns(
  activities: DemoActivity[],
  options: AnalyzeBabyPatternsOptions = {}
): BabyPatternAnalysis {
  const now = options.now ?? new Date();
  const windowDays = clampLookbackDays(options.lookbackDays ?? MAX_LOOKBACK_DAYS);
  const startedAtMs = now.getTime() - windowDays * 24 * HOUR_MS;

  const recentActivities = activities.filter((activity) => {
    const time = activityTime(activity);
    return Number.isFinite(time) && time >= startedAtMs && time <= now.getTime();
  });

  const feeding = calculateMetric(recentActivities, "feeding");
  const sleep = calculateMetric(recentActivities, "sleep");

  return {
    windowDays,
    startedAt: new Date(startedAtMs).toISOString(),
    endedAt: now.toISOString(),
    feeding,
    sleep,
    anomalies: [...feedingAnomalies(feeding), ...sleepAnomalies(sleep)],
  };
}
