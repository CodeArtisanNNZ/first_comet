(() => {
  'use strict';

  const root = document.querySelector('#owlPostApp');
  if (!root) return;

  const STORAGE_KEY = 'fc-owl-post-v2';
  const LEGACY_KEY = 'fc-owl-post-v1';
  const now = () => new Date().toISOString();

  const esc = (value='') => String(value).replace(/[&<>"']/g, (ch) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[ch]);

  const slug = (value='') => String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-|-$/g,'')
    .slice(0,40);

  const allCourses = () => Array.isArray(window.FC_BRACU_COURSES) ? window.FC_BRACU_COURSES : [];
  const courseMap = () => new Map(allCourses().map((course) => [course.code, course]));

  function defaultWorkspace(code, section='01') {
    const title = courseMap().get(code)?.title || 'Course';
    return {
      code,
      title,
      coordinator:'Course Coordinator',
      description:'Official course communication space for announcements, questions, resources and section updates.',
      verification:{
        id:true,
        universityEmail:false,
        rules:true,
        sectionLocked:true
      },
      rules:[
        'Use your verified BRACU identity.',
        'Keep discussion related to the course.',
        'Be respectful to faculty, TAs and classmates.',
        'Do not share assessment answers or restricted materials.'
      ],
      links:[
        {id:'course-page',label:'Official course page',url:'https://cse.bracu.ac.bd/course/view/' + encodeURIComponent(code)}
      ],
      channels:[
        {id:'announcements',name:'announcements',kind:'announcement',scope:'all',section:'',posting:'staff',topic:'Official notices from the course team.'},
        {id:'general',name:'general',kind:'chat',scope:'all',section:'',posting:'everyone',topic:'Questions and discussion for everyone enrolled.'},
        {id:'resources',name:'resources',kind:'resource',scope:'all',section:'',posting:'staff',topic:'Slides, files, recordings and useful links.'},
        {id:'assignment-help',name:'assignment-help',kind:'chat',scope:'all',section:'',posting:'everyone',topic:'Ask for clarification without sharing restricted solutions.'},
        {id:'section-' + section,name:'section-' + section,kind:'chat',scope:'section',section,posting:'everyone',topic:'Private space for Section ' + section + '.'}
      ],
      messages:{
        announcements:[
          {id:'m1',author:'Course Coordinator',role:'Coordinator',body:'Welcome to ' + code + ' on Owl Post. Important course notices will appear here.',time:now(),pinned:true,reactions:{'✓':3}}
        ],
        general:[
          {id:'m2',author:'Course Coordinator',role:'Coordinator',body:'Use this channel for course-wide questions. Check the section channel for section-specific updates.',time:now(),pinned:false,reactions:{}}
        ],
        resources:[
          {id:'m3',author:'Course Coordinator',role:'Coordinator',body:'Course resources will be pinned here as they are shared.',time:now(),pinned:true,reactions:{}}
        ],
        'assignment-help':[],
        ['section-' + section]:[
          {id:'m4',author:'Course Coordinator',role:'Coordinator',body:'Section ' + section + ' is verified. This channel is visible only to students in this section.',time:now(),pinned:false,reactions:{}}
        ]
      }
    };
  }

  function safeLegacy() {
    try { return JSON.parse(localStorage.getItem(LEGACY_KEY) || '{}') || {}; }
    catch (_) { return {}; }
  }

  function initialState() {
    const legacy = safeLegacy();
    const legacyCourses = Array.isArray(legacy.courses) ? legacy.courses.slice(0,8) : [];
    const enrollments = legacyCourses.map((code,index) => ({code,section:String((index % 3) + 1).padStart(2,'0')}));
    const workspaces = {};
    enrollments.forEach((item) => { workspaces[item.code] = defaultWorkspace(item.code,item.section); });
    return {
      open:Boolean(legacy.open),
      role:'student',
      verified:Boolean(legacy.studentId),
      studentId:String(legacy.studentId || ''),
      department:legacy.department || 'CSE',
      universityEmail:'',
      enrollments,
      activeCourse:enrollments[0]?.code || '',
      activeChannel:'general',
      rulesAccepted:{},
      workspaces,
      coordinatorCourse:enrollments[0]?.code || 'CSE110',
      coordinatorStudio:false,
      infoOpen:true,
      replyTo:null
    };
  }

  function readState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved) return initialState();
      return {
        ...initialState(),
        ...saved,
        enrollments:Array.isArray(saved.enrollments) ? saved.enrollments : [],
        rulesAccepted:saved.rulesAccepted && typeof saved.rulesAccepted === 'object' ? saved.rulesAccepted : {},
        workspaces:saved.workspaces && typeof saved.workspaces === 'object' ? saved.workspaces : {}
      };
    } catch (_) {
      return initialState();
    }
  }

  let state = readState();

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  }

  function validStudentId(value) {
    return /^\d{8}$/.test(String(value || '').trim());
  }

  function maskId(id) {
    const clean = String(id || '').replace(/\D/g,'');
    return clean.length >= 4 ? '••••' + clean.slice(-4) : 'Not verified';
  }

  function enrollmentFor(code) {
    return state.enrollments.find((item) => item.code === code) || null;
  }

  function ensureWorkspace(code) {
    if (!code) return null;
    const section = enrollmentFor(code)?.section || '01';
    if (!state.workspaces[code]) state.workspaces[code] = defaultWorkspace(code,section);
    const workspace = state.workspaces[code];
    workspace.channels ||= [];
    workspace.messages ||= {};
    workspace.rules ||= [];
    workspace.links ||= [];
    workspace.verification ||= {id:true,universityEmail:false,rules:true,sectionLocked:true};
    workspace.channels.forEach((channel) => { workspace.messages[channel.id] ||= []; });
    return workspace;
  }

  function allowedCourses() {
    if (state.role === 'coordinator') {
      const code = state.coordinatorCourse || state.activeCourse || state.enrollments[0]?.code || 'CSE110';
      ensureWorkspace(code);
      return [{code,section:'ALL'}];
    }
    return state.enrollments;
  }

  function allowedChannels(workspace) {
    if (!workspace) return [];
    if (state.role === 'coordinator') return workspace.channels;
    const section = enrollmentFor(workspace.code)?.section || '';
    return workspace.channels.filter((channel) => channel.scope !== 'section' || channel.section === section);
  }

  function canPost(channel) {
    if (!channel) return false;
    if (state.role === 'coordinator') return true;
    return channel.posting === 'everyone';
  }

  function ensureActiveSelection() {
    const courses = allowedCourses();
    if (!courses.length) {
      state.activeCourse = '';
      state.activeChannel = '';
      return;
    }
    if (!courses.some((item) => item.code === state.activeCourse)) {
      state.activeCourse = courses[0].code;
    }
    const workspace = ensureWorkspace(state.activeCourse);
    const channels = allowedChannels(workspace);
    if (!channels.some((channel) => channel.id === state.activeChannel)) {
      state.activeChannel = channels[0]?.id || '';
    }
  }

  function courseLabel(code) {
    const course = courseMap().get(code);
    return course?.title || state.workspaces[code]?.title || 'Course';
  }

  function displayName() {
    return window.FirstCometPersonalization?.getName?.() || (state.role === 'coordinator' ? 'Course Coordinator' : 'Student');
  }

  function verificationScreen() {
    return `
      <section class="owl-gate">
        <div class="owl-gate-copy">
          <span class="eyebrow">OWL POST · VERIFIED COURSE COMMUNICATION</span>
          <h3>Start with your BRACU identity.</h3>
          <p>In production, Owl Post should verify a student against an approved BRACU enrollment source. This frontend prototype checks the ID format and lets you preview the full messaging experience locally.</p>
        </div>
        <div class="owl-gate-card">
          <label><span>Student ID</span><input data-owl-id inputmode="numeric" maxlength="8" value="${esc(state.studentId)}" placeholder="24XXXXXX"></label>
          <label><span>Department</span><select data-owl-dept><option value="CSE">CSE</option></select></label>
          <label><span>University email <i>optional in prototype</i></span><input data-owl-email type="email" value="${esc(state.universityEmail)}" placeholder="name@g.bracu.ac.bd"></label>
          <p data-owl-gate-error>Use an 8-digit BRACU student ID.</p>
          <button type="button" class="primary" data-owl-verify>Continue to semester enrollment →</button>
        </div>
      </section>
    `;
  }

  function enrollmentScreen() {
    const courses = allCourses();
    return `
      <section class="owl-enrollment">
        <header>
          <div><span class="eyebrow">PROTOTYPE ENROLLMENT</span><h3>Which courses are on your semester?</h3><p>Production Owl Post should receive this from verified registration data. Students should not be able to join arbitrary courses.</p></div>
          <div class="owl-enrollment-id"><span>VERIFIED ID</span><b>${esc(maskId(state.studentId))}</b></div>
        </header>
        <label class="owl-course-search"><span>Find course</span><input type="search" data-owl-course-search placeholder="CSE330, database, graphics…" autocomplete="off"></label>
        <div class="owl-enrollment-grid">
          ${courses.map((course) => {
            const existing = enrollmentFor(course.code);
            return `
              <article class="owl-enroll-course${existing ? ' selected' : ''}" data-owl-enroll-card="${esc(course.code)}">
                <button type="button" data-owl-enroll="${esc(course.code)}" aria-pressed="${Boolean(existing)}">
                  <span>${existing ? '✓' : '+'}</span>
                  <div><b>${esc(course.code)}</b><small>${esc(course.title)}</small></div>
                </button>
                <label><span>Section</span><select data-owl-section="${esc(course.code)}" ${existing ? '' : 'disabled'}>
                  ${['01','02','03','04','05','06','07','08','09','10'].map((section) => `<option value="${section}" ${existing?.section === section ? 'selected' : ''}>${section}</option>`).join('')}
                </select></label>
              </article>
            `;
          }).join('')}
        </div>
        <div class="owl-enrollment-actions">
          <span data-owl-enrollment-count>${state.enrollments.length} courses selected</span>
          <button type="button" class="primary" data-owl-enter ${state.enrollments.length ? '' : 'disabled'}>Enter Owl Post →</button>
        </div>
      </section>
    `;
  }

  function rulesGate(workspace) {
    if (!workspace.verification.rules || state.role === 'coordinator' || state.rulesAccepted[workspace.code]) return '';
    return `
      <section class="owl-rules-gate">
        
        <span class="eyebrow">${esc(workspace.code)} · BEFORE YOU ENTER</span>
        <h3>Read the course rules.</h3>
        <p>Your coordinator requires students to accept these rules before posting or reading course chat.</p>
        <ol>${workspace.rules.map((rule) => `<li>${esc(rule)}</li>`).join('')}</ol>
        <div class="owl-verification-badges">
          ${workspace.verification.id ? '<span>✓ Student ID verified</span>' : ''}
          ${workspace.verification.sectionLocked ? '<span>✓ Section access enforced</span>' : ''}
          ${workspace.verification.universityEmail ? '<span>✓ University email required</span>' : ''}
        </div>
        <button type="button" class="primary" data-owl-accept-rules="${esc(workspace.code)}">I understand · Enter course →</button>
      </section>
    `;
  }

  function courseRail(courses) {
    return `
      <nav class="owl-course-rail" aria-label="Enrolled courses">
        <div class="owl-course-rail-brand" title="Owl Post"><img src="/assets/owl-post-mark.webp?v=official-20261016" alt=""></div>
        <div class="owl-course-rail-list">
          ${courses.map((item) => `
            <button type="button" class="${item.code === state.activeCourse ? 'active' : ''}" data-owl-switch-course="${esc(item.code)}" title="${esc(item.code + ' · ' + courseLabel(item.code))}">
              <b>${esc(item.code.replace('CSE',''))}</b><small>${esc(item.code)}</small>
            </button>
          `).join('')}
        </div>
        <button type="button" class="owl-course-rail-settings" data-owl-edit-enrollment title="Semester courses">＋</button>
      </nav>
    `;
  }

  function channelSidebar(workspace) {
    const channels = allowedChannels(workspace);
    const grouped = [
      ['COURSE',channels.filter((channel) => channel.scope === 'all')],
      ['YOUR SECTION',channels.filter((channel) => channel.scope === 'section')],
      ['PRIVATE',channels.filter((channel) => channel.scope === 'private')]
    ].filter(([,items]) => items.length);

    return `
      <aside class="owl-channel-sidebar">
        <header>
          <div><span>${esc(workspace.code)}</span><b>${esc(workspace.title)}</b></div>
          ${state.role === 'coordinator' ? '<button type="button" data-owl-studio title="Coordinator Studio">⚙</button>' : ''}
        </header>
        <div class="owl-channel-profile">
          <span>${state.role === 'coordinator' ? 'COORDINATOR VIEW' : 'SECTION ' + esc(enrollmentFor(workspace.code)?.section || '—')}</span>
          <small>${state.role === 'coordinator' ? 'Manage channels and access' : 'Verified enrollment access'}</small>
        </div>
        <div class="owl-channel-groups">
          ${grouped.map(([label,items]) => `
            <section>
              <div class="owl-channel-group-title"><span>${label}</span>${state.role === 'coordinator' ? '<button type="button" data-owl-new-channel title="Create channel">＋</button>' : ''}</div>
              ${items.map((channel) => `
                <button type="button" class="owl-channel-item${channel.id === state.activeChannel ? ' active' : ''}" data-owl-channel="${esc(channel.id)}">
                  <span>${channel.kind === 'announcement' ? '◉' : channel.kind === 'resource' ? '▱' : '#'}</span>
                  <b>${esc(channel.name)}</b>
                  ${channel.posting === 'staff' ? '<i>read only</i>' : ''}
                </button>
              `).join('')}
            </section>
          `).join('')}
        </div>
        <footer>
          <div class="owl-user-chip">
            <span>${esc((displayName()[0] || 'S').toUpperCase())}</span>
            <div><b>${esc(displayName())}</b><small>${state.role === 'coordinator' ? 'Course Coordinator' : maskId(state.studentId)}</small></div>
          </div>
        </footer>
      </aside>
    `;
  }

  function messageBubble(message, channel) {
    const own = message.author === displayName();
    const time = new Date(message.time || Date.now()).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
    const roleClass = message.role === 'Coordinator' ? ' coordinator' : '';
    return `
      <article class="owl-message${own ? ' own' : ''}${roleClass}" data-owl-message="${esc(message.id)}">
        <div class="owl-message-avatar">${esc((message.author?.[0] || '?').toUpperCase())}</div>
        <div class="owl-message-body">
          <header><b>${esc(message.author)}</b>${message.role ? `<span>${esc(message.role)}</span>` : ''}<time>${esc(time)}</time>${message.pinned ? '<i>PINNED</i>' : ''}</header>
          ${message.replyTo ? `<div class="owl-message-reply">↳ replying to ${esc(message.replyTo)}</div>` : ''}
          <p>${esc(message.body).replace(/\n/g,'<br>')}</p>
          <footer>
            ${Object.entries(message.reactions || {}).map(([emoji,count]) => `<button type="button" data-owl-react="${esc(message.id)}" data-owl-emoji="${esc(emoji)}">${esc(emoji)} <span>${Number(count)||0}</span></button>`).join('')}
            <button type="button" data-owl-react="${esc(message.id)}" data-owl-emoji="👍">＋ react</button>
            ${canPost(channel) ? `<button type="button" data-owl-reply="${esc(message.id)}">reply</button>` : ''}
            ${state.role === 'coordinator' ? `<button type="button" data-owl-pin="${esc(message.id)}">${message.pinned ? 'unpin' : 'pin'}</button>` : ''}
          </footer>
        </div>
      </article>
    `;
  }

  function chatMain(workspace) {
    const channel = workspace.channels.find((item) => item.id === state.activeChannel) || allowedChannels(workspace)[0];
    if (!channel) return '<main class="owl-chat-main"><div class="owl-empty">No accessible channels yet.</div></main>';
    state.activeChannel = channel.id;
    const messages = workspace.messages[channel.id] || [];
    const posting = canPost(channel);

    return `
      <main class="owl-chat-main">
        <header class="owl-chat-header">
          <div><span>${channel.kind === 'announcement' ? '◉' : '#'}</span><div><b>${esc(channel.name)}</b><small>${esc(channel.topic || 'Course channel')}</small></div></div>
          <div>
            <button type="button" data-owl-search title="Search messages">⌕</button>
            <button type="button" data-owl-toggle-info title="Course details">ⓘ</button>
          </div>
        </header>
        <div class="owl-chat-feed" data-owl-feed>
          <div class="owl-channel-intro">
            <span>${channel.kind === 'announcement' ? '◉' : '#'}</span>
            <h3>${esc(channel.name)}</h3>
            <p>${esc(channel.topic || '')}</p>
            ${channel.scope === 'section' ? `<small>Visible only to verified Section ${esc(channel.section)} students and course staff.</small>` : ''}
          </div>
          ${messages.length ? messages.map((message) => messageBubble(message,channel)).join('') : '<div class="owl-empty-messages"><b>No messages yet.</b><span>Start the conversation when you have something useful to add.</span></div>'}
        </div>
        <div class="owl-composer-wrap">
          ${state.replyTo ? `<div class="owl-replying"><span>Replying to ${esc(state.replyTo.author)}</span><button type="button" data-owl-cancel-reply>×</button></div>` : ''}
          ${posting ? `
            <form class="owl-composer" data-owl-composer>
              <button type="button" title="Attach file (prototype)">＋</button>
              <textarea rows="1" maxlength="1500" data-owl-message-input placeholder="Message #${esc(channel.name)}"></textarea>
              <button type="submit">Send</button>
            </form>
            <small class="owl-composer-note">Enter sends · Shift+Enter adds a line · local prototype only</small>
          ` : `
            <div class="owl-readonly"><b>Read-only channel</b><span>Only the course team can post here.</span></div>
          `}
        </div>
      </main>
    `;
  }

  function infoPanel(workspace) {
    const section = enrollmentFor(workspace.code)?.section || '—';
    return `
      <aside class="owl-info-panel${state.infoOpen ? '' : ' closed'}">
        <header><b>Course details</b><button type="button" data-owl-toggle-info>×</button></header>
        <section class="owl-info-course">
          <span class="eyebrow">WORKSPACE</span>
          <h4>${esc(workspace.code)}</h4>
          <p>${esc(workspace.description)}</p>
          <div><span>Coordinator</span><b>${esc(workspace.coordinator)}</b></div>
          ${state.role === 'student' ? `<div><span>Your section</span><b>${esc(section)}</b></div>` : ''}
        </section>
        <section>
          <div class="owl-info-heading"><b>Course rules</b><span>${workspace.rules.length}</span></div>
          <ol class="owl-info-rules">${workspace.rules.map((rule) => `<li>${esc(rule)}</li>`).join('')}</ol>
        </section>
        <section>
          <div class="owl-info-heading"><b>Links & resources</b><span>${workspace.links.length}</span></div>
          <div class="owl-info-links">
            ${workspace.links.map((link) => `<a href="${esc(link.url)}" target="_blank" rel="noopener"><span>↗</span><div><b>${esc(link.label)}</b><small>${esc(new URL(link.url,location.href).hostname)}</small></div></a>`).join('')}
          </div>
        </section>
        <section>
          <div class="owl-info-heading"><b>Access</b></div>
          <div class="owl-access-list">
            <span class="${workspace.verification.id ? 'on' : ''}">ID verification</span>
            <span class="${workspace.verification.sectionLocked ? 'on' : ''}">Section locked</span>
            <span class="${workspace.verification.rules ? 'on' : ''}">Rules required</span>
            <span class="${workspace.verification.universityEmail ? 'on' : ''}">University email</span>
          </div>
        </section>
      </aside>
    `;
  }

  function workspaceScreen() {
    ensureActiveSelection();
    const courses = allowedCourses();
    const workspace = ensureWorkspace(state.activeCourse);

    if (!courses.length) return enrollmentScreen();
    if (!workspace) return '<div class="owl-empty">Choose a course.</div>';

    const gate = rulesGate(workspace);
    if (gate) {
      return `<div class="owl-messenger">${courseRail(courses)}${channelSidebar(workspace)}<div class="owl-gated-main">${gate}</div>${infoPanel(workspace)}</div>`;
    }

    return `
      <div class="owl-messenger">
        ${courseRail(courses)}
        ${channelSidebar(workspace)}
        ${chatMain(workspace)}
        ${infoPanel(workspace)}
      </div>
      ${state.coordinatorStudio ? coordinatorStudio(workspace) : ''}
    `;
  }

  function coordinatorStudio(workspace) {
    return `
      <div class="owl-studio-backdrop" data-owl-studio-close>
        <section class="owl-studio" role="dialog" aria-modal="true" aria-label="Coordinator Studio" data-owl-studio-panel>
          <header>
            <div><span class="eyebrow">COORDINATOR STUDIO</span><h3>${esc(workspace.code)} workspace controls</h3><p>Create channels, set verification, manage rules and publish official links.</p></div>
            <button type="button" data-owl-studio-close>×</button>
          </header>

          <div class="owl-studio-grid">
            <section>
              <div class="owl-studio-title"><b>Access & verification</b><small>Applied before students enter.</small></div>
              <label class="owl-switch-row"><span><b>Student ID verification</b><small>Require verified BRACU identity.</small></span><input type="checkbox" data-owl-setting="id" ${workspace.verification.id ? 'checked' : ''}></label>
              <label class="owl-switch-row"><span><b>Rules acceptance</b><small>Students accept rules before chat.</small></span><input type="checkbox" data-owl-setting="rules" ${workspace.verification.rules ? 'checked' : ''}></label>
              <label class="owl-switch-row"><span><b>Section locking</b><small>Section channels use enrollment section.</small></span><input type="checkbox" data-owl-setting="sectionLocked" ${workspace.verification.sectionLocked ? 'checked' : ''}></label>
              <label class="owl-switch-row"><span><b>University email</b><small>Require @g.bracu.ac.bd in production.</small></span><input type="checkbox" data-owl-setting="universityEmail" ${workspace.verification.universityEmail ? 'checked' : ''}></label>
            </section>

            <section>
              <div class="owl-studio-title"><b>Create channel</b><small>Choose who can see and post.</small></div>
              <form class="owl-studio-form" data-owl-channel-form>
                <label><span>Name</span><input name="name" maxlength="32" placeholder="lab-help" required></label>
                <div class="owl-studio-two">
                  <label><span>Visibility</span><select name="scope"><option value="all">Entire course</option><option value="section">One section</option></select></label>
                  <label><span>Section</span><select name="section"><option>01</option><option>02</option><option>03</option><option>04</option><option>05</option><option>06</option><option>07</option><option>08</option><option>09</option><option>10</option></select></label>
                </div>
                <label><span>Posting</span><select name="posting"><option value="everyone">Students + staff</option><option value="staff">Staff only / read-only</option></select></label>
                <label><span>Purpose</span><input name="topic" maxlength="90" placeholder="What belongs in this channel?"></label>
                <button type="submit" class="primary">Create channel</button>
              </form>
            </section>

            <section>
              <div class="owl-studio-title"><b>Course rules</b><small>Visible in the course gate and info panel.</small></div>
              <div class="owl-studio-list">
                ${workspace.rules.map((rule,index) => `<div><span>${esc(rule)}</span><button type="button" data-owl-delete-rule="${index}">×</button></div>`).join('')}
              </div>
              <form class="owl-inline-add" data-owl-rule-form><input name="rule" maxlength="140" placeholder="Add a course rule…" required><button>Add</button></form>
            </section>

            <section>
              <div class="owl-studio-title"><b>Official links</b><small>Add Meet, Drive, Classroom, GitHub or anything course-related.</small></div>
              <div class="owl-studio-list">
                ${workspace.links.map((link,index) => `<div><span><b>${esc(link.label)}</b><small>${esc(link.url)}</small></span><button type="button" data-owl-delete-link="${index}">×</button></div>`).join('')}
              </div>
              <form class="owl-link-add" data-owl-link-form>
                <input name="label" maxlength="40" placeholder="Google Drive" required>
                <input name="url" type="url" placeholder="https://…" required>
                <button>Add link</button>
              </form>
            </section>
          </div>
          <footer><span>Prototype controls are stored only in this browser.</span><button type="button" class="secondary" data-owl-studio-close>Done</button></footer>
        </section>
      </div>
    `;
  }

  function shell() {
    const enrolledCount = state.enrollments.length;
    return `
      <section class="owl-post-shell">
        <header class="owl-post-hero">
          <div class="owl-mark"><img src="data:image/webp;base64,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" alt="Owl Post official logo"></div>
          <div class="owl-post-copy">
            <span class="eyebrow">FIRST COMET · BRACU</span>
            <div class="owl-wordmark"><h2>Owl Post</h2><span>prototype</span></div>
            <p>A verified course messaging space for announcements, section channels, resources and real course conversation—without sending students across five different apps.</p>
            <div class="owl-credit"><span>IDEA BY</span><b>Younus Mohammad Maheer</b></div>
            <div class="owl-benefits"><span>✓ enrollment-gated courses</span><span>✓ section channels</span><span>✓ coordinator controls</span></div>
          </div>
          <div class="owl-launch-box">
            <span>ACADEMIC MESSAGING</span>
            <b>${enrolledCount ? enrolledCount + ' semester courses' : 'Set up your semester'}</b>
            <button type="button" class="primary" data-owl-open>${state.open ? 'Open workspace →' : 'Launch Owl Post →'}</button>
          </div>
        </header>

        <div class="owl-workspace" data-owl-workspace ${state.open ? '' : 'hidden'}>
          <div class="owl-workspace-bar">
            <div><img class="owl-workspace-logo" src="/assets/owl-post-mark.webp?v=official-20261016" alt=""><span class="owl-live-dot"></span><b>OWL POST</b><small>course messaging prototype</small></div>
            <div class="owl-workspace-role">
              <span>Preview as</span>
              <button type="button" data-owl-role="student" class="${state.role === 'student' ? 'active' : ''}">Student</button>
              <button type="button" data-owl-role="coordinator" class="${state.role === 'coordinator' ? 'active' : ''}">Coordinator</button>
              <button type="button" data-owl-close aria-label="Close Owl Post">×</button>
            </div>
          </div>
          <div data-owl-body></div>
        </div>
      </section>
    `;
  }

  function renderBody(mode='auto') {
    const body = root.querySelector('[data-owl-body]');
    if (!body) return;

    if (mode === 'verify' || (!state.verified && state.role === 'student')) {
      body.innerHTML = verificationScreen();
      wireVerification();
      return;
    }

    if (mode === 'enrollment') {
      body.innerHTML = enrollmentScreen();
      wireEnrollment();
      return;
    }

    if (state.role === 'student' && !state.enrollments.length) {
      body.innerHTML = enrollmentScreen();
      wireEnrollment();
      return;
    }

    ensureActiveSelection();
    body.innerHTML = workspaceScreen();
    wireWorkspace();
  }

  function render() {
    root.innerHTML = shell();

    root.querySelector('[data-owl-open]')?.addEventListener('click', () => {
      state.open = true;
      save();
      root.querySelector('[data-owl-workspace]').hidden = false;
      renderBody();
      root.querySelector('[data-owl-workspace]')?.scrollIntoView({behavior:'smooth',block:'start'});
    });

    root.querySelector('[data-owl-close]')?.addEventListener('click', () => {
      state.open = false;
      save();
      render();
    });

    root.querySelectorAll('[data-owl-role]').forEach((button) => {
      button.addEventListener('click', () => {
        state.role = button.dataset.owlRole;
        state.coordinatorStudio = false;
        if (state.role === 'coordinator') {
          state.coordinatorCourse ||= state.activeCourse || state.enrollments[0]?.code || 'CSE110';
          state.activeCourse = state.coordinatorCourse;
        } else if (state.enrollments.length) {
          state.activeCourse = state.enrollments.some((item) => item.code === state.activeCourse) ? state.activeCourse : state.enrollments[0].code;
        }
        ensureActiveSelection();
        save();
        render();
        if (state.open) renderBody();
      });
    });

    if (state.open) renderBody();

    window.dispatchEvent(new CustomEvent('fc:teacher-context', {
      detail:{view:'bracu',label:'Owl Post',detail:'Verified course messaging and section communication',key:'bracu:owl-post'}
    }));
  }

  function wireVerification() {
    const id = root.querySelector('[data-owl-id]');
    const email = root.querySelector('[data-owl-email]');
    const error = root.querySelector('[data-owl-gate-error]');
    root.querySelector('[data-owl-verify]')?.addEventListener('click', () => {
      const value = id?.value?.trim() || '';
      if (!validStudentId(value)) {
        error?.classList.add('error');
        id?.focus();
        return;
      }
      state.studentId = value;
      state.department = root.querySelector('[data-owl-dept]')?.value || 'CSE';
      state.universityEmail = email?.value?.trim() || '';
      state.verified = true;
      save();
      renderBody('enrollment');
    });
  }

  function wireEnrollment() {
    const search = root.querySelector('[data-owl-course-search]');
    const count = root.querySelector('[data-owl-enrollment-count]');
    const enter = root.querySelector('[data-owl-enter]');

    root.querySelectorAll('[data-owl-enroll]').forEach((button) => {
      button.addEventListener('click', () => {
        const code = button.dataset.owlEnroll;
        const existing = enrollmentFor(code);
        if (existing) {
          state.enrollments = state.enrollments.filter((item) => item.code !== code);
          if (state.activeCourse === code) state.activeCourse = state.enrollments[0]?.code || '';
        } else {
          const section = root.querySelector('[data-owl-section="' + code + '"]')?.value || '01';
          state.enrollments.push({code,section});
          ensureWorkspace(code);
          state.activeCourse ||= code;
        }
        const selected = Boolean(enrollmentFor(code));
        const card = root.querySelector('[data-owl-enroll-card="' + code + '"]');
        card?.classList.toggle('selected',selected);
        button.setAttribute('aria-pressed',String(selected));
        button.querySelector('span').textContent = selected ? '✓' : '+';
        const select = root.querySelector('[data-owl-section="' + code + '"]');
        if (select) select.disabled = !selected;
        if (count) count.textContent = state.enrollments.length + ' courses selected';
        if (enter) enter.disabled = !state.enrollments.length;
        save();
      });
    });

    root.querySelectorAll('[data-owl-section]').forEach((select) => {
      select.addEventListener('change', () => {
        const item = enrollmentFor(select.dataset.owlSection);
        if (!item) return;
        item.section = select.value;
        const workspace = ensureWorkspace(item.code);
        if (!workspace.channels.some((channel) => channel.scope === 'section' && channel.section === item.section)) {
          const id = 'section-' + item.section;
          workspace.channels.push({id,name:id,kind:'chat',scope:'section',section:item.section,posting:'everyone',topic:'Private space for Section ' + item.section + '.'});
          workspace.messages[id] = [{id:'m-' + Date.now(),author:'Course Coordinator',role:'Coordinator',body:'Section ' + item.section + ' is verified. This channel is visible only to students in this section.',time:now(),pinned:false,reactions:{}}];
        }
        save();
      });
    });

    search?.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      root.querySelectorAll('[data-owl-enroll-card]').forEach((card) => {
        card.hidden = Boolean(q) && !card.textContent.toLowerCase().includes(q);
      });
    });

    enter?.addEventListener('click', () => {
      ensureActiveSelection();
      save();
      renderBody();
    });
  }

  function wireWorkspace() {
    const workspace = ensureWorkspace(state.activeCourse);
    if (!workspace) return;

    root.querySelectorAll('[data-owl-switch-course]').forEach((button) => {
      button.addEventListener('click', () => {
        state.activeCourse = button.dataset.owlSwitchCourse;
        if (state.role === 'coordinator') state.coordinatorCourse = state.activeCourse;
        const next = ensureWorkspace(state.activeCourse);
        state.activeChannel = allowedChannels(next)[0]?.id || '';
        state.replyTo = null;
        save();
        renderBody();
      });
    });

    root.querySelectorAll('[data-owl-channel]').forEach((button) => {
      button.addEventListener('click', () => {
        state.activeChannel = button.dataset.owlChannel;
        state.replyTo = null;
        save();
        renderBody();
      });
    });

    root.querySelectorAll('[data-owl-toggle-info]').forEach((button) => {
      button.addEventListener('click', () => {
        state.infoOpen = !state.infoOpen;
        save();
        renderBody();
      });
    });

    root.querySelector('[data-owl-edit-enrollment]')?.addEventListener('click', () => {
      if (state.role === 'student') renderBody('enrollment');
      else {
        state.coordinatorStudio = true;
        renderBody();
      }
    });

    root.querySelector('[data-owl-accept-rules]')?.addEventListener('click', (event) => {
      state.rulesAccepted[event.currentTarget.dataset.owlAcceptRules] = true;
      save();
      renderBody();
    });

    root.querySelectorAll('[data-owl-studio],[data-owl-new-channel]').forEach((button) => {
      button.addEventListener('click', () => {
        state.coordinatorStudio = true;
        save();
        renderBody();
      });
    });

    root.querySelectorAll('[data-owl-studio-close]').forEach((button) => {
      button.addEventListener('click', (event) => {
        if (event.target.closest('[data-owl-studio-panel]') && !event.target.matches('[data-owl-studio-close]')) return;
        state.coordinatorStudio = false;
        save();
        renderBody();
      });
    });
    root.querySelector('[data-owl-studio-panel]')?.addEventListener('click',(event) => event.stopPropagation());

    wireCoordinatorStudio(workspace);
    wireChat(workspace);

    const feed = root.querySelector('[data-owl-feed]');
    if (feed) feed.scrollTop = feed.scrollHeight;
  }

  function wireChat(workspace) {
    const channel = workspace.channels.find((item) => item.id === state.activeChannel);
    if (!channel) return;

    const form = root.querySelector('[data-owl-composer]');
    const input = root.querySelector('[data-owl-message-input]');

    input?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form?.requestSubmit();
      }
    });

    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      const body = input?.value?.trim() || '';
      if (!body || !canPost(channel)) return;
      const role = state.role === 'coordinator' ? 'Coordinator' : 'Student';
      workspace.messages[channel.id].push({
        id:'msg-' + Date.now(),
        author:displayName(),
        role,
        body,
        time:now(),
        pinned:false,
        reactions:{},
        replyTo:state.replyTo?.author || ''
      });
      state.replyTo = null;
      save();
      renderBody();
    });

    root.querySelectorAll('[data-owl-reply]').forEach((button) => {
      button.addEventListener('click', () => {
        const message = workspace.messages[channel.id].find((item) => item.id === button.dataset.owlReply);
        if (!message) return;
        state.replyTo = {id:message.id,author:message.author};
        save();
        renderBody();
        root.querySelector('[data-owl-message-input]')?.focus();
      });
    });

    root.querySelector('[data-owl-cancel-reply]')?.addEventListener('click', () => {
      state.replyTo = null;
      save();
      renderBody();
    });

    root.querySelectorAll('[data-owl-react]').forEach((button) => {
      button.addEventListener('click', () => {
        const message = workspace.messages[channel.id].find((item) => item.id === button.dataset.owlReact);
        if (!message) return;
        message.reactions ||= {};
        const emoji = button.dataset.owlEmoji || '👍';
        message.reactions[emoji] = Number(message.reactions[emoji] || 0) + 1;
        save();
        renderBody();
      });
    });

    root.querySelectorAll('[data-owl-pin]').forEach((button) => {
      button.addEventListener('click', () => {
        const message = workspace.messages[channel.id].find((item) => item.id === button.dataset.owlPin);
        if (!message) return;
        message.pinned = !message.pinned;
        save();
        renderBody();
      });
    });

    root.querySelector('[data-owl-search]')?.addEventListener('click', () => {
      const term = prompt('Search this channel');
      if (!term) return;
      const q = term.toLowerCase();
      root.querySelectorAll('.owl-message').forEach((article) => {
        article.hidden = !article.textContent.toLowerCase().includes(q);
      });
    });
  }

  function wireCoordinatorStudio(workspace) {
    root.querySelectorAll('[data-owl-setting]').forEach((input) => {
      input.addEventListener('change', () => {
        workspace.verification[input.dataset.owlSetting] = input.checked;
        save();
      });
    });

    root.querySelector('[data-owl-channel-form]')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const name = slug(data.get('name'));
      if (!name) return;
      let id = name;
      let suffix = 2;
      while (workspace.channels.some((channel) => channel.id === id)) id = name + '-' + suffix++;
      const scope = data.get('scope') === 'section' ? 'section' : 'all';
      const section = scope === 'section' ? String(data.get('section') || '01') : '';
      workspace.channels.push({
        id,
        name:id,
        kind:'chat',
        scope,
        section,
        posting:data.get('posting') === 'staff' ? 'staff' : 'everyone',
        topic:String(data.get('topic') || 'Course discussion channel.').slice(0,90)
      });
      workspace.messages[id] = [];
      state.activeChannel = id;
      state.coordinatorStudio = false;
      save();
      renderBody();
    });

    root.querySelector('[data-owl-rule-form]')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = event.currentTarget.elements.rule;
      const rule = input.value.trim();
      if (!rule) return;
      workspace.rules.push(rule);
      save();
      renderBody();
    });

    root.querySelectorAll('[data-owl-delete-rule]').forEach((button) => {
      button.addEventListener('click', () => {
        workspace.rules.splice(Number(button.dataset.owlDeleteRule),1);
        save();
        renderBody();
      });
    });

    root.querySelector('[data-owl-link-form]')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const label = String(data.get('label') || '').trim();
      const raw = String(data.get('url') || '').trim();
      let url;
      try {
        const parsed = new URL(raw);
        if (!/^https?:$/.test(parsed.protocol)) throw new Error('invalid');
        url = parsed.href;
      } catch (_) {
        event.currentTarget.elements.url.focus();
        return;
      }
      workspace.links.push({id:'link-' + Date.now(),label:label || 'Course link',url});
      save();
      renderBody();
    });

    root.querySelectorAll('[data-owl-delete-link]').forEach((button) => {
      button.addEventListener('click', () => {
        workspace.links.splice(Number(button.dataset.owlDeleteLink),1);
        save();
        renderBody();
      });
    });
  }

  render();
})();