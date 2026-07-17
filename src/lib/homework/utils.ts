// ============================================================
// Homework Generator Utilities
// ============================================================
// Shared PRNG, shuffle, pick, and helper functions.

/**
 * Mulberry32 — seeded PRNG for reproducible random generation.
 * Returns a function that produces floats in [0, 1).
 */
export function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher-Yates shuffle using seeded PRNG. */
export function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick a random element from an array. */
export function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

/** Pick N unique random elements from an array. */
export function pickN<T>(arr: T[], n: number, rand: () => number): T[] {
  return shuffle(arr, rand).slice(0, Math.min(n, arr.length));
}

/** Random integer between min and max (inclusive). */
export function randInt(min: number, max: number, rand: () => number): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}

/** Random float between min and max. */
export function randRange(min: number, max: number, rand: () => number): number {
  return min + rand() * (max - min);
}

/** Create a 2D array filled with a default value. */
export function create2DArray<T>(rows: number, cols: number, defaultValue: T): T[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
}

/** Shuffle array in place (Fisher-Yates). */
export function shuffleInPlace<T>(arr: T[], rand: () => number): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/** Generate a random seed from current time. */
export function generateSeed(): number {
  return Date.now() ^ (Math.random() * 0xffffffff);
}

// ============================================================
// Content Databases
// ============================================================

/** Association pairs — items that go together. */
export const ASSOCIATION_PAIRS = [
  { item: "sail", match: "wind" },
  { item: "monkey", match: "banana" },
  { item: "fish", match: "water" },
  { item: "bird", match: "nest" },
  { item: "flower", match: "bee" },
  { item: "sun", match: "light" },
  { item: "moon", match: "stars" },
  { item: "rain", match: "umbrella" },
  { item: "snow", match: "cold" },
  { item: "fire", match: "warmth" },
  { item: "key", match: "lock" },
  { item: "pen", match: "paper" },
  { item: "cup", match: "tea" },
  { item: "book", match: "page" },
  { item: "shoe", match: "sock" },
  { item: "hat", match: "head" },
  { item: "glove", match: "hand" },
  { item: "watch", match: "wrist" },
  { item: "comb", match: "hair" },
  { item: "toothbrush", match: "teeth" },
  { item: "fork", match: "food" },
  { item: "broom", match: "floor" },
  { item: "hammer", match: "nail" },
  { item: "scissors", match: "paper" },
  { item: "needle", match: "thread" },
];

/** Vocabulary items — things children should name. */
export const VOCABULARY_ITEMS = [
  "sheep", "rainbow", "car", "island", "radio", "whale",
  "castle", "bridge", "rocket", "guitar", "elephant", "penguin",
  "bicycle", "airplane", "lighthouse", "submarine", "helicopter", "train",
  "dinosaur", "butterfly", "kangaroo", "octopus", "penguin", "turtle",
  "telescope", "compass", "lantern", "umbrella", "backpack", "sandwich",
];

/** Animal body parts for creature assembly. */
export const CREATURE_PARTS = {
  animals: ["cat", "rabbit", "fish", "bird", "horse", "cow", "pig", "duck", "frog", "bear"],
  parts: ["ear", "face", "body", "leg", "tail", "eye", "wing", "fin", "horn", "nose"],
  bodyParts: ["Ear", "Face", "Body", "Leg", "Tail"],
};

/** Vegetable database for classification. */
export const VEGETABLES = [
  { name: "carrot", category: "root" as const },
  { name: "potato", category: "root" as const },
  { name: "onion", category: "root" as const },
  { name: "yam", category: "root" as const },
  { name: "broccoli", category: "flower-fruit" as const },
  { name: "cauliflower", category: "flower-fruit" as const },
  { name: "pumpkin", category: "flower-fruit" as const },
  { name: "capsicum", category: "flower-fruit" as const },
  { name: "cabbage", category: "leaves" as const },
  { name: "lettuce", category: "leaves" as const },
  { name: "spinach", category: "leaves" as const },
  { name: "celery", category: "leaves" as const },
  { name: "asparagus", category: "flower-fruit" as const },
  { name: "pea", category: "flower-fruit" as const },
  { name: "chilli", category: "flower-fruit" as const },
  { name: "cucumber", category: "flower-fruit" as const },
  { name: "bamboo", category: "leaves" as const },
  { name: "parsley", category: "leaves" as const },
];

