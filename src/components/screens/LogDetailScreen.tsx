"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Shield, Star, type LucideIcon } from "lucide-react";
import { request } from "@/lib/api/request";

interface Activity {
  id: number;
  category: string;
  timestamp: string;
  feedingSide?: string;
  feedingDuration?: number;
  feedingAmount?: number;
  diaperType?: string;
  sleepLocation?: string;
  pumpingDuration?: number;
  pumpingLeftAmount?: number;
  pumpingRightAmount?: number;
  otherNote?: string;
}

const categoryColors: Record<string, { color: string; Icon: LucideIcon }> = {
  feeding: { color: "#f0997b", Icon: Plus },
  diaper: { color: "#5dcaa5", Icon: Shield },
  sleep: { color: "#f0997b", Icon: Star },
  pumping: { color: "#e6b875", Icon: Plus },
  other: { color: "#8a796e", Icon: Plus },
};

export function LogDetailScreen({ id }: { id: string }) {
  const router = useRouter();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await request("/api/activities");
        const data = await res.json();
        const found = data.activities.find((a: Activity) => a.id === Number(id));
        if (found) setActivity(found);
      } catch {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading || !activity) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--color-accent)]">
        <div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const cfg = categoryColors[activity.category] || categoryColors.other;
  const Icon = cfg.Icon;

  function formatTimestamp(iso: string): string {
    const d = new Date(iso);
    const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    return `${time} • ${isToday ? "Today" : d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  }

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-accent)] overflow-y-auto">
      <div className="flex-1 overflow-y-auto w-full px-5 py-8 flex flex-col items-center justify-start text-center space-y-8">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="h-24 w-24 rounded-full flex items-center justify-center border-4 border-[var(--color-border)] shrink-0"
          style={{
            backgroundColor: `${cfg.color}10`,
            boxShadow: "4px 4px 0px var(--color-border)",
          }}
        >
          <Icon className="w-12 h-12" style={{ color: cfg.color }} strokeWidth={2.5} />
        </motion.div>

        {/* Title */}
        <div className="w-full">
          <h2 className="font-heading text-3xl font-bold text-[var(--color-text-primary)]">
            {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)} Entry
          </h2>
          <p className="text-[15px] font-bold text-[var(--color-text-secondary)] mt-2 bg-white px-3 py-1 rounded-lg border border-[var(--color-border)]/20 inline-block">
            {formatTimestamp(activity.timestamp)}
          </p>
        </div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[24px] border-2 border-[var(--color-border)] p-5 text-left w-full"
          style={{ boxShadow: "6px 6px 0px var(--color-border)" }}
        >
          <div className="space-y-5">
            {activity.category === "feeding" && (
              <>
                {activity.feedingSide && (
                  <div className="flex justify-between items-center border-b-2 border-[var(--color-border)]/10 pb-4 w-full">
                    <span className="text-[13px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                      Breast Side Source
                    </span>
                    <span className="font-heading text-[15px] font-bold text-[var(--color-text-primary)] bg-[var(--color-accent)] px-3 py-1 rounded">
                      {activity.feedingSide.charAt(0).toUpperCase() + activity.feedingSide.slice(1)}
                    </span>
                  </div>
                )}
                {activity.feedingDuration && (
                  <div className="flex justify-between items-center border-b-2 border-[var(--color-border)]/10 pb-4 w-full">
                    <span className="text-[13px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                      Timed Duration
                    </span>
                    <span className="font-heading text-[15px] font-bold text-[var(--color-primary)]">
                      {activity.feedingDuration} Mins
                    </span>
                  </div>
                )}
              </>
            )}

            {activity.category === "diaper" && activity.diaperType && (
              <div className="flex justify-between items-center border-b-2 border-[var(--color-border)]/10 pb-4 w-full">
                <span className="text-[13px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                  Diaper Type
                </span>
                <span className="font-heading text-[15px] font-bold text-[var(--color-text-primary)] bg-[var(--color-accent)] px-3 py-1 rounded">
                  {activity.diaperType.charAt(0).toUpperCase() + activity.diaperType.slice(1)}
                </span>
              </div>
            )}

            {activity.category === "sleep" && activity.sleepLocation && (
              <div className="flex justify-between items-center border-b-2 border-[var(--color-border)]/10 pb-4 w-full">
                <span className="text-[13px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                  Sleep Location
                </span>
                <span className="font-heading text-[15px] font-bold text-[var(--color-text-primary)] bg-[var(--color-accent)] px-3 py-1 rounded">
                  {activity.sleepLocation.charAt(0).toUpperCase() + activity.sleepLocation.slice(1)}
                </span>
              </div>
            )}

            {activity.category === "pumping" && (
              <div className="flex justify-between items-center border-b-2 border-[var(--color-border)]/10 pb-4 w-full">
                <span className="text-[13px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                  Total Output
                </span>
                <span className="font-heading text-[15px] font-bold text-[var(--color-primary)]">
                  {((activity.pumpingLeftAmount || 0) + (activity.pumpingRightAmount || 0)) / 30} oz
                </span>
              </div>
            )}

            {activity.otherNote && (
              <div className="w-full">
                <span className="text-[13px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider block mb-2">
                  Detailed Notes
                </span>
                <span className="text-[14px] font-medium text-[var(--color-text-primary)] leading-relaxed block bg-gray-50 p-3 rounded-xl border border-[var(--color-border)]/10">
                  {activity.otherNote}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/")}
          className="w-full h-[56px] bg-white text-[var(--color-text-primary)] border-2 border-[var(--color-border)] font-heading font-bold rounded-[16px] text-center text-[15px]"
          style={{ boxShadow: "4px 4px 0px var(--color-border)" }}
        >
          Return Complete to Dashboard
        </motion.button>
      </div>
    </div>
  );
}
