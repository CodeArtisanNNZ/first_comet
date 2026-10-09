const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const hasAnime=()=>typeof window.anime==='function';
const state={view:'home',level:localStorage.getItem('fc-level')||'Beginner',theme:localStorage.getItem('fc-theme')||'light',projects:JSON.parse(localStorage.getItem('fc-projects')||'[]')};
const views={home:['Workspace','Launchpad'],project:['Project','Studio'],guide:['Guide','Build path'],vscode:['VS Code','Code room'],learn:['Learn','Code course'],careers:['Explore','Career paths'],cv:['Career','CV Studio'],settings:['Workspace','Settings']};
const info={home:['Your progress home','See what you have already accomplished, choose one useful action for today, and return to your real projects.','First Comet keeps the full roadmap underneath, but your homepage should show only the next useful choices.'],project:['Your project studio','Files are on the left, your editor is in the centre, project guidance is on the right and Git changes run along the bottom.','A commit is a named checkpoint of your changes. It lets you safely return to an earlier version.'],vscode:['Your code room','Open the real VS Code Web and keep First Comet open beside it for step-by-step guidance.','Beginners learn the actual VS Code interface instead of a lookalike editor, so the skills transfer directly to desktop VS Code later.'],guide:['The build path','Five stages take a project from a clear problem to a live website. Finish one useful version before adding more features.','Frontend is what people see. Backend handles logic. A database stores information.'],learn:['Beginner code course','Look up a word, read a tiny example, then try and complete one milestone at a time.','For a website, start with HTML, CSS and JavaScript. Practice on localhost and choose a backend language only when needed.'],careers:['Career Explorer','Compare real CSE career directions without pretending every path is easy or guaranteed.','Your first career choice is a direction to explore, not a permanent decision. Skills can transfer between many tech roles.'],cv:['CV Studio','Build a clean ATS-friendly CV, tailor it to a job description, and export a readable application document.','Simple structure, truthful keywords and evidence of your skills matter more than decorative resume design.'],settings:['Workspace settings','Choose how much guidance you want and how the interface looks.','Your projects and preferences currently stay in this browser.']};
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
function setView(v){$('.view').forEach(x=>x.classList.remove('active'));$('#view-'+v)?.classList.add('active');$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===v||(v==='project'&&x.dataset.view==='home')));state.view=v;$('#sectionLabel').textContent=views[v]?.[0]||'Workspace';$('#pageLabel').textContent=views[v]?.[1]||v;document.querySelector('main').scrollTop=0;closeAll();animateView(v);if(v==='learn')setTimeout(openPreferredLearnSection,0);if(v==='home')setTimeout(()=>window.FirstCometAchievements?.refresh(),0)}
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
function bind(){$$('[data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));$('#newProjectBtn').onclick=()=>openModal('#projectModal');$('#openProjectBtn').onclick=()=>openModal('#importModal');$('#createProject').onclick=createProject;$$('[data-close]').forEach(b=>b.onclick=closeAll);$('#skipIntro').onclick=finishIntro;$('#themeBtn').onclick=()=>setTheme(state.theme==='light'?'dark':'light');$('#settingTheme').onclick=()=>setTheme(state.theme==='light'?'dark':'light');$('#replayIntro').onclick=runIntro;$('#infoBtn').onclick=()=>toggleInfo(true);$('#closeInfo').onclick=()=>toggleInfo(false);$('#commandBar').onclick=openPalette;$$('.command-trigger').forEach(b=>b.onclick=openPalette);$('#paletteNew').onclick=()=>{closeAll();openModal('#projectModal')};$('#folderImport').onclick=()=>$('#folderPicker').click();$('#githubImport').onclick=()=>{closeAll();toast('GitHub connection will open during desktop setup')};$('#folderPicker').onchange=e=>{if(!e.target.files.length)return;const folder=e.target.files[0].webkitRelativePath.split('/')[0]||'Imported project';const p={name:folder,type:'Imported folder',created:Date.now()};state.projects.push(p);localStorage.setItem('fc-projects',JSON.stringify(state.projects));renderProjects();closeAll();openProject(p);toast('Folder opened — browser access is read-only in this preview')};$$('.learn-nav button').forEach(b=>b.onclick=()=>{$$('.learn-nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderTopics(b.dataset.topic)});$$('.segmented button').forEach(b=>b.onclick=()=>{applyExperienceLevel(b.dataset.level||b.textContent.trim(),true);if(state.view==='learn')openPreferredLearnSection()});$('#levelBtn').onclick=()=>setView('settings');$('#clearData').onclick=()=>{if(confirm('Remove all projects saved in this browser?')){state.projects=[];localStorage.removeItem('fc-projects');renderProjects();toast('Local project data cleared')}};$('#nextStepBtn').onclick=()=>{setView('guide');toast('Next step: define one clear problem')};$('#reviewBtn').onclick=()=>toast('Review ready — connect GitHub to push changes');$$('.mission').forEach((m,i)=>m.onclick=()=>{$$('.mission').forEach(x=>x.classList.remove('active'));m.classList.add('active');const content=[['01','PLAN BEFORE CODE','Define one clear problem','Write down who has the problem, what frustrates them and the smallest useful result your project can deliver.'],['02','BUILD THE INTERFACE','Make the first screen useful','Create the layout, navigation and one complete user flow before polishing every page.'],['03','ADD REAL BEHAVIOUR','Connect actions to logic','Choose what happens when users submit forms, search, save information or sign in.'],['04','STORE INFORMATION','Design your data carefully','List the information you need, how records relate and who is allowed to read or change them.'],['05','PUBLISH SAFELY','Review, test and launch','Check mobile layout, accessibility, secrets and errors before connecting a domain.']][i];$('#lessonPanel').querySelector('.lesson-no').textContent=content[0];$('#lessonPanel').querySelector('.eyebrow').textContent=content[1];$('#lessonPanel h2').textContent=content[2];$('#lessonPanel>div:nth-child(2)>p').textContent=content[3];animeRun({targets:'#lessonPanel',translateX:[20,0],opacity:[.4,1],duration:350})});$$('.file').forEach(f=>f.onclick=()=>{$$('.file').forEach(x=>x.classList.remove('active'));f.classList.add('active');$('#activeFile').textContent=f.dataset.file;toast(`${f.dataset.file} opened`)});$('#commandInput').oninput=e=>{const q=e.target.value.toLowerCase();$$('.palette-results button').forEach(b=>b.hidden=!b.textContent.toLowerCase().includes(q))};$('#openVscodeWebMain')?.addEventListener('click',()=>window.open('https://vscode.dev/','_blank','noopener'));
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
