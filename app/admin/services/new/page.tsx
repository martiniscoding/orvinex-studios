import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { LoginForm } from "../../login-form";
import { AdminHeader } from "../../admin-header";
import { ServiceEditor } from "../service-editor";

export default async function NewServicePage() {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) return <LoginForm />;

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <AdminHeader current="services" />
        <h1 className="mb-8 mt-8 font-display text-[26px] font-bold tracking-tight text-white">
          New service
        </h1>
        <ServiceEditor
          initial={{
            title: "",
            short: "",
            cardText: "",
            stack: [],
            band: "build",
            icon: "Code2",
            featured: false,
            headline: "",
            intro: "",
            body: "## What we build\n\n",
            faq: [],
            metaTitle: "",
            metaDescription: "",
            keyword: "",
          }}
        />
      </div>
    </main>
  );
}
