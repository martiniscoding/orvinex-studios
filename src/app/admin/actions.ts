"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { pool } from "@/lib/db";
import { leadStatuses, type LeadStatus } from "@/lib/leads";

export async function setLeadStatus(id: number, status: LeadStatus) {
  await requireAdmin();
  if (!leadStatuses.includes(status)) throw new Error("Unknown status");
  await pool.query("update leads set status = $1 where id = $2", [status, id]);
  revalidatePath("/admin");
}

export async function setLeadNotes(id: number, notes: string) {
  await requireAdmin();
  await pool.query("update leads set notes = $1 where id = $2", [notes.slice(0, 5000) || null, id]);
  revalidatePath("/admin");
}

export async function deleteLead(id: number) {
  await requireAdmin();
  await pool.query("delete from leads where id = $1", [id]);
  revalidatePath("/admin");
}
