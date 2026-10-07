(() => {
  'use strict';

  const root = document.querySelector('#buildJourneyApp');
  const projectRoot = document.querySelector('#projectCourseApp');
  const projectData = window.FC_PROJECT_COURSE;
  const codeData = window.FC_COURSE;
  if (!root || !projectRoot || !projectData || !codeData) return;

  const stages = [
    {
      id: 'start',
      number: 1,
      name: 'Start Something',
      title: 'Project Starter',
      note: 'Choose one tiny idea and learn where your files live.',
      result: 'A small project running on your computer.',
      needs: [
        { type: 'subject', id: 'plan', label: 'Pick a tiny project' },
        { type: 'subject', id: 'vscode', label: 'Use VS Code' }
      ]
    },
    {
      id: 'page',
      number: 2,
      name: 'Build the Page',
      title: 'Web Page Builder',
      note: 'Give your page structure, style, and one useful interaction.',
      result: 'A webpage you can explain and change yourself.',
      needs: [
        { type: 'code', id: 'html', label: 'HTML · structure' },
        { type: 'code', id: 'css', label: 'CSS · style' },
        { type: 'code', id: 'javascript', label: 'JavaScript · interaction' }
      ]
    },
    {
      id: 'versions',
      number: 3,
      name: 'Save Your Work',
      title: 'Version Control Starter',
      note: 'Keep safe checkpoints and put the project on GitHub.',
      result: 'A repository with meaningful commits.',
      needs: [
        { type: 'subject', id: 'git', label: 'Git · save versions' },
        { type: 'subject', id: 'github', label: 'GitHub · remote copy' }
      ]
    },
    {
      id: 'memory',
      number: 4,
      name: 'Give It Memory',
      title: 'Connected App Builder',
      note: 'Understand saved data and connect it to a real project.',
      result: 'A project that can read saved information.',
      needs: [
        { type: 'subject', id: 'databases', label: 'Understand databases' },
        { type: 'subject', id: 'connect', label: 'Connect saved data' }
      ]
    },
    {
      id: 'launch',
      number: 5,
      name: 'Put It Online',
      title: 'Project Launcher',
      note: 'Publish your project and give it a real web address.',
      result: 'A live project you can share.',
      needs: [
        { type: 'subject', id: 'publish', label: 'Publish the project' },
        { type: 'subject', id: 'domains', label: 'Connect a domain' }
      ]
    }
  ];

  const nextPaths = [
    { id: 'python', title: 'Python Builder · Beginner', note: 'Automation, data, and Python projects.' },
    { id: 'java', title: 'Java Builder · Beginner', note: 'Typed programs and object-oriented projects.' },
    { id: 'php', title: 'PHP Web Builder · Beginner', note: 'Server-side web projects with PHP.' }
  ];

  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  function projectSaved() {
    try { return JSON.parse(localStorage.getItem('fc-project-course-v1') || '{}') || {}; }
    catch { return {}; }
  }

  function codeSaved() {
    try { return JSON.parse(localStorage.getItem('fc-code-course-v1') || '{}') || {}; }
    catch { return {}; }
  }

  function subjectComplete(id) {
    const subject = projectData.subjects.find((item) => item.id === id);
    if (!subject) return false;
    const done = projectSaved().completed?.[id];
    return Array.isArray(done) && subject.lessons.every((step) => done.includes(step.id));
  }

  function codeComplete(id) {
    const track = codeData.languages.find((item) => item.id === id);
    if (!track) return false;
    const progress = Number(codeSaved().progress?.[id] || 0);
    return progress >= track.milestones.length;
  }

  function needComplete(need) {
    return need.type === 'subject' ? subjectComplete(need.id) : codeComplete(need.id);
  }

  function stageComplete(stage) {
    return stage.needs.every(needComplete);
  }

  function stageDone(stage) {
    return stage.needs.filter(needComplete).length;
  }

  function earnedStages() {
    return stages.filter(stageComplete);
  }

  function currentStageIndex() {
    const index = stages.findIndex((stage) => !stageComplete(stage));
    return index < 0 ? stages.length - 1 : index;
  }

  function routeFor(need) {
    if (need.type === 'code') return '#learn/' + need.id + '/milestones/1';
    const subject = projectData.subjects.find((item) => item.id === need.id);
    const first = subject?.lessons?.[0]?.id || '';
    return '#learn/project/' + need.id + '/lessons/' + first;
  }

  function firstOpen(stage) {
    return stage.needs.find((need) => !needComplete(need)) || stage.needs[0];
  }

  function currentTitle() {
    return earnedStages().at(-1)?.title || 'Explorer';
  }

  function stageCard(stage, index) {
    const complete = stageComplete(stage);
    const previousDone = index === 0 || stageComplete(stages[index - 1]);
    const locked = !previousDone;
    const current = index === currentStageIndex() && !complete;
    const status = complete ? 'COMPLETE' : locked ? 'LOCKED' : current ? 'YOU ARE HERE' : 'READY';
    const action = firstOpen(stage);
    const actionHtml = locked
      ? '<span class="journey-locked">Finish Stage ' + stage.number - 1 + ' first</span>'
      : '<a class="journey-action" href="' + routeFor(action) + '">' + (complete ? 'Review stage' : 'Continue') + ' →</a>';

    return '<article class="journey-stage ' + (complete ? 'complete ' : '') + (current ? 'current ' : '') + (locked ? 'locked' : '') + '">' +
      '<div class="journey-stage-number">' + String(stage.number).padStart(2, '0') + '</div>' +
      '<div class="journey-stage-main">' +
        '<span class="eyebrow">STAGE ' + stage.number + ' · ' + status + '</span>' +
        '<h3>' + esc(stage.name) + '</h3>' +
        '<p>' + esc(stage.note) + '</p>' +
        '<div class="journey-needs">' +
          stage.needs.map((need) => '<span class="' + (needComplete(need) ? 'done' : '') + '">' + (needComplete(need) ? '✓' : '○') + ' ' + esc(need.label) + '</span>').join('') +
        '</div>' +
        actionHtml +
      '</div>' +
      '<aside class="journey-title">' +
        '<span>' + (complete ? 'TITLE UNLOCKED' : 'FINISH TO UNLOCK') + '</span>' +
        '<b>' + esc(stage.title) + '</b>' +
        '<small>' + esc(stage.result) + '</small>' +
      '</aside>' +
    '</article>';
  }

  function nextPathCard(item, coreComplete) {
    const trackDone = codeComplete(item.id);
    const unlocked = coreComplete && trackDone;
    const status = unlocked ? 'TITLE UNLOCKED' : coreComplete ? 'NEXT PATH' : 'LOCKED';
    return '<a class="next-builder-card ' + (unlocked ? 'complete' : '') + '" href="' + (coreComplete ? '#learn/' + item.id + '/milestones/1' : '#learn/project') + '" ' + (coreComplete ? '' : 'aria-disabled="true"') + '>' +
      '<span>' + status + '</span>' +
      '<b>' + esc(item.title) + '</b>' +
      '<small>' + esc(item.note) + '</small>' +
      '<em>' + (trackDone ? '✓ Coding path complete' : 'Complete the ' + esc(item.id) + ' path') + '</em>' +
    '</a>';
  }

  function renderJourney() {
    const earned = earnedStages();
    const active = stages[currentStageIndex()];
    const activeNeed = firstOpen(active);
    const coreComplete = stages.every(stageComplete);

    root.innerHTML =
      '<section class="journey-hero">' +
        '<div><span class="eyebrow">YOUR BUILD JOURNEY</span><h2>Build real things, one stage at a time.</h2><p>Finish a few small paths. Make something real. Unlock the next title.</p></div>' +
        '<aside><span>CURRENT TITLE</span><b>' + esc(currentTitle()) + '</b><small>' + earned.length + ' / ' + stages.length + ' titles unlocked</small><progress max="' + stages.length + '" value="' + earned.length + '"></progress></aside>' +
      '</section>' +
      (coreComplete
        ? '<section class="journey-now complete"><span class="eyebrow">CORE JOURNEY COMPLETE</span><h3>You are a Project Launcher.</h3><p>Choose one direction below. You do not need every language.</p></section>'
        : '<section class="journey-now"><span class="eyebrow">DO THIS NEXT</span><h3>' + esc(active.name) + '</h3><p>' + esc(activeNeed.label) + '</p><a class="primary" href="' + routeFor(activeNeed) + '">Continue →</a></section>') +
      '<div class="journey-stage-list">' + stages.map(stageCard).join('') + '</div>' +
      '<section class="next-builder-paths ' + (coreComplete ? '' : 'locked') + '">' +
        '<div><span class="eyebrow">NEXT DIRECTION</span><h2>What do you want to build next?</h2><p>' + (coreComplete ? 'Pick one. Specialise slowly.' : 'This opens after Stage 5.') + '</p></div>' +
        '<div class="next-builder-grid">' + nextPaths.map((item) => nextPathCard(item, coreComplete)).join('') + '</div>' +
        '<details class="journey-bonus"><summary>Bonus tools</summary><p>Student benefits can save money, but they are not required for your builder titles.</p><a href="#learn/project/students/lessons/' + (projectData.subjects.find((x) => x.id === 'students')?.lessons?.[0]?.id || '') + '">Open student benefits →</a></details>' +
      '</section>';
  }

  function sync() {
    const parts = location.hash.replace(/^#/, '').split('/');
    const onProject = parts[0] === 'learn' && parts[1] === 'project';
    const insidePath = onProject && Boolean(parts[2]);
    root.hidden = insidePath;
    projectRoot.hidden = onProject && !insidePath;
    if (onProject && !insidePath) renderJourney();
  }

  window.addEventListener('hashchange', sync);
  window.addEventListener('storage', sync);
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-project-home]')) {
      setTimeout(sync, 0);
    }
  });

  renderJourney();
  sync();
})();