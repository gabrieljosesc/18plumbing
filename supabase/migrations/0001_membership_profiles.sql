-- Member profiles. One row per auth user, created automatically on signup.

create sequence if not exists public.member_number_seq start 1001;

create table if not exists public.profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  full_name         text,
  phone             text,
  address           text,

  -- Human-friendly id the member quotes on the phone, e.g. 18P-1001.
  member_number     text not null unique
                    default '18P-' || nextval('public.member_number_seq'),
  member_since      date not null default current_date,
  membership_status text not null default 'active'
                    check (membership_status in ('active', 'paused', 'cancelled'))
);

comment on table public.profiles is
  'Membership record for each signed-up customer of 18 Plumbing.';

alter table public.profiles enable row level security;

-- A member can read and update only their own row. No insert policy: rows are
-- created by the signup trigger below, which runs as definer.
create policy "Members read their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Members update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Create the profile as soon as the account exists, carrying across whatever
-- the signup form collected in raw_user_meta_data.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, phone, address)
  values (
    new.id,
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'phone'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'address'), '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Keep updated_at honest.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();
