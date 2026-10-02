'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'public/course-data.js'), 'utf8'), context);
const course = context.window.FC_COURSE;
const required = ['html', 'css', 'javascript', 'java', 'python', 'php'];
assert.deepEqual(Array.from(course.languages, (language) => language.id), required);
for (const language of course.languages) {
  assert.equal(language.milestones.length, 8, `${language.id}: eight milestones`);
  const words = Array.from(language.terms, (entry) => entry.word);
  assert.equal(new Set(words).size, words.length, `${language.id}: unique dictionary keys`);
  for (const word of language.terms) {
    for (const field of ['word', 'meaning', 'example', 'read']) assert.ok(word[field]?.trim(), `${language.id} ${word.word}: ${field}`);
  }
  for (const milestone of language.milestones) {
    for (const field of ['title', 'goal', 'explanation', 'code', 'output', 'practice', 'question', 'why', 'hint']) assert.ok(milestone[field]?.trim(), `${language.id}: ${field}`);
    assert.equal(milestone.options.length, 3);
    assert.ok(Number.isInteger(milestone.answer) && milestone.answer >= 0 && milestone.answer < 3);
    for (const word of milestone.words) assert.ok(words.includes(word), `${language.id}: missing linked word ${word}`);
  }
}
assert.equal(course.comparison.length, 17);
for (const row of course.comparison) for (const id of required.slice(2)) assert.ok(row[id]?.trim());

// Execute the published JavaScript examples, rather than a second implementation.
const js = course.languages.find((language) => language.id === 'javascript');
for (const milestone of js.milestones.slice(0, 6)) {
  const output = [];
  vm.runInNewContext(milestone.code, { console: { log: (...values) => output.push(values.map(String).join(' ')) } });
  assert.equal(output.join('\n'), milestone.output, `JavaScript output: ${milestone.title}`);
}
const algorithmContext = { console: { log() {} } };
vm.createContext(algorithmContext);
vm.runInContext(course.algorithms.code.javascript, algorithmContext);
const binarySearch = algorithmContext.binarySearch;
for (const [values, target, result] of [
  [[], 5, -1], [[3], 3, 0], [[3], 5, -1],
  [[3, 7, 11, 15, 19, 23, 27], 3, 0],
  [[3, 7, 11, 15, 19, 23, 27], 23, 5],
  [[3, 7, 11, 15, 19, 23, 27], 27, 6],
  [[3, 7, 11, 15, 19, 23, 27], 17, -1],
  [[-9, -2, 0, 4], -2, 1], [[-9, -2, 0, 4], 10, -1]
]) assert.equal(binarySearch(values, target), result, `search ${JSON.stringify(values)} for ${target}`);
const duplicateIndex = binarySearch([1, 1, 1, 3], 1);
assert.ok(duplicateIndex >= 0 && duplicateIndex <= 2);

const python = course.languages.find((language) => language.id === 'python');
for (const milestone of python.milestones) {
  const run = spawnSync('python', ['-c', milestone.code], { encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  assert.equal(run.stdout.trim(), milestone.output, `Python output: ${milestone.title}`);
}
const pythonAlgorithm = spawnSync('python', ['-c', course.algorithms.code.python + '\nassert binary_search([], 5) == -1\nassert binary_search([3], 3) == 0\nassert binary_search([3], 4) == -1\nassert binary_search([3,7,11,15,19,23,27], 3) == 0\nassert binary_search([3,7,11,15,19,23,27], 23) == 5\nassert binary_search([3,7,11,15,19,23,27], 27) == 6\nassert binary_search([3,7,11,15,19,23,27], 17) == -1\nassert binary_search([-9,-2,0,4], -2) == 1\nassert binary_search([1,1,1,3],1) in [0,1,2]'], { encoding: 'utf8' });
assert.equal(pythonAlgorithm.status, 0, pythonAlgorithm.stderr);
assert.equal(pythonAlgorithm.stdout.trim(), '5');

// Asset wiring and execution boundaries matter for the static hosting configuration.
const html = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
for (const asset of ['course.css', 'course-data.js', 'course.js']) {
  assert.ok(html.includes(asset));
  assert.ok(fs.existsSync(path.join(root, 'public', asset)));
}
assert.ok(html.indexOf('app.js') < html.indexOf('course-data.js'));
assert.ok(html.indexOf('course-data.js') < html.indexOf('course.js'));
const ui = fs.readFileSync(path.join(root, 'public/course.js'), 'utf8');
assert.ok(!/\beval\s*\(|new\s+Function\s*\(/.test(ui), 'Learner examples must never be evaluated by the UI');
console.log(`Course checks passed: ${course.languages.reduce((n, language) => n + language.terms.length, 0)} dictionary entries, 48 language milestones, 3 algorithm milestones, 17 comparison tasks; published JS and Python outputs and binary-search boundaries match.`);
