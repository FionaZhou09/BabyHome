import type { DemoActivity, DemoChatMessage } from "@/lib/demo/types";

type Intent = "emotional" | "feeding" | "sleep" | "diaper" | "crying" | "pattern" | "general";

interface ParentSupportInput {
  message: string;
  activities: DemoActivity[];
  history?: DemoChatMessage[];
}

const BABY_URGENT_PATTERNS = [
  /fever|temperature|100\.4|38\s?c|发烧|发热|高烧/i,
  /breath|breathing|wheez|blue|cyanosis|呼吸|喘|发紫|嘴唇紫/i,
  /dehydrat|no wet|dry diaper|not peeing|脱水|尿少|没尿/i,
  /letharg|unresponsive|hard to wake|limp|嗜睡|叫不醒|没反应/i,
  /vomit.*green|blood|seizure|抽搐|呕吐.*绿|吐血|便血/i,
];

const PARENT_CRISIS_PATTERNS = [
  /hurt myself|kill myself|suicide|end my life|harm my baby|shake.*baby/i,
  /想死|自杀|不想活|伤害自己|伤害宝宝|摇晃宝宝|控制不住/i,
];

const INTENT_PATTERNS: Record<Intent, RegExp[]> = {
  emotional: [
    /tired|exhausted|overwhelmed|anxious|anxiety|crying|guilty|bad parent|scared|stress/i,
    /累|崩溃|焦虑|压力|害怕|内疚|撑不住|哭|情绪/i,
  ],
  feeding: [/feed|feeding|milk|nursing|formula|bottle|hungry|奶|喂|母乳|配方|瓶喂|饿/i],
  sleep: [/sleep|nap|wake|night|bedtime|睡|觉|夜醒|小睡|哄睡/i],
  diaper: [/diaper|pee|poop|wet|dirty|尿布|尿|便便|大便|拉/i],
  crying: [/cry|fussy|colic|soothe|calm|哭闹|安抚|哄|肠绞痛/i],
  pattern: [/normal|pattern|summary|today|log|track|正常|规律|总结|今天|记录/i],
  general: [/.*/],
};

function detectLanguage(message: string): "zh" | "en" {
  return /[\u3400-\u9fff]/.test(message) ? "zh" : "en";
}

function detectIntent(message: string): Intent {
  const order: Intent[] = ["emotional", "feeding", "sleep", "diaper", "crying", "pattern"];
  return order.find((intent) => INTENT_PATTERNS[intent].some((pattern) => pattern.test(message))) ?? "general";
}

function hasMatch(message: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(message));
}

