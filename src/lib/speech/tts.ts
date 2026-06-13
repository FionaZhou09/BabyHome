export type TtsEmotionState = "steady" | "collapsing";

export interface TtsVoiceLike {
  name: string;
  lang: string;
}

export interface TtsProfile {
  delayMs: number;
  rate: number;
  pitch: number;
  volume: number;
}

export interface SpeechPlayback {
  cancel: () => void;
}

const COLLAPSING_PATTERNS = /崩溃|撑不住|绝望|控制不住|想死|自杀|hurt myself|kill myself|suicide|hopeless|overwhelmed/i;

export function inferTtsEmotionState(text: string): TtsEmotionState {
  return COLLAPSING_PATTERNS.test(text) ? "collapsing" : "steady";
}

export function getTtsProfile(emotionState: TtsEmotionState): TtsProfile {
  if (emotionState === "collapsing") {
    return {
      delayMs: 900,
      rate: 0.78,
      pitch: 1.02,
      volume: 0.82,
    };
  }

  return {
    delayMs: 0,
    rate: 0.86,
    pitch: 1.05,
    volume: 0.85,
  };
}

export function selectWarmFemaleVoice<T extends TtsVoiceLike>(voices: T[], preferredLang = "zh-CN") {
  const preferredPrefix = preferredLang.split("-")[0]?.toLowerCase() ?? "zh";
  const scored = voices.map((voice) => {
    const name = voice.name.toLowerCase();
    const lang = voice.lang.toLowerCase();
    let score = 0;
    if (lang === preferredLang.toLowerCase()) score += 8;
    if (lang.startsWith(preferredPrefix)) score += 5;
    if (/xiaoxiao|xiaoyi|tingting/i.test(voice.name)) score += 8;
    if (/female|woman|samantha|google 普通话/i.test(voice.name)) score += 6;
    if (/microsoft|google/i.test(name)) score += 2;
    return { voice, score };
  });

  return scored.sort((a, b) => b.score - a.score)[0]?.voice ?? null;
}

export function isTtsSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

export function stopSpeaking(playback?: SpeechPlayback | null) {
  playback?.cancel();
  if (isTtsSupported()) {
    window.speechSynthesis.cancel();
  }
}

export function speakAssistantReply(
  text: string,
  options: {
    emotionState?: TtsEmotionState;
    lang?: string;
    onEnd?: () => void;
  } = {}
): SpeechPlayback | null {
  if (!isTtsSupported() || !text.trim()) return null;

  const emotionState = options.emotionState ?? inferTtsEmotionState(text);
  const profile = getTtsProfile(emotionState);
  let timeoutId: number | null = null;
  let utterance: SpeechSynthesisUtterance | null = null;

  const speak = () => {
    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang ?? "zh-CN";
    utterance.rate = profile.rate;
    utterance.pitch = profile.pitch;
    utterance.volume = profile.volume;
    utterance.voice = selectWarmFemaleVoice(window.speechSynthesis.getVoices(), utterance.lang);
    utterance.onend = options.onEnd ?? null;
    utterance.onerror = options.onEnd ?? null;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  timeoutId = window.setTimeout(speak, profile.delayMs);

  return {
    cancel: () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      if (utterance) {
        utterance.onend = null;
        utterance.onerror = null;
      }
      window.speechSynthesis.cancel();
    },
  };
}
