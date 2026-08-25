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

export type Benefit = {
  icon: string;
  title: string;
  blurb: string;
};

/** The three things a membership actually gets you. */
export const memberBenefits: Benefit[] = [
  {
    icon: "clock",
    title: "Priority scheduling",
    blurb:
      "Members go to the front of the queue. Quote your member number when you call and we fit you in ahead of general bookings.",
  },
  {
    icon: "shield",
    title: "Free yearly inspection",
    blurb:
      "Once a year we check your drains, fixtures, shut-off valves and hot water tank, and tell you what is worth doing before it becomes a leak.",
  },
  {
    icon: "tag",
    title: "Discount on services",
    blurb:
      "A standing member discount on every call-out and installation, applied automatically to your invoice.",
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
