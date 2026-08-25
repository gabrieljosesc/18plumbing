import type { AuthFormState } from "@/lib/auth-schema";

/** Success / error banner shared by every form on the site. */
export default function FormStatus({ state }: { state: AuthFormState }) {
  const className =
    state.status === "idle"
      ? "form-status"
      : `form-status is-visible form-status--${state.status === "success" ? "ok" : "err"}`;

  return (
    <div className={className} role="status" aria-live="polite">
      {state.message}
    </div>
  );
}
