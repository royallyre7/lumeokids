import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id: string })?.id;

  const children = await prisma.child.findMany({
    where: { parentId: userId },
    orderBy: { createdAt: "desc" },
  });

  function calculateAge(dateOfBirth: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - dateOfBirth.getTime();
    const years = Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor(
      (diffMs % (365.25 * 24 * 60 * 60 * 1000)) /
        (30.44 * 24 * 60 * 60 * 1000)
    );

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ${months} month${months > 1 ? "s" : ""}`;
    }
    return `${months} month${months > 1 ? "s" : ""}`;
  }

  const levelBadge = (level: string) => {
    const colors: Record<string, string> = {
      BEGINNER: "bg-green-100 text-green-800",
      INTERMEDIATE: "bg-yellow-100 text-yellow-800",
      ADVANCED: "bg-purple-100 text-purple-800",
    };
    return (
      <span
        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors[level] || "bg-gray-100 text-gray-800"}`}
      >
        {level.charAt(0) + level.slice(1).toLowerCase()}
      </span>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage your children&apos;s learning profiles
          </p>
        </div>
        <Link
          href="/dashboard/children/new"
          className="inline-flex items-center rounded-lg bg-primary-600 px-5 py-2.5 text-white font-semibold hover:bg-primary-700 transition-colors shadow-sm"
        >
          + Add Child
        </Link>
      </div>

      {children.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">
            No child profiles yet.
          </p>
          <Link
            href="/dashboard/children/new"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Create your first child profile →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {children.map((child) => (
            <Link
              key={child.id}
              href={`/dashboard/children/${child.id}`}
              className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {child.name}
                </h2>
                {levelBadge(child.learningLevel)}
              </div>
              <p className="text-sm text-gray-500">
                Age: {calculateAge(child.dateOfBirth)}
              </p>
              {child.interests && (
                <p className="text-sm text-gray-500 mt-1 truncate">
                  Interests: {child.interests}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
