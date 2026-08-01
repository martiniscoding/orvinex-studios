"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { login } from "./actions";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const result = await login(password);

    if (result.ok) {
      // The cookie is set; re-fetch the server component tree so the gate
      // in layout.tsx now renders the dashboard.
      router.refresh();
    } else {
      setError(result.error ?? "Login failed.");
      setPending(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-white/[0.09] bg-surface/80 p-7"
      >
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-deep">
          <Lock className="h-5 w-5 text-white" strokeWidth={2} />
        </span>

        <h1 className="mt-5 font-display text-[22px] font-bold tracking-tight text-white">
          Admin access
        </h1>
        <p className="mt-1.5 text-[13.5px] text-muted">
          Enter the dashboard password to view inquiries.
        </p>

        <label
          htmlFor="password"
          className="mb-2 mt-6 block text-[13px] font-medium text-white/80"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-3 text-[14.5px] text-white outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
        />

        {error && (
          <p className="mt-2.5 text-[13px] text-red-400" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending || !password}
          className="mt-6 w-full rounded-full bg-primary-deep px-6 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-primary disabled:opacity-40"
        >
          {pending ? "Checking…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
