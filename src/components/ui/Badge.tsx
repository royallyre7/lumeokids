type BadgeVariant = "beginner" | "intermediate" | "advanced" | "default";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  beginner: "bg-mint-100 text-mint-700",
  intermediate: "bg-sunny-100 text-sunny-700",
  advanced: "bg-sky-100 text-sky-700",
  default: "bg-stone-100 text-stone-600",
};

export default function Badge({
  label,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
}

export function getBadgeVariant(
  level: string
): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    BEGINNER: "beginner",
    INTERMEDIATE: "intermediate",
    ADVANCED: "advanced",
  };
  return map[level] || "default";
}
