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

### Status: `PAUSED`
- **Last worked on**: 2026-07-03 — Playful Bubbles UI Overhaul + Ch-4 Submission Prep
- **Branch**: `main`
- **Last commit**: `16bc9f6` — Stop tracking ignored files

### Session Summary (2026-07-03)

#### Phase 5 — Playful Bubbles UI Design Overhaul (commit `a93f7ec`)
- **New design tokens**: Lavender accent (`#a78bfa`), bubble/glow shadows, `prefers-reduced-motion` support
- **New animations**: `bounceIn`, `popIn`, `float`, `floatSlow`, `floatDelayed`, `wiggle`, `shimmer`, `spin-slow` — spring-based cubic-bezier easing
- **New CSS utilities**: `.glass` / `.glass-strong` (glassmorphism), `.blob` (decorative shapes), `.pill` (badges), `.card-accent` (colored top bar), `.stagger-children`, `.shimmer`, `.btn-gradient`
- **2 new components**: `FloatingBlobs` (decorative background shapes), `ProgressRing` (SVG circular progress)
- **Button**: Pill-shaped (`rounded-full`), gradient fills, new `lavender` variant, `icon` prop, `active:scale-95`
- **Card**: New variants — `accent` (colored top bar), `glass` (glassmorphism), `interactive`. `accentColor` prop
- **Input**: Added `hint` prop, `aria-invalid`/`aria-describedby`, `role="alert"` on errors
- **Badge**: 5 new color variants (`coral`, `sky`, `lavender`, `mint`, `sunny`), optional `icon` emoji
- **EmptyState**: Floating icon animation, decorative blobs background
- **LogoutButton**: Gradient avatar, 3-dot menu icon, `popIn` dropdown
- **Landing page**: Floating blobs, floating emojis, pill badges, 6 feature cards with accent bars, stats banner
- **Auth layout**: Floating blobs, glassmorphism quote card, gradient avatar, subtle background decorations
- **Dashboard**: Accent-colored stat cards, ring avatars, gradient user avatar, staggered children
- **Child Detail**: Multi-color gradient header, floating stars, glass assessment card
- **Create Form**: Gradient step indicators, icon inputs, descriptive step text
- **Assessment**: Gradient progress bar, pill section labels, gradient score buttons, completion checkmarks
- **Results**: Overall score ring, gradient bars, pill interest tags, staggered archetype cards
- **Accessibility**: `role="alert"`, `aria-hidden`, `aria-invalid`/`aria-describedby`, `prefers-reduced-motion`

#### Phase 6 — Ch-4 Submission Prep (commits `c22139e` → `16bc9f6`)
- **LICENSE**: MIT license added to repo
- **Screenshots**: 6 PNGs at 1280×800 (landing, login, register, dashboard, child detail, assessment results)
- **Slides**: 10-slide product-intro deck (`slides/pitch.md`)
- **Report**: Filled `report.md` with project details
- **GitHub Release**: v1.0.0 release created as download URL
- **Test data**: Assessment inserted for child-test-001 (Emma), archetype results populated
- **Changes pushed**: `c274daf..16bc9f6` on `main`

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

#### Phase 4 — Security Hardening + Child Assessment (commits `73b4314` → `b3d885f`)
- **Security fixes**: Security headers (X-Frame-Options, HSTS, CSP), JWT session maxAge 24h, input max lengths, DB index on parentId, middleware covers API routes, generic registration error
- **Child Assessment**: 10-section wizard (A–J) based on Child Strengths & Hobbies Discovery Tool + 8-cluster interest inventory (K)
- **Archetype engine**: `src/lib/archetypes.ts` — scores 10 sections → matches 10 archetypes (Curious Explorer, Creative Innovator, Empathetic Leader, etc.) with strengths, activities, learning style, support guidance
- **API**: `POST /api/assessments` + `GET /api/assessments?childId=X` — ownership-protected
- **Results page**: Section score bars, archetype cards with match %, interest summary
- **Child detail CTA**: Link to assessment (shows "Start Assessment" or "View Results")
- **Reference docs removed**: Cleaned 5 planning docs from repo; fixed slides format to PechaKucha 6×20 template

