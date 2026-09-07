import Link from "next/link";
import LeadForm from "./LeadForm";
import { CallButton, TextButton } from "./CallButton";
import { pricing, site } from "@/lib/site";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

export default function Contact({ signedIn }: { signedIn: boolean }) {
  return (
    <section className="section section--alt" id="contact">
      <div className="wrap contact">
        <div className="reveal">
          <span className="eyebrow">Contact</span>
          <h2>Get in touch</h2>
          <p>
            Phoning is always fastest, and the line is open around the clock. If you
            are a member, have your member number handy and we will get you booked in
            ahead of the queue.
          </p>

          <ul className="contact-list">
            <li>
              <span className="ci">
                <PhoneIcon />
              </span>
              <span>
                <strong>Phone</strong>
                <a href={site.phoneHref}>{site.phone}</a>
                <small>Answered 24 hours a day</small>
              </span>
            </li>
            <li>
              <span className="ci">
                <MailIcon />
              </span>
              <span>
                <strong>Email</strong>
                <a href={site.emailHref}>{site.email}</a>
                <small>We reply the same day</small>
              </span>
            </li>
            <li>
              <span className="ci">
                <PinIcon />
              </span>
              <span>
                <strong>Area served</strong>
                <p>{site.areaLabel}</p>
                <small>Low-rise residential &amp; commercial</small>
              </span>
            </li>
            <li>
              <span className="ci">
                <ClockIcon />
              </span>
              <span>
                <strong>Hours</strong>
                <p>{site.hours}</p>
                <small>Seven days a week</small>
              </span>
            </li>
          </ul>
        </div>

        <div className="reveal">
          <LeadForm />

          <div className="contact-after">
            <p>
              {signedIn
                ? "Members: book your annual inspection from your account."
                : `Members get an annual inspection, ${pricing.labourDiscount}% off labour and a yearly tank flush — $${pricing.plan.annual} a year.`}
            </p>
            <Link
              className="btn btn--outline"
              href={signedIn ? "/account" : "/#membership"}
            >
              {signedIn ? "Go to my account" : "See the plan"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
