// ─── Section Definitions (A–J) ───
// Each section maps to the Discovery Tool's 10 assessment areas

export interface SectionDefinition {
  key: string;
  label: string;
  emoji: string;
  maxScore: number;
  questions: string[];
}

export const SECTIONS: SectionDefinition[] = [
  {
    key: "A",
    label: "Curiosity & Exploration",
    emoji: "🔍",
    maxScore: 50,
    questions: [
      'Asks many "why," "how," and "what if" questions.',
      "Enjoys taking things apart or discovering how they work.",
      "Likes exploring new places, nature, or unfamiliar environments.",
      "Voluntarily seeks out books, videos, or podcasts to learn about topics of interest.",
      "Enjoys hands-on experiments or messy, open-ended play.",
      "Notices small details in their environment that others miss.",
      "Loves solving puzzles, riddles, or brain teasers.",
      "Tries new activities or foods willingly.",
      "Prefers deep explanations over simple, dismissive answers.",
      "Tries to figure out things on their own before asking for help.",
    ],
  },
  {
    key: "B",
    label: "Persistence, Grit & Resilience",
    emoji: "💪",
    maxScore: 45,
    questions: [
      "Sticks with a difficult task without immediately quitting.",
      "Keeps practicing a skill to get better.",
      "Accepts mistakes or losing a game without giving up.",
      "Willing to try again after an initial failure or mistake.",
      "Can work on long-term projects spread out over days.",
      "Shows patience when things don't work out right away.",
      "Manages frustration constructively.",
      "Stays focused on a self-chosen task even with mild distractions.",
      "Sets personal targets (e.g., 'I want to build this tower as tall as me').",
    ],
  },
  {
    key: "C",
    label: "Creativity & Innovation",
    emoji: "🎨",
    maxScore: 50,
    questions: [
      "Generates original ideas, drawings, or concepts rather than just copying.",
      "Invents their own games, rules, or imaginary worlds.",
      "Makes up elaborate stories, jokes, or scripts during play.",
      "Builds unique creations using blocks, crafts, or recycled materials.",
      "Thinks of alternative solutions to everyday problems.",
      "Engages deeply in pretend play or role-playing.",
      "Combines different ideas or materials in unusual, creative ways.",
      "Shows a strong interest in visual arts.",
      "Responds strongly to music (dancing, singing, humming).",
      "Uses everyday objects imaginatively.",
    ],
  },
  {
    key: "D",
    label: "Communication & Language",
    emoji: "💬",
    maxScore: 50,
    questions: [
      "Expresses thoughts, needs, and ideas clearly for their age.",
      "Listens attentively when others speak without constantly interrupting.",
      "Engages easily in back-and-forth conversations with peers and adults.",
      "Can sequence events accurately when telling a story.",
      "Explains concepts or rules to others effectively.",
      "Asks thoughtful, relevant questions during conversations.",
      "Speaks confidently in front of groups.",
      "Uses a rich, expressive vocabulary.",
      'Verbally communicates how they are feeling (e.g., "I feel frustrated").',
      "Adjusts their language depending on who they are talking to.",
    ],
  },
  {
    key: "E",
    label: "Emotional Intelligence (EQ)",
    emoji: "💛",
    maxScore: 50,
    questions: [
      "Notices when others are upset or happy.",
      "Shows genuine empathy or concern when someone is hurt or sad.",
      "Offers comfort, a toy, or a hug to someone in distress.",
      "Controls intense emotions appropriately for their age.",
      "Bounces back relatively quickly after a disappointment.",
      "Accepts constructive feedback without becoming overly defensive.",
      "Shares resources, toys, or attention willingly.",
      "Apologizes sincerely when they realize they have hurt someone.",
      "Can label their own emotions accurately.",
      "Shows spontaneous acts of kindness to people or animals.",
    ],
  },
  {
    key: "F",
    label: "Leadership & Influence",
    emoji: "🌟",
    maxScore: 50,
    questions: [
      "Naturally organizes games, roles, or activities when playing with peers.",
      "Steps up to volunteer first for tasks, chores, or classroom roles.",
      "Willingly helps classmates or siblings who are struggling.",
      "Tries to mediate or solve conflicts between other children.",
      "Advocates for fairness and making sure everyone is included.",
      "Encourages and cheers on others when they are trying.",
      "Takes responsibility for their actions instead of blaming others.",
      "Inspires or motivates teammates/friends toward a common goal.",
      "Expresses opinions confidently, even if others disagree.",
      "Leads collaboratively without being overly bossy or demanding.",
    ],
  },
  {
    key: "G",
    label: "Independence & Autonomy",
    emoji: "🛠️",
    maxScore: 50,
    questions: [
      "Manages personal hygiene and dressing independently.",
      "Cleans up their play area or room with minimal prompting.",
      "Manages responsibilities on their own.",
      "Solves simple daily problems independently.",
      "Makes choices confidently.",
      "Takes care of personal belongings.",
      'Uses unstructured free time constructively without saying "I\'m bored".',
      "Completes regular household chores or contributions reliably.",
      "Knows when they genuinely need help and asks for it appropriately.",
      "Thinks ahead about what they need.",
    ],
  },
  {
    key: "H",
    label: "Executive Function & Cognitive Control",
    emoji: "🧠",
    maxScore: 50,
    questions: [
      "Can hold multi-step instructions in mind and follow them through.",
      "Remembers routine responsibilities without constant verbal reminders.",
      "Keeps track of and organizes materials needed for tasks or school.",
      "Switches from one activity to another smoothly without melting down.",
      "Controls immediate impulses (can wait their turn).",
      "Pauses to think or plan a strategy before starting a task.",
      "Finishes tasks within a reasonable or expected timeframe.",
      "Can sustain attention on an adult-directed task.",
      "Filters out background noise and distractions to focus on their work.",
      "Considers the consequences of an action before doing it.",
    ],
  },
  {
    key: "I",
    label: "Social Skills & Peer Relations",
    emoji: "🤝",
    maxScore: 50,
    questions: [
      "Forms friendships and connects with peers easily.",
      "Cooperates well with others to achieve a shared goal.",
      "Shares toys, equipment, and space equitably.",
      "Takes turns patiently during games and conversations.",
      "Resolves disagreements with peers using words rather than aggression.",
      "Respects established social rules and boundaries.",
      "Enjoys and thrives in group settings or team activities.",
      "Welcomes new or left-out children into their play group.",
      "Maintains stable, ongoing friendships over time.",
      "Treats peers, elders, and authorities with consistent respect.",
    ],
  },
  {
    key: "J",
    label: "Temperament & Personality",
    emoji: "🌈",
    maxScore: 50,
    questions: [
      "Energized by meeting new people and interacting in large groups.",
      "Enthusiastically embraces novel experiences and environments.",
      "Adapts smoothly to sudden changes in routines or plans.",
      "Enjoys busy social settings over quiet solitary activities.",
      "Stays remarkably calm and grounded under pressure or stress.",
      "Radiates a general sense of self-confidence and self-worth.",
      "Thinks through what they want to say before speaking out loud.",
      "Thrives best when following a predictable, structured routine.",
      "Approaches daily life with high energy, enthusiasm, and optimism.",
      "Displays steady, predictable emotional moods day-to-day.",
    ],
  },
];

