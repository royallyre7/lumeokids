import { mulberry32, COMPREHENSION_STORIES } from "../utils";
import type { HomeworkPage, StoryComprehensionData } from "../types";

export function generateStoryComprehension(seed: number, variant: number): HomeworkPage {
  const rand = mulberry32(seed);
  const storyData = COMPREHENSION_STORIES[variant % COMPREHENSION_STORIES.length];

  return {
    pageNumber: variant === 0 ? 33 : 34,
    domain: "language-stimulation",
    instruction: "Read the story to your child and then complete the exercise on the right without referring to the passage.",
    data: {
      type: "story-comprehension",
      story: storyData.story,
      questions: storyData.questions,
    },
  };
}
