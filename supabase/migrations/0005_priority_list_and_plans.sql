-- Two-tier membership.
--
--   Free "priority list" — name / phone / address, no account, no password.
--   Paid plan           — the existing auth account, now with a plan and a
--                         pending state until staff take payment.

create table if not exists public.priority_list (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  full_name   text not null check (char_length(trim(full_name)) between 2 and 120),
  phone       text not null check (char_length(trim(phone)) between 7 and 40),
  address     text not null check (char_length(trim(address)) between 5 and 300),
  email       text check (email is null or char_length(email) <= 254),
  notes       text check (notes is null or char_length(notes) <= 2000),

  status      text not null default 'new'
              check (status in ('new', 'contacted', 'converted', 'archived')),
  source_page text
);

comment on table public.priority_list is
  'Free priority-list signups. Lead capture only — no auth account attached.';

create index if not exists priority_list_created_idx
  on public.priority_list (created_at desc);

alter table public.priority_list enable row level security;

-- Anyone may add themselves. There is deliberately no SELECT policy, so the
-- lead list cannot be read back by anyone holding the publishable key.
create policy "Anyone may join the priority list"
  on public.priority_list
  for insert
  to anon, authenticated
  with check (true);

-- Paid plan tracking on the member profile.
alter table public.profiles
  add column if not exists plan text
    check (plan is null or plan in ('monthly', 'annual')),
  add column if not exists plan_requested_at timestamptz;

-- New signups are pending until payment is taken and staff activate them.
alter table public.profiles
  drop constraint if exists profiles_membership_status_check;

alter table public.profiles
  add constraint profiles_membership_status_check
  check (membership_status in ('pending', 'active', 'paused', 'cancelled'));

alter table public.profiles
  alter column membership_status set default 'pending';

comment on column public.profiles.membership_status is
  'pending = signed up but not yet paid/activated by staff; active = paying member.';
