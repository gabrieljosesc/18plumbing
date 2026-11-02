"use client";

import Script from "next/script";
import { useEffect } from "react";
import { analytics, captureAttribution, isAnalyticsEnabled } from "@/lib/analytics";

/**
 * Loads gtag.js for GA4 and/or Google Ads, and records ad click ids on arrival.
 *
 * Renders nothing at all when neither id is configured, so an unconfigured site
 * ships no third-party script and no cookie banner obligation from it.
 */
export default function Analytics() {
  useEffect(() => {
    captureAttribution();
  }, []);

  if (!isAnalyticsEnabled) return null;

  // gtag.js is loaded once, against whichever id exists; the second is attached
  // via an extra config call below.
  const primaryId = analytics.ga4Id || analytics.adsId;

  return (
    <>
      {/* lazyOnload, not afterInteractive: the two gtag bundles cost about
          1.3 s of main-thread time on a mid-range phone, which was most of
          the page's blocking time. Nothing is lost by waiting for window
          load: track() creates the dataLayer stub itself, so a tap on the
          phone number before gtag.js arrives is queued and replayed. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="lazyOnload"
      />
      <Script id="gtag-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          ${analytics.ga4Id ? `gtag('config', '${analytics.ga4Id}');` : ""}
          ${analytics.adsId ? `gtag('config', '${analytics.adsId}');` : ""}
        `}
      </Script>
    </>
  );
}
