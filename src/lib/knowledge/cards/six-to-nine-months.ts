import type { BabyCareKnowledgeCard } from "../baby-care-cards";

export const sixToNineMonthCards: BabyCareKnowledgeCard[] = [
  {
    id: "feeding-six-to-nine-solids-rhythm",
    title: "Solids rhythm at 6-9 months",
    ageRangeMonths: { min: 6, max: 9 },
    topics: ["feeding"],
    keywords: ["6个月", "7个月", "8个月", "辅食", "固体食物", "三餐", "solids", "puree", "finger food", "meal"],
    answer: {
      zh: "6-9 个月辅食重点是练习和探索，母乳或配方奶仍是主要营养来源。可以从少量、单一食材、铁含量较好的食物开始，慢慢增加质地和种类。吃得少不等于失败，这个阶段更像学习吃饭。",
      en: "At 6-9 months, solids are for practice and exploration while breast milk or formula remains the main nutrition. Start with small amounts, single-ingredient foods, and iron-rich options, then gradually add textures and variety. Eating little does not mean failure; this stage is learning.",
    },
    warningSigns: {
      zh: "如果宝宝吞咽困难、频繁呛咳、体重增长担心，或吃东西后出现荨麻疹、脸/唇肿、呼吸困难，请联系医生；呼吸困难要急救。",
      en: "Ask a doctor about swallowing trouble, frequent choking/coughing, growth concerns, or hives/swelling after foods. Trouble breathing is emergency care.",
    },
    sources: [
      { label: "CDC introduce solid foods", url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/when-what-and-how-to-introduce-solid-foods.html" },
    ],
  },
  {
    id: "feeding-six-to-nine-allergen-introduction",
    title: "Allergen introduction",
    ageRangeMonths: { min: 6, max: 9 },
    topics: ["feeding", "safety"],
    keywords: ["过敏", "花生", "鸡蛋", "海鲜", "小麦", "allergen", "allergy", "peanut", "egg", "introduce"],
    answer: {
      zh: "开始辅食后，常见过敏食物可以像其他食物一样逐步引入。更稳的做法是一次只加一种新食物，观察 3-5 天，再加下一种。花生酱这类要调稀，避免整颗坚果等窒息风险。",
      en: "After solids begin, common allergens can be introduced gradually like other foods. A steadier approach is one new food at a time, watching 3-5 days before another. Thin peanut butter and avoid whole nuts or other choking hazards.",
    },
    warningSigns: {
      zh: "如果有呼吸困难、脸/唇/舌头肿、反复呕吐、全身荨麻疹或精神变差，请按急症处理。",
      en: "Treat trouble breathing, face/lip/tongue swelling, repeated vomiting, widespread hives, or low energy as urgent.",
    },
    sources: [
      { label: "CDC introduce allergenic foods", url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/when-what-and-how-to-introduce-solid-foods.html" },
      { label: "Caring for Kids first-year feeding", url: "https://caringforkids.cps.ca/handouts/pregnancy-and-babies/feeding_your_baby_in_the_first_year" },
    ],
  },
  {
    id: "safety-six-to-nine-choking-babyproofing",
    title: "Choking and babyproofing at 6-9 months",
    ageRangeMonths: { min: 6, max: 9 },
    topics: ["safety"],
    keywords: ["噎住", "呛到", "窒息", "辅食安全", "babyproof", "安全", "choking", "gagging", "small objects", "crawling safety"],
    answer: {
      zh: "6-9 个月开始辅食和移动后，安全重点是防噎和防够到危险物。食物要坐着吃、有人看着、切成合适大小，避免整颗葡萄、坚果、爆米花、硬块、厚花生酱团等高风险食物。地面要清小物、硬币、电池、磁铁、电线和清洁用品。",
      en: "At 6-9 months, solids and movement shift safety toward choking prevention and babyproofing. Feed baby seated and supervised, prepare food in safe sizes, and avoid whole grapes, nuts, popcorn, hard chunks, thick globs of peanut butter, and other high-risk foods. Clear small objects, coins, batteries, magnets, cords, and cleaners from the floor.",
    },
    warningSigns: {
      zh: "如果宝宝无法咳出、不能哭/发声、呼吸困难或发紫，请立即按急救处理并拨打 911。",
      en: "If baby cannot cough it out, cannot cry/make sounds, has trouble breathing, or turns blue, treat it as an emergency and call 911.",
    },
    sources: [
      { label: "CDC choking hazards", url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/choking-hazards.html" },
      { label: "HealthyChildren choking prevention", url: "https://www.healthychildren.org/English/health-issues/injuries-emergencies/pages/Choking-Prevention.aspx" },
    ],
  },
  {
    id: "sleep-six-to-nine-night-waking",
    title: "Night waking at 6-9 months",
    ageRangeMonths: { min: 6, max: 9 },
    topics: ["sleep"],
    keywords: ["6个月", "7个月", "8个月", "夜醒", "晚上醒", "睡眠倒退", "night waking", "sleep regression", "teething"],
    answer: {
      zh: "6-9 个月夜醒可能和出牙、练习坐爬、分离焦虑、白天睡眠变化有关。先看白天总睡眠是否过多或过少、睡前流程是否稳定、夜里是否用同一种低刺激方式回应。目标是可重复，不是马上睡整夜。",
      en: "Night waking at 6-9 months can relate to teething, practicing sitting/crawling, separation anxiety, or nap changes. Check whether daytime sleep is too much/too little, keep bedtime consistent, and respond at night in a low-stimulation repeatable way.",
    },
    warningSigns: {
      zh: "如果夜醒伴随发烧、呼吸异常、明显疼痛、吃奶变差、尿布减少或精神差，请联系儿科医生。",
      en: "Contact your pediatrician if night waking comes with fever, breathing changes, significant pain, poor feeding, fewer wet diapers, or low energy.",
    },
    sources: [
      { label: "HealthyChildren baby sleep", url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/default.aspx" },
    ],
  },
  {
    id: "diaper-six-to-nine-solids-constipation",
    title: "Poop changes after solids",
    ageRangeMonths: { min: 6, max: 9 },
    topics: ["diaper", "feeding"],
    keywords: ["辅食后", "便秘", "大便变硬", "硬便", "poop", "constipation", "solids", "stool"],
    answer: {
      zh: "开始辅食后，大便颜色、气味、质地变明显很常见。可以用少量多样食物、合适的水量、含纤维的蔬果来帮助节奏。真正要留意的是硬球状便、排便痛苦、明显带血或持续腹胀。",
      en: "After solids, stool color, smell, and texture often change. Variety, appropriate water with meals, and fiber-containing fruits/vegetables can help rhythm. Watch for hard pellet stools, painful stooling, clear blood, or ongoing belly swelling.",
    },
    warningSigns: {
      zh: "如果便血、持续呕吐、腹部明显胀痛、精神差，或便秘反复让你担心，请联系儿科医生。",
      en: "Contact your pediatrician for blood, repeated vomiting, marked belly pain/swelling, low energy, or recurring constipation worries.",
    },
    sources: [
      { label: "HealthyChildren infant constipation", url: "https://www.healthychildren.org/English/ages-stages/baby/diapers-clothing/Pages/Infant-Constipation.aspx" },
      { label: "CDC solid foods", url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/when-what-and-how-to-introduce-solid-foods.html" },
    ],
  },
  {
    id: "development-six-to-nine-sit-crawl",
    title: "Sitting and crawling development",
    ageRangeMonths: { min: 6, max: 9 },
    topics: ["development", "safety"],
    keywords: ["坐", "爬", "翻身", "发育", "里程碑", "sitting", "crawl", "crawling", "milestone", "9个月"],
    answer: {
      zh: "6-9 个月很多宝宝会从坐得更稳、转身拿玩具，到尝试匍匐、爬或用自己的方式移动。爬的形式差异很大。你可以多给地面时间、安全玩具和够得到但需要努力的小距离。",
      en: "At 6-9 months, many babies move from steadier sitting and reaching to scooting, crawling, or another way of moving. Crawling styles vary a lot. Floor time, safe toys, and just-out-of-reach practice help.",
    },
    warningSigns: {
      zh: "如果宝宝明显不会用一侧身体、动作退步、非常软/僵，或你担心发育，请联系儿科医生。",
      en: "Contact your pediatrician if baby uses one side much less, loses skills, seems very floppy/stiff, or you are worried about development.",
    },
    sources: [
      { label: "CDC milestones by 6 months", url: "https://www.cdc.gov/act-early/milestones/6-months.html" },
      { label: "CDC milestones by 9 months", url: "https://www.cdc.gov/act-early/milestones/9-months.html" },
    ],
  },
  {
    id: "crying-six-to-nine-separation-anxiety",
    title: "Separation anxiety",
    ageRangeMonths: { min: 6, max: 9 },
    topics: ["crying", "development", "parent-support"],
    keywords: ["分离焦虑", "认生", "粘人", "一走就哭", "separation anxiety", "clingy", "stranger anxiety", "8个月"],
    answer: {
      zh: "6-9 个月开始更粘人、认生、一离开就哭，常常是依恋和认知发展的表现，不是你把宝宝宠坏了。可以用固定告别、短暂离开再回来、让熟悉照顾者接手、在宝宝不饿不困时练习。",
      en: "At 6-9 months, clinginess, stranger anxiety, or crying when you leave can reflect attachment and cognitive development, not spoiling. Try predictable goodbyes, brief leave-and-return practice, familiar caregivers, and practicing when baby is not hungry or overtired.",
    },
    warningSigns: {
      zh: "如果宝宝持续无法安抚、伴随发烧/疼痛/吃奶差，或你因为哭闹快撑不住，请让真人接手并求助。",
      en: "If baby cannot be soothed for long periods, has fever/pain/poor feeding, or you feel close to losing control, hand baby to another adult and get help.",
    },
    sources: [
      { label: "HealthyChildren separation anxiety", url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/Emotional-and-Social-Development-8-12-Months.aspx" },
      { label: "Nemours separation anxiety", url: "https://kidshealth.org/en/parents/sep-anxiety.html" },
    ],
  },
  {
    id: "parent-support-six-to-nine-solids-stress",
    title: "Solids and parent stress",
    ageRangeMonths: { min: 6, max: 9 },
    topics: ["parent-support", "feeding"],
    keywords: ["辅食焦虑", "吃太少", "mess", "压力", "累", "solids stress", "overwhelmed"],
    answer: {
      zh: "辅食阶段很容易让父母觉得每天都在考试。你可以把目标改成“提供机会”，不是“控制吃多少”：今天一种安全食物、宝宝坐稳、你在旁边观察，就已经是在练习了。",
      en: "Solids can make parents feel tested every day. Reframe the goal as offering opportunities, not controlling intake: one safe food, baby sitting supported, and you watching nearby already counts as practice.",
    },
    warningSigns: {
      zh: "如果你因为喂养压力持续焦虑、吃不下睡不着，或害怕自己会失控，请联系医生、心理支持或信任的人。",
      en: "If feeding stress leads to ongoing anxiety, inability to eat/sleep, or fear of losing control, contact a clinician, mental health support, or someone you trust.",
    },
    sources: [
      { label: "National Maternal Mental Health Hotline", url: "https://mchb.hrsa.gov/programs-impact/national-maternal-mental-health-hotline" },
    ],
  },
];
