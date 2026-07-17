import { mulberry32, shuffle, pickN, LOGIC_PATTERNS } from "../utils";
import { generateImage } from "../../aiImage";
import type { HomeworkPage, LogicAssociationData } from "../types";

export async function generateLogicAssociation(seed: number): Promise<HomeworkPage> {
  const rand = mulberry32(seed);
  const selected = pickN(LOGIC_PATTERNS, 4, rand);

  const questions = await Promise.all(selected.map(async (p) => {
    const image = await generateImage(`Simple line drawing of ${p.item}, white background`, { style: "line-art", size: "small" });
    return { item: p.item, image, options: p.related, answer: p.related[0] };
  }));

  return {
    pageNumber: 24,
    domain: "critical-thinking",
    instruction: "Study the pictures in the left columns and apply the same logic to complete the exercise on the right.",
    data: { type: "logic-association", examples: [], questions },
  };
}
