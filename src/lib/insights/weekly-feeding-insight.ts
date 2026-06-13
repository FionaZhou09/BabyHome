import { analyzeBabyPatterns } from "@/lib/analytics/baby-pattern-analyzer";
import type { DemoActivity } from "@/lib/demo/types";

export interface WeeklyFeedingInsight {
  title: string;
  summary: string;
  reassurance: string;
  pushText: string;
  windowDays: number;
  generatedAt: string;
  metrics: {
    feedingCount: number;
    averageFeedingIntervalHours: number | null;
    latestFeedingIntervalHours: number | null;
    latestFeedingTrend: "shorter" | "longer" | "similar" | null;
  };
}

interface GenerateWeeklyFeedingInsightOptions {
  now?: Date;
}

function trendSummary(trend: WeeklyFeedingInsight["metrics"]["latestFeedingTrend"]) {
  if (trend === "shorter") return "最近一次喂养比这一周的常见节奏更早一些。";
  if (trend === "longer") return "最近一次喂养间隔比这一周的常见节奏更长一些。";
  if (trend === "similar") return "最近一次喂养和这一周的常见节奏接近。";
  return "记录还不够判断最近一次是否偏早或偏晚。";
}

export function generateWeeklyFeedingInsight(
  activities: DemoActivity[],
  options: GenerateWeeklyFeedingInsightOptions = {}
): WeeklyFeedingInsight {
  const now = options.now ?? new Date();
  const analysis = analyzeBabyPatterns(activities, { now, lookbackDays: 7 });
  const feeding = analysis.feeding;
  const averageText =
    feeding.averageIntervalHours === null
      ? "还没有足够数据计算平均间隔"
      : `平均间隔约 ${feeding.averageIntervalHours} 小时`;

  const summary = `这周有 ${feeding.count} 次喂养记录，${averageText}。${trendSummary(
    feeding.latestIntervalTrend
  )}`;

  const reassurance =
    feeding.count < 2
      ? "先继续轻松记录几次，下一张周报就会更像你家宝宝自己的节奏。"
      : "你不用靠记忆硬撑，记录已经开始帮你看见宝宝自己的规律。";

  return {
    title: "这周宝宝的规律",
    summary,
    reassurance,
    pushText: `这周宝宝的规律：${summary}`,
    windowDays: analysis.windowDays,
    generatedAt: now.toISOString(),
    metrics: {
      feedingCount: feeding.count,
      averageFeedingIntervalHours: feeding.averageIntervalHours,
      latestFeedingIntervalHours: feeding.latestIntervalHours,
      latestFeedingTrend: feeding.latestIntervalTrend,
    },
  };
}
