"use client";

import { motion } from "framer-motion";

// Realistic mock data for a 4-month-old over the past 7 days
const weekData = [
  { day: "Mon", sleepHours: 13.5, feedCount: 7 },
  { day: "Tue", sleepHours: 14.0, feedCount: 6 },
  { day: "Wed", sleepHours: 12.5, feedCount: 8 },
  { day: "Thu", sleepHours: 14.5, feedCount: 6 },
  { day: "Fri", sleepHours: 13.0, feedCount: 7 },
  { day: "Sat", sleepHours: 15.0, feedCount: 6 },
  { day: "Sun", sleepHours: 14.5, feedCount: 7 }, // today
];

const MAX_HOURS = 16;
const insight = "Sleep has been improving steadily this week — you're finding your rhythm 🌙";

export function WeeklyInsightsChart() {
  const todayIdx = weekData.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-white border-2 border-[var(--color-border)] rounded-[20px] p-5"
      style={{ boxShadow: "3px 3px 0px var(--color-border)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h4 className="font-heading text-[15px] font-bold text-[var(--color-text-primary)]">
          This Week at a Glance
        </h4>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] bg-[var(--color-accent)] border border-[var(--color-border)] px-2.5 py-1 rounded-md">
          7 Days
        </span>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end gap-2 h-[110px] mb-3">
        {weekData.map((d, i) => {
          const isToday = i === todayIdx;
          const barHeightPct = (d.sleepHours / MAX_HOURS) * 100;

          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              {/* Hour label */}
              <span
                className="font-heading text-[10px] font-bold"
                style={{ color: isToday ? "var(--color-primary)" : "var(--color-text-secondary)" }}
              >
                {d.sleepHours}h
              </span>

              {/* Bar */}
              <motion.div
                className="w-full rounded-t-lg rounded-b-sm"
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                style={{
                  height: `${barHeightPct}%`,
                  backgroundColor: isToday ? "#f0997b" : "#f5c4b3",
                  opacity: isToday ? 1 : 0.75,
                  border: isToday ? "2px solid var(--color-border)" : "1.5px solid #f5c4b3",
                  minHeight: 8,
                }}
              />

              {/* Feed dots */}
              <div className="flex flex-wrap justify-center gap-[2px] mt-1">
                {Array.from({ length: Math.min(d.feedCount, 8) }).map((_, j) => (
                  <div
                    key={j}
                    className="w-[5px] h-[5px] rounded-full"
                    style={{
                      backgroundColor: isToday ? "#5dcaa5" : "#b8e8d5",
                    }}
                  />
                ))}
              </div>

              {/* Day label */}
              <span
                className="font-heading text-[10px] font-bold mt-0.5"
                style={{
                  color: isToday ? "var(--color-primary)" : "var(--color-text-secondary)",
                }}
              >
                {isToday ? "Today" : d.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[var(--color-primary)]" />
          <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">Sleep (hrs)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#5dcaa5]" />
          <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">Feedings</span>
        </div>
      </div>

      {/* AI Insight line */}
      <div className="pt-3 border-t border-[var(--color-border)]">
        <p className="text-[13px] font-medium leading-relaxed" style={{ color: "#2c8a6a" }}>
          {insight}
        </p>
      </div>
    </motion.div>
  );
}
