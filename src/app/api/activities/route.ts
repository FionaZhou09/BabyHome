import { NextRequest, NextResponse } from "next/server";
import { createDemoActivity, getDemoActivities } from "@/lib/demo/store";

export async function GET(request: NextRequest) {
  const range = request.nextUrl.searchParams.get("range");
  const activities = getDemoActivities(range ?? undefined);

  return NextResponse.json({ activities });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const activity = createDemoActivity(body);

  return NextResponse.json({ activity }, { status: 201 });
}
