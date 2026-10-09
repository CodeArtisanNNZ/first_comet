# Build state

## CV Studio (2026-10-09)

- Added a dedicated **CV Studio** workspace for students to learn ATS-friendly CV/resume structure and build one inside First Comet.
- Builder includes contact/target role, professional summary, skills, education, experience, projects, and optional certifications.
- CV data autosaves locally in the browser using `fc-cv-studio-v1`.
- Live one-column preview intentionally avoids photos, tables, sidebars, charts, skill bars, decorative icons, and header/footer contact information.
- Added **ATS Readiness** checklist based on common parsing-safe practices. It is explicitly labelled as a First Comet checklist, not an ATS prediction or employer score.
- Added job-description keyword review that compares repeated job terms against the CV and tells users to add terms only when they are genuinely true.
- Added student-focused achievement bullet guidance and measurable-outcome checking.
- Export options: clean A4 **Save as PDF** flow, **Word-compatible .doc**, and a plain-text **parser test** file.
- Users can add/remove repeated education, experience, project, and certification entries.
- Mobile layout collapses to a single-column builder/preview workflow.
- Guidance follows current common ATS advice: simple layout, standard headings, truthful job-specific keywords, and readable text-first formatting.

## Career Explorer (2026-10-09)

- Added a dedicated **Careers** workspace view for CSE students who are unsure which direction to choose.
- Career cards stay compact at first and expand into: what the role actually does, what to learn, good side, hard truth, Bangladesh opportunity, outside/remote opportunity, future direction, and a market signal.
- Included major paths across frontend, backend, full-stack, software engineering, mobile, QA automation, cloud/DevOps/SRE, cybersecurity, data analysis, data engineering, AI/ML/data science, embedded/IoT/robotics, game development, product/business/systems analysis, and research/academia.
- Added interest-based discovery buttons (visual work, logic, data, security, systems, hardware, business, creative work) plus career-family filters.
- Added a market-reality note with source links to BIDA, World Bank, World Economic Forum, and U.S. Bureau of Labor Statistics.
- Copy intentionally avoids salary promises, guaranteed job claims, and hype. It tells learners where paths are competitive, niche, experience-heavy, or vulnerable to automation.
- Responsive layout works as a card grid on larger screens and a single-column list on phones.

## Visual-first Build Journey (2026-10-08)

- Reworked the five-stage Build Journey so closed cards show only the illustration, stage name, one short line, status, and a **Tell me more** control.
- Moved the longer explanation, build outcome, requirements, unlockable title, and Continue/Review action inside each card's expandable details section.
- Added five lightweight First Comet illustrations under `public/assets/journey/`: start, build page, save work/Git, data/database, and launch.
- Reduced the journey hero and current-step copy so the first screen is much less text-heavy.
- Journey cards now use a responsive visual grid: multiple cards on larger screens and one card per row on small phones.
- Existing progress logic, locking rules, routes, and titles were preserved.

## Staged Build Journey (2026-10-08)

- Replaced the learner-facing flat project list with a five-stage Build Journey: **Start Something → Build the Page → Save Your Work → Give It Memory → Put It Online**.
- Each stage has a concrete creation outcome, sequential prerequisites, a single Continue action, and an unlockable First Comet progress title: **Project Starter, Web Page Builder, Git & GitHub Starter, Connected App Builder, Project Launcher**.
- Titles are explicitly progress labels, not professional certificates. The current title and 5-stage progress are shown at the top of the journey.
- Stage 2 uses the existing HTML, CSS and JavaScript paths; direct coding-path routes now work in Beginner mode while the general Practice tab can remain visually hidden.
- Student benefits moved conceptually to Bonus tools rather than a required core stage.
- After the core journey, learners can choose a next direction: Python Builder, Java Builder, or PHP Web Builder. These stay locked until the core journey is complete; their title state also checks the existing language-path progress.
- Existing project data and browser progress keys were preserved. The deeper project UI now uses learner-facing **Path / Step / Words** terminology instead of Subject / Lesson / Course wording.
- Added a repository product principle requiring 15-year-old-readable navigation, progressive disclosure, one clear next action, and real project outcomes at every major stage.

## Beginner calm mode (2026-10-08)

