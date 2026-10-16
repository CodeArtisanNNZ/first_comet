-- Owl Post shares the selected Supabase auth directory, but keeps its own profiles.
-- Apply as an additive migration. Existing Healthcare Central rows are unchanged.
create table if not exists public.owl_post_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (length(btrim(display_name)) between 1 and 80),
  student_id text not null check (student_id ~ '^[0-9]{8}$'),
  department text not null default 'CSE' check (department = 'CSE'),
  created_at timestamptz not null default now()
);

alter table public.owl_post_profiles enable row level security;
revoke all on public.owl_post_profiles from anon, authenticated;
grant select, insert, update on public.owl_post_profiles to authenticated;

create policy "Owl Post users read their own profile"
  on public.owl_post_profiles for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Owl Post users create their own profile"
  on public.owl_post_profiles for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and coalesce((select auth.jwt()) ->> 'email', '') ~* '@(g\.)?bracu\.ac\.bd$'
  );
create policy "Owl Post users update their own profile"
  on public.owl_post_profiles for update to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id
    and coalesce((select auth.jwt()) ->> 'email', '') ~* '@(g\.)?bracu\.ac\.bd$'
  );

-- This pre-existing auth trigger runs during signup, before auth.uid() is available.
-- Its user ID comes from the trusted auth.users row, never a client-provided role.
-- The signup_app value routes profile creation only; it grants no privilege.
create or replace function public.handle_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  if new.raw_user_meta_data ->> 'signup_app' = 'owl-post' then
    if coalesce(new.email, '') !~* '^[^@[:space:]]+@(g\.)?bracu\.ac\.bd$' then
      raise exception 'Owl Post requires a BRACU email address';
    end if;
    insert into public.owl_post_profiles(user_id, display_name, student_id, department)
    values (
      new.id,
      btrim(left(coalesce(new.raw_user_meta_data -> 'owl_post_profile' ->> 'name', ''), 80)),
      coalesce(new.raw_user_meta_data -> 'owl_post_profile' ->> 'student_id', ''),
      'CSE'
    );
    return new;
  end if;

  -- Preserve Healthcare Central's existing profile-creation behavior.
  insert into public.profiles(id, full_name, email, phone, address, role, status)
  values (
    new.id,
    left(coalesce(new.raw_user_meta_data ->> 'full_name', ''), 300),
    coalesce(new.email, ''),
    nullif(left(coalesce(new.raw_user_meta_data ->> 'phone', ''), 100), ''),
    nullif(left(coalesce(new.raw_user_meta_data ->> 'address', ''), 4000), ''),
    'patient',
    'Active'
  )
  on conflict (id) do update
  set full_name = excluded.full_name,
      email = excluded.email,
      phone = coalesce(excluded.phone, public.profiles.phone),
      address = coalesce(excluded.address, public.profiles.address);
  return new;
end;
$function$;

revoke all on function public.handle_auth_user() from public, anon, authenticated;
