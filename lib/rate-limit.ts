import { headers } from "next/headers";

/** Requests one address may send within the window. */
const PER_ADDRESS = 3;
/** Requests everyone may send within the window, protecting the send quota. */
const OVERALL = 30;
const WINDOW_MS = 10 * 60 * 1000;

/** Not a valid address, so it can never collide with a real one. */
const OVERALL_KEY = "*";

const hits = new Map<string, number[]>();

/**
 * The submitter's address. Both headers are set by the platform in front of the
 * function, not by the client — Netlify populates the first, and the second is
 * the generic proxy fallback.
 */
async function clientAddress() {
  const list = await headers();

  return (
    list.get("x-nf-client-connection-ip") ??
    list.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

/** Drops expired timestamps so the map stays the size of the active window. */
function prune(now: number) {
  for (const [key, times] of hits) {
    const recent = times.filter((at) => now - at < WINDOW_MS);
    if (recent.length === 0) hits.delete(key);
    else hits.set(key, recent);
  }
}

export type RateLimitResult = { allowed: true } | { allowed: false; reason: string };

/**
 * Counts one submission against both limits, allowing it only if neither is
 * already spent.
 *
 * The counters live in memory, so on a serverless host they are per-instance
 * and reset on a cold start. That still bounds what a single burst can send,
 * but it is not a hard guarantee — a determined attacker spread across
 * instances gets more through. A challenge (Turnstile, reCAPTCHA) is the
 * upgrade path if abuse ever becomes real.
 *
 * Call this only once a submission is otherwise valid and about to be sent, so
 * that a customer mistyping their email does not spend their own allowance.
 */
export async function recordSubmission(): Promise<RateLimitResult> {
  const now = Date.now();
  prune(now);

  const address = await clientAddress();
  const fromAddress = hits.get(address) ?? [];
  const overall = hits.get(OVERALL_KEY) ?? [];

  if (fromAddress.length >= PER_ADDRESS) {
    return { allowed: false, reason: `address ${address} exceeded ${PER_ADDRESS} per window` };
  }

  if (overall.length >= OVERALL) {
    return { allowed: false, reason: `site-wide limit of ${OVERALL} per window reached` };
  }

  hits.set(address, [...fromAddress, now]);
  hits.set(OVERALL_KEY, [...overall, now]);

  return { allowed: true };
}
