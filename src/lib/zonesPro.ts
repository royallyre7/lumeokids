import { ZoneLevel } from "./archetypes";

export interface ZoneMeta {
  label: string;
  description: string;
  parentGuidance: string;
  educatorGuidance: string;
}

export const ZONES_PRO: Record<ZoneLevel, ZoneMeta> = {
  Outstanding: {
    label: "Outstanding Strength Zone",
    description:
      "Child shows strong, above-age development in this area with consistent behaviours and skills.",
    parentGuidance:
      "Provide rich opportunities, resources, and challenges. Protect this strength from burnout or overuse.",
    educatorGuidance:
      "Offer extension activities, leadership roles, and deeper exploration. Use this domain to anchor motivation.",
  },
  Strong: {
    label: "Strong Development Zone",
    description:
      "Child demonstrates reliable, age-appropriate skills with room for further refinement and challenge.",
    parentGuidance:
      "Encourage practice and variety. Celebrate effort and growth, not just outcomes.",
    educatorGuidance:
      "Use this domain as a stable base for learning. Introduce moderate challenges and cross-domain integration.",
  },
  Emerging: {
    label: "Emerging / Developing Zone",
    description:
      "Child is building skills in this area at a normal developmental pace.",
    parentGuidance:
      "Offer gentle scaffolding, patience, and low-pressure practice. Avoid comparison with other children.",
    educatorGuidance:
      "Provide structured support, clear instructions, and repeated opportunities to practice in safe contexts.",
  },
  Support: {
    label: "High-Support Zone",
    description:
      "Child may find this area challenging and benefits from intentional, consistent support.",
    parentGuidance:
      "Focus on encouragement, small wins, and emotional safety. Do not frame this as a deficit or failure.",
    educatorGuidance:
      "Use scaffolding, visual aids, and step-by-step guidance. Collaborate with parents on targeted strategies.",
  },
};
