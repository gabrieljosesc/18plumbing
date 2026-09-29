"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import {
  inspectionUpdate,
  leadStatusUpdate,
  memberStatusUpdate,
  priorityStatusUpdate,
} from "@/lib/admin-schema";
import { torontoLocalToIso } from "@/lib/time";

/*
 * Status changes from the admin dashboard.
 *
 * Every action re-checks that the caller is staff before touching anything.
 * RLS would refuse the write anyway; the check here is so a non-admin gets a
 * redirect rather than a confusing "0 rows updated".
 *
 * Plain <form action> submissions, so each one ends in a redirect back to the
 * section it came from with a saved/error flag rather than returning state.
 */

function finish(ok: boolean, section: string): never {
  revalidatePath("/admin");
  redirect(`/admin?${ok ? "saved" : "error"}=1#${section}`);
}

export async function updateLeadStatus(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();

  const parsed = leadStatusUpdate.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) finish(false, "leads");

  const { error } = await supabase
    .from("leads")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id);

  if (error) console.error("updateLeadStatus", error);
  finish(!error, "leads");
}

export async function updatePriorityStatus(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();

  const parsed = priorityStatusUpdate.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) finish(false, "priority");

  const { error } = await supabase
    .from("priority_list")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id);

  if (error) console.error("updatePriorityStatus", error);
  finish(!error, "priority");
}

export async function updateMemberStatus(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();

  const parsed = memberStatusUpdate.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) finish(false, "members");

  const { error } = await supabase
    .from("profiles")
    .update({ membership_status: parsed.data.status })
    .eq("id", parsed.data.id);

  if (error) console.error("updateMemberStatus", error);
  finish(!error, "members");
}

export async function updateInspection(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();

  const parsed = inspectionUpdate.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
    scheduledFor: formData.get("scheduledFor"),
  });
  if (!parsed.success) finish(false, "inspections");

  // Typed in Toronto time by staff; stored as an instant.
  const scheduled_for = parsed.data.scheduledFor
    ? torontoLocalToIso(parsed.data.scheduledFor)
    : null;

  const { error } = await supabase
    .from("inspection_requests")
    .update({ status: parsed.data.status, scheduled_for })
    .eq("id", parsed.data.id);

  if (error) console.error("updateInspection", error);
  finish(!error, "inspections");
}
