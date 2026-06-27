import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { calculateAge, getInitial } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import Badge, { getBadgeVariant } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const levelNames: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

const iconMap: Record<string, string> = {
  Age: "🎂",
  "Date of Birth": "📅",
  "Learning Level": "📈",
  Interests: "🎨",
  Strengths: "💪",
  Weaknesses: "🎯",
};

export default async function ChildDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id: string })?.id;

  const child = await prisma.child.findUnique({
    where: { id: params.id },
  });

  if (!child || child.parentId !== userId) {
    notFound();
  }

  const hasAssessment = await prisma.assessment.findFirst({
    where: { childId: child.id },
    select: { id: true },
  });

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-stone-600 transition-colors mb-6"
      >
        ← Back to Dashboard
      </Link>

      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-stone-100 shadow-card overflow-hidden">
        {/* Color bar + avatar */}
        <div className="bg-gradient-to-r from-coral-400 to-coral-500 h-24 relative">
          <div className="absolute -bottom-8 left-8">
            <div className="w-20 h-20 rounded-3xl bg-white shadow-lg flex items-center justify-center">
              <span className="text-3xl font-extrabold text-coral-500">
                {getInitial(child.name)}
              </span>
            </div>
          </div>
        </div>

        {/* Name + Badge */}
        <div className="pt-12 pb-8 px-8">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-extrabold text-stone-800">
              {child.name}
            </h1>
            <Badge
              label={levelNames[child.learningLevel] || child.learningLevel}
              variant={getBadgeVariant(child.learningLevel)}
            />
          </div>
          <p className="text-stone-500 text-sm mt-1">
            {calculateAge(child.dateOfBirth)} old
          </p>
        </div>

        {/* Assessment CTA */}
        <Card className="mt-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-bold text-stone-700">
                🧠 Strengths Assessment
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                {hasAssessment
                  ? `${child.name} has a completed assessment. Review the results or re-take it.`
                  : `Discover ${child.name}'s learning archetype with the 10-section strengths assessment.`}
              </p>
            </div>
            <Button
              href={`/dashboard/children/${child.id}/assessment`}
              variant={hasAssessment ? "secondary" : "primary"}
            >
              {hasAssessment ? "View Results" : "Start Assessment"}
            </Button>
          </div>
        </Card>
      </div>

      {/* Info Grid */}
      <div className="grid gap-4 mt-6 sm:grid-cols-2">
        <InfoCard
          label="Age"
          value={calculateAge(child.dateOfBirth)}
        />
        <InfoCard
          label="Date of Birth"
          value={child.dateOfBirth.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
        <InfoCard
          label="Learning Level"
          value={levelNames[child.learningLevel] || child.learningLevel}
        />
        <InfoCard
          label="Interests"
          value={child.interests || "Not specified"}
        />
        <InfoCard
          label="Strengths"
          value={child.strengths || "Not specified"}
        />
        <InfoCard
          label="Weaknesses"
          value={child.weaknesses || "Not specified"}
        />
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  const icon = iconMap[label] || "📋";
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-card p-5 flex items-start gap-4">
      <div className="text-2xl flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <dt className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
          {label}
        </dt>
        <dd className="text-stone-800 font-semibold break-words">{value}</dd>
      </div>
    </div>
  );
}
