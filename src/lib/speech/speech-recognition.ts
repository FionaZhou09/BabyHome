export type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

export interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

export interface SpeechRecognitionResultLike {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternativeLike;
}

export interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: SpeechRecognitionResultLike;
  };
}

export interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechWindowLike = {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

function asSpeechWindowLike(value: unknown): SpeechWindowLike | null {
  return value && typeof value === "object" ? (value as SpeechWindowLike) : null;
}

export function getSpeechRecognitionConstructor(windowLike: unknown) {
  const speechWindow = asSpeechWindowLike(windowLike);
  return speechWindow?.SpeechRecognition ?? speechWindow?.webkitSpeechRecognition ?? null;
}

export function isSpeechRecognitionSupported(windowLike: unknown) {
  return getSpeechRecognitionConstructor(windowLike) !== null;
}

export function collectFinalTranscript(event: SpeechRecognitionEventLike) {
  let transcript = "";
  for (let index = event.resultIndex; index < event.results.length; index += 1) {
    const result = event.results[index];
    if (result?.isFinal) {
      transcript += result[0]?.transcript ?? "";
    }
  }

  return transcript.trim();
}
