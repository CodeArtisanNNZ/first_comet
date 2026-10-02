'use strict';
// Optional browser QA: use a provided Playwright installation and Chromium binary.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { spawn } = require('node:child_process');
const playwright = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ? path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, 'playwright') : 'playwright');
const root = path.resolve(__dirname, '..');
const source = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'public/course-data.js'), 'utf8'), source);
const data = source.window.FC_COURSE;
const outputDir = process.env.FC_QA_OUTPUT || path.join(require('node:os').tmpdir(), 'first-comet-course-qa');
fs.mkdirSync(outputDir, { recursive: true });
const port = 8765;
const base = `http://127.0.0.1:${port}`;
const server = spawn('python', ['-m', 'http.server', String(port), '--bind', '127.0.0.1', '--directory', path.join(root, 'public')], { stdio: 'ignore' });

(async () => {
  let browser;
  try {
    for (let attempt = 0; attempt < 30; attempt++) {
      try { if ((await fetch(base)).ok) break; } catch { /* server starting */ }
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
    await context.addInitScript(() => { if (window.top === window) localStorage.setItem('fc-intro-seen', '1'); });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base + '/#learn');
    await page.locator('#courseTrackTitle').waitFor();
    await page.screenshot({ path: path.join(outputDir, 'course-start-desktop.png') });
    for (const track of data.languages) {
      await page.locator(`[data-course-language="${track.id}"]`).click();
      assert.equal(await page.locator('.course-word').count(), track.terms.length);
      await page.locator('.course-word summary').first().click();
      assert.equal(await page.locator('.course-word').first().locator('code').textContent(), track.terms[0].example);
      await page.locator('[data-start-track]').click();
      assert.equal(await page.locator('.course-milestone-nav button:disabled').count(), 7);
      for (let index = 0; index < track.milestones.length; index++) {
        const item = track.milestones[index];
        if (index > 0) await page.locator('[data-next-milestone]').click();
        assert.equal(await page.locator('#milestoneTitle').textContent(), item.title);
        if (index === 0) {
          await page.locator(`input[name="answer"][value="${(item.answer + 1) % 3}"]`).check();
          await page.locator('input[name="practiced"]').check();
          await page.locator('.course-check button[type="submit"]').click();
          assert.ok((await page.locator('.course-check-feedback').textContent()).startsWith('Try again.'));
          assert.equal(await page.locator('#trackProgress').getAttribute('value'), '0');
          await page.locator('input[name="practiced"]').uncheck();
          await page.locator(`input[name="answer"][value="${item.answer}"]`).check();
          assert.equal(await page.locator('.course-check').evaluate((form) => form.checkValidity()), false);
        }
        await page.locator(`input[name="answer"][value="${item.answer}"]`).check();
        await page.locator('input[name="practiced"]').check();
        await page.locator('.course-check button[type="submit"]').click();
        assert.equal(await page.locator('#trackProgress').getAttribute('value'), String(index + 1));
        assert.ok((await page.locator('.course-check-feedback').textContent()).startsWith('Correct.'));
      }
      console.log(`${track.label}: dictionary, practice confirmation, retry, and all eight progression checks passed.`);
    }
    await page.reload();
    assert.equal(await page.locator('#trackProgress').getAttribute('value'), '8');
    await page.locator('[data-course-tab="dictionary"]').click();
    await page.locator('#courseSearchScope').selectOption('all');
    await page.locator('#courseSearch').fill('Binary search');
    assert.equal(await page.locator('.course-word h3').filter({ hasText: /^Binary search$/ }).count(), 4);
    await page.locator('#courseSearch').fill('<img src=x onerror=alert(1)>');
    assert.equal(await page.locator('.course-word').count(), 0);
    assert.ok((await page.locator('.course-empty').textContent()).includes('No matching word'));
    await page.locator('[data-course-tab="compare"]').click();
    assert.equal(await page.locator('.course-compare-table tbody tr').count(), 12);
    await page.locator('#compareGroup').selectOption('Collections');
    assert.equal(await page.locator('.course-compare-table tbody tr').count(), 10);
    await page.locator('[data-course-tab="algorithms"]').click();
    for (let index = 0; index < data.algorithms.steps.length; index++) {
      if (index > 0) await page.locator('[data-next-milestone]').click();
      await page.locator(`input[name="answer"][value="${data.algorithms.steps[index].answer}"]`).check();
      await page.locator('input[name="practiced"]').check();
      await page.locator('.course-check button[type="submit"]').click();
      assert.ok((await page.locator('.course-check-feedback').textContent()).startsWith('Correct.'));
    }
    for (const [target, result] of [['23', 'index 5'], ['3', 'index 0'], ['27', 'index 6'], ['17', 'return -1']]) {
      await page.locator('#traceTarget').selectOption(target);
      while (await page.locator('[data-trace-next]').isEnabled()) await page.locator('[data-trace-next]').click();
      assert.ok((await page.locator('.course-trace-description').textContent()).includes(result));
    }
    for (const id of ['javascript', 'java', 'python', 'php']) {
      await page.locator(`[data-algorithm-code="${id}"]`).click();
      assert.equal(await page.locator('#algorithmCode code').textContent(), data.algorithms.code[id]);
    }
    await page.locator('.learn-sections [data-learn-section="localhost"]').click();
    assert.equal(await page.locator('#learn-localhost').isVisible(), true);
    assert.equal(await page.locator('#learn-course').isVisible(), false);
    await page.locator('.nav-item[data-view="home"]').click();
    await page.locator('[data-topic-jump="github"]').click();
    assert.equal(await page.locator('#learn-reference').isVisible(), true);
    assert.ok((await page.locator('#topicGrid').textContent()).includes('git add'));
    await page.locator('.learn-sections [data-learn-section="course"]').click();
    await page.locator('[data-course-language="java"]').click();
    await page.locator('#courseSearch').fill('Initialization');
    await page.locator('.course-word h3').filter({ hasText: /^Initialization$/ }).click();
    const viewports = [[320, 720], [360, 800], [390, 844], [520, 900], [768, 1024], [1024, 900], [1280, 900], [1440, 1000]];
    for (const [width, height] of viewports) {
      await page.setViewportSize({ width, height });
      for (const tab of ['dictionary', 'milestones', 'compare', 'algorithms']) {
        await page.locator(`[data-course-tab="${tab}"]`).click();
        const overflow = await page.locator('main').evaluate((main) => main.scrollWidth > main.clientWidth + 1);
        assert.equal(overflow, false, `${width}px ${tab}: workspace must not overflow horizontally`);
      }
      await page.locator('[data-course-tab="dictionary"]').click();
      await page.locator('.course-word summary').first().click();
      await page.locator('#courseSearch').scrollIntoViewIfNeeded();
      assert.equal(await page.locator('#commandBar').isVisible(), false);
      if (width <= 800) {
        const positions = await page.locator('.rail .nav-item').evaluateAll((buttons) => buttons.map((button) => button.getBoundingClientRect().y));
        assert.equal(positions.length, 5);
        assert.ok(positions.every((y) => Math.abs(y - positions[0]) < 1), 'All five mobile destinations fit on one row');
      }
      await page.screenshot({ path: path.join(outputDir, `dictionary-${width}.png`) });
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.locator('[data-course-tab="milestones"]').click();
    await page.screenshot({ path: path.join(outputDir, 'milestone-desktop.png') });
    await page.locator('#themeBtn').click();
    await page.locator('[data-course-tab="dictionary"]').click();
    await page.screenshot({ path: path.join(outputDir, 'dictionary-dark.png') });
    const fresh = await browser.newContext();
    await fresh.addInitScript(() => { if (window.top === window) { localStorage.setItem('fc-intro-seen', '1'); localStorage.setItem('fc-code-course-v1', '{broken'); } });
    const freshPage = await fresh.newPage();
    freshPage.on('pageerror', (error) => errors.push(error.message));
    await freshPage.goto(base + '/#learn/java/milestones/8');
    assert.equal(await freshPage.locator('#milestoneTitle').textContent(), data.languages.find((language) => language.id === 'java').milestones[0].title);
    assert.equal(await freshPage.locator('.course-milestone-nav button:disabled').count(), 7);
    assert.deepEqual(errors, [], 'No uncaught browser errors');
    const exported = await fetch(base + '/first-comet-course.md');
    assert.equal(exported.status, 200);
    assert.ok((await exported.text()).includes('Binary search'));
    console.log('Browser QA passed: all tracks, algorithms, search, comparison, persistence, corrupt storage, deep-link bounds, existing navigation, eight responsive widths, light/dark screenshots, and text export.');
    console.log(`Screenshots: ${outputDir}`);
  } finally { await browser?.close(); server.kill(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
