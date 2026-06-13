import { strict as assert } from "node:assert";
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const storePath = ".babyhome-data/store.json";
const backup = existsSync(storePath) ? readFileSync(storePath, "utf8") : null;
rmSync(storePath, { force: true });

const {
  createDemoActivity,
  getDemoActivities,
  getDemoChatHistory,
  getDemoInsight,
  saveDemoChatMessage,
  saveDemoInsight,
} = await import("../src/lib/demo/store");

try {
  const activity = createDemoActivity({
    category: "feeding",
    babyAgeMonths: 5,
    timestamp: "2026-06-13T08:00:00.000Z",
    feedingType: "bottle",
    feedingAmount: 120,
  });
  saveDemoChatMessage("user", "宝宝今天喝奶了吗？");
  const insight = saveDemoInsight("Local persistence test insight");

  const saved = JSON.parse(readFileSync(storePath, "utf8"));
  assert.equal(saved.activities[0].id, activity.id);
  assert.equal(saved.messages[0].content, "宝宝今天喝奶了吗？");
  assert.equal(saved.insights[0].id, insight.id);

  const activities = getDemoActivities("7days");
  const messages = getDemoChatHistory(10);
  assert.ok(activities.some((item) => item.id === activity.id));
  assert.equal(messages.at(-1)?.content, "宝宝今天喝奶了吗？");
  assert.equal(getDemoInsight().content, "Local persistence test insight");

  console.log("local store persistence tests passed");
} finally {
  if (backup === null) {
    rmSync(dirname(storePath), { recursive: true, force: true });
  } else {
    writeFileSync(storePath, backup, "utf8");
  }
}
