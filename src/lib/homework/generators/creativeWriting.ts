import { mulberry32, pickN, STORY_ITEMS } from "../utils";
import { generateImage } from "../../aiImage";
import type { HomeworkPage, CreativeWritingData } from "../types";

export async function generateCreativeWriting(seed: number): Promise<HomeworkPage> {
  const rand = mulberry32(seed);
  const selectedItems = pickN(STORY_ITEMS[Math.floor(rand() * STORY_ITEMS.length)], 5, rand);

  const items = await Promise.all(selectedItems.map(async (name) => {
    const image = await generateImage(`Simple icon of ${name}, white background, minimal worksheet style`, { style: "line-art", size: "small" });
    return { name, image };
  }));

  return {
    pageNumber: 28,
    domain: "language-stimulation",
    instruction: "Write a story using these 5 items. You may use them randomly.",
    data: { type: "creative-writing", items, prompt: "Write a story using these items." },
  };
}
