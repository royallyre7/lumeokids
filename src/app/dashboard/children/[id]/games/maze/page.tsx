"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  generateMazeExercise,
  completeMazeExercise,
  getMazeExercises,
} from "../actions";
import MazeRenderer from "@/components/games/MazeRenderer";
import ExerciseList from "@/components/games/ExerciseList";
import type { MazeData, Difficulty } from "@/lib/games/types";

interface Exercise {
  id: string;
  difficulty: string;
  maze: MazeData;
  completed: boolean;
  score: number | null;
  timeSpent: number | null;
  createdAt: Date | string;
}

export default function MazeGamePage() {
  const params = useParams();
  const id = params.id as string;
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      getMazeExercises(id)
        .then((data) => {
          setExercises(data as Exercise[]);
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    }
  }, [id, loaded]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const exercise = await generateMazeExercise(id, difficulty);
      const newExercise = { ...exercise, maze: exercise.maze as MazeData };
      setActiveExercise(newExercise);
      setExercises((prev) => [newExercise, ...prev]);
    } catch (err) {
      console.error("Failed to generate maze:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (steps: number, timeSpent: number) => {
    if (!activeExercise) return;
    try {
      const result = await completeMazeExercise(activeExercise.id, steps, timeSpent);
      setActiveExercise((prev) =>
        prev ? { ...prev, completed: true, score: result.score, timeSpent } : null
      );
      setExercises((prev) =>
        prev.map((e) =>
          e.id === activeExercise.id
            ? { ...e, completed: true, score: result.score, timeSpent }
            : e
        )
      );
    } catch (err) {
      console.error("Failed to complete maze:", err);
    }
  };

  const handleCancel = () => {
    // Remove incomplete exercise from DB
    if (activeExercise && !activeExercise.completed) {
      // Just hide it — don't persist incomplete
    }
    setActiveExercise(null);
  };

  // Stats
  const completedCount = exercises.filter((e) => e.completed).length;
  const avgScore = exercises.filter((e) => e.completed && e.score !== null).reduce((a, b) => a + (b.score || 0), 0) / (completedCount || 1);

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Link
        href={`/dashboard/children/${id}/games`}
        className="inline-flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-coral-500 transition-colors mb-6"
      >
        ← Back to Games
      </Link>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-stone-800 mb-2">
          🏁 Maze Game
        </h1>
        <p className="text-stone-500">
          Swipe, drag, or use arrow keys to navigate from 🚀 to 🎯
        </p>
      </div>

      {/* Progress Stats */}
      {exercises.length > 0 && (
        <div className="flex justify-center gap-4 mb-6 text-sm">
          <span className="pill-lavender">📋 {exercises.length} total</span>
          <span className="pill-mint">✅ {completedCount} done</span>
          <span className="pill-primary">⭐ {Math.round(avgScore)}% avg</span>
        </div>
      )}

      {/* Difficulty + Generate */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex gap-2">
          {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-all
                ${difficulty === d
                  ? "bg-coral-500 text-white shadow-clay"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }
              `}
            >
              {d === "easy" ? "🟢 Easy" : d === "medium" ? "🟡 Medium" : "🔴 Hard"}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-coral-400 to-coral-500 text-white shadow-clay hover:from-coral-500 hover:to-coral-600 disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all"
        >
          {loading ? "⏳ Generating..." : "🎲 Generate Maze"}
        </button>
      </div>

      {/* Active Exercise */}
      {activeExercise && (
        <div className="card p-6 mb-8">
          <MazeRenderer
            maze={activeExercise.maze}
            onComplete={handleComplete}
            onCancel={handleCancel}
            disabled={activeExercise.completed}
          />
          {activeExercise.completed && activeExercise.score !== null && (
            <div className="text-center mt-4 animate-bounce-in">
              <span className="text-2xl font-extrabold text-mint-600">
                Score: {activeExercise.score}%
              </span>
              <p className="text-sm text-stone-500 mt-1">
                {activeExercise.score >= 80
                  ? "Brilliant navigation! 🌟"
                  : activeExercise.score >= 50
                  ? "Good path-finding! 💪"
                  : "Keep practicing — you'll get faster! 🎯"}
              </p>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-coral-400 to-coral-500 text-white shadow-clay hover:from-coral-500 hover:to-coral-600 disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all mt-3"
              >
                🎲 New Maze
              </button>
            </div>
          )}
        </div>
      )}

      {/* Past Exercises */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-stone-700 mb-3">📋 Past Mazes</h2>
        <ExerciseList exercises={exercises} type="maze" />
      </div>
    </div>
  );
}
