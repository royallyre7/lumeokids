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
import type { HomeworkPage } from "../types";

export type GeneratorFn = (seed: number) => Promise<HomeworkPage>;

/**
 * Page-to-generator mapping.
 * Key: page number (1-based), Value: async generator function.
 */
export const PAGE_GENERATORS: Record<number, GeneratorFn> = {
  1: async (seed) => generateAssociation(seed),
  2: async (seed) => ({
    pageNumber: 2,
    domain: "maths-ability",
    instruction: "Study the 2 boxes below carefully. Draw lines to divide the box into 4 equal shapes.",
    data: { type: "equal-division", totalItems: 8, groups: 4, itemName: "carrot" },
  }),
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
  13: async (seed) => ({
    pageNumber: 13,
    domain: "sensory-reasoning",
    instruction: "Write down the number of apples the boy can take as he walks outside the maze.",
    data: { type: "curved-maze", theme: "apples", itemsInside: 5, itemsOutside: 8, totalItems: 13 },
  }),
  14: async (seed) => ({
    pageNumber: 14,
    domain: "sensory-reasoning",
    instruction: "Write down the number of carrots the rabbit can take as it walks inside the maze.",
    data: { type: "curved-maze", theme: "carrots", itemsInside: 7, itemsOutside: 4, totalItems: 11 },
  }),
  15: async (seed) => generateVocabulary(seed),
  16: async (seed) => generateShapePatterns(seed),
  17: async (seed) => ({
    pageNumber: 17,
    domain: "language-stimulation",
    instruction: "Fill in the first letter of each word in the boxes. Note that the letters are the same for each group of words.",
    data: { type: "word-grids", words: ["cat", "car", "can", "cap"], grid: [["c","a","t"],["c","a","r"],["c","a","n"],["c","a","p"]] },
  }),
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
  22: async (seed) => ({
    pageNumber: 22,
    domain: "intuitive-memory",
    instruction: "Study the picture on the left and draw an exact same one on the right.",
    data: { type: "dot-grid", gridSize: 8, lines: [] },
  }),
  23: async (seed) => ({
    pageNumber: 23,
    domain: "intuitive-memory",
    instruction: "Study the picture on the left and draw an exact same one on the right.",
    data: { type: "dot-grid", gridSize: 10, lines: [] },
  }),
  24: async (seed) => generateLogicAssociation(seed),
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
  35: async (seed) => ({
    pageNumber: 35,
    domain: "intuitive-memory",
    instruction: "Show each picture separately to your child for 20 seconds. Then, have your child draw out circles to represent the objects at their respective locations on the empty spaces without referring to the answer.",
    data: { type: "memory-grid", gridSize: 4, items: [], viewTime: 20 },
  }),
  36: async (seed) => generateOverlapCount(seed, "triangles"),
  37: async (seed) => generateOverlapCount(seed, "circles"),
  38: async (seed) => generateNumberFlow(seed, 5, 25),
  39: async (seed) => generateNumberFlow(seed, 6, 36),
  40: async (seed) => generateSequenceComplete(seed),
  41: async (seed) => generateMandalaMemory(seed, "colored"),
  42: async (seed) => generateMandalaMemory(seed, "blank"),
};
