import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SignupForm from "@/components/SignupForm";
import TopBar from "@/components/TopBar";
import { memberBenefits } from "@/lib/site";

export const metadata: Metadata = {
  title: "Become a member",
  description:
    "Join 18 Plumbing for priority scheduling, a free yearly plumbing inspection and a standing discount on every job. Free to join.",
};

export default function SignupPage() {
  return (
    <>
      <TopBar />
      <Header showNav={false} />

      <main className="auth-page" id="main">
        <div className="wrap auth-layout">
          <div className="auth-aside">
            <h2>What membership gets you</h2>
            <ul className="auth-benefits">
              {memberBenefits.map((benefit) => (
                <li key={benefit.title}>
                  <strong>{benefit.title}</strong>
                  <span>{benefit.blurb}</span>
                </li>
              ))}
            </ul>
            <p className="auth-aside__note">
              Free to join, no contract, and you can stop any time.
            </p>
          </div>

          <SignupForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
