/**
 * Client-side error logger
 * Captures errors and sends them to /api/error-logs for debugging
 */

interface LogOptions {
  level?: "error" | "warn" | "info";
  source?: "client" | "api" | "component";
  stack?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Log an error to the server
 */
export async function logError(
  message: string,
  options: LogOptions = {}
): Promise<void> {
  const { level = "error", source = "client", stack, metadata } = options;

  try {
    await fetch("/api/error-logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level,
        message,
        source,
        url: typeof window !== "undefined" ? window.location.href : "",
        stack: stack || new Error().stack,
        metadata,
      }),
    });
  } catch {
    // Silently fail — don't break the app if logging fails
    console.error("[ErrorLogger] Failed to send error log:", message);
  }
}

/**
 * Log an API error (from fetch responses)
 */
export async function logApiError(
  endpoint: string,
  status: number,
  responseBody?: unknown
): Promise<void> {
  const metadata: Record<string, unknown> = {
    endpoint,
    status,
    timestamp: new Date().toISOString(),
  };

  if (responseBody) {
    metadata.responseBody = responseBody;
  }

  await logError(`API Error: ${endpoint} returned ${status}`, {
    level: status >= 500 ? "error" : "warn",
    source: "api",
    metadata,
  });
}

/**
 * Catch and log errors in try/catch blocks
 */
export function withErrorLogging<T>(
  fn: () => Promise<T>,
  context: string
): Promise<T> {
  return fn().catch(async (error) => {
    await logError(`Error in ${context}: ${error.message}`, {
      level: "error",
      source: "client",
      stack: error.stack,
      metadata: { context },
    });
    throw error; // Re-throw so the caller can handle it
  });
}

/**
 * Log form validation errors
 */
export async function logValidationError(
  formName: string,
  errors: Record<string, string[]>
): Promise<void> {
  await logError(`Validation failed: ${formName}`, {
    level: "warn",
    source: "client",
    metadata: { formName, fieldErrors: errors },
  });
}
