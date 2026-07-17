// ============================================================
// Maze Generator — Recursive Backtracking Algorithm
// ============================================================
// Generates perfect mazes (exactly one path between any two points).
// All mazes are solvable by construction.

import type { MazeData, MazeCell, Difficulty } from "./types";

// Seeded PRNG (Mulberry32) for reproducible mazes
function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Directions: [row offset, col offset]
const DIRS: [number, number][] = [
  [-1, 0], // up
  [1, 0],  // down
  [0, -1], // left
  [0, 1],  // right
];

/**
 * Generate a maze using Recursive Backtracking (DFS).
 * Grid is (2*rows+1) x (2*cols+1) where odd indices are cells, even are walls.
 */
function generateGrid(rows: number, cols: number, rand: () => number): MazeCell[][] {
  const height = 2 * rows + 1;
  const width = 2 * cols + 1;

  // Initialize all walls
  const grid: MazeCell[][] = Array.from({ length: height }, () =>
    Array(width).fill(0) as MazeCell[]
  );

  // Track visited cells (in original row/col space)
  const visited = new Set<string>();

  // Carve maze using DFS
  function carve(r: number, c: number) {
    visited.add(`${r},${c}`);

    // Mark cell as path
    grid[2 * r + 1][2 * c + 1] = 1;

    // Shuffle directions
    const dirs = shuffle(DIRS, rand);

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited.has(`${nr},${nc}`)) {
        // Carve wall between current and next
        grid[2 * r + 1 + dr][2 * c + 1 + dc] = 1;
        carve(nr, nc);
      }
    }
  }

  // Start carving from top-left
  carve(0, 0);

  return grid;
}

/**
 * Find a path through the maze using BFS (for score calculation).
 */
function solveMaze(grid: MazeCell[][], start: { row: number; col: number }, end: { row: number; col: number }): number {
  const height = grid.length;
  const width = grid[0].length;
  const visited = new Set<string>();
  const queue: { row: number; col: number; dist: number }[] = [{ ...start, dist: 0 }];
  visited.add(`${start.row},${start.col}`);

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current.row === end.row && current.col === end.col) {
      return current.dist;
    }

    for (const [dr, dc] of DIRS) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      const key = `${nr},${nc}`;

      if (
        nr >= 0 && nr < height &&
        nc >= 0 && nc < width &&
        grid[nr][nc] === 1 &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push({ row: nr, col: nc, dist: current.dist + 1 });
      }
    }
  }

  return -1; // No path (shouldn't happen with perfect maze)
}

/**
 * Generate a complete maze exercise.
 */
export function generateMaze(difficulty: Difficulty, seed?: number): MazeData {
  const config = {
    easy: { rows: 10, cols: 10 },
    medium: { rows: 18, cols: 18 },
    hard: { rows: 25, cols: 25 },
  };

  const { rows, cols } = config[difficulty];
  const rand = mulberry32(seed ?? Math.floor(Math.random() * 2 ** 31));
  const grid = generateGrid(rows, cols, rand);

  // Start = top-left cell, End = bottom-right cell
  const start = { row: 1, col: 1 };
  const end = { row: 2 * rows - 1, col: 2 * cols - 1 };

  // Verify solvability
  const pathLength = solveMaze(grid, start, end);
  if (pathLength === -1) {
    // Should never happen, but regenerate if it does
    return generateMaze(difficulty, (seed ?? Math.floor(Math.random() * 2 ** 31)) + 1);
  }

  return { rows, cols, grid, start, end };
}

/**
 * Calculate score based on path efficiency.
 * Perfect score = solved in optimal path length.
 */
export function scoreMaze(maze: MazeData, steps: number): number {
  const optimal = solveMaze(maze.grid, maze.start, maze.end);
  if (optimal === -1) return 0;

  // Score: 100 for perfect, decreases with extra steps
  const ratio = optimal / Math.max(steps, optimal);
  return Math.round(Math.min(100, ratio * 100));
}
