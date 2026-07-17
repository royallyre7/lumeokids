// Creature Assembly Generator — Pages 20-21
import { mulberry32, shuffle, pick, CREATURE_PARTS } from "../utils";
import { generateImage } from "../../aiImage";
import type { HomeworkPage, CreatureAssemblyData } from "../types";

const CREATURES = [
  { name: "cat", parts: ["Ear", "Face", "Body", "Leg", "Tail"] },
  { name: "rabbit", parts: ["Ear", "Face", "Body", "Leg", "Tail"] },
  { name: "fish", parts: ["Fin", "Eye", "Body", "Tail", "Mouth"] },
  { name: "bird", parts: ["Beak", "Eye", "Body", "Wing", "Tail"] },
  { name: "horse", parts: ["Ear", "Face", "Body", "Leg", "Tail"] },
];

export async function generateCreatureAssembly(
  seed: number,
  creatureName: string
): Promise<HomeworkPage> {
  const rand = mulberry32(seed);

  const creature = CREATURES.find((c) => c.name === creatureName) || CREATURES[0];

  // Generate image of the creature
  const creatureImage = await generateImage(
    `Simple line drawing of a ${creature.name}, white background, child-friendly cartoon style`,
    { style: "line-art", size: "medium" }
  );

  // Map each body part to a different animal
  const animals = shuffle([...CREATURE_PARTS.animals], rand);
  const parts = creature.parts.map((part, i) => ({
    part,
    fromAnimal: animals[i % animals.length],
  }));

  const data: CreatureAssemblyData = {
    type: "creature-assembly",
    creature: creature.name,
    creatureImage,
    parts,
  };

  return {
    pageNumber: creatureName === "cat" ? 20 : 21,
    domain: "critical-thinking",
    instruction: "Study the creature below and write the animal that each body part represents in the respective boxes.",
    data,
  };
}
