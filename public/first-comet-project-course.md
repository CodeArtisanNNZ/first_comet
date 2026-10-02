# First Comet — Build a Project

From an empty folder to a live project.

Build Comet Resources, a small learning-resource website. Follow the numbered subjects, or open a subject you need. Student offers, databases, and a custom domain are optional for a first static site.

Service details checked 2 October 2026. Read each provider’s current official documentation before applying, claiming an offer, or configuring a service.

Lessons are text for practice in your own editor and accounts. The website records browser-local progress after a correct check and your practice confirmation; it does not run or automatically grade your work.

## The project-building order

1. Create a project — Choose one useful result
2. Use VS Code — Edit, run, and understand your files
3. Learn the code — HTML → CSS → JavaScript
4. Learn Git — Record changes without losing your place
5. Use GitHub — Push, review, and organize repositories
6. Student benefits — Apply, claim offers, and understand the terms (optional)
7. Free databases — Learn data, tables, SQL, and free-plan limits (optional)
8. Connect a database — Read saved data from a real project (optional)
9. Publish the project — Connect the repository to a host
10. Domains and DNS — Give the live project a readable address (optional)

## How the pieces connect

| From | To | How it connects |
| --- | --- | --- |
| Editor | Your project folder | VS Code opens and edits its files. |
| Local Git | GitHub repository | A remote URL and authenticated push upload commits. |
| GitHub repository | Website host | A configured Git integration or Pages source deploys the chosen branch. |
| Website | Database | A restricted API or an authorized backend reads and writes allowed data. |
| Custom domain | Website host | The host-domain setting and DNS send visitors to the live project. |

## Choose storage for the requirement

| Choice | Where data lives | When it helps | What you manage |
| --- | --- | --- | --- |
| No database | Fixed content in the site files | Simple portfolio or first static version | Edit, commit, and deploy content changes. |
| SQLite | A local file used by a program | Local Python learning and small local applications | Manage the file, access, and backups; online use needs a running app and persistent storage. |
| Supabase Free | Hosted Postgres and a configured Data API | Cloud learning with shared records | Read current storage/traffic limits, inactivity rules, grants, and row policies. |

## 01 · Create a project

Understand what a project is. Pick a small website and know what belongs in its folder before installing lots of tools.

Your result: A simple plan and a clean project folder for Comet Resources.

### Word library

#### Project

A set of files that work together to make one useful thing.

```text
comet-resources/
```

Read it as: One folder holds the files for this learning website.

#### Feature

Something the project lets a person do.

```text
See a list of learning resources.
```

Read it as: Choose one small action your visitor needs.

#### Frontend

The part a visitor sees and uses in the browser.

```text
index.html + styles.css + main.js
```

Read it as: Structure, appearance, and page behavior.

#### Backend

Code running on a server that handles requests and protected work.

```text
Browser asks an API for saved resources.
```

Read it as: A backend can read a database and send an answer.

#### Database

A place to keep organized data so you can retrieve it later.

```text
resources: id, title
```

Read it as: Save entries separately from the page layout.

#### Stack

The tools and languages you choose for a project.

```text
HTML + CSS + JavaScript
```

Read it as: A first website can use just these three.

#### Folder

A container for related files.

```text
comet-resources/assets/
```

Read it as: Keep pictures in the assets folder.

#### File extension

The ending of a filename that helps identify its kind.

```text
index.html
```

Read it as: .html means this file contains HTML.

#### Localhost

A name that points to the computer you are using.

```text
http://localhost:8000
```

Read it as: A local server lets you preview your own work.

#### Static website

A site served as prepared HTML, CSS, JavaScript, and other files.

```text
A portfolio or learning-resource page.
```

Read it as: Browser JavaScript can still fetch data from an external API.

### Text lessons

#### Lesson 1: Pick one useful result

Your result: Describe the first version in one sentence.

Our example is Comet Resources: a small website that shows learning titles. First make it work with one hard-coded title. Add a database only after the page works.

A first version does not need accounts, payments, an admin panel, or several programming languages.

Words to know: Project, Feature, Stack

Follow the small steps:

1. Write who the website helps.
2. Choose one feature.
3. Write a visible condition for “done”.

**Write this in your project notes**

```text
User: a beginner developer
Feature: see learning resources
Done: the page shows a heading and a resource title
```

What you should see:

A short plan you can explain to another person.

Your turn: Write the same three lines for your own project.

Check: What is a good first feature?

1. Build every feature at once
2. Show one useful list
3. Install every programming language

Hint: Pick the answer that gives you a small result you can finish.

Answer: 2. One small visible result is easier to build and check.

#### Lesson 2: Understand the project parts

Your result: Tell the editor, code, repository, host, database, and domain apart.

VS Code edits files. Git records changes. GitHub stores a remote repository. A host serves the running website. A database stores data. A domain is the name people type to reach the host.

A repository can trigger a host to deploy your files. The domain points to that host; a database is accessed by the application.

Words to know: Frontend, Backend, Database, Static website

Follow the small steps:

1. Start with the frontend.
2. Add an API or database only when saved shared data is needed.
3. Keep deployment and domain setup for later subjects.

**The job of each part**

```text
VS Code: edit
Git: remember changes
GitHub: share the repository
Host: serve the website
Database: store data
Domain: name the live website
```

What you should see:

You can name what each service contributes.

Your turn: Explain which parts a one-page portfolio needs.

Check: Where does a custom domain send a visitor?

1. To the website host
2. To your local Git staging area
3. To VS Code on your laptop

Hint: Think about what must answer a browser request.

Answer: 1. DNS connects a name to a host that serves the website.

#### Lesson 3: Give the project a clean home

Your result: Create a folder with predictable filenames.

Create a folder called comet-resources somewhere you can find again, such as your Documents projects folder. In the next subject, open that folder in VS Code.

Use lowercase names and avoid spaces in website filenames. These are useful conventions, not requirements for every language.

Words to know: Folder, File extension, Localhost

Follow the small steps:

1. Create the project folder.
2. Plan index.html, styles.css, and main.js at its root.
3. Create assets/ for pictures if you need it.

**Files we will create**

```text
comet-resources/index.html
comet-resources/styles.css
comet-resources/main.js
comet-resources/README.md
comet-resources/assets/
```

What you should see:

One project folder, with a place for each kind of file.

Your turn: Create the folder and record its location.

Check: Which file will hold the page structure?

1. styles.css
2. index.html
3. main.js

Hint: The filename ending identifies the language.

Answer: 2. HTML describes the content and structure.

Official references:

