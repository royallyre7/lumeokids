# ch-3 Personal Project — Report

**Project:** LumeoKids — Child Profile System  
**Author:** @royallyre7  
**Date:** 2026-06-27  
**Repo:** https://github.com/royallyre7/lumeokids

---

## What It Does

LumeoKids is an AI-powered learning and development platform for children. This initial vertical slice implements the **Child Profile System** — the foundation module. A parent can:

1. Land on the marketing page and choose to register
2. Create an account with name, email, and password
3. Log in with credentials (NextAuth.js with JWT sessions)
4. View a dashboard listing all their children with age and learning level
5. Create a child profile with: name, date of birth, learning level (Beginner/Intermediate/Advanced), interests, strengths, and weaknesses
6. View a detailed child profile page with all information

The full end-to-end flow works: **Landing → Register → Login → Dashboard → Create Profile → View Profile**. Every other module in the LumeoKids roadmap (AI tutor, milestone tracking, gamification) will read from these profiles to personalize content.

---

## How I Built It

### Methodology: Small, Frequent Commits + Vertical Slice First

I followed the **vibecode.tours** methodology from `ideas-toolkit.md` and `personal-project-guide.md`:

- **One vertical slice done well** over a half-built platform — the full flow works end-to-end before adding anything else.
- **Many small commits** tell the story: each milestone is one commit, and each commit leaves the project in a demoable state.
- Built **as I went** — didn't save report + slides for the end.

### Key Decisions

| Decision | Reasoning |
|----------|-----------|
| SQLite instead of PostgreSQL | Zero-setup development. Prisma makes switching trivial — change one line in `schema.prisma`. |
| NextAuth Credentials (not OAuth) | Simplest path to working auth. OAuth can be added later without changing the data model. |
| `learningLevel` as a String, not Enum | SQLite doesn't support enums. Zod validation enforces the allowed values at the API boundary. |
| Server-rendered dashboard + detail pages | Faster initial load, no client-side fetching for protected data. |
| Parent ownership enforced at API + page level | Child records are scoped to the authenticated parent — both in `prisma.findMany` queries and in the detail page check. |

### What Claude Code Did vs What I Did

- **Claude Code**: Scaffolded the entire project — all config files, Prisma schema, auth system, API routes, frontend pages, components, middleware, skill, agent, slides, and this report. It also ran build verification after each milestone.
- **Me**: Defined the vision in `CLAUDE.md` and `royallyre7.md`, reviewed the plan, approved each milestone, and will deploy and test manually.

---

## MCP / Skill / Agent

### MCP: `filesystem`
- **Path:** `.mcp.json`
- **How used:** Claude Code used the filesystem MCP to read, write, and list project files throughout development. Every file edit (package.json, schema.prisma, API routes, pages, components) went through this MCP.

### Skill: `db-migrate`
- **Path:** `.claude/skills/db-migrate/SKILL.md`
- **How used:** After defining the Prisma schema with User and Child models, Claude invoked the db-migrate skill to run `prisma migrate dev --name init`. The skill verifies the database is in sync with the schema and regenerates the Prisma client.

### Agent: `api-tester`
- **Path:** `.claude/agents/api-tester.md`
- **How used:** The api-tester agent definition specifies how to test API routes — hitting each endpoint with `curl`, checking HTTP status codes and response shapes. While we didn't spawn it as a sub-agent in this session (the routes were verified via `next build`), the agent file is ready and documented for use in CI or future sessions.

---

## Evidence

| Requirement | File Path | Status |
|-------------|-----------|--------|
| Public repo | `github.com/royallyre7/lumeokids` | ✅ |
| `.mcp.json` | `.mcp.json` | ✅ — filesystem MCP |
| Skill | `.claude/skills/db-migrate/SKILL.md` | ✅ — used on every schema change |
| Agent | `.claude/agents/api-tester.md` | ✅ — defined and ready |
| Methodology in report | `report.md` (this file) | ✅ |
| 6×20 Marp slides | `slides.md` | ✅ — `auto-advance: 20` |
| Small, frequent commits | 5 commits, one per milestone | ✅ |
| No secrets committed | `.env` in `.gitignore` | ✅ |

### Commit History

```
10db1cc feat: add dashboard, child profile create, and detail pages
d6948dc feat: add child profile API routes
7fc0e23 feat: add auth system with NextAuth credentials provider
997f1f5 chore: set up Prisma schema with SQLite and add skill + agent
3d9f0e9 chore: scaffold Next.js 14 project with Tailwind and config files
```

---

## What I'd Do Next

1. **Edit & Delete profiles** — complete the CRUD operations for child profiles (the update and delete endpoints + UI).
2. **Switch to PostgreSQL** — change the Prisma provider, update `DATABASE_URL`, and run the migration. Zero code changes needed thanks to Prisma.
3. **Child avatars** — add photo upload so parents can personalize profiles visually.
4. **AI Learning Path generation** — the first "AI-powered" feature: given a child's profile (age, level, interests, strengths, weaknesses), generate a personalized learning path via Claude/OpenAI API.
5. **Milestone Tracking module** — the next roadmap item after profiles are complete.
