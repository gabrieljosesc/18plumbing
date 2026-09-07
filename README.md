# 18 Plumbing

Website for **18 Plumbing** — a licensed and insured plumbing company serving
low-rise residential and commercial properties in Toronto and the GTA.

Next.js (App Router) + TypeScript, with member accounts in Supabase.

The site does **not** offer online quotes. Pricing happens on the phone. What
the site does instead is sign customers up as members.

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Runs at http://localhost:3000. `.env.local` already points at the live Supabase
project.

| Script              | What it does               |
| ------------------- | -------------------------- |
| `npm run dev`       | Dev server with hot reload |
| `npm run build`     | Production build           |
| `npm start`         | Serve the production build |
| `npm run typecheck` | `tsc --noEmit`             |
| `npm run lint`      | Next.js lint               |

---

## Membership — two tiers

Both live in [`lib/site.ts`](lib/site.ts). Change a price or a benefit there and
it updates the page, the signup form, the account dashboard and the structured
data at once.

### Free — the priority list

Name, phone, address. No password, no account, no card. It is lead capture:
rows land in `priority_list` and you work them from the Supabase Table Editor
(`status` moves `new` → `contacted` → `converted`).

### Paid — the plan

**$15/month or $180/year.** Four benefits: annual inspection, 15% off labour,
hot water tank flush, front of the queue.

Signup creates a real account but sets `membership_status = 'pending'`. The
dashboard then shows a "one step left" panel and **hides the inspection booking
form** until you take payment and flip the profile to `active` in Supabase.
That gating is deliberate: nobody books a free inspection without paying first.

There is no Stripe integration — you take payment over the phone, which matches
selling the plan after a job. Adding Stripe later means changing how
`membership_status` gets set to `active`, and nothing else.

### Activating a member

Supabase → Table Editor → `profiles` → set `membership_status` to `active`.
Their benefits and booking form appear on next page load.

---

## SEO

Already in place:

- **LocalBusiness (`Plumber`) schema** — hours, phone, service area, rating,
  social profiles, price range, plus a service catalogue built from your eight
  services and the membership as a priced offer
- **FAQPage schema** — all eight FAQ answers, eligible for rich results
- **Sitemap and robots.txt** — generated at `/sitemap.xml` and `/robots.txt`
- **FAQ section** — plain `<details>` elements, so Google reads every answer
  whether or not it is expanded
- **Price anchor** — "$89 diagnostic, waived if we do the work" in the hero and
  the FAQ

### Reviews — the highest-leverage thing on this list

10 reviews will not outrank established competitors; 30+ starts to. The site now
has a "Leave a review" button in the Reviews section, but the real win is texting
the link after every single job.

`site.reviewUrl` currently points at the listing, so the customer taps "Write a
review" themselves — one extra tap. **Google's one-tap link is better and it is
worth two minutes to get it:** Business Profile → *Ask for reviews* → copy the
`https://g.page/r/…/review` link → paste it into `site.reviewUrl`. That link
cannot be derived from the public listing, which is why it is not already set.

---

## ⚠️ What still needs you

The team photo and the Google review link have both been supplied and are live.
One thing is still stubbed, because it cannot be invented:

| What | Where | Why it matters |
| ---- | ----- | -------------- |
| **Licence number** | `credentials.licenceNumber` in `lib/site.ts` | Currently `null`, so the licence line and the schema credential are omitted entirely. A real number is a strong trust signal — a made-up one is a liability. |


It degrades gracefully: the licence line and the schema credential are simply
omitted while the value is null, so the site stays correct meanwhile.

Also unconfirmed: whether the person in `team.jpg` is Charles. The section names
him, so check before it goes in front of customers.

---

## ⚠️ Before you launch: email

**Signup is currently broken for real traffic until you set up SMTP.**

Supabase's built-in mailer is rate-limited to a few messages per hour — it is
meant for development only. Testing hit `email rate limit exceeded` almost
immediately. Since accounts require email confirmation, that limit means real
signups will silently fail once a handful of people try in the same hour.

Fix it in **Supabase dashboard → Project Settings → Authentication → SMTP
Settings**, using any transactional provider (Resend, SendGrid, Postmark,
Mailgun). No code changes needed.

Also worth turning on while you are in there: **Authentication → Providers →
Email → Leaked password protection**, which checks new passwords against
HaveIBeenPwned. The security advisor flags this as off.

---

## Where the content lives

Almost all copy and business data sits in [`lib/site.ts`](lib/site.ts).

| Export            | Contains                                               |
| ----------------- | ------------------------------------------------------ |
| `site`            | Name, phone, email, hours, social links, Google rating |
| `services`        | The eight service cards                                |
| `pricing`         | Diagnostic fee, plan prices, labour discount           |
| `planBenefits`    | The four paid-plan perks                               |
| `priorityListBenefits` | What the free list gets you                       |
| `faqs`            | FAQ copy, also emitted as FAQPage schema              |
| `credentials`     | Licence number and team photo (both currently null)   |
| `inspectionTimes` | Time windows in the booking form                       |
| `serviceAreas`    | Cities in the Service Area section                     |
| `gallery`         | Job photos with alt text and captions                  |
| `reviews`         | Verbatim Google reviews                                |

Change the phone number there and it updates the page copy, footer, call bar,
member card and Google structured data at once.

### Current details

