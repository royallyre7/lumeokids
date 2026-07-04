import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import LogoutButton from "@/components/ui/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name || "Parent";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Sticky Header — Playful Bubbles glassmorphism */}
      <header className="sticky top-0 z-30 glass-strong shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/dashboard"
            className="text-lg font-extrabold text-gradient tracking-tight"
          >
            🧒 LumeoKids
          </Link>

          {/* User */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/error-logs"
              className="text-stone-400 hover:text-stone-600 transition-colors"
              title="Error Logs"
            >
              📋
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral-400 to-lavender-500 flex items-center justify-center text-white text-xs font-bold">
                {initial}
              </div>
              <span className="text-sm text-stone-600 font-medium">
                {name}
              </span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="page-container">{children}</main>
    </div>
  );
}
