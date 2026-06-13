import type { BabyCareKnowledgeCard } from "../baby-care-cards";

export const eighteenToTwentyFourMonthCards: BabyCareKnowledgeCard[] = [
  {
    id: "feeding-eighteen-to-twenty-four-picky-eating",
    title: "Picky eating and meals at 18-24 months",
    ageRangeMonths: { min: 18, max: 24 },
    topics: ["feeding"],
    keywords: ["18个月", "19个月", "20个月", "21个月", "22个月", "23个月", "24个月", "2岁", "挑食", "不吃菜", "只喝奶", "零食", "三餐", "picky eating", "toddler meals"],
    answer: {
      zh: "18-24 个月挑食可能更明显，因为自主性变强。做法不是追着喂，而是保持可预测节奏：三餐、1-2 次小点心，反复提供熟悉食物加一点新食物。奶和零食不要全天自由供应，否则孩子更难在正餐有胃口。",
      en: "At 18-24 months, picky eating can intensify as autonomy grows. Avoid chasing with food; keep a predictable rhythm of meals and 1-2 snacks, with familiar foods plus a small new item. Avoid all-day milk or snack grazing so meals have a chance.",
    },
    warningSigns: {
      zh: "如果食物种类越来越少、体重/生长担心、吞咽或呛咳问题、持续呕吐或明显便秘，请联系儿科医生。",
      en: "Contact your pediatrician if the food range keeps shrinking, growth is concerning, swallowing/choking issues occur, vomiting persists, or constipation is significant.",
    },
    sources: [
      { label: "CDC foods and drinks 6-24 months", url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/index.html" },
      { label: "CDC foods to encourage", url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/foods-and-drinks-to-encourage.html" },
    ],
  },
  {
    id: "development-eighteen-to-twenty-four-language",
    title: "Language growth at 18-24 months",
    ageRangeMonths: { min: 18, max: 24 },
    topics: ["development"],
    keywords: ["18个月", "19个月", "20个月", "21个月", "22个月", "23个月", "24个月", "2岁", "语言", "说话", "词汇", "双语", "不会说", "language", "speech", "two words"],
    answer: {
      zh: "18-24 个月常见会从单词、手势和理解，慢慢走向更多词和两词组合。双语家庭可以把两种语言都算进沟通能力。重点看：能不能理解日常指令、指物分享、模仿声音/词、逐渐增加表达。每天跟着孩子兴趣说短句，比要求“说一遍”更有效。",
      en: "At 18-24 months, many toddlers move from single words and gestures toward more words and two-word combinations. In bilingual homes, count communication across both languages. Watch understanding, pointing to share, imitation, and gradually increasing expression. Short phrases tied to the child's interest help more than demanding repetition.",
    },
    warningSigns: {
      zh: "如果到2岁没有两词组合、很少理解简单指令、没有指物/眼神互动、听力担心或技能倒退，请联系儿科医生或早期干预。",
      en: "Ask your pediatrician or early intervention if by age 2 there are no two-word phrases, limited understanding of simple directions, no pointing/eye contact, hearing concerns, or loss of skills.",
    },
    sources: [
      { label: "CDC milestones by 18 months", url: "https://www.cdc.gov/act-early/milestones/18-months.html" },
      { label: "CDC milestones by 2 years", url: "https://www.cdc.gov/act-early/milestones/2-years.html" },
    ],
  },
  {
    id: "diaper-eighteen-to-twenty-four-potty-training",
    title: "Potty training readiness at 18-24 months",
    ageRangeMonths: { min: 18, max: 24 },
    topics: ["diaper", "development"],
    keywords: ["18个月", "19个月", "20个月", "21个月", "22个月", "23个月", "24个月", "2岁", "如厕", "厕所", "马桶", "戒尿布", "potty", "toilet training"],
    answer: {
      zh: "18-24 个月可以认真观察如厕准备，但不必把训练变成硬任务。准备信号包括：能保持尿布干一段时间、能坐上小马桶、能拉下裤子或配合、能表达要尿/要拉、对厕所感兴趣。先从固定时间坐一小会儿、正向鼓励开始，避免惩罚和羞辱。",
      en: "At 18-24 months, you can watch readiness more closely without forcing training. Signs include staying dry for stretches, sitting on the potty, helping with pants, communicating pee/poop, and showing interest. Start with brief predictable sits and positive encouragement; avoid punishment or shame.",
    },
    warningSigns: {
      zh: "尿痛、血尿、严重便秘、排便恐惧、突然尿频尿急或明显疼痛，请联系儿科医生。",
      en: "Contact your pediatrician for painful urination, blood in urine, severe constipation, fear/pain around stooling, sudden urgency/frequency, or clear pain.",
    },
    sources: [
      { label: "HealthyChildren potty training", url: "https://www.healthychildren.org/English/ages-stages/toddler/toilet-training/Pages/default.aspx" },
      { label: "HealthyChildren potty readiness", url: "https://www.healthychildren.org/English/ages-stages/toddler/toilet-training/Pages/How-to-Tell-When-Your-Child-is-Ready.aspx" },
    ],
  },
  {
    id: "crying-eighteen-to-twenty-four-tantrums",
    title: "Tantrums at 18-24 months",
    ageRangeMonths: { min: 18, max: 24 },
    topics: ["crying", "development", "parent-support"],
    keywords: ["18个月", "19个月", "20个月", "21个月", "22个月", "23个月", "24个月", "2岁", "tantrum", "发脾气", "崩溃", "打人", "咬人", "哭闹", "情绪"],
    answer: {
      zh: "18-24 个月 tantrum 很常见：孩子想自主，但语言和冲动控制还不成熟。先保证安全、你尽量降低声音；用一句话命名情绪，再守住边界。可以给有限选择，比如“你自己走到门口，还是我抱你过去”。平静后再复盘，不在爆发中讲大道理。",
      en: "Tantrums are common at 18-24 months: toddlers want autonomy while language and impulse control are still developing. Keep everyone safe, lower your voice, name the feeling briefly, and hold the limit. Offer limited choices. Debrief after calm returns, not during the storm.",
    },
    warningSigns: {
      zh: "如果 tantrum 经常持续很久、严重自伤/伤人、发育倒退、你担心安全，或父母快要失控，请联系儿科医生、早期干预或危机支持。",
      en: "Seek support if tantrums are very prolonged, involve serious self-injury/aggression, come with regression, safety is a concern, or a caregiver feels close to losing control.",
    },
    sources: [
      { label: "HealthyChildren tantrums", url: "https://www.healthychildren.org/English/family-life/family-dynamics/communication-discipline/Pages/Temper-Tantrums.aspx" },
      { label: "AAP handling big emotions", url: "https://www.aap.org/en/patient-care/media-and-children/center-of-excellence-on-social-media-and-youth-mental-health/qa-portal/qa-portal-library/qa-portal-library-questions/handling-big-emotions/" },
    ],
  },
  {
    id: "feeding-eighteen-to-twenty-four-weaning",
    title: "Weaning at 18-24 months",
    ageRangeMonths: { min: 18, max: 24 },
    topics: ["feeding", "sleep", "parent-support"],
    keywords: ["18个月", "19个月", "20个月", "21个月", "22个月", "23个月", "24个月", "2岁", "断奶", "夜奶", "奶瓶", "戒奶瓶", "weaning", "night weaning", "bottle"],
    answer: {
      zh: "18-24 个月断奶常常不只是营养问题，也是安抚和亲密方式的改变。可以先固定白天三餐和睡前流程，再一次只减少一个奶次。夜奶可以用“先抱抱/喝水/固定安抚语”替代。越是大孩子，越需要提前预告和一致边界。",
      en: "At 18-24 months, weaning is often about comfort and connection, not only nutrition. Stabilize meals and bedtime routines first, then reduce one feed at a time. For night weaning, replace with cuddles, water, and a consistent phrase. Older toddlers benefit from previewing and consistent limits.",
    },
    warningSigns: {
      zh: "如果断奶后进食/喝水明显不足、尿布减少、体重担心、睡眠严重恶化很多周，或父母情绪明显低落，请联系专业支持。",
      en: "Seek support if intake/fluid drops, wet diapers decrease, growth is concerning, sleep worsens severely for weeks, or caregiver mood drops significantly.",
    },
    sources: [
      { label: "CDC foods and drinks 6-24 months", url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/index.html" },
      { label: "National Maternal Mental Health Hotline", url: "https://mchb.hrsa.gov/programs-impact/national-maternal-mental-health-hotline" },
    ],
  },
  {
    id: "sleep-eighteen-to-twenty-four-nap-resistance",
    title: "Nap resistance and sleep at 18-24 months",
    ageRangeMonths: { min: 18, max: 24 },
    topics: ["sleep"],
    keywords: ["18个月", "19个月", "20个月", "21个月", "22个月", "23个月", "24个月", "2岁", "午睡", "nap", "不睡", "拒睡", "夜醒", "睡眠倒退"],
    answer: {
      zh: "18-24 个月很多孩子还需要午睡，但会出现拒睡、拖延和分离焦虑。先不要立刻取消 nap；可以固定午睡前流程、降低刺激、把午睡时间微调 15-30 分钟。如果真的不睡，也可以保留安静时间，避免傍晚过度疲劳。",
      en: "Many 18-24 month toddlers still need a nap but may resist, stall, or show separation anxiety. Do not drop the nap too quickly; keep a short pre-nap routine, lower stimulation, and adjust timing by 15-30 minutes. If sleep does not happen, keep quiet time to prevent evening overtiredness.",
    },
    warningSigns: {
      zh: "如果睡眠变化伴随打鼾/呼吸暂停、发烧、疼痛、白天嗜睡严重或发育倒退，请联系儿科医生。",
      en: "Contact your pediatrician if sleep changes come with snoring/apnea, fever, pain, severe daytime sleepiness, or developmental regression.",
    },
    sources: [
      { label: "HealthyChildren toddler sleep", url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/default.aspx" },
      { label: "CDC milestones by 2 years", url: "https://www.cdc.gov/act-early/milestones/2-years.html" },
    ],
  },
  {
    id: "safety-eighteen-to-twenty-four-running-climbing",
    title: "Safety for fast toddlers",
    ageRangeMonths: { min: 18, max: 24 },
    topics: ["safety", "development"],
    keywords: ["18个月", "19个月", "20个月", "21个月", "22个月", "23个月", "24个月", "2岁", "安全", "跑", "爬高", "外出", "停车场", "呛噎", "running", "climbing", "choking"],
    answer: {
      zh: "18-24 个月行动快、冲动控制弱，安全策略要靠环境而不是说教：门锁、药品清洁剂上锁、家具固定、厨房热源远离、外出牵手或抱起。食物继续切小，葡萄/热狗等圆硬食物要纵向切开，坚果爆米花这类高风险食物避免。",
      en: "At 18-24 months, toddlers move fast with limited impulse control, so safety should rely on the environment more than explanations: locks, secured medicines/cleaners, anchored furniture, hot items out of reach, and hand-holding or carrying outside. Keep foods small and avoid high-choking-risk items.",
    },
    warningSigns: {
      zh: "呛噎无法咳出、呼吸困难、跌落后异常嗜睡/呕吐/抽搐，或你担心严重伤害，请拨打 911 或急诊。",
      en: "Call 911 or seek urgent care for choking without effective coughing, trouble breathing, unusual sleepiness/vomiting/seizure after a fall, or concern for serious injury.",
    },
    sources: [
      { label: "CDC infant and toddler safety", url: "https://www.cdc.gov/parents/infants/safety.html" },
      { label: "CDC foods and drinks 6-24 months", url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/index.html" },
    ],
  },
  {
    id: "parent-support-eighteen-to-twenty-four-autonomy",
    title: "Parent support for toddler autonomy",
    ageRangeMonths: { min: 18, max: 24 },
    topics: ["parent-support", "crying"],
    keywords: ["18个月", "19个月", "20个月", "21个月", "22个月", "23个月", "24个月", "2岁", "累", "崩溃", "不听话", "terrible twos", "压力", "自主", "边界"],
    answer: {
      zh: "18-24 个月不是“故意跟你作对”，而是在练自主、语言和边界。父母最省力的组合通常是：提前预告、少量选择、固定流程、危险问题不协商。你可以温柔，也可以坚定；这两个并不冲突。",
      en: "At 18-24 months, toddlers are not simply trying to defy you; they are practicing autonomy, language, and limits. The lower-friction mix is previewing transitions, offering limited choices, keeping routines, and not negotiating safety. You can be warm and firm at the same time.",
    },
    warningSigns: {
      zh: "如果你觉得自己会失控、会伤害自己或孩子，请让孩子到安全处，找真人接手；美国/加拿大紧急危险拨 911，心理危机拨或短信 988，美国孕产/产后热线 1-833-TLC-MAMA。",
      en: "If you might lose control or hurt yourself/child, put the child somewhere safe and get real-person help. In the U.S. or Canada call 911 for danger, call/text 988 for crisis support, and in the U.S. call/text 1-833-TLC-MAMA for maternal mental health.",
    },
    sources: [
      { label: "HealthyChildren tantrums", url: "https://www.healthychildren.org/English/family-life/family-dynamics/communication-discipline/Pages/Temper-Tantrums.aspx" },
      { label: "988 Lifeline", url: "https://988lifeline.org/" },
    ],
  },
];
