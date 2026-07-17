// Homework Generator Orchestrator
import { generateSeed } from "./utils";
import { PAGE_GENERATORS } from "./generators";
import { buildHomeworkHTML } from "./template";
import { getBrowser } from "../puppeteer";
import type { Homework, HomeworkPage } from "./types";

/**
 * Generate a complete homework assignment.
 * Returns the HTML template ready for Puppeteer PDF rendering.
 */
export async function generateHomework(
  childName: string,
  seed?: number
): Promise<{ html: string; homework: Homework }> {
  const actualSeed = seed ?? generateSeed();

  // Generate all pages (42 pages matching Child Development Level 1)
  const pages: HomeworkPage[] = [];
  const pageNumbers = Object.keys(PAGE_GENERATORS).map(Number).sort((a, b) => a - b);

  for (const pageNum of pageNumbers) {
    try {
      const generator = PAGE_GENERATORS[pageNum];
      const page = await generator(actualSeed + pageNum);
      pages.push(page);
    } catch (err) {
      console.error(`Failed to generate page ${pageNum}:`, err);
    }
  }

  const homework: Homework = {
    childId: "",
    childName,
    generatedAt: new Date().toISOString(),
    seed: actualSeed,
    pages,
  };

  const html = buildHomeworkHTML(pages, childName, homework.generatedAt);

  return { html, homework };
}

/**
 * Generate homework PDF using Puppeteer.
 * Returns a Buffer containing the PDF.
 */
export async function generateHomeworkPDF(
  childName: string,
  seed?: number
): Promise<Buffer> {
  const { html } = await generateHomework(childName, seed);

  const browser = await getBrowser();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "domcontentloaded" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "15mm", right: "15mm", bottom: "15mm", left: "15mm" },
  });

  await page.close();

  return Buffer.from(pdf);
}
