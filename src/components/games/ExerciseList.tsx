interface ExerciseListProps {
  exercises: {
    id: string;
    difficulty: string;
    completed: boolean;
    score: number | null;
    timeSpent: number | null;
    createdAt: Date | string;
  }[];
  type: "maze" | "mandala" | "right-brain";
}

const difficultyEmoji: Record<string, string> = {
  easy: "🟢",
  medium: "🟡",
  hard: "🔴",
};

const typeEmoji: Record<string, string> = {
  maze: "🏁",
  mandala: "🔮",
  "right-brain": "🧠",
};

export default function ExerciseList({ exercises, type }: ExerciseListProps) {
  if (exercises.length === 0) {
    return (
      <div className="text-center py-8 text-stone-400">
        <div className="text-4xl mb-2">{typeEmoji[type]}</div>
        <p className="text-sm">No exercises yet. Generate your first one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {exercises.map((ex) => (
        <div
          key={ex.id}
          className={`
            flex items-center justify-between p-3 rounded-xl border
            ${ex.completed
              ? "bg-mint-50 border-mint-200"
              : "bg-stone-50 border-stone-200"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <span>{difficultyEmoji[ex.difficulty] || "⚪"}</span>
            <div>
              <span className="text-sm font-semibold text-stone-700 capitalize">
                {ex.difficulty}
              </span>
              <span className="text-xs text-stone-400 ml-2">
                {new Date(ex.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {ex.timeSpent !== null && (
              <span className="text-xs text-stone-500">
                ⏱️ {ex.timeSpent}s
              </span>
            )}
            {ex.completed && ex.score !== null && (
              <span
                className={`
                  text-sm font-bold px-2 py-0.5 rounded-full
                  ${ex.score >= 80 ? "bg-mint-200 text-mint-700" : ""}
                  ${ex.score >= 50 && ex.score < 80 ? "bg-sunny-200 text-sunny-700" : ""}
                  ${ex.score < 50 ? "bg-coral-200 text-coral-700" : ""}
                `}
              >
                {ex.score}%
              </span>
            )}
            {!ex.completed && (
              <span className="text-xs text-stone-400 italic">In progress</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
