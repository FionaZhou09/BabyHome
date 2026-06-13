"use client";

import { motion } from "framer-motion";
import { AlertTriangle, BellRing, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchAnomalyReminders,
  type AnomalyReminderResponse,
} from "@/lib/api/anomaly-reminders";

type AnomalyReminder = AnomalyReminderResponse["reminders"][number];

function severityLabel(severity: AnomalyReminder["severity"]) {
  return severity === "urgent" ? "需要尽快关注" : "轻提醒";
}

export function AnomalyReminderCard() {
  const [reminders, setReminders] = useState<AnomalyReminder[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetchAnomalyReminders()
      .then((data) => {
        if (!cancelled) setReminders(data.reminders);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  if (reminders.length === 0) return null;

  const primary = reminders[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14 }}
      className="bg-[#fff8f5] border-2 border-[#f0997b]/40 rounded-[20px] p-5"
      style={{ boxShadow: "3px 3px 0px rgba(240, 153, 123, 0.35)" }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#f0997b]/30 bg-white text-[10px] font-heading font-bold uppercase tracking-wide text-[#a45b43] mb-2">
            <BellRing className="w-3 h-3" />
            主动提醒
          </div>
          <h4 className="font-heading text-[15px] font-bold text-[var(--color-text-primary)]">
            {primary.title}
          </h4>
        </div>
        <div className="h-10 w-10 rounded-xl bg-white border-2 border-[#f0997b]/35 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-[#e47f5c]" strokeWidth={2.5} />
        </div>
      </div>

      <p className="text-[13px] leading-relaxed font-medium text-[var(--color-text-secondary)] mb-2">
        {primary.message}
      </p>
      <p className="text-[12px] leading-relaxed font-medium text-[#8d4d39] mb-3">
        {primary.suggestion}
      </p>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-[#f0997b]/25 bg-white px-3 py-2">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#a45b43]">
          {severityLabel(primary.severity)}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--color-text-secondary)]">
          {reminders.length} 条提醒
          <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </motion.section>
  );
}
