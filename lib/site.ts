/**
 * Single source of truth for business details.
 *
 * Everything here came from the company's own Google Business listing,
 * Facebook page and Instagram bio — except the email address, which changed
 * from the old Gmail account to info@18plumbing.ca.
 */

export const site = {
  name: "18 Plumbing",
  legalName: "18 Plumbing",
  tagline: "Installation · Maintenance · Repair",
  url: "https://18plumbing.ca",

  phone: "647-618-3079",
  phoneHref: "tel:+16476183079",
  phoneE164: "+1-647-618-3079",

  email: "info@18plumbing.ca",
  emailHref: "mailto:info@18plumbing.ca",

  city: "Toronto",
  region: "ON",
  country: "CA",
  areaLabel: "Toronto, ON & the GTA",
  hours: "Open 24 hours",

  social: {
    facebook: "https://www.facebook.com/18plumbing/",
    instagram: "https://www.instagram.com/18plumbing/",
    // cid is the Google Business listing id for 18 Plumbing.
    google: "https://www.google.com/maps?cid=5532056083881088808",
  },

  /**
   * Where "leave us a review" points.
   *
   * This opens the listing and the customer taps "Write a review" — one extra
   * tap. Google's one-tap short link (https://g.page/r/…/review) is only
   * visible inside the owner's Business Profile dashboard, under "Ask for
   * reviews", so it cannot be derived from the public listing. Paste it here
   * when you have it: fewer taps means noticeably more reviews.
   */
  reviewUrl: "https://www.google.com/maps?cid=5532056083881088808",

  rating: {
    value: 4.9,
    count: 10,
  },
} as const;

export const serviceAreas = [
  "Toronto",
  "North York",
  "Scarborough",
  "Etobicoke",
  "Vaughan",
  "Markham",
  "Richmond Hill",
  "Mississauga",
] as const;

/** "Toronto, North York, … and Mississauga" — for prose like the FAQ answers. */
function serviceAreasSentence(): string {
  const all = [...serviceAreas];
  const last = all.pop();
  return `${all.join(", ")} and ${last}`;
}

export type Service = {
  id: string;
  icon: string;
  title: string;
  blurb: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "drains",
    icon: "pipe",
    title: "Drains & blockages",
    blurb:
      "Slow, gurgling or backed-up drains cleared and repaired — then checked to make sure it stays clear.",
    points: ["Sink, tub & shower drains", "Drain stack repairs", "Cleanout access"],
  },
  {
    id: "fixtures",
    icon: "faucet",
    title: "Faucets & fixtures",
    blurb:
      "Supply, swap and service of taps, valves and fixtures — chrome, brushed or matte black.",
    points: ["Kitchen & bathroom faucets", "Lavatories & hose bibs", "Shut-off valves"],
  },
  {
    id: "bathrooms",
    icon: "tub",
    title: "Bathrooms",
    blurb:
      "Toilets, tubs, showers and vanities installed or repaired — including full fixture changeovers.",
    points: ["Toilets & tanks", "Bathtubs & showers", "Vanity installs"],
  },
  {
    id: "kitchens",
    icon: "sink",
    title: "Kitchens",
    blurb:
      "Sinks, disposals and drain hook-ups — from a single tap swap to a full island prep sink.",
    points: ["Kitchen sinks & disposals", "Island prep sinks", "Fridge water lines"],
  },
  {
    id: "hot-water",
    icon: "tank",
    title: "Hot water tanks",
    blurb:
      "Supply, installation and replacement of hot water tanks, with the water lines run properly and tested.",
    points: ["Tank installs & swaps", "Supply line runs", "Leak & pressure checks"],
  },
  {
    id: "appliances",
    icon: "appliance",
    title: "Appliance hook-ups",
    blurb:
      "Dishwashers, washing machines and refrigerator lines connected, levelled and leak-tested.",
    points: [
      "Dishwasher installation",
      "Washing machine rough-ins",
      "Cold water fridge lines",
    ],
  },
  {
    id: "filtration",
    icon: "drop",
    title: "Water filtration",
    blurb:
      "Filtration systems supplied and installed, plumbed into the line and set up to be easy to service.",
    points: ["Under-sink filtration", "Whole-line systems", "Cartridge changes"],
  },
  {
    id: "pumps",
    icon: "valve",
    title: "Pumps & valves",
    blurb:
      "Pumps, hose bibs and valves installed or replaced — including seasonal outdoor tap work.",
    points: ["Pump installation", "Hose bibs", "Valve replacement"],
  },
];

/* ------------------------------------------------------------- pricing */

export const pricing = {
  /** Shown as the price anchor. Waived when the customer goes ahead with the job. */
  diagnostic: 89,
  plan: {
    monthly: 15,
    annual: 180,
  },
  /** Member discount on labour, as a whole percentage. */
  labourDiscount: 15,
} as const;

/* --------------------------------------------------------- credentials */

