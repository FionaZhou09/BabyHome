import type { DemoActivity } from "@/lib/demo/types";
import type { DiaperTopic, Intent, Language } from "./types";

const INTENT_PATTERNS: Record<Intent, RegExp[]> = {
  emotional: [
    /tired|exhausted|overwhelmed|anxious|anxiety|crying|guilty|bad parent|scared|stress/i,
    /累|崩溃|焦虑|压力|害怕|内疚|撑不住|哭|情绪/i,
  ],
  feeding: [/feed|feeding|milk|nursing|formula|bottle|hungry|奶|喂|母乳|配方|瓶喂|饿/i],
  sleep: [/sleep|nap|wake|waking|night|bedtime|睡|觉|醒|晚上|夜里|半夜|夜醒|小睡|哄睡/i],
  diaper: [/diaper|pee|poop|wet|dirty|尿布|尿|便便|大便|拉/i],
  crying: [/cry|fussy|colic|soothe|calm|哭闹|安抚|哄|肠绞痛/i],
  pattern: [/normal|pattern|summary|today|log|track|正常|规律|总结|今天|记录/i],
  general: [/.*/],
};

const CHINESE_MONTH_NUMBERS: Record<string, number> = {
  一: 1,
  二: 2,
  两: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
  十: 10,
  十一: 11,
  十二: 12,
};

export function detectLanguage(message: string): Language {
  return /[\u3400-\u9fff]/.test(message) ? "zh" : "en";
}

export function detectIntent(message: string): Intent {
  const order: Intent[] = ["emotional", "feeding", "sleep", "diaper", "crying", "pattern"];
  return (
    order.find((intent) => INTENT_PATTERNS[intent].some((pattern) => pattern.test(message))) ??
    "general"
  );
}

function inferTextAgeMonths(message: string) {
  const digitMatch = message.match(/(\d{1,2})\s*(?:个)?月/);
  if (digitMatch) {
    return Math.min(24, Math.max(0, Number(digitMatch[1])));
  }

  const chineseMatch = message.match(/(十二|十一|十|九|八|七|六|五|四|三|两|二|一)\s*(?:个)?月/);
  if (chineseMatch) {
    return CHINESE_MONTH_NUMBERS[chineseMatch[1]];
  }

  if (/新生儿|刚出生|newborn/i.test(message)) {
    return 0;
  }

  return null;
}

export function inferBabyAgeMonths(message: string, activities: DemoActivity[]) {
  return inferTextAgeMonths(message) ?? activities[0]?.babyAgeMonths ?? 4;
}

export function formatBabyAgeLabel(babyAgeMonths: number, language: Language) {
  if (babyAgeMonths <= 0) {
    return language === "zh" ? "新生儿" : "newborn";
  }

  return language === "zh"
    ? `${babyAgeMonths} 个月宝宝`
    : `${babyAgeMonths}-month-old babies`;
}

export function detectDiaperTopic(message: string): DiaperTopic {
  if (/poop|stool|bowel|大便|便便|拉|粑粑|屎/i.test(message)) return "poop";
  if (/pee|urine|wet diaper|尿|湿尿布|小便/i.test(message)) return "pee";
  return "general";
}
