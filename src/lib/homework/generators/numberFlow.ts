// Number Flow Generator — Pages 8-10, 38-39
import { mulberry32, create2DArray } from "../utils";
import type { HomeworkPage, NumberFlowData } from "../types";

export function generateNumberFlow(seed: number, gridSize: number, maxNumber: number): HomeworkPage {
  const rand = mulberry32(seed);

  // Create solution: fill grid with 1-maxNumber in a snake-like path
  const grid = create2DArray<number>(gridSize, gridSize, 0);
  let num = 1;
  for (let r = 0; r < gridSize; r++) {
    if (r % 2 === 0) {
      for (let c = 0; c < gridSize; c++) grid[r][c] = num++;
    } else {
      for (let c = gridSize - 1; c >= 0; c--) grid[r][c] = num++;
    }
  }

  // Pre-fill some numbers as hints
  const givenNumbers: { row: number; col: number; value: number }[] = [];
  const hintCount = Math.floor(gridSize * 1.5);

  // Always include start and end
  givenNumbers.push({ row: 0, col: 0, value: 1 });
  givenNumbers.push({ row: gridSize - 1, col: gridSize - 1, value: maxNumber });

  // Add random hints
  while (givenNumbers.length < hintCount) {
    const r = Math.floor(rand() * gridSize);
    const c = Math.floor(rand() * gridSize);
    const val = grid[r][c];
    if (!givenNumbers.find((g) => g.row === r && g.col === c)) {
      givenNumbers.push({ row: r, col: c, value: val });
    }
  }

  const data: NumberFlowData = {
    type: "number-flow",
    gridSize,
    maxNumber,
    givenNumbers,
    solution: grid,
  };

  return {
    pageNumber: gridSize === 3 ? 8 : gridSize === 4 ? 10 : gridSize === 5 ? 38 : 39,
    domain: "maths-ability",
    instruction: `Fill in the missing numbers from 1-${maxNumber} into the box. Note that the numbers can only be placed below, above or beside each other.`,
    data,
  };
}
