'use strict';

/* ─── DOM refs ─────────────────────────────────────── */
const progressFill    = document.getElementById('progress-fill');
const progressPct     = document.getElementById('progress-pct');
const progressLabel   = document.getElementById('progress-label');
const progressTrack   = document.getElementById('progress-track');
const scrollIndicator = document.getElementById('scroll-indicator');
const bsod            = document.getElementById('bsod');
const bsodClose       = document.getElementById('bsod-close');
const bsodProgress    = document.getElementById('bsod-progress');
const bsodPct         = document.getElementById('bsod-pct');
const terminal        = document.getElementById('terminal');
const termClose       = document.getElementById('term-close');
const termOutput      = document.getElementById('term-output');
const termInput       = document.getElementById('term-input');
const konamiHintBtn   = document.getElementById('konami-hint-btn');
const konamiReveal    = document.getElementById('konami-reveal');

/* ─── Section config ───────────────────────────────── */
const SECTIONS = ['s0', 's1', 's2', 's3', 's4', 's5', 's6'];

const LOADING_LABELS = [
  'Initializing...',
  'Loading identity module...',
  'Mounting education records...',
  'Importing tech stack...',
  'Mapping work history...',
  'Compiling projects...',
  'Establishing contact protocols...',
  'Boot sequence complete.',
];

/* ─── Scroll progress ──────────────────────────────── */
function getScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  return docH > 0 ? Math.min(scrollTop / docH, 1) : 0;
}

function updateProgress() {
  const p = getScrollProgress();
  const pct = Math.round(p * 100);

  progressFill.style.width = pct + '%';
  progressPct.textContent = pct + '%';
  progressTrack.setAttribute('aria-valuenow', pct);

  const labelIdx = Math.min(
    Math.floor(p * LOADING_LABELS.length),
    LOADING_LABELS.length - 1
  );
  progressLabel.textContent = LOADING_LABELS[labelIdx];

  SECTIONS.forEach((id, i) => {
    const threshold = (i + 0.5) / (SECTIONS.length + 1);
    const el = document.getElementById(id);
    if (!el) return;
    if (p >= threshold) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });

  if (p > 0.05) {
    scrollIndicator.classList.add('hidden-indicator');
  } else {
    scrollIndicator.classList.remove('hidden-indicator');
  }
}

window.addEventListener('scroll', updateProgress, { passive: true });

setTimeout(() => {
  const s0 = document.getElementById('s0');
  if (s0) s0.classList.add('visible');
  updateProgress();
}, 300);

/* ─── Lolcat ───────────────────────────────────────── */
function lolcat(text) {
  return text.split('').map((char, i) => {
    if (char === '\n') return '\n';
    if (char === ' ') return ' ';
    const hue = (i * 9) % 360;
    return `<span style="color:hsl(${hue},100%,62%)">${char}</span>`;
  }).join('');
}

