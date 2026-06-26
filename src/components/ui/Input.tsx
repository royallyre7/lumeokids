import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`input-field ${icon ? "pl-10" : ""} ${
            error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="input-error">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
