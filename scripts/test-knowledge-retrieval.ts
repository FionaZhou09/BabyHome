import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { detectEmotion } from "../src/lib/agent/emotion-detector";
import {
  buildParentSupportContext,
  generateParentSupportReply,
} from "../src/lib/agent/parent-support-agent";
import { getPromptTemplateForEmotion } from "../src/lib/agent/prompt-templates";
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
assertTopCard("新生儿黄疸什么时候要找医生？", 0, "safety-newborn-jaundice-fever");
assertTopCard("新生儿睡觉怎么才安全？", 0, "sleep-newborn-safe-sleep");
assertTopCard("新生儿发育怎么陪玩？", 0, "development-newborn-early-interaction");
assertTopCard("新生儿一直哭怎么安抚？", 0, "crying-newborn-soothing");
assertTopCard("2个月宝宝吐奶和胀气怎么办？", 2, "feeding-one-to-three-spit-up-gas");
assertTopCard("2个月宝宝 wake window 多久？", 2, "sleep-one-to-three-wake-window");
assertTopCard("2个月带娃压力好大怎么办？", 2, "parent-support-one-to-three-rest-and-help");
assertTopCard("5个月宝宝翻身睡觉安全吗？", 5, "safety-three-to-six-rolling-sleep");
assertTopCard("5个月可以开始辅食了吗？", 5, "feeding-three-to-six-solids-readiness");
assertTopCard("4个月哭闹怎么安抚？", 4, "crying-three-to-six-soothing");
assertTopCard("5个月宝宝会翻身了家里怎么安全？", 5, "safety-three-to-six-rolling-home");
assertTopCard("7个月过敏食物怎么引入？", 7, "feeding-six-to-nine-allergen-introduction");
assertTopCard("8个月宝宝分离焦虑怎么办？", 8, "crying-six-to-nine-separation-anxiety");
assertTopCard("7个月辅食怎么避免噎住？", 7, "safety-six-to-nine-choking-babyproofing");
assertTopCard("10个月奶量下降正常吗？", 10, "feeding-nine-to-twelve-milk-and-meals");
assertTopCard("11个月宝宝 nap 要怎么转？", 11, "sleep-nine-to-twelve-nap-transition");
assertTopCard("10个月宝宝站起来家里怎么安全？", 10, "safety-nine-to-twelve-standing-home");
assertTopCard("带娃好累，感觉自己撑不住", 6, "parent-support-overwhelmed");
assertTopCard("宝宝什么时候需要急诊？", 6, "safety-common-urgent-care");

const replyWithTextAge = generateParentSupportReply({
  message: "10个月奶量下降正常吗？",
  activities: [
    {
      id: 1,
      userId: "demo",
      category: "feeding",
      babyAgeMonths: 4,
      timestamp: new Date().toISOString(),
    },
  ],
});

assert.match(
  replyWithTextAge,
  /9-12 个月|三餐节奏|奶量可能慢慢下降/,
  "Expected text age to override activity age in agent reply"
);

const napReplyWithTextAge = generateParentSupportReply({
  message: "11个月宝宝 nap 要怎么转？",
  activities: [
    {
      id: 1,
      userId: "demo",
      category: "sleep",
      babyAgeMonths: 4,
      timestamp: new Date().toISOString(),
    },
  ],
});

assert.match(
  napReplyWithTextAge,
  /9-12 个月|2 个 nap|15-30 分钟/,
  "Expected text age to guide sleep retrieval when logs have a different age"
);

const combinedKnowledgeReply = generateParentSupportReply({
  message: "7个月过敏食物怎么引入？",
  activities: [],
});

assert.match(
  combinedKnowledgeReply,
  /常见过敏食物可以像其他食物一样逐步引入/,
  "Expected primary allergen card in the agent reply"
);
assert.match(
  combinedKnowledgeReply,
  /母乳或配方奶仍是主要营养来源|辅食.*练习和探索/,
  "Expected a related second card to supplement the primary answer"
);

