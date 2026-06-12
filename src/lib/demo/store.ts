import type { DemoActivity, DemoChatMessage, DemoInsight } from "./types";

const DEMO_USER_ID = "demo-user";

const store = globalThis as typeof globalThis & {
  babyhomeDemo?: {
    nextActivityId: number;
    nextMessageId: number;
    nextInsightId: number;
    activities: DemoActivity[];
    messages: DemoChatMessage[];
    insights: DemoInsight[];
  };
};

function createSeedActivity(
  id: number,
  category: DemoActivity["category"],
  hoursAgo: number,
  extra: Partial<DemoActivity> = {}
): DemoActivity {
  return {
    id,
    userId: DEMO_USER_ID,
    category,
    babyAgeMonths: 4,
    timestamp: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString(),
    ...extra,
  };
}

function getStore() {
  store.babyhomeDemo ??= {
    nextActivityId: 5,
    nextMessageId: 1,
    nextInsightId: 2,
    activities: [
      createSeedActivity(1, "feeding", 2, {
        feedingType: "nursing",
        feedingSide: "left",
        feedingDuration: 18,
      }),
      createSeedActivity(2, "diaper", 4, { diaperType: "wet" }),
      createSeedActivity(3, "sleep", 7, {
        sleepLocation: "crib",
        sleepStart: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
        sleepEnd: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      }),
      createSeedActivity(4, "pumping", 10, {
        pumpingDuration: 15,
        pumpingLeftAmount: 60,
        pumpingRightAmount: 55,
      }),
    ],
    messages: [],
    insights: [
      {
        id: 1,
        userId: DEMO_USER_ID,
        content:
          "Today's rhythm looks calm and usable as a demo. Your future agent can replace this with a real pattern read when you're ready.",
        generatedAt: new Date().toISOString(),
      },
    ],
  };
  return store.babyhomeDemo;
}

export function getDemoUserId() {
  return DEMO_USER_ID;
}

export function createDemoActivity(input: Omit<DemoActivity, "id" | "userId">): DemoActivity {
  const demo = getStore();
  const activity: DemoActivity = {
    id: demo.nextActivityId++,
    userId: DEMO_USER_ID,
    ...input,
    timestamp: input.timestamp ?? new Date().toISOString(),
  };
  demo.activities.unshift(activity);
  return activity;
}

export function getDemoActivities(range?: string): DemoActivity[] {
  const since = new Date();
  since.setDate(since.getDate() - (range === "7days" ? 7 : 0));
  if (range !== "7days") since.setHours(0, 0, 0, 0);

  return getStore()
    .activities.filter((activity) => new Date(activity.timestamp) >= since)
    .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
}

export function deleteDemoActivity(id: number): boolean {
  const demo = getStore();
  const initialLength = demo.activities.length;
  demo.activities = demo.activities.filter((activity) => activity.id !== id);
  return demo.activities.length !== initialLength;
}

export function getDemoInsight(): DemoInsight {
  return getStore().insights[0];
}

export function saveDemoInsight(content: string): DemoInsight {
  const demo = getStore();
  const insight = {
    id: demo.nextInsightId++,
    userId: DEMO_USER_ID,
    content,
    generatedAt: new Date().toISOString(),
  };
  demo.insights.unshift(insight);
  return insight;
}

export function getDemoChatHistory(limit = 40): DemoChatMessage[] {
  return getStore().messages.slice(-limit);
}

export function saveDemoChatMessage(
  role: DemoChatMessage["role"],
  content: string
): DemoChatMessage {
  const demo = getStore();
  const message = {
    id: demo.nextMessageId++,
    userId: DEMO_USER_ID,
    role,
    content,
    timestamp: new Date().toISOString(),
  };
  demo.messages.push(message);
  return message;
}
