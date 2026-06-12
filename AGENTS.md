# Agent Guide

BabyHome is now a local-first Next.js app.

## Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Bun
- shadcn/ui, lucide-react, framer-motion

## Local Commands

```bash
bun install
bun dev
bun run lint
bun run build
```

Use Node.js 20.9 or newer for Next.js 16.

## Current Architecture

- `src/app/page.tsx` renders the home dashboard.
- `src/app/onboarding/page.tsx` stores the baby profile in `localStorage`.
- `src/app/api/activities` uses an in-memory demo store for local logging.
- `src/app/api/chat` streams placeholder agent responses.
- `src/app/api/insights` returns placeholder local insights.
- `src/lib/agent/placeholder.ts` is the future agent integration point.
- `src/lib/demo/store.ts` is the temporary local data store.

## Coding Notes

- Keep `page.tsx` files as thin route entries.
- Put feature UI under `src/components/screens/` or a feature-specific component folder.
- Keep API request helpers in `src/lib/api/`.
- Do not add external platform SDKs back unless the app is intentionally being reconnected to that platform.
