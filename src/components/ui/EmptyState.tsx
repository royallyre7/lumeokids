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
    <div className="card p-12 text-center animate-scale-in">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-stone-700 mb-2">{title}</h3>
      {description && (
        <p className="text-stone-500 mb-6 max-w-sm mx-auto">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Button variant="primary" href={actionHref}>
          {actionLabel}
        </Button>
      )}
      {children}
    </div>
  );
}
