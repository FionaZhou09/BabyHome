import { analyzeBabyPatterns } from "@/lib/analytics/baby-pattern-analyzer";
import { retrieveKnowledgeCards } from "@/lib/knowledge/retrieve-knowledge-cards";
import { detectCrisisResourceNeed } from "./crisis-resources";
import { detectEmotion } from "./emotion-detector";
import {
  detectIntent,
  detectLanguage,
  inferBabyAgeMonths,
} from "./intent";
import {
  generateReplyFromContext,
  summarizeActivities,
} from "./reply-builder";
import { assessSafety } from "./safety";
import { getPromptTemplateForEmotion } from "./prompt-templates";
import type {
  ActivityLogContext,
  ParentSupportContext,
  ParentSupportInput,
} from "./types";

export type { ParentSupportContext, ParentSupportInput } from "./types";
export { generateDailySupportInsight } from "./reply-builder";

function readActivityLogContext(
  activities: ParentSupportInput["activities"]
): ActivityLogContext {
  return {
    activities,
    summary: summarizeActivities(activities),
  };
}

export function buildParentSupportContext({
  message,
  activities,
}: ParentSupportInput): ParentSupportContext {
  const cleanMessage = message.trim();
  const language = detectLanguage(cleanMessage);
  const emotion = detectEmotion(cleanMessage);
  const promptTemplate = getPromptTemplateForEmotion(emotion.emotionState);
  const babyAgeMonths = inferBabyAgeMonths(cleanMessage, activities);
  const knowledgeCards = retrieveKnowledgeCards(cleanMessage, babyAgeMonths, 2);
  const logContext = readActivityLogContext(activities);
  const patternAnalysis = analyzeBabyPatterns(logContext.activities, { lookbackDays: 3 });
  const crisisResourceNeed = detectCrisisResourceNeed(cleanMessage);
  const safety = assessSafety(cleanMessage, emotion, crisisResourceNeed);
  const intent = detectIntent(cleanMessage);

  return {
    cleanMessage,
    language,
    emotion,
    promptTemplate,
    babyAgeMonths,
    knowledgeCards,
    patternAnalysis,
    logContext,
    safety,
    crisisResourceNeed,
    intent,
  };
}

export function generateParentSupportReply(input: ParentSupportInput): string {
  return generateReplyFromContext(buildParentSupportContext(input));
}
