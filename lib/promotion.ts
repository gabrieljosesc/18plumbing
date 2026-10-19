import { faqs, site, type Faq } from "@/lib/site";
import { formatDay, torontoLocalToIso } from "@/lib/time";

/**
 * Promotions.
 *
 * Each one is driven by its two dates, in Toronto calendar days (inclusive).
 * Outside those dates it renders nothing, adds nothing to the structured data
 * and has no FAQ entry, so nobody has to remember to take it down.
 *
 * Only one shows at a time. The list is in order of precedence: the first one
 * that is live today wins, so a short seasonal offer placed above a long
 * running one takes over for its window and hands back afterwards. Two "10%
 * off" banners side by side would only make people ask whether they stack.
 *
 * Terms are the client's call and live here, once, rather than in copy spread
 * across components.
 */
export type Promotion = {
  id: string;
  startsOn: string;
  endsOn: string;
  /** Bold lead-in on the banner. */
  headline: string;
  /** Follows the headline: "<headline> <blurb>." */
  blurb: string;
  terms: string;
  /** Full-sentence answer to "Do you have any offers on right now?" */
  faqAnswer: string;
  /** Visual treatment. Undefined is the standard teal. */
  theme?: "halloween";
  /** Decorative emoji shown before "Until …" in the tag. */
  tagEmoji?: string;
};

export const promotions: readonly Promotion[] = [
  {
    id: "halloween-2026",
    // Asked for on Oct 20 Manila time, which was still Oct 19 in Toronto.
    startsOn: "2026-10-19",
    endsOn: "2026-10-31",
    headline: "Halloween special: 10% off",
    blurb: "any job booked by October 31",
    terms: "Mention it when you book. Not combined with other offers or the membership discount.",
    faqAnswer:
      "Yes. It is our Halloween special: 10% off any job booked by October 31, 2026. " +
      "Mention it when you book. It cannot be combined with other offers or the membership discount.",
    theme: "halloween",
    tagEmoji: "🎃",
  },
  {
    id: "first-job-2026",
    // "From now" was said on Oct 8 Manila time, still Oct 7 in Toronto.
    startsOn: "2026-10-07",
    endsOn: "2026-12-31",
    headline: "10% off your first job",
    blurb: "for first-time clients",
    terms: "Mention it when you book. Not combined with the membership discount.",
    faqAnswer:
      "Yes. Until December 31, 2026, first-time clients get 10% off their first job with us. " +
      "Mention it when you book. It cannot be combined with the membership discount.",
  },
];

/** Midnight Toronto at the start of a calendar day. */
function torontoDayStart(day: string): Date {
  return new Date(torontoLocalToIso(`${day}T00:00`)!);
}

/** Midnight Toronto at the start of the day *after* — the exclusive end. */
function torontoDayAfter(day: string): Date {
  const [y, m, d] = day.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
  return torontoDayStart(next);
}

export function isLive(promo: Promotion, now: Date = new Date()): boolean {
  return now >= torontoDayStart(promo.startsOn) && now < torontoDayAfter(promo.endsOn);
}

/** The promotion to show right now, or null. First live entry wins. */
export function activePromotion(now: Date = new Date()): Promotion | null {
  return promotions.find((promo) => isLive(promo, now)) ?? null;
}

export function isPromotionLive(now: Date = new Date()): boolean {
  return activePromotion(now) !== null;
}

/** "Oct 31, 2026" — for copy. */
export function promotionEndsLabel(promo: Promotion): string {
  return formatDay(promo.endsOn);
}

const FAQ_QUESTION = "Do you have any offers on right now?";

/** The site FAQ, led by the active promotion's entry while one runs. */
export function activeFaqs(now: Date = new Date()): Faq[] {
  const promo = activePromotion(now);
  return promo ? [{ question: FAQ_QUESTION, answer: promo.faqAnswer }, ...faqs] : faqs;
}

/** schema.org Offer for the LocalBusiness markup. Call only when live. */
export function promotionOffer(promo: Promotion | null = activePromotion()) {
  if (!promo) return null;
  return {
    "@type": "Offer",
    name: promo.headline,
    description: `${promo.headline} ${promo.blurb}. ${promo.terms}`,
    validFrom: promo.startsOn,
    validThrough: promo.endsOn,
    url: `${site.url}/#contact`,
  };
}
