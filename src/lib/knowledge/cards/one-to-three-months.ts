import type { BabyCareKnowledgeCard } from "../baby-care-cards";

export const oneToThreeMonthCards: BabyCareKnowledgeCard[] = [
  {
    id: "feeding-expressed-milk-bottle-frequency",
    title: "Expressed milk bottle rhythm",
    ageRangeMonths: { min: 1, max: 3 },
    topics: ["feeding"],
    keywords: ["瓶喂母乳", "瓶喂", "泵奶", "expressed", "pumped", "bottle", "breast milk", "3-4"],
    answer: {
      zh: "瓶喂母乳能看到奶量，但仍建议按宝宝饥饿和吃饱信号来喂。很多 1-3 个月宝宝会接近 2-4 小时一个节奏；如果一次喝得更多，间隔可能略长，但不要只按时钟判断。",
      en: "Bottle-fed expressed milk makes volume easier to see, but responsive feeding still matters. Many 1-3 month babies settle around a 2-4 hour rhythm; if a baby takes more per bottle, the gap may stretch, but do not rely on the clock alone.",
    },
    warningSigns: {
      zh: "如果宝宝频繁呛咳、喝完非常不舒服、吐奶明显加重、尿布减少或精神差，建议咨询儿科医生或喂养/哺乳支持。",
      en: "If baby coughs or chokes often, seems very uncomfortable after bottles, spits up much more than usual, has fewer wet diapers, or seems low-energy, ask your pediatrician or feeding support.",
    },
    sources: [
      { label: "CDC breastfeeding frequency", url: "https://www.cdc.gov/infant-toddler-nutrition/breastfeeding/how-much-and-how-often.html" },
    ],
  },
  {
    id: "feeding-one-to-three-spit-up-gas",
    title: "Spit-up and gas",
    ageRangeMonths: { min: 1, max: 3 },
    topics: ["feeding", "crying"],
    keywords: ["吐奶", "溢奶", "胀气", "拍嗝", "gas", "spit up", "reflux", "burp", "fussy after feeding"],
    answer: {
      zh: "1-3 个月宝宝吐奶、胀气、吃奶后扭来扭去很常见。可以试试慢一点喂、暂停拍嗝、喂后竖抱一会儿、检查奶嘴流速是否太快。重点看宝宝是否还能正常吃奶、尿布和体重趋势是否稳定。",
      en: "Spit-up, gas, and squirming after feeds are common at 1-3 months. Try slower feeds, burp pauses, holding baby upright briefly after feeds, and checking nipple flow. The key is whether feeding, diapers, and growth trend stay steady.",
    },
    warningSigns: {
      zh: "如果是喷射性呕吐、绿色呕吐、吐血、体重不增、吃奶差、脱水迹象或精神差，请联系儿科医生。",
      en: "Contact your pediatrician for projectile vomiting, green vomit, blood, poor weight gain, poor feeding, dehydration signs, or unusual low energy.",
    },
    sources: [
      { label: "Mayo Clinic sick baby signs", url: "https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/healthy-baby/art-20047793" },
    ],
  },
  {
    id: "sleep-one-to-three-wake-window",
    title: "Wake windows at 1-3 months",
    ageRangeMonths: { min: 1, max: 3 },
    topics: ["sleep"],
    keywords: ["1个月", "2个月", "3个月", "wake window", "清醒窗口", "小睡", "nap", "困", "过度疲劳"],
    answer: {
      zh: "1-3 个月宝宝清醒时间通常还很短，很多时候 45-90 分钟就会累。可以把 wake window 当作提醒，而不是规则：看打哈欠、眼神发直、转头躲刺激、烦躁这些困信号，提前进入安静流程。",
      en: "At 1-3 months, wake windows are still short; many babies tire after about 45-90 minutes. Treat wake windows as a reminder, not a rule: watch yawning, staring, turning away, and fussiness, then start a calm wind-down.",
    },
    warningSigns: {
      zh: "如果宝宝嗜睡到很难叫醒吃奶、呼吸异常、发烧或精神明显变差，请联系儿科医生。",
      en: "If baby is so sleepy they are hard to wake for feeds, has breathing changes, fever, or unusual low energy, contact your pediatrician.",
    },
    sources: [
      { label: "HealthyChildren baby sleep", url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/default.aspx" },
    ],
  },
  {
    id: "diaper-one-to-three-constipation",
    title: "Constipation signals",
    ageRangeMonths: { min: 1, max: 3 },
    topics: ["diaper"],
    keywords: ["便秘", "硬便", "拉不出", "用力", "constipation", "hard stool", "straining"],
    answer: {
      zh: "宝宝用力、脸红不一定是便秘；真正更像便秘的是大便很硬、颗粒状、排便痛苦，或频率突然明显改变并伴随不舒服。单纯几天没拉，但便便仍软、吃奶和尿布正常，常常可以先观察。",
      en: "Straining and turning red do not always mean constipation. Constipation is more likely when stools are hard or pellet-like, painful to pass, or bowel patterns change sharply with discomfort. If stools are soft and feeding/wet diapers are normal, a few days between stools can often be watched.",
    },
    warningSigns: {
      zh: "如果硬便带血、持续呕吐、腹胀明显、吃奶差，或 2 个月以下宝宝疑似便秘，请联系儿科医生。",
      en: "Contact your pediatrician for blood with hard stool, repeated vomiting, marked belly swelling, poor feeding, or constipation concerns in a baby under 2 months.",
    },
    sources: [
      { label: "HealthyChildren infant constipation", url: "https://www.healthychildren.org/English/ages-stages/baby/diapers-clothing/Pages/Infant-Constipation.aspx" },
    ],
  },
  {
    id: "development-one-to-three-early-milestones",
    title: "Early social and motor milestones",
    ageRangeMonths: { min: 1, max: 3 },
    topics: ["development"],
    keywords: ["里程碑", "发育", "抬头", "笑", "看人", "coo", "milestone", "development", "tummy time"],
    answer: {
      zh: "1-3 个月常见变化包括更会看人、对声音有反应、开始微笑或发出咕咕声，趴着时头部控制慢慢变好。里程碑不是考试，可以用短而频繁的 tummy time、说话、唱歌、面对面互动来支持。",
      en: "At 1-3 months, many babies look at faces more, respond to sounds, begin smiling or cooing, and slowly improve head control during tummy time. Milestones are not an exam; short frequent tummy time, talking, singing, and face-to-face play help.",
    },
    warningSigns: {
      zh: "如果你担心宝宝不看人、完全不回应声音、身体非常软或僵硬，请在儿科体检时提出，或提前联系医生。",
      en: "If you are worried baby does not look at faces, does not respond to sound, seems very floppy or stiff, bring it up at the pediatric visit or contact the doctor sooner.",
    },
    sources: [
      { label: "CDC milestones by 2 months", url: "https://www.cdc.gov/act-early/milestones/2-months.html" },
    ],
  },
  {
    id: "crying-one-to-three-soothing",
    title: "Crying and soothing",
    ageRangeMonths: { min: 1, max: 3 },
    topics: ["crying", "parent-support"],
    keywords: ["哭闹", "肠绞痛", "安抚", "哄", "colic", "cry", "fussy", "soothe", "witching hour"],
    answer: {
      zh: "1-3 个月哭闹可能在傍晚更明显，不代表你做错了。先排查饿、尿布、困、冷热、胀气；如果都处理过，可以试低刺激环境、轻拍、白噪音、抱走动，或者让另一个成年人接手 10 分钟。",
      en: "Crying can peak in the evening at 1-3 months, and it does not mean you are doing something wrong. Check hunger, diaper, tiredness, temperature, and gas; then try low stimulation, gentle patting, white noise, walking, or handing off to another adult for 10 minutes.",
    },
    warningSigns: {
      zh: "如果宝宝哭声异常尖锐、发烧、呼吸异常、呕吐、吃奶差、精神差，或你怕自己会失控，请立刻寻求真人帮助。",
      en: "Seek real help promptly if crying sounds unusual and high-pitched, or comes with fever, breathing changes, vomiting, poor feeding, low energy, or if you fear losing control.",
    },
    sources: [
      { label: "HealthyChildren crying", url: "https://www.healthychildren.org/English/ages-stages/baby/crying-colic/Pages/default.aspx" },
    ],
  },
  {
    id: "safety-one-to-three-fever",
    title: "Fever under 3 months",
    ageRangeMonths: { min: 1, max: 3 },
    topics: ["safety"],
    keywords: ["发烧", "发热", "体温", "100.4", "38", "fever", "temperature", "3个月以内", "under 3 months"],
    answer: {
      zh: "3 个月以内宝宝发烧要更谨慎。如果直肠温度达到 100.4°F/38°C，通常需要马上联系医生确认下一步。不要只靠额温贴判断，最好按医生建议使用准确测温方式。",
      en: "Fever under 3 months needs extra caution. A rectal temperature of 100.4°F/38°C generally means you should contact a doctor right away. Do not rely only on forehead strips; use an accurate method as advised by your clinician.",
    },
    warningSigns: {
      zh: "如果宝宝呼吸困难、嘴唇发紫、叫不醒、抽搐、持续呕吐或你认为有立即危险，请拨打 911。",
      en: "Call 911 for trouble breathing, blue lips, inability to wake, seizure, repeated vomiting, or if you think there is immediate danger.",
    },
    sources: [
      { label: "HealthyChildren fever and baby", url: "https://www.healthychildren.org/English/health-issues/conditions/fever/Pages/Fever-and-Your-Baby.aspx" },
    ],
  },
];
