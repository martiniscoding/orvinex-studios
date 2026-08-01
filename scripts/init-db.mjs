/**
 * Creates the `leads` table. Idempotent — safe to re-run.
 *
 *   node --env-file=.env.local scripts/init-db.mjs
 */
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Run with --env-file=.env.local");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const before = await sql`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public' ORDER BY table_name
`;
console.log(
  "Tables before:",
  before.length ? before.map((r) => r.table_name).join(", ") : "(none)"
);

await sql`
  CREATE TABLE IF NOT EXISTS leads (
    id         BIGSERIAL PRIMARY KEY,
    full_name  TEXT        NOT NULL,
    email      TEXT        NOT NULL,
    phone      TEXT        NOT NULL,
    country    TEXT,
    details    TEXT        NOT NULL,
    status     TEXT        NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`
  CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)
`;

const cols = await sql`
  SELECT column_name, data_type, is_nullable
  FROM information_schema.columns
  WHERE table_schema = 'public' AND table_name = 'leads'
  ORDER BY ordinal_position
`;
console.log("\nleads table:");
for (const c of cols) {
  console.log(
    `  ${c.column_name.padEnd(12)} ${c.data_type.padEnd(26)} ${
      c.is_nullable === "YES" ? "NULL" : "NOT NULL"
    }`
  );
}

const [{ count }] = await sql`SELECT count(*)::int AS count FROM leads`;
console.log(`\nExisting rows: ${count}`);
