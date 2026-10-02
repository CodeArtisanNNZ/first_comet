# First Comet — Beginner Code Course

Understand the words. Then write the code.

For a website, begin with HTML → CSS → JavaScript. Choose one backend language if the project needs it. Java, Python, and PHP are different options; all six are not required.

Practice on localhost first. Each milestone has an explanation, example, expected result, practice task, and check. Try the work before moving on. The website saves progress in your current browser.

## HTML — Structure & meaning

Use HTML to put headings, text, images, links, and forms on a web page.

### Where to run the code

Create index.html in VS Code. Use a trusted local server, such as VS Code Live Server, then open its localhost address. You can also open a simple HTML file directly, but that is a file preview rather than a local web server.

### Word library

#### HTML

The markup language that describes the structure and meaning of a web page.

```html
<h1>My first page</h1>
```

Read it as: This text is the main heading.

Keep in mind: HTML describes content. It does not run algorithms such as binary search.

#### Markup

Labels around content that describe what the content is.

```html
<p>Hello</p>
```

Read it as: Label Hello as a paragraph.

#### Tag

The angle-bracket part that marks an element’s start or end.

```html
<p> and </p>
```

Read it as: Start a paragraph, then end it.

#### Element

A complete piece of HTML: a tag, its content, and usually its closing tag.

```html
<p>Hello</p>
```

Read it as: One paragraph element.

#### Attribute

Extra information written in an opening tag.

```html
<a href="about.html">About</a>
```

Read it as: href tells the link where to go.

#### DOCTYPE

The opening declaration that tells the browser to use modern HTML rendering.

```html
<!doctype html>
```

Read it as: Treat this as a modern HTML document.

#### html

The root element containing the page.

```html
<html lang="en">…</html>
```

Read it as: This document’s main language is English.

#### head

The area for page information and resource links.

```html
<head><title>My page</title></head>
```

Read it as: Set information about the page.

#### body

The area containing the content displayed on the page.

```html
<body><p>Hello</p></body>
```

Read it as: Show Hello in the page.

#### title

The page name shown in the browser tab.

```html
<title>My portfolio</title>
```

Read it as: Name the tab My portfolio.

Keep in mind: The visible page heading uses h1; title is the tab name.

#### Heading

A label that organizes content into sections, from h1 to h6.

```html
<h1>My portfolio</h1>
```

Read it as: Give the page a main heading.

Keep in mind: Choose heading levels for structure, not just font size.

#### Paragraph

A block of ordinary text.

```html
<p>I am learning to code.</p>
```

Read it as: Show one paragraph.

#### Anchor / link

An element that takes you to another location.

```html
<a href="about.html">About me</a>
```

Read it as: Open about.html when clicked.

#### href

The destination of a link.

```html
<a href="#contact">Contact</a>
```

Read it as: Jump to the element with id contact.

#### Image

An element that displays an image file.

```html
<img src="photo.jpg" alt="My study desk">
```

Read it as: Load photo.jpg and describe it as My study desk.

#### src

The location of a resource such as an image or script.

```html
<img src="photo.jpg" alt="My study desk">
```

Read it as: Find the image at photo.jpg.

#### alt

A text alternative for an image.

```html
<img src="photo.jpg" alt="My study desk">
```

Read it as: Describe the image for people who cannot see it.

Keep in mind: Decorative images can use alt="". Useful images need useful descriptions.

#### Void element

An element that has no closing tag or content inside it.

```html
<img src="photo.jpg" alt="My study desk">
```

Read it as: Write img without an </img> tag.

#### Nesting

Putting one element inside another.

```html
<ul><li>Tea</li></ul>
```

Read it as: Put a list item inside a list.

#### Parent / child

An outer element and the element directly inside it.

```html
<main><p>Hello</p></main>
```

Read it as: main is the parent; p is its child.

#### List

A group of items. ul is unordered; ol is numbered.

```html
<ul><li>Tea</li><li>Water</li></ul>
```

Read it as: Show two list items.

#### Semantic HTML

Choose elements that explain the purpose of their content.

```html
<nav><a href="index.html">Home</a></nav>
```

Read it as: Label this as navigation.

#### main

The document’s main content area.

```html
<main><h1>Welcome</h1></main>
```

Read it as: Identify the page’s main content.

#### header / footer

Introductory content and ending information for a page or section.

```html
<footer><p>Contact: hello@example.com</p></footer>
```

Read it as: Place contact information at the end.

#### section / article

A section groups a topic; an article is content that can stand on its own.

```html
<article><h2>Study tips</h2><p>…</p></article>
```

Read it as: Group a self-contained piece of content.

#### div / span

General-purpose containers when a more meaningful element does not fit.

```html
<span class="badge">New</span>
```

Read it as: Group a small piece of text for styling.

#### class

A reusable label for styling or finding elements.

```html
<p class="notice">Hello</p>
```

Read it as: Give this paragraph the label notice.

#### id

A unique label for one element in a document.

```html
<section id="contact">…</section>
```

Read it as: Name this section contact.

Keep in mind: Use the same id only once in a document.

#### Form

A group of controls used to collect and submit information.

```html
<form method="get">…</form>
```

Read it as: Group the user’s input for submission.

#### Input

A control where someone enters or selects a value.

```html
<input id="name" name="name" type="text">
```

Read it as: Collect text and submit it under the name name.

#### Label

The text explaining what an input is for.

```html
<label for="name">Your name</label>
```

Read it as: Connect the label to the input with id name.

#### Button

A control that performs an action.

```html
<button type="button">Say hello</button>
```

Read it as: Provide an action button.

Keep in mind: A button inside a form submits by default. Set type="button" for another action.

#### required

An attribute asking the browser to check that input is supplied.

```html
<input name="name" required>
```

Read it as: Ask for a value before submitting.

Keep in mind: Browser checks do not replace server-side validation.

#### File path

The location of a file relative to another file or the site root.

```html
<link rel="stylesheet" href="styles.css">
```

Read it as: Load styles.css from the same folder.

#### link stylesheet

Connect a CSS file to the HTML page.

```html
<link rel="stylesheet" href="styles.css">
```

Read it as: Use styles.css to style this page.

#### script

Connect executable JavaScript to the page.

```html
<script src="app.js" defer></script>
```

Read it as: Load app.js; defer runs it after the HTML is parsed.

#### Viewport

The area of a screen used to display the page.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Read it as: Use the device’s width for the page layout.

#### Accessibility

Make content and controls usable by people with different abilities and tools.

```html
<label for="email">Email</label>
```

Read it as: Give a form control a clear name.

#### Comment

A note in source code that is not shown as page content.

```html
<!-- My navigation starts here -->
```

Read it as: Leave a note for yourself.

#### Localhost

A hostname that refers to the same computer you are using.

```html
http://localhost:5500
```

Read it as: Open a web server running on this computer.

Keep in mind: The server must be running. This link does not publish your site to the internet.

### Milestones

#### Milestone 1: Make your first page

Your result: A browser shows a file you wrote.

A page needs a document structure. Information about the page goes in head. Visible content goes in body. Save this as index.html and preview it locally.

Words to know: HTML, DOCTYPE, head, body, title

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>My first page</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>Hello, First Comet!</h1>
  <p>This is my practice page.</p>
</body>
</html>
```

Read it in small pieces:

1. DOCTYPE selects modern HTML rendering.
2. lang tells tools the page’s language; charset lets the document use UTF-8 text.
3. title names the browser tab; the viewport line helps on phones.
4. h1 and p are visible because they are inside body.

What you should see:

```text
Page: Hello, First Comet!
This is my practice page.
Tab: My first page
```

Your turn: Change the heading to your own name. Save, then refresh your local preview. Read the Localhost path if you have not started a local server yet.

Check: Where does the visible heading belong?

1. Inside body
2. Inside title
3. Inside head only

Answer: 1. body holds the content of the page. title labels the browser tab.

#### Milestone 2: Label your content

Your result: Organize text with headings and paragraphs.

Tags label the role of text. Most elements have an opening tag and a closing tag. A heading introduces a topic; a paragraph explains it. Keep these snippets inside your page’s body.

Words to know: Tag, Element, Heading, Paragraph, Comment

```html
<h1>My study page</h1>
<h2>About me</h2>
<p>I am learning web development.</p>
<!-- This note is only in the source -->
```

Read it in small pieces:

1. h1 is the page’s main heading.
2. h2 introduces a section under that heading.
3. p groups ordinary text into a paragraph.
4. The comment is a source-code note, not visible page text.

What you should see:

```text
My study page
About me
I am learning web development.
```

Your turn: Add a second h2 called My goal and a paragraph explaining one thing you want to build.

Check: Which element should hold ordinary paragraph text?

1. h1
2. p
3. title

Answer: 2. p means paragraph. Choose elements for what the content means.

#### Milestone 3: Connect pages and images

Your result: A link opens a destination and an image has a text alternative.

Attributes give an element extra information. href is where a link goes. src is where an image comes from. alt describes a useful image for someone who cannot see it.

Words to know: Attribute, href, src, alt, Void element, File path

```html
<a href="about.html">About me</a>
<img src="photo.jpg" alt="My study desk">
```

Read it in small pieces:

1. a creates a link whose visible text is About me.
2. href points to about.html in the same folder.
3. img loads photo.jpg from that folder.
4. alt supplies a description. img is a void element; it has no closing tag.

What you should see:

```text
A clickable About me link and an image of your desk, if the image file exists.
```

Your turn: Create about.html with a heading. Link to it. Put an image you own in the folder and describe it accurately in alt. If it fails, check the filename and path.

Check: Which attribute describes an image as text?

1. href
2. src
3. alt

Answer: 3. alt is the text alternative. src is the file location.

#### Milestone 4: Group related information

Your result: Build a list and understand parent and child elements.

An outer element can contain smaller elements. A list groups related items. ul creates an unordered list and li marks each item.

Words to know: List, Nesting, Parent / child

```html
<h2>My tools</h2>
<ul>
  <li>VS Code</li>
  <li>A browser</li>
  <li>One project folder</li>
</ul>
```

Read it in small pieces:

1. ul is the parent of these list items.
2. Each li is one child item.
3. Keep each li inside the ul and close the tags in the correct order.

What you should see:

```text
My tools
• VS Code
• A browser
• One project folder
```

Your turn: Add a fourth tool. Then change ul to ol, including the closing tag, and observe the numbered list.

Check: Which element represents one list item?

1. li
2. ul
3. ol

Answer: 1. li is one item. ul and ol are the containers for items.

#### Milestone 5: Give the page meaningful sections

Your result: Use the right element for navigation and main content.

Meaningful elements tell browsers and assistive tools what a region is for. Use nav for navigation and main for the main content. An id can give a section a link destination.

Words to know: Semantic HTML, main, header / footer, section / article, id

```html
<header><p>My portfolio</p></header>
<nav><a href="#about">About</a></nav>
<main>
  <section id="about">
    <h1>About me</h1>
    <p>I build small, useful projects.</p>
  </section>
</main>
<footer><p>Made while learning</p></footer>
```

Read it in small pieces:

1. nav contains the section link.
2. #about links to the element with id="about".
3. main contains the principal content.
4. section groups one topic; footer ends the page with supporting information.

What you should see:

```text
A page with navigation, an About section, and a footer.
```

Your turn: Add a Contact section with its own unique id and a link to it. Test both links using your keyboard.

Check: What does href="#about" target?

1. A CSS file named about
2. The element whose id is about
3. Every paragraph

Answer: 2. The # in an HTML link introduces a fragment target identified by id.

#### Milestone 6: Collect input with a form

Your result: Name an input and connect its label.

A label tells a person what to type. Its for value matches the input’s id. The input’s name is the key used when a form is submitted. This form uses GET, so submission places the value in the URL; it does not save an account.

Words to know: Form, Input, Label, Button, required

```html
<form method="get">
  <label for="name">Your name</label>
  <input id="name" name="name" type="text" required>
  <button type="submit">Send</button>
</form>
```

Read it in small pieces:

1. form groups the controls.
2. for="name" connects the label to id="name".
3. name="name" gives the submitted value its key.
4. required requests a browser check; type="submit" submits the form.

What you should see:

```text
A labeled text box and a Send button. Submission adds ?name=… to the URL.
```

Your turn: Click the label to focus the input. Try submitting it empty, then with your name. Inspect the URL without entering private data.

Check: Which value must label’s for match?

1. The button text
2. The input’s name only
3. The input’s id

Answer: 3. for and id connect the label to that specific control.

#### Milestone 7: Connect style and behavior files

Your result: Keep the three web languages in separate connected files.

HTML describes the content, CSS styles it, and JavaScript can change it after an action. File paths must match. Put these resource connections inside head.

Words to know: link stylesheet, script, class, File path

```html
<link rel="stylesheet" href="styles.css">
<script src="app.js" defer></script>

