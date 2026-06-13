import type { DemoActivity, DemoChatMessage } from "@/lib/demo/types";
import type { BabyCareKnowledgeCard } from "@/lib/knowledge/baby-care-cards";
import { retrieveKnowledgeCards } from "@/lib/knowledge/retrieve-knowledge-cards";
import { detectEmotion, type EmotionDetectionResult } from "./emotion-detector";
import {
  getPromptTemplateForEmotion,
  type ParentSupportPromptTemplate,
} from "./prompt-templates";

type Intent = "emotional" | "feeding" | "sleep" | "diaper" | "crying" | "pattern" | "general";
type DiaperTopic = "poop" | "pee" | "general";

interface ParentSupportInput {
  message: string;
  activities: DemoActivity[];
  history?: DemoChatMessage[];
}

type SafetyStatus = "ok" | "baby-urgent" | "parent-crisis";

interface ActivityLogContext {
  activities: DemoActivity[];
  summary: ReturnType<typeof summarizeActivities>;
}

interface SafetyCheckResult {
  status: SafetyStatus;
}

export interface ParentSupportContext {
  cleanMessage: string;
  language: "zh" | "en";
  emotion: EmotionDetectionResult;
  promptTemplate: ParentSupportPromptTemplate;
  babyAgeMonths: number;
  knowledgeCards: BabyCareKnowledgeCard[];
  logContext: ActivityLogContext;
  safety: SafetyCheckResult;
  intent: Intent;
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
  sleep: [/sleep|nap|wake|waking|night|bedtime|睡|觉|醒|晚上|夜里|半夜|夜醒|小睡|哄睡/i],
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

function readActivityLogContext(activities: DemoActivity[]): ActivityLogContext {
  return {
    activities,
    summary: summarizeActivities(activities),
  };
}

function assessSafety(message: string, emotion: EmotionDetectionResult): SafetyCheckResult {
  if (emotion.urgencyLevel === "crisis" || hasMatch(message, PARENT_CRISIS_PATTERNS)) {
    return { status: "parent-crisis" };
  }

  if (hasMatch(message, BABY_URGENT_PATTERNS)) {
    return { status: "baby-urgent" };
  }

  return { status: "ok" };
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

const CHINESE_MONTH_NUMBERS: Record<string, number> = {
  一: 1,
  二: 2,
  两: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
  十: 10,
  十一: 11,
  十二: 12,
};

function inferTextAgeMonths(message: string) {
  const digitMatch = message.match(/(\d{1,2})\s*(?:个)?月/);
  if (digitMatch) {
    return Math.min(24, Math.max(0, Number(digitMatch[1])));
  }

  const chineseMatch = message.match(/(十二|十一|十|九|八|七|六|五|四|三|两|二|一)\s*(?:个)?月/);
  if (chineseMatch) {
    return CHINESE_MONTH_NUMBERS[chineseMatch[1]];
  }

  if (/新生儿|刚出生|newborn/i.test(message)) {
    return 0;
  }

  return null;
}

function inferBabyAgeMonths(message: string, activities: DemoActivity[]) {
  return inferTextAgeMonths(message) ?? activities[0]?.babyAgeMonths ?? 4;
}

function formatBabyAgeLabel(babyAgeMonths: number, language: "zh" | "en") {
  if (babyAgeMonths <= 0) {
    return language === "zh" ? "新生儿" : "newborn";
  }

  return language === "zh"
    ? `${babyAgeMonths} 个月宝宝`
    : `${babyAgeMonths}-month-old babies`;
}

function activityContextLine(activities: DemoActivity[], language: "zh" | "en") {
  const { counts } = summarizeActivities(activities);
  if (activities.length === 0) {
    return language === "zh"
      ? "我现在还没有看到最近记录，所以先按通用月龄知识回答。"
      : "I do not see recent logs yet, so I will answer from general age-based guidance.";
  }

  if (language === "zh") {
    return `结合最近记录，我看到 ${counts.feeding ?? 0} 次喂养、${counts.diaper ?? 0} 次尿布、${counts.sleep ?? 0} 次睡眠。记录不用完美，它只是帮你少靠记忆硬撑。`;
  }

  return `From recent logs, I see ${counts.feeding ?? 0} feeding, ${counts.diaper ?? 0} diaper, and ${counts.sleep ?? 0} sleep entries. Logs do not need to be perfect; they are here to lower your mental load.`;
}

function sourceLine(cards: BabyCareKnowledgeCard[], language: "zh" | "en") {
  const labels = Array.from(
    new Set(cards.flatMap((card) => card.sources.map((source) => source.label)))
  )
    .slice(0, 3)
    .join(", ");
  return language === "zh" ? `参考方向：${labels}。` : `Reference direction: ${labels}.`;
}

function answerFromKnowledgeCards(
  cards: BabyCareKnowledgeCard[],
  activities: DemoActivity[],
  language: "zh" | "en",
  emotion: EmotionDetectionResult
) {
  const [primaryCard, secondaryCard] = cards;
  const lines = [emotionalStateLine(emotion, language), primaryCard.answer[language]];

  if (secondaryCard) {
    lines.push(
      language === "zh"
        ? `相关补充：${secondaryCard.answer.zh}`
        : `Related note: ${secondaryCard.answer.en}`
    );
  }

  lines.push(activityContextLine(activities, language));

  const warningSigns = Array.from(
    new Set(cards.flatMap((card) => (card.warningSigns ? [card.warningSigns[language]] : [])))
  );
  if (warningSigns.length > 0) {
    lines.push(warningSigns.join(" "));
  }

  lines.push(sourceLine(cards, language));
  return lines.join(" ");
}

function emotionalStateLine(
  emotion: EmotionDetectionResult,
  language: "zh" | "en"
) {
  if (language === "zh") {
    if (emotion.emotionState === "collapsing") {
      return "我先陪你把情况稳住：先把下一步缩小，不需要现在解决全部问题。";
    }
    if (emotion.emotionState === "anxious-stable") {
      return "我听到你有点担心，但你还在有条理地观察宝宝；我们一步一步看。";
    }
    return "这个问题很适合用学习模式来处理：先抓重点，再决定今天要做哪一小步。";
  }

  if (emotion.emotionState === "collapsing") {
    return "Let us steady this first: make the next step smaller; you do not need to solve everything right now.";
  }
  if (emotion.emotionState === "anxious-stable") {
    return "I hear the worry, and you are still observing baby thoughtfully. We can take this one step at a time.";
  }
  return "This is a good learning-mode question: start with the key idea, then choose one small next step for today.";
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
      "如果你在美国或加拿大，并且你或宝宝可能有立即危险，请拨打 911；如果是心理危机，也可以拨打或短信 988。",
      "美国的孕产/产后心理支持热线是 1-833-TLC-MAMA；加拿大用户可以联系当地省/地区 health line、家庭医生或产后支持资源。",
      "你不是坏父母，这是需要支持的紧急时刻。先让另一个成年人接手宝宝，下一分钟只做求助这一件事。",
    ].join(" ");
  }

