import { headers } from "next/headers";
import { getPrisma } from "./prisma";

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** Seconds until the current window resets. */
  retryAfter: number;
};

/**
 * Fixed-window rate limiter backed by Postgres.
 *
 * The whole check is a single atomic INSERT ... ON CONFLICT, so concurrent
 * requests cannot race past the limit — Postgres serialises the row update.
 * A read-then-write pair would let a burst of parallel requests all observe
 * the same pre-increment count and slip through together.
 *
 * State lives in the database rather than a module-level Map because
 * serverless instances do not share memory: an in-process counter resets on
 * every cold start and is enforced per-instance, which is close to useless
 * once the platform scales you past one.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  // Deliberately raw rather than Prisma's `upsert`: that is a read-then-write
  // pair, which reintroduces exactly the race this single statement avoids.
  const rows = await getPrisma().$queryRaw<
    { count: number; retry_after: number }[]
  >`
    INSERT INTO rate_limits (key, count, window_start)
    VALUES (${key}, 1, now())
    ON CONFLICT (key) DO UPDATE SET
      count = CASE
        WHEN rate_limits.window_start
             < now() - make_interval(secs => ${windowSeconds})
        THEN 1
        ELSE rate_limits.count + 1
      END,
      window_start = CASE
        WHEN rate_limits.window_start
             < now() - make_interval(secs => ${windowSeconds})
        THEN now()
        ELSE rate_limits.window_start
      END
    RETURNING
      count,
      GREATEST(0, CEIL(EXTRACT(EPOCH FROM (
        window_start + make_interval(secs => ${windowSeconds}) - now()
      ))))::int AS retry_after
  `;

  const { count, retry_after } = rows[0];

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    retryAfter: retry_after,
  };
}

/**
 * Best-effort cleanup of stale buckets. Called probabilistically so it costs
 * roughly nothing per request; the table is tiny either way.
 */
export async function pruneRateLimits() {
  try {
    await getPrisma().rateLimit.deleteMany({
      where: {
        windowStart: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    });
  } catch {
    // Housekeeping only — never fail a user's request over it.
  }
}

/**
 * Best-effort client IP.
 *
 * Behind Vercel or Cloudflare, `x-forwarded-for` is overwritten by the proxy
 * and the first entry is trustworthy. Served directly with no proxy in front,
 * this header is attacker-controlled and the per-IP limit degrades to the
 * global one — which is why the global backstop exists.
 */
export function clientIp(): string {
  const h = headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip")?.trim() || "unknown";
}

export function formatRetryAfter(seconds: number): string {
  if (seconds <= 60) return "a minute";
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minutes`;
}
