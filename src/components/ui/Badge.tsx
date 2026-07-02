type BadgeVariant = "beginner" | "intermediate" | "advanced" | "default" | "coral" | "sky" | "lavender" | "mint" | "sunny";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
  icon?: string; // emoji
}

const variantStyles: Record<BadgeVariant, string> = {
  beginner: "bg-mint-100 text-mint-700",
  intermediate: "bg-sunny-100 text-sunny-700",
  advanced: "bg-sky-100 text-sky-700",
  default: "bg-stone-100 text-stone-600",
  coral: "bg-coral-100 text-coral-700",
  sky: "bg-sky-100 text-sky-700",
  lavender: "bg-lavender-100 text-lavender-700",
  mint: "bg-mint-100 text-mint-700",
  sunny: "bg-sunny-100 text-sunny-700",
};

export default function Badge({
  label,
  variant = "default",
  className = "",
  icon,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
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
