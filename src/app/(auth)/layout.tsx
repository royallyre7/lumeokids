export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left — brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-hero relative overflow-hidden items-center justify-center">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-coral-200/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-sky-200/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sunny-200/40 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-12 max-w-md">
          <div className="text-6xl mb-6">🧒</div>
          <h2 className="text-3xl font-extrabold text-stone-800 mb-4">
            LumeoKids
          </h2>
          <p className="text-stone-500 text-lg leading-relaxed">
            Every child deserves a learning journey as unique as they are.
          </p>
          <div className="mt-10 flex gap-4 justify-center text-4xl">
            <span className="animate-bounce delay-0">🌟</span>
            <span className="animate-bounce delay-75">📚</span>
            <span className="animate-bounce delay-150">🎨</span>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        {/* Small brand for mobile */}
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="text-4xl mb-2">🧒</div>
            <h2 className="text-2xl font-extrabold text-stone-800">LumeoKids</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
