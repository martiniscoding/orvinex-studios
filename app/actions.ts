"use server";

import { getSql } from "@/lib/db";
import {
  validateLead,
  type LeadErrors,
  type LeadFields,
} from "@/lib/validate-lead";

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; fieldErrors?: LeadErrors; error?: string };

/**
 * Stores a contact-form submission.
 *
 * `honeypot` is a field hidden from humans by CSS. Bots fill every input they
 * find, so a non-empty value means automation — we return success without
 * writing anything, which is quieter than an error and gives no feedback to
 * tune against.
 */
export async function submitLead(
  values: LeadFields,
  honeypot?: string
): Promise<SubmitLeadResult> {
  if (honeypot && honeypot.trim() !== "") {
    return { ok: true };
  }

  const fieldErrors = validateLead(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  try {
    const sql = getSql();
    await sql`
      INSERT INTO leads (full_name, email, phone, country, details)
      VALUES (
        ${values.fullName.trim()},
        ${values.email.trim()},
        ${values.phone.trim()},
        ${values.country.trim() || null},
        ${values.details.trim()}
      )
    `;
    return { ok: true };
  } catch (error) {
    console.error("Failed to store lead:", error);
    return {
      ok: false,
      error: "Something went wrong on our end. Please email us directly.",
    };
  }
}
