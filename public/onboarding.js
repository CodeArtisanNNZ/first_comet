/* Start with a working editor, not a documentation wall. */
(() => {
  'use strict';
  const startButton = document.querySelector('#fcTryNow');
  const computerButton = document.querySelector('#fcSetupLaptop');
  const status = document.querySelector('#fcQuickStatus');
  const completedKey = 'fc-first-challenge-v1';

  function isComplete() {
    try { return Boolean(localStorage.getItem(completedKey)); }
    catch (_) { return false; }
  }
  function refreshHome() {
    if (!status) return;
    const name = window.FirstCometPersonalization?.getName?.() || '';
    if (isComplete()) {
      status.textContent = '✓ ' + (name ? name + ', you completed the first challenge. ' : 'You completed the first challenge. ') + 'Your edits are saved in this browser.';
      if (startButton) startButton.textContent = 'Continue coding →';
    } else {
      status.textContent = (name ? 'Ready, ' + name + '? ' : '') + 'Works on your phone, too. Your edits save in this browser.';
    }
  }

  function goTo(section) {
    document.querySelector('.nav-item[data-view="learn"]')?.click();
    // setView schedules the preferred section for the next tick.
    window.setTimeout(() => {
      window.FirstCometCourse?.openSection(section);
      if (section === 'lab') document.querySelector('[data-lab-track="web"]')?.click();
      document.querySelector('main')?.scrollTo({top:0,behavior:'auto'});
    }, 20);
  }
  startButton?.addEventListener('click', () => goTo('lab'));
  computerButton?.addEventListener('click', () => goTo('localhost'));
  window.addEventListener('fc-first-challenge-complete', refreshHome);
  window.addEventListener('fc-profile-name', refreshHome);
  window.addEventListener('storage', refreshHome);
  document.querySelector('.nav-item[data-view="home"]')?.addEventListener('click', refreshHome);
  refreshHome();
})();