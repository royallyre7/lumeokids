// ============================================================
// Multi-AI Quota Router
// ============================================================
// Routes image generation requests across multiple providers
// with free/pro tier support and daily quota tracking.
//
// Provider priority: 9Router → Google → OpenAI → Claude → Local fallback
// Free tier: 10 images/day | Pro tier: 100 images/day

// ============================================================
// Types
// ============================================================
export type AiProvider = "nine-router" | "google" | "openai" | "claude" | "local";
export type UserTier = "free" | "pro";

export interface ProviderConfig {
  name: AiProvider;
  apiKey: string | null;
  enabled: boolean;
  priority: number;
  freeDailyLimit: number;
  proDailyLimit: number;
  supportsImages: boolean;
}

export interface QuotaUsage {
  provider: AiProvider;
  date: string; // YYYY-MM-DD
  count: number;
}

export interface GenerateImageRequest {
  prompt: string;
  style?: "line-art" | "cartoon" | "realistic";
  size?: "small" | "medium" | "large";
  userTier?: UserTier;
}

export interface GenerateImageResponse {
  success: boolean;
  imageUrl?: string; // base64 data URL or HTTP URL
  provider?: AiProvider;
  error?: string;
  fallback?: boolean;
}

// ============================================================
// Quota Manager (in-memory, persists across requests)
// ============================================================
class QuotaManager {
  private usage: Map<string, number> = new Map();
  private today: string = new Date().toISOString().split("T")[0];

  private getKey(provider: AiProvider, date: string): string {
    return `${provider}:${date}`;
  }

  private checkDate() {
    const today = new Date().toISOString().split("T")[0];
    if (today !== this.today) {
      this.usage.clear();
      this.today = today;
    }
  }

  getUsage(provider: AiProvider): number {
    this.checkDate();
    return this.usage.get(this.getKey(provider, this.today)) ?? 0;
  }

  increment(provider: AiProvider): number {
    this.checkDate();
    const key = this.getKey(provider, this.today);
    const current = this.usage.get(key) ?? 0;
    this.usage.set(key, current + 1);
    return current + 1;
  }

  canUse(provider: AiProvider, tier: UserTier, config: ProviderConfig): boolean {
    if (!config.enabled || !config.apiKey) return false;
    if (!config.supportsImages) return false;

    const used = this.getUsage(provider);
    const limit = tier === "pro" ? config.proDailyLimit : config.freeDailyLimit;
    return used < limit;
  }

  getRemaining(provider: AiProvider, tier: UserTier, config: ProviderConfig): number {
    const used = this.getUsage(provider);
    const limit = tier === "pro" ? config.proDailyLimit : config.freeDailyLimit;
    return Math.max(0, limit - used);
  }
}

// ============================================================
// Provider Configurations
// ============================================================
const NINE_ROUTER_URL = process.env.NINE_ROUTER_URL || "http://localhost:20128/v1";

const PROVIDERS: ProviderConfig[] = [
  {
    name: "nine-router",
    apiKey: process.env.NINE_ROUTER_API_KEY || "local",
    enabled: true, // Always try 9Router first
    priority: 1,
    freeDailyLimit: 50,
    proDailyLimit: 500,
    supportsImages: true,
  },
  {
    name: "google",
    apiKey: process.env.GOOGLE_AI_API_KEY ?? null,
    enabled: !!process.env.GOOGLE_AI_API_KEY,
    priority: 2,
    freeDailyLimit: 10,
    proDailyLimit: 100,
    supportsImages: true,
  },
  {
    name: "openai",
    apiKey: process.env.OPENAI_API_KEY ?? null,
    enabled: !!process.env.OPENAI_API_KEY,
    priority: 3,
    freeDailyLimit: 10,
    proDailyLimit: 100,
    supportsImages: true,
  },
  {
    name: "claude",
    apiKey: process.env.ANTHROPIC_API_KEY ?? null,
    enabled: !!process.env.ANTHROPIC_API_KEY,
    priority: 4,
    freeDailyLimit: 5,
    proDailyLimit: 50,
    supportsImages: false, // Claude doesn't generate images
  },
  {
    name: "local",
    apiKey: "local", // No API key needed
    enabled: true, // Always available as fallback
    priority: 5,
    freeDailyLimit: 999,
    proDailyLimit: 999,
    supportsImages: true, // Uses placeholder/emoji
  },
];

// ============================================================
// Main Router
// ============================================================
const quotaManager = new QuotaManager();

/**
 * Find the best available provider for image generation.
 */
export function getAvailableProvider(tier: UserTier): ProviderConfig | null {
  // Sort by priority
  const sorted = [...PROVIDERS].sort((a, b) => a.priority - b.priority);

  for (const provider of sorted) {
    if (quotaManager.canUse(provider.name, tier, provider)) {
      return provider;
    }
  }

  return null;
}

/**
 * Get quota status for all providers.
 */
export function getQuotaStatus(tier: UserTier) {
  return PROVIDERS.map((p) => ({
    provider: p.name,
    enabled: p.enabled,
    supportsImages: p.supportsImages,
    used: quotaManager.getUsage(p.name),
    limit: tier === "pro" ? p.proDailyLimit : p.freeDailyLimit,
    remaining: quotaManager.getRemaining(p.name, tier, p),
    available: quotaManager.canUse(p.name, tier, p),
  }));
}

/**
 * Record a successful API call.
 */
export function recordUsage(provider: AiProvider): number {
  return quotaManager.increment(provider);
}

/**
 * Get total images used today across all providers.
 */
export function getTotalUsage(): number {
  return PROVIDERS.reduce((sum, p) => sum + quotaManager.getUsage(p.name), 0);
}

/**
 * Check if any provider is available for the given tier.
 */
export function hasAvailableProvider(tier: UserTier): boolean {
  return getAvailableProvider(tier) !== null;
}

export { PROVIDERS, quotaManager, NINE_ROUTER_URL };
