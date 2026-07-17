"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  generateMandalaExercise,
  completeMandalaExercise,
  getMandalaExercises,
} from "../actions";
import MandalaRenderer from "@/components/games/MandalaRenderer";
import ExerciseList from "@/components/games/ExerciseList";
import type { MandalaData, Difficulty } from "@/lib/games/types";

type MandalaWithMeta = MandalaData & { flashDuration: number; sectionColors: Record<string, number>[] };

interface Exercise {
  id: string;
  difficulty: string;
  pattern: MandalaWithMeta;
  completed: boolean;
  score: number | null;
  timeSpent: number | null;
  createdAt: Date | string;
}

type GamePhase = "idle" | "flash" | "color" | "compare" | "done";

export default function MandalaGamePage() {
  const params = useParams();
  const id = params.id as string;
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      getMandalaExercises(id)
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
      const exercise = await generateMandalaExercise(id, difficulty);
      const newExercise = { ...exercise, pattern: exercise.pattern as MandalaWithMeta };
      setActiveExercise(newExercise);
      setExercises((prev) => [newExercise, ...prev]);
      setPhase("flash");
    } catch (err) {
      console.error("Failed to generate mandala:", err);
    } finally {
      setLoading(false);
    }
  };

  // Called when flash timer ends (auto or manual)
  const handleFlashDone = () => {
    setPhase("color");
  };

  // Called when child finishes coloring and clicks "Check"
  const handleColorDone = (score: number, timeSpent: number) => {
    if (!activeExercise) return;

    // Show comparison briefly, then save
    setPhase("compare");

    completeMandalaExercise(activeExercise.id, score, 0, timeSpent)
      .then((result) => {
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
        // Show result after 3 seconds of comparison
        setTimeout(() => setPhase("done"), 3000);
      })
      .catch((err) => {
        console.error("Failed to complete mandala:", err);
        setPhase("done");
      });
  };

  const handleCancel = () => {
    setActiveExercise(null);
    setPhase("idle");
  };

  // Stats
  const completedCount = exercises.filter((e) => e.completed).length;
  const avgScore = exercises.filter((e) => e.completed && e.score !== null).reduce((a, b) => a + (b.score || 0), 0) / (completedCount || 1);

  const difficultyLabel = {
    easy: "🟢 Easy (2 colors)",
    medium: "🟡 Medium (3 colors)",
    hard: "🔴 Hard (5 colors)",
  };

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
          🔮 Mandala Memory
        </h1>
        <p className="text-stone-500">
          Flash memorization — train your photographic memory!
        </p>
      </div>

      {/* How to play */}
      {phase === "idle" && (
        <div className="card p-4 mb-6 text-left">
          <h3 className="font-bold text-stone-700 mb-2">📖 How to Play</h3>
          <ol className="text-sm text-stone-500 space-y-1 list-decimal list-inside">
            <li><strong>Flash:</strong> The colored mandala appears for 1-2 seconds — study it!</li>
            <li><strong>Color:</strong> Tap a color, then tap the matching sections on the blank outline</li>
            <li><strong>Compare:</strong> See how well you matched the original pattern</li>
          </ol>
          <p className="text-xs text-stone-400 mt-2">
            💡 Tip: Focus on where each color goes — the brief flash trains photographic memory!
          </p>
        </div>
      )}

      {/* Progress Stats */}
      {exercises.length > 0 && (
        <div className="flex justify-center gap-4 mb-6 text-sm">
          <span className="pill-lavender">📋 {exercises.length} total</span>
          <span className="pill-mint">✅ {completedCount} done</span>
          <span className="pill-primary">⭐ {Math.round(avgScore)}% avg</span>
        </div>
      )}

      {/* Difficulty + Generate */}
      {phase === "idle" && (
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex gap-2">
            {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`
                  px-4 py-2 rounded-full text-sm font-semibold transition-all
                  ${difficulty === d
                    ? "bg-lavender-500 text-white shadow-clay"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }
                `}
              >
                {difficultyLabel[d]}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-lavender-400 to-lavender-500 text-white shadow-clay hover:from-lavender-500 hover:to-lavender-600 disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all"
          >
            {loading ? "⏳ Generating..." : "🎲 Start Game"}
          </button>
        </div>
      )}

      {/* Phase: Flash — colored mandala shown briefly */}
      {activeExercise && phase === "flash" && (
        <div className="card p-6 mb-8">
          <div className="text-center mb-2">
            <span className="pill bg-coral-500 text-white text-xs animate-pulse-soft px-3 py-1">
              ⚡ FLASH PHASE
            </span>
          </div>
          <MandalaRenderer
            pattern={activeExercise.pattern}
            difficulty={difficulty}
            mode="flash"
            onCancel={handleCancel}
          />
          <div className="text-center mt-4">
            <button
              onClick={handleFlashDone}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-lavender-400 to-lavender-500 text-white shadow-clay hover:from-lavender-500 hover:to-lavender-600 active:scale-95 transition-all"
            >
              ⏰ I&apos;ve Memorized It!
            </button>
          </div>
        </div>
      )}

      {/* Phase: Color — blank outline, child colors it */}
      {activeExercise && phase === "color" && (
        <div className="card p-6 mb-8">
          <div className="text-center mb-2">
            <span className="pill-lavender text-xs px-3 py-1">
              🖍️ COLORING PHASE
            </span>
          </div>
          <MandalaRenderer
            pattern={activeExercise.pattern}
            difficulty={difficulty}
            mode="color"
            onComplete={handleColorDone}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Phase: Compare — show original vs attempt */}
      {activeExercise && phase === "compare" && (
        <div className="card p-6 mb-8">
          <div className="text-center mb-2">
            <span className="pill-mint text-xs px-3 py-1">
              🔍 COMPARING...
            </span>
          </div>
          <MandalaRenderer
            pattern={activeExercise.pattern}
            difficulty={difficulty}
            mode="compare"
            disabled
          />
          <p className="text-center text-sm text-stone-500 mt-3">
            ✅ = correct &nbsp; ✗ = wrong color
          </p>
        </div>
      )}

      {/* Phase: Done */}
      {activeExercise && phase === "done" && activeExercise.score !== null && (
        <div className="card p-6 mb-8 text-center animate-bounce-in">
          <div className="text-4xl mb-3">
            {activeExercise.score >= 80 ? "🌟" : activeExercise.score >= 50 ? "💪" : "🎯"}
          </div>
          <span className="text-2xl font-extrabold text-lavender-600">
            Score: {activeExercise.score}%
          </span>
          <p className="text-sm text-stone-500 mt-2">
            {activeExercise.score >= 80
              ? "Amazing memory! You matched almost perfectly!"
              : activeExercise.score >= 50
              ? "Good recall! Practice daily to improve!"
              : "Photographic memory takes time — keep practicing!"}
          </p>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-lavender-400 to-lavender-500 text-white shadow-clay hover:from-lavender-500 hover:to-lavender-600 disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all mt-4"
          >
            🎲 Play Again
          </button>
        </div>
      )}

      {/* Past Exercises */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-stone-700 mb-3">📋 Past Mandalas</h2>
        <ExerciseList exercises={exercises} type="mandala" />
      </div>
    </div>
  );
}
