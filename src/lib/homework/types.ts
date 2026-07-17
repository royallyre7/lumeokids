// ============================================================
// Homework Generator Types
// ============================================================
import type { GenerateImageResponse } from "../aiQuota";

// --- Shared ---
export type Difficulty = "easy" | "medium" | "hard";
export type CognitiveDomain =
  | "intuitive-memory"
  | "maths-ability"
  | "sensory-reasoning"
  | "critical-thinking"
  | "language-stimulation"
  | "image-patterns";

// --- Exercise Data Types ---

/** Page 1: Match related items */
export interface AssociationData {
  type: "association";
  pairs: {
    item: string;       // item name (for prompt)
    image?: GenerateImageResponse;
    match: string;      // matching item name
    matchImage?: GenerateImageResponse;
  }[];
  distractors: string[]; // wrong options
}

/** Page 2: Divide into equal parts */
export interface EqualDivisionData {
  type: "equal-division";
  totalItems: number;
  groups: number;
  itemName: string;
  itemImage?: GenerateImageResponse;
}

/** Pages 3-4, 29-30: Follow arrow paths */
export interface DirectionFollowData {
  type: "direction-follow";
  gridType: "diamond" | "grid" | "triangle";
  rows: number;
  cols: number;
  arrows: string[]; // sequence of directions
  start: { row: number; col: number };
  end: { row: number; col: number };
  theme: string;
  themeImage?: GenerateImageResponse;
  targetItem: string;
}

/** Page 5: Math addition grid */
export interface AdditionGridData {
  type: "addition-grid";
  topNumbers: number[];
  sideNumbers: number[];
}

/** Pages 6-7, 31-32: Shape code decoding */
export interface ShapeCodeData {
  type: "shape-code";
  codeKey: { shape: string; letter: string }[];
  questions: {
    shapes: string[];
    answer: string;
  }[];
  theme: string; // circle, square, heart, triangle
}

/** Pages 8-10, 38-39: Number flow */
export interface NumberFlowData {
  type: "number-flow";
  gridSize: number; // 3, 4, 5, or 6
  maxNumber: number; // 9, 16, 25, or 36
  givenNumbers: { row: number; col: number; value: number }[];
  solution: number[][];
}

/** Pages 11-12: 3D block counting */
export interface BlockCountingData {
  type: "block-counting";
  operation: "add" | "subtract";
  groups: {
    blocks: number[][][]; // 3D representation
    count: number;
  }[];
  answer: number;
}

/** Pages 13-14: Curved maze */
export interface CurvedMazeData {
  type: "curved-maze";
  theme: string;
  themeImage?: GenerateImageResponse;
  itemsInside: number;
  itemsOutside: number;
  totalItems: number;
}

/** Page 15: Vocabulary writing */
export interface VocabularyData {
  type: "vocabulary";
  items: {
    name: string;
    image?: GenerateImageResponse;
  }[];
}

/** Page 16: Shape patterns */
export interface ShapePatternsData {
  type: "shape-patterns";
  quadrants: {
    grid: (string | null)[][];
    missing: { row: number; col: number };
    options: string[];
  }[];
}

/** Page 17: Word grids */
export interface WordGridsData {
  type: "word-grids";
  words: string[];
  grid: string[][];
}

/** Pages 18-19: Shape decomposition */
export interface ShapeDecomposeData {
  type: "shape-decompose";
  shapes: {
    original: string; // SVG path or description
    pieces: string[];
    solution: string;
  }[];
}

/** Pages 20-21: Creature assembly */
export interface CreatureAssemblyData {
  type: "creature-assembly";
  creature: string;
  creatureImage?: GenerateImageResponse;
  parts: { part: string; fromAnimal: string }[];
}

/** Pages 22-23: Dot grid copying */
export interface DotGridData {
  type: "dot-grid";
  gridSize: number;
  lines: { x1: number; y1: number; x2: number; y2: number }[];
}

/** Page 24: Logic association */
export interface LogicAssociationData {
  type: "logic-association";
  examples: {
    item: string;
    image?: GenerateImageResponse;
    related: string[];
  }[];
  questions: {
    item: string;
    image?: GenerateImageResponse;
    options: string[];
    answer: string;
  }[];
}

/** Pages 26-27: Vegetable classification */
export interface VegetableClassData {
  type: "vegetable-class";
  vegetables: {
    name: string;
    image?: GenerateImageResponse;
    category: "flower-fruit" | "root" | "leaves";
  }[];
  categories: string[];
}

/** Page 28: Creative writing */
export interface CreativeWritingData {
  type: "creative-writing";
  items: {
    name: string;
    image?: GenerateImageResponse;
  }[];
  prompt: string;
}

/** Pages 33-34: Story comprehension */
export interface StoryComprehensionData {
  type: "story-comprehension";
  story: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

/** Page 35: Memory grid */
export interface MemoryGridData {
  type: "memory-grid";
  gridSize: number;
  items: { row: number; col: number; item: string }[];
  viewTime: number; // seconds
}

/** Pages 36-37: Overlap counting */
export interface OverlapCountData {
  type: "overlap-count";
  shapeType: "triangles" | "circles";
  shapes: { cx: number; cy: number; r: number }[];
  letter: string;
  expectedCount: number;
}

/** Page 40: Sequence completion */
export interface SequenceCompleteData {
  type: "sequence-complete";
  sequences: {
    items: (number | string | null)[];
    rule: string;
    answer: number | string;
  }[];
}

/** Page 41: Mandala memory */
export interface MandalaMemoryData {
  type: "mandala-memory";
  symmetry: number;
  colors: string[];
  sections: { shape: string; color: string; position: number }[];
}

// --- Union type ---
export type ExerciseData =
  | AssociationData
  | EqualDivisionData
  | DirectionFollowData
  | AdditionGridData
  | ShapeCodeData
  | NumberFlowData
  | BlockCountingData
  | CurvedMazeData
  | VocabularyData
  | ShapePatternsData
  | WordGridsData
  | ShapeDecomposeData
  | CreatureAssemblyData
  | DotGridData
  | LogicAssociationData
  | VegetableClassData
  | CreativeWritingData
  | StoryComprehensionData
  | MemoryGridData
  | OverlapCountData
  | SequenceCompleteData
  | MandalaMemoryData;

/** A single page in the homework */
export interface HomeworkPage {
  pageNumber: number;
  domain: CognitiveDomain;
  instruction: string;
  data: ExerciseData;
}

/** Complete homework assignment */
export interface Homework {
  childId: string;
  childName: string;
  generatedAt: string;
  seed: number;
  pages: HomeworkPage[];
}
