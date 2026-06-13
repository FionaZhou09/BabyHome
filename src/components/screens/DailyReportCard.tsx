"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

// 4 个月宝宝的常见参考范围
// 睡眠：12-16 小时/天；喂养：5-8 次/天；尿布：6-10 次/天
const todayMetrics = {
  sleep: { value: "14.5 小时", label: "睡眠", status: "ok" as const },
  feeding: { value: "6 次", label: "喂养", status: "ok" as const },
  diapers: { value: "8 次", label: "尿布", status: "ok" as const },
};

const aiSentence =
  "今天整体看起来很稳定。宝宝吃和睡都在一个让人安心的范围里，你已经做得很好了。";

export function DailyReportCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="rounded-[20px] border-2 border-[var(--color-border)] p-5"
      style={{
        backgroundColor: "#faece7",
        boxShadow: "3px 3px 0px var(--color-border)",
      }}
    >
      {/* Title */}
      <h4 className="font-heading text-[15px] font-bold text-[var(--color-text-primary)] mb-4">
        Leo 今日小结
      </h4>

      {/* Metric pills */}
      <div className="flex gap-2 mb-4">
        {Object.values(todayMetrics).map((m) => {
          const isOk = m.status === "ok";
          return (
            <motion.div
              key={m.label}
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex flex-col items-center gap-1 rounded-xl py-3 px-2 border-2"
              style={{
                backgroundColor: isOk ? "#ebf7f2" : "#fff8f0",
                borderColor: isOk ? "#5dcaa5" : "#e6b875",
              }}
            >
              <span className="font-heading text-[15px] font-bold text-[var(--color-text-primary)]">
                {m.value}
              </span>
              <div className="flex items-center gap-1">
                {isOk ? (
                  <CheckCircle size={11} color="#5dcaa5" strokeWidth={2.5} />
                ) : (
                  <AlertCircle size={11} color="#e6b875" strokeWidth={2.5} />
                )}
                <span className="text-[10px] font-bold uppercase tracking-wide"
                  style={{ color: isOk ? "#2c8a6a" : "#b87c28" }}>
                  {m.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* AI sentence */}
      <p className="text-[13px] font-medium leading-relaxed text-[var(--color-text-secondary)]">
        {aiSentence}
      </p>
    </motion.div>
  );
}
