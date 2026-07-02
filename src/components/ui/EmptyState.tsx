import { ReactNode } from "react";
import Button from "./Button";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  children?: ReactNode;
}

export default function EmptyState({
  icon = "📭",
  title,
  description,
  actionLabel,
  actionHref,
  children,
}: EmptyStateProps) {
  return (
    <div className="card p-12 text-center animate-bounce-in relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-coral-100 rounded-full blur-2xl opacity-50" aria-hidden="true" />
      <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-lavender-100 rounded-full blur-2xl opacity-50" aria-hidden="true" />

      <div className="relative z-10">
        <div className="text-6xl mb-4 animate-float">{icon}</div>
        <h3 className="text-lg font-bold text-stone-700 mb-2">{title}</h3>
        {description && (
          <p className="text-stone-500 mb-6 max-w-sm mx-auto">{description}</p>
        )}
        {actionLabel && actionHref && (
          <Button variant="primary" href={actionHref}>
            {actionLabel} ✨
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}
