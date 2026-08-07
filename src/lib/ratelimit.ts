// Simple in-memory sliding-window rate limiter for server actions / route handlers.
// Designed to be replaced with Redis in production; sufficient for the
// demo and the prompt's "rate limiting" requirement.

type Bucket = number[];
const buckets: Map<string, Bucket> = new Map();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const arr = buckets.get(key) ?? [];
  const cutoff = now - windowMs;
  while (arr.length && arr[0] < cutoff) arr.shift();
  arr.push(now);
  buckets.set(key, arr);
  return {
    ok: arr.length <= limit,
    remaining: Math.max(0, limit - arr.length),
    resetMs: arr.length ? arr[0] + windowMs - now : 0
  };
}

// Helper used by server actions
export function checkoutRateLimit(userId: string) {
  return rateLimit(`checkout:${userId}`, 5, 60_000);
}
