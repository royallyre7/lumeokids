// ============================================================
// Generator Registry
// ============================================================
// Maps page numbers to their exercise generators.

import { generateAssociation } from "./association";
import { generateAdditionGrid } from "./additionGrid";
import { generateNumberFlow } from "./numberFlow";
import { generateShapeCode } from "./shapeCode";
import { generateVocabulary } from "./vocabulary";
import { generateShapePatterns } from "./shapePatterns";
import { generateDirectionFollow } from "./directionFollow";
import { generateBlockCounting } from "./blockCounting";
import { generateCreatureAssembly } from "./creatureAssembly";
import { generateLogicAssociation } from "./logicAssociation";
import { generateVegetableClass } from "./vegetableClass";
import { generateCreativeWriting } from "./creativeWriting";
import { generateStoryComprehension } from "./storyComprehension";
import { generateOverlapCount } from "./overlapCount";
import { generateSequenceComplete } from "./sequenceComplete";
import { generateMandalaMemory } from "./mandalaMemory";
import { mulberry32, pick } from "../utils";
import type { HomeworkPage } from "../types";

export type GeneratorFn = (seed: number) => Promise<HomeworkPage>;

// ============================================================
// Content databases for inline generators
// ============================================================
const ITEM_NAMES = ["carrot", "apple", "star", "fish", "bird", "flower", "ball", "moon"];
const MAZE_THEMES: { theme: string; emoji: string }[] = [
  { theme: "apples", emoji: "🍎" },
  { theme: "carrots", emoji: "🥕" },
  { theme: "stars", emoji: "⭐" },
  { theme: "fish", emoji: "🐟" },
];
const WORD_SETS = [
  ["cat", "car", "can", "cap"],
  ["dog", "dot", "dig", "dip"],
  ["sun", "sit", "sip", "six"],
  ["hen", "hat", "hit", "hop"],
  ["bus", "bug", "bun", "but"],
  ["pen", "pin", "pit", "pig"],
];
const GRID_PATTERNS = [
  // Simple diamond
  [{ x1: 3, y1: 1, x2: 5, y2: 3 }, { x1: 5, y1: 3, x2: 3, y2: 5 }, { x1: 3, y1: 5, x2: 1, y2: 3 }, { x1: 1, y1: 3, x2: 3, y2: 1 }],
  // Triangle
  [{ x1: 3, y1: 1, x2: 5, y2: 5 }, { x1: 5, y1: 5, x2: 1, y2: 5 }, { x1: 1, y1: 5, x2: 3, y2: 1 }],
  // Square
  [{ x1: 2, y1: 2, x2: 5, y2: 2 }, { x1: 5, y1: 2, x2: 5, y2: 5 }, { x1: 5, y1: 5, x2: 2, y2: 5 }, { x1: 2, y1: 5, x2: 2, y2: 2 }],
  // Arrow
  [{ x1: 1, y1: 3, x2: 5, y2: 3 }, { x1: 5, y1: 3, x2: 4, y2: 2 }, { x1: 5, y1: 3, x2: 4, y2: 4 }],
];
const MEMORY_EMOJIS = ["🍎", "⭐", "🐟", "🌸", "🚗", "🐦", "🌙", "🎵", "🎈", "🐱"];

/**
 * Page-to-generator mapping.
 * Key: page number (1-based), Value: async generator function.
 */