// ─── Interest Inventory (Section K) ───

export interface InterestCluster {
  key: string;
  label: string;
  emoji: string;
  items: string[];
}

export const INTEREST_CLUSTERS: InterestCluster[] = [
  {
    key: "stem",
    label: "STEM & Logic",
    emoji: "🔬",
    items: ["Coding / Tech", "Robotics", "Science / Space", "Mathematics", "Engineering / Building", "Electronics / Circuits"],
  },
  {
    key: "arts",
    label: "Visual & Performing Arts",
    emoji: "🎨",
    items: ["Drawing / Painting", "Music / Instruments", "Singing / Voice", "Dancing", "Acting / Theater", "Photography / Video"],
  },
  {
    key: "humanities",
    label: "Humanities & Literacy",
    emoji: "📝",
    items: ["Reading / Literature", "Creative Writing", "Poetry / Lyrics", "Learning Languages", "History / Culture"],
  },
  {
    key: "nature",
    label: "Nature & Outdoors",
    emoji: "🌲",
    items: ["Animals / Zoology", "Gardening / Plants", "Hiking / Exploring", "Camping / Survival", "Environmentalism"],
  },
  {
    key: "crafting",
    label: "Hands-on Crafting",
    emoji: "🛠️",
    items: ["LEGO / Construction", "Woodworking / Tools", "Arts & Crafts / Sewing", "Model Kits / Clay"],
  },
  {
    key: "athletics",
    label: "Athletics & Movement",
    emoji: "⚽",
    items: ["Team Sports", "Individual Sports", "Martial Arts", "Cycling / Skating"],
  },
  {
    key: "digital",
    label: "Digital Media",
    emoji: "💻",
    items: ["Video Editing", "Graphic Design", "Game Development", "AI / Prompting"],
  },
  {
    key: "social",
    label: "Social & Community",
    emoji: "🤝",
    items: ["Teaching / Tutoring", "Helping / Volunteering", "Organizing / Hosting", "Student Leadership"],
  },
];

