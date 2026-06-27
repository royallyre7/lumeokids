---
marp: true
paginate: true
transition: fade
# PechaKucha: 6 slides, 20s auto-advance. Do not change the count.
auto-advance: 20
---

<!-- slide 1 -->
# Who's my person?
<!-- 20s -->

Parents who want **personalized learning** for their children — tracking strengths, weaknesses, interests, and age-appropriate paths.

---

<!-- slide 2 -->
# Their problem

- Generic apps treat **all kids the same**
- No way to track individual **strengths & weaknesses**
- Learning paths aren't adaptive to **age or interests**
- Parents have **no dashboard** to see progress

---

<!-- slide 3 -->
# What I built

**LumeoKids** — an AI-powered child profile system:

- Landing page → Register → Login → Dashboard
- Create child profiles with name, DOB, learning level, interests
- Ownership-protected detail views
- Responsive, kid-friendly UI (coral/sky/sunny palette)

---

<!-- slide 4 -->
# How I built it
- **MCP**: `.mcp.json` — filesystem access for Claude Code
- **Skill**: `db-migrate` — ran Prisma migrations after schema changes
- **Agent**: `api-tester` — verified API routes return correct status codes
- **Stack**: Next.js 14, Tailwind, Prisma/SQLite, NextAuth, Zod

---

<!-- slide 5 -->
# Why it matters

One **vertical slice** becomes a full platform:

- Milestone tracking · AI-powered tutor
- Daily activities · Gamified learning
- Nutrition & health · Vaccination reminders

**Profile-first design** = every feature is personalized from day one.

---

<!-- slide 6 -->
# Done checklist
- [x] repo public — github.com/royallyre7/lumeokids
- [x] MCP + skill + agent used — all three in repo
- [x] report.md in team repo
