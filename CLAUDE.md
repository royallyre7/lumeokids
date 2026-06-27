# CLAUDE.md — LumeoKids Session Memory

## Project Overview
**LumeoKids** is an AI-powered learning and development platform for children.
- **Repo**: `git@github.com:royallyre7/lumeokids.git`
- **Author**: @royallyre7
- **License**: MIT

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | SQLite (development) / PostgreSQL (production) |
| ORM | Prisma |
| Auth | NextAuth.js |
| Validation | Zod |
| AI | OpenAI / Claude API |

---

## Current Session State
<!-- Update this section at the end of each session -->

### Status: `PAUSED`
- **Last worked on**: 2026-06-27 — UI/UX Redesign + Code Review & Bug Fixes
- **Branch**: `main`
- **Last commit**: `4df13a7` — fix: multi-step form bug, extract shared utils, restore ref files

### Session Summary (2026-06-27)

#### Phase 1 — Child Profile System MVP (commits `3d9f0e9` → `159d489`)
- Project scaffolded (Next.js 14, Tailwind, Prisma/SQLite)
- Auth system (register/login with NextAuth credentials, JWT sessions)
- Child profile CRUD: `POST`/`GET` `/api/children`, `GET /api/children/[id]`
- Parent dashboard with child listing, stats, age calculation
- Landing page with CTA
- `.mcp.json` (filesystem), `.claude/skills/db-migrate/SKILL.md`, `.claude/agents/api-tester.md`
- `report.md` + 6×20 Marp slides

#### Phase 2 — UI/UX Redesign (commits `62453bc` → `bb83e5e`, merged from `ui-redesign`)
- **Design system**: Warm kid-friendly palette (coral/sky/sunny/mint), Nunito font, animations (fade-in, slide-up, scale-in, pulse-soft)
- **5 reusable components**: `Button` (4 variants/3 sizes/loading spinner), `Input` (label+error+icon), `Card` (hover elevation), `Badge` (3 level variants), `EmptyState` (icon+CTA)
- **Landing page**: Hero gradient with blob backgrounds, feature cards grid, footer CTA
- **Auth layout**: Split-screen — left brand panel with animated emojis, right form panel (responsive)
- **Dashboard**: Sticky glassmorphism header, time-of-day greeting, stats row (count/advanced/avg age), child cards with colored initial avatars + interest tags
- **Create form**: 2-step wizard (Basics → Details) with step indicators
- **Child detail**: Gradient header bar, large avatar initial, icon info cards
- **Logout button**: Dropdown menu with animation

#### Phase 3 — Code Review & Bug Fixes (commit `4df13a7`)
- **Critical fix**: Multi-step form — changed conditional rendering to `hidden` class so all fields stay in DOM (FormData was dropping step-1 fields on submit)
- **DRY**: Extracted `calculateAge()`, `getInitial()`, `getTimeOfDay()` to `src/lib/utils.ts`
- **Restored**: Reference files moved back to project root
- **Cache clean**: Stale `.next` build cache cleared
- **Tested**: 13/13 tests pass (public pages, auth API, security, E2E flow)

### Actual Project Structure
```
lumeokids/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (Nunito font)
│   │   ├── page.tsx                # Landing page (hero + features)
│   │   ├── globals.css             # Tailwind + component layers + animations
│   │   ├── (auth)/
│   │   │   ├── layout.tsx          # Split-screen auth layout
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx          # Sticky header + user menu
│   │   │   ├── page.tsx            # Welcome + stats + child cards
│   │   │   └── children/
│   │   │       ├── new/page.tsx    # 2-step create form
│   │   │       └── [id]/page.tsx   # Profile detail with icons
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── [...nextauth]/route.ts
│   │       │   └── register/route.ts
│   │       └── children/
│   │           ├── route.ts
│   │           └── [id]/route.ts
│   ├── components/ui/
│   │   ├── Button.tsx              # 4 variants, 3 sizes, href, loading
│   │   ├── Input.tsx               # label + error + icon slot
│   │   ├── Card.tsx                # base + hover + link variants
│   │   ├── Badge.tsx               # beginner/intermediate/advanced
│   │   ├── EmptyState.tsx          # icon + title + CTA
│   │   └── LogoutButton.tsx        # dropdown menu
│   ├── lib/
│   │   ├── prisma.ts               # Prisma singleton
│   │   ├── auth.ts                 # NextAuth config
│   │   ├── server-auth.ts          # getSession / getCurrentUserId
│   │   ├── validators.ts           # Zod schemas
│   │   └── utils.ts                # calculateAge, getInitial, getTimeOfDay
│   └── middleware.ts               # Auth guard for /dashboard/*
├── .claude/
│   ├── skills/db-migrate/SKILL.md
│   └── agents/api-tester.md
├── .mcp.json
├── slides.md                       # 6×20 Marp
└── report.md                       # Full methodology + evidence
```

