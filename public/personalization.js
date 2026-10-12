(() => {
  'use strict';

  const storageKey = 'fc-user-name-v1';
  const sessionSkipKey = 'fc-name-skip-session-v1';
  const teacherChoiceKey = 'fc-teacher-choice-v1';
  const teacherSkipKey = 'fc-teacher-choice-skip-session-v1';
  const ageKey = 'fc-user-age-v1';
  const ageSkipKey = 'fc-user-age-skip-session-v1';
  const teacherAvatars = { female:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHCAkIBgoJCAkMCwoMDxoRDw4ODx8WGBMaJSEnJiQhJCMpLjsyKSw4LCMkM0Y0OD0/QkNCKDFITUhATTtBQj//2wBDAQsMDA8NDx4RER4/KiQqPz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz//wAARCACQAJADASIAAhEBAxEB/8QAHAAAAQUBAQEAAAAAAAAAAAAABgIDBAUHAAEI/8QAOhAAAgEDAgQDBQYFBAMBAAAAAQIDAAQRBSESMUFRBhNhIjJxgZEHFCOhscEzQlJi0RVy4fAkQ/HS/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBAUA/8QAKhEAAgICAQMCBQUBAAAAAAAAAAECEQMhEgQxQSJREzJCYXGBkaHB0fD/2gAMAwEAAhEDEQA/ANcrq6m5pUhiaSVuFFG5qJVK3SFOyohd2CqoySTgCq77zc35xZfg2/Wdhu3+0fvTV0ytF971QmK2U/h2/Vj04u59OlUGpaxPfEoh8qAbCNTz+Pf9Kz5MqR0On6Vz7fv4X+v+AgS80qwYr56tKfffd2PxNSbuG31CwLBEnyhMRPcjbFA8UbzSpFEpZ2OFA6mj2xtxaWUMAOfLXBPc9fzoYpvJaa0P1WGPT8ZKTciv0nRRYNFMZn87gIlUY4Wz0+VW9UXiDxZo+gApeXPHcgbW8PtSfMch88VnWs/ahql0WTTIYrGL+s/iSfU7D5CtEMfFUjBkyyyS5SezYWdUXidgq92OBQ7qXjjw5pzmOXUklkBwVt1MmPmNvzrCb/U7/U5TLe3U1we8rlvoDsKjtIxYFuE4GBlRiqcCdm82Hj7w5fSiNLx42PLzYyP0zRLBPFcRCWCVJY25MjAg181W94ikCW0glX/Zwn6ijfRtYNiFNndS28jYPC+6n0Of3qc/SVhBTWmbDXtDui+JY7vhh1AJbznZWB9iT/B9D9aIcY5fSvJ32FlFxdM9rq4V1EQ6upkXdu1z93WVWmAJKrvjHPPY+lQbzWrS2mijWVGYyKkiZ9pOJSVz23G+eQo0AnWlzHeWkdzBx+XIOJeNChx8DuKRd+TGPvV02I4RlR0B7+p6CpCOsiK6sGVhkEHmD1qBc2Z1C5X7zn7pEcrHn+I3c+nYUkrrRXElfqdIoTBf6/dmZh5dsDhC3JR6dzUC9tFg1A2lqzTsCFyBuW6jFFOo3MxP3DTFBnwAzDZYV/Y9qXpmlwabEWzxzEe3K3547CszxcnS/VnUj1bxx5NUvEf7f/bGdF0hbFPOmw1yw6ckHYf5oP8AtC8dnTjJpejS/wDkj2ZrhT/D/tX+7uenx5R/Gv2gZV9P8PykDcS3i9uoj/8A19O9ZRI5llLHkK2Y8aiqOVlyyyy5SFl3lZmkYkscsSdyfWvMcRH9I5CvDsMfWlKD1qpMVj1pJHaljekPIiHBOW7DevHjhlTkHenTGCA/nhid8HO1RDLIx9hQB350lkkb3yT8TQYUE+j6o0P4N1eQvBjAVicr9RyrSvCniXhMVrPN51qxCxyE5aI9AT1H6fCsL8r2SVCkqMkZ3xVr4evmtLzyt2ilGODPWoyh9SLxnyXCR9MKQUBB2NeMy5CEjLA7dxQ74O1n/UdNMMrl57cD2mO7ofdb9j8PWiFFVXfC4L7k96CZNxptMqpNGWVh7XkRx3DyRrFtsVAHLsRnFSorLT7GEyBEUIpJd9zgLv8AkKZ1a6vbae2SzTjMp2HDndSHYZ6ZQMB64qPbaTcTWRiu5mELqB5O2ArRniBHfjYnJzyFOTLyvDUSOyKNxPeXUh/ulwPoKl86RN+SjSXZ2M4gs7d3YrFEoLu7HA9WJP61kfjjxw+ql7HTWaPThszcmuPj2X069e1J+0TxdLqOozaVasVsbeQo+D/GcHcn0B5D0z2oELFmy1VjGhG2+55NL+GSeeMn9qjoeFB3/euuGzGO7GvIhxHJ5Lt86cA4gJ3NOMQgy3XkOppvjJbCY25noK9Ubkk7nmTzNANHZeTb3F7Dn8zS/JVEBVfypQXoB9Kl2dlPdK5jXESDMkjbIoHfvQboZRb0iCfSvODqTUrgTifBZs7AkY2/ap2l6Z99uRHxYUDLkDkKVySVsaMHJ0ioVokk/EUswB5HGNvzpFujGZRF7Eo3TPUiiPW/Dcmn2v3mIM0eM78wO9UABARxswAOaEZKStDTg4OmHXg/WRp2u2skjYgkHEf9j7MPkcH5Vs67qK+cJJTBFDKn/qkIx/awDY/Mit58LXo1Dw1Y3Gct5YRviu37UiPZPcmXmoRWckcciSMX3yi5CjiC5J+LDlk+lMTa1ZRHhSVZHKhlwcKRxBfeO3UH4VIntFmvIJ5AGEKuACOrY3H0/OvIrO0tuGRIUVo41j8wj2uFRgDNMRJVcOY+NdQv461yXSdAuTZtwzkCPzP6C3ID+7GT6AZ7UBjCb5y15KzHLNIxPx4jTbHCMflSWxwA88bZpLnMYHc5qwg1Nu0YA5DPzpfBLsiKAvVjtmrLS7J5rh5+KFI4RnilGQWAziot0qSag7wEpG54hGOS9xS8t0U+G1HkJjt8YAAJ7DNTks5wOKWB0i5s6pxYHw/zXken6l5kAijdjPjgIbhznOB6e6asbPxBqVjI1tdecEjJDGLhYDHPpnHPrSSk/pKxjFfNot9B0bQLiEXFxqSzFdzCX4MfEcz8qb1/Uorz/wAKwjW3sIjyXbzSOp9B0FJjtNN1VvvXGqxtn8W3jJOevGCSQflirTS9HGly8U8qTxy/wuBA0x7Be2e4+oqDkrt9zSoOq8A7DpkzoZXjZYQQoON5GPJVHf8ASjrQNGi0+zQOoeU+1I3ME9h6Dv1p+x013nS5vlVWQEQ26HKxA9z1Y9TVtjFSnNy0UhBR2VPiSES6LOMfyn9DWVpAJBGCwzvxD0rVPFMnl+H7gg4Z8Io7knFZQfw3AO5XnVcHZks9Wh7UQI7QAfzRofpkVrn2aTMuhxwscrIC6fEBQw/NTWSa1n7lAR24f3H6GtY+zsY8K2svWK64SfRlVT+o+lV8JkJ92gu1VWfSbxVDFjC/CFznODjlvVTaWOoyQJDHceRZe3/6zHIQc/yj3d2yBnYKu29EFdRIDVzKYLaSQDLKPZB6k7AfUish+1XUx/qUGkxPxLaL5kzf1yvuSflj61rd+oNjMWYKEXjyeQ4fa/avnHVr2TU9UuL2b37iRpD8zy+QwPlTR7gfYgJ7SMKTkGND6fvShlZivI5wRSG9mThPLmKoKX2h2zXwkiUFkiPHIo6k44R+RPyqyu7W3dLbyEASOHLED+dmxj6/pVN4d1YaPrLyyqzW8g4JQvMDYgjuQaM7W4tNattRnsiZDFwEng4dw3EdvgKyZOUZX4Ojh4yhXkvBp8WCnu8AQKV5jhGxqovPC6XM3HhGbJ9sZBAJydutE7xktxIf8EV6pxsysD8Mj8qyqUl2NsoxktlVZ+HbLT9RW4suJIzEqsmdyw5H44zS7SeysNRurdQIhxAjhjbAyMkcQGBvvjPWrC4Vprd44+IFhw8XLh9a8tY0tLZLeLiKrtljkk9zRcr2yajWons9/bQ26SiZCsg9hg2QfhjnQpfSXEtyZE1u7tgTtlCFH5AU9qGl3FzYXMtn5lvJNOeIxnB4BscdskZOMZoe0rwld3tyvHK0aRgmWZJWG++Bk9eXwxVYRXuTnKS8WTtTTXWtYpBqMGpW/m4iBUAsQMk7fA8zQlnikbIxlc47ZNS2nutJa6SRpJMMVt7hBjjPXP8AVt/xVXbP5TyeYxbykwc8zzx+orRCLRlySTpF1dxCewQ8+EK30JrTfs5bPglx188Y+OErMvMC6NbkjqiN8wf81p32Wxs/hjDDCx3JJOfeYKuB8uf0oLsDJ7h0eZpueUQws5GSNgo5segqFqV+LaaC3UkPKeIkYBCj1O2Ty+tSIkaZ1nmK5HuIhyq+uep9a9yt0ifw2kpS7CNWBbSLxVGSYX277Vgni3Rm0TxHcWqA/dyfNt27xtuPpy+VfQU0scEDzTyLHFGpZ3c4CgcyTWBeO/E8euaxElmuLC14kgLLhiDzPfh22HQVWNkmy30oaH4l0l4dRYQaxEpxc9SBy2/mHQ9aEda0m80qcRXsRjbHEjY2de4PUVCR3huFliYq6HiVhzBrStI17T/F2mjRvESKspH4Uy7HPdT0Pp1ou47DqX5M1Qh58DqOL9qNPsymEd9eW592aNSM9SM5H0/SqbWfCuo6RqckcEZvbeJcmeAcQx0yOhxzFL8OSPa3byRSBSJFwf6W3wT6E5HzqWSpRdF8NqabNahTy1EfMLsp9O1OYpiwukvbRZo9s7MvVW6inpOPh/DKhv7gSKwnQOb3TgZPamUCvNhgcgE4x6bV3nyKSJIth1Q5/KnUkSWMPG2VNAbaGsLEOE7HJI9etQ723tGVprpFVEBZ2O2w796sXQOuCMigbxd4ghs7h9NgUzMg/F9v2A3RT8OZx126U0YuTpAlkjBWwZ8RXD3+om4mUx2yLwxoRjhXoAO551Sx5ZZBzMhwPTJ5Uqaaa5kMkzlmPLPIegFPRDyYSwHte6vxPWuglxVHLk+cmyY7l7KJE90SfptWyfZsnD4U4uErx3MjYI+ArPvBvhr78sd5qOV0y3Pt/wBUz8/LUcyTnf41sGkWrWunojqqyuzSyIvJWZixA+GcfKlBOVkxlVhhlDDsRmuVVRQqKFUcgBgUhp4lzlwSOYXc/lSDcMfchc+rEL/zQtA4yMc8feM212VrDTnK6ZGdzyNww6n+3sPmelZ4hzcAHcnJp5ZgsmBgj1rzhCzcWAFbP1rQtEjlw3snYinI+MZRc8efZxzz0xTT+zJkUSeDNO+/+IIZJMfd7cebITy290fX9KWUuKsaEXKSSNI02OTTtEja8kLzJEGmduZbGT/30qHPo2j6iXvIzHHJIvC0sRA4s9xyJ2HrUjW7efVdOeys5hEk2FlnIyAnUL3J+lKsdJsdLtYwS0jIvD5sxyx/76Vzb83s69bUa0VMUs+iX4LHzYnAEgUfxAP5h/cO3/FFUMsc8SSwuHjcZVhyIqJNbR3aKnHHFC+eJpYyeDbZhy+dU19Bqvha44GaJ4JSSgOfLkPUg81Pcf8A2iouSsDlFS4hMVGckCmLy8tbCEzXtxHBH/VI2M/DvQF4k8YalBZBYTHaySnC+WOJgOpyf8UBXF9PdOZbiZ5Zj/NIxYn51SGBy2yOTqFB15NE1/x8oR4NEVgx2N04xj/Yvf1P0oAdjKSSSSx5nme5puNXkPCMk9wKkx+XGSHYswHuoNhWqMIwVIxynLI7Y5bWcsp4gMKOp5CjKy8JTNpMWoXBVIZFxaRIQ0ty5G2ByUbZJO+ByoHmuPMmZQ0gRPZCZ/eth+zC4triFopV47qFMwM7E4ib3lUchvzxzzQd+QppJ0EnhHTbez8O6ewiXzmhDtIdzltzjtz6VYO6tG08z8MCjOCcAL3NeWSG3037mWzJboYx6qAeE/TFOwkeUhwCpUbdxil8gT7sbW5tsMFkRQjFD0GRsfzpFzfQ23lZy/mgsvDg5AGc89+Y2G5yKrDo2kxGKG8OCtvjdvLThDDJzzG7AYz1p7U76LSYEVLUv5ULSRYTiVAgAx8cHbG9NQts+dFdB7PBwevPNL4crw8xSCmRtsaQS0e43HUVYmcW/lb3htWn+Are2h8NJcovHPLKwfruDgD6Vl0zcSh094dK0b7N5PM0e4QHeO4DD5r/APaz9R8hq6Rr4gbnzJP5wg9FyfrXBYYTlmzJ3PtNSUXzXkEnujGB3pNxNBp9qZHXgjG2EXmfgKwHSYvzWdiWjZVG+WIz9KqNcl1C58LajplnbR3So2Ehl3eIAg8UffA5Dp07Uux1uO/1K5tY4njMAXPGPeyM7UGar4hvNJ8a3kkL8USuqtGG2OFAyOx/6avgUlN0Zup4uCb9wRnLXDKJuKQrsAWO1KEVvDGXkjB9M0TeJp9N1aJtX0vhiuBtc27DhY9pMdfXHoe9BsnHIw58THYH9a3LaOc9MeSeSdiF/DiGwVevxp08SQFgPecJ8eppy1t90jUczg0u+aP7xHBAfw4Bue7Hn+1e80FJ1bF3Vui6snFhEmKOQdtjjOPzor0OVNF1mOS2vVkW0mcJJuBJHvsQeWRt6GhXVFLPZBhk+SPkQatNMiF9LNdSuQYskL3boflgVOXy7KxXqaRv8sjmFHtoixcA5YgFQRnOD19KbiypERjKFV9kEg5HxrItP+0zVIYCks6zjAIeeHiI+YIz86kad9p2qT3gS6sEubQH2uGPgcfDB2NBxfcVOlRo1zoltd38tzcSSsZFC8AIAA268+n5nvVi0UWELomI/dLAeztjbPLaoWlahpmqQhrC/aYkZMfmkOvoV5irFbeFTkRqT3bc/nQ2D0o+X1PGnqOvpSDz3+nevU2GR7w6Ul9iCOR3U1oJDTjgbPTp60d/ZhIPP1CIHYqjgdtyD+tBIxJGR1HSiv7NCV165T+q3P5MKln3jZfp9ZUahGNyaga3GWtoztwrIMjHocVYp7tM30YltXQkDqM+m9c1HV8gLretx6Nbyw2ylb+cg8WPdTGzfHbAoDKMzl1cuWOTxHcn49asPEl+l/r1zLEcwqfLiPdV2z89z86rVYZ35V0sUOMfucrPkeSf2Rzl8hSp4ugqTDCIxxN7x5ntXLGXUcL5HrS/KZU9ogAf3GqNkkhEtx5Knyz7ZGCewqPApHMFnc7AczT+YAuDCrnuSf8ANJa5ZMLCixt0Kjf6149+Rd5I8uoCNTlYwI/hgb/nV1o9wkNhdq2PwomYfT/NUVugWU5OSB+ZqWz+RpsoA/EufYHooO5/alkrVFISafIr/eReEbbYHrU5FWGMb4Ydc0zbpl+M+6vL415O5dyenSm7k1rZbafeGSRTI34sY9lwcHHx55ot8M/aHeWuqCy1SV57MNwl5d5EHcHmQOxztyNAFgeG8izyJwad1Lgj1AyISJFkB/IUjSuh7uNs/9k=", male:"data:image/jpeg;base64,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
" };

  function cleanName(value) {
    return String(value || '')
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 32);
  }

  function getName() {
    try { return cleanName(localStorage.getItem(storageKey) || ''); }
    catch (_) { return ''; }
  }

  function getTeacherChoice() {
    try {
      const value = localStorage.getItem(teacherChoiceKey) || '';
      return value === 'female' || value === 'male' ? value : '';
    } catch (_) { return ''; }
  }

  function getTeacherAvatar(choice = getTeacherChoice()) {
    return teacherAvatars[choice] || '';
  }

  function getAge() {
    try {
      const value = Number(localStorage.getItem(ageKey) || 0);
      return Number.isFinite(value) && value >= 8 && value <= 100 ? Math.floor(value) : 0;
    } catch (_) { return 0; }
  }

  function setAge(value) {
    const age = Math.floor(Number(value));
    if (!Number.isFinite(age) || age < 8 || age > 100) return 0;
    try { localStorage.setItem(ageKey, String(age)); } catch (_) {}
    document.body.dataset.ageMode = age > 20 ? 'adult-playful' : 'standard';
    window.dispatchEvent(new CustomEvent('fc-profile-age', { detail: { age } }));
    refreshSettings();
    return age;
  }

  function setTeacherChoice(value) {
    const choice = value === 'female' || value === 'male' ? value : '';
    if (!choice) return '';
    try { localStorage.setItem(teacherChoiceKey, choice); } catch (_) {}
    document.body.dataset.teacher = choice;
    window.dispatchEvent(new CustomEvent('fc-teacher-choice', { detail: { choice } }));
    refreshSettings();
    return choice;
  }

  function setName(value) {
    const name = cleanName(value);
    if (!name) return '';
    try { localStorage.setItem(storageKey, name); } catch (_) {}
    window.dispatchEvent(new CustomEvent('fc-profile-name', { detail: { name } }));
    refreshSettings();
    refreshPersonalizedCopy();
    return name;
  }

  function refreshSettings() {
    const label = document.querySelector('#personalNameLabel');
    const teacherLabel = document.querySelector('#teacherChoiceLabel');
    const ageLabel = document.querySelector('#personalAgeLabel');
    const name = getName();
    const teacher = getTeacherChoice();
    const age = getAge();
    if (label) label.textContent = name || 'Not set yet';
    if (teacherLabel) teacherLabel.textContent = teacher ? (teacher === 'female' ? 'Female teacher' : 'Male teacher') : 'Not chosen yet';
    if (ageLabel) ageLabel.textContent = age
      ? age + (age > 20 ? ' · light playful teacher tone' : ' · supportive teacher tone')
      : 'Not set yet · supportive tone';
    document.body.dataset.teacher = teacher || '';
    document.body.dataset.ageMode = age > 20 ? 'adult-playful' : 'standard';
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element && value && element.textContent !== value) element.textContent = value;
  }

  function refreshPersonalizedCopy() {
    const name = getName();

    setText('#homeFocusTitle', name ? `What do you want to work on, ${name}?` : 'What do you want to do?');
    setText('#commandBar > span:nth-child(2)', name ? `${name}, tell First Comet what you want to do…` : 'Tell First Comet what you want to do…');
    setText('#projectModal .modal h2', name ? `${name}, what are you building?` : 'What are you building?');
    setText('#view-settings .page-heading h1', name ? `${name}’s workspace settings` : 'Workspace settings');
    setText('#learn-localhost .compact-intro h2', name ? `${name}, run one page on your computer.` : 'Run one page on your computer.');
    setText('#learn-localhost #teachingTitle', name ? `Start locally, ${name}.` : 'Work locally first.');

    const firstMilestone = document.querySelector('#learn-localhost .milestone-current .milestone-purpose');
    if (firstMilestone) {
      const value = name
        ? `${name}, get one simple page working. Nothing else yet.`
        : 'Get one simple page working. Nothing else yet.';
      if (firstMilestone.textContent !== value) firstMilestone.textContent = value;
    }

    const emptyProject = [...document.querySelectorAll('.empty-project')].find((card) =>
      card.querySelector('span')?.textContent?.trim() === 'No projects yet'
    );
    const emptyProjectHint = emptyProject?.querySelector('small');
    if (emptyProjectHint) {
      const value = name ? `${name}, add your first project` : 'Add your first project';
      if (emptyProjectHint.textContent !== value) emptyProjectHint.textContent = value;
    }

    const courseTitle = document.querySelector('#courseTrackTitle');
    if (courseTitle) {
      const current = courseTitle.textContent.trim();
      const withoutName = current.replace(/^.+?,\s+(?=[A-Za-z#+]+, in small words\.$)/, '');
      if (/^[A-Za-z#+]+, in small words\.$/.test(withoutName)) {
        const value = name ? `${name}, ${withoutName}` : withoutName;
        if (courseTitle.textContent !== value) courseTitle.textContent = value;
      }
    }
  }

  function closePrompt() {
    const prompt = document.querySelector('#fcNamePrompt');
    if (!prompt) return;
    prompt.classList.remove('open');
    prompt.setAttribute('aria-hidden', 'true');
  }

  function closeTeacherPrompt() {
    const prompt = document.querySelector('#fcTeacherChoicePrompt');
    if (!prompt) return;
    prompt.classList.remove('open');
    prompt.setAttribute('aria-hidden', 'true');
  }

  function closeAgePrompt() {
    const prompt = document.querySelector('#fcAgePrompt');
    if (!prompt) return;
    prompt.classList.remove('open');
    prompt.setAttribute('aria-hidden', 'true');
  }

  function openAgePrompt(options = {}) {
    const force = Boolean(options.force);
    if (!force && getAge()) return;

    let prompt = document.querySelector('#fcAgePrompt');
    if (!prompt) {
      prompt = document.createElement('div');
      prompt.id = 'fcAgePrompt';
      prompt.className = 'fc-name-prompt fc-age-prompt';
      prompt.setAttribute('aria-hidden', 'true');
      prompt.innerHTML = `
        <div class="fc-name-card fc-age-card" role="dialog" aria-modal="true" aria-labelledby="fcAgeTitle">
          <span class="eyebrow">ONE LAST THING</span>
          <h2 id="fcAgeTitle">How old are you?</h2>
          <p>I use this only to keep your teacher's tone age-appropriate. At 20 or younger—or if you prefer not to say—the teacher stays fully supportive and neutral. At 21+, you can get occasional light, respectful teasing and compliments.</p>
          <label for="fcAgeInput">Your age</label>
          <input id="fcAgeInput" type="number" inputmode="numeric" min="8" max="100" step="1" placeholder="e.g. 22">
          <div class="fc-name-actions">
            <button type="button" class="secondary" data-age-skip>Prefer not to say</button>
            <button type="button" class="primary" data-age-save>Continue</button>
          </div>
          <small>Your age stays in this browser on this device. You can change it later in Settings.</small>
        </div>`;
      document.body.appendChild(prompt);

      const input = prompt.querySelector('#fcAgeInput');
      const save = () => {
        const age = setAge(input.value);
        if (!age) {
          input.focus();
          input.setAttribute('aria-invalid', 'true');
          return;
        }
        input.removeAttribute('aria-invalid');
        closeAgePrompt();
      };

      prompt.querySelector('[data-age-save]')?.addEventListener('click', save);
      input?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          save();
        }
      });
      prompt.querySelector('[data-age-skip]')?.addEventListener('click', () => {
        try { sessionStorage.setItem(ageSkipKey, '1'); } catch (_) {}
        closeAgePrompt();
      });
    }

    const input = prompt.querySelector('#fcAgeInput');
    if (input) input.value = getAge() || '';
    prompt.classList.add('open');
    prompt.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => input?.focus(), 40);
  }

  function openTeacherPrompt(options = {}) {
    const force = Boolean(options.force);
    if (!force && getTeacherChoice()) return;

    let prompt = document.querySelector('#fcTeacherChoicePrompt');
    if (!prompt) {
      prompt = document.createElement('div');
      prompt.id = 'fcTeacherChoicePrompt';
      prompt.className = 'fc-name-prompt fc-teacher-choice-prompt';
      prompt.setAttribute('aria-hidden', 'true');
      prompt.innerHTML = `
        <div class="fc-name-card fc-teacher-choice-card" role="dialog" aria-modal="true" aria-labelledby="fcTeacherChoiceTitle">
          <span class="eyebrow">FIRST COMET TEACHER</span>
          <h2 id="fcTeacherChoiceTitle">Who should guide you?</h2>
          <p>Choose the teacher character you feel most comfortable learning with. The teaching style and course content stay the same.</p>
          <div class="fc-teacher-choice-grid">
            <button type="button" data-teacher-choice="female">
              <img src="${teacherAvatars.female}" alt="">
              <span><b>Female teacher</b><small>Calm · supportive · clear</small></span>
            </button>
            <button type="button" data-teacher-choice="male">
              <img src="${teacherAvatars.male}" alt="">
              <span><b>Male teacher</b><small>Calm · supportive · clear</small></span>
            </button>
          </div>
          <div class="fc-name-actions">
            <button type="button" class="secondary" data-teacher-choice-skip>Not now</button>
            <button type="button" class="primary" data-teacher-choice-save disabled>Continue</button>
          </div>
          <small>You can switch teachers anytime in Settings.</small>
        </div>`;
      document.body.appendChild(prompt);

      let pending = getTeacherChoice();
      const saveButton = prompt.querySelector('[data-teacher-choice-save]');
      const select = (choice) => {
        pending = choice;
        prompt.querySelectorAll('[data-teacher-choice]').forEach((button) => {
          const selected = button.dataset.teacherChoice === choice;
          button.classList.toggle('selected', selected);
          button.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });
        saveButton.disabled = !pending;
      };

      prompt.querySelectorAll('[data-teacher-choice]').forEach((button) => {
        button.addEventListener('click', () => select(button.dataset.teacherChoice));
      });
      saveButton.addEventListener('click', () => {
        if (!setTeacherChoice(pending)) return;
        closeTeacherPrompt();
        window.setTimeout(() => {
          if (!getAge()) openAgePrompt();
        }, 180);
      });
      prompt.querySelector('[data-teacher-choice-skip]')?.addEventListener('click', () => {
        try { sessionStorage.setItem(teacherSkipKey, '1'); } catch (_) {}
        closeTeacherPrompt();
        window.setTimeout(() => {
          if (!getAge()) openAgePrompt();
        }, 180);
      });
      if (pending) select(pending);
    }

    const current = getTeacherChoice();
    prompt.querySelectorAll('[data-teacher-choice]').forEach((button) => {
      const selected = button.dataset.teacherChoice === current;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
    const saveButton = prompt.querySelector('[data-teacher-choice-save]');
    if (saveButton) saveButton.disabled = !current;
    prompt.classList.add('open');
    prompt.setAttribute('aria-hidden', 'false');
  }

  function openPrompt(options = {}) {
    const force = Boolean(options.force);
    if (!force && getName()) return;

    let prompt = document.querySelector('#fcNamePrompt');
    if (!prompt) {
      prompt = document.createElement('div');
      prompt.id = 'fcNamePrompt';
      prompt.className = 'fc-name-prompt';
      prompt.setAttribute('aria-hidden', 'true');
      prompt.innerHTML = `
        <div class="fc-name-card" role="dialog" aria-modal="true" aria-labelledby="fcNameTitle">
          <span class="eyebrow">FIRST COMET</span>
          <h2 id="fcNameTitle">What should I call you?</h2>
          <p>I will use your name only occasionally, when it makes guidance feel more personal. It stays on this device.</p>
          <label for="fcNameInput">Your name</label>
          <input id="fcNameInput" type="text" maxlength="32" autocomplete="nickname" placeholder="e.g. Nusaiba">
          <div class="fc-name-actions">
            <button type="button" class="secondary" data-name-skip>Not now</button>
            <button type="button" class="primary" data-name-save>Continue</button>
          </div>
          <small>You can change this later in Settings.</small>
        </div>`;

      document.body.appendChild(prompt);

      const input = prompt.querySelector('#fcNameInput');
      const save = () => {
        const name = setName(input.value);
        if (!name) {
          input.focus();
          input.setAttribute('aria-invalid', 'true');
          return;
        }
        input.removeAttribute('aria-invalid');
        closePrompt();
        window.setTimeout(() => {
          if (!getTeacherChoice()) openTeacherPrompt();
          else if (!getAge()) openAgePrompt();
        }, 180);
      };

      prompt.querySelector('[data-name-save]')?.addEventListener('click', save);
      input?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          save();
        }
      });
      prompt.querySelector('[data-name-skip]')?.addEventListener('click', () => {
        try { sessionStorage.setItem(sessionSkipKey, '1'); } catch (_) {}
        closePrompt();
        window.setTimeout(() => {
          if (!getTeacherChoice()) openTeacherPrompt();
          else if (!getAge()) openAgePrompt();
        }, 180);
      });
    }

    const input = prompt.querySelector('#fcNameInput');
    if (input) input.value = getName();
    prompt.classList.add('open');
    prompt.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => input?.focus(), 40);
  }

  function shouldAsk() {
    if (getName()) return false;
    try { if (sessionStorage.getItem(sessionSkipKey)) return false; } catch (_) {}
    return true;
  }

  function scheduleFirstAsk() {
    let introSeen = false;
    try { introSeen = Boolean(localStorage.getItem('fc-intro-seen')); } catch (_) {}
    const delay = introSeen ? 450 : 4200;
    window.setTimeout(() => {
      if (shouldAsk()) {
        openPrompt();
        return;
      }
      let skippedTeacher = false;
      let skippedAge = false;
      try { skippedTeacher = Boolean(sessionStorage.getItem(teacherSkipKey)); } catch (_) {}
      try { skippedAge = Boolean(sessionStorage.getItem(ageSkipKey)); } catch (_) {}
      if (!getTeacherChoice() && !skippedTeacher) {
        openTeacherPrompt();
        return;
      }
      if (!getAge() && !skippedAge) openAgePrompt();
    }, delay);
  }

  document.querySelector('#changeNameBtn')?.addEventListener('click', () => openPrompt({ force: true }));
  document.querySelector('#changeTeacherBtn')?.addEventListener('click', () => openTeacherPrompt({ force: true }));
  document.querySelector('#changeAgeBtn')?.addEventListener('click', () => openAgePrompt({ force: true }));
  window.addEventListener('fc-profile-name', () => {
    refreshSettings();
    refreshPersonalizedCopy();
  });
  refreshSettings();
  refreshPersonalizedCopy();

  const personalizationObserver = new MutationObserver(() => refreshPersonalizedCopy());
  personalizationObserver.observe(document.body, { childList: true, subtree: true });

  scheduleFirstAsk();

  window.FirstCometPersonalization = {
    getName,
    setName,
    askName: openPrompt,
    getTeacherChoice,
    setTeacherChoice,
    getTeacherAvatar,
    askTeacher: openTeacherPrompt,
    getAge,
    setAge,
    askAge: openAgePrompt,
    refresh: refreshPersonalizedCopy
  };
})();