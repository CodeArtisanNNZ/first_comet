(() => {
  'use strict';

  const root = document.querySelector('#fcAchievementDashboard');
  if (!root) return;

  const COURSE_KEY = 'fc-code-course-v1';
  const PROJECT_KEY = 'fc-project-course-v1';
  const ACHIEVEMENT_KEY = 'fc-achievements-v1';
  const CV_KEY = 'fc-cv-studio-v1';

  const projectData = window.FC_PROJECT_COURSE;
  const codeData = window.FC_COURSE;
  if (!projectData || !codeData) return;

  const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  const stages = [
    {
      id: 'start', title: 'Project Starter', outcome: 'You can start and organise a small project.',
      needs: [
        { type: 'subject', id: 'plan', label: 'Plan a tiny project' },
        { type: 'subject', id: 'vscode', label: 'Use VS Code' }
      ]
    },
    {
      id: 'page', title: 'Web Page Builder', outcome: 'You can build and change an interactive webpage.',
      needs: [
        { type: 'code', id: 'html', label: 'HTML' },
        { type: 'code', id: 'css', label: 'CSS' },
        { type: 'code', id: 'javascript', label: 'JavaScript' }
      ]
    },
    {
      id: 'versions', title: 'Git & GitHub Starter', outcome: 'You can save versions and keep work on GitHub.',
      needs: [
        { type: 'subject', id: 'git', label: 'Git' },
        { type: 'subject', id: 'github', label: 'GitHub' }
      ]
    },
    {
      id: 'memory', title: 'Connected App Builder', outcome: 'You understand saved data and can connect it to a project.',
      needs: [
        { type: 'subject', id: 'databases', label: 'Databases' },
        { type: 'subject', id: 'connect', label: 'Connect data' }
      ]
    },
    {
      id: 'launch', title: 'Project Launcher', outcome: 'You can put a project online with a shareable address.',
      needs: [
        { type: 'subject', id: 'publish', label: 'Publish' },
        { type: 'subject', id: 'domains', label: 'Domain' }
      ]
    }
  ];

  function parse(key, fallback = {}) {
    try { return JSON.parse(localStorage.getItem(key) || '') || fallback; }
    catch { return fallback; }
  }

  function achievementState() {
    const saved = parse(ACHIEVEMENT_KEY, {});
    return {
      events: Array.isArray(saved.events) ? saved.events : [],
      unlockedTitles: Array.isArray(saved.unlockedTitles) ? saved.unlockedTitles : [],
      firstSeen: saved.firstSeen || Date.now(),
      lastSeen: saved.lastSeen || null
    };
  }

  function writeAchievementState(state) {
    try {
      localStorage.setItem(ACHIEVEMENT_KEY, JSON.stringify({
        events: state.events.slice(0, 120),
        unlockedTitles: state.unlockedTitles,
        firstSeen: state.firstSeen,
        lastSeen: Date.now()
      }));
    } catch {}
  }

  function courseSaved() { return parse(COURSE_KEY, {}); }
  function projectSaved() { return parse(PROJECT_KEY, {}); }

  function codeTrack(id) {
    return codeData.languages.find((track) => track.id === id);
  }

  function subject(id) {
    return projectData.subjects.find((item) => item.id === id);
  }

  function codeProgress(id) {
    const track = codeTrack(id);
    if (!track) return 0;
    return Math.max(0, Math.min(Number(courseSaved().progress?.[id] || 0), track.milestones.length));
  }

  function codeComplete(id) {
    const track = codeTrack(id);
    return Boolean(track) && codeProgress(id) >= track.milestones.length;
  }

  function subjectDoneCount(id) {
    const item = subject(id);
    const stored = projectSaved().completed?.[id];
    if (!item || !Array.isArray(stored)) return 0;
    return item.lessons.filter((step) => stored.includes(step.id)).length;
  }

  function subjectComplete(id) {
    const item = subject(id);
    return Boolean(item) && subjectDoneCount(id) >= item.lessons.length;
  }

  function needComplete(need) {
    return need.type === 'code' ? codeComplete(need.id) : subjectComplete(need.id);
  }

  function stageComplete(stage) {
    return stage.needs.every(needComplete);
  }

  function unlockedStages() {
    return stages.filter(stageComplete);
  }

  function currentStage() {
    return stages.find((stage) => !stageComplete(stage)) || stages[stages.length - 1];
  }

  function routeForNeed(need) {
    if (need.type === 'code') {
      const done = codeProgress(need.id);
      return '#learn/' + need.id + '/milestones/' + Math.max(1, done + 1);
    }
    const item = subject(need.id);
    const stored = projectSaved().completed?.[need.id] || [];
    const first = item?.lessons?.find((step) => !stored.includes(step.id)) || item?.lessons?.[0];
    return '#learn/project/' + need.id + '/lessons/' + (first?.id || '');
  }

  function nextNeed() {
    const stage = currentStage();
    const need = stage.needs.find((entry) => !needComplete(entry)) || stage.needs[0];
    return { stage, need, href: routeForNeed(need) };
  }

  function totals() {
    const course = courseSaved();
    const codeMilestones = codeData.languages.reduce((sum, track) => {
      const n = Math.max(0, Math.min(Number(course.progress?.[track.id] || 0), track.milestones.length));
      return sum + n;
    }, 0);
    const algorithmDone = Math.max(0, Math.min(Number(course.progress?.algorithms || 0), codeData.algorithms?.steps?.length || 0));
    const projectSteps = projectData.subjects.reduce((sum, item) => sum + subjectDoneCount(item.id), 0);
    const projects = parse('fc-projects', []);
    return {
      codeMilestones: codeMilestones + algorithmDone,
      projectSteps,
      checkpoints: codeMilestones + algorithmDone + projectSteps,
      projects: Array.isArray(projects) ? projects.length : 0,
      titles: unlockedStages().length
    };
  }

  function cvReadiness() {
    const cv = parse(CV_KEY, {});
    const b = cv.basics || {};
    if (!Object.keys(b).length) return { started: false, count: 0 };
    const bullets = [
      ...(cv.experience || []).flatMap(x => String(x.bullets || '').split(/\r?\n/).filter(Boolean)),
      ...(cv.projects || []).flatMap(x => String(x.bullets || '').split(/\r?\n/).filter(Boolean))
    ];
    const hasEntry = (items) => (items || []).some(item => Object.values(item || {}).some(v => String(v || '').trim()));
    const checks = [
      b.name && b.email && b.phone,
      b.target,
      String(b.summary || '').trim().length >= 60,
      String(b.skills || '').split(',').filter(x => x.trim()).length >= 4,
      hasEntry(cv.education),
      hasEntry([...(cv.experience || []), ...(cv.projects || [])]),
      bullets.length >= 2,
      bullets.some(x => /\b\d+(?:\.\d+)?\s*(?:%|x|users?|students?|clients?|hours?|days?|seconds?|ms|projects?|features?|pages?|steps?)\b/i.test(x))
    ];
    return { started: true, count: checks.filter(Boolean).length };
  }

  function syncTitleEvents(state) {
    const unlocked = unlockedStages();
    let changed = false;
    unlocked.forEach((stage) => {
      if (!state.unlockedTitles.includes(stage.id)) {
        state.unlockedTitles.push(stage.id);
        changed = true;
      }
    });
    if (changed) writeAchievementState(state);
    return state;
  }

  function latestMeaningful(state) {
    return state.events.find(event => ['skill', 'step', 'title', 'project'].includes(event.kind));
  }

  function relativeDate(timestamp) {
    if (!timestamp) return '';
    const diff = Date.now() - Number(timestamp);
    const day = 86400000;
    if (diff < day) return 'Today';
    if (diff < day * 2) return 'Yesterday';
    if (diff < day * 7) return Math.floor(diff / day) + ' days ago';
    return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  function render() {
    let state = syncTitleEvents(achievementState());
    const t = totals();
    const next = nextNeed();
    const cv = cvReadiness();
    const latest = latestMeaningful(state);
    const weekAgo = Date.now() - 7 * 86400000;
    const weekly = state.events.filter(event => Number(event.at) >= weekAgo && ['skill', 'step', 'title', 'project'].includes(event.kind));
    const passport = stages.map((stage, index) => {
      const done = stageComplete(stage);
      const previousDone = index === 0 || stageComplete(stages[index - 1]);
      const current = !done && previousDone;
      return `
        <div class="fc-passport-step ${done ? 'earned' : current ? 'current' : 'locked'}">
          <span>${done ? '✓' : current ? '→' : '○'}</span>
          <div><b>${esc(stage.title)}</b><small>${done ? 'Earned' : current ? 'In progress' : 'Later'}</small></div>
        </div>`;
    }).join('');

    const history = state.events.filter(event => ['skill', 'step', 'title', 'project'].includes(event.kind)).slice(0, 4);
    const hasProgress = t.checkpoints > 0 || t.projects > 0 || t.titles > 0;
    document.body.classList.toggle('fc-returning-progress', hasProgress);

    root.innerHTML = `
      <section class="fc-progress-home ${hasProgress ? 'has-progress' : 'new-learner'}">
        <div class="fc-progress-welcome">
          <span class="eyebrow">${hasProgress ? 'WELCOME BACK' : 'START HERE'}</span>
          <h1>${hasProgress ? 'You are not where you started.' : 'Your first real win is close.'}</h1>
          <p>${latest
            ? 'Last win: <b>' + esc(latest.title) + '</b> · ' + relativeDate(latest.at)
            : hasProgress
              ? 'Your completed work is saved on this device. Keep adding proof one small step at a time.'
              : 'Learn one thing, use it, prove it, then keep the evidence.'}</p>
        </div>

        <div class="fc-proof-stats" aria-label="Your real progress">
          <div><strong>${t.checkpoints}</strong><span>learning checkpoints</span></div>
          <div><strong>${t.projects}</strong><span>projects started</span></div>
          <div><strong>${t.titles}</strong><span>titles earned</span></div>
          <div><strong>${cv.started ? cv.count + '/8' : '—'}</strong><span>CV readiness</span></div>
        </div>

        <div class="fc-next-win">
          <div>
            <span class="eyebrow">NEXT SMALL WIN</span>
            <h2>${esc(next.need.label)}</h2>
            <p>Part of <b>${esc(next.stage.title)}</b>. Finish one real checkpoint — not a random XP task.</p>
          </div>
          <a class="primary" href="${esc(next.href)}">Continue →</a>
        </div>

        <div class="fc-weekly-proof">
          <span class="eyebrow">THIS WEEK</span>
          ${weekly.length
            ? '<b>' + weekly.length + ' real ' + (weekly.length === 1 ? 'win' : 'wins') + '</b><p>' + esc(weekly.slice(0, 3).map(x => x.title).join(' · ')) + '</p>'
            : '<b>Your next win starts here.</b><p>Future completed steps will appear here with the day you earned them.</p>'}
        </div>

        <details class="fc-passport">
          <summary><span><span class="eyebrow">DEVELOPER PASSPORT</span><b>${esc(unlockedStages().at(-1)?.title || 'Explorer')}</b></span><span>View progress +</span></summary>
          <div class="fc-passport-track">${passport}</div>
          <p>Titles are First Comet progress markers, not professional certificates. Each one is tied to completed learning and build steps.</p>
        </details>

        <details class="fc-win-history">
          <summary>My recent accomplishments</summary>
          <div>
            ${history.length
              ? history.map(event => `<article><span>${event.kind === 'title' ? '★' : event.kind === 'project' ? '◆' : '✓'}</span><div><b>${esc(event.title)}</b><small>${esc(event.detail || '')}${event.at ? ' · ' + relativeDate(event.at) : ''}</small></div></article>`).join('')
              : '<p>No dated accomplishments yet. Complete your next checked step and First Comet will start your history here.</p>'}
          </div>
        </details>
      </section>`;

    writeAchievementState(state);
  }

  function celebrate(event) {
    let layer = document.querySelector('#fcAchievementToast');
    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'fcAchievementToast';
      layer.className = 'fc-achievement-toast';
      layer.setAttribute('role', 'status');
      layer.setAttribute('aria-live', 'polite');
      document.body.appendChild(layer);
    }
    layer.innerHTML = `
      <div class="fc-achievement-comet" aria-hidden="true">☄</div>
      <div><span>${event.kind === 'title' ? 'TITLE UNLOCKED' : event.kind === 'project' ? 'PROJECT STARTED' : 'PROGRESS PROVEN'}</span>
      <b>${esc(event.title)}</b>
      <small>${esc(event.detail || 'You completed something real.')}</small></div>`;
    layer.classList.remove('show');
    void layer.offsetWidth;
    layer.classList.add('show');
    clearTimeout(window.__fcAchievementTimer);
    window.__fcAchievementTimer = setTimeout(() => layer.classList.remove('show'), 3200);
  }

  function record(event) {
    if (!event || !event.id || !event.title) return false;
    const state = achievementState();
    if (state.events.some(item => item.id === event.id)) {
      render();
      return false;
    }
    const item = {
      id: String(event.id),
      kind: event.kind || 'skill',
      title: String(event.title),
      detail: String(event.detail || ''),
      at: Date.now()
    };
    state.events.unshift(item);

    const newlyUnlocked = unlockedStages().find((stage) => !state.unlockedTitles.includes(stage.id));
    let celebration = item;
    if (newlyUnlocked) {
      state.unlockedTitles.push(newlyUnlocked.id);
      const titleEvent = {
        id: 'title:' + newlyUnlocked.id,
        kind: 'title',
        title: newlyUnlocked.title + ' unlocked',
        detail: newlyUnlocked.outcome,
        at: Date.now()
      };
      state.events.unshift(titleEvent);
      celebration = titleEvent;
    }

    writeAchievementState(state);
    celebrate(celebration);
    render();
    window.dispatchEvent(new CustomEvent('fc:progress-changed', { detail: celebration }));
    return true;
  }

  window.FirstCometAchievements = { record, refresh: render };
  window.addEventListener('storage', render);
  window.addEventListener('fc:progress-changed', render);
  render();
})();