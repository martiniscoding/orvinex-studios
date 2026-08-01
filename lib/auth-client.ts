import { createAuthClient } from "better-auth/react";

/**
 * Browser-side auth client. Talks to /api/auth on the same origin, so no
 * baseURL is needed — which also keeps the deployed URL out of the bundle.
 */
export const authClient = createAuthClient();

export const { signIn, signOut, useSession } = authClient;
