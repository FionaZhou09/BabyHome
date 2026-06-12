import { config } from "dotenv";
import postgres from "postgres";
config({ path: ".env" });

const USER_ID = "6a12f6459803f2ae40c84625";
const BABY_AGE = 4;

const sql = postgres(process.env.DATABASE_URL!);

// ─── helpers ────────────────────────────────────────────────────────────────

function d(daysAgo: number, h: number, m = 0): Date {
  const dt = new Date();
  dt.setDate(dt.getDate() - daysAgo);
  dt.setHours(h, m, 0, 0);
  return dt;
}

// For overnight sleep: night starts previous day late, ends this morning
function overnightStart(daysAgo: number, h: number, m = 0): Date {
  const dt = new Date();
  dt.setDate(dt.getDate() - daysAgo - 1); // starts the night before
  dt.setHours(h, m, 0, 0);
  return dt;
}

function oz(v: number) { return Math.round(v * 30); } // oz → ml

// ─── activities ─────────────────────────────────────────────────────────────

const activities: any[] = [];

// 7 days: index 0 = today (Sunday), 1 = Saturday, … 6 = Monday
const sleepVariation = [
  // [night hrs offset min, morning nap end offset min, afternoon nap end offset min]
  // Today (Sun) – best sleep of the week
  { nightEnd: "06:30", morningNapEnd: "10:20", afternoonNapEnd: "03:10", eveningNapEnd: "06:05" },
  // Sat
  { nightEnd: "06:15", morningNapEnd: "10:10", afternoonNapEnd: "03:00", eveningNapEnd: "06:00" },
  // Fri
  { nightEnd: "06:45", morningNapEnd: "10:30", afternoonNapEnd: "02:55", eveningNapEnd: "05:50" },
  // Thu
  { nightEnd: "06:20", morningNapEnd: "10:05", afternoonNapEnd: "02:45", eveningNapEnd: "05:45" },
  // Wed – rough night
  { nightEnd: "05:50", morningNapEnd: "10:15", afternoonNapEnd: "02:50", eveningNapEnd: "05:55" },
  // Tue
  { nightEnd: "06:10", morningNapEnd: "10:00", afternoonNapEnd: "03:05", eveningNapEnd: "06:10" },
  // Mon
  { nightEnd: "06:00", morningNapEnd: "09:55", afternoonNapEnd: "02:40", eveningNapEnd: "05:40" },
];

