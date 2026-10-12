(() => {
  'use strict';

  const storageKey = 'fc-user-name-v1';
  const sessionSkipKey = 'fc-name-skip-session-v1';
  const teacherChoiceKey = 'fc-teacher-choice-v1';
  const teacherSkipKey = 'fc-teacher-choice-skip-session-v1';
  const ageKey = 'fc-user-age-v1';
  const ageSkipKey = 'fc-user-age-skip-session-v1';
  const teacherAvatars = { female:"data:image/jpeg;base64,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", male:"assets/teacher-male.jpg" };

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

  function getAge() {
    try {
      const value = Number(localStorage.getItem(ageKey) || 0);
      return Number.isFinite(value) && value >= 8 && value <= 100 ? Math.floor(value) : 0;
    } catch (_) { return 0; }
  }

  function setAge(value) {
    const age = Math.floor(Number(value));
    if (!Number.isFinite(age) || age < 8 || age > 100) return 0;
    try { localStorage.setItem(ageKey, String(age)); } catch (_) {}
    document.body.dataset.ageMode = age > 20 ? 'adult-playful' : 'standard';
    window.dispatchEvent(new CustomEvent('fc-profile-age', { detail: { age } }));
    refreshSettings();
    return age;
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
    const ageLabel = document.querySelector('#personalAgeLabel');
    const name = getName();
    const teacher = getTeacherChoice();
    const age = getAge();
    if (label) label.textContent = name || 'Not set yet';
    if (teacherLabel) teacherLabel.textContent = teacher ? (teacher === 'female' ? 'Female teacher' : 'Male teacher') : 'Not chosen yet';
    if (ageLabel) ageLabel.textContent = age ? String(age) : 'Not set yet';
    document.body.dataset.teacher = teacher || '';
    document.body.dataset.ageMode = age > 20 ? 'adult-playful' : 'standard';
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

  function closeAgePrompt() {
    const prompt = document.querySelector('#fcAgePrompt');
    if (!prompt) return;
    prompt.classList.remove('open');
    prompt.setAttribute('aria-hidden', 'true');
  }

  function openAgePrompt(options = {}) {
    const force = Boolean(options.force);
    if (!force && getAge()) return;

    let prompt = document.querySelector('#fcAgePrompt');
    if (!prompt) {
      prompt = document.createElement('div');
      prompt.id = 'fcAgePrompt';
      prompt.className = 'fc-name-prompt fc-age-prompt';
      prompt.setAttribute('aria-hidden', 'true');
      prompt.innerHTML = `
        <div class="fc-name-card fc-age-card" role="dialog" aria-modal="true" aria-labelledby="fcAgeTitle">
          <span class="eyebrow">ONE LAST THING</span>
          <h2 id="fcAgeTitle">How old are you?</h2>
          <p>I use this only to keep your teacher's tone age-appropriate. For learners 20 or younger, the teacher stays strictly supportive. For 21+, the teacher can be a little more playful while staying respectful.</p>
          <label for="fcAgeInput">Your age</label>
          <input id="fcAgeInput" type="number" inputmode="numeric" min="8" max="100" step="1" placeholder="e.g. 22">
          <div class="fc-name-actions">
            <button type="button" class="secondary" data-age-skip>Prefer not to say</button>
            <button type="button" class="primary" data-age-save>Continue</button>
          </div>
          <small>Your age stays in this browser on this device. You can change it later in Settings.</small>
        </div>`;
      document.body.appendChild(prompt);

      const input = prompt.querySelector('#fcAgeInput');
      const save = () => {
        const age = setAge(input.value);
        if (!age) {
          input.focus();
          input.setAttribute('aria-invalid', 'true');
          return;
        }
        input.removeAttribute('aria-invalid');
        closeAgePrompt();
      };

      prompt.querySelector('[data-age-save]')?.addEventListener('click', save);
      input?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          save();
        }
      });
      prompt.querySelector('[data-age-skip]')?.addEventListener('click', () => {
        try { sessionStorage.setItem(ageSkipKey, '1'); } catch (_) {}
        closeAgePrompt();
      });
    }

    const input = prompt.querySelector('#fcAgeInput');
    if (input) input.value = getAge() || '';
    prompt.classList.add('open');
    prompt.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => input?.focus(), 40);
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
        window.setTimeout(() => {
          if (!getAge()) openAgePrompt();
        }, 180);
      });
      prompt.querySelector('[data-teacher-choice-skip]')?.addEventListener('click', () => {
        try { sessionStorage.setItem(teacherSkipKey, '1'); } catch (_) {}
        closeTeacherPrompt();
        window.setTimeout(() => {
          if (!getAge()) openAgePrompt();
        }, 180);
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
          else if (!getAge()) openAgePrompt();
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
          else if (!getAge()) openAgePrompt();
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
      let skippedAge = false;
      try { skippedTeacher = Boolean(sessionStorage.getItem(teacherSkipKey)); } catch (_) {}
      try { skippedAge = Boolean(sessionStorage.getItem(ageSkipKey)); } catch (_) {}
      if (!getTeacherChoice() && !skippedTeacher) {
        openTeacherPrompt();
        return;
      }
      if (!getAge() && !skippedAge) openAgePrompt();
    }, delay);
  }

  document.querySelector('#changeNameBtn')?.addEventListener('click', () => openPrompt({ force: true }));
  document.querySelector('#changeTeacherBtn')?.addEventListener('click', () => openTeacherPrompt({ force: true }));
  document.querySelector('#changeAgeBtn')?.addEventListener('click', () => openAgePrompt({ force: true }));
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
    getAge,
    setAge,
    askAge: openAgePrompt,
    refresh: refreshPersonalizedCopy
  };
})();