/* ─── Terminal commands ────────────────────────────── */
const COMMANDS = {
  help: () => `
<span class="t-blue">Available commands:</span>

  <span class="t-bright">whoami</span>           — who is May Bui
  <span class="t-bright">neofetch</span>         — system info
  <span class="t-bright">ls projects</span>      — list all projects
  <span class="t-bright">cat project1</span>     — Local Business Portal
  <span class="t-bright">cat project2</span>     — College Selection Tool
  <span class="t-bright">cat project3</span>     — JoyStick Arcade & Bar
  <span class="t-bright">open resume</span>      — open resume PDF
  <span class="t-bright">ls node_modules</span>  — don't do this
  <span class="t-bright">play music</span>       — 🎵
  <span class="t-bright">send email</span>       — get in touch
  <span class="t-bright">lolcat</span>           — try it 🌈
  <span class="t-bright">sudo hire me</span>     — recommended
  <span class="t-bright">date</span>             — current date
  <span class="t-bright">uname -a</span>         — system info
  <span class="t-bright">clear</span>            — clear terminal
  <span class="t-bright">exit</span>             — close terminal
`,

  whoami: () => `
<span class="t-bright">May Bui</span>
Full-Stack Developer · CS + Business Analytics · DePauw University '27

Stack:    JavaScript, TypeScript, Python, Java, React, Next.js, Node.js, Firebase
Skills:   Web Development, Data Visualization, Product Thinking
Honors:   Management Fellows, Dean's List
Vibe:     Calm under pressure, relentless on side projects

<span class="t-dim">408-303-8262 · mayxbui@gmail.com · may.vercel.app</span>
<span class="t-dim">github.com/mayxbui · linkedin.com/in/mayxbui</span>
`,                               

  neofetch: () => `
<span class="t-bright">                                          </span>  may@portfolio
<span class="t-bright">                                          </span>  ─────────────────────────────
<span class="t-bright">                                          </span>  <span class="t-blue">OS:</span>      Windows 6.1.7601 (Portfolio Edition)
<span class="t-bright"> ██▄  ▄██  ▄▄▄  ▄▄ ▄▄   █████▄ ▄▄ ▄▄ ▄▄  </span>  <span class="t-blue">Host:</span>    DePauw University, Greencastle IN
<span class="t-bright"> ██ ▀▀ ██ ██▀██ ▀███▀   ██▄▄██ ██ ██ ██  </span>  <span class="t-blue">Kernel:</span>  React 18.x · Node.js LTS
<span class="t-bright"> ██    ██ ██▀██   █     ██▄▄█▀ ▀███▀ ██  </span>  <span class="t-blue">Shell:</span>   bash (portfolio-terminal v1.0)
<span class="t-bright">                                          </span>  <span class="t-blue">Uptime:</span>  2023 – present (and counting)
<span class="t-blue">                                            Memory:</span>  95% satisfaction @ iDTech Stanford
<span class="t-blue">                                            Disk:</span>  1,200+ universities analyzed
<span class="t-blue">                                            Theme:</span>  Windows 7 Dark
`,

  'ls projects': () => `
<span class="t-blue">total 4 projects</span>
drwxr-xr-x  local-business-portal/   JavaScript · React · Firebase · Google Maps API
drwxr-xr-x  college-selection-tool/  Excel · Tableau · U.S. Dept of Education data
drwxr-xr-x  joystick-arcade-bar/     Pitch deck · Market research · Financial model
drwxr-xr-x  this-portfolio/          <span class="t-dim">you are here</span>
`,

  'cat project1': () => `
<span class="t-bright">local-business-portal.exe</span>
─────────────────────────────────
Name:    Local Business Portal
Stack:   JavaScript · React.js · Google Maps API · Firebase
Scope:   Interactive resource website for Putnam County shops & restaurants
Impact:  70+ promotion redemptions across 21 businesses
Status:  <span class="t-blue">● LIVE</span>

→ github.com/mayxbui
`,

  'cat project2': () => `
<span class="t-bright">college-selection-tool.exe</span>
─────────────────────────────────
Name:    College Institution Selection Tool
Stack:   Excel · Tableau · U.S. Department of Education Data
Scope:   Interactive dashboard integrating two institutional datasets
Scale:   1,200+ U.S. universities analyzed
Filters: Affordability · Academic competitiveness · Graduate earnings
Status:  <span class="t-blue">● COMPLETE</span>
`,

  'cat project3': () => `
<span class="t-bright">joystick-arcade-bar.exe</span>
─────────────────────────────────
Name:    JoyStick Arcade & Bar
Type:    DePauw University Pitch Competition — <span class="t-yellow">Runner-Up</span>
Research: 93 target respondents surveyed
Model:   Startup costs · Break-even analysis · 3-segment revenue
Revenue: <span class="t-blue">$437K+ projected annual revenue</span>
         (arcade + bar + events)
Status:  <span class="t-yellow">● PITCH COMPLETE · SEEKING CO-FOUNDERS</span>
`,

  'open resume': () => {
    window.open('resume.pdf', '_blank');
    return `<span class="t-yellow">Opening resume.pdf...</span>
<span class="t-dim">↳ If it didn't open, check your pop-up blocker.</span>

<span class="t-blue">May Bui — resume.pdf</span>
mayxbui@gmail.com · 408-303-8262
linkedin.com/in/mayxbui · github.com/mayxbui · may.vercel.app
`;
  },

  'ls node_modules': () => `
<span class="t-yellow">WARNING:</span> This operation may take several business days.

Scanning node_modules...

  found  847,293  files
  found   23,847  packages
  found        1  package you actually need
  found  847,292  packages that came with it
  found        0  reasons to question this

<span class="t-dim">consider: rm -rf node_modules && go touch grass</span>
`,

  'play music': () => {
    return `
<span class="t-bright">♫ now playing...</span>
─────────────────────────────────
<span class="t-blue">lofi beats to debug at 2am to</span>

  ♩ ♪  ♫ ♬  ♩ ♪  ♫ ♬

  [████████████░░░░] 73% — coding session in progress

Artist: Various
Mood:   focused · caffeinated · shipping
Vol:    ████████░░ 80%

<span class="t-dim">Pro tip: headphones recommended for optimal performance</span>
<span class="t-dim">Open: https://www.youtube.com/watch?v=jfKfPfyJRdk</span>
`;
  },

  'send email': () => `
<span class="t-bright">Initiating handshake protocol...</span>

To:      mayxbui@gmail.com
Subject: Let's work together

Alternatively:
  → linkedin.com/in/mayxbui
  → github.com/mayxbui
  → may.vercel.app
  → 408-303-8262

<span class="t-dim">Response time: usually < 24hrs (unless deep in a bug)</span>
`,

  lolcat: () => lolcat(`
May Bui — Full Stack Developer

JavaScript · TypeScript · Python · Java
React · Next.js · Node.js · Firebase · Tableau
DePauw University '27 · Management Fellows · Dean's List
Available for hire · mayxbui@gmail.com

meow 🌈
`),

  date: () => {
    const now = new Date();
    return `<span class="t-bright">${now.toUTCString()}</span>`;
  },

  'uname -a': () => `
<span class="t-bright">PortfolioOS</span> may-portfolio 6.1.7601 #1 SMP React/Node.js x86_64 GNU/Portfolio
`,

  'sudo hire me': () => '__HIRE_ANIM__',

  clear: () => '__CLEAR__',
  exit:  () => '__EXIT__',
};

