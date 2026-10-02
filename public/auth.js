(function(){
  'use strict';

  const config=window.FIRST_COMET_AUTH||{};
  const configured=Boolean(config.supabaseUrl&&config.supabaseAnonKey&&window.supabase);
  const authState={
    client:null,
    user:null,
    mode:'none',
    appReveal:null
  };

  const $=s=>document.querySelector(s);

  function initials(name,email){
    const source=(name||email||'FC').trim();
    const parts=source.split(/\s+/).filter(Boolean);
    if(parts.length>=2) return (parts[0][0]+parts[1][0]).toUpperCase();
    return source.slice(0,2).toUpperCase();
  }

  function displayName(user){
    if(!user) return 'Local workspace';
    return user.user_metadata?.full_name||
      user.user_metadata?.name||
      (user.email?user.email.split('@')[0]:'First Comet learner');
  }

  function showMessage(message,type){
    const box=$('#authMessage');
    if(!box) return;
    box.textContent=message||'';
    box.className='auth-message'+(message?' show':'')+(type?' '+type:'');
  }

  function setBusy(button,busy,label){
    if(!button) return;
    if(!button.dataset.label) button.dataset.label=button.innerHTML;
    button.disabled=busy;
    if(label&&busy) button.textContent=label;
    else if(!busy&&button.dataset.label) button.innerHTML=button.dataset.label;
  }

  function updateAccountUI(){
    const signedIn=authState.mode==='cloud'&&authState.user;
    const local=authState.mode==='local';
    const name=signedIn?displayName(authState.user):(local?'Local workspace':'Not signed in');
    const email=signedIn?(authState.user.email||'Signed in'):(local?'This device only':'Not signed in');
    const av=initials(name,email);

    const map={
      accountName:name,
      accountAvatar:av,
      popoverName:name,
      popoverAvatar:av,
      popoverEmail:email
    };
    Object.entries(map).forEach(([id,value])=>{const node=$('#'+id);if(node)node.textContent=value});

    const sync=$('#accountSync');
    const status=$('.account-status');
    const title=$('#cloudStatusTitle');
    const text=$('#cloudStatusText');
    const switchBtn=$('#switchAccount');
    const signOut=$('#signOutButton');

    if(signedIn){
      if(sync) sync.textContent='Account connected';
      if(status) status.classList.add('synced');
      if(title) title.textContent='Signed in';
      if(text) text.textContent='Your account is ready for cloud project sync.';
      if(switchBtn) switchBtn.textContent='Use a different account';
      if(signOut) signOut.textContent='Sign out';
    }else if(local){
      if(sync) sync.textContent='This device only';
      if(status) status.classList.remove('synced');
      if(title) title.textContent='Local mode';
      if(text) text.textContent='Projects remain in this browser until you sign in and connect cloud sync.';
      if(switchBtn) switchBtn.textContent='Sign in to sync';
      if(signOut) signOut.textContent='Leave local session';
    }else{
      if(sync) sync.textContent='Not signed in';
      if(status) status.classList.remove('synced');
      if(title) title.textContent='Not signed in';
      if(text) text.textContent='Choose how you want to continue.';
      if(switchBtn) switchBtn.textContent='Sign in';
      if(signOut) signOut.textContent='Close';
    }
  }

  function openGate(){
    const gate=$('#authGate');
    if(!gate) return;
    gate.classList.add('open');
    gate.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    if(!configured){
      showMessage('Cloud sign-in is prepared but the First Comet authentication project is not connected yet. You can continue on this device for now.','');
    }else{
      showMessage('');
    }
  }

  function closeGate(){
    const gate=$('#authGate');
    if(!gate) return;
    gate.classList.remove('open');
    gate.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }

  function closePopover(){
    const pop=$('#accountPopover');
    if(pop){pop.classList.remove('open');pop.setAttribute('aria-hidden','true')}
  }

  function revealApp(){
    closeGate();
    updateAccountUI();
    if(typeof authState.appReveal==='function') authState.appReveal();
    else if(typeof window.revealFirstCometApp==='function') window.revealFirstCometApp();
  }

  async function initClient(){
    if(!configured) return null;
    if(authState.client) return authState.client;
    authState.client=window.supabase.createClient(config.supabaseUrl,config.supabaseAnonKey,{
      auth:{
        persistSession:true,
        autoRefreshToken:true,
        detectSessionInUrl:true
      }
    });

    authState.client.auth.onAuthStateChange((_event,session)=>{
      authState.user=session?.user||null;
      if(authState.user){
        authState.mode='cloud';
        localStorage.removeItem('fc-local-mode');
        updateAccountUI();
        revealApp();
      }else if(authState.mode==='cloud'){
        authState.mode='none';
        updateAccountUI();
        openGate();
      }
    });
    return authState.client;
  }

  async function restore(){
    if(localStorage.getItem('fc-local-mode')==='1'){
      authState.mode='local';
      updateAccountUI();
      return true;
    }

    const client=await initClient();
    if(!client) return false;

    try{
      const {data,error}=await client.auth.getSession();
      if(error) throw error;
      if(data?.session?.user){
        authState.user=data.session.user;
        authState.mode='cloud';
        updateAccountUI();
        return true;
      }
    }catch(err){
      console.error('First Comet auth restore failed',err);
    }
    return false;
  }

  async function googleSignIn(){
    if(!configured){
      showMessage('Google sign-in needs the First Comet Supabase authentication project connected first. Continue locally for now; the login screen is ready.','');
      return;
    }
    const button=$('#authGoogle');
    setBusy(button,true,'Opening Google…');
    showMessage('');
    try{
      const client=await initClient();
      const redirectTo=config.siteUrl||window.location.origin;
      const {error}=await client.auth.signInWithOAuth({
        provider:'google',
        options:{redirectTo}
      });
      if(error) throw error;
    }catch(err){
      console.error(err);
      showMessage(err.message||'Google sign-in could not start.','error');
      setBusy(button,false);
    }
  }

  async function emailSignIn(email){
    if(!configured){
      showMessage('Email sign-in needs the First Comet Supabase authentication project connected first. Continue locally for now; no password system will be required.','');
      return;
    }
    const form=$('#authEmailForm');
    const button=form?.querySelector('button[type="submit"]');
    setBusy(button,true,'Sending…');
    showMessage('');
    try{
      const client=await initClient();
      const redirectTo=config.siteUrl||window.location.origin;
      const {error}=await client.auth.signInWithOtp({
        email,
        options:{
          emailRedirectTo:redirectTo,
          shouldCreateUser:true
        }
      });
      if(error) throw error;
      showMessage('Check your email. Open the secure First Comet sign-in link and you will come straight back here.','success');
    }catch(err){
      console.error(err);
      showMessage(err.message||'We could not send the sign-in link.','error');
    }finally{
      setBusy(button,false);
    }
  }

  function continueLocal(){
    localStorage.setItem('fc-local-mode','1');
    authState.mode='local';
    authState.user=null;
    updateAccountUI();
    revealApp();
  }

  async function signOut(){
    closePopover();
    if(authState.mode==='cloud'&&authState.client){
      try{await authState.client.auth.signOut()}catch(err){console.error(err)}
    }
    localStorage.removeItem('fc-local-mode');
    authState.mode='none';
    authState.user=null;
    updateAccountUI();
    openGate();
  }

  function bind(){
    $('#authGoogle')?.addEventListener('click',googleSignIn);
    $('#authEmailForm')?.addEventListener('submit',e=>{
      e.preventDefault();
      const email=$('#authEmail')?.value.trim();
      if(email) emailSignIn(email);
    });
    $('#authLocal')?.addEventListener('click',continueLocal);

    $('#accountChip')?.addEventListener('click',()=>{
      const pop=$('#accountPopover');
      if(!pop) return;
      const open=!pop.classList.contains('open');
      pop.classList.toggle('open',open);
      pop.setAttribute('aria-hidden',String(!open));
    });

    $('#accountPopover')?.addEventListener('click',e=>{
      if(e.target.id==='accountPopover') closePopover();
    });

    $('#switchAccount')?.addEventListener('click',()=>{
      closePopover();
      openGate();
    });

    $('#signOutButton')?.addEventListener('click',signOut);
  }

  window.FirstCometAuthGate={
    async start(revealCallback){
      authState.appReveal=revealCallback||null;
      bind();
      const restored=await restore();
      if(restored) revealApp();
      else openGate();
    },
    open:openGate,
    getMode:()=>authState.mode,
    getUser:()=>authState.user,
    isConfigured:()=>configured
  };
})();