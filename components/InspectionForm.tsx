"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { requestInspection } from "@/app/actions";
import { initialAuthState } from "@/lib/auth-schema";
import { inspectionTimes } from "@/lib/site";
import Field from "./Field";
import FormStatus from "./FormStatus";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn--primary" type="submit" disabled={pending}>
      {pending ? "Sending…" : "Request my free inspection"}
    </button>
  );
}

export default function InspectionForm({
  defaultAddress,
  hasOpenRequest,
}: {
  defaultAddress: string;
  hasOpenRequest: boolean;
}) {
  const [state, formAction] = useActionState(requestInspection, initialAuthState);
  const err = (field: string) => state.fieldErrors?.[field];
  const kept = (field: string, fallback = "") => state.values?.[field] ?? fallback;

  if (hasOpenRequest && state.status !== "success") {
    return (
      <div className="panel-note">
        <p>
          <strong>You already have an inspection booked in.</strong> We will call to
          confirm the time. If you need to change it, give us a ring and we will sort
          it out.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate>
      <Field
        name="address"
        label="Service address"
        type="text"
        autoComplete="street-address"
        required
        defaultValue={kept("address", defaultAddress)}
        error={err("address")}
      />

      <div className="form-row">
        <Field
          name="preferredDate"
          label="Preferred date"
          type="date"
          defaultValue={kept("preferredDate")}
          hint="Optional — leave blank and we will suggest one."
          error={err("preferredDate")}
        />

        <Field name="preferredTime" label="Preferred time" error={err("preferredTime")}>
          <select
            id="preferredTime"
            name="preferredTime"
            defaultValue={kept("preferredTime", "any")}
          >
            {inspectionTimes.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field name="notes" label="Anything we should know?" error={err("notes")}>
        <textarea
          id="notes"
          name="notes"
          defaultValue={kept("notes")}
          placeholder="Anything playing up lately — slow drains, dripping taps, water pressure?"
        />
      </Field>

      <SubmitButton />
      <FormStatus state={state} />
    </form>
  );
}
