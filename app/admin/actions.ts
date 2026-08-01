"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  checkPassword,
  isAuthenticated,
  sessionToken,
} from "@/lib/auth";
import { getSql, LEAD_STATUSES, type LeadStatus } from "@/lib/db";

export async function login(
  password: string
): Promise<{ ok: boolean; error?: string }> {
  if (!checkPassword(password)) {
    // Deliberately vague — no hint about whether the password was close.
    return { ok: false, error: "Incorrect password." };
  }

  cookies().set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });

  return { ok: true };
}

export async function logout() {
  cookies().delete({ name: ADMIN_COOKIE, path: "/admin" });
  revalidatePath("/admin");
}

export async function updateLeadStatus(id: number, status: LeadStatus) {
  // Every mutating action re-checks auth. The layout gate protects the UI,
  // but a server action is a public endpoint that can be called directly.
  if (!isAuthenticated()) {
    return { ok: false as const, error: "Not authenticated." };
  }
  if (!LEAD_STATUSES.includes(status)) {
    return { ok: false as const, error: "Invalid status." };
  }

  const sql = getSql();
  await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`;
  revalidatePath("/admin");
  return { ok: true as const };
}
