-- The security advisor flags any SECURITY DEFINER function that signed-in users
-- can call (authenticated_security_definer_function_executable).
--
-- is_admin() does not need definer rights. The caller can already read their
-- own row in public.admins under RLS, and that is the only row the check ever
-- looks at. Invoker semantics give the same answer with nothing to flag, and
-- the function still leaks nothing: it can only ever say whether *you* are an
-- admin.
alter function public.is_admin() security invoker;
