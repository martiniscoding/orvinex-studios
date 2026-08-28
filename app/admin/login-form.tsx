"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

import { signIn } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-xl border border-ink/[0.09] bg-ink/[0.03] px-4 py-3 text-[14.5px] text-ink outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/25";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const { error: signInError } = await signIn.email({ email, password });

    if (signInError) {
      // Deliberately vague — never reveal whether the address exists, which
      // would turn this form into an account enumeration oracle.
      setError("Those credentials aren't right.");
      setPending(false);
      return;
    }

    // The session cookie is set; re-render the server tree so the gate in
    // page.tsx now sees a session and returns the dashboard.
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-ink/[0.09] bg-surface/80 p-7"
      >
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-deep">
          <Lock className="h-5 w-5 text-ink" strokeWidth={2} />
        </span>

        <h1 className="mt-5 font-display text-[22px] font-bold tracking-tight text-ink">
          Admin access
        </h1>
        <p className="mt-1.5 text-[13.5px] text-muted">
          Sign in to view inquiries.
        </p>

        <label
          htmlFor="email"
          className="mb-2 mt-6 block text-[13px] font-medium text-ink/80"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoFocus
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />

        <label
          htmlFor="password"
          className="mb-2 mt-4 block text-[13px] font-medium text-ink/80"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />

        {error && (
          <p className="mt-2.5 text-[13px] text-red-400" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending || !email || !password}
          className="mt-6 w-full rounded-full bg-primary-deep px-6 py-3 text-[14.5px] font-semibold text-ink transition-colors hover:bg-primary disabled:opacity-40"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
