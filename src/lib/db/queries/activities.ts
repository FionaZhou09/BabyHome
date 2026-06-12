import { and, desc, eq, gte } from "drizzle-orm";
import { db } from "../client";
import { activities } from "../schema/activities";

export type Activity = typeof activities.$inferSelect;
export type NewActivity = typeof activities.$inferInsert;

export async function createActivity(data: NewActivity): Promise<Activity> {
  const rows = await db.insert(activities).values(data).returning();
  return rows[0];
}

export async function getActivitiesByUser(userId: string, limit = 50): Promise<Activity[]> {
  return db
    .select()
    .from(activities)
    .where(eq(activities.userId, userId))
    .orderBy(desc(activities.timestamp))
    .limit(limit);
}

export async function getActivitiesLast7Days(userId: string): Promise<Activity[]> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return db
    .select()
    .from(activities)
    .where(and(eq(activities.userId, userId), gte(activities.timestamp, sevenDaysAgo)))
    .orderBy(desc(activities.timestamp));
}

export async function getActivitiesToday(userId: string): Promise<Activity[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return db
    .select()
    .from(activities)
    .where(and(eq(activities.userId, userId), gte(activities.timestamp, today)))
    .orderBy(desc(activities.timestamp));
}

export async function deleteActivity(id: number, userId: string): Promise<boolean> {
  const rows = await db
    .delete(activities)
    .where(and(eq(activities.id, id), eq(activities.userId, userId)))
    .returning({ id: activities.id });
  return rows.length > 0;
}
