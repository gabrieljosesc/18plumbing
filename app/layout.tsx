import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import Analytics from "@/components/Analytics";
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

const description =
  "18 Plumbing is a licensed and insured Toronto plumber serving low-rise " +
  "residential and commercial properties. Drains, fixtures, toilets, hot water " +
  `tanks, dishwashers and more. Open 24 hours — call ${site.phone}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Licensed Plumber in Toronto & the GTA — 24/7 Service`,
    template: `%s | ${site.name}`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Licensed Plumber in Toronto & the GTA`,
    description,
    url: site.url,
    locale: "en_CA",
    images: [{ url: "/img/logo.jpg", width: 556, height: 556, alt: `${site.name} logo` }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "/img/favicon.svg",
    apple: "/img/logo.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#2C4478",
};

/** Google rich-result data for the business, built from lib/site.ts. */
const localBusinessJsonLd = {
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
  makesOffer: {
    "@type": "Offer",
    name: "18 Plumbing membership",
    description:
      `Annual plumbing inspection, ${pricing.labourDiscount}% off labour, ` +
      "a hot water tank flush and front-of-queue scheduling.",
    price: String(pricing.plan.annual),
    priceCurrency: "CAD",
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
