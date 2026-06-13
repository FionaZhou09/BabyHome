import type { BabyCareKnowledgeCard } from "../baby-care-cards";

export const threeToSixMonthCards: BabyCareKnowledgeCard[] = [
  {
    id: "feeding-formula-frequency",
    title: "Formula feeding after early newborn stage",
    ageRangeMonths: { min: 3, max: 6 },
    topics: ["feeding"],
    keywords: ["奶粉", "水奶", "配方奶", "formula", "ready-to-feed", "4-6", "3-4"],
    answer: {
      zh: "3-6 个月配方奶宝宝通常会比新生儿更规律，很多会接近每 3-4 小时一次；有些较大月龄宝宝夜里会有更长间隔。重点仍是看饥饿/吃饱信号、尿布、精神状态和体重趋势。",
      en: "At 3-6 months, formula-fed babies are often more regular than newborns, commonly around every 3-4 hours; some older babies have longer night stretches. Still watch hunger/fullness cues, diapers, alertness, and growth trend.",
    },
    warningSigns: {
      zh: "如果吃奶明显下降、尿布减少、持续呕吐、精神差，请联系儿科医生。",
      en: "Contact your pediatrician if intake drops clearly, wet diapers decrease, vomiting persists, or baby seems unusually low-energy.",
    },
    sources: [
      { label: "CDC formula feeding", url: "https://www.cdc.gov/infant-toddler-nutrition/formula-feeding/how-much-and-how-often.html" },
    ],
  },
  {
    id: "sleep-4-month-night-waking",
    title: "Four month night waking",
    ageRangeMonths: { min: 3, max: 6 },
    topics: ["sleep"],
    keywords: ["4个月", "四个月", "晚上", "夜里", "半夜", "醒", "夜醒", "sleep regression", "wake", "night waking"],
    answer: {
      zh: "4 个月前后夜里反复醒很常见。这个阶段睡眠周期在变成熟，宝宝可能更容易在周期交界醒来，也可能受白天刺激、猛长期、出牙前后或入睡联想影响。先从固定睡前流程、低光低声音、夜里先观察 30-60 秒再安抚开始。",
      en: "Frequent night waking is common around 4 months. Sleep cycles are maturing, so babies may wake between cycles; daytime stimulation, growth changes, teething, or sleep associations can also play a role. Start with a consistent bedtime routine, low light and quiet voice, and pausing 30-60 seconds before soothing.",
    },
    warningSigns: {
      zh: "如果夜醒伴随发烧、呼吸异常、吃奶明显变差、湿尿布减少或精神很差，建议联系儿科医生。",
      en: "If night waking comes with fever, breathing changes, poor feeding, fewer wet diapers, or unusual low energy, contact your pediatrician.",
    },
    sources: [
      { label: "HealthyChildren getting baby to sleep", url: "https://www.healthychildren.org/english/ages-stages/baby/sleep/pages/getting-your-baby-to-sleep.aspx" },
      { label: "HealthyChildren baby sleep", url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/default.aspx" },
    ],
  },
  {
    id: "safety-three-to-six-rolling-sleep",
    title: "Rolling and sleep safety",
    ageRangeMonths: { min: 3, max: 6 },
    topics: ["sleep", "safety", "development"],
    keywords: ["翻身", "趴睡", "睡觉翻过去", "rolling", "roll", "tummy sleep", "swaddle", "安全"],
    answer: {
      zh: "开始会翻身后，睡眠安全要更新：仍然每次放下时仰睡，但如果宝宝已经能自己双向翻身，睡中自己翻过去通常不用反复翻回。关键是停止包裹式 swaddle，保持床面平坦、结实、无松软物品。",
      en: "When rolling starts, sleep safety changes: still place baby on their back at the start of every sleep, but if baby can roll both ways independently, you usually do not need to keep flipping them back. Stop swaddling and keep the sleep surface firm, flat, and free of soft loose items.",
    },
    warningSigns: {
      zh: "如果宝宝呼吸异常、发紫、叫不醒，或睡眠环境不安全但无法调整，请立刻寻求真人帮助。",
      en: "Seek urgent help for abnormal breathing, blue color, inability to wake, or if the sleep environment is unsafe and cannot be corrected.",
    },
    sources: [
      { label: "AAP safe sleep", url: "https://www.aap.org/en/patient-care/safe-sleep/" },
    ],
  },
  {
    id: "safety-three-to-six-rolling-home",
    title: "Rolling baby home safety",
    ageRangeMonths: { min: 3, max: 6 },
    topics: ["safety"],
    keywords: ["翻身", "会翻身", "家里", "居家", "怎么安全", "家里安全", "换尿布台", "沙发", "床上", "摔", "rolling safety", "fall", "changing table"],
    answer: {
      zh: "宝宝会翻身后，最大的变化是“不能再假设他会待在原地”。不要把宝宝单独放在床、沙发、换尿布台等高处；需要转身拿东西时，先把宝宝放到地垫、婴儿床或安全围栏里。地面时间也要先清掉小物、电线和容易倒的东西。",
      en: "Once baby can roll, the biggest safety change is that you cannot assume they will stay put. Do not leave baby alone on a bed, couch, or changing table. If you need to turn away, move baby to the floor, crib, or a safe play area first. Clear small objects, cords, and tip-prone items from floor time.",
    },
    warningSigns: {
      zh: "如果跌落后嗜睡、反复呕吐、抽搐、行为异常、头部明显受伤，或你担心严重受伤，请急诊或拨打 911。",
      en: "After a fall, seek urgent care or call 911 if baby is very sleepy, vomits repeatedly, has a seizure, acts abnormally, has obvious head injury, or you worry about serious injury.",
    },
    sources: [
      { label: "CDC infant and toddler safety", url: "https://www.cdc.gov/parents/infants/safety.html" },
      { label: "Mayo Clinic sick baby signs", url: "https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/healthy-baby/art-20047793" },
    ],
  },
  {
    id: "feeding-three-to-six-solids-readiness",
    title: "Signs of readiness for solids",
    ageRangeMonths: { min: 3, max: 6 },
    topics: ["feeding", "development"],
    keywords: ["辅食", "固体食物", "开始吃", "米糊", "solids", "solid food", "readiness", "6个月", "5个月"],
    answer: {
      zh: "大多数宝宝在接近 6 个月、出现准备信号时开始辅食：能较好控制头颈、坐着有支撑、对食物感兴趣、把食物往后吞而不是一直顶出来。4-5 个月如果还没有这些信号，可以先不急，奶仍是主要营养来源。",
      en: "Most babies start solids around 6 months when readiness signs appear: good head and neck control, sitting with support, interest in food, and moving food back to swallow rather than pushing it out. At 4-5 months, if these signs are not there, there is no rush; milk remains the main nutrition.",
    },
    warningSigns: {
      zh: "如果宝宝早产、发育/吞咽有担心、或有湿疹/食物过敏高风险，开始辅食前建议问儿科医生。",
      en: "If baby was premature, has developmental or swallowing concerns, or has high allergy risk such as significant eczema, ask your pediatrician before starting.",
    },
    sources: [
      { label: "CDC introduce solid foods", url: "https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/when-what-and-how-to-introduce-solid-foods.html" },
    ],
  },
  {
    id: "diaper-three-to-six-poop-changes",
    title: "Poop changes before solids",
    ageRangeMonths: { min: 3, max: 6 },
    topics: ["diaper"],
    keywords: ["大便", "便便", "便秘", "颜色", "几天不拉", "poop", "stool", "constipation"],
    answer: {
      zh: "3-6 个月大便频率可能比新生儿期少很多。只要大便柔软、吃奶和湿尿布正常、宝宝精神还可以，几天一次也可能是宝宝自己的节奏。开始辅食前后颜色和气味也会变化。",
      en: "At 3-6 months, poop may become much less frequent than in the newborn stage. If stools are soft, feeding and wet diapers are normal, and baby seems well, going a few days can be their rhythm. Color and smell often change around solids.",
    },
    warningSigns: {
      zh: "白色/灰白色大便、明显带血、硬球状便、持续呕吐、腹胀疼痛或精神差，建议联系儿科医生。",
      en: "Contact your pediatrician for white/gray stool, blood, hard pellet-like stool, repeated vomiting, swollen painful belly, or low energy.",
    },
    sources: [
      { label: "HealthyChildren infant constipation", url: "https://www.healthychildren.org/English/ages-stages/baby/diapers-clothing/Pages/Infant-Constipation.aspx" },
    ],
  },
  {
    id: "development-three-to-six-milestones",
    title: "3-6 month milestones",
    ageRangeMonths: { min: 3, max: 6 },
    topics: ["development"],
    keywords: ["里程碑", "发育", "翻身", "抓", "笑出声", "咿呀", "milestone", "rolling", "reaching", "4个月", "6个月"],
    answer: {
      zh: "3-6 个月常见发展包括更会咿呀互动、笑出声、伸手抓东西、趴着支撑更稳，并逐渐尝试翻身。每天短时间趴、面对面说话、给安全玩具练习抓握，都比追求提前完成里程碑更有用。",
      en: "At 3-6 months, many babies babble more, laugh, reach for objects, push up better during tummy time, and begin rolling. Short tummy time, face-to-face talking, and safe reaching toys help more than trying to rush milestones.",
    },
    warningSigns: {
      zh: "如果你担心宝宝完全不看人、不对声音反应、身体非常软/僵，或技能明显倒退，请联系儿科医生。",
      en: "If baby does not look at people, does not respond to sound, seems very floppy/stiff, or loses skills, contact your pediatrician.",
    },
    sources: [
      { label: "CDC milestones by 4 months", url: "https://www.cdc.gov/act-early/milestones/4-months.html" },
      { label: "CDC milestones by 6 months", url: "https://www.cdc.gov/act-early/milestones/6-months.html" },
    ],
  },
  {
    id: "crying-three-to-six-soothing",
    title: "Crying and soothing at 3-6 months",
    ageRangeMonths: { min: 3, max: 6 },
    topics: ["crying"],
    keywords: ["3个月", "4个月", "5个月", "6个月", "哭闹", "安抚", "哄", "烦躁", "出牙", "fussy", "crying", "soothe", "teething"],
    answer: {
      zh: "3-6 个月哭闹可能来自困、过度刺激、想换姿势、练新技能、出牙前后或需要更多互动。可以先降低刺激：灯暗一点、声音小一点、换到安静房间；再试抱起放下、轻拍、出门走一小圈、给安全牙胶。安抚不是把哭声立刻关掉，而是帮宝宝慢慢降下来。",
      en: "At 3-6 months, fussiness can come from tiredness, overstimulation, wanting a new position, practicing skills, teething, or needing interaction. Lower stimulation first: dim light, quieter voice, calmer room; then try pick-up-put-down, gentle patting, a short walk, or a safe teether.",
    },
    warningSigns: {
      zh: "如果哭闹突然异常、持续无法安抚，并伴随发烧、呼吸异常、呕吐、吃奶差、尿布减少或精神差，请联系儿科医生。",
      en: "Contact your pediatrician if crying is suddenly unusual, inconsolable, and comes with fever, breathing changes, vomiting, poor feeding, fewer wet diapers, or low energy.",
    },
    sources: [
      { label: "HealthyChildren crying and colic", url: "https://www.healthychildren.org/English/ages-stages/baby/crying-colic/Pages/default.aspx" },
    ],
  },
  {
    id: "parent-support-three-to-six-sleep-pressure",
    title: "Parent pressure around baby sleep",
    ageRangeMonths: { min: 3, max: 6 },
    topics: ["parent-support", "sleep"],
    keywords: ["睡眠倒退", "夜醒", "累", "崩溃", "睡不好", "sleep regression", "exhausted", "pressure"],
    answer: {
      zh: "3-6 个月很容易让父母觉得“是不是我哪里没做好”，尤其夜醒变多时。你可以把目标降到今天能执行的一件事：固定睡前 10 分钟流程，或白天只记录睡眠开始/结束，不需要把整套作息做完美。",
      en: "At 3-6 months, sleep changes can make parents feel like they are doing something wrong. Lower the goal to one doable thing today: a 10-minute bedtime routine, or logging only sleep start/end. The whole schedule does not need to be perfect.",
    },
    warningSigns: {
      zh: "如果你连续多天绝望、无法睡、害怕自己会失控或伤害自己/宝宝，请让真人接手宝宝并联系医生、988 或紧急服务。",
      en: "If you feel hopeless for days, cannot sleep, fear losing control, or might hurt yourself/baby, have another adult take over and contact a clinician, 988, or emergency services.",
    },
    sources: [
      { label: "988 Lifeline", url: "https://988lifeline.org/" },
      { label: "National Maternal Mental Health Hotline", url: "https://mchb.hrsa.gov/programs-impact/national-maternal-mental-health-hotline" },
    ],
  },
];
