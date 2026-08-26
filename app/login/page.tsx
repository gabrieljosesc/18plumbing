import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import TopBar from "@/components/TopBar";
import { planBenefits } from "@/lib/site";

export const metadata: Metadata = {
  title: "Member sign in",
  description:
    "Sign in to your 18 Plumbing membership to book your annual inspection and view your member details.",
};

const NOTICES: Record<string, string> = {
  confirm:
    "That confirmation link has expired or has already been used. Try signing in, " +
    "or sign up again to get a fresh link.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;

  // Only ever redirect to a path on this site.
  const next = params.next?.startsWith("/") ? params.next : undefined;
  const notice = params.error ? NOTICES[params.error] : undefined;

  return (
    <>
      <TopBar />
      <Header showNav={false} />

      <main className="auth-page" id="main">
        <div className="wrap auth-layout">
          <div className="auth-aside">
            <h2>Members get</h2>
            <ul className="auth-benefits">
              {planBenefits.map((benefit) => (
                <li key={benefit.title}>
                  <strong>{benefit.title}</strong>
                  <span>{benefit.blurb}</span>
                </li>
              ))}
            </ul>
          </div>

          <LoginForm next={next} notice={notice} />
        </div>
      </main>

      <Footer />
    </>
  );
}
