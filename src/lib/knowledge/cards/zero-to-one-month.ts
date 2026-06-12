import type { BabyCareKnowledgeCard } from "../baby-care-cards";

export const zeroToOneMonthCards: BabyCareKnowledgeCard[] = [
  {
    id: "feeding-breastfed-newborn-frequency",
    title: "Newborn breastfeeding rhythm",
    ageRangeMonths: { min: 0, max: 1 },
    topics: ["feeding"],
    keywords: ["新生儿", "母乳", "亲喂", "breastfeeding", "breastfed", "nursing", "2-3", "多久", "饿", "喂养"],
    answer: {
      zh: "新生儿母乳喂养常见是按需喂，很多宝宝大约每 2-3 小时想吃一次，也可能在某些时段更密集。更轻松的判断方式是看饥饿信号、吞咽、吃完能否放松、湿尿布和体重趋势，而不是只盯时钟。",
      en: "Newborn breastfeeding is usually cue-based. Many babies feed about every 2-3 hours, and sometimes more often during cluster feeding. Watch hunger cues, swallowing, settled periods after feeds, wet diapers, and weight trend rather than the clock alone.",
    },
    warningSigns: {
      zh: "如果宝宝很难叫醒吃奶、吃奶明显变差、湿尿布减少、精神很差，建议联系儿科医生或哺乳顾问。",
      en: "If baby is hard to wake for feeds, feeds much less than usual, has fewer wet diapers, or seems unusually low-energy, contact your pediatrician or a lactation consultant.",
    },
    sources: [
      { label: "CDC breastfeeding frequency", url: "https://www.cdc.gov/infant-toddler-nutrition/breastfeeding/how-much-and-how-often.html" },
      { label: "AAP breastfeeding", url: "https://www.aap.org/en/patient-care/newborn-infant-and-early-childhood-nutrition/newborn-and-infant-breastfeeding/" },
    ],
  },
  {
    id: "feeding-formula-newborn-frequency",
    title: "Newborn formula rhythm",
    ageRangeMonths: { min: 0, max: 1 },
    topics: ["feeding"],
    keywords: ["新生儿", "奶粉", "水奶", "配方奶", "formula", "ready-to-feed", "1-2", "2-3", "几小时"],
    answer: {
      zh: "新生儿配方奶早期通常少量多次，前几天可能每 2-3 小时 1-2 oz 左右，之后会随着胃容量增加慢慢变多。4-6 小时更像较大月龄或夜间长睡段，不适合作为新生儿默认间隔。",
      en: "Newborn formula feeding often starts with small, frequent feeds. In the first days, many babies take about 1-2 oz every 2-3 hours, then gradually take more as their stomach grows. A 4-6 hour gap is more typical for older babies or longer night stretches, not a default for newborns.",
    },
    warningSigns: {
      zh: "如果新生儿连续错过多次喂养、吃奶变差、吐得多、尿布减少或精神差，请联系儿科医生。",
      en: "If a newborn misses multiple feeds, feeds poorly, vomits a lot, has fewer wet diapers, or seems unusually sleepy, contact your pediatrician.",
    },
    sources: [
      { label: "CDC formula feeding", url: "https://www.cdc.gov/infant-toddler-nutrition/formula-feeding/how-much-and-how-often.html" },
      { label: "HealthyChildren formula schedule", url: "https://www.healthychildren.org/English/ages-stages/baby/formula-feeding/Pages/amount-and-schedule-of-formula-feedings.aspx" },
    ],
  },
  {
    id: "diaper-newborn-poop-frequency",
    title: "Newborn poop and meconium",
    ageRangeMonths: { min: 0, max: 1 },
    topics: ["diaper"],
    keywords: ["新生儿", "胎便", "大便", "便便", "拉", "粑粑", "poop", "stool", "meconium", "bowel"],
    answer: {
      zh: "新生儿大便次数差异很大。出生后前 1-2 天通常是黑绿色、黏黏的胎便；到第一周末，很多宝宝一天可以 5-10 次，也可能吃奶后就拉。之后次数可能下降。比次数更重要的是大便是否柔软、吃奶和湿尿布是否正常、精神状态是否还可以。",
      en: "Newborn poop frequency varies widely. In the first 1-2 days, babies usually pass dark sticky meconium. By the end of the first week, many newborns may poop 5-10 times a day, sometimes after feeds. Frequency often changes later; soft stool, feeding, wet diapers, and alertness matter more than the exact number.",
    },
    warningSigns: {
      zh: "白色/灰白色大便、明显带血、黑便不是出生最初几天的胎便、腹胀疼痛、持续呕吐、吃奶差或精神差，建议联系儿科医生。",
      en: "Call your pediatrician for white or gray stool, blood, black stool outside the early meconium days, swollen painful belly, repeated vomiting, poor feeding, or unusual low energy.",
    },
    sources: [
      { label: "HealthyChildren poop frequency", url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/Pooping-By-the-Numbers.aspx" },
      { label: "MyHealth Alberta newborn bowel movements", url: "https://myhealth.alberta.ca/Health/aftercareinformation/pages/conditions.aspx?hwid=abn2712" },
    ],
  },
  {
    id: "diaper-newborn-wet-diapers",
    title: "Newborn wet diapers",
    ageRangeMonths: { min: 0, max: 1 },
    topics: ["diaper"],
    keywords: ["新生儿", "湿尿布", "尿", "尿少", "小便", "pee", "wet diaper", "urine", "dehydration"],
    answer: {
      zh: "湿尿布是判断新生儿摄入和补水的实用信号。出生最初几天尿布会逐渐增加；之后如果吃奶顺利，通常会看到更稳定的湿尿布。记录不用完美，重点是有没有突然明显变少。",
      en: "Wet diapers are a practical signal for newborn intake and hydration. They usually increase over the first days after birth, then become steadier when feeding is going well. Logs do not need to be perfect; watch for a clear sudden drop.",
    },
    warningSigns: {
      zh: "如果湿尿布突然明显减少、嘴唇很干、哭没有眼泪、囟门凹陷、吃奶差或精神变差，请尽快联系儿科医生。",
      en: "If wet diapers clearly drop, lips are very dry, there are no tears, the soft spot looks sunken, feeding is poor, or baby seems low-energy, contact your pediatrician promptly.",
    },
    sources: [
      { label: "Mayo Clinic newborn feeding", url: "https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/healthy-baby/art-20047741" },
    ],
  },
  {
    id: "sleep-newborn-safe-sleep",
    title: "Newborn safe sleep",
    ageRangeMonths: { min: 0, max: 1 },
    topics: ["sleep", "safety"],
    keywords: ["新生儿", "安全睡眠", "睡觉", "仰睡", "婴儿床", "趴睡", "safe sleep", "back to sleep", "crib"],
    answer: {
      zh: "新生儿睡眠最重要的是安全：每次睡觉都仰睡，放在平坦、结实、独立的睡眠表面，床里不要放枕头、被子、毛绒玩具或防撞垫。新生儿睡眠很碎很正常，先把“安全睡”放在“睡很久”前面。",
      en: "For newborn sleep, safety comes first: place baby on their back for every sleep, on a firm flat separate sleep surface, with no pillows, blankets, stuffed toys, or bumper pads. Newborn sleep is fragmented; safe sleep matters before long sleep.",
    },
    warningSigns: {
      zh: "如果宝宝呼吸异常、嘴唇发紫、叫不醒，或你担心有立即危险，请拨打当地紧急电话。",
      en: "If baby has abnormal breathing, blue lips, cannot be awakened, or you think there is immediate danger, call local emergency services.",
    },
    sources: [
      { label: "AAP safe sleep", url: "https://www.aap.org/en/patient-care/safe-sleep/" },
      { label: "HealthyChildren safe sleep", url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/a-parents-guide-to-safe-sleep.aspx" },
    ],
  },
  {
    id: "safety-newborn-jaundice-fever",
    title: "Newborn jaundice and fever reminders",
    ageRangeMonths: { min: 0, max: 1 },
    topics: ["safety"],
    keywords: ["新生儿", "黄疸", "发烧", "发热", "体温", "100.4", "38", "jaundice", "fever", "temperature", "找医生"],
    answer: {
      zh: "新生儿黄疸很常见，但需要观察是否越来越黄、吃奶变差、很难叫醒，或大便颜色变浅。3 个月以内宝宝如果直肠温度达到 100.4°F/38°C，通常需要马上联系医生确认下一步。",
      en: "Newborn jaundice is common, but watch whether yellowing worsens, feeding drops, baby is hard to wake, or stools become pale. For babies under 3 months, a rectal temperature of 100.4°F/38°C generally means you should contact a doctor right away.",
    },
    warningSigns: {
      zh: "如果宝宝叫不醒、非常虚弱、呼吸异常、发紫，或你觉得有生命危险，请拨打 911 或当地紧急服务。",
      en: "If baby cannot be awakened, is very weak, has abnormal breathing, turns blue, or you think there is life-threatening danger, call 911 or local emergency services.",
    },
    sources: [
      { label: "HealthyChildren fever and baby", url: "https://www.healthychildren.org/English/health-issues/conditions/fever/Pages/Fever-and-Your-Baby.aspx" },
      { label: "HealthyChildren jaundiced newborn", url: "https://www.healthychildren.org/English/tips-tools/symptom-checker/Pages/symptomviewer.aspx?symptom=Jaundiced+Newborn" },
    ],
  },
  {
    id: "parent-support-newborn-survival-mode",
    title: "Newborn parent survival mode",
    ageRangeMonths: { min: 0, max: 1 },
    topics: ["parent-support", "crying"],
    keywords: ["新生儿", "崩溃", "焦虑", "累", "哭", "睡不着", "撑不住", "overwhelmed", "postpartum", "exhausted"],
    answer: {
      zh: "新生儿期像在用碎片时间生活。你不需要把一天带得完美，只需要把下一段 2-3 小时过稳：宝宝在安全位置、有人吃到东西、有人换过尿布、你喝一点水。能求助就求助，这是照护的一部分。",
      en: "The newborn stage can feel like living in fragments. You do not need a perfect day; aim for the next 2-3 hour block: baby is safe, fed, changed, and you get water. Asking for help is part of care.",
    },
    warningSigns: {
      zh: "如果你担心自己会伤害自己或宝宝，请先把宝宝放到安全的地方，立刻找真人接手；美国/加拿大紧急危险拨 911，心理危机可拨打或短信 988。",
      en: "If you might hurt yourself or your baby, place baby somewhere safe and get a real person involved immediately. In the U.S. or Canada, call 911 for immediate danger and call or text 988 for mental health crisis support.",
    },
    sources: [
      { label: "988 Lifeline", url: "https://988lifeline.org/" },
      { label: "National Maternal Mental Health Hotline", url: "https://mchb.hrsa.gov/programs-impact/national-maternal-mental-health-hotline" },
    ],
  },
];
