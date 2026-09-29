/** Lead types, safe to import from client components (no database code). */
export const leadStatuses = ["new", "contacted", "qualified", "won", "lost"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export type Lead = {
  id: number;
  created_at: Date;
  name: string;
  email: string;
  company: string | null;
  project_type: string | null;
  budget: string | null;
  message: string;
  status: LeadStatus;
  notes: string | null;
};
