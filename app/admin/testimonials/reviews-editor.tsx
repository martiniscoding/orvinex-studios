"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

import { TestimonialCard } from "@/components/TestimonialCard";
import type { Testimonial } from "@/lib/testimonial";
import {
  createTestimonial,
  deleteTestimonial,
  moveTestimonial,
  setTestimonialPublished,
  updateTestimonial,
  type TestimonialInput,
} from "./actions";
import { resizePhoto } from "./photo";

const inputClass =
  "w-full rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-2.5 text-[14.5px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-primary/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/25";

const labelClass = "mb-1.5 block text-[12.5px] font-medium text-white/70";

const iconButtonClass =
  "rounded-full border border-white/10 p-2 text-white/40 transition-colors hover:text-white disabled:opacity-30";

const BLANK: TestimonialInput = {
  name: "",
  role: "",
  quote: "",
  photo: "",
  published: true,
};

function toInput(item: Testimonial): TestimonialInput {
  return {
    name: item.name,
    role: item.role,
    quote: item.quote,
    photo: item.photo ?? "",
    published: item.published,
  };
}

function same(a: TestimonialInput, b: TestimonialInput) {
  return (
    a.name === b.name &&
    a.role === b.role &&
    a.quote === b.quote &&
    a.photo === b.photo &&
    a.published === b.published
  );
}

