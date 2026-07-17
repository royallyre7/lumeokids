// Game modules — algorithmic generators
export { generateMaze, scoreMaze } from "./maze";
export { generateMandala, mandalaToSvgElements, getMandalaColors } from "./mandala";
export { generateRightBrain, getCategoryLabel } from "./rightBrain";
export type {
  MazeData,
  MazeCell,
  MandalaData,
  MandalaElement,
  MandalaSlice,
  SymmetryFold,
  RightBrainExerciseData,
  RightBrainCategory,
  Difficulty,
  GameType,
} from "./types";
