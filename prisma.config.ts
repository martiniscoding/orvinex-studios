import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Secrets live in .env.local (gitignored). Prisma's own dotenv loading only
// looks at .env, so point it at the right file before defineConfig reads it.
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    /**
     * DDL runs over the direct connection, not the pooled one: PgBouncer in
     * transaction mode cannot hold the session-level state that schema
     * changes and advisory locks need. Runtime queries still use the pooled
     * DATABASE_URL — see lib/prisma.ts.
     */
    url: env("DIRECT_URL"),
  },
});
