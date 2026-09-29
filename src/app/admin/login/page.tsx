import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Mark } from "@/components/Icons";
import { auth } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if (await auth.api.getSession({ headers: await headers() })) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-[var(--radius-card)] border border-line bg-card p-8 shadow-[0_30px_60px_-44px_rgba(30,36,48,0.55)]">
        <Mark size={36} />
        <h1 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">Sign in</h1>
        <p className="mt-1.5 text-sm text-muted">Orvinex admin</p>
        <LoginForm />
      </div>
    </main>
  );
}
