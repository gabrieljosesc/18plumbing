"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn } from "@/app/actions";
import { initialAuthState, type AuthFormState } from "@/lib/auth-schema";
import Field from "./Field";
import FormStatus from "./FormStatus";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn--primary btn--block" type="submit" disabled={pending}>
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function LoginForm({
  next,
  notice,
}: {
  next?: string;
  notice?: string;
}) {
  // A notice from the confirmation route shows before anything is submitted.
  const seeded: AuthFormState = notice
    ? { status: "error", message: notice }
    : initialAuthState;

  const [state, formAction] = useActionState(signIn, seeded);
  const err = (field: string) => state.fieldErrors?.[field];
  const kept = (field: string) => state.values?.[field] ?? "";

  return (
    <div className="auth-card">
      <h1>Member sign in</h1>
      <p className="auth-lede">
        Sign in to book your free inspection and see your membership details.
      </p>

      <form action={formAction} noValidate>
        {next && <input type="hidden" name="next" value={next} />}

        <Field
          name="email"
          defaultValue={kept("email")}
          label="Email"
          type="email"
          autoComplete="email"
          required
          error={err("email")}
        />
        <Field
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          error={err("password")}
        />

        <SubmitButton />
        <FormStatus state={state} />
      </form>

      <p className="auth-switch">
        Not a member yet? <Link href="/signup">Create an account</Link>
      </p>
    </div>
  );
}