// ─── Scoring ───

export type ZoneLevel = "Outstanding" | "Strong" | "Emerging" | "Support";

export interface SectionResult {
  total: number;
  maxScore: number;
  zone: ZoneLevel;
  zoneColor: string;
  questions: number[];
}

export function getZone(total: number, maxScore: number): ZoneLevel {
  // Normalize to a 50-point scale for comparison
  const normalized = (total / maxScore) * 50;
  if (normalized >= 41) return "Outstanding";
  if (normalized >= 31) return "Strong";
  if (normalized >= 21) return "Emerging";
  return "Support";
}

export const ZONE_COLORS: Record<ZoneLevel, string> = {
  Outstanding: "bg-mint-500",
  Strong: "bg-sky-500",
  Emerging: "bg-sunny-400",
  Support: "bg-coral-400",
};

export const ZONE_LABELS: Record<ZoneLevel, string> = {
  Outstanding: "Outstanding Strength Zone",
  Strong: "Strong Development Zone",
  Emerging: "Emerging / Developing Zone",
  Support: "High-Support Zone",
};

export const ZONE_DESCRIPTIONS: Record<ZoneLevel, string> = {
  Outstanding: "Natural talent — prioritize providing resources here.",
  Strong: "Capable and reliable — a solid foundation to build on.",
  Emerging: "Normal age-appropriate growth occurring.",
  Support: "Needs scaffolding, gentle encouragement, or patience.",
};

// ─── Archetypes ───

export type ArchetypeLevel = "High" | "Medium+" | "Medium" | "Low" | "-";

export interface ArchetypePattern {
  A: ArchetypeLevel;
  B: ArchetypeLevel;
  C: ArchetypeLevel;
  D: ArchetypeLevel;
  E: ArchetypeLevel;
  F: ArchetypeLevel;
  G: ArchetypeLevel;
  H: ArchetypeLevel;
  I: ArchetypeLevel;
  J: ArchetypeLevel;
}

export interface ArchetypeDefinition {
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  pattern: ArchetypePattern;
  coreStrengths: string[];
  recommendedActivities: string[];
  learningStyle: string;
  interestClusters: string;
  supportGuidance: string;
}

