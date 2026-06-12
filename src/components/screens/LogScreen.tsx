"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Shield, Star, Clock as ClockIcon, Minus } from "lucide-react";
import { request } from "@/lib/api/request";
import { toast } from "sonner";

const categories = [
  { key: "feeding", label: "Feed", icon: Plus, bg: "#fff8f5", color: "#f0997b" },
  { key: "diaper", label: "Diaper", icon: Shield, bg: "#f5fcfa", color: "#5dcaa5" },
  { key: "sleep", label: "Sleep", icon: Star, bg: "#fff8f5", color: "#f0997b" },
  { key: "pumping", label: "Pump", icon: Plus, bg: "#fffbf4", color: "#e6b875" },
];

type ActivityPayload = {
  category: string;
  babyAgeMonths: number;
  timestamp: string;
  feedingType?: "nursing" | "expressed" | "formula";
  feedingSide?: "left" | "right" | "both";
  feedingDuration?: number;
  feedingAmount?: number;
  diaperType?: "wet" | "dirty" | "mix" | "dry";
  sleepLocation?: "crib" | "bassinet" | "contact";
  sleepStart?: string;
  sleepEnd?: string;
  pumpingDuration?: number;
  pumpingLeftAmount?: number;
  pumpingRightAmount?: number;
  otherNote?: string;
};

