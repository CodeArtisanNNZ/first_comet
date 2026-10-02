# Roadmap

## Current static website — completed

Text-first beginner code course in HTML, CSS, JavaScript, Java, Python, and PHP: 309 glossary entries, 48 language milestones, three algorithm milestones, 17 comparison tasks, binary-search traces and code, browser-local progression, downloadable text, and responsive light/dark layouts. Node checks, 18 backend regressions, Ruff F checks, and Chromium browser QA pass. See `docs/BUILD_STATE.md` for scope and runtime limitations.

## Next for the course

Run the Java/PHP examples under their real interpreters; collect beginner feedback about wording and milestone size; add later topics only after the core path is usable. A secure execution environment and account-synced progress are future work, not features of this release.

The following roadmap describes the separate private desktop/backend foundation. Its production-security blockers do not imply that it is exposed by the static website.

## NOW — completed and verified

Local FastAPI/React/SQLite setup, admin bootstrap, sessions, app profiles, scoped server keys, conversation streaming, explicit memories, bounded lexical document retrieval, JS/Python SDK contracts, backup and user export, security/API regression tests. UI build and frontend unit tests pass.

## NEXT — valuable release blockers

Playwright visual QA in eight viewports; upload parser sandbox/antivirus; CSRF token or strict origin deployment policy; registration/IP throttles; delegated per-user identity for external apps; better citations and multilingual retrieval; formal migrations; SDK end-to-end tests; live Ollama evaluation; responsive UI repair based on screenshots.

## LATER — requires real users or stronger hardware

PostgreSQL/pgvector; local multilingual embeddings; GPU hosting/vLLM; better local speech and multimodal documents; team workspaces; evaluation dashboard; mobile/desktop native clients; private deployments.

## RESEARCH — experimental

Distributed inference, secure code execution sandbox, local image generation, fine-tuning and LoRA/QLoRA, federated setups. These are not implemented in this release candidate.
