const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const hasAnime=()=>typeof window.anime==='function';
const state={view:'home',level:localStorage.getItem('fc-level')||'Beginner',theme:localStorage.getItem('fc-theme')||'light',projects:JSON.parse(localStorage.getItem('fc-projects')||'[]')};
const views={home:['Workspace','Launchpad'],project:['Project','Studio'],guide:['Guide','Build path'],vscode:['VS Code','Code room'],learn:['Learn','Code course'],bracu:['University','BRACU Courses'],careers:['Explore','Career paths'],cv:['Career','CV Studio'],settings:['Workspace','Settings']};
const info={home:['Your progress home','See what you have already accomplished, choose one useful action for today, and return to your real projects.','First Comet keeps the full roadmap underneath, but your homepage should show only the next useful choices.'],project:['Your project studio','Files are on the left, your editor is in the centre, project guidance is on the right and Git changes run along the bottom.','A commit is a named checkpoint of your changes. It lets you safely return to an earlier version.'],vscode:['Your code room','Open the real VS Code Web and keep First Comet open beside it for step-by-step guidance.','Beginners learn the actual VS Code interface instead of a lookalike editor, so the skills transfer directly to desktop VS Code later.'],guide:['The build path','Five stages take a project from a clear problem to a live website. Finish one useful version before adding more features.','Frontend is what people see. Backend handles logic. A database stores information.'],learn:['Beginner code course','Look up a word, read a tiny example, then try and complete one milestone at a time.','For a website, start with HTML, CSS and JavaScript. Practice on localhost and choose a backend language only when needed.'],bracu:['BRACU course guide','See BRAC University CSE course outlines and turn each course into a practical study path.','Use the official outline as the map, then practise each topic instead of studying randomly.'],careers:['Career Explorer','Compare real CSE career directions without pretending every path is easy or guaranteed.','Your first career choice is a direction to explore, not a permanent decision. Skills can transfer between many tech roles.'],cv:['CV Studio','Build a clean ATS-friendly CV, tailor it to a job description, and export a readable application document.','Simple structure, truthful keywords and evidence of your skills matter more than decorative resume design.'],settings:['Workspace settings','Choose how much guidance you want and how the interface looks.','Your projects and preferences currently stay in this browser.']};
const globalSearchCore=[
  {title:'Bubble Sort',section:'Learn · Algorithms',description:'Watch neighbouring values compare and swap step by step.',keywords:'sorting sort swap animation algorithm',target:'algorithm:bubble'},
  {title:'Binary Search',section:'Learn · Algorithms',description:'Follow low, high and mid as the search space gets smaller.',keywords:'search algorithm sorted array low high mid',target:'algorithm:binary'},
  {title:'HTML',section:'Learn · Practice Code',description:'Structure webpages and learn the core HTML words.',keywords:'web structure tags elements markup',target:'language:html'},
  {title:'CSS',section:'Learn · Practice Code',description:'Style layouts, spacing, responsive pages and visual states.',keywords:'style layout responsive design flex grid',target:'language:css'},
  {title:'JavaScript',section:'Learn · Practice Code',description:'Add logic and interaction to webpages.',keywords:'js programming browser dom functions arrays',target:'language:javascript'},
  {title:'Python',section:'Learn · Practice Code',description:'Learn Python fundamentals through small milestones.',keywords:'python programming backend data automation',target:'language:python'},
  {title:'Java',section:'Learn · Practice Code',description:'Learn Java fundamentals and typed programming.',keywords:'java programming oop classes',target:'language:java'},
  {title:'PHP',section:'Learn · Practice Code',description:'Learn PHP fundamentals for web backends.',keywords:'php backend server web',target:'language:php'},
  {title:'Code Lab',section:'Learn',description:'Practice code in the interactive First Comet lab.',keywords:'practice editor run code sandbox',target:'learn:lab'},
  {title:'Localhost setup',section:'Learn · Start here',description:'Set up your computer and run a project locally.',keywords:'localhost local server setup computer xampp',target:'learn:localhost'},
  {title:'Video lessons',section:'Learn · Videos',description:'Find free Bangla and English learning videos.',keywords:'youtube bangla english classes tutorials',target:'learn:videos'},
  {title:'Coding dictionary',section:'Learn · Word library',description:'Search beginner programming words and tiny examples.',keywords:'glossary words terms definitions reference',target:'course:dictionary'},
  {title:'VS Code',section:'VS Code',description:'Learn the real editor, files, saving, errors and source control.',keywords:'editor vscode files extensions terminal',target:'view:vscode'},
  {title:'Build path',section:'Build',description:'Follow the project journey from idea to a live website.',keywords:'project roadmap milestones build publish',target:'view:guide'},
  {title:'Git & GitHub',section:'Build · Save your work',description:'Learn commits, repositories, push, pull and version control.',keywords:'git github commit push pull repository branch',target:'view:guide'},
  {title:'Database & SQL',section:'Build · Give it memory',description:'Learn how applications store and retrieve data.',keywords:'database sql postgres mysql data tables supabase',target:'view:guide'},
  {title:'Deployment & domains',section:'Build · Put it online',description:'Learn how projects become live and get a domain.',keywords:'deploy hosting vercel cloudflare domain publish live',target:'view:guide'},
  {title:'BRACU Courses',section:'University',description:'Open BRAC University CSE course outlines and study paths.',keywords:'bracu brac university courses course outline cse',target:'view:bracu'},
  {title:'CSE110',section:'BRACU Courses · Programming Language I',description:'See the CSE110 topic map and recommended study order.',keywords:'cse 110 programming language java bracu course outline',target:'view:bracu'},
  {title:'Career Explorer',section:'Careers',description:'Compare CSE career paths and what each one requires.',keywords:'jobs career direction software data security ai',target:'view:careers'},
  {title:'CV Studio',section:'CV Studio',description:'Build a clean ATS-friendly CV from real evidence.',keywords:'resume cv ats job application',target:'view:cv'},
  {title:'My projects',section:'Home',description:'Open projects saved in this browser.',keywords:'projects work files',target:'view:home'},
  {title:'Settings',section:'Settings',description:'Change theme and guidance level.',keywords:'dark light beginner pro theme mode',target:'view:settings'}
];
const globalCareerSearch=[
  ['frontend','Front-End Developer','HTML CSS JavaScript TypeScript React accessibility UI'],
  ['backend','Back-End Developer','APIs SQL databases authentication server security'],
  ['fullstack','Full-Stack Developer','frontend backend database deployment full stack'],
  ['software','Software Engineer','programming algorithms data structures system design'],
  ['mobile','Mobile App Developer','Flutter React Native Kotlin Swift Android iOS'],
  ['qa','QA / Automation Engineer','testing Playwright Cypress Selenium automation'],
  ['devops','Cloud / DevOps / SRE','Linux Docker CI CD cloud AWS reliability'],
  ['cyber','Cybersecurity','security networking Linux OWASP Burp threats'],
  ['analyst','Data Analyst / BI Analyst','Excel SQL Power BI Tableau analytics'],
  ['dataengineer','Data Engineer','SQL Python ETL warehouse pipelines cloud'],
  ['ai','AI / ML Engineer & Data Scientist','AI machine learning Python statistics models data science'],
  ['embedded','Embedded / IoT / Robotics','C C++ microcontrollers electronics robotics IoT'],
  ['game','Game Developer','Unity Unreal C# C++ gameplay'],
  ['product','Product / Business / Systems Analyst','requirements product business systems communication'],
  ['research','Research / Academia','research papers experiments MSc PhD academia']
].map(([id,title,keywords])=>({title,section:'Careers · Learning path',description:'Open this career path and see what you need to learn.',keywords,target:'career:'+id}));

