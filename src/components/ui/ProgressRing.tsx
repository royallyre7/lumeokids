interface ProgressRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: "coral" | "sky" | "lavender" | "mint" | "sunny";
  label?: string;
  className?: string;
}

const colorMap: Record<string, { stroke: string; bg: string; text: string }> = {
  coral: { stroke: "stroke-coral-500", bg: "stroke-coral-100", text: "text-coral-600" },
  sky: { stroke: "stroke-sky-500", bg: "stroke-sky-100", text: "text-sky-600" },
  lavender: { stroke: "stroke-lavender-500", bg: "stroke-lavender-100", text: "text-lavender-600" },
  mint: { stroke: "stroke-mint-500", bg: "stroke-mint-100", text: "text-mint-600" },
  sunny: { stroke: "stroke-sunny-500", bg: "stroke-sunny-100", text: "text-sunny-600" },
};

export default function ProgressRing({
  value,
  size = 64,
  strokeWidth = 6,
  color = "coral",
  label,
  className = "",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const colors = colorMap[color];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={colors.bg}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${colors.stroke} progress-ring-circle`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-sm font-extrabold ${colors.text}`}>
          {Math.round(value)}%
        </span>
        {label && (
          <span className="text-[10px] text-stone-400 font-medium">{label}</span>
        )}
      </div>
    </div>
  );
}
