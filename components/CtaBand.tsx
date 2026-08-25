import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="wrap">
        <h2>Water where it should not be?</h2>
        <p>
          Call now and speak to a licensed plumber. Lines are open 24 hours, every day.
        </p>
        <div className="cta-band__actions">
          <a className="btn btn--white" href={site.phoneHref}>
            <PhoneIcon />
            {site.phone}
          </a>
          <a className="btn btn--ghost-light" href={site.emailHref}>
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
