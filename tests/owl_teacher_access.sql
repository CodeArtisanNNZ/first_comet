-- Execute through the project-owner SQL connection. All fixtures roll back.
begin;
do $$
declare
  kind text;
  identifier uuid;
  email_address text;
  metadata jsonb;
  denied boolean := false;
begin
  foreach kind in array array['teacher','other','admin','student','unconfirmed','healthcare'] loop
    identifier := gen_random_uuid();
    perform set_config('owl_test.' || kind,identifier::text,true);
    email_address := 'owl-qa-' || identifier || case when kind in ('student','admin') then '@g.bracu.ac.bd' else '@bracu.ac.bd' end;
    metadata := case when kind = 'healthcare' then jsonb_build_object('full_name','Healthcare compatibility fixture')
      else jsonb_build_object('signup_app','owl-post','owl_post_admin',true,'owl_post_role','coordinator',
        'owl_post_profile',jsonb_build_object('name','Owl fixture ' || kind,'department','CSE',
          'account_type',case when kind in ('teacher','other','unconfirmed') then 'teacher' else 'student' end,
          'student_id',case when kind in ('admin','student') then '24101022' else null end)) end;
    insert into auth.users(id,aud,role,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at)
    values(identifier,'authenticated','authenticated',email_address,
      case when kind = 'unconfirmed' then null else now() end,
      case when kind = 'admin' then '{"owl_post_admin":true}'::jsonb else '{}'::jsonb end,
      metadata,now(),now());
  end loop;
  if not exists(select 1 from public.owl_post_profiles where user_id=current_setting('owl_test.teacher')::uuid and account_type='teacher' and student_id is null) then
    raise exception 'Teacher signup did not create the correct separate profile';
  end if;
  if exists(select 1 from public.profiles where id=current_setting('owl_test.teacher')::uuid) then
    raise exception 'Owl Post signup created a healthcare profile';
  end if;
  if not exists(select 1 from public.profiles where id=current_setting('owl_test.healthcare')::uuid and role='patient') then
    raise exception 'Healthcare signup compatibility failed';
  end if;
  begin
    insert into auth.users(id,email,raw_user_meta_data)
    values(gen_random_uuid(),'owl-qa-' || gen_random_uuid() || '@g.bracu.ac.bd',
      '{"signup_app":"owl-post","owl_post_profile":{"name":"Invalid staff email","account_type":"teacher"}}'::jsonb);
  exception when raise_exception then denied := position('staff BRACU email' in sqlerrm)>0;
  end;
  if not denied then raise exception 'Student email was accepted for teacher registration';end if;
end;
$$;

select set_config('request.jwt.claim.sub',current_setting('owl_test.teacher'),true),
  set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('owl_test.teacher'),'role','authenticated',
    'email','owl-qa-' || current_setting('owl_test.teacher') || '@bracu.ac.bd',
    'app_metadata',jsonb_build_object('owl_post_admin',true))::text,true);
set local role authenticated;
do $$
declare application uuid; changed integer; denied boolean;
begin
  if owl_post_private.is_admin() then raise exception 'Forged JWT/user metadata granted administrator access';end if;
  if not owl_post_private.is_teacher() then raise exception 'Confirmed teacher was not recognized';end if;
  if (select count(*) from public.owl_post_profiles) <> 1 then raise exception 'Teacher profile isolation failed';end if;
  insert into public.owl_post_coordinator_applications(teacher_id,course_code,semester,reason)
  values(auth.uid(),'CSE470','Fall 2026','I teach this course and request coordinator access for this semester.') returning id into application;
  perform set_config('owl_test.application',application::text,true);
  denied := false;
  begin
    insert into public.owl_post_coordinator_applications(teacher_id,course_code,semester,reason)
    values(auth.uid(),'CSE470','Fall 2026','Duplicate application must be rejected by the unique index.');
  exception when unique_violation then denied:=true;end;
  if not denied then raise exception 'Duplicate active application allowed';end if;
  denied := false;
  begin
    insert into public.owl_post_coordinator_applications(teacher_id,course_code,semester,reason,status)
    values(auth.uid(),'CSE110','Fall 2026','A teacher must not be able to grant their own privileges.','approved');
  exception when insufficient_privilege then denied:=true;end;
  if not denied then raise exception 'Teacher could submit an approved application';end if;
  update public.owl_post_coordinator_applications set status='approved' where id=application;
  get diagnostics changed=row_count;
  if changed<>0 then raise exception 'Teacher could approve an application';end if;
  denied := false;
  begin perform public.owl_post_review_application(application,'approved','Forged approval');
  exception when insufficient_privilege then denied:=true;end;
  if not denied then raise exception 'Teacher could use the review RPC';end if;
  denied := false;
  begin update public.owl_post_profiles set account_type='student' where user_id=auth.uid();
  exception when insufficient_privilege then denied:=true;end;
  if not denied then raise exception 'Account type was client-editable';end if;
  denied := false;
  begin
    insert into public.owl_post_coordinator_applications(teacher_id,course_code,semester,reason)
    values(current_setting('owl_test.other')::uuid,'CSE110','Fall 2026','Cross-account application should be rejected by row security.');
  exception when insufficient_privilege then denied:=true;end;
  if not denied then raise exception 'Cross-account application allowed';end if;
