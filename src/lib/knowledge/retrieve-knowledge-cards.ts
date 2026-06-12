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
  feeding: [/feed|milk|formula|breast|nursing|bottle|hungry|奶|母乳|配方|奶粉|水奶|瓶喂|饿|喂/i],
  sleep: [/sleep|nap|wake|night|bedtime|睡|觉|醒|晚上|夜里|半夜|夜醒|小睡|哄睡/i],
  diaper: [/diaper|poop|stool|bowel|pee|urine|wet|尿布|大便|便便|拉|粑粑|尿|小便/i],
  crying: [/cry|fussy|colic|soothe|calm|哭|哭闹|安抚|肠绞痛/i],
  "parent-support": [/overwhelmed|anxious|exhausted|stress|崩溃|焦虑|撑不住|压力|累/i],
  safety: [/fever|breath|emergency|911|988|发烧|呼吸|急诊|危险|伤害/i],
};

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
  const score =
    keywordScore(card, question) +
    topicScore(card, question) +
    ageScore(card, babyAgeMonths);

  const hasTextMatch = keywordScore(card, question) > 0 || topicScore(card, question) > 0;
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
