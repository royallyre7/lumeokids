"use client";

import Button from "@/components/ui/Button";

interface DownloadResultsButtonProps {
  childName: string;
  assessmentDate: string;
  overallScore: number;
  maxScore: number;
  overallPct: number;
  sectionScores: Record<string, { total: number; maxScore: number; zone: string }>;
  interests: string[];
  archetypes: Array<{
    name: string;
    emoji: string;
    tagline: string;
    matchStrength: number;
    description: string;
    coreStrengths: string[];
    recommendedActivities: string[];
    learningStyle: string;
    supportGuidance: string;
  }>;
}

export default function DownloadResultsButton({
  childName,
  assessmentDate,
  overallScore,
  maxScore,
  overallPct,
  sectionScores,
  interests,
  archetypes,
}: DownloadResultsButtonProps) {
  const handleDownload = () => {
    const results = {
      child: childName,
      assessmentDate,
      overallScore: `${overallScore}/${maxScore}`,
      overallPercentage: `${overallPct}%`,
      sectionScores,
      interests,
      topArchetype: archetypes[0]
        ? {
            name: archetypes[0].name,
            emoji: archetypes[0].emoji,
            matchStrength: `${archetypes[0].matchStrength}%`,
            description: archetypes[0].description,
            coreStrengths: archetypes[0].coreStrengths,
            recommendedActivities: archetypes[0].recommendedActivities,
            learningStyle: archetypes[0].learningStyle,
            supportGuidance: archetypes[0].supportGuidance,
          }
        : null,
      allArchetypes: archetypes.map((a) => ({
        name: a.name,
        emoji: a.emoji,
        matchStrength: `${a.matchStrength}%`,
      })),
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${childName.replace(/\s+/g, "-")}-assessment-results.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleDownload} variant="secondary">
      📥 Download Results
    </Button>
  );
}
