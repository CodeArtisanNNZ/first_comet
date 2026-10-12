(() => {
  'use strict';

  const storageKey = 'fc-user-name-v1';
  const sessionSkipKey = 'fc-name-skip-session-v1';
  const teacherChoiceKey = 'fc-teacher-choice-v1';
  const teacherSkipKey = 'fc-teacher-choice-skip-session-v1';
  const ageKey = 'fc-user-age-v1';
  const ageSkipKey = 'fc-user-age-skip-session-v1';
  const teacherAvatars = { female:"data:image/jpeg;base64,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" };

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
    if (ageLabel) ageLabel.textContent = age
      ? age + (age > 20 ? ' · light playful teacher tone' : ' · supportive teacher tone')
      : 'Not set yet · supportive tone';
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
          <p>I use this only to keep your teacher's tone age-appropriate. At 20 or younger—or if you prefer not to say—the teacher stays fully supportive and neutral. At 21+, you can get occasional light, respectful teasing and compliments.</p>
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