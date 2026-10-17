(() => {
  'use strict';
  const auth = window.OwlPostAuth;
  const esc = value => String(value || '').replace(/[&<>"']/g,ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  let owner = '';
  let view = 'own';
  let revision = 0;

  function semesters() {
    const date = new Date();
    const year = date.getFullYear();
    const season = date.getMonth() < 4 ? 'Spring' : date.getMonth() < 8 ? 'Summer' : 'Fall';
    return {current:season+' '+year,options:[year,year+1].flatMap(value => ['Spring','Summer','Fall'].map(term => term+' '+value))};
  }

  function messageFor(error) {
    if (error?.code === '23505') return 'An application for this course and semester is already pending or approved.';
    if (error?.code === '42501') return 'This action is not allowed for your account. Refresh your account and try again.';
    if (error?.code === 'P0002') return 'This application has already been reviewed. Refresh the list to see the latest status.';
    if (error?.status === 429) return 'Too many attempts. Wait a few minutes, then try again.';
    return 'Could not complete the request. Check your connection and try again.';
  }

  function currentHost(userId) {
    return auth.snapshot.status === 'signed-in' && auth.snapshot.user?.id === userId ? document.querySelector('[data-owl-teacher-root]') : null;
  }

  function history(items) {
    if (!items.length) return '<p class="owl-teacher-empty">You have not submitted an application yet.</p>';
    return items.map(item => {
      const status = ['pending','approved','rejected'].includes(item.status) ? item.status : 'pending';
      const label = {pending:'Pending review',approved:'Approved',rejected:'Rejected'}[status];
      return `<article class="owl-application"><header><div><b>${esc(item.course_code)}</b><small>${esc(item.semester)}</small></div><span class="owl-application-status is-${status}">${label}</span></header><p>${esc(item.reason)}</p>${item.review_note ? '<p class="owl-review-note"><b>Review note:</b> '+esc(item.review_note)+'</p>' : ''}${status === 'pending' ? '<small>Coordinator access to this course is awaiting approval.</small>' : status === 'approved' ? '<small>Coordinator access is assigned to this course and semester.</small>' : '<small>You can submit a new application for this course and semester.</small>'}</article>`;
    }).join('');
  }

  function applicationForm() {
    const term = semesters();
    const courses = Array.isArray(window.FC_BRACU_COURSES) ? window.FC_BRACU_COURSES : [];
    return `<section class="owl-teacher-card"><h3>Apply to be a course coordinator</h3><p>Choose the course and semester you would like to coordinate. An Owl Post administrator will review your request.</p><form class="owl-auth-form" data-owl-application-form><label class="owl-auth-label" for="owl-application-course">Course<select id="owl-application-course" name="courseCode" required><option value="">Choose a course</option>${courses.map(course => '<option value="'+esc(course.code)+'">'+esc(course.code+' · '+course.title)+'</option>').join('')}</select></label><label class="owl-auth-label" for="owl-application-semester">Semester<select id="owl-application-semester" name="semester" required>${term.options.map(value => '<option'+(value===term.current?' selected':'')+'>'+esc(value)+'</option>').join('')}</select></label><label class="owl-auth-label" for="owl-application-reason">Your role in this course<textarea id="owl-application-reason" name="reason" minlength="20" maxlength="1000" rows="4" placeholder="Describe your teaching role and why you are requesting coordinator access." required></textarea></label><p class="owl-auth-hint">20–1,000 characters. Do not include passwords or student records.</p><button class="owl-auth-submit" type="submit">Submit application<span aria-hidden="true">→</span></button></form></section>`;
  }

  async function render(host,{notice='',requestedView}={}) {
    const snapshot = auth?.snapshot;
    if (!host || snapshot?.status !== 'signed-in') return;
    const userId = snapshot.user.id;
    const teacher = snapshot.profile?.accountType === 'teacher';
    if (!teacher && !snapshot.isAdmin) return;
    if (owner !== userId) { owner=userId; view=teacher?'own':'review'; }
    if (requestedView) view=requestedView;
    if (!snapshot.isAdmin) view='own';
    const request = ++revision;
    host.setAttribute('data-owl-teacher-root','');
    host.innerHTML = `<section class="owl-teacher-home"><header class="owl-teacher-heading"><div><span class="owl-auth-kicker">${snapshot.isAdmin?'OWL POST · APPLICATIONS':'OWL POST · TEACHER ACCOUNT'}</span><h2>Welcome, ${esc(snapshot.profile?.name)}.</h2><p>${view==='review'?'Review teacher requests for a specific course and semester.':'Your teacher account is ready. Apply for coordinator access below.'}</p></div><button class="owl-teacher-refresh" type="button" data-owl-applications-refresh>Refresh status</button></header>${snapshot.isAdmin ? '<div class="owl-teacher-tabs" role="group" aria-label="Applications">'+(teacher?'<button type="button" data-owl-application-view="own" aria-pressed="'+(view==='own')+'">My applications</button>':'')+'<button type="button" data-owl-application-view="review" aria-pressed="'+(view==='review')+'">Review applications</button></div>':''}<p class="owl-auth-status ${notice?'is-success':''}" role="status" aria-live="polite" data-owl-application-status>${esc(notice)}</p>${view==='review'?'<div class="owl-review-list" data-owl-review-list><p role="status">Loading applications…</p></div>':'<div class="owl-teacher-grid">'+applicationForm()+'<section class="owl-teacher-card"><h3>My applications</h3><div class="owl-application-list">'+history(snapshot.applications || [])+'</div></section></div>'}<p class="owl-teacher-boundary">Course workspaces and messages are still a local preview. Approval does not verify official university enrollment.</p></section>`;
    function show(error) {
      const status=host.querySelector('[data-owl-application-status]');
      if (status) {status.className='owl-auth-status is-error';status.textContent=messageFor(error);status.scrollIntoView({block:'nearest'});}
    }
    host.querySelectorAll('[data-owl-application-view]').forEach(button=>button.addEventListener('click',()=>render(host,{requestedView:button.dataset.owlApplicationView})));
    host.querySelector('[data-owl-applications-refresh]')?.addEventListener('click',async event=>{
      const button=event.currentTarget;button.disabled=true;
      try {await auth.refresh();const next=currentHost(userId);if(next)render(next,{notice:'Application status refreshed.'});}
      catch(error){if(host.isConnected)show(error);}
      finally{if(button.isConnected)button.disabled=false;}
    });
    host.querySelector('[data-owl-application-form]')?.addEventListener('submit',async event=>{
      event.preventDefault();
      const form=event.currentTarget;
      const values=new FormData(form);
      const reason=String(values.get('reason')||'').trim();
      if(reason.length<20 || reason.length>1000){form.elements.reason.focus();return;}
      const button=form.querySelector('[type="submit"]');button.disabled=true;form.setAttribute('aria-busy','true');
      try {
        await auth.submitCoordinatorApplication({courseCode:String(values.get('courseCode')),semester:String(values.get('semester')),reason});
        const next=currentHost(userId);if(next)render(next,{notice:'Application submitted. Coordinator access to this course requires approval.'});
      } catch(error){if(host.isConnected)show(error);}
      finally{if(button.isConnected)button.disabled=false;form.removeAttribute('aria-busy');}
    });
    if(view!=='review')return;
    try {
      const items=await auth.listCoordinatorApplications();
      if(request!==revision || !host.isConnected || auth.snapshot.user?.id!==userId)return;
      const list=host.querySelector('[data-owl-review-list]');
      list.innerHTML=items.length?items.map(item=>`<article class="owl-application"><header><div><b>${esc(item.profile?.display_name || 'Teacher')}</b><small>${esc(item.applicant_email)}</small></div><span class="owl-application-status is-pending">Pending review</span></header><h3>${esc(item.course_code)} · ${esc(item.semester)}</h3><p>${esc(item.reason)}</p><form data-owl-review-form data-application-id="${esc(item.id)}"><label class="owl-auth-label" for="owl-review-${esc(item.id)}">Review note <span class="owl-auth-hint">Optional</span><textarea id="owl-review-${esc(item.id)}" name="note" maxlength="1000" rows="2"></textarea></label><div class="owl-review-actions"><button type="submit" name="decision" value="approved" ${item.teacher_id===userId?'disabled':''}>Approve</button><button type="submit" name="decision" value="rejected" ${item.teacher_id===userId?'disabled':''}>Reject</button></div>${item.teacher_id===userId?'<small>Another administrator must review your application.</small>':''}</form></article>`).join(''):'<p class="owl-teacher-empty">No applications are waiting for review.</p>';
      list.querySelectorAll('[data-owl-review-form]').forEach(form=>form.addEventListener('submit',async event=>{
        event.preventDefault();
        const decision=event.submitter?.value;
        if(!['approved','rejected'].includes(decision))return;
        form.querySelectorAll('button').forEach(button=>{button.disabled=true;});
        try{
          await auth.reviewCoordinatorApplication(form.dataset.applicationId,decision,form.elements.note.value.trim());
          const next=currentHost(userId);if(next)render(next,{notice:'Application '+decision+'.',requestedView:'review'});
        }catch(error){if(host.isConnected){show(error);form.querySelectorAll('button').forEach(button=>{button.disabled=false;});}}
      }));
    }catch(error){if(request===revision && host.isConnected){host.querySelector('[data-owl-review-list]').innerHTML='';show(error);}}
  }
  window.OwlPostTeachers=Object.freeze({render});
})();
