"use client";

import { useState, useEffect, useRef } from "react";
import type { RightBrainExerciseData } from "@/lib/games/types";
import { getCategoryLabel } from "@/lib/games/rightBrain";

interface RightBrainCardProps {
  exercise: RightBrainExerciseData;
  onComplete?: (score: number, timeSpent: number) => void;
  disabled?: boolean;
}

export default function RightBrainCard({ exercise, onComplete, disabled }: RightBrainCardProps) {
  const [selected, setSelected] = useState<string | number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [startTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime]);

  const handleSubmit = () => {
    if (selected === null || submitted) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const finalTime = Math.floor((Date.now() - startTime) / 1000);

    let isCorrect = false;

    switch (exercise.type) {
      case "spatial-rotation":
        isCorrect = exercise.shapes?.[Number(selected)]?.isCorrect ?? false;
        break;
      case "pattern-completion":
        isCorrect = selected === exercise.options?.[0]; // First option is correct (shuffled but stored)
        break;
      case "odd-one-out":
        isCorrect = exercise.items?.[Number(selected)]?.isOdd ?? false;
        break;
      case "mirror-image":
        // Compare selected mirror to correct answer
        const correctMirror = exercise.original?.map((row) =>
          row.split(" ").reverse().join(" ")
        ).join("\n");
        isCorrect = selected === correctMirror;
        break;
      default:
        break;
    }

    setSubmitted(true);
    const score = isCorrect ? 100 : 0;
    onComplete?.(score, finalTime);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-lavender-600">
          {getCategoryLabel(exercise.type)}
        </span>
        <span className="pill-coral px-3 py-1 text-sm font-semibold">
          ⏱️ {currentTime}s
        </span>
      </div>

      {/* Prompt */}
      <p className="text-stone-700 font-medium whitespace-pre-line">
        {exercise.prompt}
      </p>

      {/* Exercise-specific content */}
      {exercise.type === "spatial-rotation" && exercise.shapes && (
        <div className="flex flex-wrap gap-3 justify-center">
          {exercise.shapes.map((shape, i) => (
            <button
              key={i}
              onClick={() => !submitted && setSelected(i)}
              disabled={disabled || submitted}
              className={`
                w-20 h-20 rounded-xl border-[3px] flex items-center justify-center text-3xl
                transition-all duration-200
                ${selected === i
                  ? "border-lavender-500 bg-lavender-50 scale-110"
                  : "border-stone-200 hover:border-stone-300"
                }
                ${submitted && shape.isCorrect ? "border-mint-500 bg-mint-50" : ""}
                ${submitted && selected === i && !shape.isCorrect ? "border-coral-500 bg-coral-50" : ""}
              `}
            >
              <span style={{ transform: `rotate(${shape.rotation}deg)` }}>
                🔷
              </span>
            </button>
          ))}
        </div>
      )}

      {exercise.type === "pattern-completion" && exercise.grid && (
        <div className="flex flex-col items-center gap-3">
          <div
            className="inline-grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${exercise.grid[0].length}, 48px)`,
            }}
          >
            {exercise.grid.map((row, r) =>
              row.map((cell, c) => {
                const isMissing = cell === null;
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`
                      w-12 h-12 rounded-lg flex items-center justify-center text-xl
                      ${isMissing ? "border-2 border-dashed border-lavender-400 bg-lavender-50" : "bg-stone-100"}
                    `}
                  >
                    {cell ?? "?"}
                  </div>
                );
              })
            )}
          </div>

          {exercise.options && (
            <div className="flex gap-2 flex-wrap justify-center">
              {exercise.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => !submitted && setSelected(opt)}
                  disabled={disabled || submitted}
                  className={`
                    w-14 h-14 rounded-xl border-[3px] flex items-center justify-center text-2xl
                    transition-all duration-200
                    ${selected === opt
                      ? "border-lavender-500 bg-lavender-50 scale-110"
                      : "border-stone-200 hover:border-stone-300"
                    }
                  `}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {exercise.type === "visual-memory" && (
        <div className="text-center text-stone-500 text-sm">
          👁️ Memorize the positions, then find them!
        </div>
      )}

      {exercise.type === "odd-one-out" && exercise.items && (
        <div className="flex flex-wrap gap-3 justify-center">
          {exercise.items.map((item, i) => (
            <button
              key={i}
              onClick={() => !submitted && setSelected(i)}
              disabled={disabled || submitted}
              className={`
                w-16 h-16 rounded-xl border-[3px] flex items-center justify-center text-2xl
                transition-all duration-200
                ${selected === i
                  ? "border-lavender-500 bg-lavender-50 scale-110"
                  : "border-stone-200 hover:border-stone-300"
                }
                ${submitted && item.isOdd ? "border-mint-500 bg-mint-50" : ""}
                ${submitted && selected === i && !item.isOdd ? "border-coral-500 bg-coral-50" : ""}
              `}
            >
              {item.value}
            </button>
          ))}
        </div>
      )}

      {exercise.type === "mirror-image" && exercise.original && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-4">
            <div className="bg-stone-100 rounded-xl p-3 font-mono text-sm whitespace-pre">
              {exercise.original.join("\n")}
            </div>
            <div className="text-2xl self-center">➡️</div>
            <div className="text-stone-400 text-sm self-center">?</div>
          </div>
        </div>
      )}

      {/* Submit */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={disabled || selected === null}
          className="btn-primary self-center"
        >
          ✅ Check Answer
        </button>
      )}

      {/* Result */}
      {submitted && (
        <div className="text-center animate-bounce-in">
          {(() => {
            let isCorrect = false;
            switch (exercise.type) {
              case "spatial-rotation":
                isCorrect = exercise.shapes?.[Number(selected)]?.isCorrect ?? false;
                break;
              case "pattern-completion":
                isCorrect = selected === exercise.options?.[0];
                break;
              case "odd-one-out":
                isCorrect = exercise.items?.[Number(selected)]?.isOdd ?? false;
                break;
              default:
                break;
            }
            return isCorrect ? (
              <span className="text-lg font-bold text-mint-600">🎉 Correct!</span>
            ) : (
              <span className="text-lg font-bold text-coral-600">💪 Keep trying!</span>
            );
          })()}
        </div>
      )}
    </div>
  );
}