for (let dayAgo = 0; dayAgo <= 6; dayAgo++) {
  const sv = sleepVariation[dayAgo];

  // ── Sleep ────────────────────────────────────────────────────────────────

  // Night sleep (starts ~11pm night before, ends ~6:30am this morning)
  const [nightEndH, nightEndM] = sv.nightEnd.split(":").map(Number);
  const nightStart = overnightStart(dayAgo, 23, 0);
  const nightEnd = d(dayAgo, nightEndH, nightEndM);
  activities.push({
    userId: USER_ID, babyAgeMonths: BABY_AGE, category: "sleep",
    timestamp: nightStart,
    sleepStart: nightStart, sleepEnd: nightEnd, sleepLocation: "crib",
  });

  // Morning nap 9:00 AM → ~10:10–10:30
  const [morningNapEndH, morningNapEndM] = sv.morningNapEnd.split(":").map(Number);
  const morningNapStart = d(dayAgo, 9, 0);
  const morningNapEnd = d(dayAgo, morningNapEndH, morningNapEndM);
  activities.push({
    userId: USER_ID, babyAgeMonths: BABY_AGE, category: "sleep",
    timestamp: morningNapStart,
    sleepStart: morningNapStart, sleepEnd: morningNapEnd, sleepLocation: "bassinet",
  });

  // Afternoon nap 1:30 PM → ~2:40–3:10
  const [aftNapEndH, aftNapEndM] = (`1${sv.afternoonNapEnd}`).replace("1", "1").split(":") as any;
  // parse properly
  const aftRaw = sv.afternoonNapEnd; // "03:10" means 3:10 PM
  const aftH = parseInt(aftRaw.split(":")[0]) + 12; // offset to PM
  const aftM = parseInt(aftRaw.split(":")[1]);
  const afternoonNapStart = d(dayAgo, 13, 30);
  const afternoonNapEnd = d(dayAgo, aftH, aftM);
  activities.push({
    userId: USER_ID, babyAgeMonths: BABY_AGE, category: "sleep",
    timestamp: afternoonNapStart,
    sleepStart: afternoonNapStart, sleepEnd: afternoonNapEnd, sleepLocation: "contact",
  });

  // Evening catnap 5:30 PM → ~5:40–6:10 (skip for today if mid-day)
  if (dayAgo > 0) {
    const [eveH, eveM] = sv.eveningNapEnd.split(":").map(Number);
    const eveStart = d(dayAgo, 17, 30);
    const eveEnd = d(dayAgo, eveH + (eveH < 12 ? 18 : 0), eveM);
    // evening nap ends ~6pm area
    const eveEndFixed = d(dayAgo, 18, eveM);
    activities.push({
      userId: USER_ID, babyAgeMonths: BABY_AGE, category: "sleep",
      timestamp: eveStart,
      sleepStart: eveStart, sleepEnd: eveEndFixed, sleepLocation: "crib",
    });
  }

  // ── Feeding ───────────────────────────────────────────────────────────────

  const feeds = [
    { h: 7,  m: 0,  type: "nursing", side: "left",  duration: 20 },
    { h: 10, m: 30, type: "nursing", side: "both",   duration: 15 },
    { h: 13, m: 0,  type: "formula", side: null,     amount: oz(4) },
    { h: 15, m: 30, type: "nursing", side: "right",  duration: 18 },
    { h: 18, m: 30, type: "nursing", side: "both",   duration: 20 },
    { h: 21, m: 0,  type: "nursing", side: "left",   duration: 12 },
  ];
  // Add late-night feed on some days (not today, not Wed)
  if (dayAgo !== 0 && dayAgo !== 4) {
    feeds.push({ h: 2, m: 45, type: "nursing", side: "left", duration: 10 });
  }

  for (const f of feeds) {
    // Today: only log feeds up to ~noon (mid-day feel)
    if (dayAgo === 0 && f.h > 13) continue;
    activities.push({
      userId: USER_ID, babyAgeMonths: BABY_AGE, category: "feeding",
      timestamp: d(dayAgo, f.h, f.m),
      feedingType: f.type,
      feedingSide: f.side ?? null,
      feedingDuration: f.duration ?? null,
      feedingAmount: (f as any).amount ?? null,
    });
  }

  // ── Diapers ───────────────────────────────────────────────────────────────

  const diaperSchedule = [
    { h: 7,  m: 30, type: "wet" },
    { h: 9,  m: 30, type: "wet" },
    { h: 11, m: 0,  type: "both" },
    { h: 13, m: 30, type: "wet" },
    { h: 15, m: 0,  type: "wet" },
    { h: 17, m: 0,  type: "both" },
    { h: 19, m: 30, type: "wet" },
    { h: 21, m: 30, type: "dry" },
    { h: 23, m: 30, type: "wet" },
  ];

  for (const dd of diaperSchedule) {
    if (dayAgo === 0 && dd.h > 13) continue;
    activities.push({
      userId: USER_ID, babyAgeMonths: BABY_AGE, category: "diaper",
      timestamp: d(dayAgo, dd.h, dd.m),
      diaperType: dd.type,
    });
  }

  // ── Pumping ───────────────────────────────────────────────────────────────

  const pumpSessions = [
    { h: 8,  m: 0,  dur: 20, left: oz(2.5), right: oz(2.0) },
    { h: 14, m: 0,  dur: 15, left: oz(1.5), right: oz(1.8) },
  ];
  if (dayAgo > 0) {
    pumpSessions.push({ h: 20, m: 30, dur: 18, left: oz(2.0), right: oz(2.2) });
  }

  for (const p of pumpSessions) {
    if (dayAgo === 0 && p.h > 13) continue;
    activities.push({
      userId: USER_ID, babyAgeMonths: BABY_AGE, category: "pumping",
      timestamp: d(dayAgo, p.h, p.m),
      pumpingDuration: p.dur,
      pumpingLeftAmount: p.left,
      pumpingRightAmount: p.right,
    });
  }
}

// ─── AI chat history ─────────────────────────────────────────────────────────

