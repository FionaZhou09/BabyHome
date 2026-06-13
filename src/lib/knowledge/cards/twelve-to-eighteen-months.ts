import type { BabyCareKnowledgeCard } from "../baby-care-cards";

export const twelveToEighteenMonthCards: BabyCareKnowledgeCard[] = [
  {
    id: "feeding-twelve-to-eighteen-toddler-meals",
    title: "Toddler meals and picky eating at 12-18 months",
    ageRangeMonths: { min: 12, max: 18 },
    topics: ["feeding"],
    keywords: ["12个月", "13个月", "14个月", "15个月", "16个月", "17个月", "18个月", "辅食", "挑食", "家庭餐", "三餐", "不吃饭", "零食", "toddler meals", "picky eating"],
    answer: {
      zh: "12-18 个月会从“辅食练习”更明显地走向家庭餐，但食量波动和挑食很常见。可以保持三餐加 1-2 次小点心，提供切小的软食、蛋白质、蔬果、全谷物和健康脂肪；父母负责提供安全食物和节奏，孩子决定吃多少。不要用奶或零食替代每一次正餐失败。",
      en: "At 12-18 months, meals shift from practice toward family food, but appetite swings and picky eating are common. Keep a rhythm of meals plus 1-2 snacks, offer small soft pieces from protein, fruits/vegetables, whole grains, and healthy fats; parents provide safe food and rhythm, toddlers decide how much to eat.",
    },
    warningSigns: {
      zh: "如果持续拒食、体重/生长担心、吞咽困难、频繁呛咳、尿布明显减少或精神差，请联系儿科医生。",
      en: "Contact your pediatrician for ongoing food refusal, growth concerns, swallowing trouble, frequent choking/coughing, fewer wet diapers, or low energy.",
    },
    sources: [
      { label: "CDC foods and drinks 6-24 months", url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/index.html" },
      { label: "CDC foods to encourage", url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/foods-and-drinks-to-encourage.html" },
    ],
  },
  {
    id: "development-twelve-to-eighteen-language",
    title: "Language development at 12-18 months",
    ageRangeMonths: { min: 12, max: 18 },
    topics: ["development"],
    keywords: ["12个月", "13个月", "14个月", "15个月", "16个月", "17个月", "18个月", "说话", "语言", "不开口", "不怎么说话", "词汇", "指物", "听懂", "language", "speech", "words"],
    answer: {
      zh: "12-18 个月语言发展差异很大。可以看两条线：会不会理解简单指令、指物或用动作表达，以及有没有逐渐尝试一些词。15个月左右很多孩子会尝试 1-2 个非“妈妈/爸爸”的词；18个月左右常见是尝试 3 个或更多词，并能跟随简单一步指令。每天多命名物品、读短书、等待孩子回应，比反复考试更有帮助。",
      en: "Language varies widely at 12-18 months. Watch both understanding and expression: following simple directions, pointing/gestures, and gradually trying words. Around 15 months many children try 1-2 words besides mama/dada; around 18 months many try three or more and follow a one-step direction. Naming objects, reading short books, and waiting for responses help more than quizzing.",
    },
    warningSigns: {
      zh: "如果孩子没有眼神互动、不会用手势/指物、听力担心、技能倒退，或到18个月仍完全没有词语/不理解简单指令，请联系儿科医生或早期干预评估。",
      en: "Ask your pediatrician or early intervention about no eye contact, no gestures/pointing, hearing concerns, loss of skills, or no words/limited understanding of simple directions around 18 months.",
    },
    sources: [
      { label: "CDC milestones by 15 months", url: "https://www.cdc.gov/act-early/milestones/15-months.html" },
      { label: "CDC milestones by 18 months", url: "https://www.cdc.gov/act-early/milestones/18-months.html" },
    ],
  },
  {
    id: "diaper-twelve-to-eighteen-potty-readiness",
    title: "Early potty readiness at 12-18 months",
    ageRangeMonths: { min: 12, max: 18 },
    topics: ["diaper", "development"],
    keywords: ["12个月", "13个月", "14个月", "15个月", "16个月", "17个月", "18个月", "如厕", "厕所", "马桶", "potty", "toilet training", "戒尿布"],
    answer: {
      zh: "12-18 个月可以开始熟悉 potty 概念，但多数孩子还不需要正式训练。准备信号包括：能短时间保持尿布干、能走到小马桶、能理解简单指令、会表达尿布湿/要换。这个阶段重点是轻松介绍、坐一坐、读相关小书，不要因为一次成功就突然加压。",
      en: "At 12-18 months, you can introduce the potty idea, but most toddlers do not need formal training yet. Readiness signs include staying dry for short stretches, walking to a potty, understanding simple directions, and communicating wet/dirty diapers. Keep it low-pressure: sit briefly, read potty books, and avoid turning one success into pressure.",
    },
    warningSigns: {
      zh: "如果排尿疼痛、便血、长期严重便秘、突然明显尿频/尿痛，或你担心泌尿问题，请联系儿科医生。",
      en: "Contact your pediatrician for pain with urination, blood in stool, severe ongoing constipation, sudden frequent/painful urination, or urinary concerns.",
    },
    sources: [
      { label: "HealthyChildren potty training", url: "https://www.healthychildren.org/English/ages-stages/toddler/toilet-training/Pages/default.aspx" },
      { label: "HealthyChildren potty readiness", url: "https://www.healthychildren.org/English/ages-stages/toddler/toilet-training/Pages/How-to-Tell-When-Your-Child-is-Ready.aspx" },
    ],
  },
  {
    id: "crying-twelve-to-eighteen-early-tantrums",
    title: "Early tantrums at 12-18 months",
    ageRangeMonths: { min: 12, max: 18 },
    topics: ["crying", "development", "parent-support"],
    keywords: ["12个月", "13个月", "14个月", "15个月", "16个月", "17个月", "18个月", "tantrum", "发脾气", "哭闹", "摔东西", "打人", "情绪", "崩溃"],
    answer: {
      zh: "12-18 个月的 tantrum 常来自“想要很多、能说很少”。先保证安全，再用很短的句子命名情绪：你很生气/你想要那个。给两个安全选择，减少语言轰炸。不要因为哭闹而让危险物变成可以拿，但可以在平静后抱一抱、重新示范。",
      en: "At 12-18 months, tantrums often come from wanting a lot while having few words. Keep everyone safe, name the feeling briefly, and offer two safe choices. Avoid long explanations during the storm. Do not make unsafe items available because of crying, but reconnect and model after calm returns.",
    },
    warningSigns: {
      zh: "如果哭闹伴随发烧、疼痛、头部外伤、呼吸异常，或攻击行为让孩子/他人不安全，请联系医生或当地紧急支持。",
      en: "Contact a clinician or urgent support if tantrums come with fever, pain, head injury, breathing changes, or aggression that makes the child or others unsafe.",
    },
    sources: [
      { label: "HealthyChildren tantrums", url: "https://www.healthychildren.org/English/family-life/family-dynamics/communication-discipline/Pages/Temper-Tantrums.aspx" },
      { label: "AAP handling big emotions", url: "https://www.aap.org/en/patient-care/media-and-children/center-of-excellence-on-social-media-and-youth-mental-health/qa-portal/qa-portal-library/qa-portal-library-questions/handling-big-emotions/" },
    ],
  },
  {
    id: "feeding-twelve-to-eighteen-weaning",
    title: "Weaning and milk transitions at 12-18 months",
    ageRangeMonths: { min: 12, max: 18 },
    topics: ["feeding", "parent-support"],
    keywords: ["12个月", "13个月", "14个月", "15个月", "16个月", "17个月", "18个月", "断奶", "夜奶", "奶瓶", "母乳", "weaning", "bottle", "milk transition"],
    answer: {
      zh: "12-18 个月断奶可以慢慢来，不需要用“突然消失”来完成。先选一个最容易替代的奶次，用拥抱、读书、水杯或点心替代；夜奶可先缩短或延后，再逐步取消。断奶也是父母情绪变化，舍不得或松一口气都正常。",
      en: "Weaning at 12-18 months can be gradual. Start with the easiest feed to replace using cuddles, books, a cup, or a snack. For night feeds, shorten or delay first, then remove gradually. Weaning can bring mixed parent feelings; sadness and relief can both be normal.",
    },
    warningSigns: {
      zh: "如果孩子断奶后摄入明显不足、尿布减少、体重担心，或父母出现持续低落/焦虑，请联系儿科医生或产后心理支持。",
      en: "Contact your pediatrician if intake drops, wet diapers decrease, or growth is a concern; seek mental health support if weaning brings persistent low mood or anxiety.",
    },
    sources: [
      { label: "CDC foods and drinks 6-24 months", url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/index.html" },
      { label: "HealthyChildren toddler feeding", url: "https://www.healthychildren.org/English/ages-stages/toddler/nutrition/Pages/default.aspx" },
    ],
  },
  {
    id: "safety-twelve-to-eighteen-walking-climbing",
    title: "Safety for new walkers and climbers",
    ageRangeMonths: { min: 12, max: 18 },
    topics: ["safety", "development"],
    keywords: ["12个月", "13个月", "14个月", "15个月", "16个月", "17个月", "18个月", "走路", "爬高", "摔倒", "安全", "防护", "walking", "climbing", "babyproof"],
    answer: {
      zh: "12-18 个月会走、会爬后，安全重点从地面扩展到桌面和柜子：固定家具，锁清洁剂/药品，热饮放远，小物和硬圆食物远离，楼梯安全门保持关闭。户外牵手和停车场抱起，比讲道理更可靠。",
      en: "At 12-18 months, walking and climbing move hazards from floor level to tables and cabinets: anchor furniture, lock cleaners/medicines, move hot drinks, keep small objects and hard round foods away, and close stair gates. Outside, holding hands or carrying in parking lots works better than reasoning.",
    },
    warningSigns: {
      zh: "跌落后如果嗜睡、反复呕吐、抽搐、走路异常、行为异常或你担心严重伤害，请急诊/911。",
      en: "Seek urgent care/911 after a fall if the child is very sleepy, vomits repeatedly, has a seizure, walks abnormally, acts abnormally, or you worry about serious injury.",
    },
    sources: [
      { label: "CDC milestones by 15 months", url: "https://www.cdc.gov/act-early/milestones/15-months.html" },
      { label: "CDC infant and toddler safety", url: "https://www.cdc.gov/parents/infants/safety.html" },
    ],
  },
  {
    id: "parent-support-twelve-to-eighteen-boundaries",
    title: "Parent support for toddler boundaries",
    ageRangeMonths: { min: 12, max: 18 },
    topics: ["parent-support", "crying"],
    keywords: ["12个月", "13个月", "14个月", "15个月", "16个月", "17个月", "18个月", "累", "崩溃", "边界", "不听话", "压力", "toddler stress", "boundaries"],
    answer: {
      zh: "12-18 个月最累的地方常是“孩子有主意，但还讲不通”。你不需要每次都解释到孩子同意；稳定的边界、少量选择、重复流程就是教育。父母可以把家里做成更少需要说“不”的环境，这不是放弃管教，是降低双方消耗。",
      en: "At 12-18 months, the hard part is that toddlers have opinions but cannot reason much yet. You do not need to explain until they agree; steady limits, small choices, and repeated routines are teaching. Making the home require fewer 'no' moments reduces everyone's load.",
    },
    warningSigns: {
      zh: "如果你担心自己会失控或伤害自己/孩子，请先让孩子到安全处，找真人接手；美国/加拿大可拨 911 或 988，美国孕产/产后热线 1-833-TLC-MAMA。",
      en: "If you might lose control or hurt yourself/child, put the child somewhere safe and get another adult. In the U.S. or Canada call 911 or 988; in the U.S. maternal mental health support is 1-833-TLC-MAMA.",
    },
    sources: [
      { label: "HealthyChildren tantrums", url: "https://www.healthychildren.org/English/family-life/family-dynamics/communication-discipline/Pages/Temper-Tantrums.aspx" },
      { label: "988 Lifeline", url: "https://988lifeline.org/" },
    ],
  },
];