export const ARCHETYPES: ArchetypeDefinition[] = [
  {
    name: "The Curious Explorer",
    emoji: "🔭",
    tagline: "Always asking 'why' — and going to find out",
    description: "This child is driven by an irresistible need to understand the world. They ask layered questions, seek deep explanations, and will happily spend an afternoon dissecting how something works.",
    pattern: { A: "High", B: "Medium+", C: "Medium", D: "-", E: "-", F: "-", G: "High", H: "Medium", I: "-", J: "-" },
    coreStrengths: [
      "Asks insightful, multi-layered questions",
      "Pursues knowledge independently across many domains",
      "Notices details others overlook",
      "Comfortable with ambiguity and open-ended exploration",
    ],
    recommendedActivities: [
      "Science museum memberships and maker spaces",
      "Junior naturalist programmes and nature journals",
      "Research projects on topics they choose",
      "Subscription boxes (science, engineering, geography)",
    ],
    learningStyle: "Hands-on discovery, field trips, documentaries, project-based learning, access to books and resources on topics of passion.",
    interestClusters: "STEM & Logic · Nature & Outdoors · Humanities & Literacy",
    supportGuidance: "May need gentle nudges to finish projects before starting new ones. Encourage connecting curiosity to persistence to deepen mastery.",
  },
  {
    name: "The Creative Innovator",
    emoji: "🎨",
    tagline: "Inventing tomorrow from today's cardboard box",
    description: "This child lives in a world of original ideas. They don't copy — they invent. Elaborate imaginary worlds, unexpected combinations of materials, and storytelling that surprises even adults characterise their play.",
    pattern: { A: "High", B: "-", C: "High", D: "Medium+", E: "-", F: "-", G: "Medium", H: "Low", I: "-", J: "-" },
    coreStrengths: [
      "Generates highly original ideas and solutions",
      "Invents games, rules, and imaginary worlds spontaneously",
      "Combines unrelated concepts in unusual ways",
      "Strong visual-spatial and narrative thinking",
    ],
    recommendedActivities: [
      "Art classes, craft workshops, and maker clubs",
      "Stop-motion animation or comic-creation tools",
      "Drama and improv classes",
      "Coding for creative output (Scratch, game design)",
    ],
    learningStyle: "Open-ended projects, choice in how to demonstrate knowledge, arts integration, story-based learning, minimal rigid structure.",
    interestClusters: "Visual & Performing Arts · Hands-on Crafting · Digital Media · Humanities & Literacy",
    supportGuidance: "Executive function scaffolding helps translate creative ideas into finished work. Try breaking big projects into small milestones with visual checklists.",
  },
  {
    name: "The Determined Achiever",
    emoji: "🏆",
    tagline: "Sets the goal. Does the work. Gets it done.",
    description: "Persistence is this child's defining quality. They set targets, work through frustration, and see long projects through to completion. They are often self-motivated, responsible, and highly dependable.",
    pattern: { A: "Medium+", B: "High", C: "-", D: "-", E: "-", F: "Medium+", G: "High", H: "High", I: "-", J: "-" },
    coreStrengths: [
      "Exceptional follow-through on long-term tasks",
      "Manages frustration and rebounds from setbacks",
      "Highly self-organised and responsible",
      "Takes ownership of goals without external pressure",
    ],
    recommendedActivities: [
      "Competitive sports, martial arts, or chess clubs",
      "Long-term instrument learning (guitar, piano)",
      "Science fair projects or Lego competitions",
      "Reading series (books 1 through 10)",
    ],
    learningStyle: "Goal-setting frameworks, mastery-based challenges, long-term projects with clear milestones, environments that reward effort over outcome.",
    interestClusters: "Athletics & Movement · STEM & Logic · any domain they commit to",
    supportGuidance: "Help them distinguish productive persistence from unhealthy perfectionism. Ensure they have genuine downtime and learn to value rest and play as restoration, not failure.",
  },
  {
    name: "The Empathetic Leader",
    emoji: "🌟",
    tagline: "The one everyone wants on their team",
    description: "This child combines emotional attunement with natural leadership instincts. They organise, encourage, mediate conflicts, and advocate for fairness — often before adults notice there was a problem.",
    pattern: { A: "-", B: "Medium+", C: "-", D: "High", E: "High", F: "High", G: "-", H: "-", I: "High", J: "-" },
    coreStrengths: [
      "Reads social situations accurately and responds wisely",
      "Inspires and motivates others without being bossy",
      "Mediates conflicts and restores group harmony",
      "Advocates for fairness and inclusion",
    ],
    recommendedActivities: [
      "Student council, junior leadership programmes",
      "Community volunteering and mentoring younger children",
      "Debate clubs or model UN",
      "Team sports where they can captain",
    ],
    learningStyle: "Collaborative projects, student leadership roles, real responsibilities within family and community, discussions about ethics and social issues.",
    interestClusters: "Social & Community · Humanities & Literacy · Athletics (team sports)",
    supportGuidance: "Teach healthy boundaries — empathetic leaders often carry others' emotional weight at cost to themselves. Ensure they have time for personal reflection and self-care.",
  },
  {
    name: "The Social Connector",
    emoji: "🤝",
    tagline: "Knows everyone, brings everyone together",
    description: "This child is energised by people. They form friendships quickly, draw others into their play naturally, and communicate with warmth and confidence. They are often the social glue in a classroom or neighbourhood.",
    pattern: { A: "-", B: "-", C: "-", D: "High", E: "High", F: "Medium", G: "-", H: "-", I: "High", J: "-" },
    coreStrengths: [
      "Forms and maintains close friendships with ease",
      "Communicates clearly and warmly with both peers and adults",
      "Reads social cues accurately",
      "Creates inclusive environments naturally",
    ],
    recommendedActivities: [
      "Drama, improv, and public speaking clubs",
      "Team sports and group games",
      "Community projects and school events",
      "Social skills and leadership camps",
    ],
    learningStyle: "Group projects, discussion-based learning, collaborative storytelling, community-based activities, peer teaching.",
    interestClusters: "Social & Community · Performing Arts · Humanities & Literacy",
    supportGuidance: "May struggle with solitary focused tasks or independent study. Build in quiet solo time gradually. Help them develop comfort with independent reflection.",
  },
  {
    name: "The Analytical Problem-Solver",
    emoji: "🧩",
    tagline: "There's a logical solution — let me find it",
    description: "This child approaches the world systematically. They break problems into parts, look for patterns, and are rarely satisfied with a vague answer. They may seem quiet in social settings but are highly engaged when working through puzzles.",
    pattern: { A: "High", B: "High", C: "Medium", D: "-", E: "Medium", F: "-", G: "-", H: "High", I: "Low", J: "-" },
    coreStrengths: [
      "Exceptional logical and sequential reasoning",
      "Highly organised and methodical in approach",
      "Excellent working memory and planning skills",
      "Thrives on complexity and precision",
    ],
    recommendedActivities: [
      "Coding clubs, hackathons, and Raspberry Pi projects",
      "Chess, logic puzzles, and strategy games",
      "Math olympiad preparation",
      "Robotics competitions (FIRST LEGO League, etc.)",
    ],
    learningStyle: "Step-by-step instruction followed by independent exploration, puzzles and games, coding, mathematics, structured environments with clear rules.",
    interestClusters: "STEM & Logic · Mathematics · Coding/Tech · Robotics",
    supportGuidance: "Social and emotional expression may need intentional nurturing. Encourage activities that blend logic with collaboration. Help them learn to share reasoning accessibly.",
  },
  {
    name: "The Performing Artist",
    emoji: "🎭",
    tagline: "Born to express, create, and captivate",
    description: "This child lives to express. Through music, drama, dance, or visual art, they channel their inner world outward — and they do it with an instinct that goes beyond practice.",
    pattern: { A: "-", B: "Medium", C: "High", D: "High", E: "High", F: "-", G: "-", H: "-", I: "Medium+", J: "-" },
    coreStrengths: [
      "Exceptional expressive ability across one or more art forms",
      "Highly attuned to mood, atmosphere, and emotional nuance",
      "Communicates feelings through creative work",
      "Captivates audiences naturally",
    ],
    recommendedActivities: [
      "Drama classes, school productions, community theatre",
      "Music lessons and ensemble groups",
      "Dance classes and recitals",
      "Art classes, photography, or video production",
    ],
    learningStyle: "Performance opportunities, creative freedom, audience and feedback, mentorship from skilled practitioners, space for emotional exploration through art.",
    interestClusters: "Visual & Performing Arts · Music · Acting/Theater · Dancing · Singing",
    supportGuidance: "May struggle with performance anxiety or heavy criticism. Build resilience through a growth mindset framing of creative work. Connect school subjects to creative output.",
  },
  {
    name: "The Compassionate Helper",
    emoji: "💛",
    tagline: "First to notice, first to help",
    description: "This child notices when someone is sad before anyone else does, and is already there with a kind word or a gesture. They are deeply caring, often quiet in their generosity, and draw enormous satisfaction from being of service.",
    pattern: { A: "-", B: "Medium", C: "-", D: "-", E: "High", F: "Low", G: "Medium", H: "-", I: "High", J: "-" },
    coreStrengths: [
      "Deep empathy and sensitivity to others' emotional states",
      "Spontaneous acts of kindness and care",
      "Patient and attentive to those who are struggling",
      "Builds trust easily through warmth and consistency",
    ],
    recommendedActivities: [
      "Volunteering and community service",
      "Animal care, fostering, or zoology",
      "Reading and discussing books about social issues",
      "Peer mentoring or reading buddy programmes",
    ],
    learningStyle: "Meaningful real-world tasks, cooperative projects, roles that involve helping others, mentorship from caring adult role models.",
    interestClusters: "Social & Community · Nature (Animals/Zoology) · Humanities & Literacy",
    supportGuidance: "May suppress their own needs in service of others. Actively teach self-advocacy and assertiveness. Help them identify their own goals and interests beyond caring for others.",
  },
  {
    name: "The Independent Builder",
    emoji: "🛠️",
    tagline: "Give me the materials and get out of the way",
    description: "This child is happiest with their hands busy making something real. They are resourceful, patient with physical tasks, and take enormous pride in completing tangible projects.",
    pattern: { A: "-", B: "High", C: "Medium+", D: "-", E: "-", F: "-", G: "High", H: "Medium+", I: "Low", J: "-" },
    coreStrengths: [
      "Highly resourceful and self-reliant",
      "Excellent spatial and practical problem-solving",
      "Patient with physical, hands-on tasks",
      "Strong sense of pride in tangible output",
    ],
    recommendedActivities: [
      "Woodworking, metalworking, or electronics workshops",
      "Maker spaces and fabrication labs",
      "LEGO Technics, model kits, and engineering sets",
      "Coding with physical outputs (Arduino, circuits)",
    ],
    learningStyle: "Project-based learning, vocational and practical subjects, maker spaces, mentorship from skilled craftspeople, freedom to design their own process.",
    interestClusters: "Hands-on Crafting · Engineering/Building · LEGO/Construction · Woodworking",
    supportGuidance: "Collaborative work and verbal communication may feel uncomfortable. Pair group projects with a role that plays to their making strengths. Celebrate their practical intelligence explicitly.",
  },
  {
    name: "The Creative Divergent Thinker",
    emoji: "💡",
    tagline: "Ideas everywhere — execution is a work in progress",
    description: "This child generates more ideas in one afternoon than most people do in a week. Their mind makes leaps, connections, and creative associations at speed.",
    pattern: { A: "High", B: "Low", C: "High", D: "High", E: "-", F: "-", G: "Low", H: "Low", I: "-", J: "-" },
    coreStrengths: [
      "Exceptional divergent and lateral thinking",
      "Rich, imaginative inner world",
      "Makes unexpected conceptual connections",
      "High verbal and expressive ability",
    ],
    recommendedActivities: [
      "Mind-mapping and visual journaling",
      "Coding for games, stories, or animation (Scratch, Twine)",
      "Improv and creative writing",
      "Design challenges with a real-world brief",
    ],
    learningStyle: "Short, stimulating tasks with variety, creative choice in how to demonstrate understanding, visual organising tools, scaffolded project management support.",
    interestClusters: "Digital Media · Visual & Performing Arts · Humanities & Literacy · STEM (ideas-led)",
    supportGuidance: "Executive function scaffolding is essential. Use visual timers, task boards, and 'finish before start' rules. Frame organisation as the tool that sets their ideas free.",
  },
];

