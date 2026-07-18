// ============================================================
// Homework PDF HTML Template
// ============================================================
// Generates a 10-page A4 PDF matching Child Development practice sheet layout.
// Each page has: header, instruction, content, page number.

import type { HomeworkPage } from "./types";

// ============================================================
// Page Renderers — each exercise type → HTML string
// ============================================================

function renderAssociationPage(page: HomeworkPage): string {
  const d = page.data as any;
  const pairs = d.pairs || [];
  const distractors = d.distractors || [];

  return `
    <div class="exercise-grid">
      ${pairs.map((p: any, i: number) => `
        <div class="exercise-quadrant">
          <div class="quadrant-label">${i + 1}</div>
          <div class="item-box">
            ${p.image?.imageUrl
              ? `<img src="${p.image.imageUrl}" class="item-image" />`
              : `<div class="item-placeholder">${p.item}</div>`
            }
          </div>
          <div class="arrow-down">↓</div>
          <div class="options-row">
            ${[p.match, ...distractors.slice(0, 2)].map((opt: string) => `
              <div class="option-box">${opt}</div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderAdditionGridPage(page: HomeworkPage): string {
  const d = page.data as any;
  const topNums = d.topNumbers || [2, 5, 7, 3, 9, 6, 1, 8];
  const sideNums = d.sideNumbers || [4, 9, 6, 2, 7, 1, 5, 8];

  return `
    <table class="math-grid">
      <thead>
        <tr>
          <th class="grid-header">+</th>
          ${topNums.map((n: number) => `<th class="grid-header">${n}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${sideNums.map((n: number) => `
          <tr>
            <th class="grid-header">${n}</th>
            ${topNums.map(() => `<td class="grid-cell"></td>`).join("")}
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderNumberFlowPage(page: HomeworkPage): string {
  const d = page.data as any;
  const size = d.gridSize || 3;
  const given = d.givenNumbers || [];

  return `
    <div class="flow-instruction">
      Fill in the missing numbers from 1-${d.maxNumber} into the box.
      Numbers can flow above, below or beside each other.
    </div>
    <table class="flow-grid" style="grid-template-columns: repeat(${size}, 60px)">
      ${Array.from({ length: size }, (_, r) => `
        <tr>
          ${Array.from({ length: size }, (_, c) => {
            const given_num = given.find((g: any) => g.row === r && g.col === c);
            return `<td class="flow-cell">${given_num ? given_num.value : ""}</td>`;
          }).join("")}
        </tr>
      `).join("")}
    </table>
  `;
}

function renderShapeCodePage(page: HomeworkPage): string {
  const d = page.data as any;
  const codeKey = d.codeKey || [];
  const questions = d.questions || [];

  return `
    <div class="code-section">
      <div class="code-key">
        ${codeKey.map((k: any) => `
          <div class="code-item">
            <span class="code-shape">${k.shape}</span>
            <span class="code-letter">${k.letter}</span>
          </div>
        `).join("")}
      </div>
      <div class="code-questions">
        ${questions.map((q: any, i: number) => `
          <div class="code-question">
            <span class="q-number">(${i + 1})</span>
            <div class="q-shapes">
              ${q.shapes.map((s: string) => `<span class="q-shape">${s}</span>`).join("")}
            </div>
            <span class="q-bracket">( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</span>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderVocabularyPage(page: HomeworkPage): string {
  const d = page.data as any;
  const items = d.items || [];

  return `
    <div class="vocab-grid">
      ${items.map((item: any) => `
        <div class="vocab-item">
          ${item.image?.imageUrl
            ? `<img src="${item.image.imageUrl}" class="vocab-image" />`
            : `<div class="vocab-placeholder">${item.name}</div>`
          }
          <div class="vocab-bracket">( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderShapePatternsPage(page: HomeworkPage): string {
  const d = page.data as any;
  const quadrants = d.quadrants || [];

  return `
    <div class="patterns-grid">
      ${quadrants.map((q: any, qi: number) => `
        <div class="pattern-quadrant">
          <table class="pattern-table">
            ${q.grid.map((row: (string | null)[]) => `
              <tr>
                ${row.map((cell: string | null) => `
                  <td class="pattern-cell">${cell || ""}</td>
                `).join("")}
              </tr>
            `).join("")}
          </table>
        </div>
      `).join("")}
    </div>
  `;
}

function renderDirectionFollowPage(page: HomeworkPage): string {
  const d = page.data as any;
  const arrows = d.arrows || [];

  return `
    <div class="direction-section">
      <div class="arrow-sequence">
        <span class="seq-label">Start</span>
        ${arrows.map((a: string) => `<span class="arrow-box">${a}</span>`).join("")}
      </div>
      <div class="direction-grid">
        <p>Follow the arrows from the Start to find the ${d.targetItem || "target"}.</p>
      </div>
    </div>
  `;
}

function renderBlockCountingPage(page: HomeworkPage): string {
  const d = page.data as any;
  return `
    <div class="block-section">
      <p class="block-instruction">Count the blocks and complete the equations. Write down the answers in the brackets.</p>
      <div class="block-equations">
        ${d.groups?.map((g: any, i: number) => `
          <div class="block-group">
            <span class="block-count">(${i + 1})</span>
            <div class="block-visual">
              <!-- 3D block SVG would go here -->
              <svg width="120" height="80" viewBox="0 0 120 80">
                ${Array.from({ length: Math.min(g.count, 12) }, (_, j) => {
                  const x = (j % 4) * 25;
                  const y = Math.floor(j / 4) * 25;
                  return `
                    <rect x="${x}" y="${y}" width="20" height="20" fill="#e0e0e0" stroke="#333" stroke-width="1"/>
                    <rect x="${x + 3}" y="${y - 3}" width="20" height="20" fill="#f5f5f5" stroke="#333" stroke-width="1"/>
                  `;
                }).join("")}
              </svg>
            </div>
            <span class="block-answer">( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</span>
          </div>
        `).join("") || ""}
      </div>
    </div>
  `;
}

function renderCreatureAssemblyPage(page: HomeworkPage): string {
  const d = page.data as any;
  return `
    <div class="creature-section">
      <p class="creature-instruction">Study the creature below and write the animal that each body part represents in the respective boxes.</p>
      ${d.creatureImage?.imageUrl
        ? `<img src="${d.creatureImage.imageUrl}" class="creature-image" />`
        : `<div class="creature-placeholder">${d.creature || "Creature"}</div>`
      }
      <table class="creature-table">
        <thead>
          <tr>
            ${d.parts?.map((p: any) => `<th>${p.part}</th>`).join("") || ""}
          </tr>
        </thead>
        <tbody>
          <tr>
            ${d.parts?.map(() => `<td class="creature-cell"></td>`).join("") || ""}
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderLogicAssociationPage(page: HomeworkPage): string {
  const d = page.data as any;
  return `
    <div class="logic-section">
      <p class="logic-instruction">Study the pictures in the left columns and apply the same logic to complete the exercise on the right.</p>
      <table class="logic-table">
        ${d.questions?.map((q: any) => `
          <tr>
            <td class="logic-item">
              ${q.image?.imageUrl
                ? `<img src="${q.image.imageUrl}" class="logic-image" />`
                : `<span>${q.item}</span>`
              }
            </td>
            <td class="logic-options">${q.options?.join(", ") || ""}</td>
          </tr>
        `).join("") || ""}
      </table>
    </div>
  `;
}

function renderVegetableClassPage(page: HomeworkPage): string {
  const d = page.data as any;
  return `
    <div class="veg-section">
      <p class="veg-instruction">From the box on the left, select the vegetables and write them in the boxes that fit the respective descriptions.</p>
      <div class="veg-grid">
        ${d.vegetables?.map((v: any) => `
          <div class="veg-item">
            ${v.image?.imageUrl
              ? `<img src="${v.image.imageUrl}" class="veg-image" />`
              : `<div class="veg-placeholder">🥬</div>`
            }
            <span class="veg-name">${v.name}</span>
          </div>
        `).join("") || ""}
      </div>
      <div class="veg-categories">
        ${d.categories?.map((cat: string, i: number) => `
          <div class="veg-category">
            <span class="cat-label">${i + 1}. ${cat}</span>
            <div class="cat-rows">
              <div class="cat-row">A &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div class="cat-row">B &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div class="cat-row">C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </div>
          </div>
        `).join("") || ""}
      </div>
    </div>
  `;
}

function renderCreativeWritingPage(page: HomeworkPage): string {
  const d = page.data as any;
  return `
    <div class="writing-section">
      <p class="writing-instruction">Write a story using these 5 items. You may use them randomly.</p>
      <div class="writing-items">
        ${d.items?.map((item: any) => `
          <div class="writing-item">
            ${item.image?.imageUrl
              ? `<img src="${item.image.imageUrl}" class="writing-image" />`
              : `<div class="writing-placeholder">${item.name}</div>`
            }
            <span class="writing-label">${item.name}</span>
          </div>
        `).join("") || ""}
      </div>
      <div class="writing-lines">
        ${Array.from({ length: 10 }, () => `<div class="writing-line"></div>`).join("")}
      </div>
    </div>
  `;
}

function renderStoryComprehensionPage(page: HomeworkPage): string {
  const d = page.data as any;
  return `
    <div class="story-section">
      <div class="story-box">
        <p>${d.story || ""}</p>
      </div>
      <div class="story-questions">
        ${d.questions?.map((q: any, i: number) => `
          <div class="story-question">
            <p class="sq-text">${i + 1}) ${q.question}</p>
            <div class="sq-options">
              ${q.options?.map((opt: string) => `
                <span class="sq-option">○ ${opt}</span>
              `).join("") || ""}
            </div>
          </div>
        `).join("") || ""}
      </div>
    </div>
  `;
}

function renderOverlapCountPage(page: HomeworkPage): string {
  const d = page.data as any;
  return `
    <div class="overlap-section">
      <p class="overlap-instruction">The ${d.shapeType || "shapes"} overlap one another. Find out how many of the letters are found in the overlapping areas and write them in the bracket provided.</p>
      <svg width="400" height="300" viewBox="0 0 400 300" class="overlap-svg">
        ${d.shapes?.map((s: any) => `
          ${d.shapeType === "circles"
            ? `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" fill="none" stroke="#333" stroke-width="1.5"/>`
            : `<polygon points="${s.cx},${s.cy - s.r} ${s.cx - s.r},${s.cy + s.r} ${s.cx + s.r},${s.cy + s.r}" fill="none" stroke="#333" stroke-width="1.5"/>`
          }
        `).join("") || ""}
        <!-- Letters scattered in overlap areas -->
        ${Array.from({ length: d.expectedCount || 8 }, (_, i) => {
          const angle = (i / (d.expectedCount || 8)) * Math.PI * 2;
          const r = 60 + Math.random() * 40;
          const cx = 200 + r * Math.cos(angle);
          const cy = 150 + r * Math.sin(angle);
          return `<text x="${cx}" y="${cy}" text-anchor="middle" font-size="14" font-family="sans-serif">${d.letter || "E"}</text>`;
        }).join("")}
      </svg>
      <div class="overlap-answer">( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</div>
    </div>
  `;
}

function renderSequenceCompletePage(page: HomeworkPage): string {
  const d = page.data as any;
  return `
    <div class="sequence-section">
      <p class="sequence-instruction">Study the rule in each row and complete the sequence.</p>
      ${d.sequences?.map((seq: any, i: number) => `
        <div class="sequence-row">
          <span class="seq-num">${i + 1}.</span>
          <div class="seq-cells">
            ${seq.items.map((item: number | string | null) => `
              <span class="seq-cell">${item !== null ? item : ""}</span>
            `).join("")}
          </div>
        </div>
      `).join("") || ""}
    </div>
  `;
}

function renderMandalaMemoryPage(page: HomeworkPage): string {
  const d = page.data as any;
  const isColored = d.colors && d.colors.length > 0;

  return `
    <div class="mandala-section">
      <svg width="300" height="300" viewBox="0 0 300 300" class="mandala-svg">
        <circle cx="150" cy="150" r="10" fill="#a78bfa" opacity="0.6"/>
        ${Array.from({ length: d.symmetry || 6 }, (_, i) => {
          const angle = (i / (d.symmetry || 6)) * Math.PI * 2;
          const x1 = 150 + 20 * Math.cos(angle);
          const y1 = 150 + 20 * Math.sin(angle);
          const x2 = 150 + 120 * Math.cos(angle);
          const y2 = 150 + 120 * Math.sin(angle);
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#e5e7eb" stroke-width="0.5" stroke-dasharray="3,3"/>`;
        }).join("")}
        ${d.sections?.map((s: any, i: number) => {
          const angle = (i / (d.symmetry || 6)) * Math.PI * 2;
          const dist = 40 + (i % 3) * 30;
          const x = 150 + dist * Math.cos(angle);
          const y = 150 + dist * Math.sin(angle);
          const color = isColored ? s.color : "#fff";
          return `<circle cx="${x}" cy="${y}" r="12" fill="${color}" stroke="#333" stroke-width="1"/>`;
        }).join("") || ""}
      </svg>
    </div>
  `;
}

// ============================================================
// Equal Division — Page 2
// ============================================================
function renderEqualDivisionPage(page: HomeworkPage): string {
  const d = page.data as any;
  const totalItems = d.totalItems || 8;
  const groups = d.groups || 4;
  const itemName = d.itemName || "item";

  // Emoji map for common items
  const emojiMap: Record<string, string> = {
    carrot: "🥕", apple: "🍎", star: "⭐", heart: "❤️",
    fish: "🐟", bird: "🐦", flower: "🌸", ball: "⚽",
  };
  const emoji = emojiMap[itemName] || "●";

  return `
    <div class="equal-division-section">
      <div class="eq-instruction">Divide the box into <strong>${groups}</strong> equal parts, each containing <strong>${Math.floor(totalItems / groups)}</strong> ${itemName}s.</div>
      <div class="eq-box">
        <div class="eq-items">
          ${Array.from({ length: totalItems }, () => `<span class="eq-item">${emoji}</span>`).join("")}
        </div>
        <div class="eq-lines-hint">
          ${Array.from({ length: groups - 1 }, () => `<div class="eq-dashed-line"></div>`).join("")}
        </div>
      </div>
      <div class="eq-answer-area">
        <span class="eq-label">Each group has</span>
        <span class="eq-answer-box"></span>
        <span class="eq-label">${itemName}s</span>
      </div>
    </div>
  `;
}

// ============================================================
// Curved Maze — Pages 13-14
// ============================================================
function renderCurvedMazePage(page: HomeworkPage): string {
  const d = page.data as any;
  const theme = d.theme || "apples";
  const itemsInside = d.itemsInside || 5;
  const itemsOutside = d.itemsOutside || 8;

  const emojiMap: Record<string, string> = {
    apples: "🍎", carrots: "🥕", stars: "⭐", fish: "🐟",
  };
  const emoji = emojiMap[theme] || "●";

  // Generate curved maze SVG paths
  const mazeW = 400, mazeH = 300;
  const paths = [
    `M 50,50 C 100,20 200,80 250,50 S 350,80 380,50`,
    `M 30,100 C 80,130 150,70 200,100 S 300,130 370,100`,
    `M 50,150 C 120,180 180,120 250,150 S 340,180 380,150`,
    `M 30,200 C 90,230 160,170 230,200 S 320,230 370,200`,
    `M 50,250 C 110,280 190,220 260,250 S 350,280 380,250`,
  ];

  // Place items along paths (some inside, some outside the curves)
  const insideItems = Array.from({ length: itemsInside }, (_, i) => {
    const x = 60 + (i * (mazeW - 120) / itemsInside);
    const y = 80 + Math.sin(i * 1.2) * 40;
    return `<text x="${x}" y="${y}" font-size="16" text-anchor="middle">${emoji}</text>`;
  });
  const outsideItems = Array.from({ length: itemsOutside }, (_, i) => {
    const x = 40 + (i * (mazeW - 80) / itemsOutside);
    const y = 20 + Math.cos(i * 0.9) * 15;
    return `<text x="${x}" y="${y}" font-size="14" text-anchor="middle" opacity="0.5">${emoji}</text>`;
  });

  return `
    <div class="curved-maze-section">
      <div class="maze-svg-container">
        <svg viewBox="0 0 ${mazeW} ${mazeH}" class="maze-svg">
          <rect width="${mazeW}" height="${mazeH}" fill="#fafafa" stroke="#ddd" rx="8"/>
          ${paths.map((p) => `<path d="${p}" fill="none" stroke="#333" stroke-width="2"/>`).join("\n          ")}
          ${insideItems.join("\n          ")}
          ${outsideItems.join("\n          ")}
          <text x="20" y="${mazeH - 10}" font-size="11" fill="#999">Start →</text>
          <text x="${mazeW - 50}" y="${mazeH - 10}" font-size="11" fill="#999">→ End</text>
        </svg>
      </div>
      <div class="maze-answer-row">
        <span>Items the boy can take (inside the maze):</span>
        <span class="maze-answer-box"></span>
      </div>
    </div>
  `;
}

// ============================================================
// Word Grids — Page 17
// ============================================================
function renderWordGridsPage(page: HomeworkPage): string {
  const d = page.data as any;
  const words = d.words || ["cat", "car", "can", "cap"];
  const grid = d.grid || words.map((w: string) => w.split(""));

  return `
    <div class="word-grids-section">
      <div class="word-grid-instruction">Fill in the first letter of each word. All words share the same first letter.</div>
      <table class="word-grid-table">
        ${grid.map((row: string[], ri: number) => `
          <tr>
            <td class="wg-row-num">${ri + 1}</td>
            ${row.map((ch: string, ci: number) => `
              <td class="wg-cell ${ci === 0 ? "wg-blank" : ""}">${ci === 0 ? "" : ch}</td>
            `).join("")}
            <td class="wg-word-display">${words[ri] || row.join("")}</td>
          </tr>
        `).join("")}
      </table>
      <div class="word-grid-answer">
        <span>First letter:</span>
        <span class="wg-answer-box"></span>
      </div>
    </div>
  `;
}

// ============================================================
// Shape Decompose — Pages 18-19
// ============================================================
function renderShapeDecomposePage(page: HomeworkPage): string {
  // Generate example shapes with cut lines
  const shapes = [
    { name: "Rectangle", svg: `<rect x="10" y="10" width="80" height="50" fill="#e8f4fd" stroke="#333" stroke-width="1.5"/><line x1="50" y1="10" x2="50" y2="60" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="4,3"/>` },
    { name: "L-Shape", svg: `<polygon points="10,10 50,10 50,30 30,30 30,60 10,60" fill="#fef3cd" stroke="#333" stroke-width="1.5"/><line x1="30" y1="10" x2="30" y2="60" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="4,3"/>` },
    { name: "T-Shape", svg: `<polygon points="10,10 70,10 70,25 45,25 45,60 35,60 35,25 10,25" fill="#d4edda" stroke="#333" stroke-width="1.5"/><line x1="35" y1="25" x2="45" y2="25" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="40" y1="10" x2="40" y2="60" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="4,3"/>` },
  ];

  return `
    <div class="shape-decompose-section">
      <div class="sd-example-label">Example — Cut along the red dashed lines:</div>
      <div class="sd-examples">
        ${shapes.map((s) => `
          <div class="sd-example">
            <svg viewBox="0 0 90 70" class="sd-shape-svg">${s.svg}</svg>
            <span class="sd-shape-name">${s.name}</span>
          </div>
        `).join("")}
      </div>
      <div class="sd-task-label">Now cut these shapes into the same pieces by drawing lines:</div>
      <div class="sd-task-shapes">
        ${shapes.map((s) => `
          <div class="sd-task">
            <svg viewBox="0 0 90 70" class="sd-shape-svg">
              ${s.svg.replace(/stroke-dasharray="[^"]*"/g, "").replace(/stroke="#e74c3c"/g, "stroke=\"transparent\"")}
            </svg>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// ============================================================
// Dot Grid — Pages 22-23
// ============================================================
function renderDotGridPage(page: HomeworkPage): string {
  const d = page.data as any;
  const gridSize = d.gridSize || 8;
  const lines = d.lines || [];

  const dotSpacing = 30;
  const padding = 15;
  const svgSize = gridSize * dotSpacing + padding * 2;

  // Generate dots
  const dots = Array.from({ length: gridSize }, (_, r) =>
    Array.from({ length: gridSize }, (_, c) => {
      const x = padding + c * dotSpacing;
      const y = padding + r * dotSpacing;
      return `<circle cx="${x}" cy="${y}" r="2.5" fill="#666"/>`;
    }).join("")
  ).join("");

  // Generate example lines (connecting some dots)
  const exampleLines = lines.length > 0
    ? lines.map((l: any) => {
        const x1 = padding + l.x1 * dotSpacing;
        const y1 = padding + l.y1 * dotSpacing;
        const x2 = padding + l.x2 * dotSpacing;
        const y2 = padding + l.y2 * dotSpacing;
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#333" stroke-width="2"/>`;
      }).join("")
    : // Default pattern: a simple house shape
      `<line x1="${padding + 3 * dotSpacing}" y1="${padding + 1 * dotSpacing}" x2="${padding + 5 * dotSpacing}" y2="${padding + 3 * dotSpacing}" stroke="#333" stroke-width="2"/>
       <line x1="${padding + 5 * dotSpacing}" y1="${padding + 3 * dotSpacing}" x2="${padding + 3 * dotSpacing}" y2="${padding + 5 * dotSpacing}" stroke="#333" stroke-width="2"/>
       <line x1="${padding + 3 * dotSpacing}" y1="${padding + 5 * dotSpacing}" x2="${padding + 1 * dotSpacing}" y2="${padding + 3 * dotSpacing}" stroke="#333" stroke-width="2"/>
       <line x1="${padding + 1 * dotSpacing}" y1="${padding + 3 * dotSpacing}" x2="${padding + 3 * dotSpacing}" y2="${padding + 1 * dotSpacing}" stroke="#333" stroke-width="2"/>`;

  return `
    <div class="dot-grid-section">
      <div class="dot-grid-label">Study this pattern:</div>
      <svg viewBox="0 0 ${svgSize} ${svgSize}" class="dot-grid-svg">
        ${dots}
        ${exampleLines}
      </svg>
      <div class="dot-grid-label">Copy it here:</div>
      <svg viewBox="0 0 ${svgSize} ${svgSize}" class="dot-grid-svg dot-grid-copy">
        ${dots}
      </svg>
    </div>
  `;
}

// ============================================================
// Memory Grid — Page 35
// ============================================================
function renderMemoryGridPage(page: HomeworkPage): string {
  const d = page.data as any;
  const gridSize = d.gridSize || 4;
  const items = d.items || [];

  // Default items if none provided
  const defaultItems = [
    { row: 0, col: 1, item: "🍎" },
    { row: 1, col: 3, item: "⭐" },
    { row: 2, col: 0, item: "🐟" },
    { row: 3, col: 2, item: "🌸" },
  ];
  const gridItems = items.length > 0 ? items : defaultItems;

  const cellSize = 70;

  // Build the study grid (with items)
  const studyCells = Array.from({ length: gridSize }, (_, r) =>
    Array.from({ length: gridSize }, (_, c) => {
      const found = gridItems.find((it: any) => it.row === r && it.col === c);
      return `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#f8f9fa" stroke="#333" stroke-width="1.5"/>
              ${found ? `<text x="${c * cellSize + cellSize / 2}" y="${r * cellSize + cellSize / 2 + 8}" text-anchor="middle" font-size="28">${found.item}</text>` : ""}`;
    }).join("")
  ).join("");

  // Build the empty recall grid
  const emptyCells = Array.from({ length: gridSize }, (_, r) =>
    Array.from({ length: gridSize }, (_, c) =>
      `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="white" stroke="#333" stroke-width="1.5"/>`
    ).join("")
  ).join("");

  const gridSvgSize = gridSize * cellSize;

  return `
    <div class="memory-grid-section">
      <div class="mg-study-label">Study this grid for ${d.viewTime || 20} seconds:</div>
      <svg viewBox="0 0 ${gridSvgSize} ${gridSvgSize}" class="mg-grid-svg">
        ${studyCells}
      </svg>
      <div class="mg-recall-label">Now draw the items in their correct positions:</div>
      <svg viewBox="0 0 ${gridSvgSize} ${gridSvgSize}" class="mg-grid-svg">
        ${emptyCells}
      </svg>
    </div>
  `;
}

function renderGenericPage(page: HomeworkPage): string {
  return `
    <div class="generic-content">
      <p>Exercise content for: ${page.data.type}</p>
    </div>
  `;
}

// ============================================================
// Page Renderer Map
// ============================================================
const RENDERERS: Record<string, (page: HomeworkPage) => string> = {
  association: renderAssociationPage,
  "equal-division": renderEqualDivisionPage,
  "direction-follow": renderDirectionFollowPage,
  "addition-grid": renderAdditionGridPage,
  "shape-code": renderShapeCodePage,
  "number-flow": renderNumberFlowPage,
  "block-counting": renderBlockCountingPage,
  "curved-maze": renderCurvedMazePage,
  vocabulary: renderVocabularyPage,
  "shape-patterns": renderShapePatternsPage,
  "word-grids": renderWordGridsPage,
  "shape-decompose": renderShapeDecomposePage,
  "creature-assembly": renderCreatureAssemblyPage,
  "dot-grid": renderDotGridPage,
  "logic-association": renderLogicAssociationPage,
  "vegetable-class": renderVegetableClassPage,
  "creative-writing": renderCreativeWritingPage,
  "story-comprehension": renderStoryComprehensionPage,
  "memory-grid": renderMemoryGridPage,
  "overlap-count": renderOverlapCountPage,
  "sequence-complete": renderSequenceCompletePage,
  "mandala-memory": renderMandalaMemoryPage,
};

// ============================================================
// Main Template Builder
// ============================================================

/**
 * Build complete HTML for the homework PDF.
 * Each page gets a page-break-before except the first.
 */
export function buildHomeworkHTML(
  pages: HomeworkPage[],
  childName: string,
  generatedAt: string
): string {
  const pageContents = pages.map((page, i) => {
    const renderer = RENDERERS[page.data.type] || renderGenericPage;
    const content = renderer(page);

    return `
      <div class="page ${i > 0 ? "page-break" : ""}">
        <div class="page-header">
          <div class="dev-logo">✦ LUMeOKIDS ✦</div>
          <div class="page-title">Right Brain Development</div>
        </div>
        <div class="instruction">
          Instruction: ${page.instruction}
        </div>
        <div class="exercise-content">
          ${content}
        </div>
        <div class="page-footer">
          <span class="page-number">${page.pageNumber}</span>
          <span class="copyright">© LumeoKids</span>
        </div>
      </div>
    `;
  }).join("\n");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    @page {
      size: A4;
      margin: 15mm;
    }

    body {
      font-family: 'Nunito', sans-serif;
      font-size: 14px;
      color: #333;
      line-height: 1.4;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      width: 100%;
      min-height: 100vh;
      padding: 20px;
      position: relative;
      page-break-inside: avoid;
    }

    .page-break {
      page-break-before: always;
    }

    /* Header */
    .page-header {
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 2px solid #333;
      padding-bottom: 10px;
    }

    .dev-logo {
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 2px;
      margin-bottom: 5px;
    }

    .page-title {
      font-size: 16px;
      font-weight: 700;
    }

    /* Instruction */
    .instruction {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #555;
    }

    /* Footer */
    .page-footer {
      position: absolute;
      bottom: 20px;
      left: 20px;
      right: 20px;
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #999;
    }

    /* Math Grid */
    .math-grid {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .math-grid th, .math-grid td {
      border: 1px solid #333;
      padding: 8px;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
    }
    .grid-header {
      background: #f0f0f0;
    }
    .grid-cell {
      height: 40px;
    }

    /* Number Flow Grid */
    .flow-grid {
      border-collapse: collapse;
      margin: 20px auto;
    }
    .flow-cell {
      border: 1px solid #333;
      width: 60px;
      height: 60px;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
    }

    /* Exercise Grid (Association) */
    .exercise-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin: 20px 0;
    }
    .exercise-quadrant {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
    }
    .quadrant-label {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .item-box, .option-box {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 10px;
      margin: 5px;
      display: inline-block;
      min-width: 80px;
      min-height: 60px;
    }
    .item-image {
      max-width: 80px;
      max-height: 60px;
      object-fit: contain;
    }
    .arrow-down {
      font-size: 20px;
      margin: 5px 0;
    }
    .options-row {
      display: flex;
      justify-content: center;
      gap: 5px;
      flex-wrap: wrap;
    }

    /* Shape Code */
    .code-section {
      margin: 20px 0;
    }
    .code-key {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .code-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 40px;
    }
    .code-shape {
      font-size: 24px;
      margin-bottom: 4px;
    }
    .code-letter {
      font-size: 12px;
      font-weight: 700;
    }
    .code-questions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    .code-question {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border: 1px solid #eee;
      border-radius: 4px;
    }
    .q-number {
      font-weight: 700;
      font-size: 14px;
    }
    .q-shapes {
      display: flex;
      gap: 5px;
      font-size: 20px;
    }
    .q-bracket {
      font-size: 12px;
      color: #999;
    }

    /* Vocabulary */
    .vocab-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin: 20px 0;
    }
    .vocab-item {
      text-align: center;
    }
    .vocab-image {
      max-width: 100px;
      max-height: 80px;
      object-fit: contain;
    }
    .vocab-placeholder {
      width: 100px;
      height: 80px;
      border: 1px dashed #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      font-size: 12px;
      color: #999;
    }
    .vocab-bracket {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }

    /* Shape Patterns */
    .patterns-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 20px 0;
    }
    .pattern-quadrant {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
    }
    .pattern-table {
      border-collapse: collapse;
      width: 100%;
    }
    .pattern-cell {
      border: 1px solid #ccc;
      width: 40px;
      height: 40px;
      text-align: center;
      font-size: 18px;
    }

    /* Creature Assembly */
    .creature-section {
      text-align: center;
    }
    .creature-image {
      max-width: 300px;
      margin: 20px auto;
    }
    .creature-placeholder {
      width: 300px;
      height: 200px;
      border: 1px dashed #ccc;
      margin: 20px auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #999;
    }
    .creature-table {
      border-collapse: collapse;
      width: 80%;
      margin: 20px auto;
    }
    .creature-table th, .creature-table td {
      border: 1px solid #333;
      padding: 12px;
      text-align: center;
      font-size: 14px;
      font-weight: 700;
    }
    .creature-cell {
      height: 60px;
    }

    /* Logic Association */
    .logic-section {
      margin: 20px 0;
    }
    .logic-table {
      border-collapse: collapse;
      width: 100%;
    }
    .logic-table td {
      border: 1px solid #333;
      padding: 15px;
      vertical-align: middle;
    }
    .logic-item {
      width: 150px;
      text-align: center;
    }
    .logic-image {
      max-width: 100px;
      max-height: 60px;
    }
    .logic-options {
      font-size: 14px;
    }

    /* Vegetable Classification */
    .veg-section {
      margin: 20px 0;
    }
    .veg-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-bottom: 20px;
    }
    .veg-item {
      text-align: center;
    }
    .veg-image {
      max-width: 80px;
      max-height: 60px;
    }
    .veg-placeholder {
      width: 80px;
      height: 60px;
      margin: 0 auto;
      font-size: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .veg-name {
      font-size: 11px;
      font-weight: 600;
    }
    .veg-categories {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
    .veg-category {
      border: 1px solid #333;
      border-radius: 4px;
      padding: 10px;
    }
    .cat-label {
      font-weight: 700;
      font-size: 13px;
      display: block;
      margin-bottom: 10px;
    }
    .cat-row {
      padding: 8px 0;
      border-bottom: 1px dashed #ccc;
      font-size: 12px;
    }

    /* Creative Writing */
    .writing-section {
      margin: 20px 0;
    }
    .writing-items {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 30px;
    }
    .writing-item {
      text-align: center;
    }
    .writing-image {
      max-width: 80px;
      max-height: 60px;
    }
    .writing-placeholder {
      width: 80px;
      height: 60px;
      border: 1px dashed #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      color: #999;
    }
    .writing-label {
      font-size: 11px;
      font-weight: 600;
      display: block;
      margin-top: 4px;
    }
    .writing-lines {
      margin-top: 20px;
    }
    .writing-line {
      border-bottom: 1px solid #333;
      height: 35px;
      margin-bottom: 5px;
    }

    /* Story Comprehension */
    .story-section {
      margin: 20px 0;
    }
    .story-box {
      border: 2px solid #333;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 1.6;
    }
    .story-question {
      margin-bottom: 15px;
    }
    .sq-text {
      font-weight: 700;
      margin-bottom: 5px;
    }
    .sq-options {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding-left: 20px;
    }
    .sq-option {
      font-size: 13px;
    }

    /* Overlap Counting */
    .overlap-section {
      text-align: center;
      margin: 20px 0;
    }
    .overlap-svg {
      margin: 20px auto;
      display: block;
    }
    .overlap-answer {
      font-size: 16px;
      margin-top: 10px;
    }

    /* Sequence Completion */
    .sequence-section {
      margin: 20px 0;
    }
    .sequence-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    }
    .seq-num {
      font-weight: 700;
      min-width: 25px;
    }
    .seq-cells {
      display: flex;
      gap: 0;
    }
    .seq-cell {
      border: 1px solid #333;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 700;
    }

    /* Mandala */
    .mandala-section {
      text-align: center;
      margin: 30px 0;
    }
    .mandala-svg {
      margin: 0 auto;
    }

    /* Direction Following */
    .direction-section {
      margin: 20px 0;
    }
    .arrow-sequence {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .seq-label {
      font-weight: 700;
      margin-right: 10px;
    }
    .arrow-box {
      border: 1px solid #333;
      padding: 5px 10px;
      font-size: 16px;
      border-radius: 4px;
    }

    /* Block Counting */
    .block-section {
      margin: 20px 0;
    }
    .block-instruction {
      font-weight: 600;
      margin-bottom: 15px;
    }
    .block-equations {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .block-group {
      text-align: center;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .block-count {
      font-weight: 700;
      display: block;
      margin-bottom: 10px;
    }
    .block-answer {
      display: block;
      margin-top: 10px;
      font-size: 14px;
    }

    /* Equal Division */
    .equal-division-section { margin: 15px 0; text-align: center; }
    .eq-instruction { font-size: 13px; font-weight: 600; margin-bottom: 15px; color: #555; }
    .eq-box {
      border: 2px solid #333; border-radius: 8px; padding: 20px;
      min-height: 180px; position: relative; margin: 0 auto; max-width: 450px;
    }
    .eq-items { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
    .eq-item { font-size: 28px; }
    .eq-lines-hint {
      display: flex; justify-content: space-around; margin-top: 15px; padding: 0 20px;
    }
    .eq-dashed-line {
      width: 2px; height: 60px; border-left: 2px dashed #ccc;
    }
    .eq-answer-area {
      margin-top: 20px; font-size: 14px; font-weight: 600;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .eq-answer-box {
      width: 50px; height: 30px; border: 1.5px solid #333; border-radius: 4px;
      display: inline-block;
    }

    /* Curved Maze */
    .curved-maze-section { margin: 15px 0; text-align: center; }
    .maze-svg-container { margin: 0 auto; max-width: 450px; }
    .maze-svg { width: 100%; height: auto; }
    .maze-answer-row {
      margin-top: 15px; font-size: 13px; font-weight: 600;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .maze-answer-box {
      width: 40px; height: 28px; border: 1.5px solid #333; border-radius: 4px;
      display: inline-block;
    }

    /* Word Grids */
    .word-grids-section { margin: 15px 0; }
    .word-grid-instruction { font-size: 13px; font-weight: 600; margin-bottom: 15px; color: #555; }
    .word-grid-table {
      border-collapse: collapse; margin: 0 auto;
    }
    .word-grid-table td {
      border: 1.5px solid #333; padding: 8px 12px; text-align: center;
      font-size: 16px; font-weight: 700;
    }
    .wg-row-num { background: #f0f0f0; width: 30px; font-size: 13px; }
    .wg-cell { width: 35px; }
    .wg-blank { background: #fff9c4; }
    .wg-word-display { font-size: 12px; color: #999; font-weight: 400; padding-left: 15px; }
    .word-grid-answer {
      margin-top: 15px; font-size: 13px; font-weight: 600;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .wg-answer-box {
      width: 35px; height: 30px; border: 1.5px solid #333; border-radius: 4px;
      display: inline-block;
    }

    /* Shape Decompose */
    .shape-decompose-section { margin: 15px 0; }
    .sd-example-label, .sd-task-label {
      font-size: 12px; font-weight: 600; color: #555; margin-bottom: 10px;
    }
    .sd-examples, .sd-task-shapes {
      display: flex; justify-content: center; gap: 30px; margin-bottom: 20px;
    }
    .sd-example, .sd-task { text-align: center; }
    .sd-shape-svg { width: 100px; height: 80px; }
    .sd-shape-name { font-size: 11px; color: #777; display: block; margin-top: 4px; }

    /* Dot Grid */
    .dot-grid-section {
      margin: 15px 0; display: flex; justify-content: center;
      gap: 30px; align-items: flex-start;
    }
    .dot-grid-label {
      font-size: 12px; font-weight: 600; color: #555; text-align: center;
      margin-bottom: 8px; width: 100%;
    }
    .dot-grid-svg {
      width: 220px; height: 220px; border: 1.5px solid #ddd; border-radius: 4px;
      background: white;
    }
    .dot-grid-copy { border-style: dashed; }

    /* Memory Grid */
    .memory-grid-section { margin: 15px 0; text-align: center; }
    .mg-study-label, .mg-recall-label {
      font-size: 13px; font-weight: 600; color: #555; margin-bottom: 10px;
    }
    .mg-grid-svg {
      width: 280px; height: 280px; margin: 0 auto 20px; display: block;
    }

    /* Font smoothing */
    body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  </style>
</head>
<body>
  ${pageContents}
</body>
</html>`;
}
