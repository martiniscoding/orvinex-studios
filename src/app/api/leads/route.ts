import { NextResponse } from "next/server";
import { leadsColumnsSql, pool } from "@/lib/db";

const limits = { name: 120, email: 200, company: 160, phone: 32, country: 60, projectType: 60, message: 5000 };

/* Adds the phone and country columns if this database predates them, once
   per server instance, so the form keeps working before db:setup is re-run. */
let columnsReady: Promise<unknown> | null = null;
const ensureColumns = () =>
  (columnsReady ??= pool.query(leadsColumnsSql).catch((err) => {
    columnsReady = null;
    throw err;
  }));

function text(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** The contact form posts here; each brief becomes a row in `leads`. */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a hidden field people never see. Bots fill it; pretend it worked.
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const name = text(body.name, limits.name);
  const email = text(body.email, limits.email);
  const company = text(body.company, limits.company) || null;
  const phone = text(body.phone, limits.phone) || null;
  const country = text(body.country, limits.country) || null;
  const projectType = text(body.projectType, limits.projectType) || null;
  const message = text(body.message, limits.message);

  if (!name || !message || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please fill in your name, a valid email, a phone number and the project details." }, { status: 400 });
  }
  if (!/^\+?[0-9 ()-]{6,24}$/.test(phone)) {
    return NextResponse.json({ error: "That phone number doesn't look right. Use digits only, e.g. 98765 43210." }, { status: 400 });
  }

  try {
    await ensureColumns();
    await pool.query(
      `insert into leads (name, email, company, phone, country, project_type, message)
       values ($1, $2, $3, $4, $5, $6, $7)`,
      [name, email, company, phone, country, projectType, message],
    );
  } catch (err) {
    console.error("Failed to save lead", err);
    return NextResponse.json({ error: "Something went wrong on our side." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
