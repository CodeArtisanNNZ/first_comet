(() => {
  'use strict';
  const listeners = new Set();
  const config = window.OWL_POST_AUTH_CONFIG || {};
  const STORAGE_KEY = 'owl-post-auth-v1';
  const redirectUrl = () => ['firstcomet.awerminds.tech', 'first-comet.nusaibanusratzaman.workers.dev'].includes(location.hostname) ? location.origin + '/owl-post.html' : (config.redirectUrl || location.origin + '/owl-post.html');
  let client;
  let pendingValidation;
  let revision = 0;
  let explicitlySignedOut = false;
  let requestedAudience = 'student';
  let recovery = new URLSearchParams(location.search).get('flow') === 'recovery';
  let current = { status: 'loading', user: null, role: null, profile: null, applications: [], isAdmin: false, legacyCoordinator: false, message: '' };
  const emailAllowed = value => /^[^\s@]+@(?:g\.)?bracu\.ac\.bd$/i.test(String(value || ''));
  const teacherEmailAllowed = value => /^[^\s@]+@bracu\.ac\.bd$/i.test(String(value || ''));
  const applicationColumns = 'id,teacher_id,course_code,semester,reason,status,review_note,created_at,reviewed_at,applicant_email';
  const escape = value => String(value || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function publish(next) {
    if (next.user === null) next = { applications: [], isAdmin: false, legacyCoordinator: false, ...next };
    current = Object.freeze({ ...current, ...next });
    listeners.forEach(listener => listener(current));
  }

  function messageFor(error) {
    if (error?.code === 'email_not_confirmed') return 'Confirm your email address before signing in. Check your inbox for the confirmation link.';
    if (error?.status === 429 || /rate.limit|too many/i.test(error?.message || '')) return 'Too many attempts. Wait a few minutes, then try again.';
    if (error?.code === 'invalid_credentials') return 'The email or password is incorrect.';
    if (/fetch|network/i.test(error?.message || '')) return 'Could not reach sign-in. Check your connection and try again.';
    return 'Sign-in could not be completed. Please try again.';
  }

  function validateSession(session) {
    const key=session?.access_token || null;
    if(pendingValidation?.key===key)return pendingValidation.promise;
    const pending={key};
    pendingValidation=pending;
    pending.promise=verifySession(session).finally(()=>{if(pendingValidation===pending)pendingValidation=null;});
    return pending.promise;
  }

  async function verifySession(session) {
    const request = ++revision;
    if (explicitlySignedOut) return;
    if (!session) {
      publish({ status: 'signed-out', user: null, role: null, profile: null });
      return;
    }
    // getUser checks the token with the auth server; a saved client object is not identity proof.
    const { data, error } = await client.auth.getUser();
    if (request !== revision) return;
    const user = data?.user;
    if (error || !user || !emailAllowed(user.email) || !user.email_confirmed_at) {
      publish({ status: 'signed-out', user: null, role: null, profile: null, message: error ? messageFor(error) : 'Use a confirmed BRACU email address to enter Owl Post.' });
      await client.auth.signOut({ scope: 'local' });
      return;
    }
    // User metadata supplies display information only. Privileged roles are admin-assigned.
    const legacyCoordinator = user.app_metadata?.owl_post_role === 'coordinator';
    const isAdmin = user.app_metadata?.owl_post_admin === true && emailAllowed(user.email);
    const { data: savedProfile, error: profileError } = await client.from('owl_post_profiles').select('display_name,student_id,department,account_type').eq('user_id', user.id).maybeSingle();
    if (request !== revision || explicitlySignedOut) return;
    if (profileError) {
      publish({ status: 'unavailable', user: null, role: null, profile: null, message: 'Could not load your Owl Post profile. Please reload and try again.' });
      return;
    }
    const raw = user.user_metadata?.owl_post_profile || {};
    const accountType = savedProfile?.account_type === 'teacher' ? 'teacher' : !savedProfile && teacherEmailAllowed(user.email) && (requestedAudience === 'teacher' || raw.account_type === 'teacher') ? 'teacher' : 'student';
    if (accountType === 'teacher' && !teacherEmailAllowed(user.email)) {
      await client.auth.signOut({scope:'local'});
      publish({status:'signed-out',user:null,role:null,profile:null,message:'Teacher accounts require a confirmed @bracu.ac.bd email address.'});
      return;
    }
    let applications = [];
    if (savedProfile?.account_type === 'teacher') {
      const result = await client.from('owl_post_coordinator_applications').select(applicationColumns).eq('teacher_id',user.id).order('created_at',{ascending:false});
      if (request !== revision || explicitlySignedOut) return;
      if (result.error) {
        publish({status:'unavailable',user:null,role:null,profile:null,message:'Could not load your teacher account. Please reload and try again.'});
        return;
      }
      applications = result.data || [];
    }
    const role = legacyCoordinator || applications.some(item => item.status === 'approved') ? 'coordinator' : accountType;
    const profile = {
      name: String(savedProfile?.display_name || raw.name || '').trim().slice(0, 80),
      studentId: /^\d{8}$/.test(savedProfile?.student_id || raw.student_id || '') ? (savedProfile?.student_id || raw.student_id) : '',
      department: 'CSE',
      accountType,
      missing: !savedProfile
    };
    publish({ status: recovery ? 'recovery' : 'signed-in', user, role, profile, applications, isAdmin, legacyCoordinator, message: '' });
  }

  async function initialize() {
    if (!config.url || !config.publishableKey) {
      publish({ status: 'unavailable', message: 'Account sign-in is being connected. Please check back soon.' });
      return;
    }
    try {
      const url = new URL(config.url);
      if (url.protocol !== 'https:' || !window.supabase?.createClient || !/^sb_publishable_/.test(config.publishableKey)) throw new Error('Configuration unavailable');
      // A tab-scoped key keeps this session separate from First Comet and other apps.
      sessionStorage.setItem('owl-post-storage-check', '1');
      sessionStorage.removeItem('owl-post-storage-check');
      // Confirmation/recovery links commonly open a new tab. Share only the short-lived
      // PKCE verifier across tabs; account session tokens stay in sessionStorage.
      const authStorage = {
        getItem(key) { return (key === STORAGE_KEY + '-code-verifier' ? localStorage : sessionStorage).getItem(key); },
        setItem(key, value) { (key === STORAGE_KEY + '-code-verifier' ? localStorage : sessionStorage).setItem(key, value); },
        removeItem(key) { (key === STORAGE_KEY + '-code-verifier' ? localStorage : sessionStorage).removeItem(key); }
      };
      client = window.supabase.createClient(url.href.replace(/\/$/, ''), config.publishableKey, {
        auth: { storageKey: STORAGE_KEY, storage: authStorage, persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'pkce' }
      });
      client.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY') recovery = true;
        // Keep Supabase calls outside its synchronous auth event lock.
        setTimeout(() => { validateSession(session).catch(() => publish({ status: 'signed-out', user: null, role: null, profile: null, message: 'Could not verify your session. Sign in again.' })); }, 0);
      });
      const { data, error } = await client.auth.getSession();
      if (error) throw error;
      await validateSession(data?.session);
    } catch (_) {
      publish({ status: 'unavailable', user: null, role: null, profile: null, message: 'Sign-in is unavailable right now. Please try again later.' });
    }
  }

  function passwordField(label, name, fresh = false) {
    return `<label class="owl-auth-label" for="owl-${name}">${label}<span class="owl-password-wrap"><input id="owl-${name}" name="${name}" type="password" autocomplete="${fresh ? 'new-password' : 'current-password'}" minlength="${fresh ? 12 : 1}" maxlength="256" required ${fresh ? 'aria-describedby="owl-password-hint"' : ''}><button type="button" data-owl-password="owl-${name}" aria-label="Show ${label.toLowerCase()}" aria-pressed="false">Show</button></span></label>`;
  }

  function render(host, { mode = 'signin', audience = requestedAudience, notice = '' } = {}) {
    if (!host) return;
    requestedAudience = ['student','teacher','coordinator'].includes(audience) ? audience : 'student';
    audience = requestedAudience;
    const signup = mode === 'signup';
    const reset = mode === 'reset';
    const update = mode === 'update';
    const profile = mode === 'profile';
    const teacher = profile ? current.profile?.accountType === 'teacher' : audience === 'teacher';
    const disabled = current.status === 'unavailable' || current.status === 'loading';
    const titles = { signin: 'Your courses. One place.', signup: 'Create your Owl Post account.', reset: 'Let’s get you back in.', update: 'Choose a new password.', profile: 'A name for your course space.' };
    const action = { signin: 'Sign in to Owl Post', signup: 'Create ' + (teacher ? 'teacher' : 'student') + ' account', reset: 'Send reset link', update: 'Save new password', profile: 'Save profile & continue' };
    const departmentField = '<label class="owl-auth-label" for="owl-department">Department<select id="owl-department" name="department"><option value="CSE">CSE</option></select></label>';
    const profileFields = '<label class="owl-auth-label" for="owl-name">Your full name<input id="owl-name" name="name" autocomplete="name" maxlength="80" required></label>' + (teacher ? departmentField : '<div class="owl-auth-row"><label class="owl-auth-label" for="owl-student-id">Student ID<input id="owl-student-id" name="studentId" inputmode="numeric" pattern="[0-9]{8}" maxlength="8" placeholder="8-digit ID" required></label>' + departmentField + '</div>');
    host.innerHTML = `
      <section class="owl-auth-layout">
        <aside class="owl-auth-story">
          <img class="owl-auth-art" src="assets/owl-post-logo.webp?v=recovered-20261017" width="560" height="490" alt="OwlPost">
          <p>Your course team, section conversations and shared resources. All with a space of their own.</p>
          <div class="owl-auth-channels" aria-hidden="true"><span># announcements</span><span># your-section</span><span># resources</span></div>
          <small>Part of First Comet · Built for BRACU</small>
        </aside>
        <section class="owl-auth-panel" aria-labelledby="owl-auth-title">
          <span class="owl-auth-kicker">${signup ? 'NEW TO OWL POST' : reset || update ? 'ACCOUNT RECOVERY' : profile ? 'YOUR OWL POST PROFILE' : 'WELCOME BACK'}</span>
          <h2 id="owl-auth-title">${titles[mode] || titles.signin}</h2>
          <p class="owl-auth-intro">${signup ? teacher ? 'Use your @bracu.ac.bd email. After signing in, you can apply to coordinate a course.' : 'Use your BRACU email. Your student ID will be recorded separately from enrollment verification.' : reset ? 'We’ll send a reset link to your account email.' : update ? 'Use at least 12 characters. Make it unique to your account.' : profile ? 'Complete your Owl Post ' + (teacher ? 'teacher' : 'student') + ' profile.' : teacher ? 'Sign in as a teacher to manage your coordinator applications.' : 'Sign in with your Owl Post account to continue.'}</p>
          ${mode === 'signin' ? `<div class="owl-auth-audiences" role="group" aria-label="Account type">${['student','teacher','coordinator'].map(type => `<button type="button" data-owl-audience="${type}" aria-pressed="${audience === type}">${type[0].toUpperCase()+type.slice(1)}</button>`).join('')}</div>` : ''}
          ${audience === 'coordinator' && mode === 'signin' ? '<p class="owl-auth-coordinator-note">Coordinator access requires approval. Teachers can apply after signing in with a teacher account.</p>' : ''}
          <div class="owl-auth-status ${disabled ? 'is-notice' : notice ? 'is-success' : ''}" data-owl-auth-status role="status" aria-live="polite">${escape(current.message || notice || (current.status === 'loading' ? 'Checking your session…' : ''))}</div>
          <form class="owl-auth-form" data-owl-auth-form>
            ${signup || profile ? profileFields : ''}
            ${!update && !profile ? '<label class="owl-auth-label" for="owl-email">BRACU email<input id="owl-email" name="email" type="email" autocomplete="username" spellcheck="false" autocapitalize="none" maxlength="254" placeholder="' + (teacher ? 'name@bracu.ac.bd' : 'name@g.bracu.ac.bd') + '" required></label>' : ''}
            ${!reset && !profile ? passwordField(update ? 'New password' : 'Password', 'password', signup || update) : ''}
            ${signup || update ? '<p class="owl-auth-hint" id="owl-password-hint">At least 12 characters.</p>' + passwordField('Confirm password', 'confirmPassword', true) : ''}
            ${mode === 'signin' ? '<div class="owl-auth-form-links"><span>Session stays in this tab.</span><button type="button" data-owl-auth-mode="reset">Forgot password?</button></div>' : ''}
            <button class="owl-auth-submit" type="submit" ${disabled ? 'disabled' : ''}>${action[mode] || action.signin}<span aria-hidden="true">→</span></button>
          </form>
          <div class="owl-auth-bottom">${mode === 'signin' && audience !== 'coordinator' ? 'New here? <button type="button" data-owl-auth-mode="signup">Create ' + (teacher ? 'a teacher account' : 'an account') + '</button>' : mode === 'signin' ? '<button type="button" data-owl-audience="teacher">Sign in as a teacher to apply</button>' : profile ? '<button type="button" data-owl-auth-signout>Sign out</button>' : '<button type="button" data-owl-auth-mode="signin">← Back to sign in</button>'}</div>
          <p class="owl-auth-footnote">This is Owl Post’s own sign-in. Do not enter your BRACU portal password.</p>
        </section>
      </section>`;
    host.querySelectorAll('[data-owl-audience]').forEach(button => button.addEventListener('click', () => render(host, { audience: button.dataset.owlAudience })));
    host.querySelectorAll('[data-owl-auth-mode]').forEach(button => button.addEventListener('click', () => {
      publish({ message: '' });
      render(host, { mode: button.dataset.owlAuthMode, audience });
      host.querySelector('input')?.focus();
    }));
    host.querySelector('[data-owl-auth-signout]')?.addEventListener('click', () => signOut());
    host.querySelectorAll('[data-owl-password]').forEach(button => button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.owlPassword);
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      button.textContent = show ? 'Hide' : 'Show';
      button.setAttribute('aria-pressed', String(show));
      button.setAttribute('aria-label', (show ? 'Hide ' : 'Show ') + (input.name === 'confirmPassword' ? 'confirm password' : 'password'));
    }));
    host.querySelector('[data-owl-auth-form]')?.addEventListener('submit', async event => {
      event.preventDefault();
      if (disabled || !client) return;
      const form = event.currentTarget;
      const values = new FormData(form);
      const status = host.querySelector('[data-owl-auth-status]');
      const submit = form.querySelector('[type="submit"]');
      function show(message, success = false) {
        status.textContent = message;
        status.className = 'owl-auth-status ' + (success ? 'is-success' : 'is-error');
      }
      const email = String(values.get('email') || '').trim().toLowerCase();
      if (!update && !profile && !emailAllowed(email)) { show('Use your @g.bracu.ac.bd or @bracu.ac.bd email address.'); return; }
      if (!update && !profile && teacher && !teacherEmailAllowed(email)) { show('Teacher accounts use an @bracu.ac.bd email address. Students should choose Student.'); return; }
      if ((signup || update) && values.get('password') !== values.get('confirmPassword')) { show('The passwords do not match.'); return; }
      if ((signup || profile) && (!String(values.get('name') || '').trim() || !teacher && !/^\d{8}$/.test(values.get('studentId') || ''))) { show(teacher ? 'Enter your full name.' : 'Enter your name and 8-digit student ID.'); return; }
      const profileData = {name:String(values.get('name') || '').trim(),student_id:teacher ? null : String(values.get('studentId') || ''),department:'CSE',account_type:teacher ? 'teacher' : 'student'};
      submit.disabled = true;
      form.setAttribute('aria-busy', 'true');
      show('Please wait…', true);
      try {
        if (reset) {
          const redirect = new URL(redirectUrl());
          redirect.searchParams.set('flow', 'recovery');
          const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: redirect.href });
          if (error) throw error;
          show('If an account exists for that email, a reset link has been requested. Check your inbox and spam folder.', true);
        } else if (update) {
          const { error } = await client.auth.updateUser({ password: String(values.get('password')) });
          if (error) throw error;
          recovery = false;
          history.replaceState({}, '', location.pathname);
          await signOut();
          render(host, { audience, notice: 'Password updated. Sign in with your new password.' });
        } else if (profile) {
          const row = {user_id:current.user.id,display_name:profileData.name,student_id:profileData.student_id,department:'CSE',account_type:profileData.account_type};
          const { error: saveError } = await client.from('owl_post_profiles').insert(row);
          if (saveError) throw saveError;
          const { error } = await client.auth.updateUser({ data: { owl_post_profile: profileData } });
          if (error) throw error;
          const { data } = await client.auth.getSession();
          await validateSession(data?.session);
        } else if (signup) {
          explicitlySignedOut = false;
          const { data, error } = await client.auth.signUp({ email, password: String(values.get('password')), options: { emailRedirectTo: redirectUrl(), data: { signup_app: 'owl-post', owl_post_profile: profileData } } });
          if (error) throw error;
          if (data.session) await validateSession(data.session);
          else render(host, { audience, notice: 'Check your BRACU inbox for the confirmation link. Once confirmed, return here to sign in.' });
        } else {
          explicitlySignedOut = false;
          const { data, error } = await client.auth.signInWithPassword({ email, password: String(values.get('password')) });
          if (error) throw error;
          await validateSession(data.session);
          if (audience === 'coordinator' && current.status === 'signed-in' && current.role !== 'coordinator') {
            await signOut();
            render(host, { audience: 'coordinator', notice: 'This account has not been assigned coordinator access. Sign in as a teacher to submit an application.' });
            return;
          }
          if (teacher && current.status === 'signed-in' && current.profile?.accountType !== 'teacher' && !current.legacyCoordinator && !current.profile?.missing) {
            await signOut();
            render(host,{audience:'teacher',notice:'This is a student account. Choose Student to sign in, or contact an administrator to change the account type.'});
          }
        }
        form.querySelectorAll('input[type="password"], input[name="password"], input[name="confirmPassword"]').forEach(input => { input.value = ''; });
      } catch (error) { show(messageFor(error)); }
      finally { if (submit.isConnected) submit.disabled = false; form.removeAttribute('aria-busy'); }
    });
  }

  async function signOut() {
    ++revision;
    explicitlySignedOut = true;
    recovery = false;
    const userId = current.user?.id;
    if (userId) sessionStorage.removeItem('owl-post-workspace-v1:' + userId);
    // Hide account content immediately, even when the network is unavailable.
    publish({ status: 'signed-out', user: null, role: null, profile: null, message: '' });
    if (client) {
      try { await client.auth.signOut({ scope: 'local' }); } catch (_) { /* Local cleanup still completes offline. */ }
      finally { sessionStorage.removeItem(STORAGE_KEY); localStorage.removeItem(STORAGE_KEY + '-code-verifier'); client.auth.stopAutoRefresh(); }
    }
  }

  async function refresh() {
    if (!client || explicitlySignedOut) return;
    const {data,error} = await client.auth.getSession();
    if (error) throw error;
    await validateSession(data?.session);
  }

  async function submitCoordinatorApplication({courseCode,semester,reason}) {
    if (current.status !== 'signed-in' || current.profile?.accountType !== 'teacher') throw new Error('Teacher sign-in required');
    const {error} = await client.from('owl_post_coordinator_applications').insert({teacher_id:current.user.id,course_code:courseCode,semester,reason});
    if (error) throw error;
    await refresh();
  }

  async function listCoordinatorApplications() {
    if (current.status !== 'signed-in' || !current.isAdmin) throw new Error('Administrator sign-in required');
    const {data,error} = await client.from('owl_post_coordinator_applications').select(applicationColumns+',profile:owl_post_profiles(display_name)').eq('status','pending').order('created_at',{ascending:true}).limit(100);
    if (error) throw error;
    return data || [];
  }

  async function reviewCoordinatorApplication(id,decision,note) {
    if (current.status !== 'signed-in' || !current.isAdmin) throw new Error('Administrator sign-in required');
    const {error} = await client.rpc('owl_post_review_application',{application_id:id,decision,review_note:note || ''});
    if (error) throw error;
    await refresh();
  }

  window.OwlPostAuth = Object.freeze({
    get snapshot() { return current; },
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    render,
    signOut,
    submitCoordinatorApplication,
    listCoordinatorApplications,
    reviewCoordinatorApplication,
    refresh: async () => {
      if (!client || explicitlySignedOut) return;
      try { const { data, error } = await client.auth.getSession(); if (error) throw error; await validateSession(data?.session); }
      catch (_) { publish({ status: 'signed-out', user: null, role: null, profile: null, message: 'Could not verify your session. Sign in again.' }); }
    }
  });
  document.querySelector('[data-owl-theme]')?.addEventListener('click', event => {
    const dark = document.body.classList.toggle('dark');
    event.currentTarget.setAttribute('aria-label', 'Switch to ' + (dark ? 'light' : 'dark') + ' mode');
    try { sessionStorage.setItem('owl-post-theme', dark ? 'dark' : 'light'); } catch (_) {}
  });
  try { document.body.classList.toggle('dark', sessionStorage.getItem('owl-post-theme') === 'dark'); } catch (_) {}
  initialize();
})();
