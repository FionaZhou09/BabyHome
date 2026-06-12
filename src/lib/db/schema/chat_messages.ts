import { bigserial, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const chatMessages = pgTable("chat_messages", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  userId: text("user_id").notNull(),
  role: text("role").notNull(), // user, assistant
  content: text("content").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow().notNull(),
});
