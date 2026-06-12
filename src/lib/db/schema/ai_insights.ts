import { bigserial, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const aiInsights = pgTable("ai_insights", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  userId: text("user_id").notNull(),
  content: text("content").notNull(),
  generatedAt: timestamp("generated_at", { withTimezone: true }).defaultNow().notNull(),
});
