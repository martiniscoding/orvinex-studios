"use server";

import { getPrisma } from "@/lib/prisma";
import {
  clientIp,
  formatRetryAfter,
  pruneRateLimits,
  rateLimit,
} from "@/lib/rate-limit";
import {
  validateLead,
  type LeadErrors,
  type LeadFields,
} from "@/lib/validate-lead";

/**
 * Per-IP limit. Generous enough that a real person correcting a typo and
 * resubmitting is never blocked, tight enough that scripted flooding stops
 * after a handful of writes. Office and mobile networks share public IPs,
 * so do not tune this much lower.
 */
const PER_IP_LIMIT = 5;
const PER_IP_WINDOW = 10 * 60;

/**
 * Global backstop against distributed spam from many IPs. Deliberately
 * generous: this is a shared bucket, so anyone who exhausts it also blocks
 * genuine enquiries. Raise it if you ever run a campaign.
 */
const GLOBAL_LIMIT = 100;
const GLOBAL_WINDOW = 60 * 60;

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
  // Honeypot first: it costs no database round-trip, so obvious bots are
  // rejected before they can consume any resource at all.
  if (honeypot && honeypot.trim() !== "") {
    return { ok: true };
  }

  // Rate limit before validation. Checking validity first would let an
  // attacker send unlimited malformed payloads without ever being throttled.
  try {
    const ip = clientIp();

    const perIp = await rateLimit(`lead:ip:${ip}`, PER_IP_LIMIT, PER_IP_WINDOW);
    if (!perIp.allowed) {
      return {
        ok: false,
        error: `Too many submissions from this network. Please try again in ${formatRetryAfter(
          perIp.retryAfter
        )}, or email us directly.`,
      };
    }

    const global = await rateLimit("lead:global", GLOBAL_LIMIT, GLOBAL_WINDOW);
    if (!global.allowed) {
      return {
        ok: false,
        error:
          "We're receiving an unusual number of enquiries right now. Please email us directly and we'll get straight back to you.",
      };
    }

    if (Math.random() < 0.01) void pruneRateLimits();
  } catch (error) {
    // Fail open: a rate-limiter outage must not take the contact form down.
    console.error("Rate limit check failed, allowing request:", error);
  }

  const fieldErrors = validateLead(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  try {
    await getPrisma().lead.create({
      data: {
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        country: values.country.trim() || null,
        details: values.details.trim(),
      },
    });
    return { ok: true };
  } catch (error) {
    console.error("Failed to store lead:", error);
    return {
      ok: false,
      error: "Something went wrong on our end. Please email us directly.",
    };
  }
}
