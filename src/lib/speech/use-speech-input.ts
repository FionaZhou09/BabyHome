"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  collectFinalTranscript,
  getSpeechRecognitionConstructor,
  type SpeechRecognitionLike,
} from "./speech-recognition";

interface UseSpeechInputOptions {
  lang?: string;
  onTranscript: (text: string) => void;
}

export function useSpeechInput({ lang = "zh-CN", onTranscript }: UseSpeechInputOptions) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setListening(false);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSupported(getSpeechRecognitionConstructor(window) !== null);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const start = useCallback(() => {
    const Recognition = getSpeechRecognitionConstructor(window);
    if (!Recognition) {
      setSupported(false);
      return;
    }

    stop();
    setError(null);

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.onresult = (event) => {
      const transcript = collectFinalTranscript(event);
      if (transcript) onTranscript(transcript);
    };
    recognition.onerror = (event) => {
      setError(event.error ?? "speech-error");
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }, [lang, onTranscript, stop]);

  useEffect(() => stop, [stop]);

  return {
    supported,
    listening,
    error,
    start,
    stop,
    toggle: listening ? stop : start,
  };
}
