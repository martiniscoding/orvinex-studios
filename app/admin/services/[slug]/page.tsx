import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { auth } from "@/lib/auth";
import { getServicePage } from "@/lib/service-pages";
import { SERVICES } from "@/lib/services";
import { LoginForm } from "../../login-form";
import { AdminHeader } from "../../admin-header";
import { ServiceEditor } from "../service-editor";

export default async function EditServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) return <LoginForm />;

  const page = await getServicePage(params.slug);
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!page || !service) notFound();

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <AdminHeader current="services" />
        <div className="mb-8 mt-8">
          <p className="font-mono text-[12px] tracking-[0.2em] text-primary">
            {service.code}
          </p>
          <h1 className="mt-2 font-display text-[26px] font-bold tracking-tight text-ink">
            {service.title}
          </h1>
        </div>
        <ServiceEditor
          slug={page.slug}
          title={service.title}
          initial={{
            headline: page.headline,
            intro: page.intro,
            body: page.body,
            faq: page.faq,
            metaTitle: page.metaTitle ?? "",
            metaDescription: page.metaDescription ?? "",
            keyword: page.keyword ?? "",
          }}
        />
      </div>
    </main>
  );
}