end;
$$;
reset role;

select set_config('request.jwt.claim.sub',current_setting('owl_test.student'),true),
  set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('owl_test.student'),'role','authenticated',
    'email','owl-qa-' || current_setting('owl_test.student') || '@g.bracu.ac.bd')::text,true);
set local role authenticated;
do $$
declare denied boolean := false;
begin
  if (select count(*) from public.owl_post_coordinator_applications)<>0 then raise exception 'Student could read teacher applications';end if;
  begin
    insert into public.owl_post_coordinator_applications(teacher_id,course_code,semester,reason)
    values(auth.uid(),'CSE470','Fall 2026','Students must not be able to submit teacher applications.');
  exception when insufficient_privilege then denied:=true;end;
  if not denied then raise exception 'Student application was accepted';end if;
end;
$$;
reset role;

select set_config('request.jwt.claim.sub',current_setting('owl_test.unconfirmed'),true),
  set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('owl_test.unconfirmed'),'role','authenticated')::text,true);
set local role authenticated;
do $$begin
  if owl_post_private.is_teacher() or (select count(*) from public.owl_post_profiles)>0 then
    raise exception 'Unconfirmed account passed the database gate';
  end if;
end;$$;
reset role;

select set_config('request.jwt.claim.sub',current_setting('owl_test.admin'),true),
  set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('owl_test.admin'),'role','authenticated',
    'email','owl-qa-' || current_setting('owl_test.admin') || '@g.bracu.ac.bd')::text,true);
set local role authenticated;
do $$
declare denied boolean := false;
begin
  if not owl_post_private.is_admin() then raise exception 'Trusted BRACU platform administrator was not recognized';end if;
  if (select count(*) from public.owl_post_coordinator_applications)<>1 then raise exception 'Administrator review queue failed';end if;
  perform public.owl_post_review_application(current_setting('owl_test.application')::uuid,'approved','Assignment confirmed for Fall 2026.');
  if not exists(select 1 from public.owl_post_coordinator_applications where id=current_setting('owl_test.application')::uuid and status='approved' and reviewed_by=auth.uid()) then
    raise exception 'Administrator approval was not persisted';
  end if;
  begin perform public.owl_post_review_application(current_setting('owl_test.application')::uuid,'rejected','Cannot change a completed review');
  exception when no_data_found then denied:=true;end;
  if not denied then raise exception 'Completed review could be replayed';end if;
end;
$$;
reset role;

update auth.users set raw_app_meta_data='{}'::jsonb where id=current_setting('owl_test.admin')::uuid;
select set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('owl_test.admin'),'role','authenticated',
  'app_metadata',jsonb_build_object('owl_post_admin',true))::text,true);
set local role authenticated;
do $$begin
  if owl_post_private.is_admin() then raise exception 'Revoked administrator retained access through a stale JWT';end if;
end;$$;
reset role;
set local role anon;
do $$
declare denied boolean:=false;
begin
  begin perform count(*) from public.owl_post_coordinator_applications;
  exception when insufficient_privilege then denied:=true;end;
  if not denied then raise exception 'Anonymous application access was allowed';end if;
end;
$$;
reset role;
rollback;
select 'PASS: teacher signup, student-email rejection, healthcare compatibility, own-row access, denied student/anonymous/cross-user access, immutable account types, duplicate prevention, denied self-promotion, administrator review and stale-claim revocation; all fixtures rolled back' as verification;
