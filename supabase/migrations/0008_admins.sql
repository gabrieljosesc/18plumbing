-- Staff access. An admin is any auth user listed in public.admins.
--
-- There is deliberately no insert/update/delete policy on this table: the only
-- way to make someone an admin is the SQL editor. Nothing reachable with the
-- publishable key can grant itself access.

create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  note       text
);

comment on table public.admins is
  'Staff who may read and work every lead, member and booking through /admin.';

alter table public.admins enable row level security;

drop policy if exists "Admins can see their own admin row" on public.admins;
create policy "Admins can see their own admin row"
  on public.admins for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Used inside the policies below. SECURITY DEFINER so the check does not itself
-- go through the caller's RLS on public.admins.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- Every policy wraps the call in a sub-select so Postgres evaluates it once per
-- statement rather than once per row.

-- Leads were insert-only. Staff can now read and work them.
drop policy if exists "Admins read leads" on public.leads;
create policy "Admins read leads"
  on public.leads for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "Admins update leads" on public.leads;
create policy "Admins update leads"
  on public.leads for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Admins read the priority list" on public.priority_list;
create policy "Admins read the priority list"
  on public.priority_list for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "Admins update the priority list" on public.priority_list;
create policy "Admins update the priority list"
  on public.priority_list for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles"
  on public.profiles for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "Admins update any profile" on public.profiles;
create policy "Admins update any profile"
  on public.profiles for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Admins read all inspections" on public.inspection_requests;
create policy "Admins read all inspections"
  on public.inspection_requests for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "Admins update any inspection" on public.inspection_requests;
create policy "Admins update any inspection"
  on public.inspection_requests for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- Lead photos: the bucket was upload-only. Staff can now read them back, which
-- is what createSignedUrl needs. Still no public URLs.
drop policy if exists "Admins read lead photos" on storage.objects;
create policy "Admins read lead photos"
  on storage.objects for select to authenticated
  using (bucket_id = 'lead-photos' and (select public.is_admin()));

-- Grant the owner login. Idempotent: does nothing until that auth user exists
-- (it is created in the Supabase dashboard, never from the app), and re-running
-- it later is safe.
insert into public.admins (user_id, note)
select id, 'Owner login'
from auth.users
where email = 'admin@18plumbing.ca'
on conflict (user_id) do nothing;
