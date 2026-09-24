import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CallButton, PhoneLink } from "@/components/CallButton";
import InspectionForm from "@/components/InspectionForm";
import TopBar from "@/components/TopBar";
import {
  ClockIcon,
  DropIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TagIcon,
  TankIcon,
} from "@/components/Icons";
import { planBenefits, planOptions, site } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "My membership",
  robots: { index: false, follow: false },
};

const BENEFIT_ICONS: Record<
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

const STATUS_LABELS: Record<string, string> = {
  requested: "Awaiting confirmation",
  scheduled: "Scheduled",
  completed: "Completed",
  cancelled: "Cancelled",
};

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The middleware already guards this route; this is belt and braces.
  if (!user) redirect("/login?next=/account");

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "full_name, phone, address, member_number, member_since, membership_status, plan",
    )
    .eq("id", user.id)
    .single();

  const { data: inspections } = await supabase
    .from("inspection_requests")
    .select(
      "id, created_at, address, preferred_date, preferred_time, status, scheduled_for",
    )
    .order("created_at", { ascending: false })
    .limit(5);

  const openRequest = (inspections ?? []).some(
    (row) => row.status === "requested" || row.status === "scheduled",
  );

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  // Benefits unlock only once staff have taken payment and flipped the profile
  // to active. Until then the member sees what is coming, not a booking form.
  const status = profile?.membership_status ?? "pending";
  const isActive = status === "active";
  const chosenPlan = planOptions.find((option) => option.value === profile?.plan);

  return (
    <>
      <TopBar />
      <Header signedIn showNav={false} />

      <main className="account" id="main">
        <div className="wrap">
          {params.welcome && (
            <div className="account-welcome" role="status">
              <strong>Email confirmed.</strong> Your account is set up &mdash; we
              will call to take payment and switch your benefits on.
            </div>
          )}

          <header className="account-head">
            <div>
              <span className="eyebrow">My membership</span>
              <h1>Hi {firstName}</h1>
              <p>Signed in as {user.email}</p>
            </div>
            <form action={signOut}>
              <button className="btn btn--outline" type="submit">
                Sign out
              </button>
            </form>
          </header>

          <div className="account-grid">
            <section className="panel panel--card" aria-labelledby="card-heading">
              <h2 id="card-heading" className="sr-only">
                Membership card
              </h2>
              <div className={isActive ? "member-card" : "member-card is-pending"}>
                <span className="member-card__label">Member number</span>
                <span className="member-card__number">
                  {profile?.member_number ?? "—"}
                </span>
                <dl className="member-card__meta">
                  <div>
                    <dt>Status</dt>
                    <dd className="is-status">{status}</dd>
                  </div>
                  <div>
                    <dt>{isActive ? "Member since" : "Plan"}</dt>
                    <dd>
                      {isActive
                        ? formatDate(profile?.member_since ?? null)
                        : (chosenPlan?.label ?? "—")}
                    </dd>
                  </div>
                </dl>
                <p className="member-card__hint">
                  {isActive
                    ? "Quote this number when you call and we will put you ahead of the general queue."
                    : "Your benefits switch on as soon as we have taken payment. Call us and we can do it now."}
                </p>
                <CallButton className="btn btn--white btn--block" location="account_card">
                  Call {site.phone}
                </CallButton>
              </div>

              <div className="account-details">
                <h3>Your details</h3>
                <dl>
                  <div>
                    <dt>Name</dt>
                    <dd>{profile?.full_name ?? "—"}</dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>{profile?.phone ?? "—"}</dd>
                  </div>
                  <div>
                    <dt>Service address</dt>
                    <dd>{profile?.address ?? "—"}</dd>
                  </div>
                  {chosenPlan && (
                    <div>
                      <dt>Billing</dt>
                      <dd>
                        {chosenPlan.label} &mdash; {chosenPlan.price} {chosenPlan.per}
                      </dd>
                    </div>
                  )}
                </dl>
                <p className="account-details__note">
                  Need something changed? Call us on{" "}
                  <PhoneLink location="account_details" /> and we will update it.
                </p>
              </div>
            </section>

            <div className="account-main">
              {!isActive && (
                <section className="panel panel--pending" aria-labelledby="pending-heading">
                  <h2 id="pending-heading">One step left</h2>
                  <p>
                    Your account is created but the plan is not running yet. Give us
                    a ring and we will take the first payment over the phone &mdash;
                    it takes about two minutes, and your benefits start the moment
                    it goes through.
                  </p>
                  <CallButton className="btn btn--primary" location="account_pending">
                    Call {site.phone}
                  </CallButton>
                </section>
              )}

              <section className="panel" aria-labelledby="benefits-heading">
                <h2 id="benefits-heading">
                  {isActive ? "Your benefits" : "What you get once it is running"}
                </h2>
                <ul className="account-benefits">
                  {planBenefits.map((benefit) => {
                    const Icon = BENEFIT_ICONS[benefit.icon];
                    return (
                      <li key={benefit.title}>
                        <span className="account-benefits__icon">
                          {Icon ? <Icon /> : null}
                        </span>
                        <span>
                          <strong>{benefit.title}</strong>
                          <span>{benefit.blurb}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {isActive && (
                <section className="panel" aria-labelledby="inspection-heading">
                  <h2 id="inspection-heading">Book your annual inspection</h2>
                  <p className="panel__lede">
                    Once a year, included. We check drains, fixtures, shut-off valves
                    and your hot water tank, flush the tank, and flag anything worth
                    doing before it turns into a leak.
                  </p>
                  <InspectionForm
                    defaultAddress={profile?.address ?? ""}
                    hasOpenRequest={openRequest}
                  />
                </section>
              )}

              {inspections && inspections.length > 0 && (
                <section className="panel" aria-labelledby="history-heading">
                  <h2 id="history-heading">Inspection history</h2>
                  <div className="table-scroll">
                    <table className="account-table">
                      <thead>
                        <tr>
                          <th scope="col">Requested</th>
                          <th scope="col">Address</th>
                          <th scope="col">Preferred</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inspections.map((row) => (
                          <tr key={row.id}>
                            <td>{formatDate(row.created_at)}</td>
                            <td>{row.address}</td>
                            <td>
                              {row.preferred_date
                                ? formatDate(row.preferred_date)
                                : "Flexible"}
                            </td>
                            <td>
                              <span className={`pill pill--${row.status}`}>
                                {STATUS_LABELS[row.status] ?? row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