- Reduced the Learn landing copy to one short heading and one-line instruction.
- Beginner mode now surfaces only Start, Watch, Code Lab and Build; Practice and Reference remain available in higher-detail modes.
- The Start page shows only the current localhost milestone. Theory, limitations and later milestones are hidden in Beginner mode instead of appearing as a wall of text.
- Video learning hides the full topic rail in Beginner mode and keeps deeper resource reasoning inside a collapsed “Why this resource?” disclosure.
- Code Lab instructions were shortened and run instructions moved behind a compact disclosure. The start card is only visible on the Start page.
- No curriculum was deleted; the change is presentation/progressive-disclosure only.

## Beginner learning hub: bilingual video + Code Lab (2026-10-08)

- Added a simple four-step learner loop inside Learn: **Start here → Videos → Code Lab → Build with me**, so a first-time learner has an obvious next action instead of a documentation wall.
- Added topic-based free learning resources for HTML/CSS, JavaScript, Python, Java, PHP, Git/GitHub, SQL/database, and backend/API work. Learners can switch between Bangla and English resources and mark a topic practised on this device.
- Added privacy-enhanced, click-to-load YouTube embeds where a stable direct video or playlist is available. External resources remain optional; the existing First Comet text path remains the primary guide.
- Added a real browser Code Lab for HTML/CSS/JavaScript using a sandboxed iframe preview. Python, Java, PHP, and JavaScript fundamentals also have guided starter exercises, hints, expected results, local run instructions, and lightweight structure checks; the site does not pretend to execute runtimes it does not host.
- Added beginner-oriented search metadata and LearningResource structured data describing the free bilingual learning path and topics. This improves machine-readable discoverability but does not guarantee ranking or recommendation by Google or AI assistants.
- Preserved the existing project course, language dictionaries/milestones, localhost path, VS Code guidance, browser-local progress, theme, and responsive First Comet visual system.

## Ordered project text courses (2026-10-02)

- Learn now opens an ordered project path: create a project, VS Code, the existing code tracks, Git, GitHub, student benefits, free databases, database connections, publishing, and domains/DNS.
- Nine new subjects add 121 plain-language glossary entries and 42 lessons. Every lesson has a result, small steps, labeled examples, expected output, practice, and a check with a hint. Learners can browse any lesson; completion records a correct check plus self-confirmed practice, not automatic code grading.
- One Comet Resources starter links the VS Code files, Git history, GitHub remote, optional cloud data, hosting, and custom-domain lessons. Project connections and storage choices have separate comparison tables.
- Added local SQLite instructions and a public read-only Supabase API example with explicit read grants, RLS, publishable-key use, text-safe rendering, and error handling. No live database, student application, host account, or domain is provisioned by this change.
- Verified official guidance for editor/source-control flows, GitHub authentication and Education eligibility, the current first-year .me student offer, Supabase Free/key/API behavior, GitHub Pages, and Cloudflare Worker domains. Course links and checked date make service-dependent details reviewable.
- Preserved upstream VS Code and account-gateway work. Course progress remains browser-local; the new course does not claim account-synced learning progress.
- Added a full downloadable project text course generated from the same curriculum source, plus direct subject/lesson links and validated saved-progress recovery.
- Verification: curriculum/asset checks and the exact published cloud JavaScript example pass for normal data, empty results, network failure, HTTP failure, and markup rendered as text. Existing language examples and binary-search boundary checks pass. Both Chromium course runners pass: all 42 project lessons, all 48 language milestones, saved progress and recovery, navigation, word search, downloads, light/dark, and eight viewport widths (320–1440px). Screenshots inspected. Backend regressions: 18 pytest tests and Ruff F checks pass.
- Limits: no live Supabase database or registrar/student-eligibility flow is exercised; SQL and SQLite examples are inspected rather than executed against a database. Java/PHP runtime and native Windows checks remain as previously documented. Only public static assets are deployed; the private account-free backend remains unexposed.

## Static hosted preview (2026-09-29)

