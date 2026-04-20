# Windows 7 Boot Screen Edition

A personal portfolio with a Windows 7 boot screen aesthetic, scroll-triggered reveals,
a hidden terminal easter egg, a BSOD overlay, and lolcat rainbow text.

## Files

```
portfolio/
├── index.html   — structure & content
├── style.css    — all custom styles (monospace, BSOD, terminal, animations)
├── main.js      — all interactivity (scroll, terminal, Konami, lolcat)
└── README.md    — this file
```

## Deploy in 2 minutes

### Option A — GitHub Pages (free)
1. Push this folder to a GitHub repo
2. Go to Settings → Pages → Deploy from branch → main / root
3. Done. Live at `yourusername.github.io/repo-name`

### Option B — Netlify (free, recommended)
1. Drag this folder into netlify.com/drop
2. Done. Instantly live with HTTPS.

### Option C — Vercel (free)
1. `npm i -g vercel`
2. `cd portfolio && vercel`
3. Done.

No build step. No dependencies. Just static files.

---

## Customise

### Your info (index.html)
Search for these placeholders and replace them:

| Placeholder         | Replace with                    |
|---------------------|---------------------------------|
| `YOUR NAME`         | your actual name                |
| `yourhandle`        | your GitHub username            |
| `yourname`          | your LinkedIn handle            |
| `hello@youremail.com` | your email                   |
| `Acme Corp`         | your actual employers           |
| `project-one.exe`   | your actual project names       |

### Terminal commands (main.js)
Add new commands to the `COMMANDS` object:

```js
'open github': () => `
  Opening github.com/yourhandle...
`,

'my stack': () => `
  <span class="t-bright">Primary:</span> React, TypeScript, Node.js
  <span class="t-bright">Secondary:</span> Python, PostgreSQL, AWS
`,
```

### Sections (index.html)
Add more sections by copying a `<section class="boot-section" id="sN">` block.
Then add the ID to the `SECTIONS` array in `main.js`.

### Colors (style.css)
Change `--blue-accent` and `--blue-dark` for the progress bar color.
Change `--bsod-blue` for the BSOD background.
Change `--term-green` and family for the terminal color.

---

## Easter eggs

| Trigger                    | Effect                        |
|----------------------------|-------------------------------|
| Scroll down                | Sections reveal + progress    |
| Click any orange text      | Opens terminal with command   |
| Type `lolcat` in terminal  | Rainbow text                  |
| Type `sudo hire me`        | Fun response                  |
| Konami code (↑↑↓↓←→←→BA)  | BSOD overlay                  |
| Press ESC                  | Close BSOD or terminal        |
| ↑/↓ in terminal            | Command history               |

---

## Accessibility

- Skip-to-content link (Tab on page load)
- All interactive elements are keyboard accessible
- ARIA roles and labels on overlays
- Progress bar has aria-valuenow
- Terminal output has aria-live region
- Color contrast meets WCAG AA on core text
- Glitch links use `<button>` not `<span>` — keyboard focusable
