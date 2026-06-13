"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Shield, Star, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { request } from "@/lib/api/request";
import { DailyReportCard } from "./DailyReportCard";
import { WeeklyFeedingInsightCard } from "./WeeklyFeedingInsightCard";
import { WeeklyInsightsChart } from "./WeeklyInsightsChart";
import { MoodCheckin } from "./MoodCheckin";

interface Activity {
  id: number;
  category: string;
  timestamp: string;
  feedingType?: string;
  feedingSide?: string;
  feedingDuration?: number;
  feedingAmount?: number;
  diaperType?: string;
  sleepLocation?: string;
}

interface Insight {
  id: number;
  content: string;
  generatedAt: string;
}

const categoryConfig = {
  feeding: { bg: "#fff8f5", color: "#f0997b", icon: Plus, label: "Feeding" },
  diaper: { bg: "#f5fcfa", color: "#5dcaa5", icon: Shield, label: "Diaper" },
  sleep: { bg: "#fff8f5", color: "#f0997b", icon: Star, label: "Sleep" },
  pumping: { bg: "#fffbf4", color: "#e6b875", icon: Plus, label: "Pumping" },
};

function getStoredBabyProfile() {
  if (typeof window === "undefined") return { babyName: "Leo", babyAge: 4, hasProfile: true };
  const raw = localStorage.getItem("babyhome_profile");
  if (!raw) return { babyName: "Leo", babyAge: 4, hasProfile: false };

  try {
    const { name, dob, ageMonths } = JSON.parse(raw) as {
      name?: string;
      dob?: string;
      ageMonths?: number;
    };
    if (dob) {
      const [y, mo, d] = dob.split("-").map(Number);
      const today = new Date();
      let months = (today.getFullYear() - y) * 12 + (today.getMonth() - (mo - 1));
      if (today.getDate() < d) months -= 1;
      return { babyName: name || "Leo", babyAge: Math.max(0, months), hasProfile: true };
    }
    return {
      babyName: name || "Leo",
      babyAge: typeof ageMonths === "number" ? ageMonths : 4,
      hasProfile: true,
    };
  } catch {
    return { babyName: "Leo", babyAge: 4, hasProfile: false };
  }
}

