// Shape Patterns Generator — Page 16
import { mulberry32, shuffle } from "../utils";
import type { HomeworkPage, ShapePatternsData } from "../types";

const SHAPES = ["○", "△", "□", "◇", "★", "♥"];

export function generateShapePatterns(seed: number): HomeworkPage {
  const rand = mulberry32(seed);

  const quadrants = Array.from({ length: 4 }, () => {
    const gridSize = 3;
    const grid: (string | null)[][] = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(null)
    );

    // Pick a pattern type
    const patternType = Math.floor(rand() * 3);

    if (patternType === 0) {
      // Row repeat: same shape in each row
      const shapes = shuffle(SHAPES, rand);
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          grid[r][c] = shapes[r % shapes.length];
        }
      }
    } else if (patternType === 1) {
      // Column repeat: same shape in each column
      const shapes = shuffle(SHAPES, rand);
      for (let c = 0; c < gridSize; c++) {
        for (let r = 0; r < gridSize; r++) {
          grid[r][c] = shapes[c % shapes.length];
        }
      }
    } else {
      // Diagonal pattern
      const shapes = shuffle(SHAPES, rand);
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          grid[r][c] = shapes[(r + c) % shapes.length];
        }
      }
    }

    // Remove one cell as the missing piece
    const missingRow = Math.floor(rand() * gridSize);
    const missingCol = Math.floor(rand() * gridSize);
    const answer = grid[missingRow][missingCol]!;
    grid[missingRow][missingCol] = null;

    // Generate wrong options
    const options = shuffle(
      SHAPES.filter((s) => s !== answer),
      rand
    ).slice(0, 3);
    options.push(answer);
    const shuffledOptions = shuffle(options, rand);

    return {
      grid,
      missing: { row: missingRow, col: missingCol },
      options: shuffledOptions,
    };
  });

  const data: ShapePatternsData = {
    type: "shape-patterns",
    quadrants,
  };

  return {
    pageNumber: 16,
    domain: "image-patterns",
    instruction: "Study the sequence and fill in the blanks with the correct answers.",
    data,
  };
}
