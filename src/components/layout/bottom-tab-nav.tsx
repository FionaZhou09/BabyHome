"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, BookOpen, MessageCircle, Clock } from "lucide-react";
import { cn } from "@/utils/utils";

const tabs = [
  { label: "Home",    href: "/",        icon: Home },
  { label: "Log",     href: "/logs",    icon: BookOpen },
  { label: "AI Chat", href: "/chat",    icon: MessageCircle },
  { label: "History", href: "/history", icon: Clock },
];

/* ─── Mobile bottom tab bar ─────────────────────────────────── */
export function BottomTabNav() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-20 md:hidden",
        "bg-[var(--color-accent)] border-t border-[#f5c4b3]",
        "pb-[env(safe-area-inset-bottom)]"
      )}
      style={{ boxShadow: "0 -4px 12px rgba(61,53,48,0.06)" }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map(({ label, href, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className="flex-1 flex flex-col items-center gap-0.5 min-w-0 py-2">
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="relative flex flex-col items-center gap-0.5"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-[var(--radius-pill)] flex items-center justify-center transition-colors duration-150",
                    isActive ? "bg-[var(--color-primary)]" : "bg-transparent"
                  )}
                >
                  <Icon
                    size={20}
                    className={cn(isActive ? "text-white" : "text-[var(--color-text-secondary)]")}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-body font-medium",
                    isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-secondary)]"
                  )}
                >
                  {label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/* ─── Desktop left sidebar ───────────────────────────────────── */
export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex flex-col w-56 shrink-0 border-r border-[#f5c4b3] bg-white"
      style={{ minHeight: "100svh" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#f5c4b3]">
        <div className="h-9 w-9 rounded-xl bg-[var(--color-primary)] border-2 border-[var(--color-border)] flex items-center justify-center font-heading text-lg text-white font-bold shrink-0">
          B
        </div>
        <span className="font-heading text-base font-bold text-[var(--color-text-primary)]">BabyHome</span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {tabs.map(({ label, href, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-heading text-sm font-bold transition-colors duration-150",
                isActive
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
              )}
              style={isActive ? { boxShadow: "2px 2px 0px var(--color-border)" } : {}}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer hint */}
      <div className="px-5 py-4 border-t border-[#f5c4b3]">
        <p className="text-[11px] text-[var(--color-text-muted)] font-medium leading-snug">
          Leo · 4 months old
        </p>
      </div>
    </aside>
  );
}
