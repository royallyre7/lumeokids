"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { MazeData } from "@/lib/games/types";

interface MazeRendererProps {
  maze: MazeData;
  onComplete?: (steps: number, timeSpent: number) => void;
  onCancel?: () => void;
  disabled?: boolean;
}

export default function MazeRenderer({ maze, onComplete, onCancel, disabled }: MazeRendererProps) {
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [path, setPath] = useState<{ row: number; col: number }[]>([]);
  const [steps, setSteps] = useState(0);
  const [startTime] = useState(Date.now());
  const [solved, setSolved] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const startKey = `${maze.start.row},${maze.start.col}`;
  const endKey = `${maze.end.row},${maze.end.col}`;

  // Initialize
  useEffect(() => {
    const initial = new Set([startKey]);
    setVisited(initial);
    setPath([maze.start]);
    setSteps(0);
    setSolved(false);
    setCurrentTime(0);

    timerRef.current = setInterval(() => {
      setCurrentTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startKey, startTime, maze.start]);

  // Try to move to a cell — walks along adjacent path cells
  const tryMove = useCallback(
    (targetRow: number, targetCol: number) => {
      if (disabled || solved) return false;

      const targetKey = `${targetRow},${targetCol}`;
      if (visited.has(targetKey)) return false;
      if (targetRow < 0 || targetRow >= maze.grid.length) return false;
      if (targetCol < 0 || targetCol >= maze.grid[0].length) return false;
      if (maze.grid[targetRow][targetCol] !== 1) return false;

      // BFS to find path from any visited cell to target
      const lastVisited = path[path.length - 1];
      const queue: { row: number; col: number; trail: { row: number; col: number }[] }[] = [
        { row: lastVisited.row, col: lastVisited.col, trail: [] },
      ];
      const seen = new Set<string>();
      seen.add(`${lastVisited.row},${lastVisited.col}`);

      while (queue.length > 0) {
        const current = queue.shift()!;
        const currentKey = `${current.row},${current.col}`;

        if (current.row === targetRow && current.col === targetCol) {
          // Found path — add all intermediate cells
          const newVisited = new Set(visited);
          const newPath = [...path];
          let added = 0;

          for (const step of current.trail) {
            const key = `${step.row},${step.col}`;
            if (!newVisited.has(key)) {
              newVisited.add(key);
              newPath.push(step);
              added++;
            }
          }

          // Add the target itself
          if (!newVisited.has(targetKey)) {
            newVisited.add(targetKey);
            newPath.push({ row: targetRow, col: targetCol });
            added++;
          }

          setVisited(newVisited);
          setPath(newPath);
          setSteps((s) => s + added);

          // Check if reached end
          if (targetKey === endKey) {
            setSolved(true);
            if (timerRef.current) clearInterval(timerRef.current);
            const finalTime = Math.floor((Date.now() - startTime) / 1000);
            onComplete?.(steps + added, finalTime);
          }
          return true;
        }

        // Check 4 neighbors
        const DIRS: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dr, dc] of DIRS) {
          const nr = current.row + dr;
          const nc = current.col + dc;
          const nKey = `${nr},${nc}`;

          if (
            nr >= 0 && nr < maze.grid.length &&
            nc >= 0 && nc < maze.grid[0].length &&
            maze.grid[nr][nc] === 1 &&
            !seen.has(nKey)
          ) {
            seen.add(nKey);
            queue.push({ row: nr, col: nc, trail: [...current.trail, { row: nr, col: nc }] });
          }
        }
      }

      return false;
    },
    [disabled, solved, visited, maze.grid, endKey, path, steps, startTime, onComplete]
  );

  // Handle click
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      tryMove(row, col);
    },
    [tryMove]
  );

  // Touch/Mouse drag support
  const getCellFromEvent = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!gridRef.current) return null;
      const rect = gridRef.current.getBoundingClientRect();
      const maxDim = Math.max(maze.grid.length, maze.grid[0].length);
      const cellSize = Math.min(28, Math.floor(Math.min(rect.width, 400) / maxDim));

      let clientX: number, clientY: number;
      if ("touches" in e) {
        if (e.touches.length === 0) return null;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);

      if (row >= 0 && row < maze.grid.length && col >= 0 && col < maze.grid[0].length) {
        return { row, col };
      }
      return null;
    },
    [maze.grid]
  );

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled || solved) return;
      const cell = getCellFromEvent(e);
      if (cell) {
        setIsDragging(true);
        tryMove(cell.row, cell.col);
      }
    },
    [disabled, solved, getCellFromEvent, tryMove]
  );

  const handleDragMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging || disabled || solved) return;
      const cell = getCellFromEvent(e);
      if (cell) {
        tryMove(cell.row, cell.col);
      }
    },
    [isDragging, disabled, solved, getCellFromEvent, tryMove]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled || solved) return;
      const last = path[path.length - 1];
      const DIRS: Record<string, [number, number]> = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1],
        w: [-1, 0],
        s: [1, 0],
        a: [0, -1],
        d: [0, 1],
      };
      const dir = DIRS[e.key];
      if (dir) {
        e.preventDefault();
        tryMove(last.row + dir[0], last.col + dir[1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disabled, solved, path, tryMove]);

  // Calculate cell size
  const maxDim = Math.max(maze.grid.length, maze.grid[0].length);
  const cellSize = Math.min(28, Math.floor(400 / maxDim));

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Timer + Steps + Cancel */}
      <div className="flex gap-3 text-sm font-semibold flex-wrap justify-center">
        <span className="pill-primary px-3 py-1">
          ⏱️ {currentTime}s
        </span>
        <span className="pill-lavender px-3 py-1">
          👣 {steps} steps
        </span>
        {solved && (
          <span className="pill-mint px-3 py-1 animate-bounce-in">
            🏆 Solved!
          </span>
        )}
        {!solved && onCancel && (
          <button
            onClick={onCancel}
            className="pill bg-stone-200 text-stone-600 hover:bg-coral-200 hover:text-coral-700 px-3 py-1 cursor-pointer transition-colors"
          >
            ✕ Quit
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md bg-stone-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-mint-400 to-mint-500 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(100, (visited.size / (maze.rows * maze.cols)) * 100)}%`,
          }}
        />
      </div>
      <p className="text-xs text-stone-400">
        {visited.size} / {maze.rows * maze.cols} cells explored
      </p>

      {/* Maze Grid — supports drag/touch */}
      <div
        ref={gridRef}
        className="inline-grid gap-0 border-2 border-stone-300 rounded-xl overflow-hidden select-none touch-none"
        style={{
          gridTemplateColumns: `repeat(${maze.grid[0].length}, ${cellSize}px)`,
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {maze.grid.map((row, r) =>
          row.map((cell, c) => {
            const key = `${r},${c}`;
            const isStart = key === startKey;
            const isEnd = key === endKey;
            const isVisited = visited.has(key);
            const isWall = cell === 0;
            const isOnPath = path.some((p) => p.row === r && p.col === c);

            return (
              <div
                key={key}
                className={`
                  transition-colors duration-100
                  ${isWall ? "bg-stone-700" : ""}
                  ${!isWall && !isVisited ? "bg-stone-100" : ""}
                  ${isVisited && !isStart && !isEnd ? "bg-mint-300" : ""}
                  ${isOnPath && !isStart && !isEnd ? "bg-mint-400" : ""}
                  ${isStart ? "bg-coral-400" : ""}
                  ${isEnd ? "bg-accent-400" : ""}
                  ${solved && isEnd ? "bg-mint-500 animate-pop-in" : ""}
                `}
                style={{ width: cellSize, height: cellSize }}
              >
                {isStart && cellSize >= 20 && (
                  <span className="flex items-center justify-center h-full text-xs">
                    🚀
                  </span>
                )}
                {isEnd && !solved && cellSize >= 20 && (
                  <span className="flex items-center justify-center h-full text-xs">
                    🎯
                  </span>
                )}
                {isEnd && solved && cellSize >= 20 && (
                  <span className="flex items-center justify-center h-full text-xs">
                    🏆
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs text-stone-500 flex-wrap justify-center">
        <span>🚀 Start</span>
        <span>🎯 End</span>
        <span className="text-mint-600">🟩 Visited</span>
        <span className="text-stone-400">⌨️ Arrow keys / WASD</span>
      </div>
    </div>
  );
}
