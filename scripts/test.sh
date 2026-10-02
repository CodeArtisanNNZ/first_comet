#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
.venv/bin/python -m pytest tests -q
if [ -f apps/web/package.json ]; then
  (cd apps/web && npm test && npm run typecheck && npm run build)
else
  node tests/test_course.cjs
  node tests/test_project_course.cjs
  for file in public/app.js public/navigation.js public/course-data.js public/course.js public/project-course-data.js public/project-course.js; do
    node --check "$file"
  done
fi
