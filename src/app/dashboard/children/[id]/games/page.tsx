"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import GameCard from "@/components/games/GameCard";

export default function GamesPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Link
        href={`/dashboard/children/${id}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-stone-400 hover:text-coral-500 transition-colors mb-6"
      >
        ← Back to Profile
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-stone-800 mb-2">
          🎮 Learning Games
        </h1>
        <p className="text-stone-500">
          Fun brain-training exercises to boost creativity and focus!
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3 stagger-children">
        <GameCard
          title="Maze Game"
          emoji="🏁"
          description="Navigate through puzzles to build spatial reasoning and problem-solving skills."
          href={`/dashboard/children/${id}/games/maze`}
          accentColor="coral"
        />
        <GameCard
          title="Mandala Memory"
          emoji="🔮"
          description="Remember colorful mandala patterns to boost visual memory and concentration."
          href={`/dashboard/children/${id}/games/mandala`}
          accentColor="lavender"
        />
        <GameCard
          title="Right Brain Training"
          emoji="🧠"
          description="Spatial rotation, pattern completion, and visual puzzles for creative thinking."
          href={`/dashboard/children/${id}/games/right-brain`}
          accentColor="mint"
        />
      </div>
    </div>
  );
}
