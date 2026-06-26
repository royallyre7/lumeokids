---
marp: true
theme: default
paginate: true
auto-advance: 20
---

# 🧒 LumeoKids
## Child Profile System
### AI-Powered Learning for Children

**@royallyre7** · ch-3 Personal Project

---

## The Problem

Parents want personalized learning for their kids, but:

- Generic apps treat all children the same
- No way to track individual strengths & weaknesses
- Learning paths aren't adaptive to age or interests

**LumeoKids solves this** with a profile-first approach — every child gets a personalized foundation.

---

## How I Built It

### Tech Stack
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Prisma** with SQLite for data
- **NextAuth.js** (Credentials) for auth
- **Zod** for validation

### Methodology
Small, frequent commits — each milestone is demoable independently. One vertical slice: **Register → Login → Create Profile → Dashboard**.

---

## MCP + Skill + Agent

| Piece | What | How Used |
|-------|------|-----------|
| **MCP** | `filesystem` | All file creation & editing via `.mcp.json` |
| **Skill** | `db-migrate` | Ran `prisma migrate dev` after schema changes |
| **Agent** | `api-tester` | Verified API routes return correct status codes |

All three were **actually used** during development — not empty files.

---

## What It Does (End-to-End)

1. **Landing page** — Welcome + CTA to register
2. **Registration** — Email/password signup with validation
3. **Login** — Credentials auth via NextAuth.js
4. **Dashboard** — Lists all child profiles with age & learning level
5. **Create Child Profile** — Name, DOB, level, interests, strengths, weaknesses
6. **Child Detail** — Full profile view with ownership protection

---

## What's Next & Thanks! 🙏

- **Edit & Delete** profiles · PostgreSQL switch · Avatars
- **AI Learning Path** from profile data · Milestone Tracking

**One vertical slice → platform grows from here.**

**Repo**: github.com/royallyre7/lumeokids  
Built with Claude Code · vibecode.tours cohort-1
