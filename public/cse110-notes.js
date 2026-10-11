(() => {
  'use strict';

  const root = document.querySelector('#cse110VisualNotes');
  if (!root) return;

  const topics = [
    {
      title: 'Programming Foundations',
      short: 'How code becomes action',
      slides: [
        {
          kicker: '01 · START WITH THE BIG IDEA',
          title: 'A computer is powerful — and completely literal.',
          body: 'A computer does not guess what you meant. It follows instructions exactly, in order. Programming is the skill of turning a human goal into instructions precise enough for a machine to follow.',
          visual: ['Human problem', 'Algorithm', 'Java code', 'JVM', 'Result'],
          takeaway: 'Programming is not mainly typing code. It is translating a problem into exact steps.'
        },
        {
          kicker: 'ALGORITHM BEFORE SYNTAX',
          title: 'Solve the problem before you write Java.',
          body: 'An algorithm is a finite sequence of steps for solving a problem. If your logic is wrong in plain language, Java will only execute the wrong logic faster.',
          code: 'Problem: Find the larger of two numbers.\n\n1. Read A and B\n2. If A > B, choose A\n3. Otherwise, choose B\n4. Show the answer',
          takeaway: 'Use plain steps or a flowchart first when the problem feels confusing.'
        },
        {
          kicker: 'JAVA PROGRAM ANATOMY',
          title: 'Every first Java program has an entry point.',
          body: 'Java starts running from the main method. The class is the container; main is the doorway the JVM enters through.',
          code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CSE110!");\n    }\n}',
          takeaway: 'For now, remember: class outside, main inside, statements inside main.'
        },
        {
          kicker: 'ERRORS ARE INFORMATION',
          title: 'Three kinds of mistakes feel different.',
          body: 'A syntax error means Java cannot understand the code. A runtime error happens while the program is running. A logic error runs successfully but gives the wrong answer.',
          visual: ['Syntax → will not compile', 'Runtime → crashes while running', 'Logic → runs, wrong result'],
          check: ['If your program prints 7 when the correct answer is 8, what kind of error is it?', 'Logic error. The program ran, but the reasoning was wrong.'],
          takeaway: 'Do not fear errors. First identify which type of error you are looking at.'
        }
      ]
    },
    {
      title: 'Variables & Data Types',
      short: 'How programs remember values',
      slides: [
        {
          kicker: '02 · MEMORY WITH LABELS',
          title: 'A variable is a name attached to a value.',
          body: 'Instead of remembering a raw memory address, you give a value a useful name such as age, price or isLoggedIn. The data type tells Java what kind of value that name can hold.',
          visual: ['age → 20', 'price → 149.50', 'grade → A', 'passed → true'],
          takeaway: 'Good variable names explain what the value means.'
        },
        {
          kicker: 'CORE JAVA TYPES',
          title: 'Different information needs different types.',
          body: 'CSE110 commonly uses int for whole numbers, double for decimal numbers, char for one character, boolean for true/false values, and String for text.',
          code: 'int age = 20;\ndouble cgpa = 3.75;\nchar grade = \'A\';\nboolean passed = true;\nString name = "Mina";',
          takeaway: 'Choose the type based on the meaning of the data, not just how it looks.'
        },
        {
          kicker: 'OPERATORS',
          title: '= stores. == compares.',
          body: 'This is one of the most important beginner distinctions. Assignment puts a value into a variable. Comparison asks whether two values are equal.',
          code: 'int x = 5;        // store 5 in x\nboolean same = (x == 5); // ask: is x equal to 5?',
          visual: ['+ add', '- subtract', '* multiply', '/ divide', '% remainder'],
          takeaway: 'Read x = 5 as “x gets 5”, not “x equals 5” in the mathematical sense.'
        },
        {
          kicker: 'THE INTEGER-DIVISION TRAP',
          title: 'The type of the operands changes the answer.',
          body: 'If both numbers are integers, Java performs integer division and drops the fractional part. This can silently create wrong answers.',
          code: 'System.out.println(5 / 2);      // 2\nSystem.out.println(5.0 / 2);    // 2.5\n\ndouble average = (double) 5 / 2; // 2.5',
          check: ['What does 9 / 4 produce when both values are int?', '2. Java discards the fractional part.'],
          takeaway: 'When a decimal answer matters, make at least one operand a double.'
        }
      ]
    },
    {
      title: 'Input & Output',
      short: 'Talking to the user',
      slides: [
        {
          kicker: '03 · PROGRAMS NEED DATA',
          title: 'Input makes a program respond to the real world.',
          body: 'Hard-coded values never change. User input lets the same program solve the problem for many different values.',
          visual: ['Keyboard', 'Scanner', 'Variable', 'Program logic', 'Output'],
          takeaway: 'Input enters the program; output communicates the result.'
        },
        {
          kicker: 'SCANNER',
          title: 'Scanner is the beginner-friendly doorway for keyboard input.',
          body: 'Import Scanner, create one Scanner object, then use the method that matches the type of data you want to read.',
          code: 'import java.util.Scanner;\n\nScanner sc = new Scanner(System.in);\nSystem.out.print("Age: ");\nint age = sc.nextInt();',
          takeaway: 'nextInt reads an int, nextDouble reads a double, and nextLine reads a whole line of text.'
        },
        {
          kicker: 'OUTPUT',
          title: 'Print information so the user knows what happened.',
          body: 'println prints and moves to the next line. print stays on the same line. Clear output is part of good program design.',
          code: 'String name = "Nadia";\nint score = 87;\n\nSystem.out.println("Student: " + name);\nSystem.out.println("Score: " + score);',
          takeaway: 'Output should explain the value, not dump a number with no context.'
        },
        {
          kicker: 'COMMON INPUT BUG',
          title: 'nextInt and nextLine can surprise you.',
          body: 'nextInt reads the number but leaves the Enter key in the input stream. A following nextLine may consume that leftover newline instead of waiting for text.',
          code: 'int age = sc.nextInt();\nsc.nextLine(); // consume leftover Enter\nString name = sc.nextLine();',
          check: ['Why add an extra nextLine after nextInt before reading text?', 'To consume the newline left behind by nextInt.'],
          takeaway: 'When mixing numeric input and whole-line text, remember the leftover newline.'
        }
      ]
    },
    {
      title: 'Conditions',
      short: 'Making decisions',
      slides: [
        {
          kicker: '04 · PROGRAMS CAN CHOOSE',
          title: 'A condition turns one straight path into multiple possibilities.',
          body: 'Without conditions, every run follows the same instructions. if lets the program choose what to do based on a true/false question.',
          visual: ['Question', 'TRUE → Path A', 'FALSE → Path B'],
          takeaway: 'A condition must evaluate to boolean: true or false.'
        },
        {
          kicker: 'IF / ELSE',
          title: 'Ask one question, then choose a branch.',
          body: 'The if block runs only when its condition is true. else handles the remaining case.',
          code: 'int age = 19;\n\nif (age >= 18) {\n    System.out.println("Adult");\n} else {\n    System.out.println("Minor");\n}',
          takeaway: 'Read the condition aloud: “if age is at least 18”.'
        },
        {
          kicker: 'MULTIPLE CASES',
          title: 'else if handles ordered alternatives.',
          body: 'When several ranges are possible, Java checks from top to bottom and stops at the first true branch.',
          code: 'if (marks >= 90) {\n    grade = \'A\';\n} else if (marks >= 80) {\n    grade = \'B\';\n} else if (marks >= 70) {\n    grade = \'C\';\n} else {\n    grade = \'F\';\n}',
          takeaway: 'Order matters. Put stricter or higher ranges first.'
        },
        {
          kicker: 'LOGICAL OPERATORS',
          title: 'Combine questions with &&, || and !.',
          body: '&& means both conditions must be true. || means at least one must be true. ! reverses a boolean value.',
          code: 'boolean canEnter = age >= 18 && hasTicket;\nboolean weekend = day == 6 || day == 7;\nboolean blocked = !isActive;',
          check: ['When does A && B become true?', 'Only when both A and B are true.'],
          takeaway: 'Complex decisions become easier when each small condition has a clear meaning.'
        }
      ]
    },
    {
      title: 'Loops',
      short: 'Repeating without copying code',
      slides: [
        {
          kicker: '05 · REPETITION',
          title: 'A loop says: do this again, but under control.',
          body: 'If you need to print 1 to 100, writing 100 print statements is not programming. A loop expresses the repeated pattern once.',
          visual: ['Start', 'Check condition', 'Run body', 'Update', 'Repeat'],
          takeaway: 'Every loop needs a way to eventually stop.'
        },
        {
          kicker: 'FOR LOOP',
          title: 'Use for when the repetition has a clear counter.',
          body: 'A for loop keeps initialization, condition and update together, which makes counting loops easy to read.',
          code: 'for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}',
          visual: ['i = 1', 'i <= 5?', 'print i', 'i++'],
          takeaway: 'Trace i on paper when a loop feels mysterious.'
        },
        {
          kicker: 'WHILE LOOP',
          title: 'Use while when you repeat until a situation changes.',
          body: 'while is useful when you do not naturally know the number of repetitions in advance.',
          code: 'int password = 0;\nwhile (password != 1234) {\n    password = sc.nextInt();\n}',
          takeaway: 'The loop condition is checked before every repetition.'
        },
        {
          kicker: 'OFF-BY-ONE',
          title: '< and <= can change the number of repetitions.',
          body: 'Many loop bugs happen at the boundary. Decide exactly which first and last values should be included before writing the condition.',
          code: 'for (int i = 0; i < 5; i++)  // 0,1,2,3,4\nfor (int i = 0; i <= 5; i++) // 0,1,2,3,4,5',
          check: ['How many times does for(int i=0; i<10; i++) run?', '10 times: i goes from 0 through 9.'],
          takeaway: 'Write the expected counter values beside the loop when checking boundaries.'
        }
      ]
    },
    {
      title: 'Strings',
      short: 'Working with text',
      slides: [
        {
          kicker: '06 · TEXT IS DATA',
          title: 'A String is a sequence of characters.',
          body: 'Names, messages, IDs and sentences are not one indivisible thing. Java lets you inspect and transform the characters inside a String.',
          visual: ['H', 'e', 'l', 'l', 'o'],
          takeaway: 'String indexes start at 0.'
        },
        {
          kicker: 'CORE STRING METHODS',
          title: 'Ask a String useful questions.',
          body: 'length tells you how many characters exist. charAt retrieves one character. substring extracts part of the text.',
          code: 'String word = "Comet";\n\nword.length();       // 5\nword.charAt(0);      // C\nword.substring(1,4); // ome',
          takeaway: 'For substring(start, end), start is included and end is excluded.'
        },
        {
          kicker: 'COMPARE TEXT CORRECTLY',
          title: 'Use equals for String content.',
          body: 'With Strings, == is not the reliable way to ask whether two pieces of text contain the same characters. Use equals.',
          code: 'String a = "BRACU";\nString b = sc.nextLine();\n\nif (a.equals(b)) {\n    System.out.println("Same text");\n}',
          takeaway: 'For beginner Java: numbers often use ==; String content uses equals.'
        },
        {
          kicker: 'STRING + LOOP',
          title: 'A loop can inspect text one character at a time.',
          body: 'This pattern unlocks vowel counting, digit counting, reversing text, palindrome checks and many CSE110-style problems.',
          code: 'for (int i = 0; i < word.length(); i++) {\n    char ch = word.charAt(i);\n    System.out.println(ch);\n}',
          check: ['What is the last valid index of a String with length 8?', '7, because indexing starts at 0.'],
          takeaway: 'Use i < text.length(), not i <= text.length().'
        }
      ]
    },
    {
      title: 'Arrays',
      short: 'Many values under one name',
      slides: [
        {
          kicker: '07 · ONE NAME, MANY SLOTS',
          title: 'An array stores multiple values of the same type.',
          body: 'Instead of score1, score2, score3 and score4, an array gives you one collection that can be processed systematically.',
          visual: ['scores[0]', 'scores[1]', 'scores[2]', 'scores[3]'],
          takeaway: 'An array has a fixed length once created.'
        },
        {
          kicker: 'CREATE & ACCESS',
          title: 'Indexing starts at zero.',
          body: 'The first element is at index 0, and the last element is at length - 1.',
          code: 'int[] scores = {80, 92, 75, 88};\n\nSystem.out.println(scores[0]); // 80\nscores[2] = 79;\nSystem.out.println(scores.length); // 4',
          takeaway: 'For length 4, valid indexes are 0, 1, 2 and 3.'
        },
        {
          kicker: 'ARRAY + LOOP',
          title: 'Loops are what make arrays powerful.',
          body: 'A loop can visit every element without repeating nearly identical code.',
          code: 'int total = 0;\nfor (int i = 0; i < scores.length; i++) {\n    total += scores[i];\n}\ndouble avg = (double) total / scores.length;',
          takeaway: 'Most array problems are “visit every element and update some result”.'
        },
        {
          kicker: 'OUT OF BOUNDS',
          title: 'The array has a hard edge.',
          body: 'Trying to access an index that does not exist causes an ArrayIndexOutOfBoundsException at runtime.',
          code: 'int[] a = new int[5];\n// valid: a[0] ... a[4]\n// invalid: a[5]',
          check: ['What is the last valid index of int[] a = new int[12]?', '11.'],
          takeaway: 'The safest standard traversal condition is i < array.length.'
        }
      ]
    },
    {
      title: 'Sorting',
      short: 'Putting data in order',
      slides: [
        {
          kicker: '08 · WHY SORT?',
          title: 'Sorted data is easier to inspect, search and reason about.',
          body: 'Sorting is not just rearranging numbers. It introduces a bigger idea: an algorithm can repeatedly transform data until a condition is satisfied.',
          visual: ['8 3 5 1', '→ compare', '→ swap', '1 3 5 8'],
          takeaway: 'Focus on the rule of the algorithm, not memorising lines of code.'
        },
        {
          kicker: 'BUBBLE SORT',
          title: 'Compare neighbours. Swap when they are out of order.',
          body: 'During one full pass, larger values move toward the right. Repeat passes until the array is sorted.',
          code: 'for (int pass = 0; pass < a.length - 1; pass++) {\n    for (int i = 0; i < a.length - 1 - pass; i++) {\n        if (a[i] > a[i + 1]) {\n            int temp = a[i];\n            a[i] = a[i + 1];\n            a[i + 1] = temp;\n        }\n    }\n}',
          takeaway: 'The inner loop compares neighbours; the outer loop repeats passes.'
        },
        {
          kicker: 'TRACE A PASS',
          title: 'Watching one pass is more useful than staring at the full code.',
          body: 'For [6, 3, 8, 2], compare 6 and 3 → swap. Compare 6 and 8 → keep. Compare 8 and 2 → swap. The largest value, 8, reaches the end.',
          visual: ['6 3 8 2', '3 6 8 2', '3 6 8 2', '3 6 2 8'],
          takeaway: 'After each pass, at least one largest remaining value reaches its final position.'
        },
        {
          kicker: 'WHAT SORTING TEACHES',
          title: 'Nested loops are expensive.',
          body: 'Simple sorts are excellent for learning because you can see every comparison. They also show why algorithm efficiency matters as the input grows.',
          check: ['In ascending Bubble Sort, when do two neighbours swap?', 'When the left value is greater than the right value.'],
          takeaway: 'Understand the comparison, swap, pass and stopping idea before worrying about speed notation.'
        }
      ]
    },
    {
      title: 'Methods',
      short: 'Breaking a program into pieces',
      slides: [
        {
          kicker: '09 · STOP WRITING ONE GIANT MAIN',
          title: 'A method gives one job a name.',
          body: 'Large programs become understandable when each method performs one clear task: calculate tax, find maximum, print a menu, validate input.',
          visual: ['main()', 'calculateAverage()', 'findMax()', 'printResult()'],
          takeaway: 'A good method name should tell you what job it performs.'
        },
        {
          kicker: 'PARAMETERS',
          title: 'Parameters are the inputs a method receives.',
          body: 'They make one method reusable with different values.',
          code: 'static int square(int n) {\n    return n * n;\n}\n\nint a = square(4); // 16\nint b = square(7); // 49',
          takeaway: 'n is the parameter; 4 and 7 are arguments.'
        },
        {
          kicker: 'RETURN VALUES',
          title: 'return sends a result back to the caller.',
          body: 'A method can calculate a value without deciding how that value will later be displayed or used.',
          code: 'static double average(int a, int b) {\n    return (a + b) / 2.0;\n}\n\ndouble result = average(10, 15);',
          takeaway: 'Use void when no value needs to come back.'
        },
        {
          kicker: 'LOCAL SCOPE',
          title: 'Variables created inside a method belong to that method.',
          body: 'A local variable exists only inside its scope. This prevents unrelated parts of the program from accidentally changing each other.',
          check: ['What is the difference between a parameter and an argument?', 'A parameter is the name in the method definition; an argument is the actual value supplied during a call.'],
          takeaway: 'Methods improve both reuse and control over where data is visible.'
        }
      ]
    },
    {
      title: 'Recursion',
      short: 'A method solving a smaller copy',
      slides: [
        {
          kicker: '10 · THE STRANGE IDEA',
          title: 'A recursive method calls itself — but on a smaller problem.',
          body: 'Recursion works when a problem naturally contains a smaller version of itself. The method keeps reducing the problem until it reaches a case simple enough to answer directly.',
          visual: ['Problem n', 'Problem n-1', 'Problem n-2', '...', 'Base case'],
          takeaway: 'Recursion needs both reduction and a stopping point.'
        },
        {
          kicker: 'BASE CASE',
          title: 'Without a base case, recursion never knows when to stop.',
          body: 'The base case is the simplest input that can be answered immediately.',
          code: 'static int factorial(int n) {\n    if (n == 0) {\n        return 1;\n    }\n    return n * factorial(n - 1);\n}',
          takeaway: 'First identify the base case, then write the recursive step.'
        },
        {
          kicker: 'TRACE THE CALLS',
          title: 'factorial(4) creates a chain of waiting calls.',
          body: 'Each call pauses while the smaller call is solved. Then the answers return in reverse order.',
          visual: ['factorial(4)', '4 × factorial(3)', '4 × 3 × factorial(2)', '4 × 3 × 2 × factorial(1)', '= 24'],
          takeaway: 'Draw the call chain when recursion feels invisible.'
        },
        {
          kicker: 'RECURSION VS LOOP',
          title: 'Both can repeat work, but they express the problem differently.',
          body: 'Loops repeat through iteration. Recursion repeats through function calls. Some problems become elegant recursively, but recursion also uses call-stack memory.',
          check: ['What two things must every safe recursive solution have?', 'A base case and a recursive step that moves toward that base case.'],
          takeaway: 'Do not choose recursion just because it looks clever; choose it when the problem structure fits.'
        }
      ]
    },
    {
      title: 'File I/O',
      short: 'Keeping data after the program ends',
      slides: [
        {
          kicker: '11 · MEMORY THAT SURVIVES',
          title: 'Variables disappear when the program ends. Files can remain.',
          body: 'File input/output lets a program read existing data and save new data outside the running process.',
          visual: ['Program', '→ write →', 'file.txt', '→ read later →', 'Program'],
          takeaway: 'Files turn temporary computation into persistent data.'
        },
        {
          kicker: 'READ A FILE',
          title: 'A Scanner can read from a file instead of the keyboard.',
          body: 'The source changes from System.in to a File object, but the idea of reading tokens or lines remains familiar.',
          code: 'import java.io.File;\nimport java.util.Scanner;\n\nFile file = new File("data.txt");\nScanner reader = new Scanner(file);\n\nwhile (reader.hasNextLine()) {\n    System.out.println(reader.nextLine());\n}\nreader.close();',
          takeaway: 'Always think about whether the file exists and whether there is more data to read.'
        },
        {
          kicker: 'WRITE A FILE',
          title: 'PrintWriter gives your program a pen.',
          body: 'You can create or overwrite a text file and write formatted lines into it.',
          code: 'import java.io.PrintWriter;\n\nPrintWriter out = new PrintWriter("result.txt");\nout.println("Score: 95");\nout.close();',
          takeaway: 'Closing the writer makes sure buffered output is properly finished.'
        },
        {
          kicker: 'FILES CAN FAIL',
          title: 'External resources are less predictable than variables.',
          body: 'A filename may be wrong, permission may be denied, or a file may be missing. Java therefore makes you handle or declare certain file-related exceptions.',
          check: ['Why should a file reader or writer be closed?', 'To release the resource and ensure pending data is properly completed.'],
          takeaway: 'File I/O introduces the idea that programs must prepare for failures outside their own logic.'
        }
      ]
    },
    {
      title: 'Debugging & Complete Programs',
      short: 'Turning pieces into a solution',
      slides: [
        {
          kicker: '12 · DEBUGGING IS A METHOD',
          title: 'Do not randomly edit code until it works.',
          body: 'Good debugging is a process: reproduce the problem, locate where reality differs from expectation, inspect values, make one change, then test again.',
          visual: ['Reproduce', 'Locate', 'Inspect', 'Change one thing', 'Test again'],
          takeaway: 'A bug becomes manageable when you can describe exactly when it appears.'
        },
        {
          kicker: 'TRACE VALUES',
          title: 'Print the state of the program near the suspicious line.',
          body: 'When logic is wrong, inspect the variables that control the decision instead of only looking at the final output.',
          code: 'System.out.println("DEBUG i=" + i + ", total=" + total);',
          takeaway: 'Ask: what value did I expect here, and what value did I actually get?'
        },
        {
          kicker: 'TEST CASES',
          title: 'One successful input proves almost nothing.',
          body: 'Test normal cases, boundary cases and unusual cases. If a condition checks age >= 18, test 17, 18 and 19 — not only 25.',
          visual: ['Normal case', 'Boundary case', 'Smallest case', 'Largest case', 'Unexpected case'],
          takeaway: 'Choose tests that challenge the assumptions in your code.'
        },
        {
          kicker: 'THE CSE110 FINISH LINE',
          title: 'A complete beginner program combines the whole course.',
          body: 'Read input, store values, make decisions, repeat work, process Strings/arrays, call methods, possibly use recursion or files, and produce clear output. That is the real skill CSE110 is building.',
          visual: ['Input', 'Variables', 'Conditions', 'Loops', 'Arrays / Strings', 'Methods', 'Output'],
          check: ['What should you do before writing code for a larger problem?', 'Break the problem into smaller steps and decide what each part must do.'],
          takeaway: 'The goal is not to memorise Java syntax. It is to learn how to think through a program.'
        }
      ]
    }
  ];

  const slides = [];
  topics.forEach((topic, topicIndex) => {
    topic.slides.forEach((slide, slideIndex) => slides.push({
      ...slide,
      topicIndex,
      slideIndex,
      topicTitle: topic.title
    }));
  });

  const storageKey = 'fc-cse110-notes-v1';
  let current = Math.max(0, Math.min(slides.length - 1, Number(localStorage.getItem(storageKey) || 0)));

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[ch]);

  function slideIndexForTopic(topicIndex) {
    return slides.findIndex((slide) => slide.topicIndex === topicIndex);
  }

  function renderVisual(items) {
    if (!items?.length) return '';
    return '<div class="cse110-visual-strip">' + items.map((item, index) =>
      '<span><b>' + String(index + 1).padStart(2, '0') + '</b><em>' + esc(item) + '</em></span>'
    ).join('<i>→</i>') + '</div>';
  }

  function renderCode(code) {
    if (!code) return '';
    return '<div class="cse110-code"><div><span>JAVA / TRACE</span><button type="button" data-cse110-copy>Copy</button></div><pre><code>' + esc(code) + '</code></pre></div>';
  }

  function renderCheck(check) {
    if (!check) return '';
    return '<details class="cse110-check"><summary>Quick check · ' + esc(check[0]) + '</summary><p>' + esc(check[1]) + '</p></details>';
  }

  function renderShell() {
    root.innerHTML =
      '<section class="cse110-notes-shell">' +
        '<header class="cse110-notes-head">' +
          '<button type="button" class="cse110-back" data-view="bracu">← BRACU Courses</button>' +
          '<div><span class="eyebrow">CSE110 · VISUAL NOTES</span><h1>Programming Language I</h1><p>Learn the idea first. Then see the Java.</p></div>' +
          '<div class="cse110-head-progress"><b id="cse110SceneCount"></b><span><i id="cse110ProgressBar"></i></span></div>' +
        '</header>' +
        '<div class="cse110-note-layout">' +
          '<nav class="cse110-topic-rail" aria-label="CSE110 note topics">' +
            topics.map((topic, index) =>
              '<button type="button" data-cse110-topic="' + index + '"><span>' + String(index + 1).padStart(2, '0') + '</span><div><b>' + esc(topic.title) + '</b><small>' + esc(topic.short) + '</small></div></button>'
            ).join('') +
          '</nav>' +
          '<main class="cse110-story-wrap">' +
            '<article class="cse110-story-card" id="cse110StoryCard" aria-live="polite"></article>' +
            '<footer class="cse110-story-controls">' +
              '<button type="button" class="secondary" data-cse110-prev>← Previous</button>' +
              '<div><span>Use</span><kbd>←</kbd><kbd>→</kbd><span>to move</span></div>' +
              '<button type="button" class="primary" data-cse110-next>Next →</button>' +
            '</footer>' +
          '</main>' +
        '</div>' +
      '</section>';
  }

  function render() {
    const slide = slides[current];
    const topic = topics[slide.topicIndex];
    const card = root.querySelector('#cse110StoryCard');
    if (!card) return;

    localStorage.setItem(storageKey, String(current));

    root.querySelectorAll('[data-cse110-topic]').forEach((button) => {
      const active = Number(button.dataset.cse110Topic) === slide.topicIndex;
      button.classList.toggle('active', active);
      button.setAttribute('aria-current', active ? 'true' : 'false');
    });

    root.querySelector('#cse110SceneCount').textContent = 'Scene ' + (current + 1) + ' / ' + slides.length;
    root.querySelector('#cse110ProgressBar').style.width = (((current + 1) / slides.length) * 100) + '%';

    card.dataset.sceneType = slide.code ? 'code' : slide.check ? 'check' : 'story';
    card.innerHTML =
      '<div class="cse110-scene-meta"><span>' + esc(slide.kicker) + '</span><b>Topic ' + String(slide.topicIndex + 1).padStart(2, '0') + ' · ' + esc(topic.title) + '</b></div>' +
      '<h2>' + esc(slide.title) + '</h2>' +
      '<p class="cse110-scene-body">' + esc(slide.body) + '</p>' +
      renderVisual(slide.visual) +
      renderCode(slide.code) +
      renderCheck(slide.check) +
      '<aside class="cse110-takeaway"><span>REMEMBER THIS</span><p>' + esc(slide.takeaway) + '</p></aside>';

    const prev = root.querySelector('[data-cse110-prev]');
    const next = root.querySelector('[data-cse110-next]');
    prev.disabled = current === 0;
    next.textContent = current === slides.length - 1 ? 'Back to BRACU Courses →' : 'Next →';
  }

  function move(delta) {
    if (current === slides.length - 1 && delta > 0) {
      document.querySelector('[data-view="bracu"]')?.click();
      return;
    }
    current = Math.max(0, Math.min(slides.length - 1, current + delta));
    render();
    root.querySelector('#cse110StoryCard')?.scrollIntoView({ block:'start', behavior:'smooth' });
  }

  renderShell();
  render();

  root.addEventListener('click', (event) => {
    const topicButton = event.target.closest('[data-cse110-topic]');
    if (topicButton) {
      const nextIndex = slideIndexForTopic(Number(topicButton.dataset.cse110Topic));
      if (nextIndex >= 0) {
        current = nextIndex;
        render();
      }
      return;
    }
    if (event.target.closest('[data-cse110-prev]')) {
      move(-1);
      return;
    }
    if (event.target.closest('[data-cse110-next]')) {
      move(1);
      return;
    }
    const copy = event.target.closest('[data-cse110-copy]');
    if (copy) {
      const code = root.querySelector('.cse110-code code')?.textContent || '';
      navigator.clipboard?.writeText(code);
      copy.textContent = 'Copied';
      setTimeout(() => { copy.textContent = 'Copy'; }, 1200);
    }
  });

  document.addEventListener('keydown', (event) => {
    const view = document.querySelector('#view-cse110notes');
    if (!view?.classList.contains('active')) return;
    if (event.target.matches?.('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    }
  });

  window.FirstCometCSE110Notes = {
    openTopic(index = 0) {
      const nextIndex = slideIndexForTopic(Math.max(0, Math.min(topics.length - 1, Number(index) || 0)));
      current = nextIndex < 0 ? 0 : nextIndex;
      render();
    },
    topics,
    slides
  };
})();
