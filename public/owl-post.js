(() => {
  'use strict';

  const root = document.querySelector('#owlPostApp');
  if (!root) return;

  const standalone = document.body.hasAttribute('data-owl-standalone');
  const auth = standalone ? window.OwlPostAuth : null;
  let identity = auth?.snapshot || {status:'signed-out',user:null,role:null,profile:null};
  const storageKey = () => identity.user?.id ? 'owl-post-workspace-v1:' + identity.user.id : null;
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
          {id:'m4',author:'Course Coordinator',role:'Coordinator',body:'This is the local preview for Section ' + section + '. Official enrollment has not been connected.',time:now(),pinned:false,reactions:{}}
        ]
      }
    };
  }

  function initialState() {
    return {
      open:standalone,
      role:identity.role || 'student',
      verified:identity.status === 'signed-in',
      studentId:identity.profile?.studentId || '',
      department:'CSE',
      universityEmail:identity.user?.email || '',
      enrollments:[],
      activeCourse:'',
      activeChannel:'general',
      rulesAccepted:{},
      workspaces:{},
      coordinatorCourse:'CSE110',
      coordinatorStudio:false,
      infoOpen:true,
      replyTo:null
    };
  }

  function readState() {
    try {
      const key = storageKey();
      const saved = key ? JSON.parse(sessionStorage.getItem(key) || 'null') : null;
      if (!saved) return initialState();
      return {
        ...initialState(),
        ...saved,
        // Identity and privileges never come from the editable workspace cache.
        role:identity.role || 'student',
        verified:identity.status === 'signed-in',
        studentId:identity.profile?.studentId || '',
        universityEmail:identity.user?.email || '',
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
    const key = storageKey();
    if (!key || identity.status !== 'signed-in') return;
    try { sessionStorage.setItem(key, JSON.stringify(state)); } catch (_) {}
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
    return identity.profile?.name || identity.user?.email?.split('@')[0] || (state.role === 'coordinator' ? 'Course Coordinator' : 'Student');
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
          <div><span class="eyebrow">SEMESTER PREVIEW</span><h3>Which courses are on your semester?</h3><p>Try your course and section layout. Official semester enrollment and shared messaging are not connected yet.</p></div>
          <div class="owl-enrollment-id"><span>STUDENT ID</span><b>${esc(maskId(state.studentId))}</b></div>
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
          ${workspace.verification.id ? '<span>✓ Student ID recorded</span>' : ''}
          ${workspace.verification.sectionLocked ? '<span>Section preview</span>' : ''}
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
          <small>${state.role === 'coordinator' ? 'Manage channels and access' : 'Semester preview · email confirmed'}</small>
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
    const enrolledCount = identity.user ? state.enrollments.length : 0;
    return `
      <section class="owl-post-shell">
        <header class="owl-post-hero">
          <div class="owl-mark"><img src="/assets/owl-post-logo.webp?v=recovered-20261017" alt="Owl Post official logo"></div>
          <div class="owl-post-copy">
            <span class="eyebrow">FIRST COMET · BRACU</span>
            <div class="owl-wordmark"><h2>Owl Post</h2><span>prototype</span></div>
            <p>A verified course messaging space for announcements, section channels, resources and real course conversation—without sending students across five different apps.</p>
            <div class="owl-credit"><span>IDEA BY</span><b>Younus Mohammad Maheer</b></div>
            <div class="owl-benefits"><span>✓ enrollment-gated courses</span><span>✓ section channels</span><span>✓ coordinator controls</span></div>
          </div>
          <div class="owl-launch-box">
            <span>ACADEMIC MESSAGING</span>
            <b>${enrolledCount ? enrolledCount + ' semester courses' : 'Your own Owl Post account'}</b>
            <a class="primary owl-launch-link" href="owl-post.html">${standalone ? 'Open workspace →' : 'Sign in to Owl Post →'}</a>
          </div>
        </header>

        ${standalone ? `<div class="owl-workspace" data-owl-workspace>
          <div class="owl-workspace-bar">
            <div><img class="owl-workspace-logo" src="/assets/owl-post-mark.webp?v=official-20261016" alt=""><span class="owl-live-dot"></span><b>OWL POST</b><small>course messaging prototype</small></div>
            <div class="owl-workspace-role">
              <span class="owl-account-badge">${esc(displayName())} · ${state.role === 'coordinator' ? 'Coordinator' : 'Student'}</span>
              <button type="button" data-owl-signout>Sign out</button>
            </div>
          </div>
          <div data-owl-body></div>
        </div>` : ''}
      </section>
    `;
  }

  function renderBody(mode='auto') {
    if (standalone && identity.status !== 'signed-in') return;
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
    if (standalone && identity.status !== 'signed-in') {
      if (auth) auth.render(root, {mode:identity.status === 'recovery' ? 'update' : 'signin'});
      else root.innerHTML = '<p role="alert">Could not load sign-in. Please reload Owl Post.</p>';
      document.title = 'Owl Post · Sign in';
      return;
    }
    if (standalone && identity.role === 'student' && (!identity.profile?.name || !identity.profile?.studentId)) {
      auth.render(root, {mode:'profile'});
      return;
    }
    if (standalone) document.title = 'Owl Post · Your workspace';
    root.innerHTML = shell();
    root.querySelector('[data-owl-signout]')?.addEventListener('click', () => auth?.signOut());

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
          workspace.messages[id] = [{id:'m-' + Date.now(),author:'Course Coordinator',role:'Coordinator',body:'This is the local preview for Section ' + item.section + '. Official enrollment has not been connected.',time:now(),pinned:false,reactions:{}}];
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

  auth?.subscribe(next => {
    identity = next;
    state = readState();
    render();
  });
  window.addEventListener('pageshow', event => { if (standalone && event.persisted) auth?.refresh(); });
  render();
})();
