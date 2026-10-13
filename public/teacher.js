(() => {
  'use strict';

  const STORAGE_KEY = 'fc-teacher-memory-v1';
  const MAX_REACTIONS = 80;
  // Use validated same-origin images; malformed embedded JPEGs cannot be
  // repaired by converting them to blob URLs or forcing their CSS visibility.
  const teacherPortraits = {
    female: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAcFBQYFBAcGBgYIBwcICxILCwoKCxYPEA0SGhYbGhkWGRgcICgiHB4mHhgZIzAkJiorLS4tGyIyNTEsNSgsLSz/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCACAAIADASIAAhEBAxEB/8QAHAAAAAcBAQAAAAAAAAAAAAAAAgMEBQYHCAEA/8QAPxAAAgECBAMGAwYFAwIHAAAAAQIDBBEABRIhBjFBBxMiUWFxgZGhFCMyQlKxFTNiwfBygtEW4QhDRFOiwvH/xAAaAQACAwEBAAAAAAAAAAAAAAACAwEEBQAG/8QAJhEAAgIBBAIBBQEBAAAAAAAAAAECEQMEEiExQWFREyJxkfChsf/aAAwDAQACEQMRAD8At7gXiGs4j4cp6ysoqqGR4w5mlhESSFiSAgvcgCw1WAPQnElw08NVFRPkkAnyyoy1IUWGKKoI7wqqgamUX07g2F72F9r2w5wzRVEKTQyJLFINSujalYeYI5jCH2OQPCOtzFKV1gjjaoqnF0hTn7k9B6nHayol1fZ6XT3zC7Ow8MS/qPmfIf2xB824jWAyUWUOxDn76rJvJMfQ+X+C2KubMoI0dHo5aiXC/vf9b/0kVTXUlPIP41mEZk5/ZYrlE9wN2+PywLOsvTiHIozQylgxUxaX0x21C5I62F9sV/Q0VRmValNTrqkkPM8gOpPpiw8wzXKOCeGknzKrWnpKdQgZt2kbnZVG5Y7mwwjDJ57TXBe1mKOicJQlc1z6/QpyXKv4NQGlEwmUOWVtGk2Pn54Wz1ENLCZqiaOCIc3kYKvzO2M+8U/+ILNKyR6fhukTLoOX2icCSYjzA/Cv1xVebZ7mvEFQZ80zCprW56p5C/yB2A9saEMVKjFyZXkk5S7ZqbN+13gjJZzDPncc8oNitKjTAf7ht9cLMg7SOFOJXEeXZvEZTt3coMbfXGQO9lQhhI4Kiw35DD1k2fmln7ytEU0ajbUnjv6Eb4KcGlaOhtk6k6Nm46DiieCe1UxyiEVLzw9aOc+IDzjY/ty9sXLlOc0OeUP2ugm1qNnQizofJh0P+DCVLww543HntfI447fHMNua5yuVi7U8sihDIzjZQoIBt1J8Q2Awa5EMcsewxDOqyur4Fy6glelWUd7UNZUZLG9gbG48Pxv5bv2JOIXxLxqkvCGb1fDQizFqSN0mlMhiSEFDpdbreS9/Dp2J62w98L5RWZJkNPQ1lf8AbHhiSNQsKxJEqqFCqBc225sSSfLlhjyng6pbhKvyiu00EdbGqaYpftEoYAfevIQAx8KgKAFVVA9pRldBNQUIjqK2evqGYvLUTAAux52UbKOgUbAD44ltVSIQgzaOqzWVsspG7mn/APV1H/0XzNuflthnrcvgs3D+R0ys5saupffux5FvP0GJdJGWhaONzFf8y8xfmR64inGHGWT9nWRqO7V6qUE09IrWaQ9XY8wt+bHc8hc4qyxb2aOLV/Siq8dL38v59L+ZtdX5D2bcOvWV8/ibYWAMtQ/6UX/AOZOMycfccZjxzxC1VVMY6eK6wU6tdYV8h5k9T19rDBPE/FWY8UZrLmWZ1BmmOygbJGv6UHRR/wBzfEaR7KD+Zt8XceNQVIo5MkssnObtsO2A029/XBo5csFxqbXP/wCY93pJtGAf6jy+A64ZYINgALtYDzOClrY4X1IokPKxUEfXA3pbgSSEyE8yeQxzu7XCgL8MRdk00cizWeCYSxU9PdDqBZL2OLK7Ou0msgzkGZVEwABCGwnTqpv18vXFa2WN1aR2UX5rzwPLiKfM0livZCTY7XTrb4b/AAwmcVJex+Objx4Zt6mroq/LoqyjdJI5kDxsxsCD5/50wCulpqOlFVWDvFiFi+m/4rX2+A+mK77G+JDW0VXktTIDNTOXQeh/Hb0vZv8AccWLmbUkWWS/bYu9piArR6NWq5AAt72wuLF5I7XQ1pn9TX08n8OpHexBjl03XSb9L8/AwtyBsOuHbLjWmjvmCxLUa22i/CF1HT9LYR/9RZVH3UUM6O8tmSNRp5sASeg3bfrz64TQ1Of18MRWGOhv3bOW9xrUXFx1AJHnvywYsUrQ5tUG9XmohH6KSIL/APJrnB0eT0qNqd6md/1Szu30vbC/HMK2IsvNN9cfjj/g28R5wnD/AAzmObuneCip3mCXtqIGw+JsMY9zziDMOI81qMwzKoM1TMbu3QDooHRRyAxpXtnz2jyns3zGkmYmozFBTwxrzuWBLHyAAOMrA2mYHqcWMa4K7CqtyInHso+OARDQveNv0AwNIHrJY4l1apHNgFLH5DBtRRx0mYvCyd8I/wAMi7qy2uCB7YNyS4OUG1YCNXmG4JH6bbf98KY4WZgqqSxNrcyflhVlkmTPVaMymkgQ7XQi4PzGJ7k01XkM0cnD6U2aQz7IlTAFmH+l02PzvhE8u3gt4sG5XZFpeF6zLMtWtzVGpVlNoIG2kmPnb8qjqfh1w309C00scKxFnY6VVdyxOJslDmXFOa1lVnEjUksAu4nUgRoPI8go+d+hxL+FOE6elnFcsLxxKPuDKLSOTzkI/LcbKOg9TivLPtXPZajpk2q6IzL2YRvw+01jFVIl9TG9z7eQxWccTwyxGRfErWa3vY/TGnqpQtBMCPCIzt6WxnQTI1W1owFZ3Kk8xc4HT5ZSuwtTigtu3glnZxnL5J2nZWzORDOBDLf4xk/scadq6SOspjBMLoSpIte9mDDn6jGS8j0N2o5ZC+6PMAfZiP8Ak41jlzyGhi703li+7c+bKdJPxtf44evBQyrkQJm2VJRy1tMYQ6l1XUuhma5YjfexLX+OFGUZk2ZrUy928aJKETUtrjQpJHmNRbBFDw5l9C6zGFZ549RWSRRdb9AALfHmd998OsTiWFJFvZlBHsRgrE0CwXPMtPTyTP8AhjUsbemB4JrVjegnWW/dmNtVudrXxBxnDt4z81XEkeThtTUaB6gg/wDnOAdPsi2A926k4qljd1Ym2pT87YeMxkruJOJqmaQa66undyHITxkk235eX0w1VNJVUmuCpglgmiO8cilWHwOLC44Bdjtwqs8uZdzSMUqHQhWUeJRe7Eeth9cSbL+FqKbiHLEUtKshTvixvdizEr8AhGIVk2az5Nm9FmNMoZ4GJKtycHYqfcHFw8H5rDxWs2bR0zU7UdbHrV2DGxRgTcf6/pilqHKLcl0auj+nKKjLtBuY8C09bl0kMMUS9+yySC1jqGrcHl+bl6DCTIOzWTLO7qBWEB5Qs9KyjQ0YWwaw21X326YsD7O6MStiCb6TgwpKyEBQpI5k3A+WKCzTrbZpyxY925LkZKf+HU2YyUdZVd59lKvCKhvCgIv7EjoTc8vfCnPc6NDC8VHPTiqH/uqXA9wN8GrTrl+VvR06akVGNnOrUbc2vzucQfiTgCatSleCofuYYlUwKSUBsdTWv1J57nbHR2yfLBkpRVpWHVvEfFE+TVcax5RWxtCwkNNM0cqJyJsdrm9hir5yTmcmuJoGVrmNuaWPI/LEh4h4fThOKjr8vq5aqnjTu6jvmZFllPIR38QI53FgAN8QqOomaSpeRzLK4F2Jv4nNz+5xoYoLlxMzPPlKSpkyyuHu+0LJ6razTxp8nvjVtPYS1QHLv2P0F/rfGVcvdp+NMmSMKSJoHt6mS2/zGNSVoqaXLZfsMZnqSTbkNyd238rk29sSnUbYjNG50vIfVSmGmdhu5GlB5sdgMGRRiKFIxuEUL8hbCSiikkWOap194g0ojqRo2tffmT+r5WwtwS55ESVfaECpVq96TS2tYll1dLFitvp9cCqIRUUs0DGwlRkJHS4t/fDdlXD9NlUssyyTTzyyNIzyN1JubAdPe+IN2s9qK8KU7ZNlEgbO5kuzgXFIhGzerkch05npc0rdIXddlPdrdHl+V9otUlBOpqZEWapij5QT/mAPLewf01b4c8nznLe1Cniynieoioc3p49FHWhP5p/S3p/T8R5YqkzyT1s08rs8pu7MzXYknck9ScGx3R1kU+G/MdMOcOCIyaHPiHh3NOE88GXZrTmFle8bjdJUPJlPUfseeJ12Q5jHQ5jW0kx+7q2VLHlcfhPxvb4jEh4JNTxlwoG4ogizCko3eKm79NRIsNTb9Ryv6HHhwBTQM1dkdcrU8hDrBI4IG1iFf1Ftj1A3xQz5oyvG+zV02CUayLosVF0qFuSByvgsVELNoEqhuVibH5YZuHM8NYrUFYxFbBceLYyqOv8AqHUfHrh7liWYDWL2898ZzVGmvZxYSjNdtQItYjf54TVBeIEsAY1F73AsPW+2O1NXQ5NRGasq4qWnW51zSWHsL/sMVLx/2oQ5tRSZPkesU0vhnqWGkyj9CjmFPUnc8rAc2Y8MsjpCsmojhVsbO0TiOmzXNFRZPtCQ/wAmNT4VHmx8yeg6ADEMgDd3JUO3I6z/AFHoPn+2AU1PLUy2iQsSdtI6YmtBwLmVRkC5o8AjpAfu2Y/z5OWhAN20jUSeQsd9sasYrHHajHnN5Zb2PPZtwxW5vxNRZmFK01HUU8bMRs7ghtA9grMfID1GNN4YcnyGm4dyujgi+9lp4xDELBFDEeIgDqbEljc/theZg0ojmqh3tj4EbSNrX25/mHM9RgfwKf3Oxa8iRC7uqD+o2wFKiGVtMcqOfIMCcNdVWZflkHfTFQpVmBVdRIUXP+edseoMwhziKR4oZliUjQ8iadYP5l6/scTydUerHSeeKmppKiolSGGJS7yOwVUUcySdgMY046z+PP8AtDzrM6NzPTT1TGKSxsUFlU79LKMJ814w4jzqnemzXOa6shk/EktQzRtvcXXlz9MMrGVNwxKjmp3xYhDaV27BKqLKzWAEnl0OB0MEtTVpRxKWlmYIg82PLBYdJAUI0kjl/fD72e1i0naHlbSoHPfd3Y/1KRcfPEzbjFtB44qU1F+S9qXJJKbg6LI6GV6YLT9y1Vp5EjxMo6kknntvgzKMiyzJaGKlooJKoxqEMkja2I9WO3wGF0NpI071TNI1zoPIYUDvnisAkA8h4iP2GPPbm7PT7FFqvA3VfDK5xUA02YCjzNW1Ut1CiQgfh1j82xsTzFxvviveJu0bPMmoKymkqIoK6nbuWTuAkyvy3BuBbncDfpib8R5rTZRw9NmEspnhp3RmAsxfxgW+p+W2Kp444bjqE/6syjMJK/La6TVM0sheWGQ9GJ3K9ATuDscXtPCOSK3Loz9Vknik1F3f+EDqs3zHN6kTVtTUVU5O8khLn4eXwwYsWjeZirD8i2LH/jAKjMHiQw0zMGO2q+5wfl+XM9lb8I8crnoOZJxpNUvgyVbfywyoqnjjjREkiRyblX3NgNifji8uxHMMvzLLKjJKvSKiWncUzsxYoh2kRQdhvZttz15Yo6yzcOSyEFnWpDBSbbODtfpyxO+FuIUo+JqOvipUp4oWimmkhQ2hGlVdrX3Y2NxyJJ5XwqXCHJOV/g027yMKUyqVcEq/kW08x6bHDNxDTZOjx1maLcSNFCADYtZid7bkDUb+w64Sy8e8IToKw8RrAGWwVgwMfupW49fPDvRVlDndJBV0qxZjT31Rzw6ZE1Da4vuD9RhadMirikNzTGlyzLjkOVJV07AvDrJGjcEi7AkFgz+L063sXWhnr5ndqulSBCAU8YLDncG3+3CpROdlgVANgXcD6C+BfZHk/ny3XqkY0g+55/tibIpLtmHjyNhvguJhIv8AUMHgbcsEBNMhA2J3XFoRQXJGH2tZhy9Dg/Jag0vEGX1V7PDURt7gMMEyEg6gNj9PTAWGpkmj3IIJt53xz5VHR4aZq+JAJQw2IuMM/FKSSR0yeIRlmJANtRA2B8xzw80h1Qox5lQfphs4rrIMuyGfMJgWWjHfBRzY8gPiSBjzkVzSPVtpcsp/i/iOGm4dg4SyiVZoIlU1Erm+4OoIp6WPP5eeIfS5rW5ZDNHDJJElQhjljO6SKeYKnY4RPNJNM0su8jkux8yTc4UwaZl0Fyp8juMegx41jjR5rLleWe79AaWjAtLItv0r5epwbVVrLA1HBzlP3jDqPL2wbLGIYwJJL+Q3wnaaCOzpSxAgWubm/wAL4LsDoNkqFjyTuguvvpxb1Cj/AJIw+ZZOkPC+cq0mh+7ubct9hiOKXnniaY+ioOSre/74XTyiDLHh/PVsL36Rqb/U/tgJRvgZCdO/QjjWSpcU7Mxh/EVYkj3tiZcKcZZpwvU/Z8qrGolcglYwDG5HRkNxy67HEVjBp6YnbvJPoMJkLB9YO4N8E1uAT2mluDO2mnzjPosizmCKnqpCEjqYriNmPIMp/DfbcEi56YtbGKszkiizqmmj1K/3Zup6EY1B2dcew8V0H2KrKw5xSp97HfaZRt3q/wBx0PoRhNcIKcaboyUG0yehx2oi1RhtVmHI+uPS+EBrXt6YErrJCQTfbDxQShVnMbCxI1W/f+2HTg/KlzXjSgy+QExSSa3t5KNR+drYR5JkmZcQ5mKLLKcz1UYLnxBVVBsSzHYDfFw8CcCDIFpM5q1vVCOZJiraxGS1gRbbTpG58z5YVmntg67H6eG/Ir6LEiTQgU8xirO2PiSWnp4cjhGn7TaWZr76FbZfiR9MWqCGW99ud8Z+7Wnln4/rAY3EUKRxRMRYOFXxEHr4i3xxmaSClkV+DW1mRwxOvJDTGDJpI2bcY8KaQNsbjzJ5YEbvRBktriNz6jrg2KRKmLQSVYfMHG1Zg0JpJza0jK7ryCtfAqZC7meYAKNkXp74UCkMrWlVAP1qbXxydqeMrEZGboFUC9v7Yiya8sHTMgd6l1uANKDzwU8jSVCu41Md7fQYNdrRanAREHhUflH/ADgujXXDJO4O8ige1jiPYXoOlJZtzfAAtk98DsSb4Wx5bU1Yp4qaFpJJWKIo5s1r2GIclFckqLl0IKmYz10QtuqovyGJtR19TQVFNm+XStBU07CRJE52/v7dRcYgukrmEhIIMYsR68sSnLs0pafJou9Yh0BXQBck+mFZFwmh+FptqR//2Q==',
    male: 'data:image/jpeg;base64,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'
  };

  function teacherPortraitUrl(choice) {
    return teacherPortraits[choice] || '';
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

    const avatar = teacherPortraitUrl(choice);

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
      persona.textContent = '● ' + role;
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