import "server-only";

import type { SupabaseClient, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * True when the signed-in user is listed in public.admins.
 *
 * RLS lets a user see only their own admin row, so this is a one-row lookup
 * whether or not they are staff. Being an admin is decided by that table and
 * nothing else — not by email domain, not by metadata the client could set.
 */
export async function isAdminUser(
  supabase: SupabaseClient,
  userId: string,
): Promise<boolean> {
  const { data } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  return Boolean(data);
}

/**
 * Gate for the admin page and its actions. Anyone else is sent away — to sign
 * in if they have no session, to their own account if they do.
 *
 * The database enforces the same rule through RLS, so this is the polite layer,
 * not the only one.
 */
export async function requireAdmin(): Promise<{ supabase: SupabaseClient; user: User }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/admin");
  if (!(await isAdminUser(supabase, user.id))) redirect("/account");

  return { supabase, user };
}