let globalSearchMatches=[];
let globalSearchActive=0;
const searchEscape=(value)=>String(value).replace(/[&<>"']/g,(ch)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const searchNorm=(value)=>String(value||'').toLowerCase().replace(/[^a-z0-9+#./ -]+/g,' ').replace(/\s+/g,' ').trim();

function buildGlobalSearchIndex(){
  const items=[...globalSearchCore,...globalCareerSearch];
  state.projects.forEach((project,index)=>items.push({
    title:project.name,
    section:'My projects',
    description:(project.type||'Project')+' · stored on this device',
    keywords:'project local work '+(project.type||''),
    target:'project:'+index
  }));
  const bracuCourses=window.FC_BRACU_COURSES;
  if(Array.isArray(bracuCourses)){
    bracuCourses.forEach((course)=>items.push({
      title:course.code+' · '+course.title,
      section:'BRACU Courses',
      description:course.focus||'BRAC University CSE course',
      keywords:[course.code,course.title,course.area,course.hp,course.sp,'bracu brac university course'].filter(Boolean).join(' '),
      target:'bracu:'+course.code
    }));
  }
  const course=window.FC_COURSE;
  if(course?.languages){
    const seen=new Set();
    course.languages.forEach((language)=>{
      language.terms.forEach((term)=>{
        const key=searchNorm(term.word);
        if(!key||seen.has(key))return;
        seen.add(key);
        items.push({
          title:term.word,
          section:'Learn · Coding dictionary',
          description:term.meaning,
          keywords:[term.meaning,term.read,term.note,language.label].filter(Boolean).join(' '),
          target:'dictionary:'+term.word
        });
      });
    });
  }
  return items;
}

function globalSearchScore(item,query){
  const q=searchNorm(query);
  if(!q)return 0;
  const title=searchNorm(item.title);
  const section=searchNorm(item.section);
  const hay=searchNorm([item.title,item.section,item.description,item.keywords].join(' '));
  const tokens=q.split(' ').filter(Boolean);
  if(!tokens.every((token)=>hay.includes(token)))return -1;
  let score=10;
  if(title===q)score+=500;
  else if(title.startsWith(q))score+=300;
  else if(title.includes(q))score+=220;
  if(section.includes(q))score+=70;
  tokens.forEach((token)=>{
    if(title.startsWith(token))score+=45;
    else if(title.includes(token))score+=25;
  });
  return score;
}

function renderGlobalSearch(query=''){
  const results=$('#globalSearchResults');
  const input=$('#globalSearchInput');
  if(!results||!input)return;
  const q=query.trim();
  const source=buildGlobalSearchIndex();
  globalSearchMatches=q
    ? source.map((item)=>({item,score:globalSearchScore(item,q)})).filter((row)=>row.score>=0).sort((a,b)=>b.score-a.score||a.item.title.localeCompare(b.item.title)).slice(0,8).map((row)=>row.item)
    : ['Bubble Sort','Code Lab','Git & GitHub','Career Explorer','VS Code'].map((title)=>source.find((item)=>item.title===title)).filter(Boolean);
  globalSearchActive=0;
  results.hidden=false;
  input.setAttribute('aria-expanded','true');
  if(!globalSearchMatches.length){
    results.innerHTML='<div class="global-search-empty"><b>No match yet.</b><span>Try a shorter word, like “bubble”, “SQL”, “Git”, or “career”.</span></div>';
    return;
  }
  results.innerHTML=globalSearchMatches.map((item,index)=>`
    <button type="button" role="option" data-global-search-result="${index}" aria-selected="${index===0}">
      <span class="global-result-mark" aria-hidden="true">${index===0?'→':'·'}</span>
      <span class="global-result-copy"><b>${searchEscape(item.title)}</b><small>${searchEscape(item.section)}</small><em>${searchEscape(item.description)}</em></span>
      <span class="global-result-go" aria-hidden="true">↗</span>
    </button>`).join('');
}

function closeGlobalSearch(){
  const results=$('#globalSearchResults');
  const input=$('#globalSearchInput');
  if(results)results.hidden=true;
  if(input)input.setAttribute('aria-expanded','false');
}

function setGlobalSearchActive(index){
  if(!globalSearchMatches.length)return;
  globalSearchActive=(index+globalSearchMatches.length)%globalSearchMatches.length;
  document.querySelectorAll('[data-global-search-result]').forEach((button,i)=>{
    const active=i===globalSearchActive;
    button.classList.toggle('active',active);
    button.setAttribute('aria-selected',String(active));
    const mark=button.querySelector('.global-result-mark');
    if(mark)mark.textContent=active?'→':'·';
  });
  document.querySelector('[data-global-search-result="'+globalSearchActive+'"]')?.scrollIntoView({block:'nearest'});
}

function flashSearchArrival(element){
  if(!element)return;
  element.classList.remove('global-search-arrival');
  void element.offsetWidth;
  element.classList.add('global-search-arrival');
  element.scrollIntoView({block:'start',behavior:'smooth'});
  setTimeout(()=>element.classList.remove('global-search-arrival'),1800);
}

function runGlobalSearch(item){
  if(!item)return;
  closeGlobalSearch();
  const target=item.target||'';
  const parts=target.split(':');
  const kind=parts.shift();
  if(kind==='view'){setView(parts[0]);return;}
  if(kind==='bracu'){
    setView('bracu');
    setTimeout(()=>{
      const card=document.querySelector('.bracu-catalog-card[data-bracu-course="'+parts[0]+'"]');
      const details=card?.querySelector('details');
      if(details)details.open=true;
      flashSearchArrival(card);
    },0);
    return;
  }
  if(kind==='learn'){
    setView('learn');
    setTimeout(()=>window.FirstCometCourse?.openSection(parts[0]),0);
    return;
  }
  if(kind==='course'){
    setView('learn');
    setTimeout(()=>{
      window.FirstCometCourse?.openSection('course');
      setTimeout(()=>document.querySelector('[data-course-tab="'+parts[0]+'"]')?.click(),0);
    },0);
    return;
  }
  if(kind==='language'){
    setView('learn');
    setTimeout(()=>{
      window.FirstCometCourse?.openSection('course');
      setTimeout(()=>document.querySelector('[data-course-language="'+parts[0]+'"]')?.click(),0);
    },0);
    return;
  }
  if(kind==='algorithm'){
    setView('learn');
    setTimeout(()=>{
      window.FirstCometCourse?.openSection('course');
      setTimeout(()=>{
        document.querySelector('[data-course-tab="algorithms"]')?.click();
        setTimeout(()=>flashSearchArrival(document.querySelector(parts[0]==='bubble'?'.course-bubble-sort':'.course-algorithm-definition')),20);
      },0);
    },0);
    return;
  }
  if(kind==='dictionary'){
    const word=parts.join(':');
    setView('learn');
    setTimeout(()=>{
      window.FirstCometCourse?.openSection('course');
      setTimeout(()=>{
        document.querySelector('[data-course-tab="dictionary"]')?.click();
        setTimeout(()=>{
          const scope=$('#courseSearchScope');
          const input=$('#courseSearch');
          if(scope){scope.value='all';scope.dispatchEvent(new Event('change',{bubbles:true}));}
          if(input){input.value=word;input.dispatchEvent(new Event('input',{bubbles:true}));}
          setTimeout(()=>flashSearchArrival(document.querySelector('.course-word')),20);
        },0);
      },0);
    },0);
    return;
  }
  if(kind==='career'){
    setView('careers');
    setTimeout(()=>{
      const card=document.querySelector('.career-card[data-career-id="'+parts[0]+'"]');
      const details=card?.querySelector('.career-details');
      if(details)details.open=true;
      flashSearchArrival(card);
    },0);
    return;
  }
  if(kind==='project'){
    setView('home');
    setTimeout(()=>{
      const details=document.querySelector('.home-projects');
      if(details)details.open=true;
      const card=document.querySelector('.project-card[data-project="'+parts[0]+'"]');
      flashSearchArrival(card||details);
    },0);
  }
}

function bindGlobalSearch(){
  const input=$('#globalSearchInput');
  const results=$('#globalSearchResults');
  if(!input||!results)return;
  input.addEventListener('focus',()=>renderGlobalSearch(input.value));
  input.addEventListener('input',()=>renderGlobalSearch(input.value));
  input.addEventListener('keydown',(event)=>{
    if(event.key==='ArrowDown'){event.preventDefault();setGlobalSearchActive(globalSearchActive+1);}
    else if(event.key==='ArrowUp'){event.preventDefault();setGlobalSearchActive(globalSearchActive-1);}
    else if(event.key==='Enter'&&globalSearchMatches.length){event.preventDefault();runGlobalSearch(globalSearchMatches[globalSearchActive]);}
    else if(event.key==='Escape'){event.preventDefault();closeGlobalSearch();input.blur();}
  });
  results.addEventListener('click',(event)=>{
    const button=event.target.closest('[data-global-search-result]');
    if(!button)return;
    runGlobalSearch(globalSearchMatches[+button.dataset.globalSearchResult]);
  });
  document.addEventListener('click',(event)=>{
    if(!event.target.closest('#globalSearch'))closeGlobalSearch();
  });
  document.addEventListener('keydown',(event)=>{
    const typing=event.target.matches?.('input,textarea,select,[contenteditable="true"]');
    if(event.key==='/'&&!typing&&!event.ctrlKey&&!event.metaKey&&!event.altKey){
      event.preventDefault();
      input.focus();
      input.select();
    }
  });
}

const topics={
 terms:[['COMMIT','A named checkpoint','A saved snapshot of changes in Git.'],['FETCH','Check for remote changes','Downloads information from GitHub without changing your files.'],['NAVBAR','Primary navigation','The group of links used to move around a website.'],['API','A bridge between systems','Rules that let one application request data or actions from another.'],['RESPONSIVE','Works across screens','A layout that adapts to phones, tablets and desktops.'],['FUZZY SEARCH','Find close matches','Search that tolerates typos and similar wording.']],
 languages:[['1995 · BRENDAN EICH','JavaScript','Best for interactive websites; flexible but easy to structure poorly.'],['1991 · GUIDO VAN ROSSUM','Python','Readable and strong for data, automation and backends; slower than compiled languages.'],['1995 · JAMES GOSLING','Java','Strong for large systems and Android; reliable but verbose.'],['2012 · MICROSOFT','TypeScript','JavaScript with type checking; safer for larger apps.'],['1995 · RASMUS LERDORF','PHP','Affordable web backends and broad hosting; inconsistent older patterns.'],['2011 · JETBRAINS','Kotlin','Modern Android and backend language; smaller ecosystem than Java.']],
 database:[['RELATIONAL','PostgreSQL','Powerful, reliable and excellent for most serious applications.'],['RELATIONAL','MySQL','Popular, approachable and widely supported by low-cost hosts.'],['DOCUMENT','MongoDB','Flexible JSON-like records; useful when data shape changes often.'],['LOCAL','SQLite','A complete database in one file; ideal for prototypes and local apps.'],['HOSTED POSTGRES','Supabase','Database, authentication and storage with a generous starter tier.'],['REALTIME DOCUMENT','Firebase','Fast setup for realtime apps; pricing and queries require planning.']],
 github:[['LOCAL STEP','git add','Choose which file changes belong in the next checkpoint.'],['LOCAL STEP','git commit','Create the checkpoint and describe what changed.'],['REMOTE STEP','git push','Send your commits to the connected GitHub repository.'],['REMOTE STEP','git pull','Bring remote changes into your current branch.'],['SAFETY','Branch','An independent line of work that protects the main version.'],['COLLABORATION','Pull request','Ask teammates to review changes before merging them.']],
 hosting:[['STATIC SITES','GitHub Pages','Free for static HTML, CSS and JavaScript projects.'],['FRONTEND','Vercel','Simple deployments for frontend frameworks and serverless functions.'],['FULL STACK','Render','Hosts web services and databases; free services may sleep.'],['DATABASE','Supabase','Managed PostgreSQL, authentication and file storage.'],['DOMAIN','GitHub Student Pack','Eligible students can access selected developer benefits and domain offers.'],['DNS & SECURITY','Cloudflare','DNS, caching and protection with a useful free tier.']],
 vscode:[['NAVIGATION','Ctrl + P','Open any file by typing part of its name.'],['COMMANDS','Ctrl + Shift + P','Find almost every VS Code action.'],['TERMINAL','Ctrl + `','Open or hide the built-in terminal.'],['EDITING','Alt + ↑ / ↓','Move the current line without cutting and pasting.'],['MULTI-CURSOR','Alt + Click','Edit several places at once.'],['FORMAT','Shift + Alt + F','Format the current document using your formatter.']]
};
function animeRun(opts){if(hasAnime()) return anime(opts); const t=opts.targets; $$(typeof t==='string'?t:'').forEach(e=>{e.style.opacity=1;e.style.transform='none'});return null}
function runIntro(){
  const intro=$('#intro'),app=$('#app');
  clearTimeout(window.__fcIntroFailsafe);
  if(app){
    app.style.opacity=1;
    app.removeAttribute('aria-hidden');
  }
  if(!intro) return;

  intro.style.display='grid';
  intro.style.opacity=1;
  intro.style.visibility='visible';
  intro.style.pointerEvents='auto';
  intro.style.animation='none';
  void intro.offsetWidth;
  intro.style.animation='introAutoExit .45s ease 3.6s forwards';

  window.__fcIntroFailsafe=setTimeout(finishIntro,4100);
}
function revealFirstCometApp(){
  const app=$('#app');
  if(app){
    app.style.opacity=1;
    app.removeAttribute('aria-hidden');
  }
  animateView(state.view||'home');
}
function finishIntro(){
  clearTimeout(window.__fcIntroFailsafe);
  const intro=$('#intro');
  if(intro){
    intro.style.opacity=0;
    intro.style.visibility='hidden';
    intro.style.pointerEvents='none';
    intro.style.display='none';
  }
  localStorage.setItem('fc-intro-seen','1');
  revealFirstCometApp();
}
function animateView(v){const el=$('#view-'+v);if(!el)return;animeRun({targets:el.querySelectorAll('h1,.eyebrow,.home-action-card,.home-projects,.home-process,.launch-card,.project-list,.mission,.lesson-panel,.topic-card,.setting,.studio'),translateY:[18,0],opacity:[0,1],delay:hasAnime()?anime.stagger(45):0,duration:500,easing:'easeOutQuad'})}
function preferredLearnSection(){
  if(state.level==='Beginner') return 'lab';
  if(state.level==='Pro') return 'reference';
  return 'project';
}
function applyExperienceLevel(level,notify=false){
  state.level=level||'Beginner';
  document.body.dataset.level=state.level;
  $('#levelText').textContent=state.level;
  $$('.segmented button').forEach(b=>b.classList.toggle('active',(b.dataset.level||b.textContent.trim())===state.level));
  localStorage.setItem('fc-level',state.level);

  const learnSmall=$('.nav-item[data-view="learn"] small');
  const buildSmall=$('.nav-item[data-view="guide"] small');
  const codeSmall=$('.nav-item[data-view="vscode"] small');
  if(state.level==='Beginner'){
    if(learnSmall)learnSmall.textContent='Start here · milestones';
    if(buildSmall)buildSmall.textContent='Teacher-led path';
    if(codeSmall)codeSmall.textContent='Open real VS Code';
    const h=$('#view-learn .page-heading h1'),p=$('#view-learn .page-heading p');
    if(h)h.innerHTML='Build first.<br>Learn while doing.';
    if(p)p.textContent='No documentation wall. First Comet gives you one small milestone, tells you where to work, and checks what comes next.';
  }else if(state.level==='Practising'){
    if(learnSmall)learnSmall.textContent='Practice · concepts';
    if(buildSmall)buildSmall.textContent='Guided project path';
    if(codeSmall)codeSmall.textContent='VS Code + guidance';
    const h=$('#view-learn .page-heading h1'),p=$('#view-learn .page-heading p');
    if(h)h.innerHTML='Practice the parts<br>you actually use.';
    if(p)p.textContent='Keep the milestones, add deeper code practice, and use references only when you need them.';
  }else{
    if(learnSmall)learnSmall.textContent='Quick reference';
    if(buildSmall)buildSmall.textContent='Fast project map';
    if(codeSmall)codeSmall.textContent='Launch VS Code Web';
    const h=$('#view-learn .page-heading h1'),p=$('#view-learn .page-heading p');
    if(h)h.innerHTML='Skip the walkthrough.<br>Get the reference.';
    if(p)p.textContent='Fast mode removes beginner explanations and surfaces concise references, project structure and workflow checkpoints.';
  }
  if(notify)toast(`${state.level} mode applied`);
}
function openPreferredLearnSection(){
  const section=preferredLearnSection();
  const btn=$(`[data-learn-section="${section}"]`);
  if(btn && getComputedStyle(btn).display!=='none') btn.click();
}
function setView(v){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));$('#view-'+v)?.classList.add('active');document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===v||(v==='project'&&x.dataset.view==='home')));state.view=v;$('#sectionLabel').textContent=views[v]?.[0]||'Workspace';$('#pageLabel').textContent=views[v]?.[1]||v;document.querySelector('main').scrollTop=0;closeAll();closeGlobalSearch();animateView(v);if(v==='learn')setTimeout(openPreferredLearnSection,0);if(v==='home')setTimeout(()=>window.FirstCometAchievements?.refresh(),0)}
function openModal(id){const el=$(id);el.classList.add('open');el.setAttribute('aria-hidden','false');animeRun({targets:el.querySelector('.modal'),scale:[.9,1],translateY:[20,0],opacity:[0,1],duration:350,easing:'easeOutBack'})}
function closeAll(){ $$('.modal-backdrop,.palette').forEach(x=>{x.classList.remove('open');x.setAttribute('aria-hidden','true')}) }
function toast(msg){const el=$('#toast');el.textContent=msg;if(hasAnime()){anime.remove(el);anime.timeline().add({targets:el,translateY:[120,0],opacity:[0,1],duration:300}).add({targets:el,translateY:[0,20],opacity:[1,0],delay:1800,duration:300})}else{el.style.transform='none';el.style.opacity=1;setTimeout(()=>el.style.opacity=0,2000)}}
function renderProjects(){const list=$('#projectList');if(!state.projects.length){list.innerHTML='<button class="empty-project" id="emptyAdd"><b>＋</b><span>No projects yet</span><small>Add your first project</small></button>';$('#emptyAdd').onclick=()=>openModal('#projectModal');return}list.innerHTML=state.projects.map((p,i)=>`<button class="project-card" data-project="${i}"><span class="project-badge">${p.name.slice(0,2).toUpperCase()}</span><b>${p.name}</b><small>${p.type} · stored locally</small></button>`).join('')+`<button class="empty-project" id="emptyAdd"><b>＋</b><span>Add project</span><small>Start or import</small></button>`;$$('.project-card').forEach(b=>b.onclick=()=>openProject(state.projects[+b.dataset.project]));$('#emptyAdd').onclick=()=>openModal('#projectModal')}
function openProject(p){$('#projectName').textContent=p.name;$('#projectType').textContent=p.type;setView('project')}
function createProject(){const name=$('#projectNameInput').value.trim()||'My First Project',type=$('#projectTypeInput').value;const p={name,type,created:Date.now()};state.projects.push(p);localStorage.setItem('fc-projects',JSON.stringify(state.projects));window.FirstCometAchievements?.record({id:'project-created:'+p.created,kind:'project',title:'Started '+p.name,detail:'You created a real project workspace to build on.'});renderProjects();closeAll();openProject(p);toast('Project created on this device')}
function setTheme(theme){state.theme=theme;document.body.classList.toggle('dark',theme==='dark');localStorage.setItem('fc-theme',theme);toast(theme==='dark'?'Dark mode on':'Light mode on')}
function renderTopics(key='terms'){const grid=$('#topicGrid');grid.innerHTML=topics[key].map(x=>`<article class="topic-card"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join('');animeRun({targets:'.topic-card',scale:[.95,1],opacity:[0,1],delay:hasAnime()?anime.stagger(50):0,duration:350})}
function openPalette(){const p=$('#palette');p.classList.add('open');p.setAttribute('aria-hidden','false');setTimeout(()=>$('#commandInput').focus(),10);animeRun({targets:'.palette-box',translateY:[-20,0],scale:[.96,1],opacity:[0,1],duration:300,easing:'easeOutBack'})}
function toggleInfo(open=true){const d=$('#infoDrawer');const data=info[state.view]||info.home;$('#infoTitle').textContent=data[0];$('#infoText').textContent=data[1];$('#factText').textContent=data[2];d.classList.toggle('open',open);d.setAttribute('aria-hidden',String(!open));animeRun({targets:d,translateX:open?['105%','0%']:['0%','105%'],duration:380,easing:'easeOutExpo'})}
function bind(){bindGlobalSearch();$$('[data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));$('#newProjectBtn').onclick=()=>openModal('#projectModal');$('#openProjectBtn').onclick=()=>openModal('#importModal');$('#createProject').onclick=createProject;$$('[data-close]').forEach(b=>b.onclick=closeAll);$('#skipIntro').onclick=finishIntro;$('#themeBtn').onclick=()=>setTheme(state.theme==='light'?'dark':'light');$('#settingTheme').onclick=()=>setTheme(state.theme==='light'?'dark':'light');$('#replayIntro').onclick=runIntro;$('#infoBtn').onclick=()=>toggleInfo(true);$('#closeInfo').onclick=()=>toggleInfo(false);$('#commandBar').onclick=openPalette;$$('.command-trigger').forEach(b=>b.onclick=openPalette);$('#paletteNew').onclick=()=>{closeAll();openModal('#projectModal')};$('#folderImport').onclick=()=>$('#folderPicker').click();$('#githubImport').onclick=()=>{closeAll();toast('GitHub connection will open during desktop setup')};$('#folderPicker').onchange=e=>{if(!e.target.files.length)return;const folder=e.target.files[0].webkitRelativePath.split('/')[0]||'Imported project';const p={name:folder,type:'Imported folder',created:Date.now()};state.projects.push(p);localStorage.setItem('fc-projects',JSON.stringify(state.projects));renderProjects();closeAll();openProject(p);toast('Folder opened — browser access is read-only in this preview')};$$('.learn-nav button').forEach(b=>b.onclick=()=>{$$('.learn-nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderTopics(b.dataset.topic)});$$('.segmented button').forEach(b=>b.onclick=()=>{applyExperienceLevel(b.dataset.level||b.textContent.trim(),true);if(state.view==='learn')openPreferredLearnSection()});$('#levelBtn').onclick=()=>setView('settings');$('#clearData').onclick=()=>{if(confirm('Remove all projects saved in this browser?')){state.projects=[];localStorage.removeItem('fc-projects');renderProjects();toast('Local project data cleared')}};$('#nextStepBtn').onclick=()=>{setView('guide');toast('Next step: define one clear problem')};$('#reviewBtn').onclick=()=>toast('Review ready — connect GitHub to push changes');$$('.mission').forEach((m,i)=>m.onclick=()=>{$$('.mission').forEach(x=>x.classList.remove('active'));m.classList.add('active');const content=[['01','PLAN BEFORE CODE','Define one clear problem','Write down who has the problem, what frustrates them and the smallest useful result your project can deliver.'],['02','BUILD THE INTERFACE','Make the first screen useful','Create the layout, navigation and one complete user flow before polishing every page.'],['03','ADD REAL BEHAVIOUR','Connect actions to logic','Choose what happens when users submit forms, search, save information or sign in.'],['04','STORE INFORMATION','Design your data carefully','List the information you need, how records relate and who is allowed to read or change them.'],['05','PUBLISH SAFELY','Review, test and launch','Check mobile layout, accessibility, secrets and errors before connecting a domain.']][i];$('#lessonPanel').querySelector('.lesson-no').textContent=content[0];$('#lessonPanel').querySelector('.eyebrow').textContent=content[1];$('#lessonPanel h2').textContent=content[2];$('#lessonPanel>div:nth-child(2)>p').textContent=content[3];animeRun({targets:'#lessonPanel',translateX:[20,0],opacity:[.4,1],duration:350})});$$('.file').forEach(f=>f.onclick=()=>{$$('.file').forEach(x=>x.classList.remove('active'));f.classList.add('active');$('#activeFile').textContent=f.dataset.file;toast(`${f.dataset.file} opened`)});$('#commandInput').oninput=e=>{const q=e.target.value.toLowerCase();$$('.palette-results button').forEach(b=>b.hidden=!b.textContent.toLowerCase().includes(q))};$('#openVscodeWebMain')?.addEventListener('click',()=>window.open('https://vscode.dev/','_blank','noopener'));
const vscodeHelp={
  explorer:'Look at the far-left Activity Bar in VS Code and click the files icon. That opens Explorer, where your project folders and files live.',
  newfile:'In Explorer, move your pointer over your project folder and click the New File icon. For your first webpage, name it index.html.',
  save:'Press Ctrl + S. A small dot on a file tab means the file has unsaved changes.',
  errors:'Open View → Problems, or press Ctrl + Shift + M. Start with the first error; it usually points to the file and line that caused the problem.',
  source:'Click the branching icon in the Activity Bar. Source Control shows changed files and is where Git commits begin.',
  search:'Click the magnifying-glass icon in the Activity Bar or press Ctrl + Shift + F to search across the whole project.'
};
$$('[data-vscode-help]').forEach(b=>b.onclick=()=>{const box=$('#vscodeHelpAnswer');if(box)box.textContent=vscodeHelp[b.dataset.vscodeHelp]||''});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openPalette()}if(e.key==='Escape'){closeAll();toggleInfo(false)}})}
document.body.classList.toggle('dark',state.theme==='dark');applyExperienceLevel(state.level,false);bind();renderProjects();renderTopics();if(localStorage.getItem('fc-intro-seen'))finishIntro();else runIntro();
