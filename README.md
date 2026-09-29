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
- Beginner, Practising and Pro modes
- Responsive light and dark themes

Live domain: [firstcomet.awerminds.tech](https://firstcomet.awerminds.tech)

## Deploy to Cloudflare

1. Connect this repository to Cloudflare Workers & Pages.
2. Keep the deploy command as `npx wrangler deploy`.
3. No build command or output-directory setting is required; `wrangler.jsonc` serves `public/`.
4. After the first successful deployment, add `firstcomet.awerminds.tech` under **Custom domains**.

For a local preview, open `public/index.html` in a current browser.

## Desktop foundation

The existing FastAPI/React/SQLite files remain as a separate local desktop foundation. They are not executed by the public static deployment. Do not expose that account-free local API directly to the internet.
