$ErrorActionPreference = 'Stop'
Set-Location (Split-Path -Parent $PSScriptRoot)
& .\.venv\Scripts\python.exe -m pytest tests -q
if ($LASTEXITCODE -ne 0) { throw 'Backend tests failed.' }
if (Test-Path apps/web/package.json) {
  Push-Location apps/web
  try {
    npm test; if ($LASTEXITCODE -ne 0) { throw 'Frontend tests failed.' }
    npm run typecheck; if ($LASTEXITCODE -ne 0) { throw 'TypeScript failed.' }
    npm run build; if ($LASTEXITCODE -ne 0) { throw 'Frontend build failed.' }
  } finally { Pop-Location }
} else {
  node tests/test_course.cjs; if ($LASTEXITCODE -ne 0) { throw 'Course checks failed.' }
  foreach ($file in @('public/app.js', 'public/navigation.js', 'public/course-data.js', 'public/course.js')) {
    node --check $file; if ($LASTEXITCODE -ne 0) { throw "JavaScript syntax failed: $file" }
  }
}
