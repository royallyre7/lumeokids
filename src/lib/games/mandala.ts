// ============================================================
// Mandala Memory Generator — Right Brain Education Method
// ============================================================
// Based on mandala memory training:
// - Brief flash (1-2s) of colored mandala
// - Child colors a blank outline to match
// - Trains photographic/eidetic memory
//
// Difficulty progression:
// - Easy: 2 colors, simple pattern
// - Medium: 3 colors, moderate pattern
// - Hard: 4-5 colors, complex pattern

import type { MandalaData, MandalaElement, MandalaSlice, SymmetryFold, Difficulty } from "./types";

// Seeded PRNG (Mulberry32)
function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Kid-friendly color palettes — groups of 2-3 matching colors
// Each palette is designed so colors are visually distinct
const COLOR_GROUPS = [
  // 2-color groups (easy)
  ["#FF6B6B", "#4ECDC4"],
  ["#a78bfa", "#fbbf24"],
  ["#f472b6", "#34d399"],
  ["#FF8A65", "#4DD0E1"],
  // 3-color groups (medium)
  ["#FF6B6B", "#4ECDC4", "#a78bfa"],
  ["#f472b6", "#fbbf24", "#60a5fa"],
  ["#FF8A65", "#4DD0E1", "#AED581"],
  ["#E91E63", "#00BCD4", "#4CAF50"],
  // 4-5 color groups (hard)
  ["#FF6B6B", "#4ECDC4", "#a78bfa", "#fbbf24"],
  ["#f472b6", "#34d399", "#60a5fa", "#FF8A65", "#c084fc"],
  ["#E91E63", "#00BCD4", "#4CAF50", "#FFC107", "#9C27B0"],
  ["#FF8A65", "#4DD0E1", "#AED581", "#FFD54F", "#BA68C8"],
];

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function randRange(min: number, max: number, rand: () => number): number {
  return min + rand() * (max - min);
}

function randInt(min: number, max: number, rand: () => number): number {
  return Math.floor(randRange(min, max + 1, rand));
}

// Shape library — geometric elements for mandala slices
const SHAPES: MandalaElement["shape"][] = [
  "circle", "triangle", "petal", "diamond", "dot", "arc",
];

/**
 * Generate a single mandala slice with elements assigned to specific colors.
 * Each element gets a color index (0, 1, 2...) that maps to the palette.
 */
function generateSlice(
  symmetry: SymmetryFold,
  complexity: number,
  numColors: number,
  rand: () => number
): { elements: (MandalaElement & { colorIndex: number })[] } {
  const elements: (MandalaElement & { colorIndex: number })[] = [];

  // Each slice gets `complexity` elements arranged in rings
  for (let i = 0; i < complexity; i++) {
    const ring = (i + 1) / (complexity + 1); // distribute from center to edge
    const colorIndex = i % numColors; // cycle through colors evenly

    elements.push({
      shape: pick(SHAPES, rand),
      color: "", // will be filled from palette
      colorIndex,
      size: randRange(0.12, 0.28, rand),
      distance: ring * 0.85 + 0.1,
    });
  }

  return { elements };
}

/**
 * Generate a complete mandala for the memory game.
 * Returns both the colored version and section-to-color mapping.
 */
export function generateMandala(difficulty: Difficulty, seed?: number): MandalaData & {
  sectionColors: Record<string, number>[]; // per-section color assignments
  flashDuration: number; // seconds to show the colored version
} {
  const rand = mulberry32(seed ?? Math.floor(Math.random() * 2 ** 31));

  const config = {
    easy: { symmetry: 6 as SymmetryFold, complexity: 3, numColors: 2, flashDuration: 2 },
    medium: { symmetry: 8 as SymmetryFold, complexity: 4, numColors: 3, flashDuration: 1.5 },
    hard: { symmetry: 10 as SymmetryFold, complexity: 5, numColors: 5, flashDuration: 1 },
  };

  const { symmetry, complexity, numColors, flashDuration } = config[difficulty];

  // Pick a color group that has enough colors
  const eligibleGroups = COLOR_GROUPS.filter((g) => g.length >= numColors);
  const colorGroup = pick(eligibleGroups, rand);
  const palette = colorGroup.slice(0, numColors);

  // Generate base slice
  const baseSlice = generateSlice(symmetry, complexity, numColors, rand);

  // Assign actual colors from palette
  const baseWithColors = {
    elements: baseSlice.elements.map((el) => ({
      ...el,
      color: palette[el.colorIndex],
    })),
  };

  // Create slices — each rotational position mirrors the base
  const slices: MandalaSlice[] = [baseWithColors];
  for (let i = 1; i < symmetry; i++) {
    slices.push({
      elements: baseWithColors.elements.map((el) => ({
        ...el,
        color: palette[el.colorIndex],
      })),
    });
  }

  // Build section-color mapping for scoring
  // Each "section" is a slice position, with its elements' color indices
  const sectionColors: Record<string, number>[] = [];
  for (let s = 0; s < symmetry; s++) {
    const section: Record<string, number> = {};
    baseSlice.elements.forEach((el, e) => {
      section[`e${e}`] = el.colorIndex;
    });
    sectionColors.push(section);
  }

  return {
    symmetry,
    slices,
    palette,
    sectionColors,
    flashDuration,
  };
}

/**
 * Get all unique colors in the mandala.
 */
export function getMandalaColors(data: MandalaData): string[] {
  const colors = new Set<string>();
  for (const slice of data.slices) {
    for (const el of slice.elements) {
      colors.add(el.color);
    }
  }
  return Array.from(colors);
}

/**
 * Convert mandala to SVG-renderable elements.
 */
export function mandalaToSvgElements(
  data: MandalaData,
  centerX: number,
  centerY: number,
  radius: number
) {
  const elements: { shape: string; x: number; y: number; size: number; color: string; rotation: number; sectionIndex: number; elementIndex: number }[] = [];
  const angleStep = (2 * Math.PI) / data.symmetry;

  for (let s = 0; s < data.symmetry; s++) {
    const baseAngle = s * angleStep;
    const slice = data.slices[s];

    for (let e = 0; e < slice.elements.length; e++) {
      const el = slice.elements[e];
      const dist = el.distance * radius;
      const x = centerX + dist * Math.cos(baseAngle);
      const y = centerY + dist * Math.sin(baseAngle);
      const size = el.size * radius;

      elements.push({
        shape: el.shape,
        x,
        y,
        size,
        color: el.color,
        rotation: (baseAngle * 180) / Math.PI,
        sectionIndex: s,
        elementIndex: e,
      });
    }
  }

  return elements;
}
