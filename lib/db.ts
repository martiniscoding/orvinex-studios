export const LEAD_STATUSES = ["new", "contacted", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/**
 * A lead as handed to client components.
 *
 * Deliberately not Prisma's own `Lead` type: that carries a BigInt id and a
 * Date, neither of which survives serialisation across the server/client
 * boundary. `serialiseLead` in app/admin/page.tsx does the conversion.
 */
export type Lead = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  country: string | null;
  details: string;
  status: string;
  createdAt: string;
};
