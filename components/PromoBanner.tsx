import { isPromotionLive, promotion, promotionEndsLabel } from "@/lib/promotion";

/**
 * The promotion pill. Renders nothing outside the promotion's dates, so it
 * can be left in place permanently and simply switches itself off.
 *
 * "dark" sits on the navy hero backgrounds; "light" on white or pale sections.
 */
export default function PromoBanner({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  if (!isPromotionLive()) return null;

  return (
    <p className={`promo promo--${variant}`}>
      <span className="promo__tag">Until {promotionEndsLabel().replace(/,.*$/, "")}</span>
      <span>
        <strong>{promotion.headline}</strong> for {promotion.audience}.{" "}
        {promotion.terms}
      </span>
    </p>
  );
}
