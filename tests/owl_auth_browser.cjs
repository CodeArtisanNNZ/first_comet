'use strict';
// Full browser auth flow against a deterministic HTTP auth-server fixture, never real email delivery.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');
const playwright = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ? path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, 'playwright') : 'playwright');
const root = path.resolve(__dirname, '..');
const output = process.env.FC_QA_OUTPUT || path.join(os.tmpdir(), 'owl-post-auth-qa');
fs.mkdirSync(output, {recursive:true});
const port = Number(process.env.FC_AUTH_QA_PORT || 8878);
const base = 'http://127.0.0.1:' + port;
const server = spawn('python', ['-m','http.server',String(port),'--bind','127.0.0.1','--directory',path.join(root,'public')], {stdio:'ignore'});
const authOrigin = 'https://owl-post-test.supabase.co';
const password = 'test-only-password-932!';
const accounts = new Map();
const requests = [];
const user = (id, email, role = 'student', confirmed = true) => ({
  id,email,aud:'authenticated',role:'authenticated',created_at:'2026-10-17T00:00:00Z',email_confirmed_at:confirmed ? '2026-10-17T00:00:00Z' : null,
  app_metadata:{provider:'email',providers:['email'],...(role === 'coordinator' ? {owl_post_role:role} : {})},
  user_metadata:{owl_post_profile:{name:id === 'student-two' ? 'Second Student' : role === 'coordinator' ? 'Course Coordinator' : 'Owl Student',student_id:'24101022',department:'CSE'},owl_post_role:'coordinator'}
});
accounts.set('student@g.bracu.ac.bd', user('student-one','student@g.bracu.ac.bd'));
accounts.set('second@g.bracu.ac.bd', user('student-two','second@g.bracu.ac.bd'));
accounts.set('coordinator@bracu.ac.bd', user('coordinator-one','coordinator@bracu.ac.bd','coordinator'));
accounts.set('unconfirmed@g.bracu.ac.bd', user('unconfirmed','unconfirmed@g.bracu.ac.bd','student',false));
const existing = user('existing-healthcare','existing@g.bracu.ac.bd');
existing.user_metadata = {full_name:'Existing healthcare name'};
accounts.set(existing.email,existing);
const tokens = new Map();
function session(account) {
  const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
  const access = encode({alg:'HS256',typ:'JWT'}) + '.' + encode({sub:account.id,exp:Math.floor(Date.now()/1000)+3600,role:'authenticated',aud:'authenticated'}) + '.test-signature';
  tokens.set(access,account.email);
  return {access_token:access,refresh_token:'refresh-' + account.id,expires_in:3600,expires_at:Math.floor(Date.now()/1000)+3600,token_type:'bearer',user:account};
}
async function installFixture(context, configured = true) {
  await context.route('**/*', route => {
    const origin = new URL(route.request().url()).origin;
    return origin === base || origin === authOrigin ? route.continue() : route.abort();
  });
  await context.route('**/owl-auth-config.js*', route => route.fulfill({contentType:'application/javascript',body:'window.OWL_POST_AUTH_CONFIG=' + JSON.stringify({url:configured ? authOrigin : '',publishableKey:configured ? 'sb_publishable_fixture_only' : '',redirectUrl:base + '/owl-post.html'})}));
  await context.route(authOrigin + '/**', async route => {
    const request = route.request();
    const url = new URL(request.url());
    const headers = {'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'GET,POST,PUT,OPTIONS','access-control-expose-headers':'x-supabase-api-version','x-supabase-api-version':'2024-01-01','content-type':'application/json'};
    const respond = (body,status=200) => route.fulfill({status,headers,body:JSON.stringify(body)});
    if(request.method() === 'OPTIONS') return respond({});
    const data = request.postDataJSON() || {};
    requests.push({path:url.pathname,method:request.method(),body:data});
    if (url.pathname === '/rest/v1/owl_post_profiles') {
      const token = (request.headers().authorization || '').replace(/^Bearer /,'');
      const account = accounts.get(tokens.get(token));
      if (!account) return respond({message:'Unauthorized'},401);
      if (request.method() === 'POST') account.owlProfile = data;
      return respond(account.owlProfile || (account.user_metadata.owl_post_profile ? {display_name:account.user_metadata.owl_post_profile.name,student_id:'24101022',department:'CSE'} : null));
    }
    if (url.pathname.endsWith('/token')) {
      if (url.searchParams.get('grant_type') === 'pkce') {
        const recoveryRequest = requests.filter(item=>item.path.endsWith('/recover')).at(-1);
        const challenge = crypto.createHash('sha256').update(data.code_verifier).digest('base64url');
        if (data.auth_code !== 'fixture-recovery-code' || recoveryRequest.body.code_challenge !== challenge) return respond({code:'bad_code_verifier',msg:'Invalid verifier'},400);
        return respond(session(accounts.get('second@g.bracu.ac.bd')));
      }
      const account = accounts.get(data.email);
      if (!account || data.password !== password) return respond({code:'invalid_credentials',msg:'Invalid login credentials'},400);
      if (!account.email_confirmed_at) return respond({code:'email_not_confirmed',msg:'Email not confirmed'},400);
      return respond(session(account));
    }
    if (url.pathname.endsWith('/user')) {
      const token = (request.headers().authorization || '').replace(/^Bearer /,'');
      const account = accounts.get(tokens.get(token));
      if (!account) return respond({code:'bad_jwt',msg:'Invalid JWT'},401);
      if (request.method() === 'PUT') {
        if (data.data) account.user_metadata = {...account.user_metadata,...data.data};
        if (data.password) account.passwordUpdated = true;
      }
      return respond(account);
    }
    if (url.pathname.endsWith('/signup')) return respond({user:user('new-student',data.email),session:null});
    if (url.pathname.endsWith('/logout') || url.pathname.endsWith('/recover')) return respond({});
    return respond({message:'Unexpected fixture endpoint'},404);
  });
}
async function signIn(page, email, value = password) {
  await page.locator('#owl-email').fill(email);
  await page.locator('#owl-password').fill(value);
  await page.locator('[data-owl-auth-form] button[type="submit"]').click();
}

(async () => {
  let browser;
  try {
    for(let i=0;i<30;i++) { try{if((await fetch(base)).ok)break;}catch(_){} await new Promise(resolve=>setTimeout(resolve,100)); }
    const launch = {headless:true};
    if(process.env.FC_CHROMIUM_MODULE) {
      const imported = require(process.env.FC_CHROMIUM_MODULE);
      const chromium = imported.default || imported;
      launch.args = chromium.args;
      launch.executablePath = process.env.FC_CHROMIUM_EXECUTABLE || await chromium.executablePath();
    } else if(process.env.FC_CHROMIUM_EXECUTABLE) {
      launch.executablePath = process.env.FC_CHROMIUM_EXECUTABLE;
      launch.args = ['--no-sandbox'];
    }
    browser = await playwright.chromium.launch(launch);
    const context = await browser.newContext({viewport:{width:1440,height:1000}});
    await installFixture(context);
    let page = await context.newPage();
    page.setDefaultTimeout(12000);
    const errors=[]; page.on('pageerror', error=>errors.push(error.message));
    await page.goto(base + '/owl-post.html');
    await page.waitForFunction(()=>window.OwlPostAuth?.snapshot.status==='signed-out');
    await page.evaluate(()=>{
      localStorage.setItem('fc-user-name-v1','First Comet Name');
      localStorage.setItem('fc-teacher-choice-v1','female');
      localStorage.setItem('fc-owl-post-v2',JSON.stringify({role:'coordinator',verified:true,studentId:'24101022',open:true}));
    });
    assert.equal(await page.locator('[data-owl-workspace]').count(),0);
    for(const width of [1440,768,390,320]) {
      await page.setViewportSize({width,height:1000});
      for(const dark of [false,true]) {
        await page.evaluate(value=>document.body.classList.toggle('dark',value),dark);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'auth overflow at '+width);
        await page.screenshot({path:path.join(output,`auth-${width}-${dark?'dark':'light'}.png`)});
      }
    }
    await page.setViewportSize({width:1440,height:1000});
    await page.evaluate(()=>document.body.classList.remove('dark'));
    await page.locator('[data-owl-auth-mode="signup"]').click();
    await page.locator('#owl-name').fill('New Student');
    await page.locator('#owl-student-id').fill('24101022');
    await page.locator('#owl-email').fill('student@example.com');
    await page.locator('#owl-password').fill(password);
    await page.locator('#owl-confirmPassword').fill(password);
    await page.locator('[data-owl-auth-form] button[type="submit"]').click();
    await page.getByText('Use your @g.bracu.ac.bd or @bracu.ac.bd email address.').waitFor();
    await page.locator('#owl-email').fill('new@g.bracu.ac.bd');
    await page.locator('#owl-confirmPassword').fill(password+'different');
    await page.locator('[data-owl-auth-form] button[type="submit"]').click();
    await page.getByText('The passwords do not match.').waitFor();
    await page.locator('#owl-confirmPassword').fill(password);
    await page.locator('[data-owl-password="owl-password"]').click();
    assert.equal(await page.locator('#owl-password').getAttribute('type'),'text');
    await page.locator('[data-owl-auth-form] button[type="submit"]').click();
    await page.getByText(/Check your BRACU inbox/).waitFor();
    assert.equal(await page.locator('[data-owl-workspace]').count(),0);
    const signupRequest=requests.find(item=>item.path.endsWith('/signup'));
    assert.ok(signupRequest.body.data.owl_post_profile);
    assert.equal(signupRequest.body.data.owl_post_role,undefined);

    await signIn(page,'student@g.bracu.ac.bd','wrong-password');
    await page.getByText('The email or password is incorrect.').waitFor().catch(async error => {
      console.log('Auth error diagnostic:',await page.locator('[data-owl-auth-status]').textContent(),errors,requests.map(item=>({path:item.path,method:item.method})));
      throw error;
    });
    await page.locator('[data-owl-auth-mode="reset"]').click();
    await page.locator('#owl-email').fill('student@g.bracu.ac.bd');
    await page.locator('[data-owl-auth-form] button[type="submit"]').click();
    await page.getByText(/If an account exists/).waitFor();
    await page.locator('[data-owl-auth-mode="signin"]').click();
    await signIn(page,'unconfirmed@g.bracu.ac.bd');
    await page.getByText(/Confirm your email address before signing in/).waitFor();
    assert.equal(await page.locator('[data-owl-workspace]').count(),0);
    await signIn(page,'student@g.bracu.ac.bd');
    await page.getByText('Which courses are on your semester?').waitFor();
    assert.equal(await page.locator('[data-owl-role]').count(),0);
    await page.locator('[data-owl-enroll="CSE470"]').click();
    await page.locator('[data-owl-enter]').click();
    await page.locator('[data-owl-accept-rules]').click();
    await page.locator('[data-owl-channel="general"]').click();
    await page.locator('[data-owl-message-input]').fill('Private local account-one message');
    await page.locator('[data-owl-composer]').evaluate(form=>form.requestSubmit());
    await page.getByText('Private local account-one message').waitFor();
    assert.equal(await page.locator('[data-owl-studio]').count(),0);
    const stored=await page.evaluate(()=>({name:localStorage.getItem('fc-user-name-v1'),teacher:localStorage.getItem('fc-teacher-choice-v1'),passwordStored:JSON.stringify({...localStorage,...sessionStorage}).includes('test-only-password-932!')}));
    assert.deepEqual(stored,{name:'First Comet Name',teacher:'female',passwordStored:false});
    await page.evaluate(()=>{
      const key='owl-post-workspace-v1:student-one';
      const value=JSON.parse(sessionStorage.getItem(key));value.role='coordinator';sessionStorage.setItem(key,JSON.stringify(value));
    });
    await page.reload();
    await page.getByText('Private local account-one message').waitFor();
    assert.equal(await page.locator('[data-owl-studio]').count(),0,'saved workspace must not grant coordinator privileges');
    await page.locator('[data-owl-signout]').click();
    await page.locator('#owl-email').waitFor();
    assert.equal(await page.getByText('Private local account-one message').count(),0);
    assert.equal(await page.evaluate(()=>sessionStorage.getItem('owl-post-workspace-v1:student-one')),null);
    await page.locator('[data-owl-audience="coordinator"]').click();
    await signIn(page,'student@g.bracu.ac.bd');
    await page.getByText(/has not been assigned coordinator access/).waitFor();
    assert.equal(await page.locator('[data-owl-studio]').count(),0);
    await page.locator('[data-owl-audience="student"]').click();
    await signIn(page,'second@g.bracu.ac.bd');
    await page.getByText('Which courses are on your semester?').waitFor();
    assert.equal(await page.getByText('Private local account-one message').count(),0);
    await page.locator('[data-owl-signout]').click();
    await page.locator('[data-owl-auth-mode="reset"]').click();
    await page.locator('#owl-email').fill('second@g.bracu.ac.bd');
    await page.locator('[data-owl-auth-form] button[type="submit"]').click();
    await page.getByText(/If an account exists/).waitFor();
    const recoveryPage = await context.newPage();
    recoveryPage.setDefaultTimeout(12000);
    recoveryPage.on('pageerror',error=>errors.push(error.message));
    await recoveryPage.goto(base+'/owl-post.html?code=fixture-recovery-code&flow=recovery');
    await page.close();
    page = recoveryPage;
    await page.getByText('Choose a new password.').waitFor();
    await page.locator('#owl-password').fill(password+'-updated');
    await page.locator('#owl-confirmPassword').fill(password+'-updated');
    await page.locator('[data-owl-auth-form] button[type="submit"]').click();
    await page.getByText('Password updated. Sign in with your new password.').waitFor();
    assert.equal(accounts.get('second@g.bracu.ac.bd').passwordUpdated,true);
    await page.locator('#owl-email').waitFor();
    await signIn(page,'existing@g.bracu.ac.bd');
    await page.getByText('A name for your course space.').waitFor();
    await page.locator('#owl-name').fill('Owl Profile Only');
    await page.locator('#owl-student-id').fill('24101022');
    await page.locator('[data-owl-auth-form] button[type="submit"]').click();
    await page.getByText('Which courses are on your semester?').waitFor();
    assert.equal(accounts.get('existing@g.bracu.ac.bd').user_metadata.full_name,'Existing healthcare name');
    assert.equal(accounts.get('existing@g.bracu.ac.bd').owlProfile.display_name,'Owl Profile Only');
    await page.locator('[data-owl-signout]').click();
    await page.locator('#owl-email').waitFor();
    await page.locator('[data-owl-audience="coordinator"]').click();
    await signIn(page,'coordinator@bracu.ac.bd');
    await page.locator('[data-owl-studio]').first().waitFor();
    assert.ok((await page.locator('.owl-account-badge').textContent()).includes('Coordinator'));
    await page.locator('[data-owl-signout]').click();
    await page.locator('#owl-email').waitFor();
    const forged = session(user('forged-coordinator','forged@g.bracu.ac.bd','coordinator'));
    await page.evaluate(value=>sessionStorage.setItem('owl-post-auth-v1',JSON.stringify(value)),forged);
    await page.reload();
    await page.waitForFunction(()=>window.OwlPostAuth?.snapshot.status==='signed-out');
    assert.equal(await page.locator('[data-owl-workspace]').count(),0,'a forged saved auth object must fail the server check');
    assert.deepEqual(errors,[]);
    await installFixture(context,false);
    const pendingPage=await context.newPage();
    await pendingPage.setViewportSize({width:390,height:844});
    await pendingPage.goto(base+'/owl-post.html');
    await pendingPage.getByText('Account sign-in is being connected. Please check back soon.').waitFor();
    assert.equal(await pendingPage.locator('[type="submit"]').isDisabled(),true);
    assert.equal(await pendingPage.locator('[data-owl-workspace]').count(),0);
    console.log('PASS: separate entry; signup validation and confirmation gate; wrong password; unconfirmed email; password recovery request and update; server-verified sessions; refresh; logout; user isolation; forged roles rejected; coordinator assignment; no password persistence; 8 responsive screenshots; unavailable backend stays closed.');
  } finally { await browser?.close(); server.kill(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