export function HomeScreen() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setParentMood] = useState<string | null>(null);
  const [profile] = useState(getStoredBabyProfile);
  const { babyName, babyAge } = profile;

  // Gate: redirect to onboarding if no profile saved yet
  useEffect(() => {
    if (!profile.hasProfile) {
      router.replace("/onboarding");
    }
  }, [profile.hasProfile, router]);

  useEffect(() => {
    async function load() {
      try {
        const [actRes, insightRes] = await Promise.all([
          request("/api/activities"),
          request("/api/insights"),
        ]);
        const actData = await actRes.json();
        const insightData = await insightRes.json();
        setActivities(actData.activities.slice(0, 3));
        setInsight(insightData.insight);
      } catch (err) {
        console.error("Failed to load home data", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function formatActivityLabel(a: Activity): string {
    if (a.category === "feeding") {
      const side = a.feedingSide ? ` (${a.feedingSide === "left" ? "Left" : a.feedingSide === "right" ? "Right" : "Both"} Side)` : "";
      const duration = a.feedingDuration ? ` - ${a.feedingDuration}m` : "";
      return `Breast${side}${duration}`;
    }
    if (a.category === "sleep") {
      return a.sleepLocation ? `Sleep - ${a.sleepLocation}` : "Sleep";
    }
    if (a.category === "diaper") {
      return a.diaperType ? `Diaper (${a.diaperType})` : "Diaper";
    }
    return a.category;
  }

  function formatTime(iso: string): string {
    return new Date(iso).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-accent)] overflow-hidden">
      {/* Header */}
      <div
        className="w-full bg-white border-b-2 border-[var(--color-border)] px-4 py-3 flex items-center justify-between shrink-0 sticky top-0 z-20"
        style={{ boxShadow: "0 2px 8px rgba(93,75,62,0.08)" }}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[var(--color-primary)] border-2 border-[var(--color-border)] flex items-center justify-center font-heading text-xl text-white font-bold">
            B
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold tracking-tight text-[var(--color-text-primary)] flex items-center gap-2">
              BabyHome{" "}
              <span className="text-[10px] bg-[var(--color-text-muted)] px-2 py-0.5 rounded-full font-body font-bold text-[var(--color-text-secondary)]">
                AI Powered
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto w-full px-5 pt-5 pb-8 space-y-6">
        {/* Profile Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-[var(--color-border)] rounded-[20px] p-5"
          style={{ boxShadow: "3px 3px 0px var(--color-border)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-full bg-[var(--color-text-muted)] flex items-center justify-center border-2 border-[var(--color-border)]">
                <Shield className="w-6 h-6 text-[var(--color-text-primary)]" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-[var(--color-text-primary)] leading-tight">
                  {babyName}
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)] font-medium mt-0.5">
                  {babyAge} months old
                </p>
              </div>
            </div>
            <div
              className="bg-[#ebf7f2] border-2 border-[var(--color-secondary)] px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{ boxShadow: "1px 1px 0px var(--color-secondary)" }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-secondary)] animate-pulse"></span>
              <span className="text-xs font-heading text-[var(--color-text-primary)] font-semibold">
                Tuned In
              </span>
            </div>
          </div>
        </motion.div>

        {/* Daily Report Card — directly below the greeting banner */}
        <DailyReportCard />

        {!loading && <WeeklyFeedingInsightCard />}

        {/* Quick Log Buttons */}
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-[var(--color-text-secondary)] mb-4">
            Giant One-Hand Logs
          </h3>
          <div className="grid grid-cols-2 gap-3.5">
            {Object.entries(categoryConfig).map(([key, cfg]) => (
              <motion.button
                key={key}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(`/logs?category=${key}`)}
                className="h-[104px] p-3 flex flex-col items-center justify-center rounded-[20px] border-2 border-[var(--color-border)]"
                style={{
                  backgroundColor: cfg.bg,
                  boxShadow: "3px 3px 0px var(--color-border)",
                }}
              >
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center mb-2"
                  style={{
                    backgroundColor: `${cfg.color}15`,
                    border: `2px solid ${cfg.color}20`,
                  }}
                >
                  <cfg.icon size={24} style={{ color: cfg.color }} strokeWidth={2.5} />
                </div>
                <span className="font-heading text-[13px] font-bold text-[var(--color-text-primary)]">
                  {cfg.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* AI Teaser Card */}
        {insight && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#ebf7f2] border-2 border-[var(--color-border)] rounded-[20px] p-5 relative overflow-hidden"
            style={{ boxShadow: "3px 3px 0px var(--color-border)" }}
          >
            <div className="absolute top-0 right-0 -mr-6 -mt-6 opacity-[0.07] pointer-events-none">
              <Shield className="w-40 h-40 text-[var(--color-secondary)]" />
            </div>
            <div className="relative z-10 w-full">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1.5 rounded-full bg-white border-2 border-[var(--color-border)] text-xs font-heading font-bold text-[#1f5441] flex items-center gap-1.5"
                  style={{ borderColor: "rgba(93,202,165,0.4)" }}
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-secondary)]"></span>{" "}
                  AI Reassurance
                </span>
                <Star className="w-5 h-5 text-[var(--color-secondary)]" />
              </div>
              <p className="text-sm leading-relaxed text-[#2c6250] font-medium">
                {insight.content}
              </p>
            </div>
            <div className="relative z-10 mt-5 pt-4 border-t-2 border-[#1f5441]/15">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/chat")}
                className="w-full py-3 bg-[var(--color-secondary)] text-white border-2 border-[var(--color-border)] font-heading font-bold rounded-xl text-center text-sm"
                style={{ boxShadow: "2px 2px 0px var(--color-border)" }}
              >
                Ask exactly how you feel
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Recent Logs */}
        {activities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border-2 border-[var(--color-border)] rounded-[20px] p-5"
            style={{ boxShadow: "3px 3px 0px var(--color-border)" }}
          >
            <div className="flex items-center justify-between border-b-2 border-[var(--color-border)]/10 pb-3 mb-4">
              <h4 className="font-heading text-[15px] font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--color-primary)]" strokeWidth={2.5} />{" "}
                Recent Live Logs
              </h4>
              <button
                onClick={() => router.push("/history")}
                className="text-xs text-[var(--color-text-secondary)] font-bold uppercase tracking-wider bg-[var(--color-accent)] px-2.5 py-1 rounded-lg border border-[var(--color-border)]/20"
              >
                All
              </button>
            </div>
            <div className="space-y-3.5 w-full">
              {activities.map((a) => {
                const color =
                  categoryConfig[a.category as keyof typeof categoryConfig]?.color ||
                  "#8a796e";
                return (
                  <motion.button
                    key={a.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push(`/log-detail/${a.id}`)}
                    className="w-full text-left flex items-start justify-between p-3.5 rounded-xl border-2 border-[var(--color-border)]/10 active:bg-[var(--color-accent)] hover:border-[var(--color-border)]/40 transition-colors"
                  >
                    <div className="flex items-start gap-4 h-full">
                      <div
                        className="w-3.5 h-3.5 rounded-full mt-1 border border-[var(--color-border)]/20 shrink-0"
                        style={{ backgroundColor: color }}
                      ></div>
                      <div>
                        <p className="text-[11px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest tracking-wide">
                          {a.category}
                        </p>
                        <p className="text-[14px] font-bold text-[var(--color-text-primary)] mt-0.5">
                          {formatActivityLabel(a)}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-heading font-bold text-[var(--color-text-secondary)] shrink-0 pl-2 mt-1">
                      {formatTime(a.timestamp)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* 7-Day visual chart — below recent logs */}
        {!loading && <WeeklyInsightsChart />}

        {/* Parent mood check-in — once per day, bottom of dashboard */}
        {!loading && <MoodCheckin onMoodSelect={setParentMood} />}
      </div>
    </div>
  );
}
