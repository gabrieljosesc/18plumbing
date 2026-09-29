import type { Metadata } from "next";
import Link from "next/link";
import { CallButton, TextButton } from "@/components/CallButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ThankYouTracker from "@/components/ThankYouTracker";
import TopBar from "@/components/TopBar";
import { getLandingPage } from "@/lib/landing-pages";
import { pricing } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request sent",
  // Reached only by submitting the form. Indexing it would let people arrive
  // from search and register a "conversion" without asking for anything.
  robots: { index: false, follow: false },
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ lead?: string; s?: string; svc?: string; p?: string }>;
}) {
  const params = await searchParams;

  const leadId = params.lead && UUID.test(params.lead) ? params.lead : null;
  const from = params.s ? getLandingPage(params.s) : undefined;
  const service = params.svc?.slice(0, 120) || "general";
  const partialPhotos = params.p === "1";

  return (
    <>
      <TopBar />
      <Header showNav={false} />

      <main className="auth-page" id="main">
        <div className="wrap thanks-wrap">
          <div className="auth-card">
            <div className="auth-done">
              <span className="auth-done__mark" aria-hidden="true">
                ✓
              </span>
              <h1>Request sent</h1>
              <p>
                We have your details and will call you shortly. If it is urgent,
                ring us now and a plumber picks up.
              </p>
              {partialPhotos && (
                <p className="auth-done__small">
                  Some of your photos could not be attached, but we have everything
                  else. You can text them to us instead.
                </p>
              )}

              <ol className="thanks-steps">
                <li>
                  <strong>We call you back</strong>
                  <span>
                    Usually within the hour during the day, first thing if it is
                    late.
                  </span>
                </li>
                <li>
                  <strong>You approve the price</strong>
                  <span>
                    ${pricing.dispatchFee} dispatch fee to come out. We tell you what
                    the work costs before anything starts.
                  </span>
                </li>
                <li>
                  <strong>We fix it</strong>
                  <span>Licensed, insured, and we clean up after ourselves.</span>
                </li>
              </ol>

              <div className="thanks-actions">
                <CallButton className="btn btn--primary" location="thank-you" />
                <TextButton className="btn btn--outline" location="thank-you" />
              </div>

              <p className="auth-done__small">
                <Link href={from ? `/${from.slug}` : "/"}>
                  {from ? "Back to the page you came from" : "Back to the homepage"}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ThankYouTracker leadId={leadId} service={service} source={from?.slug ?? null} />
    </>
  );
}
