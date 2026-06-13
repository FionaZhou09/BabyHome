"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Baby } from "lucide-react";

const MONTHS = [
  "1月","2月","3月","4月","5月","6月",
  "7月","8月","9月","10月","11月","12月",
];

function getYearOptions() {
  const y = new Date().getFullYear();
  return [y, y - 1, y - 2];
}

function getDaysInMonth(year: number | null, month: number | null): number {
  if (year === null || month === null) return 31;
  return new Date(year, month, 0).getDate();
}

function calcAgeMonths(year: number, month: number, day: number): number | null {
  const dob = new Date(year, month - 1, day);
  const today = new Date();
  if (dob > today) return null;
  let m = (today.getFullYear() - dob.getFullYear()) * 12;
  m += today.getMonth() - dob.getMonth();
  if (today.getDate() < dob.getDate()) m -= 1;
  return Math.max(0, Math.min(m, 24));
}

const SEL = "flex-1 bg-[var(--color-accent)] border-2 border-[var(--color-border)] rounded-xl px-3 py-3 font-heading text-sm font-bold text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)] appearance-none cursor-pointer";

export function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [babyName, setBabyName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [dobYear, setDobYear] = useState<number | null>(null);
  const [dobMonth, setDobMonth] = useState<number | null>(null);
  const [dobDay, setDobDay] = useState<number | null>(null);
  const [dobError, setDobError] = useState("");

  const yearOptions = getYearOptions();
  const daysInMonth = getDaysInMonth(dobYear, dobMonth);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("babyhome_profile")) {
      router.replace("/");
    }
  }, [router]);

  const ageMonths = useMemo(() => {
    if (dobYear === null || dobMonth === null || dobDay === null) return null;
    return calcAgeMonths(dobYear, dobMonth, dobDay);
  }, [dobYear, dobMonth, dobDay]);

  const ageLabel = ageMonths === null ? null
    : ageMonths === 0 ? "新生儿"
    : ageMonths === 1 ? "1 个月"
    : `${ageMonths} 个月`;

  function handleStep1() {
    if (!babyName.trim()) { setNameError(true); return; }
    setNameError(false);
    setStep(2);
  }

  function updateDobYear(year: number | null) {
    setDobYear(year);
    const nextDays = getDaysInMonth(year, dobMonth);
    setDobDay((day) => day !== null && day > nextDays ? nextDays : day);
  }

  function updateDobMonth(month: number | null) {
    setDobMonth(month);
    const nextDays = getDaysInMonth(dobYear, month);
    setDobDay((day) => day !== null && day > nextDays ? nextDays : day);
  }

  function handleFinish() {
    if (dobYear === null || dobMonth === null || dobDay === null) {
      setDobError("请输入完整出生日期。");
      return;
    }
    if (ageMonths === null) {
      setDobError("出生日期不能是未来日期。");
      return;
    }
    const dob = `${dobYear}-${String(dobMonth).padStart(2,"0")}-${String(dobDay).padStart(2,"0")}`;
    localStorage.setItem("babyhome_profile", JSON.stringify({ name: babyName.trim(), dob, ageMonths }));
    router.replace("/");
  }

  return (
    <div className="min-h-svh bg-[var(--color-accent)] flex flex-col items-center justify-center px-6">
      <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} className="flex flex-col items-center mb-10">
        <div className="h-16 w-16 rounded-2xl bg-[var(--color-primary)] border-2 border-[var(--color-border)] flex items-center justify-center mb-3"
          style={{ boxShadow:"4px 4px 0px var(--color-border)" }}>
          <Baby className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        <h1 className="font-heading text-2xl font-bold text-[var(--color-text-primary)]">BabyHome</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1 font-medium text-center">给新手父母的温柔陪伴</p>
      </motion.div>

      <div className="w-full max-w-sm">
        <AnimatePresence mode="wait">

          {step === 1 && (
            <motion.div key="s1" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{duration:0.25}}
              className="bg-white border-2 border-[var(--color-border)] rounded-[24px] p-7"
              style={{ boxShadow:"4px 4px 0px var(--color-border)" }}>
              <div className="flex gap-2 mb-6">
                <div className="h-1.5 flex-1 rounded-full bg-[var(--color-primary)]" />
                <div className="h-1.5 flex-1 rounded-full bg-[var(--color-text-muted)]" />
              </div>
              <h2 className="font-heading text-xl font-bold text-[var(--color-text-primary)] mb-1">宝宝叫什么名字？</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6 font-medium">之后会在记录和陪伴回复里用到。</p>
              <input type="text" value={babyName}
                onChange={(e) => { setBabyName(e.target.value); setNameError(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleStep1()}
                placeholder="比如 Leo" autoFocus
                className={`w-full bg-[var(--color-accent)] border-2 rounded-xl px-4 py-3.5 font-heading text-lg font-bold text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] transition-colors ${nameError ? "border-[var(--color-primary)]" : "border-[var(--color-border)] focus:border-[var(--color-primary)]"}`}
              />
              {nameError && <p className="text-xs text-[var(--color-primary)] font-bold mt-2">请输入宝宝名字再继续。</p>}
              <motion.button whileTap={{scale:0.97}} onClick={handleStep1}
                className="mt-6 w-full h-14 bg-[var(--color-primary)] text-white border-2 border-[var(--color-border)] font-heading font-bold rounded-[16px] text-[15px] flex items-center justify-center gap-2"
                style={{ boxShadow:"4px 4px 0px var(--color-border)" }}>
                继续 <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{duration:0.25}}
              className="bg-white border-2 border-[var(--color-border)] rounded-[24px] p-7"
              style={{ boxShadow:"4px 4px 0px var(--color-border)" }}>
              <div className="flex gap-2 mb-6">
                <div className="h-1.5 flex-1 rounded-full bg-[var(--color-primary)]" />
                <div className="h-1.5 flex-1 rounded-full bg-[var(--color-primary)]" />
              </div>
              <h2 className="font-heading text-xl font-bold text-[var(--color-text-primary)] mb-1">{babyName} 什么时候出生？</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-5 font-medium">我们会用月龄给出更合适的照护建议。</p>

              <div className="flex gap-2 mb-4">
                <select value={dobYear ?? ""} onChange={(e) => updateDobYear(e.target.value ? Number(e.target.value) : null)} className={SEL}>
                  <option value="" disabled>年</option>
                  {yearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                <select value={dobMonth ?? ""} onChange={(e) => updateDobMonth(e.target.value ? Number(e.target.value) : null)} className={SEL}>
                  <option value="" disabled>月</option>
                  {MONTHS.map((name, i) => <option key={i+1} value={i+1}>{name}</option>)}
                </select>
                <select value={dobDay ?? ""} onChange={(e) => setDobDay(e.target.value ? Number(e.target.value) : null)} className={SEL}>
                  <option value="" disabled>日</option>
                  {Array.from({length: daysInMonth}, (_,i) => i+1).map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <AnimatePresence>
                {ageLabel && (
                  <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} className="overflow-hidden mb-4">
                    <div className="bg-[#ebf7f2] border border-[var(--color-secondary)] rounded-xl px-4 py-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] shrink-0" />
                      <span className="font-heading text-sm font-bold text-[#1f5441]">{babyName} 现在是 {ageLabel}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {dobError && <p className="text-xs text-[var(--color-primary)] font-bold mb-3">{dobError}</p>}

              <motion.button whileTap={{scale:0.97}} onClick={handleFinish}
                className="w-full h-14 bg-[var(--color-primary)] text-white border-2 border-[var(--color-border)] font-heading font-bold rounded-[16px] text-[15px] flex items-center justify-center gap-2"
                style={{ boxShadow:"4px 4px 0px var(--color-border)" }}>
                开始使用
              </motion.button>
              <button onClick={() => setStep(1)} className="mt-3 w-full text-center text-sm text-[var(--color-text-secondary)] font-medium py-2">← 返回</button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
