import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const WIDTH = 1229;
const HEIGHT = 1536;
const DURATION_SECONDS = 4.8;
const FPS = 18;
const FRAME_COUNT = Math.round(DURATION_SECONDS * FPS);
const TMP_DIR = '/tmp/lumniverse-gif-render';
const OUTPUT = path.resolve('screens/lumniverse-agent-ops.gif');
const PALETTE = path.join(TMP_DIR, 'palette.png');

const require = createRequire(import.meta.url);

function loadPlaywright() {
  const candidates = [
    'playwright',
    process.env.PLAYWRIGHT_PATH,
    path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'),
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch {
      // Try the next known runtime location.
    }
  }

  throw new Error('Playwright was not found. Install it locally or run from the Codex bundled runtime.');
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

const features = [
  {
    label: 'Fleet Monitoring',
    beforeTitle: 'No command center',
    before: ['Health split across logs', 'Failures appear after complaints'],
    afterTitle: 'Live fleet health',
    after: ['Status, latency and spend per agent', 'Degraded runs flagged early'],
    diagram: fleetDiagram,
  },
  {
    label: 'Evidence Correlation',
    beforeTitle: 'Signals stay isolated',
    before: ['Trace, deploy and metrics disagree', 'Timeline built by hand'],
    afterTitle: 'One evidence chain',
    after: ['Logs and traces converge', 'Evidence stays attached'],
    diagram: evidenceDiagram,
  },
  {
    label: 'Fixes & RCA',
    beforeTitle: 'Guess, patch, repeat',
    before: ['Retry, restart, escalate', 'Wrong fixes burn incident time'],
    afterTitle: 'Ranked fix path',
    after: ['Suspects scored with confidence', 'Tested remediation from trace'],
    diagram: fixesDiagram,
  },
  {
    label: 'FinOps',
    beforeTitle: 'Bill shock later',
    before: ['One blended provider bill', 'Token spikes found too late'],
    afterTitle: 'Cost by agent',
    after: ['Per-agent attribution and alerts', 'Token spikes caught live'],
    diagram: finopsDiagram,
  },
  {
    label: 'Architecture Graph',
    beforeTitle: 'Hidden dependencies',
    before: ['Handoffs hidden in code', 'One stuck agent blocks others'],
    afterTitle: 'Topology in motion',
    after: ['Live graph of agents and tools', 'Impact shown downstream'],
    diagram: graphDiagram,
  },
  {
    label: 'Sandbox & Prevention',
    beforeTitle: 'Same bug returns',
    before: ['One-off fixes are forgotten', 'Prompt changes ship ungated'],
    afterTitle: 'Failure becomes a gate',
    after: ['Failure replayed in sandbox', 'Regression gate added to CI'],
    diagram: sandboxDiagram,
  },
  {
    label: 'State Replay',
    beforeTitle: 'Restart from zero',
    before: ['Context lost on crash', 'Whole workflow reruns from zero'],
    afterTitle: 'Resume from checkpoint',
    after: ['Patch state at failure point', 'Resume with zero data loss'],
    diagram: replayDiagram,
  },
];

function points(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
}

function row(feature, index) {
  return `
    <section class="feature-row" data-row="${index}">
      <div class="row-glow"></div>
      <div class="label-cell">
        <span>${escapeHtml(feature.label)}</span>
      </div>
      <div class="before-cell text-cell">
        <div class="eyebrow">Before</div>
        <h3>${escapeHtml(feature.beforeTitle)}</h3>
        <ul>${points(feature.before)}</ul>
      </div>
      <div class="after-cell text-cell">
        <div class="copy">
          <div class="eyebrow">With Lumniverse</div>
          <h3>${escapeHtml(feature.afterTitle)}</h3>
          <ul>${points(feature.after)}</ul>
        </div>
        <div class="diagram">${feature.diagram(index)}</div>
      </div>
    </section>
  `;
}

function svg(content, className = '') {
  return `<svg class="${className}" viewBox="0 0 230 104" aria-hidden="true">${content}</svg>`;
}

function fleetDiagram(index) {
  return svg(`
    <rect x="14" y="16" width="202" height="72" rx="14" class="box"/>
    ${[0, 1, 2, 3, 4, 5].map((n) => {
      const x = 42 + n * 28;
      const tone = n === 4 ? 'warn' : n === 5 ? 'fail' : 'ok';
      return `<circle cx="${x}" cy="36" r="7" class="dot ${tone}" data-pulse data-delay="${index * 0.19 + n * 0.08}"/>`;
    }).join('')}
    <path d="M34 64 H196" class="base-line"/>
    <path d="M34 64 H196" class="flow-line" data-dash="190" data-delay="${index * 0.31}"/>
    <text x="34" y="78" class="mini">4 running</text>
    <text x="123" y="78" class="mini accent">1 failed</text>
  `);
}

function evidenceDiagram(index) {
  return svg(`
    <rect x="16" y="16" width="52" height="22" rx="8" class="chip"/>
    <rect x="16" y="66" width="52" height="22" rx="8" class="chip"/>
    <rect x="162" y="16" width="52" height="22" rx="8" class="chip"/>
    <rect x="162" y="66" width="52" height="22" rx="8" class="chip"/>
    <text x="42" y="31" text-anchor="middle" class="mini">TRACE</text>
    <text x="42" y="81" text-anchor="middle" class="mini">DEPLOY</text>
    <text x="188" y="31" text-anchor="middle" class="mini">METRIC</text>
    <text x="188" y="81" text-anchor="middle" class="mini">TOOL</text>
    <path d="M68 27 C88 27 90 52 108 52" class="base-line"/>
    <path d="M68 77 C88 77 90 52 108 52" class="base-line"/>
    <path d="M162 27 C142 27 140 52 122 52" class="base-line"/>
    <path d="M162 77 C142 77 140 52 122 52" class="base-line"/>
    <path d="M68 27 C88 27 90 52 108 52" class="flow-line" data-dash="110" data-delay="${index * 0.29}"/>
    <path d="M68 77 C88 77 90 52 108 52" class="flow-line blue" data-dash="110" data-delay="${index * 0.29 + 0.2}"/>
    <path d="M162 27 C142 27 140 52 122 52" class="flow-line" data-dash="110" data-delay="${index * 0.29 + 0.4}"/>
    <path d="M162 77 C142 77 140 52 122 52" class="flow-line blue" data-dash="110" data-delay="${index * 0.29 + 0.6}"/>
    <circle cx="115" cy="52" r="14" class="hub" data-pulse data-delay="${index * 0.2}"/>
    <text x="115" y="56" text-anchor="middle" class="mini white">RCA</text>
  `);
}

function fixesDiagram(index) {
  const bars = [
    ['Schema drift', 82, 'ok'],
    ['Prompt gap', 45, 'warn'],
    ['Retry loop', 30, 'fail'],
  ];
  return svg(`
    <rect x="14" y="12" width="202" height="80" rx="14" class="box"/>
    ${bars.map(([name, width, tone], i) => `
      <text x="28" y="${31 + i * 22}" class="mini">${name}</text>
      <rect x="112" y="${21 + i * 22}" width="78" height="8" rx="4" class="track"/>
      <rect x="112" y="${21 + i * 22}" width="${width * 0.78}" height="8" rx="4" class="bar ${tone}" data-bar="${width}" data-delay="${index * 0.16 + i * 0.2}"/>
      <text x="198" y="${29 + i * 22}" class="mini right">${width}%</text>
    `).join('')}
  `);
}

function finopsDiagram(index) {
  return svg(`
    <rect x="14" y="14" width="202" height="76" rx="14" class="box"/>
    <text x="28" y="32" class="mini">TOTAL TODAY</text>
    <text x="28" y="58" class="money" data-count="10.58">$10.58</text>
    <path d="M118 66 L138 58 L154 62 L170 42 L188 48 L204 30" class="spark-track"/>
    <path d="M118 66 L138 58 L154 62 L170 42 L188 48 L204 30" class="spark" data-dash="120" data-delay="${index * 0.21}"/>
    <rect x="28" y="72" width="76" height="7" rx="3.5" class="track"/>
    <rect x="28" y="72" width="54" height="7" rx="3.5" class="bar warn" data-bar="71" data-delay="${index * 0.17}"/>
    <text x="112" y="79" class="mini accent">budget 71%</text>
  `);
}

function graphDiagram(index) {
  return svg(`
    <path d="M55 28 L114 50 L176 28 M114 50 L78 78 M114 50 L176 78" class="base-line"/>
    <path d="M55 28 L114 50 L176 28 M114 50 L78 78 M114 50 L176 78" class="flow-line blue" data-dash="260" data-delay="${index * 0.22}"/>
    <circle cx="55" cy="28" r="12" class="node ok" data-pulse data-delay="${index * 0.14}"/>
    <circle cx="114" cy="50" r="16" class="node warn" data-pulse data-delay="${index * 0.14 + 0.2}"/>
    <circle cx="176" cy="28" r="12" class="node ok" data-pulse data-delay="${index * 0.14 + 0.4}"/>
    <circle cx="78" cy="78" r="12" class="node ok" data-pulse data-delay="${index * 0.14 + 0.6}"/>
    <circle cx="176" cy="78" r="12" class="node fail" data-pulse data-delay="${index * 0.14 + 0.8}"/>
    <text x="114" y="54" text-anchor="middle" class="mini white">BOT</text>
  `);
}

function sandboxDiagram(index) {
  const labels = ['Trace', 'Replay', 'Gate'];
  return svg(`
    <path d="M44 52 H184" class="base-line"/>
    <path d="M44 52 H184" class="flow-line" data-dash="170" data-delay="${index * 0.27}"/>
    ${labels.map((label, i) => `
      <rect x="${20 + i * 72}" y="29" width="56" height="46" rx="12" class="chip ${i === 2 ? 'active' : ''}" data-pulse data-delay="${index * 0.18 + i * 0.25}"/>
      <text x="${48 + i * 72}" y="56" text-anchor="middle" class="mini ${i === 2 ? 'accent' : ''}">${label}</text>
    `).join('')}
    <text x="184" y="86" text-anchor="middle" class="mini accent">CI BLOCK</text>
  `);
}

function replayDiagram(index) {
  return svg(`
    <circle cx="115" cy="52" r="34" class="ring"/>
    <path d="M115 18 A34 34 0 1 1 84 66" class="flow-line thick" data-dash="220" data-delay="${index * 0.25}"/>
    <circle cx="115" cy="18" r="8" class="dot ok" data-pulse data-delay="${index * 0.12}"/>
    <circle cx="149" cy="52" r="8" class="dot warn" data-pulse data-delay="${index * 0.12 + 0.3}"/>
    <circle cx="115" cy="86" r="8" class="dot ok" data-pulse data-delay="${index * 0.12 + 0.6}"/>
    <rect x="75" y="39" width="80" height="26" rx="10" class="chip active"/>
    <text x="115" y="56" text-anchor="middle" class="mini accent">checkpoint</text>
  `);
}

const rowsHtml = features.map(row).join('');

const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=${WIDTH}, height=${HEIGHT}, initial-scale=1">
  <style>
    :root {
      --ink: #3f3f46;
      --muted: #71717a;
      --line: rgba(63, 63, 70, 0.14);
      --green: #22c55e;
      --green-dark: #047857;
      --blue: #0047ff;
      --orange: #ff7a45;
      --red: #ef4444;
      --row-glow: 0;
      font-variant-numeric: tabular-nums;
    }

    * { box-sizing: border-box; }

    html,
    body {
      margin: 0;
      width: ${WIDTH}px;
      height: ${HEIGHT}px;
      overflow: hidden;
      background: #edf5cc;
      color: var(--ink);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .poster {
      position: relative;
      width: ${WIDTH}px;
      height: ${HEIGHT}px;
      overflow: hidden;
      background:
        linear-gradient(148deg, #cdd7ee 0%, #e7f0df 42%, #f2ffc0 100%);
    }

    .poster::before {
      content: "";
      position: absolute;
      inset: 0;
      opacity: 0.28;
      background-image:
        linear-gradient(to right, rgba(63, 63, 70, 0.13) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(63, 63, 70, 0.09) 1px, transparent 1px);
      background-size: 42px 42px;
      transform: translate3d(var(--grid-x, 0px), var(--grid-y, 0px), 0);
    }

    .poster::after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.38), transparent),
        linear-gradient(180deg, rgba(255, 255, 255, 0.22), transparent 34%, rgba(255, 255, 255, 0.12));
      opacity: 0.75;
      transform: translateX(var(--shine-x, -40px));
      pointer-events: none;
    }

    .header {
      position: absolute;
      z-index: 2;
      left: 54px;
      right: 54px;
      top: 48px;
      text-align: center;
    }

    h1 {
      margin: 0;
      font-size: 53px;
      line-height: 1.05;
      font-weight: 800;
      letter-spacing: 0;
      color: #3f3f46;
      white-space: nowrap;
    }

    .brand-word {
      color: #18181b;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      border-radius: 18px;
      padding: 5px 20px 7px;
      margin: 0 6px;
      color: #3f3f46;
      font-style: italic;
      font-weight: 800;
      background: linear-gradient(90deg, rgba(255, 220, 211, 0.92), rgba(227, 218, 255, 0.92));
      box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.48);
    }

    .slash {
      color: var(--orange);
      font-weight: 900;
      margin: 0 8px;
    }

    .subtitle {
      margin: 22px 0 0;
      font-size: 26px;
      line-height: 1.3;
      color: rgba(63, 63, 70, 0.72);
      font-weight: 500;
    }

    .modebar {
      position: absolute;
      z-index: 3;
      top: 196px;
      left: 246px;
      right: 160px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: center;
      color: rgba(63, 63, 70, 0.68);
      font-size: 17px;
      font-style: italic;
      font-weight: 600;
    }

    .mode {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .mode:nth-child(2) {
      justify-content: center;
    }

    .pill {
      min-width: 164px;
      text-align: center;
      border-radius: 999px;
      padding: 11px 22px 10px;
      font-size: 18px;
      line-height: 1;
      color: #3f3f46;
      font-style: normal;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      background: #c6cbef;
    }

    .mode:nth-child(2) .pill {
      background: #efff82;
      border-bottom: 3px solid var(--orange);
    }

    .table {
      position: absolute;
      z-index: 2;
      left: 55px;
      right: 55px;
      top: 255px;
      height: 1106px;
      overflow: hidden;
      border-radius: 25px;
      background: rgba(255, 255, 255, 0.62);
      box-shadow: 0 16px 48px rgba(63, 63, 70, 0.08);
    }

    .feature-row {
      position: relative;
      display: grid;
      grid-template-columns: 126px 498px 1fr;
      height: 158px;
      border-bottom: 1px solid var(--line);
    }

    .feature-row:last-child {
      border-bottom: 0;
      height: 158px;
    }

    .row-glow {
      position: absolute;
      inset: 0;
      z-index: 0;
      opacity: var(--row-glow);
      background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), rgba(0, 71, 255, 0.14), transparent);
      transform: translateX(var(--row-shift, 0px));
    }

    .label-cell,
    .text-cell {
      position: relative;
      z-index: 1;
      min-width: 0;
    }

    .label-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px 12px;
      text-align: center;
      background: rgba(250, 255, 229, 0.7);
      border-right: 1px solid var(--line);
      font-size: 20px;
      line-height: 1.03;
      font-weight: 800;
    }

    .before-cell {
      padding: 25px 24px 20px;
      background: rgba(232, 239, 228, 0.78);
      border-right: 1px solid rgba(63, 63, 70, 0.14);
    }

    .after-cell {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 210px;
      gap: 12px;
      padding: 18px 18px 15px 23px;
      background: linear-gradient(90deg, rgba(252, 232, 228, 0.82), rgba(232, 247, 241, 0.9));
    }

    .eyebrow {
      margin-bottom: 5px;
      font-family: "SF Mono", "JetBrains Mono", Consolas, monospace;
      font-size: 10px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      color: rgba(63, 63, 70, 0.52);
      font-style: normal;
      font-weight: 800;
    }

    h3 {
      margin: 0 0 7px;
      color: #3f3f46;
      font-size: 18px;
      line-height: 1.13;
      font-weight: 800;
      letter-spacing: 0;
    }

    ul {
      margin: 0;
      padding-left: 18px;
      color: rgba(63, 63, 70, 0.86);
      font-size: 16px;
      line-height: 1.22;
      font-weight: 500;
    }

    li::marker {
      color: rgba(63, 63, 70, 0.42);
      font-size: 0.82em;
    }

    .after-cell h3 {
      color: #202124;
    }

    .after-cell .eyebrow,
    .after-cell li::marker {
      color: var(--green-dark);
    }

    .diagram {
      align-self: center;
      width: 210px;
      height: 104px;
    }

    svg {
      width: 210px;
      height: 104px;
      overflow: visible;
    }

    .box,
    .chip {
      fill: rgba(255, 255, 255, 0.6);
      stroke: rgba(63, 63, 70, 0.2);
      stroke-width: 1.4;
    }

    .chip.active {
      fill: rgba(34, 197, 94, 0.12);
      stroke: rgba(34, 197, 94, 0.42);
    }

    .base-line,
    .ring,
    .spark-track {
      fill: none;
      stroke: rgba(63, 63, 70, 0.32);
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .ring {
      stroke-dasharray: 4 6;
    }

    .flow-line,
    .spark {
      fill: none;
      stroke: var(--green);
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 28 190;
      filter: drop-shadow(0 0 4px rgba(34, 197, 94, 0.55));
    }

    .flow-line.blue,
    .spark {
      stroke: var(--blue);
      filter: drop-shadow(0 0 4px rgba(0, 71, 255, 0.38));
    }

    .flow-line.thick {
      stroke-width: 4;
    }

    .dot,
    .node,
    .hub {
      transform-box: fill-box;
      transform-origin: center;
      stroke: rgba(255, 255, 255, 0.72);
      stroke-width: 2;
    }

    .dot.ok,
    .node.ok,
    .hub {
      fill: var(--green);
    }

    .dot.warn,
    .node.warn {
      fill: var(--orange);
    }

    .dot.fail,
    .node.fail {
      fill: var(--red);
    }

    .track {
      fill: rgba(63, 63, 70, 0.12);
    }

    .bar {
      transform-box: fill-box;
      transform-origin: left center;
      fill: var(--green);
    }

    .bar.warn {
      fill: var(--orange);
    }

    .bar.fail {
      fill: var(--red);
    }

    .mini {
      fill: rgba(63, 63, 70, 0.72);
      font-family: "SF Mono", "JetBrains Mono", Consolas, monospace;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0;
    }

    .mini.right {
      text-anchor: end;
    }

    .mini.accent,
    .accent {
      fill: var(--green-dark);
      color: var(--green-dark);
    }

    .mini.white {
      fill: #ffffff;
    }

    .money {
      fill: #202124;
      font-family: "SF Mono", "JetBrains Mono", Consolas, monospace;
      font-size: 22px;
      font-weight: 900;
    }

    .footer {
      position: absolute;
      z-index: 3;
      left: 72px;
      right: 72px;
      bottom: 38px;
      display: flex;
      align-items: end;
      justify-content: space-between;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .logo-mark {
      width: 52px;
      height: 52px;
      border-radius: 15px;
      display: grid;
      place-items: center;
      color: #ffffff;
      background: linear-gradient(135deg, #18181b, #0047ff);
      font-size: 28px;
      line-height: 1;
      font-weight: 900;
      box-shadow: 0 14px 28px rgba(0, 71, 255, 0.2);
    }

    .brand-name {
      font-size: 26px;
      line-height: 1.05;
      font-weight: 900;
      letter-spacing: 0;
      color: #3f3f46;
    }

    .brand-url {
      margin-top: 4px;
      font-size: 16px;
      color: rgba(63, 63, 70, 0.58);
      font-weight: 700;
    }

    .footer-wordmark {
      font-size: 27px;
      letter-spacing: 8px;
      font-weight: 900;
      color: #3f3f46;
    }
  </style>
</head>
<body>
  <main class="poster">
    <header class="header">
      <h1><span class="brand-word">AI Agent Ops</span> <span class="tag">Before</span> <span class="slash">/</span> <span class="brand-word">With</span> <span class="tag">Lumniverse</span></h1>
      <p class="subtitle">7 capabilities that turn agent failures into monitored, fixable systems.</p>
    </header>

    <div class="modebar">
      <div class="mode"><span class="pill">Before</span><span>manual debug playbook</span></div>
      <div class="mode"><span class="pill">Now</span><span>Lumniverse agent ops reality</span></div>
    </div>

    <div class="table">
      ${rowsHtml}
    </div>

    <footer class="footer">
      <div class="brand">
        <div class="logo-mark">L</div>
        <div>
          <div class="brand-name">Lumniverse</div>
          <div class="brand-url">Lumniverse.com</div>
        </div>
      </div>
      <div class="footer-wordmark">LUMNIVERSE.COM</div>
    </footer>
  </main>
  <script>
    const duration = ${DURATION_SECONDS * 1000};
    const rows = Array.from(document.querySelectorAll('[data-row]'));
    const poster = document.querySelector('.poster');
    const flows = Array.from(document.querySelectorAll('[data-dash]'));
    const pulses = Array.from(document.querySelectorAll('[data-pulse]'));
    const bars = Array.from(document.querySelectorAll('[data-bar]'));
    const counters = Array.from(document.querySelectorAll('[data-count]'));

    function wrapDistance(a, b) {
      const d = Math.abs(a - b);
      return Math.min(d, 1 - d);
    }

    function ease(value) {
      return 1 - Math.pow(1 - value, 3);
    }

    window.renderAt = function renderAt(ms) {
      const phase = ((ms % duration) + duration) % duration / duration;
      poster.style.setProperty('--grid-x', (Math.sin(phase * Math.PI * 2) * 6).toFixed(2) + 'px');
      poster.style.setProperty('--grid-y', (Math.cos(phase * Math.PI * 2) * 5).toFixed(2) + 'px');
      poster.style.setProperty('--shine-x', (-280 + phase * 560).toFixed(2) + 'px');

      rows.forEach(function (row, index) {
        const center = (index + 0.5) / rows.length;
        const proximity = Math.max(0, 1 - wrapDistance(phase, center) * 7.4);
        const glow = Math.pow(proximity, 1.65) * 0.54;
        row.style.setProperty('--row-glow', glow.toFixed(3));
        row.style.setProperty('--row-shift', (-80 + proximity * 120).toFixed(2) + 'px');
      });

      flows.forEach(function (flow, index) {
        const dash = Number(flow.dataset.dash || 180);
        const delay = Number(flow.dataset.delay || 0);
        const local = (phase + delay + index * 0.013) % 1;
        flow.style.strokeDasharray = '32 ' + dash;
        flow.style.strokeDashoffset = String((1 - local) * dash);
        flow.style.opacity = String(0.68 + Math.sin((local * Math.PI * 2)) * 0.18);
      });

      pulses.forEach(function (el, index) {
        const delay = Number(el.dataset.delay || 0);
        const local = (phase + delay + index * 0.017) % 1;
        const pulse = (Math.sin(local * Math.PI * 2) + 1) / 2;
        const scale = 1 + pulse * 0.12;
        el.style.transform = 'scale(' + scale.toFixed(3) + ')';
        el.style.opacity = String(0.72 + pulse * 0.28);
      });

      bars.forEach(function (bar, index) {
        const target = Number(bar.dataset.bar || 70);
        const delay = Number(bar.dataset.delay || 0);
        const local = (phase + delay + index * 0.031) % 1;
        const value = target * (0.9 + 0.1 * ease((Math.sin(local * Math.PI * 2) + 1) / 2));
        bar.style.transform = 'scaleX(' + (value / target).toFixed(3) + ')';
      });

      counters.forEach(function (counter) {
        const target = Number(counter.dataset.count || 0);
        const local = (phase * 1.35) % 1;
        const value = target * (0.94 + 0.06 * ease(local));
        counter.textContent = '$' + value.toFixed(2);
      });
    };

    window.renderAt(0);
  </script>
</body>
</html>`;

async function main() {
  const { chromium } = loadPlaywright();

  await fs.rm(TMP_DIR, { recursive: true, force: true });
  await fs.mkdir(TMP_DIR, { recursive: true });
  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });

  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const launchOptions = {
    headless: true,
    args: ['--disable-dev-shm-usage', '--font-render-hinting=none'],
  };

  try {
    await fs.access(chromePath);
    launchOptions.executablePath = chromePath;
  } catch {
    // Use Playwright's browser if Chrome is not installed.
  }

  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  });

  await page.setContent(html, { waitUntil: 'load' });

  for (let i = 0; i < FRAME_COUNT; i += 1) {
    const ms = (i / FRAME_COUNT) * DURATION_SECONDS * 1000;
    await page.evaluate((time) => window.renderAt(time), ms);
    await page.screenshot({
      path: path.join(TMP_DIR, `frame-${String(i).padStart(4, '0')}.png`),
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
      type: 'png',
    });
    if ((i + 1) % 12 === 0 || i === FRAME_COUNT - 1) {
      console.log(`Captured ${i + 1}/${FRAME_COUNT} frames`);
    }
  }

  await browser.close();

  await run('ffmpeg', [
    '-y',
    '-framerate', String(FPS),
    '-i', path.join(TMP_DIR, 'frame-%04d.png'),
    '-vf', `fps=${FPS},palettegen=max_colors=160:stats_mode=diff`,
    PALETTE,
  ]);

  await run('ffmpeg', [
    '-y',
    '-framerate', String(FPS),
    '-i', path.join(TMP_DIR, 'frame-%04d.png'),
    '-i', PALETTE,
    '-lavfi', `fps=${FPS}[x];[x][1:v]paletteuse=dither=sierra2_4a:diff_mode=rectangle`,
    '-loop', '0',
    OUTPUT,
  ]);

  console.log(`Wrote ${OUTPUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
