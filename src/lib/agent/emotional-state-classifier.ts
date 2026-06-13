import { detectEmotion, type EmotionState } from "./emotion-detector";

export type ParentEmotionalState = EmotionState;

export interface ParentEmotionalStateResult {
  state: ParentEmotionalState;
  label: "崩溃中" | "焦虑但稳" | "主动学习";
  confidence: number;
  matchedSignals: string[];
}

export function classifyParentEmotionalState(message: string): ParentEmotionalStateResult {
  const emotion = detectEmotion(message);
  return {
    state: emotion.emotionState,
    label: emotion.label,
    confidence: emotion.confidence,
    matchedSignals: emotion.matchedSignals,
  };
}
