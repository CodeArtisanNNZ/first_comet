/* Ordered, text-first project courses. Examples are copied, never executed here. */
(() => {
  'use strict';
  const data = window.FC_PROJECT_COURSE;
  const root = document.querySelector('#projectCourseApp');
  if (!data || !root) return;
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const storageKey = 'fc-project-course-v1';
  let saved;
  let storageAvailable = true;
  try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { saved = {}; }
  const completed = {};
  for (const subject of data.subjects) {
    const stored = saved?.completed?.[subject.id];
    completed[subject.id] = Array.isArray(stored) ? subject.lessons.filter((entry) => stored.includes(entry.id)).map((entry) => entry.id) : [];
  }
  const state = { subject: null, tab: 'dictionary', lesson: 0, query: '', scope: 'subject' };
  const current = () => data.subjects.find((subject) => subject.id === state.subject);
  const total = data.subjects.reduce((number, subject) => number + subject.lessons.length, 0);
  const done = () => Object.values(completed).reduce((number, items) => number + items.length, 0);
  const persist = () => {
    try { localStorage.setItem(storageKey, JSON.stringify({ completed })); }
    catch { storageAvailable = false; }
  };
  const codeBlock = (item) => `<div class="course-code"><div><span>${escape(item.label)}</span><button type="button" data-project-copy>Copy text</button></div><pre><code>${escape(item.code)}</code></pre></div>`;
  const sourceLinks = (sources) => `<div class="course-sources"><span>Official references · service details checked ${escape(data.checkedOn)}:</span>${sources.map(([label, href]) => `<a href="${escape(href)}" target="_blank" rel="noopener noreferrer">${escape(label)} ↗</a>`).join('')}</div>`;
  const saveNote = () => `<p class="course-save-note">${storageAvailable ? 'Progress stays in this browser on this device. A correct check and your practice confirmation mark a lesson complete; the course does not run or grade your work.' : 'Progress cannot be saved in this browser. You can continue for this page session.'}</p><a class="course-download" href="first-comet-project-course.md" download>Download the full build guide ↓</a>`;
  const table = (caption, headings, rows) => `<div class="course-table-scroll project-table" tabindex="0" role="region" aria-label="${escape(caption)}"><table><caption>${escape(caption)}</caption><thead><tr>${headings.map((heading) => `<th scope="col">${escape(heading)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell, index) => `<${index ? 'td' : 'th scope="row"'}>${escape(cell)}</${index ? 'td' : 'th'}>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  function route() {
    history.replaceState(null, '', state.subject ? `#learn/project/${state.subject}/${state.tab}${state.tab === 'lessons' ? `/${current().lessons[state.lesson].id}` : ''}` : '#learn/project');
  }

  function openSubject(id, tab = 'dictionary', lessonIndex = 0) {
    if (!data.subjects.some((subject) => subject.id === id)) return;
    state.subject = id; state.tab = tab; state.lesson = lessonIndex; state.query = ''; state.scope = 'subject';
    render(); route();
  }

  function render() {
    if (!state.subject) { renderPath(); return; }
    const subject = current();
    root.innerHTML = `<div class="project-course-toolbar"><button type="button" class="course-text-link" data-project-home>← My build journey</button><div><label for="projectSubject">Jump to a path</label><select id="projectSubject">${data.subjects.map((item) => `<option value="${item.id}" ${item.id === state.subject ? 'selected' : ''}>${String(item.order).padStart(2, '0')} · ${escape(item.label)}</option>`).join('')}</select></div></div>
      <section class="course-track-brief"><div><span class="eyebrow">PATH ${String(subject.order).padStart(2, '0')} · ${subject.optional ? 'WHEN YOUR PROJECT NEEDS IT' : 'CORE PROJECT SKILL'}</span><h2 id="projectSubjectTitle">${escape(subject.label)}, in small steps.</h2><p>${escape(subject.purpose)}</p></div><div class="course-track-progress"><b>${subject.terms.length} words · ${subject.lessons.length} steps</b><label for="projectSubjectProgress">${completed[subject.id].length} of ${subject.lessons.length} done</label><progress id="projectSubjectProgress" max="${subject.lessons.length}" value="${completed[subject.id].length}"></progress><button type="button" class="primary" data-project-begin>${completed[subject.id].length ? 'Continue' : 'Start'} →</button></div></section>
      <nav class="course-tabs" aria-label="Path sections"><button type="button" data-project-tab="dictionary" class="${state.tab === 'dictionary' ? 'active' : ''}" aria-pressed="${state.tab === 'dictionary'}">Words</button><button type="button" data-project-tab="lessons" class="${state.tab === 'lessons' ? 'active' : ''}" aria-pressed="${state.tab === 'lessons'}">Steps</button></nav><div id="projectCourseContent"></div>${saveNote()}`;
    root.querySelector('#projectSubject').addEventListener('change', (event) => openSubject(event.target.value));
    renderContent();
  }

  function renderPath() {
    const steps = [...data.subjects, data.codeStep].sort((left, right) => left.order - right.order);
    root.innerHTML = `<section class="project-path-intro"><div><span class="eyebrow">ONE PROJECT · TEN SUBJECTS · SMALL RESULTS</span><h2 id="projectPathTitle">${escape(data.title)}</h2><p>Build <b>Comet Resources</b>, a small learning-resource website. Follow the numbered subjects or open the topic you need. Start with words, read the lesson, try one task, then check what you understood.</p><p>Student offers, a shared database, and a custom domain are optional. You can finish a first static website without them.</p><button type="button" class="primary" data-project-subject="plan">Start with a project →</button></div><div class="project-path-total"><span aria-hidden="true">☄</span><b>${done()} / ${total}</b><small>steps completed</small><progress max="${total}" value="${done()}" aria-label="Project course progress"></progress><small>Plus the six existing language tracks in subject 03.</small></div></section>
      <ol class="project-subject-grid" aria-label="Subjects in project-building order">${steps.map((subject) => `<li class="project-subject-card"><span class="project-step ${subject.color || 'yellow'}">${String(subject.order).padStart(2, '0')}</span><div><span class="eyebrow">${subject.optional ? 'OPTIONAL · WHEN NEEDED' : subject.order === 3 ? 'EXISTING LANGUAGE COURSES' : 'PROJECT FOUNDATIONS'}</span><h3>${escape(subject.label)}</h3><p>${escape(subject.role)}</p><small>${escape(subject.result)}</small></div>${subject.order === 3 ? '<div class="project-code-links"><a href="#learn/html/dictionary">HTML</a><a href="#learn/css/dictionary">CSS</a><a href="#learn/javascript/dictionary">JavaScript</a><a href="#learn/java/dictionary">Java</a><a href="#learn/python/dictionary">Python</a><a href="#learn/php/dictionary">PHP</a><p>For a website: HTML → CSS → JavaScript. Choose one backend language later if needed.</p></div>' : `<div class="project-subject-footer"><small>${subject.terms.length} words · ${subject.lessons.length} lessons · ${completed[subject.id].length} complete</small><button type="button" class="course-text-link" data-project-subject="${subject.id}">Open subject →</button></div>`}</li>`).join('')}</ol>
      <section class="project-connections"><span class="eyebrow">HOW THE PIECES CONNECT</span><h2>Give each part the right job.</h2><p>The repository supplies code to the host. Your application talks to the database. The domain sends visitors to the host.</p>${table('Project connections', ['From', 'To', 'How it connects'], data.connections)}${table('Choose storage for the requirement', ['Choice', 'Where data lives', 'When it helps', 'What you manage'], data.databaseChoices)}</section>${saveNote()}`;
  }

  function renderContent() {
    if (state.tab === 'dictionary') renderDictionary();
    else renderLesson();
  }

  function renderDictionary() {
    const subject = current();
    root.querySelector('#projectCourseContent').innerHTML = `<div class="course-panel-head"><div><span class="eyebrow">WORDS WHEN YOU NEED THEM</span><h2>Quick meanings for unfamiliar words.</h2><p>Each word has a small example and a plain explanation. Open a word only when you need it.</p></div></div><div class="course-dictionary-tools"><div><label for="projectWordSearch">Search project words</label><input id="projectWordSearch" type="search" placeholder="Try commit, DNS, RLS, or workspace…" autocomplete="off" value="${escape(state.query)}"></div><div><label for="projectWordScope">Search in</label><select id="projectWordScope"><option value="subject" ${state.scope === 'subject' ? 'selected' : ''}>${escape(subject.label)}</option><option value="all" ${state.scope === 'all' ? 'selected' : ''}>All project subjects</option></select></div></div><p class="course-result-count" id="projectWordCount" role="status" aria-live="polite"></p><div class="course-word-grid" id="projectWords"></div>${sourceLinks(subject.sources)}`;
    root.querySelector('#projectWordSearch').addEventListener('input', (event) => { state.query = event.target.value; renderWords(); });
    root.querySelector('#projectWordScope').addEventListener('change', (event) => { state.scope = event.target.value; renderWords(); });
    renderWords();
  }

  function renderWords() {
    const query = state.query.trim().toLowerCase();
    const subjects = state.scope === 'all' ? data.subjects : [current()];
    const matches = subjects.flatMap((subject) => subject.terms.map((entry) => ({ subject, entry }))).filter(({ entry }) => !query || [entry.word, entry.meaning, entry.example, entry.read].join(' ').toLowerCase().includes(query));
    root.querySelector('#projectWordCount').textContent = `${matches.length} ${matches.length === 1 ? 'entry' : 'entries'} · open a word to read its example`;
    root.querySelector('#projectWords').innerHTML = matches.length ? matches.map(({ subject, entry }) => `<details class="course-word"><summary><div><span class="word-track">${escape(subject.label)}</span><h3>${escape(entry.word)}</h3><p>${escape(entry.meaning)}</p></div><span class="word-expand" aria-hidden="true">+</span></summary><div class="word-body">${codeBlock({ label: 'Small example', code: entry.example })}<p><b>Read it as:</b> ${escape(entry.read)}</p>${state.scope === 'all' ? `<button type="button" class="course-text-link" data-project-word-subject="${subject.id}" data-project-word="${escape(entry.word)}">Open this subject’s word library →</button>` : ''}</div></details>`).join('') : '<div class="course-empty"><h3>No matching word.</h3><p>Try a shorter word or search all project subjects.</p></div>';
  }

  function renderLesson() {
    const subject = current();
    const item = subject.lessons[state.lesson];
    const complete = completed[subject.id].includes(item.id);
    const nextSubject = data.subjects[data.subjects.indexOf(subject) + 1];
    root.querySelector('#projectCourseContent').innerHTML = `<div class="course-panel-head"><div><span class="eyebrow">READ → TRY → CHECK</span><h2>${escape(subject.label)} steps</h2><p>Do one step, try it yourself, then check it.</p></div></div><div class="course-milestone-layout"><nav class="course-milestone-nav" aria-label="Path step sequence">${subject.lessons.map((entry, index) => `<button type="button" data-project-lesson="${index}" class="${index === state.lesson ? 'active' : ''}" ${index === state.lesson ? 'aria-current="step"' : ''}><span>${completed[subject.id].includes(entry.id) ? '✓' : String(index + 1).padStart(2, '0')}</span><div><b>${escape(entry.title)}</b><small>${completed[subject.id].includes(entry.id) ? 'Practiced and checked · review anytime' : 'Read, try, then check'}</small></div></button>`).join('')}</nav><article class="course-milestone-body" aria-labelledby="projectLessonTitle"><span class="eyebrow">STEP ${state.lesson + 1} / ${subject.lessons.length}</span><h3 id="projectLessonTitle">${escape(item.title)}</h3><p class="course-goal"><b>Your result:</b> ${escape(item.goal)}</p>${item.explanation.map((paragraph) => `<p>${escape(paragraph)}</p>`).join('')}<div class="course-word-chips"><span>Words to know:</span>${item.words.map((name) => `<button type="button" data-project-define="${escape(name)}">${escape(name)}</button>`).join('')}</div><div class="course-lines"><h4>Follow the small steps</h4><ol>${item.steps.map((step) => `<li>${escape(step)}</li>`).join('')}</ol></div>${item.snippets.map(codeBlock).join('')}<div class="course-output"><h4>What you should see</h4><pre>${escape(item.output)}</pre></div><aside class="course-practice"><h4>Your turn</h4><p>${escape(item.practice)}</p></aside><form class="course-check" id="projectLessonCheck"><fieldset><legend>${escape(item.question)}</legend>${item.options.map((option, index) => `<label><input type="radio" name="answer" value="${index}" required><span>${escape(option)}</span></label>`).join('')}</fieldset>${complete ? '<p class="course-done-tag">✓ This step is complete. You can review it anytime.</p>' : '<label class="course-practice-confirm"><input type="checkbox" name="practiced" required><span>I tried the practice task and checked the result.</span></label>'}<div class="course-check-actions"><button type="submit" class="primary">${complete ? 'Check my answer' : 'Finish this step'}</button><button type="button" class="secondary" data-project-hint>Show a hint</button></div><p class="course-check-feedback" role="status" aria-live="polite"></p></form>${state.lesson + 1 < subject.lessons.length ? '<button type="button" class="course-next" data-project-next>Next step →</button>' : subject.id === 'vscode' ? '<a class="course-next project-next-link" href="#learn/html/dictionary">Next path · build with HTML, CSS, and JavaScript →</a>' : nextSubject ? `<button type="button" class="course-next" data-project-subject="${nextSubject.id}">Next path · ${escape(nextSubject.label)} →</button>` : '<button type="button" class="course-next" data-project-home>Return to my journey →</button>'}</article></div>${sourceLinks(subject.sources)}`;
    root.querySelector('#projectLessonCheck').addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const selected = form.querySelector('[name="answer"]:checked');
      const feedback = form.querySelector('.course-check-feedback');
      if (!selected) { feedback.textContent = 'Choose an answer first.'; return; }
      if (+selected.value !== item.answer) { feedback.textContent = `Try again. ${item.hint}`; feedback.dataset.result = 'retry'; return; }
      if (!complete && !form.querySelector('[name="practiced"]')?.checked) { feedback.textContent = 'Try the task and confirm you checked the result.'; return; }
      if (!complete) completed[subject.id].push(item.id);
      persist(); render();
      const result = root.querySelector('.course-check-feedback');
      result.textContent = `Correct. ${item.why} ${storageAvailable ? 'Your progress is saved in this browser.' : 'Progress remains for this page session.'}`;
      result.dataset.result = 'correct'; result.setAttribute('tabindex', '-1'); result.focus({ preventScroll: true });
    });
  }

  function showWord(name, subjectId) {
    if (subjectId) state.subject = subjectId;
    state.tab = 'dictionary'; state.scope = 'subject'; state.query = name;
    render(); route();
    const match = [...root.querySelectorAll('.course-word')].find((entry) => entry.querySelector('h3').textContent === name);
    if (match) { match.open = true; match.scrollIntoView({ block: 'nearest', behavior: 'auto' }); }
  }

  root.addEventListener('click', async (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-project-home')) { state.subject = null; render(); route(); }
    else if (button.dataset.projectSubject) openSubject(button.dataset.projectSubject);
    else if (button.dataset.projectTab) { state.tab = button.dataset.projectTab; render(); route(); }
    else if (button.hasAttribute('data-project-begin')) {
      state.tab = 'lessons';
      const first = current().lessons.findIndex((entry) => !completed[state.subject].includes(entry.id));
      state.lesson = first < 0 ? 0 : first; render(); route();
    } else if (button.dataset.projectLesson !== undefined) { state.lesson = +button.dataset.projectLesson; renderContent(); route(); }
    else if (button.hasAttribute('data-project-next')) { state.lesson++; renderContent(); route(); root.querySelector('#projectLessonTitle').scrollIntoView({ block: 'nearest', behavior: 'auto' }); }
    else if (button.dataset.projectDefine) showWord(button.dataset.projectDefine);
    else if (button.dataset.projectWordSubject) showWord(button.dataset.projectWord, button.dataset.projectWordSubject);
    else if (button.hasAttribute('data-project-hint')) button.closest('form').querySelector('.course-check-feedback').textContent = current().lessons[state.lesson].hint;
    else if (button.hasAttribute('data-project-copy')) {
      const code = button.closest('.course-code').querySelector('code');
      try { await navigator.clipboard.writeText(code.textContent); button.textContent = 'Copied'; }
      catch { const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(code); selection.removeAllRanges(); selection.addRange(range); button.textContent = 'Selected · use Ctrl/Cmd+C'; }
    }
  });

  function readRoute() {
    const parts = location.hash.replace(/^#/, '').split('/');
    if (parts[0] !== 'learn' || parts[1] !== 'project') return;
    const subject = data.subjects.find((entry) => entry.id === parts[2]);
    state.subject = subject?.id || null;
    state.tab = parts[3] === 'lessons' ? 'lessons' : 'dictionary';
    const index = subject?.lessons.findIndex((entry) => entry.id === parts[4]);
    state.lesson = index >= 0 ? index : 0; state.query = ''; state.scope = 'subject';
    window.FirstCometCourse?.openSection('project', false);
    render();
  }
  window.FirstCometProjectCourse = { open: () => { render(); route(); } };
  window.addEventListener('hashchange', readRoute);
  render(); readRoute();
})();
