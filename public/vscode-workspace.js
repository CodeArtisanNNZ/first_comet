(function(){
  'use strict';

  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const textExtensions=new Set(['html','htm','css','js','mjs','cjs','ts','tsx','jsx','json','md','txt','py','php','sql','yaml','yml','xml','svg']);
  const ignoredFolders=new Set(['node_modules','.git','dist','build','.next','.cache']);
  const workspace={
    dir:null,
    files:new Map(),
    editor:null,
    fallback:false,
    active:null,
    activePath:'',
    saveTimer:null,
    previewReady:false,
    hintIndex:0
  };

  const el={
    connect:$('#connectCodeFolder'),
    reconnect:$('#reconnectFolder'),
    external:$('#openVscodeWeb'),
    shell:$('#vscodeShell'),
    support:$('#permissionSupport'),
    folderName:$('#connectedFolderName'),
    folderLabel:$('#codeFolderLabel'),
    tree:$('#vscodeFileTree'),
    activeFile:$('#vscodeActiveFile'),
    path:$('#vscodePath'),
    saveState:$('#saveState'),
    saveWrap:$('.vscode-save-state'),
    permissionState:$('#vscodePermissionState'),
    language:$('#vscodeLanguage'),
    welcome:$('#editorWelcome'),
    monaco:$('#monacoEditor'),
    fallbackEditor:$('#fallbackCodeEditor'),
    preview:$('#localPreviewFrame'),
    previewStatus:$('#previewStatus'),
    refreshPreview:$('#refreshPreview'),
    reload:$('#reloadCodeFiles'),
    newFile:$('#newCodeFile'),
    stuck:$('#stuckButton'),
    check:$('#checkWorkButton'),
    hint:$('#teacherHint'),
    milestone:$('#teacherMilestone'),
    message:$('#teacherMessage'),
    checks:$('#teacherChecks'),
    unsaved:$('#unsavedMark')
  };

  if(!el.shell) return;

  function setSaveState(type,msg){
    if(el.saveWrap) el.saveWrap.className='vscode-save-state '+(type||'');
    if(el.saveState) el.saveState.textContent=msg;
  }

  function setPermissionState(msg){
    if(el.permissionState) el.permissionState.textContent='Folder permission: '+msg;
  }

  function extensionOf(path){
    const name=(path||'').split('/').pop()||'';
    return name.includes('.')?name.split('.').pop().toLowerCase():'';
  }

  function languageFor(path){
    const ext=extensionOf(path);
    return ({html:'html',htm:'html',css:'css',js:'javascript',mjs:'javascript',cjs:'javascript',ts:'typescript',tsx:'typescript',jsx:'javascript',json:'json',md:'markdown',py:'python',php:'php',sql:'sql',yaml:'yaml',yml:'yaml',xml:'xml',svg:'xml'})[ext]||'plaintext';
  }

  function labelForLanguage(path){
    const l=languageFor(path);
    return ({html:'HTML',css:'CSS',javascript:'JavaScript',typescript:'TypeScript',json:'JSON',markdown:'Markdown',python:'Python',php:'PHP',sql:'SQL',yaml:'YAML',xml:'XML',plaintext:'Plain Text'})[l]||l;
  }

  async function verifyPermission(handle,write){
    const opts=write?{mode:'readwrite'}:{mode:'read'};
    if(!handle || !handle.queryPermission) return true;
    if(await handle.queryPermission(opts)==='granted') return true;
    if(handle.requestPermission && await handle.requestPermission(opts)==='granted') return true;
    return false;
  }

  function openHandleDB(){
    return new Promise((resolve,reject)=>{
      const req=indexedDB.open('first-comet-workspace',1);
      req.onupgradeneeded=()=>req.result.createObjectStore('handles');
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error);
    });
  }

  async function saveRememberedHandle(handle){
    try{
      const db=await openHandleDB();
      await new Promise((resolve,reject)=>{
        const tx=db.transaction('handles','readwrite');
        tx.objectStore('handles').put(handle,'project-dir');
        tx.oncomplete=resolve; tx.onerror=()=>reject(tx.error);
      });
      db.close();
    }catch(_){}
  }

  async function getRememberedHandle(){
    try{
      const db=await openHandleDB();
      const value=await new Promise((resolve,reject)=>{
        const tx=db.transaction('handles','readonly');
        const req=tx.objectStore('handles').get('project-dir');
        req.onsuccess=()=>resolve(req.result||null);
        req.onerror=()=>reject(req.error);
      });
      db.close();
      return value;
    }catch(_){return null}
  }

  async function chooseFolder(){
    if(!('showDirectoryPicker' in window)){
      el.support.textContent='This browser cannot give a webpage direct folder access. Open First Comet in current Chrome or Edge, or use Microsoft VS Code Web.';
      setPermissionState('unsupported in this browser');
      return;
    }
    try{
      const dir=await window.showDirectoryPicker({id:'first-comet-project',mode:'readwrite'});
      const granted=await verifyPermission(dir,true);
      if(!granted){
        setPermissionState('not granted');
        setSaveState('error','Read/write permission was not granted');
        return;
      }
      await saveRememberedHandle(dir);
      await connectDirectory(dir);
    }catch(err){
      if(err && err.name==='AbortError'){
        setSaveState('','Folder selection cancelled');
      }else{
        setSaveState('error','Could not open the selected folder');
        console.error(err);
      }
    }
  }

  async function reconnectRemembered(){
    const dir=await getRememberedHandle();
    if(!dir) return false;
    try{
      const state=dir.queryPermission?await dir.queryPermission({mode:'readwrite'}):'granted';
      if(state==='granted'){
        await connectDirectory(dir);
        return true;
      }
      if(el.connect){
        el.connect.textContent='Reconnect '+dir.name+' →';
        el.connect.dataset.remembered='1';
      }
      el.support.textContent='First Comet remembers the folder name, but your browser requires you to approve access again.';
      workspace.dir=dir;
      return false;
    }catch(_){return false}
  }

  async function connectDirectory(dir){
    workspace.dir=dir;
    workspace.files.clear();
    setPermissionState('read + write granted');
    setSaveState('saved','Folder connected');
    el.folderName.textContent=dir.name;
    el.folderLabel.textContent=dir.name.toUpperCase();
    if(el.connect) el.connect.textContent='Folder connected ✓';
    await scanDirectory();
    await updateTeacher();
    const preferred=workspace.files.get('index.html')||workspace.files.get('src/index.html')||Array.from(workspace.files.values()).find(x=>x.kind==='file'&&textExtensions.has(extensionOf(x.path)));
    if(preferred) await openFile(preferred.path);
  }

  async function scanDirectory(){
    workspace.files.clear();
    if(!workspace.dir) return;
    let count=0;
    async function walk(dir,prefix,depth){
      if(depth>5 || count>350) return;
      const entries=[];
      for await (const pair of dir.entries()) entries.push(pair);
      entries.sort((a,b)=>{
        if(a[1].kind!==b[1].kind) return a[1].kind==='directory'?-1:1;
        return a[0].localeCompare(b[0]);
      });
      for(const [name,handle] of entries){
        if(count>350) break;
        if(handle.kind==='directory' && ignoredFolders.has(name)) continue;
        const path=prefix?prefix+'/'+name:name;
        workspace.files.set(path,{name,path,handle,kind:handle.kind,depth});
        count++;
        if(handle.kind==='directory') await walk(handle,path,depth+1);
      }
    }
    await walk(workspace.dir,'',0);
    renderTree();
  }

  function renderTree(){
    if(!el.tree) return;
    if(!workspace.dir){
      el.tree.innerHTML='<div class="vscode-empty-tree"><b>No project folder yet.</b><span>Use “Choose project folder” above.</span></div>';
      return;
    }
    const rows=[];
    for(const item of workspace.files.values()){
      const pad=10+(item.depth||0)*14;
      if(item.kind==='directory'){
        rows.push('<div class="vscode-folder-row" style="padding-left:'+pad+'px"><span>▾</span><b>'+escapeHtml(item.name)+'</b></div>');
      }else{
        const ext=extensionOf(item.path);
        const readable=textExtensions.has(ext)||!ext;
        rows.push('<button class="vscode-file'+(readable?'':' disabled')+'" data-code-path="'+escapeAttr(item.path)+'" data-ext="'+escapeAttr(ext)+'" style="padding-left:'+pad+'px" '+(readable?'':'disabled')+'><span class="file-icon">'+fileIcon(ext)+'</span><span>'+escapeHtml(item.name)+'</span></button>');
      }
    }
    el.tree.innerHTML=rows.join('')||'<div class="vscode-empty-tree"><b>This folder is empty.</b><span>Create index.html to begin Milestone 01.</span></div>';
    $$('.vscode-file',el.tree).forEach(btn=>btn.addEventListener('click',()=>openFile(btn.dataset.codePath)));
  }

  function fileIcon(ext){
    if(ext==='html'||ext==='htm') return '&lt;&gt;';
    if(ext==='css') return '#';
    if(ext==='js'||ext==='mjs'||ext==='cjs') return 'JS';
    if(ext==='json') return '{}';
    if(ext==='md') return 'M↓';
    return '·';
  }

  function escapeHtml(v){
    return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }
  function escapeAttr(v){return escapeHtml(v)}

  async function readFileEntry(entry){
    const file=await entry.handle.getFile();
    return await file.text();
  }

  async function openFile(path){
    const entry=workspace.files.get(path);
    if(!entry || entry.kind!=='file') return;
    if(workspace.active && isDirty()) await saveActiveFile();
    const text=await readFileEntry(entry);
    workspace.active=entry;
    workspace.activePath=path;
    el.activeFile.textContent=entry.name;
    el.path.textContent=path;
    el.language.textContent=labelForLanguage(path);
    el.welcome.style.display='none';
    $$('.vscode-file',el.tree).forEach(b=>b.classList.toggle('active',b.dataset.codePath===path));
    setEditorValue(text,path);
    markDirty(false);
    setSaveState('saved','Saved');
    updateTeacher();
  }

  function initMonaco(){
    if(workspace.editor || workspace.fallback) return;
    if(typeof window.require!=='function'){
      useFallbackEditor();
      return;
    }
    const base='https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/';
    window.MonacoEnvironment={
      getWorkerUrl:function(){
        const source="self.MonacoEnvironment={baseUrl:'"+base+"'};importScripts('"+base+"vs/base/worker/workerMain.js');";
        return 'data:text/javascript;charset=utf-8,'+encodeURIComponent(source);
      }
    };
    try{
      window.require.config({paths:{vs:base+'vs'}});
      window.require(['vs/editor/editor.main'],function(){
        workspace.editor=monaco.editor.create(el.monaco,{
          value:'',
          language:'html',
          theme:document.body.classList.contains('dark')?'vs-dark':'vs-dark',
          automaticLayout:true,
          fontSize:14,
          lineHeight:22,
          minimap:{enabled:false},
          wordWrap:'on',
          scrollBeyondLastLine:false,
          tabSize:2,
          insertSpaces:true,
          padding:{top:14,bottom:14}
        });
        workspace.editor.onDidChangeModelContent(onEditorChanged);
        workspace.editor.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.KeyS,function(){saveActiveFile(true)});
      },function(){useFallbackEditor()});
    }catch(_){useFallbackEditor()}
  }

  function useFallbackEditor(){
    workspace.fallback=true;
    el.monaco.style.display='none';
    el.fallbackEditor.style.display='block';
    el.fallbackEditor.addEventListener('input',onEditorChanged);
    el.fallbackEditor.addEventListener('keydown',e=>{
      if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){
        e.preventDefault(); saveActiveFile(true);
      }
    });
  }

  function setEditorValue(text,path){
    const lang=languageFor(path);
    if(workspace.editor){
      const old=workspace.editor.getModel();
      const model=monaco.editor.createModel(text,lang);
      workspace.editor.setModel(model);
      if(old) old.dispose();
    }else{
      if(!workspace.fallback) initMonaco();
      el.fallbackEditor.value=text;
    }
  }

  function getEditorValue(){
    if(workspace.editor) return workspace.editor.getValue();
    return el.fallbackEditor.value||'';
  }

  let dirty=false;
  function isDirty(){return dirty}
  function markDirty(value){
    dirty=!!value;
    if(el.unsaved) el.unsaved.classList.toggle('unsaved',dirty);
  }

  function onEditorChanged(){
    if(!workspace.active) return;
    markDirty(true);
    setSaveState('saving','Saving…');
    clearTimeout(workspace.saveTimer);
    workspace.saveTimer=setTimeout(()=>saveActiveFile(false),650);
  }

  async function saveActiveFile(manual){
    if(!workspace.active || workspace.active.kind!=='file') return;
    try{
      const granted=await verifyPermission(workspace.dir,true);
      if(!granted){
        setPermissionState('write permission needed');
        setSaveState('error','Cannot save without write permission');
        return;
      }
      const writable=await workspace.active.handle.createWritable();
      await writable.write(getEditorValue());
      await writable.close();
      markDirty(false);
      setSaveState('saved',manual?'Saved with Ctrl + S':'Saved');
      await updateTeacher();
      if(/\.(html?|css|js)$/i.test(workspace.activePath)) schedulePreview();
    }catch(err){
      setSaveState('error','Save failed');
      console.error(err);
    }
  }

  async function createNewFile(){
    if(!workspace.dir) return chooseFolder();
    const name=prompt('File name (example: index.html)');
    if(!name) return;
    if(name.includes('/')||name.includes('\\')){
      setSaveState('error','For now, create new files in the main project folder');
      return;
    }
    try{
      const granted=await verifyPermission(workspace.dir,true);
      if(!granted) return setPermissionState('write permission needed');
      const handle=await workspace.dir.getFileHandle(name,{create:true});
      workspace.files.set(name,{name,path:name,handle,kind:'file',depth:0});
      renderTree();
      await openFile(name);
      await updateTeacher();
    }catch(err){
      setSaveState('error','Could not create '+name);
      console.error(err);
    }
  }

  function schedulePreview(){
    clearTimeout(schedulePreview.timer);
    schedulePreview.timer=setTimeout(refreshPreview,500);
  }

  async function getTextByPath(path){
    const clean=String(path||'').replace(/^\.?\//,'').split('?')[0].split('#')[0];
    const entry=workspace.files.get(clean);
    if(!entry || entry.kind!=='file') return null;
    try{return await readFileEntry(entry)}catch(_){return null}
  }

  async function refreshPreview(){
    if(!workspace.dir){
      el.previewStatus.textContent='Connect a folder first';
      return;
    }
    const index=workspace.files.get('index.html')||workspace.files.get('src/index.html');
    if(!index){
      el.preview.srcdoc='<!doctype html><html><body style="font-family:system-ui;padding:32px"><h2>No index.html yet</h2><p>First Comet is waiting for your first webpage.</p></body></html>';
      el.previewStatus.textContent='Waiting for index.html';
      workspace.previewReady=false;
      updateTeacher();
      return;
    }
    try{
      let doc=await readFileEntry(index);
      const cssMatches=Array.from(doc.matchAll(/<link[^>]+href=["']([^"']+\.css[^"']*)["'][^>]*>/gi));
      for(const match of cssMatches){
        const css=await getTextByPath(match[1]);
        if(css!==null) doc=doc.replace(match[0],'<style>'+css+'</style>');
      }
      const scriptMatches=Array.from(doc.matchAll(/<script[^>]+src=["']([^"']+\.js[^"']*)["'][^>]*>\s*<\/script>/gi));
      for(const match of scriptMatches){
        const script=await getTextByPath(match[1]);
        if(script!==null) doc=doc.replace(match[0],'<script>'+script.replace(/<\/script/gi,'<\\/script')+'<\/script>');
      }
      el.preview.srcdoc=doc;
      el.previewStatus.textContent='Preview updated';
      workspace.previewReady=true;
      await updateTeacher();
    }catch(err){
      el.previewStatus.textContent='Preview error';
      workspace.previewReady=false;
      console.error(err);
    }
  }

  async function updateTeacher(){
    if(!el.milestone) return;
    const hasFolder=!!workspace.dir;
    const indexEntry=workspace.files.get('index.html')||workspace.files.get('src/index.html');
    let indexText='';
    if(indexEntry){try{indexText=await readFileEntry(indexEntry)}catch(_){}}
    const hasIndex=!!indexEntry;
    const hasStructure=/<html[\s>]/i.test(indexText)&&/<body[\s>]/i.test(indexText);
    const hasHeading=/<h1[\s>]/i.test(indexText);
    const hasCss=Array.from(workspace.files.keys()).some(p=>/(^|\/)(style|styles)\.css$/i.test(p));
    const hasJs=Array.from(workspace.files.keys()).some(p=>/(^|\/)(app|script|main)\.js$/i.test(p));

    if(!hasFolder){
      el.milestone.textContent='01 · Connect your project folder';
      el.message.innerHTML='<p>Choose the folder where you will build your first localhost website. The browser will ask you to approve read and write access to that folder only.</p>';
    }else if(!hasIndex){
      el.milestone.textContent='01 · Create index.html';
      el.message.innerHTML='<p>Your project folder is connected. Every beginner website starts with <b>index.html</b>. Use the ＋ button beside Explorer and create that exact file.</p>';
    }else if(!hasStructure){
      el.milestone.textContent='02 · Build the HTML structure';
      el.message.innerHTML='<p>I found <b>index.html</b>. Now give it a real HTML page structure: doctype, html, head and body. Do not move to CSS yet.</p>';
    }else if(!hasHeading){
      el.milestone.textContent='02 · Put something on the page';
      el.message.innerHTML='<p>Your HTML structure works. Add one visible <b>&lt;h1&gt;</b> heading inside the body so the page has something meaningful to show.</p>';
    }else if(!hasCss){
      el.milestone.textContent='03 · Create your first CSS file';
      el.message.innerHTML='<p>Your first HTML page exists. You are now ready for CSS. Create <b>styles.css</b>, link it from index.html and change one visible style.</p>';
    }else if(!hasJs){
      el.milestone.textContent='04 · Add one JavaScript interaction';
      el.message.innerHTML='<p>You have HTML and CSS. Next, create <b>app.js</b> and make one small interaction work before thinking about backend or databases.</p>';
    }else{
      el.milestone.textContent='04 · Frontend practice';
      el.message.innerHTML='<p>Your basic frontend files are in place. Keep improving one complete user flow. First Comet will not send you to backend work until this page behaves correctly.</p>';
    }

    const checks=[
      {done:hasFolder,title:'Project folder',note:hasFolder?'Connected with read/write access':'Not connected yet'},
      {done:hasIndex,title:'index.html',note:hasIndex?'Found in your project':'Waiting'},
      {done:workspace.previewReady,title:'Local preview',note:workspace.previewReady?'Preview is rendering':'Waiting'}
    ];
    el.checks.innerHTML=checks.map(c=>'<div class="'+(c.done?'done':'')+'"><span>'+(c.done?'✓':'○')+'</span><p><b>'+c.title+'</b><small>'+c.note+'</small></p></div>').join('');
  }

  async function showHint(){
    const path=workspace.activePath||'';
    let hints=[];
    if(!workspace.dir){
      hints=['Press “Choose project folder”. Pick the folder you created for this project.','Only that folder will be shared with First Comet. Choose read/write access when the browser asks.'];
    }else if(!workspace.files.has('index.html')&&!workspace.files.has('src/index.html')){
      hints=['Look at Explorer on the left. Press the ＋ button.','Name the new file exactly index.html.','index.html is the default first page of a simple website.'];
    }else if(/index\.html$/i.test(path)){
      const value=getEditorValue();
      if(!/<html[\s>]/i.test(value)) hints=['Start with the page structure, not design.','You need <!doctype html>, <html>, <head> and <body>.','Put visible content inside <body>.'];
      else if(!/<h1[\s>]/i.test(value)) hints=['Your structure exists. Add the page’s main heading inside <body>.','Use one <h1> element for the main page title.'];
      else hints=['Your page has a working structure. Refresh the preview below and inspect the result before adding more.'];
    }else{
      hints=['Read the current milestone above. Work on only that goal before adding extra features.','If an error appears, read the first error message and find the file and line it points to.','Use Ctrl + S at any time; First Comet also autosaves after you stop typing.'];
    }
    const hint=hints[workspace.hintIndex%hints.length];
    workspace.hintIndex++;
    el.hint.hidden=false;
    el.hint.innerHTML='<b>Teacher hint</b><br>'+hint;
  }

  async function checkWork(){
    await refreshPreview();
    await updateTeacher();
    el.hint.hidden=false;
    el.hint.innerHTML='<b>Work checked.</b><br>Look at the milestone and checklist above. First Comet will only move the guidance forward when the required result is present.';
  }

  function bind(){
    el.connect&&el.connect.addEventListener('click',async()=>{
      if(el.connect.dataset.remembered==='1' && workspace.dir){
        const granted=await verifyPermission(workspace.dir,true);
        if(granted){el.connect.dataset.remembered='';await connectDirectory(workspace.dir);return}
      }
      chooseFolder();
    });
    el.reconnect&&el.reconnect.addEventListener('click',chooseFolder);
    el.external&&el.external.addEventListener('click',()=>window.open('https://vscode.dev/','_blank','noopener'));
    el.reload&&el.reload.addEventListener('click',async()=>{if(workspace.dir){await scanDirectory();await updateTeacher()}});
    el.newFile&&el.newFile.addEventListener('click',createNewFile);
    el.refreshPreview&&el.refreshPreview.addEventListener('click',refreshPreview);
    el.stuck&&el.stuck.addEventListener('click',showHint);
    el.check&&el.check.addEventListener('click',checkWork);
  }

  initMonaco();
  bind();
  reconnectRemembered();
})();