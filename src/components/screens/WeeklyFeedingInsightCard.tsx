"use client";

import { motion } from "framer-motion";
import { Bell, Clock, Send, Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchWeeklyFeedingInsight,
  type WeeklyFeedingInsightResponse,
} from "@/lib/api/weekly-feeding-insight";

type WeeklyFeedingInsight = WeeklyFeedingInsightResponse["insight"];

function formatHours(value: number | null) {
  return value === null ? "--" : `${value}h`;
}

function trendLabel(trend: WeeklyFeedingInsight["metrics"]["latestFeedingTrend"]) {
  if (trend === "shorter") return "偏早";
  if (trend === "longer") return "偏晚";
  if (trend === "similar") return "稳定";
  return "学习中";
}

export function WeeklyFeedingInsightCard() {
  const [insight, setInsight] = useState<WeeklyFeedingInsight | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchWeeklyFeedingInsight()
      .then((data) => {
        if (!cancelled) setInsight(data.insight);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  if (!insight) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      className="bg-white border-2 border-[var(--color-border)] rounded-[20px] p-5"
      style={{ boxShadow: "3px 3px 0px var(--color-border)" }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--color-border)]/20 bg-[var(--color-accent)] text-[10px] font-heading font-bold uppercase tracking-wide text-[var(--color-text-secondary)] mb-2">
            <Bell className="w-3 h-3" />
            每周推送预览
          </div>
          <h4 className="font-heading text-[15px] font-bold text-[var(--color-text-primary)]">
            {insight.title}
          </h4>
        </div>
        <div className="h-10 w-10 rounded-xl bg-[#fff8f5] border-2 border-[#f0997b]/30 flex items-center justify-center">
          <Utensils className="w-5 h-5 text-[#f0997b]" strokeWidth={2.5} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="rounded-xl border-2 border-[#f0997b]/20 bg-[#fff8f5] px-2 py-3 text-center">
          <div className="font-heading text-base font-bold text-[var(--color-text-primary)]">
            {insight.metrics.feedingCount}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
            喂养
          </div>
        </div>
        <div className="rounded-xl border-2 border-[#5dcaa5]/20 bg-[#ebf7f2] px-2 py-3 text-center">
          <div className="font-heading text-base font-bold text-[var(--color-text-primary)]">
            {formatHours(insight.metrics.averageFeedingIntervalHours)}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
            平均间隔
          </div>
        </div>
        <div className="rounded-xl border-2 border-[var(--color-border)]/15 bg-[var(--color-accent)] px-2 py-3 text-center">
          <div className="font-heading text-base font-bold text-[var(--color-text-primary)]">
            {trendLabel(insight.metrics.latestFeedingTrend)}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
            最近一次
          </div>
        </div>
      </div>

      <p className="text-[13px] leading-relaxed font-medium text-[var(--color-text-secondary)] mb-3">
        {insight.summary}
      </p>
      <p className="text-[12px] leading-relaxed font-medium text-[#2c8a6a] mb-4">
        {insight.reassurance}
      </p>

      <div className="rounded-xl border border-[var(--color-border)]/15 bg-[var(--color-accent)] p-3 flex items-start gap-2.5">
        <Send className="w-4 h-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-[var(--color-text-secondary)] mb-1">
            <Clock className="w-3 h-3" />
            每周自动生成
          </div>
          <p className="text-[12px] leading-relaxed font-medium text-[var(--color-text-primary)]">
            {insight.pushText}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
