import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "orvinex_admin";

/** Constant-time string compare that tolerates differing lengths. */
function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/**
 * The session cookie value: an HMAC of the password under ADMIN_SECRET.
 *
 * The password itself never reaches the browser, and the token cannot be
 * forged without the secret. Rotating either env var invalidates all
 * existing sessions.
 */
export function sessionToken() {
  const secret = process.env.ADMIN_SECRET;
  const password = process.env.ADMIN_PASSWORD;
  if (!secret || !password) {
    throw new Error("ADMIN_SECRET and ADMIN_PASSWORD must both be set.");
  }
  return createHmac("sha256", secret).update(password).digest("hex");
}

export function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}

export function isAuthenticated() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  try {
    return safeEqual(token, sessionToken());
  } catch {
    return false;
  }
}
