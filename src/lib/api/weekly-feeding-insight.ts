import { request } from "./request";

export interface WeeklyFeedingInsightResponse {
  insight: {
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
  };
}

export async function fetchWeeklyFeedingInsight() {
  const response = await request("/api/insights/weekly-feeding");
  if (!response.ok) {
    throw new Error(`Weekly feeding insight request failed: ${response.status}`);
  }

  return (await response.json()) as WeeklyFeedingInsightResponse;
}
