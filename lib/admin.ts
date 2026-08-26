import "server-only";

import { headers } from "next/headers";

import { auth } from "./auth";

/**
 * True when the caller holds a valid Better Auth session.
 *
 * Every admin page and every server action calls this for itself. A layout
 * cannot be the gate: Next still executes the page to build the layout's
 * children, and a server action is a public HTTP endpoint that runs whatever
 * the UI happens to be showing.
 */
export async function isAuthenticated() {
  const session = await auth.api.getSession({ headers: headers() });
  return Boolean(session);
}
