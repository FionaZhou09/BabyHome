import { strict as assert } from "node:assert";
import { retrieveKnowledgeCards } from "../src/lib/knowledge/retrieve-knowledge-cards";

function assertTopCard(question: string, babyAgeMonths: number, expectedId: string) {
  const [topCard] = retrieveKnowledgeCards(question, babyAgeMonths);
  assert.equal(
    topCard?.id,
    expectedId,
    `Expected "${question}" to retrieve ${expectedId}, got ${topCard?.id ?? "none"}`
  );
}

assertTopCard("4个月宝宝晚上一直醒正常吗？", 4, "sleep-4-month-night-waking");
assertTopCard("新生儿一天拉多少次？", 0, "diaper-newborn-poop-frequency");
assertTopCard("母乳 2-3 个小时会饿吗？", 1, "feeding-breastfed-newborn-frequency");
assertTopCard("瓶喂母乳多久喂一次？", 1, "feeding-expressed-milk-bottle-frequency");
assertTopCard("奶粉水奶可以4-6个小时吗？", 2, "feeding-formula-frequency");

console.log("knowledge retrieval tests passed");