<!-- Put this in body -->
<p class="notice">My files are connected.</p>
```

Read it in small pieces:

1. link loads styles.css from the same folder.
2. script loads app.js. defer lets this script run after HTML parsing.
3. class="notice" gives the paragraph a reusable styling label.
4. Create both referenced files; empty files are allowed while you begin.

What you should see:

```text
The same paragraph appears. Its style and behavior can now come from separate files.
```

Your turn: Create styles.css and add .notice { color: blue; }. Create app.js and add console.log("Connected");. Confirm the blue paragraph and the console message.

Check: Which file should hold .notice { color: blue; }?

1. styles.css
2. app.js
3. A Java file

Answer: 1. That rule is CSS, so it belongs in the stylesheet.

#### Milestone 8: Finish a small useful HTML page

Your result: Build one complete page and check its structure.

Combine the small pieces into a page someone can understand. Use one clear main heading, meaningful links, readable paragraphs, and labeled controls. HTML completion is about structure and content; the CSS track adds presentation.

Words to know: Accessibility, Semantic HTML, File path

```html
<main>
  <h1>My project notebook</h1>
  <section>
    <h2>What I built</h2>
    <p>A local study page with useful links.</p>
    <a href="about.html">Read about the project</a>
  </section>
</main>
```

Read it in small pieces:

1. main identifies the page’s main content.
2. h1 names the whole page; h2 names one section.
3. The paragraph explains the project in ordinary language.
4. The link text describes its destination.

What you should see:

```text
A simple project notebook with a working link.
```

Your turn: Build a page about one project with a list, an image with alt, and a working navigation link. Check it with Tab, on a narrow screen, and after refreshing localhost. Next, open CSS.

Check: Which is the best reason to use semantic HTML?

1. It automatically adds animations
2. It explains the purpose of content to people and tools
3. It replaces CSS and JavaScript

Answer: 2. Semantic elements communicate structure and purpose. You still use CSS and JavaScript when needed.

Official references:

- [HTML reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference)
- [Your first website](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website)

## CSS — Appearance & layout

Use CSS to choose colors, spacing, readable text, and layouts that work on phones.

### Where to run the code

Keep styles.css beside index.html. Put <link rel="stylesheet" href="styles.css"> inside the HTML head. Save both files and refresh the localhost preview.

### Word library

#### CSS

The style language that controls how web content looks and is arranged.

```css
p { color: blue; }
```

Read it as: Make paragraph text blue.

Keep in mind: CSS does not declare Java-style integers or run binary search.

#### Selector

The pattern choosing which HTML elements a rule affects.

```css
.card { padding: 16px; }
```

Read it as: Choose elements with class card.

#### Rule

A selector plus the declarations inside its braces.

```css
p { color: blue; }
```

Read it as: Choose paragraphs and set their text color.

#### Declaration

One property and its value inside a CSS rule.

```css
color: blue;
```

Read it as: Set the text color to blue.

#### Property

The style setting you want to change.

```css
font-size: 18px;
```

Read it as: font-size is the setting.

#### Value

The setting you give to a CSS property.

```css
font-size: 18px;
```

Read it as: 18px is the value.

#### Class selector

A dot followed by a class name matches that HTML label.

```css
.card { padding: 16px; }
```

Read it as: Style every element with class="card".

#### ID selector

A # followed by an id matches that specific element.

```css
#welcome { color: blue; }
```

Read it as: Style the element with id="welcome".

#### Cascade

The rules that decide which competing declaration wins.

```css
p { color: red; }
p { color: blue; }
```

Read it as: Blue wins here because these rules have equal priority and the blue one comes later.

Keep in mind: Order is only one part of the cascade. Origin, importance, layers, and specificity can also matter.

#### Specificity

A selector’s weight when otherwise competing rules are compared.

```css
.notice { color: red; }
p { color: blue; }
```

Read it as: The class selector has more weight than the element selector in this simple case.

#### Inheritance

Some properties pass from a parent element to its children.

```css
body { color: #171319; }
```

Read it as: Children normally inherit this text color unless another rule changes it.

Keep in mind: Not every property inherits. Margins and borders do not normally inherit.

#### Box model

An element has content, padding, a border, and outside margin.

```css
.card { padding: 16px; border: 2px solid; margin: 8px; }
```

Read it as: Add space inside, a boundary, then space outside.

#### Content

The text, image, or other material inside an element.

```css
width: 200px;
```

Read it as: Choose the box’s width.

Keep in mind: What width measures depends on box-sizing.

#### Padding

Space between content and its border.

```css
padding: 16px;
```

Read it as: Add space inside the box.

#### Border

The line around a box.

```css
border: 2px solid black;
```

Read it as: Draw a black boundary two pixels thick.

#### Margin

Space outside an element’s border.

```css
margin: 16px;
```

Read it as: Separate the box from nearby content.

#### box-sizing

Choose whether width includes padding and border.

```css
box-sizing: border-box;
```

Read it as: Include padding and border in the set width.

#### Color / background

The text color and the area painted behind the content.

```css
color: #171319;
background: #fff5dc;
```

Read it as: Use dark text on a cream background.

#### Typography

The styles controlling how text looks.

```css
font-size: 18px;
line-height: 1.5;
```

Read it as: Use readable text with extra space between lines.

#### px

A CSS pixel unit for lengths.

```css
padding: 16px;
```

Read it as: Set padding to sixteen CSS pixels.

Keep in mind: A CSS pixel is not necessarily one physical screen pixel.

#### rem / em

rem uses the root font size; em usually uses the element’s font size.

```css
padding: 1rem;
```

Read it as: Size this space relative to the root font size.

Keep in mind: For font-size, em is relative to the parent’s font size.

#### Percentage

A size relative to another dimension defined by the property.

```css
width: 100%;
```

Read it as: Use the full containing width.

#### Flexbox

A layout system useful for arranging items along one main direction.

```css
.row { display: flex; gap: 12px; }
```

Read it as: Place the children in a flexible row.

#### Grid

A layout system for arranging rows and columns.

```css
.cards { display: grid; grid-template-columns: 1fr 1fr; }
```

Read it as: Create two equal flexible columns.

#### Gap

Space between items in flex or grid layouts.

```css
gap: 12px;
```

Read it as: Keep twelve pixels between items.

#### fr

A grid unit representing a share of available space.

```css
grid-template-columns: 1fr 2fr;
```

Read it as: Give the second column twice the available share.

#### justify-content / align-items

Position items along the main and cross axes in a flex layout.

```css
display: flex;
justify-content: center;
align-items: center;
```

Read it as: Center items in both directions in this flex box.

#### Responsive design

A layout that adapts to different screen sizes.

```css
max-width: 600px;
width: 100%;
```

Read it as: Allow a box to shrink but limit its maximum width.

#### Media query

Apply styles only when a condition about the display matches.

```css
@media (max-width: 600px) { .cards { grid-template-columns: 1fr; } }
```

Read it as: Use one column on screens no wider than 600 CSS pixels.

#### Pseudo-class

Select an element in a state or position.

```css
button:hover { background: gold; }
```

Read it as: Change the background while the pointer is over the button.

#### :focus-visible

Select an element when a visible focus indicator is appropriate.

```css
button:focus-visible { outline: 3px solid blue; }
```

Read it as: Make keyboard focus easy to see.

#### Pseudo-element

Style a part of an element or generated content.

```css
p::first-letter { font-weight: bold; }
```

Read it as: Make the first letter bold.

#### Custom property

A named reusable CSS value, often called a CSS variable.

```css
:root { --accent: #ff5937; }
button { background: var(--accent); }
```

Read it as: Name a color accent and reuse it.

Keep in mind: This is a CSS value substitution, not a general-purpose programming variable.

#### Transition

Smooth a change in a property over time.

```css
transition: background-color 0.2s;
```

Read it as: Animate a background-color change for two tenths of a second.

#### Transform

Move, rotate, or resize the visual appearance of an element.

```css
transform: translateY(-2px);
```

Read it as: Draw the element two pixels higher.

#### Position

Choose how an element is placed.

```css
position: relative;
```

Read it as: Keep the box in normal flow and allow offsets or positioned children.

#### z-index

Help decide which overlapping boxes are painted in front.

```css
position: relative;
z-index: 2;
```

Read it as: Give this positioned box a stack level of 2.

Keep in mind: Stacking contexts matter. A larger number does not always beat a box in a different context.

#### Overflow

Choose what happens when content exceeds the box.

```css
overflow-x: auto;
```

Read it as: Allow horizontal scrolling if needed.

#### Display

Choose how a box participates in layout.

```css
display: grid;
```

Read it as: Use a grid layout for its children.

#### Comment

A note in CSS source that has no styling effect.

```css
/* Main card styles */
```

Read it as: Label the styles for yourself.

### Milestones

#### Milestone 1: Read your first CSS rule

Your result: Choose an element and change one visible setting.

A rule says: choose these elements, then apply these settings. Connect styles.css from your HTML head before testing it.

Words to know: Selector, Property, Value, Declaration

```css
p {
  color: #2684ed;
  font-size: 18px;
}
```

Read it in small pieces:

1. p is the selector: choose all paragraphs.
2. color is a property; #2684ed is its value.
3. font-size sets the text size.
4. A colon separates property and value; a semicolon ends each declaration.

What you should see:

```text
Paragraphs become blue and use an 18px font size.
```

Your turn: Change the color and size. Confirm only paragraphs are affected. If nothing changes, check the link path and the saved file.

Check: Which part chooses the elements?

1. 18px
2. color
3. p

Answer: 3. p is the selector. The other parts specify style settings.

#### Milestone 2: Reuse styles with a class

Your result: Style selected elements without affecting every paragraph.

A class is a reusable label from HTML. A CSS class selector begins with a dot. This rule works on any element with class="notice".

Words to know: Class selector, ID selector, Cascade

```css
.notice {
  color: #171319;
  background: #ffd33d;
}
```

Read it in small pieces:

1. .notice selects elements labeled notice.
2. color paints the text.
3. background paints the area behind the content.
4. Use <p class="notice">Saved</p> to try this rule.

What you should see:

```text
The labeled notice has dark text on yellow.
```

Your turn: Give two paragraphs the notice class and leave a third without it. Then add another notice rule later with the same selector and a different background.

Check: How do you select class="notice" in CSS?

1. .notice
2. #notice
3. notice()

Answer: 1. The dot marks a class selector. # marks an id selector.

#### Milestone 3: Understand space inside and outside

Your result: Tell padding, border, and margin apart.

Picture an element as a rectangle. Padding is space inside its boundary. Border is the boundary. Margin is space outside. border-box makes the declared width include padding and border.

Words to know: Box model, Padding, Margin, Border, box-sizing

```css
.card {
  box-sizing: border-box;
  width: 280px;
  padding: 16px;
  border: 2px solid #171319;
  margin: 24px;
}
```

Read it in small pieces:

1. The box’s overall border-box width is 280px.
2. padding separates its content from its border.
3. border draws the boundary.
4. margin separates this box from nearby content.

What you should see:

```text
A 280px-wide card with inner space, a boundary, and outer space.
```

Your turn: Apply the class to a div containing a paragraph. Change padding to 32px, then margin to 32px, one at a time. Observe which space changes.

Check: Which setting adds space inside the border?

1. margin
2. padding
3. z-index

Answer: 2. Padding is inside the border. Margin is outside.

#### Milestone 4: Make text comfortable to read

Your result: Choose readable colors, line spacing, and flexible sizes.

Readable text needs enough contrast and space. Many text settings inherit from a parent. Use relative sizes when they help the page respect a reader’s settings.

Words to know: Typography, rem / em, Inheritance, Color / background

```css
body {
  color: #171319;
  background: #fff5dc;
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}
p { max-width: 65ch; }
```

Read it in small pieces:

1. body provides the default text style.
2. system-ui uses an available system interface font.
3. 1rem uses the root font size.
4. line-height adds space between lines; 65ch limits the paragraph’s width relative to character width.

What you should see:

```text
Dark, readable text on cream with comfortably spaced lines.
```

Your turn: Use a paragraph of several sentences. Change line-height between 1 and 1.6, then keep the readable option. Zoom the browser to 200% and inspect the page.

Check: What is 1rem relative to?

1. The current image width
2. The number of paragraphs
3. The root font size

Answer: 3. rem is relative to the root element’s font size.

#### Milestone 5: Arrange a row with Flexbox

Your result: Place related items in a row that can wrap.

Flexbox arranges child items along one main direction. A row is useful for small groups such as navigation links. Let it wrap when the screen becomes narrow.

Words to know: Flexbox, Gap, justify-content / align-items

```css
.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
```

Read it in small pieces:

1. display: flex makes the container a flex layout.
2. flex-wrap permits another line when needed.
3. gap adds space between items.
4. align-items centers items along the cross axis.

What you should see:

```text
The children of .tools form a flexible row with gaps.
```

Your turn: Place three buttons inside <div class="tools">. Narrow the window and watch them wrap instead of squeezing beyond the screen.

Check: Which property creates space between flex items?

1. gap
2. font-family
3. src

Answer: 1. gap sets the spacing between items in this layout.

#### Milestone 6: Arrange cards with Grid

Your result: Create a two-column layout.

Grid is useful when rows and columns matter. A fraction unit divides available space. Two 1fr columns have equal shares.

Words to know: Grid, fr, Gap

```css
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
```

Read it in small pieces:

1. display: grid creates a grid container.
2. 1fr 1fr creates two equal flexible columns.
3. gap separates rows and columns.
4. The container’s child cards are placed into the grid.

What you should see:

```text
Four child cards appear as two rows of two cards.
```

Your turn: Put four .card elements inside .cards. Change the columns to 1fr 2fr and describe which column becomes wider.

Check: What does 1fr 1fr mean here?

1. One fixed pixel per column
2. Two equal shares of available space
3. One row only

Answer: 2. Each column receives one share, so they are equal.

#### Milestone 7: Adapt the page to a phone

Your result: Change layout when the viewport is narrow.

A media query applies styles when its condition matches. Give a wide layout fewer columns on a small screen. Fluid widths help boxes fit their container.

Words to know: Responsive design, Media query, Percentage

```css
.cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 600px) {
  .cards { grid-template-columns: 1fr; }
}
img { max-width: 100%; height: auto; }
```

Read it in small pieces:

1. The normal layout uses two columns.
2. The media query matches viewports at or below 600 CSS pixels.
3. The matching rule switches cards to one column.
4. The image can shrink to its container while keeping its proportions.

What you should see:

```text
Two columns on wider screens; one column on narrow screens.
```

Your turn: Inspect at widths around 390px and 900px. Check that text, images, and controls fit and the full page does not scroll sideways.

Check: When does this max-width query apply?

1. Only above 600px
2. At every width without a condition
3. At or below 600px

Answer: 3. max-width means the viewport may be that width or narrower.

#### Milestone 8: Finish your theme and keyboard states

Your result: Reuse a color and show which button has keyboard focus.

A small theme is a set of reusable choices. Give your accent a name instead of repeating it. Interactive elements need a visible keyboard focus state as well as pointer styling.

Words to know: Custom property, Pseudo-class, :focus-visible, Transition

```css
:root { --accent: #ff5937; }
button {
  background: var(--accent);
  color: #171319;
  border: 2px solid #171319;
  padding: 12px 16px;
  transition: background-color 0.2s;
}
button:hover { background: #ffd33d; }
button:focus-visible { outline: 3px solid #2684ed; outline-offset: 3px; }
```

Read it in small pieces:

1. --accent stores a reusable CSS value.
2. var(--accent) uses that value.
3. :hover responds to a pointer over the button.
4. :focus-visible makes keyboard navigation clear.

What you should see:

```text
A coral button with a yellow hover state and a visible focus outline.
```

Your turn: Apply a consistent theme to your HTML page. Tab through every link and button, inspect on a phone-sized window, and change --accent once to update your buttons. Next, open JavaScript.

Check: What does var(--accent) do?

1. Reuse the named CSS value
2. Declare a Java integer
3. Start a JavaScript function

Answer: 1. It substitutes the CSS custom property value. It is not a general-purpose programming variable.

Official references:

- [CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [CSS basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content)

## JavaScript — Interaction & web logic

Use JavaScript to respond to clicks, calculate results, and change a web page. It can also run on a server.

### Where to run the code

For milestones 1–6, open your browser’s developer console and type the JavaScript examples there. For page interaction, save app.js next to index.html and connect it with <script src="app.js" defer></script>. The console is different from the terminal.

### Word library

#### Variable

A name that refers to a value your program can use.

```javascript
let age = 20;
```

Read it as: Create age and give it the value 20.

Keep in mind: The name and the value are different things. A variable is a useful label, not a literal box.

#### Value

The actual piece of information, such as 20, "Mina", or true.

```javascript
let age = 20;
```

Read it as: 20 is the value; age is its name.

#### Initialization

Giving a variable its first value.

```javascript
let age = 20;
```

Read it as: Start age at 20.

Keep in mind: This is different from changing the value later.

#### Assignment

Make a name refer to the value on the right of =.

```javascript
age = 21;
```

Read it as: Set age to 21.

Keep in mind: = stores a value. It does not ask whether two values are equal.

#### Data type

The kind of value, such as a number, text, or a true/false value.

```javascript
let age = 20;
```

Read it as: 20 is a whole-number value.

#### Integer

A whole number without a fractional part: -2, 0, 20.

```javascript
let age = 20;
```

Read it as: Use a whole number for age or a count.

#### Floating-point number

A number that can represent a fractional amount, such as 2.5.

```javascript
let height = 1.65;
```

Read it as: Store a measured value with a decimal part.

Keep in mind: Many decimal fractions are approximate in binary. For exact prices, store whole minor units, such as paisa, or use a suitable decimal library.

#### String

Text stored as a value, usually written between quotes.

```javascript
const name = "Mina";
```

Read it as: Store the text Mina as a name.

Keep in mind: "20" is text; 20 is a number.

#### Boolean

A value with two possibilities: true or false.

```javascript
let ready = true;
```

Read it as: Record whether something is ready.

#### Comment

A note for humans that the program does not run.

```javascript
// A note
```

Read it as: Leave an explanation beside your code.

#### Syntax

The writing rules a language expects.

```javascript
let age = 20;
```

Read it as: Use the language’s spelling, punctuation, and spacing rules.

#### Statement

An instruction that tells the program to do something.

```javascript
console.log(age);
```

Read it as: Show the current age.

#### Expression

A piece of code that produces a value.

```javascript
2 + 3
```

Read it as: Calculate a value of 5.

#### Operator

A symbol or word that performs a calculation or comparison.

```javascript
2 + 3
```

Read it as: + adds the two numbers.

#### Comparison

A question whose answer is true or false.

```javascript
age === 20
```

Read it as: Ask whether age is equal to 20.

#### Condition

A true/false question used to decide what happens next.

```javascript
if (age >= 18) { console.log("Adult"); }
```

Read it as: Check whether age is at least 18.

#### if / else

Choose one path when a condition is true and another when it is false.

```javascript
if (age >= 18) { console.log("Adult"); }
```

Read it as: Run the message only if the condition is true.

#### Loop

Repeat a set of instructions.

```javascript
for (let i = 0; i < 3; i++) { console.log(i); }
```

Read it as: Repeat once for each value of i.

#### Iteration

One trip through a loop’s instructions.

```javascript
for (let i = 0; i < 3; i++) { console.log(i); }
```

Read it as: The pass with i equal to 0 is the first iteration.

#### Function

A named group of instructions you can use again.

```javascript
function add(a, b) { return a + b; }
```

Read it as: Define a reusable way to add two values.

#### Parameter

A name a function uses for an incoming value.

```javascript
function add(a, b) { return a + b; }
```

Read it as: a and b are the input names in the function definition.

#### Argument

An actual value supplied when you call a function.

```javascript
add(2, 3)
```

Read it as: Give 2 and 3 to the function.

Keep in mind: Parameter is the name in the definition; argument is the supplied value.

#### Return

Send a result back from a function and end that call.

```javascript
function add(a, b) { return a + b; }
```

Read it as: Give the sum back to the caller.

Keep in mind: Returning a value does not automatically print it.

#### Array

A collection that can hold several values.

```javascript
const scores = [10, 20, 30];
```

Read it as: Group the scores together.

#### Index

A position used to find an item in a sequence.

```javascript
scores[0]
```

Read it as: Get the first score using position 0.

Keep in mind: The first position is 0 in these examples, not 1.

#### Scope

The part of a program where a name is available.

```javascript
function add(a, b) { return a + b; }
```

Read it as: a and b are available inside this function.

#### Increment

Increase a number, often by one.

```javascript
age = age + 1;
```

Read it as: Read the old age, add 1, and store the new age.

#### Output

Information a program shows or sends out.

```javascript
console.log(age);
```

Read it as: Display age so a person can see it.

#### Input

Information supplied to a program.

```javascript
add(2, 3)
```

Read it as: 2 and 3 are inputs to this calculation.

#### Empty value

A special value used to represent no value.

```javascript
null
```

Read it as: Record that no value is available.

Keep in mind: An empty value is not the same as 0, false, or an empty string.

#### Bug

A mistake that makes a program behave differently from what you intended.

```javascript
Expected: 5
Actual: 23
```

Read it as: Compare the result with your expectation.

#### Debugging

Find why a program fails, then check a fix.

```javascript
console.log(age);
```

Read it as: Print a value to see what the program is using.

#### Algorithm

A clear set of steps for solving a problem.

```javascript
Check each score until you find 20.
```

Read it as: Describe the steps before writing the code.

#### Linear search

Look at items one by one until you find the target or reach the end.

```javascript
[3, 7, 11, 15] → find 11
```

Read it as: Check 3, then 7, then 11.

Keep in mind: Works on an unsorted list too. It may need to check every item.

#### Binary search

Find a target in a sorted sequence by checking the middle and discarding the half that cannot contain it.

```javascript
[3, 7, 11, 15, 19, 23, 27] → find 23
```

Read it as: Check 15. Since 23 is larger, search the right half. Check 23: found.

Keep in mind: The order must match your comparisons. This is an algorithm, not a language keyword. See the Algorithms tab for the full example.

#### Dry run

Follow code by hand and record how its values change.

```javascript
age: 20 → age + 1 → 21
```

Read it as: Trace the instruction without running it.

#### Big O

A way to describe how work grows as the input becomes larger.

```javascript
Linear search: O(n)
Binary search: O(log n)
```

Read it as: A bigger list means more possible checks.

Keep in mind: This compares growth, not exact seconds. Binary search’s logarithmic search assumes a sorted sequence with efficient indexing.

#### Library

Reusable code supplied so you do not have to write every operation yourself.

```javascript
Math.floor(2.5)
```

Read it as: Use an existing operation instead of rebuilding it.

#### let

Declare a variable you can reassign.

```javascript
let age = 20;
age = 21;
```

Read it as: Create age, then change it.

#### const

Declare a name that you cannot reassign.

```javascript
const scores = [10, 20];
scores.push(30);
```

Read it as: Keep the same array reference, but add an item.

Keep in mind: const does not freeze the contents of objects or arrays.

#### Number

The usual JavaScript type for both whole and fractional numbers.

```javascript
let age = 20;
let height = 1.65;
```

Read it as: Both values use Number.

Keep in mind: JavaScript does not have separate ordinary int and float declarations. BigInt is a separate type for large whole numbers.

#### Declaration

Introduce a variable name.

```javascript
let age;
```

Read it as: Declare age before giving it a value.

Keep in mind: Here age initially has the value undefined.

#### undefined

A value often meaning no value has been assigned or supplied.

```javascript
let age;
console.log(age);
```

Read it as: This prints undefined.

#### ===

Compare values without converting one type to another.

```javascript
20 === "20"
```

Read it as: Ask whether these have matching types and values. The answer is false.

#### Console

The browser developer-tools area that shows messages and errors.

```javascript
console.log("Hello");
```

Read it as: Show Hello in the developer console, not as page text.

#### DOM

The browser’s object representation of the HTML document.

```javascript
document.querySelector("h1")
```

Read it as: Find the first heading in the document.

#### Event

Something that happens, such as a click or an input change.

```javascript
button.addEventListener("click", greet);
```

Read it as: Call greet when the button receives a click.

#### Callback

A function supplied so another operation can call it.

```javascript
button.addEventListener("click", greet);
```

Read it as: Supply greet as the function to call later.

#### textContent

Read or replace the plain text inside a DOM node.

```javascript
heading.textContent = "Hello";
```

Read it as: Change a heading to display Hello.

Keep in mind: Use plain text for user-supplied text. It does not interpret text as HTML.

#### Template literal

Text in backticks that can insert values using ${…}.

```javascript
const message = `Hello, ${name}`;
```

Read it as: Insert the current name into the greeting.

#### Object

A value grouping named properties.

```javascript
const student = { name: "Mina", age: 20 };
```

Read it as: Store two facts about one student.

#### Method

A function available as a property of an object.

```javascript
scores.push(30);
```

Read it as: Call the array’s push method to add 30.

#### Promise / async

A way to work with a result that may become available later.

```javascript
const response = await fetch("/data.json");
```

Read it as: Wait for a request in an async function.

Keep in mind: Network requests can fail. This is a later topic after the beginner milestones.

#### JSON

A text format often used to exchange structured data.

```javascript
{"name":"Mina","age":20}
```

Read it as: Represent named data as text.

Keep in mind: JSON is not the same thing as a live JavaScript object.

#### Module

A file that can export and import reusable code.

```javascript
export function add(a, b) { return a + b; }
```

Read it as: Make add available to another module.

### Milestones

#### Milestone 1: Show a message

Your result: Run one instruction and know where its output appears.

Start in your browser’s developer console. console.log displays a value there, so you can see what your program is doing. Each example is separate: refresh the practice page if an earlier const declaration causes a repeated-name error.

Words to know: Statement, Output, Console, Comment

```javascript
// My first instruction
console.log("Hello, First Comet!");
```

Read it in small pieces:

1. // begins a comment for humans.
2. console.log calls a method that writes to the console.
3. The quoted text is the value being shown.
4. The semicolon ends this statement.

What you should see:

```text
Hello, First Comet!
```

Your turn: Print your name, then a second message about what you want to build. Find the output in the developer console.

Check: Where does console.log normally show its message in a browser?

1. In a database
2. In the developer console
3. Automatically in the page heading

Answer: 2. console.log writes to the console. Changing the page requires a DOM operation.

#### Milestone 2: Initialize whole and decimal numbers

Your result: Name a value and tell its first assignment from a later change.

A variable gives a value a name. Initializing gives it the first value. JavaScript uses Number for ordinary whole and fractional numbers; you do not write int or float before the name.

Words to know: Variable, Initialization, Assignment, let, const, Number

```javascript
let age = 20;
const height = 1.65;
age = 21;
console.log(age);
console.log(height);
```

Read it in small pieces:

1. let age = 20 declares age and initializes it to 20.
2. const height gives this name a value that cannot be reassigned.
3. age = 21 changes age after initialization.
4. Both age and height hold Number values.

What you should see:

```text
21
1.65
```

Your turn: Create a changing count and a fixed starting height. Change the count, print both, and explain the two uses of =.

Check: What is initialization?

1. Checking whether values are equal
2. Printing a number
3. Giving a variable its first value

Answer: 3. Initialization is the first value assignment. A later assignment updates the name.

#### Milestone 3: Use text and true or false

Your result: Keep text, numbers, and boolean values distinct.

Text uses quotes. true and false are boolean values and do not use quotes. A template literal uses backticks and can insert a value inside ${…}.

Words to know: String, Boolean, Template literal, Data type

```javascript
const name = "Mina";
const ready = true;
console.log(`Hello, ${name}`);
console.log(ready);
console.log("20");
```

Read it in small pieces:

1. name holds a String value.
2. ready holds a Boolean value.
3. The template inserts Mina into the greeting.
4. "20" is text even though it contains digits.

What you should see:

```text
Hello, Mina
true
20
```

Your turn: Create a greeting using your name and a boolean named learning. Change "20" to 20 and inspect their types with typeof.

Check: Which value is a boolean?

1. true
2. "true"
3. "20"

Answer: 1. true without quotes is a boolean. Quotes make the other values strings.

#### Milestone 4: Calculate and make a decision

Your result: Use arithmetic and choose a path with a comparison.

A calculation gives a new value. A comparison gives true or false. if chooses what to run based on that answer. Use === when you intend no type conversion in equality checks.

Words to know: Operator, Comparison, ===, Condition, if / else

```javascript
const score = 40 + 25;
if (score >= 50) {
  console.log("Pass");
} else {
  console.log("Try again");
}
console.log(20 === "20");
```

Read it in small pieces:

1. 40 + 25 produces 65.
2. score >= 50 asks whether score is at least 50.
3. The true branch prints Pass.
4. 20 === "20" is false because number and text are different types.

What you should see:

```text
Pass
false
```

Your turn: Use scores below, equal to, and above 50. Predict each result before running the example.

Check: What does score >= 50 produce?

1. A new array
2. A true/false answer
3. The number 50 every time

Answer: 2. A comparison answers a question with a boolean value.

#### Milestone 5: Store a list and repeat

Your result: Access an array item and visit every score.

An array groups several values. Its first position is 0. A for…of loop visits each value so you do not have to write the same print instruction many times.

Words to know: Array, Index, Loop, Iteration

```javascript
const scores = [10, 20, 30];
console.log(scores[0]);
for (const score of scores) {
  console.log(score);
}
```

Read it in small pieces:

1. The array holds three numbers.
2. scores[0] reads the first one.
3. for…of supplies each value under the name score.
4. The loop body runs once per item.

What you should see:

```text
10
10
20
30
```

Your turn: Add 40 to the array. Predict the output, then run it. Explain why 10 is printed twice.

Check: What is scores[0] in this example?

1. 30
2. The length 3
3. 10

Answer: 3. Index 0 refers to the first item, which is 10.

#### Milestone 6: Reuse a calculation with a function

Your result: Supply arguments and use the returned result.

A function names reusable instructions. Parameters are its input names. Arguments are the values you supply. return sends a value back; console.log is what displays it here.

Words to know: Function, Parameter, Argument, Return

```javascript
function add(a, b) {
  return a + b;
}
const total = add(2, 3);
console.log(total);
```

Read it in small pieces:

1. function add defines the reusable calculation.
2. a and b are parameters.
3. add(2, 3) supplies two arguments.
4. return produces 5; total stores it; console.log displays it.

What you should see:

```text
5
```

Your turn: Create double(number) returning number * 2. Call it with 4 and 7, then print the results.

Check: What is the role of return?

1. Send a result back from the function
2. Always display page text
3. Create a CSS rule

Answer: 1. return hands a result to the caller. Displaying it is a separate action.

#### Milestone 7: Respond to a page click

Your result: Find HTML elements and change plain text after an event.

Now connect JavaScript to HTML. The DOM lets code find and change page elements. addEventListener tells the browser which function to call when an event occurs. Use defer on the script so the elements exist first.

Words to know: DOM, Event, Callback, textContent

```javascript
// HTML body:
// <button id="greet" type="button">Say hello</button>
// <p id="message">Waiting</p>
// app.js, loaded with defer:
const button = document.querySelector("#greet");
const message = document.querySelector("#message");
button.addEventListener("click", () => {
  message.textContent = "Hello, First Comet!";
});
```

Read it in small pieces:

1. The HTML comments show what to place in your page, without the // markers.
2. querySelector finds elements using a selector.
3. The supplied function runs on a click.
4. textContent changes the paragraph’s plain text.

What you should see:

```text
Before click: Waiting
After click: Hello, First Comet!
```

Your turn: Build the two HTML elements, connect app.js with defer, and make the greeting yours. Test a mouse click and keyboard activation.

Check: Which operation changes the paragraph’s visible plain text?

1. console.log
2. message.textContent = "Hello"
3. Declaring const alone

Answer: 2. textContent replaces the node’s text. A console message does not edit HTML content.

#### Milestone 8: Build a useful little counter

Your result: Combine a variable, an event, and a page update.

A small interaction is enough for a first project. A count starts at zero. Each click changes it, then updates the page. This full HTML example has no server or database, so the count resets on refresh.

Words to know: Variable, Increment, Event, DOM

```javascript
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Study counter</title></head>
<body>
  <h1>Study sessions</h1>
  <p id="count" aria-live="polite">0</p>
  <button id="add" type="button">Add a session</button>
  <script>
    let count = 0;
    const output = document.querySelector("#count");
    document.querySelector("#add").addEventListener("click", () => {
      count = count + 1;
      output.textContent = count;
    });
  </script>
</body>
</html>
```

Read it in small pieces:

1. The script appears after the elements it uses.
2. count = 0 initializes the state.
3. Each click increments count by one.
4. textContent shows the new value; aria-live allows an assistive tool to announce the change.

What you should see:

```text
Initial count: 0
After three clicks: 3
After a page refresh: 0
```

Your turn: Create the page locally, add a reset button, and style it with CSS. Explain why it resets after refresh. Then open Algorithms to practice searching.

Check: After three clicks and a page refresh, what is the count in this code?

1. 3 forever
2. An automatically saved database value
3. 0

Answer: 3. The script runs again and initializes count to 0. This example does not persist data.

Official references:

- [JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Variables and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)

## Java — Typed programming & applications

Use Java for programming fundamentals, larger applications, and backend systems. Java and JavaScript are different languages.

### Where to run the code

Install a JDK from an official distributor. Save the full starter program as Main.java. In that folder’s terminal run javac Main.java, then java Main. In milestones 2–7, put snippets inside the starter’s main method. Milestone 8 shows the full file again.

### Word library

#### Variable

A name that refers to a value your program can use.

```java
int age = 20;
```

Read it as: Create age and give it the value 20.

Keep in mind: The name and the value are different things. A variable is a useful label, not a literal box.

#### Value

The actual piece of information, such as 20, "Mina", or true.

```java
int age = 20;
```

Read it as: 20 is the value; age is its name.

#### Initialization

Giving a variable its first value.

```java
int age = 20;
```

Read it as: Start age at 20.

Keep in mind: This is different from changing the value later.

#### Assignment

Make a name refer to the value on the right of =.

```java
age = 21;
```

Read it as: Set age to 21.

Keep in mind: = stores a value. It does not ask whether two values are equal.

#### Data type

The kind of value, such as a number, text, or a true/false value.

```java
int age = 20;
```

Read it as: 20 is a whole-number value.

#### Integer

A whole number without a fractional part: -2, 0, 20.

```java
int age = 20;
```

Read it as: Use a whole number for age or a count.

#### Floating-point number

A number that can represent a fractional amount, such as 2.5.

```java
float height = 1.65f;
```

Read it as: Store a measured value with a decimal part.

Keep in mind: Many decimal fractions are approximate in binary. For exact prices, store whole minor units, such as paisa, or use a suitable decimal library.

#### Boolean

A value with two possibilities: true or false.

```java
boolean ready = true;
```

Read it as: Record whether something is ready.

#### Comment

A note for humans that the program does not run.

```java
// A note
```

Read it as: Leave an explanation beside your code.

#### Syntax

The writing rules a language expects.

```java
int age = 20;
```

Read it as: Use the language’s spelling, punctuation, and spacing rules.

#### Statement

An instruction that tells the program to do something.

```java
System.out.println(age);
```

Read it as: Show the current age.

#### Expression

A piece of code that produces a value.

```java
2 + 3
```

Read it as: Calculate a value of 5.

#### Operator

A symbol or word that performs a calculation or comparison.

```java
2 + 3
```

Read it as: + adds the two numbers.

#### Comparison

A question whose answer is true or false.

```java
age == 20
```

Read it as: Ask whether age is equal to 20.

#### Condition

A true/false question used to decide what happens next.

```java
if (age >= 18) { System.out.println("Adult"); }
```

Read it as: Check whether age is at least 18.

#### if / else

Choose one path when a condition is true and another when it is false.

```java
if (age >= 18) { System.out.println("Adult"); }
```

Read it as: Run the message only if the condition is true.

#### Loop

Repeat a set of instructions.

```java
for (int i = 0; i < 3; i++) { System.out.println(i); }
```

Read it as: Repeat once for each value of i.

#### Iteration

One trip through a loop’s instructions.

```java
for (int i = 0; i < 3; i++) { System.out.println(i); }
```

Read it as: The pass with i equal to 0 is the first iteration.

#### Function

A named group of instructions you can use again.

```java
static int add(int a, int b) { return a + b; }
```

Read it as: Define a reusable way to add two values.

#### Parameter

A name a function uses for an incoming value.

```java
static int add(int a, int b) { return a + b; }
```

Read it as: a and b are the input names in the function definition.

#### Argument

An actual value supplied when you call a function.

```java
add(2, 3)
```

Read it as: Give 2 and 3 to the function.

Keep in mind: Parameter is the name in the definition; argument is the supplied value.

#### Return

Send a result back from a function and end that call.

```java
static int add(int a, int b) { return a + b; }
```

Read it as: Give the sum back to the caller.

Keep in mind: Returning a value does not automatically print it.

#### Array

A collection that can hold several values.

```java
int[] scores = {10, 20, 30};
```

Read it as: Group the scores together.

Keep in mind: A Java array has a fixed length.

#### Index

A position used to find an item in a sequence.

```java
scores[0]
```

Read it as: Get the first score using position 0.

Keep in mind: The first position is 0 in these examples, not 1.

#### Scope

The part of a program where a name is available.

```java
static int add(int a, int b) { return a + b; }
```

Read it as: a and b are available inside this function.

#### Increment

Increase a number, often by one.

```java
age = age + 1;
```

Read it as: Read the old age, add 1, and store the new age.

#### Output

Information a program shows or sends out.

```java
System.out.println(age);
```

Read it as: Display age so a person can see it.

#### Input

Information supplied to a program.

```java
add(2, 3)
```

Read it as: 2 and 3 are inputs to this calculation.

#### Empty value

A special value used to represent no value.

```java
null
```

Read it as: Record that no value is available.

Keep in mind: An empty value is not the same as 0, false, or an empty string.

#### Bug

A mistake that makes a program behave differently from what you intended.

```java
Expected: 5
Actual: 23
```

Read it as: Compare the result with your expectation.

#### Debugging

Find why a program fails, then check a fix.

```java
System.out.println(age);
```

Read it as: Print a value to see what the program is using.

#### Algorithm

A clear set of steps for solving a problem.

```java
Check each score until you find 20.
```

Read it as: Describe the steps before writing the code.

#### Linear search

Look at items one by one until you find the target or reach the end.

```java
[3, 7, 11, 15] → find 11
```

Read it as: Check 3, then 7, then 11.

Keep in mind: Works on an unsorted list too. It may need to check every item.

#### Binary search

Find a target in a sorted sequence by checking the middle and discarding the half that cannot contain it.

```java
[3, 7, 11, 15, 19, 23, 27] → find 23
```

Read it as: Check 15. Since 23 is larger, search the right half. Check 23: found.

Keep in mind: The order must match your comparisons. This is an algorithm, not a language keyword. See the Algorithms tab for the full example.

#### Dry run

Follow code by hand and record how its values change.

```java
age: 20 → age + 1 → 21
```

Read it as: Trace the instruction without running it.

#### Big O

A way to describe how work grows as the input becomes larger.

```java
Linear search: O(n)
Binary search: O(log n)
```

Read it as: A bigger list means more possible checks.

Keep in mind: This compares growth, not exact seconds. Binary search’s logarithmic search assumes a sorted sequence with efficient indexing.

#### Library

Reusable code supplied so you do not have to write every operation yourself.

```java
import java.util.Arrays;
```

Read it as: Use an existing operation instead of rebuilding it.

#### int

Java’s 32-bit whole-number type.

```java
int age = 20;
```

Read it as: Declare an integer called age and initialize it to 20.

#### float

Java’s 32-bit floating-point number type.

```java
float height = 1.65f;
```

Read it as: Store an approximate fractional number.

Keep in mind: The f suffix makes this decimal literal a float. Without it, 1.65 is a double literal.

#### double

Java’s 64-bit floating-point type, with more precision than float.

```java
double height = 1.65;
```

Read it as: Store the decimal using double.

#### char

One UTF-16 code unit written using single quotes.

```java
char grade = 'A';
```

Read it as: Store the letter A.

Keep in mind: Some characters, including many emoji, need two char values. Use String for ordinary text.

#### String

Java’s class for text, written with double quotes.

```java
String name = "Mina";
```

Read it as: Store a text name.

Keep in mind: String is a reference type, not one of Java’s primitive types.

#### Declaration

Introduce a variable by writing its type and name.

```java
int age;
```

Read it as: Declare an integer called age.

Keep in mind: A local variable must be assigned before it is used. Do not assume it starts at 0.

#### Primitive type

One of Java’s eight basic built-in value types.

```java
byte, short, int, long, float, double, char, boolean
```

Read it as: Choose the type that fits your value.

#### Class

A named definition that groups fields and methods and can describe objects.

```java
public class Main { … }
```

Read it as: Group this program under the name Main.

#### Object / new

An instance created from a class.

```java
StringBuilder text = new StringBuilder();
```

Read it as: Create a StringBuilder object.

#### public

An access modifier that makes a class or member accessible from other code where its context permits.

```java
public class Main { … }
```

Read it as: Make Main a public class.

#### static

A member belongs to the class rather than to a particular object.

```java
static int add(int a, int b) { return a + b; }
```

Read it as: Call add from this class without first creating an object.

#### void

A method does not return a value.

```java
static void greet() { System.out.println("Hello"); }
```

Read it as: Print a greeting without returning a result.

#### main

The conventional entry method used by this course’s Java programs.

```java
public static void main(String[] args) { … }
```

Read it as: Start running the instructions inside main.

#### String[] args

The array of text arguments supplied to main from the command line.

```java
public static void main(String[] args)
```

Read it as: Name the incoming command-line argument array args.

#### System.out.println

Print a value followed by a new line to standard output.

```java
System.out.println("Hello");
```

Read it as: Show Hello on its own output line.

#### JDK / compiler / JVM

The JDK supplies development tools; the compiler translates Java source; the JVM runs the resulting bytecode.

```java
javac Main.java
java Main
```

Read it as: Compile Main.java, then run Main.

Keep in mind: Terminal commands are not lines you put inside the Java file.

#### equals

Compare the contents of strings.

```java
"Mina".equals(name)
```

Read it as: Ask whether name contains the text Mina.

Keep in mind: For String content use equals. == compares references, not text content.

#### length

The number of items in an array.

```java
scores.length
```

Read it as: Count the array’s slots.

Keep in mind: String length uses length(), while an array uses length.

#### final

Prevent reassignment after a variable has been assigned.

```java
final int LIMIT = 10;
```

Read it as: Keep LIMIT assigned to 10.

Keep in mind: For an object reference, final does not freeze the object.

#### Exception

An event that interrupts normal execution when an operation fails.

```java
Integer.parseInt("hello")
```

Read it as: This fails because hello cannot be parsed as an integer.

#### import

Allow a type to be used by a shorter name.

```java
import java.util.Arrays;
```

Read it as: Use Arrays without spelling its full package name.

#### ArrayList

A resizable list from Java’s standard library.

```java
ArrayList<Integer> scores = new ArrayList<>();
```

Read it as: Create an initially empty list of Integer values.

Keep in mind: Import java.util.ArrayList first. A normal array has fixed length.

### Milestones

#### Milestone 1: Run a complete Java program

Your result: Know which part starts the program and where the output appears.

Save this full example as Main.java. Run javac Main.java and then java Main in its folder. The outer class groups the program. The conventional main method is the entry point used here. You will place the next small snippets inside main.

Words to know: Class, public, static, void, main, String[] args, System.out.println, JDK / compiler / JVM

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, First Comet!");
    }
}
```

Read it in small pieces:

1. public class Main defines this named class.
2. main is the method where this program begins.
3. static means this entry method belongs to the class; void means it returns no value.
4. String[] args names the incoming command-line text array.
5. System.out.println writes a line to terminal output.

What you should see:

```text
Hello, First Comet!
```

Your turn: Compile and run it, then change the greeting. Keep the public class name Main and filename Main.java matched.

Check: Which instruction displays the greeting?

1. String[] args
2. System.out.println
3. The file extension alone

Answer: 2. System.out.println writes output. The surrounding declarations organize how the program starts.

#### Milestone 2: Declare and initialize integers and floats

Your result: Read every part of int age = 20 and float height = 1.65f.

Java asks for a type before a variable name. int means a whole-number value. float and double can represent fractional values. Declaration introduces the name; initialization gives its first value. A local variable needs a value before use.

Words to know: Declaration, Initialization, int, float, double, Assignment

```java
int age = 20;
float height = 1.65f;
double temperature = 36.5;
age = 21;
System.out.println(age);
System.out.println(height);
```

Read it in small pieces:

1. int: whole-number type. age: name. =: assign. 20: first value. ;: end statement.
2. float height stores a fractional value; f makes this literal a float.
3. double uses more precision than float; an ordinary decimal literal is double.
4. age = 21 updates an already initialized variable.

What you should see:

```text
21
1.65
```

Your turn: Create an int bookCount and a float distance. Initialize both and print them. Write int nextCount; and assign it before printing to see the difference between declaration and initialization.

Check: Which is a valid float initialization in this course?

1. float height = 1.65f;
2. int height = 1.65;
3. float = height;

Answer: 1. The f suffix gives the decimal literal the float type. int cannot hold the fractional value as written.

#### Milestone 3: Store text, a letter, and a boolean

Your result: Choose String, char, and boolean for different values.

Use String for text, char for a UTF-16 code unit, and boolean for true/false. Strings use double quotes; a char literal uses single quotes. For String content comparison, use equals.

Words to know: String, char, Boolean, Data type, equals

```java
String name = "Mina";
char grade = 'A';
boolean ready = true;
System.out.println("Hello, " + name);
System.out.println(grade);
System.out.println("Mina".equals(name));
```

Read it in small pieces:

1. name stores text; String starts with a capital S.
2. grade stores A using a char literal.
3. ready stores true without quotes.
4. + joins these strings; equals compares text content.

What you should see:

```text
Hello, Mina
A
true
```

Your turn: Change the name and grade. Predict the equals result for a different name. Do not use == as a general String-content comparison.

Check: Which should you use to compare String content?

1. = assignment
2. == in every case
3. equals

Answer: 3. equals compares contents. == on String references asks whether they refer to the same object.

#### Milestone 4: Calculate and choose a branch

Your result: Use arithmetic and an if / else decision.

Arithmetic produces a number. A comparison produces a boolean. Use if and else to choose the next instruction. Integer division needs attention: 5 / 2 uses integer operands and produces 2.

Words to know: Operator, Comparison, Condition, if / else

```java
int score = 40 + 25;
if (score >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Try again");
}
System.out.println(5 / 2);
System.out.println(5.0 / 2);
```

Read it in small pieces:

1. score starts at 65.
2. score >= 50 is true, so Pass prints.
3. 5 / 2 is integer division in this example.
4. 5.0 makes the second division a floating-point calculation.

What you should see:

```text
Pass
2
2.5
```

Your turn: Try scores 49, 50, and 75. Then calculate 7 / 2 and 7.0 / 2 and explain the difference.

Check: What does 5 / 2 produce with these int operands?

1. 2
2. 2.5
3. 5

Answer: 1. Integer division discards the fractional part of this positive result.

#### Milestone 5: Repeat instructions with a loop

Your result: Follow the start, condition, and update of a for loop.

A for loop has three control parts. Set a starting value, check whether another iteration is allowed, and update the counter after the body.

Words to know: Loop, Iteration, Increment, Comparison

```java
for (int i = 0; i < 3; i++) {
    System.out.println(i);
}
```

Read it in small pieces:

1. int i = 0 starts the counter at 0.
2. i < 3 is checked before each iteration.
3. println displays the current counter.
4. i++ increases the counter by one; the loop stops when i becomes 3.

What you should see:

```text
0
1
2
```

Your turn: Change the start to 1 and the condition to i <= 3. Predict and compare the output before running it.

Check: Why is 3 not printed in the original loop?

1. println cannot show 3
2. The condition i < 3 is false at 3
3. Java loops always stop at 2

Answer: 2. The strict less-than comparison excludes 3.

#### Milestone 6: Group values in an array

Your result: Read the first position and visit each value.

An array has a fixed number of slots. Its positions begin at zero. Use length to see how many slots there are, and a for-each loop to visit the values.

Words to know: Array, Index, length, Loop

```java
int[] scores = {10, 20, 30};
System.out.println(scores[0]);
System.out.println(scores.length);
for (int score : scores) {
    System.out.println(score);
}
```

Read it in small pieces:

1. int[] means an array of integers.
2. The initializer supplies three values.
3. scores[0] is 10 and scores.length is 3.
4. The for-each loop uses each score in order.

What you should see:

```text
10
3
10
20
30
```

Your turn: Add a fourth value in the initializer and inspect the new length. Do not access scores[4] in an array with four entries; its last valid index is 3.

Check: For a three-item array, which is its last valid index?

1. 3
2. 1
3. 2

Answer: 3. The positions are 0, 1, and 2.

#### Milestone 7: Trace a small algorithm by hand

Your result: Combine an array, a loop, and a condition to find a maximum.

Before a larger algorithm, track values one step at a time. Start with the first score as the current best. Replace best only when a larger score appears. This example assumes at least one score exists.

Words to know: Algorithm, Dry run, Loop, Condition

```java
int[] scores = {10, 30, 20};
int best = scores[0];
for (int score : scores) {
    if (score > best) {
        best = score;
    }
}
System.out.println(best);
```

Read it in small pieces:

1. best begins at 10.
2. Visiting 10 leaves best unchanged.
3. Visiting 30 updates best to 30.
4. Visiting 20 leaves best at 30.

What you should see:

```text
30
```

Your turn: Write a small trace for {40, 10, 50}. Then run it and compare. Explain why starting best at the first value also works with negative scores.

Check: What is best after visiting the score 20 here?

1. 30
2. 20
3. 10

Answer: 1. 20 is not larger than the stored best of 30, so the assignment does not run.

#### Milestone 8: Return a result from your own method

Your result: Finish a complete program with a reusable calculation.

Java calls functions attached to classes methods. Define this method inside Main but outside main. Inputs go into its parameters. An int return type promises an integer result.

Words to know: Function, Parameter, Argument, Return, static

```java
public class Main {
    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int total = add(2, 3);
        System.out.println(total);
    }
}
```

Read it in small pieces:

1. static int add defines a class method returning int.
2. a and b are the parameter names.
3. main calls it with argument values 2 and 3.
4. return sends 5 back; println displays that returned result.

What you should see:

```text
5
```

Your turn: Add a static int doubleScore(int score) method and call it from main with several values. Compile the full file after each change. Next, read Algorithms.

Check: Where does return send the result?

1. Automatically to a web page
2. Back to the method’s caller
3. To a CSS file

Answer: 2. The caller receives the result and can store it or pass it to println.

Official references:

- [Java language basics](https://dev.java/learn/language/constructs/)
- [Java getting started](https://dev.java/learn/getting-started/)

## Python — Automation, data & backend logic

Use Python for scripts, automation, data work, and backends. Start with small terminal programs.

### Where to run the code

Install Python from python.org. Save code in main.py. From that folder run python main.py; on some systems use python3 main.py or py main.py. VS Code edits the file; the Python interpreter runs it.

### Word library

#### Variable

A name that refers to a value your program can use.

```python
age = 20
```

Read it as: Create age and give it the value 20.

Keep in mind: The name and the value are different things. A variable is a useful label, not a literal box.

#### Value

The actual piece of information, such as 20, "Mina", or true.

```python
age = 20
```

Read it as: 20 is the value; age is its name.

#### Initialization

Giving a variable its first value.

```python
age = 20
```

Read it as: Start age at 20.

Keep in mind: This is different from changing the value later.

#### Assignment

Make a name refer to the value on the right of =.

```python
age = 21
```

Read it as: Set age to 21.

Keep in mind: = stores a value. It does not ask whether two values are equal.

#### Data type

The kind of value, such as a number, text, or a true/false value.

```python
age = 20
```

Read it as: 20 is a whole-number value.

#### Integer

A whole number without a fractional part: -2, 0, 20.

```python
age = 20
```

Read it as: Use a whole number for age or a count.

#### Floating-point number

A number that can represent a fractional amount, such as 2.5.

```python
height = 1.65
```

Read it as: Store a measured value with a decimal part.

Keep in mind: Many decimal fractions are approximate in binary. For exact prices, store whole minor units, such as paisa, or use a suitable decimal library.

#### String

Text stored as a value, usually written between quotes.

```python
name = "Mina"
```

Read it as: Store the text Mina as a name.

Keep in mind: "20" is text; 20 is a number.

#### Boolean

A value with two possibilities: true or false.

```python
ready = True
```

Read it as: Record whether something is ready.

#### Comment

A note for humans that the program does not run.

```python
# A note
```

Read it as: Leave an explanation beside your code.

#### Syntax

The writing rules a language expects.

```python
age = 20
```

Read it as: Use the language’s spelling, punctuation, and spacing rules.

#### Statement

An instruction that tells the program to do something.

```python
print(age)
```

Read it as: Show the current age.

#### Expression

A piece of code that produces a value.

```python
2 + 3
```

Read it as: Calculate a value of 5.

#### Operator

A symbol or word that performs a calculation or comparison.

```python
2 + 3
```

Read it as: + adds the two numbers.

#### Comparison

A question whose answer is true or false.

```python
age == 20
```

Read it as: Ask whether age is equal to 20.

#### Condition

A true/false question used to decide what happens next.

```python
if age >= 18:
    print("Adult")
```

Read it as: Check whether age is at least 18.

#### if / else

Choose one path when a condition is true and another when it is false.

```python
if age >= 18:
    print("Adult")
```

Read it as: Run the message only if the condition is true.

#### Loop

Repeat a set of instructions.

```python
for i in range(3):
    print(i)
```

Read it as: Repeat once for each value of i.

#### Iteration

One trip through a loop’s instructions.

```python
for i in range(3):
    print(i)
```

Read it as: The pass with i equal to 0 is the first iteration.

#### Function

A named group of instructions you can use again.

```python
def add(a, b):
    return a + b
```

Read it as: Define a reusable way to add two values.

#### Parameter

A name a function uses for an incoming value.

```python
def add(a, b):
    return a + b
```

Read it as: a and b are the input names in the function definition.

#### Argument

An actual value supplied when you call a function.

```python
add(2, 3)
```

Read it as: Give 2 and 3 to the function.

Keep in mind: Parameter is the name in the definition; argument is the supplied value.

#### Return

Send a result back from a function and end that call.

```python
def add(a, b):
    return a + b
```

Read it as: Give the sum back to the caller.

Keep in mind: Returning a value does not automatically print it.

#### List

A collection that can hold several values.

```python
scores = [10, 20, 30]
```

Read it as: Group the scores together.

#### Index

A position used to find an item in a sequence.

```python
scores[0]
```

Read it as: Get the first score using position 0.

Keep in mind: The first position is 0 in these examples, not 1.

#### Scope

The part of a program where a name is available.

```python
def add(a, b):
    return a + b
```

Read it as: a and b are available inside this function.

#### Increment

Increase a number, often by one.

```python
age = age + 1
```

Read it as: Read the old age, add 1, and store the new age.

#### Output

Information a program shows or sends out.

```python
print(age)
```

Read it as: Display age so a person can see it.

#### Input

Information supplied to a program.

```python
add(2, 3)
```

Read it as: 2 and 3 are inputs to this calculation.

#### Empty value

A special value used to represent no value.

```python
None
```

Read it as: Record that no value is available.

Keep in mind: An empty value is not the same as 0, false, or an empty string.

#### Bug

A mistake that makes a program behave differently from what you intended.

```python
Expected: 5
Actual: 23
```

Read it as: Compare the result with your expectation.

#### Debugging

Find why a program fails, then check a fix.

```python
print(age)
```

Read it as: Print a value to see what the program is using.

#### Algorithm

A clear set of steps for solving a problem.

```python
Check each score until you find 20.
```

Read it as: Describe the steps before writing the code.

#### Linear search

Look at items one by one until you find the target or reach the end.

```python
[3, 7, 11, 15] → find 11
```

Read it as: Check 3, then 7, then 11.

Keep in mind: Works on an unsorted list too. It may need to check every item.

#### Binary search

Find a target in a sorted sequence by checking the middle and discarding the half that cannot contain it.

```python
[3, 7, 11, 15, 19, 23, 27] → find 23
```

Read it as: Check 15. Since 23 is larger, search the right half. Check 23: found.

Keep in mind: The order must match your comparisons. This is an algorithm, not a language keyword. See the Algorithms tab for the full example.

#### Dry run

Follow code by hand and record how its values change.

```python
age: 20 → age + 1 → 21
```

Read it as: Trace the instruction without running it.

#### Big O

A way to describe how work grows as the input becomes larger.

```python
Linear search: O(n)
Binary search: O(log n)
```

Read it as: A bigger list means more possible checks.

Keep in mind: This compares growth, not exact seconds. Binary search’s logarithmic search assumes a sorted sequence with efficient indexing.

#### Library

Reusable code supplied so you do not have to write every operation yourself.

```python
import math
```

Read it as: Use an existing operation instead of rebuilding it.

#### int

Python’s whole-number type.

```python
age = 20
```

Read it as: 20 is an int; no int declaration is needed.

#### float

Python’s usual floating-point type for fractional numbers.

```python
height = 1.65
```

Read it as: 1.65 is a float.

#### str

Python’s text type.

```python
name = "Mina"
```

Read it as: Mina is a str value.

#### True / False / None

The exact spellings for boolean values and the no-value marker.

```python
ready = True
result = None
```

Read it as: Capitalization matters in Python.

#### Indentation

Spaces at the start of a line that group instructions into a block.

```python
if age >= 18:
    print("Adult")
```

Read it as: The indented print belongs to the if block.

Keep in mind: Use consistent indentation; this course uses four spaces.

#### def

Start a function definition.

```python
def greet(name):
    return "Hello " + name
```

Read it as: Define greet with one input name.

#### print

Write a value to output.

```python
print("Hello")
```

Read it as: Show Hello in the terminal.

#### input

Read one line typed by the user and return it as text.

```python
name = input("Your name: ")
```

Read it as: Ask for a name.

Keep in mind: For a number, convert and handle invalid input. input returns a string.

#### range

Produce a sequence of integer steps for a loop.

```python
range(3)
```

Read it as: Use 0, 1, and 2. The stop value 3 is excluded.

#### len

Return the number of items in a collection or characters in a string.

```python
len([10, 20, 30])
```

Read it as: The length is 3.

#### Dictionary / dict

A collection of keys paired with values.

```python
student = {"name": "Mina", "age": 20}
```

Read it as: Look up a fact using its key.

Keep in mind: A Python dict stores data. The word dictionary on this page means a glossary of terms.

#### Tuple

An ordered collection whose entries cannot be reassigned.

```python
point = (2, 3)
```

Read it as: Group two coordinates.

#### Set

A collection of unique values.

```python
colors = {"red", "blue"}
```

Read it as: Store each color once.

#### Slice

Take part of a sequence.

```python
scores[0:2]
```

Read it as: Get items at positions 0 and 1. Position 2 is excluded.

#### append

Add one item to the end of a list.

```python
scores.append(30)
```

Read it as: Add 30 to scores.

#### f-string

Text that can insert values inside braces.

```python
message = f"Hello, {name}"
```

Read it as: Insert name into the greeting.

#### //

Floor division: divide and round down to a whole-number result.

```python
7 // 2
```

Read it as: This gives 3. Negative results round toward negative infinity.

#### import

Load another module so you can use its names.

```python
import math
print(math.floor(2.5))
```

Read it as: Use math’s floor function.

#### try / except

Try an operation and handle a specified error if it occurs.

```python
try:
    age = int("hello")
except ValueError:
    print("Use a whole number")
```

Read it as: Handle invalid number text without pretending it succeeded.

#### Class / object

A class describes objects; an object is an instance of that class.

```python
class Student:
    pass
student = Student()
```

Read it as: Create one Student object.

Keep in mind: Classes are a later step after functions and collections.

### Milestones

#### Milestone 1: Run one small Python file

Your result: Write an instruction and see its terminal output.

Save this as main.py and run it with your Python interpreter. Python runs these statements in order. A # comment is a note rather than an instruction.

Words to know: print, Comment, Statement, Output

```python
# My first program
print("Hello, First Comet!")
```

Read it in small pieces:

1. # starts a comment.
2. print writes the supplied value to output.
3. The quotation marks make this a text value.

What you should see:

```text
Hello, First Comet!
```

Your turn: Print your name on another line. Save the file and run it again. Make sure you run the file from the right folder.

Check: Which operation shows the message?

1. An HTML tag
2. A CSS selector
3. print

Answer: 3. print writes the value to terminal output in this program.

#### Milestone 2: Initialize whole and decimal numbers

Your result: Give values names without Java-style declarations.

Python binds a name to a value with =. You do not write int or float before the name. The value has a type: 20 is an int and 1.65 is a float.

Words to know: Variable, Initialization, Assignment, int, float

```python
age = 20
height = 1.65
age = 21
print(age)
print(height)
```

Read it in small pieces:

1. age = 20 gives age its first value.
2. height refers to a floating-point value.
3. age = 21 changes the binding.
4. print shows the current values.

What you should see:

```text
21
1.65
```

Your turn: Create book_count and distance. Give them whole and fractional values, then change the count and print both.

Check: What does age = 21 do after age = 20?

1. Set age to the new value 21
2. Ask whether age equals 21
3. Declare a CSS property

Answer: 1. The assignment changes which value the name age refers to.

#### Milestone 3: Use text and booleans

Your result: Write Python’s capitalization correctly and insert text into a greeting.

Strings hold text. Python boolean values are spelled True and False with capital initials. An f-string inserts values between braces.

Words to know: String, str, True / False / None, f-string

```python
name = "Mina"
ready = True
print(f"Hello, {name}")
print(ready)
print("20")
```

Read it in small pieces:

1. name refers to text.
2. ready refers to the boolean True.
3. The f before the string enables value insertion.
4. "20" is a string, not an integer.

What you should see:

```text
Hello, Mina
True
20
```

Your turn: Use your own name and create learning = True. Inspect type(20) and type("20") to see the difference.

Check: Which spelling is Python’s boolean true value?

1. true
2. True
3. "True"

Answer: 2. Python uses True with a capital T. Quoted text is a string.

#### Milestone 4: Calculate and make a decision

Your result: Use a condition and understand indentation.

A colon starts an if or else block. The indented instructions belong to that block. Use / for ordinary division and // for floor division.

Words to know: Comparison, if / else, Indentation, //

```python
score = 40 + 25
if score >= 50:
    print("Pass")
else:
    print("Try again")
print(5 / 2)
print(5 // 2)
```

Read it in small pieces:

1. score is 65, so the if condition is true.
2. The four-space indentation groups each print with its branch.
3. 5 / 2 gives 2.5.
4. 5 // 2 gives the floor-division result 2.

What you should see:

```text
Pass
2.5
2
```

Your turn: Try scores 49, 50, and 75. Keep indentation consistent. Predict the effect of changing the comparison.

Check: How does Python show that print belongs to the if block?

1. Only with curly braces
2. By using a semicolon
3. With indentation

Answer: 3. Indentation is part of Python’s block structure.

#### Milestone 5: Repeat with range

Your result: Know why a range stop value is excluded.

A for loop visits each value from an iterable. range(3) supplies the integers 0, 1, and 2. The stop value is excluded.

Words to know: Loop, Iteration, range

```python
for i in range(3):
    print(i)
```

Read it in small pieces:

1. range(3) supplies three values.
2. i takes each one in order.
3. The indented print runs once for each value.

What you should see:

```text
0
1
2
```

Your turn: Change the range to range(1, 4). Predict the output before running it, then explain where the start and stop values are.

Check: Which values does range(3) supply?

1. 0, 1, 2
2. 1, 2, 3
3. 0, 1, 2, 3

Answer: 1. The default start is 0 and the stop value 3 is excluded.

#### Milestone 6: Keep several values in a list

Your result: Read a position, append a value, and count items.

A list holds several values in order. Index 0 is the first position. append adds an item, and len returns how many items there are.

Words to know: List, Index, append, len

```python
scores = [10, 20, 30]
print(scores[0])
scores.append(40)
print(len(scores))
for score in scores:
    print(score)
```

Read it in small pieces:

1. scores starts with three items.
2. scores[0] reads 10.
3. append adds 40 at the end.
4. len now returns 4; the loop visits every item.

What you should see:

```text
10
4
10
20
30
40
```

Your turn: Add a different score and predict the new length. Try scores[0:2] and identify which items the slice includes.

Check: What is len(scores) after append(40) here?

1. 3
2. 4
3. 40

Answer: 2. There are four items after adding one to the original three.

#### Milestone 7: Make a reusable function

Your result: Define inputs and return a calculation.

def starts a function definition. The indented body belongs to that function. A return expression gives the caller a result.

Words to know: def, Function, Parameter, Argument, Return

```python
def add(a, b):
    return a + b

total = add(2, 3)
print(total)
```

Read it in small pieces:

1. a and b are parameter names.
2. return computes and sends back their sum.
3. add(2, 3) supplies argument values.
4. total receives 5; print shows it.

What you should see:

```text
5
```

Your turn: Write double(number) and call it with 4 and 7. Predict each result. Keep the call outside the definition by removing its indentation.

Check: What are 2 and 3 in add(2, 3)?

1. CSS properties
2. The parameter names
3. Arguments

Answer: 3. They are the actual values supplied to the function. a and b are the parameters.

#### Milestone 8: Build a small student summary

Your result: Combine named records, a list, and a function.

A dictionary pairs keys with values, so one student can have a name and a list of scores. Combine the pieces you already learned into one small summary. This example expects a nonempty score list.

Words to know: Dictionary / dict, List, Function, Return

```python
def average(scores):
    return sum(scores) / len(scores)

student = {"name": "Mina", "scores": [60, 70, 80]}
result = average(student["scores"])
print(f"{student['name']}: {result}")
```

Read it in small pieces:

1. student is a dict with name and scores keys.
2. The score value is a list.
3. sum adds the scores; len counts them.
4. The function returns 70.0 and the f-string formats the summary.

What you should see:

```text
Mina: 70.0
```

Your turn: Add a second student and print their result. Add a condition for an empty scores list before dividing. Next, open Algorithms and follow a search by hand.

Check: Why must an empty scores list be handled here?

1. Its length is zero, so division would fail
2. Lists cannot contain numbers
3. Dictionaries cannot contain lists

Answer: 1. len([]) is 0. Dividing by zero raises an error.

Official references:

- [Python tutorial](https://docs.python.org/3/tutorial/)
- [Control flow and functions](https://docs.python.org/3/tutorial/controlflow.html)

## PHP — Web server logic

Use PHP to create server responses, process form submissions, and work with databases. The browser receives the response, not the PHP source.

### Where to run the code

Install PHP from an official source or use the PHP included with your local stack. For milestones 1–7, save the snippet after <?php and run php hello.php. For the final form, run php -S localhost:8000 in its folder and open http://localhost:8000/hello.php.

### Word library

#### Variable

A name that refers to a value your program can use.

```php
$age = 20;
```

Read it as: Create age and give it the value 20.

Keep in mind: The name and the value are different things. A variable is a useful label, not a literal box.

#### Value

The actual piece of information, such as 20, "Mina", or true.

```php
$age = 20;
```

Read it as: 20 is the value; age is its name.

#### Initialization

Giving a variable its first value.

```php
$age = 20;
```

Read it as: Start age at 20.

Keep in mind: This is different from changing the value later.

#### Assignment

Make a name refer to the value on the right of =.

```php
$age = 21;
```

Read it as: Set age to 21.

Keep in mind: = stores a value. It does not ask whether two values are equal.

#### Data type

The kind of value, such as a number, text, or a true/false value.

```php
$age = 20;
```

Read it as: 20 is a whole-number value.

#### Integer

A whole number without a fractional part: -2, 0, 20.

```php
$age = 20;
```

Read it as: Use a whole number for age or a count.

#### Floating-point number

A number that can represent a fractional amount, such as 2.5.

```php
$height = 1.65;
```

Read it as: Store a measured value with a decimal part.

Keep in mind: Many decimal fractions are approximate in binary. For exact prices, store whole minor units, such as paisa, or use a suitable decimal library.

#### String

Text stored as a value, usually written between quotes.

```php
$name = "Mina";
```

Read it as: Store the text Mina as a name.

Keep in mind: "20" is text; 20 is a number.

#### Boolean

A value with two possibilities: true or false.

```php
$ready = true;
```

Read it as: Record whether something is ready.

#### Comment

A note for humans that the program does not run.

```php
// A note
```

Read it as: Leave an explanation beside your code.

#### Syntax

The writing rules a language expects.

```php
$age = 20;
```

Read it as: Use the language’s spelling, punctuation, and spacing rules.

#### Statement

An instruction that tells the program to do something.

```php
echo $age;
```

Read it as: Show the current age.

#### Expression

A piece of code that produces a value.

```php
2 + 3
```

Read it as: Calculate a value of 5.

#### Operator

A symbol or word that performs a calculation or comparison.

```php
2 + 3
```

Read it as: + adds the two numbers.

#### Comparison

A question whose answer is true or false.

```php
$age === 20
```

Read it as: Ask whether age is equal to 20.

#### Condition

A true/false question used to decide what happens next.

```php
if ($age >= 18) { echo "Adult"; }
```

Read it as: Check whether age is at least 18.

#### if / else

Choose one path when a condition is true and another when it is false.

```php
if ($age >= 18) { echo "Adult"; }
```

Read it as: Run the message only if the condition is true.

#### Loop

Repeat a set of instructions.

```php
for ($i = 0; $i < 3; $i++) { echo $i; }
```

Read it as: Repeat once for each value of i.

#### Iteration

One trip through a loop’s instructions.

```php
for ($i = 0; $i < 3; $i++) { echo $i; }
```

Read it as: The pass with i equal to 0 is the first iteration.

#### Function

A named group of instructions you can use again.

```php
function add($a, $b) { return $a + $b; }
```

Read it as: Define a reusable way to add two values.

#### Parameter

A name a function uses for an incoming value.

```php
function add($a, $b) { return $a + $b; }
```

Read it as: a and b are the input names in the function definition.

#### Argument

An actual value supplied when you call a function.

```php
add(2, 3);
```

Read it as: Give 2 and 3 to the function.

Keep in mind: Parameter is the name in the definition; argument is the supplied value.

#### Return

Send a result back from a function and end that call.

```php
function add($a, $b) { return $a + $b; }
```

Read it as: Give the sum back to the caller.

Keep in mind: Returning a value does not automatically print it.

#### Array

A collection that can hold several values.

```php
$scores = [10, 20, 30];
```

Read it as: Group the scores together.

Keep in mind: A PHP array is an ordered map: it can also use named keys.

#### Index

A position used to find an item in a sequence.

```php
$scores[0]
```

Read it as: Get the first score using position 0.

Keep in mind: The first position is 0 in these examples, not 1.

#### Scope

The part of a program where a name is available.

```php
function add($a, $b) { return $a + $b; }
```

Read it as: a and b are available inside this function.

#### Increment

Increase a number, often by one.

```php
$age = $age + 1;
```

Read it as: Read the old age, add 1, and store the new age.

#### Output

Information a program shows or sends out.

```php
echo $age;
```

Read it as: Display age so a person can see it.

#### Input

Information supplied to a program.

```php
add(2, 3)
```

Read it as: 2 and 3 are inputs to this calculation.

#### Empty value

A special value used to represent no value.

```php
null
```

Read it as: Record that no value is available.

Keep in mind: An empty value is not the same as 0, false, or an empty string.

#### Bug

A mistake that makes a program behave differently from what you intended.

```php
Expected: 5
Actual: 23
```

Read it as: Compare the result with your expectation.

#### Debugging

Find why a program fails, then check a fix.

```php
echo $age;
```

Read it as: Print a value to see what the program is using.

#### Algorithm

A clear set of steps for solving a problem.

```php
Check each score until you find 20.
```

Read it as: Describe the steps before writing the code.

#### Linear search

Look at items one by one until you find the target or reach the end.

```php
[3, 7, 11, 15] → find 11
```

Read it as: Check 3, then 7, then 11.

Keep in mind: Works on an unsorted list too. It may need to check every item.

#### Binary search

Find a target in a sorted sequence by checking the middle and discarding the half that cannot contain it.

```php
[3, 7, 11, 15, 19, 23, 27] → find 23
```

Read it as: Check 15. Since 23 is larger, search the right half. Check 23: found.

Keep in mind: The order must match your comparisons. This is an algorithm, not a language keyword. See the Algorithms tab for the full example.

#### Dry run

Follow code by hand and record how its values change.

```php
age: 20 → age + 1 → 21
```

Read it as: Trace the instruction without running it.

#### Big O

A way to describe how work grows as the input becomes larger.

```php
Linear search: O(n)
Binary search: O(log n)
```

Read it as: A bigger list means more possible checks.

Keep in mind: This compares growth, not exact seconds. Binary search’s logarithmic search assumes a sorted sequence with efficient indexing.

#### Library

Reusable code supplied so you do not have to write every operation yourself.

```php
strlen("Mina")
```

Read it as: Use an existing operation instead of rebuilding it.

#### PHP tag

Mark the start of PHP source code.

```php
<?php
echo "Hello";
```

Read it as: Run the instructions after <?php.

Keep in mind: A PHP-only file can omit the closing tag.

#### $ variable

PHP variable names start with a dollar sign.

```php
$age = 20;
```

Read it as: Store 20 under the name age.

#### int / float

The whole-number and floating-point value types.

```php
$age = 20;
$height = 1.65;
```

Read it as: These assignments create int and float values without type declarations.

#### echo

Write text or a value to output.

```php
echo "Hello";
```

Read it as: Send Hello to the terminal or HTTP response.

#### Concatenation

Join text using PHP’s dot operator.

```php
echo "Hello " . $name;
```

Read it as: Join the greeting and the name.

Keep in mind: PHP uses . to join text. + is for arithmetic.

#### ===

Compare both type and value without type conversion.

```php
$age === 20
```

Read it as: Ask whether age is the integer 20.

#### Associative array

An array whose entries can use named keys.

```php
$student = ["name" => "Mina", "age" => 20];
```

Read it as: Group facts and look them up by key.

#### =>

Connect an array key with its value.

```php
["name" => "Mina"]
```

Read it as: Map the key name to the value Mina.

#### foreach

Visit the entries in a collection.

```php
foreach ($scores as $score) { echo $score; }
```

Read it as: Use each score once.

#### count

Return the number of items in an array.

```php
count($scores)
```

Read it as: Count the scores.

#### Type declaration

State the accepted parameter or returned value type.

```php
function add(int $a, int $b): int { return $a + $b; }
```

Read it as: Describe integer inputs and an integer result.

Keep in mind: This course uses simple matching values; strict_types and coercion rules are later topics.

#### $_GET / $_POST

Built-in arrays holding submitted request data.

```php
$name = $_GET["name"] ?? "";
```

Read it as: Read name from the URL query, or use empty text if it is missing.

Keep in mind: All request data is untrusted. Validate it before using it.

#### ??

Use a fallback if the value is missing or null.

```php
$name = $_GET["name"] ?? "";
```

Read it as: Use empty text if name is not available.

#### htmlspecialchars

Encode special characters when outputting text into HTML.

```php
echo htmlspecialchars($name, ENT_QUOTES, "UTF-8");
```

Read it as: Show the name as text in HTML.

Keep in mind: This is output encoding for HTML text and appropriate quoted attribute contexts. Other contexts need their own encoding.

#### Server-side

Code runs on the server before its response reaches the browser.

```php
php -S localhost:8000
```

Read it as: Start PHP’s local development server in the current folder.

Keep in mind: This server is for local practice. Opening a .php file directly does not execute PHP.

#### Session

A way for a server to remember information across requests.

```php
session_start();
```

Read it as: Start or resume session handling.

Keep in mind: Authentication and session security require more than this one line.

#### include / require

Load code from another PHP file.

```php
require "helpers.php";
```

Read it as: Load helpers.php before continuing.

Keep in mind: Use trusted, fixed paths; do not take include paths from user input.

#### Class / object

A class defines a kind of object; new creates an instance.

```php
class Student {}
$student = new Student();
```

Read it as: Create one Student object.

#### PDO

PHP’s interface for working with databases through drivers.

```php
$pdo->prepare("SELECT name FROM students WHERE id = ?");
```

Read it as: Prepare a query with a placeholder.

Keep in mind: Supply a real connection first and bind values. Database security is beyond this beginner course.

### Milestones

#### Milestone 1: Run PHP and display a message

Your result: Understand that the interpreter runs PHP.

Save this as hello.php. For now, run php hello.php in your terminal. A browser opening a .php file directly cannot interpret PHP. A local PHP server can run the code and send its output to the browser.

Words to know: PHP tag, echo, Server-side, Statement

```php
<?php
// My first PHP instruction
echo "Hello, First Comet!";
```

Read it in small pieces:

1. <?php starts PHP code.
2. // introduces a comment.
3. echo writes the text to output.
4. A semicolon ends the echo instruction.

What you should see:

```text
Hello, First Comet!
```

Your turn: Change the greeting and run the file again. If php is not recognized, finish the interpreter setup before moving on.

Check: What executes this PHP source?

1. CSS
2. The PHP interpreter
3. An img tag

Answer: 2. PHP needs its interpreter, used through the command line or a server.

#### Milestone 2: Initialize whole and decimal values

Your result: Use $ names and distinguish initialization from updates.

PHP variable names start with $. Assigning 20 creates an integer value. Assigning 1.65 creates a float value. Unlike Java, these assignments do not put int or float before the variable name. Keep these snippets after <?php in your file.

Words to know: $ variable, Initialization, Assignment, int / float

```php
$age = 20;
$height = 1.65;
$age = 21;
echo $age . "
";
echo $height . "
";
```

Read it in small pieces:

1. $age = 20 initializes the variable.
2. $height = 1.65 initializes a float.
3. $age = 21 updates age.
4. The dot joins each value with a newline for readable CLI output.

What you should see:

```text
21
1.65
```

Your turn: Create $bookCount and $distance, initialize them, then change the count. Print both and identify their types using var_dump if you want to inspect them.

Check: Which is a valid PHP variable assignment?

1. int age = 20;
2. age := 20
3. $age = 20;

Answer: 3. PHP variable names start with a dollar sign in this syntax.

#### Milestone 3: Join text and use booleans

Your result: Keep text, numbers, and true/false values distinct.

A string holds text. PHP’s dot joins text. true and false are boolean values without quotes. Use === to compare type as well as value.

Words to know: String, Boolean, Concatenation, ===

```php
$name = "Mina";
$ready = true;
echo "Hello, " . $name . "
";
var_dump($ready);
var_dump(20 === "20");
```

Read it in small pieces:

1. name holds text.
2. ready holds a boolean.
3. The dots join the greeting, name, and newline.
4. var_dump shows a value’s type; the strict comparison is false.

What you should see:

```text
Hello, Mina
bool(true)
bool(false)
```

Your turn: Use your name in the greeting. Compare 20 === 20 and 20 === "20" and explain why the answers differ.

Check: Which operator joins text in PHP?

1. .
2. + for all text
3. =>

Answer: 1. PHP uses the dot for concatenation. + is arithmetic.

#### Milestone 4: Choose a branch with if / else

Your result: Turn a comparison into a decision.

Calculate a score, then ask if it reaches a threshold. Braces group the instructions for each branch. Only the matching branch runs.

Words to know: Operator, Comparison, Condition, if / else

```php
$score = 40 + 25;
if ($score >= 50) {
    echo "Pass
";
} else {
    echo "Try again
";
}
```

Read it in small pieces:

1. The score is 65.
2. The comparison asks whether it is at least 50.
3. Because that condition is true, the first branch runs.
4. The other branch is skipped.

What you should see:

```text
Pass
```

Your turn: Try scores 49, 50, and 75. Write your expected output before running each case.

Check: At score 50, which message appears?

1. Try again
2. Pass
3. Both messages

Answer: 2. >= includes values equal to the threshold.

#### Milestone 5: Group values and named facts

Your result: Use indexed and associative arrays.

PHP arrays can use numeric indexes or named keys. A score list groups several numbers. A student record pairs a key such as name with its value. foreach visits the score values.

Words to know: Array, Associative array, Index, =>, foreach

```php
$scores = [10, 20, 30];
$student = ["name" => "Mina", "age" => 20];
echo $student["name"] . "
";
foreach ($scores as $score) {
    echo $score . "
";
}
```

Read it in small pieces:

1. scores uses positions 0, 1, and 2.
2. student uses the named keys name and age.
3. => connects a key to its value.
4. foreach assigns each score to $score for one iteration.

What you should see:

```text
Mina
10
20
30
```

Your turn: Add a goal key to the student record and print it. Add another score and confirm the loop includes it.

Check: What connects an associative-array key to its value?

1. ===
2. .
3. =>

Answer: 3. => separates a key from the value stored under that key.

#### Milestone 6: Trace a counted loop

Your result: Follow a counter from its start to its stop.

A counted for loop is useful when you know how many times to repeat. It has a start assignment, a condition, and an update.

Words to know: Loop, Iteration, Increment

```php
for ($i = 0; $i < 3; $i++) {
    echo $i . "
";
}
```

Read it in small pieces:

1. $i starts at 0.
2. $i < 3 is tested before each iteration.
3. echo displays the current value.
4. $i++ increases it by one; 3 fails the condition.

What you should see:

```text
0
1
2
```

Your turn: Change the loop to print 1 through 5. Before running it, write the start, condition, and update in words.

Check: Which values print in the original example?

1. 0, 1, 2
2. 1, 2, 3
3. Only 3

Answer: 1. The loop starts at 0 and excludes 3.

#### Milestone 7: Return a reusable calculation

Your result: Supply arguments to a typed function.

A function groups instructions under a name. PHP allows type declarations on parameters and results. Here both inputs and the output are integers. This example supplies matching integer values.

Words to know: Function, Parameter, Argument, Return, Type declaration

```php
function add(int $a, int $b): int {
    return $a + $b;
}
$total = add(2, 3);
echo $total;
```

Read it in small pieces:

1. int $a and int $b describe integer inputs.
2. : int describes the result type.
3. return sends the sum to the caller.
4. The caller stores 5, then echo displays it.

What you should see:

```text
5
```

Your turn: Write a function doubleScore(int $score): int and call it with several integers. Keep output outside the calculation function.

Check: Does return automatically display text in the browser?

1. Yes, always
2. No, it gives a result back to the caller
3. Only when a CSS file exists

Answer: 2. The caller receives the result. echo or another output operation must display it.

#### Milestone 8: Process a simple local form

Your result: Read untrusted request text and encode it before HTML output.

Save the full example in hello.php. Run php -S localhost:8000 in its folder, then open /hello.php at that localhost address. Treat input as untrusted. Validate its type and output it as HTML text with encoding. GET puts the name in the URL, so keep this exercise nonprivate.

Words to know: $_GET / $_POST, ??, htmlspecialchars, Server-side

```php
<?php
$value = $_GET["name"] ?? "";
$name = is_string($value) ? trim($value) : "";
?>
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Greeting</title></head>
<body>
<form method="get">
  <label for="name">Your name</label>
  <input id="name" name="name" type="text" required>
  <button type="submit">Say hello</button>
</form>
<p>Hello, <?= htmlspecialchars($name, ENT_QUOTES, "UTF-8") ?></p>
</body>
</html>
```

Read it in small pieces:

1. ?? supplies empty text when the request value is missing.
2. is_string rejects an array-shaped input; trim removes outside whitespace.
3. The form submits a name with GET.
4. htmlspecialchars encodes special characters before inserting the name into HTML text.

What you should see:

```text
A form. After submitting Mina, the page shows Hello, Mina.
```

Your turn: Submit your name, then try text containing < and > and confirm it stays text. Stop the local development server with Ctrl+C when done. This is a greeting exercise, not an account or production server.

Check: Which operation is used to encode user text before this HTML output?

1. echo alone
2. The CSS color property
3. htmlspecialchars

Answer: 3. HTML text output needs suitable encoding. htmlspecialchars supplies it for this context.

Official references:

- [PHP language reference](https://www.php.net/manual/en/langref.php)
- [PHP first page](https://www.php.net/manual/en/tutorial.firstpage.php)

## Compare languages

HTML structures content; CSS controls presentation. They have no direct equivalents for general-purpose integer declarations, loops, or binary-search functions. The following programming comparisons assume each snippet is placed in its proper runtime and context.

### Values

| Task | JavaScript | Java | Python | PHP |
| --- | --- | --- | --- | --- |
| Initialize a whole number | let age = 20; | int age = 20; | age = 20 | $age = 20; |
| Initialize a fractional number | let height = 1.65; | float height = 1.65f;<br>// or: double height = 1.65; | height = 1.65 | $height = 1.65; |
| Store text | const name = "Mina"; | String name = "Mina"; | name = "Mina" | $name = "Mina"; |
| Store true or false | const ready = true; | boolean ready = true; | ready = True | $ready = true; |
| Change a variable | age = 21; | age = 21; | age = 21 | $age = 21; |
| Join text and a value | const greeting = "Hello " + name; | String greeting = "Hello " + name; | greeting = "Hello " + name | $greeting = "Hello " . $name; |

- Initialize a whole number: Java states int explicitly. The other assignments use the value’s type. JavaScript’s ordinary numeric type is Number.
- Initialize a fractional number: Java float needs an f suffix here. Floating-point decimal values can be approximate in all four languages.
- Store text: Quotes make a text value. "20" is text; 20 is a number.
- Store true or false: Python capitalizes True and False.
- Change a variable: The JavaScript age must have been declared with let, rather than const, for this reassignment.
- Join text and a value: PHP uses . for concatenation. These examples assume name is a string.

### Logic

| Task | JavaScript | Java | Python | PHP |
| --- | --- | --- | --- | --- |
| Display a value | console.log(age); | System.out.println(age); | print(age) | echo $age; |
| Write a comment | // A note for myself | // A note for myself | # A note for myself | // A note for myself |
| Compare whole numbers | age === 20 | age == 20 | age == 20 | $age === 20 |
| Make a decision | if (age >= 18) {<br>  console.log("Adult");<br>} | if (age >= 18) {<br>    System.out.println("Adult");<br>} | if age >= 18:<br>    print("Adult") | if ($age >= 18) {<br>    echo "Adult";<br>} |
| Repeat three times | for (let i = 0; i < 3; i++) {<br>  console.log(i);<br>} | for (int i = 0; i < 3; i++) {<br>    System.out.println(i);<br>} | for i in range(3):<br>    print(i) | for ($i = 0; $i < 3; $i++) {<br>    echo $i . "<br>";<br>} |
| Define a reusable addition | function add(a, b) {<br>  return a + b;<br>} | // Inside a class, outside main:<br>static int add(int a, int b) {<br>    return a + b;<br>} | def add(a, b):<br>    return a + b | function add(int $a, int $b): int {<br>    return $a + $b;<br>} |

- Display a value: In a browser, console.log writes to developer tools. PHP echo writes to the terminal or the HTTP response. These operations do not all edit a web page.
- Write a comment: These notes are ignored as instructions.
- Compare whole numbers: These are whole-number comparisons. Java String content uses .equals(...). JavaScript and PHP === avoid equality type conversion.
- Make a decision: Python uses indentation and a colon. The other examples use braces.
- Repeat three times: The original stop value is excluded. i++ adds one in the three brace-based examples.
- Define a reusable addition: The Java method belongs inside a class. The PHP and Java examples here specify integer inputs and output.

### Collections

| Task | JavaScript | Java | Python | PHP |
| --- | --- | --- | --- | --- |
| Group three scores | const scores = [10, 20, 30]; | int[] scores = {10, 20, 30}; | scores = [10, 20, 30] | $scores = [10, 20, 30]; |
| Read the first score | scores[0] | scores[0] | scores[0] | $scores[0] |
| Count the scores | scores.length | scores.length | len(scores) | count($scores) |
| Visit every score | for (const score of scores) {<br>  console.log(score);<br>} | for (int score : scores) {<br>    System.out.println(score);<br>} | for score in scores:<br>    print(score) | foreach ($scores as $score) {<br>    echo $score . "<br>";<br>} |
| Add a value to a resizable collection | scores.push(40); | // Use ArrayList, not a fixed array.<br>// import java.util.ArrayList;<br>ArrayList<Integer> scores = new ArrayList<>();<br>scores.add(40); | scores.append(40) | $scores[] = 40; |

- Group three scores: Java’s array length is fixed. Python calls this a list. PHP arrays can also have named keys.
- Read the first score: The value is 10 in the previous row’s examples.
- Count the scores: The result is 3. Java String uses length(), unlike an array’s length field.
- Visit every score: All these loops visit values in the sample sequence’s order.
- Add a value to a resizable collection: The Java example creates an initially empty ArrayList because a normal Java array cannot grow. The other snippets extend the collections from earlier rows.

## Algorithms — Binary search

First understand variables, comparisons, conditions, loops, collections, indexes, and functions. Finish one programming track, then practice these steps.

Binary search is a way to find a target in a sorted sequence. Check the middle. If the target is smaller, keep only the left half. If it is larger, keep only the right half. Repeat until you find it or no items remain.

Precondition: an ascending, sorted sequence of whole numbers with efficient indexing. Sorting first has a separate cost.

- Target: The value you want to find.
- low: The first index still being considered.
- high: The last index still being considered.
- mid: The middle index between low and high.
- Sorted: Arranged in an order that matches the comparison, such as ascending numbers.
- Not found: The search interval is empty; this example returns -1.

### Algorithm milestone 1: Write an algorithm in ordinary words

First, check the items one by one. That is linear search. You can use it even if the items are not sorted. A binary search needs a sorted sequence because the middle comparison tells you which half can be discarded.

Check: Which search requires the input to be sorted for this numeric example?

1. Linear search
2. Binary search
3. Neither

Answer: 2. Binary search relies on sorted order to exclude half of the candidate items.

### Algorithm milestone 2: Follow the bounds and the middle

For target 23, start low at 0 and high at 6. mid is 3, whose value is 15. Since 23 is larger, move low to mid + 1, which is 4. The next mid is 5, whose value is 23. The result is index 5.

Check: After checking 15 while searching for 23, which half remains?

1. Indexes 0–2
2. Only index 3
3. Indexes 4–6

Answer: 3. 23 is greater than 15, so earlier values and the middle cannot match in this ascending sequence.

### Algorithm milestone 3: Handle a missing target and compare the work

For target 17, check 15, then 23, then 19. The next bounds cross, so nothing remains and the result is -1. Linear search may inspect n items. Binary search takes O(log n) comparisons on a sorted, efficiently indexed sequence. Sorting the input first has its own cost.

Check: What should this algorithm return if the target is absent?

1. -1
2. Always 0
3. The target value anyway

Answer: 1. -1 is the not-found marker used by these examples. A valid index is zero or greater.

### JavaScript example

```javascript
function binarySearch(numbers, target) {
  let low = 0;
  let high = numbers.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (numbers[mid] === target) return mid;
    if (numbers[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
console.log(binarySearch([3, 7, 11, 15, 19, 23, 27], 23));
```

### Java example

```java
public class Main {
    static int binarySearch(int[] numbers, int target) {
        int low = 0;
        int high = numbers.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (numbers[mid] == target) return mid;
            if (numbers[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
    public static void main(String[] args) {
        int[] numbers = {3, 7, 11, 15, 19, 23, 27};
        System.out.println(binarySearch(numbers, 23));
    }
}
```

### Python example

```python
def binary_search(numbers, target):
    low = 0
    high = len(numbers) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if numbers[mid] == target:
            return mid
        if numbers[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

print(binary_search([3, 7, 11, 15, 19, 23, 27], 23))
```

### PHP example

```php
<?php
function binarySearch(array $numbers, int $target): int {
    $low = 0;
    $high = count($numbers) - 1;
    while ($low <= $high) {
        $mid = $low + intdiv($high - $low, 2);
        if ($numbers[$mid] === $target) return $mid;
        if ($numbers[$mid] < $target) $low = $mid + 1;
        else $high = $mid - 1;
    }
    return -1;
}
echo binarySearch([3, 7, 11, 15, 19, 23, 27], 23);
```

Expected output for target 23: index 5.

### Practice

Run the example for 3, 23, 27, and 17. Expect indexes 0, 5, 6, and -1. Then test an empty sequence. Use sorted whole numbers; the PHP version expects a zero-based, contiguous indexed array. Repeated values can return any matching index, not necessarily the first.

Official references:

- [Python bisection documentation](https://docs.python.org/3/library/bisect.html)
- [Java Arrays binarySearch contract](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Arrays.html#binarySearch(int%5B%5D,int))
