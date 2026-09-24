"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead } from "@/app/actions";
import { readAttribution, track } from "@/lib/analytics";
import { initialAuthState } from "@/lib/auth-schema";
import { CallButton, PhoneLink, TextButton } from "./CallButton";
import Field from "./Field";
import FormStatus from "./FormStatus";
import { CloseIcon, UploadIcon } from "./Icons";

const MAX_PHOTOS = 3;
/** Longest edge after downscaling. Plenty to see a leak, small enough to send. */
const MAX_EDGE = 1600;
const JPEG_QUALITY = 0.82;

type Preview = { file: File; url: string };

/**
 * Shrinks a phone photo before upload.
 *
 * A modern phone camera produces 3–8MB images, which are slow to send on mobile
 * data and are the main reason a form like this gets abandoned. Downscaling in
 * the browser turns that into a couple of hundred KB with no visible loss for
 * the purpose. Falls back to the original file if anything goes wrong.
 */
async function downscale(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 1_000_000) return file;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);

    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
    );
    if (!blob || blob.size >= file.size) return file;

    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", {
      type: "image/jpeg",
    });
  } catch {
    return file;
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn--primary btn--block" type="submit" disabled={pending}>
      {pending ? "Sending…" : "Send my request"}
    </button>
  );
}

export default function LeadForm({
  service,
  sourceSlug,
  heading = "Get a quote",
  lede = "Tell us what is going on and we will call you back. Faster than waiting on hold, and you can do it from your desk.",
  compact = false,
}: {
  /** Prefills which service this enquiry is about, for ad attribution. */
  service?: string;
  sourceSlug?: string;
  heading?: string;
  lede?: string;
  compact?: boolean;
}) {
  const [state, formAction] = useActionState(submitLead, initialAuthState);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [processing, setProcessing] = useState(false);
  const [attribution, setAttribution] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const err = (field: string) => state.fieldErrors?.[field];
  const kept = (field: string) => state.values?.[field] ?? "";

  // Ad click ids were stashed on arrival; read them back at submit time.
  useEffect(() => setAttribution(readAttribution()), []);

  useEffect(() => {
    if (state.status === "success") {
      track("lead_form_submit", { service: service ?? "general", source: sourceSlug });
      setPreviews((current) => {
        current.forEach((p) => URL.revokeObjectURL(p.url));
        return [];
      });
    }
  }, [state.status, service, sourceSlug]);

  // Release object URLs when the component goes away.
  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onPickFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    if (!picked.length) return;

    setProcessing(true);
    const room = MAX_PHOTOS - previews.length;
    const shrunk = await Promise.all(picked.slice(0, room).map(downscale));
    setPreviews((current) => [
      ...current,
      ...shrunk.map((file) => ({ file, url: URL.createObjectURL(file) })),
    ]);
    setProcessing(false);

    // Clear the input so the same file can be picked again after removal.
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(index: number) {
    setPreviews((current) => {
      URL.revokeObjectURL(current[index].url);
      return current.filter((_, i) => i !== index);
    });
  }

  if (state.status === "success") {
    return (
      <div className={compact ? "lead-card lead-card--compact" : "lead-card"}>
        <div className="lead-done">
          <span className="lead-done__mark" aria-hidden="true">
            ✓
          </span>
          <h3>Request sent</h3>
          <p>{state.message}</p>
          <CallButton className="btn btn--primary btn--block" location="lead-success" />
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? "lead-card lead-card--compact" : "lead-card"}>
      <h3>{heading}</h3>
      <p className="lead-lede">{lede}</p>

      <div className="lead-quick">
        <CallButton className="btn btn--primary" location="lead-form-header" />
        <TextButton className="btn btn--outline" location="lead-form-header" />
      </div>

      <div className="lead-divider">
        <span>or send details</span>
      </div>

      <form
        ref={formRef}
        action={(formData) => {
          // Attach the downscaled files rather than whatever the input holds.
          formData.delete("photos");
          previews.forEach((p) => formData.append("photos", p.file));
          return formAction(formData);
        }}
        noValidate
      >
        {service && <input type="hidden" name="service" value={service} />}
        {sourceSlug && <input type="hidden" name="sourceSlug" value={sourceSlug} />}
        <input type="hidden" name="attribution" value={attribution} />

        <div className="form-row">
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
        </div>

        <div className="form-row">
          <Field
            name="postalCode"
            label="Postal code"
            type="text"
            autoComplete="postal-code"
            required
            placeholder="M6A 1A1"
            defaultValue={kept("postalCode")}
            error={err("postalCode")}
          />
          <Field
            name="email"
            label="Email (optional)"
            type="email"
            autoComplete="email"
            defaultValue={kept("email")}
            error={err("email")}
          />
        </div>

        <Field name="problem" label="What is the problem?" required error={err("problem")}>
          <textarea
            id="problem"
            name="problem"
            required
            defaultValue={kept("problem")}
            placeholder="e.g. Kitchen sink is backing up and the dishwasher won't drain. Started yesterday."
          />
        </Field>

        {/* ------------------------------------------------ photos */}
        <div className="field">
          <label htmlFor="photos">
            Photos <span className="field-optional">optional, up to {MAX_PHOTOS}</span>
          </label>
          <p className="field-hint">
            A photo of the problem usually means we turn up with the right part.
          </p>

          {previews.length < MAX_PHOTOS && (
            <label className="lead-upload">
              <UploadIcon />
              <span>{processing ? "Preparing…" : "Add a photo"}</span>
              <input
                ref={fileInputRef}
                id="photos"
                type="file"
                accept="image/*"
                multiple
                capture="environment"
                onChange={onPickFiles}
              />
            </label>
          )}

          {previews.length > 0 && (
            <ul className="lead-thumbs">
              {previews.map((preview, index) => (
                <li key={preview.url}>
                  {/* Local object URL, not a remote image — plain img is right here. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview.url} alt={`Attached photo ${index + 1}`} />
                  <button
                    type="button"
                    aria-label={`Remove photo ${index + 1}`}
                    onClick={() => removePhoto(index)}
                  >
                    <CloseIcon />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Honeypot — hidden from people, tempting to naive bots. */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <SubmitButton />
        <p className="form-note">
          Urgent? Call <PhoneLink location="lead_form" /> — open 24 hours.
        </p>
        <FormStatus state={state} />
      </form>
    </div>
  );
}
