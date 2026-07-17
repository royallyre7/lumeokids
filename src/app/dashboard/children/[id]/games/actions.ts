"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { generateMaze, scoreMaze } from "@/lib/games/maze";
import { generateMandala } from "@/lib/games/mandala";
import { generateRightBrain } from "@/lib/games/rightBrain";
import type { Difficulty } from "@/lib/games/types";

// ============================================================
// Auth + Ownership Check (shared)
// ============================================================
async function verifyChildOwnership(childId: string) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id: string })?.id;
  if (!userId) throw new Error("Unauthorized");

  const child = await prisma.child.findUnique({ where: { id: childId } });
  if (!child) throw new Error("Not found");
  if (child.parentId !== userId) throw new Error("Forbidden");

  return child;
}

// ============================================================
// Maze Actions
// ============================================================
export async function generateMazeExercise(childId: string, difficulty: Difficulty) {
  await verifyChildOwnership(childId);

  const maze = generateMaze(difficulty);
  const exercise = await prisma.mazeExercise.create({
    data: {
      childId,
      difficulty,
      maze: JSON.stringify(maze),
    },
  });

  revalidatePath(`/dashboard/children/${childId}/games/maze`);
  return { ...exercise, maze };
}

export async function completeMazeExercise(
  exerciseId: string,
  steps: number,
  timeSpent: number
) {
  const exercise = await prisma.mazeExercise.findUnique({
    where: { id: exerciseId },
  });
  if (!exercise) throw new Error("Exercise not found");

  await verifyChildOwnership(exercise.childId);

  const maze = JSON.parse(exercise.maze);
  const score = scoreMaze(maze, steps);

  const updated = await prisma.mazeExercise.update({
    where: { id: exerciseId },
    data: {
      completed: true,
      score,
      steps,
      timeSpent,
    },
  });

  revalidatePath(`/dashboard/children/${exercise.childId}/games/maze`);
  return { ...updated, score };
}

// ============================================================
// Mandala Actions
// ============================================================
export async function generateMandalaExercise(childId: string, difficulty: Difficulty) {
  await verifyChildOwnership(childId);

  const pattern = generateMandala(difficulty);
  const exercise = await prisma.mandalaExercise.create({
    data: {
      childId,
      difficulty,
      pattern: JSON.stringify(pattern),
    },
  });

  revalidatePath(`/dashboard/children/${childId}/games/mandala`);
  return { ...exercise, pattern };
}

export async function completeMandalaExercise(
  exerciseId: string,
  score: number,
  _totalColors: number, // kept for API compat
  timeSpent: number
) {
  const exercise = await prisma.mandalaExercise.findUnique({
    where: { id: exerciseId },
  });
  if (!exercise) throw new Error("Exercise not found");

  await verifyChildOwnership(exercise.childId);

  const updated = await prisma.mandalaExercise.update({
    where: { id: exerciseId },
    data: {
      completed: true,
      score,
      timeSpent,
    },
  });

  revalidatePath(`/dashboard/children/${exercise.childId}/games/mandala`);
  return { ...updated, score };
}

// ============================================================
// Right Brain Actions
// ============================================================
export async function generateRightBrainExercise(
  childId: string,
  difficulty: Difficulty,
  category?: string
) {
  await verifyChildOwnership(childId);

  const data = generateRightBrain(
    difficulty,
    category as any
  );
  const exercise = await prisma.rightBrainExercise.create({
    data: {
      childId,
      category: data.type,
      difficulty,
      data: JSON.stringify(data),
    },
  });

  revalidatePath(`/dashboard/children/${childId}/games/right-brain`);
  return { ...exercise, data };
}

export async function completeRightBrainExercise(
  exerciseId: string,
  score: number,
  timeSpent: number
) {
  const exercise = await prisma.rightBrainExercise.findUnique({
    where: { id: exerciseId },
  });
  if (!exercise) throw new Error("Exercise not found");

  await verifyChildOwnership(exercise.childId);

  const updated = await prisma.rightBrainExercise.update({
    where: { id: exerciseId },
    data: {
      completed: true,
      score,
      timeSpent,
    },
  });

  revalidatePath(`/dashboard/children/${exercise.childId}/games/right-brain`);
  return { ...updated, score };
}

// ============================================================
// Fetch Actions (for pages)
// ============================================================
export async function getMazeExercises(childId: string) {
  await verifyChildOwnership(childId);

  const exercises = await prisma.mazeExercise.findMany({
    where: { childId },
    orderBy: { createdAt: "desc" },
  });

  return exercises.map((e) => ({
    ...e,
    maze: JSON.parse(e.maze),
  }));
}

export async function getMandalaExercises(childId: string) {
  await verifyChildOwnership(childId);

  const exercises = await prisma.mandalaExercise.findMany({
    where: { childId },
    orderBy: { createdAt: "desc" },
  });

  return exercises.map((e) => ({
    ...e,
    pattern: JSON.parse(e.pattern),
  }));
}

export async function getRightBrainExercises(childId: string) {
  await verifyChildOwnership(childId);

  const exercises = await prisma.rightBrainExercise.findMany({
    where: { childId },
    orderBy: { createdAt: "desc" },
  });

  return exercises.map((e) => ({
    ...e,
    data: JSON.parse(e.data),
  }));
}
