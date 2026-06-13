import type { BabyCareKnowledgeCard } from "../baby-care-cards";

export const commonCareCards: BabyCareKnowledgeCard[] = [
  {
    id: "safety-common-urgent-care",
    title: "When to seek urgent baby care",
    ageRangeMonths: { min: 0, max: 12 },
    topics: ["safety"],
    keywords: ["急诊", "急救", "什么时候去医院", "需要看医生", "911", "危险", "urgent care", "emergency", "call doctor", "ER"],
    answer: {
      zh: "有些情况不要等 agent 判断：呼吸困难、嘴唇/脸发紫、叫不醒、抽搐、严重脱水迹象、持续呕吐、明显外伤，或你直觉觉得宝宝有立即危险，都应该联系儿科医生、急诊或 911。你可以把最近一次吃奶、湿尿布、体温、症状开始时间准备好。",
      en: "Some situations should not wait for an agent: trouble breathing, blue lips/face, inability to wake, seizure, serious dehydration signs, repeated vomiting, clear injury, or your sense that baby is in immediate danger. Contact your pediatrician, urgent care, or 911, and gather last feed, last wet diaper, temperature, and when symptoms began.",
    },
    warningSigns: {
      zh: "如果你怀疑有生命危险，请直接拨打 911 或当地紧急服务。",
      en: "If you suspect life-threatening danger, call 911 or local emergency services.",
    },
    sources: [
      { label: "Mayo Clinic sick baby signs", url: "https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/healthy-baby/art-20047793" },
      { label: "CDC infant and toddler safety", url: "https://www.cdc.gov/parents/infants/safety.html" },
    ],
  },
  {
    id: "parent-support-overwhelmed",
    title: "Overwhelmed parent support",
    ageRangeMonths: { min: 0, max: 12 },
    topics: ["parent-support"],
    keywords: ["带娃好累", "撑不住", "崩溃", "焦虑", "压力", "累", "overwhelmed", "anxious", "exhausted", "stress"],
    answer: {
      zh: "你不是做得不好，你是在一个高消耗阶段里一直撑着。先把下一步缩小：确认宝宝在安全位置，喝几口水，慢慢呼气 3 次，然后只处理下一件最小的事。今天不需要成为完美父母，只需要让你们都安全地过完这一小段。",
      en: "This does not mean you are doing badly; it means you are carrying a lot in a high-demand season. Make the next step smaller: put baby somewhere safe, take a few sips of water, exhale slowly 3 times, then handle only the next smallest task.",
    },
    warningSigns: {
      zh: "如果你担心自己会伤害自己或宝宝，请立刻让另一个成年人接手宝宝，并拨打 911；心理危机可拨打或短信 988。美国孕产/产后心理支持热线是 1-833-TLC-MAMA。",
      en: "If you might hurt yourself or your baby, have another adult take over the baby immediately and call 911; for mental health crisis support, call or text 988. In the U.S., the maternal mental health hotline is 1-833-TLC-MAMA.",
    },
    sources: [
      { label: "988 Lifeline", url: "https://988lifeline.org/" },
      { label: "National Maternal Mental Health Hotline", url: "https://mchb.hrsa.gov/programs-impact/national-maternal-mental-health-hotline" },
    ],
  },
];
