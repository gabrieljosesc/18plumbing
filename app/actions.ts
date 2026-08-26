"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  inspectionSchema,
  keepValues,
  priorityListSchema,
  loginSchema,
  signupSchema,
  toFieldErrors,
  type AuthFormState,
} from "@/lib/auth-schema";
import { site } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

const FALLBACK = `If this keeps happening, call ${site.phone} or email ${site.email}.`;

/** Absolute origin of the current request, for building the confirmation link. */
async function getOrigin(): Promise<string> {
  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  return host ? `${protocol}://${host}` : site.url;
}

/* ------------------------------------------------------------------ signup */

export async function signUp(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signupSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    plan: formData.get("plan"),
  });

  const keep = keepValues(formData, [
    "fullName",
    "email",
    "phone",
    "address",
    "plan",
  ]);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
      values: keep,
    };
  }

  const supabase = await createClient();
  const origin = await getOrigin();

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      // Read by the handle_new_user() trigger to populate public.profiles.
      data: {
        full_name: parsed.data.fullName,
        phone: parsed.data.phone,
        address: parsed.data.address,
        plan: parsed.data.plan,
      },
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    return {
      status: "error",
      message:
        error.message ||
        `Sorry, we could not create that account right now. ${FALLBACK}`,
      values: keep,
    };
  }

  // Supabase returns a user with an empty identities array when the address is
  // already registered. Saying so plainly is fine — the login page reveals the
  // same thing, and a vague message just strands the real owner.
  if (data.user && data.user.identities?.length === 0) {
    return {
      status: "error",
      message:
        "That email address already has an account. Try signing in instead, " +
        "or reset your password.",
      values: keep,
    };
  }

  return {
    status: "success",
    message:
      `Almost there — we sent a confirmation link to ${parsed.data.email}. ` +
      "Click it to confirm your email, then we will call to set up payment " +
      "and switch your benefits on.",
  };
}

/* ------------------------------------------------ free priority list */

export async function joinPriorityList(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  // Honeypot — hidden field, so anything in it is a bot. Report success so it
  // learns nothing from the response.
  if (formData.get("company")) {
    return { status: "success", message: "Thanks — you are on the list." };
  }

  const parsed = priorityListSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    email: formData.get("email"),
    notes: formData.get("notes"),
  });

  const keep = keepValues(formData, [
    "fullName",
    "phone",
    "address",
    "email",
    "notes",
  ]);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
      values: keep,
    };
  }

  const headerList = await headers();

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("priority_list").insert({
      full_name: parsed.data.fullName,
      phone: parsed.data.phone,
      address: parsed.data.address,
      email: parsed.data.email,
      notes: parsed.data.notes,
      source_page: headerList.get("referer"),
    });
    if (error) throw error;
  } catch (error) {
    console.error("joinPriorityList: insert failed", error);
    return {
      status: "error",
      message: `Sorry, that did not go through. ${FALLBACK}`,
      values: keep,
    };
  }

  return {
    status: "success",
    message:
      "You are on the list. Next time you call we will already have your " +
      `address on file — just give us your name on ${site.phone}.`,
  };
}

/* ------------------------------------------------------------------- login */

export async function signIn(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const keep = keepValues(formData, ["email"]);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
      values: keep,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    const unconfirmed = error.message.toLowerCase().includes("not confirmed");
    return {
      status: "error",
      message: unconfirmed
        ? "That account still needs confirming — check your inbox for the link we sent."
        : "That email and password combination did not work. Please try again.",
      values: keep,
    };
  }

  const next = formData.get("next");
  const target = typeof next === "string" && next.startsWith("/") ? next : "/account";

  revalidatePath("/", "layout");
  redirect(target);
}

/* ------------------------------------------------------------------ logout */

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

/* ------------------------------------------------- book free inspection */

export async function requestInspection(
  _previous: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      status: "error",
      message: "Your session has expired. Please sign in again.",
    };
  }

  const parsed = inspectionSchema.safeParse({
    address: formData.get("address"),
    preferredDate: formData.get("preferredDate"),
    preferredTime: formData.get("preferredTime"),
    notes: formData.get("notes"),
  });

  const keep = keepValues(formData, [
    "address",
    "preferredDate",
    "preferredTime",
    "notes",
  ]);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: toFieldErrors(parsed.error),
      values: keep,
    };
  }

  const { error } = await supabase.from("inspection_requests").insert({
    member_id: user.id,
    address: parsed.data.address,
    preferred_date: parsed.data.preferredDate,
    preferred_time: parsed.data.preferredTime,
    notes: parsed.data.notes,
  });

  if (error) {
    console.error("requestInspection: insert failed", error);
    return {
      status: "error",
      message: `Sorry, that did not go through. ${FALLBACK}`,
      values: keep,
    };
  }

  revalidatePath("/account");
  return {
    status: "success",
    message:
      "Booked — we have your inspection request and will call to confirm a time.",
  };
}
