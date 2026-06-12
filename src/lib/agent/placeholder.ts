import type { DemoActivity } from "@/lib/demo/types";

export const AGENT_PLACEHOLDER_NOTE =
  "Agent placeholder: replace src/lib/agent/placeholder.ts and the API routes with your real agent workflow.";

export function createPlaceholderReply(message: string, activities: DemoActivity[]): string {
  const recentCount = activities.length;
  const cleanMessage = message.trim();

  if (!cleanMessage) {
    return "I'm holding the agent space for now. Send a question and your future agent can answer with your real baby data.";
  }

  return [
    "The real BabyHome agent is not wired up yet, so this is a safe placeholder response.",
    `I received: "${cleanMessage}"`,
    `There are ${recentCount} recent demo activities available for context.`,
    "When you add your agent, this route is the handoff point for retrieval, tools, and streaming output.",
  ].join(" ");
}

export function createPlaceholderInsight(activities: DemoActivity[]): string {
  if (activities.length === 0) {
    return "No logs yet. Once you add a few entries, your future agent can summarize patterns here.";
  }

  const counts = activities.reduce<Record<string, number>>((acc, activity) => {
    acc[activity.category] = (acc[activity.category] ?? 0) + 1;
    return acc;
  }, {});

  return `Demo insight: ${Object.entries(counts)
    .map(([category, count]) => `${count} ${category}`)
    .join(", ")} logged recently. Agent logic can replace this with a personalized read later.`;
}
