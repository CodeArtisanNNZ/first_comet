(() => {
  'use strict';

  const root = document.querySelector('#careerExplorerApp');
  if (!root) return;

  const careers = [
    {
      id: 'frontend',
      family: 'build',
      icon: '&lt;/&gt;',
      title: 'Front-End Developer',
      short: 'Build the part of websites people see and use.',
      fit: ['visual', 'coding'],
      work: 'Turn designs into responsive, interactive web interfaces.',
      learn: 'HTML · CSS · JavaScript · TypeScript · React · accessibility',
      good: 'Visible results, strong portfolio path, freelance and remote-friendly.',
      hard: 'Junior web roles are crowded. Basic page-building is easier to automate, so strong JavaScript, UX, accessibility and performance matter more.',
      bd: 'Common in software companies, agencies, e-commerce and product teams. Competition is high at junior level.',
      outside: 'Established global role with remote opportunities, but portfolios and framework depth matter.',
      future: 'Still relevant; moving toward richer product UI, design systems, performance and AI-assisted development.',
      signal: 'BLS projects web developer/digital designer employment growth through 2034, but the market rewards deeper skills beyond simple static sites.'
    },
    {
      id: 'backend',
      family: 'build',
      icon: '{ }',
      title: 'Back-End Developer',
      short: 'Build APIs, business logic and server-side systems.',
      fit: ['logic', 'coding'],
      work: 'Create the server logic behind apps: APIs, authentication, payments, databases and integrations.',
      learn: 'One backend language · APIs · SQL · databases · auth · security · testing',
      good: 'Strong technical depth and useful across almost every serious software product.',
      hard: 'Less visually rewarding at first. Debugging distributed systems, security and data problems can be difficult.',
      bd: 'Good demand in software firms, fintech, e-commerce, enterprise systems and outsourcing.',
      outside: 'Broad demand across product companies, SaaS, finance, health and enterprise software.',
      future: 'Strong. AI can generate boilerplate, but reliable architecture, security and data decisions remain valuable.',
      signal: 'Software/application development remains one of the faster-growing technology job families globally.'
    },
    {
      id: 'fullstack',
      family: 'build',
      icon: '↔',
      title: 'Full-Stack Developer',
      short: 'Work across both the front end and back end.',
      fit: ['variety', 'coding'],
      work: 'Build complete features from interface to API to database.',
      learn: 'Front end · backend · SQL · Git · deployment · security basics',
      good: 'Useful for startups, smaller teams, freelancing and building your own products.',
      hard: 'Easy to become shallow in everything. Employers still expect real depth in at least one side.',
      bd: 'Very practical for local software companies, startups, agencies and freelance work.',
      outside: 'Common in startups and product teams; larger companies may split responsibilities more.',
      future: 'Strong for people who can own features end-to-end rather than merely know many tools.',
      signal: 'A good generalist path, but not a shortcut: you still need solid fundamentals.'
    },
    {
      id: 'software',
      family: 'build',
      icon: '⌘',
      title: 'Software Engineer',
      short: 'Design and build software systems beyond one specific stack.',
      fit: ['logic', 'systems'],
      work: 'Solve software problems, design systems, write maintainable code, test and collaborate with teams.',
      learn: 'Programming · data structures · algorithms · OOP · databases · testing · system design',
      good: 'Broadest long-term path; can move into backend, platform, mobile, infrastructure or specialist roles.',
      hard: 'Requires strong fundamentals. Interviews can include algorithms and system-design thinking.',
      bd: 'One of the core roles in local software, telecom, fintech, enterprise and outsourcing firms.',
      outside: 'Large global market across nearly every industry.',
      future: 'Strong, but routine coding is increasingly AI-assisted. Problem-solving, architecture and domain knowledge become more important.',
      signal: 'U.S. BLS projects strong software developer growth through 2034, driven partly by AI, IoT, robotics and automation.'
    },
    {
      id: 'mobile',
      family: 'build',
      icon: '▯',
      title: 'Mobile App Developer',
      short: 'Build Android and iOS applications.',
      fit: ['visual', 'coding'],
      work: 'Create mobile interfaces, device features, notifications, offline flows and API-connected apps.',
      learn: 'Flutter or React Native · or Kotlin/Swift · APIs · state · mobile UX',
      good: 'Clear product output and useful for fintech, commerce, education and service apps.',
      hard: 'Device differences, app-store rules and performance issues add complexity.',
      bd: 'Useful in fintech, e-commerce, logistics, education and service companies; fewer roles than general web.',
      outside: 'Established global market, especially for strong native or cross-platform developers.',
      future: 'Stable. Cross-platform tools keep improving, while native expertise remains valuable for complex apps.',
      signal: 'Best for students who enjoy product interfaces but want to work beyond the browser.'
    },
    {
      id: 'qa',
      family: 'build',
      icon: '✓',
      title: 'QA / Automation Engineer',
      short: 'Find problems before users do.',
      fit: ['detail', 'logic'],
      work: 'Design test plans, automate tests, verify APIs and prevent regressions.',
      learn: 'Testing concepts · API testing · Playwright/Cypress/Selenium · CI · basic coding',
      good: 'Great for detail-oriented people and a strong route into software quality and automation.',
      hard: 'Manual-only testing is under more automation pressure. Strong QA roles increasingly require coding and systems understanding.',
      bd: 'Established in software and outsourcing teams, with better prospects for automation skills.',
      outside: 'Solid demand, especially for test automation, reliability and quality engineering.',
      future: 'Automation-heavy QA is healthier than purely repetitive manual testing.',
      signal: 'Treat quality engineering as a technical discipline, not just clicking through screens.'
    },
    {
      id: 'devops',
      family: 'systems',
      icon: '☁',
      title: 'Cloud / DevOps / SRE',
      short: 'Keep software running, deployable and reliable.',
      fit: ['systems', 'automation'],
      work: 'Automate deployments, manage cloud infrastructure, monitoring, containers and reliability.',
      learn: 'Linux · networking · Git · Docker · CI/CD · cloud · scripting · observability',
      good: 'High-impact work and strong global demand for experienced engineers.',
      hard: 'Often not truly entry-level. Production incidents and on-call work can be stressful.',
      bd: 'Growing as local companies adopt cloud and modern deployment practices, but junior openings are fewer than web development.',
      outside: 'Strong in SaaS, cloud platforms, fintech and larger engineering organizations.',
      future: 'Strong as infrastructure becomes more automated and cloud-native, but the role expects deep systems knowledge.',
      signal: 'A better second step after gaining Linux, networking or backend experience than a first-week career choice.'
    },
    {
      id: 'cyber',
      family: 'systems',
      icon: '◇',
      title: 'Cybersecurity',
      short: 'Protect systems, applications and data.',
      fit: ['security', 'puzzles'],
      work: 'Monitor threats, secure applications, test systems, investigate incidents and reduce risk.',
      learn: 'Networking · Linux · web security · scripting · security labs · cloud basics',
      good: 'Meaningful work, many specialisations and strong long-term security need.',
      hard: '“Entry-level cybersecurity” often still expects IT/networking knowledge. Certifications alone do not replace hands-on skill.',
      bd: 'Growing in banks, telecom, government, fintech and larger tech organizations; specialist teams are still smaller than general development.',
      outside: 'Strong demand across industries, especially finance, government, cloud and enterprise.',
      future: 'Very strong signal. More digital systems and AI also create more security risk.',
      signal: 'U.S. BLS projects information security analyst employment growth of about 29% from 2024–34.'
    },
    {
      id: 'analyst',
      family: 'data',
      icon: '▥',
      title: 'Data Analyst / BI Analyst',
      short: 'Turn business data into useful decisions.',
      fit: ['data', 'business'],
      work: 'Clean data, build reports and dashboards, find patterns and explain what they mean.',
      learn: 'Excel/Sheets · SQL · statistics · Power BI/Tableau · Python basics',
      good: 'Accessible entry into data work and useful in almost every business sector.',
      hard: 'A lot of work is data cleaning and stakeholder communication, not glamorous AI.',
      bd: 'Useful in banks, telecom, e-commerce, FMCG, logistics and larger organizations.',
      outside: 'Broad market, though titles vary between analyst, BI analyst and analytics specialist.',
      future: 'Stable when paired with strong SQL, business understanding and automation. Simple reporting is increasingly automated.',
      signal: 'Good for students who like data but are not sure they want heavy machine learning.'
    },
    {
      id: 'dataengineer',
      family: 'data',
      icon: '⇄',
      title: 'Data Engineer',
      short: 'Build the pipelines and systems that move data.',
      fit: ['data', 'systems'],
      work: 'Create data pipelines, warehouses, transformations and reliable data platforms.',
      learn: 'SQL · Python · databases · ETL/ELT · cloud · data modelling · distributed systems',
      good: 'Strong technical career with growing importance as companies collect more data.',
      hard: 'Fewer true junior roles; requires both software and database/system knowledge.',
      bd: 'Growing but more specialised than general web development, mainly in larger tech, finance and data-heavy organizations.',
      outside: 'Strong in product companies, analytics platforms, finance and cloud ecosystems.',
      future: 'Strong. AI systems also depend on clean, reliable data infrastructure.',
      signal: 'A strong option for students who like backend systems and data more than UI.'
    },
    {
      id: 'ai',
      family: 'data',
      icon: '✦',
      title: 'AI / ML Engineer & Data Scientist',
      short: 'Build models or data-driven intelligent systems.',
      fit: ['math', 'data'],
      work: 'Prepare data, train/evaluate models, run experiments and integrate models into products.',
      learn: 'Python · statistics · linear algebra · ML · data handling · model evaluation · deployment',
      good: 'Fast-moving field with strong global investment and many research/product directions.',
      hard: 'Very hyped and competitive. Real roles usually need stronger math, data and software engineering than short AI courses suggest.',
      bd: 'Growing, but genuine junior ML roles are still fewer than general software jobs. Skills can also lead to remote/global work.',
      outside: 'Strong growth in AI-focused industries, but hiring standards can be high and graduate study helps for research-heavy roles.',
      future: 'Very strong growth signal, while tools change quickly. Fundamentals matter more than chasing every model.',
      signal: 'WEF lists AI/ML and big-data roles among the fastest-growing; U.S. BLS projects data scientist growth around 34% from 2024–34.'
    },
    {
      id: 'embedded',
      family: 'hardware',
      icon: '▣',
      title: 'Embedded / IoT / Robotics',
      short: 'Write software that controls physical devices.',
      fit: ['hardware', 'systems'],
      work: 'Program microcontrollers, sensors, devices, robots and hardware-connected systems.',
      learn: 'C/C++ · electronics basics · microcontrollers · protocols · RTOS/Linux · control basics',
      good: 'Hands-on work connecting code to the physical world.',
      hard: 'Hardware debugging is slower and jobs are more geographically concentrated.',
      bd: 'Niche but relevant in electronics, industrial automation, research, IoT and some robotics initiatives.',
      outside: 'Stronger in automotive, manufacturing, semiconductors, robotics, medical devices and industrial systems.',
      future: 'Positive where automation, connected devices and robotics expand.',
      signal: 'Better fit for students who enjoy both hardware and software, not only web apps.'
    },
    {
      id: 'game',
      family: 'creative',
      icon: '◈',
      title: 'Game Developer',
      short: 'Build interactive games and real-time experiences.',
      fit: ['creative', 'coding'],
      work: 'Implement gameplay, physics, UI, tools, networking or graphics in game engines.',
      learn: 'C# + Unity or C++ + Unreal · maths · game loops · physics · optimisation',
      good: 'Highly creative and technically interesting.',
      hard: 'Competitive industry, portfolio-heavy, and some studios have demanding schedules. Bangladesh has a smaller market.',
      bd: 'Niche. Indie, outsourcing and small studios exist, but openings are much fewer than web/software roles.',
      outside: 'Larger industry but still competitive; relocation and strong portfolios can matter.',
      future: 'Games remain a major industry, but career stability varies by studio and market cycle.',
      signal: 'Choose it because you genuinely like game development, not because it looks easier than software engineering.'
    },
    {
      id: 'product',
      family: 'product',
      icon: '◎',
      title: 'Product / Business / Systems Analyst',
      short: 'Connect users, business needs and technical teams.',
      fit: ['business', 'communication'],
      work: 'Understand requirements, map processes, analyse systems and help teams decide what to build.',
      learn: 'Requirements · UX basics · analytics · databases/API concepts · communication · product thinking',
      good: 'Good for technical students who enjoy people, strategy and problem definition.',
      hard: 'Less hands-on coding. Product Manager roles often prefer prior work experience rather than fresh graduates.',
      bd: 'Relevant in software companies, banks, fintech, telecom and enterprise projects.',
      outside: 'Broad opportunities, but domain knowledge and communication are major differentiators.',
      future: 'Strong for people who can combine technical literacy with business judgement; AI can assist analysis but not replace stakeholder ownership easily.',
      signal: 'A CSE degree can be useful here even if you decide coding is not your main job.'
    },
    {
      id: 'research',
      family: 'research',
      icon: '⌁',
      title: 'Research / Academia',
      short: 'Investigate new ideas and teach or publish knowledge.',
      fit: ['theory', 'curiosity'],
      work: 'Run experiments, read papers, build prototypes, publish research and sometimes teach.',
      learn: 'Strong fundamentals · maths for your field · research methods · writing · a specialisation',
      good: 'Deep work, intellectual freedom and access to advanced areas such as AI, HCI, security and systems.',
      hard: 'Progress can be slow, publications are competitive, and many research careers require MSc/PhD study.',
      bd: 'Universities, research labs and some industry R&D roles exist, but the ecosystem is smaller.',
      outside: 'Much larger university and industrial research ecosystems, especially with graduate study.',
      future: 'Important in advanced technology, but it is a longer training path than standard software jobs.',
      signal: 'Best for students who enjoy unanswered questions more than fast product delivery.'
    }
  ];

  const familyLabels = {
    all: 'All paths',
    build: 'Software',
    data: 'Data & AI',
    systems: 'Cloud & Security',
    hardware: 'Hardware',
    creative: 'Creative',
    product: 'Product',
    research: 'Research'
  };

  const interestMap = [
    ['visual', 'I like visual work'],
    ['logic', 'I like logic'],
    ['data', 'I like data'],
    ['security', 'I like security'],
    ['systems', 'I like systems'],
    ['hardware', 'I like hardware'],
    ['business', 'I like business'],
    ['creative', 'I like creative work']
  ];

  const esc = (value) => String(value).replace(/[&<>"']/g, (ch) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[ch]);

  function card(c) {
    return `
      <article class="career-card" data-family="${c.family}" data-fit="${c.fit.join(' ')}">
        <div class="career-card-top">
          <span class="career-icon" aria-hidden="true">${c.icon}</span>
          <div>
            <span class="eyebrow">${familyLabels[c.family].toUpperCase()}</span>
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.short)}</p>
          </div>
        </div>
        <details class="career-details">
          <summary>See the real picture <span>+</span></summary>
          <div class="career-detail-body">
            <div class="career-fact"><b>What you actually do</b><p>${esc(c.work)}</p></div>
            <div class="career-fact"><b>Start learning</b><p>${esc(c.learn)}</p></div>
            <div class="career-pro-con">
              <div class="career-positive"><b>Good side</b><p>${esc(c.good)}</p></div>
              <div class="career-negative"><b>Hard truth</b><p>${esc(c.hard)}</p></div>
            </div>
            <div class="career-market">
              <div><span>🇧🇩 BANGLADESH</span><p>${esc(c.bd)}</p></div>
              <div><span>🌍 OUTSIDE / REMOTE</span><p>${esc(c.outside)}</p></div>
            </div>
            <div class="career-future"><b>Future</b><p>${esc(c.future)}</p><small>${esc(c.signal)}</small></div>
          </div>
        </details>
      </article>`;
  }

  root.innerHTML = `
    <section class="career-hero">
      <div>
        <span class="eyebrow">CAREER EXPLORER</span>
        <h1>You do not need to know your path yet.</h1>
        <p>Explore what CSE careers actually feel like — including the good parts and the difficult parts.</p>
      </div>
      <aside>
        <b>No fake promises.</b>
        <small>Market notes are directional, not guarantees. Skills, portfolio, English/communication, location and experience change outcomes.</small>
      </aside>
    </section>

    <section class="career-lost">
      <div><span class="eyebrow">NOT SURE?</span><h2>Start with what you enjoy.</h2></div>
      <div class="career-interest-row">
        ${interestMap.map(([id,label]) => `<button type="button" data-interest="${id}">${label}</button>`).join('')}
        <button type="button" data-interest="all">Show everything</button>
      </div>
    </section>

    <nav class="career-filters" aria-label="Career categories">
      ${Object.entries(familyLabels).map(([id,label]) => `<button type="button" data-career-filter="${id}" class="${id==='all'?'active':''}">${label}</button>`).join('')}
    </nav>

    <div class="career-grid">
      ${careers.map(card).join('')}
    </div>

    <section class="career-market-note">
      <span class="eyebrow">MARKET REALITY · REVIEWED 2026</span>
      <h2>Bangladesh has opportunity — and real competition.</h2>
      <p>Bangladesh's ICT sector is growing and IT exports have recently improved, but graduate supply is also high and employers report a skills gap. Globally, software, cybersecurity, data and AI remain important growth areas, while AI is also reducing some routine entry-level work. Build real skills, not only certificates.</p>
      <details>
        <summary>Why First Comet says this</summary>
        <div class="career-source-links">
          <a href="https://bida.gov.bd/information-technology" target="_blank" rel="noopener">Bangladesh Investment Development Authority →</a>
          <a href="https://documents1.worldbank.org/curated/en/099082525051033525/pdf/P511786-ad6fb108-5072-428b-a766-0d4659d179d5.pdf" target="_blank" rel="noopener">World Bank — Bangladesh jobs & skills →</a>
          <a href="https://www.weforum.org/publications/the-future-of-jobs-report-2025/digest/" target="_blank" rel="noopener">WEF Future of Jobs 2025 →</a>
          <a href="https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm" target="_blank" rel="noopener">U.S. BLS — Software developers →</a>
          <a href="https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm" target="_blank" rel="noopener">U.S. BLS — Cybersecurity →</a>
          <a href="https://www.bls.gov/ooh/math/data-scientists.htm" target="_blank" rel="noopener">U.S. BLS — Data scientists →</a>
        </div>
      </details>
    </section>

    <section class="career-reminder">
      <b>Your first choice is not permanent.</b>
      <p>Front-end can lead to full-stack. Backend can lead to cloud. Data analysis can lead to data engineering. Software engineering can lead almost anywhere. Pick a direction to explore — not a lifelong prison.</p>
    </section>
  `;

  const cards = [...root.querySelectorAll('.career-card')];
  const filterButtons = [...root.querySelectorAll('[data-career-filter]')];
  const interestButtons = [...root.querySelectorAll('[data-interest]')];

  function showByFamily(family) {
    cards.forEach((card) => {
      card.hidden = family !== 'all' && card.dataset.family !== family;
    });
    filterButtons.forEach((button) => button.classList.toggle('active', button.dataset.careerFilter === family));
    interestButtons.forEach((button) => button.classList.remove('active'));
  }

  function showByInterest(interest) {
    cards.forEach((card) => {
      card.hidden = interest !== 'all' && !card.dataset.fit.split(' ').includes(interest);
    });
    interestButtons.forEach((button) => button.classList.toggle('active', button.dataset.interest === interest));
    filterButtons.forEach((button) => button.classList.remove('active'));
  }

  filterButtons.forEach((button) => button.addEventListener('click', () => showByFamily(button.dataset.careerFilter)));
  interestButtons.forEach((button) => button.addEventListener('click', () => showByInterest(button.dataset.interest)));
})();