# First Comet

**Take your project from first step to life.**

First Comet is a beginner-first visual workspace for planning, learning, building and publishing software projects.

## Live website

The deployable website lives in `public/`. Cloudflare Workers Static Assets publishes it without running the private FastAPI backend.

- Animated Anime.js launch sequence
- Project launchpad with browser-local persistence
- Visual project studio and Git-style change timeline
- Guided path from idea to frontend, backend, database and hosting
- Pocket references for languages, databases, GitHub and VS Code
- Text-first code course: six language dictionaries, 48 small milestones, comparative syntax tables, and a worked binary-search path
- Ordered project courses: VS Code, Git, GitHub, student benefits, free databases, database connections, publishing, and domains, with 121 word definitions and 42 short lessons
- Beginner, Practising and Pro modes
- Responsive light and dark themes

Live website: [https://first-comet.nusaibanusratzaman.workers.dev/](https://first-comet.nusaibanusratzaman.workers.dev/)

## Deploy to Cloudflare

1. Connect this repository to Cloudflare Workers & Pages.
2. Keep the deploy command as `npx wrangler deploy`.
3. No build command or output-directory setting is required; `wrangler.jsonc` serves `public/`.
4. After the first successful deployment, add `firstcomet.awerminds.tech` under **Custom domains**.

For a local preview, open `public/index.html` in a current browser.

## Beginner code course

Open **Learn → Code course**, or use `/#learn/html/dictionary`. Start with the word library, then complete one milestone at a time. For a website, follow HTML → CSS → JavaScript; choose one backend language only when your project needs it. Java, Python, and PHP are optional paths for different goals.

The same curriculum is available as a downloadable text file. Edit `public/course-data.js` and run `node scripts/export_course.cjs` to keep that export current. Progress is stored only in the current browser; the checks require practice confirmation and do not execute or grade learner code.

Run `node tests/test_course.cjs` for curriculum and JS/Python example checks. `bash scripts/test.sh` runs the existing Python regressions plus the applicable frontend checks. Optional `node tests/course_browser.cjs` requires Playwright and a Chromium binary supplied by the testing environment.

## Project-building courses

Open **Learn → Project path**, or use `/#learn/project`. The ten subjects follow one starter project: create a project → VS Code → the existing language courses → Git → GitHub → student benefits → free databases → connect a database → publish → domains and DNS. Student benefits, databases, and custom domains are optional for a first static website.

Each of the nine new subjects contains a searchable word library and separate text lessons with small steps, labeled examples, expected results, practice, hints, and checks. Lessons can be browsed directly; correct checks plus self-confirmed practice record completion in this browser. The course links to current official guidance, with service and offer details checked on 2 October 2026.

The database lessons cover local SQLite and a deliberately public, read-only Supabase resource list, including grants, RLS, publishable versus secret keys, and error handling. The hosting/domain lessons distinguish repository uploads, static and backend hosting, deployment, DNS, and HTTPS, with separate GitHub Pages and Cloudflare Worker instructions.

Edit `public/project-course-data.js` and run `node scripts/export_course.cjs` to regenerate `public/first-comet-project-course.md`. Run `node tests/test_project_course.cjs` for curriculum and published cloud-example behavior checks. Optional `node tests/project_course_browser.cjs` verifies navigation, practice checks, persistence, and responsive layouts using the same environment-provided browser setup as the code-course runner. No account, database, domain, or student application is created by reading the lessons.

## Desktop foundation

The existing FastAPI/React/SQLite files remain as a separate local desktop foundation. They are not executed by the public static deployment. Do not expose that account-free local API directly to the internet.
