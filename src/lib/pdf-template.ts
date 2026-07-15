interface SectionScore {
  key: string;
  label: string;
  emoji: string;
  total: number;
  maxScore: number;
  zone: string;
  framework?: string;
  professor?: string;
  parentGuidance?: string;
}

interface ArchetypeData {
  name: string;
  emoji: string;
  tagline: string;
  matchStrength: number;
  description: string;
  coreStrengths: string[];
  recommendedActivities: string[];
  learningStyle: string;
  supportGuidance: string;
}

interface PdfData {
  childName: string;
  assessmentDate: string;
  overallScore: number;
  maxScore: number;
  overallPct: number;
  sectionScores: SectionScore[];
  interests: string[];
  archetypes: ArchetypeData[];
}

const ZONE_LABELS: Record<string, string> = {
  Outstanding: "Outstanding",
  Strong: "Strong",
  Emerging: "Emerging",
  Support: "Support",
};

const ZONE_BG: Record<string, string> = {
  Outstanding: "#d1fae5",
  Strong: "#e0f2fe",
  Emerging: "#fef3c7",
  Support: "#ffe4e6",
};

const ZONE_FG: Record<string, string> = {
  Outstanding: "#059669",
  Strong: "#0ea5e9",
  Emerging: "#d97706",
  Support: "#ec4899",
};

