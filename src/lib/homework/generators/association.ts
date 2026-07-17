// Association Matching Generator — Page 1
import { mulberry32, shuffle, pick, pickN, ASSOCIATION_PAIRS } from "../utils";
import { generateImage } from "../../aiImage";
import type { HomeworkPage, AssociationData } from "../types";

export async function generateAssociation(seed: number): Promise<HomeworkPage> {
  const rand = mulberry32(seed);

  // Pick 4 random pairs
  const selectedPairs = pickN(ASSOCIATION_PAIRS, 4, rand);

  // Generate images for each item
  const pairs = await Promise.all(
    selectedPairs.map(async (pair) => {
      const [itemImg, matchImg] = await Promise.all([
        generateImage(`Simple line drawing of ${pair.item}, white background, educational worksheet`, {
          style: "line-art",
          size: "small",
        }),
        generateImage(`Simple line drawing of ${pair.match}, white background, educational worksheet`, {
          style: "line-art",
          size: "small",
        }),
      ]);
      return {
        item: pair.item,
        image: itemImg,
        match: pair.match,
        matchImage: matchImg,
      };
    })
  );

  // Generate distractors (wrong options)
  const allMatches = ASSOCIATION_PAIRS.map((p) => p.match);
  const usedMatches = new Set(selectedPairs.map((p) => p.match));
  const availableDistractors = allMatches.filter((m) => !usedMatches.has(m));
  const distractors = pickN(availableDistractors, 2, rand);

  const data: AssociationData = {
    type: "association",
    pairs,
    distractors,
  };

  return {
    pageNumber: 1,
    domain: "critical-thinking",
    instruction: "Match the things that are associated with each other.",
    data,
  };
}
