import { PhoneLink } from "./CallButton";
import { faqs } from "@/lib/site";

/**
 * Plain <details> accordion — no JS, and Google can read every answer whether
 * or not it is expanded, which is the point of having it.
 */
export default function Faq() {
  return (
    <section className="section section--alt" id="faq">
      <div className="wrap">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Questions</span>
          <h2>Straight answers</h2>
          <p>
            The things people ask before they call. If yours is not here, phone{" "}
            <PhoneLink location="faq" /> and just ask.
          </p>
        </div>

        <div className="faq reveal">
          {faqs.map((faq, index) => (
            <details className="faq__item" key={faq.question} open={index === 0}>
              <summary>
                <span>{faq.question}</span>
                <span className="faq__marker" aria-hidden="true" />
              </summary>
              <div className="faq__answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
