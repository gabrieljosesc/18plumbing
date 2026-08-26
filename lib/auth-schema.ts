import { z } from "zod";

/** Shared shape returned by every auth server action. */
export type AuthFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
  /**
   * Non-secret values echoed back so a rejected submission does not wipe the
   * form. React 19 resets uncontrolled inputs to their defaultValue once an
   * action settles, so feeding these back in restores what was typed.
   * Passwords are deliberately never included.
   */
  values?: Record<string, string>;
};

export const initialAuthState: AuthFormState = { status: "idle", message: "" };

/** Pulls the named fields out of a submission so they can be echoed back. */
export function keepValues(
  formData: FormData,
  fields: readonly string[],
): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of fields) {
    const value = formData.get(field);
    if (typeof value === "string") values[field] = value;
  }
  return values;
}

const password = z
  .string()
  .min(8, "Use at least 8 characters.")
  .max(72, "Passwords are limited to 72 characters.");

/** The lead form — the "will not phone" path. */
export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "That name is too long."),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number we can reach you on.")
    .max(40, "That phone number is too long."),

  email: z
    .union([z.literal(""), z.email("That email address does not look right.")])
    .nullish()
    .transform((value) => (value ? value : null)),

  // Canadian postal codes, with or without the space. Loose on purpose —
  // rejecting a real customer over formatting costs more than a messy record.
  postalCode: z
    .string()
    .trim()
    .min(3, "Please enter your postal code.")
    .max(12, "That postal code is too long.")
    .transform((value) => value.toUpperCase().replace(/\s+/g, " ")),

  problem: z
    .string()
    .trim()
    .min(5, "Tell us briefly what is going wrong.")
    .max(4000, "Please trim this down a little."),

  service: z.string().trim().max(120).nullish().transform((v) => (v ? v : null)),
  sourceSlug: z.string().trim().max(120).nullish().transform((v) => (v ? v : null)),
  attribution: z.string().trim().max(2000).nullish().transform((v) => (v ? v : null)),
});

/** The free priority list — no password, just enough to find the property. */
export const priorityListSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "That name is too long."),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number we can reach you on.")
    .max(40, "That phone number is too long."),

  address: z
    .string()
    .trim()
    .min(5, "Please enter the address we would be servicing.")
    .max(300, "That address is too long."),

  // .nullish(), not .optional(): FormData.get() returns null for a field that
  // is not rendered at all, and .optional() only tolerates undefined.
  email: z
    .union([z.literal(""), z.email("That email address does not look right.")])
    .nullish()
    .transform((value) => (value ? value : null)),

  notes: z
    .string()
    .trim()
    .max(2000, "Please keep this under 2000 characters.")
    .nullish()
    .transform((value) => (value ? value : null)),
});

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your name.")
      .max(120, "That name is too long."),

    email: z.email("That email address does not look right."),

    phone: z
      .string()
      .trim()
      .min(7, "Please enter a phone number we can reach you on.")
      .max(40, "That phone number is too long."),

    address: z
      .string()
      .trim()
      .min(5, "Please enter the address we would be servicing.")
      .max(300, "That address is too long."),

    password,
    confirmPassword: z.string(),

    // Which plan they picked on the way in. Staff activate after payment.
    plan: z.enum(["monthly", "annual"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The two passwords do not match.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("That email address does not look right."),
  password: z.string().min(1, "Please enter your password."),
});

export const inspectionSchema = z.object({
  address: z
    .string()
    .trim()
    .min(5, "Please confirm the service address.")
    .max(300, "That address is too long."),

  preferredDate: z
    .union([z.literal(""), z.iso.date("Please pick a valid date.")])
    .nullish()
    .transform((value) => (value ? value : null)),

  preferredTime: z
    .enum(["morning", "afternoon", "evening", "any"])
    .nullish()
    .transform((value) => value ?? "any"),

  notes: z
    .string()
    .trim()
    .max(2000, "Please keep the notes under 2000 characters.")
    .nullish()
    .transform((value) => (value ? value : null)),
});

/** Turns a ZodError into the flat map the forms render. */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !(field in fieldErrors)) {
      fieldErrors[field] = issue.message;
    }
  }
  return fieldErrors;
}
