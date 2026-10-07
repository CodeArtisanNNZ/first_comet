(() => {
  'use strict';

  const videoRoot = document.querySelector('#videoLearningApp');
  const labRoot = document.querySelector('#codeLabApp');
  if (!videoRoot || !labRoot) return;

  const videos = [
    {
      id: 'htmlcss',
      title: 'HTML + CSS',
      order: 'Start here after localhost',
      summary: 'Build the structure first, then make it readable and responsive.',
      practice: 'Build one profile card with a heading, image, paragraph, link and responsive layout.',
      bn: {
        title: 'HTML Complete Course + CSS Complete Course',
        provider: 'Anisul Islam',
        href: 'https://www.youtube.com/playlist?list=PLgH5QX0i9K3oHBr5dsumGwjUxByN5Lnw3',
        embed: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLgH5QX0i9K3oHBr5dsumGwjUxByN5Lnw3',
        note: 'Structured Bangla HTML playlist. Continue with the linked CSS course from the same learning path.'
      },
      en: {
        title: 'HTML & CSS Full Course — Beginner to Pro',
        provider: 'SuperSimpleDev',
        href: 'https://www.youtube.com/watch?v=G3e-cpL7ofc',
        embed: 'https://www.youtube-nocookie.com/embed/G3e-cpL7ofc',
        note: 'Project-based course covering HTML, CSS, DevTools, Grid, Flexbox and responsive layout.'
      }
    },
    {
      id: 'javascript',
      title: 'JavaScript',
      order: 'After basic HTML + CSS',
      summary: 'Learn variables, functions, conditions, events and DOM changes by building tiny interactions.',
      practice: 'Make a button change text, then validate one form field without copying a full project.',
      bn: {
        title: 'JavaScript for Beginners',
        provider: 'Learn with Sumit',
        href: 'https://www.youtube.com/playlist?list=PLHiZ4m8vCp9OkrURufHpGUUTBjJhO9Ghy',
        embed: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLHiZ4m8vCp9OkrURufHpGUUTBjJhO9Ghy',
        note: 'Beginner-focused Bangla series with clear explanations and a practical web-development context.'
      },
      en: {
        title: 'JavaScript Full Course',
        provider: 'Bro Code',
        href: 'https://www.youtube.com/watch?v=lfmg-EJ8gm4',
        embed: 'https://www.youtube-nocookie.com/embed/lfmg-EJ8gm4',
        note: 'Long-form beginner course with many small programs, DOM work, async code and a weather app.'
      }
    },
    {
      id: 'python',
      title: 'Python',
      order: 'Choose this for automation, data or Python backend',
      summary: 'Learn programming fundamentals without mixing them with frontend concepts.',
      practice: 'Write a tiny program that asks for a name and score, then prints pass/fail using a condition.',
      bn: {
        title: 'Python Bangla Tutorials for Beginners',
        provider: 'Anisul Islam',
        href: 'https://www.youtube.com/playlist?list=PLgH5QX0i9K3rz5XqMsTk41_j15_6682BN',
        embed: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLgH5QX0i9K3rz5XqMsTk41_j15_6682BN',
        note: 'A long beginner playlist that starts from setup and basic syntax and progresses topic by topic.'
      },
      en: {
        title: 'Learn Python — Full Course for Beginners',
        provider: 'freeCodeCamp.org',
        href: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
        embed: 'https://www.youtube-nocookie.com/embed/rfscVS0vtbw',
        note: 'Covers core Python concepts with small exercises and beginner projects.'
      }
    },
    {
      id: 'java',
      title: 'Java',
      order: 'Choose this when your course or project needs Java',
      summary: 'Focus on types, methods, classes and object-oriented thinking before frameworks.',
      practice: 'Create a Student class with name and score fields, then print a formatted result.',
      bn: {
        title: 'Java Bangla Tutorials — Core Java',
        provider: 'Anisul Islam',
        href: 'https://www.youtube.com/playlist?list=PLgH5QX0i9K3oAZUB2QXR-dZac0c9HNyRa',
        embed: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLgH5QX0i9K3oAZUB2QXR-dZac0c9HNyRa',
        note: 'Detailed Bangla Core Java playlist covering syntax and OOP in sequence.'
      },
      en: {
        title: 'Java Full Course',
        provider: 'Bro Code',
        href: 'https://www.youtube.com/watch?v=xk4_1vDrzzo',
        embed: 'https://www.youtube-nocookie.com/embed/xk4_1vDrzzo',
        note: 'A large beginner course covering syntax, OOP, exceptions, files and Java fundamentals.'
      }
    },
    {
      id: 'php',
      title: 'PHP',
      order: 'Choose this for a PHP backend',
      summary: 'Learn server-side basics only after you can build the frontend you want to connect.',
      practice: 'Create one PHP page that receives a form field and safely prints a response.',
      bn: {
        title: 'PHP learning path',
        provider: 'Bangla free-course index',
        href: 'https://www.youtube.com/watch?v=5JavawJuXCA',
        embed: 'https://www.youtube-nocookie.com/embed/5JavawJuXCA',
        note: 'Bangla PHP 8 beginner series covering core PHP, OOP, MySQL and project work. Start here, then continue through the creator’s series.'
      },
      en: {
        title: 'PHP Programming Language Tutorial — Full Course',
        provider: 'freeCodeCamp.org',
        href: 'https://www.youtube.com/watch?v=OK_JCtrrv-c',
        embed: 'https://www.youtube-nocookie.com/embed/OK_JCtrrv-c',
        note: 'Beginner PHP course covering setup, input, arrays, functions, conditions and OOP.'
      }
    },
    {
      id: 'git',
      title: 'Git + GitHub',
      order: 'After you have something worth saving',
      summary: 'Learn what commit, branch, push and pull mean before memorising commands.',
      practice: 'Create a repository, make two meaningful commits, push to GitHub, then explain what changed between them.',
      bn: {
        title: 'সহজ বাংলায় Git & GitHub — Crash Course',
        provider: 'Learn with Sumit',
        href: 'https://www.youtube.com/watch?v=oe21Nlq8GS4',
        embed: 'https://www.youtube-nocookie.com/embed/oe21Nlq8GS4',
        note: 'Bangla crash course covering Git architecture, commits, branches, merging, push, pull and fetch.'
      },
      en: {
        title: 'Git and GitHub for Beginners — Crash Course',
        provider: 'freeCodeCamp.org',
        href: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
        embed: 'https://www.youtube-nocookie.com/embed/RGOj5yH7evk',
        note: 'Highly watched beginner crash course covering version control, local Git, commits, push, SSH keys, branches, undoing and forks.'
      }
    },
    {
      id: 'database',
      title: 'Database + SQL',
      order: 'Only when information must be saved',
      summary: 'Understand tables, rows, keys, CRUD and relationships before connecting a database service.',
      practice: 'Design three tables for a tiny student project and explain which fields are primary/foreign keys.',
      bn: {
        title: 'SQL Bangla Tutorials — Basic to Advanced',
        provider: 'STUDY MART',
        href: 'https://www.youtube.com/watch?v=dFFirEkiAeU',
        embed: 'https://www.youtube-nocookie.com/embed/dFFirEkiAeU',
        note: 'Bangla SQL/RDBMS course that starts from fundamentals and points learners to the complete SQL learning series and practice resources.'
      },
      en: {
        title: 'SQL Tutorial — Full Database Course for Beginners',
        provider: 'freeCodeCamp.org',
        href: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
        embed: 'https://www.youtube-nocookie.com/embed/HXV3zeQKqGY',
        note: 'Covers database basics, tables, keys, CRUD, joins, nested queries and ER diagrams.'
      }
    },
    {
      id: 'backend',
      title: 'Backend + API',
      order: 'After frontend basics',
      summary: 'Learn request → server → response before choosing a framework.',
      practice: 'Draw the request/response flow for a form submission, then create one GET endpoint locally.',
      bn: {
        title: 'Node.js Tutorial Bangla Series for Beginners',
        provider: 'Learn with Sumit',
        href: 'https://www.youtube.com/playlist?list=PLHiZ4m8vCp9PHnOIT7gd30PCBoYCpGoQM',
        embed: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLHiZ4m8vCp9PHnOIT7gd30PCBoYCpGoQM',
        note: 'Bangla Node.js path for learning backend concepts after JavaScript fundamentals.'
      },
      en: {
        title: 'Node.js and Express.js — Full Course',
        provider: 'freeCodeCamp.org',
        href: 'https://www.freecodecamp.org/news/free-8-hour-node-express-course/',
        embed: '',
        note: 'Eight-hour backend course covering Node fundamentals, HTTP, Express, REST APIs and projects.'
      }
    }
  ];

  const labTracks = {
    web: {
      label: 'Web page',
      runMode: 'live',
      goal: 'Change the code, press Run preview, and see exactly what your browser would render.',
      hint: 'Keep the first attempt small: one card, one button, one interaction.',
      html: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1">\n  <title>My first lab</title>\n</head>\n<body>\n  <main class="card">\n    <h1 id="title">Hello, Comet!</h1>\n    <p>I changed real code.</p>\n    <button id="helloBtn">Click me</button>\n  </main>\n</body>\n</html>',
      css: 'body {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  background: #fff5dc;\n}\n\n.card {\n  width: min(360px, 86vw);\n  padding: 24px;\n  border: 2px solid #171319;\n  border-radius: 16px;\n  background: white;\n}',
      js: 'const button = document.querySelector("#helloBtn");\nconst title = document.querySelector("#title");\n\nbutton.addEventListener("click", () => {\n  title.textContent = "It works!";\n});'
    },
    javascript: {
      label: 'JavaScript basics',
      runMode: 'local',
      goal: 'Write the logic yourself first. The checker looks for the important ideas, not one exact answer.',
      hint: 'You need a variable, a condition and console.log().',
      starter: 'const score = 72;\n\n// TODO: print "Pass" when score is 50 or more.\n',
      checks: [/score/, /if\s*\(/, /console\.log/],
      expected: 'Pass',
      run: 'Run this in your browser DevTools console or inside app.js on localhost.'
    },
    python: {
      label: 'Python basics',
      runMode: 'local',
      goal: 'Practise variables, input and a condition without hiding what Python actually runs.',
      hint: 'Use input(), convert score with int(), then write if/else.',
      starter: 'name = input("Name: ")\nscore = int(input("Score: "))\n\n# TODO: print "<name>: Pass" for scores 50 or above, otherwise "Fail".\n',
      checks: [/input\s*\(/, /int\s*\(/, /if\s+/, /print\s*\(/],
      expected: 'Nusaiba: Pass',
      run: 'Save as practice.py and run: python practice.py'
    },
    java: {
      label: 'Java basics',
      runMode: 'local',
      goal: 'Practise a typed variable, a condition and output in real Java syntax.',
      hint: 'Keep everything inside main for this first exercise.',
      starter: 'public class Main {\n  public static void main(String[] args) {\n    int score = 72;\n    // TODO: print Pass when score >= 50, otherwise Fail.\n  }\n}\n',
      checks: [/int\s+score/, /if\s*\(/, /System\.out\.println/],
      expected: 'Pass',
      run: 'Save as Main.java, run javac Main.java, then java Main.'
    },
    php: {
      label: 'PHP basics',
      runMode: 'local',
      goal: 'Practise a variable, a condition and server-side output before touching frameworks.',
      hint: 'Use $score, if/else and echo.',
      starter: '<?php\n$score = 72;\n\n// TODO: echo Pass when score >= 50, otherwise Fail.\n',
      checks: [/\$score/, /if\s*\(/, /echo\s+/],
      expected: 'Pass',
      run: 'Save as index.php and run it through a local PHP server such as php -S localhost:8000.'
    }
  };

  const videoState = {
    lang: localStorage.getItem('fc-video-lang') || 'bn',
    topic: localStorage.getItem('fc-video-topic') || 'htmlcss'
  };

  const completedVideos = new Set(JSON.parse(localStorage.getItem('fc-video-complete') || '[]'));

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  function saveCompleted() {
    localStorage.setItem('fc-video-complete', JSON.stringify(Array.from(completedVideos)));
  }

  function renderVideoHub() {
    const active = videos.find((item) => item.id === videoState.topic) || videos[0];
    const resource = active[videoState.lang];
    const doneKey = active.id + ':' + videoState.lang;
    const canEmbed = Boolean(resource.embed);

    videoRoot.innerHTML =
      '<section class="learning-hub-intro">' +
        '<div><span class="eyebrow">READ → WATCH → BUILD</span><h2>One topic. Two languages. One next action.</h2><p>Read the First Comet explanation first. Use a video when seeing the idea helps. Then build something tiny before moving on.</p></div>' +
        '<aside><b>Do not binge courses.</b><span>Watch only the part that helps your current milestone, pause it, then type the code yourself.</span></aside>' +
      '</section>' +
      '<div class="video-toolbar">' +
        '<div class="video-language" role="group" aria-label="Video language">' +
          '<button data-video-lang="bn" class="' + (videoState.lang === 'bn' ? 'active' : '') + '">বাংলা</button>' +
          '<button data-video-lang="en" class="' + (videoState.lang === 'en' ? 'active' : '') + '">English</button>' +
        '</div>' +
        '<label>Topic<select id="videoTopicSelect">' +
          videos.map((item) => '<option value="' + item.id + '"' + (item.id === active.id ? ' selected' : '') + '>' + esc(item.title) + '</option>').join('') +
        '</select></label>' +
      '</div>' +
      '<div class="video-learning-layout">' +
        '<nav class="video-topic-list" aria-label="Video learning topics">' +
          videos.map((item, index) => {
            const isDone = completedVideos.has(item.id + ':' + videoState.lang);
            return '<button data-video-topic="' + item.id + '" class="' + (item.id === active.id ? 'active' : '') + '"><span>' + (isDone ? '✓' : String(index + 1).padStart(2, '0')) + '</span><div><b>' + esc(item.title) + '</b><small>' + esc(item.order) + '</small></div></button>';
          }).join('') +
        '</nav>' +
        '<article class="video-focus-card">' +
          '<span class="eyebrow">' + (videoState.lang === 'bn' ? 'বাংলা RESOURCE' : 'ENGLISH RESOURCE') + '</span>' +
          '<h3>' + esc(active.title) + '</h3>' +
          '<p class="video-summary">' + esc(active.summary) + '</p>' +
          '<div class="video-resource-card">' +
            '<div><b>' + esc(resource.title) + '</b><span>' + esc(resource.provider) + '</span></div>' +
            '<p>' + esc(resource.note) + '</p>' +
            '<div class="video-actions">' +
              '<a class="primary" href="' + esc(resource.href) + '" target="_blank" rel="noopener">Open free resource ↗</a>' +
              (canEmbed ? '<button class="secondary" data-load-video>Play here</button>' : '') +
            '</div>' +
            '<div id="videoEmbedSlot" class="video-embed-slot"></div>' +
          '</div>' +
          '<aside class="after-video"><span>AFTER WATCHING</span><p>' + esc(active.practice) + '</p><label><input type="checkbox" data-video-complete ' + (completedVideos.has(doneKey) ? 'checked' : '') + '> I practised this without copying the full solution.</label></aside>' +
        '</article>' +
      '</div>';
  }

  videoRoot.addEventListener('click', (event) => {
    const lang = event.target.closest('[data-video-lang]');
    if (lang) {
      videoState.lang = lang.dataset.videoLang;
      localStorage.setItem('fc-video-lang', videoState.lang);
      renderVideoHub();
      return;
    }
    const topic = event.target.closest('[data-video-topic]');
    if (topic) {
      videoState.topic = topic.dataset.videoTopic;
      localStorage.setItem('fc-video-topic', videoState.topic);
      renderVideoHub();
      return;
    }
    const load = event.target.closest('[data-load-video]');
    if (load) {
      const active = videos.find((item) => item.id === videoState.topic) || videos[0];
      const resource = active[videoState.lang];
      const slot = videoRoot.querySelector('#videoEmbedSlot');
      slot.innerHTML = '<iframe title="' + esc(resource.title) + '" src="' + esc(resource.embed) + '" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
      load.remove();
    }
  });

  videoRoot.addEventListener('change', (event) => {
    if (event.target.id === 'videoTopicSelect') {
      videoState.topic = event.target.value;
      localStorage.setItem('fc-video-topic', videoState.topic);
      renderVideoHub();
      return;
    }
    if (event.target.matches('[data-video-complete]')) {
      const key = videoState.topic + ':' + videoState.lang;
      if (event.target.checked) completedVideos.add(key);
      else completedVideos.delete(key);
      saveCompleted();
      renderVideoHub();
    }
  });

  let currentTrack = localStorage.getItem('fc-lab-track') || 'web';
  let hintOpen = false;

  function renderLab() {
    const track = labTracks[currentTrack] || labTracks.web;
    const isWeb = track.runMode === 'live';
    labRoot.innerHTML =
      '<section class="lab-intro">' +
        '<div><span class="eyebrow">FIRST COMET · CODE LAB</span><h2>Type first. Run second. Copy last.</h2><p>This lab is intentionally small. It teaches the loop every developer uses: change → run → observe → debug → try again.</p></div>' +
        '<aside><b>Rule:</b><span>If you cannot explain a line, do not keep it just because it works.</span></aside>' +
      '</section>' +
      '<div class="lab-track-picker">' +
        Object.entries(labTracks).map(([id, item]) => '<button data-lab-track="' + id + '" class="' + (id === currentTrack ? 'active' : '') + '">' + esc(item.label) + '</button>').join('') +
      '</div>' +
      '<section class="lab-task-card"><div><span class="eyebrow">YOUR SMALL TARGET</span><h3>' + esc(track.goal) + '</h3><p>' + esc(track.run || 'The preview is isolated inside this page.') + '</p></div><button class="course-text-link" data-lab-hint>' + (hintOpen ? 'Hide hint' : 'I am stuck — show one hint') + '</button>' + (hintOpen ? '<p class="lab-hint">' + esc(track.hint) + '</p>' : '') + '</section>' +
      (isWeb ? renderWebLab(track) : renderLocalLab(track));
    if (isWeb) runPreview();
  }

  function renderWebLab(track) {
    return '<div class="web-lab-grid">' +
      '<div class="web-editors">' +
        editorBlock('HTML', 'labHtml', track.html) +
        editorBlock('CSS', 'labCss', track.css) +
        editorBlock('JavaScript', 'labJs', track.js) +
        '<div class="lab-actions"><button class="primary" data-run-preview>Run preview →</button><button class="secondary" data-reset-lab>Reset</button></div>' +
      '</div>' +
      '<div class="preview-panel"><div><b>LIVE PREVIEW</b><span>Sandboxed in your browser</span></div><iframe id="labPreview" title="First Comet code preview" sandbox="allow-scripts"></iframe><details><summary>Try these three changes</summary><ol><li>Change the heading text.</li><li>Give the card a different border-radius.</li><li>Change what happens after the button click.</li></ol></details></div>' +
    '</div>';
  }

  function editorBlock(label, id, value) {
    return '<label class="lab-editor"><span>' + esc(label) + '</span><textarea id="' + id + '" spellcheck="false">' + esc(value) + '</textarea></label>';
  }

  function renderLocalLab(track) {
    const saved = localStorage.getItem('fc-lab-code-' + currentTrack) || track.starter;
    return '<div class="local-lab">' +
      '<label class="lab-editor"><span>' + esc(track.label) + ' practice</span><textarea id="localLabCode" spellcheck="false">' + esc(saved) + '</textarea></label>' +
      '<div class="local-lab-side"><div><span class="eyebrow">EXPECTED RESULT</span><pre>' + esc(track.expected) + '</pre></div><div><span class="eyebrow">HOW TO RUN IT</span><p>' + esc(track.run) + '</p></div><button class="primary" data-check-local>Check my attempt →</button><button class="secondary" data-reset-lab>Reset</button><p id="labFeedback" class="lab-feedback" aria-live="polite"></p></div>' +
    '</div>';
  }

  function runPreview() {
    const frame = labRoot.querySelector('#labPreview');
    if (!frame) return;
    const html = labRoot.querySelector('#labHtml')?.value || '';
    const css = labRoot.querySelector('#labCss')?.value || '';
    const script = labRoot.querySelector('#labJs')?.value || '';
    const source = html.replace('</head>', '<style>' + css + '</style></head>').replace('</body>', '<script>' + script.replace(/<\/script/gi, '<\\/script') + '<\\/script></body>');
    frame.srcdoc = source;
  }

  function checkLocal() {
    const track = labTracks[currentTrack];
    const code = labRoot.querySelector('#localLabCode')?.value || '';
    localStorage.setItem('fc-lab-code-' + currentTrack, code);
    const passed = track.checks.map((rule) => rule.test(code));
    const count = passed.filter(Boolean).length;
    const feedback = labRoot.querySelector('#labFeedback');
    if (count === passed.length) {
      feedback.dataset.result = 'correct';
      feedback.textContent = 'Structure looks right. Now run it locally and compare the real output with the expected result.';
    } else {
      feedback.dataset.result = 'retry';
      feedback.textContent = 'You have ' + count + ' of ' + passed.length + ' key pieces. Use the hint and add the missing idea before checking again.';
    }
  }

  labRoot.addEventListener('input', (event) => {
    if (event.target.id === 'localLabCode') localStorage.setItem('fc-lab-code-' + currentTrack, event.target.value);
  });

  labRoot.addEventListener('click', (event) => {
    const trackButton = event.target.closest('[data-lab-track]');
    if (trackButton) {
      currentTrack = trackButton.dataset.labTrack;
      localStorage.setItem('fc-lab-track', currentTrack);
      hintOpen = false;
      renderLab();
      return;
    }
    if (event.target.closest('[data-lab-hint]')) {
      hintOpen = !hintOpen;
      renderLab();
      return;
    }
    if (event.target.closest('[data-run-preview]')) {
      runPreview();
      return;
    }
    if (event.target.closest('[data-check-local]')) {
      checkLocal();
      return;
    }
    if (event.target.closest('[data-reset-lab]')) {
      localStorage.removeItem('fc-lab-code-' + currentTrack);
      renderLab();
    }
  });

  renderVideoHub();
  renderLab();
})();