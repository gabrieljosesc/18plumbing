import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CallBar from "@/components/CallBar";
import { CallButton, TextButton } from "@/components/CallButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import ScrollReveal from "@/components/ScrollReveal";
import TopBar from "@/components/TopBar";
import { CheckIcon, ClockIcon, ShieldIcon, Stars } from "@/components/Icons";
import {
  getLandingPage,
  landingPageSlugs,
  relatedPages,
} from "@/lib/landing-pages";
import { pricing, reviews, serviceAreas, site } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";

export function generateStaticParams() {
  return landingPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${site.url}/${page.slug}`,
      images: [{ url: page.image.src }],
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const related = relatedPages(page.slug);
  const pageReviews = reviews.slice(0, 3);

  // Service + FAQ schema scoped to this page, plus a breadcrumb back to home.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      description: page.metaDescription,
      serviceType: page.service,
      provider: { "@id": `${site.url}/#business` },
      areaServed: serviceAreas.map((name) => ({ "@type": "City", name })),
      url: `${site.url}/${page.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: page.h1,
          item: `${site.url}/${page.slug}`,
        },
      ],
    },
    ...(page.faqs.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <TopBar />
      <Header signedIn={Boolean(user)} />

      <main id="main">
        {/* ----------------------------------------------------- hero */}
        <section className="lp-hero">
          <div className="wrap lp-hero__inner">
            <div>
              <nav className="lp-crumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>{page.service}</span>
              </nav>

              <h1>{page.h1}</h1>
              <p className="lp-hero__lede">{page.subhead}</p>

              <ul className="lp-highlights">
                {page.highlights.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="lp-hero__actions">
                <CallButton className="btn btn--primary" location={`lp-hero:${page.slug}`} />
                <TextButton
                  className="btn btn--ghost-light"
                  location={`lp-hero:${page.slug}`}
                />
              </div>

              <p className="lp-hero__anchor">
                <ShieldIcon />
                <span>
                  Licensed &amp; insured · <ClockIcon /> Open 24 hours ·{" "}
                  <strong>${pricing.diagnostic} diagnostic</strong>, waived if we do
                  the work
                </span>
              </p>
            </div>

            <div className="lp-hero__form">
              <LeadForm
                service={page.service}
                sourceSlug={page.slug}
                heading="Get a call back"
                lede="Send the details and we will ring you. Add a photo and we will turn up with the right part."
                compact
              />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- content */}
        <section className="section">
          <div className="wrap lp-body">
            <div className="lp-copy reveal">
              {page.sections.map((section) => (
                <div key={section.heading}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </div>
              ))}

              <h2>What this covers</h2>
              <ul className="lp-covers">
                {page.covers.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lp-aside reveal">
              <Image
                src={page.image.src}
                alt={page.image.alt}
                width={page.image.width}
                height={page.image.height}
                sizes="(max-width: 1024px) 100vw, 34vw"
              />

              <div className="lp-aside__card">
                <Stars label={`Rated ${site.rating.value} out of 5 stars`} />
                <p className="lp-aside__rating">
                  <strong>{site.rating.value} out of 5</strong> across{" "}
                  {site.rating.count} Google reviews
                </p>
                <p className="lp-aside__area">
                  Serving {serviceAreas.slice(0, 4).join(", ")} and the wider GTA.
                </p>
                <CallButton
                  className="btn btn--primary btn--block"
                  location={`lp-aside:${page.slug}`}
                />
              </div>
            </aside>
          </div>
        </section>

        {/* -------------------------------------------------- reviews */}
        <section className="section section--dark">
          <div className="wrap">
            <div className="section-head section-head--center reveal">
              <span className="eyebrow">Reviews</span>
              <h2>What customers say</h2>
            </div>
            <div className="reviews">
              {pageReviews.map((review) => (
                <article className="review reveal" key={review.author}>
                  <Stars label="5 out of 5 stars" />
                  <p>&ldquo;{review.body}&rdquo;</p>
                  <div className="review__meta">
                    <span className="review__avatar" aria-hidden="true">
                      {review.author.charAt(0)}
                    </span>
                    <span>
                      <strong>{review.author}</strong>
                      <span>{review.meta}</span>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ faq */}
        {page.faqs.length > 0 && (
          <section className="section section--alt">
            <div className="wrap">
              <div className="section-head section-head--center reveal">
                <span className="eyebrow">Questions</span>
                <h2>{page.service} — common questions</h2>
              </div>
              <div className="faq reveal">
                {page.faqs.map((faq, index) => (
                  <details className="faq__item" key={faq.question} open={index === 0}>
                    <summary>
                      <span>{faq.question}</span>
                      <span className="faq__marker" aria-hidden="true" />
                    </summary>
                    <div className="faq__answer">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------- cta band */}
        <section className="cta-band">
          <div className="wrap">
            <h2>Need this sorted today?</h2>
            <p>
              Call and speak to a licensed plumber, or send the details and we will
              ring you back.
            </p>
            <div className="cta-band__actions">
              <CallButton className="btn btn--white" location={`lp-cta:${page.slug}`} />
              <TextButton
                className="btn btn--ghost-light"
                location={`lp-cta:${page.slug}`}
              />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- related */}
        <section className="section">
          <div className="wrap">
            <div className="section-head section-head--center reveal">
              <span className="eyebrow">More</span>
              <h2>Other things we do</h2>
            </div>
            <div className="lp-related">
              {related.map((other) => (
                <Link className="lp-related__item reveal" href={`/${other.slug}`} key={other.slug}>
                  <strong>{other.h1}</strong>
                  <span>{other.subhead}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CallBar />
      <ScrollReveal />

      <script
        type="application/ld+json"
        // Built from static page data above — no user input reaches this.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
