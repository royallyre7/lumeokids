// ============================================================
// Game Module Types
// ============================================================

// --- Maze ---
export type MazeCell = 0 | 1; // 0 = wall, 1 = path

export interface MazeData {
  rows: number;
  cols: number;
  grid: MazeCell[][];
  start: { row: number; col: number };
  end: { row: number; col: number };
}

export interface MazeExercise {
  id: string;
  childId: string;
  difficulty: string;
  maze: MazeData;
  completed: boolean;
  score: number | null;
  timeSpent: number | null;
  createdAt: Date;
}

// --- Mandala ---
export type SymmetryFold = 4 | 6 | 8;

export interface MandalaElement {
  shape: "circle" | "triangle" | "petal" | "diamond" | "dot" | "arc";
  color: string;
  size: number; // 0-1 scale
  distance: number; // 0-1 from center
}

export interface MandalaSlice {
  elements: MandalaElement[];
}

export interface MandalaData {
  symmetry: SymmetryFold;
  slices: MandalaSlice[];
  palette: string[];
}

export interface MandalaExercise {
  id: string;
  childId: string;
  difficulty: string;
  pattern: MandalaData;
  completed: boolean;
  score: number | null;
  timeSpent: number | null;
  createdAt: Date;
}

// --- Right Brain ---
export type RightBrainCategory =
  | "spatial-rotation"
  | "pattern-completion"
  | "visual-memory"
  | "odd-one-out"
  | "mirror-image";

export interface RightBrainExerciseData {
  type: RightBrainCategory;
  prompt: string;
  // For spatial-rotation
  shapes?: { rotation: number; isCorrect: boolean }[];
  // For pattern-completion
  grid?: (string | null)[][];
  missingCell?: { row: number; col: number };
  options?: string[];
  // For visual-memory
  positions?: { row: number; col: number }[];
  gridRows?: number;
  gridCols?: number;
  // For odd-one-out
  items?: { value: string; isOdd: boolean }[];
  // For mirror-image
  half?: "left" | "right";
  original?: string[];
  mirrorOptions?: string[];
}

export interface RightBrainExercise {
  id: string;
  childId: string;
  category: string;
  difficulty: string;
  data: RightBrainExerciseData;
  completed: boolean;
  score: number | null;
  timeSpent: number | null;
  createdAt: Date;
}

// --- Shared ---
export type Difficulty = "easy" | "medium" | "hard";
export type GameType = "maze" | "mandala" | "right-brain";
