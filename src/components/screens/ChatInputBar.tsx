"use client";

import { motion } from "framer-motion";
import { Mic, MicOff, Send } from "lucide-react";
import { useCallback } from "react";
import { useSpeechInput } from "@/lib/speech/use-speech-input";

interface ChatInputBarProps {
  input: string;
  disabled?: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

export function ChatInputBar({ input, disabled = false, onInputChange, onSend }: ChatInputBarProps) {
  const handleTranscript = useCallback(
    (text: string) => {
      onInputChange(input.trim() ? `${input.trim()} ${text}` : text);
    },
    [input, onInputChange]
  );

  const speech = useSpeechInput({ lang: "zh-CN", onTranscript: handleTranscript });

  return (
    <div className="bg-white border-t-2 border-[var(--color-border)] p-4 shrink-0 w-full z-20 sticky bottom-0">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder={speech.listening ? "正在听你说..." : "Type or speak an anxious question..."}
          className="flex-1 min-w-0 bg-[var(--color-accent)] rounded-xl border-2 border-[var(--color-text-muted)] px-4 py-3.5 text-sm font-bold outline-none focus:border-[var(--color-border)] transition-all text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]"
        />
        {speech.supported && (
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={speech.toggle}
            type="button"
            className={`border-2 border-[var(--color-border)] h-[52px] w-[52px] flex shrink-0 items-center justify-center rounded-xl ${
              speech.listening ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-accent)] text-[var(--color-text-primary)]"
            }`}
            style={{ boxShadow: "2px 2px 0px var(--color-border)" }}
            aria-label={speech.listening ? "停止语音输入" : "开始语音输入"}
          >
            {speech.listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </motion.button>
        )}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={onSend}
          disabled={disabled || !input.trim()}
          className="bg-[var(--color-secondary)] text-white border-2 border-[var(--color-border)] h-[52px] w-[52px] flex shrink-0 items-center justify-center rounded-xl disabled:opacity-40"
          style={{ boxShadow: "2px 2px 0px var(--color-border)" }}
          aria-label="发送消息"
        >
          <Send className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>
      </div>
      {speech.error && (
        <p className="mt-2 px-1 text-[11px] font-semibold text-[var(--color-text-secondary)]">
          语音输入暂时不可用，可以继续打字。
        </p>
      )}
    </div>
  );
}
