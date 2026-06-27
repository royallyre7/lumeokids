import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { SECTIONS, ZONE_COLORS, ZONE_LABELS, ZONE_DESCRIPTIONS } from "@/lib/archetypes";
import type { SectionResult, ArchetypeMatch } from "@/lib/archetypes";

export default async function AssessmentResultsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id: string })?.id;

  // Verify child belongs to user
  const child = await prisma.child.findUnique({
    where: { id: params.id },
  });

  if (!child || child.parentId !== userId) {
    notFound();
  }

  const assessment = await prisma.assessment.findFirst({
    where: { childId: params.id },
    orderBy: { createdAt: "desc" },
  });

  if (!assessment) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <Link
          href={`/dashboard/children/${params.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-stone-600 transition-colors mb-6"
        >
          ← Back to Child Profile
        </Link>
        <Card>
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📋</div>
            <h1 className="text-xl font-extrabold text-stone-800 mb-2">
              No Assessment Yet
            </h1>
            <p className="text-stone-500 mb-6">
              Take the strengths assessment to discover {child.name}&apos;s learning
              archetype.
            </p>
            <Button
              href={`/dashboard/children/${params.id}/assessment`}
              variant="primary"
            >
              Start Assessment
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const sectionScores = JSON.parse(assessment.sectionScores) as Record<string, SectionResult>;
  const archetypes = JSON.parse(assessment.archetypes) as ArchetypeMatch[];
  const interests = JSON.parse(assessment.interests) as string[];

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Link
        href={`/dashboard/children/${params.id}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-stone-600 transition-colors mb-4"
      >
        ← Back to {child.name}&apos;s Profile
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-stone-800 mb-1">
          {child.name}&apos;s Strengths Assessment
        </h1>
        <p className="text-stone-500 text-sm">
          Completed{" "}
          {new Date(assessment.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Section Score Bars */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold text-stone-700 mb-4">Section Scores</h2>
        <div className="space-y-3">
          {SECTIONS.map((section) => {
            const result = sectionScores[section.key];
            if (!result) return null;
            const pct = (result.total / result.maxScore) * 100;

            return (
              <div key={section.key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-stone-600">
                    {section.emoji} {section.key} — {section.label}
                  </span>
                  <span className="text-sm font-bold text-stone-700">
                    {result.total}/{result.maxScore}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${result.zoneColor}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-0.5">
                  <span className="text-xs text-stone-400">
                    {ZONE_LABELS[result.zone]}
                  </span>
                  <span className="text-xs text-stone-400">
                    {ZONE_DESCRIPTIONS[result.zone]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Interest Summary */}
      {interests.length > 0 && (
        <Card className="mb-6">
          <h2 className="text-lg font-bold text-stone-700 mb-3">
            📋 Interest Inventory
          </h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-lg bg-stone-100 text-stone-600 text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Archetype Matches */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-stone-700 mb-4">
          🎯 Learning Archetype{archetypes.length > 1 ? "s" : ""}
        </h2>

        {archetypes.length === 0 ? (
          <Card>
            <p className="text-stone-500 text-center py-6">
              No strong archetype matches found. This may be because not enough
              sections were scored or the profile is evenly balanced across
              multiple areas. Try completing all sections for a clearer picture.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {archetypes.map((arch, i) => (
              <Card key={arch.name} className={i === 0 ? "ring-2 ring-coral-200" : ""}>
                {/* Match badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{arch.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-extrabold text-stone-800">
                        {arch.name}
                      </h3>
                      {i === 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-coral-100 text-coral-600 text-xs font-bold">
                          Best Match
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-stone-500 italic">
                      &ldquo;{arch.tagline}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Match strength */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span>Match Strength</span>
                    <span className="font-bold">{arch.matchStrength}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-coral-400 to-sky-400 rounded-full"
                      style={{ width: `${arch.matchStrength}%` }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-stone-600 mb-4">{arch.description}</p>

                {/* Core Strengths + Activities */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                      💎 Core Strengths
                    </h4>
                    <ul className="space-y-1">
                      {arch.coreStrengths.map((s) => (
                        <li
                          key={s}
                          className="text-sm text-stone-700 flex items-start gap-1.5"
                        >
                          <span className="text-coral-400 mt-0.5">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                      🎯 Recommended Activities
                    </h4>
                    <ul className="space-y-1">
                      {arch.recommendedActivities.map((a) => (
                        <li
                          key={a}
                          className="text-sm text-stone-700 flex items-start gap-1.5"
                        >
                          <span className="text-sky-400 mt-0.5">•</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Learning Style */}
                <div className="mb-2 p-3 bg-sky-50 rounded-xl">
                  <h4 className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
                    📖 How They Learn Best
                  </h4>
                  <p className="text-sm text-stone-700">{arch.learningStyle}</p>
                </div>

                {/* Support Guidance */}
                <div className="p-3 bg-coral-50 rounded-xl">
                  <h4 className="text-xs font-bold text-coral-600 uppercase tracking-wider mb-1">
                    💡 What They May Need Support With
                  </h4>
                  <p className="text-sm text-stone-700">{arch.supportGuidance}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-12">
        <Button href={`/dashboard/children/${params.id}`} variant="ghost">
          ← Back to Profile
        </Button>
        <Button
          href={`/dashboard/children/${params.id}/assessment`}
          variant="primary"
        >
          Re-take Assessment
        </Button>
      </div>
    </div>
  );
}
