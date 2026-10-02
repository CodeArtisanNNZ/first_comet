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

vm.runInNewContext(fs.readFileSync(path.join(root, 'public/project-course-data.js'), 'utf8'), context);
const project = context.window.FC_PROJECT_COURSE;
const projectLines = ['# First Comet — Build a Project', '', project.title, '', 'Build Comet Resources, a small learning-resource website. Follow the numbered subjects, or open a subject you need. Student offers, databases, and a custom domain are optional for a first static site.', '', `Service details checked ${project.checkedOn}. Read each provider’s current official documentation before applying, claiming an offer, or configuring a service.`, '', 'Lessons are text for practice in your own editor and accounts. The website records browser-local progress after a correct check and your practice confirmation; it does not run or automatically grade your work.', '', '## The project-building order', ''];
const projectSteps = [...project.subjects, project.codeStep].sort((left, right) => left.order - right.order);
for (const subject of projectSteps) projectLines.push(`${subject.order}. ${subject.label} — ${subject.role}${subject.optional ? ' (optional)' : ''}`);
projectLines.push('', '## How the pieces connect', '', '| From | To | How it connects |', '| --- | --- | --- |');
for (const row of project.connections) projectLines.push('| ' + row.map(cell).join(' | ') + ' |');
projectLines.push('', '## Choose storage for the requirement', '', '| Choice | Where data lives | When it helps | What you manage |', '| --- | --- | --- | --- |');
for (const row of project.databaseChoices) projectLines.push('| ' + row.map(cell).join(' | ') + ' |');
projectLines.push('');
for (const subject of projectSteps) {
  projectLines.push(`## ${String(subject.order).padStart(2, '0')} · ${subject.label}`, '', subject.purpose, '', `Your result: ${subject.result}`, '');
  if (subject.order === 3) {
    projectLines.push('Use the separate First Comet Beginner Code Course: HTML → CSS → JavaScript for a website, and one backend language later if needed. It includes Java, Python, and PHP alternatives, dictionaries, milestones, comparison tables, and binary search.', '', '[Open the code course](first-comet-course.md)', '');
    continue;
  }
  projectLines.push('### Word library', '');
  for (const entry of subject.terms) projectLines.push(`#### ${entry.word}`, '', entry.meaning, '', '```text', entry.example, '```', '', `Read it as: ${entry.read}`, '');
  projectLines.push('### Text lessons', '');
  for (const [index, entry] of subject.lessons.entries()) {
    projectLines.push(`#### Lesson ${index + 1}: ${entry.title}`, '', `Your result: ${entry.goal}`, '', ...entry.explanation.flatMap((paragraph) => [paragraph, '']), `Words to know: ${entry.words.join(', ')}`, '', 'Follow the small steps:', '', ...entry.steps.map((step, number) => `${number + 1}. ${step}`), '');
    for (const sample of entry.snippets) projectLines.push(`**${sample.label}**`, '', '```' + sample.language, sample.code, '```', '');
    projectLines.push('What you should see:', '', entry.output, '', `Your turn: ${entry.practice}`, '', `Check: ${entry.question}`, '', ...entry.options.map((option, number) => `${number + 1}. ${option}`), '', `Hint: ${entry.hint}`, '', `Answer: ${entry.answer + 1}. ${entry.why}`, '');
  }
  projectLines.push('Official references:', '', ...subject.sources.map(([label, url]) => `- [${label}](${url})`), '');
}
fs.writeFileSync(path.join(root, 'public/first-comet-project-course.md'), projectLines.join('\n'));
console.log('Exported public/first-comet-project-course.md from the project curriculum.');
