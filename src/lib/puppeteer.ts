import puppeteer from "puppeteer";

let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null;

/**
 * Returns a shared Puppeteer browser instance.
 * Reuses the same browser across requests to avoid cold-start cost.
 */
export async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
  return browser;
}
