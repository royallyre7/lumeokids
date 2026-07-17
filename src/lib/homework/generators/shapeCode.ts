// Shape Code Generator — Pages 6-7, 31-32
import { mulberry32, shuffle, pickN } from "../utils";
import type { HomeworkPage, ShapeCodeData } from "../types";

const SHAPE_THEMES: Record<string, string[]> = {
  circles: ["○", "◉", "●", "◎", "○", "◉", "●", "◎", "○", "◉"],
  squares: ["□", "■", "□", "■", "□", "■", "□", "■", "□", "■"],
  hearts: ["♥", "♡", "♥", "♡", "♥", "♡", "♥", "♡", "♥", "♡"],
  triangles: ["△", "▲", "△", "▲", "△", "▲", "△", "▲", "△", "▲"],
};

const LETTERS = "ABCDEFGHIJKLMNOP".split("");

export function generateShapeCode(seed: number, theme: string): HomeworkPage {
  const rand = mulberry32(seed);
  const shapes = SHAPE_THEMES[theme] || SHAPE_THEMES.circles;

  // Create code key: map each shape to a letter
  const codeKey = shapes.slice(0, 10).map((shape, i) => ({
    shape,
    letter: LETTERS[i],
  }));

  // Generate 6 questions
  const questions = Array.from({ length: 6 }, () => {
    // Pick 2-4 shapes to decode
    const numShapes = Math.floor(rand() * 3) + 2;
    const selectedShapes = pickN(shapes.slice(0, 10), numShapes, rand);
    const answer = selectedShapes
      .map((s) => codeKey.find((k) => k.shape === s)?.letter || "?")
      .join("");

    return {
      shapes: selectedShapes,
      answer,
    };
  });

  const data: ShapeCodeData = {
    type: "shape-code",
    codeKey,
    questions,
    theme,
  };

  const pageNum = theme === "circles" ? 6 : theme === "squares" ? 7 : theme === "hearts" ? 31 : 32;

  return {
    pageNumber: pageNum,
    domain: "image-patterns",
    instruction: "Follow the code and write out the alphabets in the brackets according to each shape in the brackets.",
    data,
  };
}
