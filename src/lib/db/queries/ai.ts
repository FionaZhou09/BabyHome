import { desc, eq } from "drizzle-orm";
import { db } from "../client";
import { aiInsights } from "../schema/ai_insights";
import { chatMessages } from "../schema/chat_messages";

// AI Insights
export type AiInsight = typeof aiInsights.$inferSelect;

export async function getLatestInsight(userId: string): Promise<AiInsight | undefined> {
  const rows = await db
    .select()
    .from(aiInsights)
    .where(eq(aiInsights.userId, userId))
    .orderBy(desc(aiInsights.generatedAt))
    .limit(1);
  return rows[0];
}

export async function saveInsight(userId: string, content: string): Promise<AiInsight> {
  const rows = await db.insert(aiInsights).values({ userId, content }).returning();
  return rows[0];
}

// Chat Messages
export type ChatMessage = typeof chatMessages.$inferSelect;

export async function getChatHistory(userId: string, limit = 40): Promise<ChatMessage[]> {
  const rows = await db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.userId, userId))
    .orderBy(desc(chatMessages.timestamp))
    .limit(limit);
  return rows.reverse();
}

export async function saveChatMessage(
  userId: string,
  role: "user" | "assistant",
  content: string
): Promise<ChatMessage> {
  const rows = await db
    .insert(chatMessages)
    .values({ userId, role, content })
    .returning();
  return rows[0];
}

export async function clearChatHistory(userId: string): Promise<void> {
  await db.delete(chatMessages).where(eq(chatMessages.userId, userId));
}
