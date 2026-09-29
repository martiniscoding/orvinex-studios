/** Shared by the article list and the editor; safe in the browser. */

const todayUtc = () => new Date().toISOString().slice(0, 10);

export function statusOf(p: { draft: boolean; date: string }) {
  if (p.draft) return { label: "Draft", dot: "bg-faint" } as const;
  if (p.date > todayUtc()) return { label: "Scheduled", dot: "bg-[#c08a2b]" } as const;
  return { label: "Published", dot: "bg-[#2f7d4f]" } as const;
}

export function scoreColour(score: number) {
  return score >= 85 ? "text-[#2f7d4f]" : score >= 60 ? "text-[#c08a2b]" : "text-accent";
}
