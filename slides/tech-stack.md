---
marp: true
paginate: true
theme: default
---

<!-- slide 1 -->
# 🧒 LumeoKids — Tech Stack & AI Workflow
## How It's Built & How AI Was Used

---

<!-- slide 2 -->
# Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 14 (App Router) | Full-stack React framework |
| Styling | Tailwind CSS | Playful Bubbles design system |
| Database | SQLite (dev) / PostgreSQL (prod) | Data storage |
| ORM | Prisma | Type-safe database queries |
| Auth | NextAuth.js (JWT) | Parent login/register |
| Validation | Zod | API input validation |
| AI Engine | Custom archetype scorer | 10 archetypes, zone-based scoring |
| Deployment | GitHub Releases | v1.0.0 download package |

---

<!-- slide 3 -->
# AI Tools Used

| Tool | What It Did |
|------|-------------|
| Claude Code | Main assistant — wrote all code, components, API routes, schema |
| Skill: `db-migrate` | Automated Prisma migration workflow |
| Subagent: `api-tester` | Independent API route testing with `curl` |
| MCP (filesystem) | File read/write across the project |
| Zod | Schema-based input validation on all routes |
| NextAuth.js | Auth system with JWT sessions |

---

<!-- slide 4 -->
# Skill: `db-migrate`

**Purpose:** Automate database schema changes

**Trigger:** After editing `prisma/schema.prisma`

**Command:**
```
/db-migrate add-assessment-model
```

**What it does:**
1. Runs `npx prisma migrate dev --name <description>`
2. Runs `npx prisma generate`
3. Verifies the schema is applied

**File:** `.claude/skills/db-migrate/SKILL.md`

---

<!-- slide 5 -->
# Subagent: `api-tester`

**Purpose:** Verify API routes return correct responses

**Trigger:** After building or modifying API routes

**Command:**
```
run api-tester against all routes
```

**What it does:**
1. Reads route source to understand expected shapes
2. Hits each endpoint with `curl`
3. Checks HTTP status codes + JSON response structure
4. Prints pass/fail summary

**File:** `.claude/agents/api-tester.md`

---

<!-- slide 6 -->
# Methodology

1. **Plan** — CLAUDE.md tracks session state, roadmap, and next steps
2. **Build** — Claude Code writes code in focused phases (auth, CRUD, UI, assessment)
3. **Verify** — Subagent tests API routes independently
4. **Iterate** — Skill runs migrations safely after schema changes
5. **Document** — Slides, report, screenshots updated each chapter

---

<!-- slide 7 -->
# Architecture Overview

```
┌─────────────────────────────────────────┐
│            Next.js 14 (App Router)      │
├─────────────┬─────────────┬─────────────┤
│  Pages      │  API Routes │  Middleware  │
│  (React)    │  (REST)     │  (Auth)     │
├─────────────┴─────────────┴─────────────┤
│           Prisma ORM                    │
├─────────────────────────────────────────┤
│     SQLite (dev) / PostgreSQL (prod)    │
└─────────────────────────────────────────┘
```

---

<!-- slide 8 -->
# AI Workflow Diagram

```
User Request
    │
    ▼
Claude Code (main assistant)
    ├── Writes code (components, routes, schema)
    ├── Fires Skill: db-migrate (after schema changes)
    ├── Spawns Subagent: api-tester (after building routes)
    └── Updates CLAUDE.md (session memory)
```

---

<!-- slide 9 -->
# Summary

- **7 technologies** in the stack
- **2 custom AI tools** built and used (skill + subagent)
- **1 AI assistant** (Claude Code) orchestrating everything
- **Methodology:** Plan → Build → Verify → Iterate → Document

---

<!-- slide 10 -->
# Thank You

🔗 **GitHub:** github.com/royallyre7/lumeokids
📦 **Download:** github.com/royallyre7/lumeokids/releases

**Built with ❤️ and AI for parents & children**
