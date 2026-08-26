import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SignupForm from "@/components/SignupForm";
import TopBar from "@/components/TopBar";
import { planBenefits, pricing, type PlanValue } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the plan",
  description:
    `Join the 18 Plumbing membership: annual plumbing inspection, ${pricing.labourDiscount}% off labour, ` +
    `no emergency call-out fee, hot water tank flush and front-of-queue scheduling. ` +
    `$${pricing.plan.monthly}/month or $${pricing.plan.annual}/year.`,
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const params = await searchParams;
  const initialPlan: PlanValue = params.plan === "monthly" ? "monthly" : "annual";

  return (
    <>
      <TopBar />
      <Header showNav={false} />

      <main className="auth-page" id="main">
        <div className="wrap auth-layout">
          <div className="auth-aside">
            <h2>What the plan gets you</h2>
            <ul className="auth-benefits">
              {planBenefits.map((benefit) => (
                <li key={benefit.title}>
                  <strong>{benefit.title}</strong>
                  <span>{benefit.blurb}</span>
                </li>
              ))}
            </ul>
            <p className="auth-aside__note">
              No contract and no cancellation fee &mdash; stop whenever you like.
            </p>
          </div>

          <SignupForm initialPlan={initialPlan} />
        </div>
      </main>

      <Footer />
    </>
  );
}
