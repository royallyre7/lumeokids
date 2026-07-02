import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { calculateAge, getInitial, getTimeOfDay } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Badge, { getBadgeVariant } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";

const levelNames: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

const avatarColors = [
  { bg: "bg-coral-100", text: "text-coral-600", ring: "ring-coral-200" },
  { bg: "bg-sky-100", text: "text-sky-600", ring: "ring-sky-200" },
  { bg: "bg-lavender-100", text: "text-lavender-600", ring: "ring-lavender-200" },
  { bg: "bg-mint-100", text: "text-mint-600", ring: "ring-mint-200" },
  { bg: "bg-sunny-100", text: "text-sunny-600", ring: "ring-sunny-200" },
];

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

      {/* === Stats Row — Playful Bubbles === */}
      {children.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8 stagger-children">
          <Card variant="accent" accentColor="coral">
            <p className="text-3xl font-extrabold text-coral-500">
              {children.length}
            </p>
            <p className="text-sm text-stone-500 mt-1 font-medium">
              {children.length > 1 ? "Children" : "Child"}
            </p>
          </Card>
          <Card variant="accent" accentColor="sky">
            <p className="text-3xl font-extrabold text-sky-600">
              {children
                .filter((c) => c.learningLevel === "ADVANCED")
                .length}
            </p>
            <p className="text-sm text-stone-500 mt-1 font-medium">Advanced</p>
          </Card>
          <Card variant="accent" accentColor="mint">
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {children.map((child, i) => {
              const colors = avatarColors[i % avatarColors.length];

              return (
                <Card
                  key={child.id}
                  href={`/dashboard/children/${child.id}`}
                  hover
                >
                  {/* Avatar + Name + Badge */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl ${colors.bg} ${colors.text} ring-2 ${colors.ring} flex items-center justify-center text-lg font-extrabold flex-shrink-0`}
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