- [VS Code: editor basics](https://code.visualstudio.com/docs/getstarted/userinterface)
- [GitHub: Hello World](https://docs.github.com/en/get-started/start-your-journey/hello-world)

## 02 · Use VS Code

Learn the editor’s main parts, create the starter site, preview it locally, and recognize the Source Control buttons.

Your result: A working page in your browser and a VS Code workspace you understand.

### Word library

#### Editor

A tool for writing and changing source files.

```text
VS Code
```

Read it as: The editor does not automatically supply every language runtime.

#### Workspace

The folder or folders currently open in the editor.

```text
File → Open Folder → comet-resources
```

Read it as: VS Code sees these files as your current work.

#### Explorer

The panel that lists your open folder’s files.

```text
Explorer → New File → index.html
```

Read it as: Create or select a file here.

#### Activity Bar

The strip of icons for switching between editor tools.

```text
Explorer · Search · Source Control · Run · Extensions
```

Read it as: Each icon opens a different tool panel.

#### Command Palette

A search box for editor actions.

```text
Ctrl+Shift+P / Cmd+Shift+P
```

Read it as: Type an action such as Publish to GitHub.

#### Terminal

A panel where you type commands for a command-line program.

```text
Terminal → New Terminal
```

Read it as: Commands run on your computer in the terminal’s current folder.

#### Runtime

The program that executes a language’s code.

```text
Browser for page JavaScript; Python for .py files.
```

Read it as: Installing an editor is different from installing a runtime.

#### Extension

An add-on that gives the editor extra features.

```text
Extensions → search → check publisher → Install
```

Read it as: Install an extension for a real need, rather than collecting many.

#### Problems

A panel listing detected errors and warnings.

```text
View → Problems
```

Read it as: These hints help you find a filename and line to inspect.

#### Breakpoint

A place where a debugger pauses execution.

```text
Click beside a JavaScript line number.
```

Read it as: Pause and inspect what the program knows at that moment.

#### Source Control

The editor panel for reviewing and recording Git changes.

```text
Changed file → diff → stage → commit
```

Read it as: This is a view over Git, not a separate version-control system.

#### Publish Branch

Upload a local branch to a remote for the first time.

```text
Source Control → Publish Branch
```

Read it as: After a remote exists, publish the new branch’s commits.

#### Sync Changes

An editor action that pulls remote changes and then pushes local commits.

```text
Source Control → Sync Changes
```

Read it as: Review incoming and outgoing changes before using it.

#### Diff

A view showing the difference between two file versions.

```text
Red: removed lines. Green: added lines.
```

Read it as: Read the actual changes before you stage them.

### Text lessons

#### Lesson 1: Open a folder and find the editor parts

Your result: Recognize where files, commands, and settings live.

Install the desktop VS Code from its official website. Open File → Open Folder and choose comet-resources. The Explorer lists files; the middle area edits a selected file; the bottom panel can show a terminal or Problems.

First Comet’s browser VS Code workspace is useful for practice, but desktop VS Code is the tool used for the local-folder and Git steps here.

Words to know: Editor, Workspace, Explorer, Activity Bar

Follow the small steps:

1. Download VS Code from code.visualstudio.com.
2. Open your project folder.
3. Find Explorer, Search, Source Control, and Extensions in the Activity Bar.
4. Trust folders only when you understand their source; extensions or tasks may run code.

**Three places to remember**

```text
Explorer: choose files
Editor: change the selected file
Terminal: run a command in the project folder
```

What you should see:

Your project folder appears in Explorer.

Your turn: Create a new empty index.html file from Explorer.

Check: Where do you find the files in the open folder?

1. Explorer
2. A GitHub issue
3. DNS settings

Hint: Look for the panel used to choose files.

Answer: 1. Explorer shows the files in your workspace.

#### Lesson 2: Write your first three files

Your result: Create a complete starter website.

Create index.html, styles.css, and main.js. Paste each example into the matching file and save with Ctrl+S, or Cmd+S on macOS. The HTML links the CSS and loads JavaScript with defer, so the page elements exist before main.js uses them.

A small dot on an editor tab usually means the file has unsaved edits. A file must be saved before the local server can serve its latest content.

Words to know: Explorer, Editor, Runtime

Follow the small steps:

1. Put the HTML below into index.html.
2. Put the CSS below into styles.css.
3. Put the JavaScript below into main.js.
4. Save all three files.

**index.html · replace the empty file**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Comet Resources</title>
  <link rel="stylesheet" href="styles.css">
  <script src="main.js" defer></script>
</head>
<body>
  <main>
    <h1>Comet Resources</h1>
    <p id="status" role="status">Ready to learn.</p>
    <ul id="resources"></ul>
  </main>
</body>
</html>
```

**styles.css**

```css
body {
  margin: 0;
  padding: 24px;
  font-family: system-ui, sans-serif;
  color: #201a22;
  background: #fff5df;
}
main { max-width: 680px; margin: auto; }
h1 { color: #c53619; }
li { margin: 12px 0; }
```

**main.js · the local starter**

```javascript
const status = document.querySelector("#status");
const list = document.querySelector("#resources");
const item = document.createElement("li");
item.textContent = "Learn HTML, CSS, and JavaScript";
list.append(item);
status.textContent = "My first project works!";
```

What you should see:

The page will show Comet Resources, a learning title, and “My first project works!”.

Your turn: Change the heading and one color. Save both changed files.

Check: Why does the HTML use defer on its script?

1. To buy a domain
2. To let HTML finish parsing before the script runs
3. To upload a commit

Hint: Think about when the page elements are available.

Answer: 2. The script needs #status and #resources to exist before it selects them.

#### Lesson 3: Use the terminal and preview locally

Your result: Open the website through a local server.

The terminal is a command tool inside the editor. Confirm it opened in comet-resources before running anything. Install Python 3 for this preview method; VS Code by itself does not install Python.

Run only one of the commands below, depending on your system. This starts a development file server bound to your own computer. Leave that terminal open while previewing; Ctrl+C stops the server.

Words to know: Terminal, Runtime, Command Palette

Follow the small steps:

1. Choose Terminal → New Terminal.
2. On Windows with the Python launcher, use the first command. On macOS/Linux use the second.
3. Open http://localhost:8000 in your browser.
4. Edit, save, and refresh to see a change.
5. If port 8000 is occupied, change both the command and the browser address to 8001.

**Windows · terminal, inside comet-resources**

```shell
py -m http.server 8000 --bind 127.0.0.1
```

**macOS/Linux · terminal, inside comet-resources**

```shell
python3 -m http.server 8000 --bind 127.0.0.1
```

What you should see:

Your starter page opens at http://localhost:8000.

Your turn: Change the JavaScript message, save, and refresh the browser.

Check: Where should the terminal be before starting this server?

1. In the folder containing index.html
2. In the domain registrar
3. In any unrelated folder

Hint: The server must be able to find your website files.

Answer: 1. The server serves files from its current folder.

#### Lesson 4: Search, read errors, and debug

Your result: Find a problem without rewriting the whole project.

Use Ctrl+F / Cmd+F to find text in one file. Use Ctrl+Shift+F / Cmd+Shift+F to search the workspace. View → Problems lists editor diagnostics. The browser Console shows runtime errors; Network shows file and API requests.

For desktop browser debugging, open the Command Palette, choose Debug: Open Link, and open your local URL. Supported browser debugging can pause at breakpoints in your JavaScript.

Words to know: Problems, Breakpoint, Command Palette, Extension

Follow the small steps:

1. Read the first useful error and its filename/line.
2. Check spelling of filenames and element IDs.
3. Place a breakpoint beside the status.textContent line.
4. Refresh the debug browser and inspect the status variable.
5. Fix one thing, save, and try again.

**A common mismatch**

```text
HTML: <p id="status">...</p>
JavaScript must select: "#status"
"#stats" would not find that element.
```

What you should see:

You can explain an error and check one possible cause.

Your turn: Temporarily misspell an element ID, observe the Console error, then fix it.

Check: What should you inspect first for “cannot set properties of null”?

1. Whether the selected element exists and its ID matches
2. Your domain’s renewal price
3. Your GitHub stars

Hint: Compare the selector with the HTML.

Answer: 1. A selector that finds no element returns null.

#### Lesson 5: Understand the Git buttons in VS Code

Your result: Know what stage, commit, push, and sync do.

Source Control shows Git changes when Git is installed and the folder is a repository. Click a changed file to read its diff. The plus button stages a change; Commit records the staged snapshot on your computer.

Publish to GitHub creates a remote repository and uploads local commits. Publish Branch uploads a branch to an existing remote. Push uploads commits; Sync Changes combines pulling and pushing. We will perform the full workflow after the Git and GitHub lessons.

Words to know: Source Control, Diff, Publish Branch, Sync Changes

Follow the small steps:

1. Open Source Control.
2. If the folder is not yet a repository, leave initialization for the next subject.
3. Read each button’s label or tooltip.
4. Remember that Commit and Push are different actions.

**Read the buttons as a sentence**

```text
Stage: choose this change
Commit: remember this chosen snapshot locally
Push: send local commits to the remote
Sync: bring remote changes in, then send local commits
```

What you should see:

You can explain the buttons before using them.

Your turn: Say which two actions are needed to record an edit and upload the recorded change.

Check: Does clicking Commit alone upload changes to GitHub?

1. Always
2. No, pushing or publishing is a separate action
3. Only for CSS files

Hint: Remember the difference between local history and the remote.

Answer: 2. A commit is local until you push it.

Official references:

- [VS Code: editor basics](https://code.visualstudio.com/docs/getstarted/userinterface)
- [VS Code: integrated terminal](https://code.visualstudio.com/docs/terminal/basics)
- [VS Code: browser debugging](https://code.visualstudio.com/docs/nodejs/browser-debugging)
- [VS Code: first commit and publish](https://code.visualstudio.com/docs/sourcecontrol/quickstart)

## 03 · Learn the code

Use the existing language word libraries and eight milestones per track. Learn just enough to understand and improve the starter site.

Your result: A page whose structure, style, and behavior you can explain.

Use the separate First Comet Beginner Code Course: HTML → CSS → JavaScript for a website, and one backend language later if needed. It includes Java, Python, and PHP alternatives, dictionaries, milestones, comparison tables, and binary search.

[Open the code course](first-comet-course.md)

## 04 · Learn Git

Understand Git’s moving parts, make your first commit, use a branch, and learn how local history reaches a remote.

Your result: A repository with a readable commit history and a safe feature-branch habit.

### Word library

#### Git

The version-control program that records project history.

```text
git status
```

Read it as: Git can work locally without a GitHub account.

#### Repository

A project tracked by Git, with its recorded history.

```text
comet-resources/.git/
```

Read it as: The hidden .git folder holds Git’s metadata; do not edit it manually.

#### Working tree

The project files you are currently editing.

```text
Edit main.js in VS Code.
```

Read it as: An edit changes the working tree before it enters a commit.

#### Untracked

A file Git has not started recording yet.

```text
git status: Untracked files
```

Read it as: Stage the file if it belongs in the repository.

#### Staging area

The selected changes planned for your next commit.

```text
git add main.js
```

Read it as: Choose this file’s current changes for the snapshot.

#### Commit

A saved snapshot of staged changes with a message and an ID.

```text
git commit -m "Add resource list"
```

Read it as: Record a small meaningful result locally.

#### Branch

A movable name for a line of commits.

```text
git switch -c feature/resource-list
```

Read it as: Work on a feature separately from main.

#### HEAD

A reference to what you currently have checked out.

```text
git log --oneline -1
```

Read it as: Usually HEAD follows the current branch’s latest commit.

#### Remote

A named address for another copy of the repository.

```text
origin → https://github.com/USERNAME/comet-resources.git
```

Read it as: origin is a common nickname; it is not a special GitHub password.

#### Push

Send local commits to a remote branch.

```text
git push origin main
```

Read it as: Uncommitted edits do not travel in a push.

#### Fetch

Download remote history without merging it into your working branch.

```text
git fetch origin
```

Read it as: Look at incoming commits before integrating them.

#### Pull

Fetch remote changes and integrate them into the current branch.

```text
git pull --ff-only
```

Read it as: This option refuses a merge when the histories have diverged.

#### Merge

Combine changes from one line of history into another.

```text
Merge a reviewed pull request.
```

Read it as: Git may need you to resolve overlapping edits.

#### Conflict

A situation where Git needs a person to choose how changes combine.

```text
<<<<<<< ... ======= ... >>>>>>>
```

Read it as: Read both versions, edit the final intended text, and remove markers.

#### .gitignore

Patterns for files Git should not start tracking.

```text
.env
node_modules/
*.db
```

Read it as: Ignored files already tracked remain tracked until deliberately removed.

#### Upstream branch

The remote branch associated with your local branch.

```text
git push -u origin main
```

Read it as: -u remembers where later pushes and pulls should go.

### Text lessons

#### Lesson 1: Initialize Git and set your commit identity

Your result: Turn the existing project folder into a repository.

Install Git from git-scm.com. Reopen VS Code so its terminal can find Git. Run git --version to check. These commands belong in the terminal inside comet-resources, not inside a source file.

The name and email below label your commits; they do not sign you in to GitHub. Replace the placeholders. You can use your GitHub-provided noreply address if you want to avoid publishing your personal email.

Words to know: Git, Repository, HEAD

Follow the small steps:

1. Check that this is your project folder.
2. Check Git’s version.
3. For a folder not yet tracked by Git, initialize it with main as the first branch.
4. Set your name and email for this repository.
5. If VS Code already initialized this repository, skip git init and inspect git status instead.

**Terminal · replace the author placeholders**

```shell
git --version
git init -b main
git config user.name "YOUR NAME"
git config user.email "YOUR COMMIT EMAIL"
git status
```

What you should see:

git status names the main branch and lists your untracked starter files.

Your turn: Run git status and identify the branch name.

Check: What do user.name and user.email configure?

1. Your GitHub password
2. The author label on commits
3. Your database connection

Hint: These details appear in the recorded history.

Answer: 2. Commit identity is separate from account authentication.

#### Lesson 2: Choose files and make a first commit

Your result: Review, stage, and record your starter site.

Write a short README.md and a .gitignore before the first commit. Stage only the files you intend to share. git diff --cached shows the selected snapshot; read it before committing.

git add chooses changes. git commit records those changes. Saving a file in VS Code is an earlier action and does not create a Git commit.

Words to know: Working tree, Untracked, Staging area, Commit, .gitignore

Follow the small steps:

1. Create the ignore file below.
2. Write README.md with the project purpose and local-preview instructions.
3. Stage the named project files.
4. Review the staged diff, then commit.
5. Run git status again.

**.gitignore · project file, not a terminal command**

```text
.env
.env.*
!.env.example
node_modules/
.venv/
__pycache__/
*.db
*.db-*
```

**Terminal · record the starter**

```shell
git add index.html styles.css main.js README.md .gitignore
git diff --cached
git commit -m "Create learning resource website"
git status
```

What you should see:

Git reports a commit and then a clean working tree if no other files changed.

Your turn: Change the resource title, review its diff, stage main.js, and make a second descriptive commit.

Check: Which changes does git commit normally record?

1. All files on your computer
2. The staged changes
3. Only changes already on GitHub

Hint: The staging step chooses the snapshot content.

Answer: 2. The staging area determines the next snapshot.

#### Lesson 3: Read status, diffs, and history

Your result: Know what changed before sending it anywhere.

git status is your starting point. git diff shows unstaged changes; git diff --cached shows staged changes. git log --oneline shows short commit IDs and messages.

A good message describes a result, such as “Add resource list”, instead of “changes”. Keeping commits small makes later reviews and fixes easier.

Words to know: Working tree, Staging area, Commit, HEAD

Follow the small steps:

1. Edit one sentence in README.md.
2. Inspect status and the unstaged diff.
3. Stage README.md and inspect the staged diff.
4. Commit only when the snapshot matches your intention.
5. Look at the recent history.

**Terminal · inspection commands**

```shell
git status
git diff
git diff --cached
git log --oneline -5
```

What you should see:

You can identify unstaged edits, staged edits, and existing commits.

Your turn: Explain your latest two commit messages and what each changed.

Check: Which command shows the staged diff?

1. git diff --cached
2. git push
3. git init

Hint: Look for the command that reviews the staging area.

Answer: 1. The cached diff compares the selected snapshot with the last commit.

#### Lesson 4: Use a branch for one feature

Your result: Make an isolated line of work.

Begin with a clean working tree on main. A branch gives your feature a name while you build it. The branch is not a second folder; switching changes which tracked file versions Git checks out.

After the feature works, commit it on this branch. In the GitHub subject we will push the branch and open a pull request to review and merge it.

Words to know: Branch, HEAD, Merge

Follow the small steps:

1. Check status and finish any existing edits.
2. Switch to main.
3. Create feature/resource-list.
4. Edit one small feature, preview it, and commit it on this branch.

**Terminal · create the feature branch**

```shell
git status
git switch main
git switch -c feature/resource-list
git branch
```

What you should see:

git branch marks feature/resource-list with an asterisk as the current branch.

Your turn: Make and commit one small list improvement on the feature branch.

Check: What does a branch mainly name?

1. A separate GitHub account
2. A line of commits
3. A domain record

Hint: Think about project history, not a physical folder.

Answer: 2. Branches let you develop and review work separately.

#### Lesson 5: Understand remote, fetch, pull, and push

Your result: Explain how your local repository communicates with another copy.

origin is the usual nickname for the GitHub repository address. Fetch downloads history. Pull fetches and integrates it. Push uploads commits. A remote does not automatically receive your unsaved or uncommitted edits.

Use git pull --ff-only when your current branch has an upstream and the working tree is clean. If it refuses because histories diverged, stop and inspect; do not force-push to make the error disappear.

Words to know: Remote, Fetch, Pull, Push, Upstream branch

Follow the small steps:

1. We will add the actual remote in the next subject.
2. Use git remote -v to inspect configured addresses.
3. After a remote exists, fetch and inspect before integrating unexpected changes.
4. Commit changes before pushing them.

**Terminal · inspection now; network commands after setup**

```shell
git remote -v
git status
# After a remote and upstream exist:
git fetch origin
git pull --ff-only
git push
```

What you should see:

You can tell which direction each operation moves history.

Your turn: Say which operation uploads commits and which only downloads remote history.

Check: Which action uploads local commits?

1. Fetch
2. Push
3. Stage

Hint: Think local → remote.

Answer: 2. Push sends commits to the remote.

#### Lesson 6: Handle a conflict calmly

Your result: Know what to inspect when two edits overlap.

A conflict means Git cannot decide the final content for you. git status names the affected files. VS Code’s merge tools can help show incoming and current text. Read both versions and keep the final intended result.

If a merge is in progress and you want to return to the pre-merge state, git merge --abort is for that merge operation. It is not a general undo command. Never use reset --hard, clean, or force push as a beginner conflict shortcut.

Words to know: Conflict, Merge, Staging area

Follow the small steps:

1. Read git status to identify the operation and conflicted file.
2. Open the file and compare both versions.
3. Edit the final text and remove conflict markers.
4. Preview or test the result.
5. Stage resolved files and follow Git’s instructions to finish the merge.

**Example markers · edit the file, do not run this**

```text
<<<<<<< HEAD
Learn HTML
=======
Learn HTML and CSS
>>>>>>> feature/resource-list
```

What you should see:

A resolved file contains the intended final text and no conflict markers.

Your turn: On paper, choose the final text for the example and explain why.

Check: What should you do first when Git reports a conflict?

1. Force push immediately
2. Read status and compare the conflicting changes
3. Delete the repository

Hint: Find the affected file and the two versions.

Answer: 2. Understand the conflict before choosing the final content.

Official references:

- [Git: the beginner book](https://git-scm.com/book/en/v2)
- [Git: working with remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)
- [VS Code: first commit and publish](https://code.visualstudio.com/docs/sourcecontrol/quickstart)

## 05 · Use GitHub

Create a remote repository, push from the terminal or VS Code, understand GitHub’s tabs, and keep projects easy to find.

Your result: Your project on GitHub with a useful README and a reviewed feature branch.

### Word library

#### GitHub

An online service that hosts Git repositories and collaboration tools.

```text
github.com/USERNAME/comet-resources
```

Read it as: Git records history; GitHub hosts a shared remote copy.

#### Public repository

A repository anyone can view.

```text
Visibility: Public
```

Read it as: Assume the code and history can be read by everyone.

#### Private repository

A repository visible to permitted people.

```text
Visibility: Private
```

Read it as: The visibility of a deployed website is a separate decision.

#### Clone

Create a local Git copy of a remote repository, including history.

```text
git clone https://github.com/USERNAME/comet-resources.git
```

Read it as: Use clone when starting from an existing remote; initialize when starting from your own local folder.

#### Fork

A repository copy on GitHub associated with another repository.

```text
Fork a project into your GitHub account.
```

Read it as: Useful for proposing changes when you cannot push to the original.

#### README

The project’s front-page explanation, usually in Markdown.

```text
README.md: what it does, how to run it, live URL.
```

Read it as: Help a new person understand and start the project.

#### Issue

A discussion item for a bug, task, or feature request.

```text
Issue: resource list is empty on mobile.
```

Read it as: Describe the problem and how to reproduce it.

#### Pull request

A proposal to merge a branch, with a place to review its changes.

```text
feature/resource-list → main
```

Read it as: A pull request is different from the git pull command.

#### Actions

GitHub’s area for automated workflows and their logs.

```text
A test or Pages deployment run.
```

Read it as: Check success, failure, and logs for the specific commit.

#### Release

A named published version, usually associated with a Git tag.

```text
v1.0.0: first working site
```

Read it as: Release notes describe what users receive in that version.

#### Topic

A searchable label attached to a repository.

```text
html · css · beginner-project
```

Read it as: Topics describe the project; they are not folders.

#### Organization

A shared GitHub account space for teams and their repositories.

```text
A class or team owns several repositories.
```

Read it as: You do not need an organization for one personal learning project.

#### Star

A bookmark and appreciation signal for a repository.

```text
Star a repository you want to find later.
```

Read it as: It does not clone the files or subscribe to all notifications.

#### License

Terms that explain what others may do with your code.

```text
A LICENSE file with terms you have chosen.
```

Read it as: A public repository is not automatically permission to reuse everything.

#### Authentication

Proving which account is making a request.

```text
VS Code opens GitHub sign-in in a browser.
```

Read it as: Git commit author details do not authenticate a push.

#### PAT

A personal access token used for supported GitHub authentication.

```text
A token with repository access and limited permissions.
```

Read it as: Use a credential manager or approved sign-in; never paste a token into project files or a URL.

### Text lessons

#### Lesson 1: Create the matching GitHub repository

Your result: Give your local history a remote home.

Our project already has local commits. On GitHub, create a new repository named comet-resources. Choose visibility deliberately. Leave “Add README”, .gitignore, and license initialization unchecked for this route so the new remote starts empty.

If you instead start with an existing GitHub repository, clone it and work inside that clone. Do not mix the empty-remote route with a separately initialized remote history.

Words to know: GitHub, Public repository, Private repository, Clone

Follow the small steps:

1. Sign in to your own GitHub account.
2. Use New repository and choose a name and visibility.
3. For this already-committed local project, create an empty remote.
4. Copy its HTTPS repository URL.

**Replace USERNAME with your own account**

```text
https://github.com/USERNAME/comet-resources.git
```

What you should see:

GitHub shows setup instructions for an empty repository.

Your turn: Confirm the repository name, visibility, and copied URL.

Check: Why leave GitHub’s README initialization unchecked here?

1. The local project already has its own history and README
2. GitHub cannot store Markdown
3. Public repositories cannot have READMEs

Hint: Think about the commits that already exist locally.

Answer: 1. An empty remote avoids starting a second unrelated first history.

#### Lesson 2: Connect origin and push your first version

Your result: Upload the main branch to your own repository.

In the project terminal, inspect status and remotes. If origin does not exist, add your GitHub HTTPS URL. If origin already exists, inspect it and use that existing setup instead of adding it again. Switch to the main branch with a clean working tree, then push it.

GitHub does not accept your account password for HTTPS Git operations. Use VS Code’s browser sign-in or Git Credential Manager, or the official PAT/SSH setup if you choose those methods. Never put credentials into the URL.

Words to know: Authentication, PAT, GitHub

Follow the small steps:

1. Confirm you committed the starter files.
2. Inspect git remote -v.
3. Add origin only if it is absent, replacing USERNAME.
4. Switch to main and push with -u.
5. Refresh the GitHub Code tab to verify files and the commit message.

**Terminal · first push to an empty remote**

```shell
git status
git remote -v
# Run the next line ONLY if origin is absent:
git remote add origin https://github.com/USERNAME/comet-resources.git
git switch main
git push -u origin main
```

What you should see:

The Code tab contains your project files and main is the published branch.

Your turn: Compare the latest local commit ID with the commit shown on GitHub.

Check: What does a successful push upload?

1. Every unsaved editor tab
2. The local commits on the branch being pushed
3. Your local Python installation

Hint: Save and commit are earlier steps.

Answer: 2. Git pushes recorded history, not arbitrary unsaved files.

#### Lesson 3: Do the same workflow in VS Code

Your result: Use Source Control to commit and push an edit.

For a folder with commits but no remote, the Command Palette’s Publish to GitHub action can create a remote repository and upload it. Choose either that route or the terminal empty-remote route; do not create duplicate repositories for the same exercise.

For our now-connected project, edit a file, save it, review the diff in Source Control, stage it with the plus button, enter a commit message, and Commit. Use Push from the Source Control menu. Sync Changes also pulls before pushing, so read its incoming and outgoing indicators first.

Words to know: Authentication, GitHub, README

Follow the small steps:

1. Change one sentence in README.md and save.
2. Open Source Control and read its diff.
3. Stage the file and commit with a useful message.
4. Choose Push; sign in through the supported flow if prompted.
5. Refresh GitHub and check the updated text.

**The UI route**

```text
Edit → Save → Source Control → Review diff
Stage (+) → Message → Commit → Push
No remote yet? Command Palette → Publish to GitHub
```

What you should see:

The new commit and README text appear on GitHub.

Your turn: Record and upload one small edit using the VS Code buttons.

Check: When should you use Publish to GitHub?

1. For creating the remote when the local project does not already have one
2. For every keystroke
3. For changing a domain’s DNS

Hint: Check whether a remote already exists.

Answer: 1. Publish creates a remote; later pushes update that remote.

#### Lesson 4: Read the main GitHub parts

Your result: Know which tab to open for each task.

Code shows files, branches, and history. Issues collect tasks and bug reports. Pull requests show proposed branch changes. Actions shows automation runs and logs. Settings controls repository options such as collaborators and Pages. Releases are named versions.

These are tools around the same repository. You can start with Code, README, and one issue; you do not need to configure every tab.

Words to know: Issue, Pull request, Actions, Release, README

Follow the small steps:

1. Read the Code tab and latest commit.
2. Create one issue describing the next small improvement.
3. Look at Actions only when a workflow or deployment exists.
4. Find Pages under Settings for the later deployment subject.

**Choose a tab by the task**

```text
Read files: Code
Report a bug: Issues
Review a branch: Pull requests
Read build/test logs: Actions
Configure Pages: Settings
Publish version notes: Releases
```

What you should see:

You can find files, tasks, reviews, automation, and settings.

Your turn: Write a small issue with a title, the problem, and the expected result.

Check: Where would you inspect a failed automated test run?

1. Stars
2. Actions
3. DNS

Hint: Find the automation area.

Answer: 2. Actions records workflow runs and their logs.

#### Lesson 5: Open and merge a pull request

Your result: Review a feature before adding it to main.

Push the feature/resource-list branch you created in the Git subject. On GitHub, open a pull request with base main and compare feature/resource-list. Explain the problem, the change, and how you previewed it.

Read Files changed before merging. After a successful merge, switch back to local main and pull with a clean working tree. Your local main does not automatically change when a GitHub pull request is merged.

Words to know: Pull request, Issue, Actions

Follow the small steps:

1. On the feature branch, save and commit the completed change.
2. Push the branch with its own upstream.
3. Open the pull request and read Files changed.
4. Resolve requested changes or failing checks.
5. Merge when the change is ready, then update local main.

**Terminal · before and after the GitHub review**

```shell
# Before opening the pull request:
git switch feature/resource-list
git push -u origin feature/resource-list
# After it has been merged on GitHub:
git switch main
git pull --ff-only
```

What you should see:

The feature is on remote main, then on your updated local main.

Your turn: Write a two-sentence pull-request description and check its diff.

Check: What is the base branch for this pull request?

1. main, the branch receiving the feature
2. Any unrelated repository
3. Your browser history

Hint: Think about where the finished feature should land.

Answer: 1. The base receives the proposed changes from the compare branch.

#### Lesson 6: Keep repositories understandable

Your result: Organize files, names, documentation, and portfolio links.

For small independent projects, start with one repository per project. Name it for what it does, such as comet-resources. A monorepo holding related applications can be useful later, but it needs clear tooling and ownership.

GitHub does not provide ordinary nested folders containing separate repositories in your personal account. Use meaningful names, topics, descriptions, and profile pins to make projects easy to find. Use organizations when a team needs shared ownership.

Words to know: README, Topic, Organization, License, Star, Fork

Follow the small steps:

1. Keep website files at the root for this simple Pages example.
2. Put images in assets/ and project notes in docs/.
3. Give README.md a purpose, preview steps, live URL, and limitations.
4. Add relevant topics and a repository description.
5. Choose a license deliberately if you want others to reuse your code.
6. Keep private data, .env secrets, and local databases out of commits.

**README.md · a small template**

```markdown
# Comet Resources
A small site for beginner learning resources.

## Run locally
Use Python http.server in this folder and open localhost:8000.

## Live site
Add the host URL after deployment.

## Project files
index.html: structure
styles.css: appearance
main.js: behavior

## Limitations
The first version is a public read-only practice site.
```

What you should see:

A visitor understands the project without asking you how it works.

Your turn: Improve one repository description, add two useful topics, and review its README.

Check: How can you group related personal repositories for discovery?

1. By putting separate repositories inside a GitHub folder
2. With useful names and topics
3. By committing all passwords into one README

Hint: Think labels and descriptions, rather than filesystem folders.

Answer: 2. Topics and names help people find related work.

Official references:

- [GitHub: Hello World](https://docs.github.com/en/get-started/start-your-journey/hello-world)
- [GitHub: authentication](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github)
- [VS Code: first commit and publish](https://code.visualstudio.com/docs/sourcecontrol/quickstart)
- [GitHub: repository topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)

## 06 · Student benefits

Learn GitHub Education eligibility and the official application route. Claim useful offers only when eligible and read the end date.

Your result: An application checklist and a plan for the offers you actually need.

### Word library

#### GitHub Education

GitHub’s education program for eligible students and educators.

```text
Account settings → Education benefits
```

Read it as: Apply with your own current student details.

#### Student Developer Pack

A collection of developer offers for verified students.

```text
education.github.com/pack
```

Read it as: Each partner has its own redemption steps and conditions.

#### Eligibility

The conditions you must meet to receive a benefit.

```text
Currently enrolled + personal GitHub account + age 13 or older.
```

Read it as: The official student rules determine whether you qualify.

#### Enrollment proof

A document showing that you are currently a student.

```text
Dated student ID, schedule, transcript, or enrollment letter.
```

Read it as: GitHub lists acceptable evidence and may request additional details.

#### Academic email

An email address provided by your school.

```text
Your institution’s verified email domain.
```

Read it as: Some schools require this in the application; an .edu ending is not a universal requirement.

#### Redemption

Claiming an approved offer at its provider.

```text
Open an offer from the Pack and follow its partner flow.
```

Read it as: GitHub approval does not automatically activate every product.

#### Credit

A limited amount a provider lets you spend on its service.

```text
An offer has an amount and an expiry date.
```

Read it as: A credit is different from unlimited free use.

#### Renewal

Continuing a service after its first term ends.

```text
A one-year domain reaches its renewal date.
```

Read it as: Check the renewal price and automatic-renewal setting before claiming.

### Text lessons

#### Lesson 1: Check the student requirements

Your result: Know whether and how you can apply.

GitHub’s current rules require a personal GitHub account, age 13 or older, and enrollment in a degree- or diploma-granting program. Examples include high school, college, university, or homeschool. You need evidence of current enrollment.

The application may require your school email, depending on your institution. If your school does not provide academic email, follow the official instructions for documenting that policy. Use your own truthful information.

Words to know: Eligibility, Enrollment proof, Academic email

Follow the small steps:

1. Open the official application guidance linked below.
2. Check age, account, and current enrollment requirements.
3. Gather a current dated ID, schedule, transcript, or enrollment letter.
4. Add and verify your academic email if the application requires it.

**Your application checklist**

```text
My own personal GitHub account
Current school and enrollment details
Accepted current evidence
Verified academic email if required by my application
```

What you should see:

You know what evidence to prepare, without guessing eligibility.

Your turn: Write which evidence you can provide and what the application asks for.

Check: Does everyone learning to code automatically qualify?

1. Yes
2. No, GitHub verifies specific student requirements
3. Only people using Java qualify

Hint: Learning code and verified enrollment are separate facts.

Answer: 2. Eligibility depends on student status and the official requirements.

#### Lesson 2: Apply through GitHub and check the result

Your result: Use the official application process.

Go to your GitHub account’s Education benefits settings. Under GitHub Education, choose Start an application, complete the form, and submit it. Follow the current prompts rather than relying on screenshots from an older tutorial.

Review is not guaranteed to be instant or successful. Check your application status and any request for better evidence. Once approved, open the Education portal and Pack to access benefits.

Words to know: GitHub Education, Enrollment proof, Student Developer Pack

Follow the small steps:

1. Sign in to your own GitHub account.
2. Open account settings → Education benefits.
3. Start the application and upload evidence only through the official flow.
4. Check the outcome and follow any official correction instructions.

**Official places**

```text
Application guidance: docs.github.com → GitHub Education → For students
Application: your GitHub Education benefits settings
Offers: https://education.github.com/pack
```

What you should see:

You can locate the application and its status.

Your turn: Find the official application page and read the requested fields before submitting.

Check: Where should you submit student evidence?

1. In a public repository
2. In the official GitHub Education application
3. In a stranger’s direct message

Hint: Use the account’s education process.

Answer: 2. The official application is the intended verification channel.

#### Lesson 3: Claim a useful offer and note its end date

Your result: Distinguish approval, redemption, credits, and renewal.

Open the current Pack page, choose an offer you need, and follow its partner link. Read region, age, first-account, card, usage, and expiration conditions that apply to that offer. Record when it ends and whether it renews at a paid price.

As checked on 2 October 2026, the Pack lists Namecheap domain registration for one year on the .me TLD. Availability and partner eligibility can change. A first-year domain offer does not promise free renewal. We use it as an optional route in the Domains subject.

Words to know: Redemption, Credit, Renewal, Student Developer Pack

Follow the small steps:

1. Choose one useful offer from the official live list.
2. Read the provider’s conditions before redeeming.
3. Record the start, end, limits, and renewal terms.
4. Avoid activating paid add-ons you do not need.

**Offer notes · fill in from the provider**

```text
Provider:
Benefit:
Who qualifies:
Usage limit:
End date:
Renewal price:
Auto-renew setting:
```

What you should see:

A clear record of what is included and what happens afterward.

Your turn: Fill in the offer notes for a domain or tool you are eligible to claim.

Check: What does a one-year free domain offer tell you about year two?

1. It is free forever
2. You must check renewal terms; year two may be paid
3. Domains never expire

Hint: Read the offer’s end date and renewal price.

Answer: 2. The initial benefit and later renewal are different terms.

Official references:

- [GitHub: apply as a student](https://docs.github.com/en/education/about-github-education/github-education-for-students/apply-to-github-education-as-a-student)
- [GitHub: current Student Developer Pack](https://education.github.com/pack)

## 07 · Free databases

Compare a no-cost local SQLite database with a cloud Free plan. Learn table words before touching a connection string.

Your result: A small data model and a chosen local or cloud learning route.

### Word library

#### Database

An organized store you can read and update.

```text
resources table
```

Read it as: The page asks for data; the database keeps that data.

#### Table

A named collection of records with defined columns.

```text
resources
```

Read it as: This table holds learning-resource entries.

#### Row

One record in a table.

```text
id: 1, title: Learn HTML
```

Read it as: One resource is one row.

#### Column

A named field shared by rows.

```text
title: text
```

Read it as: Each row can have a title value.

#### Schema

A database namespace and, more broadly, the defined shape of data.

```text
public.resources
```

Read it as: public is the schema; resources is the table name.

#### Primary key

A value or set of values that uniquely identifies a row.

```text
id = 1
```

Read it as: Two rows cannot share the same primary-key value.

#### Foreign key

A constraint linking a value to a key in another table.

```text
tasks.project_id refers to projects.id
```

Read it as: A link can ensure a task refers to a real project.

#### SQL

A language for describing and querying relational data.

```text
SELECT id, title FROM resources;
```

Read it as: SQL is separate from the JavaScript displaying the result.

#### Query

A request to a database.

```text
SELECT title FROM resources ORDER BY id;
```

Read it as: Ask for the titles in a deliberate order.

#### CRUD

Create, read, update, and delete: four common data actions.

```text
INSERT · SELECT · UPDATE · DELETE
```

Read it as: A public read-only demo needs only read access.

#### SQLite

A database engine that can store data in one local file.

```text
practice.db
```

Read it as: There is no separate SQLite server for this Python exercise.

#### PostgreSQL

A relational database server, often called Postgres.

```text
Supabase provides a hosted Postgres database.
```

Read it as: Connect through a supported driver or a configured API.

#### Free tier

A provider’s plan with no recurring charge within stated limits.

```text
Supabase Free plan
```

Read it as: Check storage, traffic, project limits, and pause rules; they may change.

#### Migration

A recorded, deliberate change to the database structure.

```text
Add a column with a reviewed migration.
```

Read it as: Changing a code file does not automatically migrate the cloud database.

#### Backup

A separate copy you can restore if data is lost.

```text
Export practice data before changing its structure.
```

Read it as: A repository of code is not automatically a backup of live data.

#### Parameter

A separately supplied value used by a database query.

```text
VALUES (?) with ("Learn HTML",)
```

Read it as: The value is bound as data rather than joined into SQL text.

### Text lessons

#### Lesson 1: Decide whether you need a database

Your result: Add storage because the project needs it.

A static portfolio can store its content directly in HTML and often needs no database. A shared resource list edited outside the source code is one reason to add one. Browser localStorage saves on one browser; it is not a shared cloud database.

Our optional cloud exercise uses deliberately public learning titles. Private notes, accounts, and user-owned records need a different authentication and authorization design.

Words to know: Database, CRUD, Backup

Follow the small steps:

1. Ask whether data must survive across devices or be shared.
2. Identify whether it is public or private.
3. Choose the simplest useful storage.
4. Write what you must back up.

**Choose by the requirement**

```text
Fixed portfolio text: HTML may be enough
Personal browser preference: localStorage may be enough
Shared changing records: a database may help
Private records: design sign-in and access rules first
```

What you should see:

A reasoned storage choice for your project.

Your turn: Write whether your first version needs shared data and why.

Check: Does a simple fixed portfolio always require a database?

1. Yes
2. No, it can use ordinary site files
3. Only if it uses CSS

Hint: Think about whether the content changes outside the files.

Answer: 2. Use a database when persistent organized data solves a real need.

#### Lesson 2: Read a table like a spreadsheet

Your result: Design two simple fields for your resource list.

A relational table is similar to a spreadsheet with named columns, but it also has rules and constraints. Our resources table has an id primary key and a title text column. Each title belongs to one row.

Choose types that fit the data and avoid collecting data your project does not need. A foreign key becomes useful when records refer to another table, such as a task belonging to a project.

Words to know: Table, Row, Column, Primary key, Foreign key, Schema

Follow the small steps:

1. Name the table resources.
2. Choose id as the unique identifier.
3. Choose title as required text.
4. Sketch two example rows.

**The data model**

```text
Table: resources
Columns: id (unique number), title (required text)
Row 1: 1, Learn HTML
Row 2: 2, Practice Git
```

What you should see:

A model with two fields and two sample records.

Your turn: Sketch a project table with an id and a project name.

Check: What is one complete resource entry?

1. A column
2. A row
3. A Git branch

Hint: The entire entry is a record.

Answer: 2. A row is one record containing its column values.

#### Lesson 3: Understand SQL before copying it

Your result: Read basic create, insert, and select statements.

CREATE TABLE defines structure. INSERT adds rows. SELECT reads rows. WHERE limits which rows a statement targets. UPDATE and DELETE change or remove matching rows; learn their scope before using them.

The connection subject gives you complete practice examples in new disposable learning databases. Do not paste schema-changing or deletion examples into a database holding real work.

Words to know: SQL, Query, CRUD, Migration, Parameter

Follow the small steps:

1. Read the statement as a sentence.
2. Name the table and columns it uses.
3. Check which rows a WHERE condition selects.
4. Use bound parameters for values received from people.

**Read-only SQL example**

```sql
SELECT id, title
FROM resources
WHERE id = 1;
```

**Read it in everyday words**

```text
Give me the id and title
from the resources table
only for the row whose id is 1.
```

What you should see:

You can identify the requested fields, table, and condition.

Your turn: Explain the example aloud and change the condition to id = 2 on paper.

Check: What does WHERE do in this query?

1. Selects which rows match
2. Uploads code to GitHub
3. Registers a domain

Hint: It answers “which records?”.

Answer: 1. WHERE is the query’s row condition.

#### Lesson 4: Choose a free learning route

Your result: Understand local cost versus cloud limits.

SQLite is included with Python’s sqlite3 module and works locally without a hosting subscription. You manage its file, permissions, and backups. It does not by itself make a shared online database.

Supabase has a hosted PostgreSQL Free plan and a browser-friendly Data API. As checked on 2 October 2026, its pricing page lists limited database storage and traffic, two active Free projects, and inactivity pausing after one week. Read the live pricing page before creating a project; limits and availability can change.

Words to know: SQLite, PostgreSQL, Free tier, Backup

Follow the small steps:

1. Use SQLite to learn local database basics.
2. Choose Supabase Free if you need this cloud practice exercise.
3. Read the provider’s current usage and pause rules.
4. Record where your data lives and how you will export it.

**Two routes**

```text
SQLite: Python → local practice.db file
Supabase: browser or backend → Data API → hosted Postgres
Local file cost and cloud-service quotas are different questions.
```

What you should see:

You have chosen a route and understand its limits.

Your turn: Read the current Free plan page and write down the limits relevant to your demo.

Check: What does “Free tier” mean?

1. No limits or expiry rules of any kind
2. A no-charge plan subject to the provider’s stated conditions
3. A database that never needs backups

Hint: Check what the provider includes.

Answer: 2. A Free plan still has usage and service conditions.

#### Lesson 5: Create a cloud practice project

Your result: Find the table editor, project URL, and publishable key.

If you choose the cloud route, create your own Supabase account and a new practice project on the Free plan. Pick a region near your expected users. Store the database password privately; it is not the browser key.

The Table Editor manages data. SQL Editor runs SQL. The Connect dialog provides the project URL and key guidance; API Keys settings lists publishable and secret keys. Keep Row Level Security enabled. The next subject sets a narrow public-read rule for our demo.

Words to know: PostgreSQL, Table, Free tier, Schema

Follow the small steps:

1. Create a new disposable practice project.
2. Check the selected plan before confirming.
3. Find Table Editor, SQL Editor, and Connect.
4. Identify the project URL and publishable key without publishing passwords.
5. Leave the tables protected until you intentionally configure access.

**Different values have different jobs**

```text
Project URL: identifies the API host
Publishable key: identifies a public app
Database password: direct database login; keep private
Secret/service_role key: elevated access; never put in browser code
```

What you should see:

You know where the connection details and data tools are.

Your turn: Write the names of the values you need, without copying any secret into your notes or repository.

Check: Is a database password the key to place in browser JavaScript?

1. Yes
2. No
3. Only when the repository is private

Hint: The public browser key has a different purpose.

Answer: 2. Browser code is public to its users; database passwords must stay private.

Official references:

- [Python: SQLite tutorial](https://docs.python.org/3/library/sqlite3.html)
- [Supabase: tables and data](https://supabase.com/docs/guides/database/tables)
- [Supabase: current Free plan limits](https://supabase.com/pricing)
- [Supabase: API security and grants](https://supabase.com/docs/guides/api/securing-your-api)

## 08 · Connect a database

Connect Python to local SQLite, or connect the starter website to a restricted Supabase API. Understand permissions, requests, and failures.

Your result: A working local database exercise or a website that reads public cloud resources.

### Word library

#### Connection

A way for a program to talk to a database or its API.

```text
sqlite3.connect("practice.db")
```

Read it as: The client and database must agree on a supported interface.

#### API

A defined interface through which one program asks another for work or data.

```text
/rest/v1/resources
```

Read it as: The database API receives the website’s request.

#### Endpoint

A particular address of an API operation or resource.

```text
https://YOUR_PROJECT_REF.supabase.co/rest/v1/resources
```

Read it as: This endpoint refers to the resources table.

#### Request

The message a client sends asking for something.

```text
GET resources?select=id,title
```

Read it as: Ask for selected fields from the table.

#### Response

The answer sent back to the client.

```text
[{"id":1,"title":"Learn HTML"}]
```

Read it as: The website turns the returned rows into visible text.

#### JSON

A text format for structured data.

```text
{"id":1,"title":"Learn HTML"}
```

Read it as: JavaScript can parse it into values using response.json().

#### Publishable key

A low-privilege key intended for public app components.

```text
apikey: YOUR_PUBLISHABLE_KEY
```

Read it as: It identifies the app; grants and row policies determine allowed data access.

#### Secret key

A key with elevated server privileges.

```text
sb_secret_... or legacy service_role
```

Read it as: Never ship it in a browser or repository; it bypasses row policies.

#### RLS

Row Level Security: database rules deciding which rows a role may access.

```text
Public demo: SELECT only, for intentionally public titles.
```

Read it as: Turn it on and create policies matching your actual data model.

#### Grant

Permission for a database role to perform an operation on an object.

```text
GRANT SELECT ON resources TO anon;
```

Read it as: A grant allows the operation; RLS then checks the rows.

#### Environment variable

A configuration value read by a running process.

```text
DATABASE_URL on a backend host
```

Read it as: A frontend build variable can still become public in the shipped JavaScript.

#### Connection string

A value describing a direct database connection.

```text
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Read it as: The password makes this a secret; it belongs in a protected backend environment.

#### CORS

Browser rules about requests between different origins.

```text
localhost:8000 asks an external API host.
```

Read it as: It is not database authorization; configure only what your API requires.

#### Parameter binding

Supplying query values separately from the SQL statement.

```text
execute("... VALUES (?)", (title,))
```

Read it as: User values stay data instead of becoming SQL instructions.

#### Commit transaction

Finish and save a database transaction’s changes.

```text
connection.commit()
```

Read it as: This database commit is different from a Git commit.

### Text lessons

#### Lesson 1: Route A: connect Python to SQLite

Your result: Create, write, and read a local practice database.

Use a new folder called sqlite-practice for this optional exercise. Create app.py and paste the Python below. Run it with Python 3 from that folder: py app.py on Windows or python3 app.py on macOS/Linux.

connect opens or creates practice.db. CREATE TABLE IF NOT EXISTS prepares a table without recreating it on later runs. The ? placeholder binds the title as data. commit saves the inserted row; close ends the connection. This program adds another row each time you run it.

Words to know: Connection, Parameter binding, Commit transaction

Follow the small steps:

1. Create the separate practice folder and app.py.
2. Paste and save the code.
3. Run it once using your system’s Python command.
4. Observe the printed row and the practice.db file.
5. Keep *.db in .gitignore if you put the exercise in a repository.

**app.py · local SQLite practice**

```python
import sqlite3

connection = sqlite3.connect("practice.db")
connection.execute(
    "CREATE TABLE IF NOT EXISTS resources "
    "(id INTEGER PRIMARY KEY, title TEXT NOT NULL)"
)
connection.execute(
    "INSERT INTO resources (title) VALUES (?)",
    ("Learn HTML",)
)
connection.commit()
for row in connection.execute("SELECT id, title FROM resources ORDER BY id"):
    print(row)
connection.close()
```

What you should see:

On a new database, the first run prints (1, 'Learn HTML'). A second run prints two rows.

Your turn: Change the bound title to Practice Git and run again. Read the rows without deleting the database.

Check: Why pass the title separately using a ? placeholder?

1. To keep the value as data instead of building SQL by concatenation
2. To upload a Git commit
3. To make it a DNS record

Hint: Look at the difference between a statement and its values.

Answer: 1. Parameter binding safely separates SQL structure from data values.

#### Lesson 2: Route B: create a public read-only cloud table

Your result: Expose only the demo titles your website needs to read.

In your new Supabase practice project, open SQL Editor and run the example once. It creates the resources table, inserts two intentionally public titles, enables RLS, removes broad table privileges for public clients, and grants read access.

The SELECT policy using true is intentional here: every title in this demo is public. There is no browser INSERT, UPDATE, or DELETE grant or policy. Do not reuse this rule for private notes or user-owned records. Confirm public is exposed and the Data API is enabled in your project’s API settings.

Words to know: Grant, RLS, Publishable key, Secret key

Follow the small steps:

1. Use only a new disposable project where resources does not already exist.
2. Read the statements before running them once in SQL Editor.
3. Check that RLS is enabled on resources.
4. Check that public clients have SELECT only.
5. Use the publishable key for browser reads; keep secrets private.

**Supabase SQL Editor · new public-demo table**

```sql
-- Supabase SQL Editor, in a NEW practice project only.
create table public.resources (
  id bigint generated by default as identity primary key,
  title text not null
);

insert into public.resources (title)
values ('Learn HTML'), ('Practice Git');

alter table public.resources enable row level security;
grant usage on schema public to anon, authenticated;
revoke all on table public.resources from anon, authenticated;
grant select on table public.resources to anon, authenticated;

create policy "Read public learning titles"
on public.resources for select
to anon, authenticated
using (true);
```

What you should see:

Table Editor shows Learn HTML and Practice Git; anonymous API access is read-only.

Your turn: Explain the grant and the policy separately. Confirm there is no anonymous write permission.

Check: Why is using (true) acceptable for this specific SELECT policy?

1. Every resource title in this demo is deliberately public
2. RLS should always be disabled
3. It makes private notes safe for everyone

Hint: This table contains only intentionally public practice data.

Answer: 1. The policy must match the chosen public-read data model.

#### Lesson 3: Read the cloud table in your website

Your result: Replace the starter JavaScript with a complete API read.

Keep index.html and styles.css from the VS Code starter. Replace main.js with this cloud version. Copy your project URL and publishable key into the two placeholders. The apikey header identifies the app. A publishable key is not a JWT: do not put it into an Authorization Bearer header.

fetch makes a GET request. response.ok checks the HTTP result; response.json reads the rows. Each title is added with textContent, so data becomes visible text. An error updates the status instead of silently leaving a blank page.

Words to know: API, Endpoint, Request, Response, JSON, Publishable key

Follow the small steps:

1. Complete the read-only table setup first.
2. Replace both placeholders in main.js with your own project URL and publishable key.
3. Save, start your local server, and open localhost:8000.
4. Check the displayed titles and the browser Network request.
5. Change a public demo title in Table Editor, then refresh to see it.

**main.js · replaces the local starter**

```javascript
// Replace these two placeholders with YOUR practice project values.
const projectURL = "https://YOUR_PROJECT_REF.supabase.co";
const publishableKey = "YOUR_PUBLISHABLE_KEY";
const status = document.querySelector("#status");
const list = document.querySelector("#resources");

async function loadResources() {
  status.textContent = "Loading resources...";
  try {
    const response = await fetch(
      projectURL + "/rest/v1/resources?select=id,title&order=id.asc",
      { headers: { apikey: publishableKey } }
    );
    if (!response.ok) {
      throw new Error("Database request failed: " + response.status);
    }
    const rows = await response.json();
    list.replaceChildren();
    for (const row of rows) {
      const item = document.createElement("li");
      item.textContent = row.title;
      list.append(item);
    }
    status.textContent = rows.length ? "Resources loaded." : "No resources yet.";
  } catch (error) {
    status.textContent = "Could not load resources. Check the connection.";
    console.error(error);
  }
}
loadResources();
```

What you should see:

The page shows Learn HTML and Practice Git, followed by the status “Resources loaded.”

Your turn: Change one title in the cloud table and verify it updates after refresh.

Check: Which key belongs in this browser example?

1. Database password
2. Secret/service_role key
3. Publishable key

Hint: Choose the key intended for public app components.

Answer: 3. The browser uses a publishable key with restrictive grants and RLS.

#### Lesson 4: Understand the backend route for private data

Your result: Know where direct database passwords belong.

A browser cannot safely hide a password. For a normal direct database connection, the browser calls your backend API; the backend checks who the user is and what they may access, then uses a database driver and a protected connection string.

A managed browser API can also support private data with real user authentication and ownership-based RLS policies. That is a later design, beyond our public read-only example. Do not add private data to this demo’s public table.

Words to know: Environment variable, Connection string, Secret key, RLS, API

Follow the small steps:

1. Identify which data is private.
2. Choose backend authorization or a managed auth-plus-RLS design.
3. Keep database passwords and privileged keys in a protected server environment.
4. Put variable names and placeholder values in .env.example.
5. Keep actual .env values out of Git; understand which frontend variables are shipped publicly.

**Conceptual route · not runnable configuration**

```text
Browser → HTTPS backend API
Backend → verify user and record ownership
Backend → database driver + protected DATABASE_URL
Database → authorized records → backend → browser

.env.example may name DATABASE_URL with a placeholder.
The real password lives only in protected server configuration.
```

What you should see:

You can describe a private-data architecture and where its secrets live.

Your turn: Classify project URL, publishable key, database password, and service-role key as public or secret.

Check: Does putting a secret in a frontend .env guarantee it stays secret?

1. Yes
2. No, frontend build variables may be shipped to the browser
3. Only CSS can reveal it

Hint: Ask where the value ends up at runtime.

Answer: 2. Environment variable names do not change the public nature of frontend code.

#### Lesson 5: Diagnose a connection that does not work

Your result: Check the request, permission, and data in a useful order.

Open browser DevTools → Network and reload. Inspect the resources request, its status, and its response body. A network failure differs from an HTTP response. An empty successful array differs from a permission error.

Check the project URL and table spelling, then key, table grants, RLS policy, and whether rows exist. Free projects may pause after inactivity. Do not fix an error by exposing a secret key or disabling access rules.

Words to know: Request, Response, Grant, RLS, CORS

Follow the small steps:

1. Confirm the local page loaded its saved main.js.
2. Read the Network request and Console error.
3. Check project status, URL, key, table name, and Data API exposure.
4. Check SELECT grants separately from RLS row visibility.
5. If the response is [], check rows and policy; if permission is denied, inspect grants.
6. If the app later changes data structures, record a migration instead of assuming Git deploys the schema.

**What the observations mean**

```text
No request: check script load and Console
Network failure: check connection and API host
HTTP error: read status and response body
Permission denied: inspect role/table grants
Success with []: check data and row policy
Rows returned but no text: inspect rendering code
```

What you should see:

You can name the layer that failed and check a specific cause.

Your turn: Temporarily use a wrong table name, observe the error, then restore it.

Check: What is a useful first step for a blank database-backed list?

1. Put the service-role key into main.js
2. Read Network and Console results
3. Delete all project files

Hint: Get evidence before changing permissions.

Answer: 2. The request and error evidence tell you what to inspect next.

Official references:

- [Python: SQLite tutorial](https://docs.python.org/3/library/sqlite3.html)
- [Supabase: tables and data](https://supabase.com/docs/guides/database/tables)
- [Supabase: API security and grants](https://supabase.com/docs/guides/api/securing-your-api)
- [Supabase: publishable and secret keys](https://supabase.com/docs/guides/api/api-keys)
- [MDN: fetching data](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## 09 · Publish the project

Publish the starter website, understand automatic deployment, and choose a host that supports the kind of code you have.

Your result: A live host URL showing the commit you intended to publish.

### Word library

#### Hosting

A service that serves your website or runs your application online.

```text
GitHub Pages serves static files.
```

Read it as: A GitHub repository alone is not necessarily a running website.

#### Deployment

Publishing a prepared version to its runtime or host.

```text
Push main → host builds → live site updates.
```

Read it as: A push can trigger deployment, but you still check whether it succeeded.

#### Build

A step that turns source files into deployable output.

```text
A framework creates dist/ files.
```

Read it as: Our plain three-file website needs no framework build.

#### Output directory

The folder a build produces or a host serves as website files.

```text
Root for this simple Pages project; public/ in First Comet.
```

Read it as: The correct folder depends on the project and host.

#### Git integration

A host’s authorized connection to a repository for automatic deployments.

```text
Host watches main for new commits.
```

Read it as: Grant access only to the repositories the host needs.

#### Production branch

The repository branch a host uses for the main live deployment.

```text
main
```

Read it as: Other branches may produce previews instead.

#### Deployment log

A record of what happened during a publish run.

```text
Success or an error for a specific commit.
```

Read it as: Read it when a push does not update the site.

#### Static host

A host that serves files without running your own traditional application server.

```text
GitHub Pages
```

Read it as: Browser JavaScript can call a separate API; Pages does not execute Python, Java, or PHP servers.

#### Backend host

A host that runs your server application in a supported runtime.

```text
A host able to run your Python API.
```

Read it as: Choose runtime, secret configuration, and persistent storage deliberately.

#### HTTPS

HTTP protected with TLS encryption.

```text
https://USERNAME.github.io/comet-resources/
```

Read it as: Use the host’s certificate support and verify the final live URL.

### Text lessons

#### Lesson 1: Publish the starter with GitHub Pages

Your result: Deploy the root-level static website from main.

For GitHub Free, this Pages route uses a public repository. Review the files and history before choosing public visibility. In the repository, open Settings → Pages. Select Deploy from a branch, choose main and /(root), then save.

This matches our starter because index.html is at the repository root. The branch source option supports the root or docs/ folder; it does not let you choose an arbitrary public/ folder. First Comet itself uses Cloudflare, covered next.

Words to know: Hosting, Static host, Output directory, Production branch

Follow the small steps:

1. Commit and push the tested starter to main.
2. Check the intended repository visibility and public content.
3. Open Settings → Pages → Deploy from a branch.
4. Choose main and /(root), then Save.
5. Wait for the deployment result and open the URL Pages displays.

**Typical project-site address · use the URL GitHub displays**

```text
https://USERNAME.github.io/comet-resources/
Keep file references relative: styles.css and main.js
A leading /styles.css points to the host root, not this project folder.
```

What you should see:

Your website works at the exact URL shown in Pages settings.

Your turn: Open the live page on another device and verify the heading and resource list.

Check: Which source folder matches the starter index.html at the repository root?

1. /(root)
2. /public in the branch-source dropdown
3. Your Downloads folder

Hint: Match the deployment source to the file location.

Answer: 1. The starter files are at the branch root.

#### Lesson 2: Understand the Cloudflare Git route

Your result: Recognize how First Comet’s repository becomes a live site.

Cloudflare Workers Builds can connect to GitHub and deploy after commits. Authorize the required repository, select the production branch, and configure commands and paths for the actual project. A plain static project and a framework project have different settings.

First Comet already uses Workers Static Assets and wrangler.jsonc. Its assets directory is ./public and its deploy command is npx wrangler deploy. These are First Comet’s settings, not universal values to paste into every project. Use the generated configuration and current host instructions for a new project.

Words to know: Git integration, Build, Output directory, Deployment log

Follow the small steps:

1. Open the host’s Git integration setup.
2. Authorize the intended repository only.
3. Match production branch, project root, build step, and asset output.
4. For an existing project, read its committed host configuration first.
5. Check the exact commit in the deployment log.

**First Comet’s existing settings**

```text
Repository: CodeArtisanNNZ/first_comet
Host: Cloudflare Workers Static Assets
Production branch: main
Assets: ./public
Framework build: none
Deploy command: npx wrangler deploy
Configuration: wrangler.jsonc
```

What you should see:

You can explain the repo → deployment → live-site connection.

Your turn: Read your project’s hosting configuration and write the folder it actually publishes.

Check: Should every project copy First Comet’s public/ directory setting?

1. Yes
2. No, match the actual project’s output and host
3. Only if it has a database

Hint: Read the project structure and build configuration.

Answer: 2. The host must serve the folder your own project produces.

#### Lesson 3: Choose a host for the code that runs

Your result: Distinguish static files, external APIs, and a backend runtime.

Our public read-only Supabase version can use a static host because the browser calls the database API. A project with your own Python, Java, PHP, or Node server needs a host that actually runs that server’s supported runtime.

Uploading a local SQLite .db file to a static host does not turn it into a database service. Many server hosts also have temporary disks unless persistent storage is configured. Use a supported database service or deliberately provision persistent storage.

Words to know: Static host, Backend host, Build, Hosting

Follow the small steps:

1. List what runs in the browser and what must run on a server.
2. Choose a host supporting the backend runtime if you have one.
3. Configure server secrets in the host’s protected settings.
4. Check free-plan limits, storage behavior, and backups.
5. Deploy a tested version before adding a custom domain.

**Choose the route**

```text
HTML/CSS/JS files: static host
Browser → Supabase public-read API: static host + external database
Python/Java/PHP server: compatible backend host + database
Local SQLite file: local learning; online use needs a running app and persistent storage
```

What you should see:

The host supports the program you actually need to run.

Your turn: Write the runtime and storage requirements of your own project.

Check: Can GitHub Pages execute your Python API server?

1. Yes, by uploading app.py
2. No, it serves static website files
3. Only after you buy a domain

Hint: Match hosting capabilities to the application.

Answer: 2. A domain does not add a server runtime to a static host.

#### Lesson 4: Check the published version and update it

Your result: Verify deployment after every important push.

After editing, preview locally, commit, and push. Open the host’s deployment log and check it succeeded for the expected commit. Then open the live URL and verify behavior, not only the success badge.

A deployment updates application code. It does not automatically create tables, migrate data, or repair DNS. Track those changes deliberately when the project grows.

Words to know: Deployment, Deployment log, Production branch, HTTPS

Follow the small steps:

1. Test the change locally.
2. Review, commit, and push to the correct branch.
3. Check the deployment log and commit ID.
4. Open the live URL, refresh, and test at a small screen size.
5. Record the live URL in README.md.

**Release checklist**

```text
Expected branch and commit?
Deployment succeeded?
Correct live URL?
CSS and JavaScript loaded?
Database request works?
Mobile layout readable?
No private data or server secrets in public files?
```

What you should see:

The live site shows the intended tested version.

Your turn: Publish one small text change and verify it on the live page.

Check: Is a successful git push proof that deployment succeeded?

1. Yes
2. No, inspect the host’s deployment and live page
3. Only for Java projects

Hint: A host can fail after accepting the pushed commit.

Answer: 2. Repository upload and host deployment are separate operations.

Official references:

- [GitHub: publish with Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Cloudflare: connect a Git repository](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/)
- [Cloudflare: static assets](https://developers.cloudflare.com/workers/static-assets/)
- [Supabase: current Free plan limits](https://supabase.com/pricing)

## 10 · Domains and DNS

Get a domain or use a free host address, understand DNS records, and connect the name to the deployed project.

Your result: A domain plan and a correctly configured host-and-DNS connection.

### Word library

#### Domain

A name used to find an internet service.

```text
example.com
```

Read it as: A domain registration does not include a running website by itself.

#### Registrar

The company through which you register a domain name.

```text
A provider that manages your domain registration.
```

Read it as: Check the first-term and renewal prices before registering.

#### TLD

The ending of a domain, called its top-level domain.

```text
.com, .me, .tech
```

Read it as: Offers and renewal prices may differ by ending.

#### Subdomain

A name before the main domain.

```text
www.example.com or app.example.com
```

Read it as: A host’s free address is usually also a provider-owned subdomain.

#### Apex domain

The main domain without an added subdomain.

```text
example.com
```

Read it as: DNS dashboards often use @ as the record name for it.

#### DNS

The system that turns domain names into service locations.

```text
www.example.com points to your website host.
```

Read it as: Configure DNS at the provider serving your authoritative nameservers.

#### Nameserver

A DNS server authoritative for your domain’s records.

```text
The domain is delegated to a DNS provider’s nameservers.
```

Read it as: Your registrar and DNS provider can be different companies.

#### A record

A DNS record pointing a name to an IPv4 address.

```text
@ → the host’s documented IPv4 addresses
```

Read it as: Use the exact current addresses supplied by your host.

#### AAAA record

A DNS record pointing a name to an IPv6 address.

```text
@ → the host’s documented IPv6 addresses
```

Read it as: It performs an address role similar to A, using IPv6.

#### CNAME record

A DNS alias from one hostname to another.

```text
www → USERNAME.github.io
```

Read it as: Its value is a hostname, without https:// or a repository path.

#### TXT record

A DNS record containing text, often used for verification.

```text
_github-pages-challenge-... → provider token
```

Read it as: Copy the exact verification name and value the provider gives you.

#### TTL

Time to live: how long a DNS answer may be cached.

```text
A provider’s default TTL.
```

Read it as: Changing a record may not appear everywhere immediately.

#### Propagation

The period while cached DNS answers expire and changes become visible.

```text
Your phone and laptop may briefly see different results.
```

Read it as: Check the actual record and allow cache time instead of repeatedly changing it.

#### TLS certificate

A certificate used to secure HTTPS for the hostname.

```text
The website host provisions a matching certificate.
```

Read it as: Pointing DNS alone is not the whole HTTPS setup.

#### Custom domain

Your own domain configured for a hosted project.

```text
www.example.com attached to a Pages site.
```

Read it as: Configure it with both the host and DNS provider.

#### Renewal

Extending the domain registration before it expires.

```text
First-year offer → renewal at the provider’s current terms.
```

Read it as: Keep contact details and the renewal date up to date.

### Text lessons

#### Lesson 1: Get a domain or begin with a free host address

Your result: Choose an address without confusing registration and hosting.

You can launch with the host’s free URL, such as a GitHub Pages address, and add a custom domain later. To register your own name, search at a registrar, choose an available name, read initial and renewal terms, and keep the account and contact details secure.

Eligible verified GitHub students can check current Pack domain offers. The Namecheap .me offer listed on 2 October 2026 covers the first year; claim through the official partner flow and read its specific conditions. Do not assume .com is included or renewal is free.

Words to know: Domain, Registrar, TLD, Renewal, Subdomain

Follow the small steps:

1. Publish the site at its host URL first.
2. Choose a readable name if you want your own domain.
3. Check availability, registration term, renewal cost, and optional extras.
4. If eligible, compare the current student offer.
5. Record the expiry date and who controls the registration.

**Two address choices**

```text
Free host address: USERNAME.github.io/comet-resources/
Own registered domain: example.com
Optional subdomain: www.example.com
A domain gives a name; a host serves the actual site.
```

What you should see:

You know which name you will use and how it will renew.

Your turn: Write your host URL and a possible custom name, with its current renewal terms.

Check: Does registering a domain automatically publish the repository as a website?

1. Yes
2. No, you still need a host and connection settings
3. Only for .me

Hint: A name still needs a service to answer it.

Answer: 2. Registration, hosting, and DNS setup are separate steps.

#### Lesson 2: Read the DNS record fields

Your result: Understand name, type, value, and TTL.

A DNS record has a name, a type, a value, and a TTL. @ usually means the apex domain; www is a subdomain name. A records use IPv4 addresses. CNAME records use hostnames. TXT records often prove ownership.

Edit DNS at the provider your nameservers delegate to. If your domain uses Cloudflare nameservers, changing unused registrar DNS records will not update authoritative DNS. Keep unrelated email records intact.

Words to know: DNS, Nameserver, Apex domain, A record, AAAA record, CNAME record, TXT record, TTL

Follow the small steps:

1. Find the domain’s authoritative DNS provider.
2. Read the host’s domain instructions.
3. Identify the correct record name and type.
4. Copy the value exactly, without adding a URL scheme or file path.
5. Keep existing records unrelated to the website, especially email records.

**A GitHub Pages subdomain record example**

```text
Type: CNAME
Name: www
Value: USERNAME.github.io
TTL: provider default

This is a hostname, not https://github.com/USERNAME/REPO.
```

What you should see:

You can read and explain a DNS record before saving it.

Your turn: Explain @, www, CNAME, and TTL in your own words.

Check: What belongs in a CNAME value?

1. A hostname supplied by the host
2. A repository’s full https:// URL with its path
3. Your database password

Hint: It is a DNS name, not a webpage link.

Answer: 1. A CNAME aliases a hostname to another hostname.

#### Lesson 3: Connect a domain to the GitHub Pages project

Your result: Configure the host and the matching DNS records.

The practical connection is repository → Pages deployment → live host → custom domain. On GitHub, verify domain ownership using its Pages verification instructions and supplied TXT record. Then open this repository’s Settings → Pages, enter the custom domain, and save.

For www.example.com, create a CNAME at your authoritative DNS provider pointing www to USERNAME.github.io, without the repository name. For the apex domain, use the current Pages A/AAAA addresses or an ALIAS/ANAME method supported by your DNS provider. Follow the linked current GitHub instructions rather than using another host’s values.

Words to know: Custom domain, TXT record, CNAME record, A record, TLS certificate

Follow the small steps:

1. Verify the registered domain in GitHub account Pages settings using the provided TXT record.
2. In the repository’s Settings → Pages, save the intended custom domain.
3. Create the matching DNS record at your authoritative provider.
4. For branch-based publishing, pull the GitHub-added CNAME-file commit back into your local main.
5. Wait for the DNS check and certificate, then enable Enforce HTTPS when available.
6. Open the exact custom URL and test the deployed page.

**www.example.com → GitHub Pages**

```text
Repository Settings → Pages → Custom domain: www.example.com
DNS type: CNAME
DNS name: www
DNS value: USERNAME.github.io
Use your actual account name; exclude /comet-resources/.
```

What you should see:

The custom domain serves the intended Pages project over HTTPS.

Your turn: Write your host-side setting and DNS-side record before entering them.

Check: Should the Pages CNAME DNS value contain the repository path?

1. Yes
2. No, it should be USERNAME.github.io
3. Only when the repository is public

Hint: Keep the DNS value as a hostname.

Answer: 2. Pages maps the custom domain to the project through its settings; DNS targets the host.

#### Lesson 4: Connect a domain to a Cloudflare Worker

Your result: Use the Worker’s own domain setup instead of Pages records.

For an existing First Comet-style Worker, first make sure the domain’s DNS zone is active in your Cloudflare account. In the Worker, open its domain-and-route settings and choose Add → Custom Domain. Enter the hostname and follow the confirmation flow.

Cloudflare’s Worker Custom Domain setup creates the relevant DNS routing and provisions a certificate. Do not point this Worker at GitHub Pages IP addresses or add a Pages CNAME. Connecting the GitHub repo handles deployments; attaching the domain handles visitor traffic.

Words to know: Custom domain, Nameserver, DNS, TLS certificate

Follow the small steps:

1. Verify the Worker is live at its provider URL.
2. Make sure the domain zone is active with the required Cloudflare DNS setup.
3. Open Worker settings → Domains & Routes → Add → Custom Domain.
4. Enter the intended hostname and review any existing-record conflict.
5. Let Cloudflare complete its DNS and certificate setup.
6. Check HTTPS and the intended project at the custom hostname.

**Two connections with two jobs**

```text
GitHub repository → Cloudflare build/deployment
Custom hostname → Cloudflare Worker

First Comet uses the Worker domain flow.
GitHub Pages examples use the separate Pages domain flow.
```

What you should see:

The custom hostname reaches the intended Worker deployment.

Your turn: Identify which domain flow matches your project’s actual host.

Check: Which DNS instructions should a Cloudflare Worker follow?

1. GitHub Pages IP values regardless of host
2. The Worker Custom Domain setup for its active Cloudflare zone
3. A local SQLite filename

Hint: Use the instructions for the actual host.

Answer: 2. Domain configuration follows the service serving the site.

#### Lesson 5: Check DNS, HTTPS, and later changes

Your result: Know how to keep the domain connected.

DNS caches can delay visibility. Check the authoritative record and the host’s domain status before changing anything again. The certificate must match the hostname; the host may need time to finish provisioning HTTPS.

Future code changes follow edit → commit → push → successful deployment; the domain normally keeps pointing to the host. If you remove a site or move it elsewhere, update or remove obsolete DNS mappings. Keep your registration renewed so you do not lose the name.

Words to know: Propagation, TTL, TLS certificate, Renewal

Follow the small steps:

1. Test the host URL and custom URL separately.
2. Check authoritative records and the host’s domain status.
3. Confirm the certificate covers the hostname.
4. Allow the documented cache/provisioning time.
5. Keep renewal details current.
6. After a move or shutdown, remove DNS that points to an unclaimed old service.

**Which layer is failing?**

```text
Host URL fails: inspect deployment first
Host URL works, custom name fails: inspect host-domain setup and DNS
Name resolves, HTTPS fails: inspect certificate status
Old content: inspect expected commit, deployment, and browser cache
Only one device differs: consider DNS cache and TTL
```

What you should see:

You can isolate a domain issue from a code or deployment issue.

Your turn: Test both your provider URL and custom URL, then record their results.

Check: Do you normally need to change DNS for every code commit?

1. Yes
2. No, the host deploys the update at the existing address
3. Only for HTML

Hint: The name and the deployed version have different roles.

Answer: 2. The domain points to the host while deployments change what the host serves.

Official references:

- [GitHub: current Student Developer Pack](https://education.github.com/pack)
- [GitHub: configure a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub: verify your domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [Cloudflare: Worker custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
