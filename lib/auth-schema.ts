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
    .optional()
    .transform((value) => (value ? value : null)),

  preferredTime: z
    .enum(["morning", "afternoon", "evening", "any"])
    .optional()
    .transform((value) => value ?? "any"),

  notes: z
    .string()
    .trim()
    .max(2000, "Please keep the notes under 2000 characters.")
    .optional()
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
