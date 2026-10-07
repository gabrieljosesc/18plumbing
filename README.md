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

Sign in at `/admin`, find them under **Members**, set the status to **Active**,
Save. Their benefits and booking form appear on their next page load. (The
Supabase Table Editor still works too; the dashboard is just the same edit
with a nicer front.)

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
- **Price anchor** — "$89 dispatch fee" in the hero, landing pages and FAQ. The
  client confirmed the amount and asked for the earlier "waived if we do the
  work" wording to go, so it is a flat fee now

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

## Promotions

One is running: **10% off the first job for first-time clients, until
31 December 2026.** It is defined in one place, [`lib/promotion.ts`](lib/promotion.ts),
and everything else reads from there:

- the pill above the headline on the homepage and every landing page
- the note in the Contact section
- an FAQ entry ("Do you have any offers on right now?"), in the visible FAQ
  and in the FAQPage structured data
- a schema.org `Offer` with `validFrom` / `validThrough` in the LocalBusiness
  markup

All of it is gated on `isPromotionLive()`, which compares the current time with
the start and end dates **in Toronto time**. After the end date the banner, the
FAQ entry and the Offer all disappear on their own. The landing pages are
prerendered, so they carry `revalidate = 3600` and catch up within the hour; the
homepage renders per request.

To run the next promotion, change the numbers and dates in `promotion`. To take
one down early, move `endsOn` to yesterday. Nothing else needs touching.

