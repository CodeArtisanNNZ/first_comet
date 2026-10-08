# Deployment boundary

This version is a local development release candidate, not a public service. Use `./scripts/setup.sh` + `./scripts/dev.sh` or PowerShell equivalents. Export `ADMIN_EMAIL`/`ADMIN_PASSWORD` before first startup; no `.env` autoload. A public deployment requires complete CSRF and rate-limiting design, HTTPS, hardened upload parsing, delegated external user identity, persistent backup policy, operational logging review, proper database migrations and browser E2E/accessibility QA.

## Hosted-model staging configuration (not a public release)

The Dockerfile builds the React frontend and serves it from FastAPI at the same origin. In a **private staging environment**, set `AI_PROVIDER=hosted`, `HOSTED_AI_BASE_URL` to your provider's HTTPS OpenAI-compatible `/v1` URL, `HOSTED_AI_MODEL` to a model available on that provider, and `HOSTED_AI_API_KEY` as a secret in the host settings. `SERVE_WEB=1` is baked into the image. Do not commit the key. With this configuration Ollama is not needed. `/api/v1/models` reports the configured model; it does not probe the remote provider, so a successful chat is the actual availability check. External inference providers receive chat text, retrieved document snippets and selected memories; do not upload patient or student data without a privacy review and consent.

Use persistent storage for `/app/data` and back it up: SQLite and uploads vanish if hosted on an ephemeral container. Run one backend instance against SQLite; multi-instance deployments require a database migration. Set `PRODUCTION=1` for Secure cookies and configure the exact `CORS_ORIGIN` if hosting a separate web origin. Prefer the included same-origin frontend to avoid cross-origin cookies. `/health` only reports process liveness.

Do not expose this image publicly until the security blockers above are fixed and reviewed. A model-provider key and an online container alone do not make the application production-safe.

## Hosted First Comet (Cloudflare Worker + visitor statistics)

The hosted site is an account-free static-learning and **browser-local** coding workspace, not the private FastAPI developer backend. The public Worker entry point is `worker/visitor.js`, and `wrangler.jsonc` maps `/api/*` through that Worker while serving `public/` as static assets.

**Deploy from the repository root using the Cloudflare account that owns `first-comet`:**

```bash
npx wrangler login
npx wrangler deploy
```

On the first deploy with this configuration, Wrangler provisions a SQLite-backed Durable Object via the `visitor-counter-v1` migration. The site calls `POST /api/visitors` at page load and displays both page opens and estimated unique browsers. `GET /api/visitors` reads the current values without incrementing. Counts start at deployment time; earlier views **cannot** be reconstructed. 'Unique browsers' means persistent first-party-cookie identifiers and must not be described as authenticated people or guaranteed distinct humans. A user clearing cookies or switching devices may be counted again.

The displayed count is **not active** until a successful Cloudflare deployment. If the API cannot be reached, the UI shows "Visitor stats unavailable" instead of inventing a number. The old static-only Wrangler configuration will not serve the API.

### What the hosted code workspace does

- Creates real HTML/CSS/JavaScript starter files in **that browser's localStorage**.
- Supports editing individual text files, auto-saving, and trying the page in a sandboxed `srcdoc` iframe.
- Imports small web project text files from a chosen device folder as an editable local copy; it does **not** modify the source folder.
- Exports the current local project as a standards-compatible uncompressed ZIP for extraction, GitHub commits, and hosting.
- Keeps beginner learning paths, explanatory popovers, and step-by-step milestones.

### Limits to explain accurately

- Browser storage is device/browser-specific and can be cleared; exporting a ZIP is the durable backup.
- The hosted site cannot push directly to GitHub, write arbitrary device folders, or run Python/Java/PHP backends without a corresponding connected, authorized server.
- The preview is for simple HTML/CSS/JS websites. Relative links to imported nested assets and backend API calls may not be available in the sandbox.
- Visitor counters are aggregate and not authenticated per-user analytics. Cookie-clearing, blocking, bots and reloads affect interpretation.
- The private local FastAPI service is **not** deployed by Wrangler; do not expose it publicly without separate security review.

After deployment, verify `/api/visitors` returns JSON, the page displays a non-placeholder count, project edits survive a reload in the same browser, and a ZIP opens in an archive tool.

