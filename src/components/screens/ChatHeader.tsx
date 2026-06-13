"use client";

import { Star } from "lucide-react";

export function ChatHeader() {
  return (
    <div
      className="w-full bg-[#ebf7f2] border-b-2 border-[var(--color-border)] px-5 py-4 flex items-center justify-between shrink-0 z-20 sticky top-0"
      style={{ boxShadow: "0 2px 8px rgba(31,84,65,0.06)" }}
    >
      <div className="flex items-center gap-3 w-full">
        <div
          className="h-10 w-10 rounded-xl bg-[var(--color-secondary)] flex shrink-0 items-center justify-center border-2 border-[var(--color-border)]"
          style={{ boxShadow: "2px 2px 0px var(--color-border)" }}
        >
          <Star className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h3 className="font-heading text-[15px] font-bold text-[#1f5441] leading-tight">
            Midnight Companion
          </h3>
          <p className="text-[11px] text-[#29745a] font-bold tracking-wide uppercase mt-0.5">
            No judgment answers
          </p>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white text-[#307b60] border-2 border-[var(--color-secondary)] flex shrink-0">
          Online
        </span>
      </div>
    </div>
  );
}
