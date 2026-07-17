// Direction Following Generator — Pages 3-4, 29-30
import { mulberry32, shuffle } from "../utils";
import type { HomeworkPage, DirectionFollowData } from "../types";

const ARROWS = ["↑", "↓", "←", "→", "↖", "↗", "↘", "↙"];

export function generateDirectionFollow(
  seed: number,
  gridType: "diamond" | "grid" | "triangle",
  theme: string
): HomeworkPage {
  const rand = mulberry32(seed);

  // Generate arrow sequence (6-8 steps)
  const steps = Math.floor(rand() * 3) + 6;
  const arrows = Array.from({ length: steps }, () => pick(rand));

  const data: DirectionFollowData = {
    type: "direction-follow",
    gridType,
    rows: gridType === "diamond" ? 5 : 4,
    cols: gridType === "diamond" ? 5 : 5,
    arrows,
    start: { row: 0, col: 0 },
    end: { row: 3, col: 4 },
    theme,
    targetItem: theme,
  };

  const pageNum = theme === "birds" ? 3 : theme === "apples" ? 4 : theme === "ladybugs" ? 29 : 30;

  return {
    pageNumber: pageNum,
    domain: "sensory-reasoning",
    instruction: `Help to locate the ${theme} by following the direction of the arrows from the starting point.`,
    data,
  };
}

function pick(rand: () => number): string {
  return ARROWS[Math.floor(rand() * ARROWS.length)];
}
