# Contributing to First Comet

First Comet is beginner-first, so contributions should be easy to understand, review, and undo.

## A simple contribution workflow

1. Create a short branch from `main`.
2. Make one focused change.
3. Preview the relevant page or feature locally.
4. Run the checks that match the files you changed.
5. Commit with a short message that explains the change.
6. Open a pull request and describe what changed and how you tested it.

## Branch names

Use a small descriptive prefix:

- `docs/...` for documentation
- `fix/...` for bug fixes
- `feat/...` for new features
- `chore/...` for maintenance

Example:

```text
docs/improve-git-lesson
```

## Testing

Useful checks in this repository include:

```bash
node tests/test_course.cjs
node tests/test_project_course.cjs
bash scripts/test.sh
```

Some browser tests require Playwright and a Chromium binary. If your environment cannot run them, say so in the pull request.

## Pull request checklist

Before opening a pull request, check that:

- the change has one clear purpose;
- beginner-facing wording is simple and specific;
- links and commands are accurate;
- generated course exports are regenerated from their source data when needed;
- no secrets, private keys, tokens, or credentials are committed;
- the pull request explains what was tested.

Small, understandable pull requests are preferred over large mixed changes.
