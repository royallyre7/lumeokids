import Link from "next/link";
import Card from "@/components/ui/Card";

interface GameCardProps {
  title: string;
  emoji: string;
  description: string;
  href: string;
  accentColor: "primary" | "accent" | "coral" | "lavender" | "mint" | "sunny";
  exerciseCount?: number;
}

export default function GameCard({
  title,
  emoji,
  description,
  href,
  accentColor,
  exerciseCount,
}: GameCardProps) {
  return (
    <Link href={href}>
      <Card variant="accent" accentColor={accentColor} className="h-full">
        <div className="flex flex-col items-center text-center gap-3 py-4">
          <div className="text-5xl animate-float">{emoji}</div>
          <h3 className="text-lg font-extrabold text-stone-800">{title}</h3>
          <p className="text-sm text-stone-500 leading-relaxed">{description}</p>
          {exerciseCount !== undefined && (
            <span className="pill-lavender px-3 py-1 text-xs font-semibold">
              {exerciseCount} exercise{exerciseCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </Card>
    </Link>
  );
}