const chatHistory = [
  {
    role: "user",
    content: "Leo only slept 45 minutes for his midday nap, is that okay?",
    offsetMinutes: -180,
  },
  {
    role: "assistant",
    content: "Completely okay — and honestly, really common for a 4-month-old. At this age, a full sleep cycle is only about 45 minutes, so waking up right at that mark often just means Leo completed one cycle naturally. It doesn't mean anything is wrong with his sleep. As long as he seems content and isn't overtired, short naps are perfectly normal. Many babies this age haven't yet learned to link cycles during the day. You're reading him well — trust that instinct. You're doing great. 🌙",
    offsetMinutes: -177,
  },
  {
    role: "user",
    content: "Should I be worried about cluster feeding in the evening?",
    offsetMinutes: -120,
  },
  {
    role: "assistant",
    content: "Not at all — cluster feeding in the evenings is one of the most normal things a 4-month-old can do. Leo is likely going through a growth spurt or stocking up calories before his longer overnight stretch. It can feel relentless, especially at 5–7 PM, but it's a sign he's doing exactly what his body needs. The good news: this phase passes. Many parents find it eases up after a few days. You're not doing anything wrong — you're giving him exactly what he needs. This is completely normal, and you're handling it beautifully. 💛",
    offsetMinutes: -117,
  },
  {
    role: "user",
    content: "I haven't slept more than 3 hours straight in 2 weeks",
    offsetMinutes: -60,
  },
  {
    role: "assistant",
    content: "I hear you — that level of sleep deprivation is genuinely hard, and I want you to know it's okay to say so. What you're carrying right now is a lot. Two weeks of broken sleep affects everything: mood, patience, physical recovery, all of it. You're not just tired — you're running on real deficit, and still showing up every single day for Leo. That matters more than you might realize in this fog. Please be gentle with yourself. If there's any moment to ask for help — a partner, family, a friend — this is it. Even one slightly longer stretch can help reset things. You are doing so well, especially on the hardest days. 🌸",
    offsetMinutes: -57,
  },
];

// ─── AI daily insight ────────────────────────────────────────────────────────

const insightContent =
  "Leo's sleep has been improving steadily this week — you're finding your rhythm 🌙 Feedings are consistent and diaper count is right on track for 4 months. Everything looks healthy and normal. You're doing wonderfully.";

// ─── Insert everything ───────────────────────────────────────────────────────

async function seed() {
  // Clear existing data for this user
  await sql`DELETE FROM activities WHERE user_id = ${USER_ID}`;
  await sql`DELETE FROM chat_messages WHERE user_id = ${USER_ID}`;
  await sql`DELETE FROM ai_insights WHERE user_id = ${USER_ID}`;
  console.log("Cleared existing data");

  // Insert activities in batches
  let inserted = 0;
  for (const a of activities) {
    await sql`
      INSERT INTO activities (
        user_id, baby_age_months, category, timestamp,
        feeding_type, feeding_side, feeding_duration, feeding_amount,
        diaper_type,
        sleep_start, sleep_end, sleep_location,
        pumping_duration, pumping_left_amount, pumping_right_amount,
        other_note
      ) VALUES (
        ${a.userId}, ${a.babyAgeMonths}, ${a.category}, ${a.timestamp},
        ${a.feedingType ?? null}, ${a.feedingSide ?? null}, ${a.feedingDuration ?? null}, ${a.feedingAmount ?? null},
        ${a.diaperType ?? null},
        ${a.sleepStart ?? null}, ${a.sleepEnd ?? null}, ${a.sleepLocation ?? null},
        ${a.pumpingDuration ?? null}, ${a.pumpingLeftAmount ?? null}, ${a.pumpingRightAmount ?? null},
        ${a.otherNote ?? null}
      )
    `;
    inserted++;
  }
  console.log(`Inserted ${inserted} activities`);

  // Insert chat messages
  const now = new Date();
  for (const msg of chatHistory) {
    const ts = new Date(now.getTime() + msg.offsetMinutes * 60000);
    await sql`
      INSERT INTO chat_messages (user_id, role, content, timestamp)
      VALUES (${USER_ID}, ${msg.role}, ${msg.content}, ${ts})
    `;
  }
  console.log(`Inserted ${chatHistory.length} chat messages`);

  // Insert AI insight
  await sql`
    INSERT INTO ai_insights (user_id, content, generated_at)
    VALUES (${USER_ID}, ${insightContent}, ${new Date()})
  `;
  console.log("Inserted AI insight");

  await sql.end();
  console.log("✅ Seed complete");
}

seed().catch((e) => { console.error(e); process.exit(1); });
