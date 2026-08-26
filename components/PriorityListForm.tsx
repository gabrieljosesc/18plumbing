"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { joinPriorityList } from "@/app/actions";
import { initialAuthState } from "@/lib/auth-schema";
import Field from "./Field";
import FormStatus from "./FormStatus";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn--navy btn--block" type="submit" disabled={pending}>
      {pending ? "Adding you…" : "Add me to the list"}
    </button>
  );
}

/** Free tier: name, phone, address. No password, no account. */
export default function PriorityListForm() {
  const [state, formAction] = useActionState(joinPriorityList, initialAuthState);
  const err = (field: string) => state.fieldErrors?.[field];
  const kept = (field: string) => state.values?.[field] ?? "";

  if (state.status === "success") {
    return (
      <div className="tier__done">
        <span className="tier__done-mark" aria-hidden="true">
          ✓
        </span>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate>
      <Field
        name="fullName"
        label="Name"
        type="text"
        autoComplete="name"
        required
        defaultValue={kept("fullName")}
        error={err("fullName")}
      />
      <Field
        name="phone"
        label="Phone"
        type="tel"
        autoComplete="tel"
        required
        defaultValue={kept("phone")}
        error={err("phone")}
      />
      <Field
        name="address"
        label="Address"
        type="text"
        autoComplete="street-address"
        required
        defaultValue={kept("address")}
        error={err("address")}
      />
      <Field
        name="email"
        label="Email (optional)"
        type="email"
        autoComplete="email"
        defaultValue={kept("email")}
        error={err("email")}
      />

      {/* Honeypot — hidden from people, tempting to naive bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <SubmitButton />
      <FormStatus state={state} />
    </form>
  );
}
