(() => {
  'use strict';

  const STORAGE_KEY = 'fc-teacher-memory-v1';
  const MAX_REACTIONS = 80;

  const esc = (value = '') => String(value).replace(/[&<>"']/g, (ch) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[ch]);

  const parse = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key) || '') || fallback; }
    catch (_) { return fallback; }
  };

  const readMemory = () => {
    const raw = parse(STORAGE_KEY, {});
    return {
      understood: raw.understood && typeof raw.understood === 'object' ? raw.understood : {},
      struggles: raw.struggles && typeof raw.struggles === 'object' ? raw.struggles : {},
      reactions: Array.isArray(raw.reactions) ? raw.reactions.slice(0, MAX_REACTIONS) : [],
      lastContext: raw.lastContext || null,
      lastSeen: Number(raw.lastSeen || 0)
    };
  };

  const writeMemory = (memory) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        understood: memory.understood,
        struggles: memory.struggles,
        reactions: memory.reactions.slice(0, MAX_REACTIONS),
        lastContext: memory.lastContext,
        lastSeen: Date.now()
      }));
    } catch (_) {}
  };

  const name = () => window.FirstCometPersonalization?.getName?.() || '';

  const topicAliases = {
    'Programming Foundations':'programming foundations',
    'Variables & Data Types':'variables and data types',
    'Input & Output':'input and output',
    'Conditions':'conditions',
    'Loops':'loops',
    'Strings':'strings',
    'Arrays':'arrays',
    'Sorting':'sorting',
    'Methods':'methods',
    'Recursion':'recursion',
    'File I/O':'file I/O',
    'Debugging & Complete Programs':'debugging',
    'Write This Down':'programming habits'
  };

  const cseSupport = {
    'Programming Foundations': {
      different: 'Think of programming like giving directions to someone who follows every instruction literally. The hard part is making the steps precise enough that there is nothing left to guess.',
      example: 'Goal: choose the larger number.\n1. Read A and B\n2. Ask whether A > B\n3. Choose A if true; otherwise choose B\n4. Show the result',
      lost: 'Ignore Java for a moment. Write the solution as four plain-English steps first. If the steps are unclear, the code will be unclear too.',
      challenge: 'Without looking at the notes, explain the difference between an algorithm and Java syntax in one sentence.'
    },
    'Variables & Data Types': {
      different: 'Picture labelled containers. The variable name is the label; the data type says what kind of thing the container is allowed to hold.',
      example: 'int age = 20;\ndouble cgpa = 3.75;\nString name = "Mina";',
      lost: 'Start with meaning, not syntax: whole number → int, decimal → double, text → String, true/false → boolean.',
      challenge: 'Choose types for: product price, username, number of courses, and whether a user is logged in.'
    },
    'Input & Output': {
      different: 'Treat the program like a conversation. Input is what the program listens to; output is what it says back.',
      example: 'Scanner sc = new Scanner(System.in);\nint age = sc.nextInt();\nSystem.out.println("Age: " + age);',
      lost: 'Trace only the data: keyboard → Scanner → variable → program logic → printed result.',
      challenge: 'Write the three lines needed to read one integer and print it with a useful label.'
    },
    'Conditions': {
      different: 'A condition is a fork in the road. The program asks one true/false question and follows only the matching branch.',
      example: 'if (marks >= 50) {\n  System.out.println("Pass");\n} else {\n  System.out.println("Try again");\n}',
      lost: 'Say the question aloud first. Example: “Are marks at least 50?” Then write that exact question inside if (...).',
      challenge: 'Write a condition that prints “Adult” only when age is at least 18.'
    },
    'Loops': {
      different: 'A loop is a controlled repeat button. It needs a starting state, a reason to keep going, and a change that eventually makes it stop.',
      example: 'for (int i = 1; i <= 3; i++) {\n  System.out.println(i);\n}',
      lost: 'Trace three columns on paper: current i, is the condition true, what changes after the body. Do not stare at the whole loop at once.',
      challenge: 'Predict exactly what prints for: for(int i=0; i<4; i++) System.out.println(i);'
    },
    'Strings': {
      different: 'Think of a String as a row of characters with numbered seats. The first seat is 0, not 1.',
      example: 'String word = "Comet";\nword.charAt(0);      // C\nword.substring(1,4); // ome',
      lost: 'Write the word and its indexes underneath: C o m e t / 0 1 2 3 4. Most String mistakes become obvious after that.',
      challenge: 'For "BRACU", what are the first character, last valid index, and length?'
    },
    'Arrays': {
      different: 'An array is like numbered lockers under one name. The array name identifies the row; the index chooses one locker.',
      example: 'int[] scores = {80, 92, 75};\nSystem.out.println(scores[0]); // 80\nscores[2] = 79;',
      lost: 'Draw the boxes first. For length 4, label them 0, 1, 2, 3. Then trace which index the code touches.',
      challenge: 'What is the last valid index of an array whose length is 12, and why?'
    },
    'Sorting': {
      different: 'Imagine students standing in a line by height. Bubble Sort looks at two neighbours at a time and swaps them when they are in the wrong order.',
      example: '[6, 3, 8, 2]\n6 & 3 → swap → [3, 6, 8, 2]\n6 & 8 → keep\n8 & 2 → swap → [3, 6, 2, 8]',
      lost: 'Forget the nested loops first. Trace one pass only: compare neighbours from left to right. Once that makes sense, the outer loop simply repeats passes.',
      challenge: 'Do one complete Bubble Sort pass on [5, 1, 4, 2] without looking at the code.'
    },
    'Methods': {
      different: 'A method is a named helper with one job. You give it inputs, it does that job, and it may hand a result back.',
      example: 'static int square(int n) {\n  return n * n;\n}\nint result = square(5);',
      lost: 'Identify three things separately: method name, inputs (parameters), and returned result. Ignore the rest until those are clear.',
      challenge: 'Design a method name, parameter, and return type for “find the larger of two integers”.'
    },
    'Recursion': {
      different: 'Recursion is solving a problem by asking the same helper to solve a smaller copy. The chain must eventually reach a case that needs no further call.',
      example: 'factorial(3)\n→ 3 × factorial(2)\n→ 3 × 2 × factorial(1)\n→ 6',
      lost: 'Find the base case first. Then ask: does every recursive call move closer to that base case? If not, stop there.',
      challenge: 'For factorial, explain why factorial(n - 1) eventually stops instead of calling forever.'
    },
    'File I/O': {
      different: 'Variables are notes on a whiteboard—they disappear when the program ends. A file is a notebook you can close and reopen later.',
      example: 'PrintWriter out = new PrintWriter("result.txt");\nout.println("Score: 95");\nout.close();',
      lost: 'Separate the task into three moments: open the file, read/write the data, close the file.',
      challenge: 'Explain why closing a writer matters even after println has already run.'
    },
    'Debugging & Complete Programs': {
      different: 'Debugging is detective work, not random editing. Find the first place where what happened differs from what you expected.',
      example: 'Expected: total = 15\nActual: total = 10\n→ print values before and inside the suspicious loop\n→ change one thing\n→ test again',
      lost: 'Reproduce the bug with one small input. Then inspect the variables nearest the first wrong result.',
      challenge: 'Name three test values you would use for a condition age >= 18 and explain why.'
    }
  };

  function latestAchievement() {
    const saved = parse('fc-achievements-v1', {});
    const events = Array.isArray(saved.events) ? saved.events : [];
    return events.find((event) => ['skill','step','title','project'].includes(event.kind)) || null;
  }

  function currentView() {
    return document.querySelector('.view.active')?.id?.replace(/^view-/, '') || 'home';
  }

  function activeLearnLabel() {
    const section = [...document.querySelectorAll('#view-learn .learn-section')].find((el) => !el.hidden);
    if (!section) return 'Learn';
    const heading = section.querySelector('h1,h2');
    return heading?.textContent?.trim() || section.id.replace(/^learn-/, '');
  }

  function context() {
    const view = currentView();
    let label = 'First Comet';
    let detail = '';
    let key = view;

    if (view === 'cse110notes') {
      const topic = document.querySelector('#cse110HeaderTopic')?.textContent?.trim() || 'CSE110';
      const step = document.querySelector('.cse110-understand h2')?.textContent?.trim() || '';
      label = topic;
      detail = step;
      key = 'cse110:' + topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    } else if (view === 'learn') {
      label = activeLearnLabel();
      detail = document.querySelector('#courseTrackTitle')?.textContent?.trim() || '';
      key = 'learn:' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    } else if (view === 'vscode') {
      label = 'VS Code';
      detail = 'Working in the real editor';
    } else if (view === 'guide') {
      label = 'Build path';
      detail = 'Turning a project into something real';
    } else if (view === 'bracu') {
      label = 'BRACU Courses';
      detail = document.querySelector('.bracu-catalog-card details[open] .bracu-catalog-code')?.textContent?.trim() || 'Choosing what to study';
    } else if (view === 'careers') {
      label = 'Career Explorer';
      detail = 'Finding a direction without locking yourself in';
    } else if (view === 'cv') {
      label = 'CV Studio';
      detail = 'Building an ATS-readable CV';
    } else if (view === 'project') {
      label = document.querySelector('#projectName')?.textContent?.trim() || 'Your project';
      detail = 'Building in your workspace';
    } else if (view === 'settings') {
      label = 'Settings';
      detail = 'Making First Comet fit you';
    } else {
      label = 'Home';
      detail = 'Choosing the next useful step';
    }

    return { view, label, detail, key };
  }

  function previousContextLine(memory, ctx) {
    const previous = memory.lastContext;
    if (!previous || previous.key === ctx.key) return '';
    const age = Date.now() - Number(memory.lastSeen || 0);
    if (age > 7 * 86400000) return '';
    return 'Last time, you were working on ' + previous.label + '. ';
  }

  function prerequisiteCallback(memory, ctx) {
    if (ctx.view !== 'cse110notes') return '';
    const order = ['Programming Foundations','Variables & Data Types','Input & Output','Conditions','Loops','Strings','Arrays','Sorting','Methods','Recursion','File I/O','Debugging & Complete Programs'];
    const index = order.indexOf(ctx.label);
    if (index <= 0) return '';
    const previous = order[index - 1];
    const prevKey = 'cse110:' + previous.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (memory.struggles[prevKey] >= 2) return 'You found ' + previous + ' difficult earlier, so I’ll connect this back to it when useful. ';
    if (memory.understood[prevKey]) return 'You already marked ' + previous + ' as understood, so we can build on that. ';
    return '';
  }

  function messageFor(memory, ctx) {
    const learner = name();
    const hello = learner && !memory.lastSeen ? learner + ', ' : '';
    const previous = previousContextLine(memory, ctx);
    const callback = prerequisiteCallback(memory, ctx);
    const latest = latestAchievement();

    if (ctx.view === 'cse110notes') {
      const support = cseSupport[ctx.label];
      const base = support
        ? 'This step is about ' + (topicAliases[ctx.label] || ctx.label.toLowerCase()) + '. Read the idea, trace the worked example, then try “Your turn” without peeking.'
        : 'Use this note actively: explain the idea in your own words before revealing the answer.';
      return hello + previous + callback + base;
    }

    if (ctx.view === 'vscode') return hello + previous + 'Work in the real editor; use me for the next small action. If something on screen is unfamiliar, ask where it is before learning extra tools.';
    if (ctx.view === 'guide') return hello + previous + 'Keep the project small enough to finish. I’ll help you decide what must happen now and what can wait.';
    if (ctx.view === 'learn') return hello + previous + 'Don’t try to memorize the whole page. Pick one concept, try it, then tell me whether it made sense.';
    if (ctx.view === 'bracu') return hello + previous + 'Use the official outline as the boundary. Pick one topic and study it deeply instead of collecting more resources.';
    if (ctx.view === 'cv') return hello + previous + 'I’ll prioritize evidence, clarity and ATS readability over decorative CV language.';
    if (ctx.view === 'careers') return hello + previous + 'Treat a career choice as a direction to test, not a permanent identity. Compare the work itself, not only job titles.';
    if (ctx.view === 'project') return hello + previous + 'You’re in a real project now. Make one useful thing work before polishing everything around it.';
    if (ctx.view === 'settings') return hello + 'These choices change how much guidance I give you. Your teacher memory stays on this device.';
    if (latest) return hello + 'Your latest recorded progress was “' + latest.title + '”. Choose the next small action that builds on it.';
    return hello + 'Tell me what you are trying to do. I’ll keep the next step small and concrete.';
  }

  function alternate(ctx) {
    if (ctx.view === 'cse110notes' && cseSupport[ctx.label]) return cseSupport[ctx.label].different;
    if (ctx.view === 'vscode') return 'Think of VS Code as your workbench. Explorer is the shelf of files, the editor is the desk, Problems shows what needs attention, and Source Control records versions.';
    if (ctx.view === 'guide') return 'Think of a project like building one usable room before designing the entire house: first make one complete path work from start to finish.';
    if (ctx.view === 'cv') return 'Imagine a recruiter scanning for proof in seconds. Every line should answer: what can you do, where did you do it, and what evidence supports it?';
    return 'Let’s reduce it to one question: what is the smallest thing you should understand or make work before moving forward?';
  }

  function exampleFor(ctx) {
    if (ctx.view === 'cse110notes' && cseSupport[ctx.label]) return cseSupport[ctx.label].example;
    if (ctx.view === 'vscode') return 'Example next action:\n1. Open your project folder\n2. Open index.html\n3. Change one heading\n4. Ctrl + S\n5. Refresh the browser';
    if (ctx.view === 'guide') return 'Example tiny project path:\nNeed → one page → one interaction → save data only if needed → test → publish';
    if (ctx.view === 'cv') return 'Weak: “Worked on websites.”\nBetter: “Built and deployed 3 responsive web projects using HTML, CSS and JavaScript.”';
    return 'Pick one real example from the page, predict what should happen, then check the result.';
  }

  function lostFor(ctx) {
    if (ctx.view === 'cse110notes' && cseSupport[ctx.label]) return cseSupport[ctx.label].lost;
    if (ctx.view === 'vscode') return 'Ignore extensions, Git and the terminal for now. Find Explorer, open one file, make one visible change, and save it.';
    if (ctx.view === 'learn') return 'Go back one concept. If you cannot explain the prerequisite in one sentence, review that before adding anything new.';
    if (ctx.view === 'guide') return 'Describe the project in one sentence: who needs it, what problem do they have, and what is the smallest useful result?';
    if (ctx.view === 'cv') return 'Start with facts only: education, skills you can actually use, projects you actually built, and measurable outcomes you can defend.';
    return 'Tell yourself what result you expect before clicking or coding anything. That usually reveals which part is unclear.';
  }

  function challengeFor(ctx) {
    if (ctx.view === 'cse110notes' && cseSupport[ctx.label]) return cseSupport[ctx.label].challenge;
    if (ctx.view === 'vscode') return 'Close the instructions and create a new HTML file, save it, and find it again using Explorer without help.';
    if (ctx.view === 'learn') return 'Explain the concept without using the definition on screen, then make one tiny variation to the example.';
    if (ctx.view === 'guide') return 'Name one feature you can remove while still solving the core problem. If nothing can be removed, the scope may still be too large.';
    if (ctx.view === 'cv') return 'Rewrite one bullet so it contains an action, the technology or method, and an observable result.';
    return 'Try to complete the next step without opening extra guidance. Come back only when you can name exactly what blocked you.';
  }

  function answerQuestion(question, ctx) {
    const q = String(question || '').trim().toLowerCase();
    if (!q) return '';

    const supportTopic = Object.keys(cseSupport).find((topic) => q.includes(topic.toLowerCase()));
    const support = supportTopic ? cseSupport[supportTopic] : (ctx.view === 'cse110notes' ? cseSupport[ctx.label] : null);

    if (/\b(why|explain|mean|understand|different)\b/.test(q)) return support?.different || alternate(ctx);
    if (/\b(example|show|trace|demo)\b/.test(q)) return support?.example || exampleFor(ctx);
    if (/\b(lost|stuck|confused|don't get|dont get|hard)\b/.test(q)) return support?.lost || lostFor(ctx);
    if (/\b(challenge|harder|too easy|easy)\b/.test(q)) return support?.challenge || challengeFor(ctx);

    if (/\b(next|what should i do|what do i do|continue)\b/.test(q)) {
      if (ctx.view === 'cse110notes') return 'Try “Your turn” without revealing the answer. If you can explain it correctly, use Next step. If not, choose “Explain differently” or “I’m lost”.';
      if (ctx.view === 'vscode') return 'Make one visible change in the file you are working on, save it with Ctrl + S, then check the result before learning another tool.';
      if (ctx.view === 'bracu') return 'Open one course, choose one topic, and finish that topic before opening another course.';
      if (ctx.view === 'cv') return 'Finish one evidence-based section at a time: basics → skills → education → projects/experience → ATS check.';
      if (ctx.view === 'guide') return 'Find the first unfinished milestone and complete its success condition before moving forward.';
      return 'Choose the smallest unfinished action on this page and complete it before adding anything new.';
    }

    if (/\b(progress|done|finished|learned|know|remember about me)\b/.test(q)) {
      const data = summary(memory);
      const latest = latestAchievement();
      const pieces = [];
      if (data.understood.length) pieces.push('You marked these as clear: ' + data.understood.join(', ') + '.');
      if (data.struggles.length) pieces.push('These have needed another pass: ' + data.struggles.join(', ') + '.');
      if (latest) pieces.push('Your latest recorded win is “' + latest.title + '”.');
      return pieces.join(' ') || 'I do not have enough learning history yet. Use the feedback buttons or complete a real milestone and I’ll start building that picture.';
    }

    if (ctx.view === 'vscode') {
      if (/\b(files?|explorer)\b/.test(q)) return 'Open Explorer in the left activity bar. Your project folder and files appear there.';
      if (/\b(new file|create file)\b/.test(q)) return 'In Explorer, use New File beside the folder name, then give the file its full name such as index.html.';
      if (/\b(save|ctrl s)\b/.test(q)) return 'Use Ctrl + S. Saving writes the current editor changes to that file.';
      if (/\b(error|problem)\b/.test(q)) return 'Open Problems to see editor-detected issues. For browser behavior, also check the browser console when needed.';
      if (/\b(git|source control)\b/.test(q)) return 'Source Control is the branching icon in the activity bar. You do not need it before your first local page works.';
      if (/\b(search|find code)\b/.test(q)) return 'Use Search in the activity bar to search across project files. Ctrl + F searches only the current file.';
    }

    if (support) {
      return support.different + ' If you want, ask “show me an example” or “what should I do next?”.';
    }

    return 'I do not have enough reliable context to answer that specific question yet, and I do not want to guess. Ask me to explain the current idea, show an example, help when you’re stuck, give a harder challenge, or tell you what to do next.';
  }

  function summary(memory) {
    const understood = Object.entries(memory.understood)
      .sort((a,b) => Number(b[1]) - Number(a[1]))
      .slice(0,3)
      .map(([key]) => key.replace(/^cse110:/,'').replace(/^learn:/,'').replace(/-/g,' '));
    const struggles = Object.entries(memory.struggles)
      .filter(([,count]) => Number(count) > 0)
      .sort((a,b) => Number(b[1]) - Number(a[1]))
      .slice(0,2)
      .map(([key]) => key.replace(/^cse110:/,'').replace(/^learn:/,'').replace(/-/g,' '));
    return { understood, struggles };
  }

  let memory = readMemory();
  let lastExternalContext = null;

  const root = document.createElement('div');
  root.id = 'fcTeacher';
  root.className = 'fc-teacher';
  root.innerHTML = `
    <button type="button" class="fc-teacher-launch" data-teacher-open aria-expanded="false">
      <span>☄</span><b>Teacher</b><i></i>
    </button>
    <aside class="fc-teacher-panel" aria-hidden="true">
      <header>
        <div><span class="eyebrow">FIRST COMET TEACHER</span><b>● BESIDE YOU</b></div>
        <button type="button" data-teacher-close aria-label="Close First Comet Teacher">×</button>
      </header>
      <div class="fc-teacher-context"><span>RIGHT NOW</span><b data-teacher-context></b><small data-teacher-detail></small></div>
      <div class="fc-teacher-message" data-teacher-message></div>
      <form class="fc-teacher-ask" data-teacher-ask>
        <input type="text" maxlength="180" placeholder="Ask about what you’re looking at…" aria-label="Ask First Comet Teacher">
        <button type="submit">Ask</button>
      </form>
      <div class="fc-teacher-actions" aria-label="Tell First Comet what you need">
        <button type="button" data-teacher-action="understood">✓ I get it</button>
        <button type="button" data-teacher-action="different">Explain differently</button>
        <button type="button" data-teacher-action="example">Show an example</button>
        <button type="button" data-teacher-action="lost">I’m lost</button>
        <button type="button" data-teacher-action="easy">Too easy</button>
      </div>
      <div class="fc-teacher-response" data-teacher-response hidden></div>
      <details class="fc-teacher-memory">
        <summary>What I’m using to guide you</summary>
        <div data-teacher-memory></div>
      </details>
      <p class="fc-teacher-local">Learning memory stays in this browser on this device.</p>
    </aside>`;
  document.body.appendChild(root);

  const panel = root.querySelector('.fc-teacher-panel');
  const launch = root.querySelector('[data-teacher-open]');

  function setOpen(open) {
    root.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    launch.setAttribute('aria-expanded', String(open));
    if (open) refresh();
  }

  function response(text, tone = '') {
    const box = root.querySelector('[data-teacher-response]');
    box.hidden = !text;
    box.className = 'fc-teacher-response' + (tone ? ' ' + tone : '');
    box.innerHTML = text ? '<p>' + esc(text).replace(/\n/g,'<br>') + '</p>' : '';
  }

  function rememberReaction(kind, ctx) {
    memory.reactions.unshift({ kind, key:ctx.key, label:ctx.label, at:Date.now() });
    memory.reactions = memory.reactions.slice(0, MAX_REACTIONS);
  }

  function handle(kind) {
    const ctx = lastExternalContext || context();
    rememberReaction(kind, ctx);

    if (kind === 'understood') {
      memory.understood[ctx.key] = Date.now();
      if (memory.struggles[ctx.key]) memory.struggles[ctx.key] = Math.max(0, memory.struggles[ctx.key] - 1);
      writeMemory(memory);
      response('Good. Before moving on, explain the idea once without looking at the page. If you can do that clearly, continue.', 'positive');
    } else if (kind === 'different') {
      response(alternate(ctx));
    } else if (kind === 'example') {
      response(exampleFor(ctx), 'example');
    } else if (kind === 'lost') {
      memory.struggles[ctx.key] = Number(memory.struggles[ctx.key] || 0) + 1;
      writeMemory(memory);
      response(lostFor(ctx), 'support');
    } else if (kind === 'easy') {
      response(challengeFor(ctx), 'challenge');
    }

    refreshMemory();
  }

  function refreshMemory() {
    const box = root.querySelector('[data-teacher-memory]');
    const data = summary(memory);
    const latest = latestAchievement();
    const rows = [];
    if (data.understood.length) rows.push('<div><span>YOU MARKED AS CLEAR</span><p>' + data.understood.map(esc).join(' · ') + '</p></div>');
    if (data.struggles.length) rows.push('<div><span>NEEDS ANOTHER PASS</span><p>' + data.struggles.map(esc).join(' · ') + '</p></div>');
    if (latest) rows.push('<div><span>LATEST RECORDED WIN</span><p>' + esc(latest.title) + '</p></div>');
    if (!rows.length) rows.push('<p>I’ll start learning what helps you after you use the buttons above or complete real work.</p>');
    box.innerHTML = rows.join('');
  }

  function refresh(external) {
    if (external?.key) lastExternalContext = external;
    const ctx = lastExternalContext && currentView() === lastExternalContext.view ? lastExternalContext : context();
    if (ctx.view !== lastExternalContext?.view) lastExternalContext = null;

    root.querySelector('[data-teacher-context]').textContent = ctx.label;
    root.querySelector('[data-teacher-detail]').textContent = ctx.detail || '';
    root.querySelector('[data-teacher-message]').textContent = messageFor(memory, ctx);
    response('');
    refreshMemory();

    memory.lastContext = { key:ctx.key, label:ctx.label, view:ctx.view };
    memory.lastSeen = Date.now();
    writeMemory(memory);
  }

  root.querySelector('[data-teacher-ask]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    const question = input?.value?.trim() || '';
    if (!question) return;
    const ctx = lastExternalContext || context();
    rememberReaction('ask', ctx);
    response(answerQuestion(question, ctx), 'answer');
    if (input) input.value = '';
    refreshMemory();
  });

  root.addEventListener('click', (event) => {
    if (event.target.closest('[data-teacher-open]')) { setOpen(!root.classList.contains('open')); return; }
    if (event.target.closest('[data-teacher-close]')) { setOpen(false); return; }
    const action = event.target.closest('[data-teacher-action]');
    if (action) handle(action.dataset.teacherAction);
  });

  window.addEventListener('fc:view-change', () => {
    lastExternalContext = null;
    if (root.classList.contains('open')) refresh();
  });
  window.addEventListener('fc:teacher-context', (event) => {
    lastExternalContext = event.detail || null;
    if (root.classList.contains('open')) refresh(lastExternalContext);
  });
  window.addEventListener('fc:progress-changed', () => {
    if (root.classList.contains('open')) refreshMemory();
  });
  window.addEventListener('fc-profile-name', () => {
    if (root.classList.contains('open')) refresh();
  });
  window.addEventListener('storage', () => {
    memory = readMemory();
    if (root.classList.contains('open')) refresh();
  });
  window.addEventListener('hashchange', () => {
    window.setTimeout(() => { if (root.classList.contains('open')) refresh(); }, 30);
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-view],[data-learn-section],[data-course-tab],[data-course-language],[data-bracu-topic],[data-bracu-level-jump],[data-cse110-topic]')) return;
    window.setTimeout(() => {
      if (currentView() !== 'cse110notes') lastExternalContext = null;
      if (root.classList.contains('open')) refresh();
    }, 60);
  });

  const saveCurrentContext = () => {
    const ctx = lastExternalContext || context();
    memory.lastContext = { key:ctx.key, label:ctx.label, view:ctx.view };
    memory.lastSeen = Date.now();
    writeMemory(memory);
  };
  window.addEventListener('pagehide', saveCurrentContext);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && root.classList.contains('open')) setOpen(false);
  });

  window.FirstCometTeacher = {
    refresh,
    open: () => setOpen(true),
    context: (detail) => {
      lastExternalContext = detail || null;
      if (root.classList.contains('open')) refresh(detail);
    },
    memory: () => ({ ...memory })
  };

  refresh();
})();