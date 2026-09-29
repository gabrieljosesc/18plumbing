/**
 * Dates as the business sees them.
 *
 * The server runs in UTC; the plumbers work in Toronto. Every date shown to
 * staff, and every date they type in, goes through here so 9am means 9am on
 * the truck and not 9am in Greenwich.
 */

export const TORONTO_TZ = "America/Toronto";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** A date-only column such as "2026-10-01". No timezone maths — none is needed. */
export function formatDay(value: string | null): string {
  if (!value) return "—";
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return value;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** A timestamp shown as a Toronto calendar date. */
export function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-CA", {
    timeZone: TORONTO_TZ,
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** A timestamp shown as Toronto date and time. */
export function formatDateTime(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-CA", {
    timeZone: TORONTO_TZ,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Minutes east of UTC that Toronto sits at a given instant (-300 or -240). */
function torontoOffsetMinutes(at: Date): number {
  const label =
    new Intl.DateTimeFormat("en-CA", {
      timeZone: TORONTO_TZ,
      timeZoneName: "shortOffset",
    })
      .formatToParts(at)
      .find((part) => part.type === "timeZoneName")?.value ?? "GMT-5";

  const match = /GMT([+-]\d{1,2})(?::?(\d{2}))?/.exec(label);
  if (!match) return -300;
  const hours = Number(match[1]);
  const minutes = Number(match[2] ?? 0);
  return hours * 60 + Math.sign(hours) * minutes;
}

/**
 * "2026-10-01T09:00" typed by staff in Toronto → the ISO instant to store.
 *
 * Guess the instant as if the wall time were UTC, then pull it by the zone
 * offset. A second pass catches the case where that correction itself crosses
 * a daylight-saving boundary.
 */
export function torontoLocalToIso(local: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(local);
  if (!match) return null;
  const [, y, m, d, hh, mm] = match.map(Number);

  const guess = Date.UTC(y, m - 1, d, hh, mm);
  const first = torontoOffsetMinutes(new Date(guess));
  const instant = new Date(guess - first * 60_000);
  const second = torontoOffsetMinutes(instant);

  return (second === first ? instant : new Date(guess - second * 60_000)).toISOString();
}

/** A stored instant → the value a datetime-local input wants, in Toronto time. */
export function toTorontoInput(value: string | null): string {
  if (!value) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TORONTO_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(value));
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}
