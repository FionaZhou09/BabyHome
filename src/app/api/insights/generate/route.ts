import { NextResponse } from "next/server";
import { createPlaceholderInsight } from "@/lib/agent/placeholder";
import { getDemoActivities, saveDemoInsight } from "@/lib/demo/store";

export const runtime = "nodejs";

export async function POST() {
  const activities = getDemoActivities("7days");
  const insight = saveDemoInsight(createPlaceholderInsight(activities));

  return NextResponse.json({ insight });
}
