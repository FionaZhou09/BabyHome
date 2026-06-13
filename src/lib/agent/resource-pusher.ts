import {
  crisisResourceText,
  type CrisisResourceNeed,
} from "./crisis-resources";
import type { Language } from "./types";

export function withCrisisResources(
  reply: string,
  resourceNeed: CrisisResourceNeed,
  language: Language
) {
  const resourceText = crisisResourceText(resourceNeed, language);
  if (!resourceText) return reply;

  return `${resourceText} ${reply}`;
}
