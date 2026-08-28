"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, FileLock2, ShieldCheck } from "lucide-react";
import { submitLead } from "@/app/actions";
import {
  EMPTY_LEAD as EMPTY,
  validateLead as validate,
  type LeadErrors as Errors,
  type LeadFields as Fields,
} from "@/lib/validate-lead";
import { Reveal } from "./ui/Reveal";

const inputClass =
  "w-full rounded-xl border border-ink/[0.09] bg-ink/[0.03] px-4 py-3 text-[14.5px] text-ink placeholder:text-ink/30 outline-none transition-colors duration-200 focus:border-primary/60 focus:bg-ink/[0.05] focus:ring-2 focus:ring-primary/25";

export function ContactCTA() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  // Hidden from humans by CSS; only bots fill it in.
  const [honeypot, setHoneypot] = useState("");

  const update = (key: keyof Fields) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setFormError(null);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setPending(true);
    const result = await submitLead(values, honeypot);
    setPending(false);

    if (result.ok) {
      setSubmitted(true);
      setValues(EMPTY);
      setHoneypot("");
      return;
    }

    setSubmitted(false);
    if (result.fieldErrors) setErrors(result.fieldErrors);
    if (result.error) setFormError(result.error);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-ink/[0.06] bg-background py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[520px] bg-grid-sm mask-fade-y opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[110vw] max-w-[1200px] -translate-x-1/2 rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgb(var(--primary) / calc(0.28 * var(--wash))) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <Reveal>
          <h2 className="font-display text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.035em] text-ink">
            Stop delaying your growth.
          </h2>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-muted">
            Talk to a software development team trusted by clients worldwide.
            Let&apos;s discuss your project architecture.
          </p>

          <div className="mt-9 flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-ink/[0.08] bg-surface/60 px-4 py-3">
              <ShieldCheck className="h-[18px] w-[18px] shrink-0 text-primary" strokeWidth={2} />
              <span className="text-[14px] font-medium text-ink/85">
                100% Confidential
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-ink/[0.08] bg-surface/60 px-4 py-3">
              <FileLock2 className="h-[18px] w-[18px] shrink-0 text-primary" strokeWidth={2} />
              <span className="text-[14px] font-medium text-ink/85">
                NDA signed upon request.
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="rounded-3xl border border-ink/[0.09] bg-surface/80 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                id="fullName"
                label="Full Name"
                required
                placeholder="Rohan Sharma"
                value={values.fullName}
                onChange={update("fullName")}
                error={errors.fullName}
              />
              <Field
                id="email"
                label="Email Address"
                type="email"
                required
                placeholder="you@company.com"
                value={values.email}
                onChange={update("email")}
                error={errors.email}
              />
              <Field
                id="phone"
                label="Phone"
                type="tel"
                required
                placeholder="+91 82728 91238"
                value={values.phone}
                onChange={update("phone")}
                error={errors.phone}
              />
              <Field
                id="country"
                label="Country"
                placeholder="India"
                value={values.country}
                onChange={update("country")}
                error={errors.country}
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="details"
                className="mb-2 block text-[13px] font-medium text-ink/80"
              >
                Project Details <span className="text-primary">*</span>
              </label>
              <textarea
                id="details"
                rows={5}
                placeholder="Tell us what you're building, your timeline, and the outcome you need."
                value={values.details}
                onChange={(e) => update("details")(e.target.value)}
                aria-invalid={Boolean(errors.details)}
                aria-describedby={errors.details ? "details-error" : undefined}
                className={`${inputClass} resize-y ${
                  errors.details ? "border-red-400/60" : ""
                }`}
              />
              {errors.details && (
                <p id="details-error" className="mt-1.5 text-[12.5px] text-red-400">
                  {errors.details}
                </p>
              )}
            </div>

            {/* Honeypot: off-screen and hidden from assistive tech, so a
                human never sees or tabs into it. */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-0">
              <label htmlFor="company-website">Company website</label>
              <input
                id="company-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <motion.button
              type="submit"
              disabled={pending}
              whileHover={pending ? undefined : { scale: 1.02, y: -2 }}
              whileTap={pending ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary-deep px-7 py-3.5 text-[15px] font-semibold text-ink shadow-glow-btn-lg transition-colors hover:bg-primary hover:shadow-glow-lg disabled:opacity-60"
            >
              {pending ? "Sending…" : "Submit Inquiry"}
              {!pending && (
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.2}
                />
              )}
            </motion.button>

            {formError && (
              <p
                className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-[13.5px] text-red-300"
                role="alert"
              >
                {formError}
              </p>
            )}

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-center text-[13.5px] text-ink/90"
                role="status"
              >
                Thanks — your inquiry is logged. We&apos;ll be in touch shortly.
              </motion.p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[13px] font-medium text-ink/80"
      >
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass} ${error ? "border-red-400/60" : ""}`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[12.5px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
