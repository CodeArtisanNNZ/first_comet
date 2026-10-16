(() => {
  'use strict';

  const root = document.querySelector('#owlPostApp');
  if (!root) return;

  const STORAGE_KEY = 'fc-owl-post-v1';
  const allCourses = () => Array.isArray(window.FC_BRACU_COURSES) ? window.FC_BRACU_COURSES : [];

  const esc = (value='') => String(value).replace(/[&<>"']/g, (ch) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[ch]);

  const readState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        open: Boolean(saved.open),
        studentId: String(saved.studentId || ''),
        department: saved.department || 'CSE',
        courses: Array.isArray(saved.courses) ? saved.courses : [],
        links: saved.links && typeof saved.links === 'object' ? saved.links : {}
      };
    } catch (_) {
      return { open:false, studentId:'', department:'CSE', courses:[], links:{} };
    }
  };

  let state = readState();

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  }

  function maskId(id) {
    const clean = String(id || '').replace(/\D/g,'');
    if (clean.length < 4) return 'Not verified';
    return '••••' + clean.slice(-4);
  }

  function validStudentId(value) {
    return /^\d{8}$/.test(String(value || '').trim());
  }

  function coursePicker() {
    const courses = allCourses();
    return `
      <div class="owl-step-head">
        <div><span class="owl-step-no">02</span><div><b>Choose this semester's courses</b><small>Only the courses you select will appear in your Owl Post.</small></div></div>
        <span class="owl-selected-count">${state.courses.length} selected</span>
      </div>
      <label class="owl-course-search">
        <span>Find course</span>
        <input type="search" data-owl-course-search placeholder="CSE330, database, graphics…" autocomplete="off">
      </label>
      <div class="owl-course-picker" data-owl-course-picker>
        ${courses.map((course) => {
          const selected = state.courses.includes(course.code);
          return `<button type="button" class="owl-course-choice${selected ? ' selected' : ''}" data-owl-course="${esc(course.code)}" aria-pressed="${selected}">
            <span>${selected ? '✓' : '+'}</span>
            <div><b>${esc(course.code)}</b><small>${esc(course.title)}</small></div>
          </button>`;
        }).join('')}
      </div>
      <button type="button" class="primary owl-build-post" data-owl-build ${state.courses.length ? '' : 'disabled'}>Build my Owl Post →</button>
    `;
  }

  function linkStatus(code) {
    const item = state.links[code];
    if (item?.url) {
      return `
        <div class="owl-link-ready">
          <span>CONNECTED</span>
          <b>${esc(item.platform || 'Course platform')}</b>
          <a href="${esc(item.url)}" target="_blank" rel="noopener">Open ↗</a>
        </div>
      `;
    }
    return `
      <div class="owl-link-pending">
        <span>COORDINATOR LINK</span>
        <b>Waiting to be added</b>
        <small>Slack, Discord, Classroom or another official course space.</small>
      </div>
    `;
  }

  function dashboard() {
    const courseMap = new Map(allCourses().map((c) => [c.code,c]));
    return `
      <section class="owl-dashboard">
        <header class="owl-profile-head">
          <div>
            <span class="eyebrow">OWL POST PROFILE</span>
            <h3>Your semester, one inbox.</h3>
            <p>Course communication links stay together instead of getting lost across different platforms.</p>
          </div>
          <div class="owl-profile-id"><span>BRACU STUDENT</span><b>${esc(maskId(state.studentId))}</b><small>${esc(state.department)}</small></div>
        </header>

        <div class="owl-dashboard-topline">
          <div><b>${state.courses.length} courses</b><span>in this semester</span></div>
          <button type="button" class="secondary" data-owl-edit>Edit courses</button>
        </div>

        <div class="owl-post-grid">
          ${state.courses.map((code,index) => {
            const c = courseMap.get(code) || {code,title:'Course'};
            return `
              <article class="owl-course-card">
                <div class="owl-course-card-head">
                  <span>${String(index+1).padStart(2,'0')}</span>
                  <div><b>${esc(c.code)}</b><small>${esc(c.title)}</small></div>
                </div>
                ${linkStatus(code)}
                <div class="owl-course-card-actions">
                  <button type="button" data-owl-add-link="${esc(code)}">Add platform link</button>
                  <a href="https://cse.bracu.ac.bd/course/view/${encodeURIComponent(code)}" target="_blank" rel="noopener">course page ↗</a>
                </div>
              </article>
            `;
          }).join('')}
        </div>

        <aside class="owl-privacy-note">
          <span>FRONTEND PROTOTYPE</span>
          <p>Your ID, selected courses and links are saved only in this browser for now. Real BRACU student verification needs an approved university data source/backend.</p>
        </aside>
      </section>
    `;
  }

  function setup() {
    root.innerHTML = `
      <section class="owl-post-shell">
        <header class="owl-post-hero">
          <div class="owl-mark" aria-hidden="true">🦉</div>
          <div class="owl-post-copy">
            <span class="eyebrow">FIRST COMET · BRACU</span>
            <div class="owl-wordmark"><h2>Owl Post</h2><span>beta</span></div>
            <p>Find where each course actually communicates. One student profile for your semester's Slack, Discord, Classroom and course spaces.</p>
            <div class="owl-benefits">
              <span>✓ one course inbox</span>
              <span>✓ section links in one place</span>
              <span>✓ no platform hunting</span>
            </div>
          </div>
          <div class="owl-launch-box">
            <span>THIS SEMESTER</span>
            <b>${state.courses.length ? state.courses.length + ' courses saved' : 'Set up your Owl Post'}</b>
            <button type="button" class="primary" data-owl-open>${state.open || state.courses.length ? 'Open Owl Post →' : 'Set up Owl Post →'}</button>
          </div>
        </header>

        <div class="owl-workspace" data-owl-workspace hidden>
          <div class="owl-workspace-bar">
            <div><span class="owl-live-dot"></span><b>OWL POST</b><small>BRACU communication finder</small></div>
            <button type="button" data-owl-close aria-label="Close Owl Post">×</button>
          </div>
          <div data-owl-body></div>
        </div>
      </section>
    `;

    root.querySelector('[data-owl-open]')?.addEventListener('click', () => {
      state.open = true;
      save();
      openWorkspace(state.courses.length ? 'dashboard' : 'verify');
    });
    root.querySelector('[data-owl-close]')?.addEventListener('click', () => {
      state.open = false;
      save();
      root.querySelector('[data-owl-workspace]').hidden = true;
    });

    if (state.open) openWorkspace(state.courses.length ? 'dashboard' : 'verify');
  }

  function openWorkspace(mode) {
    const workspace = root.querySelector('[data-owl-workspace]');
    const body = root.querySelector('[data-owl-body]');
    if (!workspace || !body) return;
    workspace.hidden = false;

    if (mode === 'dashboard' && state.courses.length) {
      body.innerHTML = dashboard();
      wireDashboard();
    } else if (mode === 'courses') {
      body.innerHTML = coursePicker();
      wireCoursePicker();
    } else {
      body.innerHTML = `
        <section class="owl-verify">
          <div class="owl-step-head">
            <div><span class="owl-step-no">01</span><div><b>Confirm you're a BRACU student</b><small>Prototype check only — no university database is connected yet.</small></div></div>
          </div>
          <div class="owl-verify-grid">
            <label><span>Student ID</span><input type="text" inputmode="numeric" maxlength="8" data-owl-id value="${esc(state.studentId)}" placeholder="24XXXXXX"></label>
            <label><span>Department</span><select data-owl-dept><option value="CSE" selected>CSE</option></select></label>
          </div>
          <p class="owl-form-note" data-owl-error>Use your 8-digit BRACU student ID. This prototype stores it only on this device.</p>
          <button type="button" class="primary" data-owl-verify>Continue →</button>
        </section>
      `;
      wireVerification();
    }

    workspace.scrollIntoView({behavior:'smooth',block:'start'});
    window.dispatchEvent(new CustomEvent('fc:teacher-context', {
      detail:{view:'bracu',label:'Owl Post',detail:'Organising course communication links',key:'bracu:owl-post'}
    }));
  }

  function wireVerification() {
    const id = root.querySelector('[data-owl-id]');
    const dept = root.querySelector('[data-owl-dept]');
    const error = root.querySelector('[data-owl-error]');
    root.querySelector('[data-owl-verify]')?.addEventListener('click', () => {
      const value = id?.value?.trim() || '';
      if (!validStudentId(value)) {
        error?.classList.add('error');
        id?.focus();
        return;
      }
      state.studentId = value;
      state.department = dept?.value || 'CSE';
      save();
      openWorkspace('courses');
    });
  }

  function wireCoursePicker() {
    const picker = root.querySelector('[data-owl-course-picker]');
    const search = root.querySelector('[data-owl-course-search]');
    const build = root.querySelector('[data-owl-build]');
    const counter = root.querySelector('.owl-selected-count');

    picker?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-owl-course]');
      if (!button) return;
      const code = button.dataset.owlCourse;
      if (state.courses.includes(code)) state.courses = state.courses.filter((item) => item !== code);
      else state.courses = [...state.courses, code].slice(0, 8);
      save();
      const selected = state.courses.includes(code);
      button.classList.toggle('selected',selected);
      button.setAttribute('aria-pressed',String(selected));
      button.querySelector('span').textContent = selected ? '✓' : '+';
      if (counter) counter.textContent = state.courses.length + ' selected';
      if (build) build.disabled = !state.courses.length;
    });

    search?.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      root.querySelectorAll('[data-owl-course]').forEach((button) => {
        button.hidden = Boolean(q) && !button.textContent.toLowerCase().includes(q);
      });
    });

    build?.addEventListener('click', () => openWorkspace('dashboard'));
  }

  function wireDashboard() {
    root.querySelector('[data-owl-edit]')?.addEventListener('click', () => openWorkspace('courses'));
    root.querySelectorAll('[data-owl-add-link]').forEach((button) => {
      button.addEventListener('click', () => {
        const code = button.dataset.owlAddLink;
        const platform = prompt('Platform name for ' + code + ' (for example: Slack or Discord)');
        if (!platform) return;
        const url = prompt('Paste the official course/section link');
        if (!url) return;
        let safe;
        try {
          const parsed = new URL(url);
          if (!/^https?:$/.test(parsed.protocol)) throw new Error('invalid');
          safe = parsed.href;
        } catch (_) {
          alert('Please paste a valid http/https link.');
          return;
        }
        state.links[code] = {platform:String(platform).slice(0,40),url:safe};
        save();
        openWorkspace('dashboard');
      });
    });
  }

  setup();
})();