const emotionTestCases = [
  {
    message: "我真的崩溃了，撑不住了，宝宝一直哭",
    emotionState: "collapsing",
    urgencyLevel: "high",
  },
  {
    message: "昨晚完全睡不了，我快疯了",
    emotionState: "collapsing",
    urgencyLevel: "high",
  },
  {
    message: "我有点焦虑，怕宝宝吃不够，但现在还可以",
    emotionState: "anxious-stable",
    urgencyLevel: "medium",
  },
  {
    message: "4个月宝宝晚上醒很多次正常吗？我有点担心",
    emotionState: "anxious-stable",
    urgencyLevel: "medium",
  },
  {
    message: "宝宝今天尿布少一点，会不会脱水？",
    emotionState: "anxious-stable",
    urgencyLevel: "medium",
  },
  {
    message: "我想学习一下7个月宝宝过敏食物怎么引入",
    emotionState: "learning",
    urgencyLevel: "low",
  },
  {
    message: "新生儿一天拉多少次？",
    emotionState: "learning",
    urgencyLevel: "low",
  },
  {
    message: "可以给我一个6个月辅食计划吗？",
    emotionState: "learning",
    urgencyLevel: "low",
  },
  {
    message: "怎么建立睡前流程？",
    emotionState: "learning",
    urgencyLevel: "low",
  },
  {
    message: "我怕自己会伤害宝宝",
    emotionState: "collapsing",
    urgencyLevel: "crisis",
  },
] as const;

let correctEmotionDetections = 0;
for (const testCase of emotionTestCases) {
  const result = detectEmotion(testCase.message);
  assert.equal(
    result.emotionState,
    testCase.emotionState,
    `Expected emotionState for "${testCase.message}"`
  );
  assert.equal(
    result.urgencyLevel,
    testCase.urgencyLevel,
    `Expected urgencyLevel for "${testCase.message}"`
  );
  correctEmotionDetections += 1;
}

assert.equal(correctEmotionDetections / emotionTestCases.length, 1);

const collapsingReply = generateParentSupportReply({
  message: "我真的崩溃了，撑不住了，宝宝一直哭",
  activities: [],
});

assert.match(
  collapsingReply,
  /先稳住|先把下一步缩小/,
  "Expected collapsing emotional state to add stabilization language"
);

const urgentPipelineContext = buildParentSupportContext({
  message: "我怕自己会伤害宝宝，7个月宝宝过敏食物怎么引入？",
  activities: [
    {
      id: 1,
      userId: "demo",
      category: "feeding",
      babyAgeMonths: 7,
      timestamp: new Date().toISOString(),
    },
  ],
});

assert.equal(urgentPipelineContext.emotion.urgencyLevel, "crisis");
assert.ok(
  urgentPipelineContext.knowledgeCards.length > 0,
  "Expected knowledge retrieval before safety decision in the agent context"
);
assert.equal(urgentPipelineContext.logContext.summary.counts.feeding, 1);
assert.equal(urgentPipelineContext.safety.status, "parent-crisis");

const collapsingPrompt = getPromptTemplateForEmotion("collapsing");
assert.match(collapsingPrompt.responseOrder.zh, /共情.*信息|稳定.*信息/);
assert.match(collapsingPrompt.system.zh, /不要一开始就给大量知识/);

const anxiousPrompt = getPromptTemplateForEmotion("anxious-stable");
assert.match(anxiousPrompt.responseOrder.zh, /情绪.*信息.*并行/);
assert.match(anxiousPrompt.system.zh, /不要只安慰/);

const learningPrompt = getPromptTemplateForEmotion("learning");
assert.match(learningPrompt.responseOrder.zh, /直接.*知识/);
assert.match(learningPrompt.system.zh, /少情绪铺垫/);

const parentSupportAgentSource = readFileSync(
  new URL("../src/lib/agent/parent-support-agent.ts", import.meta.url),
  "utf8"
);

assert.doesNotMatch(
  parentSupportAgentSource,
  /正常，4 个月宝宝晚上反复醒很常见|normal around 4 months/,
  "sleep fallback should not hard-code 4 months"
);

console.log("knowledge retrieval tests passed");
