-- PostgREST exposes anything executable in the public schema at
-- /rest/v1/rpc/<name>. These two are trigger functions, not API endpoints, and
-- handle_new_user() is SECURITY DEFINER — so take EXECUTE away from the client
-- roles. The triggers still fire normally; they run as the table owner.
--
-- Flagged by the Supabase security advisor as
-- anon_security_definer_function_executable.

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.touch_updated_at() from public, anon, authenticated;
