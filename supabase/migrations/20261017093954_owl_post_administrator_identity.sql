-- Platform administrators may use either BRACU email domain. The trusted
-- Owl Post-specific app metadata flag remains mandatory; no user is promoted.
create or replace function owl_post_private.is_admin()
returns boolean language sql stable security definer set search_path = ''
as $$
  select auth.uid() is not null and exists (
    select 1 from auth.users u where u.id = auth.uid()
      and u.email_confirmed_at is not null
      and u.email ~* '^[^@[:space:]]+@(g[.])?bracu[.]ac[.]bd$'
      and u.raw_app_meta_data -> 'owl_post_admin' = 'true'::jsonb
  );
$$;
revoke all on function owl_post_private.is_admin() from public, anon, authenticated;
grant execute on function owl_post_private.is_admin() to authenticated;
