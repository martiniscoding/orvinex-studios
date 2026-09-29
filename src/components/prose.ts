/** Styles for the rendered Markdown, set through descendant selectors. */
export const prose = [
  "text-[1.0625rem] leading-[1.75] text-ink-2",
  "[&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:text-[clamp(1.5rem,2.6vw,2rem)] [&_h2]:leading-[1.2] [&_h2]:font-semibold [&_h2]:tracking-[-0.025em] [&_h2]:text-ink",
  "[&_h3]:mt-9 [&_h3]:scroll-mt-28 [&_h3]:text-[1.25rem] [&_h3]:font-semibold [&_h3]:tracking-[-0.02em] [&_h3]:text-ink",
  "[&_h4]:mt-7 [&_h4]:font-semibold [&_h4]:text-ink",
  "[&_p]:mt-5 [&_strong]:font-semibold [&_strong]:text-ink",
  "[&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/30 [&_a]:underline-offset-4 hover:[&_a]:decoration-accent",
  "[&_ul]:mt-5 [&_ul]:list-disc [&_ol]:mt-5 [&_ol]:list-decimal [&_ul]:space-y-2 [&_ol]:space-y-2 [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:pl-1.5 [&_li]:marker:text-accent/70",
  "[&_blockquote]:mt-7 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:text-ink [&_blockquote]:italic",
  "[&_code]:rounded [&_code]:bg-hush [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em]",
  "[&_pre]:mt-6 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:bg-ink [&_pre]:p-5 [&_pre]:text-[0.875rem] [&_pre]:text-white [&_pre_code]:bg-transparent [&_pre_code]:p-0",
  "[&_img]:mt-8 [&_img]:w-full [&_img]:rounded-[var(--radius-card)]",
  "[&_hr]:my-12 [&_hr]:border-line",
  "[&_.table-wrap]:mt-6 [&_.table-wrap]:overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_table]:text-[0.9375rem]",
  "[&_th]:border-b [&_th]:border-ink/20 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-ink",
  "[&_td]:border-b [&_td]:border-line [&_td]:px-3 [&_td]:py-2 [&_td]:align-top",
].join(" ");
