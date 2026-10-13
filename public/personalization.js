(() => {
  'use strict';

  const storageKey = 'fc-user-name-v1';
  const sessionSkipKey = 'fc-name-skip-session-v1';
  const teacherChoiceKey = 'fc-teacher-choice-v1';
  const teacherSkipKey = 'fc-teacher-choice-skip-session-v1';
  const ageKey = 'fc-user-age-v1';
  const ageSkipKey = 'fc-user-age-skip-session-v1';
  const teacherAvatars = { female: '/assets/teacher-female-face.jpg?v=20261013g', male: '/assets/teacher-male-face.jpg?v=20261013g' };

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