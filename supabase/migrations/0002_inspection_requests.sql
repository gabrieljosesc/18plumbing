-- Free yearly inspection bookings, one of the three membership benefits.

create table if not exists public.inspection_requests (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  member_id      uuid not null references auth.users(id) on delete cascade,

  address        text not null check (char_length(trim(address)) between 5 and 300),
  preferred_date date,
  preferred_time text check (preferred_time in ('morning', 'afternoon', 'evening', 'any')),
  notes          text check (notes is null or char_length(notes) <= 2000),

  status         text not null default 'requested'
                 check (status in ('requested', 'scheduled', 'completed', 'cancelled')),
  scheduled_for  timestamptz
);

comment on table public.inspection_requests is
  'Member requests for their free yearly plumbing inspection.';

create index if not exists inspection_requests_member_idx
  on public.inspection_requests (member_id, created_at desc);

create index if not exists inspection_requests_open_idx
  on public.inspection_requests (created_at desc)
  where status = 'requested';

alter table public.inspection_requests enable row level security;

-- Members may book for themselves and see their own history. Only staff working
-- in the dashboard (or via service role) can change status or scheduled_for.
create policy "Members book their own inspection"
  on public.inspection_requests for insert
  to authenticated
  with check ((select auth.uid()) = member_id);

create policy "Members read their own inspections"
  on public.inspection_requests for select
  to authenticated
  using ((select auth.uid()) = member_id);

create policy "Members cancel their own pending inspection"
  on public.inspection_requests for update
  to authenticated
  using ((select auth.uid()) = member_id and status = 'requested')
  with check ((select auth.uid()) = member_id);
