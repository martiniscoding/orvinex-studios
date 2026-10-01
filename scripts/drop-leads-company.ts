/**
 * Removes the unused `company` column from the leads table. The contact form
 * stopped collecting it in dfb134b; this deletes what older leads entered.
 *
 *   npm run db:drop-company            dry run: count, back up, change nothing
 *   npm run db:drop-company -- --yes   back up, then drop the column
 *
 * Every non-empty company value is first saved to
 * backups/leads-company-<timestamp>.csv (git-ignored: it holds names and
 * emails). Safe to run again: it exits early once the column is gone.
 */
import fs from "node:fs";
import path from "node:path";
import { pool } from "@/lib/db";

const csv = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

async function main() {
  const drop = process.argv.includes("--yes");

  const { rowCount: exists } = await pool.query(
    `select 1 from information_schema.columns
     where table_schema = 'public' and table_name = 'leads' and column_name = 'company'`,
  );
  if (!exists) {
    console.log("leads.company doesn't exist. Nothing to do.");
    return;
  }

  const { rows } = await pool.query<{ id: number; created_at: Date; name: string; email: string; company: string }>(
    `select id, created_at, name, email, company from leads
     where company is not null and company <> '' order by id`,
  );
  const { rows: [{ total }] } = await pool.query<{ total: number }>(`select count(*)::int as total from leads`);
  console.log(`${total} lead(s); ${rows.length} with a company filled in.`);

  if (rows.length) {
    const dir = path.join(process.cwd(), "backups");
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `leads-company-${new Date().toISOString().replace(/[:.]/g, "-")}.csv`);
    const lines = ["id,created_at,name,email,company", ...rows.map((r) =>
      [r.id, r.created_at.toISOString(), r.name, r.email, r.company].map(csv).join(","),
    )];
    fs.writeFileSync(file, lines.join("\n") + "\n");
    console.log(`Backed up to ${path.relative(process.cwd(), file)}`);
  }

  if (!drop) {
    console.log("Dry run: nothing changed. Re-run with -- --yes to drop the column.");
    return;
  }

  await pool.query(`alter table leads drop column company`);
  console.log("Dropped leads.company.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
