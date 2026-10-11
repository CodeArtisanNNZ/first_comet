(() => {
  'use strict';

  const storageKey = 'fc-user-name-v1';
  const sessionSkipKey = 'fc-name-skip-session-v1';

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
    const name = getName();
    if (label) label.textContent = name || 'Not set yet';
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element && value) element.textContent = value;
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
      firstMilestone.textContent = name
        ? `${name}, get one simple page working. Nothing else yet.`
        : 'Get one simple page working. Nothing else yet.';
    }

    const emptyProject = [...document.querySelectorAll('.empty-project')].find((card) =>
      card.querySelector('span')?.textContent?.trim() === 'No projects yet'
    );
    const emptyProjectHint = emptyProject?.querySelector('small');
    if (emptyProjectHint) {
      emptyProjectHint.textContent = name ? `${name}, add your first project` : 'Add your first project';
    }

    const courseTitle = document.querySelector('#courseTrackTitle');
    if (courseTitle) {
      const current = courseTitle.textContent.trim();
      const withoutName = current.replace(/^.+?,\s+(?=[A-Za-z#+]+, in small words\.$)/, '');
      if (/^[A-Za-z#+]+, in small words\.$/.test(withoutName)) {
        courseTitle.textContent = name ? `${name}, ${withoutName}` : withoutName;
      }
    }
  }

  function closePrompt() {
    const prompt = document.querySelector('#fcNamePrompt');
    if (!prompt) return;
    prompt.classList.remove('open');
    prompt.setAttribute('aria-hidden', 'true');
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
    if (!shouldAsk()) return;
    let introSeen = false;
    try { introSeen = Boolean(localStorage.getItem('fc-intro-seen')); } catch (_) {}
    window.setTimeout(() => {
      if (shouldAsk()) openPrompt();
    }, introSeen ? 450 : 4200);
  }

  document.querySelector('#changeNameBtn')?.addEventListener('click', () => openPrompt({ force: true }));
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
    refresh: refreshPersonalizedCopy
  };
})();