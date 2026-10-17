-- Additive Owl Post teacher accounts and reviewed course coordinator requests.
-- Existing users remain students unless already granted a trusted coordinator role.
alter table public.owl_post_profiles
  add column account_type text not null default 'student'
  check (account_type in ('student','teacher'));
alter table public.owl_post_profiles alter column student_id drop not null;
alter table public.owl_post_profiles drop constraint owl_post_profiles_student_id_check;
alter table public.owl_post_profiles add constraint owl_post_profiles_identity_check
  check ((account_type = 'student' and student_id is not null and student_id ~ '^[0-9]{8}$')
    or (account_type = 'teacher' and student_id is null));

create schema if not exists owl_post_private;
revoke all on schema owl_post_private from public, anon, authenticated;
grant usage on schema owl_post_private to authenticated;

-- Canonical auth rows, rather than editable metadata or stale JWT role claims,
-- decide eligibility. Helpers are outside the exposed public API schema.
create function owl_post_private.confirmed_user(staff_only boolean default false)
returns boolean language sql stable security definer set search_path = ''
as $$
  select auth.uid() is not null and exists (
    select 1 from auth.users u where u.id = auth.uid()
      and u.email_confirmed_at is not null
      and case when staff_only
        then u.email ~* '^[^@[:space:]]+@bracu[.]ac[.]bd$'
        else u.email ~* '^[^@[:space:]]+@(g[.])?bracu[.]ac[.]bd$' end
  );
$$;

create function owl_post_private.is_admin()
returns boolean language sql stable security definer set search_path = ''
as $$
  select auth.uid() is not null and exists (
    select 1 from auth.users u where u.id = auth.uid()
      and u.email_confirmed_at is not null
      and u.email ~* '^[^@[:space:]]+@bracu[.]ac[.]bd$'
      and u.raw_app_meta_data -> 'owl_post_admin' = 'true'::jsonb
  );
$$;

create function owl_post_private.is_teacher()
returns boolean language sql stable security definer set search_path = ''
as $$
  select auth.uid() is not null and exists (
    select 1 from public.owl_post_profiles p join auth.users u on u.id = p.user_id
    where p.user_id = auth.uid() and p.account_type = 'teacher'
      and u.email_confirmed_at is not null
      and u.email ~* '^[^@[:space:]]+@bracu[.]ac[.]bd$'
  );
$$;

revoke all on function owl_post_private.confirmed_user(boolean) from public, anon, authenticated;
revoke all on function owl_post_private.is_admin() from public, anon, authenticated;
revoke all on function owl_post_private.is_teacher() from public, anon, authenticated;
grant execute on function owl_post_private.confirmed_user(boolean) to authenticated;
grant execute on function owl_post_private.is_admin() to authenticated;
grant execute on function owl_post_private.is_teacher() to authenticated;

drop policy "Owl Post users read their own profile" on public.owl_post_profiles;
drop policy "Owl Post users create their own profile" on public.owl_post_profiles;
drop policy "Owl Post users update their own profile" on public.owl_post_profiles;
revoke all on public.owl_post_profiles from public, anon, authenticated;
grant select on public.owl_post_profiles to authenticated;
grant insert(user_id,display_name,student_id,department,account_type)
  on public.owl_post_profiles to authenticated;
-- Retain user_id UPDATE for older student upserts; RLS prevents ownership changes.
grant update(user_id,display_name,student_id,department)
  on public.owl_post_profiles to authenticated;

create policy "Owl Post profile visibility" on public.owl_post_profiles
  for select to authenticated using (
    (user_id = (select auth.uid()) and (select owl_post_private.confirmed_user(false)))
    or (account_type = 'teacher' and (select owl_post_private.is_admin()))
  );
create policy "Owl Post profile registration" on public.owl_post_profiles
  for insert to authenticated with check (
    user_id = (select auth.uid()) and (select owl_post_private.confirmed_user(false))
    and (account_type = 'student' or (select owl_post_private.confirmed_user(true)))
  );
create policy "Owl Post own profile edits" on public.owl_post_profiles
  for update to authenticated using (user_id = (select auth.uid()))
  with check (
    user_id = (select auth.uid()) and (select owl_post_private.confirmed_user(false))
    and (account_type = 'student' or (select owl_post_private.confirmed_user(true)))
  );

create table public.owl_post_coordinator_applications (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.owl_post_profiles(user_id) on delete cascade,
  applicant_email text not null default nullif(auth.jwt() ->> 'email',''),
  course_code text not null check (course_code in (
    'CSE110','CSE111','CSE220','CSE221','CSE230','CSE250','CSE251','CSE260',
    'CSE320','CSE321','CSE330','CSE331','CSE340','CSE341','CSE350','CSE360',
    'CSE370','CSE400','CSE420','CSE421','CSE422','CSE423','CSE460','CSE461','CSE470','CSE471'
  )),
  semester text not null check (semester ~ '^(Spring|Summer|Fall) 20[0-9]{2}$'),
  reason text not null check (length(btrim(reason)) between 20 and 1000),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  review_note text not null default '' check (length(review_note) <= 1000),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint owl_post_application_review_state check (
    (status = 'pending' and reviewed_by is null and reviewed_at is null and review_note = '')
    or (status in ('approved','rejected') and reviewed_by is not null and reviewed_at is not null)
  )
);
create unique index owl_post_one_active_course_application
  on public.owl_post_coordinator_applications(teacher_id,course_code,semester)
  where status in ('pending','approved');
