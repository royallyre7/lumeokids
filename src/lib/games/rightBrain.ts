// ============================================================
// Right Brain Training — Exercise Generator
// ============================================================
// Four exercise types: spatial rotation, pattern completion,
// visual memory, odd-one-out, mirror image.

import type { RightBrainExerciseData, RightBrainCategory, Difficulty } from "./types";

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

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// --- Shape symbols for exercises ---
const SHAPES = ["🔴", "🔵", "🟢", "🟡", "🟣", "🟠", "⭐", "💎", "🔷", "🔶"];
const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#a78bfa", "#f472b6", "#34d399"];

// ============================================================
// 1. Spatial Rotation
// "Which of these is the same shape, just rotated?"
// ============================================================
function generateSpatialRotation(difficulty: Difficulty, rand: () => number): RightBrainExerciseData {
  const baseShape = pick(SHAPES, rand);
  const numOptions = difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 5;
  const correctIndex = Math.floor(rand() * numOptions);

  const baseRotation = Math.floor(rand() * 360);
  const correctRotation = baseRotation + 180; // Opposite direction

  const shapes = Array.from({ length: numOptions }, (_, i) => {
    if (i === correctIndex) {
      return { rotation: correctRotation, isCorrect: true };
    }
    // Wrong rotations
    const wrongRotations = [0, 45, 90, 135, 270, 315].filter(
      (r) => r !== correctRotation && r !== baseRotation
    );
    return {
      rotation: pick(wrongRotations, rand),
      isCorrect: false,
    };
  });

  return {
    type: "spatial-rotation",
    prompt: `Look at this shape: ${baseShape}\nWhich option below is the SAME shape, just rotated?`,
    shapes,
  };
}

// ============================================================
// 2. Pattern Completion
// "Which piece completes the pattern?"
// ============================================================
function generatePatternCompletion(difficulty: Difficulty, rand: () => number): RightBrainExerciseData {
  const size = difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 5;
  const grid: (string | null)[][] = Array.from({ length: size }, () =>
    Array(size).fill(null)
  );

  // Fill grid with a repeating pattern
  const patternElements = shuffle([...SHAPES], rand).slice(0, 3);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      grid[r][c] = patternElements[(r + c) % patternElements.length];
    }
  }

  // Remove one cell as the "missing" piece
  const missingRow = Math.floor(rand() * size);
  const missingCol = Math.floor(rand() * size);
  const correctAnswer = grid[missingRow][missingCol]!;
  grid[missingRow][missingCol] = null;

  // Generate wrong options
  const wrongOptions = shuffle(
    SHAPES.filter((s) => s !== correctAnswer),
    rand
  ).slice(0, 3);

  const options = shuffle([correctAnswer, ...wrongOptions], rand);

  return {
    type: "pattern-completion",
    prompt: "Which piece completes the pattern?",
    grid,
    missingCell: { row: missingRow, col: missingCol },
    options,
  };
}

// ============================================================
// 3. Visual Memory
// "Remember where the shapes are, then find them!"
// ============================================================
function generateVisualMemory(difficulty: Difficulty, rand: () => number): RightBrainExerciseData {
  const gridSize = difficulty === "easy" ? 4 : difficulty === "medium" ? 5 : 6;
  const numPositions = difficulty === "easy" ? 3 : difficulty === "medium" ? 5 : 7;

  // Pick random positions (no duplicates)
  const positions: { row: number; col: number }[] = [];
  const used = new Set<string>();

  while (positions.length < numPositions) {
    const r = Math.floor(rand() * gridSize);
    const c = Math.floor(rand() * gridSize);
    const key = `${r},${c}`;
    if (!used.has(key)) {
      used.add(key);
      positions.push({ row: r, col: c });
    }
  }

  return {
    type: "visual-memory",
    prompt: `Remember the ${numPositions} highlighted positions!`,
    positions,
    gridRows: gridSize,
    gridCols: gridSize,
  };
}

// ============================================================
// 4. Odd One Out
// "Which shape doesn't belong?"
// ============================================================
function generateOddOneOut(difficulty: Difficulty, rand: () => number): RightBrainExerciseData {
  const numItems = difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 8;
  const sameShape = pick(SHAPES, rand);
  const oddShape = pick(SHAPES.filter((s) => s !== sameShape), rand);

  const items = Array.from({ length: numItems }, (_, i) => ({
    value: i === numItems - 1 ? oddShape : sameShape,
    isOdd: i === numItems - 1,
  }));

  // Shuffle so odd one isn't always last
  const shuffled = shuffle(items, rand);

  return {
    type: "odd-one-out",
    prompt: "Which shape doesn't belong in this group?",
    items: shuffled,
  };
}

// ============================================================
// 5. Mirror Image
// "Which option shows the mirror image of the left half?"
// ============================================================
function generateMirrorImage(difficulty: Difficulty, rand: () => number): RightBrainExerciseData {
  const halfWidth = difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 5;
  const height = difficulty === "easy" ? 3 : 4;

  // Generate a simple pattern for the left half
  const half: string[] = [];
  for (let r = 0; r < height; r++) {
    const row = Array.from({ length: halfWidth }, () => pick(SHAPES.slice(0, 4), rand));
    half.push(row.join(" "));
  }

  // The correct mirror reverses each row
  const correctMirror = half.map((row) =>
    row.split(" ").reverse().join(" ")
  );

  // Generate wrong mirrors
  const wrongMirrors = [
    // Same as original (not mirrored)
    half,
    // Rotated
    half.map((row) => row.split(" ").reverse().join(" ")).reverse(),
    // Partially wrong
    half.map((row) => {
      const parts = row.split(" ");
      parts[0] = pick(SHAPES.slice(0, 4), rand);
      return parts.join(" ");
    }),
  ];

  const options = shuffle([correctMirror, ...wrongMirrors.slice(0, 3)], rand);

  return {
    type: "mirror-image",
    prompt: "Which option shows the mirror image of this pattern?",
    half: "left",
    original: half,
    mirrorOptions: options.map((o) => o.join("\n")),
  };
}

// ============================================================
// Main Generator
// ============================================================

const CATEGORIES: RightBrainCategory[] = [
  "spatial-rotation",
  "pattern-completion",
  "visual-memory",
  "odd-one-out",
  "mirror-image",
];

const generators: Record<RightBrainCategory, (d: Difficulty, r: () => number) => RightBrainExerciseData> = {
  "spatial-rotation": generateSpatialRotation,
  "pattern-completion": generatePatternCompletion,
  "visual-memory": generateVisualMemory,
  "odd-one-out": generateOddOneOut,
  "mirror-image": generateMirrorImage,
};

/**
 * Generate a right brain exercise.
 * If category is specified, generates that type. Otherwise random.
 */
export function generateRightBrain(
  difficulty: Difficulty,
  category?: RightBrainCategory,
  seed?: number
): RightBrainExerciseData {
  const rand = mulberry32(seed ?? Math.floor(Math.random() * 2 ** 31));
  const selectedCategory = category ?? pick(CATEGORIES, rand);
  return generators[selectedCategory](difficulty, rand);
}

/**
 * Get a human-readable label for a category.
 */
export function getCategoryLabel(category: RightBrainCategory): string {
  const labels: Record<RightBrainCategory, string> = {
    "spatial-rotation": "🧩 Spatial Rotation",
    "pattern-completion": "🔢 Pattern Completion",
    "visual-memory": "👁️ Visual Memory",
    "odd-one-out": "🔍 Odd One Out",
    "mirror-image": "🪞 Mirror Image",
  };
  return labels[category];
}
