import { mulberry32 } from "../utils";
import type { HomeworkPage, OverlapCountData } from "../types";

export function generateOverlapCount(seed: number, shapeType: "triangles" | "circles"): HomeworkPage {
  const rand = mulberry32(seed);
  const count = Math.floor(rand() * 5) + 6;

  const shapes = Array.from({ length: count }, () => ({
    cx: 80 + rand() * 240,
    cy: 60 + rand() * 180,
    r: 40 + rand() * 30,
  }));

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letter = letters[Math.floor(rand() * letters.length)];

  return {
    pageNumber: shapeType === "triangles" ? 36 : 37,
    domain: "image-patterns",
    instruction: `The ${shapeType} overlap one another. Find out how many of the letters are found in the overlapping areas and write them in the bracket provided.`,
    data: { type: "overlap-count", shapeType, shapes, letter, expectedCount: Math.floor(count * 1.5) },
  };
}
