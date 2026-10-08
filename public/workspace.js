// The hosted First Comet editor is intentionally browser-local. It never pretends
// to write arbitrary device folders or push GitHub commits without authorization.
(function(){
  "use strict";
  const STORAGE="fc-workspaces-v1";
  const $fc=(s,c=document)=>c.querySelector(s);
  let workspaces;
  try {workspaces=JSON.parse(localStorage.getItem(STORAGE)||"{}"); if(!workspaces||typeof workspaces!=="object"||Array.isArray(workspaces))workspaces={};}
  catch (_) {workspaces={};}
  let active=null, activeFile="index.html", editor, frame, mode="code";
  const escapeHTML=value=>String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  function starter(name){
    const label=escapeHTML(name);
    return {
      "index.html":[
        "<!doctype html>","<html lang=\"en\">","<head>","  <meta charset=\"UTF-8\">","  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
        "  <title>"+label+"</title>","  <link rel=\"stylesheet\" href=\"styles.css\">","</head>","<body>","  <main>","    <h1>"+label+"</h1>",
        "    <p>I made this in First Comet.</p>","    <button id=\"hello\">Click me</button>","    <p id=\"message\"></p>",
        "  </main>","  <script src=\"app.js\"></script>","</body>","</html>"
      ].join("\n"),
      "styles.css":"body { font-family: system-ui, sans-serif; margin: 0; background: #faf3f8; color: #39263f; }\nmain { width: min(540px, 90%); margin: 12vh auto; text-align: center; }\nbutton { padding: 12px 18px; background: #985ea0; border: 0; color: white; border-radius: 8px; cursor: pointer; }\n",
      "app.js":"document.querySelector('#hello')?.addEventListener('click', () => {\n  document.querySelector('#message').textContent = 'Your JavaScript is working!';\n});\n",
      "README.md":"# "+name+"\n\nEdit index.html, styles.css, and app.js. Preview your changes, then export a ZIP.\n"
    };
  }
  function persist(){
    try {localStorage.setItem(STORAGE,JSON.stringify(workspaces));return true;}
    catch (_){toast("Browser storage is full. Download your ZIP now.");return false;}
  }
  function saveList(){localStorage.setItem("fc-projects",JSON.stringify(state.projects));}
  function ensureProject(p,files){
    if(!p.id){p.id="fc-"+String(p.created||Date.now())+"-"+Math.random().toString(36).slice(2,7);saveList();}
    if(!workspaces[p.id]) {workspaces[p.id]={files:files||starter(p.name),edited:false,previewed:false,exported:false};persist();}
    return workspaces[p.id];
  }
  function current(){return active&&ensureProject(active);}
  function createProjectCard(p,index){
    const button=document.createElement("button");button.type="button";button.className="project-card";
    const badge=document.createElement("span");badge.className="project-badge";badge.textContent=(p.name||"FC").slice(0,2).toUpperCase();
    const label=document.createElement("b");label.textContent=p.name||"Untitled project";
    const meta=document.createElement("small");meta.textContent=(p.type||"Website")+" · saved in this browser";
    button.append(badge,label,meta);button.onclick=()=>openProject(state.projects[index]);return button;
  }
  renderProjects=function(){
    const list=$fc("#projectList");if(!list)return;
    list.replaceChildren();
    state.projects.forEach((p,i)=>list.appendChild(createProjectCard(p,i)));
    const add=document.createElement("button");add.className="empty-project";add.type="button";
    add.innerHTML="<b>＋</b><span>"+(state.projects.length?"Add project":"No projects yet")+"</span><small>Create your first website</small>";
    add.onclick=()=>openModal("#projectModal");list.appendChild(add);
  };
  function showFile(filename){
    if(!current()||!Object.prototype.hasOwnProperty.call(current().files,filename))return;
    saveEditor();
    activeFile=filename;mode="code";
    editor.value=String(current().files[filename]);editor.hidden=false;frame.hidden=true;
    $fc("#activeFile").textContent=filename;
    $fc("#fileTree").querySelectorAll("[data-file]").forEach(el=>el.classList.toggle("active",el.dataset.file===filename));
    setToggle();updateProgress();
  }
  function renderFiles(){
    const tree=$fc("#fileTree");tree.replaceChildren();
    Object.keys(current().files).sort((a,b)=>a==="index.html"?-1:b==="index.html"?1:a.localeCompare(b)).forEach(name=>{
      const button=document.createElement("button");button.type="button";button.className="file"+(name===activeFile?" active":"");
      button.dataset.file=name;
      const label=document.createElement("span");label.textContent=name.split(".").pop().slice(0,4).toUpperCase();
      button.append(label,document.createTextNode(" "+name));
      button.onclick=()=>showFile(name);
      tree.appendChild(button);
    });
  }
  function saveEditor(){
    const project=current();if(!project||!editor||mode!=="code")return;
    if(project.files[activeFile]!==editor.value){
      project.files[activeFile]=editor.value;project.edited=true;
      if(persist())updateProgress();
    }
  }
  function setToggle(){
    $fc(".editor-pane .preview-toggle.active")?.classList.remove("active");
    const buttons=[...document.querySelectorAll(".editor-pane .preview-toggle")];
    (buttons[mode==="preview"?1:0])?.classList.add("active");
    $fc(".editor-pane .preview-toggle")?.setAttribute("aria-pressed",String(mode==="code"));
    buttons[1]?.setAttribute("aria-pressed",String(mode==="preview"));
  }
  function makePreview(){
    const p=current();if(!p)return;
    const files=p.files;
    const htmlFile=Object.keys(files).find(k=>k==="index.html")||Object.keys(files).find(k=>k.endsWith(".html"));
    if(!htmlFile){toast("Add index.html to preview this project");return;}
    let html=String(files[htmlFile]);
    const css=String(files["styles.css"]||"").replace(/<\/style/gi,"<\\/style");
    const js=String(files["app.js"]||"").replace(/<\/script/gi,"<\\/script");
    html=html.replace(/<link\b[^>]*href=["'](?:\.\/)?styles\.css["'][^>]*>/gi,"");
    html=html.replace(/<script\b[^>]*src=["'](?:\.\/)?app\.js["'][^>]*>\s*<\/script>/gi,"");
    const style="<style>"+css+"</style>",script="<script>"+js+"<\/script>";
    html=html.includes("</head>")?html.replace("</head>",style+"</head>"):style+html;
    html=html.includes("</body>")?html.replace("</body>",script+"</body>"):html+script;
    frame.srcdoc=html;
    editor.hidden=true;frame.hidden=false;mode="preview";
    p.previewed=true;persist();updateProgress();setToggle();
  }
  function updateProgress(){
    const p=current();if(!p)return;
    const done=[true,p.edited,p.previewed,p.exported];
    const names=["Project created","Files edited","Preview checked","ZIP downloaded"];
    const box=$fc(".inspector .checklist");box.replaceChildren();
    names.forEach((name,i)=>{
      const label=document.createElement("label"),input=document.createElement("input");
      input.type="checkbox";input.checked=Boolean(done[i]);input.disabled=true;
      label.append(input,document.createTextNode(" "+name));box.appendChild(label);
    });
    const percent=Math.round(done.filter(Boolean).length/4*100),ring=$fc(".inspector .progress-ring");
    ring.style.setProperty("--progress",String(percent));ring.querySelector("span").textContent=percent+"%";
    $fc(".inspector .muted").textContent="Your edits autosave in this browser. Preview, then download the ZIP before changing devices.";
    $fc(".timeline-title span").textContent=Object.keys(p.files).length+" files · local draft";
    const track=$fc(".timeline .tracks");track.replaceChildren();
    const info=document.createElement("p");info.textContent="Create → Edit → Preview → Download ZIP → Publish with GitHub Pages or another host.";
    track.appendChild(info);
  }
  function openLocal(p){
    ensureProject(p);active=p;activeFile=Object.keys(current().files).includes("index.html")?"index.html":Object.keys(current().files)[0];
    $fc("#projectName").textContent=p.name;$fc("#projectType").textContent=p.type||"Website";
    setView("project");renderFiles();
    mode="code";editor.hidden=false;frame.hidden=true;editor.value=String(current().files[activeFile]||"");
    $fc("#activeFile").textContent=activeFile;setToggle();updateProgress();
  }
  openProject=openLocal;
  function create(){
    const name=$fc("#projectNameInput").value.trim().slice(0,80)||"My First Website";
    const type=$fc("#projectTypeInput").value||"Website";
    const p={id:"fc-"+Date.now()+"-"+Math.random().toString(36).slice(2,8),name,type,created:Date.now()};
    state.projects.push(p);saveList();ensureProject(p);
    renderProjects();closeAll();openLocal(p);toast("Your starter files are ready on this device");
  }
  function addFile(){
    if(!active)return;
    let filename=prompt("File name (for example: about.html, notes.md)");if(filename===null)return;
    filename=filename.trim();
    if(!/^[a-zA-Z0-9_-][a-zA-Z0-9_./-]{0,95}$/.test(filename)||filename.includes("..")||filename.startsWith("/")||filename.endsWith("/")){toast("Use a simple safe file name");return;}
    const p=current();if(Object.prototype.hasOwnProperty.call(p.files,filename)){showFile(filename);return;}
    saveEditor();p.files[filename]="";persist();renderFiles();showFile(filename);editor.focus();
  }
  function crc32(bytes){
    let crc=0xFFFFFFFF;
    for(const value of bytes){crc^=value;for(let i=0;i<8;i++)crc=(crc>>>1)^(0xEDB88320&(-(crc&1)));}
    return (crc^0xFFFFFFFF)>>>0;
  }
  function zipBytes(files){
    const encoder=new TextEncoder(),chunks=[],centers=[];let offset=0,centralSize=0,entries=0;
    const head=(length)=>{const u=new Uint8Array(length);return {u,d:new DataView(u.buffer)};};
    Object.entries(files).forEach(([name,source])=>{
      const n=encoder.encode(name),data=encoder.encode(String(source)),crc=crc32(data);
      if(n.length>65535||entries>=65535)throw Error("Too many files");
      const local=head(30+n.length);
      local.d.setUint32(0,0x04034b50,true);local.d.setUint16(4,20,true);local.d.setUint16(6,0x0800,true);
      local.d.setUint32(14,crc,true);local.d.setUint32(18,data.length,true);local.d.setUint32(22,data.length,true);
      local.d.setUint16(26,n.length,true);local.u.set(n,30);
      chunks.push(local.u,data);
      const center=head(46+n.length);
      center.d.setUint32(0,0x02014b50,true);center.d.setUint16(4,20,true);center.d.setUint16(6,20,true);
      center.d.setUint16(8,0x0800,true);center.d.setUint32(16,crc,true);
      center.d.setUint32(20,data.length,true);center.d.setUint32(24,data.length,true);
      center.d.setUint16(28,n.length,true);center.d.setUint32(42,offset,true);center.u.set(n,46);
      centers.push(center.u);centralSize+=center.u.length;offset+=local.u.length+data.length;entries++;
    });
    const ending=head(22);ending.d.setUint32(0,0x06054b50,true);ending.d.setUint16(8,entries,true);
    ending.d.setUint16(10,entries,true);ending.d.setUint32(12,centralSize,true);ending.d.setUint32(16,offset,true);
    return new Blob([...chunks,...centers,ending.u],{type:"application/zip"});
  }
  function download(){
    saveEditor();const p=current();if(!p)return;
    try {
      const data=zipBytes(p.files);const url=URL.createObjectURL(data),a=document.createElement("a");
      a.href=url;a.download=(active.name||"my-first-project").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")+".zip";
      document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
      p.exported=true;persist();updateProgress();toast("ZIP saved. You can now upload these files to GitHub.");
    }catch(_){toast("Could not create ZIP. Try shorter file names.");}
  }
  async function importFolder(event){
    const list=[...(event.target.files||[])];if(!list.length)return;
    const selected=list.filter(f=>/\.(?:html?|css|js|json|md|txt|svg)$/i.test(f.name)&&f.size<=250000).slice(0,60);
    if(!selected.length){toast("Choose a folder containing small HTML/CSS/JS files");return;}
    const files={},root=(list[0].webkitRelativePath||list[0].name).split("/")[0];
    for(const f of selected){
      const path=(f.webkitRelativePath||f.name).split("/").slice(f.webkitRelativePath?1:0).join("/");
      if(!path||path.includes(".."))continue;
      files[path]=await f.text();
    }
    const p={id:"fc-"+Date.now()+"-import",name:root||"Imported project",type:"Imported web files",created:Date.now()};
    state.projects.push(p);saveList();ensureProject(p,files);
    renderProjects();closeAll();openLocal(p);toast("Editable local copy imported. Original folder was not changed.");
    event.target.value="";
  }

  const area=$fc(".editor-pane .code-editor");
  area.replaceChildren();
  editor=document.createElement("textarea");editor.id="fcLiveCode";editor.spellcheck=false;editor.setAttribute("aria-label","Edit project source code");editor.setAttribute("autocapitalize","off");editor.setAttribute("autocomplete","off");
  frame=document.createElement("iframe");frame.id="fcLivePreview";frame.title="Live project preview";frame.sandbox="allow-scripts";frame.hidden=true;
  area.append(editor,frame);
  editor.addEventListener("input",saveEditor);
  editor.addEventListener("keydown",event=>{
    if(event.key==="Tab"){event.preventDefault();const start=editor.selectionStart,end=editor.selectionEnd;editor.setRangeText("  ",start,end,"end");saveEditor();}
    if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="s"){event.preventDefault();saveEditor();toast("Saved in this browser");}
  });
  const viewButtons=[...document.querySelectorAll(".editor-pane .preview-toggle")];
  viewButtons[0]?.addEventListener("click",()=>{
    if(!active)return;mode="code";editor.hidden=false;frame.hidden=true;editor.value=String(current().files[activeFile]||"");setToggle();
  });
  viewButtons[1]?.addEventListener("click",()=>{if(active){saveEditor();makePreview();}});
  $fc(".add-file").onclick=addFile;
  $fc("#createProject").onclick=create;
  $fc("#folderPicker").onchange=importFolder;
  $fc("#githubImport").onclick=()=>{closeAll();toast("For a GitHub repo: Download ZIP, extract it, then choose the folder here.");};
  const review=$fc("#reviewBtn");review.innerHTML="Download project ZIP <span>↓</span>";review.onclick=download;
  const next=$fc("#nextStepBtn");next.onclick=()=>{setView("guide");toast("Follow the Build Journey stage by stage");};
  $fc("#clearData").onclick=()=>{
    if(!confirm("Delete all browser-local projects and source files? Export important projects first."))return;
    state.projects=[];workspaces={};localStorage.removeItem("fc-projects");localStorage.removeItem(STORAGE);
    active=null;renderProjects();setView("home");toast("Browser-local projects deleted");
  };
  $fc(".inspector h3").textContent="Your next checkpoint";
  $fc(".inspector .checklist").setAttribute("aria-label","Your real local-project progress");
  $fc(".timeline-title b").textContent="Project files";
  $fc(".tool-tabs")?.querySelectorAll("button").forEach(button=>{
    button.addEventListener("click",()=>{
      if(button.dataset.tool==="database")toast("Need shared data? Follow Stage 4. This local editor does not host a database.");
      else if(button.dataset.tool==="git")toast("Download ZIP and commit files in GitHub. This site does not push for you.");
      else toast("Edit files, preview, and export the ZIP.");
    });
  });
  const codeTab=$fc(".editor-pane .editor-tab i");if(codeTab)codeTab.remove();
  renderProjects();
  // The site has no currently selected project on a fresh page load.
})();
