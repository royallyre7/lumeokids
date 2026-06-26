# ch-3 Personal Project — Guide

**Source:** vibecode.tours · cohort-1
**Author:** kokoye2007
**Date:** 2026-06-18

---

## Table of Contents
- [Steps](#steps)
- [Suggested timeline](#suggested-timeline-one-focused-day)
- [What "good" looks like](#what-good-looks-like)
- [Report skeleton](#report-skeleton-what-to-write)
- [Checklist](#checklist-what-the-validator-checks)

---

## Overview

Build a small personal project and show you can drive Claude Code with a real **MCP + skill + agent**, then ship a report and slides.

**Companion docs:** `ch3-ideas-toolkit.md` (ideas + snippets) · `apis.md` (free APIs) · `GITHUB_SEARCH.md` (find examples).

---

## Steps

1. **Make your repo** — public, on your GitHub. Commit as you build (small, frequent commits — this is your git workflow / methodology).

2. **Use all three in the repo:**
   - **MCP** — add `.mcp.json` (or `mcpServers` in `.claude/settings.json`).
   - **Skill** — at least one `.claude/skills/<name>/SKILL.md`.
   - **Agent** — at least one `.claude/agents/<name>.md`.

3. **Slides** — copy `ch-3/pechakucha-6x20.md` (in your team repo), keep it 6 slides, 20s each (Marp only, `auto-advance: 20`). Put the Marp source in your repo.

4. **Report** — copy `ch-3/_TEMPLATE.md` (in your team repo) to `ch-3/<your-github-username>/report.md` in your team repo. Fill every field. In Evidence, list the real paths (`.mcp.json`, `.claude/skills/...`, `.claude/agents/...`) — the checker confirms they exist.

5. **Submit** — push / PR the `ch-3/<you>/report.md` to your team repo.

---

## Suggested timeline (≈ one focused day)

| Step | Time | Output |
|------|------|--------|
| Pick idea + make repo | 30 min | Public repo, README |
| Add `.mcp.json` + verify tools | 30 min | Working MCP load |
| Build smallest working version | 2–3 hr | One feature works end-to-end |
| Add skill + agent, use them | 1 hr | Real skill + agent in your flow |
| Write `report.md` | 45 min | All fields filled |
| Make 6×20 Marp slides | 45 min | Slides committed |

> Don't leave report + slides to the end. Write them as you build.

---

## What "good" looks like

- ✅ The skill and agent are **actually used** — your `report.md` points to the exact moment they helped, not just empty files.
- ✅ One feature works **end-to-end** (a vertical slice) rather than many half-features.
- ✅ Many small commits tell the story of how you built it.
- ✅ No secrets in the repo — keys live in `.env` (+ `.gitignore`).

---

## Report skeleton (what to write)

| Section | What to Write |
|---------|---------------|
| **What it does** | One paragraph. |
| **How I built it** | Your methodology, key decisions, what Claude Code did vs you. |
| **MCP / Skill / Agent** | Which ones, and where each was used. |
| **Evidence** | Real file paths: `.mcp.json`, `.claude/skills/<name>/SKILL.md`, `.claude/agents/<name>.md` |
| **What I'd do next** | One or two honest next steps. |

---

## Checklist (what the validator checks)

- [ ] Repo owner == your GitHub username
- [ ] `.mcp.json` + a skill + an agent present and used
- [ ] Methodology written in `report.md`
- [ ] Slides = Marp, 6 slides, 20s auto-advance
- [ ] All report fields filled + evidence paths exist
- [ ] `report.md` at `ch-3/<your-github-username>/report.md` in the team repo
