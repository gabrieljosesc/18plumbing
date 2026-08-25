import Link from "next/link";
import { site } from "@/lib/site";
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

        <div className="contact-panel reveal">
          <h3>Call now</h3>
          <p>
            Blocked drain, burst pipe or a tap that will not stop — talk to a licensed
            plumber straight away.
          </p>
          <a className="btn btn--primary btn--block" href={site.phoneHref}>
            <PhoneIcon />
            {site.phone}
          </a>
          <a className="btn btn--outline btn--block" href={site.emailHref}>
            Email {site.email}
          </a>

          <hr />

          <h3>{signedIn ? "Your membership" : "Not a member yet?"}</h3>
          <p>
            {signedIn
              ? "Book your free yearly inspection and check your member number in your account."
              : "Members get priority scheduling, a free yearly inspection and a discount on every job. It is free to join."}
          </p>
          <Link
            className="btn btn--navy btn--block"
            href={signedIn ? "/account" : "/signup"}
          >
            {signedIn ? "Go to my account" : "Become a member"}
          </Link>
        </div>
      </div>
    </section>
  );
}
