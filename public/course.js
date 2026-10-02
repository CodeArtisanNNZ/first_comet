/* Text-first course UI. Learner code is displayed and copied, never executed. */
(() => {
  'use strict';
  const data = window.FC_COURSE;
  const root = document.querySelector('#courseApp');
  if (!data || !root) return;
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const all = (selector, context = document) => [...context.querySelectorAll(selector)];
  const storageKey = 'fc-code-course-v1';
  const tabs = { dictionary: 'Word library', milestones: 'Milestones', compare: 'Compare languages', algorithms: 'Algorithms' };
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch { saved = {}; }
  const progress = {};
  for (const track of data.languages) {
    const value = saved.progress?.[track.id];
    progress[track.id] = Number.isInteger(value) ? Math.max(0, Math.min(value, track.milestones.length)) : 0;
  }
  progress.algorithms = Number.isInteger(saved.progress?.algorithms) ? Math.max(0, Math.min(saved.progress.algorithms, data.algorithms.steps.length)) : 0;
  const state = { language: data.languages.some((l) => l.id === saved.language) ? saved.language : 'html', tab: 'dictionary', query: '', scope: 'track', group: 'Values', milestone: 0, algorithmStep: 0, codeLanguage: 'javascript', target: 23, traceIndex: 0 };
  let storageAvailable = true;
  const current = () => data.languages.find((track) => track.id === state.language);
  const persist = () => {
    try { localStorage.setItem(storageKey, JSON.stringify({ language: state.language, progress })); }
    catch { storageAvailable = false; }
  };
  const codeBlock = (code, label = 'Tiny example') => `<div class="course-code"><div><span>${escape(label)}</span><button type="button" data-copy-code>Copy code</button></div><pre><code>${escape(code)}</code></pre></div>`;
  const sourceLinks = (sources) => `<div class="course-sources"><span>Go deeper in the official reference:</span>${sources.map(([label, href]) => `<a href="${escape(href)}" target="_blank" rel="noopener noreferrer">${escape(label)} ↗</a>`).join('')}</div>`;

  function route() {
    history.replaceState(null, '', `#learn/${state.language}/${state.tab}${state.tab === 'milestones' ? `/${state.milestone + 1}` : ''}`);
  }

  function openSection(section, updateUrl = true) {
    if (!['project', 'course', 'localhost', 'reference'].includes(section)) return;
    const experience = document.body.dataset.level || 'Beginner';
    if (experience === 'Beginner' && (section === 'course' || section === 'reference')) section = 'localhost';
    if (experience === 'Pro' && section === 'localhost') section = 'reference';
    all('.learn-section').forEach((panel) => { panel.hidden = panel.id !== `learn-${section}`; });
    all('[data-learn-section]').forEach((button) => {
      const active = button.dataset.learnSection === section;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('#pageLabel').textContent = section === 'project' ? 'Build with me' : section === 'course' ? 'Practice code' : section === 'localhost' ? 'Start here' : 'Quick reference';
    if (updateUrl) {
      if (section === 'project') {
        if (window.FirstCometProjectCourse) window.FirstCometProjectCourse.open();
        else history.replaceState(null, '', '#learn/project');
      } else if (section === 'course') route();
      else history.replaceState(null, '', `#learn/${section}`);
    }
  }

  function render() {
    const track = current();
    root.innerHTML = `
      <nav class="course-languages" aria-label="Language tracks">
        ${data.languages.map((language) => `<button type="button" data-course-language="${language.id}" class="course-language ${state.language === language.id ? 'active' : ''}" aria-pressed="${state.language === language.id}"><span class="language-badge ${language.color}" aria-hidden="true">${escape(language.badge)}</span><span><b>${language.label}</b><small>${escape(language.role)}</small></span></button>`).join('')}
      </nav>
      <section class="course-track-brief" aria-labelledby="courseTrackTitle">
        <div><span class="eyebrow">${escape(track.start)}</span><h2 id="courseTrackTitle">${track.label}, in small words.</h2><p>${escape(track.purpose)}</p></div>
        <div class="course-track-progress"><b>${track.terms.length} words · ${track.milestones.length} milestones</b><label for="trackProgress">${progress[track.id]} of ${track.milestones.length} complete</label><progress id="trackProgress" max="${track.milestones.length}" value="${progress[track.id]}"></progress><button type="button" class="primary" data-start-track>${progress[track.id] ? 'Continue' : 'Begin'} ${track.label} →</button></div>
      </section>
      <nav class="course-tabs" aria-label="Course sections">${Object.entries(tabs).map(([id, label]) => `<button type="button" data-course-tab="${id}" class="${state.tab === id ? 'active' : ''}" aria-pressed="${state.tab === id}">${label}</button>`).join('')}</nav>
      <div id="courseTabContent"></div>
      <p class="course-save-note" id="courseSaveNote">${storageAvailable ? 'Progress stays in this browser on this device. A check confirms understanding; practice is completed in your local editor.' : 'This browser could not save progress. You can keep learning, but progress will last only for this page session.'}</p><a class="course-download" href="first-comet-course.md" download>Download the complete text course ↓</a>`;
    renderContent();
  }

  function renderContent() {
    const panel = root.querySelector('#courseTabContent');
    if (state.tab === 'dictionary') renderDictionary(panel);
    if (state.tab === 'milestones') renderMilestones(panel);
    if (state.tab === 'compare') renderComparison(panel);
    if (state.tab === 'algorithms') renderAlgorithms(panel);
  }

  function wordCard(word, track, index) {
    return `<details class="course-word" data-word-index="${index}"><summary><div><span class="word-track">${track.label}</span><h3>${escape(word.word)}</h3><p>${escape(word.meaning)}</p></div><span class="word-expand" aria-hidden="true">+</span></summary><div class="word-body">${codeBlock(word.example)}<p><b>Read it as:</b> ${escape(word.read)}</p>${word.note ? `<p class="word-note"><b>Keep in mind:</b> ${escape(word.note)}</p>` : ''}${state.scope === 'all' ? `<button type="button" class="course-text-link" data-word-track="${track.id}" data-word-name="${escape(word.word)}">Open ${track.label}’s word library →</button>` : ''}</div></details>`;
  }

  function renderDictionary(panel) {
    const track = current();
    panel.innerHTML = `<div class="course-panel-head"><div><span class="eyebrow">01 · WORDS BEFORE CODE</span><h2>A dictionary you can actually read.</h2><p>Look up the core words, see a tiny example, and read the code as a sentence. This is a beginner glossary; the official references cover the full language.</p></div></div>
      <div class="course-dictionary-tools"><div><label for="courseSearch">Search a word or an idea</label><input id="courseSearch" type="search" placeholder="Try initialization, float, or binary search…" autocomplete="off" value="${escape(state.query)}"></div><div><label for="courseSearchScope">Search in</label><select id="courseSearchScope"><option value="track" ${state.scope === 'track' ? 'selected' : ''}>${track.label}</option><option value="all" ${state.scope === 'all' ? 'selected' : ''}>All six languages</option></select></div></div>
      <p id="wordResultCount" class="course-result-count" role="status" aria-live="polite"></p><div class="course-word-grid" id="courseWords"></div>${sourceLinks(track.sources)}`;
    const input = panel.querySelector('#courseSearch');
    input.addEventListener('input', () => { state.query = input.value; renderWords(); });
    panel.querySelector('#courseSearchScope').addEventListener('change', (event) => { state.scope = event.target.value; renderWords(); });
    renderWords();
  }

  function renderWords() {
    const track = current();
    const query = state.query.trim().toLowerCase();
    const tracks = state.scope === 'all' ? data.languages : [track];
    const words = tracks.flatMap((language) => language.terms.map((word) => ({ word, track: language }))).filter(({ word }) => !query || [word.word, word.meaning, word.example, word.read, word.note].join(' ').toLowerCase().includes(query));
    root.querySelector('#wordResultCount').textContent = `${words.length} ${words.length === 1 ? 'entry' : 'entries'}${query ? ` matching “${state.query.trim()}”` : ''} · open a word for its example`;
    root.querySelector('#courseWords').innerHTML = words.length ? words.map(({ word, track: language }, index) => wordCard(word, language, index)).join('') : `<div class="course-empty"><h3>No matching word yet.</h3><p>Try a shorter spelling or search all six languages. The complete official references are linked below.</p></div>`;
  }

  function checkForm(item, complete, key) {
    return `<form class="course-check" data-check-key="${key}"><fieldset><legend>${escape(item.question)}</legend>${item.options.map((option, index) => `<label><input type="radio" name="answer" value="${index}" required><span>${escape(option)}</span></label>`).join('')}</fieldset>${complete ? '<p class="course-done-tag">✓ This milestone is complete. You can review the check.</p>' : '<label class="course-practice-confirm"><input type="checkbox" name="practiced" required><span>I tried the practice task and checked the result.</span></label>'}<div class="course-check-actions"><button class="primary" type="submit">${complete ? 'Check my answer' : 'Check & complete milestone'}</button><button type="button" class="secondary" data-show-hint>Show a hint</button></div><p class="course-check-feedback" role="status" aria-live="polite"></p></form>`;
  }

  function renderMilestones(panel) {
    const track = current();
    const unlocked = Math.min(progress[track.id], track.milestones.length - 1);
    state.milestone = Math.min(state.milestone, unlocked);
    const item = track.milestones[state.milestone];
    const complete = state.milestone < progress[track.id];
    panel.innerHTML = `<div class="course-panel-head"><div><span class="eyebrow">02 · ONE SMALL RESULT AT A TIME</span><h2>${track.label} milestones</h2><p>Read, try, then check. Finish the current milestone before the next opens. You can revisit every completed milestone.</p></div></div>
      <details class="course-run-guide"><summary>Where do I put this code? · ${escape(track.file)}</summary><p>${escape(track.run)}</p><button type="button" class="course-text-link" data-learn-section="localhost">Need the localhost setup guide? →</button></details>
      <div class="course-milestone-layout"><nav class="course-milestone-nav" aria-label="${track.label} milestone sequence">${track.milestones.map((entry, index) => `<button type="button" data-course-milestone="${index}" class="${index === state.milestone ? 'active' : ''}" ${index > unlocked ? 'disabled' : ''} ${index === state.milestone ? 'aria-current="step"' : ''}><span>${index < progress[track.id] ? '✓' : String(index + 1).padStart(2, '0')}</span><div><b>${escape(entry.title)}</b><small>${index < progress[track.id] ? 'Complete · review anytime' : index > unlocked ? 'Finish the previous milestone first' : 'Your current milestone'}</small></div></button>`).join('')}</nav>
      <article class="course-milestone-body" aria-labelledby="milestoneTitle"><span class="eyebrow">MILESTONE ${String(state.milestone + 1).padStart(2, '0')} / ${track.milestones.length}</span><h3 id="milestoneTitle">${escape(item.title)}</h3><p class="course-goal"><b>Your result:</b> ${escape(item.goal)}</p><p>${escape(item.explanation)}</p><div class="course-word-chips"><span>Words to know:</span>${item.words.map((word) => `<button type="button" data-define-word="${escape(word)}">${escape(word)}</button>`).join('')}</div>${codeBlock(item.code)}<div class="course-lines"><h4>Read it in small pieces</h4><ol>${item.lines.map((line) => `<li>${escape(line)}</li>`).join('')}</ol></div><div class="course-output"><h4>What you should see</h4><pre>${escape(item.output)}</pre></div><aside class="course-practice"><h4>Your turn</h4><p>${escape(item.practice)}</p></aside>${checkForm(item, complete, 'language')}${complete ? `<button type="button" class="course-next" data-next-milestone>${state.milestone + 1 < track.milestones.length ? 'Open the next milestone →' : 'Track complete · choose your next step →'}</button>` : ''}</article></div>${sourceLinks(track.sources)}`;
    panel.querySelector('form').addEventListener('submit', (event) => submitCheck(event, item, track.id, state.milestone));
  }

  function submitCheck(event, item, key, index) {
    event.preventDefault();
    const form = event.currentTarget;
    const selected = form.querySelector('input[name="answer"]:checked');
    const feedback = form.querySelector('.course-check-feedback');
    if (!selected) { feedback.textContent = 'Choose an answer first.'; return; }
    if (+selected.value !== item.answer) {
      feedback.textContent = `Try again. ${item.hint}`;
      feedback.dataset.result = 'retry';
      return;
    }
    if (progress[key] <= index && !form.querySelector('input[name="practiced"]')?.checked) {
      feedback.textContent = 'Try the practice task, then confirm that you checked the result.';
      return;
    }
    if (progress[key] === index) progress[key] = index + 1;
    persist();
    render();
    const nextFeedback = root.querySelector('.course-check-feedback');
    nextFeedback.textContent = `Correct. ${item.why} ${storageAvailable ? 'Your progress is saved on this device.' : 'Progress is kept for this page session.'}`;
    nextFeedback.dataset.result = 'correct';
    nextFeedback.setAttribute('tabindex', '-1');
    nextFeedback.focus({ preventScroll: true });
    root.querySelector('.course-next')?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
  }

  function renderComparison(panel) {
    const rows = data.comparison.filter((row) => row.group === state.group);
    const languages = ['javascript', 'java', 'python', 'php'];
    panel.innerHTML = `<div class="course-panel-head"><div><span class="eyebrow">03 · SAME INTENT, DIFFERENT SPELLING</span><h2>Compare the idea, not just the symbols.</h2><p>These snippets do the same kind of programming task. They are examples to put in the language’s proper context, not four interchangeable full applications.</p></div></div>
      <div class="course-role-table"><h3>Where do HTML and CSS fit?</h3><div class="course-table-scroll" tabindex="0" role="region" aria-label="Roles of HTML, CSS, and programming languages"><table><thead><tr><th scope="col">Job</th><th scope="col">Example</th><th scope="col">Use</th></tr></thead><tbody><tr><th scope="row">HTML · structure</th><td><code>&lt;p id="message"&gt;Hello&lt;/p&gt;</code></td><td>Put a paragraph in the page.</td></tr><tr><th scope="row">CSS · presentation</th><td><code>#message { color: blue; }</code></td><td>Make that paragraph’s text blue.</td></tr><tr><th scope="row">JavaScript · page behavior</th><td><code>document.querySelector("#message").textContent = "Hi";</code></td><td>Change its text after the page loads.</td></tr><tr><th scope="row">Java / Python / PHP · program logic</th><td><code>Calculate, compare, loop, and return data.</code></td><td>Run in the chosen runtime. They do not automatically style a browser page.</td></tr></tbody></table></div><p>HTML and CSS have no direct equivalents for the ordinary integer declarations, general-purpose loops, or binary-search functions below.</p></div>
      <div class="course-compare-filter"><label for="compareGroup">Choose a group of tasks</label><select id="compareGroup">${['Values', 'Logic', 'Collections'].map((group) => `<option ${state.group === group ? 'selected' : ''}>${group}</option>`).join('')}</select><span>Scroll the table sideways on smaller screens →</span></div>
      <div class="course-table-scroll" tabindex="0" role="region" aria-label="${state.group} comparison across four programming languages"><table class="course-compare-table"><caption>${escape(state.group)} · the same task in JavaScript, Java, Python, and PHP</caption><thead><tr><th scope="col">What you want to do</th>${languages.map((id) => `<th scope="col">${data.languages.find((language) => language.id === id).label}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr><th scope="row">${escape(row.task)}<small>${escape(row.meaning)}</small></th>${languages.map((id) => `<td><pre><code>${escape(row[id])}</code></pre></td>`).join('')}</tr><tr class="course-compare-note"><td colspan="5"><b>Read this carefully:</b> ${escape(row.note)}</td></tr>`).join('')}</tbody></table></div>
      <aside class="course-compare-reminder"><b>Three distinctions that prevent beginner mistakes</b><p><code>=</code> assigns a value. Equality uses <code>==</code> or <code>===</code> depending on the language and intended comparison. Java String content uses <code>equals</code>.</p><p>Java and JavaScript are separate languages. A matching-looking line does not mean their types or runtimes behave the same way.</p><p>Terminal commands, source code, and HTML output belong in different places. Open Milestones → “Where do I put this code?” for each track’s setup.</p></aside>`;
    panel.querySelector('#compareGroup').addEventListener('change', (event) => { state.group = event.target.value; renderContent(); });
  }

  function getTrace(target) {
    const numbers = data.algorithms.numbers;
    const trace = [];
    let low = 0;
    let high = numbers.length - 1;
    while (low <= high) {
      const mid = low + Math.floor((high - low) / 2);
      if (numbers[mid] === target) {
        trace.push({ low, high, mid, found: true, text: `Index ${mid} holds ${numbers[mid]}, which equals the target ${target}. Found at index ${mid}.` });
        return trace;
      }
      trace.push({ low, high, mid, found: false, text: numbers[mid] < target ? `The middle value ${numbers[mid]} is smaller than ${target}. Keep the right half: next low = ${mid + 1}.` : `The middle value ${numbers[mid]} is larger than ${target}. Keep the left half: next high = ${mid - 1}.` });
      if (numbers[mid] < target) low = mid + 1;
      else high = mid - 1;
    }
    trace.push({ low, high, mid: null, found: false, text: `low (${low}) is now greater than high (${high}). No candidates remain. ${target} is not found; return -1.` });
    return trace;
  }

  function renderAlgorithms(panel) {
    const algorithms = data.algorithms;
    state.algorithmStep = Math.min(state.algorithmStep, Math.min(progress.algorithms, algorithms.steps.length - 1));
    const item = algorithms.steps[state.algorithmStep];
    const complete = state.algorithmStep < progress.algorithms;
    panel.innerHTML = `<div class="course-panel-head"><div><span class="eyebrow">04 · UNDERSTAND THE STEPS</span><h2>Binary search, without the mystery.</h2><p>${escape(algorithms.prerequisite)}</p></div></div><div class="course-algorithm-definition"><h3>What does it actually mean?</h3><p>${escape(algorithms.definition)}</p><p><b>Real-world idea:</b> To find a page in an ordered book, open near the middle and decide which side can still contain your page. You keep narrowing the search.</p><p><b>Rule:</b> The numeric examples use ascending, sorted whole numbers. Searching an unsorted sequence this way can incorrectly report that a target is absent. Sorting first has a separate cost.</p></div>
      <dl class="course-algorithm-words">${algorithms.words.map(([word, meaning]) => `<div><dt>${escape(word)}</dt><dd>${escape(meaning)}</dd></div>`).join('')}</dl>
      <section class="course-trace" aria-labelledby="traceTitle"><div class="course-trace-heading"><div><span class="eyebrow">FOLLOW ONE COMPARISON AT A TIME</span><h3 id="traceTitle">A tiny worked example</h3></div><div><label for="traceTarget">Find a number</label><select id="traceTarget"><option value="23" ${state.target === 23 ? 'selected' : ''}>23 · middle of right half</option><option value="3" ${state.target === 3 ? 'selected' : ''}>3 · first item</option><option value="27" ${state.target === 27 ? 'selected' : ''}>27 · last item</option><option value="17" ${state.target === 17 ? 'selected' : ''}>17 · missing</option></select></div></div><div id="traceBody"></div></section>
      <div class="course-algorithm-milestones"><nav aria-label="Algorithm milestone sequence">${algorithms.steps.map((entry, index) => `<button type="button" data-algorithm-step="${index}" ${index > progress.algorithms ? 'disabled' : ''} aria-pressed="${index === state.algorithmStep}" class="${index === state.algorithmStep ? 'active' : ''}"><span>${index < progress.algorithms ? '✓' : index + 1}</span>${escape(entry.title)}</button>`).join('')}</nav><article><span class="eyebrow">ALGORITHM MILESTONE ${state.algorithmStep + 1} / 3</span><h3>${escape(item.title)}</h3><p>${escape(item.description)}</p><aside class="course-practice"><h4>Your turn</h4><p>${state.algorithmStep === 0 ? 'Write out a linear search for 23 in the sample list. Name each value you check.' : state.algorithmStep === 1 ? 'Use the worked example to find 3 and 27. Record low, high, and mid at each check.' : 'Search for 17 and record when the bounds cross. Then run your chosen language’s code for both present and missing values.'}</p></aside>${checkForm(item, complete, 'algorithm')}${complete ? `<button type="button" class="course-next" data-next-milestone>${state.algorithmStep < 2 ? 'Open the next algorithm milestone →' : 'Algorithm complete · compare languages →'}</button>` : ''}</article></div>
      <section class="course-algorithm-code"><h3>The same algorithm in four languages</h3><p>All four implementations return an index, or -1 if absent. With the sample target 23, the output is 5.</p><nav aria-label="Binary search code language">${['javascript', 'java', 'python', 'php'].map((id) => `<button type="button" data-algorithm-code="${id}" aria-pressed="${state.codeLanguage === id}" class="${state.codeLanguage === id ? 'active' : ''}">${data.languages.find((language) => language.id === id).label}</button>`).join('')}</nav><div id="algorithmCode"></div><div class="course-lines"><h4>Read the algorithm in six pieces</h4><ol><li>Start low at 0 and high at the last index.</li><li>Continue while at least one candidate remains: low ≤ high.</li><li>Calculate the middle index, rounded down.</li><li>If the middle value equals the target, return its index.</li><li>If it is smaller, move low to mid + 1. Otherwise move high to mid − 1.</li><li>If the bounds cross, return -1 because no matching item was found.</li></ol></div><aside class="course-practice"><h4>Test the boundaries</h4><p>${escape(algorithms.practice)}</p></aside></section>${sourceLinks(algorithms.sources)}`;
    panel.querySelector('#traceTarget').addEventListener('change', (event) => { state.target = +event.target.value; state.traceIndex = 0; renderTrace(); });
    panel.querySelector('form').addEventListener('submit', (event) => submitCheck(event, item, 'algorithms', state.algorithmStep));
    renderTrace();
    renderAlgorithmCode();
  }

  function renderTrace() {
    const trace = getTrace(state.target);
    state.traceIndex = Math.min(state.traceIndex, trace.length - 1);
    const step = trace[state.traceIndex];
    root.querySelector('#traceBody').innerHTML = `<div class="course-trace-numbers" aria-label="Sorted numbers with zero-based indexes">${data.algorithms.numbers.map((number, index) => `<div class="${index < step.low || index > step.high ? 'discarded' : 'candidate'} ${index === step.mid ? 'middle' : ''} ${index === step.mid && step.found ? 'found' : ''}"><span>${number}</span><small>index ${index}</small>${index === step.mid ? '<b>mid</b>' : ''}</div>`).join('')}</div><p class="course-trace-legend">Highlighted: checked middle · faded: excluded items · all indexes start at 0</p><dl class="course-trace-values"><div><dt>low</dt><dd>${step.low}</dd></div><div><dt>high</dt><dd>${step.high}</dd></div><div><dt>mid</dt><dd>${step.mid === null ? 'none' : step.mid}</dd></div><div><dt>target</dt><dd>${state.target}</dd></div></dl><p class="course-trace-description" role="status" aria-live="polite"><b>Step ${state.traceIndex + 1} of ${trace.length}.</b> ${escape(step.text)}</p><div class="course-trace-controls"><button type="button" class="primary" data-trace-next ${state.traceIndex === trace.length - 1 ? 'disabled' : ''}>Next comparison →</button><button type="button" class="secondary" data-trace-reset>Start again</button></div>`;
  }

  function renderAlgorithmCode() {
    root.querySelector('#algorithmCode').innerHTML = codeBlock(data.algorithms.code[state.codeLanguage], `${data.languages.find((language) => language.id === state.codeLanguage).label} · binary search`);
    all('[data-algorithm-code]', root).forEach((button) => {
      const active = button.dataset.algorithmCode === state.codeLanguage;
      button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
    });
  }

  function readRoute() {
    const parts = location.hash.replace(/^#/, '').split('/');
    if (parts[0] !== 'learn') return;
    document.querySelector('.nav-item[data-view="learn"]')?.click();
    if (!parts[1] || parts[1] === 'project') { openSection('project', false); return; }
    if (['localhost', 'reference'].includes(parts[1])) { openSection(parts[1], false); return; }
    if (data.languages.some((l) => l.id === parts[1])) state.language = parts[1];
    state.tab = tabs[parts[2]] ? parts[2] : 'dictionary';
    const done = progress[state.language];
    state.milestone = Math.min(Math.max(Number(parts[3] || done + 1) - 1, 0), Math.min(done, 7));
    if (!Number.isInteger(state.milestone)) state.milestone = Math.min(done, 7);
    openSection('course', false);
    render();
  }

  root.addEventListener('click', async (event) => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    if (button.dataset.courseLanguage) {
      state.language = button.dataset.courseLanguage; state.tab = 'dictionary'; state.query = ''; state.scope = 'track';
      state.milestone = Math.min(progress[state.language], 7); persist(); render(); route();
    } else if (button.dataset.courseTab) {
      state.tab = button.dataset.courseTab; render(); route();
    } else if (button.hasAttribute('data-start-track')) {
      state.tab = 'milestones'; state.milestone = Math.min(progress[state.language], 7); render(); route();
    } else if (button.dataset.courseMilestone !== undefined) {
      const index = +button.dataset.courseMilestone;
      if (index <= progress[state.language]) { state.milestone = index; renderContent(); route(); }
    } else if (button.dataset.defineWord || button.dataset.wordTrack) {
      if (button.dataset.wordTrack) state.language = button.dataset.wordTrack;
      state.query = button.dataset.defineWord || button.dataset.wordName;
      state.tab = 'dictionary'; state.scope = 'track'; render(); route();
      const match = all('.course-word', root).find((word) => word.querySelector('h3').textContent === state.query);
      if (match) { match.open = true; match.scrollIntoView({ block: 'nearest', behavior: 'auto' }); }
    } else if (button.hasAttribute('data-show-hint')) {
      const item = state.tab === 'algorithms' ? data.algorithms.steps[state.algorithmStep] : current().milestones[state.milestone];
      button.closest('form').querySelector('.course-check-feedback').textContent = item.hint;
    } else if (button.hasAttribute('data-next-milestone')) {
      if (state.tab === 'algorithms') {
        if (state.algorithmStep + 1 < data.algorithms.steps.length) state.algorithmStep++;
        else state.tab = 'compare';
      } else if (state.milestone + 1 < current().milestones.length) state.milestone++;
      else state.tab = ['html', 'css'].includes(state.language) ? 'compare' : 'algorithms';
      render(); route(); root.querySelector('#courseTabContent').scrollIntoView({ block: 'start', behavior: 'auto' });
    } else if (button.hasAttribute('data-copy-code')) {
      const code = button.closest('.course-code').querySelector('code');
      try { await navigator.clipboard.writeText(code.textContent); button.textContent = 'Copied'; }
      catch { const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(code); selection.removeAllRanges(); selection.addRange(range); button.textContent = 'Selected · use Ctrl/Cmd+C'; }
    } else if (button.dataset.algorithmCode) {
      state.codeLanguage = button.dataset.algorithmCode; renderAlgorithmCode();
    } else if (button.dataset.algorithmStep !== undefined) {
      const index = +button.dataset.algorithmStep;
      if (index <= progress.algorithms) { state.algorithmStep = index; renderContent(); }
    } else if (button.hasAttribute('data-trace-next')) {
      state.traceIndex++; renderTrace();
    } else if (button.hasAttribute('data-trace-reset')) {
      state.traceIndex = 0; renderTrace();
    }
  });
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-learn-section]');
    if (button) openSection(button.dataset.learnSection);
    const viewButton = event.target.closest('[data-view]');
    if (viewButton?.dataset.view === 'learn') {
      const active = document.querySelector('#view-learn .learn-section:not([hidden])');
      if (active) openSection(active.id.replace('learn-', ''), false);
    } else if (viewButton && location.hash.startsWith('#learn')) history.replaceState(null, '', location.pathname + location.search);
  });
  window.addEventListener('hashchange', readRoute);
  window.FirstCometCourse = { openSection };
  state.milestone = Math.min(progress[state.language], 7);
  render();
  readRoute();
})();
