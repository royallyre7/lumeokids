import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "lavender";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  href?: string;
  icon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-clay hover:from-primary-500 hover:to-primary-600 hover:shadow-clay-hover",
  secondary:
    "bg-gradient-to-r from-accent-400 to-accent-500 text-white shadow-clay hover:from-accent-500 hover:to-accent-600 hover:shadow-clay-hover",
  outline:
    "border-2 border-primary-200 text-primary-700 bg-white hover:border-primary-400 hover:bg-primary-50/50 shadow-sm hover:shadow-clay",
  ghost:
    "text-stone-600 hover:bg-primary-50 hover:text-primary-700",
  lavender:
    "bg-gradient-to-r from-lavender-400 to-lavender-500 text-white shadow-clay hover:from-lavender-500 hover:to-lavender-600 hover:shadow-glow-lavender",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-full gap-1.5",
  md: "px-6 py-2.5 text-sm rounded-full gap-2",
  lg: "px-8 py-3.5 text-base rounded-full gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  href,
  icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:opacity-40 disabled:pointer-events-none active:scale-95";

  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {loading && <Spinner />}
        {!loading && icon && <span className="shrink-0">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <Spinner />}
      {!loading && icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
