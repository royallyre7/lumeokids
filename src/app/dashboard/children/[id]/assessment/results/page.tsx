import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ProgressRing from "@/components/ui/ProgressRing";
import DownloadResultsButton from "@/components/DownloadResultsButton";
import { SECTIONS } from "@/lib/archetypes";
import type { SectionResult, ArchetypeMatch } from "@/lib/archetypes";
import { DOMAIN_MAP } from "@/lib/domainMapping";
import { ZONES_PRO } from "@/lib/zonesPro";
import { computeGrowthTrend } from "@/lib/growth";
import type { HistoricalSectionResult } from "@/lib/growth";

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
          className="inline-flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-coral-500 transition-colors mb-6"
        >
          ← Back to Child Profile
        </Link>
        <Card>
          <div className="text-center py-12 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-coral-100 rounded-full blur-2xl opacity-50" aria-hidden="true" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-lavender-100 rounded-full blur-2xl opacity-50" aria-hidden="true" />

            <div className="relative z-10">
              <div className="text-6xl mb-4 animate-float">📋</div>
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
                Start Assessment ✨
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const sectionScores = JSON.parse(assessment.sectionScores) as Record<string, SectionResult>;
  const archetypes = JSON.parse(assessment.archetypes) as ArchetypeMatch[];
  const interests = JSON.parse(assessment.interests) as string[];

  // Calculate overall score
  const totalScore = Object.values(sectionScores).reduce((sum, s) => sum + s.total, 0);
  const maxTotal = Object.values(sectionScores).reduce((sum, s) => sum + s.maxScore, 0);
  const overallPct = Math.round((totalScore / maxTotal) * 100);

  // ─── GROWTH TRACKING ───
  // Fetch all past assessments for this child to compute growth trends
  const allAssessments = await prisma.assessment.findMany({
    where: { childId: params.id },
    orderBy: { createdAt: "asc" },
  });

  // Build growth history per section
  const growthHistory: Record<string, HistoricalSectionResult[]> = {};
  SECTIONS.forEach((s) => {
    growthHistory[s.key] = [];
  });

  allAssessments.forEach((a) => {
    const scores = JSON.parse(a.sectionScores) as Record<string, SectionResult>;
    SECTIONS.forEach((s) => {
      const result = scores[s.key];
      if (result) {
        growthHistory[s.key].push({
          ...result,
          date: a.createdAt.toISOString(),
        });
      }
    });
  });

  const growthTrends = SECTIONS.map((s) => ({
    key: s.key,
    trend: computeGrowthTrend(growthHistory[s.key]),
  }));

  const hasGrowthData = allAssessments.length > 1;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Link
        href={`/dashboard/children/${params.id}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-coral-500 transition-colors mb-4 no-print"
      >
        ← Back to {child.name}&apos;s Profile
      </Link>

      {/* PDF capture target — everything inside is screenshotted */}
      <div id="pdf-content" className="bg-white p-6 rounded-2xl">

      {/* Header — Playful Bubbles */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-stone-800 mb-1">
          🧠 {child.name}&apos;s Strengths Assessment
        </h1>
        <p className="text-stone-500 text-sm">
          Completed{" "}
          {new Date(assessment.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {hasGrowthData && (
            <span className="ml-2 text-lavender-500 font-medium">
              · {allAssessments.length} assessments taken
            </span>
          )}
        </p>
      </div>

      {/* Overall Score Ring */}
      <Card variant="glass" className="mb-6 text-center">
        <div className="flex items-center justify-center gap-8 flex-wrap">
          <ProgressRing
            value={overallPct}
            size={100}
            strokeWidth={8}
            color="coral"
            label="Overall"
          />
          <div className="text-left">
            <h2 className="text-lg font-bold text-stone-700">Overall Score</h2>
            <p className="text-3xl font-extrabold text-gradient">
              {totalScore} <span className="text-base text-stone-400 font-normal">/ {maxTotal}</span>
            </p>
            <p className="text-sm text-stone-500 mt-1">
              {overallPct >= 70 ? "🌟 Excellent!" : overallPct >= 40 ? "👍 Good progress" : "🌱 Growing"}
            </p>
          </div>
        </div>
      </Card>

      {/* Section Score Bars — Playful Bubbles + Domain Frameworks */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold text-stone-700 mb-4">📊 Section Scores</h2>
        <div className="space-y-4">
          {SECTIONS.map((section) => {
            const result = sectionScores[section.key];
            if (!result) return null;
            const pct = (result.total / result.maxScore) * 100;
            const domain = DOMAIN_MAP[section.key];
            const zoneMeta = ZONES_PRO[result.zone];
            const growth = growthTrends.find((g) => g.key === section.key);

            return (
              <div key={section.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-stone-600">
                      {section.emoji} {section.key} — {section.label}
                    </span>
                    {/* Domain framework */}
                    {domain && (
                      <p className="text-[10px] text-stone-400 mt-0.5">
                        {domain.framework} — {domain.professor}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Growth indicator */}
                    {growth && hasGrowthData && (
                      <span className={`text-xs font-bold ${
                        growth.trend.direction === "up" ? "text-mint-500" :
                        growth.trend.direction === "down" ? "text-coral-400" :
                        "text-stone-400"
                      }`}>
                        {growth.trend.direction === "up" && `↑ +${growth.trend.delta}`}
                        {growth.trend.direction === "down" && `↓ ${growth.trend.delta}`}
                        {growth.trend.direction === "stable" && "→ 0"}
                      </span>
                    )}
                    <span className="text-sm font-bold text-stone-700">
                      {result.total}/{result.maxScore}
                    </span>
                  </div>
                </div>
                <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${result.zoneColor}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs font-medium text-stone-400">
                    {zoneMeta?.label || result.zone}
                  </span>
                  <span className="text-xs text-stone-400">
                    {zoneMeta?.description?.substring(0, 60)}...
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Interest Summary — Playful Bubbles */}
      {interests.length > 0 && (
        <Card className="mb-6">
          <h2 className="text-lg font-bold text-stone-700 mb-3">
            📋 Interest Inventory
          </h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((item) => (
              <span
                key={item}
                className="pill-lavender"
              >
                {item}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Parent Guidance — ZONES_PRO */}
      <Card className="mb-6">
        <h2 className="text-lg font-bold text-stone-700 mb-4">
          💡 Parent Guidance by Domain
        </h2>
        <div className="space-y-3">
          {SECTIONS.map((section) => {
            const result = sectionScores[section.key];
            if (!result) return null;
            const zoneMeta = ZONES_PRO[result.zone];
            if (!zoneMeta) return null;

            return (
              <div
                key={section.key}
                className="p-3 bg-gradient-to-r from-stone-50 to-white rounded-xl border border-stone-100"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{section.emoji}</span>
                  <span className="text-sm font-semibold text-stone-700">
                    {section.key} — {section.label}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    result.zone === "Outstanding" ? "bg-mint-100 text-mint-700" :
                    result.zone === "Strong" ? "bg-sky-100 text-sky-700" :
                    result.zone === "Emerging" ? "bg-sunny-100 text-sunny-700" :
                    "bg-coral-100 text-coral-700"
                  }`}>
                    {result.zone}
                  </span>
                </div>
                <p className="text-xs text-stone-600 ml-7">
                  {zoneMeta.parentGuidance}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Archetype Matches — Playful Bubbles */}
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
          <div className="space-y-4 stagger-children">
            {archetypes.map((arch, i) => (
              <Card
                key={arch.name}
                variant={i === 0 ? "accent" : "default"}
                accentColor={i === 0 ? "coral" : "sky"}
                className={i === 0 ? "ring-2 ring-coral-200" : ""}
              >
                {/* Match badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-coral-100 to-lavender-100 flex items-center justify-center text-3xl">
                    {arch.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-extrabold text-stone-800">
                        {arch.name}
                      </h3>
                      {i === 0 && (
                        <span className="pill-coral">
                          ⭐ Best Match
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-stone-500 italic">
                      &ldquo;{arch.tagline}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Match strength */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                    <span>Match Strength</span>
                    <span className="font-bold">{arch.matchStrength}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-coral-400 via-lavender-400 to-sky-400 rounded-full transition-all duration-500"
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
                    <ul className="space-y-1.5">
                      {arch.coreStrengths.map((s) => (
                        <li
                          key={s}
                          className="text-sm text-stone-700 flex items-start gap-2"
                        >
                          <span className="text-coral-400 mt-0.5 shrink-0">✦</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                      🎯 Recommended Activities
                    </h4>
                    <ul className="space-y-1.5">
                      {arch.recommendedActivities.map((a) => (
                        <li
                          key={a}
                          className="text-sm text-stone-700 flex items-start gap-2"
                        >
                          <span className="text-sky-400 mt-0.5 shrink-0">✦</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Learning Style */}
                <div className="mb-3 p-4 bg-gradient-to-r from-sky-50 to-lavender-50 rounded-2xl">
                  <h4 className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
                    📖 How They Learn Best
                  </h4>
                  <p className="text-sm text-stone-700">{arch.learningStyle}</p>
                </div>

                {/* Support Guidance */}
                <div className="p-4 bg-gradient-to-r from-coral-50 to-sunny-50 rounded-2xl">
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

      {/* Disclaimer */}
      <Card className="mb-6 border-lavender-200">
        <p className="text-xs text-stone-500 leading-relaxed">
          <strong>📋 Note:</strong> This assessment is non-clinical and strength-based.
          It is intended to guide supportive parenting and teaching, not to diagnose or limit {child.name}.
          Re-assessment over time can show growth and changing patterns.
        </p>
      </Card>

      </div>{/* end pdf-content */}

      {/* Actions */}
      <div className="flex gap-4 mb-12 flex-wrap no-print">
        <Button href={`/dashboard/children/${params.id}`} variant="ghost">
          ← Back to Profile
        </Button>
        <Button
          href={`/dashboard/children/${params.id}/assessment`}
          variant="primary"
        >
          Re-take Assessment
        </Button>
        <DownloadResultsButton />
      </div>
    </div>
  );
}