- **Phone:** 647-478-1857 (open 24 hours)
- **Email:** info@18plumbing.ca — *replaces the old `18plumbing@gmail.com`*
- **Facebook:** https://www.facebook.com/18plumbing/
- **Instagram:** https://www.instagram.com/18plumbing/
- **Google Business:** https://www.google.com/maps?cid=5532056083881088808 (4.9 ★, 10 reviews)

### Images

Photos in `public/img/` were supplied by the client, shot on site. Originals are
3024x4032; they are stored here resized to 900-1900px on the long edge, which is
well above what any layout slot needs.

The earlier Instagram-sourced set was removed. Instagram only serves 512-640px
publicly, and those files were being displayed larger than their real resolution.
`gallery-drain-stack.jpg` and `gallery-hot-water-tank.jpg` are the two survivors,
kept because the client's set had no equivalent shot.

`team.jpg` is the owner on site. `van.jpg` appears inset on the same section.
`services-flyer.jpg` and `logo-wide.jpg` are kept for reference but unused — the
flyer still shows the old Gmail address.

Client photos arrive as HEIC from iPhones. Windows decodes HEIC natively via
`System.Windows.Media.Imaging.BitmapDecoder`, so no extra tooling is needed, but
EXIF orientation has to be applied manually or roughly a fifth of them come out
on their side.

---

## Brand

Colours sampled from the logo, defined at the top of
[`app/globals.css`](app/globals.css):

| Token    | Value     | Used for                           |
| -------- | --------- | ---------------------------------- |
| `--navy` | `#2C4478` | Wordmark, headings, primary blocks |
| `--teal` | `#04849C` | Logo ring, buttons, accents        |

Fonts are Montserrat (headings) and Inter (body), via `next/font`.

---

## Database

Three tables, all with RLS on.

**`priority_list`** — free-tier leads. Insert-only from the browser: anyone can
add themselves, nobody can read the list back.

**`profiles`** — one row per paid-plan member, created by trigger on signup.
Holds name, phone, address, `member_number`, `member_since`, `plan`
(`monthly` / `annual`) and `membership_status`
(`pending` / `active` / `paused` / `cancelled`).

**`inspection_requests`** — free-inspection bookings. `status` moves through
`requested` → `scheduled` → `completed`, or `cancelled`. You work these from the
Supabase Table Editor; setting `scheduled_for` and `status` is staff-side only.

### Security model

Every policy is scoped to `auth.uid()`, so a member can only ever touch their
own rows. This was probed against the live database with two real accounts:

| Attempt                                              | Result           |
| ---------------------------------------------------- | ---------------- |
| Anonymous read of `profiles` / `inspection_requests` | `[]` — nothing   |
| Anonymous insert of a booking                        | 401, RLS violation |
| Member A reading all profiles                        | Only their own row |
| Member A reading all inspections                     | Only their own booking |
| Member A booking as Member B                         | 403, RLS violation |
| Member A editing Member B's profile                  | 0 rows changed   |

The Supabase security advisor is clean apart from the leaked-password toggle
noted above.

### Migrations

`supabase/migrations/` holds the SQL as applied:

- `0001_membership_profiles.sql` — profiles, member numbers, signup trigger, RLS
- `0002_inspection_requests.sql` — bookings table and RLS
- `0003_drop_quote_requests.sql` — **not applied**, see below
- `0004_lock_down_trigger_functions.sql` — revokes RPC access to the trigger functions

`0003` drops the leftover `quote_requests` table from the earlier quote-form
version. It is empty and unused, but the sandbox blocked the `DROP`, so run it
yourself when convenient: **Supabase → SQL Editor → paste → Run**.

---

## Project layout

```
app/
  layout.tsx         Metadata, fonts, LocalBusiness structured data
  page.tsx           Marketing page composition
  actions.ts         signUp / signIn / signOut / requestInspection
  globals.css        Whole design system
  signup/, login/, account/
  auth/confirm/      Email confirmation handler
  robots.ts, sitemap.ts
components/          One component per page section, plus shared form pieces
lib/
  site.ts            Business data and copy
  auth-schema.ts     Zod schemas, form-state types, value retention
  supabase/          client.ts (browser), server.ts (SSR)
middleware.ts        Session refresh + /account guard
public/img/          Logo and job photos
supabase/migrations/
```

---

## Deploying

Standard Next.js output, needs a Node host — Vercel is the least-effort option.
Currently live at **https://18plumbing.vercel.app**.

Environment variables to set in the host:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

`NEXT_PUBLIC_SITE_URL` is optional. Left unset, the site uses whatever domain
Vercel is serving it from, which is always correct. Set it only when you want to
pin a specific origin — e.g. `https://18plumbing.ca` once that domain is live.

Then, in **Supabase → Authentication → URL Configuration**, add the production
domain to **Site URL** and **Redirect URLs**. Confirmation emails point at
whatever host served the signup request, but Supabase rejects any redirect not
on that allowlist and falls back to Site URL.

### The 18plumbing.ca domain

The domain is registered (nameservers at ClouDNS) but has **no A record**, so it
does not resolve. Until it points at Vercel, the site should stay on the
`.vercel.app` domain — which it now does automatically.

To switch it over: add `18plumbing.ca` in Vercel → Settings → Domains, follow
the DNS records it gives you, then add the domain to Supabase's Redirect URLs.
Nothing in the code needs to change.
