"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { isAuthenticated } from "@/lib/admin";
import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/db";

export async function logout() {
  await auth.api.signOut({ headers: headers() });
  revalidatePath("/admin");
}

export async function updateLeadStatus(id: number, status: LeadStatus) {
  // Every mutating action re-checks auth. The page gate protects the UI, but
  // a server action is a public endpoint that can be called directly.
  if (!(await isAuthenticated())) {
    return { ok: false as const, error: "Not authenticated." };
  }
  if (!LEAD_STATUSES.includes(status)) {
    return { ok: false as const, error: "Invalid status." };
  }

  await getPrisma().lead.update({
    where: { id: BigInt(id) },
    data: { status },
  });

  revalidatePath("/admin");
  return { ok: true as const };
}
