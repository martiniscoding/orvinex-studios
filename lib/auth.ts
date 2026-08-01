import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

import { getPrisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(getPrisma(), { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,

    /**
     * The only gate on /admin is "do you hold a valid session", so an open
     * sign-up endpoint would let anyone on the internet register and read
     * every inquiry. Accounts are created deliberately, by
     * `npm run seed:admin`.
     */
    disableSignUp: true,

    minPasswordLength: 12,

    // No email provider is wired up, so a verification or reset link would
    // go nowhere. Reset a forgotten password with `npm run seed:admin`.
    requireEmailVerification: false,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh the expiry at most once a day

    /**
     * Cookie caching is deliberately OFF. It lets getSession trust a signed
     * cookie without reading the database, which means a revoked session —
     * sign-out, password reset — keeps working until the cached cookie
     * expires. Verified: with it on, a captured cookie still opened the
     * dashboard after sign-out. This table guards customer contact details
     * and sees a handful of requests a day, so the saved query is worth far
     * less than revocation taking effect immediately.
     */
    cookieCache: { enabled: false },
  },

  // Must be last: rewrites Set-Cookie from server actions, which Next
  // otherwise drops.
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
