-- Lead form: the "will not phone" path, with optional photos.

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),

  full_name    text not null check (char_length(trim(full_name)) between 2 and 120),
  phone        text not null check (char_length(trim(phone)) between 7 and 40),
  email        text check (email is null or char_length(email) <= 254),
  postal_code  text not null check (char_length(trim(postal_code)) between 3 and 12),
  problem      text not null check (char_length(trim(problem)) between 5 and 4000),

  -- Which service/landing page the lead came from, for ad attribution.
  service      text check (service is null or char_length(service) <= 120),
  source_page  text,
  source_slug  text,

  -- Storage paths in the lead-photos bucket. Never public URLs.
  photo_paths  text[] not null default '{}',

  status       text not null default 'new'
               check (status in ('new', 'contacted', 'quoted', 'booked', 'won', 'lost', 'spam')),
  notes        text
);

comment on table public.leads is
  'Quote requests from the site lead form. Written by the server action only.';

create index if not exists leads_created_idx on public.leads (created_at desc);
create index if not exists leads_open_idx on public.leads (created_at desc) where status = 'new';
create index if not exists leads_source_idx on public.leads (source_slug);

alter table public.leads enable row level security;

create policy "Anyone may submit a lead"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- Private bucket for lead photos. The size and MIME limits are the real
-- defence: uploads happen with the publishable key, so the bucket itself has
-- to bound what can be put in it.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lead-photos', 'lead-photos', false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic']
)
on conflict (id) do update
  set file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types,
      public = excluded.public;

-- Upload only. No select/update/delete policy, so a photo cannot be read back
-- or overwritten by anyone holding the publishable key.
drop policy if exists "Anyone may attach a photo to a lead" on storage.objects;
create policy "Anyone may attach a photo to a lead"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'lead-photos');