The terms line ("Mention it when you book. Not combined with the membership
discount.") was set by us as a sensible default, not by the client — confirm it.

---

## Where the content lives

Almost all copy and business data sits in [`lib/site.ts`](lib/site.ts).

| Export            | Contains                                               |
| ----------------- | ------------------------------------------------------ |
| `site`            | Name, phone, email, hours, social links, Google rating |
| `services`        | The eight service cards                                |
| `pricing`         | Dispatch fee, plan prices, labour discount             |
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
- `0005_priority_list_and_plans.sql` — free tier table, plan and pending status on profiles
- `0006_carry_plan_into_profile.sql` — signup trigger copies the chosen plan across
- `0007_leads_and_photos.sql` — lead form table and the private `lead-photos` bucket
- `0008_admins.sql` — staff table, `is_admin()`, and the read/update policies behind `/admin`

`0003` drops the leftover `quote_requests` table from the earlier quote-form
version. It is empty and unused, but the sandbox blocked the `DROP`, so run it
yourself when convenient: **Supabase → SQL Editor → paste → Run**.

---

## Admin dashboard

**`/admin`** — leads, priority list, members and inspection bookings in one
page, each row with a status control. Photos attached to leads open through
one-hour signed URLs. Dates are shown, and typed, in Toronto time.

### Who gets in

Anyone listed in the `public.admins` table. That is the whole rule: not an
email domain, not a flag on the user the browser could set. There is no policy
that lets the app add rows to that table, so the only way to make an admin is
the SQL editor:

```sql
insert into public.admins (user_id, note)
select id, 'Owner login' from auth.users where email = 'admin@18plumbing.ca'
on conflict (user_id) do nothing;
```

The login itself is an ordinary Supabase auth user, created in **Supabase →
Authentication → Users → Add user → Create new user**, with *Auto Confirm User*
ticked. It signs in through the normal `/login` form and is sent to `/admin`
instead of `/account`. The signup trigger gives it a `profiles` row like any
other user; the dashboard hides that row from the Members list.

### What staff can do

RLS policies in `0008_admins.sql` grant admins **select and update** on leads,
the priority list, profiles and inspection requests, plus **select** on the
`lead-photos` bucket. No delete, anywhere, on purpose: a wrong click cannot
destroy a lead. Everything else on the site still runs under the original
member-scoped policies.

The dashboard changes only these columns: `leads.status`,
`priority_list.status`, `profiles.membership_status`,
`inspection_requests.status` and `inspection_requests.scheduled_for`.

### Removing an admin

```sql
delete from public.admins where user_id = (select id from auth.users where email = '...');
```

Their session keeps working until it expires, but every admin query goes
through `is_admin()` on the database, so the data disappears from their view
immediately.

---

## Project layout

```
app/
  layout.tsx         Metadata, fonts, LocalBusiness structured data
  page.tsx           Marketing page composition
  actions.ts         signUp / signIn / signOut / submitLead / joinPriorityList / requestInspection
  globals.css        Whole design system
  signup/, login/, account/
  admin/             Staff dashboard (page.tsx) and its status actions
  thank-you/         Post-submission page; the Google Ads conversion URL
  auth/confirm/      Email confirmation handler
  robots.ts, sitemap.ts
components/          One component per page section, plus shared form pieces
lib/
  site.ts            Business data and copy
  auth-schema.ts     Zod schemas, form-state types, value retention
  admin.ts           isAdminUser / requireAdmin (server only)
  admin-schema.ts    Status vocabularies shared by the dashboard and its actions
  time.ts            Toronto-time formatting and parsing
  analytics.ts       GA4 / Google Ads events
  supabase/          client.ts (browser), server.ts (SSR)
middleware.ts        Session refresh + /account guard
public/img/          Logo and job photos
supabase/migrations/
```

---

## Deploying

Standard Next.js output, needs a Node host — Vercel is the least-effort option.
Currently live at **https://www.18plumbing.ca**.

Environment variables to set in the host:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL
```

`NEXT_PUBLIC_SITE_URL` is technically optional — left unset, the site uses
whatever domain Vercel serves it from. It is set in production anyway, to
`https://www.18plumbing.ca`, because the site answers on both the apex and
`www.`. Unpinned, the canonical tag can name one while Google Ads and GA4 are
keyed to the other.

See [`.env.example`](.env.example) for the optional conversion-tracking vars.

Then, in **Supabase → Authentication → URL Configuration**, add the production
domain to **Site URL** and **Redirect URLs**. Confirmation emails point at
whatever host served the signup request, but Supabase rejects any redirect not
on that allowlist and falls back to Site URL.

### The 18plumbing.ca domain

Live. Nameservers are at ClouDNS, pointing at Vercel, serving on `www.`.

Remember to keep **Supabase → Authentication → URL Configuration** in step:
both `https://18plumbing.ca` and `https://www.18plumbing.ca` belong in Site URL
and Redirect URLs, or confirmation links land on a rejected redirect.

---

## Conversion tracking

[`lib/analytics.ts`](lib/analytics.ts) is the whole of it. `track()` sends a
named event to GA4, and — only where a matching `AW-` label is configured — a
second call to Google Ads, because Ads counts a conversion against `send_to`
rather than the event name.

| Event | Fired by | Ads label |
| ----- | -------- | --------- |
| `click_to_call` | tapping the phone number anywhere on the site | `NEXT_PUBLIC_ADS_CALL_LABEL` |
| `click_to_text` | tapping "Text us" | `NEXT_PUBLIC_ADS_TEXT_LABEL` |
| `lead_form_submit` | the contact form | `NEXT_PUBLIC_ADS_LEAD_LABEL` |
| `priority_list_join` | free priority-list signup | `NEXT_PUBLIC_ADS_LEAD_LABEL` |
| `plan_signup` | paid membership signup | `NEXT_PUBLIC_ADS_LEAD_LABEL` |
| `inspection_booked` | a member booking their inspection | `NEXT_PUBLIC_ADS_LEAD_LABEL` |

An unset label means the event reaches GA4 only. That is deliberate: sending it
to some *other* action's label would inflate a number that bidding runs on.

### How conversions actually reach Google Ads (as configured)

**The three `AW-` label variables are intentionally unset in production, and
must stay that way.** The Google Ads conversion actions are *imported from
GA4* (Source: "Website (Google Analytics (GA4))"), keyed on the event names
above. The chain is: site sends `click_to_call` → GA4 records it as a key
event → Google Ads imports it.

Setting a label as well would make the same tap count twice — once through
GA4, once through the tag's `send_to` call — and Smart Bidding would optimise
towards a conversion count that is double the truth. Switch to labels only if
the GA4 imports are removed first.

### The thank-you page

A successful lead form submission redirects to **`/thank-you`** (a real URL,
`noindex`, disallowed in robots.txt). Two reasons:

- **Google Ads can count it directly** as a page-visit conversion, with no GA4
  import lag. In Ads: Goals → Conversions → + New conversion action → Website →
  *Add a conversion action manually* → category **Submit lead form**, then in
  Tag setup choose **Page load** with the URL rule
  `https://www.18plumbing.ca/thank-you`. Value CA$40, Count One, Primary.
- **It carries the lead id** (`?lead=<uuid>`), which `ThankYouTracker` uses as
  a de-dupe key. The GA4 `lead_form_submit` event fires once per submission,
  not once per refresh, and not at all for a URL typed in by hand.

**Pick one source for the "Lead form" conversion in Ads, not both.** If the
thank-you page is the Ads conversion, do not also import `lead_form_submit`
from GA4, or every lead counts twice. The two call conversions are unaffected;
they stay as GA4 imports.

**Do not paste Google's gtag snippet into the site.** `components/Analytics.tsx`
already emits exactly that tag from `NEXT_PUBLIC_GOOGLE_ADS_ID`. Two copies on a
page means every conversion counted twice.

Ad click ids (`gclid`, `gbraid`, `wbraid`) and UTMs are captured into
`sessionStorage` on arrival, first touch wins, and read back at submit time —
otherwise they are lost the moment someone navigates away from the landing
page.
