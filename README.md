# 🧒 LumeoKids

**An AI-powered learning and development platform for children.**

LumeoKids helps parents track their child's growth, discover learning archetypes through strengths assessments, and personalize development journeys — all in a warm, playful platform.

<p align="center">
  <img src="screenshots/01-landing.png" alt="LumeoKids Landing Page" width="600">
</p>

---

## ✨ What's Built

### 🧩 Child Profile System
Create and manage child profiles with name, date of birth, learning level, interests, strengths, and weaknesses. Each profile is ownership-protected.

### 🧠 Strengths Assessment
A 10-section wizard (A–J) plus an interest inventory (K) that evaluates a child across curiosity, creativity, persistence, emotional intelligence, leadership, and more. The **archetype engine** scores responses and matches children to one of 10 learning archetypes:

- 🔭 The Curious Explorer
- 🎨 The Creative Innovator
- 🏆 The Determined Achiever
- 🌟 The Empathetic Leader
- 🤝 The Social Connector
- 🧩 The Analytical Problem-Solver
- 🎭 The Performing Artist
- 💛 The Compassionate Helper
- 🛠️ The Independent Builder
- 💡 The Creative Divergent Thinker

Each archetype comes with core strengths, recommended activities, learning style guidance, and support recommendations. Results include domain framework mapping (Gardner, Duckworth, Goleman, etc.) and parent guidance by domain.

### 🎮 Learning Games
Three interactive brain-training games with server-side persistence:

- **🏁 Maze Game** — Procedurally generated mazes (recursive backtracking), mouse/touch/keyboard navigation, BFS pathfinding, difficulty scaling (easy/medium/hard)
- **🔮 Mandala Memory** — Flash memorization with SVG mandala patterns, color-matching phases (flash → color → compare), rotational symmetry (4/6/8 folds)
- **🧠 Right Brain Training** — 5 exercise categories: spatial rotation, pattern completion, visual memory, odd one out, mirror image

### 📚 Homework Generator
AI-powered 42-page PDF workbook generator covering 6 cognitive domains:

| Domain | Exercise Types |
|--------|---------------|
| Intuitive Memory | Memory grid, Mandala memory, Dot grid |
| Maths Ability | Addition grid, Number flow, Block counting |
| Sensory Reasoning | Direction follow, Curved maze, Shape decompose, Dot grid |
| Critical Thinking | Association, Creature assembly, Logic association, Vegetable classification |
| Language Stimulation | Vocabulary, Word grids, Creative writing, Story comprehension |
| Image Patterns | Shape code, Shape patterns, Overlap counting, Sequence completion |

Features:
- **9Router AI integration** — routes image generation to local/cheap models (Fireworks, SDXL, GLM) with fallback to Google/OpenAI
- **Resilience layer** — fetch timeouts (10s), circuit breaker (3 failures → 60s skip)
- **Puppeteer PDF** — high-quality HTML→PDF rendering with SVG graphics, A4 layout, embedded fonts
- **Seeded PRNG** — reproducible homework from the same seed

### 📊 Professional Reports
- **PDF download** — Puppeteer-rendered assessment results with SVG donut charts, domain frameworks, parent guidance
- **Growth tracking** — trend analysis across multiple assessments (↑ ↓ → indicators)
- **Zone descriptions** — professional zone descriptions with parent + educator guidance

### 👨‍👩‍👧 Parent Dashboard
A welcoming dashboard with stats, child cards with colored avatars, and quick access to profiles and assessments. Loading skeletons for perceived performance.

### 🔐 Authentication
Parent registration and login with NextAuth.js credentials provider and JWT sessions (24h max). Middleware guards all dashboard and API routes.

### 🎨 Playful Bubbles UI Design
A warm, kid-friendly design system featuring:

- **Colors**: Coral (primary), lavender (accent), sky, sunny, mint
- **Animations**: Floating blobs, bouncy spring easing, staggered pop-ins, soft pulse
- **Components**: Pill-shaped gradient buttons, glassmorphism cards, progress rings, floating decorations
- **Typography**: Nunito — rounded, friendly font
- **Accessibility**: `prefers-reduced-motion` support, ARIA labels, semantic HTML

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS (Playful Bubbles design system) |
| Backend | Next.js API Routes + Server Actions |
| Database | SQLite (dev) / PostgreSQL 16 (prod) |
| ORM | Prisma |
| Auth | NextAuth.js (Credentials + JWT) |
| Validation | Zod |
| AI Image Gen | 9Router → Google Imagen → OpenAI DALL-E → SVG fallback |
| PDF Rendering | Puppeteer (headless Chromium) |
| Containerization | Docker + Docker Compose |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Quick Start (SQLite — Development)

```bash
# Clone the repository
git clone git@github.com:royallyre7/lumeokids.git
cd lumeokids

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Docker Setup (PostgreSQL — Production)

```bash
# Clone and setup
git clone git@github.com:royallyre7/lumeokids.git
cd lumeokids
cp .env.example .env

# Edit .env — uncomment the PostgreSQL DATABASE_URL
# DATABASE_URL="postgresql://postgres:password@db:5432/lumeokids"

# Build and start
docker-compose up -d

# Run migrations inside the container
docker-compose exec web npx prisma migrate deploy
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (standalone output) |
| `npm start` | Start production server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run production migrations |
| `npm run db:migrate:dev` | Run dev migrations |
| `npm run db:studio` | Open Prisma Studio |

### Environment Variables

