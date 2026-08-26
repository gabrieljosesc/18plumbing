import { pricing, serviceAreas } from "./site";

/**
 * Dedicated landing pages, one per high-intent search.
 *
 * These exist because a single page with anchor links cannot rank for distinct
 * queries and scores badly on Google Ads landing-page relevance — the ad, the
 * keyword and the page headline all have to match. Each entry below becomes a
 * real URL with its own H1, copy, form and schema.
 */
export type LandingPage = {
  slug: string;
  /** Groups pages for internal linking and the sitemap. */
  kind: "service" | "area";
  /** Prefilled into the lead form's service field, for ad attribution. */
  service: string;

  /** <title> and H1 — keep them close, Ads checks for it. */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** One line under the H1. The promise, not a description. */
  subhead: string;

  /** Chips under the hero — short, scannable proof. */
  highlights: string[];

  /** Body copy. Each block is a subheading plus a paragraph. */
  sections: { heading: string; body: string }[];

  /** Bulleted list of what is actually covered. */
  covers: string[];

  /** Page-specific questions, appended to the shared FAQ schema. */
  faqs: { question: string; answer: string }[];

  /** Photo from the gallery that suits this page. */
  image: { src: string; alt: string; width: number; height: number };
};

const AREAS = serviceAreas.join(", ");

