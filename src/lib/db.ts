import { Pool } from "pg";

/**
 * One Postgres pool (Neon) for the whole app. In dev it is parked on
 * globalThis so hot reloads don't open a new pool each time.
 */
const g = globalThis as unknown as { pgPool?: Pool };

export const pool =
  g.pgPool ?? new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });

if (process.env.NODE_ENV !== "production") g.pgPool = pool;

/** Columns added after the table first shipped. Safe to run again. */
export const leadsColumnsSql = `
  alter table leads add column if not exists phone text;
  alter table leads add column if not exists country text;
`;

/** Run by `npm run db:setup`; safe to run again. */
export const leadsTableSql = `
  create table if not exists leads (
    id serial primary key,
    created_at timestamptz not null default now(),
    name text not null,
    email text not null,
    project_type text,
    budget text,
    phone text,
    country text,
    message text not null,
    status text not null default 'new',
    notes text
  );
  create index if not exists leads_created_at_idx on leads (created_at desc);
  ${leadsColumnsSql}
`;
