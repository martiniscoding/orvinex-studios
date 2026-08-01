import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/lib/auth";

/**
 * Every Better Auth endpoint — sign-in, sign-out, session — is served from
 * this one catch-all route.
 */
export const { GET, POST } = toNextJsHandler(auth);
