import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-8">
        {/* Logo / Brand */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-primary-600">
            🧒 LumeoKids
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            An AI-powered learning and development platform that helps parents
            track growth, personalize learning paths, and support every stage
            of their child&apos;s journey.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-lg font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