create index owl_post_application_teacher_history
  on public.owl_post_coordinator_applications(teacher_id,created_at desc);
create index owl_post_application_review_queue
  on public.owl_post_coordinator_applications(created_at) where status = 'pending';
create index owl_post_application_reviewer
  on public.owl_post_coordinator_applications(reviewed_by) where reviewed_by is not null;

alter table public.owl_post_coordinator_applications enable row level security;
revoke all on public.owl_post_coordinator_applications from public, anon, authenticated;
grant select on public.owl_post_coordinator_applications to authenticated;
grant insert(teacher_id,course_code,semester,reason)
  on public.owl_post_coordinator_applications to authenticated;
grant update(status,review_note,reviewed_by,reviewed_at)
  on public.owl_post_coordinator_applications to authenticated;

create policy "Owl Post application visibility" on public.owl_post_coordinator_applications
  for select to authenticated using (
    (teacher_id = (select auth.uid()) and (select owl_post_private.is_teacher()))
    or (select owl_post_private.is_admin())
  );
create policy "Owl Post teachers apply" on public.owl_post_coordinator_applications
  for insert to authenticated with check (
    teacher_id = (select auth.uid()) and (select owl_post_private.is_teacher())
    and status = 'pending' and reviewed_by is null and reviewed_at is null
    and review_note = ''
  );
create policy "Owl Post administrators review other teachers" on public.owl_post_coordinator_applications
  for update to authenticated
  using (status = 'pending' and teacher_id <> (select auth.uid()) and (select owl_post_private.is_admin()))
  with check (
    status in ('approved','rejected') and teacher_id <> (select auth.uid())
    and reviewed_by = (select auth.uid()) and reviewed_at is not null
    and (select owl_post_private.is_admin())
  );

-- This exposed RPC is an invoker: row and column permissions still apply.
create function public.owl_post_review_application(application_id uuid,decision text,review_note text default '')
returns void language plpgsql security invoker set search_path = ''
as $$
begin
  if auth.uid() is null or not owl_post_private.is_admin() then
    raise exception 'Owl Post administrator access required' using errcode = '42501';
  end if;
  if decision is null or decision not in ('approved','rejected') or length(coalesce(review_note,'')) > 1000 then
    raise exception 'Invalid review decision or note' using errcode = '22023';
  end if;
  update public.owl_post_coordinator_applications a
    set status = decision, review_note = coalesce(owl_post_review_application.review_note,''),
        reviewed_by = auth.uid(), reviewed_at = now()
    where a.id = application_id and a.status = 'pending';
  if not found then
    raise exception 'Application is not pending or cannot be reviewed by this account' using errcode = 'P0002';
  end if;
end;
$$;
revoke all on function public.owl_post_review_application(uuid,text,text) from public, anon, authenticated;
grant execute on function public.owl_post_review_application(uuid,text,text) to authenticated;

-- Signup runs before email confirmation and before auth.uid() exists. It only
-- records an account type, never coordinator/admin privileges.
create or replace function public.handle_auth_user()
returns trigger language plpgsql security definer set search_path = ''
as $function$
declare
  account_kind text;
begin
  if new.raw_user_meta_data ->> 'signup_app' = 'owl-post' then
    if coalesce(new.email,'') !~* '^[^@[:space:]]+@(g[.])?bracu[.]ac[.]bd$' then
      raise exception 'Owl Post requires a BRACU email address';
    end if;
    account_kind := coalesce(new.raw_user_meta_data -> 'owl_post_profile' ->> 'account_type','student');
    if account_kind not in ('student','teacher') then
      raise exception 'Invalid Owl Post account type';
    end if;
    if account_kind = 'teacher' and coalesce(new.email,'') !~* '^[^@[:space:]]+@bracu[.]ac[.]bd$' then
      raise exception 'Owl Post teachers require a staff BRACU email address';
    end if;
    insert into public.owl_post_profiles(user_id,display_name,student_id,department,account_type)
    values (
      new.id,
      btrim(left(coalesce(new.raw_user_meta_data -> 'owl_post_profile' ->> 'name',''),80)),
      case when account_kind = 'teacher' then null
        else coalesce(new.raw_user_meta_data -> 'owl_post_profile' ->> 'student_id','') end,
      'CSE',account_kind
    );
    return new;
  end if;

  -- Preserve the existing Healthcare Central signup behavior verbatim.
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
