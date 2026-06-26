import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const features = [
  {
    icon: "🧩",
    title: "Personalized Learning",
    description:
      "Every child learns differently. Profiles adapt to age, interests, and skill level.",
  },
  {
    icon: "📊",
    title: "Growth Tracking",
    description:
      "Monitor cognitive, motor, emotional, and language milestones as your child grows.",
  },
  {
    icon: "🎮",
    title: "Fun & Engaging",
    description:
      "Gamified activities, badges, and rewards keep children excited to learn daily.",
  },
];

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col">
      {/* === Hero === */}
      <section className="bg-hero relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-coral-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl" />

        <div className="page-container relative z-10 flex flex-col items-center text-center py-20 lg:py-28">
          {/* Brand pill */}
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-sm font-semibold text-coral-600 shadow-sm mb-6 animate-slide-up">
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
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" href="/login">
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* === Features === */}
      <section className="page-container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-stone-800 tracking-tight">
            Why Parents Love LumeoKids
          </h2>
          <p className="text-stone-500 mt-3 text-lg">
            Built for busy parents who want the best for their kids.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="text-center">
              <div className="text-4xl mb-4">{f.icon}</div>
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

      {/* === Footer CTA === */}
      <section className="bg-stone-100 py-16">
        <div className="page-container text-center">
          <h2 className="text-2xl font-extrabold text-stone-800 mb-4">
            Ready to start your child&apos;s journey?
          </h2>
          <p className="text-stone-500 mb-8">
            Create an account in seconds — no credit card required.
          </p>
          <Button variant="primary" size="lg" href="/register">
            🚀 Get Started Free
          </Button>
        </div>
      </section>
    </main>
  );
}
