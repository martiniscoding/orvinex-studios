import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { LoginForm } from "../../login-form";
import { AdminHeader } from "../../admin-header";
import { PostEditor } from "../post-editor";

export default async function NewPostPage() {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) return <LoginForm />;

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <AdminHeader current="blog" />
        <h1 className="mb-8 mt-8 font-display text-[26px] font-bold tracking-tight text-ink">
          New post
        </h1>
        <PostEditor />
      </div>
    </main>
  );
}
