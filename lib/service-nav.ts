/**
 * The Services menu, in display order.
 *
 * Deliberately a tiny module with no content in it: the header is a client
 * component and imports this, and pulling lib/landing-pages.ts (all the page
 * copy) into the browser bundle for a list of nine labels would be wasteful.
 * Slugs must match entries in lib/landing-pages.ts; the services index page
 * resolves them at render time and will simply skip one that does not exist.
 */
export type ServiceNavItem = {
  label: string;
  slug: string;
  /** The homepage service card this page expands on, if any. */
  serviceId?: string;
};

export const serviceNav: readonly ServiceNavItem[] = [
  { label: "Emergency plumber", slug: "emergency-plumber-toronto" },
  { label: "Drains & blockages", slug: "drain-cleaning-toronto", serviceId: "drains" },
  { label: "Faucets & fixtures", slug: "faucet-installation-toronto", serviceId: "fixtures" },
  { label: "Bathrooms", slug: "bathroom-plumbing-toronto", serviceId: "bathrooms" },
  { label: "Toilet repair", slug: "toilet-repair-toronto" },
  { label: "Kitchens", slug: "kitchen-plumbing-toronto", serviceId: "kitchens" },
  { label: "Hot water tanks", slug: "hot-water-tank-installation-toronto", serviceId: "hot-water" },
  { label: "Appliance hook-ups", slug: "dishwasher-installation-toronto", serviceId: "appliances" },
  { label: "Water filtration", slug: "water-filtration-toronto", serviceId: "filtration" },
  { label: "Pumps & valves", slug: "pumps-and-valves-toronto", serviceId: "pumps" },
];

/** Page slug for a homepage service card, so the card can link to its page. */
export function slugForService(serviceId: string): string | undefined {
  return serviceNav.find((item) => item.serviceId === serviceId)?.slug;
}
