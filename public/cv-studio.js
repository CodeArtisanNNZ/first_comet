(() => {
  'use strict';

  const root = document.querySelector('#cvStudioApp');
  if (!root) return;

  const STORAGE_KEY = 'fc-cv-studio-v1';
  const blank = () => ({
    basics: {
      name: '', target: '', email: '', phone: '', location: '',
      linkedin: '', github: '', portfolio: '', summary: '', skills: '',
      jobDescription: ''
    },
    education: [{ degree: '', school: '', location: '', start: '', end: '', details: '' }],
    experience: [{ role: '', company: '', location: '', start: '', end: '', bullets: '' }],
    projects: [{ name: '', tech: '', link: '', bullets: '' }],
    certifications: []
  });

  let data = load();

  const esc = (value = '') => String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[ch]);

  const cleanUrl = (value = '') => String(value).replace(/^https?:\/\//i, '').replace(/\/$/, '');
  const lines = (value = '') => String(value).split(/\r?\n/).map(x => x.trim()).filter(Boolean);
  const nonEmpty = (value) => String(value || '').trim().length > 0;

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return saved && saved.basics ? saved : blank();
    } catch {
      return blank();
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function slugName() {
    return (data.basics.name || 'First-Comet-CV')
      .trim()
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '') || 'First-Comet-CV';
  }

  const field = (label, key, value, placeholder = '', type = 'text') => `
    <label class="cv-field">
      <span>${esc(label)}</span>
      <input type="${type}" data-basic="${key}" value="${esc(value)}" placeholder="${esc(placeholder)}">
    </label>`;

  const textarea = (label, key, value, placeholder = '', rows = 4) => `
    <label class="cv-field cv-field-wide">
      <span>${esc(label)}</span>
      <textarea data-basic="${key}" rows="${rows}" placeholder="${esc(placeholder)}">${esc(value)}</textarea>
    </label>`;

  function entryInput(section, index, key, label, value, placeholder = '', type = 'text') {
    return `
      <label class="cv-field">
        <span>${esc(label)}</span>
        <input type="${type}" data-section="${section}" data-index="${index}" data-key="${key}" value="${esc(value)}" placeholder="${esc(placeholder)}">
      </label>`;
  }

  function entryTextarea(section, index, key, label, value, placeholder = '', rows = 4) {
    return `
      <label class="cv-field cv-field-wide">
        <span>${esc(label)}</span>
        <textarea data-section="${section}" data-index="${index}" data-key="${key}" rows="${rows}" placeholder="${esc(placeholder)}">${esc(value)}</textarea>
      </label>`;
  }

  function educationEditor(item, index) {
    return `
      <article class="cv-entry-editor">
        <div class="cv-entry-head"><b>Education ${index + 1}</b>${data.education.length > 1 ? `<button type="button" class="cv-remove" data-remove="education" data-index="${index}">Remove</button>` : ''}</div>
        <div class="cv-form-grid">
          ${entryInput('education', index, 'degree', 'Degree / Program', item.degree, 'BSc in Computer Science')}
          ${entryInput('education', index, 'school', 'Institution', item.school, 'University name')}
          ${entryInput('education', index, 'location', 'Location', item.location, 'Dhaka, Bangladesh')}
          ${entryInput('education', index, 'start', 'Start', item.start, 'Sep 2024')}
          ${entryInput('education', index, 'end', 'End / Expected', item.end, 'May 2028')}
          ${entryTextarea('education', index, 'details', 'Relevant details', item.details, 'CGPA if strong/relevant, honours, relevant coursework, leadership…', 3)}
        </div>
      </article>`;
  }

  function experienceEditor(item, index) {
    return `
      <article class="cv-entry-editor">
        <div class="cv-entry-head"><b>Experience ${index + 1}</b><button type="button" class="cv-remove" data-remove="experience" data-index="${index}">Remove</button></div>
        <div class="cv-form-grid">
          ${entryInput('experience', index, 'role', 'Role', item.role, 'Software Engineering Intern')}
          ${entryInput('experience', index, 'company', 'Company / Organisation', item.company, 'Company name')}
          ${entryInput('experience', index, 'location', 'Location', item.location, 'Dhaka / Remote')}
          ${entryInput('experience', index, 'start', 'Start', item.start, 'Jun 2026')}
          ${entryInput('experience', index, 'end', 'End', item.end, 'Aug 2026 / Present')}
          ${entryTextarea('experience', index, 'bullets', 'Achievement bullets — one per line', item.bullets, 'Built … using …\nImproved … by …\nCollaborated with … to …', 5)}
        </div>
      </article>`;
  }

  function projectEditor(item, index) {
    return `
      <article class="cv-entry-editor">
        <div class="cv-entry-head"><b>Project ${index + 1}</b><button type="button" class="cv-remove" data-remove="projects" data-index="${index}">Remove</button></div>
        <div class="cv-form-grid">
          ${entryInput('projects', index, 'name', 'Project name', item.name, 'Project name')}
          ${entryInput('projects', index, 'tech', 'Tech / Skills', item.tech, 'React, FastAPI, PostgreSQL')}
          ${entryInput('projects', index, 'link', 'Project / GitHub link', item.link, 'github.com/username/project')}
          ${entryTextarea('projects', index, 'bullets', 'What you built — one bullet per line', item.bullets, 'Built … for …\nImplemented …\nDeployed …', 5)}
        </div>
      </article>`;
  }

  function certificationEditor(item, index) {
    return `
      <article class="cv-entry-editor">
        <div class="cv-entry-head"><b>Certification ${index + 1}</b><button type="button" class="cv-remove" data-remove="certifications" data-index="${index}">Remove</button></div>
        <div class="cv-form-grid">
          ${entryInput('certifications', index, 'name', 'Certification', item.name, 'Certification name')}
          ${entryInput('certifications', index, 'issuer', 'Issuer', item.issuer, 'Issuer')}
          ${entryInput('certifications', index, 'date', 'Date', item.date, 'Oct 2026')}
        </div>
      </article>`;
  }

  root.innerHTML = `
    <section class="cv-hero">
      <div>
        <span class="eyebrow">CV STUDIO</span>
        <h1>Build a CV people — and ATS software — can read.</h1>
        <p>Learn the rules, write your content, check it against a job description, then export a clean application-ready CV.</p>
      </div>
      <aside>
        <span class="eyebrow">IMPORTANT</span>
        <b>ATS-friendly ≠ guaranteed interview.</b>
        <small>First Comet checks readability and common ATS-safe practices. Every employer's system and hiring criteria are different.</small>
      </aside>
    </section>

    <section class="cv-learn-strip">
      <details>
        <summary>What makes a CV ATS-friendly?</summary>
        <div class="cv-rule-grid">
          <div><b>01 · One column</b><span>No tables, sidebars, charts or decorative graphics.</span></div>
          <div><b>02 · Standard headings</b><span>Use Summary, Skills, Experience, Projects and Education.</span></div>
          <div><b>03 · Real keywords</b><span>Mirror job-posting terms only when they truthfully describe you.</span></div>
          <div><b>04 · Evidence</b><span>Use projects, outcomes, technologies and measurable results instead of vague claims.</span></div>
          <div><b>05 · Text first</b><span>No photo, rating bars, icons-as-information, header/footer contact details or unusual symbols.</span></div>
          <div><b>06 · Tailor each application</b><span>One generic CV is rarely the strongest CV for every role.</span></div>
        </div>
      </details>
      <details>
        <summary>How should a student write strong bullets?</summary>
        <div class="cv-bullet-guide">
          <p><b>Use:</b> action + what you built/did + technology/context + result.</p>
          <code>Built a responsive course dashboard in React, reducing repeated navigation steps from 5 to 2.</code>
          <p>Avoid empty phrases such as “hardworking”, “responsible for”, or skill bars with percentages. Show evidence instead.</p>
        </div>
      </details>
    </section>

    <section class="cv-workspace">
      <div class="cv-builder">
        <div class="cv-builder-toolbar">
          <div><span class="eyebrow">BUILD</span><h2>Your information</h2></div>
          <button type="button" class="secondary" id="cvClear">New CV</button>
        </div>

        <details class="cv-editor-section" open>
          <summary>1. Target & contact</summary>
          <div class="cv-form-grid">
            ${field('Full name', 'name', data.basics.name, 'Your full name')}
            ${field('Target role', 'target', data.basics.target, 'Front-End Developer')}
            ${field('Email', 'email', data.basics.email, 'you@example.com', 'email')}
            ${field('Phone', 'phone', data.basics.phone, '+880 …', 'tel')}
            ${field('Location', 'location', data.basics.location, 'Dhaka, Bangladesh')}
            ${field('LinkedIn', 'linkedin', data.basics.linkedin, 'linkedin.com/in/username')}
            ${field('GitHub', 'github', data.basics.github, 'github.com/username')}
            ${field('Portfolio', 'portfolio', data.basics.portfolio, 'yourname.dev')}
          </div>
        </details>

        <details class="cv-editor-section" open>
          <summary>2. Summary & skills</summary>
          <div class="cv-form-grid">
            ${textarea('Professional Summary', 'summary', data.basics.summary, '2–3 lines: who you are, your strongest relevant skills, and evidence of what you can build.', 4)}
            ${textarea('Skills — comma separated', 'skills', data.basics.skills, 'JavaScript, React, Python, PostgreSQL, Git', 3)}
          </div>
        </details>

        <details class="cv-editor-section" open>
          <summary>3. Education</summary>
          <div id="cvEducationEditors">${data.education.map(educationEditor).join('')}</div>
          <button type="button" class="cv-add" data-add="education">+ Add education</button>
        </details>

        <details class="cv-editor-section" open>
          <summary>4. Experience</summary>
          <p class="cv-section-note">No formal job yet? Leave this empty. Do not invent experience.</p>
          <div id="cvExperienceEditors">${data.experience.map(experienceEditor).join('')}</div>
          <button type="button" class="cv-add" data-add="experience">+ Add experience</button>
        </details>

        <details class="cv-editor-section" open>
          <summary>5. Projects</summary>
          <p class="cv-section-note">For students, strong projects can provide evidence of real skills.</p>
          <div id="cvProjectEditors">${data.projects.map(projectEditor).join('')}</div>
          <button type="button" class="cv-add" data-add="projects">+ Add project</button>
        </details>

        <details class="cv-editor-section">
          <summary>6. Certifications (optional)</summary>
          <div id="cvCertificationEditors">${data.certifications.map(certificationEditor).join('')}</div>
          <button type="button" class="cv-add" data-add="certifications">+ Add certification</button>
        </details>

        <details class="cv-editor-section cv-job-check" open>
          <summary>7. Check against a job description</summary>
          <p class="cv-section-note">Paste the job description. First Comet will show relevant repeated terms your CV already contains and terms worth reviewing. Never add a keyword that is not true for you.</p>
          ${textarea('Job description', 'jobDescription', data.basics.jobDescription, 'Paste the role description here…', 8)}
          <div id="cvKeywordResult"></div>
        </details>
      </div>

      <aside class="cv-side">
        <section class="cv-check-panel">
          <div class="cv-check-head">
            <div><span class="eyebrow">ATS READINESS</span><h2 id="cvReadinessLabel">Checking…</h2></div>
            <strong id="cvReadinessValue">0/8</strong>
          </div>
          <div id="cvChecks"></div>
          <small class="cv-score-note">This is a First Comet checklist, not an ATS prediction or employer score.</small>
        </section>

        <div class="cv-preview-toolbar">
          <span class="eyebrow">LIVE PREVIEW</span>
          <div>
            <button type="button" class="secondary" id="cvDownloadText">Parser test .txt</button>
            <button type="button" class="secondary" id="cvDownloadWord">Word .doc</button>
            <button type="button" class="primary" id="cvPrint">Save as PDF</button>
          </div>
        </div>

        <article class="cv-paper" id="cvPaper" aria-label="CV preview"></article>
      </aside>
    </section>

    <section class="cv-export-note">
      <b>Before applying:</b>
      <span>Open the exported PDF and select/copy the text. If the text order is clean, parsing is more likely to be clean too. If an employer explicitly requests .docx, follow that instruction.</span>
    </section>
  `;

  function itemHasContent(item) {
    return Object.values(item).some(nonEmpty);
  }

  function renderPreview() {
    const b = data.basics;
    const education = data.education.filter(itemHasContent);
    const experience = data.experience.filter(itemHasContent);
    const projects = data.projects.filter(itemHasContent);
    const certifications = data.certifications.filter(itemHasContent);
    const skills = b.skills.split(',').map(x => x.trim()).filter(Boolean);

    const contact = [
      b.email, b.phone, b.location,
      cleanUrl(b.linkedin), cleanUrl(b.github), cleanUrl(b.portfolio)
    ].filter(nonEmpty);

    root.querySelector('#cvPaper').innerHTML = `
      <header class="resume-head">
        <h1>${esc(b.name || 'Your Name')}</h1>
        ${b.target ? `<p class="resume-target">${esc(b.target)}</p>` : ''}
        ${contact.length ? `<p class="resume-contact">${contact.map(esc).join(' | ')}</p>` : ''}
      </header>

      ${b.summary ? `
        <section class="resume-section">
          <h2>Professional Summary</h2>
          <p>${esc(b.summary)}</p>
        </section>` : ''}

      ${skills.length ? `
        <section class="resume-section">
          <h2>Skills</h2>
          <p>${skills.map(esc).join(' • ')}</p>
        </section>` : ''}

      ${experience.length ? `
        <section class="resume-section">
          <h2>Experience</h2>
          ${experience.map(item => `
            <div class="resume-entry">
              <div class="resume-entry-head">
                <div><b>${esc(item.role)}</b>${item.company ? `<span> — ${esc(item.company)}</span>` : ''}</div>
                <span>${esc([item.start, item.end].filter(nonEmpty).join(' – '))}</span>
              </div>
              ${item.location ? `<p class="resume-meta">${esc(item.location)}</p>` : ''}
              ${lines(item.bullets).length ? `<ul>${lines(item.bullets).map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
            </div>`).join('')}
        </section>` : ''}

      ${projects.length ? `
        <section class="resume-section">
          <h2>Projects</h2>
          ${projects.map(item => `
            <div class="resume-entry">
              <div class="resume-entry-head">
                <div><b>${esc(item.name)}</b>${item.tech ? `<span> — ${esc(item.tech)}</span>` : ''}</div>
                ${item.link ? `<span>${esc(cleanUrl(item.link))}</span>` : ''}
              </div>
              ${lines(item.bullets).length ? `<ul>${lines(item.bullets).map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
            </div>`).join('')}
        </section>` : ''}

      ${education.length ? `
        <section class="resume-section">
          <h2>Education</h2>
          ${education.map(item => `
            <div class="resume-entry">
              <div class="resume-entry-head">
                <div><b>${esc(item.degree)}</b>${item.school ? `<span> — ${esc(item.school)}</span>` : ''}</div>
                <span>${esc([item.start, item.end].filter(nonEmpty).join(' – '))}</span>
              </div>
              ${item.location ? `<p class="resume-meta">${esc(item.location)}</p>` : ''}
              ${item.details ? `<p>${esc(item.details)}</p>` : ''}
            </div>`).join('')}
        </section>` : ''}

      ${certifications.length ? `
        <section class="resume-section">
          <h2>Certifications</h2>
          ${certifications.map(item => `
            <div class="resume-entry resume-cert">
              <div><b>${esc(item.name)}</b>${item.issuer ? `<span> — ${esc(item.issuer)}</span>` : ''}</div>
              <span>${esc(item.date)}</span>
            </div>`).join('')}
        </section>` : ''}
    `;

    renderChecks();
    renderKeywords();
    save();
  }

  function resumePlainText() {
    return root.querySelector('#cvPaper').innerText.replace(/\n{3,}/g, '\n\n').trim();
  }

  function allBullets() {
    return [
      ...data.experience.flatMap(x => lines(x.bullets)),
      ...data.projects.flatMap(x => lines(x.bullets))
    ];
  }

  function renderChecks() {
    const b = data.basics;
    const bullets = allBullets();
    const checks = [
      ['Name + contact', nonEmpty(b.name) && nonEmpty(b.email) && nonEmpty(b.phone)],
      ['Target role', nonEmpty(b.target)],
      ['Professional summary', b.summary.trim().length >= 60],
      ['Relevant skills', b.skills.split(',').filter(x => x.trim()).length >= 4],
      ['Education', data.education.some(itemHasContent)],
      ['Evidence from experience/projects', [...data.experience, ...data.projects].some(itemHasContent)],
      ['Achievement bullets', bullets.length >= 2],
      ['At least one measurable result', bullets.some(x => /\b\d+(?:\.\d+)?\s*(?:%|x|users?|students?|clients?|hours?|days?|seconds?|ms|projects?|features?|pages?|steps?)\b/i.test(x))]
    ];

    const score = checks.filter(([, ok]) => ok).length;
    const label = score >= 7 ? 'Strong foundation' : score >= 5 ? 'Good start' : 'Needs work';
    root.querySelector('#cvReadinessLabel').textContent = label;
    root.querySelector('#cvReadinessValue').textContent = score + '/8';
    root.querySelector('#cvChecks').innerHTML = checks.map(([labelText, ok]) => `
      <div class="cv-check ${ok ? 'pass' : ''}">
        <span>${ok ? '✓' : '○'}</span><b>${esc(labelText)}</b>
      </div>`).join('');
  }

  const STOP = new Set(('the a an and or to of in on for with from as at by is are be this that you your our we they their will can should must have has had ' +
    'job role work working team teams candidate candidates company experience years year skills skill ability strong excellent good responsibilities responsibility ' +
    'including include required requirements preferred looking using use used about into across within through who what when where how').split(/\s+/));

  function keywords(text) {
    const words = String(text || '').toLowerCase().match(/[a-z][a-z0-9+#.\/-]{2,}/g) || [];
    const counts = new Map();
    words.forEach((word) => {
      const cleaned = word.replace(/^[./-]+|[./-]+$/g, '');
      if (!cleaned || STOP.has(cleaned) || cleaned.length < 3) return;
      counts.set(cleaned, (counts.get(cleaned) || 0) + 1);
    });
    return [...counts.entries()]
      .sort((a,b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 18)
      .map(([word]) => word);
  }

  function renderKeywords() {
    const box = root.querySelector('#cvKeywordResult');
    const jd = data.basics.jobDescription.trim();
    if (jd.length < 60) {
      box.innerHTML = '<p class="cv-keyword-empty">Paste a job description to compare its repeated terms with your CV.</p>';
      return;
    }
    const cvText = resumePlainText().toLowerCase();
    const terms = keywords(jd);
    const found = terms.filter(term => cvText.includes(term));
    const review = terms.filter(term => !cvText.includes(term));

    box.innerHTML = `
      <div class="cv-keyword-summary">
        <b>${found.length} of ${terms.length} repeated job terms already appear in your CV</b>
        <small>This is a keyword review, not a match score. Relevance and truth matter more than stuffing terms.</small>
      </div>
      <div class="cv-keyword-columns">
        <div><span>ALREADY PRESENT</span><p>${found.length ? found.map(x => `<em>${esc(x)}</em>`).join('') : '<i>None yet</i>'}</p></div>
        <div><span>REVIEW — ADD ONLY IF TRUE</span><p>${review.length ? review.map(x => `<em>${esc(x)}</em>`).join('') : '<i>No obvious missing repeated terms</i>'}</p></div>
      </div>`;
  }

  function rerenderEditors(section) {
    const map = {
      education: ['#cvEducationEditors', educationEditor],
      experience: ['#cvExperienceEditors', experienceEditor],
      projects: ['#cvProjectEditors', projectEditor],
      certifications: ['#cvCertificationEditors', certificationEditor]
    };
    const [selector, renderer] = map[section];
    root.querySelector(selector).innerHTML = data[section].map(renderer).join('');
    bindDynamic();
  }

  function bindDynamic() {
    root.querySelectorAll('[data-section]').forEach((input) => {
      input.addEventListener('input', () => {
        const { section, index, key } = input.dataset;
        data[section][Number(index)][key] = input.value;
        renderPreview();
      });
    });
    root.querySelectorAll('[data-remove]').forEach((button) => {
      button.addEventListener('click', () => {
        const section = button.dataset.remove;
        data[section].splice(Number(button.dataset.index), 1);
        if (section !== 'certifications' && data[section].length === 0) {
          const templates = {
            education: { degree:'', school:'', location:'', start:'', end:'', details:'' },
            experience: { role:'', company:'', location:'', start:'', end:'', bullets:'' },
            projects: { name:'', tech:'', link:'', bullets:'' }
          };
          data[section].push(templates[section]);
        }
        rerenderEditors(section);
        renderPreview();
      });
    });
  }

  root.querySelectorAll('[data-basic]').forEach((input) => {
    input.addEventListener('input', () => {
      data.basics[input.dataset.basic] = input.value;
      renderPreview();
    });
  });

  root.querySelectorAll('[data-add]').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.dataset.add;
      const templates = {
        education: { degree:'', school:'', location:'', start:'', end:'', details:'' },
        experience: { role:'', company:'', location:'', start:'', end:'', bullets:'' },
        projects: { name:'', tech:'', link:'', bullets:'' },
        certifications: { name:'', issuer:'', date:'' }
      };
      data[section].push({ ...templates[section] });
      rerenderEditors(section);
      save();
    });
  });

  root.querySelector('#cvClear').addEventListener('click', () => {
    if (!confirm('Start a new CV? This clears the CV saved in this browser.')) return;
    data = blank();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    location.reload();
  });

  function exportDocumentHtml() {
    return '<!doctype html><html><head><meta charset="utf-8"><title>' + esc(slugName()) + '-CV</title>' +
      '<style>@page{size:A4;margin:12mm 14mm}*{box-sizing:border-box}body{margin:0;color:#111;background:#fff;font-family:Arial,Helvetica,sans-serif;font-size:10.5pt;line-height:1.38}' +
      '.resume-head{padding-bottom:10px;border-bottom:1.5px solid #222}.resume-head h1{margin:0;font-size:22pt;line-height:1}.resume-target{margin:5px 0 2px;font-size:11.5pt;font-weight:700}.resume-contact{margin:5px 0 0;font-size:9.5pt}' +
      '.resume-section{margin-top:14px}.resume-section h2{margin:0 0 6px;padding-bottom:3px;border-bottom:1px solid #555;font-size:11pt;text-transform:uppercase;letter-spacing:.04em}.resume-section p{margin:4px 0}.resume-entry{margin:0 0 9px}' +
      '.resume-entry-head,.resume-cert{display:flex;justify-content:space-between;gap:16px}.resume-entry-head>span,.resume-cert>span{flex:none;font-size:9.5pt;text-align:right}.resume-entry-head>div span,.resume-cert div span{font-weight:400}.resume-meta{font-size:9.5pt;color:#333}.resume-entry ul{margin:4px 0 0;padding-left:18px}.resume-entry li{margin:2px 0}</style>' +
      '</head><body>' + root.querySelector('#cvPaper').innerHTML + '</body></html>';
  }

  root.querySelector('#cvPrint').addEventListener('click', () => {
    const printWindow = window.open('', '_blank', 'width=900,height=1000');
    if (!printWindow) {
      document.body.classList.add('cv-printing');
      window.print();
      setTimeout(() => document.body.classList.remove('cv-printing'), 500);
      return;
    }
    printWindow.document.open();
    printWindow.document.write(exportDocumentHtml());
    printWindow.document.close();
    printWindow.document.title = slugName() + '-CV';
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
  });

  root.querySelector('#cvDownloadWord').addEventListener('click', () => {
    const html = exportDocumentHtml();
    const blob = new Blob(['\\ufeff', html], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = slugName() + '-CV.doc';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  root.querySelector('#cvDownloadText').addEventListener('click', () => {
    const blob = new Blob([resumePlainText() + '\n'], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = slugName() + '-CV-parser-test.txt';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  window.addEventListener('afterprint', () => document.body.classList.remove('cv-printing'));

  bindDynamic();
  renderPreview();
})();