/* ─── Hire animation lines ─────────────────────────── */
const HIRE_LINES = [
  `<span class="t-yellow">[sudo] password for recruiter:</span> ••••••••`,
  ``,
  `Verifying credentials...`,
  `Checking portfolio @ may.vercel.app...`,
  `Scanning GitHub activity...`,
  `Reviewing DePauw Management Fellows program...`,
  `Cross-referencing Dean's List records...`,
  `Analyzing iDTech Stanford performance data (95% satisfaction)...`,
  `Checking ACM-W leadership tenure...`,
  `Running background check on commit history...`,
  `Assessing project impact: 70+ redemptions, 1,200+ schools analyzed, $437K model...`,
  ``,
  `<span class="t-blue">✓ Identity confirmed: May Bui</span>`,
  `<span class="t-blue">✓ Skills verified: JS · TS · Python · React · Firebase · Tableau</span>`,
  `<span class="t-blue">✓ Leadership validated: ACM-W VP · iDTech Lead · STEM Guide</span>`,
  `<span class="t-blue">✓ Authorization granted.</span>`,
  ``,
  `<span class="t-bright">Welcome to the team. 🎉</span>`,
  ``,
  `<span class="t-dim">Next step: mayxbui@gmail.com · 408-303-8262</span>`,
];

/* ─── Command history ──────────────────────────────── */
const cmdHistory = [];
let historyIdx = -1;

/* ─── Terminal output ──────────────────────────────── */
function termPrintRaw(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  termOutput.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function termInit() {
  termOutput.innerHTML = '';
  termPrintRaw(
    `<span class="t-dim">─────────────────────────────────────────────</span>\n` +
    `<span class="t-mid">  portfolio terminal v1.0  —  may@portfolio</span>\n` +
    `<span class="t-dim">  type <span class="t-bright">help</span> to see available commands\n` +
    `  type <span class="t-bright">exit</span> or press ESC to close</span>\n` +
    `<span class="t-dim">─────────────────────────────────────────────</span>\n`
  );
}

/* ─── Animated print (for sudo hire me) ───────────── */
function termPrintAnimated(lines, delayMs) {
  lines.forEach((line, i) => {
    setTimeout(() => {
      termPrintRaw(line);
      terminal.scrollTop = terminal.scrollHeight;
    }, i * delayMs);
  });
}

/* ─── Open / close terminal ────────────────────────── */
function openTerminal(cmd) {
  termInit();
  terminal.classList.remove('hidden');
  terminal.removeAttribute('aria-hidden');

  if (cmd) {
    setTimeout(() => {
      const echo = document.createElement('div');
      echo.innerHTML = `<span class="t-prompt">may@portfolio:~$</span> <span class="t-bright">${escapeHtml(cmd)}</span>`;
      termOutput.appendChild(echo);
      runCommand(cmd);
      termInput.focus();
    }, 250);
  } else {
    termInput.focus();
  }
}

function closeTerminal() {
  terminal.classList.add('hidden');
  terminal.setAttribute('aria-hidden', 'true');
}

termClose.addEventListener('click', closeTerminal);

/* ─── Execute command ──────────────────────────────── */
function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  const handler = COMMANDS[cmd];

  if (!handler) {
    termPrintRaw(
      `<span class="t-red">command not found: ${escapeHtml(cmd)}</span>\n` +
      `<span class="t-dim">type <span class="t-bright">help</span> to see available commands</span>`
    );
    terminal.scrollTop = terminal.scrollHeight;
    return;
  }

  const result = handler();

  if (result === '__CLEAR__') { termInit(); return; }
  if (result === '__EXIT__')  { closeTerminal(); return; }
  if (result === '__HIRE_ANIM__') { termPrintAnimated(HIRE_LINES, 350); return; }

  termPrintRaw(result);
  terminal.scrollTop = terminal.scrollHeight;
}

