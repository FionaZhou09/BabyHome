import { NextResponse } from "next/server";
import { getDemoInsight } from "@/lib/demo/store";

export async function GET() {
  const insight = getDemoInsight();
  return NextResponse.json({ insight });
}
