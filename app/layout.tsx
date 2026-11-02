import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import Analytics from "@/components/Analytics";
import { promotionOffer } from "@/lib/promotion";
import { credentials, pricing, services, serviceAreas, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

// Google shows roughly 60 characters of a title and 155 of a description;
// anything past that is cut mid-word in the result. Keep both under.
const description =
  "Licensed, insured Toronto plumber, open 24 hours. Drains, toilets, faucets, " +
  `hot water tanks and appliance hook-ups across the GTA. Call ${site.phone}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // Keyword first, brand last: "Plumber Toronto" is what people type.
    default: `Plumber Toronto | Licensed & Insured, 24/7 | ${site.name}`,
    // Adds 14 characters to every page title, so page titles stay under ~46.
    template: `%s | ${site.name}`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Plumber Toronto | Licensed & Insured, 24/7 | ${site.name}`,
    description,
    url: site.url,
    locale: "en_CA",
    // 1200x630 is what Facebook, LinkedIn and Google's link previews expect;
    // the square logo rendered as a tiny thumbnail.
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "18 Plumbing at work" }],
  },
  twitter: { card: "summary_large_image" },
  // Search Console's meta-tag verification. Set the token in Vercel and the
  // tag appears; unset, nothing is emitted.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  // No icons block on purpose. app/favicon.ico, app/icon.png and
  // app/apple-icon.png are picked up by Next's file convention and get
  // hashed URLs for cache busting. Declaring icons here would override
  // that and pin the old paths.
};

export const viewport: Viewport = {
  themeColor: "#2C4478",
};

/**
 * Google rich-result data for the business, built from lib/site.ts.
 *
 * A function rather than a module-level constant because the promotion offer
 * depends on today's date; a constant would freeze it at server start.
 */
const localBusinessJsonLd = () => {
  // Null when no promotion is live.
  const offer = promotionOffer();

  return {
  "@context": "https://schema.org",
  "@type": "Plumber",
  "@id": `${site.url}/#business`,
  name: site.name,
  url: `${site.url}/`,
  image: `${site.url}/img/logo.jpg`,
  logo: `${site.url}/img/logo.jpg`,
  telephone: site.phoneE164,
  email: site.email,
  description:
    "Licensed and insured low-rise residential and low-rise commercial plumbing " +
    "service and installation in Toronto and the Greater Toronto Area.",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  areaServed: serviceAreas.map((name) => ({ "@type": "City", name })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(site.rating.value),
    reviewCount: String(site.rating.count),
    bestRating: "5",
  },
  sameAs: [site.social.facebook, site.social.instagram, site.social.google],
  priceRange: "$$",
  currenciesAccepted: "CAD",
  ...(credentials.licenceNumber
    ? {
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Plumbing licence",
          identifier: credentials.licenceNumber,
        },
      }
    : {}),
  // Lets Google show the individual services rather than just the business.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Plumbing services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.blurb,
      },
    })),
  },
  makesOffer: [
    {
      "@type": "Offer",
      name: "18 Plumbing membership",
      description:
        `Annual plumbing inspection, ${pricing.labourDiscount}% off labour, ` +
        "a hot water tank flush and front-of-queue scheduling.",
      price: String(pricing.plan.annual),
      priceCurrency: "CAD",
    },
    // Time-boxed: drops out of the markup by itself when the dates pass.
    ...(offer ? [offer] : []),
  ],
  };
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          // Static objects built above — no user input reaches these.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      </body>
    </html>
  );
}
