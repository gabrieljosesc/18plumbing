import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CallBar from "@/components/CallBar";
import { CallButton, TextButton } from "@/components/CallButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PromoBanner from "@/components/PromoBanner";
import ScrollReveal from "@/components/ScrollReveal";
import TopBar from "@/components/TopBar";
import { getLandingPage } from "@/lib/landing-pages";
import { serviceNav } from "@/lib/service-nav";
import { site } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Plumbing Services in Toronto & the GTA",
  description:
    "Everything 18 Plumbing does, from emergency callouts and drain cleaning to bathrooms, kitchens, hot water tanks, " +
    `appliance hook-ups, water filtration and valves. Licensed and insured. Call ${site.phone}.`,
  alternates: { canonical: "/services" },
};

// Static, but let it catch promotion changes within the hour like the service pages.
export const revalidate = 3600;

export default async function ServicesIndexPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Resolve the menu to real pages; a slug with no page is skipped, not crashed on.
  const pages = serviceNav.flatMap((item) => {
    const page = getLandingPage(item.slug);
    return page ? [{ ...item, page }] : [];
  });

  return (
    <>
      <TopBar />
      <Header signedIn={Boolean(user)} />

      <main id="main">
        <section className="lp-hero svc-hero">
          <div className="wrap">
            <nav className="lp-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Services</span>
            </nav>
            <PromoBanner />
            <h1>What we do</h1>
            <p className="lp-hero__lede">
              Installation, maintenance and repair for houses, low-rise buildings and
              small commercial units across Toronto and the GTA. Pick a service for
              the details, photos and the questions people usually ask.
            </p>
            <div className="lp-hero__actions">
              <CallButton className="btn btn--primary" location="services-index" />
              <TextButton className="btn btn--ghost-light" location="services-index" />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="svc-grid">
              {pages.map(({ label, slug, page }) => (
                <Link className="svc-card reveal" href={`/${slug}`} key={slug}>
                  <span className="svc-card__media">
                    <Image
                      src={page.image.src}
                      alt={page.image.alt}
                      width={page.image.width}
                      height={page.image.height}
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    />
                  </span>
                  <span className="svc-card__body">
                    <strong>{label}</strong>
                    <span>{page.subhead}</span>
                    <span className="svc-card__more">View service &rarr;</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="wrap">
            <h2>Not sure which one you need?</h2>
            <p>
              Describe what is happening and we will tell you. If it carries water, we
              can look at it.
            </p>
            <div className="cta-band__actions">
              <CallButton className="btn btn--white" location="services-index-cta" />
              <TextButton className="btn btn--ghost-light" location="services-index-cta" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CallBar />
      <ScrollReveal />
    </>
  );
}
