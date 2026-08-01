/**
 * Lead validation shared by the client form and the server action.
 *
 * The client copy gives instant feedback; the server copy is the one that
 * actually protects the database. Never trust the browser's result — anyone
 * can POST straight at the action.
 */

export type LeadFields = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  details: string;
};

export type LeadErrors = Partial<Record<keyof LeadFields, string>>;

export const EMPTY_LEAD: LeadFields = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  details: "",
};

/** Guards against oversized payloads reaching Postgres. */
export const MAX_LENGTHS: Record<keyof LeadFields, number> = {
  fullName: 120,
  email: 200,
  phone: 40,
  country: 80,
  details: 5000,
};

export function validateLead(values: LeadFields): LeadErrors {
  const errors: LeadErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  } else if (values.fullName.trim().length > MAX_LENGTHS.fullName) {
    errors.fullName = "That name is too long.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  } else if (values.email.trim().length > MAX_LENGTHS.email) {
    errors.email = "That email address is too long.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^[+()\d\s-]{7,20}$/.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (values.country.trim().length > MAX_LENGTHS.country) {
    errors.country = "That country name is too long.";
  }

  if (!values.details.trim()) {
    errors.details = "Tell us a little about your project.";
  } else if (values.details.trim().length < 20) {
    errors.details = "Please give us at least 20 characters of context.";
  } else if (values.details.trim().length > MAX_LENGTHS.details) {
    errors.details = "Please keep the project details under 5000 characters.";
  }

  return errors;
}
