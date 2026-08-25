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

## Membership

Members get three things, and these are stated in exactly one place —
`memberBenefits` in [`lib/site.ts`](lib/site.ts):

1. **Priority scheduling** — they quote their member number on the phone
2. **Free yearly plumbing inspection** — booked from their account page
3. **Discount on services** — applied to their invoice

### Pages

| Route     | What it is                                                     |
| --------- | -------------------------------------------------------------- |
| `/`       | Marketing page, with a Membership section that swaps CTAs depending on whether you are signed in |
| `/signup` | Create an account — name, email, phone, service address, password |
| `/login`  | Member sign in                                                  |
| `/account`| Member dashboard — member card, details, benefits, inspection booking and history |
| `/auth/confirm` | Lands the confirmation link from the signup email          |

`/account` is guarded in [`middleware.ts`](middleware.ts), which also refreshes
the session cookie on every request. Signed-in visitors hitting `/login` or
`/signup` bounce to `/account`.

### How signup works

1. `signUp` in [`app/actions.ts`](app/actions.ts) validates with Zod and calls
   `supabase.auth.signUp`, passing name / phone / address as user metadata.
2. Supabase emails a confirmation link.
3. A Postgres trigger (`handle_new_user`) creates the `profiles` row from that
   metadata and assigns a member number — `18P-1001`, `18P-1002`, and so on.
4. Clicking the link hits `/auth/confirm`, which verifies the token and drops
   the member on `/account`.

Forms echo back everything except passwords when a submission is rejected.
React 19 resets an uncontrolled form once its action settles, so without this a
failed signup would wipe every field the visitor had filled in.

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
| `memberBenefits`  | The three membership perks                             |
| `inspectionTimes` | Time windows in the booking form                       |
| `serviceAreas`    | Cities in the Service Area section                     |
| `gallery`         | Job photos with alt text and captions                  |
| `reviews`         | Verbatim Google reviews                                |

Change the phone number there and it updates the page copy, footer, call bar,
member card and Google structured data at once.

### Current details

- **Phone:** 647-618-3079 (open 24 hours)
- **Email:** info@18plumbing.ca — *replaces the old `18plumbing@gmail.com`*
- **Facebook:** https://www.facebook.com/18plumbing/
- **Instagram:** https://www.instagram.com/18plumbing/
- **Google Business:** https://www.google.com/maps?cid=5532056083881088808 (4.9 ★, 10 reviews)

### Images

Photos in `public/img/` came from the company's own Instagram feed, the logo
from the Facebook page. They are served at Instagram's resolution (512–640px).
Higher-resolution originals can be dropped in under the same filenames; update
the dimensions in `lib/site.ts` to match.

`services-flyer.jpg` and `logo-wide.jpg` are kept for reference but unused — the
flyer still shows the old Gmail address.

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

Two tables, both with RLS on.

**`profiles`** — one row per member, created by trigger on signup. Holds name,
phone, address, `member_number`, `member_since` and `membership_status`
(`active` / `paused` / `cancelled`).

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
Set these in the host:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Then, in **Supabase → Authentication → URL Configuration**, add the production
domain to **Site URL** and **Redirect URLs**. Confirmation emails point at
whatever host served the signup request, so without this the links will keep
pointing at localhost.

Finally, point `site.url` in `lib/site.ts` at the real domain if it ever changes
from `https://18plumbing.ca` — canonical URL, Open Graph tags, sitemap and
structured data all read from it.