/** Story templates for creative writing. */
export const STORY_ITEMS = [
  ["elephant", "milk", "dictionary", "dolphin", "gymnastics equipment"],
  ["rocket", "pencil", "tree", "butterfly", "umbrella"],
  ["castle", "fish", "book", "sun", "shoe"],
  ["penguin", "cake", "bicycle", "moon", "painting"],
  ["cat", "rainbow", "bridge", "apple", "guitar"],
  ["robot", "flower", "ocean", "hat", "star"],
  ["dragon", "milk", "window", "river", "hammer"],
  ["alien", "pizza", "cloud", "bicycle", "diamond"],
];

/** Comprehension stories for reading exercises. */
export const COMPREHENSION_STORIES = [
  {
    story: "Bob is a very good child. He came home at 3.30pm after playing in the park. As he is hungry, his mother made him a pudding with a cherry on top of it. After eating, Bob thanked his mother and washed his plate.",
    questions: [
      { question: "What time did Bob come home?", options: ["3:00pm", "3:30pm", "4:00pm", "4:30pm"], answer: "3:30pm" },
      { question: "Where did Bob play?", options: ["School", "Park", "Home", "Shop"], answer: "Park" },
      { question: "What did Bob's mother make for him?", options: ["Sandwich", "Pudding", "Rice", "Noodles"], answer: "Pudding" },
    ],
  },
  {
    story: "Kelly got up from bed at 7am. After washing up, she had bread, sunny-side-up egg and strawberry for breakfast. She drank some milk too. Then, she prepared herself for school by slinging her bag over her shoulders and putting on a yellow hat. She carried her shoes and went to school with Mummy holding her hands.",
    questions: [
      { question: "What time did Kelly get up?", options: ["6:30am", "7:00am", "7:30am", "8:00am"], answer: "7:00am" },
      { question: "What did Kelly have for breakfast?", options: ["Rice and fish", "Bread, egg and strawberry", "Cereal and milk", "Pancakes"], answer: "Bread, egg and strawberry" },
      { question: "What color was Kelly's hat?", options: ["Red", "Blue", "Yellow", "Green"], answer: "Yellow" },
    ],
  },
  {
    story: "Tom found a small turtle in the garden. He picked it up gently and put it in a box with some leaves. The next day, Tom released the turtle near the pond where it could find food and live happily.",
    questions: [
      { question: "Where did Tom find the turtle?", options: ["Beach", "Garden", "Park", "Forest"], answer: "Garden" },
      { question: "What did Tom put in the box?", options: ["Water", "Food", "Leaves", "Stones"], answer: "Leaves" },
      { question: "Where did Tom release the turtle?", options: ["River", "Pond", "Sea", "Lake"], answer: "Pond" },
    ],
  },
];

/** Shape names for code exercises. */
export const SHAPES = ["circle", "square", "triangle", "diamond", "star", "heart", "hexagon", "pentagon"];
export const SHAPE_SYMBOLS: Record<string, string> = {
  circle: "○", square: "□", triangle: "△", diamond: "◇",
  star: "★", heart: "♥", hexagon: "⬡", pentagon: "⬠",
};

/** Number sequences for sequence completion. */
export const NUMBER_SEQUENCES = [
  { items: [3, 1, 5, null, 2, 9, 9, 2, 6, 5, null, 3], rule: "mirror pattern", answer: 7 },
  { items: [1, null, 2, 5, 3, 4, 4, 3, null, 2, 6, 1], rule: "palindrome", answer: 3 },
  { items: [4, 2, null, 2, 4, 2, 0, null, 4, 2, 0, 2, 4], rule: "countdown repeat", answer: 2 },
  { items: [1, 2, 3, 4, null, 2, 1, 2, 3, null, 3, 2, 1], rule: "ascending-descending", answer: 5 },
  { items: [11, 8, 5, 2, null, 8, 11, null, 5, 2, 5, 8, 11], rule: "reverse repeat", answer: 5 },
];

/** Logic association patterns. */
export const LOGIC_PATTERNS = [
  {
    item: "Radio",
    related: ["Mouth", "Ear", "Nose", "Legs"],
    rule: "things associated with the object",
  },
  {
    item: "Cup",
    related: ["Scoop", "Fork", "Knife", "Spoon"],
    rule: "things used with the object",
  },
  {
    item: "Bird",
    related: ["Airplane", "Train", "Car", "Police"],
    rule: "things that move/fly",
  },
  {
    item: "Notebook",
    related: ["Pencil Case", "Pencil", "Scissors", "Desk"],
    rule: "things found in school",
  },
];