export const PAGE_GENERATORS: Record<number, GeneratorFn> = {
  1: async (seed) => generateAssociation(seed),

  // Page 2: Equal Division
  2: async (seed) => {
    const rand = mulberry32(seed);
    const itemName = pick(ITEM_NAMES, rand);
    const groups = 4;
    const totalItems = groups * (2 + Math.floor(rand() * 3)); // 8, 12, or 16
    return {
      pageNumber: 2,
      domain: "maths-ability",
      instruction: `Study the box below carefully. Draw lines to divide the box into ${groups} equal shapes, each containing the same number of ${itemName}s.`,
      data: { type: "equal-division", totalItems, groups, itemName },
    };
  },

  3: async (seed) => generateDirectionFollow(seed, "diamond", "birds"),
  4: async (seed) => generateDirectionFollow(seed, "grid", "apples"),
  5: async (seed) => generateAdditionGrid(seed),
  6: async (seed) => generateShapeCode(seed, "circles"),
  7: async (seed) => generateShapeCode(seed, "squares"),
  8: async (seed) => generateNumberFlow(seed, 3, 9),
  9: async (seed) => generateNumberFlow(seed, 3, 9),
  10: async (seed) => generateNumberFlow(seed, 4, 16),
  11: async (seed) => generateBlockCounting(seed, "add"),
  12: async (seed) => generateBlockCounting(seed, "subtract"),

  // Pages 13-14: Curved Maze
  13: async (seed) => {
    const rand = mulberry32(seed);
    const themeData = pick(MAZE_THEMES, rand);
    const itemsInside = 3 + Math.floor(rand() * 5); // 3-7
    const itemsOutside = 3 + Math.floor(rand() * 5); // 3-7
    return {
      pageNumber: 13,
      domain: "sensory-reasoning",
      instruction: `Write down the number of ${themeData.theme} the boy can take as he walks outside the maze.`,
      data: {
        type: "curved-maze",
        theme: themeData.theme,
        itemsInside,
        itemsOutside,
        totalItems: itemsInside + itemsOutside,
      },
    };
  },
  14: async (seed) => {
    const rand = mulberry32(seed);
    const themeData = pick(MAZE_THEMES, rand);
    const itemsInside = 4 + Math.floor(rand() * 5); // 4-8
    const itemsOutside = 2 + Math.floor(rand() * 4); // 2-5
    return {
      pageNumber: 14,
      domain: "sensory-reasoning",
      instruction: `Write down the number of ${themeData.theme} the rabbit can take as it walks inside the maze.`,
      data: {
        type: "curved-maze",
        theme: themeData.theme,
        itemsInside,
        itemsOutside,
        totalItems: itemsInside + itemsOutside,
      },
    };
  },

  15: async (seed) => generateVocabulary(seed),
  16: async (seed) => generateShapePatterns(seed),

  // Page 17: Word Grids
  17: async (seed) => {
    const rand = mulberry32(seed);
    const words = pick(WORD_SETS, rand);
    const grid = words.map((w) => w.split(""));
    return {
      pageNumber: 17,
      domain: "language-stimulation",
      instruction: "Fill in the first letter of each word in the boxes. Note that the letters are the same for each group of words.",
      data: { type: "word-grids", words, grid },
    };
  },

  // Pages 18-19: Shape Decompose
  18: async (seed) => ({
    pageNumber: 18,
    domain: "sensory-reasoning",
    instruction: "Study the pieces on the left. Try to cut the shapes on the right into its respective pieces by drawing in lines as shown in the example.",
    data: { type: "shape-decompose", shapes: [] },
  }),
  19: async (seed) => ({
    pageNumber: 19,
    domain: "sensory-reasoning",
    instruction: "Study the pieces on the left. Try to cut the shapes on the right into its respective pieces by drawing in lines as shown in the example.",
    data: { type: "shape-decompose", shapes: [] },
  }),

  20: async (seed) => generateCreatureAssembly(seed, "cat"),
  21: async (seed) => generateCreatureAssembly(seed, "rabbit"),

  // Pages 22-23: Dot Grid
  22: async (seed) => {
    const rand = mulberry32(seed);
    const gridSize = 8;
    const patternIdx = Math.floor(rand() * GRID_PATTERNS.length);
    return {
      pageNumber: 22,
      domain: "intuitive-memory",
      instruction: "Study the picture on the left and draw an exact same one on the right.",
      data: { type: "dot-grid", gridSize, lines: GRID_PATTERNS[patternIdx] },
    };
  },
  23: async (seed) => {
    const rand = mulberry32(seed);
    const gridSize = 10;
    const patternIdx = Math.floor(rand() * GRID_PATTERNS.length);
    return {
      pageNumber: 23,
      domain: "intuitive-memory",
      instruction: "Study the picture on the left and draw an exact same one on the right.",
      data: { type: "dot-grid", gridSize, lines: GRID_PATTERNS[patternIdx] },
    };
  },

  24: async (seed) => generateLogicAssociation(seed),

  // Page 25: Logic Association (inline)
  25: async (seed) => ({
    pageNumber: 25,
    domain: "critical-thinking",
    instruction: "Study and complete the exercise.",
    data: { type: "logic-association", examples: [], questions: [] },
  }),

  26: async (seed) => generateVegetableClass(seed, 1),
  27: async (seed) => generateVegetableClass(seed, 2),
  28: async (seed) => generateCreativeWriting(seed),
  29: async (seed) => generateDirectionFollow(seed, "triangle", "ladybugs"),
  30: async (seed) => generateDirectionFollow(seed, "grid", "cakes"),
  31: async (seed) => generateShapeCode(seed, "hearts"),
  32: async (seed) => generateShapeCode(seed, "triangles"),
  33: async (seed) => generateStoryComprehension(seed, 0),
  34: async (seed) => generateStoryComprehension(seed, 1),

  // Page 35: Memory Grid
  35: async (seed) => {
    const rand = mulberry32(seed);
    const gridSize = 4;
    const numItems = 4 + Math.floor(rand() * 3); // 4-6 items
    const usedPositions = new Set<string>();
    const items: { row: number; col: number; item: string }[] = [];

    for (let i = 0; i < numItems; i++) {
      let row: number, col: number, posKey: string;
      do {
        row = Math.floor(rand() * gridSize);
        col = Math.floor(rand() * gridSize);
        posKey = `${row},${col}`;
      } while (usedPositions.has(posKey));
      usedPositions.add(posKey);
      items.push({ row, col, item: MEMORY_EMOJIS[i % MEMORY_EMOJIS.length] });
    }

    return {
      pageNumber: 35,
      domain: "intuitive-memory",
      instruction: "Show each picture separately to your child for 20 seconds. Then, have your child draw out circles to represent the objects at their respective locations on the empty spaces without referring to the answer.",
      data: { type: "memory-grid", gridSize, items, viewTime: 20 },
    };
  },

  36: async (seed) => generateOverlapCount(seed, "triangles"),
  37: async (seed) => generateOverlapCount(seed, "circles"),
  38: async (seed) => generateNumberFlow(seed, 5, 25),
  39: async (seed) => generateNumberFlow(seed, 6, 36),
  40: async (seed) => generateSequenceComplete(seed),
  41: async (seed) => generateMandalaMemory(seed, "colored"),
  42: async (seed) => generateMandalaMemory(seed, "blank"),
};
