import { mulberry32, shuffle } from "../utils";
import type { HomeworkPage, MandalaMemoryData } from "../types";

const PALETTES = [
  ["#FF6B6B", "#4ECDC4", "#a78bfa"],
  ["#f472b6", "#fbbf24", "#60a5fa"],
  ["#FF8A65", "#4DD0E1", "#AED581"],
];

export function generateMandalaMemory(seed: number, variant: "colored" | "blank"): HomeworkPage {
  const rand = mulberry32(seed);
  const palette = PALETTES[Math.floor(rand() * PALETTES.length)];
  const symmetry = [4, 6, 8][Math.floor(rand() * 3)];

  const sections = Array.from({ length: symmetry * 3 }, (_, i) => ({
    shape: ["circle", "triangle", "diamond"][i % 3],
    color: palette[i % palette.length],
    position: i,
  }));

  const data: MandalaMemoryData = {
    type: "mandala-memory",
    symmetry,
    colors: variant === "colored" ? palette : [],
    sections: variant === "colored" ? sections : sections.map((s) => ({ ...s, color: "#fff" })),
  };

  return {
    pageNumber: variant === "colored" ? 41 : 42,
    domain: "intuitive-memory",
    instruction: variant === "colored"
      ? "Study this mandala pattern and remember where each color goes."
      : "Color this mandala to match the pattern you memorized.",
    data,
  };
}