function summarizeActivities(activities: DemoActivity[]) {
  const counts = activities.reduce<Record<string, number>>((acc, activity) => {
    acc[activity.category] = (acc[activity.category] ?? 0) + 1;
    return acc;
  }, {});

  const latest = activities[0];
  return {
    counts,
    latestLabel: latest ? `${latest.category} at ${formatTime(latest.timestamp)}` : null,
  };
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function babyUrgentReply(language: "zh" | "en") {
  if (language === "zh") {
    return [
      "我先认真接住你：这个问题听起来可能需要真人医疗判断。",
      "如果宝宝有发烧、呼吸困难、嘴唇发紫、明显脱水、叫不醒、抽搐、反复呕吐或便血，请现在联系儿科医生、急诊或当地紧急服务。",
      "我可以帮你整理要告诉医生的信息：宝宝月龄、体温、最后一次吃奶、最后一次湿尿布、症状开始时间，以及你最担心的变化。",
    ].join(" ");
  }

  return [
    "I want to take this seriously: this may need real medical judgment.",
    "If your baby has fever, trouble breathing, blue lips, signs of dehydration, is hard to wake, has a seizure, repeated vomiting, or blood in stool, contact your pediatrician, urgent care, or emergency services now.",
    "I can help you organize what to tell them: age, temperature, last feed, last wet diaper, when symptoms started, and what changed.",
  ].join(" ");
}

function parentCrisisReply(language: "zh" | "en") {
  if (language === "zh") {
    return [
      "你现在不需要一个人扛着。请先把宝宝放在安全的地方，比如婴儿床里，然后立刻联系一个真人来陪你。",
      "如果你有伤害自己、伤害宝宝、或控制不住冲动的想法，请马上拨打当地紧急电话；在美国也可以拨打或短信 988。产后心理支持热线 1-833-TLC-MAMA 也可以 24/7 提供帮助。",
      "你不是坏父母，这是需要支持的紧急时刻。先让另一个成年人接手宝宝，下一分钟只做求助这一件事。",
    ].join(" ");
  }

  return [
    "You do not have to hold this alone. First, place the baby somewhere safe, like their crib, then contact a real person immediately.",
    "If you might hurt yourself, your baby, or feel unable to control an impulse, call emergency services now. In the U.S., call or text 988. The National Maternal Mental Health Hotline is also available 24/7 at 1-833-TLC-MAMA.",
    "This does not make you a bad parent. It means this is a support-now moment. Let another adult take over the baby if possible, and make getting help the only next step.",
  ].join(" ");
}

function emotionalReply(message: string, activities: DemoActivity[], language: "zh" | "en") {
  const summary = summarizeActivities(activities);
  if (language === "zh") {
    return [
      "听起来你真的已经很累了。先说最重要的：你不是做得不好，你是在一个高消耗阶段里一直撑着。",
      summary.latestLabel
        ? `我看到最近有 ${summary.latestLabel} 的记录，说明你一直在照顾和观察宝宝。`
        : "现在没有太多记录也没关系，照顾宝宝本来就会让人没空记录。",
      "先做一个很小的 reset：把宝宝放在安全的地方，喝几口水，肩膀放下来，慢慢呼气 3 次。然后只选下一件最小的事，不要规划一整晚。",
      "如果这种焦虑、绝望、失控感持续很多天，或者你害怕自己会撑不住，请联系医生、心理咨询师、家人朋友，或产后心理支持热线。",
    ].join(" ");
  }

  return [
    "That sounds really heavy. First: this does not mean you are doing badly. It means you are carrying a lot in a high-demand season.",
    summary.latestLabel
      ? `I can see a recent ${summary.latestLabel} log, which tells me you are still watching and caring, even while tired.`
      : "Even if there are not many logs yet, that is okay. Care work can be too full to document perfectly.",
    "Try one tiny reset: put baby in a safe spot, take a few sips of water, drop your shoulders, and take 3 slow exhales. Then choose only the next smallest task, not the whole night.",
    "If anxiety, hopelessness, or feeling out of control keeps showing up, it is worth telling a clinician or someone you trust. You deserve support too.",
  ].join(" ");
}

function feedingReply(activities: DemoActivity[], language: "zh" | "en") {
  const feedCount = activities.filter((activity) => activity.category === "feeding").length;
  if (language === "zh") {
    return [
      `过去 7 天 demo 记录里有 ${feedCount} 次喂养。单看次数不能判断全部，但它可以帮你看到节奏。`,
      "带娃时可以关注三个轻松指标：宝宝是否有稳定湿尿布、吃奶后是否能放松一段时间、体重/精神状态是否按儿科医生预期发展。",
      "如果宝宝明显吃不进去、尿布显著减少、精神很差，或你直觉觉得不对，建议联系儿科医生。",
    ].join(" ");
  }

  return [
    `I see ${feedCount} feeding logs in the recent demo data. Count alone does not tell the whole story, but it helps you notice rhythm.`,
    "For a calmer check, look at three signals: steady wet diapers, some settled periods after feeds, and weight/alertness tracking as expected by your pediatrician.",
    "If baby cannot feed, wet diapers drop a lot, baby seems unusually sleepy, or your gut says something is off, call your pediatrician.",
  ].join(" ");
}

function sleepReply(activities: DemoActivity[], language: "zh" | "en") {
  const sleepCount = activities.filter((activity) => activity.category === "sleep").length;
  if (language === "zh") {
    return [
      `最近记录里有 ${sleepCount} 次睡眠。宝宝睡眠不稳定很常见，尤其在猛长期、出牙、白天刺激多的时候。`,
      "你可以先追求“安全 + 可重复”，而不是完美作息：固定一个睡前小流程，灯光变暗，声音变低，醒来后先观察再介入。",
      "安全睡眠的底线是：仰睡、平坦睡眠表面、睡眠区域不要放松软物品。",
    ].join(" ");
  }

  return [
    `I see ${sleepCount} sleep logs recently. Uneven sleep is common, especially during growth shifts, teething, or busy days.`,
    "Aim for safe and repeatable before perfect: a small bedtime sequence, dimmer light, quieter voice, and a short pause before intervening when baby stirs.",
    "Safe sleep basics matter most: back to sleep, a firm flat surface, and no soft loose items in the sleep space.",
  ].join(" ");
}

function diaperReply(activities: DemoActivity[], language: "zh" | "en") {
  const diaperCount = activities.filter((activity) => activity.category === "diaper").length;
  if (language === "zh") {
    return [
      `最近记录里有 ${diaperCount} 次尿布。尿布记录很有用，因为它能间接反映补水和进食情况。`,
      "如果湿尿布突然明显变少、嘴唇很干、哭没有眼泪、精神变差，建议尽快联系儿科医生。",
      "如果只是颜色或频率小波动，可以继续记录，并结合吃奶、精神状态一起看。",
    ].join(" ");
  }

  return [
    `I see ${diaperCount} diaper logs recently. Diapers are useful because they give a practical clue about hydration and intake.`,
    "If wet diapers suddenly drop, lips look very dry, there are no tears when crying, or baby seems unusually low-energy, contact your pediatrician promptly.",
    "Small changes in color or timing can happen. Keep logging and look at feeding plus alertness together.",
  ].join(" ");
}

function cryingReply(language: "zh" | "en") {
  if (language === "zh") {
    return [
      "宝宝哭闹会非常消耗父母，不代表你没做好。先按最简单的顺序排查：饿了、尿布、困了、胀气、太热/太冷、需要抱抱或减少刺激。",
      "如果你快要失控，把宝宝放到安全睡眠区域，离开几分钟深呼吸，叫另一个成年人接手。永远不要摇晃宝宝。",
      "如果哭声异常尖锐、伴随发烧/呼吸问题/精神差，或你直觉不对，请联系医生。",
    ].join(" ");
  }

  return [
    "Crying can wear a parent down fast, and it does not mean you are failing. Try the simplest checklist: hunger, diaper, tired, gas, too hot/cold, needs closeness, or needs less stimulation.",
    "If you feel close to losing control, place baby in a safe sleep space, step away for a few minutes, breathe, and ask another adult to take over. Never shake a baby.",
    "If the cry is unusual, or comes with fever, breathing trouble, low energy, or your gut says something is wrong, call a clinician.",
  ].join(" ");
}

function patternReply(activities: DemoActivity[], language: "zh" | "en") {
  const { counts, latestLabel } = summarizeActivities(activities);
  const summary = `${counts.feeding ?? 0} feeding, ${counts.diaper ?? 0} diaper, ${counts.sleep ?? 0} sleep, ${counts.pumping ?? 0} pumping`;
  if (language === "zh") {
    return [
      `我看到最近的记录大概是：${summary}。${latestLabel ? `最新一条是 ${latestLabel}。` : ""}`,
      "这类总结最适合帮父母减少脑内负担：不用凭记忆猜，只看趋势。",
      "下一步可以只关注一个问题：宝宝今天有没有吃、睡、尿布三个基本信号？如果都有，你已经完成了很重要的照护。",
    ].join(" ");
  }

  return [
    `Here is the recent rhythm I see: ${summary}. ${latestLabel ? `The latest log is ${latestLabel}.` : ""}`,
    "This kind of summary is meant to reduce mental load: you do not have to hold everything in memory.",
    "For the next step, check only one thing: did baby get feeding, sleep, and diaper care today? If yes, you already covered a lot of the real work.",
  ].join(" ");
}

function generalReply(message: string, activities: DemoActivity[], language: "zh" | "en") {
  if (language === "zh") {
    return [
      "我可以陪你一起把问题变小一点。",
      "你可以问我：宝宝吃奶正不正常、睡眠怎么调整、哭闹怎么安抚、尿布怎么看，或者直接说“我现在很崩溃”。",
      patternReply(activities, "zh"),
    ].join(" ");
  }

  return [
    "I can help make this feel smaller.",
    "You can ask about feeding, sleep, crying, diapers, or simply say, “I am overwhelmed right now.”",
    patternReply(activities, "en"),
  ].join(" ");
}

export function generateParentSupportReply({
  message,
  activities,
}: ParentSupportInput): string {
  const cleanMessage = message.trim();
  const language = detectLanguage(cleanMessage);

  if (!cleanMessage) {
    return language === "zh"
      ? "我在这里。你可以问育儿问题，也可以直接告诉我你现在的压力有多大。"
      : "I am here. You can ask a baby-care question, or just tell me how heavy things feel right now.";
  }

  if (hasMatch(cleanMessage, PARENT_CRISIS_PATTERNS)) return parentCrisisReply(language);
  if (hasMatch(cleanMessage, BABY_URGENT_PATTERNS)) return babyUrgentReply(language);

  const intent = detectIntent(cleanMessage);
  if (intent === "emotional") return emotionalReply(cleanMessage, activities, language);
  if (intent === "feeding") return feedingReply(activities, language);
  if (intent === "sleep") return sleepReply(activities, language);
  if (intent === "diaper") return diaperReply(activities, language);
  if (intent === "crying") return cryingReply(language);
  if (intent === "pattern") return patternReply(activities, language);
  return generalReply(cleanMessage, activities, language);
}

export function generateDailySupportInsight(activities: DemoActivity[]): string {
  const { counts } = summarizeActivities(activities);
  const total = activities.length;

  if (total === 0) {
    return "No logs yet today. Start with one tiny entry when you can; the goal is less pressure, not perfect tracking.";
  }

  return [
    `Today has ${counts.feeding ?? 0} feeding, ${counts.diaper ?? 0} diaper, and ${counts.sleep ?? 0} sleep logs so far.`,
    "That is enough to start seeing the day instead of holding it all in your head.",
    "You are allowed to do this one small step at a time.",
  ].join(" ");
}
