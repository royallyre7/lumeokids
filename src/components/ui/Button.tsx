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
    "bg-gradient-to-r from-coral-500 to-coral-600 text-white shadow-bubble hover:from-coral-600 hover:to-coral-700 hover:shadow-bubble-lg",
  secondary:
    "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-sm hover:from-sky-600 hover:to-sky-700",
  outline:
    "border-2 border-stone-200 text-stone-700 bg-white hover:border-coral-300 hover:text-coral-600 hover:bg-coral-50/50",
  ghost:
    "text-stone-600 hover:bg-stone-100 hover:text-stone-800",
  lavender:
    "bg-gradient-to-r from-lavender-500 to-lavender-600 text-white shadow-sm hover:from-lavender-600 hover:to-lavender-700 hover:shadow-glow-lavender",
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
    "inline-flex items-center justify-center font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-400 disabled:opacity-40 disabled:pointer-events-none active:scale-95";

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
