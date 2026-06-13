import { NextResponse } from "next/server";
import { detectAnomalyReminders } from "@/lib/alerts/anomaly-reminders";
import { getDemoActivities } from "@/lib/demo/store";

export async function GET() {
  const activities = getDemoActivities("7days");
  const result = detectAnomalyReminders(activities);

  return NextResponse.json(result);
}
