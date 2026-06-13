export type CrisisResourceLevel = "none" | "maternal-support" | "urgent-crisis";

export interface CrisisResource {
  name: string;
  phone: string;
  description: string;
  url: string;
}

export interface CrisisResourceNeed {
  level: CrisisResourceLevel;
  matchedSignals: string[];
  resources: CrisisResource[];
}

const RESOURCES: Record<"lifeline988" | "maternalHotline", CrisisResource> = {
  lifeline988: {
    name: "988 Suicide & Crisis Lifeline",
    phone: "988",
    description: "24/7 crisis support by call, text, or chat in the U.S. and Canada.",
    url: "https://988lifeline.org/",
  },
  maternalHotline: {
    name: "National Maternal Mental Health Hotline",
    phone: "1-833-TLC-MAMA",
    description:
      "Free, confidential, 24/7 support in English and Spanish for pregnant and postpartum parents in the U.S.",
    url: "https://mchb.hrsa.gov/programs-impact/national-maternal-mental-health-hotline",
  },
};

const URGENT_CRISIS_PATTERNS = [
  /hurt myself|kill myself|suicide|end my life|harm my baby|shake.*baby/i,
  /想死|自杀|不想活|伤害自己|伤害宝宝|摇晃宝宝|控制不住.*宝宝/i,
];

const MATERNAL_SUPPORT_PATTERNS = [
  /postpartum depression|postpartum anxiety|baby blues|perinatal depression/i,
  /产后抑郁|产后焦虑|产后.*绝望|生完.*绝望|月子.*崩溃/i,
  /hopeless|worthless|empty|numb|detached|no bond|not bonding/i,
  /绝望|没有希望|没有感觉|麻木|对宝宝没感觉|不爱宝宝|不像妈妈|不是好妈妈/i,
  /cannot sleep even when baby sleeps|can't sleep even when baby sleeps|racing thoughts/i,
  /宝宝睡了.*睡不着|一直睡不着|脑子停不下来|停不下来.*担心/i,
  /intrusive thoughts|scary thoughts|unwanted thoughts/i,
  /侵入性想法|可怕的念头|控制不了.*念头|反复想到.*伤害/i,
];

function matchedPatterns(message: string, patterns: RegExp[]) {
  return patterns
    .filter((pattern) => pattern.test(message))
    .map((pattern) => pattern.source);
}

export function detectCrisisResourceNeed(message: string): CrisisResourceNeed {
  const urgentSignals = matchedPatterns(message, URGENT_CRISIS_PATTERNS);
  if (urgentSignals.length > 0) {
    return {
      level: "urgent-crisis",
      matchedSignals: urgentSignals,
      resources: [RESOURCES.lifeline988, RESOURCES.maternalHotline],
    };
  }

  const maternalSignals = matchedPatterns(message, MATERNAL_SUPPORT_PATTERNS);
  if (maternalSignals.length > 0) {
    return {
      level: "maternal-support",
      matchedSignals: maternalSignals,
      resources: [RESOURCES.maternalHotline, RESOURCES.lifeline988],
    };
  }

  return {
    level: "none",
    matchedSignals: [],
    resources: [],
  };
}

export function crisisResourceText(
  resourceNeed: CrisisResourceNeed,
  language: "zh" | "en"
) {
  if (resourceNeed.level === "none") return null;

  if (language === "zh") {
    if (resourceNeed.level === "urgent-crisis") {
      return [
        "这听起来像需要立刻接入真人支持的时刻。请先把宝宝放在安全的地方，然后联系身边一个成年人。",
        "如果你或宝宝可能有立即危险，请拨打 911；心理危机可以拨打或短信 988。",
        "如果你在美国，孕期/产后心理支持热线是 1-833-TLC-MAMA，可电话或短信联系。",
      ].join(" ");
    }

    return [
      "我想主动把资源放在这里，因为你描述的绝望、麻木、睡不着或和宝宝连接不上，都可能是产后心理健康需要支持的信号；这不是你的错，也不代表你是坏父母。",
      "如果你在美国，可以电话或短信 1-833-TLC-MAMA 联系 National Maternal Mental Health Hotline；如果你现在有伤害自己或宝宝的念头，或觉得撑不过去，请拨打或短信 988，立即找真人陪你。",
    ].join(" ");
  }

  if (resourceNeed.level === "urgent-crisis") {
    return [
      "This sounds like a moment for immediate real-person support. First place baby somewhere safe, then contact another adult.",
      "If you or the baby may be in immediate danger, call 911. For mental health crisis support, call or text 988.",
      "In the U.S., pregnant and postpartum parents can call or text 1-833-TLC-MAMA for the National Maternal Mental Health Hotline.",
    ].join(" ");
  }

  return [
    "I want to proactively put support here because hopelessness, numbness, not feeling bonded, scary thoughts, or not sleeping even when baby sleeps can be postpartum mental health signals. This is not your fault, and it does not make you a bad parent.",
    "In the U.S., call or text 1-833-TLC-MAMA for the National Maternal Mental Health Hotline. If you might hurt yourself or the baby, or you feel you cannot stay safe, call or text 988 now for real-person crisis support.",
  ].join(" ");
}
