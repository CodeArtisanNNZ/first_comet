'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'public/project-course-data.js'), 'utf8'), context);
const data = context.window.FC_PROJECT_COURSE;
assert.deepEqual(Array.from(data.subjects, (subject) => subject.id), ['plan', 'vscode', 'git', 'github', 'students', 'databases', 'connect', 'publish', 'domains']);
assert.deepEqual([...data.subjects.map((subject) => subject.order), data.codeStep.order].sort((a, b) => a - b), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
for (const subject of data.subjects) {
  const words = Array.from(subject.terms, (entry) => entry.word);
  assert.equal(new Set(words).size, words.length);
  const lessons = Array.from(subject.lessons, (entry) => entry.id);
  assert.equal(new Set(lessons).size, lessons.length);
  for (const entry of subject.terms) for (const field of ['word', 'meaning', 'example', 'read']) assert.ok(entry[field]?.trim(), `${subject.id} glossary: ${field}`);
  for (const entry of subject.lessons) {
    for (const field of ['id', 'title', 'goal', 'output', 'practice', 'question', 'why', 'hint']) assert.ok(entry[field]?.trim(), `${subject.id} ${entry.id}: ${field}`);
    for (const field of ['explanation', 'steps', 'snippets', 'words']) assert.ok(entry[field].length > 0);
    for (const word of entry.words) assert.ok(words.includes(word), `${subject.id}/${entry.id}: missing glossary word ${word}`);
    assert.equal(entry.options.length, 3);
    assert.ok(Number.isInteger(entry.answer) && entry.answer >= 0 && entry.answer < 3);
    for (const sample of entry.snippets) for (const field of ['label', 'language', 'code']) assert.ok(sample[field]?.trim());
  }
  for (const [, url] of subject.sources) assert.ok(url.startsWith('https://'));
}

// Execute the exact published browser example with the same minimal DOM surface
// it uses. Verify normal, empty, HTTP-error and network-error user outcomes, and
// confirm a title containing markup is rendered as text rather than interpreted.
async function runCloud({ rows = [], ok = true, status = 200, networkError = false }) {
  const statusElement = { textContent: '' };
  const list = { children: [], replaceChildren() { this.children = []; }, append(item) { this.children.push(item); } };
  const calls = [];
  const errors = [];
  const sandbox = {
    document: { querySelector: (selector) => selector === '#status' ? statusElement : list, createElement: () => ({ textContent: '' }) },
    console: { error: (error) => errors.push(String(error)) },
    fetch: async (url, options) => {
      calls.push({ url, options });
      if (networkError) throw new Error('Network unavailable');
      return { ok, status, json: async () => rows };
    }
  };
  vm.createContext(sandbox);
  const source = data.examples.cloudJS.replace('https://YOUR_PROJECT_REF.supabase.co', 'https://practice.supabase.co').replace('YOUR_PUBLISHABLE_KEY', 'sb_publishable_practice');
  await vm.runInContext(source, sandbox);
  return { statusElement, list, calls, errors };
}
(async () => {
  const sample = await runCloud({ rows: [{ id: 1, title: 'Learn HTML' }, { id: 2, title: '<img src=x onerror=alert(1)>' }] });
  assert.equal(sample.statusElement.textContent, 'Resources loaded.');
  assert.equal(sample.list.children[1].textContent, '<img src=x onerror=alert(1)>');
  assert.equal(sample.calls[0].url, 'https://practice.supabase.co/rest/v1/resources?select=id,title&order=id.asc');
  assert.equal(sample.calls[0].options.headers.apikey, 'sb_publishable_practice');
  assert.ok(!sample.calls[0].options.headers.Authorization, 'Publishable keys are not JWT bearer tokens');
  assert.equal((await runCloud({})).statusElement.textContent, 'No resources yet.');
  for (const configuration of [{ ok: false, status: 403 }, { networkError: true }]) {
    const failed = await runCloud(configuration);
    assert.equal(failed.statusElement.textContent, 'Could not load resources. Check the connection.');
    assert.equal(failed.errors.length, 1);
  }
  assert.ok(data.examples.cloudSchema.includes('enable row level security'));
  assert.ok(data.examples.cloudSchema.includes('revoke all on table public.resources from anon, authenticated'));
  assert.ok(data.examples.cloudSchema.includes('grant select on table public.resources to anon, authenticated'));
  assert.ok(!/grant\s+(insert|update|delete|all)\b/i.test(data.examples.cloudSchema));
  const html = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
  assert.ok(html.includes('id="projectCourseApp"'));
  assert.ok(html.indexOf('project-course-data.js') < html.indexOf('project-course.js'));
  assert.ok(html.indexOf('src="course.js"') < html.indexOf('src="project-course.js"'));
  const ui = fs.readFileSync(path.join(root, 'public/project-course.js'), 'utf8');
  assert.ok(!/\beval\s*\(|new\s+Function\s*\(/.test(ui));
  const exported = fs.readFileSync(path.join(root, 'public/first-comet-project-course.md'), 'utf8');
  for (const subject of data.subjects) for (const entry of subject.lessons) assert.ok(exported.includes(entry.title));
  console.log(`Project course checks passed: ${data.subjects.length} new subjects, ${data.subjects.reduce((n, subject) => n + subject.terms.length, 0)} dictionary entries, ${data.subjects.reduce((n, subject) => n + subject.lessons.length, 0)} lessons; published cloud code handles data, empty results, HTTP errors, network errors, and text-safe rendering.`);
})().catch((error) => { console.error(error); process.exitCode = 1; });
