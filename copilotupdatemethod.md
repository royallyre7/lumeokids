1. Overview

LumeoKids uses a 10-domain, strength-based developmental framework aligned with:

    Multiple Intelligences (Gardner)

    Grit Theory (Duckworth)

    Emotional & Social Intelligence (Goleman)

    Executive Function (Harvard)

    Social-Emotional Learning (CASEL)

    Temperament Theory (Thomas & Chess; Rothbart)

    Divergent Thinking (Guilford)

    Constructivist Learning (Piaget)

This spec defines:

    Domain → scientific framework mapping

    Method metadata

    Zone descriptions (professional)

    Growth tracking

    Report template structure

2. Domain → Scientific Framework Mapping (domainMapping.ts)
ts

// src/lib/domainMapping.ts

export const DOMAIN_MAP: Record<string, {
  label: string;
  framework: string;
  professor: string;
  reference: string;
}> = {
  A: {
    label: "Curiosity & Exploration",
    framework: "Self-Determination Theory (Intrinsic Motivation)",
    professor: "Edward Deci & Richard Ryan",
    reference: "https://selfdeterminationtheory.org",
  },
  B: {
    label: "Persistence, Grit & Resilience",
    framework: "Grit Theory",
    professor: "Angela Duckworth",
    reference: "https://angeladuckworth.com/grit-scale/",
  },
  C: {
    label: "Creativity & Innovation",
    framework: "Divergent Thinking Theory",
    professor: "J.P. Guilford",
    reference: "https://www.apa.org/pi/about/newsletter/2012/12/divergent-thinking",
  },
  D: {
    label: "Communication & Language",
    framework: "Multiple Intelligences (Linguistic Intelligence)",
    professor: "Howard Gardner",
    reference: "https://multipleintelligences.org",
  },
  E: {
    label: "Emotional Intelligence (EQ)",
    framework: "Emotional Intelligence Competency Model",
    professor: "Daniel Goleman",
    reference: "https://www.danielgoleman.info",
  },
  F: {
    label: "Leadership & Influence",
    framework: "Social Intelligence Theory",
    professor: "Daniel Goleman",
    reference: "https://www.danielgoleman.info/social-intelligence/",
  },
  G: {
    label: "Independence & Autonomy",
    framework: "Self-Determination Theory (Autonomy)",
    professor: "Edward Deci & Richard Ryan",
    reference: "https://selfdeterminationtheory.org",
  },
  H: {
    label: "Executive Function & Cognitive Control",
    framework: "Executive Function Framework",
    professor: "Harvard Center on the Developing Child",
    reference: "https://developingchild.harvard.edu/science/key-concepts/executive-function/",
  },
  I: {
    label: "Social Skills & Peer Relations",
    framework: "Social-Emotional Learning (SEL)",
    professor: "CASEL",
    reference: "https://casel.org/sel-framework/",
  },
  J: {
    label: "Temperament & Personality",
    framework: "Temperament Theory",
    professor: "Alexander Thomas, Stella Chess, Mary Rothbart",
    reference: "https://www.apa.org/monitor/2011/02/temperament",
  },
};

3. Method Metadata (methods.ts)
ts

// src/lib/methods.ts

export interface MethodInfo {
  id: string;
  name: string;
  domainKeys: string[];
  description: string;
  professor: string;
  reference: string;
}

export const METHODS: MethodInfo[] = [
  {
    id: "sdt",
    name: "Self-Determination Theory",
    domainKeys: ["A", "G"],
    description: "Explains intrinsic motivation, autonomy, and curiosity-driven learning.",
    professor: "Edward Deci & Richard Ryan",
    reference: "https://selfdeterminationtheory.org",
  },
  {
    id: "grit",
    name: "Grit Theory",
    domainKeys: ["B"],
    description: "Describes perseverance and sustained effort toward long-term goals.",
    professor: "Angela Duckworth",
    reference: "https://angeladuckworth.com/grit-scale/",
  },
  {
    id: "mi",
    name: "Multiple Intelligences",
    domainKeys: ["C", "D"],
    description: "Proposes distinct intelligences including linguistic and creative capacities.",
    professor: "Howard Gardner",
    reference: "https://multipleintelligences.org",
  },
  {
    id: "eq",
    name: "Emotional Intelligence",
    domainKeys: ["E", "F"],
    description: "Covers emotional awareness, regulation, empathy, and social influence.",
    professor: "Daniel Goleman",
    reference: "https://www.danielgoleman.info",
  },
  {
    id: "ef",
    name: "Executive Function",
    domainKeys: ["H"],
    description: "Defines working memory, inhibitory control, and cognitive flexibility.",
    professor: "Harvard Center on the Developing Child",
    reference: "https://developingchild.harvard.edu/science/key-concepts/executive-function/",
  },
  {
    id: "sel",
    name: "Social-Emotional Learning",
    domainKeys: ["I"],
    description: "Framework for social skills, relationship building, and responsible decision-making.",
    professor: "CASEL",
    reference: "https://casel.org/sel-framework/",
  },
  {
    id: "temperament",
    name: "Temperament Theory",
    domainKeys: ["J"],
    description: "Describes stable patterns of emotional reactivity and self-regulation.",
    professor: "Alexander Thomas, Stella Chess, Mary Rothbart",
    reference: "https://www.apa.org/monitor/2011/02/temperament",
  },
  {
    id: "divergent",
    name: "Divergent Thinking Theory",
    domainKeys: ["C"],
    description: "Explains creative idea generation and non-linear problem solving.",
    professor: "J.P. Guilford",
    reference: "https://www.apa.org/pi/about/newsletter/2012/12/divergent-thinking",
  },
  {
    id: "constructivist",
    name: "Constructivist Learning Theory",
    domainKeys: ["C", "D"],
    description: "Children construct knowledge actively through experience and reflection.",
    professor: "Jean Piaget",
    reference: "https://www.simplypsychology.org/piaget.html",
  },
];

