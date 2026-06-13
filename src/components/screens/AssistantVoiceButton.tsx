"use client";

import { motion } from "framer-motion";
import { Square, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  inferTtsEmotionState,
  isTtsSupported,
  speakAssistantReply,
  stopSpeaking,
  type SpeechPlayback,
} from "@/lib/speech/tts";

interface AssistantVoiceButtonProps {
  text: string;
}

export function AssistantVoiceButton({ text }: AssistantVoiceButtonProps) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const playbackRef = useRef<SpeechPlayback | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setSupported(isTtsSupported()), 0);
    return () => {
      window.clearTimeout(timeoutId);
      stopSpeaking(playbackRef.current);
    };
  }, []);

  if (!supported || !text.trim()) return null;

  function handleToggle() {
    if (speaking) {
      stopSpeaking(playbackRef.current);
      playbackRef.current = null;
      setSpeaking(false);
      return;
    }

    const playback = speakAssistantReply(text, {
      emotionState: inferTtsEmotionState(text),
      lang: /[\u3400-\u9fff]/.test(text) ? "zh-CN" : "en-US",
      onEnd: () => {
        playbackRef.current = null;
        setSpeaking(false);
      },
    });
    playbackRef.current = playback;
    setSpeaking(Boolean(playback));
  }

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={handleToggle}
      className="mt-2 inline-flex items-center gap-1.5 rounded-lg border-2 border-[var(--color-secondary)]/30 bg-emerald-50 px-3 py-2 text-[11px] font-bold text-[#256851]"
      aria-label={speaking ? "停止语音回复" : "播放语音回复"}
    >
      {speaking ? <Square className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      {speaking ? "停止" : "轻声读"}
    </motion.button>
  );
}
