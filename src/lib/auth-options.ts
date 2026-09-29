import type { BetterAuthOptions } from "better-auth";
import { pool } from "@/lib/db";
import { site } from "@/content/site";

/**
 * Every origin a sign-in may legitimately come from. Better Auth rejects any
 * other with "Invalid origin", so this covers the domain with and without
 * www (both resolve), and on Vercel the deployment and branch URLs too.
 */
function trustedOrigins() {
  const origins = new Set<string>();
  const add = (url?: string) => {
    if (!url) return;
    try {
      const u = new URL(url.startsWith("http") ? url : `https://${url}`);
      origins.add(u.origin);
      const alt = u.hostname.startsWith("www.") ? u.hostname.slice(4) : `www.${u.hostname}`;
      if (!u.hostname.includes("localhost") && !u.hostname.endsWith(".vercel.app")) {
        origins.add(`${u.protocol}//${alt}`);
      }
    } catch {
      // Not a URL; ignore it rather than break sign-in.
    }
  };
  add(site.url);
  add(process.env.BETTER_AUTH_URL);
  add(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  add(process.env.VERCEL_URL);
  add(process.env.VERCEL_BRANCH_URL);
  return [...origins];
}

/**
 * Shared Better Auth config, kept free of Next.js imports so the setup
 * scripts can use it too. Public sign-up is off: admin accounts are only
 * created with `npm run admin:create`.
 */
export const authOptions = {
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: trustedOrigins(),
  emailAndPassword: { enabled: true, disableSignUp: true, minPasswordLength: 10 },
  session: { expiresIn: 60 * 60 * 24 * 7 },
} satisfies BetterAuthOptions;
