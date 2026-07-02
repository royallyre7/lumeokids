import FloatingBlobs from "@/components/ui/FloatingBlobs";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left — brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-hero relative overflow-hidden items-center justify-center">
        <FloatingBlobs />

        <div className="relative z-10 text-center px-12 max-w-md">
          <div className="text-7xl mb-6 animate-bounce-in">🧒</div>
          <h2 className="text-3xl font-extrabold text-stone-800 mb-4">
            LumeoKids
          </h2>
          <p className="text-stone-500 text-lg leading-relaxed">
            Every child deserves a learning journey as unique as they are.
          </p>

          {/* Floating emojis */}
          <div className="mt-10 flex gap-6 justify-center text-4xl">
            <span className="animate-float" aria-hidden="true">🌟</span>
            <span className="animate-float-slow" aria-hidden="true">📚</span>
            <span className="animate-float-delayed" aria-hidden="true">🎨</span>
          </div>

          {/* Glassmorphism quote card */}
          <div className="mt-12 glass rounded-2xl p-5 text-left">
            <p className="text-sm text-stone-600 italic leading-relaxed">
              &ldquo;LumeoKids helped me understand my daughter&apos;s strengths.
              The assessment was eye-opening!&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-coral-100 flex items-center justify-center text-sm">
                👩
              </div>
              <div>
                <div className="text-xs font-bold text-stone-700">Sarah M.</div>
                <div className="text-xs text-stone-400">Parent of 2</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-lavender-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-coral-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true" />

        <div className="w-full max-w-md relative z-10">
          {/* Small brand for mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className="text-5xl mb-2">🧒</div>
            <h2 className="text-2xl font-extrabold text-stone-800">LumeoKids</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
