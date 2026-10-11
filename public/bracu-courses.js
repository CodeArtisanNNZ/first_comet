(() => {
  'use strict';

  const root = document.querySelector('#bracuCoursesApp');
  if (!root) return;

  const courses = [
    {code:'CSE110', title:'Programming Language I', area:'Programming', hp:'N/A', sp:'', focus:'Programming foundations, problem solving and introductory Java.', detailed:true},
    {code:'CSE111', title:'Programming Language 2', area:'Programming', hp:'CSE110', sp:'', focus:'Continue programming with more structured problem solving and program design.'},
    {code:'CSE220', title:'Data Structure', area:'Programming', hp:'CSE111', sp:'', focus:'Organise data efficiently using fundamental data structures.'},
    {code:'CSE221', title:'Algorithm Analysis & Design', area:'Theory', hp:'CSE220', sp:'', focus:'Design algorithms and reason about correctness and efficiency.'},
    {code:'CSE230', title:'Discrete Mathematics', area:'Theory', hp:'', sp:'', focus:'Mathematical foundations used throughout computer science.'},
    {code:'CSE250', title:'Circuits and Electronics', area:'Hardware', hp:'', sp:'PHY112', focus:'Circuit and electronics foundations for computer engineering.'},
    {code:'CSE251', title:'Electronic Devices and Circuits', area:'Hardware', hp:'CSE250', sp:'', focus:'Electronic devices and circuits used in computing systems.'},
    {code:'CSE260', title:'Digital Logic Design', area:'Hardware', hp:'CSE251', sp:'', focus:'Digital logic, combinational/sequential design and hardware reasoning.'},
    {code:'CSE320', title:'Data Communications', area:'Systems', hp:'N/A', sp:'', focus:'How digital data is transmitted across communication systems.'},
    {code:'CSE321', title:'Operating Systems', area:'Systems', hp:'CSE221', sp:'CSE340', focus:'Processes, memory, files, scheduling and operating-system concepts.'},
    {code:'CSE330', title:'Numerical Methods', area:'Theory', hp:'MAT216', sp:'', focus:'Numerical techniques for solving computational mathematics problems.'},
    {code:'CSE331', title:'Automata and Computability', area:'Theory', hp:'CSE221', sp:'', focus:'Formal languages, automata and the limits of computation.'},
    {code:'CSE340', title:'Computer Architecture', area:'Systems', hp:'CSE260', sp:'N/A', focus:'How processors, memory and computer hardware execute programs.'},
    {code:'CSE341', title:'Microprocessors', area:'Hardware', hp:'N/A', sp:'CSE340', focus:'Microprocessor architecture, programming and interfacing fundamentals.'},
    {code:'CSE350', title:'Digital Electronics and Pulse Techniques', area:'Hardware', hp:'CSE251', sp:'', focus:'Digital electronics, pulse circuits and related techniques.'},
    {code:'CSE360', title:'Computer Interfacing', area:'Hardware', hp:'CSE341', sp:'', focus:'Connect processors with peripherals, sensors and external hardware.'},
    {code:'CSE370', title:'Database', area:'Software & Data', hp:'CSE221', sp:'', focus:'Relational data modelling, SQL and database-system foundations.'},
    {code:'CSE400', title:'Final Year Design Project', area:'Capstone', hp:'', sp:'', focus:'Plan, build, document and present a substantial final-year project.'},
    {code:'CSE420', title:'Compiler Design', area:'Systems', hp:'CSE321, CSE331, CSE340', sp:'', focus:'How source code is analysed, translated and executed by compilers.'},
    {code:'CSE421', title:'Computer Networks', area:'Systems', hp:'', sp:'CSE320', focus:'Network architecture, protocols and communication between computers.'},
    {code:'CSE422', title:'Artificial Intelligence', area:'AI', hp:'CSE221', sp:'', focus:'Core artificial-intelligence concepts and problem-solving methods.'},
    {code:'CSE423', title:'Computer Graphics', area:'Creative Computing', hp:'MAT216', sp:'', focus:'Represent, transform and render visual objects with computation.'},
    {code:'CSE460', title:'VLSI Design', area:'Hardware', hp:'CSE260', sp:'', focus:'Very-large-scale integrated circuit design foundations.'},
    {code:'CSE461', title:'Introduction to Robotics', area:'Hardware', hp:'CSE260, CSE341, CSE360', sp:'', focus:'Combine sensing, control, hardware and computation in robotic systems.'},
    {code:'CSE470', title:'Software Engineering', area:'Software & Data', hp:'CSE370', sp:'', focus:'Requirements, design, development process, testing and team software work.'},
    {code:'CSE471', title:'System Analysis and Design', area:'Software & Data', hp:'CSE370', sp:'', focus:'Analyse requirements and design information/software systems.'}
  ];

  window.FC_BRACU_COURSES = courses;

  const cse110Topics = [
    ['Programming foundations','Problem solving, algorithms, flowcharts and how programs execute.'],
    ['Variables & data types','Values, variables, primitive types, operators and expressions.'],
    ['Input & output','Reading user input and displaying program output.'],
    ['Conditions','if, else-if, else and decision-making.'],
    ['Loops','for, while, repeated logic and tracing iterations.'],
    ['Strings','Text processing, indexing and common String operations.'],
    ['Arrays','Storing collections, traversing arrays and manipulating values.'],
    ['Sorting','Understanding how simple sorting algorithms rearrange data.'],
    ['Methods','Reusable blocks with parameters and return values.'],
    ['Recursion','Methods that solve a problem by calling themselves on a smaller version.'],
    ['File I/O','Reading from and writing to files.'],
    ['Debugging & complete programs','Finding errors, using an IDE and combining topics into small programs.']
  ];

  const esc = (value) => String(value).replace(/[&<>"']/g, (ch) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[ch]);

  function prerequisite(c) {
    const parts = [];
    if (c.hp) parts.push('<span><b>HP</b>' + esc(c.hp) + '</span>');
    if (c.sp) parts.push('<span><b>SP</b>' + esc(c.sp) + '</span>');
    return parts.length ? parts.join('') : '<span><b>Prerequisite</b>Not listed</span>';
  }

  function detailedOutline(c) {
    if (!c.detailed) {
      return `
        <div class="bracu-course-ready">
          <span class="eyebrow">COURSE WORKSPACE</span>
          <div class="bracu-ready-grid">
            <div><b>Official outline</b><p>Course section created. Add the verified topic-by-topic outline here.</p></div>
            <div><b>Study path</b><p>Break the outline into a recommended learning order and checkpoints.</p></div>
            <div><b>Resources</b><p>Add BRACU-aligned notes, videos, practice and past resources.</p></div>
            <div><b>Practice</b><p>Connect useful First Comet lessons, simulations or exercises.</p></div>
          </div>
        </div>`;
    }
    return `
      <div class="bracu-cse110-detail">
        <span class="eyebrow">CSE110 TOPIC MAP</span>
        <ol class="bracu-topic-map">
          ${cse110Topics.map(([title,text]) => `<li><b>${esc(title)}</b><span>${esc(text)}</span></li>`).join('')}
        </ol>
        <div class="bracu-study-order">
          <span class="eyebrow">RECOMMENDED STUDY ORDER</span>
          <div><span>Basics</span><i>→</i><span>Conditions</span><i>→</i><span>Loops</span><i>→</i><span>Strings</span><i>→</i><span>Arrays</span><i>→</i><span>Methods</span><i>→</i><span>Recursion</span><i>→</i><span>Files</span></div>
        </div>
      </div>`;
  }

  function card(c, index) {
    return `
      <article class="bracu-catalog-card" data-bracu-course="${esc(c.code)}" data-area="${esc(c.area)}">
        <details ${c.code === 'CSE110' ? 'open' : ''}>
          <summary>
            <span class="bracu-catalog-code">${esc(c.code)}</span>
            <span class="bracu-catalog-title"><b>${esc(c.title)}</b><small>${esc(c.area)} · ${esc(c.focus)}</small></span>
            <span class="bracu-catalog-toggle" aria-hidden="true">+</span>
          </summary>
          <div class="bracu-catalog-body">
            <div class="bracu-course-facts">
              <span><b>Area</b>${esc(c.area)}</span>
              ${prerequisite(c)}
            </div>
            <p class="bracu-focus"><b>First Comet overview:</b> ${esc(c.focus)}</p>
            ${detailedOutline(c)}
            <div class="bracu-course-actions">
              <a class="secondary" href="https://cse.bracu.ac.bd/course/view/${encodeURIComponent(c.code)}" target="_blank" rel="noopener">Official course page ↗</a>
              ${c.code === 'CSE110' ? '<button type="button" class="primary" data-view="learn">Practise programming →</button>' : ''}
            </div>
          </div>
        </details>
      </article>`;
  }

  const areas = ['All', ...new Set(courses.map((course) => course.area))];

  root.innerHTML = `
    <section class="bracu-hero">
      <div>
        <span class="eyebrow">BRAC UNIVERSITY · UNDERGRADUATE CSE</span>
        <h1>BRACU Courses</h1>
        <p>Browse the current undergraduate CSE course list, then turn each course into a topic map, study order and practice plan.</p>
      </div>
      <aside>
        <span class="eyebrow">26 COURSES</span>
        <b>Start with the official course structure. Study one course in a clear order instead of collecting random resources.</b>
      </aside>
    </section>

    <section class="bracu-catalog-tools">
      <div>
        <label for="bracuCourseSearch">Find a course</label>
        <input id="bracuCourseSearch" type="search" placeholder="Try CSE423, database, robotics…" autocomplete="off">
      </div>
      <div class="bracu-area-filters" aria-label="Filter BRACU CSE courses by area">
        ${areas.map((area, index) => `<button type="button" data-bracu-area="${esc(area)}" class="${index === 0 ? 'active' : ''}">${esc(area)}</button>`).join('')}
      </div>
    </section>

    <div class="bracu-catalog-count" id="bracuCatalogCount" role="status"></div>
    <section class="bracu-catalog-grid" aria-label="BRACU undergraduate CSE course sections">
      ${courses.map(card).join('')}
    </section>

    <section class="bracu-source-note">
      <span class="eyebrow">SOURCE NOTE</span>
      <p>Course codes, titles and HP/SP prerequisite labels are based on BRAC University CSE's undergraduate course listing. First Comet overviews and study-path wording are learning aids, not official BRACU descriptions.</p>
      <a href="https://cse.bracu.ac.bd/undergraduate/program" target="_blank" rel="noopener">Open BRACU undergraduate CSE program ↗</a>
    </section>
  `;

  const search = root.querySelector('#bracuCourseSearch');
  const cards = [...root.querySelectorAll('.bracu-catalog-card')];
  const filters = [...root.querySelectorAll('[data-bracu-area]')];
  const count = root.querySelector('#bracuCatalogCount');
  let activeArea = 'All';

  function applyFilters() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const areaOk = activeArea === 'All' || card.dataset.area === activeArea;
      const textOk = !query || card.textContent.toLowerCase().includes(query);
      card.hidden = !(areaOk && textOk);
      if (!card.hidden) visible++;
    });
    count.textContent = visible + (visible === 1 ? ' course' : ' courses') + ' shown';
  }

  search.addEventListener('input', applyFilters);
  filters.forEach((button) => button.addEventListener('click', () => {
    activeArea = button.dataset.bracuArea;
    filters.forEach((item) => item.classList.toggle('active', item === button));
    applyFilters();
  }));

  applyFilters();
})();
