import { gallery, pricing, serviceAreas, site } from "./site";

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
      `Burst pipe or flooding in Toronto? A licensed plumber answers 24 hours a day, seven days a week. Call ${site.phone} — we move as fast as traffic allows.`,
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
        body: `A $${pricing.dispatchFee} dispatch fee to come out. You approve the price of the work before anything starts.`,
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
      src: "/img/gallery-drain-machine.jpg",
      alt: "Plumber in an 18 Plumbing shirt running a drain machine into a basement floor drain.",
      width: 900,
      height: 1200,
    },
  },

  {
    slug: "drain-cleaning-toronto",
    kind: "service",
    service: "Drains & blockages",
    metaTitle: "Drain Cleaning Toronto | Blocked Drain Repair",
    metaDescription:
      `Slow, gurgling or backed-up drains cleared properly in Toronto and the GTA. Licensed and insured, open 24 hours. Call ${site.phone}.`,
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
      src: "/img/gallery-drain-stack.jpg",
      alt: "Repaired drain stack joined with a flexible coupling and a new cleanout fitting.",
      width: 640,
      height: 640,
    },
  },

  {
    slug: "hot-water-tank-installation-toronto",
    kind: "service",
    service: "Hot water tank",
    metaTitle: "Hot Water Tank Installation & Replacement | Toronto",
    metaDescription:
      `Hot water tank supply, installation and replacement across Toronto and the GTA. Lines run properly and pressure tested. Licensed and insured — call ${site.phone}.`,
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
      `Running, leaking, blocked or wobbling toilets repaired or replaced across Toronto and the GTA. Licensed and insured, open 24 hours. Call ${site.phone}.`,
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
      src: "/img/gallery-bathroom-suite.jpg",
      alt: "Finished bathroom with a wall-hung toilet and glass shower enclosure against marble tiling.",
      width: 900,
      height: 1200,
    },
  },

  {
    slug: "faucet-installation-toronto",
    kind: "service",
    service: "Faucets & fixtures",
    metaTitle: "Faucet & Fixture Installation Toronto | Licensed Plumber",
    metaDescription:
      `Kitchen and bathroom faucets, valves and fixtures supplied, installed and repaired across Toronto and the GTA. Licensed and insured — call ${site.phone}.`,
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
      src: "/img/gallery-kitchen-island.jpg",
      alt: "Finished kitchen island with an undermount sink and brushed brass pull-down faucet.",
      width: 900,
      height: 1200,
    },
  },

  {
    slug: "dishwasher-installation-toronto",
    kind: "service",
    service: "Appliance hook-up (dishwasher, washer, fridge line)",
    metaTitle: "Dishwasher & Appliance Hook-Up Toronto | Licensed Plumber",
    metaDescription:
      `Dishwashers, washing machines and fridge water lines connected, levelled and leak tested across Toronto and the GTA. Call ${site.phone}.`,
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
      src: "/img/gallery-dishwasher-new.jpg",
      alt: "Stainless dishwasher fitted under a marble worktop beside an undermount sink.",
      width: 900,
      height: 1200,
    },
  },

  // ---------------------------------------------------------------- hub pages
  // The four below round out the Services menu so every card on the homepage
  // has somewhere to go. They are broader than the ad landing pages above and
  // written for someone browsing rather than someone with a burst pipe.
  {
    slug: "bathroom-plumbing-toronto",
    kind: "service",
    service: "Bathroom (toilet, tub, shower, vanity)",
    metaTitle: "Bathroom Plumbing Toronto | Showers, Tubs, Vanities & Toilets",
    metaDescription:
      `Bathroom plumbing across Toronto and the GTA: showers, bathtubs, vanities and toilets installed, replaced or roughed in for a renovation. Licensed and insured. Call ${site.phone}.`,
    h1: "Bathroom plumbing in Toronto",
    subhead:
      "Showers, tubs, vanities and toilets installed, swapped or roughed in for a renovation, and finished so nothing is leaking behind the tile.",
    highlights: [
      "Showers & thermostatic valves",
      "Tubs & vanities",
      "Renovation rough-ins",
      "Wall-hung toilets",
    ],
    sections: [
      {
        heading: "From a single swap to the whole room",
        body: "Most bathroom calls are one fixture: a vanity that has to go, a shower valve that will not hold temperature, a toilet that rocks. We do those in a visit. We also do the full renovation side, where the room is stripped back and every supply, drain and vent has to be in the right place before anyone picks up a tile.",
      },
      {
        heading: "Rough-in before the walls close",
        body: "The expensive mistakes in a bathroom happen behind the drywall. We rough in copper or PEX supplies, set valves at the right height for the fixtures you have chosen, run and vent the drains properly, and pressure test everything with the walls still open. You get photos of what is in there before it disappears.",
      },
      {
        heading: "Fixtures you have already bought",
        body: "Bring your own fixtures if you like. We will check them before the day, because a rain head that needs a ceiling drop or a wall-hung toilet that needs an in-wall carrier changes the plan, and it is cheaper to know that on the phone than on the morning.",
      },
    ],
    covers: [
      "Shower valves, rain heads & handhelds",
      "Bathtub installation & replacement",
      "Wall-hung & floor-mounted toilets",
      "Vanities & basins",
      "Shut-off valves at every fixture",
      "Full bathroom rough-ins",
      "Drain & vent runs",
      "Pressure testing before tiling",
    ],
    faqs: [
      {
        question: "Can you move the toilet or shower to a different wall?",
        answer:
          "Often, yes. It depends on where the drain stack is and what is under the floor. We look first and tell you straight whether it is a small job or a big one.",
      },
      {
        question: "Do you do the tiling as well?",
        answer:
          "No, plumbing only. We work alongside your tiler or contractor and make sure the rough-in is finished and tested before they start, so nobody is opening a tiled wall later.",
      },
      {
        question: "Do you supply fixtures or do I buy them?",
        answer:
          "Either. We can supply, or you can buy your own and we will check they suit the space before the install date.",
      },
    ],
    image: {
      src: "/img/gallery-marble-shower.jpg",
      alt: "Walk-in shower with a rain head, handheld and thermostatic valve set into a marble wall.",
      width: 900,
      height: 1200,
    },
  },
  {
    slug: "kitchen-plumbing-toronto",
    kind: "service",
    service: "Kitchen (sink, disposal, island, fridge line)",
    metaTitle: "Kitchen Plumbing Toronto | Sinks, Disposals & Island Prep Sinks",
    metaDescription:
      `Kitchen plumbing across Toronto and the GTA: sinks, garbage disposals, island prep sinks and fridge water lines, from a tap swap to a full kitchen rough-in. Call ${site.phone}.`,
    h1: "Kitchen plumbing in Toronto",
    subhead:
      "Sinks, disposals, island prep sinks and fridge lines, from a single tap swap to the rough-in for a brand new kitchen.",
    highlights: [
      "Undermount & farmhouse sinks",
      "Garbage disposals",
      "Island prep sinks",
      "Fridge water lines",
    ],
    sections: [
      {
        heading: "The hardest-working fixture in the house",
        body: "A kitchen sink gets used more than every bathroom fixture combined, and it hides a lot under the counter: supply lines, a trap, a dishwasher drain, maybe a disposal and a filter. We set all of it up so the cabinet underneath stays dry and there is still room to store things.",
      },
      {
        heading: "Island sinks need proper venting",
        body: "An island has no wall behind it, so the drain cannot vent the normal way. Done wrong, you get a sink that gurgles, drains slowly or smells. We run island venting the way the code expects, so it works like any other sink and passes inspection.",
      },
      {
        heading: "Disposals and dishwashers share a drain",
        body: "Dishwasher drain, disposal and sink trap all meet in the same few inches of pipe. Get the heights and the high loop wrong and dirty water backs into the dishwasher. We get them right, and we test the lot with the machine running before we leave.",
      },
    ],
    covers: [
      "Kitchen sink installation & replacement",
      "Undermount, drop-in & farmhouse sinks",
      "Garbage disposal installation",
      "Island & prep sink plumbing",
      "Kitchen faucets & pull-down sprayers",
      "Fridge & ice maker water lines",
      "Dishwasher drain connections",
      "Full kitchen rough-ins",
    ],
    faqs: [
      {
        question: "Can you add a sink to an island that does not have one?",
        answer:
          "If we can get a drain to it under the floor, yes. Houses with a basement or crawlspace below the kitchen are usually straightforward. Slab floors are a bigger job. We will tell you which you have.",
      },
      {
        question: "My new sink is a different size from the old one. Is that a problem?",
        answer:
          "Not usually. The drain and supplies rarely line up with a new sink anyway, so reworking them is part of the job. Tell us the model when you book and we will bring the right fittings.",
      },
      {
        question: "Do you install garbage disposals?",
        answer:
          "Yes, new or replacement, including the switch wiring arrangement with your electrician if it is a first-time install.",
      },
    ],
    image: {
      src: "/img/gallery-kitchen-island.jpg",
      alt: "Finished kitchen island with an undermount sink and brushed brass pull-down faucet in a marble worktop.",
      width: 900,
      height: 1200,
    },
  },
  {
    slug: "water-filtration-toronto",
    kind: "service",
    service: "Water filtration",
    metaTitle: "Water Filtration Installation Toronto | Under-Sink & Whole-Home",
    metaDescription:
      `Under-sink and whole-home water filtration supplied and installed across Toronto and the GTA, plumbed in with a bypass so cartridge changes take minutes. Call ${site.phone}.`,
    h1: "Water filtration in Toronto",
    subhead:
      "Under-sink and whole-home systems supplied and installed, plumbed into the line with a proper bypass so changing a cartridge takes minutes, not a plumber.",
    highlights: [
      "Under-sink systems",
      "Whole-home filtration",
      "Bypass & shut-offs fitted",
      "Cartridge changes",
    ],
    sections: [
      {
        heading: "Under-sink or whole-home?",
        body: "An under-sink unit treats the water at one tap, usually the kitchen, and is the right answer if what you care about is what you drink and cook with. A whole-home system sits on the main line and treats everything, including showers and appliances. We will ask what is bothering you about the water and recommend the smaller option when it does the job.",
      },
      {
        heading: "Installed to be serviced",
        body: "A filter is only as good as its last cartridge change. We mount the housing where you can reach it, fit a bypass and shut-offs so you can change cartridges without turning the house off, and leave you knowing which part to order and how often.",
      },
      {
        heading: "What filtration does and does not do",
        body: "Toronto's water is treated and safe. Filtration is about taste, chlorine, sediment from older pipes and, with the right system, specific concerns you have had tested. We will not sell you a system to solve a problem the water does not have.",
      },
    ],
    covers: [
      "Under-sink filtration systems",
      "Dedicated filtered-water taps",
      "Whole-home sediment & carbon filters",
      "Bypass valves & shut-offs",
      "Fridge line filtration",
      "Cartridge & housing replacement",
      "Pressure checks after install",
    ],
    faqs: [
      {
        question: "Which system should I get?",
        answer:
          "Tell us what you are noticing about the water and we will recommend one. For most homes an under-sink unit at the kitchen tap is the sensible start; a whole-home system is for when sediment or chlorine is a problem everywhere.",
      },
      {
        question: "Can I change the cartridges myself?",
        answer:
          "Yes, that is the point of fitting a bypass and shut-offs. We show you on the day and tell you which cartridge to buy.",
      },
      {
        question: "Can you install a system I have already bought?",
        answer:
          "Yes. Send us the model when you book so we can check it will fit where you want it and bring the right fittings.",
      },
    ],
    image: {
      src: "/img/gallery-water-filtration.jpg",
      alt: "Two-stage whole-home water filtration system plumbed into copper lines on a basement wall.",
      width: 900,
      height: 1200,
    },
  },
  {
    slug: "pumps-and-valves-toronto",
    kind: "service",
    service: "Pumps, hose bibs & valves",
    metaTitle: "Pump, Hose Bib & Valve Installation Toronto | Licensed Plumber",
    metaDescription:
      `Sump and utility pumps, frost-free outdoor taps and shut-off valves installed or replaced across Toronto and the GTA, including the ones that seized when you needed them. Call ${site.phone}.`,
    h1: "Pumps, hose bibs and valves",
    subhead:
      "Sump and utility pumps, outdoor taps and shut-off valves installed or replaced, including the ones that seized the last time you needed them.",
    highlights: [
      "Sump & utility pumps",
      "Frost-free hose bibs",
      "Main & fixture shut-offs",
      "Seasonal outdoor tap work",
    ],
    sections: [
      {
        heading: "Shut-off valves that actually shut off",
        body: "The valve under the sink or behind the toilet is the one you reach for in an emergency, and it is the one most likely to be seized or weeping after years of never being turned. We replace old gate and compression valves with quarter-turn ball valves that will work the day you need them.",
      },
      {
        heading: "Outdoor taps and Toronto winters",
        body: "A hose bib that is not frost-free, or that nobody drained in the fall, splits inside the wall and leaks into the house when it thaws. We fit frost-free hose bibs, add an interior shut-off where there is none, and can do the seasonal shut-down and start-up if you would rather not think about it.",
      },
      {
        heading: "Pumps",
        body: "Sump pumps, utility pumps and the check valves and discharge lines that go with them. If your pump runs constantly, short-cycles or has gone quiet, we will tell you whether it is the pump, the float or the line, and fix the one that is actually the problem.",
      },
    ],
    covers: [
      "Sump pump installation & replacement",
      "Utility & laundry tub pumps",
      "Check valves & discharge lines",
      "Frost-free hose bib installation",
      "Interior shut-offs for outdoor taps",
      "Main water shut-off replacement",
      "Fixture shut-off valves",
      "Pressure-reducing valves",
    ],
    faqs: [
      {
        question: "My main shut-off is stiff. Should I force it?",
        answer:
          "No. An old gate valve that has not moved in years can shear or start leaking the moment it does. Leave it and call us; replacing it is a routine job and it is the one valve in the house that has to work.",
      },
      {
        question: "Do I need to shut my outdoor tap off for winter?",
        answer:
          "If it is a standard hose bib, yes: close the interior valve, open the outside tap and let it drain. A frost-free hose bib is designed not to need it, as long as the hose is disconnected. We can fit one so this stops being a yearly chore.",
      },
      {
        question: "How do I know if my sump pump is about to fail?",
        answer:
          "Running constantly, running in short bursts, rattling, or not running when you lift the float are all signs. Most pumps last around ten years. If yours is older and you cannot remember testing it, it is worth a check before the spring melt.",
      },
    ],
    image: {
      src: "/img/gallery-rough-in.jpg",
      alt: "Copper supply lines and a valve roughed into an open stud wall before drywall.",
      width: 900,
      height: 1200,
    },
  },
];

