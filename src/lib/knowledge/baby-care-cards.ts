import { commonCareCards } from "./cards/common";
import { oneToThreeMonthCards } from "./cards/one-to-three-months";
import { threeToSixMonthCards } from "./cards/three-to-six-months";
import { sixToNineMonthCards } from "./cards/six-to-nine-months";
import { nineToTwelveMonthCards } from "./cards/nine-to-twelve-months";
import { zeroToOneMonthCards } from "./cards/zero-to-one-month";

export type KnowledgeTopic =
  | "feeding"
  | "sleep"
  | "diaper"
  | "development"
  | "crying"
  | "parent-support"
  | "safety";

export interface BabyCareKnowledgeCard {
  id: string;
  title: string;
  ageRangeMonths: {
    min: number;
    max: number;
  };
  topics: KnowledgeTopic[];
  keywords: string[];
  answer: {
    zh: string;
    en: string;
  };
  warningSigns?: {
    zh: string;
    en: string;
  };
  sources: {
    label: string;
    url: string;
  }[];
}

export const babyCareKnowledgeCards: BabyCareKnowledgeCard[] = [
  ...commonCareCards,
  ...zeroToOneMonthCards,
  ...oneToThreeMonthCards,
  ...threeToSixMonthCards,
  ...sixToNineMonthCards,
  ...nineToTwelveMonthCards,
];