4. Professional Zone Descriptions (zonesPro.ts)
ts

// src/lib/zonesPro.ts

import { ZoneLevel } from "./archetypes"; // reuse your existing type

export interface ZoneMeta {
  label: string;
  description: string;
  parentGuidance: string;
  educatorGuidance: string;
}

export const ZONES_PRO: Record<ZoneLevel, ZoneMeta> = {
  Outstanding: {
    label: "Outstanding Strength Zone",
    description: "Child shows strong, above-age development in this area with consistent behaviours and skills.",
    parentGuidance: "Provide rich opportunities, resources, and challenges. Protect this strength from burnout or overuse.",
    educatorGuidance: "Offer extension activities, leadership roles, and deeper exploration. Use this domain to anchor motivation.",
  },
  Strong: {
    label: "Strong Development Zone",
    description: "Child demonstrates reliable, age-appropriate skills with room for further refinement and challenge.",
    parentGuidance: "Encourage practice and variety. Celebrate effort and growth, not just outcomes.",
    educatorGuidance: "Use this domain as a stable base for learning. Introduce moderate challenges and cross-domain integration.",
  },
  Emerging: {
    label: "Emerging / Developing Zone",
    description: "Child is building skills in this area at a normal developmental pace.",
    parentGuidance: "Offer gentle scaffolding, patience, and low-pressure practice. Avoid comparison with other children.",
    educatorGuidance: "Provide structured support, clear instructions, and repeated opportunities to practice in safe contexts.",
  },
  Support: {
    label: "High-Support Zone",
    description: "Child may find this area challenging and benefits from intentional, consistent support.",
    parentGuidance: "Focus on encouragement, small wins, and emotional safety. Do not frame this as a deficit or failure.",
    educatorGuidance: "Use scaffolding, visual aids, and step-by-step guidance. Collaborate with parents on targeted strategies.",
  },
};

5. Growth Tracking Engine (growth.ts)
ts

// src/lib/growth.ts

import { SectionResult } from "./archetypes";

export interface HistoricalSectionResult extends SectionResult {
  date: string; // ISO string
}

export interface GrowthRecord {
  childId: string;
  sectionKey: string; // A–J
  history: HistoricalSectionResult[];
}

export function computeGrowthTrend(history: HistoricalSectionResult[]): {
  direction: "up" | "down" | "stable";
  delta: number;
} {
  if (history.length < 2) return { direction: "stable", delta: 0 };

  const sorted = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  const delta = last.total - first.total;
  if (delta > 5) return { direction: "up", delta };
  if (delta < -5) return { direction: "down", delta };
  return { direction: "stable", delta };
}

export function summarizeGrowth(records: GrowthRecord[]) {
  return records.map((record) => {
    const trend = computeGrowthTrend(record.history);
    return {
      childId: record.childId,
      sectionKey: record.sectionKey,
      trend,
    };
  });
}

6. Parent Report Template Structure (reportTemplate.tsx)
tsx

// src/components/reports/ParentReport.tsx

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

export function ParentReport({
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
          {childName} – Strengths & Learning Archetype Report
        </h1>
        <p className="text-sm text-slate-600">
          Age: {age} · Assessment date: {new Date(date).toLocaleDateString()}
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Overall Summary</h2>
        <p className="text-sm text-slate-700">
          This report highlights {childName}'s developmental strengths, emerging skills, and preferred learning patterns across ten domains. It is designed to support growth, not to diagnose or label.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Domain Overview</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(sectionResults).map(([key, result]) => {
            const domain = DOMAIN_MAP[key];
            const zoneMeta = ZONES_PRO[result.zone];
            return (
              <div key={key} className="rounded-xl bg-white/70 p-4 shadow-sm">
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
            <div key={arch.name} className="rounded-xl bg-white/70 p-4 shadow-sm">
              <h3 className="font-semibold flex items-center gap-2">
                <span>{arch.emoji}</span> {arch.name}
              </h3>
              <p className="text-xs text-slate-500">{arch.tagline}</p>
              <p className="mt-2 text-xs text-slate-700">{arch.description}</p>
              <p className="mt-2 text-xs text-slate-700">
                <strong>Core strengths:</strong> {arch.coreStrengths.join(" · ")}
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
          This assessment is non-clinical and strength-based. It is intended to guide supportive parenting and teaching, not to diagnose or limit {childName}. Re-assessment over time can show growth and changing patterns.
        </p>
      </section>
    </div>
  );
}