export function LogScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(() => {
    const cat = searchParams.get("category");
    return cat && categories.some((c) => c.key === cat) ? cat : "feeding";
  });
  const [loading, setLoading] = useState(false);

  // Shared: log timestamp (default = now)
  const [logTime, setLogTime] = useState<Date>(new Date());

  // Feeding state
  const [feedingMethod, setFeedingMethod] = useState<"nursing" | "expressed" | "formula">("nursing");
  const [feedingSide, setFeedingSide] = useState<"left" | "right" | "both">("left");
  const [feedingDurationMin, setFeedingDurationMin] = useState(15);
  const [formulaAmount, setFormulaAmount] = useState(3.0);

  // Diaper state
  const [diaperType, setDiaperType] = useState<"wet" | "dirty" | "mix" | "dry">("wet");

  // Sleep state
  const [sleepLocation, setSleepLocation] = useState<"crib" | "bassinet" | "contact">("crib");
  const [sleepStart, setSleepStart] = useState<Date>(() => { const d = new Date(); d.setHours(d.getHours() - 2); return d; });
  const [sleepEnd, setSleepEnd] = useState<Date>(new Date());

  // Pumping state
  const [pumpingDuration, setPumpingDuration] = useState(15);
  const [pumpingLeftAmount, setPumpingLeftAmount] = useState(2);
  const [pumpingRightAmount, setPumpingRightAmount] = useState(2);

  // Other state
  const [otherNote, setOtherNote] = useState("");

  // Notes
  const [notes, setNotes] = useState("");

  async function handleSubmit() {
    setLoading(true);
    try {
      const payload: ActivityPayload = {
        category: activeCategory,
        babyAgeMonths: 4,
        timestamp: logTime.toISOString(),
      };

      if (activeCategory === "feeding") {
        payload.feedingType = feedingMethod;
        if (feedingMethod === "nursing" || feedingMethod === "expressed") {
          payload.feedingSide = feedingSide;
          payload.feedingDuration = feedingDurationMin;
        } else {
          payload.feedingAmount = Math.round(formulaAmount * 30);
        }
      } else if (activeCategory === "diaper") {
        payload.diaperType = diaperType;
      } else if (activeCategory === "sleep") {
        payload.sleepLocation = sleepLocation;
        payload.sleepStart = sleepStart.toISOString();
        payload.sleepEnd = sleepEnd.toISOString();
      } else if (activeCategory === "pumping") {
        payload.pumpingDuration = pumpingDuration;
        payload.pumpingLeftAmount = pumpingLeftAmount * 30;
        payload.pumpingRightAmount = pumpingRightAmount * 30;
      } else if (activeCategory === "other") {
        payload.otherNote = otherNote || notes;
      }

      await request("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      toast.success("Activity logged!");
      router.push("/");
    } catch (err) {
      console.error("Failed to log activity", err);
      toast.error("Failed to save log");
    } finally {
      setLoading(false);
    }
  }

  function fmtTime(d: Date): string {
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  }

  function applyTimeString(base: Date, hhmm: string): Date {
    const [h, m] = hhmm.split(":").map(Number);
    const next = new Date(base);
    next.setHours(h, m, 0, 0);
    return next;
  }

  /** Tappable pill — click expands an inline visible time input right below */
  function TimePill({ value, onChange }: { value: Date; onChange: (d: Date) => void }) {
    const [open, setOpen] = useState(false);
    const hhmm = value.toTimeString().slice(0, 5);
    const isNow = Math.abs(new Date().getTime() - value.getTime()) < 90000; // within 90s = "Now"
    return (
      <div className="space-y-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => setOpen((p) => !p)}
          className="flex items-center gap-2 bg-white border-2 border-[var(--color-border)] rounded-[14px] px-4 py-3 w-full"
          style={{ boxShadow: "2px 2px 0px var(--color-border)" }}
        >
          <ClockIcon className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary)" }} strokeWidth={2.5} />
          <span className="font-heading text-sm font-bold text-[var(--color-text-primary)] flex-1 text-left">
            {isNow ? `Now · ${fmtTime(value)}` : fmtTime(value)}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-text-secondary)]">
            {open ? "Done" : "Edit"}
          </span>
        </motion.button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <input
                type="time"
                value={hhmm}
                onChange={(e) => { if (e.target.value) onChange(applyTimeString(value, e.target.value)); }}
                className="w-full bg-[var(--color-accent)] border-2 border-[var(--color-primary)] rounded-xl px-4 py-3 font-heading text-base font-bold text-[var(--color-text-primary)] outline-none"
                style={{ colorScheme: "light" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /** Inline time field used for Sleep start/end — always visible */
  function TimeInput({ label, value, onChange }: { label: string; value: Date; onChange: (d: Date) => void }) {
    const hhmm = value.toTimeString().slice(0, 5);
    return (
      <div className="flex-1">
        <p className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">{label}</p>
        <div className="bg-white border-2 border-[var(--color-border)] rounded-xl px-3 py-2.5"
          style={{ boxShadow: "2px 2px 0px var(--color-border)" }}>
          <input
            type="time"
            value={hhmm}
            onChange={(e) => { if (e.target.value) onChange(applyTimeString(value, e.target.value)); }}
            className="w-full font-heading text-sm font-bold text-[var(--color-text-primary)] bg-transparent outline-none"
            style={{ colorScheme: "light" }}
          />
        </div>
      </div>
    );
  }

  function renderForm() {
    if (activeCategory === "feeding") {
      return (
        <>
          {/* Time */}
          <div>
            <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
              Time
            </label>
            <TimePill value={logTime} onChange={setLogTime} />
          </div>

          {/* Feeding Method — Nursing / Expressed / Formula Supplements */}
          <div>
            <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
              Feeding Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setFeedingMethod("nursing")}
                className={`py-3.5 px-2 rounded-xl border-2 font-heading text-sm font-bold transition-all ${
                  feedingMethod === "nursing"
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-border)] shadow-[2px_2px_0px_var(--color-border)]"
                    : "bg-white text-[var(--color-text-primary)] border-[var(--color-border)] shadow-sm opacity-80"
                }`}
              >
                Nursing
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setFeedingMethod("expressed")}
                className={`py-3.5 px-2 rounded-xl border-2 font-heading text-sm font-bold transition-all ${
                  feedingMethod === "expressed"
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-border)] shadow-[2px_2px_0px_var(--color-border)]"
                    : "bg-white text-[var(--color-text-primary)] border-[var(--color-border)] shadow-sm opacity-80"
                }`}
              >
                Expressed
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setFeedingMethod("formula")}
                className={`py-3.5 px-2 rounded-xl border-2 font-heading text-sm font-bold transition-all ${
                  feedingMethod === "formula"
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-border)] shadow-[2px_2px_0px_var(--color-border)]"
                    : "bg-white text-[var(--color-text-primary)] border-[var(--color-border)] shadow-sm opacity-80"
                }`}
              >
                Formula
              </motion.button>
            </div>
          </div>

          {(feedingMethod === "nursing" || feedingMethod === "expressed") && (
            <>
              <div>
                <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
                  Breast Side
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFeedingSide("left")}
                    className={`py-3.5 px-2 rounded-xl border-2 font-heading text-sm font-bold transition-all ${
                      feedingSide === "left"
                        ? "bg-[var(--color-primary)] text-white border-[var(--color-border)] shadow-[2px_2px_0px_var(--color-border)]"
                        : "bg-white text-[var(--color-text-primary)] border-[var(--color-border)] shadow-sm opacity-80"
                    }`}
                  >
                    Left
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFeedingSide("right")}
                    className={`py-3.5 px-2 rounded-xl border-2 font-heading text-sm font-bold transition-all ${
                      feedingSide === "right"
                        ? "bg-[var(--color-primary)] text-white border-[var(--color-border)] shadow-[2px_2px_0px_var(--color-border)]"
                        : "bg-white text-[var(--color-text-primary)] border-[var(--color-border)] shadow-sm opacity-80"
                    }`}
                  >
                    Right
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFeedingSide("both")}
                    className={`col-span-2 py-3.5 px-2 rounded-xl border-2 font-heading text-sm font-bold transition-all ${
                      feedingSide === "both"
                        ? "bg-[var(--color-primary)] text-white border-[var(--color-border)] shadow-[2px_2px_0px_var(--color-border)]"
                        : "bg-white text-[var(--color-text-primary)] border-[var(--color-border)] shadow-sm opacity-80"
                    }`}
                  >
                    Both Sides
                  </motion.button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
                  Duration (minutes)
                </label>
                <div className="flex items-center gap-5 bg-white p-5 rounded-[20px] border-2 border-[var(--color-border)] shadow-[4px_4px_0px_var(--color-border)] relative">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFeedingDurationMin(Math.max(1, feedingDurationMin - 1))}
                    className="h-12 w-12 bg-[var(--color-accent)] rounded-xl border-2 border-[var(--color-border)] flex shrink-0 items-center justify-center text-[var(--color-text-primary)] focus:outline-none"
                    style={{ boxShadow: "2px 2px 0px var(--color-border)" }}
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <div className="text-center flex-1">
                    <span className="font-heading text-[32px] font-bold text-[var(--color-primary)] leading-none">
                      {feedingDurationMin}
                    </span>
                    <span className="text-sm font-bold text-[var(--color-text-secondary)] ml-1">min</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFeedingDurationMin(feedingDurationMin + 1)}
                    className="h-12 w-12 bg-[var(--color-primary)] rounded-xl border-2 border-[var(--color-border)] flex shrink-0 items-center justify-center text-white focus:outline-none"
                    style={{ boxShadow: "2px 2px 0px var(--color-border)" }}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </>
          )}

          {feedingMethod === "formula" && (
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
                Formula Amount
              </label>
              <div className="flex items-center gap-5 bg-white p-5 rounded-[20px] border-2 border-[var(--color-border)] shadow-[4px_4px_0px_var(--color-border)] relative">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFormulaAmount(Math.max(0, formulaAmount - 0.5))}
                  className="h-12 w-12 bg-[var(--color-accent)] rounded-xl border-2 border-[var(--color-border)] flex shrink-0 items-center justify-center text-[var(--color-text-primary)] focus:outline-none"
                  style={{ boxShadow: "2px 2px 0px var(--color-border)" }}
                >
                  <Minus className="w-5 h-5" />
                </motion.button>
                <div className="text-center flex-1">
                  <span className="font-heading text-[32px] font-bold text-[var(--color-primary)] leading-none">
                    {formulaAmount.toFixed(1)}
                  </span>
                  <span className="text-sm font-bold text-[var(--color-text-secondary)] ml-1">oz</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFormulaAmount(formulaAmount + 0.5)}
                  className="h-12 w-12 bg-[var(--color-primary)] rounded-xl border-2 border-[var(--color-border)] flex shrink-0 items-center justify-center text-white focus:outline-none"
                  style={{ boxShadow: "2px 2px 0px var(--color-border)" }}
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          )}
        </>
      );
    }

    if (activeCategory === "diaper") {
      return (
        <div className="space-y-5">
          {/* Time */}
          <div>
            <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
              Time
            </label>
            <TimePill value={logTime} onChange={setLogTime} />
          </div>

          {/* Type — Wet / Dirty / Mix / Dry */}
          <div>
            <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
              Diaper Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["wet", "dirty", "mix", "dry"] as const).map((type) => {
                const labels: Record<string, string> = { wet: "Wet 💧", dirty: "Dirty 💩", mix: "Mix", dry: "Dry" };
                return (
                  <motion.button
                    key={type}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDiaperType(type)}
                    className={`py-3.5 px-2 rounded-xl border-2 font-heading text-sm font-bold transition-all ${
                      diaperType === type
                        ? "bg-[var(--color-secondary)] text-white border-[var(--color-border)] shadow-[2px_2px_0px_var(--color-border)]"
                        : "bg-white text-[var(--color-text-primary)] border-[var(--color-border)] shadow-sm opacity-80"
                    }`}
                  >
                    {labels[type]}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    if (activeCategory === "sleep") {
      return (
        <>
          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
              Sleep Location
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["crib", "bassinet", "contact"] as const).map((loc) => {
                const labels: Record<string, string> = { crib: "Crib", bassinet: "Bassinet", contact: "Contact Nap" };
                return (
                  <motion.button
                    key={loc}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSleepLocation(loc)}
                    className={`py-3.5 px-2 rounded-xl border-2 font-heading text-sm font-bold transition-all ${
                      sleepLocation === loc
                        ? "bg-[var(--color-sleep)] text-white border-[var(--color-border)] shadow-[2px_2px_0px_var(--color-border)]"
                        : "bg-white text-[var(--color-text-primary)] border-[var(--color-border)] shadow-sm opacity-80"
                    } ${loc === "contact" ? "col-span-2" : ""}`}
                  >
                    {labels[loc]}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Start + End time */}
          <div>
            <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
              Sleep Window
            </label>
            <div className="flex gap-3">
              <TimeInput label="Start" value={sleepStart} onChange={setSleepStart} />
              <TimeInput label="End" value={sleepEnd} onChange={setSleepEnd} />
            </div>
          </div>

          {/* Auto-calculated duration */}
          {(() => {
            const diffMs = sleepEnd.getTime() - sleepStart.getTime();
            const diffMin = Math.round(diffMs / 60000);
            const hrs = Math.floor(Math.abs(diffMin) / 60);
            const mins = Math.abs(diffMin) % 60;
            const label = diffMin <= 0 ? "—" : hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
            return (
              <div className="flex items-center justify-between bg-white border-2 border-[var(--color-border)] rounded-xl px-4 py-3"
                style={{ boxShadow: "2px 2px 0px var(--color-border)" }}>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Duration</span>
                <span className="font-heading text-base font-bold text-[var(--color-primary)]">{label}</span>
              </div>
            );
          })()}
        </>
      );
    }

    if (activeCategory === "pumping") {
      return (
        <>
          {/* Time */}
          <div>
            <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
              Time
            </label>
            <TimePill value={logTime} onChange={setLogTime} />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
              Pumping Duration (minutes)
            </label>
            <div className="flex items-center gap-5 bg-white p-5 rounded-[20px] border-2 border-[var(--color-border)] shadow-[4px_4px_0px_var(--color-border)]">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setPumpingDuration(Math.max(5, pumpingDuration - 5))}
                className="h-12 w-12 bg-[var(--color-accent)] rounded-xl border-2 border-[var(--color-border)] flex items-center justify-center"
                style={{ boxShadow: "2px 2px 0px var(--color-border)" }}
              >
                <Minus className="w-5 h-5" />
              </motion.button>
              <div className="text-center flex-1">
                <span className="font-heading text-[32px] font-bold text-[var(--color-pumping)] leading-none">
                  {pumpingDuration}
                </span>
                <span className="text-sm font-bold text-[var(--color-text-secondary)] ml-1">min</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setPumpingDuration(pumpingDuration + 5)}
                className="h-12 w-12 bg-[var(--color-pumping)] rounded-xl border-2 border-[var(--color-border)] flex items-center justify-center text-white"
                style={{ boxShadow: "2px 2px 0px var(--color-border)" }}
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
                Left (oz)
              </label>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border-2 border-[var(--color-border)]">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPumpingLeftAmount(Math.max(0, pumpingLeftAmount - 0.5))}
                  className="h-8 w-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="font-heading text-xl font-bold text-[var(--color-pumping)] flex-1 text-center">
                  {pumpingLeftAmount.toFixed(1)}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPumpingLeftAmount(pumpingLeftAmount + 0.5)}
                  className="h-8 w-8 bg-[var(--color-pumping)] rounded-lg flex items-center justify-center text-white"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
                Right (oz)
              </label>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border-2 border-[var(--color-border)]">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPumpingRightAmount(Math.max(0, pumpingRightAmount - 0.5))}
                  className="h-8 w-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="font-heading text-xl font-bold text-[var(--color-pumping)] flex-1 text-center">
                  {pumpingRightAmount.toFixed(1)}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPumpingRightAmount(pumpingRightAmount + 0.5)}
                  className="h-8 w-8 bg-[var(--color-pumping)] rounded-lg flex items-center justify-center text-white"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="flex-1 pb-4">
        <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
          Activity Notes
        </label>
        <textarea
          value={otherNote}
          onChange={(e) => setOtherNote(e.target.value)}
          className="w-full h-[160px] bg-white rounded-[20px] border-2 border-[var(--color-border)] p-4 text-sm font-medium text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 placeholder:text-[var(--color-text-muted)] resize-none"
          placeholder="Tummy time, bath, medicine..."
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-accent)] overflow-hidden">
      {/* Header */}
      <div
        className="w-full bg-white border-b-2 border-[var(--color-border)] px-4 py-3.5 flex items-center justify-center shrink-0 z-20 sticky top-0"
        style={{ boxShadow: "0 2px 8px rgba(93,75,62,0.08)" }}
      >
        <h1 className="font-heading text-[16px] font-bold tracking-tight text-[var(--color-text-primary)]">
          Log Live Activity
        </h1>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b-2 border-[var(--color-border)] shadow-sm shrink-0 flex items-center justify-around px-2">
        {categories.map((cat) => {
          const isActive = cat.key === activeCategory;
          return (
            <motion.button
              key={cat.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.key)}
              className={`py-4 text-center flex-1 flex flex-col items-center justify-center transition-all ${
                isActive
                  ? `border-b-4`
                  : "border-b-4 border-transparent opacity-60"
              }`}
              style={{
                backgroundColor: isActive ? cat.bg : "transparent",
                borderBottomColor: isActive ? cat.color : "transparent",
              }}
            >
              <cat.icon
                size={24}
                style={{ color: cat.color }}
                strokeWidth={2.5}
                className="mb-1.5"
              />
              <span className="text-xs font-heading font-bold" style={{ color: cat.color }}>
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Form */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="px-5 py-6 space-y-7 flex-1 flex flex-col min-h-0 overflow-y-auto"
        >
          {renderForm()}
          <div className="flex-1 pb-4">
            <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
              Activity Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-[100px] bg-white rounded-[20px] border-2 border-[var(--color-border)] p-4 text-sm font-medium text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 placeholder:text-[var(--color-text-muted)] resize-none"
              placeholder="Clustered feeding, feeling sleepy..."
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Submit Button */}
      <div className="p-5 bg-white border-t-2 border-[var(--color-border)] shrink-0 z-20 sticky bottom-0">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-14 bg-[var(--color-primary)] text-white border-2 border-[var(--color-border)] font-heading font-bold rounded-[16px] text-center text-[15px] disabled:opacity-50"
          style={{ boxShadow: "4px 4px 0px var(--color-border)" }}
        >
          {loading ? "Saving..." : "✓ Record Safe Log Entry"}
        </motion.button>
      </div>
    </div>
  );
}