- Added a public, account-free First Comet web experience under `public/`.
- Simplified navigation for beginners with a persistent New Project action, plain-language Home/Build/Learn/Settings labels, active-page state, a Start → Build → Connect → Publish journey bar, a clear return-to-projects control, and readable mobile labels.
- Added `wrangler.jsonc` so the existing `npx wrangler deploy` Cloudflare command publishes static assets instead of attempting to run the local FastAPI service.
- The Anime.js introduction, First Comet logo, project launchpad, visual studio, build guide, learning reference, themes and responsive layout are included.
- Browser projects and preferences use `localStorage`; this static preview does not edit arbitrary local folders or perform authenticated GitHub pushes.
- The older FastAPI/React/SQLite desktop foundation remains private/local and is not exposed by the static deployment.

## Security boundary

Only files inside `public/` are published. The account-free local API, SQLite database, Windows launchers and repository-control backend are not part of the hosted site.


# Build state — 0.7.0 universal developer workspace

## Universal workflow release (2026-09-14)

- Replaced the decorative bottom breadcrumb with a clickable, repository-driven Connect → Edit → Review → Push workflow.
- Connected repositories are verified automatically; saved changes advance the review stage, a Quick Push confirmation advances the push stage, and successful pushes remain visible after a restart.
- New releases are created by `scripts/package_release.py`, which rejects database files and excludes uploads, backups, dependencies, caches and build/test residue.
- Fresh installations contain zero projects. Existing `%LOCALAPPDATA%\AwareMinds` workspaces remain intact during upgrades; **Start Fresh** creates a recoverable timestamped backup before resetting.
- The first project experience is generic and accepts any local Git repository or valid GitHub repository URL. No model or external AI provider is required.
- Verification: 18 backend tests and 2 frontend tests pass; TypeScript, ESLint, Python compilation, the production build, a disposable empty-workspace production smoke test and data-free ZIP validation pass. Ruff is unavailable in this environment. The nine Playwright scenarios remain blocked because the Chromium executable is not installed.

## Visual workbench release (2026-09-14)

- Replaced the active-project dashboard arrangement with a predictable three-zone workbench: vertical tools, central editor/work area and contextual inspector.
- Added a collapsible repository command bar with `Ctrl+K`, plus a permanent Git change timeline and human-readable review-and-push flow.
- Added Beginner, Practicing and Professional workspace depths. Learning material stays behind one **Learn** control rather than competing with project work.
- Added concise project-type workflows, keyboard shortcuts, coding safeguards, language guidance and clearly qualified free hosting/database choices.
- Removed product-specific theme names from new-project creation. Fresh installations start empty; upgrades preserve existing local projects instead of deleting user data.
- Improved Windows startup failures so the popup shows the real exception and exact log path.
- Fixed silent Windows startup under `pythonw.exe` by disabling Uvicorn's console-dependent default formatter and access logger.
- Stopped importing legacy databases from reused extraction folders. Added a confirmed, recoverable **Start Fresh** launcher that moves the current local workspace to a timestamped backup before creating an empty one.

## Browser workspace release (2026-09-14)

- The desktop shortcut starts the local service without a console and opens `/hub` in the default browser. Reopening it detects the running service and does not create a duplicate server.
- Home is a responsive project gallery. Selecting a project opens a full-width editor workspace instead of permanently squeezing a project list beside project details.
- Added compact workspace navigation, responsive project cards and a bottom change path inspired by editing timelines. Desktop, tablet and mobile rules remove the previous fixed-width horizontal clipping.
- Added safe **Open in VS Code** integration using a fixed subprocess argument list. Quick edits stay in Aware Minds; complex work can move to a full IDE.
- Quick Push remains preview-first: it shows changed files and remote divergence, blocks common secrets, and requires final confirmation. Force push remains unavailable.
- The installer offers to install missing Python, Node.js and Git packages through Windows Package Manager. This is not yet a signed standalone Windows installer; systems without `winget` need manual prerequisites.
- Verification: 17 backend tests, 2 frontend tests, Python bytecode compilation, ESLint, TypeScript and the production build pass. Playwright flows are prepared for eight target viewports but remain environment-blocked because Chromium could not be installed.

## Account-free local mode (2026-09-14)