/**
 * Trust signals that need real-world values before they are worth showing.
 *
 * Both are null on purpose — a licence number cannot be invented, and a stock
 * photo of a stranger is worse than no photo. Every component that uses these
 * checks for null and simply omits the block, so the site stays correct until
 * the real details are dropped in.
 */
export const credentials = {
  /** e.g. "T85-1234567" — from the City of Toronto master plumber licence. */
  licenceNumber: null as string | null,
  /** Put a real photo at public/img/team.jpg, then set this to "/img/team.jpg". */
  teamPhoto: null as string | null,
  /** Who the customer actually meets. */
  ownerName: "Charles",
} as const;

export type Benefit = {
  icon: string;
  title: string;
  blurb: string;
};

/** The free list — no account, no payment, just a place in the queue. */
export const priorityListBenefits: Benefit[] = [
  {
    icon: "clock",
    title: "Priority over new callers",
    blurb:
      "We already have your address and history, so booking you in takes one call instead of twenty questions.",
  },
  {
    icon: "phone",
    title: "One number that knows you",
    blurb:
      "No forms, no re-explaining the layout of your basement. You are on the list and we know the property.",
  },
  {
    icon: "drop",
    title: "Seasonal reminders",
    blurb:
      "A note before winter about outdoor taps and anything we flagged last visit. No spam, no newsletters.",
  },
];

/** The paid plan — the real membership. */
export const planBenefits: Benefit[] = [
  {
    icon: "shield",
    title: "Annual plumbing inspection",
    blurb:
      "A full yearly check of drains, fixtures, shut-off valves and your hot water tank, with a written list of anything worth doing before it becomes a leak.",
  },
  {
    icon: "tag",
    title: `${pricing.labourDiscount}% off labour`,
    blurb:
      "Every visit, every job, all year. On a single decent repair this pays for the plan on its own.",
  },
  {
    icon: "phone",
    title: "No emergency call-out fee",
    blurb:
      "Burst pipe at 2am costs you the work, not the trip. Non-members pay a call-out on top.",
  },
  {
    icon: "tank",
    title: "Hot water tank flush",
    blurb:
      "Sediment flushed out once a year, which is the single cheapest thing you can do to keep a tank running longer.",
  },
  {
    icon: "clock",
    title: "Front of the queue",
    blurb:
      "Members get scheduled ahead of general bookings. In a bad week that is the difference between today and Thursday.",
  },
];

export const planOptions = [
  {
    value: "annual",
    label: "Annual",
    price: `$${pricing.plan.annual}`,
    per: "per year",
    note: "The inspection alone is worth roughly this much.",
    featured: true,
  },
  {
    value: "monthly",
    label: "Monthly",
    price: `$${pricing.plan.monthly}`,
    per: "per month",
    note: "Cancel any time, no contract.",
    featured: false,
  },
] as const;

export type PlanValue = (typeof planOptions)[number]["value"];

/* ------------------------------------------------------------------ faq */

export type Faq = { question: string; answer: string };

/**
 * Answers to what people actually type into Google before calling a plumber.
 * Rendered on the page and emitted as FAQPage structured data.
 */
export const faqs: Faq[] = [
  {
    question: "Do you charge a call-out fee?",
    answer: `We charge a $${pricing.diagnostic} diagnostic to come out and find the problem, and it is waived if you go ahead with the work. Members on the paid plan pay no emergency call-out fee at all.`,
  },
  {
    question: "How much does a plumber cost in Toronto?",
    answer: `It depends on the job, but you will never get a surprise. We quote the work before we start, so you approve the price first. The visit itself is $${pricing.diagnostic}, waived if we do the work.`,
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes — licensed and insured, and every job is done to the Ontario Building Code, which is what governs plumbing work in Ontario. That matters if the work is ever inspected or you sell the house.",
  },
  {
    question: "Do you actually answer at night and on weekends?",
    answer:
      "Yes. The line is open 24 hours, seven days a week, and a real plumber picks up. Water damage does not wait for Monday.",
  },
  {
    question: "What areas do you cover?",
    answer: `Toronto and the surrounding GTA — ${serviceAreasSentence()}. If you are near the edge of that, call and ask and we will tell you straight away.`,
  },
  {
    question: "What kind of properties do you work on?",
    answer:
      "Low-rise residential and low-rise commercial — houses, duplexes, small apartment buildings and small commercial units. Installation, maintenance and repair.",
  },
  {
    question: "What is included in the membership inspection?",
    answer:
      "We check drains, fixtures, taps, shut-off valves and the hot water tank, flush the tank, and leave you a written list of what is fine, what to watch, and what needs doing. No pressure to book any of it.",
  },
  {
    question: "How quickly can you get here?",
    answer:
      "For emergencies we move as fast as traffic allows, usually same day. Members on the paid plan are scheduled ahead of general bookings.",
  },
];

