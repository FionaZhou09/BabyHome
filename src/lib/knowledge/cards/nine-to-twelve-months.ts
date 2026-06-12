import type { BabyCareKnowledgeCard } from "../baby-care-cards";

export const nineToTwelveMonthCards: BabyCareKnowledgeCard[] = [
  {
    id: "feeding-nine-to-twelve-milk-and-meals",
    title: "Milk and meals at 9-12 months",
    ageRangeMonths: { min: 9, max: 12 },
    topics: ["feeding"],
    keywords: ["9个月", "10个月", "11个月", "12个月", "奶量下降", "三餐", "辅食", "不爱喝奶", "milk dropping", "meals"],
    answer: {
      zh: "9-12 个月时，辅食会逐渐更像每天节奏的一部分，奶量可能慢慢下降，但母乳或配方奶仍然重要。可以往三餐节奏靠近：软烂家庭食物、手指食物、规律坐餐椅，同时继续观察尿布、精神和生长曲线。",
      en: "At 9-12 months, solids gradually become a bigger part of daily rhythm, and milk intake may slowly decrease, while breast milk or formula still matters. Move toward meal rhythm with soft family foods, finger foods, regular high-chair meals, and keep watching diapers, alertness, and growth.",
    },
    warningSigns: {
      zh: "如果宝宝明显拒奶拒食、尿布减少、体重增长担心、吞咽困难或频繁呛咳，请联系儿科医生。",
      en: "Contact your pediatrician for clear refusal of milk/food, fewer wet diapers, growth concerns, swallowing trouble, or frequent choking/coughing.",
    },
    sources: [
      { label: "CDC feeding 6-24 months", url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/how-much-and-how-often-to-feed.html" },
      { label: "Caring for Kids first-year feeding", url: "https://caringforkids.cps.ca/handouts/pregnancy-and-babies/feeding_your_baby_in_the_first_year" },
    ],
  },
  {
    id: "sleep-nine-to-twelve-nap-transition",
    title: "Nap rhythm at 9-12 months",
    ageRangeMonths: { min: 9, max: 12 },
    topics: ["sleep"],
    keywords: ["9个月", "10个月", "11个月", "12个月", "nap", "小睡", "并觉", "转觉", "白天睡", "不睡午觉"],
    answer: {
      zh: "9-12 个月很多宝宝白天会更接近 2 个 nap，但会有波动。若晚上难睡、清晨早醒或第二个 nap 很难安排，可以看总清醒时间和最后一个 nap 是否太晚。先调整 15-30 分钟，不要一天大改。",
      en: "At 9-12 months, many babies move toward two naps, with plenty of variation. If bedtime is hard, mornings get too early, or the second nap is difficult, look at total awake time and whether the last nap is too late. Adjust 15-30 minutes at a time.",
    },
    warningSigns: {
      zh: "如果睡眠变化伴随发烧、疼痛、呼吸异常、吃奶/尿布下降或精神差，请联系儿科医生。",
      en: "Contact your pediatrician if sleep changes come with fever, pain, breathing changes, reduced intake/diapers, or low energy.",
    },
    sources: [
      { label: "HealthyChildren baby sleep", url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/default.aspx" },
    ],
  },
  {
    id: "diaper-nine-to-twelve-constipation",
    title: "Constipation around more table food",
    ageRangeMonths: { min: 9, max: 12 },
    topics: ["diaper", "feeding"],
    keywords: ["便秘", "硬便", "辅食", "饭", "拉不出", "constipation", "hard stool", "table food"],
    answer: {
      zh: "9-12 个月吃得更像家庭食物后，大便可能更成形，也可能因为纤维、水分或奶/食物比例变化而变硬。可以观察食物结构、适量水、蔬果和活动量。重点不是每天都拉，而是拉出来是否柔软、不痛苦。",
      en: "At 9-12 months, stool may become more formed as table foods increase, and can harden with changes in fiber, fluid, and milk/food balance. Look at food mix, appropriate water, fruits/vegetables, and movement. Daily poop matters less than soft, comfortable poop.",
    },
    warningSigns: {
      zh: "硬球状便、便血、持续腹胀疼痛、呕吐、精神差或体重担心，请联系儿科医生。",
      en: "Contact your pediatrician for hard pellet stools, blood, ongoing belly pain/swelling, vomiting, low energy, or growth concerns.",
    },
    sources: [
      { label: "HealthyChildren infant constipation", url: "https://www.healthychildren.org/English/ages-stages/baby/diapers-clothing/Pages/Infant-Constipation.aspx" },
    ],
  },
  {
    id: "development-nine-to-twelve-standing",
    title: "Standing and first-year milestones",
    ageRangeMonths: { min: 9, max: 12 },
    topics: ["development"],
    keywords: ["站", "扶站", "走", "爬", "拍手", "挥手", "里程碑", "standing", "cruising", "first steps", "milestone"],
    answer: {
      zh: "9-12 个月常见发展包括爬或移动更熟、扶站、扶着家具走、用手指捏小物、挥手或模仿声音。有些宝宝先站后爬，有些爬很久再走。给安全探索空间，比催宝宝走路更重要。",
      en: "At 9-12 months, many babies crawl or move more confidently, pull to stand, cruise, use a pincer grasp, wave, or imitate sounds. Some stand before crawling; some crawl for a long time before walking. Safe exploration matters more than rushing walking.",
    },
    warningSigns: {
      zh: "如果宝宝技能倒退、明显只用一侧、完全不能承重，或你担心发育，请联系儿科医生。",
      en: "Contact your pediatrician if baby loses skills, strongly favors one side, cannot bear weight at all, or you are worried about development.",
    },
    sources: [
      { label: "CDC milestones by 9 months", url: "https://www.cdc.gov/act-early/milestones/9-months.html" },
      { label: "CDC milestones by 1 year", url: "https://www.cdc.gov/act-early/milestones/1-year.html" },
    ],
  },
  {
    id: "crying-nine-to-twelve-boundaries",
    title: "Crying, protest, and soothing at 9-12 months",
    ageRangeMonths: { min: 9, max: 12 },
    topics: ["crying", "development", "parent-support"],
    keywords: ["哭闹", "发脾气", "不让换尿布", "抗拒", "tantrum", "protest", "crying", "soothing"],
    answer: {
      zh: "9-12 个月宝宝会更有想法，换尿布、离开危险物品、不能马上抱时哭闹都很常见。这不是“坏脾气”，更多是表达能力还不够。可以短句命名情绪、动作保持稳定、给一个安全选择。",
      en: "At 9-12 months, babies have stronger preferences. Crying during diaper changes, leaving unsafe objects, or waiting to be held is common. It is not bad behavior; communication is still limited. Name the feeling briefly, keep actions steady, and offer one safe choice.",
    },
    warningSigns: {
      zh: "如果哭闹异常、无法安抚并伴随发烧/疼痛/呕吐/精神差，请联系儿科医生。",
      en: "Contact your pediatrician if crying is unusual, cannot be soothed, and comes with fever, pain, vomiting, or low energy.",
    },
    sources: [
      { label: "HealthyChildren emotional development 8-12 months", url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/Emotional-and-Social-Development-8-12-Months.aspx" },
    ],
  },
  {
    id: "safety-nine-to-twelve-standing-home",
    title: "Home safety for standing babies",
    ageRangeMonths: { min: 9, max: 12 },
    topics: ["safety", "development"],
    keywords: ["站起来", "扶站", "安全", "摔", "家具", "插座", "standing", "cruising", "babyproof", "home safety"],
    answer: {
      zh: "会扶站后，家里安全重点会变：固定会倒的家具，收好电线、小物、热饮和清洁用品，给尖角和插座做防护，楼梯用安全门。宝宝不是故意捣乱，是探索范围突然升级了。",
      en: "Once baby pulls to stand, home safety changes: anchor tip-prone furniture, move cords, small objects, hot drinks, and cleaning products, cover sharp corners and outlets, and gate stairs. Baby is not trying to make trouble; their exploration range just upgraded.",
    },
    warningSigns: {
      zh: "如果宝宝跌落后嗜睡、反复呕吐、抽搐、行为异常、头部明显受伤，或你担心严重受伤，请急诊/911。",
      en: "Seek urgent care/911 after a fall if baby is very sleepy, vomits repeatedly, has a seizure, acts abnormally, has obvious head injury, or you worry about serious injury.",
    },
    sources: [
      { label: "CDC milestones by 1 year", url: "https://www.cdc.gov/act-early/milestones/1-year.html" },
      { label: "Mayo Clinic sick baby signs", url: "https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/healthy-baby/art-20047793" },
    ],
  },
  {
    id: "parent-support-nine-to-twelve-independence",
    title: "Parent support for mobile babies",
    ageRangeMonths: { min: 9, max: 12 },
    topics: ["parent-support", "safety"],
    keywords: ["累", "看不住", "焦虑", "压力", "爬来爬去", "站起来", "overwhelmed", "mobile baby", "stress"],
    answer: {
      zh: "9-12 个月的累常常来自“宝宝每分钟都在动”。与其一直紧绷，不如做一个安全区域：地面清空、危险物移走、你能坐下来观察。让环境替你分担一部分警觉，不是偷懒，是更可持续。",
      en: "At 9-12 months, exhaustion often comes from baby moving every minute. Instead of staying tense everywhere, create one safer zone: clear the floor, remove hazards, and sit where you can watch. Let the environment carry some vigilance; that is sustainable care.",
    },
    warningSigns: {
      zh: "如果你觉得自己会失控、会伤害自己或宝宝，请立刻把宝宝放到安全处，让真人接手；美国/加拿大可拨 911 或 988。",
      en: "If you might lose control or hurt yourself/baby, place baby somewhere safe and get another adult immediately. In the U.S. or Canada, call 911 for danger or 988 for crisis support.",
    },
    sources: [
      { label: "988 Lifeline", url: "https://988lifeline.org/" },
      { label: "National Maternal Mental Health Hotline", url: "https://mchb.hrsa.gov/programs-impact/national-maternal-mental-health-hotline" },
    ],
  },
];
