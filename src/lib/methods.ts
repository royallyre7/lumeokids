export interface MethodInfo {
  id: string;
  name: string;
  domainKeys: string[];
  description: string;
  professor: string;
  reference: string;
}

export const METHODS: MethodInfo[] = [
  {
    id: "sdt",
    name: "Self-Determination Theory",
    domainKeys: ["A", "G"],
    description:
      "Explains intrinsic motivation, autonomy, and curiosity-driven learning.",
    professor: "Edward Deci & Richard Ryan",
    reference: "https://selfdeterminationtheory.org",
  },
  {
    id: "grit",
    name: "Grit Theory",
    domainKeys: ["B"],
    description:
      "Describes perseverance and sustained effort toward long-term goals.",
    professor: "Angela Duckworth",
    reference: "https://angeladuckworth.com/grit-scale/",
  },
  {
    id: "mi",
    name: "Multiple Intelligences",
    domainKeys: ["C", "D"],
    description:
      "Proposes distinct intelligences including linguistic and creative capacities.",
    professor: "Howard Gardner",
    reference: "https://multipleintelligences.org",
  },
  {
    id: "eq",
    name: "Emotional Intelligence",
    domainKeys: ["E", "F"],
    description:
      "Covers emotional awareness, regulation, empathy, and social influence.",
    professor: "Daniel Goleman",
    reference: "https://www.danielgoleman.info",
  },
  {
    id: "ef",
    name: "Executive Function",
    domainKeys: ["H"],
    description:
      "Defines working memory, inhibitory control, and cognitive flexibility.",
    professor: "Harvard Center on the Developing Child",
    reference:
      "https://developingchild.harvard.edu/science/key-concepts/executive-function/",
  },
  {
    id: "sel",
    name: "Social-Emotional Learning",
    domainKeys: ["I"],
    description:
      "Framework for social skills, relationship building, and responsible decision-making.",
    professor: "CASEL",
    reference: "https://casel.org/sel-framework/",
  },
  {
    id: "temperament",
    name: "Temperament Theory",
    domainKeys: ["J"],
    description:
      "Describes stable patterns of emotional reactivity and self-regulation.",
    professor: "Alexander Thomas, Stella Chess, Mary Rothbart",
    reference: "https://www.apa.org/monitor/2011/02/temperament",
  },
  {
    id: "divergent",
    name: "Divergent Thinking Theory",
    domainKeys: ["C"],
    description:
      "Explains creative idea generation and non-linear problem solving.",
    professor: "J.P. Guilford",
    reference:
      "https://www.apa.org/pi/about/newsletter/2012/12/divergent-thinking",
  },
  {
    id: "constructivist",
    name: "Constructivist Learning Theory",
    domainKeys: ["C", "D"],
    description:
      "Children construct knowledge actively through experience and reflection.",
    professor: "Jean Piaget",
    reference: "https://www.simplypsychology.org/piaget.html",
  },
];
