"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { MandalaData } from "@/lib/games/types";
import type { Difficulty } from "@/lib/games/types";

interface MandalaRendererProps {
  pattern: MandalaData & { flashDuration: number; sectionColors: Record<string, number>[] };
  difficulty: Difficulty;
  mode: "flash" | "color" | "compare";
  onComplete?: (score: number, timeSpent: number) => void;
  onCancel?: () => void;
  disabled?: boolean;
}

// Polar to cartesian
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// Render a single mandala element
function renderElement(
  el: { shape: string; color: string; size: number; distance: number },
  cx: number,
  cy: number,
  angle: number,
  radius: number,
  key: string,
  opts?: { opacity?: number; stroke?: string; strokeWidth?: number; onClick?: () => void }
) {
  const dist = el.distance * radius;
  const pos = polarToCartesian(cx, cy, dist, angle);
  const size = el.size * radius;
  const opacity = opts?.opacity ?? 0.9;

  const commonProps = {
    opacity,
    stroke: opts?.stroke,
    strokeWidth: opts?.strokeWidth,
    onClick: opts?.onClick,
    style: opts?.onClick ? { cursor: "pointer" } : undefined,
  };

  switch (el.shape) {
    case "circle":
      return <circle key={key} cx={pos.x} cy={pos.y} r={size / 2} fill={el.color} {...commonProps} />;
    case "triangle": {
      const h = size * 0.866;
      const points = [
        `${pos.x},${pos.y - h / 2}`,
        `${pos.x - size / 2},${pos.y + h / 2}`,
        `${pos.x + size / 2},${pos.y + h / 2}`,
      ].join(" ");
      return <polygon key={key} points={points} fill={el.color} {...commonProps} />;
    }
    case "petal": {
      const d = `M ${pos.x} ${pos.y} Q ${pos.x + size * 0.5} ${pos.y - size * 0.8} ${pos.x} ${pos.y - size} Q ${pos.x - size * 0.5} ${pos.y - size * 0.8} ${pos.x} ${pos.y}`;
      return (
        <path key={key} d={d} fill={el.color} {...commonProps}
          transform={`rotate(${angle}, ${pos.x}, ${pos.y})`} />
      );
    }
    case "diamond": {
      const points = [
        `${pos.x},${pos.y - size / 2}`,
        `${pos.x + size / 3},${pos.y}`,
        `${pos.x},${pos.y + size / 2}`,
        `${pos.x - size / 3},${pos.y}`,
      ].join(" ");
      return <polygon key={key} points={points} fill={el.color} {...commonProps} />;
    }
    case "dot":
      return <circle key={key} cx={pos.x} cy={pos.y} r={size / 4} fill={el.color} {...commonProps} />;
    case "arc":
      return (
        <path key={key}
          d={`M ${pos.x - size / 2} ${pos.y} A ${size / 2} ${size / 2} 0 0 1 ${pos.x + size / 2} ${pos.y}`}
          fill="none" strokeLinecap="round" strokeWidth={opts?.strokeWidth ?? 3}
          stroke={opts?.stroke ?? el.color} opacity={opacity}
          onClick={opts?.onClick}
          style={opts?.onClick ? { cursor: "pointer" } : undefined} />
      );
    default:
      return null;
  }
}

