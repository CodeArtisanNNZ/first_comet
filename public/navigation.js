(() => {
  const all = (selector) => [...document.querySelectorAll(selector)];

  function syncNavigation() {
    all('.nav-item').forEach((item) => {
      const active = item.classList.contains('active');
      if (active) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
  }

  document.querySelector('#railCreate')?.addEventListener('click', () => {
    document.querySelector('#newProjectBtn')?.click();
  });

  all('[data-nav-view]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector(`.nav-item[data-view="${button.dataset.navView}"]`)?.click();
      if (button.dataset.topicJump) {
        window.FirstCometCourse?.openSection('reference');
        document.querySelector(`.learn-nav [data-topic="${button.dataset.topicJump}"]`)?.click();
      }
      if (button.dataset.stepJump) {
        document.querySelector(`.mission[data-step="${button.dataset.stepJump}"]`)?.click();
      }
    });
  });

  all('[data-view], [data-nav-view]').forEach((button) => {
    button.addEventListener('click', () => requestAnimationFrame(syncNavigation));
  });

  syncNavigation();
})();
