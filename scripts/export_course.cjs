'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'public/course-data.js'), 'utf8'), context);
const course = context.window.FC_COURSE;
const lines = ['# First Comet — Beginner Code Course', '', 'Understand the words. Then write the code.', '', 'For a website, begin with HTML → CSS → JavaScript. Choose one backend language if the project needs it. Java, Python, and PHP are different options; all six are not required.', '', 'Practice on localhost first. Each milestone has an explanation, example, expected result, practice task, and check. Try the work before moving on. The website saves progress in your current browser.', ''];
const code = (value, language = '') => lines.push('```' + language, value, '```', '');
for (const track of course.languages) {
  lines.push(`## ${track.label} — ${track.role}`, '', track.purpose, '', '### Where to run the code', '', track.run, '', '### Word library', '');
  for (const entry of track.terms) {
    lines.push(`#### ${entry.word}`, '', entry.meaning, '');
    code(entry.example, track.id);
    lines.push(`Read it as: ${entry.read}`, '');
    if (entry.note) lines.push(`Keep in mind: ${entry.note}`, '');
  }
  lines.push('### Milestones', '');
  for (const [index, entry] of track.milestones.entries()) {
    lines.push(`#### Milestone ${index + 1}: ${entry.title}`, '', `Your result: ${entry.goal}`, '', entry.explanation, '', `Words to know: ${entry.words.join(', ')}`, '');
    code(entry.code, track.id);
    lines.push('Read it in small pieces:', '', ...entry.lines.map((line, number) => `${number + 1}. ${line}`), '', 'What you should see:', '');
    code(entry.output, 'text');
    lines.push(`Your turn: ${entry.practice}`, '', `Check: ${entry.question}`, '', ...entry.options.map((option, number) => `${number + 1}. ${option}`), '', `Answer: ${entry.answer + 1}. ${entry.why}`, '');
  }
  lines.push('Official references:', '', ...track.sources.map(([label, url]) => `- [${label}](${url})`), '');
}
lines.push('## Compare languages', '', 'HTML structures content; CSS controls presentation. They have no direct equivalents for general-purpose integer declarations, loops, or binary-search functions. The following programming comparisons assume each snippet is placed in its proper runtime and context.', '');
const cell = (value) => value.replace(/\|/g, '&#124;').replace(/\n/g, '<br>');
for (const group of ['Values', 'Logic', 'Collections']) {
  lines.push(`### ${group}`, '', '| Task | JavaScript | Java | Python | PHP |', '| --- | --- | --- | --- | --- |');
  for (const row of course.comparison.filter((entry) => entry.group === group)) lines.push(`| ${row.task} | ${cell(row.javascript)} | ${cell(row.java)} | ${cell(row.python)} | ${cell(row.php)} |`);
  lines.push('', ...course.comparison.filter((entry) => entry.group === group).map((row) => `- ${row.task}: ${row.note}`), '');
}
lines.push('## Algorithms — Binary search', '', course.algorithms.prerequisite, '', course.algorithms.definition, '', 'Precondition: an ascending, sorted sequence of whole numbers with efficient indexing. Sorting first has a separate cost.', '');
for (const [word, meaning] of course.algorithms.words) lines.push(`- ${word}: ${meaning}`);
lines.push('');
for (const [index, item] of course.algorithms.steps.entries()) lines.push(`### Algorithm milestone ${index + 1}: ${item.title}`, '', item.description, '', `Check: ${item.question}`, '', ...item.options.map((option, number) => `${number + 1}. ${option}`), '', `Answer: ${item.answer + 1}. ${item.why}`, '');
for (const [language, source] of Object.entries(course.algorithms.code)) { lines.push(`### ${course.languages.find((track) => track.id === language).label} example`, ''); code(source, language); }
lines.push('Expected output for target 23: index 5.', '', '### Practice', '', course.algorithms.practice, '', 'Official references:', '', ...course.algorithms.sources.map(([label, url]) => `- [${label}](${url})`), '');
fs.writeFileSync(path.join(root, 'public/first-comet-course.md'), lines.join('\n'));
console.log('Exported public/first-comet-course.md from the same curriculum used by the website.');
