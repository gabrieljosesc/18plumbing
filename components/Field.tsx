import type { ReactNode } from "react";

type FieldProps = {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children?: ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "id">;

/**
 * One labelled form control with its validation message.
 *
 * Pass `children` to supply your own control (select, textarea); otherwise an
 * input is rendered from the remaining props.
 */
export default function Field({
  name,
  label,
  error,
  required,
  hint,
  children,
  ...inputProps
}: FieldProps) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="field">
      <label htmlFor={name}>
        {label} {required && <span className="req">*</span>}
      </label>

      {children ?? (
        <input
          id={name}
          name={name}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          {...inputProps}
        />
      )}

      {hint && (
        <p className="field-hint" id={hintId}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
