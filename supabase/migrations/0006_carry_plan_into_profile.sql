-- Carry the chosen plan across from signup metadata, alongside name/phone/address.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, phone, address, plan, plan_requested_at)
  values (
    new.id,
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'phone'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'address'), ''),
    case when new.raw_user_meta_data ->> 'plan' in ('monthly', 'annual')
         then new.raw_user_meta_data ->> 'plan'
         else null end,
    case when new.raw_user_meta_data ->> 'plan' in ('monthly', 'annual')
         then now()
         else null end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- CREATE OR REPLACE restores default EXECUTE to PUBLIC, so revoke it again.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
