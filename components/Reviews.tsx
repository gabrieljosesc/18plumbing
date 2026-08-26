import { reviews, site } from "@/lib/site";
import { GoogleIcon, Stars } from "./Icons";

export default function Reviews() {
  return (
    <section className="section section--dark" id="reviews">
      <div className="wrap">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Google Reviews</span>
          <h2>What customers say</h2>
        </div>

        <div className="reviews-summary reveal">
          <Stars label={`Rated ${site.rating.value} out of 5 stars`} />
          <strong>{site.rating.value} out of 5</strong>
          <span>&middot; {site.rating.count} Google reviews</span>
        </div>

        <div className="reviews">
          {reviews.map((review) => (
            <article className="review reveal" key={review.author}>
              <Stars label="5 out of 5 stars" />
              <p>&ldquo;{review.body}&rdquo;</p>
              <div className="review__meta">
                <span className="review__avatar" aria-hidden="true">
                  {review.author.charAt(0)}
                </span>
                <span>
                  <strong>{review.author}</strong>
                  <span>{review.meta}</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="reviews-actions reveal">
          <a
            className="btn btn--white"
            href={site.social.google}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GoogleIcon />
            See all {site.rating.count} reviews on Google
          </a>

          <div className="review-ask">
            <p>
              <strong>Had us out recently?</strong> A review takes thirty seconds
              and is genuinely the thing that decides whether the next person in
              your neighbourhood finds us.
            </p>
            <a
              className="btn btn--ghost-light"
              href={site.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave a review
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