### Next Step
> **Edit & Delete Child Profiles** — Add `PUT`/`DELETE` routes + UI (edit button on detail page, delete with confirmation). Then proceed to **Milestone Tracking** module.

### Known Issues / Gotchas
- Multi-step create form: step dividers split groups visually but **all inputs stay in DOM** (hidden, not conditional) — don't revert to `{step === 1 && (...)}`
- Dev server needs `rm -rf .next` if page returns 500 (stale webpack cache on port change)
- SQLite `.db` file in `prisma/` is gitignored — fresh clone needs `prisma migrate dev` and `prisma generate`

---

## Development Roadmap
Track progress here. Check off when complete.

- [x] Project initialization
- [x] Child Profile System
- [x] Authentication (Parent login/register)
- [x] Parent Dashboard
- [x] UI/UX Redesign (warm palette, animations, reusable components)
- [ ] Edit & Delete Child Profiles
- [ ] Milestone Tracking
- [ ] Daily Activity Training
- [ ] AI-Powered Tutor
- [ ] Gamified Learning
- [ ] Nutrition & Health Tracking
- [ ] Vaccination Reminders
- [ ] AI Parenting Chatbot
- [ ] Offline Mode
- [ ] Cloud Sync + Backup

---

## Key Modules

### Core Modules
1. **Child Profile System** — Age, interests, learning level, strengths/weaknesses, personalized learning path
2. **Milestone Tracking** — Cognitive, motor, emotional, language milestones with delay alerts
3. **Daily Activity Training** — Puzzles, memory games, speech practice, math basics, parent-child tasks
4. **AI-Powered Tutor** — Adaptive lessons, voice-based explanations, story-based learning
5. **Parent Dashboard** — Charts, weekly progress, alerts, insights
6. **Gamified Learning** — Badges, rewards, avatar growth system
7. **Nutrition & Health Tracking** — Meals, sleep, mood, temperature logging
8. **Vaccination & Medical Reminders** — Auto-generated schedules, alerts, doctor visit notes
9. **AI Parenting Chatbot** — Behavior questions, learning advice, routine planning
10. **Offline Mode** — Works without internet, syncs when online
11. **Multi-Child Support** — Separate profiles, shared parent dashboard

### Advanced AI Features
1. **Adaptive Learning Engine** — Difficulty adjusts automatically, tracks mastery level
2. **Emotion Recognition** — Voice tone analysis, drawing analysis, stress/mood detection
3. **Speech Therapy Tools** — Pronunciation scoring, AI feedback, daily practice
4. **Parent-Child Joint Activities** — Bonding tasks, weekend challenges, creative projects
5. **Cloud Sync + Backup** — Multi-device support, secure storage

---

## Planned Project Structure
```
lumeokids/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── (auth)/            # Login & register pages
│   │   ├── dashboard/         # Parent dashboard
│   │   └── api/               # API routes
│   ├── components/            # Reusable UI components
│   ├── lib/                   # Utilities (prisma, auth, validators)
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── CLAUDE.md                  # This file — session memory
└── README.md
```

---

## Session Instructions for Claude

### At Session Start:
1. Read this `CLAUDE.md` file first
2. Check `Current Session State` to understand where we left off
3. Check `Next Step` to know what to work on
4. Confirm with user before proceeding

### During Session:
- Update `Current Job` when starting a task
- Update `Status` to `IN PROGRESS`
- Commit progress frequently with descriptive messages

### At Session End:
- Update `Last worked on` with date and what was done
- Update `Current Job` to reflect completion or partial progress
- Update `Next Step` with the next logical task
- Update `Status` to `PAUSED` or `COMPLETE`
- Check off completed roadmap items

### Context Overflow Prevention:
- Summarize completed work before starting new tasks
- Keep this file updated as the single source of truth
- Reference this file instead of repeating project context

---

## Notes
- Inspired by: KidsMentor AI, Avatario, KinderGrow
- Database: SQLite for development (file:./dev.db), PostgreSQL for production — switch Prisma provider to change
- Auth: NextAuth.js with Credentials provider + JWT sessions
- Design: Warm kid-friendly palette (coral primary), Nunito font, 6 reusable UI components
- Test creds: `uitest@example.com` / `password123` (has sample child profiles)
