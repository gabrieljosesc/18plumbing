import { activePromotion, promotionEndsLabel } from "@/lib/promotion";

/**
 * The promotion box. Renders nothing when no promotion is live, so it can be
 * left in place permanently and switches itself on and off with the dates.
 *
 * "dark" sits on the navy hero backgrounds; "light" on white or pale sections.
 * A promotion's theme, if any, layers on top of either.
 */
export default function PromoBanner({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const promo = activePromotion();
  if (!promo) return null;

  const className = ["promo", `promo--${variant}`, promo.theme && `promo--${promo.theme}`]
    .filter(Boolean)
    .join(" ");

  // "Oct 31, 2026" → "Oct 31". The year is noise on a banner.
  const until = promotionEndsLabel(promo).replace(/,.*$/, "");

  return (
    <p className={className}>
      <span className="promo__tag">
        {promo.tagEmoji && <span aria-hidden="true">{promo.tagEmoji} </span>}
        Until {until}
      </span>
      <span>
        <strong>{promo.headline}</strong> {promo.blurb}. {promo.terms}
      </span>
    </p>
  );
}
