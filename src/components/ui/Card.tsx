import { ReactNode } from "react";
import Link from "next/link";

type CardVariant = "default" | "accent" | "glass" | "interactive";

interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
  hover?: boolean;
  variant?: CardVariant;
  accentColor?: "primary" | "accent" | "coral" | "lavender" | "mint" | "sunny";
  onClick?: () => void;
}

const accentColors: Record<string, string> = {
  primary: "from-primary-400 to-primary-500",
  accent: "from-accent-400 to-accent-500",
  coral: "from-coral-400 to-coral-500",
  lavender: "from-lavender-400 to-lavender-500",
  mint: "from-mint-400 to-mint-500",
  sunny: "from-sunny-400 to-sunny-500",
};

export default function Card({
  children,
  href,
  className = "",
  hover = false,
  variant = "default",
  accentColor = "coral",
  onClick,
}: CardProps) {
  const variantClasses: Record<CardVariant, string> = {
    default: "card p-6",
    accent: "card-accent p-6",
    glass: "glass rounded-clay-lg p-6 shadow-clay",
    interactive: "card-hoverable p-6 cursor-pointer",
  };

  const baseClass = variantClasses[variant];
  const hoverClass = hover && variant === "default" ? "card-hoverable cursor-pointer" : "";

  const classes = `${baseClass} ${hoverClass} ${className}`;

  const accentBar =
    variant === "accent" ? (
      <div
        className={`h-1.5 w-full bg-gradient-to-r ${
          accentColors[accentColor] || accentColors.coral
        } rounded-t-3xl`}
      />
    ) : null;

  const content = (
    <>
      {accentBar}
      <div className={variant === "accent" ? "pt-0" : ""}>{children}</div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${classes} block`}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={`${classes} w-full text-left`}>
        {content}
      </button>
    );
  }

  return <div className={classes}>{content}</div>;
}
