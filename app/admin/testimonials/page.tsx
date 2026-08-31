import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { listAllTestimonials } from "@/lib/testimonials";
import { LoginForm } from "../login-form";
import { AdminHeader } from "../admin-header";
import { ReviewsEditor } from "./reviews-editor";

export default async function AdminTestimonialsPage() {
  // The gate lives on the page, not the layout — see the note in ../page.tsx.
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) return <LoginForm />;

  const reviews = await listAllTestimonials();
  const live = reviews.filter((review) => review.published);

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <AdminHeader current="reviews" />

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[26px] font-bold tracking-tight text-white">
              Reviews
            </h1>
            <p className="mt-1 text-[14px] text-muted">
              {live.length} on the site
              {reviews.length > live.length &&
                ` · ${reviews.length - live.length} hidden`}
            </p>
          </div>

          <a
            href="/#reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13.5px] text-muted transition-colors hover:text-white"
          >
            View on the site
          </a>
        </div>

        <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-white/40">
          These are the cards on the landing page, in the order they appear
          there. The section disappears entirely while nothing is showing.
        </p>

        <div className="mt-6">
          <ReviewsEditor initial={reviews} />
        </div>
      </div>
    </main>
  );
}
