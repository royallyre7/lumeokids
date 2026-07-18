# 📋 LumeoKids Implementation Guide

A step-by-step guide for setting up, developing, and deploying LumeoKids.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Local Development Setup](#2-local-development-setup)
3. [Docker Setup](#3-docker-setup)
4. [Database Management](#4-database-management)
5. [AI Provider Setup](#5-ai-provider-setup)
6. [Game Modules](#6-game-modules)
7. [Homework System](#7-homework-system)
8. [PDF Generation](#8-pdf-generation)
9. [Deployment](#9-deployment)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 18+ | Runtime |
| npm | 8+ | Package manager |
| Docker | 24+ | Containerization (optional) |
| Docker Compose | 2.20+ | Multi-container setup (optional) |

---

## 2. Local Development Setup

```bash
# 1. Clone the repo
git clone git@github.com:royallyre7/lumeokids.git
cd lumeokids

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Generate Prisma client
npx prisma generate

# 5. Run database migrations
npx prisma migrate dev

# 6. (Optional) Seed test data
# The test account is auto-created on first register:
# Email: uitest@example.com / Password: password123

# 7. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Dev Server Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production (standalone output in `.next/standalone/`) |
| `npm start` | Start production server |
| `npm run db:studio` | Open Prisma Studio (visual DB browser) |
| `npm run db:push` | Push schema changes without migration |
| `npm run db:migrate:dev` | Create and apply a new migration |

---

## 3. Docker Setup

### Quick Start

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f web

# Stop services
docker-compose down
```

### What's Included

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| `web` | Custom build | 3000 | Next.js app |
| `db` | postgres:16-alpine | 5432 | PostgreSQL database |

### Docker Architecture

```
Dockerfile (multi-stage):
├── Stage 1 (deps)     → Install production dependencies
├── Stage 2 (builder)  → Build Next.js app
└── Stage 3 (runner)   → node:20-alpine + Chromium + standalone app
```

### First-Time Docker Setup

```bash
# 1. Create .env with PostgreSQL URL
cat > .env << EOF
DATABASE_URL="postgresql://postgres:password@db:5432/lumeokids"
NEXTAUTH_SECRET="$(openssl rand -hex 32)"
NEXTAUTH_URL="http://localhost:3000"
EOF

# 2. Build and start
docker-compose up -d

# 3. Run migrations
docker-compose exec web npx prisma migrate deploy

# 4. Open browser
open http://localhost:3000
```

### Docker Commands

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start in detached mode |
| `docker-compose down` | Stop and remove containers |
| `docker-compose logs -f web` | Follow web service logs |
| `docker-compose exec web sh` | Shell into web container |
| `docker-compose exec db psql -U postgres` | Connect to PostgreSQL |
| `docker-compose build --no-cache` | Rebuild from scratch |

---

## 4. Database Management

### Schema Overview (7 Models)

```
User ──1:N──> Child ──1:N──> Assessment
                  │
                  ├──1:N──> MazeExercise
                  ├──1:N──> MandalaExercise
                  └──1:N──> RightBrainExercise

ErrorLog (standalone)
```

### Switching Between SQLite and PostgreSQL

**Development (SQLite):**
```env
DATABASE_URL="file:./dev.db"
```

**Production (PostgreSQL):**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/lumeokids"
```

After changing `DATABASE_URL`:
```bash
npx prisma migrate deploy
npx prisma generate
```

### Common DB Commands

```bash
# Generate Prisma client
npx prisma generate

# Create a migration (dev)
npx prisma migrate dev --name description_here

# Apply migrations (prod)
npx prisma migrate deploy

# Push schema without migration
npx prisma db push

# Open visual DB browser
npx prisma studio

# Reset database (dev only!)
npx prisma migrate reset
```

---

## 5. AI Provider Setup

### Provider Priority (Cascade Fallback)

```
1. 9Router (local proxy)  → Free/cheap models (Fireworks, SDXL, GLM)
2. Google Imagen          → High quality, paid
3. OpenAI DALL-E 3        → High quality, paid
4. Local placeholder      → SVG fallback (always works)
```

### 9Router Setup (Optional)

9Router is a local AI proxy that routes to free/cheap image models.

```bash
# Install 9Router (separate project)
# See: https://github.com/9router/9router

# Start 9Router on port 20128
9router serve --port 20128

# Set environment variable
export NINE_ROUTER_URL="http://localhost:20128/v1"
export NINE_ROUTER_MODEL="fireworks/sdxl"
```

### Google Imagen Setup

```bash
# Get API key from: https://aistudio.google.com/apikey
export GOOGLE_AI_API_KEY="your-key-here"
```

### OpenAI DALL-E Setup

```bash
# Get API key from: https://platform.openai.com/api-keys
export OPENAI_API_KEY="your-key-here"
```

### Resilience Features

| Feature | Config | Purpose |
|---------|--------|---------|
| Fetch timeout | 10s per provider | Prevent hanging requests |
| Circuit breaker | 3 failures → 60s skip | Avoid broken providers |
| Cascade fallback | Priority order | Always produce output |
| In-memory cache | Hash-based | Avoid duplicate generations |

---

## 6. Game Modules

### Maze Game

**Location:** `src/lib/games/maze.ts` + `src/components/games/MazeRenderer.tsx`

- **Algorithm:** Recursive backtracking (DFS) — generates perfect mazes
- **Grid sizes:** Easy=10×10, Medium=18×18, Hard=25×25
- **Navigation:** Mouse drag, touch drag, keyboard (arrow keys + WASD)
- **Scoring:** Ratio of optimal BFS path to actual steps taken

### Mandala Memory

**Location:** `src/lib/games/mandala.ts` + `src/components/games/MandalaRenderer.tsx`

- **Symmetry:** 4, 6, or 8 folds
- **Phases:** Flash (memorize) → Color (recall) → Compare (score)
- **Elements:** Circles, triangles, petals, diamonds, dots, arcs
- **Scoring:** Correct colors minus penalty for wrong colors

### Right Brain Training

**Location:** `src/lib/games/rightBrain.ts` + `src/components/games/RightBrainCard.tsx`

- **Categories:** Spatial rotation, pattern completion, visual memory, odd one out, mirror image
- **Data:** Uses emoji shapes for exercises
- **Difficulty:** Controls number of options, grid size, item count

### Adding a New Game

1. Create generator in `src/lib/games/newGame.ts`
2. Create renderer in `src/components/games/NewGameRenderer.tsx`
3. Add server actions in `src/app/dashboard/children/[id]/games/actions.ts`
4. Create page in `src/app/dashboard/children/[id]/games/new-game/page.tsx`
5. Add Prisma model in `prisma/schema.prisma`
6. Add GameCard in `src/app/dashboard/children/[id]/games/page.tsx`

---

## 7. Homework System

### Architecture

```
UI (homework/page.tsx)
  → POST /api/homework/generate
    → generator.ts (orchestrator)
      → 42 page generators (generators/*.ts)
        → AI image generation (aiImage.ts)
          → 9Router → Google → OpenAI → placeholder
      → template.ts (HTML builder)
        → 22 exercise types, 16 custom renderers
      → Puppeteer (HTML → PDF)
    → Return PDF buffer
```

### Exercise Types (22)

| # | Type | Pages | Domain |
|---|------|-------|--------|
| 1 | Association | 1 | Critical Thinking |
| 2 | Equal Division | 2 | Maths Ability |
| 3-4 | Direction Follow | 3-4 | Sensory Reasoning |
| 5 | Addition Grid | 5 | Maths Ability |
| 6-7 | Shape Code | 6-7 | Image Patterns |
| 8-10 | Number Flow | 8-10 | Maths Ability |
| 11-12 | Block Counting | 11-12 | Maths Ability |
| 13-14 | Curved Maze | 13-14 | Sensory Reasoning |
| 15 | Vocabulary | 15 | Language Stimulation |
| 16 | Shape Patterns | 16 | Image Patterns |
| 17 | Word Grids | 17 | Language Stimulation |
| 18-19 | Shape Decompose | 18-19 | Sensory Reasoning |
| 20-21 | Creature Assembly | 20-21 | Critical Thinking |
| 22-23 | Dot Grid | 22-23 | Intuitive Memory |
| 24 | Logic Association | 24 | Critical Thinking |
| 25 | Logic Association | 25 | Critical Thinking |
| 26-27 | Vegetable Class | 26-27 | Critical Thinking |
| 28 | Creative Writing | 28 | Language Stimulation |
| 29-30 | Direction Follow | 29-30 | Sensory Reasoning |
| 31-32 | Shape Code | 31-32 | Image Patterns |
| 33-34 | Story Comprehension | 33-34 | Language Stimulation |
| 35 | Memory Grid | 35 | Intuitive Memory |
| 36-37 | Overlap Count | 36-37 | Image Patterns |
| 38-39 | Number Flow | 38-39 | Maths Ability |
| 40 | Sequence Complete | 40 | Image Patterns |
| 41-42 | Mandala Memory | 41-42 | Intuitive Memory |

### Adding a New Exercise Type

1. Add data type in `src/lib/homework/types.ts`
2. Create generator in `src/lib/homework/generators/newExercise.ts`
3. Add renderer in `src/lib/homework/template.ts`
4. Register in `src/lib/homework/generators/index.ts`
5. Add to `RENDERERS` map in `template.ts`

---

## 8. PDF Generation

### Puppeteer Setup

**Singleton:** `src/lib/puppeteer.ts`
```typescript
// Lazy-initialized browser instance, reused across requests
const browser = await getBrowser();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "domcontentloaded" });
const pdf = await page.pdf({
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "15mm", right: "15mm", bottom: "15mm", left: "15mm" },
});
await page.close();
```

### Assessment PDF

**Template:** `src/lib/pdf-template.ts`
**API:** `POST /api/children/[id]/assessment/pdf`

### Homework PDF

**Template:** `src/lib/homework/template.ts`
**API:** `POST /api/homework/generate`

### Customizing PDF Layout

Edit the CSS in `template.ts` inside the `<style>` block. Key classes:
- `.page` — A4 page container
- `.page-header` — Logo + title
- `.instruction` — Exercise instruction bar
- `.exercise-content` — Main content area
- `.page-footer` — Page number + copyright

---

## 9. Deployment

### Option A: Docker (Recommended)

```bash
# Build
docker-compose build

# Start
docker-compose up -d

# Migrate
docker-compose exec web npx prisma migrate deploy
```

### Option B: Vercel

1. Push to GitHub
2. Import in Vercel dashboard
3. Set environment variables
4. Switch Prisma to PostgreSQL (Vercel Postgres or Neon)
5. Deploy

### Option C: Railway

1. Push to GitHub
2. Create new project in Railway
3. Add PostgreSQL service
4. Set `DATABASE_URL` to Railway's Postgres URL
5. Deploy

### Environment Variables for Production

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="<random-64-hex>"
NEXTAUTH_URL="https://your-domain.com"
GOOGLE_AI_API_KEY="..."
OPENAI_API_KEY="..."
```

---

## 10. Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Page returns 500 | Run `rm -rf .next` and restart dev server |
| Prisma client error | Run `npx prisma generate` |
| Database schema mismatch | Run `npx prisma migrate dev` |
| Puppeteer fails in Docker | Ensure Chromium is installed: `apk add chromium` |
| Blank PDF pages | Check `preferCSSPageSize: true` in generator.ts |
| Stale webpack cache | Delete `.next/` directory |
| Port 3000 in use | `lsof -ti:3000 | xargs kill -9` |

### Docker-Specific

| Issue | Solution |
|-------|----------|
| `docker-compose up` fails | Check `.env` has correct `DATABASE_URL` |
| DB connection refused | Wait for healthcheck: `docker-compose ps` |
| Build fails on Puppeteer | Ensure `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true` |
| Container exits immediately | Check logs: `docker-compose logs web` |

### AI Image Generation

| Issue | Solution |
|-------|----------|
| No images generated | Check if any AI provider is configured |
| 9Router timeout | Ensure 9Router is running on port 20128 |
| Circuit breaker open | Wait 60s for cooldown, or restart server |
| Quota exceeded | Check `getQuotaStatus()` or restart server (resets daily) |

---

## Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| SQLite for dev | Zero-config, file-based, no Docker needed |
| PostgreSQL for prod | ACID, concurrent access, production-ready |
| Puppeteer for PDF | HTML/CSS rendering, SVG support, high DPI |
| 9Router cascade | Cost optimization, local fallback, provider diversity |
| Server actions for games | Simpler than API routes for mutations |
| Standalone output | Smaller Docker images, no node_modules needed |
| Dynamic imports | Lazy-load heavy game components, faster initial load |
| Seeded PRNG | Reproducible homework from same seed |
