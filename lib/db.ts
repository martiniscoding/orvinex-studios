import { neon } from "@neondatabase/serverless";

/**
 * Neon client, resolved lazily.
 *
 * Deliberately not a module-level constant: reading DATABASE_URL at import
 * time would make `next build` fail on any machine without the env var set,
 * even though nothing is queried during the build.
 */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set.");
  }
  return neon(url);
}

export type Lead = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  country: string | null;
  details: string;
  status: string;
  created_at: string;
};

export const LEAD_STATUSES = ["new", "contacted", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
