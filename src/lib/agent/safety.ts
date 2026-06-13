import {
  detectCrisisResourceNeed,
  type CrisisResourceNeed,
} from "./crisis-resources";
import type { EmotionDetectionResult } from "./emotion-detector";
import type { SafetyCheckResult } from "./types";

const BABY_URGENT_PATTERNS = [
  /fever|temperature|100\.4|38\s?c|发烧|发热|高烧/i,
  /breath|breathing|wheez|blue|cyanosis|呼吸|喘|发紫|嘴唇紫/i,
  /dehydrat|no wet|dry diaper|not peeing|脱水|尿少|没尿/i,
  /letharg|unresponsive|hard to wake|limp|嗜睡|叫不醒|没反应/i,
  /vomit.*green|blood|seizure|抽搐|呕吐.*绿|吐血|便血/i,
];

const PARENT_CRISIS_PATTERNS = [
  /hurt myself|kill myself|suicide|end my life|harm my baby|shake.*baby/i,
  /想死|自杀|不想活|伤害自己|伤害宝宝|摇晃宝宝|控制不住/i,
];

function hasMatch(message: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(message));
}

export function assessSafety(
  message: string,
  emotion: EmotionDetectionResult,
  resourceNeed: CrisisResourceNeed = detectCrisisResourceNeed(message)
): SafetyCheckResult {
  if (
    emotion.urgencyLevel === "crisis" ||
    resourceNeed.level === "urgent-crisis" ||
    hasMatch(message, PARENT_CRISIS_PATTERNS)
  ) {
    return { status: "parent-crisis" };
  }

  if (hasMatch(message, BABY_URGENT_PATTERNS)) {
    return { status: "baby-urgent" };
  }

  return { status: "ok" };
}