export function buildResultsHTML(data: PdfData): string {
  const {
    childName,
    assessmentDate,
    overallScore,
    maxScore,
    overallPct,
    sectionScores,
    interests,
    archetypes,
  } = data;

  const verdict =
    overallPct >= 70
      ? "Excellent!"
      : overallPct >= 40
        ? "Good progress"
        : "Growing";

  // Section scores rows
  const sectionRows = sectionScores
    .map((s) => {
      const pct = Math.round((s.total / s.maxScore) * 100);
      const bg = ZONE_BG[s.zone] || "#f1f5f9";
      const fg = ZONE_FG[s.zone] || "#64748b";
      const label = ZONE_LABELS[s.zone] || s.zone;
      return `
        <tr>
          <td style="padding:6px 8px;font-weight:600;color:#334155;font-size:13px;">${s.emoji} ${s.key} — ${s.label}</td>
          <td style="padding:6px 8px;color:#475569;font-size:13px;">${s.total}/${s.maxScore}</td>
          <td style="padding:6px 8px;">
            <span style="background:${bg};color:${fg};padding:2px 10px;border-radius:12px;font-size:11px;font-weight:600;">${label}</span>
          </td>
          <td style="padding:6px 8px;text-align:right;color:#64748b;font-size:13px;">${pct}%</td>
        </tr>
        ${s.framework ? `<tr><td colspan="4" style="padding:0 8px 6px 8px;font-size:9px;color:#94a3b8;">${s.framework} — ${s.professor || ""}</td></tr>` : ""}`;
    })
    .join("");

  // Archetype cards
  const archetypeCards = archetypes
    .map((arch, i) => {
      const isPrimary = i === 0;
      const cardBg = isPrimary ? "#fdf2f8" : "#f0f9ff";
      const accentColor = isPrimary ? "#ec4899" : "#0ea5e9";
      const barBg = isPrimary
        ? "linear-gradient(90deg, #ec4899, #a855f7, #0ea5e9)"
        : "linear-gradient(90deg, #0ea5e9, #a855f7)";

      const strengthsList = arch.coreStrengths
        .map(
          (s) =>
            `<li style="margin-bottom:4px;font-size:12px;color:#334155;"><span style="color:${isPrimary ? "#ec4899" : "#0ea5e9"};margin-right:6px;">✦</span>${s}</li>`
        )
        .join("");

      const activitiesList = arch.recommendedActivities
        .map(
          (a) =>
            `<li style="margin-bottom:4px;font-size:12px;color:#334155;"><span style="color:#0ea5e9;margin-right:6px;">✦</span>${a}</li>`
        )
        .join("");

      return `
        <div style="background:${cardBg};border-radius:16px;padding:20px;margin-bottom:16px;border-left:4px solid ${accentColor};">
          <!-- Header -->
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
            <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(13deg, ${isPrimary ? "#fecdd3" : "#e0f2fe"}, ${isPrimary ? "#e9d5ff" : "#e9d5ff"});display:flex;align-items:center;justify-content:center;font-size:24px;">
              ${arch.emoji}
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:16px;font-weight:800;color:#1e293b;">${arch.name}</span>
                ${isPrimary ? `<span style="background:#fef2f2;color:#ec4899;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;">⭐ Best Match</span>` : ""}
              </div>
              <div style="font-size:12px;color:#64748b;font-style:italic;">&ldquo;${arch.tagline}&rdquo; — ${arch.matchStrength}% match</div>
            </div>
          </div>

          <!-- Match bar -->
          <div style="background:#e2e8f0;border-radius:8px;height:8px;margin-bottom:12px;">
            <div style="background:${barBg};border-radius:8px;height:8px;width:${arch.matchStrength}%;"></div>
          </div>

          <!-- Description -->
          <p style="font-size:12px;color:#475569;margin:0 0 14px 0;line-height:1.5;">${arch.description}</p>

          <!-- Strengths + Activities -->
          <div style="display:flex;gap:16px;margin-bottom:14px;">
            <div style="flex:1;">
              <h4 style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 6px 0;">💎 Core Strengths</h4>
              <ul style="margin:0;padding-left:16px;">${strengthsList}</ul>
            </div>
            <div style="flex:1;">
              <h4 style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 6px 0;">🎯 Recommended Activities</h4>
              <ul style="margin:0;padding-left:16px;">${activitiesList}</ul>
            </div>
          </div>

          <!-- Learning Style -->
          <div style="background:linear-gradient(90deg, #f0f9ff, #f5f3ff);border-radius:12px;padding:12px;margin-bottom:8px;">
            <h4 style="font-size:10px;font-weight:700;color:#0ea5e9;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 4px 0;">📖 How They Learn Best</h4>
            <p style="font-size:12px;color:#334155;margin:0;line-height:1.5;">${arch.learningStyle}</p>
          </div>

          <!-- Support Guidance -->
          <div style="background:linear-gradient(90deg, #fff7ed, #fefce8);border-radius:12px;padding:12px;">
            <h4 style="font-size:10px;font-weight:700;color:#ec4899;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 4px 0;">💡 What They May Need Support With</h4>
            <p style="font-size:12px;color:#334155;margin:0;line-height:1.5;">${arch.supportGuidance}</p>
          </div>
        </div>`;
    })
    .join("");

  // Interest tags
  const interestTags = interests
    .map(
      (item) =>
        `<span style="background:#ede9fe;color:#9333ea;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600;display:inline-block;margin:3px 4px 3px 0;">${item}</span>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #1e293b;
      background: #fff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    @page {
      size: A4;
      margin: 15mm;
    }

    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>
  <!-- HEADER -->
  <div style="background:linear-gradient(135deg, #ec4899, #ec4899);border-radius:12px;padding:20px 24px;margin-bottom:20px;">
    <h1 style="color:#fff;font-size:22px;font-weight:800;text-align:center;margin-bottom:4px;">LumeoKids Assessment Results</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:12px;text-align:center;">Strengths &amp; Learning Archetype Report</p>
  </div>

  <!-- CHILD INFO BAR -->
  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 16px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
    <div>
      <div style="font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Child</div>
      <div style="font-size:15px;font-weight:700;color:#1e293b;">${childName}</div>
    </div>
    <div style="text-align:center;">
      <div style="font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Date</div>
      <div style="font-size:13px;color:#475569;">${assessmentDate}</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Score</div>
      <div style="font-size:16px;font-weight:800;color:#ec4899;">${overallScore}/${maxScore} (${overallPct}%)</div>
    </div>
  </div>

  <!-- OVERALL SCORE -->
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:20px;text-align:center;">
    <div style="display:inline-block;position:relative;width:90px;height:90px;margin-bottom:8px;">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r="38" fill="none" stroke="#e2e8f0" stroke-width="7"/>
        <circle cx="45" cy="45" r="38" fill="none" stroke="#ec4899" stroke-width="7"
          stroke-dasharray="${(overallPct / 100) * 238.76} 238.76"
          stroke-linecap="round"
          transform="rotate(-90 45 45)"/>
      </svg>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:20px;font-weight:800;color:#ec4899;">${overallPct}%</div>
    </div>
    <div style="font-size:16px;font-weight:700;color:#334155;">Overall Score</div>
    <div style="font-size:28px;font-weight:800;color:#1e293b;">${overallScore} <span style="font-size:16px;color:#94a3b8;font-weight:400;">/ ${maxScore}</span></div>
    <div style="font-size:13px;color:#64748b;margin-top:4px;">${verdict}</div>
  </div>

  <!-- SECTION SCORES -->
  <div style="margin-bottom:20px;">
    <h2 style="font-size:16px;font-weight:800;color:#334155;margin-bottom:8px;">📊 Section Scores</h2>
    <div style="border-bottom:1px solid #e2e8f0;margin-bottom:8px;"></div>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left;padding:4px 8px;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Section</th>
          <th style="text-align:left;padding:4px 8px;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Score</th>
          <th style="text-align:left;padding:4px 8px;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Zone</th>
          <th style="text-align:right;padding:4px 8px;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;">%</th>
        </tr>
      </thead>
      <tbody>
        ${sectionRows}
      </tbody>
    </table>
  </div>

  <!-- PARENT GUIDANCE -->
  <div class="page-break"></div>
  <div style="margin-bottom:20px;">
    <h2 style="font-size:16px;font-weight:800;color:#334155;margin-bottom:8px;">💡 Parent Guidance by Domain</h2>
    <div style="border-bottom:1px solid #e2e8f0;margin-bottom:10px;"></div>
    ${sectionScores
      .filter((s) => s.parentGuidance)
      .map(
        (s) => `
      <div style="background:#f8fafc;border-radius:10px;padding:10px 14px;margin-bottom:8px;border-left:3px solid ${ZONE_FG[s.zone] || "#94a3b8"};">
        <div style="font-size:12px;font-weight:700;color:#334155;margin-bottom:3px;">${s.emoji} ${s.key} — ${s.label}</div>
        <div style="font-size:10px;color:#475569;line-height:1.5;">${s.parentGuidance}</div>
      </div>`
      )
      .join("")}
  </div>

  <!-- INTEREST TAGS -->
  ${interests.length > 0 ? `
  <div style="margin-bottom:20px;">
    <h2 style="font-size:16px;font-weight:800;color:#334155;margin-bottom:8px;">📋 Interest Inventory</h2>
    <div style="border-bottom:1px solid #e2e8f0;margin-bottom:10px;"></div>
    <div>${interestTags}</div>
  </div>` : ""}

  <!-- ARCHETYPES -->
  ${archetypes.length > 0 ? `
  <div class="page-break"></div>
  <div style="margin-bottom:20px;">
    <h2 style="font-size:16px;font-weight:800;color:#334155;margin-bottom:12px;">🎯 Learning Archetype${archetypes.length > 1 ? "s" : ""}</h2>
    ${archetypeCards}
  </div>` : ""}

  <!-- FOOTER -->
  <div style="border-top:1px solid #e2e8f0;padding-top:10px;margin-top:24px;">
    <p style="text-align:center;font-size:10px;color:#94a3b8;">Generated by LumeoKids — AI-powered learning for children</p>
  </div>
</body>
</html>`;
}
