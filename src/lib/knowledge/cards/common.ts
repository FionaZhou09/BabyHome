import type { BabyCareKnowledgeCard } from "../baby-care-cards";

export const commonCareCards: BabyCareKnowledgeCard[] = [
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
