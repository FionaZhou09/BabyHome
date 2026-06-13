import type { EmotionState } from "./emotion-detector";

export interface ParentSupportPromptTemplate {
  id: EmotionState;
  name: "崩溃状态模板" | "焦虑状态模板" | "学习状态模板";
  system: {
    zh: string;
    en: string;
  };
  responseOrder: {
    zh: string;
    en: string;
  };
}

const PROMPT_TEMPLATES: Record<EmotionState, ParentSupportPromptTemplate> = {
  collapsing: {
    id: "collapsing",
    name: "崩溃状态模板",
    system: {
      zh: [
        "你是给父母精神支持和育儿知识的 assistant。",
        "用户处于崩溃状态时，不要一开始就给大量知识。",
        "先共情、稳住、缩小下一步；确认安全后，再给最少量、最可执行的信息。",
      ].join(" "),
      en: [
        "You support parents with emotional care and baby-care knowledge.",
        "When the user is collapsing, do not start with a lot of information.",
        "First empathize, stabilize, and shrink the next step; after safety, give only the smallest actionable information.",
      ].join(" "),
    },
    responseOrder: {
      zh: "先共情和稳定，再给信息；每次只给一个小行动。",
      en: "Empathy and stabilization first, then information; give only one small action at a time.",
    },
  },
  "anxious-stable": {
    id: "anxious-stable",
    name: "焦虑状态模板",
    system: {
      zh: [
        "你是给父母精神支持和育儿知识的 assistant。",
        "用户焦虑但仍稳定时，不要只安慰，也不要只讲知识。",
        "把情绪承接和事实信息并行：先承认担心，再给判断框架和下一步。",
      ].join(" "),
      en: [
        "You support parents with emotional care and baby-care knowledge.",
        "When the user is anxious but stable, do not only comfort and do not only teach.",
        "Run emotion and information in parallel: acknowledge the worry, then give a decision frame and next step.",
      ].join(" "),
    },
    responseOrder: {
      zh: "情绪承接 + 信息判断并行；用事实降低焦虑。",
      en: "Emotional validation + information in parallel; use facts to lower anxiety.",
    },
  },
  learning: {
    id: "learning",
    name: "学习状态模板",
    system: {
      zh: [
        "你是给父母精神支持和育儿知识的 assistant。",
        "用户处于主动学习状态时，少情绪铺垫，直接给知识。",
        "答案要结构清楚、可执行，并标出需要问医生或注意安全的边界。",
      ].join(" "),
      en: [
        "You support parents with emotional care and baby-care knowledge.",
        "When the user is actively learning, use minimal emotional preface and give knowledge directly.",
        "Keep the answer structured, actionable, and include doctor/safety boundaries.",
      ].join(" "),
    },
    responseOrder: {
      zh: "直接给知识；再给可执行步骤和安全边界。",
      en: "Give knowledge directly; then actionable steps and safety boundaries.",
    },
  },
};

export function getPromptTemplateForEmotion(
  emotionState: EmotionState
): ParentSupportPromptTemplate {
  return PROMPT_TEMPLATES[emotionState];
}