### Actual Project Structure
```
lumeokids/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (Nunito font)
│   │   ├── page.tsx                # Landing page (hero + features + stats banner)
│   │   ├── globals.css             # Tailwind + component layers + animations
│   │   ├── (auth)/
│   │   │   ├── layout.tsx          # Split-screen auth layout
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx          # Sticky glass header + user menu
│   │   │   ├── page.tsx            # Welcome + stats + child cards
│   │   │   └── children/
│   │   │       ├── new/page.tsx    # 2-step create form
│   │   │       └── [id]/
│   │   │           ├── page.tsx     # Profile detail + assessment CTA
│   │   │           └── assessment/
│   │   │               ├── page.tsx      # 11-step assessment wizard
│   │   │               └── results/
│   │   │                   └── page.tsx  # Results + archetype cards
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── [...nextauth]/route.ts
│   │       │   └── register/route.ts
│   │       ├── children/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       └── assessments/
│   │           └── route.ts         # POST + GET assessment
│   ├── components/ui/
│   │   ├── Button.tsx              # 5 variants (primary/secondary/outline/ghost/lavender), pill-shaped, gradient fills
│   │   ├── Input.tsx               # label + error + icon + hint, ARIA support
│   │   ├── Card.tsx                # default + accent + glass + interactive variants
│   │   ├── Badge.tsx               # 8 color variants + optional emoji icon
│   │   ├── EmptyState.tsx          # floating icon + decorative blobs + CTA
│   │   ├── LogoutButton.tsx        # gradient avatar + popIn dropdown
│   │   ├── FloatingBlobs.tsx       # Decorative floating blob shapes (Playful Bubbles)
│   │   └── ProgressRing.tsx        # SVG circular progress with 5 color options
│   ├── lib/
│   │   ├── prisma.ts               # Prisma singleton
│   │   ├── auth.ts                 # NextAuth config
│   │   ├── server-auth.ts          # getSession / getCurrentUserId
│   │   ├── validators.ts           # Zod schemas (register, login, child, assessment)
│   │   ├── archetypes.ts           # 10 sections, 10 archetypes, scoring engine
│   │   └── utils.ts                # calculateAge, getInitial, getTimeOfDay
│   └── middleware.ts               # Auth guard for /dashboard/*
├── screenshots/                    # 6 screenshots at 1280×800
│   ├── 01-landing.png
│   ├── 02-login.png
│   ├── 03-register.png
│   ├── 04-dashboard.png
│   ├── 05-child-detail.png
│   └── 06-assessment-results.png
├── slides/
│   └── pitch.md                    # 10-slide product-intro deck
├── .claude/
│   ├── skills/db-migrate/SKILL.md
│   └── agents/api-tester.md
├── .mcp.json
├── LICENSE                         # MIT
├── CLAUDE.md                       # This file — session memory
└── report.md                       # Ch-4 submission report
```

### Next Step
> **Priority: Push to remote + Ch-4 team repo submission.** 
> - Push latest commit to GitHub (if not already done)
> - Clone team repo (`team-NN`), copy `report.md` → `ch-4/<username>/report.md`
> - Open PR in team repo
> - Run `doctor.sh ch-4` to verify
> - **Then**: Edit & Delete Child Profiles — Add `PUT`/`DELETE` routes + UI (edit button on detail page, delete with confirmation). Then proceed to **Milestone Tracking** module.

### Known Issues / Gotchas
- Multi-step create form: step dividers split groups visually but **all inputs stay in DOM** (hidden, not conditional) — don't revert to `{step === 1 && (...)}`
- Assessment form uses the same hidden-DOM pattern (11 steps: A–J + K, all in DOM)
- Dev server needs `rm -rf .next` if page returns 500 (stale webpack cache on port change)
- SQLite `.db` file in `prisma/` is gitignored — fresh clone needs `prisma migrate dev` and `prisma generate`
- Assessment model stores JSON strings (sectionScores, interests, archetypes) — parse with `JSON.parse()` on read
- **Playful Bubbles additions**: `FloatingBlobs` and `ProgressRing` are new components; `lavender` color added to Tailwind config
- **Screenshots**: 6 PNGs in `screenshots/` — regenerate via Puppeteer if UI changes significantly
- **GitHub Release**: v1.0.0 requires manual `tar` + `gh release create` to update archive after changes
- **Test child**: `child-test-001` (Emma) has completed assessment data for archetype results demo

---

## Development Roadmap
Track progress here. Check off when complete.

- [x] Project initialization
- [x] Child Profile System
- [x] Authentication (Parent login/register)
- [x] Parent Dashboard
- [x] UI/UX Redesign (v1: warm palette, animations, reusable components)
- [x] UI/UX Playful Bubbles Overhaul (v2: lavender accent, floating blobs, glassmorphism, spring animations, new components)
- [x] Child Strengths Assessment (10-section wizard + archetype engine)
- [x] Security Hardening (headers, JWT, input validation)
- [x] Ch-4 Submission Prep (LICENSE, screenshots, slides, report, GitHub Release)
- [ ] Deploy live URL (Vercel/SQLite alternative or Railway)
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
