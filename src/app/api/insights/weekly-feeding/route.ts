import { NextResponse } from "next/server";
import { generateWeeklyFeedingInsight } from "@/lib/insights/weekly-feeding-insight";
import { getDemoActivities } from "@/lib/demo/store";

export async function GET() {
  const activities = getDemoActivities("7days");
  const insight = generateWeeklyFeedingInsight(activities);

  return NextResponse.json({ insight });
}
