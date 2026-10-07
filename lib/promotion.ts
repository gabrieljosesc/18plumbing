import { faqs, site, type Faq } from "@/lib/site";
import { formatDay, torontoLocalToIso } from "@/lib/time";

/**
 * The current promotion.
 *
 * Everything about it is driven by the two dates below, in Toronto calendar
 * days. Before `startsOn` and after `endsOn` nothing renders, nothing goes in
 * the structured data and the FAQ entry disappears, so nobody has to remember
 * to take it down on New Year's Day. To run a new one, change the numbers.
 *
 * Terms are the client's call, so they live here in one place rather than in
 * three components' copy.
 */
export const promotion = {
  percent: 10,
  // A day earlier than the launch date on purpose: "from now" was said on
  // Oct 8 Philippine time, which was still Oct 7 in Toronto.
  startsOn: "2026-10-07",
  endsOn: "2026-12-31",
  headline: "10% off your first job",
  audience: "first-time clients",
  terms: "Mention it when you book. Not combined with the membership discount.",
} as const;

/** The instant the promotion starts: midnight Toronto on startsOn. */
const startsAt = new Date(torontoLocalToIso(`${promotion.startsOn}T00:00`)!);

/** The instant it ends: midnight Toronto on the day *after* endsOn (inclusive). */
const endsAt = (() => {
  const [y, m, d] = promotion.endsOn.split("-").map(Number);
  const nextDay = new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
  return new Date(torontoLocalToIso(`${nextDay}T00:00`)!);
})();

export function isPromotionLive(now: Date = new Date()): boolean {
  return now >= startsAt && now < endsAt;
}

/** "Dec 31, 2026" — for copy. */
export function promotionEndsLabel(): string {
  return formatDay(promotion.endsOn);
}

/** The FAQ entry, phrased to answer the question people actually type. */
const promotionFaq: Faq = {
  question: "Do you have any offers on right now?",
  answer:
    `Yes. Until ${promotionEndsLabel()}, ${promotion.audience} get ` +
    `${promotion.percent}% off their first job with us. ${promotion.terms}`,
};

/** The site FAQ, with the promotion's entry included only while it runs. */
export function activeFaqs(): Faq[] {
  return isPromotionLive() ? [promotionFaq, ...faqs] : faqs;
}

/** schema.org Offer for the LocalBusiness markup. Call only when live. */
export function promotionOffer() {
  return {
    "@type": "Offer",
    name: promotion.headline,
    description:
      `${promotion.percent}% off the first job for ${promotion.audience}. ${promotion.terms}`,
    validFrom: promotion.startsOn,
    validThrough: promotion.endsOn,
    url: `${site.url}/#contact`,
  };
}