/** Neighbourhood pages reuse the same machinery — add entries here later. */
export const plannedAreaPages = serviceAreas.filter((a) => a !== "Toronto");

export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPages.find((page) => page.slug === slug);
}

/* ------------------------------------------------------------------ photos */

export type PagePhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

/** Pixel sizes of the photos in public/img, so next/image can reserve space. */
const PHOTO_SIZES: Record<string, [number, number]> = {
  "gallery-bathroom-suite": [900, 1200],
  "gallery-dishwasher-new": [900, 1200],
  "gallery-drain-machine": [900, 1200],
  "gallery-drain-stack": [640, 640],
  "gallery-faucet-chrome": [1066, 1168],
  "gallery-floating-vanity": [900, 1200],
  "gallery-hot-water-tank": [512, 640],
  "gallery-kitchen-island": [900, 1200],
  "gallery-marble-shower": [900, 1200],
  "gallery-renovation": [1200, 900],
  "gallery-rough-in": [900, 1200],
  "gallery-toilet-flange": [900, 1200],
  "gallery-water-filtration": [900, 1200],
};

/**
 * Which gallery photos belong on which page. Alt text and captions come from
 * the gallery in lib/site.ts so a photo is described the same way everywhere.
 */
const PHOTOS_BY_SLUG: Record<string, string[]> = {
  "emergency-plumber-toronto": ["gallery-drain-machine", "gallery-rough-in", "gallery-hot-water-tank"],
  "drain-cleaning-toronto": ["gallery-drain-machine", "gallery-toilet-flange", "gallery-drain-stack"],
  "hot-water-tank-installation-toronto": ["gallery-hot-water-tank", "gallery-rough-in", "gallery-water-filtration"],
  "toilet-repair-toronto": ["gallery-toilet-flange", "gallery-bathroom-suite", "gallery-floating-vanity"],
  "faucet-installation-toronto": ["gallery-faucet-chrome", "gallery-kitchen-island", "gallery-floating-vanity"],
  "dishwasher-installation-toronto": ["gallery-dishwasher-new", "gallery-kitchen-island", "gallery-renovation"],
  "bathroom-plumbing-toronto": ["gallery-marble-shower", "gallery-bathroom-suite", "gallery-floating-vanity", "gallery-rough-in"],
  "kitchen-plumbing-toronto": ["gallery-kitchen-island", "gallery-dishwasher-new", "gallery-faucet-chrome"],
  "water-filtration-toronto": ["gallery-water-filtration", "gallery-hot-water-tank", "gallery-rough-in"],
  "pumps-and-valves-toronto": ["gallery-rough-in", "gallery-hot-water-tank", "gallery-drain-stack"],
};

/** The gallery has no entry for this one; it is kept for the drain pages. */
const EXTRA_PHOTOS: Record<string, { alt: string; caption: string }> = {
  "gallery-drain-stack": {
    alt: "New ABS drain stack and cleanout fitted in a basement.",
    caption: "Drain stack and cleanout, replaced",
  },
};

export function photosFor(slug: string): PagePhoto[] {
  return (PHOTOS_BY_SLUG[slug] ?? []).flatMap((name) => {
    const size = PHOTO_SIZES[name];
    if (!size) return [];
    const src = `/img/${name}.jpg`;
    const known = gallery.find((item) => item.src === src) ?? EXTRA_PHOTOS[name];
    if (!known) return [];
    return [{ src, alt: known.alt, caption: known.caption, width: size[0], height: size[1] }];
  });
}

export const landingPageSlugs = landingPages.map((page) => page.slug);

/** Cross-links shown at the bottom of each landing page. */
export function relatedPages(slug: string, limit = 3): LandingPage[] {
  return landingPages.filter((page) => page.slug !== slug).slice(0, limit);
}

export { AREAS as serviceAreaList };
