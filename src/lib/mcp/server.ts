import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  createActivity,
  getActivitiesToday,
  getActivitiesLast7Days,
} from "@/lib/db/queries/activities";
import { getLatestInsight } from "@/lib/db/queries/ai";

export function buildMcpServer(userId: string): McpServer {
  const server = new McpServer({
    name: "babyhome-mcp",
    version: "1.0.0",
  });

  // Tool: log_activity — log a new baby activity
  server.tool(
    "log_activity",
    "Log a new baby activity (feeding, diaper, sleep, pumping, or other). Returns the created activity.",
    {
      category: z.enum(["feeding", "diaper", "sleep", "pumping", "other"]),
      babyAgeMonths: z.number().min(0).max(12).describe("Baby's age in months (0-12)"),
      feedingSide: z.enum(["left", "right", "both"]).optional().describe("Breast side used (feeding only)"),
      feedingDuration: z.number().optional().describe("Duration in minutes (feeding only)"),
      diaperType: z.enum(["wet", "dirty", "both"]).optional().describe("Diaper type (diaper only)"),
      sleepLocation: z.enum(["crib", "bassinet", "contact"]).optional().describe("Sleep location (sleep only)"),
      sleepDuration: z.number().optional().describe("Sleep duration in hours (sleep only)"),
      pumpingLeftAmount: z.number().optional().describe("Left side output in ml (pumping only)"),
      pumpingRightAmount: z.number().optional().describe("Right side output in ml (pumping only)"),
      otherNote: z.string().optional().describe("Note for other activities"),
    },
    async ({ category, babyAgeMonths, feedingSide, feedingDuration, diaperType, sleepLocation, sleepDuration, pumpingLeftAmount, pumpingRightAmount, otherNote }) => {
      const activity = await createActivity({
        userId,
        category,
        babyAgeMonths,
        timestamp: new Date(),
        feedingType: category === "feeding" ? "breast" : undefined,
        feedingSide,
        feedingDuration,
        diaperType,
        sleepLocation,
        sleepStart: category === "sleep" ? new Date() : undefined,
        sleepEnd: category === "sleep" && sleepDuration
          ? new Date(Date.now() + sleepDuration * 3600000)
          : undefined,
        pumpingLeftAmount,
        pumpingRightAmount,
        otherNote,
      });
      return {
        content: [{ type: "text", text: JSON.stringify({ success: true, activity }) }],
      };
    }
  );

  // Tool: get_today_activities — fetch all activities logged today
  server.tool(
    "get_today_activities",
    "Get all baby activities logged today for the current user.",
    {},
    async () => {
      const activities = await getActivitiesToday(userId);
      return {
        content: [{ type: "text", text: JSON.stringify({ activities, count: activities.length }) }],
      };
    }
  );

  // Tool: get_weekly_summary — fetch a 7-day activity summary
  server.tool(
    "get_weekly_summary",
    "Get a summary of all baby activities from the last 7 days, grouped by category.",
    {},
    async () => {
      const activities = await getActivitiesLast7Days(userId);
      const counts: Record<string, number> = {};
      activities.forEach((a) => {
        counts[a.category] = (counts[a.category] || 0) + 1;
      });
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            totalActivities: activities.length,
            categoryCounts: counts,
            recentActivity: activities[0] ?? null,
          }),
        }],
      };
    }
  );

  // Tool: get_latest_insight — get the most recent AI-generated insight
  server.tool(
    "get_latest_insight",
    "Get the most recent AI-generated insight about the baby's patterns.",
    {},
    async () => {
      const insight = await getLatestInsight(userId);
      return {
        content: [{
          type: "text",
          text: insight
            ? JSON.stringify({ insight: insight.content, generatedAt: insight.generatedAt })
            : JSON.stringify({ insight: null, message: "No insights generated yet." }),
        }],
      };
    }
  );

  // Tool: check_normal_patterns — assess whether today's patterns are normal
  server.tool(
    "check_normal_patterns",
    "Check whether today's feeding frequency, sleep count, and diaper count are within normal range for the baby's age.",
    {
      babyAgeMonths: z.number().min(0).max(12).describe("Baby's age in months"),
    },
    async ({ babyAgeMonths }) => {
      const activities = await getActivitiesToday(userId);
      const feedCount = activities.filter((a) => a.category === "feeding").length;
      const diaperCount = activities.filter((a) => a.category === "diaper").length;
      const sleepCount = activities.filter((a) => a.category === "sleep").length;

      const norms =
        babyAgeMonths <= 3
          ? { feeding: [8, 12], diapers: [6, 12], sleep: [4, 8] }
          : babyAgeMonths <= 6
          ? { feeding: [6, 8], diapers: [5, 10], sleep: [3, 6] }
          : { feeding: [4, 6], diapers: [5, 8], sleep: [2, 4] };

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            babyAgeMonths,
            today: { feedCount, diaperCount, sleepCount },
            norms,
            assessment: {
              feeding: feedCount >= norms.feeding[0] && feedCount <= norms.feeding[1]
                ? "normal" : feedCount < norms.feeding[0] ? "below_normal" : "above_normal",
              diapers: diaperCount >= norms.diapers[0] ? "normal" : "below_normal",
              sleep: sleepCount >= norms.sleep[0] ? "normal" : "below_normal",
            },
          }),
        }],
      };
    }
  );

  return server;
}
