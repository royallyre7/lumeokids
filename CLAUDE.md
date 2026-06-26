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
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | NextAuth.js |
| Validation | Zod |
| AI | OpenAI / Claude API |

---

## Current Session State
<!-- Update this section at the end of each session -->

### Status: `NOT STARTED`
- **Last worked on**: —
- **Branch**: `main`
- **Last commit**: Initial commit (README.md, royallyre7.md)

### Current Job
> _None — project is freshly initialized._

### Next Step
> _Start with: Child Profile System or Authentication (Parent login/register)_

---

## Development Roadmap
Track progress here. Check off when complete.

- [x] Project initialization
- [ ] Child Profile System
- [ ] Authentication (Parent login/register)
- [ ] Milestone Tracking
- [ ] Daily Activity Training
- [ ] AI-Powered Tutor
- [ ] Parent Dashboard
- [ ] Gamified Learning
- [ ] Nutrition & Health Tracking
- [ ] Vaccination Reminders
- [ ] AI Parenting Chatbot
- [ ] Offline Mode
- [ ] Cloud Sync + Backup

---

## Key Modules (from royallyre7.md)

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
- Database: PostgreSQL with Prisma ORM
- Auth: NextAuth.js for parent accounts