export default function MandalaRenderer({
  pattern,
  difficulty,
  mode,
  onComplete,
  onCancel,
  disabled,
}: MandalaRendererProps) {
  const [startTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(0);
  const [flashTimeLeft, setFlashTimeLeft] = useState(pattern.flashDuration);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  // Track what color each element was colored with
  // Key: "s{section}-e{element}", Value: color string
  const [coloredElements, setColoredElements] = useState<Record<string, string>>({});

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flashTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.42;
  const angleStep = 360 / pattern.symmetry;

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime]);

  // Flash countdown
  useEffect(() => {
    if (mode === "flash") {
      setFlashTimeLeft(pattern.flashDuration);

      flashTimerRef.current = setInterval(() => {
        setFlashTimeLeft((prev) => {
          if (prev <= 0.1) {
            if (flashTimerRef.current) clearInterval(flashTimerRef.current);
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);

      return () => {
        if (flashTimerRef.current) clearInterval(flashTimerRef.current);
      };
    }
  }, [mode, pattern.flashDuration]);

  // Handle clicking an element in color mode
  const handleElementClick = useCallback(
    (sectionIndex: number, elementIndex: number) => {
      if (disabled || mode !== "color" || !selectedColor) return;
      const key = `s${sectionIndex}-e${elementIndex}`;
      setColoredElements((prev) => {
        const next = { ...prev };
        // Toggle off if same color
        if (next[key] === selectedColor) {
          delete next[key];
        } else {
          next[key] = selectedColor;
        }
        return next;
      });
    },
    [disabled, mode, selectedColor]
  );

  // Score the coloring attempt
  const handleCheck = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const finalTime = Math.floor((Date.now() - startTime) / 1000);

    let correct = 0;
    let total = 0;
    let wrong = 0;

    // Check each element's assigned color vs what the user colored
    for (let s = 0; s < pattern.symmetry; s++) {
      const slice = pattern.slices[s];
      for (let e = 0; e < slice.elements.length; e++) {
        total++;
        const key = `s${s}-e${e}`;
        const correctColor = slice.elements[e].color;
        const userColor = coloredElements[key];

        if (userColor === correctColor) {
          correct++;
        } else if (userColor) {
          wrong++; // colored with wrong color
        }
      }
    }

    // Score: correct - wrong penalty, min 0
    const score = total > 0
      ? Math.round(Math.max(0, (correct - wrong * 0.3) / total) * 100)
      : 0;

    onComplete?.(Math.min(100, score), finalTime);
  }, [pattern, coloredElements, startTime, onComplete]);

  // Build element list with color assignments
  const allElements: {
    shape: string;
    color: string;
    size: number;
    distance: number;
    sectionIndex: number;
    elementIndex: number;
  }[] = [];

  for (let s = 0; s < pattern.symmetry; s++) {
    const slice = pattern.slices[s];
    for (let e = 0; e < slice.elements.length; e++) {
      allElements.push({
        ...slice.elements[e],
        sectionIndex: s,
        elementIndex: e,
      });
    }
  }

  const totalElements = allElements.length;
  const coloredCount = Object.keys(coloredElements).length;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Timer + Status */}
      <div className="flex gap-3 text-sm font-semibold flex-wrap justify-center">
        <span className="pill-primary px-3 py-1">⏱️ {currentTime}s</span>
        {mode === "flash" && (
          <span className="px-3 py-1 rounded-full bg-coral-500 text-white animate-pulse-soft">
            👀 Memorize! {flashTimeLeft.toFixed(1)}s
          </span>
        )}
        {mode === "color" && (
          <span className="pill-lavender px-3 py-1">
            🎨 {coloredCount} / {totalElements} colored
          </span>
        )}
        {onCancel && mode !== "compare" && (
          <button
            onClick={onCancel}
            className="pill bg-stone-200 text-stone-600 hover:bg-coral-200 hover:text-coral-700 px-3 py-1 cursor-pointer transition-colors"
          >
            ✕ Quit
          </button>
        )}
      </div>

      {/* Flash progress bar */}
      {mode === "flash" && (
        <div className="w-full max-w-xs bg-stone-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-coral-400 to-coral-500 h-2 rounded-full transition-all duration-100"
            style={{ width: `${(flashTimeLeft / pattern.flashDuration) * 100}%` }}
          />
        </div>
      )}

      {/* Mandala SVG */}
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg">
          {/* Center decoration */}
          <circle cx={cx} cy={cy} r={10} fill="#a78bfa" opacity={0.7} />
          <circle cx={cx} cy={cy} r={5} fill="#fff" opacity={0.5} />

          {/* Radial guides */}
          {Array.from({ length: pattern.symmetry }).map((_, i) => {
            const pos = polarToCartesian(cx, cy, radius, i * angleStep);
            return (
              <line key={`line-${i}`} x1={cx} y1={cy} x2={pos.x} y2={pos.y}
                stroke="#e5e7eb" strokeWidth={0.5} strokeDasharray="3,3" />
            );
          })}

          {/* Concentric rings */}
          {[0.25, 0.5, 0.75, 1.0].map((r) => (
            <circle key={`ring-${r}`} cx={cx} cy={cy} r={radius * r}
              fill="none" stroke="#f0f0f0" strokeWidth={0.5} />
          ))}

          {/* Elements */}
          {allElements.map((el, i) => {
            const key = `s${el.sectionIndex}-e${el.elementIndex}`;
            const isColored = key in coloredElements;

            if (mode === "flash") {
              // Show fully colored
              return renderElement(el, cx, cy, el.sectionIndex * angleStep, radius, `el-${i}`);
            }

            if (mode === "color") {
              // Show outline (white fill, gray stroke) — clickable
              const userColor = coloredElements[key] || "#ffffff";
              return renderElement(
                { ...el, color: userColor },
                cx, cy,
                el.sectionIndex * angleStep,
                radius,
                `el-${i}`,
                {
                  opacity: isColored ? 0.9 : 0.3,
                  stroke: isColored ? el.color : "#d1d5db",
                  strokeWidth: isColored ? 0 : 1.5,
                  onClick: () => handleElementClick(el.sectionIndex, el.elementIndex),
                }
              );
            }

            if (mode === "compare") {
              // Show original colors with check/x overlay
              const userColor = coloredElements[key];
              const isCorrect = userColor === el.color;
              const wasColored = !!userColor;

              return (
                <g key={`el-${i}`}>
                  {renderElement(el, cx, cy, el.sectionIndex * angleStep, radius, `orig-${i}`)}
                  {wasColored && !isCorrect && (
                    // Wrong color — show red X
                    <text
                      x={el.distance * radius * Math.cos((el.sectionIndex * angleStep - 90) * Math.PI / 180) + cx}
                      y={el.distance * radius * Math.sin((el.sectionIndex * angleStep - 90) * Math.PI / 180) + cy}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="10"
                      fill="#ef4444"
                      fontWeight="bold"
                    >
                      ✗
                    </text>
                  )}
                </g>
              );
            }

            return null;
          })}
        </svg>
      </div>

      {/* Color picker (color mode) */}
      {mode === "color" && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-semibold text-coral-600">
            🖍️ Tap a color, then tap elements to color them!
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            {(pattern.palette || []).map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`
                  w-11 h-11 rounded-full border-[3px] transition-all duration-200
                  ${selectedColor === color
                    ? "border-stone-800 scale-110 shadow-lg ring-2 ring-stone-300"
                    : "border-stone-200 hover:scale-105 hover:border-stone-400"
                  }
                `}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          {selectedColor && (
            <p className="text-xs text-stone-400">
              Painting with: <span className="font-bold" style={{ color: selectedColor }}>● selected</span>
            </p>
          )}
          <button
            onClick={handleCheck}
            disabled={disabled || coloredCount === 0}
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-lavender-400 to-lavender-500 text-white shadow-clay hover:from-lavender-500 hover:to-lavender-600 disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all mt-2"
          >
            ✅ Check My Coloring
          </button>
        </div>
      )}

      {/* Flash mode instruction */}
      {mode === "flash" && (
        <div className="text-center">
          <p className="text-sm font-semibold text-coral-600">
            👀 Look carefully at where each color goes!
          </p>
          <p className="text-xs text-stone-400 mt-1">
            The image will disappear in {flashTimeLeft.toFixed(1)}s...
          </p>
        </div>
      )}
    </div>
  );
}
