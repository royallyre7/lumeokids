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
    <div className="space-y-8 font-sans">
      <header className="space-y-3">
        <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight">
          {childName} – Strengths &amp; Learning Archetype Report
        </h1>
        <p className="text-sm font-medium text-stone-500">
          Age: {age} · Assessment date:{" "}
          {new Date(date).toLocaleDateString()}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-stone-800">Overall Summary</h2>
        <p className="text-sm text-stone-600 leading-relaxed bg-primary-50/50 p-4 rounded-clay border border-primary-100">
          This report highlights {childName}&apos;s developmental strengths,
          emerging skills, and preferred learning patterns across ten domains.
          It is designed to support growth, not to diagnose or label.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold text-stone-800">Domain Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(sectionResults).map(([key, result]) => {
            const domain = DOMAIN_MAP[key];
            const zoneMeta = ZONES_PRO[result.zone];
            if (!domain || !zoneMeta) return null;
            return (
              <div
                key={key}
                className="rounded-clay bg-white p-6 shadow-clay hover:shadow-clay-hover transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">
                    {key}
                  </span>
                  <h3 className="font-bold text-stone-800">
                    {domain.label}
                  </h3>
                </div>
                <p className="text-xs font-medium text-stone-400 mb-4">
                  Framework: {domain.framework} ({domain.professor})
                </p>
                <div className="space-y-3">
                  <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
                    <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Zone</p>
                    <p className="text-sm font-semibold text-stone-800">
                      {zoneMeta.label}
                    </p>
                    <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                      {zoneMeta.description}
                    </p>
                  </div>
                  <div className="bg-primary-50/30 p-3 rounded-2xl border border-primary-100/50">
                    <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">Parent Guidance</p>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {zoneMeta.parentGuidance}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold text-stone-800">Top Learning Archetypes</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {topArchetypes.map((arch) => (
            <div
              key={arch.name}
              className="rounded-clay bg-white p-6 shadow-clay hover:shadow-clay-hover transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl bg-primary-50 w-12 h-12 flex items-center justify-center rounded-full">{arch.emoji}</span>
                <div>
                  <h3 className="font-bold text-stone-800 leading-tight">
                    {arch.name}
                  </h3>
                  <p className="text-xs font-medium text-stone-500">{arch.tagline}</p>
                </div>
              </div>

              <p className="text-xs text-stone-600 mb-4 flex-grow">
                {arch.description}
              </p>

              <div className="space-y-2 text-[10px] font-medium">
                <div className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint-400 mt-1 shrink-0" />
                  <p className="text-stone-700">
                    <strong className="text-stone-800">Strengths:</strong>{" "}
                    {arch.coreStrengths.join(", ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-1 shrink-0" />
                  <p className="text-stone-700">
                    <strong className="text-stone-800">Activities:</strong>{" "}
                    {arch.recommendedActivities.join(", ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sunny-400 mt-1 shrink-0" />
                  <p className="text-stone-700">
                    <strong className="text-stone-800">Learning Style:</strong> {arch.learningStyle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 pt-4 border-t border-stone-200">
        <h2 className="text-lg font-bold text-stone-800">Important Notes</h2>
        <p className="text-xs text-stone-500 italic bg-stone-50 p-4 rounded-clay border border-stone-200">
          This assessment is non-clinical and strength-based. It is intended to
          guide supportive parenting and teaching, not to diagnose or limit{" "}
          {childName}. Re-assessment over time can show growth and changing
          patterns.
        </p>
      </section>
    </div>
  );
}
