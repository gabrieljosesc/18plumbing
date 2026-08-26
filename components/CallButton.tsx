"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";
import { MessageIcon, PhoneIcon } from "./Icons";

/**
 * Phone and SMS links that report a conversion when clicked.
 *
 * Click-to-call is the main conversion on a plumbing site, so it cannot be a
 * plain <a> — without this there is no way to tell which ad produced a call.
 */
export function CallButton({
  className = "btn btn--primary",
  children,
  location,
  showIcon = true,
}: {
  className?: string;
  children?: ReactNode;
  /** Where on the site the click happened, e.g. "hero" — shows up in GA4. */
  location: string;
  showIcon?: boolean;
}) {
  return (
    <a
      className={className}
      href={site.phoneHref}
      onClick={() => track("click_to_call", { location, phone: site.phone })}
    >
      {showIcon && <PhoneIcon />}
      {children ?? `Call ${site.phone}`}
    </a>
  );
}

export function TextButton({
  className = "btn btn--outline",
  children,
  location,
  showIcon = true,
}: {
  className?: string;
  children?: ReactNode;
  location: string;
  showIcon?: boolean;
}) {
  return (
    <a
      className={className}
      href={site.smsHref}
      onClick={() => track("click_to_text", { location, phone: site.phone })}
    >
      {showIcon && <MessageIcon />}
      {children ?? "Text us"}
    </a>
  );
}
