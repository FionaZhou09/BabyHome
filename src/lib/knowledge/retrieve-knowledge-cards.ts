import {
  babyCareKnowledgeCards,
  type BabyCareKnowledgeCard,
  type KnowledgeTopic,
} from "./baby-care-cards";

interface ScoredKnowledgeCard {
  card: BabyCareKnowledgeCard;
  score: number;
}

const TOPIC_HINTS: Record<KnowledgeTopic, RegExp[]> = {
  feeding: [/feed|milk|formula|breast|nursing|bottle|hungry|meal|snack|picky|wean|奶|母乳|配方|奶粉|水奶|瓶喂|饿|喂|辅食|吃饭|挑食|断奶|夜奶/i],
  sleep: [/sleep|nap|wake|night|bedtime|睡|觉|醒|晚上|夜里|半夜|夜醒|小睡|哄睡/i],
  diaper: [/diaper|poop|stool|bowel|pee|urine|wet|potty|toilet|尿布|大便|便便|拉|粑粑|尿|小便|如厕|厕所|马桶|戒尿布/i],
  development: [/milestone|development|roll|sit|crawl|stand|walk|tummy|play|interaction|language|speech|word|talk|里程碑|发育|陪玩|互动|翻身|坐|爬|站|走|趴|语言|说话|词汇/i],
  crying: [/cry|fussy|colic|soothe|calm|tantrum|emotion|哭|哭闹|安抚|哄|肠绞痛|发脾气|情绪|打人|咬人/i],
  "parent-support": [/overwhelmed|anxious|exhausted|stress|boundary|autonomy|崩溃|焦虑|撑不住|压力|累|边界|自主|不听话/i],
  safety: [/fever|breath|emergency|chok|gag|911|988|climb|run|fall|发烧|呼吸|急诊|危险|伤害|噎|呛|窒息|爬高|摔|跑/i],
};

const SAFETY_PRIORITY_HINTS = /chok|gag|emergency|911|breath|fever|噎|呛|窒息|急诊|危险|呼吸|发烧/i;

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function ageScore(card: BabyCareKnowledgeCard, babyAgeMonths: number) {
  if (
    babyAgeMonths >= card.ageRangeMonths.min &&
    babyAgeMonths <= card.ageRangeMonths.max
  ) {
    return 4;
  }

  const distance =
    babyAgeMonths < card.ageRangeMonths.min
      ? card.ageRangeMonths.min - babyAgeMonths
      : babyAgeMonths - card.ageRangeMonths.max;

  return Math.max(0, 2 - distance);
}

function keywordScore(card: BabyCareKnowledgeCard, question: string) {
  const normalizedQuestion = normalize(question);
  return card.keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalize(keyword);
    if (normalizedKeyword && normalizedQuestion.includes(normalizedKeyword)) {
      if (/^(\d+|[一二三四五六七八九十]+)个月$/.test(normalizedKeyword)) {
        return score + 1;
      }
      return score + Math.min(8, Math.max(2, normalizedKeyword.length));
    }
    return score;
  }, 0);
}

function topicScore(card: BabyCareKnowledgeCard, question: string) {
  return card.topics.reduce((score, topic) => {
    const hasTopic = TOPIC_HINTS[topic].some((pattern) => pattern.test(question));
    return hasTopic ? score + 3 : score;
  }, 0);
}

function scoreCard(card: BabyCareKnowledgeCard, question: string, babyAgeMonths: number) {
  const cardKeywordScore = keywordScore(card, question);
  const cardTopicScore = topicScore(card, question);
  const safetyPriority =
    card.topics.includes("safety") && SAFETY_PRIORITY_HINTS.test(question) ? 8 : 0;
  const specificSafetyPriority = safetyPriority > 0 && cardKeywordScore > 0 ? 4 : 0;
  const score =
    cardKeywordScore +
    cardTopicScore +
    ageScore(card, babyAgeMonths) +
    safetyPriority +
    specificSafetyPriority;

  const hasTextMatch = cardKeywordScore > 0 || cardTopicScore > 0;
  return hasTextMatch ? score : 0;
}

export function retrieveKnowledgeCards(
  question: string,
  babyAgeMonths: number,
  limit = 3
): BabyCareKnowledgeCard[] {
  return babyCareKnowledgeCards
    .map<ScoredKnowledgeCard>((card) => ({
      card,
      score: scoreCard(card, question, babyAgeMonths),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.card);
}
