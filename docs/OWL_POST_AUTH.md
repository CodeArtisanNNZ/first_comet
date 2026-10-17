# Owl Post accounts

Owl Post opens at `/owl-post.html` and has its own navy/gold login page. First Comet stays available without an account. Its saved name, teacher selection, coding projects, and learning progress do not authenticate anyone to Owl Post.

The user selected the existing Supabase `healthcare_central` project after creation of a dedicated free project was rejected by the account's two-project quota. The apps share an authentication directory, including credentials and email recovery, but Owl Post uses a dedicated tab-scoped session key and its own profiles. No Healthcare Central rows were migrated or deleted.

## Implemented

- Student, teacher and coordinator sign-in, student/teacher registration, email-confirmation handling, password-reset requests, password-update screen, and logout. Teachers use `@bracu.ac.bd` and are not asked for a student ID.
- Authenticated identity is checked using `auth.getUser()`. Coordinator access comes from an approved course/semester application or the existing trusted `app_metadata.owl_post_role = "coordinator"` assignment. Signup metadata, the old role toggle, First Comet preferences and cached workspace roles cannot assign it. New approvals restrict the workspace to approved courses and the selected approved semester; local previews are stored separately for each semester.
- `public.owl_post_profiles` stores the user's name, account type, self-reported student ID (students only) and department. Its primary key references the auth user. Account type is immutable through the client API. RLS allows own-profile access and lets Owl Post administrators read teacher profiles for review. Database helpers check current confirmed auth records, including staff email for teachers. Anonymous access is denied.
- `public.owl_post_coordinator_applications` stores course/semester requests and pending/approved/rejected review history. Teachers see their own requests. Duplicate pending/approved requests are blocked; rejected requests can be resubmitted. Only a separately provisioned Owl Post administrator can approve or reject another teacher's pending request, with a recorded reviewer and optional note. Applicants cannot change decisions or approval fields.
- The existing auth signup hook routes signups marked `signup_app: "owl-post"` to the Owl Post profile table, so these signups do not become healthcare patient profiles. The existing Healthcare Central signup branch is preserved.
- Workspace previews are scoped by the verified auth user ID in sessionStorage and removed on logout. Old `fc-owl-post-v1/v2` browser data is preserved but is not imported as an authenticated workspace.
- Only the short-lived, namespaced PKCE verifier uses localStorage so an email link can open in another tab. Session credentials remain tab-scoped; logout clears both.
- The Supabase browser SDK is vendored at exactly `2.118.0`; `public/assets/vendor/vendor-lock.json` records the package integrity and file hashes. Only a publishable key appears in browser configuration.

## Email return URLs and delivery

Supabase email/password signup and email confirmations are enabled in the selected project. The following return URLs must be included in **Authentication → URL Configuration → Redirect URLs**, preserving existing Healthcare Central entries and its Site URL:

```text
https://firstcomet.awerminds.tech/owl-post.html
https://firstcomet.awerminds.tech/owl-post.html?flow=recovery
https://first-comet.nusaibanusratzaman.workers.dev/owl-post.html
https://first-comet.nusaibanusratzaman.workers.dev/owl-post.html?flow=recovery
```

Email returns stay on the same recognized First Comet origin where the request began, so the PKCE verifier remains available. The fallback uses the workers.dev alias. The canonical custom domain and workers.dev alias were both reachable in subsequent live checks.

This change cannot inspect or edit the project's URL allowlist or SMTP settings through the connected database tools. Actual email delivery, a live signup confirmation link, and a live recovery email remain to be checked with a real account. Supabase's default mail service can restrict delivery and has rate limits; use an appropriately configured mail sender for public registration. Do not disable email confirmations as a workaround.

## Verification

- `tests/owl_auth_browser.cjs` runs the real browser SDK against an HTTP auth fixture. It covers student/teacher registration, staff email validation, confirmation gating, incorrect passwords, unconfirmed emails, password-reset requests and password updates, session reload, logout, account isolation, forged privileges, persistent applications, duplicate prevention, administrator approval/rejection, resubmission, course/semester restrictions and a closed gate when backend configuration is unavailable.
- Eight screenshots cover 1440/768/390/320px in light and dark mode. They were inspected. These are fixture-backed UI checks, not evidence that real email has been delivered.
- The live auth service rejected a random nonexistent account with `invalid_credentials`; the live profile API denied an anonymous read. No real user's credentials were used.
- A transactional test against the real database verified separate Owl Post signup profiles, retained Healthcare Central signup behavior, own-row access, denied cross-user writes, denied ownership transfer and denied anonymous reads. All synthetic test users and data were rolled back.
- `tests/owl_teacher_access.sql` adds real database checks for teacher registration without student IDs, staff-domain enforcement, confirmed-email gates, immutable account types, application isolation, duplicate prevention, denied self-promotion, administrator decisions and revocation despite stale JWT claims. Its synthetic users and applications are always rolled back.
- Security advisors reported no Owl Post table or signup-hook findings. Existing notices remain for unrelated functions/limit tables and the project-wide disabled leaked-password check. See [function permission guidance](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable), [function search paths](https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable), and [password protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

Run the optional browser suite with an available Playwright/Chromium installation:

```bash
node tests/owl_auth_browser.cjs
```

`FC_CHROMIUM_EXECUTABLE` and `FC_CHROMIUM_MODULE` can select an existing Chromium binary/module. `FC_QA_OUTPUT` controls internal screenshot output. `bash scripts/test.sh` runs the existing Python/static course regressions and JavaScript syntax checks.

## Messaging boundary

Authentication is connected to Supabase; course selection, channels, messages, rules, and coordinator tools are still a browser-local preview. Official student-ID/enrollment verification, server-side course memberships, shared messaging, and persisted coordinator controls are separate work. Do not present a recorded ID or selected course as verified university enrollment.

## Application reviewers

No administrator was automatically assigned by this change. Applications remain pending until the project owner designates an existing, confirmed BRACU Owl Post account as a reviewer. The admin flag is specific to Owl Post; Healthcare Central administrator roles do not grant access.

The project owner can provision the chosen account through the Auth Admin API or the SQL editor. Replace the email in this example with the explicitly selected reviewer's existing account; do not execute it with a guessed address:

```sql
update auth.users u
set raw_app_meta_data = coalesce(u.raw_app_meta_data,'{}'::jsonb)
  || jsonb_build_object('owl_post_admin',true)
where lower(u.email) = lower('REPLACE_WITH_SELECTED_BRACU_EMAIL')
  and u.email_confirmed_at is not null
  and u.email ~* '^[^@[:space:]]+@(g[.])?bracu[.]ac[.]bd$'
  and exists(select 1 from public.owl_post_profiles p where p.user_id=u.id)
returning u.id,u.email;
```

The reviewer refreshes their account or signs in again, then opens **Applications → Review applications**. Database checks read the current administrator flag rather than trusting a stale JWT or editable user metadata. Self-review is prohibited. Removing the trusted flag revokes access to subsequent database requests immediately.

Teacher eligibility here means a confirmed staff-domain email and a teacher profile; it is not an official employment or university appointment verification. Reviewers must verify the course/semester assignment before approval. The available course list currently covers the existing CSE catalog.

Apply `supabase/owl-post-auth.sql` for the original account setup, followed by the two teacher migrations in timestamp order. They are already applied to the selected project. No existing Healthcare Central user/profile data was migrated or deleted.
