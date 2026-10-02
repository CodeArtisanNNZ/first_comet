'use strict';
// Optional interaction and layout QA, using environment-provided Playwright/Chromium.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { spawn } = require('node:child_process');
const playwright = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ? path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, 'playwright') : 'playwright');
const root = path.resolve(__dirname, '..');
const source = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'public/project-course-data.js'), 'utf8'), source);
const data = source.window.FC_PROJECT_COURSE;
const outputDir = process.env.FC_QA_OUTPUT || path.join(require('node:os').tmpdir(), 'first-comet-project-course-qa');
fs.mkdirSync(outputDir, { recursive: true });
const port = 8766;
const base = `http://127.0.0.1:${port}`;
const server = spawn('python', ['-m', 'http.server', String(port), '--bind', '127.0.0.1', '--directory', path.join(root, 'public')], { stdio: 'ignore' });

(async () => {
  let browser;
  try {
    for (let attempt = 0; attempt < 30; attempt++) {
      try { if ((await fetch(base)).ok) break; } catch { /* local server starting */ }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    let launchOptions = { headless: true };
    if (process.env.FC_CHROMIUM_MODULE) {
      const imported = require(process.env.FC_CHROMIUM_MODULE);
      const chromium = imported.default || imported;
      launchOptions = { ...launchOptions, executablePath: process.env.FC_CHROMIUM_EXECUTABLE || await chromium.executablePath(), args: chromium.args };
    }
    browser = await playwright.chromium.launch(launchOptions);
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    await context.addInitScript(() => { if (window.top === window) { localStorage.setItem('fc-intro-seen', '1'); localStorage.setItem('fc-local-mode', '1'); } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const capture = async (filename) => {
      // Fragment navigation can schedule the view animation after goto returns.
      await page.waitForTimeout(800);
      await page.waitForFunction(() => getComputedStyle(document.querySelector('#view-learn h1')).opacity === '1');
      await page.screenshot({ path: path.join(outputDir, filename) });
    };
    await page.goto(base + '/#learn');
    await page.locator('#projectPathTitle').waitFor();
    assert.equal(await page.locator('#learn-project').isVisible(), true);
    assert.equal(await page.locator('.project-subject-card').count(), 10);
    assert.deepEqual(await page.locator('.project-step').allTextContents(), ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']);
    await capture('project-path-desktop.png');
    for (const subject of data.subjects) {
      await page.goto(`${base}/#learn/project/${subject.id}/dictionary`);
      await page.locator('#projectWordSearch').waitFor();
      assert.equal(await page.locator('#projectWords .course-word').count(), subject.terms.length);
      await page.locator('#projectWords summary').first().click();
      assert.equal(await page.locator('#projectWords code').first().textContent(), subject.terms[0].example);
      await page.locator('[data-project-begin]').click();
      for (const [index, lesson] of subject.lessons.entries()) {
        if (index > 0) await page.locator('[data-project-next]').click();
        assert.equal(await page.locator('#projectLessonTitle').textContent(), lesson.title);
        assert.equal(await page.locator('#projectCourseContent .course-code').count(), lesson.snippets.length);
        const form = page.locator('#projectLessonCheck');
        if (index === 0) {
          await form.locator(`[name="answer"][value="${(lesson.answer + 1) % 3}"]`).check();
          await form.locator('[name="practiced"]').check();
          await form.locator('[type="submit"]').click();
          assert.ok((await form.locator('.course-check-feedback').textContent()).startsWith('Try again.'));
          assert.equal(await page.locator('#projectSubjectProgress').getAttribute('value'), '0');
          await form.locator('[data-project-hint]').click();
          assert.equal(await form.locator('.course-check-feedback').textContent(), lesson.hint);
          await form.locator('[name="practiced"]').uncheck();
          await form.locator(`[name="answer"][value="${lesson.answer}"]`).check();
          assert.equal(await form.evaluate((element) => element.checkValidity()), false);
        }
        await form.locator(`[name="answer"][value="${lesson.answer}"]`).check();
        await form.locator('[name="practiced"]').check();
        await form.locator('[type="submit"]').click();
        assert.equal(await page.locator('#projectSubjectProgress').getAttribute('value'), String(index + 1));
        assert.ok((await form.locator('.course-check-feedback').textContent()).startsWith('Correct.'));
      }
      await page.reload();
      assert.equal(await page.locator('#projectSubjectProgress').getAttribute('value'), String(subject.lessons.length));
      // Completion is idempotent when reviewing an already-completed check.
      const last = subject.lessons.at(-1);
      await page.locator(`[name="answer"][value="${last.answer}"]`).check();
      await page.locator('#projectLessonCheck [type="submit"]').click();
      assert.equal(await page.locator('#projectSubjectProgress').getAttribute('value'), String(subject.lessons.length));
      console.log(`${subject.label}: glossary, all ${subject.lessons.length} lessons, retries, hints, practice confirmation, and saved progress passed.`);
    }
    await page.goto(base + '/#learn/project/git/dictionary');
    await page.locator('#projectWordScope').selectOption('all');
    await page.locator('#projectWordSearch').fill('CNAME');
    await page.locator('#projectWords .course-word').filter({ has: page.locator('[data-project-word-subject="domains"]') }).first().locator('summary').click();
    await page.locator('[data-project-word-subject="domains"]').first().click();
    assert.ok((await page.locator('#projectSubjectTitle').textContent()).includes('Domains'));
    assert.ok(await page.locator('#projectWords details[open]').count() > 0);
    await page.locator('#projectWordSearch').fill('<img src=x onerror=alert(1)>');
    assert.equal(await page.locator('#projectWords details').count(), 0);
    assert.ok((await page.locator('#projectWords').textContent()).includes('No matching word'));
    await page.locator('#projectSubject').selectOption('connect');
    await page.locator('[data-project-begin]').click();
    await page.locator('[data-project-lesson="2"]').click();
    await page.locator('[data-project-define="Publishable key"]').click();
    assert.equal(await page.locator('#projectWords h3').first().textContent(), 'Publishable key');
    assert.ok(await page.locator('#projectWords details[open]').count() > 0);
    const download = await fetch(base + '/first-comet-project-course.md');
    assert.equal(download.status, 200);
    assert.ok((await download.text()).includes(data.examples.cloudJS));
    const widths = [320, 360, 390, 520, 768, 1024, 1280, 1440];
    for (const width of widths) {
      await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
      for (const route of ['#learn/project', '#learn/project/vscode/dictionary', '#learn/project/connect/lessons/browser-connect', '#learn/project/domains/lessons/pages-domain']) {
        await page.goto(base + '/' + route);
        assert.equal(await page.locator('main').evaluate((element) => element.scrollWidth > element.clientWidth + 1), false, `${width}px: ${route} page overflow`);
        assert.equal(await page.locator('#commandBar').isVisible(), false);
      }
      if (width === 390) {
        await page.goto(base + '/#learn/project');
        await capture('project-path-mobile.png');
        await page.goto(base + '/#learn/project/connect/lessons/browser-connect');
        await capture('connection-lesson-mobile.png');
      }
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(base + '/#learn/project/connect/lessons/browser-connect');
    await capture('connection-lesson-desktop.png');
    await page.locator('#themeBtn').click();
    await page.goto(base + '/#learn/project');
    await capture('project-path-dark.png');
    assert.equal(await page.locator('body').evaluate((element) => element.classList.contains('dark')), true);
    await page.locator('.project-code-links a').filter({ hasText: /^HTML$/ }).click();
    await page.locator('#learn-course').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#learn-course').isVisible(), true);
    assert.equal(await page.locator('#courseTrackTitle').textContent(), 'HTML, in small words.');
    await page.locator('.learn-sections [data-learn-section="project"]').click();
    await page.locator('#projectPathTitle').waitFor();
    assert.ok((await page.locator('.project-path-total b').textContent()).includes('42 / 42'));
    // Malformed and unknown progress must not invent completions or break routing.
    await page.evaluate(() => localStorage.setItem('fc-project-course-v1', '{broken'));
    await page.goto(base + '/#learn/project/domains/lessons/not-a-lesson');
    await page.reload();
    assert.equal(await page.locator('#projectSubjectProgress').getAttribute('value'), '0');
    assert.equal(await page.locator('#projectLessonTitle').textContent(), data.subjects.at(-1).lessons[0].title);
    await page.evaluate(() => localStorage.setItem('fc-project-course-v1', JSON.stringify({ completed: { plan: ['one-result', 'one-result', 'invented'] } })));
    await page.reload();
    await page.goto(base + '/#learn/project/plan/dictionary');
    assert.equal(await page.locator('#projectSubjectProgress').getAttribute('value'), '1');
    await page.goto(base + '/#learn/project/unknown/lessons/999');
    assert.equal(await page.locator('#projectPathTitle').isVisible(), true);
    assert.deepEqual(errors, [], 'No uncaught page errors');
    console.log('Project browser checks passed: 10 ordered subjects, 42 lessons, search/word links, language handoff, deep links, downloads, progress recovery, light/dark, and eight viewport widths.');
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
