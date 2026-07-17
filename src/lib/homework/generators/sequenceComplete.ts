import { mulberry32, NUMBER_SEQUENCES } from "../utils";
import type { HomeworkPage, SequenceCompleteData } from "../types";

export function generateSequenceComplete(seed: number): HomeworkPage {
  const rand = mulberry32(seed);
  const sequences = NUMBER_SEQUENCES.slice(0, 5).map((s) => ({
    items: s.items,
    rule: s.rule,
    answer: s.answer,
  }));

  return {
    pageNumber: 40,
    domain: "image-patterns",
    instruction: "Study the rule in each row and complete the sequence.",
    data: { type: "sequence-complete", sequences },
  };
}
