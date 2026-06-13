import type { BabyPatternAnalysis } from "@/lib/analytics/baby-pattern-analyzer";
import type { DemoActivity, DemoChatMessage } from "@/lib/demo/types";
import type { BabyCareKnowledgeCard } from "@/lib/knowledge/baby-care-cards";
import type { CrisisResourceNeed } from "./crisis-resources";
import type { EmotionDetectionResult } from "./emotion-detector";
import type { ParentSupportPromptTemplate } from "./prompt-templates";

export type Language = "zh" | "en";
export type Intent = "emotional" | "feeding" | "sleep" | "diaper" | "crying" | "pattern" | "general";
export type DiaperTopic = "poop" | "pee" | "general";
export type SafetyStatus = "ok" | "baby-urgent" | "parent-crisis";

export interface ParentSupportInput {
  message: string;
  activities: DemoActivity[];
  history?: DemoChatMessage[];
}

export interface ActivitySummary {
  counts: Record<string, number>;
  latestLabel: string | null;
}

export interface ActivityLogContext {
  activities: DemoActivity[];
  summary: ActivitySummary;
}

export interface SafetyCheckResult {
  status: SafetyStatus;
}

export interface ParentSupportContext {
  cleanMessage: string;
  language: Language;
  emotion: EmotionDetectionResult;
  promptTemplate: ParentSupportPromptTemplate;
  babyAgeMonths: number;
  knowledgeCards: BabyCareKnowledgeCard[];
  patternAnalysis: BabyPatternAnalysis;
  logContext: ActivityLogContext;
  safety: SafetyCheckResult;
  crisisResourceNeed: CrisisResourceNeed;
  intent: Intent;
}
