// ============================================================
// AI Image Generation Service
// ============================================================
// Generates images for homework exercises using multiple AI providers.
// Falls back to emoji placeholders when providers are unavailable.
//
// Resilience: fetch timeouts (10s), circuit breaker (skip after 3 failures for 60s).

import {
  recordUsage,
  NINE_ROUTER_URL,
  PROVIDERS,
  type UserTier,
  type GenerateImageResponse,
} from "./aiQuota";

// ============================================================
// Fetch with timeout
// ============================================================
const FETCH_TIMEOUT_MS = 10_000; // 10 seconds per provider call

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs = FETCH_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// ============================================================
// Circuit Breaker
// ============================================================
// Tracks consecutive failures per provider. After BREAKER_THRESHOLD
// failures, the provider is skipped for BREAKER_COOLDOWN_MS.

const BREAKER_THRESHOLD = 3;
const BREAKER_COOLDOWN_MS = 60_000; // 60 seconds

interface BreakerState {
  failures: number;
  openedAt: number; // timestamp when breaker opened
}

const breakers = new Map<string, BreakerState>();

function circuitIsOpen(providerName: string): boolean {
  const state = breakers.get(providerName);
  if (!state) return false;
  if (state.failures < BREAKER_THRESHOLD) return false;
  // Check if cooldown has elapsed
  if (Date.now() - state.openedAt > BREAKER_COOLDOWN_MS) {
    // Half-open: allow one retry
    breakers.delete(providerName);
    return false;
  }
  return true;
}

function recordSuccess(providerName: string): void {
  breakers.delete(providerName);
}

function recordFailure(providerName: string): void {
  const state = breakers.get(providerName) || { failures: 0, openedAt: 0 };
  state.failures += 1;
  if (state.failures >= BREAKER_THRESHOLD && state.openedAt === 0) {
    state.openedAt = Date.now();
  }
  breakers.set(providerName, state);
}

// ============================================================
// Types
// ============================================================
export type ImageStyle = "line-art" | "cartoon" | "realistic";
export type ImageSize = "small" | "medium" | "large";

interface ImageCache {
  [key: string]: string; // hash → base64 data URL
}

// ============================================================
// In-memory image cache
// ============================================================
const imageCache: ImageCache = {};

function hashPrompt(prompt: string, style: ImageStyle, size: ImageSize): string {
  const str = `${prompt}|${style}|${size}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return `img_${Math.abs(hash).toString(36)}`;
}

// ============================================================
// Style prompts
// ============================================================
const STYLE_PROMPTS: Record<ImageStyle, string> = {
  "line-art":
    "Simple black and white line drawing, clean outlines, no shading, white background, child-friendly educational worksheet style",
  cartoon:
    "Simple colorful cartoon illustration, child-friendly, bright colors, white background, educational worksheet style",
  realistic:
    "Simple realistic illustration, clear details, white background, educational worksheet style",
};

const SIZE_MAP: Record<ImageSize, string> = {
  small: "256x256",
  medium: "512x512",
  large: "768x512",
};

// ============================================================
// Provider-specific image generation
// ============================================================

/**
 * Generate image using Google Imagen API.
 */
async function generateWithGoogle(
  prompt: string,
  style: ImageStyle,
  size: ImageSize,
  apiKey: string
): Promise<GenerateImageResponse> {
  try {
    const fullPrompt = `${prompt}, ${STYLE_PROMPTS[style]}`;

    const response = await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0.0-generate-002:predict?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instances: [{ prompt: fullPrompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: size === "large" ? "16:9" : "1:1",
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return { success: false, error: `Google API error: ${err}` };
    }

    const data = await response.json();
    const predictions = data.predictions;
    if (!predictions || predictions.length === 0) {
      return { success: false, error: "No images returned from Google" };
    }

    const base64 = predictions[0].bytesBase64Encoded;
    const mimeType = predictions[0].mimeType || "image/png";
    const imageUrl = `data:${mimeType};base64,${base64}`;

    return { success: true, imageUrl, provider: "google" };
  } catch (error) {
    return { success: false, error: `Google generation failed: ${error}` };
  }
}

/**
 * Generate image using OpenAI DALL-E API.
 */
async function generateWithOpenAI(
  prompt: string,
  style: ImageStyle,
  size: ImageSize,
  apiKey: string
): Promise<GenerateImageResponse> {
  try {
    const fullPrompt = `${prompt}, ${STYLE_PROMPTS[style]}`;
    const dalleSize = size === "large" ? "1024x1024" : size === "medium" ? "512x512" : "256x256";

    const response = await fetchWithTimeout("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: fullPrompt,
        n: 1,
        size: dalleSize,
        response_format: "b64_json",
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { success: false, error: `OpenAI API error: ${err}` };
    }

    const data = await response.json();
    const b64 = data.data[0].b64_json;
    const imageUrl = `data:image/png;base64,${b64}`;

    return { success: true, imageUrl, provider: "openai" };
  } catch (error) {
    return { success: false, error: `OpenAI generation failed: ${error}` };
  }
}

/**
 * Generate image using 9Router (OpenAI-compatible proxy).
 * Routes to Fireworks, SDXL, GLM, or other models via local proxy.
 */
async function generateWith9Router(
  prompt: string,
  style: ImageStyle,
  size: ImageSize,
  _apiKey: string
): Promise<GenerateImageResponse> {
  try {
    const fullPrompt = `${prompt}, ${STYLE_PROMPTS[style]}`;
    const dalleSize = size === "large" ? "1024x1024" : size === "medium" ? "512x512" : "256x256";

    const response = await fetchWithTimeout(`${NINE_ROUTER_URL}/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer local",
      },
      body: JSON.stringify({
        model: process.env.NINE_ROUTER_MODEL || "fireworks/sdxl",
        prompt: fullPrompt,
        n: 1,
        size: dalleSize,
        response_format: "b64_json",
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { success: false, error: `9Router API error: ${err}` };
    }

    const data = await response.json();
    const b64 = data.data[0].b64_json;
    const imageUrl = `data:image/png;base64,${b64}`;

    return { success: true, imageUrl, provider: "nine-router" };
  } catch (error) {
    return { success: false, error: `9Router generation failed: ${error}` };
  }
}