export const landingPages: LandingPage[] = [
  {
    slug: "emergency-plumber-toronto",
    kind: "service",
    service: "Emergency / leak",
    metaTitle: "Emergency Plumber Toronto | 24 Hour Callout",
    metaDescription:
      "Burst pipe or flooding in Toronto? A licensed plumber answers 24 hours a day, seven days a week. Call 647-618-3079 — we move as fast as traffic allows.",
    h1: "Emergency plumber in Toronto, 24 hours a day",
    subhead:
      "Burst pipe, flooding, no water — a licensed plumber picks up the phone at 2am, not an answering service.",
    highlights: [
      "Real person answers, any hour",
      "Licensed & insured",
      "Usually same day",
      "Toronto & the GTA",
    ],
    sections: [
      {
        heading: "First: turn off the water",
        body: "If water is actively coming out, shut the main valve — usually in the basement near the front wall, where the supply enters the house. Turn it clockwise until it stops. Then call us. That one step is the difference between a repair and a claim.",
      },
      {
        heading: "What happens when you call",
        body: "You describe what you are seeing and we tell you straight away whether it can wait until morning or needs someone now. If it needs someone now, we give you a realistic arrival time rather than an optimistic one. No call centre, no ticket number.",
      },
      {
        heading: "What it costs",
        body: `A ${`$${pricing.diagnostic}`} diagnostic to come out and find the fault, waived if you go ahead with the repair. You approve the price of the work before anything starts. Members on the plan pay no emergency call-out fee at all.`,
      },
    ],
    covers: [
      "Burst and leaking pipes",
      "Flooding and water damage",
      "No hot water",
      "Blocked or overflowing drains",
      "Overflowing or running toilets",
      "Failed shut-off valves",
      "Hot water tank leaks",
      "Frozen pipes in winter",
    ],
    faqs: [
      {
        question: "Do you really answer at 3am?",
        answer:
          "Yes. The line is open 24 hours and a licensed plumber answers it — not a call centre taking a message for the morning.",
      },
      {
        question: "How fast can you get to me?",
        answer:
          "For genuine emergencies we move as fast as traffic allows, usually same day. We tell you a realistic time on the phone rather than an optimistic one.",
      },
      {
        question: "What should I do before you arrive?",
        answer:
          "Shut off the main water valve, move anything valuable away from the water, and put down towels to contain it. Do not use the fixture that is leaking.",
      },
    ],
    image: {
      src: "/img/gallery-drain-stack.jpg",
      alt: "Repaired drain stack joined with a flexible coupling and a new cleanout fitting.",
      width: 640,
      height: 640,
    },
  },

  {
    slug: "drain-cleaning-toronto",
    kind: "service",
    service: "Drains & blockages",
    metaTitle: "Drain Cleaning Toronto | Blocked Drain Repair",
    metaDescription:
      "Slow, gurgling or backed-up drains cleared properly in Toronto and the GTA. Licensed and insured, open 24 hours. Call 647-618-3079.",
    h1: "Drain cleaning in Toronto",
    subhead:
      "Slow, gurgling or backed up — cleared, then checked so it stays clear rather than coming back in a month.",
    highlights: [
      "Kitchen, bath & main drains",
      "Cause found, not just cleared",
      "Clean work, no mess left",
      "Open 24 hours",
    ],
    sections: [
      {
        heading: "Clearing it is the easy part",
        body: "Most blockages come back because only the blockage was dealt with, not the reason it formed. We clear the line, then look at why it happened — grease buildup, a bad fall on the pipe, roots, or something further down the stack — and tell you what would actually stop it recurring.",
      },
      {
        heading: "Gurgling and slow drains are early warnings",
        body: "A drain that empties slowly or burps air when another fixture runs is telling you the line is partly blocked or badly vented. Dealt with then, it is a straightforward job. Left alone it becomes a backup, usually at the least convenient moment.",
      },
      {
        heading: "Older Toronto houses",
        body: "Plenty of houses here still have original cast iron or clay drain lines. They fail in predictable ways, and the fix is often a section replacement with a proper cleanout added so the next inspection takes ten minutes instead of opening a wall.",
      },
    ],
    covers: [
      "Kitchen sink blockages",
      "Bathroom sink & tub drains",
      "Shower drains",
      "Main drain backups",
      "Drain stack repairs",
      "Cleanout access installed",
      "Grease and soap buildup",
      "Slow or gurgling drains",
    ],
    faqs: [
      {
        question: "Why does my drain keep blocking?",
        answer:
          "Usually because only the blockage was cleared and not the cause — grease buildup, a poor fall on the pipe, root intrusion or a venting problem. We look for the reason, not just the symptom.",
      },
      {
        question: "Can you clear a main drain backup?",
        answer:
          "Yes. Main line backups are one of the more common calls we get, particularly in older Toronto houses with original cast iron or clay drains.",
      },
    ],
    image: {
      src: "/img/gallery-kitchen-sink-disposal.jpg",
      alt: "Undermount stainless kitchen sink with the garbage disposal and drain plumbing fitted underneath.",
      width: 512,
      height: 640,
    },
  },

  {
    slug: "hot-water-tank-installation-toronto",
    kind: "service",
    service: "Hot water tank",
    metaTitle: "Hot Water Tank Installation & Replacement | Toronto",
    metaDescription:
      "Hot water tank supply, installation and replacement across Toronto and the GTA. Lines run properly and pressure tested. Licensed and insured — call 647-618-3079.",
    h1: "Hot water tank installation and replacement",
    subhead:
      "Supplied, installed and pressure tested — with the supply lines run properly rather than bodged to fit.",
    highlights: [
      "Supply & install",
      "Old tank removed",
      "Lines run to code",
      "Leak & pressure tested",
    ],
    sections: [
      {
        heading: "When a tank is worth replacing",
        body: "Rust in the hot water, a tank that has stopped keeping up, water pooling around the base, or simply age — most tanks give eight to twelve years. If yours is at that point and starting to weep, replacing it on your schedule costs far less than replacing it after it lets go across a finished basement.",
      },
      {
        heading: "The install itself",
        body: "Old tank drained and taken away, new one set and levelled, supply lines run cleanly, connections pressure tested, and the area left clean. We do not leave you with a new tank plumbed in with whatever fittings were already there.",
      },
      {
        heading: "Keeping it alive longer",
        body: "Sediment settling in the bottom of the tank is what kills most of them early. An annual flush is the single cheapest thing you can do about it, and it is included in the membership plan.",
      },
    ],
    covers: [
      "Tank supply & installation",
      "Like-for-like replacement",
      "Old tank removal",
      "Supply line runs",
      "Annual tank flush",
      "Leak & pressure testing",
      "Shut-off valve replacement",
      "No-hot-water diagnosis",
    ],
    faqs: [
      {
        question: "How long does a hot water tank last?",
        answer:
          "Typically eight to twelve years. Rust-coloured hot water, water pooling at the base, or a tank that no longer keeps up are the usual signs it is near the end.",
      },
      {
        question: "Do you take the old tank away?",
        answer: "Yes — removal and disposal of the old tank is part of the job.",
      },
      {
        question: "Why does a tank need flushing?",
        answer:
          "Sediment collects in the bottom and makes the tank work harder, which shortens its life. A yearly flush is the cheapest maintenance there is, and it is included in the membership plan.",
      },
    ],
    image: {
      src: "/img/gallery-hot-water-tank.jpg",
      alt: "Hot water tank with blue PEX supply line connected and run to a floor drain.",
      width: 512,
      height: 640,
    },
  },

  {
    slug: "toilet-repair-toronto",
    kind: "service",
    service: "Bathroom (toilet, tub, shower, vanity)",
    metaTitle: "Toilet Repair & Installation Toronto | Licensed Plumber",
    metaDescription:
      "Running, leaking, blocked or wobbling toilets repaired or replaced across Toronto and the GTA. Licensed and insured, open 24 hours. Call 647-618-3079.",
    h1: "Toilet repair and installation in Toronto",
    subhead:
      "Running, leaking, blocked or rocking — fixed properly, or replaced and sealed so it stays put.",
    highlights: [
      "Repairs & full replacement",
      "Leaks at the base sorted",
      "Clean, tidy work",
      "Same-day where possible",
    ],
    sections: [
      {
        heading: "A running toilet is not harmless",
        body: "A toilet that keeps refilling is usually a worn flapper or a fill valve that will not seat — cheap parts, quick job. Left running it quietly adds up on the water bill, and in a rental or condo it is the sort of thing that ends up in a complaint.",
      },
      {
        heading: "Water around the base",
        body: "Water pooling at the foot of the toilet usually means the wax seal has failed or the toilet is rocking on an uneven floor. Both need the toilet lifted and reset properly. Sealing around the outside without lifting it just hides the leak while the subfloor takes the damage.",
      },
      {
        heading: "Replacing rather than repairing",
        body: "If the tank is cracked, the porcelain is damaged, or you are replacing it for looks anyway, we supply and fit the new one, set it level, seal it and take the old one away.",
      },
    ],
    covers: [
      "Running & refilling toilets",
      "Leaks at the base",
      "Blocked toilets",
      "Flapper & fill valve replacement",
      "Wax seal replacement",
      "Rocking or loose toilets",
      "Full toilet replacement",
      "Shut-off valve replacement",
    ],
    faqs: [
      {
        question: "Why is there water around the bottom of my toilet?",
        answer:
          "Usually a failed wax seal or a toilet rocking on an uneven floor. Both need the toilet lifted and reset — sealing around the outside only hides it while the subfloor takes damage.",
      },
      {
        question: "Can you fix a toilet that keeps running?",
        answer:
          "Yes, and it is normally a quick job — typically a worn flapper or a fill valve that will not seat properly.",
      },
    ],
    image: {
      src: "/img/gallery-vanity-toilet.jpg",
      alt: "Newly installed bathroom vanity and fitted toilet.",
      width: 518,
      height: 640,
    },
  },

  {
    slug: "faucet-installation-toronto",
    kind: "service",
    service: "Faucets & fixtures",
    metaTitle: "Faucet & Fixture Installation Toronto | Licensed Plumber",
    metaDescription:
      "Kitchen and bathroom faucets, valves and fixtures supplied, installed and repaired across Toronto and the GTA. Licensed and insured — call 647-618-3079.",
    h1: "Faucet and fixture installation",
    subhead:
      "Kitchen, bathroom, laundry and outdoor taps — fitted properly, tested, and the old one taken away.",
    highlights: [
      "Supply or fit your own",
      "Chrome, brushed or matte black",
      "Shut-off valves replaced",
      "No mess left behind",
    ],
    sections: [
      {
        heading: "Dripping taps are rarely just a washer now",
        body: "Modern mixers use cartridges rather than washers, and on a lot of units the cartridge costs nearly as much as the tap. We tell you honestly which way is better value before doing either.",
      },
      {
        heading: "Fitting a tap you bought yourself",
        body: "Happy to fit a faucet you have already bought. Worth knowing before you order: check the number of holes in your sink or counter, and whether it is a standard centre-set or widespread spread — that is the thing that most often stops a new tap going in.",
      },
      {
        heading: "The valves underneath",
        body: "Old shut-off valves under a sink often seize or weep once they are moved for the first time in years. We check them as part of the job and tell you if they should be replaced while everything is already apart, rather than leaving you to find out later.",
      },
    ],
    covers: [
      "Kitchen faucets",
      "Bathroom & lavatory taps",
      "Pull-down & pull-out mixers",
      "Laundry taps",
      "Outdoor hose bibs",
      "Shut-off valve replacement",
      "Dripping tap repairs",
      "Soap dispensers & accessories",
    ],
    faqs: [
      {
        question: "Can you install a faucet I bought myself?",
        answer:
          "Yes. Check the hole count and spread on your sink or counter before ordering — mismatched hole spacing is the usual reason a new tap will not fit.",
      },
      {
        question: "Is it worth repairing a dripping tap or replacing it?",
        answer:
          "It depends on the unit. On many modern mixers the replacement cartridge costs nearly as much as a new tap, so we tell you which is better value before starting.",
      },
    ],
    image: {
      src: "/img/gallery-kitchen-faucet.jpg",
      alt: "Matte black pull-down kitchen faucet installed against a grey brick tile backsplash.",
      width: 587,
      height: 640,
    },
  },

  {
    slug: "dishwasher-installation-toronto",
    kind: "service",
    service: "Appliance hook-up (dishwasher, washer, fridge line)",
    metaTitle: "Dishwasher & Appliance Hook-Up Toronto | Licensed Plumber",
    metaDescription:
      "Dishwashers, washing machines and fridge water lines connected, levelled and leak tested across Toronto and the GTA. Call 647-618-3079.",
    h1: "Dishwasher and appliance hook-ups",
    subhead:
      "Dishwashers, washing machines and fridge water lines connected, levelled and leak tested before we leave.",
    highlights: [
      "Dishwashers & washers",
      "Fridge water lines",
      "Levelled & leak tested",
      "Old appliance disconnected",
    ],
    sections: [
      {
        heading: "Why the hook-up is worth doing properly",
        body: "Appliance connections are behind a cabinet where you will not see a slow leak until the floor is ruined. A proper install means the right fittings, a correct air gap or high loop on the drain, and everything tested under pressure before the machine goes back in.",
      },
      {
        heading: "Fridge water lines",
        body: "Cold water lines for ice makers and door dispensers are a common source of slow leaks, especially where a saddle valve was used. We run a proper line with a real shut-off so it can be isolated without turning the house off.",
      },
      {
        heading: "Washing machine rough-ins",
        body: "New laundry location, or moving an existing one — hot and cold supply, drain and shut-offs run to code, so the hoses are not the only thing standing between you and a flooded floor.",
      },
    ],
    covers: [
      "Dishwasher installation",
      "Dishwasher removal & swap",
      "Washing machine hook-up",
      "Laundry rough-ins",
      "Fridge & ice maker lines",
      "Saddle valve replacement",
      "Drain air gaps & high loops",
      "Leak testing",
    ],
    faqs: [
      {
        question: "Do you disconnect and remove the old appliance?",
        answer:
          "We disconnect it and can move it clear for you. Disposal depends on the appliance — ask when you book and we will tell you.",
      },
      {
        question: "Can you run a water line to my fridge?",
        answer:
          "Yes, with a proper shut-off so it can be isolated on its own. If yours is currently on a saddle valve, replacing it is worth doing — they are a common cause of slow leaks.",
      },
    ],
    image: {
      src: "/img/gallery-dishwasher.jpg",
      alt: "Stainless steel dishwasher installed flush under a stone countertop between white cabinets.",
      width: 611,
      height: 640,
    },
  },
];

/** Neighbourhood pages reuse the same machinery — add entries here later. */
export const plannedAreaPages = serviceAreas.filter((a) => a !== "Toronto");

export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPages.find((page) => page.slug === slug);
}

export const landingPageSlugs = landingPages.map((page) => page.slug);

/** Cross-links shown at the bottom of each landing page. */
export function relatedPages(slug: string, limit = 3): LandingPage[] {
  return landingPages.filter((page) => page.slug !== slug).slice(0, limit);
}

export { AREAS as serviceAreaList };
