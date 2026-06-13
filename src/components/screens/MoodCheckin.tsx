"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Mood = "exhausted" | "managing" | "good" | null;

const moods: { key: Mood & string; emoji: string; label: string }[] = [
  { key: "exhausted", emoji: "😴", label: "很累" },
  { key: "managing", emoji: "🙂", label: "还能撑住" },
  { key: "good", emoji: "😊", label: "还可以" },
];

export function MoodCheckin({
  onMoodSelect,
}: {
  onMoodSelect?: (mood: string) => void;
}) {
  const [selected, setSelected] = useState<Mood>(null);
  const [dismissed, setDismissed] = useState(false);

  // Only show once per day — use sessionStorage as a lightweight gate
  if (typeof window !== "undefined") {
    const key = `babyhome_mood_${new Date().toDateString()}`;
    if (dismissed && !window.sessionStorage.getItem(key)) {
      window.sessionStorage.setItem(key, "1");
    }
    // Don't re-show if already done today
    if (!dismissed && window.sessionStorage.getItem(key)) return null;
  }

  if (dismissed) return null;

  function handleSelect(mood: string) {
    setSelected(mood as Mood);
    onMoodSelect?.(mood);
    // Collapse after a short delay so user sees the confirmation
    setTimeout(() => setDismissed(true), 2400);
  }

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -4 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="rounded-[20px] border-2 border-[var(--color-border)] p-5"
          style={{
            backgroundColor: "#fffbf4",
            boxShadow: "3px 3px 0px var(--color-border)",
          }}
        >
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div
                key="question"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h4 className="font-heading text-[15px] font-bold text-[var(--color-text-primary)] mb-4">
                  你今天感觉怎么样？
                </h4>
                <div className="flex gap-3">
                  {moods.map((m) => (
                    <motion.button
                      key={m.key}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleSelect(m.key)}
                      className="flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border-2 border-[var(--color-border)] bg-white"
                      style={{ boxShadow: "2px 2px 0px var(--color-border)" }}
                    >
                      <span className="text-2xl">{m.emoji}</span>
                      <span className="text-[11px] font-bold font-heading text-[var(--color-text-secondary)]">
                        {m.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-2"
              >
                <p className="text-[14px] font-medium text-[var(--color-text-secondary)] leading-relaxed">
                  谢谢你告诉我。AI 会把你的状态也考虑进去。
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