/**
 * Generate placeholder image (emoji-based).
 * Used as fallback when no AI provider is available.
 */
function generatePlaceholder(
  prompt: string,
  _style: ImageStyle,
  _size: ImageSize
): GenerateImageResponse {
  // Extract the main subject from the prompt
  const subject = prompt
    .replace(/^simple\s+(black\s+and\s+white\s+)?(line\s+drawing\s+of\s+|cartoon\s+of\s+|illustration\s+of\s+)/i, "")
    .replace(/,?\s*white\s*background.*$/i, "")
    .trim();

  // Create an SVG placeholder with the subject name
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="#f8f9fa" rx="8"/>
      <text x="100" y="90" text-anchor="middle" font-size="48" font-family="sans-serif">?</text>
      <text x="100" y="130" text-anchor="middle" font-size="14" font-family="sans-serif" fill="#6c757d">
        ${subject.length > 20 ? subject.substring(0, 20) + "..." : subject}
      </text>
    </svg>
  `.trim();

  const imageUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  return { success: true, imageUrl, provider: "local", fallback: true };
}

// ============================================================
// Main Generation Function
// ============================================================

/**
 * Generate an image for a homework exercise.
 * Tries AI providers in priority order, falls back to placeholder.
 */
export async function generateImage(
  prompt: string,
  options: {
    style?: ImageStyle;
    size?: ImageSize;
    userTier?: UserTier;
  } = {}
): Promise<GenerateImageResponse> {
  const { style = "line-art", size = "medium", userTier = "free" } = options;

  // Check cache first
  const cacheKey = hashPrompt(prompt, style, size);
  if (imageCache[cacheKey]) {
    return {
      success: true,
      imageUrl: imageCache[cacheKey],
      provider: "local",
      fallback: false,
    };
  }

  // Try providers in priority order: 9Router → Google → OpenAI → placeholder
  const sorted = [...PROVIDERS]
    .filter((p) => p.supportsImages && p.name !== "local")
    .sort((a, b) => a.priority - b.priority);

  for (const provider of sorted) {
    if (!provider.enabled) continue;

    // Circuit breaker: skip provider if too many recent failures
    if (circuitIsOpen(provider.name)) continue;

    let result: GenerateImageResponse;

    switch (provider.name) {
      case "nine-router":
        result = await generateWith9Router(prompt, style, size, provider.apiKey!);
        break;
      case "google":
        if (!provider.apiKey) continue;
        result = await generateWithGoogle(prompt, style, size, provider.apiKey);
        break;
      case "openai":
        if (!provider.apiKey) continue;
        result = await generateWithOpenAI(prompt, style, size, provider.apiKey);
        break;
      default:
        continue;
    }

    if (result.success && result.imageUrl) {
      recordSuccess(provider.name);
      imageCache[cacheKey] = result.imageUrl;
      recordUsage(provider.name);
      return result;
    }
    // Provider failed — record failure and try next one
    recordFailure(provider.name);
  }

  // All providers failed — use placeholder
  const fallback = generatePlaceholder(prompt, style, size);
  imageCache[cacheKey] = fallback.imageUrl!;
  return fallback;
}

/**
 * Generate multiple images in parallel (with concurrency limit).
 */
export async function generateImages(
  prompts: string[],
  options: {
    style?: ImageStyle;
    size?: ImageSize;
    userTier?: UserTier;
    concurrency?: number;
  } = {}
): Promise<GenerateImageResponse[]> {
  const { concurrency = 3 } = options;
  const results: GenerateImageResponse[] = [];

  // Process in batches
  for (let i = 0; i < prompts.length; i += concurrency) {
    const batch = prompts.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map((prompt) => generateImage(prompt, options))
    );
    results.push(...batchResults);
  }

  return results;
}

/**
 * Clear the image cache.
 */
export function clearImageCache(): void {
  Object.keys(imageCache).forEach((key) => delete imageCache[key]);
}
