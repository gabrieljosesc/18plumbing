/**
 * Conversion tracking.
 *
 * Everything here is inert until the matching env var is set, so the site runs
 * identically with no analytics configured — no console noise, no broken calls.
 *
 *   NEXT_PUBLIC_GA4_ID                    e.g. G-XXXXXXXXXX
 *   NEXT_PUBLIC_GOOGLE_ADS_ID             e.g. AW-123456789
 *   NEXT_PUBLIC_ADS_CALL_LABEL            conversion label for a phone click
 *   NEXT_PUBLIC_ADS_LEAD_LABEL            conversion label for a form submit
 */

export const analytics = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  adsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
  adsCallLabel: process.env.NEXT_PUBLIC_ADS_CALL_LABEL ?? "",
  adsLeadLabel: process.env.NEXT_PUBLIC_ADS_LEAD_LABEL ?? "",
} as const;

export const isAnalyticsEnabled = Boolean(analytics.ga4Id || analytics.adsId);

type GtagArgs =
  | ["js", Date]
  | ["config", string, Record<string, unknown>?]
  | ["event", string, Record<string, unknown>?];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

/** The conversions worth counting. Keep this list short and meaningful. */
export type ConversionEvent =
  | "click_to_call"
  | "click_to_text"
  | "lead_form_submit"
  | "priority_list_join"
  | "plan_signup"
  | "inspection_booked";

/**
 * Sends an event to GA4 and, where a conversion label exists, to Google Ads.
 *
 * Safe to call anywhere: no-ops on the server, and when nothing is configured.
 */
export function track(
  event: ConversionEvent,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", event, params);

  const label =
    event === "click_to_call" || event === "click_to_text"
      ? analytics.adsCallLabel
      : analytics.adsLeadLabel;

  // Google Ads counts a conversion only against send_to, so it needs its own
  // call with the AW- id and label.
  if (analytics.adsId && label) {
    window.gtag("event", "conversion", {
      send_to: `${analytics.adsId}/${label}`,
      ...params,
    });
  }
}

/**
 * Attribution that survives the trip to the form.
 *
 * Ad platforms put click ids on the landing URL; by the time someone submits
 * they may have moved pages, so capture them on arrival and read them back at
 * submit time.
 */
const ATTRIBUTION_KEY = "18p_attribution";
const ATTRIBUTION_PARAMS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key);
      if (value) found[key] = value;
    }
    if (!Object.keys(found).length) return;

    // First touch wins — do not let a later organic visit overwrite the ad click.
    if (window.sessionStorage.getItem(ATTRIBUTION_KEY)) return;
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(found));
  } catch {
    // Private mode, storage disabled — attribution is a nice-to-have.
  }
}

export function readAttribution(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.sessionStorage.getItem(ATTRIBUTION_KEY) ?? "";
  } catch {
    return "";
  }
}
