import { CallButton, TextButton } from "./CallButton";

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="wrap">
        <h2>Water where it should not be?</h2>
        <p>
          Call now and speak to a licensed plumber. Lines are open 24 hours, every day.
        </p>
        <div className="cta-band__actions">
          <CallButton className="btn btn--white" location="cta-band" />
          <TextButton className="btn btn--ghost-light" location="cta-band" />
        </div>
      </div>
    </section>
  );
}
