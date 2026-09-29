"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Fires the lead event exactly once per submission.
 *
 * Google Ads counts the *page* (a URL-based conversion on /thank-you), so this
 * only feeds GA4. The lead id from the redirect is the de-dupe key: a refresh,
 * a back-button revisit or a bookmarked URL re-renders the page but does not
 * re-fire the event. No id — the honeypot path, or someone typing the URL —
 * fires nothing.
 */
export default function ThankYouTracker({
  leadId,
  service,
  source,
}: {
  leadId: string | null;
  service: string;
  source: string | null;
}) {
  useEffect(() => {
    if (!leadId) return;

    const key = `18p_lead_${leadId}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {
      // Storage blocked. A rare double beats a silent miss.
    }

    track("lead_form_submit", { service, source, lead_id: leadId });
  }, [leadId, service, source]);

  return null;
}
