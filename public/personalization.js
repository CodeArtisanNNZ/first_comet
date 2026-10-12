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