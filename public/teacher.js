(() => {
  'use strict';

  const STORAGE_KEY = 'fc-teacher-memory-v1';
  const MAX_REACTIONS = 80;
  const FEMALE_TEACHER_FALLBACK = "data:image/jpeg;base64,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";
  const MALE_TEACHER_FALLBACK = "data:image/jpeg;base64,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";

  let FEMALE_TEACHER_BLOB_URL = '';
  let MALE_TEACHER_BLOB_URL = '';

  function dataImageToBlobUrl(dataUri) {
    try {
      const comma = dataUri.indexOf(',');
      if (comma < 0) return '';
      const meta = dataUri.slice(0, comma);
      const b64 = dataUri.slice(comma + 1).replace(/\s+/g, '');
      const binary = atob(b64);
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
      const typeMatch = meta.match(/^data:([^;]+)/);
      const blob = new Blob([bytes], { type: typeMatch?.[1] || 'image/jpeg' });
      return URL.createObjectURL(blob);
    } catch (_) {
      return '';
    }
  }

  function teacherPortraitUrl(choice) {
    if (choice === 'female') {
      if (!FEMALE_TEACHER_BLOB_URL) FEMALE_TEACHER_BLOB_URL = dataImageToBlobUrl(FEMALE_TEACHER_FALLBACK);
      return FEMALE_TEACHER_BLOB_URL;
    }
    if (choice === 'male') {
      if (!MALE_TEACHER_BLOB_URL) MALE_TEACHER_BLOB_URL = dataImageToBlobUrl(MALE_TEACHER_FALLBACK);
      return MALE_TEACHER_BLOB_URL;
    }
    return '';
  }

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
  const learnerAge = () => Number(window.FirstCometPersonalization?.getAge?.() || 0);
  const playfulAdult = () => learnerAge() > 20;

  function playfulAside(ctx) {
    if (!playfulAdult()) return '';
    if (ctx.view === 'cse110notes') return ' And yes, I’ll notice if you peek at the answer before trying.';
    if (ctx.view === 'vscode') return ' Try not to make fixing it on the first try look too effortless.';
    if (ctx.view === 'project') return ' You’ve got good instincts—use them before adding another feature.';
    if (ctx.view === 'home') return ' You’re doing better than you think, by the way.';
    return '';
  }

  function characterLine(ctx) {
    if (playfulAdult()) {
      if (ctx.view === 'cse110notes') return 'Alright, smart one. Show me your reasoning first.';
      if (ctx.view === 'vscode') return 'Go on—make one clean change. Impress me a little.';
      if (ctx.view === 'project') return 'Good. Show me what you built before you start polishing it.';
      if (ctx.view === 'cv') return 'Let’s make this CV as sharp as you think it is.';
      return 'There you are. What are we solving today?';
    }
    if (ctx.view === 'cse110notes') return 'One idea at a time. Try it before you peek.';
    if (ctx.view === 'vscode') return 'Make one small change, save it, then check.';
    return 'One step at a time. I’m right here.';
  }

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
      return hello + previous + callback + base + playfulAside(ctx);
    }

    if (ctx.view === 'vscode') return hello + previous + 'Work in the real editor; use me for the next small action. If something on screen is unfamiliar, ask where it is before learning extra tools.' + playfulAside(ctx);
    if (ctx.view === 'guide') return hello + previous + 'Keep the project small enough to finish. I’ll help you decide what must happen now and what can wait.';
    if (ctx.view === 'learn') return hello + previous + 'Don’t try to memorize the whole page. Pick one concept, try it, then tell me whether it made sense.';
    if (ctx.view === 'bracu') return hello + previous + 'Use the official outline as the boundary. Pick one topic and study it deeply instead of collecting more resources.';
    if (ctx.view === 'cv') return hello + previous + 'I’ll prioritize evidence, clarity and ATS readability over decorative CV language.';
    if (ctx.view === 'careers') return hello + previous + 'Treat a career choice as a direction to test, not a permanent identity. Compare the work itself, not only job titles.';
    if (ctx.view === 'project') return hello + previous + 'You’re in a real project now. Make one useful thing work before polishing everything around it.' + playfulAside(ctx);
    if (ctx.view === 'settings') return hello + 'These choices change how much guidance I give you. Your teacher memory stays on this device.';
    if (latest) return hello + 'Your latest recorded progress was “' + latest.title + '”. Choose the next small action that builds on it.';
    return hello + 'Tell me what you are trying to do. I’ll keep the next step small and concrete.' + playfulAside(ctx);
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
      <img class="fc-teacher-launch-avatar" data-teacher-avatar alt="" hidden><span data-teacher-comet>☄</span><b>Teacher</b><i></i>
    </button>
    <aside class="fc-teacher-panel" aria-hidden="true">
      <header>
        <div class="fc-teacher-identity"><img class="fc-teacher-head-avatar" data-teacher-avatar alt="" hidden><div><span class="eyebrow">FIRST COMET TEACHER</span><b data-teacher-persona>● BESIDE YOU</b></div></div>
        <button type="button" data-teacher-close aria-label="Close First Comet Teacher">×</button>
      </header>
      <div class="fc-teacher-character-stage" data-teacher-character-stage hidden>
        <img data-teacher-character-image alt="">
        <div class="fc-teacher-character-copy"><span data-teacher-character-tag>YOUR TEACHER</span><b data-teacher-character-line>One step at a time.</b></div>
      </div>
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
    memory.lastContext = { key:ctx.key, label:ctx.label, view:ctx.view };
    memory.lastSeen = Date.now();
    writeMemory(memory);
  }

  function handle(kind) {
    const ctx = lastExternalContext || context();
    rememberReaction(kind, ctx);

    if (kind === 'understood') {
      memory.understood[ctx.key] = Date.now();
      if (memory.struggles[ctx.key]) memory.struggles[ctx.key] = Math.max(0, memory.struggles[ctx.key] - 1);
      writeMemory(memory);
      response(playfulAdult()
        ? 'Okay, that was smooth. I’m impressed. Now explain it once without looking at the page—then you can move on.'
        : 'Good. Before moving on, explain the idea once without looking at the page. If you can do that clearly, continue.', 'positive');
    } else if (kind === 'different') {
      response((playfulAdult() ? 'Alright, smart one—different angle. ' : '') + alternate(ctx));
    } else if (kind === 'example') {
      response((playfulAdult() ? 'Fine, I’ll give you one. Pay attention. ' : '') + exampleFor(ctx), 'example');
    } else if (kind === 'lost') {
      memory.struggles[ctx.key] = Number(memory.struggles[ctx.key] || 0) + 1;
      writeMemory(memory);
      response(lostFor(ctx), 'support');
    } else if (kind === 'easy') {
      response((playfulAdult() ? 'Confident today, huh? Fine—show me. ' : '') + challengeFor(ctx), 'challenge');
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

  function applyTeacherChoice() {
    let choice = window.FirstCometPersonalization?.getTeacherChoice?.() || '';
    if (!choice) {
      try {
        const saved = localStorage.getItem('fc-teacher-choice-v1') || '';
        if (saved === 'female' || saved === 'male') choice = saved;
      } catch (_) {}
    }

    const avatar = choice === 'female'
      ? '/assets/teacher-female-face.jpg?v=20261013f'
      : choice === 'male'
        ? '/assets/teacher-male-face.jpg?v=20261013f'
        : '';

    document.body.dataset.teacher = choice;

    root.querySelectorAll('[data-teacher-avatar]').forEach((img) => {
      img.hidden = !choice;
      if (choice) {
        img.alt = choice === 'female' ? 'First Comet female teacher' : 'First Comet male teacher';
        img.src = avatar;
      }
    });

    const comet = root.querySelector('[data-teacher-comet]');
    if (comet) comet.hidden = Boolean(choice);

    const persona = root.querySelector('[data-teacher-persona]');
    if (persona) {
      const role = choice ? (choice === 'female' ? 'FEMALE TEACHER' : 'MALE TEACHER') : 'BESIDE YOU';
      persona.textContent = '● ' + role + (playfulAdult() ? ' · PLAYFUL' : '');
    }

    const stage = root.querySelector('[data-teacher-character-stage]');
    const characterImage = root.querySelector('[data-teacher-character-image]');
    if (stage) stage.hidden = !choice;
    if (characterImage) {
      characterImage.hidden = !choice;
      if (choice) {
        characterImage.alt = choice === 'female' ? 'First Comet female teacher character' : 'First Comet male teacher character';
        characterImage.src = avatar;
      }
    }

    document.body.dataset.ageMode = playfulAdult() ? 'adult-playful' : 'standard';
  }

  function refresh(external) {
    if (external?.key) lastExternalContext = external;
    const ctx = lastExternalContext && currentView() === lastExternalContext.view ? lastExternalContext : context();
    if (ctx.view !== lastExternalContext?.view) lastExternalContext = null;

    root.querySelector('[data-teacher-context]').textContent = ctx.label;
    root.querySelector('[data-teacher-detail]').textContent = ctx.detail || '';
    root.querySelector('[data-teacher-message]').textContent = messageFor(memory, ctx);
    const characterCopy = root.querySelector('[data-teacher-character-line]');
    if (characterCopy) characterCopy.textContent = characterLine(ctx);
    response('');
    refreshMemory();
  }

  root.querySelector('[data-teacher-ask]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    const question = input?.value?.trim() || '';
    if (!question) return;
    const ctx = lastExternalContext || context();
    rememberReaction('ask', ctx);
    const baseAnswer = answerQuestion(question, ctx);
    const isStruggleQuestion = /\b(lost|stuck|confused|don't get|dont get|hard|help)\b/i.test(question);
    const prefix = playfulAdult() && !isStruggleQuestion && /\b(next|example|show|challenge|why|explain)\b/i.test(question)
      ? 'You’re keeping me busy. I like it. '
      : '';
    response(prefix + baseAnswer, 'answer');
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
  window.addEventListener('fc-teacher-choice', () => {
    applyTeacherChoice();
    if (root.classList.contains('open')) refresh();
  });
  window.addEventListener('fc-profile-age', () => {
    applyTeacherChoice();
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

  applyTeacherChoice();
  refresh();
})();