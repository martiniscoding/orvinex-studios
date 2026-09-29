/**
 * Creates the Better Auth tables, the leads table and the articles tables.
 * Safe to run again.
 *   npm run db:setup
 */
import { getMigrations } from "better-auth/db/migration";
import { authOptions } from "@/lib/auth-options";
import { articlesTableSql } from "@/lib/article-store";
import { leadsTableSql, pool } from "@/lib/db";

async function main() {
  const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(authOptions);
  if (toBeCreated.length || toBeAdded.length) {
    await runMigrations();
    console.log("Auth tables:", toBeCreated.map((t) => t.table).join(", ") || "updated");
  } else {
    console.log("Auth tables already up to date.");
  }

  await pool.query(leadsTableSql);
  console.log("Leads table ready.");

  await pool.query(articlesTableSql);
  console.log("Articles tables ready.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
