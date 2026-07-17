// Addition Grid Generator — Page 5
import { mulberry32, shuffle } from "../utils";
import type { HomeworkPage, AdditionGridData } from "../types";

export function generateAdditionGrid(seed: number): HomeworkPage {
  const rand = mulberry32(seed);

  // Generate 8 random single-digit numbers for top and side
  const allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const topNumbers = shuffle(allNums, rand).slice(0, 8);
  const sideNumbers = shuffle(allNums, rand).slice(0, 8);

  const data: AdditionGridData = {
    type: "addition-grid",
    topNumbers,
    sideNumbers,
  };

  return {
    pageNumber: 5,
    domain: "maths-ability",
    instruction: "Complete the addition grid.",
    data,
  };
}
