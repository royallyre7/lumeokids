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
  "equal-division": renderGenericPage,
  "direction-follow": renderDirectionFollowPage,
  "addition-grid": renderAdditionGridPage,
  "shape-code": renderShapeCodePage,
  "number-flow": renderNumberFlowPage,
  "block-counting": renderBlockCountingPage,
  "curved-maze": renderGenericPage,
  vocabulary: renderVocabularyPage,
  "shape-patterns": renderShapePatternsPage,
  "word-grids": renderGenericPage,
  "shape-decompose": renderGenericPage,
  "creature-assembly": renderCreatureAssemblyPage,
  "dot-grid": renderGenericPage,
  "logic-association": renderLogicAssociationPage,
  "vegetable-class": renderVegetableClassPage,
  "creative-writing": renderCreativeWritingPage,
  "story-comprehension": renderStoryComprehensionPage,
  "memory-grid": renderGenericPage,
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
  </style>
</head>
<body>
  ${pageContents}
</body>
</html>`;
}
