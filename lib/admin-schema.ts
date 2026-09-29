import { z } from "zod";

/*
 * Status vocabularies for the admin dashboard. These mirror the CHECK
 * constraints in supabase/migrations — change one, change the other.
 *
 * Kept out of app/admin/actions.ts on purpose: a "use server" file may only
 * export async functions, so constants shared with the page live here.
 */

export const LEAD_STATUSES = [
  "new", "contacted", "quoted", "booked", "won", "lost", "spam",
] as const;

export const PRIORITY_STATUSES = ["new", "contacted", "converted", "archived"] as const;

export const MEMBER_STATUSES = ["pending", "active", "paused", "cancelled"] as const;

export const INSPECTION_STATUSES = [
  "requested", "scheduled", "completed", "cancelled",
] as const;

export const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  booked: "Booked",
  won: "Won",
  lost: "Lost",
  spam: "Spam",
  converted: "Converted",
  archived: "Archived",
  pending: "Pending",
  active: "Active",
  paused: "Paused",
  cancelled: "Cancelled",
  requested: "Requested",
  scheduled: "Scheduled",
  completed: "Completed",
};

export const PREFERRED_TIME_LABELS: Record<string, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  any: "Any time",
};

export const leadStatusUpdate = z.object({
  id: z.uuid(),
  status: z.enum(LEAD_STATUSES),
});

export const priorityStatusUpdate = z.object({
  id: z.uuid(),
  status: z.enum(PRIORITY_STATUSES),
});

export const memberStatusUpdate = z.object({
  id: z.uuid(),
  status: z.enum(MEMBER_STATUSES),
});

export const inspectionUpdate = z.object({
  id: z.uuid(),
  status: z.enum(INSPECTION_STATUSES),
  // What a <input type="datetime-local"> submits, or nothing.
  scheduledFor: z
    .union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/)])
    .nullish()
    .transform((value) => (value ? value : null)),
});
