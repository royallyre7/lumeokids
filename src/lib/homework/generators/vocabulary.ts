// Vocabulary Generator — Page 15
import { mulberry32, pickN, VOCABULARY_ITEMS } from "../utils";
import { generateImage } from "../../aiImage";
import type { HomeworkPage, VocabularyData } from "../types";

export async function generateVocabulary(seed: number): Promise<HomeworkPage> {
  const rand = mulberry32(seed);

  // Pick 8 random vocabulary items
  const selectedItems = pickN(VOCABULARY_ITEMS, 8, rand);

  // Generate images for each item
  const items = await Promise.all(
    selectedItems.map(async (name) => {
      const image = await generateImage(
        `Simple line drawing of ${name}, white background, child-friendly educational worksheet style`,
        { style: "line-art", size: "small" }
      );
      return { name, image };
    })
  );

  const data: VocabularyData = {
    type: "vocabulary",
    items,
  };

  return {
    pageNumber: 15,
    domain: "language-stimulation",
    instruction: "Write the names of each item in the brackets.",
    data,
  };
}