function executeCommand(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return;

  cmdHistory.unshift(trimmed);
  historyIdx = -1;

  const echo = document.createElement('div');
  echo.innerHTML = `<span class="t-prompt">may@portfolio:~$</span> <span class="t-bright">${escapeHtml(trimmed)}</span>`;
  termOutput.appendChild(echo);

  runCommand(trimmed);
}

termInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    executeCommand(termInput.value);
    termInput.value = '';
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIdx < cmdHistory.length - 1) {
      historyIdx++;
      termInput.value = cmdHistory[historyIdx] || '';
    }
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIdx > 0) {
      historyIdx--;
      termInput.value = cmdHistory[historyIdx] || '';
    } else {
      historyIdx = -1;
      termInput.value = '';
    }
  }

  if (e.key === 'Escape') closeTerminal();
});

/* ─── Glitch links → open terminal ────────────────── */
document.querySelectorAll('.glitch-link').forEach(el => {
  el.addEventListener('click', () => openTerminal(el.getAttribute('data-cmd')));
});

/* ─── BSOD ─────────────────────────────────────────── */
let bsodAnimating = false;

function openBsod() {
  bsod.classList.remove('hidden');
  bsod.removeAttribute('aria-hidden');
  bsodAnimatePct();
}

function closeBsod() {
  bsod.classList.add('hidden');
  bsod.setAttribute('aria-hidden', 'true');
  bsodProgress.style.width = '0%';
  bsodPct.textContent = '0%';
  bsodAnimating = false;
}

function bsodAnimatePct() {
  bsodAnimating = true;
  let pct = 0;
  const interval = setInterval(() => {
    if (!bsodAnimating) { clearInterval(interval); return; }
    pct = Math.min(pct + Math.random() * 3, 100);
    const rounded = Math.round(pct);
    bsodProgress.style.width = rounded + '%';
    bsodPct.textContent = rounded + '%';
    if (pct >= 100) clearInterval(interval);
  }, 80);
}

bsodClose.addEventListener('click', closeBsod);

/* ─── Konami code ──────────────────────────────────── */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!bsod.classList.contains('hidden'))      { closeBsod();      return; }
    if (!terminal.classList.contains('hidden'))  { closeTerminal();  return; }
  }

  if (!terminal.classList.contains('hidden')) return;

  const expected = KONAMI[konamiIdx];
  const key = e.key.toLowerCase() === expected.toLowerCase() ? expected : e.key;

  if (key === KONAMI[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === KONAMI.length) {
      konamiIdx = 0;
      openBsod();
    }
  } else {
    konamiIdx = 0;
    if (e.key === KONAMI[0]) konamiIdx = 1;
  }
});

/* ─── Konami hint button ───────────────────────────── */
if (konamiHintBtn) {
  konamiHintBtn.addEventListener('click', () => konamiReveal.classList.toggle('hidden'));
}

/* ─── Helper: escape HTML ──────────────────────────── */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ─── Init ─────────────────────────────────────────── */
bsod.setAttribute('aria-hidden', 'true');
terminal.setAttribute('aria-hidden', 'true');

if (window.location.hash === '#terminal') openTerminal(null);
