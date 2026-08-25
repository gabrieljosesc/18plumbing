import Image from "next/image";
import { site } from "@/lib/site";
import { CheckCircleIcon } from "./Icons";

const POINTS = [
  {
    lead: "Work to code.",
    rest: "Everything done to the Canadian plumbing code, so it holds up to inspection.",
  },
  {
    lead: "Options first.",
    rest: "You hear what the fix costs and what the alternatives are before any work starts.",
  },
  {
    lead: "No mess left behind.",
    rest: "Drop sheets down, tools packed up, area wiped clean.",
  },
  {
    lead: "Reachable around the clock.",
    rest: "Burst pipe at midnight? The line is open 24 hours.",
  },
];

export default function About() {
  return (
    <section className="section section--alt" id="about">
      <div className="wrap about">
        <div className="reveal">
          <span className="eyebrow">About {site.name}</span>
          <h2>A licensed plumber who actually shows up</h2>
          <p>
            {site.name} is a licensed and insured Toronto plumbing company working on
            low-rise residential and low-rise commercial properties. We do service and
            installation &mdash; the everyday repairs that keep a place running, and the
            clean fixture work you want done right the first time.
          </p>
          <p>
            Customers keep mentioning the same three things in their reviews: we turn up
            on time, we explain the options before we start, and we leave the room
            clean. That is more or less the whole business model.
          </p>

          <ul className="checklist">
            {POINTS.map((point) => (
              <li key={point.lead}>
                <CheckCircleIcon />
                <span>
                  <strong>{point.lead}</strong> {point.rest}
                </span>
              </li>
            ))}
          </ul>

          <a className="btn btn--navy" href="#contact">
            Book a visit
          </a>
        </div>

        <div className="about__media reveal">
          <Image
            src="/img/gallery-island-prep-sink.jpg"
            alt="A matte-black pull-down faucet and undermount prep sink installed in a stone kitchen island."
            width={512}
            height={640}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="about__stamp">
            <Image src="/img/logo.jpg" alt="" width={52} height={52} sizes="52px" />
            <span>
              <strong>Licensed &amp; insured</strong>
              <span>Serving Toronto &amp; the GTA</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
