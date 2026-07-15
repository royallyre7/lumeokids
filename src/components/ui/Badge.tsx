type BadgeVariant = "beginner" | "intermediate" | "advanced" | "default" | "primary" | "accent" | "coral" | "lavender" | "mint" | "sunny";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
  icon?: string; // emoji
}

const variantStyles: Record<BadgeVariant, string> = {
  beginner: "bg-mint-100 text-mint-700",
  intermediate: "bg-sunny-100 text-sunny-700",
  advanced: "bg-accent-100 text-accent-700",
  default: "bg-stone-100 text-stone-600",
  primary: "bg-primary-100 text-primary-700",
  accent: "bg-accent-100 text-accent-700",
  coral: "bg-coral-100 text-coral-700",
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
