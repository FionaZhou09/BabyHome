export type KnowledgeTopic =
  | "feeding"
  | "sleep"
  | "diaper"
  | "crying"
  | "parent-support"
  | "safety";

export interface BabyCareKnowledgeCard {
  id: string;
  title: string;
  ageRangeMonths: {
    min: number;
    max: number;
  };
  topics: KnowledgeTopic[];
  keywords: string[];
  answer: {
    zh: string;
    en: string;
  };
  warningSigns?: {
    zh: string;
    en: string;
  };
  sources: {
    label: string;
    url: string;
  }[];
}

export const babyCareKnowledgeCards: BabyCareKnowledgeCard[] = [
  {
    id: "feeding-breastfed-newborn-frequency",
    title: "Breastfed newborn feeding frequency",
    ageRangeMonths: { min: 0, max: 2 },
    topics: ["feeding"],
    keywords: ["母乳", "亲喂", "breastfeeding", "breastfed", "nursing", "2-3", "多久", "饿"],
    answer: {
      zh: "母乳宝宝，尤其是新生儿，常见是大约每 2-3 小时想吃一次；有时也会更频繁，比如 cluster feeding。重点不是死守时间，而是看饥饿信号、湿尿布、体重增长和宝宝精神状态。",
      en: "Breastfed newborns commonly feed about every 2-3 hours, and sometimes more often during cluster feeding. The goal is not a rigid clock; watch hunger cues, wet diapers, weight gain, and alertness.",
    },
    warningSigns: {
      zh: "如果宝宝很难叫醒吃奶、吃奶明显变差、湿尿布明显减少、精神很差，建议联系儿科医生或哺乳顾问。",
      en: "If baby is hard to wake for feeds, feeds much less than usual, has fewer wet diapers, or seems unusually low-energy, contact your pediatrician or a lactation consultant.",
    },
    sources: [
      {
        label: "HealthyChildren feeding frequency",
        url: "https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/how-often-and-how-much-should-your-baby-eat.aspx",
      },
      {
        label: "CDC breastfeeding frequency",
        url: "https://www.cdc.gov/infant-toddler-nutrition/breastfeeding/how-much-and-how-often.html",
      },
    ],
  },
  {
    id: "feeding-expressed-milk-bottle-frequency",
    title: "Expressed breast milk bottle feeding rhythm",
    ageRangeMonths: { min: 0, max: 6 },
    topics: ["feeding"],
    keywords: ["瓶喂母乳", "瓶喂", "泵奶", "expressed", "pumped", "bottle", "breast milk", "3-4"],
    answer: {
      zh: "瓶喂母乳通常会比亲喂更容易看见奶量，但仍然建议按宝宝饥饿和吃饱信号来喂。很多宝宝会接近 2-4 小时一个节奏；如果一次喝得更多，间隔可能略长，但不要只按时钟判断。",
      en: "Bottle-fed expressed milk makes volume easier to see, but responsive feeding still matters. Many babies settle around a 2-4 hour rhythm; if a baby takes more per bottle, the gap may stretch a bit, but do not rely on the clock alone.",
    },
    warningSigns: {
      zh: "如果宝宝频繁呛咳、喝完非常不舒服、吐奶明显加重、尿布减少或精神差，建议咨询儿科医生或喂养/哺乳支持。",
      en: "If baby coughs or chokes often, seems very uncomfortable after bottles, spits up much more than usual, has fewer wet diapers, or seems low-energy, ask your pediatrician or feeding support.",
    },
    sources: [
      {
        label: "CDC breastfeeding frequency",
        url: "https://www.cdc.gov/infant-toddler-nutrition/breastfeeding/how-much-and-how-often.html",
      },
    ],
  },
  {
    id: "feeding-formula-frequency",
    title: "Formula feeding frequency",
    ageRangeMonths: { min: 0, max: 6 },
    topics: ["feeding"],
    keywords: ["奶粉", "水奶", "配方奶", "formula", "ready-to-feed", "4-6", "3-4"],
    answer: {
      zh: "配方奶宝宝通常比亲喂母乳更规律。新生儿早期可能每 2-3 小时一次；随着月龄和胃容量增加，常见会到每 3-4 小时一次。4-6 小时更像是部分较大月龄宝宝或夜间较长睡眠段，不建议作为所有新生儿默认间隔。",
      en: "Formula-fed babies often have a more regular rhythm than directly breastfed babies. Early newborns may feed every 2-3 hours; as they grow, many move toward every 3-4 hours. A 4-6 hour stretch is more typical for some older babies or longer night stretches, not a default for every newborn.",
    },
    warningSigns: {
      zh: "如果新生儿前几周睡很久漏掉多次喂养、吃奶变差、尿布减少或精神差，建议联系儿科医生确认是否需要叫醒喂。",
      en: "If a newborn in the first weeks sleeps long stretches and misses feeds, feeds poorly, has fewer wet diapers, or seems unusually sleepy, ask your pediatrician whether to wake for feeds.",
    },
    sources: [
      {
        label: "CDC formula feeding",
        url: "https://www.cdc.gov/infant-toddler-nutrition/formula-feeding/how-much-and-how-often.html",
      },
      {
        label: "HealthyChildren formula schedule",
        url: "https://www.healthychildren.org/English/ages-stages/baby/formula-feeding/Pages/amount-and-schedule-of-formula-feedings.aspx",
      },
    ],
  },
  {
    id: "sleep-4-month-night-waking",
    title: "Four month night waking",
    ageRangeMonths: { min: 3, max: 5 },
    topics: ["sleep"],
    keywords: ["4个月", "四个月", "晚上", "夜里", "半夜", "醒", "夜醒", "sleep regression", "wake", "night waking"],
    answer: {
      zh: "4 个月宝宝晚上反复醒很常见。这个阶段睡眠周期在变成熟，宝宝可能更容易在周期交界醒来，也可能受白天刺激、猛长期、出牙前后或入睡联想影响。先不用急着追求一觉到天亮，可以从固定睡前流程、低光低声音、夜里先观察 30-60 秒再安抚开始。",
      en: "Frequent night waking is common around 4 months. Sleep cycles are maturing, so babies may wake between cycles; daytime stimulation, growth changes, teething, or sleep associations can also play a role. Start with a consistent bedtime routine, low light and quiet voice, and pausing 30-60 seconds before soothing.",
    },
    warningSigns: {
      zh: "如果夜醒伴随发烧、呼吸异常、吃奶明显变差、湿尿布减少或精神很差，建议联系儿科医生。",
      en: "If night waking comes with fever, breathing changes, poor feeding, fewer wet diapers, or unusual low energy, contact your pediatrician.",
    },
    sources: [
      {
        label: "HealthyChildren safe sleep",
        url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/a-parents-guide-to-safe-sleep.aspx",
      },
    ],
  },
  {
    id: "diaper-newborn-poop-frequency",
    title: "Newborn poop frequency",
    ageRangeMonths: { min: 0, max: 2 },
    topics: ["diaper"],
    keywords: ["新生儿", "大便", "便便", "拉", "粑粑", "poop", "stool", "bowel"],
    answer: {
      zh: "新生儿大便次数差异很大。出生后前 1-2 天通常是黑绿色、黏黏的胎便；到第一周末，很多宝宝一天可以 5-10 次，也可能吃奶后就拉。之后次数可能下降。比次数更重要的是大便是否柔软、吃奶和湿尿布是否正常、精神状态是否还可以。",
      en: "Newborn poop frequency varies widely. In the first 1-2 days, babies usually pass dark sticky meconium. By the end of the first week, many newborns may poop 5-10 times a day, sometimes after feeds. Frequency often changes later; soft stool, feeding, wet diapers, and alertness matter more than the exact number.",
    },
    warningSigns: {
      zh: "白色/灰白色大便、明显带血、黑便不是出生最初几天的胎便、腹胀疼痛、持续呕吐、吃奶差或精神差，建议联系儿科医生。",
      en: "Call your pediatrician for white or gray stool, blood, black stool outside the early meconium days, swollen painful belly, repeated vomiting, poor feeding, or unusual low energy.",
    },
    sources: [
      {
        label: "HealthyChildren poop frequency",
        url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/Pooping-By-the-Numbers.aspx",
      },
      {
        label: "MyHealth Alberta newborn bowel movements",
        url: "https://myhealth.alberta.ca/Health/aftercareinformation/pages/conditions.aspx?hwid=abn2712",
      },
    ],
  },
  {
    id: "diaper-wet-diaper-hydration",
    title: "Wet diapers and hydration",
    ageRangeMonths: { min: 0, max: 12 },
    topics: ["diaper"],
    keywords: ["湿尿布", "尿", "尿少", "小便", "pee", "wet diaper", "urine", "dehydration"],
    answer: {
      zh: "湿尿布主要帮助判断宝宝摄入和补水情况。一天内小波动可以继续观察；更重要的是有没有突然明显减少，以及宝宝吃奶、精神状态和体重增长是否正常。",
      en: "Wet diapers help you judge intake and hydration. Small day-to-day changes can be watched; what matters more is a sudden clear drop, plus feeding, alertness, and growth.",
    },
    warningSigns: {
      zh: "如果湿尿布突然明显变少、嘴唇很干、哭没有眼泪、囟门凹陷或精神变差，建议尽快联系儿科医生。",
      en: "If wet diapers suddenly drop, lips are very dry, there are no tears when crying, the soft spot looks sunken, or baby seems unusually low-energy, contact your pediatrician promptly.",
    },
    sources: [
      {
        label: "Mayo Clinic newborn feeding",
        url: "https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/healthy-baby/art-20047741",
      },
    ],
  },
  {
    id: "parent-support-overwhelmed",
    title: "Overwhelmed parent support",
    ageRangeMonths: { min: 0, max: 12 },
    topics: ["parent-support"],
    keywords: ["崩溃", "焦虑", "撑不住", "压力", "累", "overwhelmed", "anxious", "exhausted", "stress"],
    answer: {
      zh: "你不是做得不好，你是在一个高消耗阶段里一直撑着。先把下一步缩小：确认宝宝在安全位置，喝几口水，慢慢呼气 3 次，然后只处理下一件最小的事。",
      en: "This does not mean you are doing badly; it means you are carrying a lot in a high-demand season. Make the next step smaller: put baby somewhere safe, take a few sips of water, exhale slowly 3 times, then handle only the next smallest task.",
    },
    warningSigns: {
      zh: "如果你担心自己会伤害自己或宝宝，请立刻让另一个成年人接手宝宝，并拨打 911；心理危机可拨打或短信 988。",
      en: "If you might hurt yourself or your baby, have another adult take over the baby immediately and call 911; for mental health crisis support, call or text 988.",
    },
    sources: [
      {
        label: "988 Lifeline",
        url: "https://988lifeline.org/",
      },
      {
        label: "National Maternal Mental Health Hotline",
        url: "https://mchb.hrsa.gov/programs-impact/national-maternal-mental-health-hotline",
      },
    ],
  },
];