- Removed registration, sign-in and sign-out from the user interface. `/`, `/login`, `/register`, and legacy AI bookmarks now open `/hub` directly.
- The backend creates and uses one stable local workspace owner automatically. When upgrading an account-based database, it opens the existing workspace with the most projects so saved work is not hidden. Projects and settings persist in `%LOCALAPPDATA%\AwareMinds` without cookies or account creation.
- Account endpoints return HTTP 410 for compatibility instead of creating users. Admin pages are unavailable in this single-user build. Application API keys and preview/approval checks remain independent safeguards.
- This mode is deliberately for a trusted local Windows account. It must not be exposed to a LAN or public internet because anyone who can reach the service can control connected repositories and project databases.

## Current Windows local workflow

- `Install Aware Minds.cmd` builds frontend and creates a desktop shortcut; `Start Aware Minds.cmd` starts one FastAPI process serving React and API together at `127.0.0.1:8000`, with Ollama on the local machine. Older two-process dev scripts remain for developers; running both simultaneously conflicts on port 8000.
- On first launch `scripts/prepare_local.py` creates the stable `%LOCALAPPDATA%\AwareMinds` directory but never imports a database from the extracted application. Moving between application versions retains the stable local workspace. **Start Fresh** is the explicit, recoverable reset path.
- User-supplied PNG is reused as the full logo in hero/auth and cropped visually for compact brand markers; PWA cache v2 includes the logo. Windows desktop shortcut points at the packaged icon. UI provides explicit corrections saved as scoped editable memories, **not model-weight self-training**. Local backups use `Backup Aware Minds.cmd` and JSON export remains in Settings.
- Verification: 14 backend tests, 2 frontend tests, TypeScript/production build, ESLint, Ruff F checks, same-origin HTTP and session continuity after restart. Windows desktop shortcut itself and actual Ollama output were not executable in this Linux environment; E2E browser viewport checks remain pending.

## Hosted-model work in progress

The user-supplied teal/purple brain and AWARE MINDS wordmark is now the canonical frontend brand asset at `apps/web/public/aware-minds-logo.png`, including header, workspace, authentication, demo, orb and PWA metadata. The original supplied pixels are retained.

Optional `AI_PROVIDER=hosted` sends non-streaming and streaming chat through a configured HTTPS OpenAI-compatible model endpoint, including app integration requests. `AI_PROVIDER=ollama` remains the default. Dockerfile builds the React frontend and serves it from the same FastAPI origin when `SERVE_WEB=1`; this is **private staging preparation, not a public deployment**. Hosted inference sends selected conversation history, memory and retrieved document snippets to the configured provider. Remote provider is mocked in automated tests; live hosted inference and deployment are not verified. Security blockers listed below remain open.

## Verified now

- Existing FastAPI/React/SQLite/Ollama architecture retained. Repeatable additive v2 schema startup; admin bootstrap requires a unique email and 12+ character password.
- Cookie sessions, authorization boundaries, per-email login throttling, explicit Origin/Fetch cross-site rejection, app-key scopes/revocation, user export without auth secrets, database backup and restore dry-run.
- Browser SSE chat, cancellation UI, separate app/project/memory scopes, file extraction and bounded lexical retrieval. Project/user content and document excerpts are untrusted reference messages, not system instructions. App-facing PHP/JS/Python examples remain server-side.
- 14 backend tests passing on isolated DBs; 2 frontend Vitest tests; Ruff F checks, ESLint, TypeScript and production Vite build passing. Live same-origin API/UI routes and session continuity checked in-process. JS and Python SDK mock contracts passed in the prior release pass. Backup integrity verified. Initial JavaScript bundle reduced from ~603 KB to ~270 KB through Markdown code splitting.
- Playwright tests cover eight target viewports and one mobile navigation flow, but **could not run** because the Chromium download timed out. No screenshots were visually inspected. PHP binary unavailable. Ollama absent; mocked success/error tests passed, live AI response quality unverified.

## Actual behavior and constraints

API version 0.3.0 under `/api/v1`; frontend 0.3.0; SQLite schema v2; Ollama is the local default and a separately configured hosted model adapter exists for private staging. `/health` checks process availability only. An absent model produces 503 without saving an unsent chat. Document source metadata indicates retrieved chunks, not validated answer accuracy. No vector store, embedding model, multimodal input, tool executor, provider fallback or MCP server exists. The current app key is a service-account key owned by one Aware Minds user; no external patient/student identity delegation. A formal database migration framework remains pending.

