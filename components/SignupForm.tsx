"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { signUp } from "@/app/actions";
import { initialAuthState } from "@/lib/auth-schema";
import { planOptions, pricing, type PlanValue } from "@/lib/site";
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

export default function SignupForm({ initialPlan }: { initialPlan: PlanValue }) {
  const [state, formAction] = useActionState(signUp, initialAuthState);
  const err = (field: string) => state.fieldErrors?.[field];
  // React resets the form to these once the action settles, which is exactly
  // what restores a rejected submission instead of blanking it.
  const kept = (field: string) => state.values?.[field] ?? "";

  const keptPlan = state.values?.plan as PlanValue | undefined;
  const [plan, setPlan] = useState<PlanValue>(keptPlan ?? initialPlan);

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
      <h1>Join the plan</h1>
      <p className="auth-lede">
        Annual inspection, {pricing.labourDiscount}% off labour, a yearly tank
        flush and front of the queue.
      </p>

      <form action={formAction} noValidate>
        <fieldset className="plan-picker">
          <legend>Choose your billing</legend>
          {planOptions.map((option) => (
            <label
              key={option.value}
              className={plan === option.value ? "plan-opt is-picked" : "plan-opt"}
            >
              <input
                type="radio"
                name="plan"
                value={option.value}
                checked={plan === option.value}
                onChange={() => setPlan(option.value)}
              />
              <span className="plan-opt__body">
                <span className="plan-opt__label">{option.label}</span>
                <span className="plan-opt__price">
                  {option.price} <small>{option.per}</small>
                </span>
                <span className="plan-opt__note">{option.note}</span>
              </span>
            </label>
          ))}
        </fieldset>

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
        <p className="form-note">
          No card needed now — we take payment over the phone and switch your
          benefits on.
        </p>
        <FormStatus state={state} />
      </form>

      <p className="auth-switch">
        Already a member? <Link href="/login">Sign in</Link>
      </p>
    </div>
  );
}
