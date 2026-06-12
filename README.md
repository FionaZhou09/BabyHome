# BabyHome

A local-first baby tracking app built with Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, lucide-react, and framer-motion.

## Run Locally

```bash
bun install
bun dev
```

Then open the local URL printed by Next.js, usually:

```text
http://localhost:3000
```

Next.js 16 requires Node.js 20.9 or newer.

## What Works Now

- Onboarding stores the baby profile in `localStorage`
- Home dashboard keeps the existing BabyHome design
- Activity logging works against a local in-memory demo store
- History and detail screens read from the local demo API
- Chat streams placeholder agent output
- Insights return placeholder local content

## Future Agent Slot

The placeholder agent lives at:

```text
src/lib/agent/placeholder.ts
```

Replace that module and the API handlers under `src/app/api/chat` and `src/app/api/insights` when you are ready to wire in your own agent.
