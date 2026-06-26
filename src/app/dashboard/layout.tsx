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
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/dashboard"
            className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-coral-500 to-coral-700 tracking-tight"
          >
            🧒 LumeoKids
          </Link>

          {/* User */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-500 hidden sm:block font-medium">
              {name}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="page-container">{children}</main>
    </div>
  );
}
