export type ParentEmotionalState = "collapsing" | "anxious-stable" | "learning";

export interface ParentEmotionalStateResult {
  state: ParentEmotionalState;
  label: "崩溃中" | "焦虑但稳" | "主动学习";
  confidence: number;
  matchedSignals: string[];
}

const STATE_LABELS: Record<ParentEmotionalState, ParentEmotionalStateResult["label"]> = {
  collapsing: "崩溃中",
  "anxious-stable": "焦虑但稳",
  learning: "主动学习",
};

const COLLAPSING_PATTERNS = [
  /崩溃|撑不住|受不了了|扛不住|不行了|快疯了|控制不住|一直哭|完全睡不了|没法睡/i,
  /overwhelmed|cannot cope|can't cope|breaking down|losing it|at my limit|so exhausted/i,
];

const ANXIOUS_STABLE_PATTERNS = [
  /焦虑|担心|害怕|怕|紧张|不确定|正常吗|有没有问题|会不会|还可以|有点/i,
  /anxious|worried|scared|nervous|is it normal|what if|not sure|a little/i,
];

const LEARNING_PATTERNS = [
  /想学习|想了解|怎么|如何|可以.*吗|应该|需要|建议|计划|准备|知识|引入|建立/i,
  /learn|understand|how do|how to|should|can i|tips|plan|prepare|introduce/i,
];

function scorePatterns(message: string, patterns: RegExp[]) {
  return patterns.reduce(
    (result, pattern) => {
      if (!pattern.test(message)) return result;
      return {
        score: result.score + 1,
        matchedSignals: [...result.matchedSignals, pattern.source],
      };
    },
    { score: 0, matchedSignals: [] as string[] }
  );
}

export function classifyParentEmotionalState(message: string): ParentEmotionalStateResult {
  const collapsing = scorePatterns(message, COLLAPSING_PATTERNS);
  const anxiousStable = scorePatterns(message, ANXIOUS_STABLE_PATTERNS);
  const learning = scorePatterns(message, LEARNING_PATTERNS);

  let state: ParentEmotionalState = "learning";
  let score = learning.score;
  let matchedSignals = learning.matchedSignals;

  if (anxiousStable.score > score) {
    state = "anxious-stable";
    score = anxiousStable.score;
    matchedSignals = anxiousStable.matchedSignals;
  }

  if (collapsing.score > 0 && collapsing.score >= anxiousStable.score) {
    state = "collapsing";
    score = collapsing.score;
    matchedSignals = collapsing.matchedSignals;
  }

  return {
    state,
    label: STATE_LABELS[state],
    confidence: Math.min(1, 0.45 + score * 0.2),
    matchedSignals,
  };
}
