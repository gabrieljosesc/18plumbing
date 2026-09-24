import Link from "next/link";
import {
  planBenefits,
  planOptions,
  pricing,
  priorityListBenefits,
} from "@/lib/site";
import { PhoneLink } from "./CallButton";
import PriorityListForm from "./PriorityListForm";
import {
  CheckIcon,
  ClockIcon,
  DropIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TagIcon,
  TankIcon,
} from "./Icons";

const ICONS: Record<
  string,
  (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element
> = {
  clock: ClockIcon,
  shield: ShieldCheckIcon,
  tag: TagIcon,
  phone: PhoneIcon,
  tank: TankIcon,
  drop: DropIcon,
};

export default function Membership({ signedIn }: { signedIn: boolean }) {
  return (
    <section className="section section--dark" id="membership">
      <div className="wrap">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Membership</span>
          <h2>Two ways to become a regular</h2>
          <p>
            Get on the free list so we know your property, or take the plan and
            stop worrying about the place altogether.
          </p>
        </div>

        <div className="tiers">
          {/* ------------------------------------------------ free tier */}
          <article className="tier reveal">
            <header className="tier__head">
              <span className="tier__label">Priority list</span>
              <span className="tier__price">Free</span>
              <p className="tier__pitch">
                No account, no card. Just your name, number and address so we are
                not starting from scratch when something goes wrong.
              </p>
            </header>

            <ul className="tier__list">
              {priorityListBenefits.map((benefit) => (
                <li key={benefit.title}>
                  <CheckIcon />
                  <span>
                    <strong>{benefit.title}</strong>
                    <span>{benefit.blurb}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="tier__form">
              <PriorityListForm />
            </div>
          </article>

          {/* ------------------------------------------------ paid tier */}
          <article className="tier tier--featured reveal">
            <span className="tier__flag">Best value</span>
            <header className="tier__head">
              <span className="tier__label">The plan</span>
              <span className="tier__price">
                ${pricing.plan.annual}
                <span className="tier__per">/ year</span>
              </span>
              <p className="tier__pitch">
                or ${pricing.plan.monthly} a month. The annual inspection alone is
                worth roughly what the year costs &mdash; everything else is the
                reason people stay.
              </p>
            </header>

            <ul className="tier__list">
              {planBenefits.map((benefit) => {
                const Icon = ICONS[benefit.icon] ?? CheckIcon;
                return (
                  <li key={benefit.title}>
                    <Icon />
                    <span>
                      <strong>{benefit.title}</strong>
                      <span>{benefit.blurb}</span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="tier__actions">
              {signedIn ? (
                <Link className="btn btn--white btn--block" href="/account">
                  Go to my account
                </Link>
              ) : (
                <>
                  {planOptions.map((option) => (
                    <Link
                      key={option.value}
                      className={
                        option.featured
                          ? "btn btn--white btn--block"
                          : "btn btn--ghost-light btn--block"
                      }
                      href={`/signup?plan=${option.value}`}
                    >
                      {option.label} &mdash; {option.price} {option.per}
                    </Link>
                  ))}
                </>
              )}
              <p className="tier__note">
                No contract, cancel any time. We take payment over the phone once
                you sign up &mdash; call <PhoneLink location="membership" /> if
                you would rather just do it that way.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
