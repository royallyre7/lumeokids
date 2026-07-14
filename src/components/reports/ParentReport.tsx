import { SectionResult, ArchetypeMatch } from "@/lib/archetypes";
import { DOMAIN_MAP } from "@/lib/domainMapping";
import { ZONES_PRO } from "@/lib/zonesPro";

interface ParentReportProps {
  childName: string;
  age: number;
  date: string;
  sectionResults: Record<string, SectionResult>;
  topArchetypes: ArchetypeMatch[];
}

export default function ParentReport({
  childName,
  age,
  date,
  sectionResults,
  topArchetypes,
}: ParentReportProps) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          {childName} – Strengths &amp; Learning Archetype Report
        </h1>
        <p className="text-sm text-slate-600">
          Age: {age} · Assessment date:{" "}
          {new Date(date).toLocaleDateString()}
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Overall Summary</h2>
        <p className="text-sm text-slate-700">
          This report highlights {childName}&apos;s developmental strengths,
          emerging skills, and preferred learning patterns across ten domains.
          It is designed to support growth, not to diagnose or label.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Domain Overview</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(sectionResults).map(([key, result]) => {
            const domain = DOMAIN_MAP[key];
            const zoneMeta = ZONES_PRO[result.zone];
            if (!domain || !zoneMeta) return null;
            return (
              <div
                key={key}
                className="rounded-xl bg-white/70 p-4 shadow-sm"
              >
                <h3 className="font-semibold">
                  {key} – {domain.label}
                </h3>
                <p className="text-xs text-slate-500">
                  Framework: {domain.framework} ({domain.professor})
                </p>
                <p className="mt-2 text-sm">
                  Zone: <strong>{zoneMeta.label}</strong>
                </p>
                <p className="mt-1 text-xs text-slate-700">
                  {zoneMeta.description}
                </p>
                <p className="mt-2 text-xs text-slate-700">
                  Parent guidance: {zoneMeta.parentGuidance}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Top Learning Archetypes</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {topArchetypes.map((arch) => (
            <div
              key={arch.name}
              className="rounded-xl bg-white/70 p-4 shadow-sm"
            >
              <h3 className="font-semibold flex items-center gap-2">
                <span>{arch.emoji}</span> {arch.name}
              </h3>
              <p className="text-xs text-slate-500">{arch.tagline}</p>
              <p className="mt-2 text-xs text-slate-700">
                {arch.description}
              </p>
              <p className="mt-2 text-xs text-slate-700">
                <strong>Core strengths:</strong>{" "}
                {arch.coreStrengths.join(" · ")}
              </p>
              <p className="mt-2 text-xs text-slate-700">
                <strong>Recommended activities:</strong>{" "}
                {arch.recommendedActivities.join(" · ")}
              </p>
              <p className="mt-2 text-xs text-slate-700">
                <strong>How they learn best:</strong> {arch.learningStyle}
              </p>
              <p className="mt-2 text-xs text-slate-700">
                <strong>Support guidance:</strong> {arch.supportGuidance}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Important Notes</h2>
        <p className="text-xs text-slate-700">
          This assessment is non-clinical and strength-based. It is intended to
          guide supportive parenting and teaching, not to diagnose or limit{" "}
          {childName}. Re-assessment over time can show growth and changing
          patterns.
        </p>
      </section>
    </div>
  );
}
