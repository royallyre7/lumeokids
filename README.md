# 🧒 LumeoKids

**An AI-powered learning and development platform for children.**

LumeoKids helps parents track their child's growth, personalize learning paths, and support development across cognitive, motor, emotional, and language skills — all in one place.

---

## ✨ Features

### 🎯 Core Modules

| Module | Description |
|--------|-------------|
| **Child Profile System** | Age, interests, learning level, strengths/weaknesses, personalized learning path |
| **Milestone Tracking** | Cognitive, motor, emotional, language milestones with delay alerts |
| **Daily Activity Training** | Puzzles, memory games, speech practice, math basics, parent-child tasks |
| **AI-Powered Tutor** | Adaptive lessons, voice-based explanations, story-based learning |
| **Parent Dashboard** | Charts, weekly progress, alerts, insights |
| **Gamified Learning** | Badges, rewards, avatar growth system |
| **Nutrition & Health Tracking** | Meals, sleep, mood, temperature logging |
| **Vaccination & Medical Reminders** | Auto-generated schedules, alerts, doctor visit notes |
| **AI Parenting Chatbot** | Behavior questions, learning advice, routine planning |
| **Offline Mode** | Works without internet, syncs when online |
| **Multi-Child Support** | Separate profiles, shared parent dashboard |

### 🚀 Advanced AI Features

| Feature | Description |
|---------|-------------|
| **Adaptive Learning Engine** | Difficulty adjusts automatically, tracks mastery level |
| **Emotion Recognition** | Voice tone analysis, drawing analysis, stress/mood detection |
| **Speech Therapy Tools** | Pronunciation scoring, AI feedback, daily practice |
| **Parent-Child Joint Activities** | Bonding tasks, weekend challenges, creative projects |
| **Cloud Sync + Backup** | Multi-device support, secure storage |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | NextAuth.js |
| Validation | Zod |
| AI Integration | OpenAI / Claude API |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:royallyre7/lumeokids.git
cd lumeokids

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database URL and secrets

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/lumeokids"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 📁 Project Structure

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
└── README.md
```

---

## 📊 Development Roadmap

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

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
