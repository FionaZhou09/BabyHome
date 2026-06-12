import type { DemoActivity } from "@/lib/demo/types";
import {
  generateDailySupportInsight,
  generateParentSupportReply,
} from "./parent-support-agent";

export const AGENT_PLACEHOLDER_NOTE =
  "Parent Support Agent MVP: local rules now, model integration later.";

export function createPlaceholderReply(message: string, activities: DemoActivity[]): string {
  return generateParentSupportReply({ message, activities });
}

export function createPlaceholderInsight(activities: DemoActivity[]): string {
  return generateDailySupportInsight(activities);
}
