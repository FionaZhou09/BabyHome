"use client";

import { motion } from "framer-motion";
import { HeartHandshake, PhoneCall } from "lucide-react";
import type { ChatStreamResourceNeed } from "@/lib/chat/chat-stream";

interface CrisisResourceCardProps {
  resourceNeed: ChatStreamResourceNeed;
}

function titleForLevel(level: ChatStreamResourceNeed["level"]) {
  return level === "urgent-crisis" ? "现在先联系真人支持" : "产后支持资源";
}

export function CrisisResourceCard({ resourceNeed }: CrisisResourceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 w-full rounded-[18px] border-2 border-[#f0997b]/40 bg-[#fff8f5] p-4"
      style={{ boxShadow: "3px 3px 0px rgba(240, 153, 123, 0.35)" }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="h-9 w-9 shrink-0 rounded-xl bg-white border-2 border-[#f0997b]/35 flex items-center justify-center">
          <HeartHandshake className="w-5 h-5 text-[#e47f5c]" strokeWidth={2.5} />
        </div>
        <div>
          <p className="font-heading text-[14px] font-bold text-[var(--color-text-primary)]">
            {titleForLevel(resourceNeed.level)}
          </p>
          <p className="text-[12px] leading-relaxed font-medium text-[#8d4d39]">
            这些号码放在这里，方便你一键看见。你不用一个人扛。
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {resourceNeed.resources.map((resource) => (
          <a
            key={resource.phone}
            href={`tel:${resource.phone}`}
            className="flex items-center justify-between gap-3 rounded-xl border border-[#f0997b]/25 bg-white px-3 py-3 active:scale-[0.99]"
          >
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-[var(--color-text-primary)]">
                {resource.phone}
              </p>
              <p className="text-[11px] leading-snug font-medium text-[var(--color-text-secondary)]">
                {resource.name}
              </p>
            </div>
            <PhoneCall className="w-4 h-4 shrink-0 text-[#e47f5c]" strokeWidth={2.5} />
          </a>
        ))}
      </div>
    </motion.div>
  );
}