## Blockers before public release

Install/run Playwright Chromium and inspect/repair eight desktop/tablet/mobile screenshots. Test a live Ollama model, multilingual response quality and real RAG grounding. Harden CSRF, registration/IP throttling, upload parser sandbox/virus screening, delegated identity, public TLS/ops, and formal migrations. Review security/UX after actual browser testing. See `docs/RELEASE_CHECKLIST.md`, `docs/SECURITY.md` and `docs/ROADMAP.md`.

**Status: local release candidate; NOT READY for public production.**

## Beginner project guide (2026-10-01)

- Reworked the static First Comet Build page into a beginner-first flight plan that explains what a software project is before introducing tools.
- Added plain-language coverage of files, frontend, backend, databases, hosting, repositories, commits, pushes, deployment, and domains. Backend and database steps are explicitly optional for a first static website.
- Added four project-type choices and a seven-step expandable roadmap from choosing one useful result through publishing and optional data/domain work.
- Kept the existing interactive mission map and stack picker as optional next steps after the core explanation.
- The guide is responsive down to narrow mobile widths and uses native expandable controls so the learning path remains usable without JavaScript.
# Project Hub pivot (2026-09-13)

- The primary product is now a private project command center, not a personal AI assistant. `/hub` is the default signed-in route and the Windows shortcut opens it directly.
- Added user-isolated, SQLite-backed projects, progress, status, priority, next action, tasks, notes and decisions. Bujhi, Healthcare Central, KAL.RA and Kishan Bari are seeded once per account; users can add and delete their own projects.
- Replaced the public landing experience and primary navigation with the hub. Legacy AI routes remain isolated for architectural compatibility but are hidden from the normal product flow. The hub requires no Ollama or external AI API.
- Account/session persistence continues in `%LOCALAPPDATA%\AwareMinds`; ZIP replacement does not reset existing accounts or project data. Desktop install/start/backup launchers remain the supported Windows flow.
- Backend tests now include project seeding, mutation, persistence behavior and cross-user authorization.

## Unified control workspace (2026-09-13)

- Each project now carries a validated visual theme; selecting it changes the workspace accent while retaining the Aware Minds shell.
- Added expandable project feature catalogs with planned/building/complete states. Known projects receive starter capability lists. `aware-hub.json` safely synchronizes declared features without importing or executing source code.
- Added project-scoped teammate records. No notifications, reports, health score, or universal task manager were introduced.
- Added local Git repository connection, status, and push of existing commits. GitHub credentials are delegated to the user's existing Git configuration and never stored by Aware Minds.
- Added protected SQLite inspection and cell editing for a database inside the configured project directory. Arbitrary paths and raw SQL are rejected.
- Future-project onboarding accepts name, purpose, theme, local folder, repository URL, and website in one form.

## Repository Control (2026-09-13)

- Added a deterministic, preview-first repository command console for text replacement, protected deletion, uploaded-file placement, Git commit and Git push without an AI provider.
- Every write becomes a pending action with a file summary. Apply and Reject are authenticated; previews expire after 30 minutes and fail if a source file changed after preview.
- Paths cannot escape the project root. `.git`, dependency/build folders, `.env`, credentials and secret files are protected. Global replacement is restricted to recognized text files, 2 MB per file and 500 affected files.
- Uploads are limited to 2 MB and require approval. Controls and dashboard typography were normalized for a denser interface.
- External projects have not had their own authentication physically removed because their repositories are not part of this workspace. The hub is the central control login; replacing child-app authentication requires a separately reviewed SSO connector in each child repository, not shared cookies or copied passwords.
- Verification: 15 backend tests and 2 frontend tests pass; TypeScript production build and ESLint pass. Playwright remains environment-blocked because Chromium is not installed.

## Legacy route repair (2026-09-13)

- Removed the obsolete AI document-library entry from hub navigation. Legacy `/library`, `/chat`, `/memory`, `/apps`, `/projects`, `/conversations`, and `/developers` bookmarks now resolve to `/hub` instead of opening disconnected AI screens.
- Advanced the PWA shell cache so installed/local Chrome sessions replace the older cached interface on restart.

