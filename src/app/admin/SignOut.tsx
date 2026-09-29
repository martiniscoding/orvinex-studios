"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignOut() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await authClient.signOut();
        router.replace("/admin/login");
        router.refresh();
      }}
      className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-2 transition-colors hover:border-ink hover:text-ink"
    >
      Sign out
    </button>
  );
}
