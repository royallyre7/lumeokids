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

Each archetype comes with core strengths, recommended activities, learning style guidance, and support recommendations.

### 👨‍👩‍👧 Parent Dashboard
A welcoming dashboard with stats, child cards with colored avatars, and quick access to profiles and assessments.

### 🔐 Authentication
Parent registration and login with NextAuth.js credentials provider and JWT sessions. Middleware guards all dashboard routes.

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
| Backend | Next.js API Routes |
| Database | SQLite (development) / PostgreSQL (production) |
| ORM | Prisma |
| Auth | NextAuth.js (Credentials + JWT) |
| Validation | Zod |
| Testing | Playwright (Puppeteer for screenshots) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone git@github.com:royallyre7/lumeokids.git
cd lumeokids

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env  # or create .env manually

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
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
│   ├── schema.prisma              # Database schema (User, Child, Assessment)
│   └── migrations/
├── screenshots/                   # App screenshots (1280×800)
├── slides/
│   └── pitch.md                   # 10-slide product-intro deck
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
│   │   │   ├── page.tsx           # Welcome + stats + child cards
│   │   │   └── children/
│   │   │       ├── new/page.tsx   # 2-step create form
│   │   │       └── [id]/
│   │   │           ├── page.tsx   # Profile detail + assessment CTA
│   │   │           └── assessment/
│   │   │               ├── page.tsx        # 11-step wizard
│   │   │               └── results/
│   │   │                   └── page.tsx    # Archetype results
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── [...nextauth]/route.ts
│   │       │   └── register/route.ts
│   │       ├── children/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       └── assessments/
│   │           └── route.ts
│   ├── components/ui/
│   │   ├── Button.tsx             # 5 variants, pill-shaped, gradient fills
│   │   ├── Input.tsx              # label + error + icon + hint
│   │   ├── Card.tsx               # default / accent / glass / interactive
│   │   ├── Badge.tsx              # 8 color variants
│   │   ├── EmptyState.tsx         # floating icon + CTA
│   │   ├── LogoutButton.tsx       # gradient avatar + dropdown
│   │   ├── FloatingBlobs.tsx      # Decorative background shapes
│   │   └── ProgressRing.tsx       # SVG circular progress
│   ├── lib/
│   │   ├── prisma.ts              # Prisma singleton
│   │   ├── auth.ts                # NextAuth config
│   │   ├── server-auth.ts         # getSession / getCurrentUserId
│   │   ├── validators.ts          # Zod schemas
│   │   ├── archetypes.ts          # Sections, archetypes, scoring engine
│   │   └── utils.ts               # calculateAge, getInitial, getTimeOfDay
│   └── middleware.ts              # Auth guard for /dashboard/*
├── .claude/
│   ├── skills/db-migrate/SKILL.md
│   └── agents/api-tester.md
├── .mcp.json
├── LICENSE                         # MIT
├── CLAUDE.md                       # Session memory
├── report.md                       # Ch-4 submission report
└── README.md
```

---

## 📊 Development Roadmap

- [x] Project initialization
- [x] Child Profile System (CRUD)
- [x] Parent Dashboard (stats, child cards)
- [x] Child Strengths Assessment (10-section wizard + 10 archetypes)
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
