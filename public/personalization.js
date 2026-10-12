(() => {
  'use strict';

  const storageKey = 'fc-user-name-v1';
  const sessionSkipKey = 'fc-name-skip-session-v1';
  const teacherChoiceKey = 'fc-teacher-choice-v1';
  const teacherSkipKey = 'fc-teacher-choice-skip-session-v1';
  const teacherAvatars = { female:"data:image/jpeg;base64,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", male:"data:image/jpeg;base64,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" };

  function cleanName(value) {
    return String(value || '')
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 32);
  }

  function getName() {
    try { return cleanName(localStorage.getItem(storageKey) || ''); }
    catch (_) { return ''; }
  }

  function getTeacherChoice() {
    try {
      const value = localStorage.getItem(teacherChoiceKey) || '';
      return value === 'female' || value === 'male' ? value : '';
    } catch (_) { return ''; }
  }

  function getTeacherAvatar(choice = getTeacherChoice()) {
    return teacherAvatars[choice] || '';
  }

  function setTeacherChoice(value) {
    const choice = value === 'female' || value === 'male' ? value : '';
    if (!choice) return '';
    try { localStorage.setItem(teacherChoiceKey, choice); } catch (_) {}
    document.body.dataset.teacher = choice;
    window.dispatchEvent(new CustomEvent('fc-teacher-choice', { detail: { choice } }));
    refreshSettings();
    return choice;
  }

  function setName(value) {
    const name = cleanName(value);
    if (!name) return '';
    try { localStorage.setItem(storageKey, name); } catch (_) {}
    window.dispatchEvent(new CustomEvent('fc-profile-name', { detail: { name } }));
    refreshSettings();
    refreshPersonalizedCopy();
    return name;
  }

  function refreshSettings() {
    const label = document.querySelector('#personalNameLabel');
    const teacherLabel = document.querySelector('#teacherChoiceLabel');
    const name = getName();
    const teacher = getTeacherChoice();
    if (label) label.textContent = name || 'Not set yet';
    if (teacherLabel) teacherLabel.textContent = teacher ? (teacher === 'female' ? 'Female teacher' : 'Male teacher') : 'Not chosen yet';
    document.body.dataset.teacher = teacher || '';
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element && value && element.textContent !== value) element.textContent = value;
  }

  function refreshPersonalizedCopy() {
    const name = getName();

    setText('#homeFocusTitle', name ? `What do you want to work on, ${name}?` : 'What do you want to do?');
    setText('#commandBar > span:nth-child(2)', name ? `${name}, tell First Comet what you want to do…` : 'Tell First Comet what you want to do…');
    setText('#projectModal .modal h2', name ? `${name}, what are you building?` : 'What are you building?');
    setText('#view-settings .page-heading h1', name ? `${name}’s workspace settings` : 'Workspace settings');
    setText('#learn-localhost .compact-intro h2', name ? `${name}, run one page on your computer.` : 'Run one page on your computer.');
    setText('#learn-localhost #teachingTitle', name ? `Start locally, ${name}.` : 'Work locally first.');

    const firstMilestone = document.querySelector('#learn-localhost .milestone-current .milestone-purpose');
    if (firstMilestone) {
      const value = name
        ? `${name}, get one simple page working. Nothing else yet.`
        : 'Get one simple page working. Nothing else yet.';
      if (firstMilestone.textContent !== value) firstMilestone.textContent = value;
    }

    const emptyProject = [...document.querySelectorAll('.empty-project')].find((card) =>
      card.querySelector('span')?.textContent?.trim() === 'No projects yet'
    );
    const emptyProjectHint = emptyProject?.querySelector('small');
    if (emptyProjectHint) {
      const value = name ? `${name}, add your first project` : 'Add your first project';
      if (emptyProjectHint.textContent !== value) emptyProjectHint.textContent = value;
    }

    const courseTitle = document.querySelector('#courseTrackTitle');
    if (courseTitle) {
      const current = courseTitle.textContent.trim();
      const withoutName = current.replace(/^.+?,\s+(?=[A-Za-z#+]+, in small words\.$)/, '');
      if (/^[A-Za-z#+]+, in small words\.$/.test(withoutName)) {
        const value = name ? `${name}, ${withoutName}` : withoutName;
        if (courseTitle.textContent !== value) courseTitle.textContent = value;
      }
    }
  }

  function closePrompt() {
    const prompt = document.querySelector('#fcNamePrompt');
    if (!prompt) return;
    prompt.classList.remove('open');
    prompt.setAttribute('aria-hidden', 'true');
  }

  function closeTeacherPrompt() {
    const prompt = document.querySelector('#fcTeacherChoicePrompt');
    if (!prompt) return;
    prompt.classList.remove('open');
    prompt.setAttribute('aria-hidden', 'true');
  }

  function openTeacherPrompt(options = {}) {
    const force = Boolean(options.force);
    if (!force && getTeacherChoice()) return;

    let prompt = document.querySelector('#fcTeacherChoicePrompt');
    if (!prompt) {
      prompt = document.createElement('div');
      prompt.id = 'fcTeacherChoicePrompt';
      prompt.className = 'fc-name-prompt fc-teacher-choice-prompt';
      prompt.setAttribute('aria-hidden', 'true');
      prompt.innerHTML = `
        <div class="fc-name-card fc-teacher-choice-card" role="dialog" aria-modal="true" aria-labelledby="fcTeacherChoiceTitle">
          <span class="eyebrow">FIRST COMET TEACHER</span>
          <h2 id="fcTeacherChoiceTitle">Who should guide you?</h2>
          <p>Choose the teacher character you feel most comfortable learning with. The teaching style and course content stay the same.</p>
          <div class="fc-teacher-choice-grid">
            <button type="button" data-teacher-choice="female">
              <img src="${teacherAvatars.female}" alt="">
              <span><b>Female teacher</b><small>Calm · supportive · clear</small></span>
            </button>
            <button type="button" data-teacher-choice="male">
              <img src="${teacherAvatars.male}" alt="">
              <span><b>Male teacher</b><small>Calm · supportive · clear</small></span>
            </button>
          </div>
          <div class="fc-name-actions">
            <button type="button" class="secondary" data-teacher-choice-skip>Not now</button>
            <button type="button" class="primary" data-teacher-choice-save disabled>Continue</button>
          </div>
          <small>You can switch teachers anytime in Settings.</small>
        </div>`;
      document.body.appendChild(prompt);

      let pending = getTeacherChoice();
      const saveButton = prompt.querySelector('[data-teacher-choice-save]');
      const select = (choice) => {
        pending = choice;
        prompt.querySelectorAll('[data-teacher-choice]').forEach((button) => {
          const selected = button.dataset.teacherChoice === choice;
          button.classList.toggle('selected', selected);
          button.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });
        saveButton.disabled = !pending;
      };

      prompt.querySelectorAll('[data-teacher-choice]').forEach((button) => {
        button.addEventListener('click', () => select(button.dataset.teacherChoice));
      });
      saveButton.addEventListener('click', () => {
        if (!setTeacherChoice(pending)) return;
        closeTeacherPrompt();
      });
      prompt.querySelector('[data-teacher-choice-skip]')?.addEventListener('click', () => {
        try { sessionStorage.setItem(teacherSkipKey, '1'); } catch (_) {}
        closeTeacherPrompt();
      });
      if (pending) select(pending);
    }

    const current = getTeacherChoice();
    prompt.querySelectorAll('[data-teacher-choice]').forEach((button) => {
      const selected = button.dataset.teacherChoice === current;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
    const saveButton = prompt.querySelector('[data-teacher-choice-save]');
    if (saveButton) saveButton.disabled = !current;
    prompt.classList.add('open');
    prompt.setAttribute('aria-hidden', 'false');
  }

  function openPrompt(options = {}) {
    const force = Boolean(options.force);
    if (!force && getName()) return;

    let prompt = document.querySelector('#fcNamePrompt');
    if (!prompt) {
      prompt = document.createElement('div');
      prompt.id = 'fcNamePrompt';
      prompt.className = 'fc-name-prompt';
      prompt.setAttribute('aria-hidden', 'true');
      prompt.innerHTML = `
        <div class="fc-name-card" role="dialog" aria-modal="true" aria-labelledby="fcNameTitle">
          <span class="eyebrow">FIRST COMET</span>
          <h2 id="fcNameTitle">What should I call you?</h2>
          <p>I will use your name only occasionally, when it makes guidance feel more personal. It stays on this device.</p>
          <label for="fcNameInput">Your name</label>
          <input id="fcNameInput" type="text" maxlength="32" autocomplete="nickname" placeholder="e.g. Nusaiba">
          <div class="fc-name-actions">
            <button type="button" class="secondary" data-name-skip>Not now</button>
            <button type="button" class="primary" data-name-save>Continue</button>
          </div>
          <small>You can change this later in Settings.</small>
        </div>`;

      document.body.appendChild(prompt);

      const input = prompt.querySelector('#fcNameInput');
      const save = () => {
        const name = setName(input.value);
        if (!name) {
          input.focus();
          input.setAttribute('aria-invalid', 'true');
          return;
        }
        input.removeAttribute('aria-invalid');
        closePrompt();
        window.setTimeout(() => {
          if (!getTeacherChoice()) openTeacherPrompt();
        }, 180);
      };

      prompt.querySelector('[data-name-save]')?.addEventListener('click', save);
      input?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          save();
        }
      });
      prompt.querySelector('[data-name-skip]')?.addEventListener('click', () => {
        try { sessionStorage.setItem(sessionSkipKey, '1'); } catch (_) {}
        closePrompt();
        window.setTimeout(() => {
          if (!getTeacherChoice()) openTeacherPrompt();
        }, 180);
      });
    }

    const input = prompt.querySelector('#fcNameInput');
    if (input) input.value = getName();
    prompt.classList.add('open');
    prompt.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => input?.focus(), 40);
  }

  function shouldAsk() {
    if (getName()) return false;
    try { if (sessionStorage.getItem(sessionSkipKey)) return false; } catch (_) {}
    return true;
  }

  function scheduleFirstAsk() {
    let introSeen = false;
    try { introSeen = Boolean(localStorage.getItem('fc-intro-seen')); } catch (_) {}
    const delay = introSeen ? 450 : 4200;
    window.setTimeout(() => {
      if (shouldAsk()) {
        openPrompt();
        return;
      }
      let skippedTeacher = false;
      try { skippedTeacher = Boolean(sessionStorage.getItem(teacherSkipKey)); } catch (_) {}
      if (!getTeacherChoice() && !skippedTeacher) openTeacherPrompt();
    }, delay);
  }

  document.querySelector('#changeNameBtn')?.addEventListener('click', () => openPrompt({ force: true }));
  document.querySelector('#changeTeacherBtn')?.addEventListener('click', () => openTeacherPrompt({ force: true }));
  window.addEventListener('fc-profile-name', () => {
    refreshSettings();
    refreshPersonalizedCopy();
  });
  refreshSettings();
  refreshPersonalizedCopy();

  const personalizationObserver = new MutationObserver(() => refreshPersonalizedCopy());
  personalizationObserver.observe(document.body, { childList: true, subtree: true });

  scheduleFirstAsk();

  window.FirstCometPersonalization = {
    getName,
    setName,
    askName: openPrompt,
    getTeacherChoice,
    setTeacherChoice,
    getTeacherAvatar,
    askTeacher: openTeacherPrompt,
    refresh: refreshPersonalizedCopy
  };
})();