// ─── Archetype Matching ───

const LEVEL_WEIGHTS: Record<ArchetypeLevel, number> = {
  High: 4,
  "Medium+": 3,
  Medium: 2,
  Low: 1,
  "-": 0,
};

export interface ArchetypeMatch {
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  coreStrengths: string[];
  recommendedActivities: string[];
  learningStyle: string;
  interestClusters: string;
  supportGuidance: string;
  matchStrength: number; // 0–100
}

export function matchArchetypes(
  sectionResults: Record<string, SectionResult>,
  selectedInterests: string[]
): ArchetypeMatch[] {
  const matches: ArchetypeMatch[] = ARCHETYPES.map((arch) => {
    let totalWeight = 0;
    let matchedDefining = 0;
    let totalDefining = 0;

    for (const section of SECTIONS) {
      const sectionKey = section.key;
      const sk = sectionKey as keyof ArchetypePattern;
      const expectedLevel = arch.pattern[sk];
      if (expectedLevel === "-") continue;

      totalDefining++;
      const result = sectionResults[sectionKey];
      if (!result) continue;

      // Convert actual zone to weight
      const actualWeight = ZONE_TO_WEIGHT[result.zone];
      const expectedWeight = LEVEL_WEIGHTS[expectedLevel];

      // Score based on how close actual is to expected
      const diff = Math.abs(actualWeight - expectedWeight);
      if (diff <= 1) {
        matchedDefining++;
        totalWeight += 4 - diff; // 0 diff = 4 points, 1 diff = 3 points
      }
    }

    // Boost for interest cluster overlap
    const interestBoost = countInterestOverlap(selectedInterests, arch.interestClusters);

    // Calculate match strength (0–100)
    // definingPct: how many defining sections matched well (50%)
    // weightAccuracy: how close the match was per section (35%)
    // interestBoost: interest overlap bonus (15%)
    const definingPct = totalDefining > 0 ? matchedDefining / totalDefining : 0;
    const weightAccuracy = matchedDefining > 0 ? totalWeight / (matchedDefining * 4) : 0;
    const interestFraction = Math.min(interestBoost / 3, 1);

    const matchStrength = Math.round(
      definingPct * 50 + weightAccuracy * 35 + interestFraction * 15
    );

    return {
      name: arch.name,
      emoji: arch.emoji,
      tagline: arch.tagline,
      description: arch.description,
      coreStrengths: arch.coreStrengths,
      recommendedActivities: arch.recommendedActivities,
      learningStyle: arch.learningStyle,
      interestClusters: arch.interestClusters,
      supportGuidance: arch.supportGuidance,
      matchStrength,
    };
  });

  // Sort by match strength descending, return top 3
  return matches
    .sort((a, b) => b.matchStrength - a.matchStrength)
    .slice(0, 3)
    .filter((m) => m.matchStrength > 20); // filter weak matches
}

const ZONE_TO_WEIGHT: Record<ZoneLevel, number> = {
  Outstanding: 4,
  Strong: 3,
  Emerging: 2,
  Support: 1,
};

function countInterestOverlap(selected: string[], interestClusterStr: string): number {
  // interestClusterStr is like "STEM & Logic · Nature & Outdoors · Humanities & Literacy"
  const clusterLabels = interestClusterStr.split(" · ").map((s) => s.trim());

  let overlap = 0;
  for (const selectedItem of selected) {
    for (const cluster of INTEREST_CLUSTERS) {
      if (cluster.items.includes(selectedItem) && clusterLabels.includes(cluster.label)) {
        overlap++;
        break;
      }
      // Also check if the selected item matches the emoji prefix
      if (selectedItem.includes(cluster.key) && clusterLabels.includes(cluster.label)) {
        overlap++;
        break;
      }
    }
  }

  return Math.min(5, overlap);
}