  return [
    "You do not have to hold this alone. First, place the baby somewhere safe, like their crib, then contact a real person immediately.",
    "If you are in the U.S. or Canada and you or the baby may be in immediate danger, call 911. For mental health crisis support, call or text 988.",
    "In the U.S., the National Maternal Mental Health Hotline is 1-833-TLC-MAMA. In Canada, contact your provincial or territorial health line, family doctor, or local postpartum support service.",
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

function sleepReply(
  message: string,
  activities: DemoActivity[],
  language: "zh" | "en",
  babyAgeMonths: number
) {
  const sleepCount = activities.filter((activity) => activity.category === "sleep").length;
  const asksAboutWaking = /wake|waking|night|醒|晚上|夜里|半夜|夜醒/i.test(message);
  const babyAgeLabel = formatBabyAgeLabel(babyAgeMonths, language);

  if (language === "zh") {
    if (asksAboutWaking) {
      return [
        `${babyAgeLabel}晚上反复醒很常见，可能和睡眠周期变化、白天刺激、猛长期、出牙前后、分离焦虑或正在练新技能有关。`,
        "你可以先不用急着追求“一觉到天亮”。更实际的是看三个信号：宝宝白天精神还可以、吃奶和尿布没有明显下降、醒来后能被安抚回去。",
        "今晚可以试一个很小的策略：睡前流程固定 10-15 分钟，夜里先等 30-60 秒观察，再用低光、低声音、轻拍或抱起放下安抚。",
        `我也会参考你的记录；目前最近 7 天里看到 ${sleepCount} 条睡眠记录。记录不用完美，只要能帮你少靠记忆硬撑就够了。`,
        "如果夜醒伴随发烧、呼吸异常、明显吃奶变差、尿布变少或精神很差，那就建议联系儿科医生。",
      ].join(" ");
    }

    return [
      `最近记录里有 ${sleepCount} 次睡眠。宝宝睡眠不稳定很常见，尤其在猛长期、出牙、白天刺激多的时候。`,
      "你可以先追求“安全 + 可重复”，而不是完美作息：固定一个睡前小流程，灯光变暗，声音变低，醒来后先观察再介入。",
      "安全睡眠的底线是：仰睡、平坦睡眠表面、睡眠区域不要放松软物品。",
    ].join(" ");
  }

  if (asksAboutWaking) {
    return [
      `Yes, frequent night waking can be common for ${babyAgeLabel}. It may relate to sleep-cycle changes, daytime stimulation, growth shifts, teething, separation anxiety, or practicing new skills.`,
      "Before aiming for sleeping through the night, check the calmer signals: baby is alert enough during the day, feeding and wet diapers have not dropped, and baby can usually be soothed back down.",
      "For tonight, try one small plan: a consistent 10-15 minute bedtime routine, pause 30-60 seconds before intervening, then use low light, a quiet voice, gentle patting, or pick-up-put-down soothing.",
      `I can also use your logs as context; I see ${sleepCount} recent sleep ${sleepCount === 1 ? "log" : "logs"} in the last 7 days.`,
      "If night waking comes with fever, breathing changes, poor feeding, fewer wet diapers, or unusual low energy, contact your pediatrician.",
    ].join(" ");
  }

  return [
    `I see ${sleepCount} recent sleep ${sleepCount === 1 ? "log" : "logs"}. Uneven sleep is common, especially during growth shifts, teething, or busy days.`,
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

function detectDiaperTopic(message: string): DiaperTopic {
  if (/poop|stool|bowel|大便|便便|拉|粑粑|屎/i.test(message)) return "poop";
  if (/pee|urine|wet diaper|尿|湿尿布|小便/i.test(message)) return "pee";
  return "general";
}

function poopReply(message: string, language: "zh" | "en") {
  const isNewborn = /newborn|新生儿|刚出生|出生|first week|第一周/i.test(message);

  if (language === "zh") {
    if (isNewborn) {
      return [
        "新生儿一天拉几次差异很大，但可以这样粗略看：出生后前 1-2 天通常会排黑绿色、黏黏的胎便；到第一周末，很多宝宝一天可以有 5-10 次大便，也可能吃奶后就拉。",
        "之后随着宝宝长大，次数可能会下降。母乳宝宝有时一天多次，也有些几天一次；配方奶宝宝常见是一天 1 次左右，但也会有个人差异。",
        "比次数更重要的是：大便是不是柔软、宝宝吃奶和尿布是否正常、精神状态是否还可以。",
        "如果大便是白色/灰白色、明显带血、黑便不是出生最初几天的胎便、宝宝肚子很胀很痛、持续呕吐、吃奶差或精神很差，建议联系儿科医生。",
      ].join(" ");
    }

    return [
      "宝宝大便次数本来范围就很宽：有的宝宝一天几次，有的几天一次。只要大便是软的、宝宝吃奶和长势正常、精神状态不错，单看次数通常不用太紧张。",
      "母乳宝宝可能更频繁，也可能过了几周后变少；配方奶宝宝通常大便更成形、频率也可能更少。",
      "需要留意的是颜色和状态：白色/灰白、红色血便、异常黑便、硬球状便、明显腹胀疼痛、持续呕吐或精神差，都建议问儿科医生。",
    ].join(" ");
  }

  if (isNewborn) {
    return [
      "Newborn poop frequency varies a lot. In the first 1-2 days, babies usually pass dark, sticky meconium. By the end of the first week, many newborns may poop 5-10 times a day, sometimes after feeds.",
      "After that, frequency often changes. Breastfed babies may poop several times a day or sometimes go days between stools; formula-fed babies often poop about once a day, but there is variation.",
      "The calmer checks are: stool is soft, feeding and wet diapers are okay, baby is gaining as expected, and baby seems reasonably alert.",
      "Call your pediatrician for white or gray stool, blood, black stool beyond the early meconium days, a swollen painful belly, repeated vomiting, poor feeding, or unusual low energy.",
    ].join(" ");
  }

  return [
    "Baby poop frequency has a wide normal range: some babies poop several times a day, while others go a few days between stools.",
    "Soft stool, normal feeding, steady wet diapers, growth, and alertness matter more than the exact number.",
    "Ask your pediatrician about white or gray stool, blood, black stool outside the newborn meconium period, hard pellet-like stool, a swollen painful belly, repeated vomiting, poor feeding, or unusual low energy.",
  ].join(" ");
}

function wetDiaperReply(activities: DemoActivity[], language: "zh" | "en") {
  const diaperCount = activities.filter((activity) => activity.category === "diaper").length;

  if (language === "zh") {
    return [
      `最近记录里有 ${diaperCount} 次尿布。湿尿布主要用来帮助判断宝宝摄入和补水情况。`,
      "如果湿尿布突然明显变少、嘴唇很干、哭没有眼泪、囟门凹陷、精神变差，建议尽快联系儿科医生。",
      "如果只是一天内小波动，可以继续记录，并结合吃奶、精神状态和体重增长一起看。",
    ].join(" ");
  }

  return [
    `I see ${diaperCount} diaper logs recently. Wet diapers are mainly useful for tracking intake and hydration.`,
    "If wet diapers suddenly drop, lips are very dry, there are no tears when crying, the soft spot looks sunken, or baby seems unusually low-energy, contact your pediatrician promptly.",
    "If it is just a small day-to-day change, keep tracking and look at feeding, alertness, and growth together.",
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

export function buildParentSupportContext({
  message,
  activities,
}: ParentSupportInput): ParentSupportContext {
  const cleanMessage = message.trim();
  const language = detectLanguage(cleanMessage);
  const emotion = detectEmotion(cleanMessage);
  const promptTemplate = getPromptTemplateForEmotion(emotion.emotionState);
  const babyAgeMonths = inferBabyAgeMonths(cleanMessage, activities);
  const knowledgeCards = retrieveKnowledgeCards(cleanMessage, babyAgeMonths, 2);
  const logContext = readActivityLogContext(activities);
  const safety = assessSafety(cleanMessage, emotion);
  const intent = detectIntent(cleanMessage);

  return {
    cleanMessage,
    language,
    emotion,
    promptTemplate,
    babyAgeMonths,
    knowledgeCards,
    logContext,
    safety,
    intent,
  };
}

function generateReplyFromContext(context: ParentSupportContext) {
  const {
    cleanMessage,
    language,
    emotion,
    babyAgeMonths,
    knowledgeCards,
    logContext,
    safety,
    intent,
  } = context;

  if (!cleanMessage) {
    return language === "zh"
      ? "我在这里。你可以问育儿问题，也可以直接告诉我你现在的压力有多大。"
      : "I am here. You can ask a baby-care question, or just tell me how heavy things feel right now.";
  }

  if (safety.status === "parent-crisis") return parentCrisisReply(language);
  if (safety.status === "baby-urgent") return babyUrgentReply(language);

  if (knowledgeCards.length > 0) {
    return answerFromKnowledgeCards(knowledgeCards, logContext.activities, language, emotion);
  }

  if (intent === "emotional") return emotionalReply(cleanMessage, logContext.activities, language);
  if (intent === "feeding") return feedingReply(logContext.activities, language);
  if (intent === "sleep") return sleepReply(cleanMessage, logContext.activities, language, babyAgeMonths);
  if (intent === "diaper") {
    const diaperTopic = detectDiaperTopic(cleanMessage);
    if (diaperTopic === "poop") return poopReply(cleanMessage, language);
    if (diaperTopic === "pee") return wetDiaperReply(logContext.activities, language);
    return diaperReply(logContext.activities, language);
  }
  if (intent === "crying") return cryingReply(language);
  if (intent === "pattern") return patternReply(logContext.activities, language);
  return generalReply(cleanMessage, logContext.activities, language);
}

export function generateParentSupportReply(input: ParentSupportInput): string {
  return generateReplyFromContext(buildParentSupportContext(input));
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
