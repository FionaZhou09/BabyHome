import { bigserial, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const activities = pgTable("activities", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  userId: text("user_id").notNull(),
  babyAgeMonths: integer("baby_age_months").notNull(), // 0-12
  category: text("category").notNull(), // feeding, diaper, sleep, pumping, other
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  
  // Feeding fields
  feedingType: text("feeding_type"), // breast, bottle
  feedingSide: text("feeding_side"), // left, right, both
  feedingDuration: integer("feeding_duration"), // minutes
  feedingAmount: integer("feeding_amount"), // ml

  // Diaper fields
  diaperType: text("diaper_type"), // wet, dirty, both

  // Sleep fields
  sleepStart: timestamp("sleep_start", { withTimezone: true }),
  sleepEnd: timestamp("sleep_end", { withTimezone: true }),
  sleepLocation: text("sleep_location"), // crib, bassinet, contact

  // Pumping fields
  pumpingDuration: integer("pumping_duration"), // minutes
  pumpingLeftAmount: integer("pumping_left_amount"), // ml
  pumpingRightAmount: integer("pumping_right_amount"), // ml

  // Other activity
  otherNote: text("other_note"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