function PhotoField({
  value,
  name,
  onChange,
  onError,
}: {
  value: string;
  name: string;
  onChange: (photo: string) => void;
  onError: (message: string | null) => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [working, setWorking] = useState(false);

  async function pick(file: File | undefined) {
    if (!file) return;
    onError(null);
    setWorking(true);
    try {
      onChange(await resizePhoto(file));
    } catch (problem) {
      onError(problem instanceof Error ? problem.message : "That photo did not load.");
    } finally {
      setWorking(false);
      // Clear the input, or picking the same file twice in a row does nothing.
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  const uploaded = value.startsWith("data:");

  return (
    <div>
      <span className={labelClass}>Photo</span>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={working}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[13px] text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white disabled:opacity-40"
        >
          <Upload className="h-3.5 w-3.5" strokeWidth={2.2} />
          {working ? "Reading…" : uploaded ? "Replace photo" : "Upload photo"}
        </button>

        {value && (
          <button
            type="button"
            onClick={() => {
              onError(null);
              onChange("");
            }}
            className="text-[13px] text-white/45 transition-colors hover:text-red-400"
          >
            Remove
          </button>
        )}

        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => pick(event.target.files?.[0])}
        />
      </div>

      {!uploaded && (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="…or paste an https:// image link"
          className={`${inputClass} mt-3 text-[13.5px]`}
        />
      )}

      <p className="mt-2 text-[12px] text-white/30">
        Cropped to a square and shrunk in your browser before it is saved. With
        no photo, {name.trim() ? `${name.trim()}'s` : "the reviewer's"} initials
        are shown instead.
      </p>
    </div>
  );
}

/**
 * One review — saved or not yet.
 *
 * A new review is a local card until it is saved rather than a blank row
 * created up front, so abandoning it leaves nothing behind.
 */
function ReviewPanel({
  item,
  index,
  count,
  onDiscardDraft,
}: {
  item: Testimonial | null;
  index: number;
  count: number;
  onDiscardDraft?: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [baseline, setBaseline] = useState<TestimonialInput>(
    item ? toInput(item) : BLANK
  );
  const [draft, setDraft] = useState<TestimonialInput>(baseline);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  const dirty = !same(draft, baseline);

  function set(patch: Partial<TestimonialInput>) {
    setDraft((prev) => ({ ...prev, ...patch }));
  }

  function run(
    action: () => Promise<{ ok: boolean; error?: string }>,
    onFailure?: () => void
  ) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (!result.ok) {
        setError(result.error ?? "That did not work.");
        onFailure?.();
        return;
      }
      router.refresh();
    });
  }

  function save() {
    setError(null);
    startTransition(async () => {
      const result = item
        ? await updateTestimonial(item.id, draft)
        : await createTestimonial(draft);

      if (!result.ok) {
        setError(result.error);
        return;
      }
      // The saved values become the new "unchanged" state — comparing against
      // the props would call the panel dirty until the refresh lands.
      setBaseline(draft);
      router.refresh();
      onDiscardDraft?.();
    });
  }

  return (
    <div
      className={`rounded-2xl border bg-surface/50 p-5 sm:p-6 ${
        item ? "border-white/[0.08]" : "border-primary/30"
      } ${item && !draft.published ? "opacity-70" : ""}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11.5px] tracking-[0.14em] text-white/30">
            {item ? String(index + 1).padStart(2, "0") : "NEW"}
          </span>
          {item && !draft.published && (
            <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
              Hidden
            </span>
          )}
          {dirty && (
            <span className="text-[12.5px] text-amber-300/80">
              Unsaved changes
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {item && (
            <>
              <button
                type="button"
                disabled={pending || index === 0}
                onClick={() => run(() => moveTestimonial(item.id, "up"))}
                aria-label="Move up"
                className={iconButtonClass}
              >
                <ArrowUp className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
              <button
                type="button"
                disabled={pending || index === count - 1}
                onClick={() => run(() => moveTestimonial(item.id, "down"))}
                aria-label="Move down"
                className={iconButtonClass}
              >
                <ArrowDown className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  // Flipped here as well as on the server so the card dims
                  // immediately; put back if the write does not land.
                  const published = !draft.published;
                  const revert = () => {
                    set({ published: !published });
                    setBaseline((prev) => ({ ...prev, published: !published }));
                  };
                  set({ published });
                  setBaseline((prev) => ({ ...prev, published }));
                  run(
                    () => setTestimonialPublished(item.id, published),
                    revert
                  );
                }}
                aria-label={
                  draft.published ? "Hide from the site" : "Show on the site"
                }
                className={
                  draft.published
                    ? "rounded-full border border-primary/40 p-2 text-primary transition-colors disabled:opacity-30"
                    : iconButtonClass
                }
              >
                {draft.published ? (
                  <Eye className="h-3.5 w-3.5" strokeWidth={2} />
                ) : (
                  <EyeOff className="h-3.5 w-3.5" strokeWidth={2} />
                )}
              </button>
            </>
          )}

          {item && confirming ? (
            <span className="flex items-center gap-2">
              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  setConfirming(false);
                  run(() => deleteTestimonial(item.id));
                }}
                className="rounded-full bg-red-500/90 px-3 py-1.5 text-[12.5px] font-semibold text-white disabled:opacity-40"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="text-[12.5px] text-white/50 hover:text-white"
              >
                Cancel
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => (item ? setConfirming(true) : onDiscardDraft?.())}
              aria-label={item ? "Delete review" : "Discard review"}
              className="rounded-full border border-white/10 p-2 text-white/40 transition-colors hover:border-red-500/40 hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor={`name-${index}-${item?.id ?? "new"}`}>
                Name
              </label>
              <input
                id={`name-${index}-${item?.id ?? "new"}`}
                value={draft.name}
                onChange={(event) => set({ name: event.target.value })}
                placeholder="Amit C."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor={`role-${index}-${item?.id ?? "new"}`}>
                Role and company
              </label>
              <input
                id={`role-${index}-${item?.id ?? "new"}`}
                value={draft.role}
                onChange={(event) => set({ role: event.target.value })}
                placeholder="CEO, LogisticsTech"
                className={inputClass}
              />
            </div>
          </div>

          <label
            className={`${labelClass} mt-4`}
            htmlFor={`quote-${index}-${item?.id ?? "new"}`}
          >
            What they said
          </label>
          <textarea
            id={`quote-${index}-${item?.id ?? "new"}`}
            value={draft.quote}
            onChange={(event) => set({ quote: event.target.value })}
            rows={5}
            placeholder="They delivered our custom ERP two weeks ahead of schedule…"
            className={`${inputClass} resize-y leading-relaxed`}
          />
          <p className="mt-1.5 text-[12px] text-white/30">
            {draft.quote.trim().length} characters — the cards share a height,
            so around 150 to 250 reads best.
          </p>

          <div className="mt-5">
            <PhotoField
              value={draft.photo}
              name={draft.name}
              onChange={(photo) => set({ photo })}
              onError={setError}
            />
          </div>
        </div>

        <div>
          <span className={labelClass}>On the site</span>
          <TestimonialCard
            item={{
              id: item?.id ?? "preview",
              name: draft.name.trim() || "Their name",
              role: draft.role.trim(),
              quote: draft.quote.trim() || "What they said about the work.",
              photo: draft.photo.trim() || null,
              published: draft.published,
              position: index,
            }}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-end gap-3 border-t border-white/[0.06] pt-4">
        {error && (
          <span className="mr-auto text-[13px] text-red-400" role="alert">
            {error}
          </span>
        )}
        {!error && item && !dirty && (
          <span className="mr-auto text-[13px] text-white/30">Saved</span>
        )}
        <button
          type="button"
          disabled={pending || (Boolean(item) && !dirty)}
          onClick={save}
          className="rounded-full bg-primary-deep px-6 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-primary disabled:opacity-40"
        >
          {pending ? "Saving…" : item ? "Save" : "Add review"}
        </button>
      </div>
    </div>
  );
}

export function ReviewsEditor({ initial }: { initial: Testimonial[] }) {
  // Only the keys matter: each entry is one unsaved card on screen.
  const [drafts, setDrafts] = useState<number[]>([]);
  const nextDraft = useRef(0);

  return (
    <div className="space-y-5 pb-24">
      {initial.length === 0 && drafts.length === 0 && (
        <p className="rounded-2xl border border-white/[0.08] bg-surface/50 px-6 py-10 text-center text-[14.5px] text-muted">
          No reviews yet. The section stays off the landing page until there is
          at least one.
        </p>
      )}

      {initial.map((item, index) => (
        <ReviewPanel
          key={item.id}
          item={item}
          index={index}
          count={initial.length}
        />
      ))}

      {drafts.map((key) => (
        <ReviewPanel
          key={`draft-${key}`}
          item={null}
          index={initial.length}
          count={initial.length}
          onDiscardDraft={() =>
            setDrafts((prev) => prev.filter((entry) => entry !== key))
          }
        />
      ))}

      <button
        type="button"
        onClick={() => setDrafts((prev) => [...prev, nextDraft.current++])}
        className="inline-flex items-center gap-2 rounded-full bg-primary-deep px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-primary"
      >
        <Plus className="h-4 w-4" strokeWidth={2.4} />
        Add review
      </button>
    </div>
  );
}