/** Time windows offered when booking the free inspection. */
export const inspectionTimes = [
  { value: "morning", label: "Morning (8am – 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm – 5pm)" },
  { value: "evening", label: "Evening (5pm – 8pm)" },
  { value: "any", label: "Any time — whatever suits you" },
] as const;

export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  label: string;
};

/** Job photos taken from the company's own Instagram feed. */
export const gallery: GalleryPhoto[] = [
  {
    src: "/img/gallery-kitchen-faucet.jpg",
    width: 587,
    height: 640,
    alt: "Matte black pull-down kitchen faucet installed against a grey brick tile backsplash.",
    caption: "Matte black pull-down kitchen faucet and soap dispenser install",
    label: "Kitchen faucet install",
  },
  {
    src: "/img/gallery-kitchen-sink-disposal.jpg",
    width: 512,
    height: 640,
    alt: "Undermount stainless kitchen sink with the garbage disposal and drain plumbing fitted underneath.",
    caption: "Undermount kitchen sink with garbage disposal and drain hook-up",
    label: "Sink & disposal hook-up",
  },
  {
    src: "/img/gallery-vanity-toilet.jpg",
    width: 518,
    height: 640,
    alt: "Newly installed bathroom vanity with a brushed bronze faucet, next to a fitted toilet.",
    caption: "Bathroom vanity and toilet installation",
    label: "Vanity & toilet install",
  },
  {
    src: "/img/gallery-hot-water-tank.jpg",
    width: 512,
    height: 640,
    alt: "Hot water tank in a basement with blue PEX supply line coiled and connected to a floor drain.",
    caption: "Hot water tank with new PEX supply lines run to the drain",
    label: "Hot water tank & supply line",
  },
  {
    src: "/img/gallery-dishwasher.jpg",
    width: 611,
    height: 640,
    alt: "Stainless steel dishwasher installed flush under a stone countertop between white cabinets.",
    caption: "Built-in stainless dishwasher installation",
    label: "Dishwasher installation",
  },
  {
    src: "/img/gallery-drain-stack.jpg",
    width: 640,
    height: 640,
    alt: "Repaired drain stack joined with a flexible coupling and a new cleanout fitting inside a wall cavity.",
    caption: "Cast iron drain stack repair with flexible coupling and cleanout",
    label: "Drain stack repair",
  },
  {
    src: "/img/gallery-bathroom-faucet.jpg",
    width: 640,
    height: 493,
    alt: "Polished chrome two-handle bathroom faucet fitted to a speckled quartz vanity top.",
    caption: "Chrome centre-set bathroom faucet on a quartz vanity",
    label: "Bathroom faucet",
  },
  {
    src: "/img/gallery-washer-rough-in.jpg",
    width: 640,
    height: 535,
    alt: "Washing machine alcove with a new water supply line roughed in through the wall.",
    caption: "Washing machine water line rough-in",
    label: "Washer rough-in",
  },
  {
    src: "/img/gallery-island-prep-sink.jpg",
    width: 512,
    height: 640,
    alt: "Round stainless prep sink and matte black faucet set into a marble kitchen island.",
    caption: "Island prep sink with matte black pull-out faucet",
    label: "Island prep sink",
  },
];

export type Review = {
  author: string;
  meta: string;
  body: string;
};

/** Verbatim five-star reviews from the 18 Plumbing Google Business listing. */
export const reviews: Review[] = [
  {
    author: "Oleg Tyan",
    meta: "Google review",
    body: "Truly excellent and reliable service. I had issues with kitchen pipes and the faucet on two separate occasions. Both times Charles was working on those — he identified the issues pretty quickly, advised me on all the possible solutions and answered all the questions I had at the moment. Not only that, but he also was very time aware.",
  },
  {
    author: "Jonathan Rosenfeld",
    meta: "Local Guide · Google review",
    body: "Charles is a true professional and installed all my fixtures in a timely manner. I have been using his services for many years and have always had a positive experience.",
  },
  {
    author: "Elle Gee",
    meta: "Google review",
    body: "Sink is unblocked, toilet is flushing perfectly and the shower is running smooth. It has been several years since the job was done and I have not had a problem since. Great services, highly recommended, will be the only company I use.",
  },
  {
    author: "Gershon A.",
    meta: "Google review",
    body: "I highly recommend Charles. He was courteous, clean, and honest. He also changed our kitchen faucet quickly and made some recommendations that made sense. Very satisfied.",
  },
  {
    author: "Jay Hill",
    meta: "Google review",
    body: "Very professional, does everything by rules of the Canadian guidelines plumbing code, if you ever need to get it checked out. Very careful with his work so you feel comfortable with work done for years to come!",
  },
  {
    author: "Mindy Klein",
    meta: "Google review",
    body: "I was very pleased with the work done by this company and they solved the plumbing problems we were experiencing. They left the areas they were working on spotless and I did not have to clean up after them. I would definitely call them again.",
  },
];
