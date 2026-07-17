// Block Counting Generator — Pages 11-12
import { mulberry32 } from "../utils";
import type { HomeworkPage, BlockCountingData } from "../types";

export function generateBlockCounting(seed: number, operation: "add" | "subtract"): HomeworkPage {
  const rand = mulberry32(seed);

  const groups = Array.from({ length: 4 }, () => {
    const count = Math.floor(rand() * 8) + 3;
    // Simple 3D block representation (layers of cubes)
    const blocks: number[][][] = [];
    for (let layer = 0; layer < Math.ceil(count / 4); layer++) {
      const layerBlocks: number[][] = [];
      for (let row = 0; row < 2; row++) {
        const rowBlocks: number[] = [];
        for (let col = 0; col < 4; col++) {
          const idx = layer * 4 + row * 2 + col;
          rowBlocks.push(idx < count ? 1 : 0);
        }
        layerBlocks.push(rowBlocks);
      }
      blocks.push(layerBlocks);
    }
    return { blocks, count };
  });

  const answer = operation === "add"
    ? groups[0].count + groups[1].count
    : groups[2].count - groups[3].count;

  const data: BlockCountingData = {
    type: "block-counting",
    operation,
    groups,
    answer,
  };

  return {
    pageNumber: operation === "add" ? 11 : 12,
    domain: "maths-ability",
    instruction: "Count the blocks and complete the equations. Write down the answers in the brackets.",
    data,
  };
}
