import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type { DemoActivity, DemoChatMessage, DemoInsight } from "./types";

const DEMO_USER_ID = "demo-user";
const DEFAULT_STORE_PATH = ".babyhome-data/store.json";

interface LocalStore {
  nextActivityId: number;
  nextMessageId: number;
  nextInsightId: number;
  activities: DemoActivity[];
  messages: DemoChatMessage[];
  insights: DemoInsight[];
}

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

function createInitialStore(): LocalStore {
  return {
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
          "Today's rhythm looks calm and usable as a local demo. Your future agent can replace this with a real pattern read when you're ready.",
        generatedAt: new Date().toISOString(),
      },
    ],
  };
}

function ensureStoreShape(value: Partial<LocalStore>): LocalStore {
  const initialStore = createInitialStore();
  const activities = Array.isArray(value.activities) ? value.activities : initialStore.activities;
  const messages = Array.isArray(value.messages) ? value.messages : initialStore.messages;
  const insights = Array.isArray(value.insights) && value.insights.length > 0
    ? value.insights
    : initialStore.insights;

  return {
    nextActivityId: value.nextActivityId ?? nextId(activities),
    nextMessageId: value.nextMessageId ?? nextId(messages),
    nextInsightId: value.nextInsightId ?? nextId(insights),
    activities,
    messages,
    insights,
  };
}

function nextId(items: { id: number }[]) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

function writeStore(store: LocalStore) {
  const path = DEFAULT_STORE_PATH;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

function readStore(): LocalStore {
  const path = DEFAULT_STORE_PATH;
  if (!existsSync(path)) {
    const initialStore = createInitialStore();
    writeStore(initialStore);
    return initialStore;
  }

  try {
    return ensureStoreShape(JSON.parse(readFileSync(path, "utf8")) as Partial<LocalStore>);
  } catch {
    renameSync(path, `${path}.corrupt-${Date.now()}`);
    const initialStore = createInitialStore();
    writeStore(initialStore);
    return initialStore;
  }
}

function updateStore<T>(updater: (store: LocalStore) => T): T {
  const store = readStore();
  const result = updater(store);
  writeStore(store);
  return result;
}

export function getDemoUserId() {
  return DEMO_USER_ID;
}

export function createDemoActivity(input: Omit<DemoActivity, "id" | "userId">): DemoActivity {
  return updateStore((store) => {
    const activity: DemoActivity = {
      id: store.nextActivityId++,
      userId: DEMO_USER_ID,
      ...input,
      timestamp: input.timestamp ?? new Date().toISOString(),
    };
    store.activities.unshift(activity);
    return activity;
  });
}

export function getDemoActivities(range?: string): DemoActivity[] {
  const since = new Date();
  since.setDate(since.getDate() - (range === "7days" ? 7 : 0));
  if (range !== "7days") since.setHours(0, 0, 0, 0);

  return readStore()
    .activities.filter((activity) => new Date(activity.timestamp) >= since)
    .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
}

export function deleteDemoActivity(id: number): boolean {
  return updateStore((store) => {
    const initialLength = store.activities.length;
    store.activities = store.activities.filter((activity) => activity.id !== id);
    return store.activities.length !== initialLength;
  });
}

export function getDemoInsight(): DemoInsight {
  return readStore().insights[0];
}

export function saveDemoInsight(content: string): DemoInsight {
  return updateStore((store) => {
    const insight = {
      id: store.nextInsightId++,
      userId: DEMO_USER_ID,
      content,
      generatedAt: new Date().toISOString(),
    };
    store.insights.unshift(insight);
    return insight;
  });
}

export function getDemoChatHistory(limit = 40): DemoChatMessage[] {
  return readStore().messages.slice(-limit);
}

export function saveDemoChatMessage(
  role: DemoChatMessage["role"],
  content: string
): DemoChatMessage {
  return updateStore((store) => {
    const message = {
      id: store.nextMessageId++,
      userId: DEMO_USER_ID,
      role,
      content,
      timestamp: new Date().toISOString(),
    };
    store.messages.push(message);
    return message;
  });
}
