"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  generateRightBrainExercise,
  completeRightBrainExercise,
  getRightBrainExercises,
} from "../actions";
import dynamic from "next/dynamic";
import ExerciseList from "@/components/games/ExerciseList";

const RightBrainCard = dynamic(() => import("@/components/games/RightBrainCard"), {
  ssr: false,
  loading: () => <div className="card p-6 text-center animate-pulse-soft">Loading exercise...</div>,
});
import type { RightBrainExerciseData, RightBrainCategory, Difficulty } from "@/lib/games/types";

interface Exercise {
  id: string;
  category: string;
  difficulty: string;
  data: RightBrainExerciseData;
  completed: boolean;
  score: number | null;
  timeSpent: number | null;
  createdAt: Date | string;
}

const CATEGORIES: { value: RightBrainCategory | "random"; label: string }[] = [
  { value: "random", label: "🎲 Random" },
  { value: "spatial-rotation", label: "🧩 Spatial Rotation" },
  { value: "pattern-completion", label: "🔢 Pattern Completion" },
  { value: "visual-memory", label: "👁️ Visual Memory" },
  { value: "odd-one-out", label: "🔍 Odd One Out" },
  { value: "mirror-image", label: "🪞 Mirror Image" },
];

export default function RightBrainPage() {
  const params = useParams();
  const id = params.id as string;
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [category, setCategory] = useState<RightBrainCategory | "random">("random");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      getRightBrainExercises(id)
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
      const exercise = await generateRightBrainExercise(
        id,
        difficulty,
        category === "random" ? undefined : category
      );
      const newExercise = { ...exercise, data: exercise.data as RightBrainExerciseData };
      setActiveExercise(newExercise);
      setExercises((prev) => [newExercise, ...prev]);
    } catch (err) {
      console.error("Failed to generate exercise:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (score: number, timeSpent: number) => {
    if (!activeExercise) return;
    try {
      const result = await completeRightBrainExercise(
        activeExercise.id,
        score,
        timeSpent
      );
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
      console.error("Failed to complete exercise:", err);
    }
  };

  const handleCancel = () => {
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
          🧠 Right Brain Training
        </h1>
        <p className="text-stone-500">
          Boost spatial reasoning, pattern recognition, and creative thinking!
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

      {/* Difficulty + Category + Generate */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="flex gap-2">
          {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-all
                ${difficulty === d
                  ? "bg-mint-500 text-white shadow-clay"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }
              `}
            >
              {d === "easy" ? "🟢 Easy" : d === "medium" ? "🟡 Medium" : "🔴 Hard"}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-semibold transition-all
                ${category === cat.value
                  ? "bg-mint-500 text-white shadow-clay"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-mint-400 to-mint-500 text-white shadow-clay hover:from-mint-500 hover:to-mint-600 disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all"
        >
          {loading ? "⏳ Generating..." : "🎲 Generate Exercise"}
        </button>
      </div>

      {/* Active Exercise */}
      {activeExercise && (
        <div className="card p-6 mb-8">
          {/* Cancel button */}
          {!activeExercise.completed && (
            <div className="flex justify-end mb-2">
              <button
                onClick={handleCancel}
                className="pill bg-stone-200 text-stone-600 hover:bg-coral-200 hover:text-coral-700 px-3 py-1 cursor-pointer transition-colors text-xs"
              >
                ✕ Quit
              </button>
            </div>
          )}

          <RightBrainCard
            exercise={activeExercise.data}
            onComplete={handleComplete}
            disabled={activeExercise.completed}
          />

          {activeExercise.completed && activeExercise.score !== null && (
            <div className="text-center mt-4 animate-bounce-in">
              <span className="text-2xl font-extrabold text-mint-600">
                Score: {activeExercise.score}%
              </span>
              <p className="text-sm text-stone-500 mt-1">
                {activeExercise.score >= 80
                  ? "Sharp thinking! 🌟"
                  : activeExercise.score >= 50
                  ? "Good try! Keep training! 💪"
                  : "Practice makes perfect! 🎯"}
              </p>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-mint-400 to-mint-500 text-white shadow-clay hover:from-mint-500 hover:to-mint-600 disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all mt-3"
              >
                🎲 Next Exercise
              </button>
            </div>
          )}
        </div>
      )}

      {/* Past Exercises */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-stone-700 mb-3">📋 Past Exercises</h2>
        <ExerciseList exercises={exercises} type="right-brain" />
      </div>
    </div>
  );
}
