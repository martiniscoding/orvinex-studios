import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

const limits = { name: 120, email: 200, company: 160, projectType: 60, budget: 60, message: 5000 };

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
  const projectType = text(body.projectType, limits.projectType) || null;
  const budget = text(body.budget, limits.budget) || null;
  const message = text(body.message, limits.message);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and the project details." }, { status: 400 });
  }

  try {
    await pool.query(
      `insert into leads (name, email, company, project_type, budget, message)
       values ($1, $2, $3, $4, $5, $6)`,
      [name, email, company, projectType, budget, message],
    );
  } catch (err) {
    console.error("Failed to save lead", err);
    return NextResponse.json({ error: "Something went wrong on our side." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
