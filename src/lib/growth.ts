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
