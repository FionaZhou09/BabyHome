"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { request } from "@/lib/api/request";

interface Activity {
  id: number;
  category: string;
  timestamp: string;
  feedingSide?: string;
  feedingDuration?: number;
  diaperType?: string;
  sleepLocation?: string;
  sleepStart?: string;
  sleepEnd?: string;
  pumpingLeftAmount?: number;
  pumpingRightAmount?: number;
  otherNote?: string;
}

const categoryColors: Record<string, string> = {
  feeding: "#f0997b",
  diaper: "#5dcaa5",
  sleep: "#f0997b",
  pumping: "#e6b875",
  other: "#8a796e",
};

const categoryLabels: Record<string, string> = {
  feeding: "喂养",
  diaper: "尿布",
  sleep: "睡眠",
  pumping: "吸奶",
  other: "活动",
};

const DAYS = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

export function HistoryScreen() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await request("/api/activities?range=7days");
        const data = await res.json();
        setActivities(data.activities);
      } catch {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function formatTitle(a: Activity): string {
    if (a.category === "feeding") {
      const sideLabels: Record<string, string> = { left: "左侧", right: "右侧", both: "双侧" };
      const side = a.feedingSide ? `（${sideLabels[a.feedingSide] || a.feedingSide}）` : "";
      const dur = a.feedingDuration ? ` · ${a.feedingDuration} 分钟` : "";
      return `母乳${side}${dur}`;
    }
    if (a.category === "diaper") {
      const diaperLabels: Record<string, string> = { wet: "湿尿布", dirty: "大便", mix: "大小便", dry: "干尿布" };
      return `${diaperLabels[a.diaperType || "wet"] || "尿布"}记录`;
    }
    if (a.category === "sleep") {
      const sleepLabels: Record<string, string> = { crib: "婴儿床", bassinet: "摇篮", contact: "抱睡/陪睡" };
      return `睡眠 · ${sleepLabels[a.sleepLocation || "crib"] || "婴儿床"}`;
    }
    if (a.category === "pumping") {
      const total = ((a.pumpingLeftAmount || 0) + (a.pumpingRightAmount || 0)) / 30;
      return `吸奶记录${total > 0 ? ` · ${total.toFixed(1)} oz` : ""}`;
    }
    return a.otherNote || "活动备注";
  }

  function formatTimestamp(iso: string, category: string): string {
    const d = new Date(iso);
    const time = d.toLocaleTimeString("zh-CN", { hour: "numeric", minute: "2-digit", hour12: false });
    return `${time} • ${categoryLabels[category] || category}`;
  }

  // Build 7-day grid: count sleeps per day
  function buildWeekGrid(): { label: string; count: number; isToday: boolean; isBest: boolean }[] {
    const grid = [];
    const today = new Date();
    let maxCount = 0;

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dayActivities = activities.filter((a) => {
        const ad = new Date(a.timestamp);
        return ad.toDateString() === d.toDateString();
      });
      const count = dayActivities.length;
      if (count > maxCount) maxCount = count;
      grid.push({
        label: DAYS[d.getDay() === 0 ? 6 : d.getDay() - 1],
        count,
        isToday: i === 0,
        isBest: false,
      });
    }
    // Mark best day
    grid.forEach((g) => {
      if (g.count === maxCount && maxCount > 0) g.isBest = true;
    });
    return grid;
  }

  const weekGrid = buildWeekGrid();
  const feedingCount = activities.filter((a) => a.category === "feeding").length;

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-accent)] overflow-hidden">
      {/* Header */}
      <div
        className="w-full bg-white border-b-2 border-[var(--color-border)] px-4 py-3.5 sticky top-0 z-20 flex items-center justify-center"
        style={{ boxShadow: "0 2px 8px rgba(93,75,62,0.08)" }}
      >
        <h1 className="font-heading text-[16px] font-bold tracking-tight text-[var(--color-text-primary)]">
          7 天记录
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto w-full px-5 py-6 space-y-7 flex flex-col items-stretch">
        {/* Weekly Digest */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#fff8f5] border-2 border-[var(--color-border)] rounded-[24px] p-5 w-full"
          style={{ boxShadow: "3px 3px 0px var(--color-border)" }}
        >
          <div className="flex items-center justify-between pb-4 border-b-2 border-[var(--color-primary)]/20 mb-4">
            <h4 className="font-heading text-sm font-bold text-[#f1744d] flex items-center gap-2 uppercase tracking-wide">
              <Calendar className="w-4 h-4" strokeWidth={2.5} />
              7 天照护摘要
            </h4>
            <span className="bg-[#ebf7f2] text-[#297c61] border-2 border-[var(--color-secondary)]/40 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
              {feedingCount > 0 ? "有规律" : "刚开始"}
            </span>
          </div>
          <div className="grid grid-cols-7 gap-2 w-full text-center">
            {weekGrid.map((day, i) => (
              <div
                key={i}
                className="p-2 rounded-xl border-2 shrink-0"
                style={{
                  backgroundColor: day.isBest ? "var(--color-primary)" : "white",
                  borderColor: day.isToday ? "var(--color-border)" : "var(--color-border)",
                  boxShadow: "2px 2px 0px var(--color-border)",
                  borderStyle: day.isToday && day.count === 0 ? "dashed" : "solid",
                }}
              >
                <span
                  className="block text-[9px] font-bold uppercase mb-1.5"
                  style={{ color: day.isBest ? "rgba(255,255,255,0.9)" : "var(--color-text-secondary)" }}
                >
                  {day.label}
                </span>
                <span className="text-sm">{day.isToday && day.count === 0 ? "🧸" : day.isBest ? "⭐" : "🌙"}</span>
                <span
                  className="block text-[11px] font-bold mt-1.5"
                  style={{ color: day.isBest ? "white" : day.count === 0 ? "var(--color-text-secondary)" : "var(--color-text-primary)" }}
                >
                  {day.count > 0 ? `${day.count}` : "-"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-2 border-[var(--color-border)] rounded-[24px] p-5 w-full"
          style={{ boxShadow: "3px 3px 0px var(--color-border)" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-heading text-[15px] font-bold text-[var(--color-text-primary)]">
              每日照护时间线
            </h4>
            <span className="text-[10px] bg-[var(--color-text-muted)]/50 border border-[var(--color-border)]/20 px-2.5 py-1 rounded-md font-bold text-[var(--color-text-secondary)] uppercase tracking-wide">
              最近 7 天
            </span>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-3 bg-[var(--color-text-muted)] rounded w-1/3 mb-2" />
                  <div className="h-4 bg-[var(--color-text-muted)] rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[var(--color-text-secondary)] font-medium text-sm">
                还没有照护记录。可以先回到首页点一个分类开始。
              </p>
            </div>
          ) : (
            <div className="relative border-l-[3px] border-[var(--color-text-muted)] pl-6 ml-2.5 space-y-7 pb-2 w-full">
              {activities.map((a) => {
                const color = categoryColors[a.category] || "#8a796e";
                return (
                  <div key={a.id} className="relative w-full">
                    <div
                      className="absolute -left-[32px] top-0 h-4 w-4 rounded-full border-[2.5px] border-[var(--color-border)] z-10"
                      style={{ backgroundColor: color }}
                    />
                    <div>
                      <span className="text-[10px] font-heading font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">
                        {formatTimestamp(a.timestamp, a.category)}
                      </span>
                      <h5 className="font-heading text-[14px] font-bold text-[var(--color-text-primary)] mt-1">
                        {formatTitle(a)}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
