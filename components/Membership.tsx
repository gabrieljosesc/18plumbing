import Link from "next/link";
import { memberBenefits } from "@/lib/site";
import { ClockIcon, ShieldCheckIcon, TagIcon } from "./Icons";

const ICONS: Record<string, (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  clock: ClockIcon,
  shield: ShieldCheckIcon,
  tag: TagIcon,
};

export default function Membership({ signedIn }: { signedIn: boolean }) {
  return (
    <section className="section section--dark" id="membership">
      <div className="wrap">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Membership</span>
          <h2>Join as a member — it&rsquo;s free</h2>
          <p>
            Create an account and you move to the front of the queue, get a plumbing
            inspection on us every year, and pay less on every job.
          </p>
        </div>

        <div className="benefits">
          {memberBenefits.map((benefit) => {
            const Icon = ICONS[benefit.icon];
            return (
              <article className="benefit reveal" key={benefit.title}>
                <span className="benefit__icon">{Icon ? <Icon /> : null}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.blurb}</p>
              </article>
            );
          })}
        </div>

        <div className="membership-cta reveal">
          {signedIn ? (
            <Link className="btn btn--white" href="/account">
              Go to my account
            </Link>
          ) : (
            <>
              <Link className="btn btn--white" href="/signup">
                Create my membership
              </Link>
              <Link className="btn btn--ghost-light" href="/login">
                Sign in
              </Link>
            </>
          )}
          <p className="membership-cta__note">
            No membership fee and no contract — you are just on the list.
          </p>
        </div>
      </div>
    </section>
  );
}
