# Owl Post accounts

Owl Post opens at `/owl-post.html` and has its own navy/gold login page. First Comet stays available without an account. Its saved name, teacher selection, coding projects, and learning progress do not authenticate anyone to Owl Post.

The user selected the existing Supabase `healthcare_central` project after creation of a dedicated free project was rejected by the account's two-project quota. The apps share an authentication directory, including credentials and email recovery, but Owl Post uses a dedicated tab-scoped session key and its own profiles. No Healthcare Central rows were migrated or deleted.

## Implemented

- BRACU email/password login, student registration, email-confirmation handling, password-reset requests, password-update screen, and logout.
- Authenticated identity is checked using `auth.getUser()`. Coordinator access comes only from administrator-controlled `app_metadata.owl_post_role = "coordinator"`; signup metadata, the old role toggle, First Comet preferences, and cached workspace roles cannot assign it.
- `public.owl_post_profiles` stores the user's name, self-reported student ID and department. Its primary key references the auth user. RLS allows users to read/update only their own row; anonymous access is denied. Inserts/updates require a BRACU email claim.
- The existing auth signup hook routes signups marked `signup_app: "owl-post"` to the Owl Post profile table, so these signups do not become healthcare patient profiles. The existing Healthcare Central signup branch is preserved.
- Workspace previews are scoped by the verified auth user ID in sessionStorage and removed on logout. Old `fc-owl-post-v1/v2` browser data is preserved but is not imported as an authenticated workspace.
- Only the short-lived, namespaced PKCE verifier uses localStorage so an email link can open in another tab. Session credentials remain tab-scoped; logout clears both.
- The Supabase browser SDK is vendored at exactly `2.118.0`; `public/assets/vendor/vendor-lock.json` records the package integrity and file hashes. Only a publishable key appears in browser configuration.

## Email return URLs and delivery

Supabase email/password signup and email confirmations are enabled in the selected project. The following return URLs must be included in **Authentication → URL Configuration → Redirect URLs**, preserving existing Healthcare Central entries and its Site URL:

```text
https://firstcomet.awerminds.tech/owl-post.html
https://firstcomet.awerminds.tech/owl-post.html?flow=recovery
```

For the workers.dev alias, add its matching `/owl-post.html` and `?flow=recovery` URLs if it is used as an email-return destination. Public configuration deliberately uses the canonical First Comet domain for email returns.

This change cannot inspect or edit the project's URL allowlist or SMTP settings through the connected database tools. Actual email delivery, a live signup confirmation link, and a live recovery email remain to be checked with a real account. Supabase's default mail service can restrict delivery and has rate limits; use an appropriately configured mail sender for public registration. Do not disable email confirmations as a workaround.

## Verification

- `tests/owl_auth_browser.cjs` runs the real browser SDK against an HTTP auth fixture. It covers registration validation, confirmation gating, incorrect passwords, unconfirmed emails, password-reset requests and password updates, session reload, logout, account isolation, forged cached roles, user-editable role metadata, coordinator assignment, and a closed gate when backend configuration is unavailable.
- Eight screenshots cover 1440/768/390/320px in light and dark mode. They were inspected. These are fixture-backed UI checks, not evidence that real email has been delivered.
- The live auth service rejected a random nonexistent account with `invalid_credentials`; the live profile API denied an anonymous read. No real user's credentials were used.
- A transactional test against the real database verified separate Owl Post signup profiles, retained Healthcare Central signup behavior, own-row access, denied cross-user writes, denied ownership transfer and denied anonymous reads. All synthetic test users and data were rolled back.
- Security advisors reported no Owl Post table or signup-hook findings. Existing notices remain for unrelated functions/limit tables and the project-wide disabled leaked-password check. See [function permission guidance](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable), [function search paths](https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable), and [password protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

Run the optional browser suite with an available Playwright/Chromium installation:

```bash
node tests/owl_auth_browser.cjs
```

`FC_CHROMIUM_EXECUTABLE` and `FC_CHROMIUM_MODULE` can select an existing Chromium binary/module. `FC_QA_OUTPUT` controls internal screenshot output. `bash scripts/test.sh` runs the existing Python/static course regressions and JavaScript syntax checks.

## Messaging boundary

Authentication is connected to Supabase; course selection, channels, messages, rules, and coordinator tools are still a browser-local preview. Official student-ID/enrollment verification, server-side course memberships, shared messaging, and persisted coordinator controls are separate work. Do not present a recorded ID or selected course as verified university enrollment.
