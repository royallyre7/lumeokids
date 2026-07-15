import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FloatingBlobs from "@/components/ui/FloatingBlobs";

const features = [
  {
    icon: "🧩",
    title: "Personalized Learning",
    description:
      "Every child learns differently. Profiles adapt to age, interests, and skill level.",
    color: "primary" as const,
  },
  {
    icon: "📊",
    title: "Growth Tracking",
    description:
      "Monitor cognitive, motor, emotional, and language milestones as your child grows.",
    color: "accent" as const,
  },
  {
    icon: "🎮",
    title: "Fun & Engaging",
    description:
      "Gamified activities, badges, and rewards keep children excited to learn daily.",
    color: "lavender" as const,
  },
  {
    icon: "🤖",
    title: "AI Tutor",
    description:
      "Adaptive lessons powered by AI that adjust to your child's pace and style.",
    color: "mint" as const,
  },
  {
    icon: "🍎",
    title: "Health & Nutrition",
    description:
      "Track meals, sleep, mood, and vaccinations — all in one place.",
    color: "sunny" as const,
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Bonding",
    description:
      "Parent-child activities, weekend challenges, and creative projects together.",
    color: "primary" as const,
  },
];

const colorAccent: Record<string, string> = {
  primary: "from-primary-400 to-primary-500",
  accent: "from-accent-400 to-accent-500",
  coral: "from-coral-400 to-coral-500",
  lavender: "from-lavender-400 to-lavender-500",
  mint: "from-mint-400 to-mint-500",
  sunny: "from-sunny-400 to-sunny-500",
};

const colorBg: Record<string, string> = {
  primary: "bg-primary-50",
  accent: "bg-accent-50",
  coral: "bg-coral-50",
  lavender: "bg-lavender-50",
  mint: "bg-mint-50",
  sunny: "bg-sunny-50",
};

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col">
      {/* === Hero === */}
      <section className="bg-hero relative overflow-hidden">
        <FloatingBlobs />

        <div className="page-container relative z-10 flex flex-col items-center text-center py-20 lg:py-28">
          {/* Brand pill */}
          <span className="pill-coral mb-6 animate-bounce-in shadow-sm">
            🧒 AI-Powered Learning
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-800 leading-tight max-w-3xl animate-slide-up">
            Your Child&apos;s{" "}
            <span className="text-gradient">Personal Learning</span>{" "}
            Companion
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-stone-500 max-w-2xl leading-relaxed animate-slide-up">
            LumeoKids helps parents track growth, personalize learning paths, and
            support every stage of their child&apos;s development — all in one
            warm, joyful platform.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 animate-slide-up">
            <Button variant="primary" size="lg" href="/register">
              Get Started Free ✨
            </Button>
            <Button variant="outline" size="lg" href="/login">
              Sign In
            </Button>
          </div>

          {/* Floating emoji decorations */}
          <div className="absolute top-16 left-[10%] text-4xl animate-float opacity-60 hidden lg:block" aria-hidden="true">🎨</div>
          <div className="absolute top-28 right-[12%] text-3xl animate-float-slow opacity-50 hidden lg:block" aria-hidden="true">⭐</div>
          <div className="absolute bottom-20 left-[15%] text-3xl animate-float-delayed opacity-50 hidden lg:block" aria-hidden="true">📚</div>
          <div className="absolute bottom-16 right-[18%] text-4xl animate-float opacity-60 hidden lg:block" aria-hidden="true">🚀</div>
        </div>
      </section>

      {/* === Features === */}
      <section className="page-container py-16">
        <div className="text-center mb-12">
          <span className="pill-lavender mb-4 inline-block">✨ Features</span>
          <h2 className="text-3xl font-extrabold text-stone-800 tracking-tight">
            Why Parents Love LumeoKids
          </h2>
          <p className="text-stone-500 mt-3 text-lg">
            Built for busy parents who want the best for their kids.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {features.map((f) => (
            <Card key={f.title} variant="accent" accentColor={f.color}>
              <div
                className={`w-14 h-14 rounded-2xl ${colorBg[f.color]} flex items-center justify-center text-2xl mb-4`}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-stone-800 mb-2">
                {f.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {f.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* === Stats banner === */}
      <section className="bg-gradient-to-r from-primary-500 to-lavender-500 py-12">
        <div className="page-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white stagger-children">
            <div>
              <div className="text-3xl font-extrabold">10+</div>
              <div className="text-sm opacity-80 mt-1">Learning Modules</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">5</div>
              <div className="text-sm opacity-80 mt-1">Archetypes</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">AI</div>
              <div className="text-sm opacity-80 mt-1">Powered Tutor</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">100%</div>
              <div className="text-sm opacity-80 mt-1">Free to Start</div>
            </div>
          </div>
        </div>
      </section>

      {/* === Footer CTA === */}
      <section className="bg-stone-50 py-20 relative overflow-hidden">
        <FloatingBlobs />
        <div className="page-container text-center relative z-10">
          <span className="pill-sunny mb-4 inline-block">🎉 Ready?</span>
          <h2 className="text-3xl font-extrabold text-stone-800 mb-4">
            Start your child&apos;s learning journey today
          </h2>
          <p className="text-stone-500 mb-8 text-lg">
            Create an account in seconds — no credit card required.
          </p>
          <Button variant="primary" size="lg" href="/register">
            Get Started Free 🚀
          </Button>
        </div>
      </section>
    </main>
  );
}
