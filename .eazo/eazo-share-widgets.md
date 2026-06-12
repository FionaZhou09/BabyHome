# BabyHome Share Widget Spec

## App Context

BabyHome is a warm, cozy baby tracking companion for new parents. The visual identity uses:
- **Primary color**: `#f0997b` (warm coral) — buttons, headers
- **Secondary color**: `#5dcaa5` (soft teal) — AI insights, success states
- **Background**: `#fdf6f0` (cream white)
- **Typography**: Fredoka (headings), Quicksand (body)
- **Style**: Rounded corners (16–20px radius), tactile card shadows (`3px 3px 0 #5c4b3e`), border `#5c4b3e`

## Share Scenarios

### 1. Daily Milestone Share

**Trigger**: Parent taps "Share today's progress" after completing at least 5 logged activities.

**Widget content (inner 300×400 frame)**:
- Top: BabyHome logo (B in coral square) + "BabyHome" in Fredoka
- Teal card with bold heading: "Today's Activity Summary"
- Stats row: Feedings 🍼 | Diapers 💧 | Sleep 🌙 in colored chips
- AI insight teaser (1–2 sentences in teal bubble)
- Bottom: soft coral badge "Logged with BabyHome"

**Share payload**:
```ts
share.compose({
  text: `Baby's day at a glance: ${feedCount} feedings, ${diaperCount} diapers, ${sleepCount} sleep sessions. ${insightSummary}`,
  sourceAppId: process.env.NEXT_PUBLIC_EAZO_APP_ID,
  targetPath: "/history",
});
```

### 2. AI Reassurance Share

**Trigger**: After receiving an AI reassurance that the parent found helpful.

**Widget content**:
- Teal gradient card with star icon
- Quoted AI response excerpt (max 100 chars)
- "Midnight Companion said:" label in small caps
- Bottom: "You're doing great ✓" in coral

**Share payload**:
```ts
share.compose({
  text: `"${aiResponse.slice(0, 100)}..." — BabyHome's Midnight Companion reminded me: You're doing great.`,
  sourceAppId: process.env.NEXT_PUBLIC_EAZO_APP_ID,
  targetPath: "/chat",
});
```

## Design Notes for Post Drafter

- The outer card should feel warm and cozy — not clinical
- Use cream white (`#fdf6f0`) as card background
- Category color chips: coral (#f0997b), teal (#5dcaa5), purple (#b8a5d9), amber (#e6b875)
- All text in Fredoka/Quicksand — fallback to rounded system fonts
- Tactile shadow: `3px 3px 0 #5c4b3e` on cards
- No sharp edges: all corners min 16px radius
