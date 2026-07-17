import { mulberry32, shuffle, VEGETABLES } from "../utils";
import { generateImage } from "../../aiImage";
import type { HomeworkPage, VegetableClassData } from "../types";

export async function generateVegetableClass(seed: number, variant: number): Promise<HomeworkPage> {
  const rand = mulberry32(seed);
  const shuffled = shuffle([...VEGETABLES], rand);
  const selected = shuffled.slice(0, 9);

  const vegetables = await Promise.all(selected.map(async (v) => {
    const image = await generateImage(`Simple line drawing of ${v.name}, white background, educational`, { style: "line-art", size: "small" });
    return { name: v.name, image, category: v.category };
  }));

  return {
    pageNumber: variant === 1 ? 26 : 27,
    domain: "critical-thinking",
    instruction: "From the box on the left, select the vegetables and write them in the boxes that fit the respective descriptions.",
    data: {
      type: "vegetable-class",
      vegetables,
      categories: ["We eat the flower or fruit.", "We eat the root.", "We eat the leaves."],
    },
  };
}
