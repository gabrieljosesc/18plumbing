import { pricing, site } from "@/lib/site";
import { CallButton, TextButton } from "./CallButton";
import { ClockIcon, PinIcon, ShieldIcon, StarIcon, Stars } from "./Icons";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero__inner">
        <div>
          <h1>
            Toronto&rsquo;s <em>licensed</em> plumbing service &mdash; day or night.
          </h1>
          <p className="hero__lede">
            {site.name} handles installation, maintenance and repair for low-rise
            residential and commercial properties across Toronto and the GTA. Clean
            work, straight answers, and a phone that gets picked up at 2&nbsp;a.m.
          </p>

          <p className="hero__anchor">
            <strong>${pricing.diagnostic} diagnostic</strong> &mdash; waived if we do
            the work. You approve the price before anything starts.
          </p>

          <div className="hero__actions">
            <CallButton className="btn btn--primary" location="hero" />
            <TextButton className="btn btn--ghost-light" location="hero" />
            <a className="btn btn--ghost-light" href="#contact">
              Request a quote
            </a>
          </div>

          <div className="hero__badges">
            <span className="badge">
              <ShieldIcon />
              Licensed &amp; Insured
            </span>
            <span className="badge">
              <ClockIcon />
              {site.hours}
            </span>
            <span className="badge">
              <StarIcon />
              {site.rating.value} on Google
            </span>
            <span className="badge">
              <PinIcon />
              Toronto &amp; GTA
            </span>
          </div>
        </div>

        <aside className="hero__card" aria-label="Google rating summary">
          <div className="rating-score">{site.rating.value}</div>
          <Stars label={`Rated ${site.rating.value} out of 5 stars`} />
          <p className="rating-meta">Based on {site.rating.count} Google reviews</p>
          <hr />
          <blockquote>
            &ldquo;Truly excellent and reliable service&hellip; he identified the issues
            pretty quickly, advised me on all the possible solutions and answered all
            the questions I had.&rdquo;
          </blockquote>
          <cite>&mdash; Oleg Tyan, Google review</cite>
          <hr />
          <a
            className="btn btn--navy btn--block"
            href={site.social.google}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read all reviews on Google
          </a>
        </aside>
      </div>
    </section>
  );
}
