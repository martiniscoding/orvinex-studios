import type { BetterAuthOptions } from "better-auth";
import { pool } from "@/lib/db";

/**
 * Shared Better Auth config, kept free of Next.js imports so the setup
 * scripts can use it too. Public sign-up is off: admin accounts are only
 * created with `npm run admin:create`.
 */
export const authOptions = {
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: true, disableSignUp: true, minPasswordLength: 10 },
  session: { expiresIn: 60 * 60 * 24 * 7 },
} satisfies BetterAuthOptions;
