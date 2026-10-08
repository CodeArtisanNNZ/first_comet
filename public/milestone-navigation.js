/* One clear milestone at a time. Completion is a user's self-check, saved only on this device. */
(() => {
  'use strict';
  const root = document.querySelector('#learn-localhost .teacher-sequence');
  if (!root) return;
  const milestones = [...root.querySelectorAll(':scope > article.milestone')];
  if (!milestones.length) return;

  const STORAGE_KEY = 'fc-localhost-progress-v1';
  const total = milestones.length;
  const titles = milestones.map(node => node.querySelector('.milestone-top h3')?.textContent?.trim() || 'Next milestone');
  const safeIndex = x => Math.max(0, Math.min(total - 1, Number.isInteger(x) ? x : 0));
  let progress = {current: 0, unlocked: 0};
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    progress.unlocked = safeIndex(saved.unlocked);
    progress.current = Math.min(safeIndex(saved.current), progress.unlocked);
  } catch (_) { /* Private browsing may block storage; still provide navigation. */ }

  const toolbar = document.createElement('div');
  toolbar.className = 'fc-step-toolbar';
  toolbar.setAttribute('aria-label', 'Milestone navigation');
  toolbar.innerHTML = `
    <div class="fc-step-heading">
      <span class="fc-step-count" aria-live="polite">Milestone <b data-fc-position>1 of ${total}</b></span>
      <span class="fc-step-next-title" data-fc-upcoming>Up next: ${titles[1] || 'Finish'}</span>
    </div>
    <div class="fc-step-progress" role="progressbar" aria-label="Milestones completed" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="0"><span></span></div>
    <div class="fc-step-buttons">
      <button type="button" class="fc-step-back" data-fc-back>← Previous</button>
      <button type="button" class="fc-step-finish" data-fc-forward>I completed this → Next</button>
    </div>`;
  root.querySelector('.sequence-head')?.after(toolbar);

  const mobileNav = document.createElement('div');
  mobileNav.className = 'fc-step-mobile';
  mobileNav.setAttribute('aria-label', 'Current learning step');
  mobileNav.innerHTML = `<div><small>YOUR PATH</small><strong data-fc-mobile-count>1 / ${total}</strong></div>
    <button type="button" data-fc-mobile-back aria-label="Previous milestone">←</button>
    <button type="button" data-fc-mobile-next>I did this · Next →</button>`;
  root.appendChild(mobileNav);

  const bottomActions = milestones.map((milestone) => {
    const actions = document.createElement('div');
    actions.className = 'fc-milestone-end';
    actions.innerHTML = `<button type="button" class="fc-step-back" data-fc-back>← Previous step</button>
      <button type="button" class="fc-step-finish" data-fc-forward>I completed this → Next</button>`;
    milestone.querySelector('.milestone-main')?.appendChild(actions);
    return actions;
  });

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (_) {}
  }

  function render() {
    milestones.forEach((milestone, i) => {
      milestone.hidden = i !== progress.current;
      milestone.classList.toggle('milestone-current', i === progress.current);
      milestone.classList.toggle('milestone-next', i !== progress.current);
      const pill = milestone.querySelector('.status-pill');
      if (pill) {
        pill.classList.toggle('current', i === progress.current);
        pill.classList.toggle('locked', i !== progress.current);
        if (i === progress.current) pill.textContent = 'YOU ARE HERE';
      }
    });

    const isLast = progress.current === total - 1;
    const currentLabel = `${progress.current + 1} of ${total}`;
    toolbar.querySelector('[data-fc-position]').textContent = currentLabel;
    toolbar.querySelector('[data-fc-upcoming]').textContent =
      isLast ? 'Last milestone: check your live website' : 'Up next: ' + titles[progress.current + 1];
    toolbar.querySelector('.fc-step-progress').setAttribute('aria-valuenow', String(progress.current));
    toolbar.querySelector('.fc-step-progress span').style.width = ((progress.current / total) * 100) + '%';
    mobileNav.querySelector('[data-fc-mobile-count]').textContent = `${progress.current + 1} / ${total}`;
    root.querySelectorAll('[data-fc-back]').forEach(button => {
      button.disabled = progress.current === 0;
    });
    root.querySelectorAll('[data-fc-forward]').forEach(button => {
      button.textContent = isLast ? '✓ Finish learning path' : 'I completed this → Next';
    });
    mobileNav.querySelector('[data-fc-mobile-next]').textContent = isLast ? '✓ Finish' : 'I did this · Next →';
  }

  function jumpToMilestone() {
    toolbar.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  function goPrevious() {
    if (progress.current === 0) return;
    progress.current -= 1;
    save();
    render();
    jumpToMilestone();
  }

  function goForward() {
    if (progress.current === total - 1) {
      toolbar.querySelector('[data-fc-upcoming]').textContent = 'All seven milestones reached — export your project for backup!';
      const nextButtons = root.querySelectorAll('[data-fc-forward], [data-fc-mobile-next]');
      nextButtons.forEach(button => { button.disabled = true; button.textContent = '✓ Path completed'; });
      try { localStorage.setItem('fc-localhost-path-complete-v1', 'true'); } catch (_) {}
      jumpToMilestone();
      return;
    }
    progress.current += 1;
    progress.unlocked = Math.max(progress.unlocked, progress.current);
    save();
    render();
    jumpToMilestone();
  }

  root.querySelectorAll('[data-fc-back], [data-fc-mobile-back]').forEach(button => button.addEventListener('click', goPrevious));
  root.querySelectorAll('[data-fc-forward], [data-fc-mobile-next]').forEach(button => button.addEventListener('click', goForward));
  render();
})();
