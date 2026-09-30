import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";
import type { Lead } from "@/lib/leads";

const columns = ["id", "created_at", "status", "name", "email", "phone", "country", "project_type", "budget", "message", "notes"] as const;

function cell(v: unknown) {
  const s = v instanceof Date ? v.toISOString() : String(v ?? "");
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** All leads as a CSV download, for spreadsheets. */
export async function GET(req: Request) {
  if (!(await auth.api.getSession({ headers: req.headers }))) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { rows } = await pool.query<Lead>("select * from leads order by created_at desc");
  const csv = [columns.join(","), ...rows.map((r) => columns.map((c) => cell(r[c])).join(","))].join("\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="orvinex-leads-${date}.csv"`,
    },
  });
}
