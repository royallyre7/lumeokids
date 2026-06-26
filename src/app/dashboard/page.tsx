import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge, { getBadgeVariant } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";

function calculateAge(dateOfBirth: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - dateOfBirth.getTime();
  const years = Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor(
    (diffMs % (365.25 * 24 * 60 * 60 * 1000)) /
      (30.44 * 24 * 60 * 60 * 1000)
  );
  if (years > 0) {
    return `${years}y ${months}m`;
  }
  return `${months}m`;
}

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

const levelNames: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id: string })?.id;
  const name = session?.user?.name || "Parent";

  const children = await prisma.child.findMany({
    where: { parentId: userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="animate-fade-in">
      {/* === Welcome Row === */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-800">
            {getTimeOfDay()}, {name.split(" ")[0]}! 👋
          </h1>
          <p className="text-stone-500 mt-1">
            {children.length > 0
              ? `You have ${children.length} child${children.length > 1 ? "ren" : ""} on LumeoKids.`
              : "Ready to start your child's learning journey?"}
          </p>
        </div>
        <Button variant="primary" href="/dashboard/children/new" size="lg">
          + Add Child
        </Button>
      </div>

      {/* === Stats Row === */}
      {children.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <p className="text-3xl font-extrabold text-coral-500">
              {children.length}
            </p>
            <p className="text-sm text-stone-500 mt-1 font-medium">
              {children.length > 1 ? "Children" : "Child"}
            </p>
          </Card>
          <Card>
            <p className="text-3xl font-extrabold text-sky-600">
              {children
                .filter((c) => c.learningLevel === "ADVANCED")
                .length}
            </p>
            <p className="text-sm text-stone-500 mt-1 font-medium">Advanced</p>
          </Card>
          <Card className="col-span-2 sm:col-span-1">
            <p className="text-3xl font-extrabold text-mint-500">
              {Math.round(
                children.reduce((sum, c) => {
                  const ageMs =
                    new Date().getTime() - c.dateOfBirth.getTime();
                  return sum + ageMs / (365.25 * 24 * 60 * 60 * 1000);
                }, 0) / children.length
              )}
            </p>
            <p className="text-sm text-stone-500 mt-1 font-medium">
              Avg Age (yr)
            </p>
          </Card>
        </div>
      )}

      {/* === Children Grid === */}
      {children.length === 0 ? (
        <EmptyState
          icon="👶"
          title="No child profiles yet"
          description="Create your first child profile to start personalizing their learning journey."
          actionLabel="Create Your First Profile"
          actionHref="/dashboard/children/new"
        />
      ) : (
        <>
          <h2 className="text-lg font-bold text-stone-700 mb-4">
            Your Children
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {children.map((child, i) => {
              const colorClasses = [
                "bg-coral-100 text-coral-600",
                "bg-sky-100 text-sky-600",
                "bg-mint-100 text-mint-600",
                "bg-sunny-100 text-sunny-600",
              ];
              const colorClass = colorClasses[i % colorClasses.length];

              return (
                <Card
                  key={child.id}
                  href={`/dashboard/children/${child.id}`}
                  hover
                >
                  {/* Avatar + Name + Badge */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl ${colorClass} flex items-center justify-center text-lg font-extrabold flex-shrink-0`}
                    >
                      {getInitial(child.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-stone-800 truncate">
                        {child.name}
                      </h3>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {calculateAge(child.dateOfBirth)} old
                      </p>
                    </div>
                    <Badge
                      label={levelNames[child.learningLevel] || child.learningLevel}
                      variant={getBadgeVariant(child.learningLevel)}
                    />
                  </div>

                  {/* Interests preview */}
                  {child.interests && (
                    <div className="flex flex-wrap gap-1.5">
                      {child.interests
                        .split(",")
                        .slice(0, 3)
                        .map((interest) => (
                          <span
                            key={interest.trim()}
                            className="inline-block px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 text-xs font-medium"
                          >
                            {interest.trim()}
                          </span>
                        ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
