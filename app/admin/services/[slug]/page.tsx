import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { auth } from "@/lib/auth";
import { getCatalogueService } from "@/lib/service-catalogue";
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

  const service = await getCatalogueService(params.slug);
  if (!service) notFound();

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <AdminHeader current="services" />
        <div className="mb-8 mt-8">
          <p className="font-mono text-[12px] tracking-[0.2em] text-primary">
            {service.code}
          </p>
          <h1 className="mt-2 font-display text-[26px] font-bold tracking-tight text-white">
            {service.title}
          </h1>
        </div>
        <ServiceEditor
          slug={service.slug}
          initial={{
            title: service.title,
            short: service.short,
            cardText: service.description,
            stack: service.stack,
            band: service.band,
            icon: service.icon,
            featured: service.featured,
            headline: service.headline,
            intro: service.intro,
            body: service.body,
            faq: service.faq,
            metaTitle: service.metaTitle ?? "",
            metaDescription: service.metaDescription ?? "",
            keyword: service.keyword ?? "",
          }}
        />
      </div>
    </main>
  );
}