```env
# Database (SQLite for dev, PostgreSQL for prod)
DATABASE_URL="file:./dev.db"
# DATABASE_URL="postgresql://postgres:password@localhost:5432/lumeokids"

# Auth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# AI Providers (optional — homework image generation)
GOOGLE_AI_API_KEY=""
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
NINE_ROUTER_URL="http://localhost:20128/v1"
NINE_ROUTER_MODEL="fireworks/sdxl"
```

### Test Account

Use these credentials to explore the dashboard with sample data:

- **Email**: `uitest@example.com`
- **Password**: `password123`

The test account has child profiles and a completed assessment (Emma, "Creative Innovator" archetype).

---

## 📁 Project Structure

```
lumeokids/
├── prisma/
│   ├── schema.prisma              # Database schema (7 models)
│   └── migrations/
├── screenshots/                   # App screenshots (1280×800)
├── slides/
│   └── pitch.md                   # Product-intro deck
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (Nunito font)
│   │   ├── page.tsx               # Landing page
│   │   ├── globals.css            # Tailwind + animations + utilities
│   │   ├── (auth)/
│   │   │   ├── layout.tsx         # Split-screen auth layout
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx         # Glass header + user menu
│   │   │   ├── loading.tsx        # Dashboard skeleton
│   │   │   ├── page.tsx           # Welcome + stats + child cards
│   │   │   └── children/
│   │   │       ├── new/page.tsx   # 2-step create form
│   │   │       └── [id]/
│   │   │           ├── page.tsx   # Profile detail
│   │   │           ├── loading.tsx
│   │   │           ├── assessment/
│   │   │           │   ├── page.tsx      # 11-step wizard
│   │   │           │   └── results/
│   │   │           │       └── page.tsx  # Archetype results
│   │   │           ├── games/
│   │   │           │   ├── page.tsx      # Game hub
│   │   │           │   ├── actions.ts    # Server actions
│   │   │           │   ├── maze/page.tsx
│   │   │           │   ├── mandala/page.tsx
│   │   │           │   └── right-brain/page.tsx
│   │   │           └── homework/
│   │   │               └── page.tsx      # PDF generator
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── [...nextauth]/route.ts
│   │       │   └── register/route.ts
│   │       ├── children/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── assessments/route.ts
│   │       ├── children/[id]/assessment/pdf/route.ts
│   │       └── homework/generate/route.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx, Input.tsx, Card.tsx, Badge.tsx
│   │   │   ├── EmptyState.tsx, LogoutButton.tsx
│   │   │   ├── FloatingBlobs.tsx, ProgressRing.tsx
│   │   │   └── reports/ParentReport.tsx
│   │   └── games/
│   │       ├── GameCard.tsx, ExerciseList.tsx
│   │       ├── MazeRenderer.tsx, MandalaRenderer.tsx
│   │       └── RightBrainCard.tsx
│   ├── lib/
│   │   ├── prisma.ts              # Prisma singleton
│   │   ├── auth.ts                # NextAuth config
│   │   ├── server-auth.ts         # getSession / getCurrentUserId
│   │   ├── validators.ts          # Zod schemas
│   │   ├── archetypes.ts          # 10 sections, 10 archetypes
│   │   ├── utils.ts               # calculateAge, getInitial, getTimeOfDay
│   │   ├── puppeteer.ts           # Browser singleton
│   │   ├── pdf-template.ts        # Assessment PDF template
│   │   ├── domainMapping.ts       # Scientific framework mapping
│   │   ├── methods.ts             # 9 theoretical methods
│   │   ├── zonesPro.ts            # Professional zone descriptions
│   │   ├── growth.ts              # Growth trend engine
│   │   ├── aiImage.ts             # AI image gen (9Router cascade)
│   │   ├── aiQuota.ts             # Multi-provider quota router
│   │   ├── games/                 # Game engine logic
│   │   │   ├── types.ts, index.ts
│   │   │   ├── maze.ts, mandala.ts, rightBrain.ts
│   │   └── homework/              # Homework system
│   │       ├── types.ts, generator.ts, template.ts, utils.ts
│   │       └── generators/        # 16 subject generators
│   └── middleware.ts              # Auth guard
├── Dockerfile                     # Multi-stage Docker build
├── docker-compose.yml             # Web + PostgreSQL
├── .dockerignore
├── .env.example
├── LICENSE                        # MIT
├── CLAUDE.md                      # Session memory
└── README.md
```

---

## 📊 Development Roadmap

- [x] Project initialization
- [x] Child Profile System (CRUD)
- [x] Parent Dashboard (stats, child cards)
- [x] Authentication (NextAuth.js + JWT)
- [x] UI/UX Redesign (Playful Bubbles design system)
- [x] Child Strengths Assessment (10-section wizard + 10 archetypes)
- [x] Security Hardening (headers, JWT, input validation)
- [x] Learning Games (Maze, Mandala, Right Brain)
- [x] Homework Generator (42-page PDF with AI images)
- [x] 9Router AI Integration (cost routing + cascade fallback)
- [x] Docker + PostgreSQL support
- [x] Low-bandwidth optimizations (standalone, dynamic imports, gzip)
- [ ] Edit & Delete Child Profiles
- [ ] Milestone Tracking
- [ ] Daily Activity Training
- [ ] AI-Powered Tutor
- [ ] Nutrition & Health Tracking
- [ ] Vaccination Reminders
- [ ] AI Parenting Chatbot
- [ ] Offline Mode
- [ ] Cloud Sync + Backup

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**@royallyre7**
- GitHub: [royallyre7](https://github.com/royallyre7)

---

## 🙏 Acknowledgments

Inspired by:
- KidsMentor AI — AI tutoring for kids
- Avatario — gamified avatar systems
- KinderGrow — nutrition & health tracking