## Superseded 0.4 native-window experiment (historical)

- The earlier pywebview shell has been replaced by the 0.5 default-browser launcher because browser sizing, popovers and responsive behavior are more reliable.
- Added a Windows native folder picker and GitHub clone-and-connect workflow. GitHub credentials remain delegated to Git Credential Manager and are never stored by Aware Minds.
- Removed personal project seeding for newly created accounts. Existing saved projects remain in the persistent database; new developers receive a clean first-project onboarding state.
- Added a protected repository file browser and UTF-8 editor for text files up to 2 MB. Saves are hash-checked and require a review confirmation; `.env`, credentials, keys, dependencies, build output and `.git` remain inaccessible.
- Added Quick Push: visible changed files, branch/ahead/behind information, blocked-secret warnings, commit message, final summary, remote fetch/conflict check, commit and push. Force push is not implemented.
- Added persistent light and dark appearance modes. Both retain the purple Aware Minds identity while selected projects retain their configured accent.
- Verification: 16 backend tests, including a real local Git commit/push to a disposable bare remote; 2 frontend component tests; Python bytecode compilation; ESLint; TypeScript; and the production build pass. Playwright's 9 responsive tests remain blocked because its Chromium download timed out. Ruff is not installed in this environment. Native Windows shell and folder dialog cannot be executed in Linux and must be smoke-tested on Windows after installation.

## Beginner code course — 2026-10-02

- Added a text-first course to the existing static `public/` frontend, reachable at `/#learn`. This uses the existing First Comet palette, typography, light/dark themes, and navigation.
- Six tracks: HTML, CSS, JavaScript, Java, Python, PHP. Each begins with a searchable glossary and includes eight sequential milestones with explanations, example code, line-by-line reading, expected output, practice, a hint, and a check. The 309 glossary entries are beginner terms rather than a claim to exhaust every language specification.
- Seventeen comparison tasks across four programming languages; HTML/CSS roles are explained separately instead of inventing nonexistent equivalents. Three additional algorithm milestones explain binary search, its sorted-input requirement, trace bounds, missing targets, complexity, and code in JS/Java/Python/PHP.
- Milestones require a correct check and a learner confirmation that they tried the practice task. This is not automatic code grading or proof of mastery. Progress is browser-local under `fc-code-course-v1`; malformed saved data and locked deep links are handled. Examples are displayed/escaped and copied, never evaluated in the webpage.
- `public/course-data.js` is the curriculum source. `node scripts/export_course.cjs` produces the downloadable `public/first-comet-course.md` from that same source. `public/course.js` and `public/course.css` render the course. Existing localhost and pocket-reference areas remain available, including GitHub topic jumps.
- Verification: all 18 existing pytest tests pass; Python Ruff F checks pass; Node curriculum checks validate term links and quiz data, execute the JS/Python example outputs, and cover binary-search empty, missing, first, last, negative, and duplicate cases.
- Chromium browser QA passes all 48 language and 3 algorithm checks, wrong-answer retries, practice confirmation, dictionary search, comparisons, code switching, progress persistence, corrupt storage, locked deep links, localhost/reference navigation, text export, and eight widths (320, 360, 390, 520, 768, 1024, 1280, 1440). Light/dark and mobile screenshots were inspected. The learning area hides the floating command bar to prevent course content and controls from being covered.
- Current repository has a file named `apps`, no `apps/web` directory, and no frontend `package.json`. Old npm test/build/lint instructions are inapplicable to this static frontend. Both test scripts now run static course/syntax checks when the legacy React project is absent; they retain the original React checks when it is present. No runtime dependency or build step was added to the public site.
- Java and PHP example runtimes are unavailable in this execution environment; those examples received syntax/content review, not executed runtime validation. Native Windows PowerShell execution was not tested. Private backend production blockers in `docs/SECURITY.md` remain; only the existing static frontend is published by Cloudflare.
- Integrated against upstream `109f47f4f02c472125be3ccc8a24000f660ed336`, preserving the new in-page VS Code workspace, Monaco loader, view registration, and styling. Mobile navigation fits all five destinations on one row.
