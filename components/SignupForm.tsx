"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUp } from "@/app/actions";
import { initialAuthState } from "@/lib/auth-schema";
import Field from "./Field";
import FormStatus from "./FormStatus";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn--primary btn--block" type="submit" disabled={pending}>
      {pending ? "Creating your account…" : "Create my membership"}
    </button>
  );
}

export default function SignupForm() {
  const [state, formAction] = useActionState(signUp, initialAuthState);
  const err = (field: string) => state.fieldErrors?.[field];
  // React resets the form to these once the action settles, which is exactly
  // what restores a rejected submission instead of blanking it.
  const kept = (field: string) => state.values?.[field] ?? "";

  // Once the confirmation email is away, the form has nothing left to do.
  if (state.status === "success") {
    return (
      <div className="auth-card">
        <div className="auth-done">
          <span className="auth-done__mark" aria-hidden="true">
            ✓
          </span>
          <h1>Check your inbox</h1>
          <p>{state.message}</p>
          <p className="auth-done__small">
            The link can take a minute to arrive, and it sometimes lands in spam.
          </p>
          <Link className="btn btn--outline btn--block" href="/login">
            Go to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h1>Become a member</h1>
      <p className="auth-lede">
        Priority scheduling, a free yearly inspection and a standing discount on
        every job. No fee to join.
      </p>

      <form action={formAction} noValidate>
        <Field
          name="fullName"
          defaultValue={kept("fullName")}
          label="Full name"
          type="text"
          autoComplete="name"
          required
          error={err("fullName")}
        />
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
          name="phone"
          defaultValue={kept("phone")}
          label="Phone"
          type="tel"
          autoComplete="tel"
          required
          error={err("phone")}
        />
        <Field
          name="address"
          defaultValue={kept("address")}
          label="Service address"
          type="text"
          autoComplete="street-address"
          required
          hint="Where we would normally be working — you can change this later."
          error={err("address")}
        />

        <div className="form-row">
          <Field
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            hint="At least 8 characters."
            error={err("password")}
          />
          <Field
            name="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            required
            error={err("confirmPassword")}
          />
        </div>

        <SubmitButton />
        <FormStatus state={state} />
      </form>

      <p className="auth-switch">
        Already a member? <Link href="/login">Sign in</Link>
      </p>
    </div>
  );
}
