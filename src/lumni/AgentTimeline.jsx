import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Briefcase, Check, Headphones, Receipt, RotateCw, Server, Sparkles, Tag, TriangleAlert, User, X } from 'lucide-react';
import { canAnimate } from './motion';

// A scripted, real-looking day in a Lumni workspace. Time `t` runs in seconds;
// bars drift left as time passes, Lumni steps in, and a cursor approves a refund.
const LOOP = 21;
const WINDOW = 30; // seconds visible across the track (~30 minutes on the axis)
const DESIGN_W = 1040;
const LABEL_W = 214;
const TRACK_W = DESIGN_W - LABEL_W - 40;
const ROW_H = 58;
const STATIC_T = 13.9;

const APPS = {
  S: { l: 'S', bg: '#635bff' }, // Stripe
  Z: { l: 'Z', bg: '#17494d' }, // Zendesk
  SF: { l: 'SF', bg: '#0b9be3' }, // Salesforce
  PG: { l: 'PG', bg: '#336791' }, // Postgres
  QB: { l: 'QB', bg: '#2ca01c' }, // QuickBooks
};

const LANES = [
  { name: 'Support agent', sub: 'LangGraph', Icon: Headphones },
  { name: 'Billing agent', sub: 'OpenAI Agents', Icon: Receipt },
  { name: 'Pricing agent', sub: 'Temporal', Icon: Tag },
  { name: 'Ana', sub: 'Person · RevOps', Icon: User, person: true },
  { name: 'Sales agent', sub: 'MCP', Icon: Briefcase },
  { name: 'Ops agent', sub: 'Claude Code', Icon: Server },
];

// segs: [time, state]; the bar shows the last state whose time has passed.
const BARS = [
  { id: 'ticket', lane: 0, label: 'Reply to ticket #1183', app: 'Z', start: -30, end: -17, segs: [[-99, 'done']] },
  { id: 'refundA', lane: 0, label: 'Refund order #4821', app: 'S', start: -14, end: 3, segs: [[-99, 'running'], [3, 'done'], [17.6, 'proven']] },
  { id: 'invoice', lane: 1, label: 'Invoice run', app: 'QB', start: -28, end: -12, segs: [[-99, 'done']] },
  { id: 'refundB', lane: 1, label: 'Refund order #4821', app: 'S', start: -8, end: 3.3, segs: [[-99, 'running'], [3.3, 'stopped']] },
  { id: 'report', lane: 2, label: 'Weekly margin report', app: 'PG', start: -27, end: -12, segs: [[-99, 'done']] },
  { id: 'price', lane: 2, label: 'Set Pro plan to $45', app: 'PG', start: -4, end: 11.6, segs: [[-99, 'running'], [6.6, 'reread'], [8.8, 'running'], [11.6, 'done']] },
  { id: 'ana', lane: 3, label: 'Editing Umbrella Corp', app: 'SF', start: 0, end: 12.6, segs: [[-99, 'person'], [12.6, 'done']] },
  { id: 'leads', lane: 4, label: 'Lead research', app: 'SF', start: -27, end: -9, segs: [[-99, 'done']] },
  { id: 'upgrade', lane: 4, label: 'Upgrade Umbrella Corp', app: 'SF', start: -1, end: 16.2, segs: [[-99, 'running'], [8.6, 'wait'], [12.7, 'running'], [16.2, 'done']] },
  { id: 'reply', lane: 0, label: 'Reply to ticket #1190', app: 'Z', start: 15.2, end: null, segs: [[-99, 'running']] },
  { id: 'dunning', lane: 1, label: 'Dunning emails', app: 'QB', start: 13.4, end: null, segs: [[-99, 'running']] },
  { id: 'audit', lane: 2, label: 'Discount audit', app: 'PG', start: 16.4, end: null, segs: [[-99, 'running']] },
  { id: 'renewal', lane: 4, label: 'Renewal email · Initech', app: 'SF', start: 17.8, end: null, segs: [[-99, 'running']] },
  { id: 'sync', lane: 5, label: 'Sync CRM', app: 'SF', start: -27, end: -15, segs: [[-99, 'failed']] },
  { id: 'big', lane: 5, label: 'Refund $900 · Globex', app: 'S', start: -9, end: 17.2, segs: [[-99, 'needs'], [15.5, 'running'], [17.2, 'done']] },
];

const TIPS = [
  { bar: 'refundB', from: 3.4, to: 7.0, title: 'Lumni · stopped a repeat', lines: ['Support agent refunded order #4821 at 2:14:09', '$64 kept. Stripe never saw the copy.'] },
  { bar: 'price', from: 6.8, to: 9.5, title: 'Lumni · looked again', lines: ['The price list changed after the agent read it', 'It re-read v42, then wrote $45'] },
  { bar: 'upgrade', from: 9.6, to: 12.6, title: 'Lumni · waiting its turn', lines: ['Ana is editing Umbrella Corp', 'Sales agent goes after she saves'] },
  { bar: 'refundA', from: 17.7, to: 20.4, title: 'Lumni · proven', lines: ['Refund re_31c9 found in Stripe', 'Matches what the agent reported'] },
];

export const STEPS = [
  { t: 3.2, label: 'Stops a repeat', text: 'Two agents, one refund. Only one reaches Stripe.' },
  { t: 6.7, label: 'Makes it re-read', text: 'Data changed since the agent looked. It reads again.' },
  { t: 9.5, label: 'Lets people go first', text: 'An agent waits while a person edits the same record.' },
  { t: 13.1, label: 'Asks you', text: 'Risky actions wait for a yes, in one click.' },
  { t: 17.6, label: 'Proves it', text: 'Lumni checks the app itself, not the agent’s word.' },
];

// Cursor path in design px relative to the track's left edge and the body top.
const CURSOR = [
  { t: 11.9, x: 520, y: 420, o: 0 },
  { t: 12.3, x: 520, y: 400, o: 1 },
  { t: 13.0, x: TRACK_W - 140, y: 5 * ROW_H + 30, o: 1 },
  { t: 14.4, x: TRACK_W - 140, y: 5 * ROW_H + 30, o: 1 },
  { t: 15.0, x: TRACK_W - 46, y: 5 * ROW_H - 34, o: 1 },
  { t: 15.5, x: TRACK_W - 46, y: 5 * ROW_H - 34, o: 1 },
  { t: 16.3, x: TRACK_W - 260, y: 5 * ROW_H + 70, o: 1 },
  { t: 16.8, x: TRACK_W - 280, y: 5 * ROW_H + 80, o: 0 },
];

const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2);
const stateAt = (bar, t) => {
  let s = bar.segs[0][1];
  for (const [at, st] of bar.segs) if (t >= at) s = st;
  return s;
};
const xAt = (s, t) => TRACK_W * (1 - (t - s) / WINDOW);

function cursorAt(t) {
  if (t <= CURSOR[0].t || t >= CURSOR[CURSOR.length - 1].t) return null;
  for (let i = 0; i < CURSOR.length - 1; i += 1) {
    const a = CURSOR[i];
    const b = CURSOR[i + 1];
    if (t >= a.t && t <= b.t) {
      const k = ease((t - a.t) / (b.t - a.t));
      return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, o: a.o + (b.o - a.o) * k };
    }
  }
  return null;
}

const STYLE = {
  done: 'bg-[#f1f1f4] text-lm-ink2',
  proven: 'bg-[#f1f1f4] text-lm-ink2',
  failed: 'bg-[#fdeaea] text-[#c2413b]',
  running: 'bg-gradient-to-r from-[#eef4ff] to-[#dfeaff] text-[#1f5fd6] border-r-2 border-[#3b82f6]',
  stopped: 'bg-lm-soft text-lm-accent',
  reread: 'bg-[#fff2e2] text-[#c2570c] border-r-2 border-[#f08a24]',
  wait: 'text-[#1f5fd6] border-r-2 border-[#93b8f5]',
  needs: 'bg-[#fff3e0] text-[#b45309] border-r-2 border-[#f08a24]',
  person: 'bg-[#f3f8df] text-lm-ink border-r-2 border-[#b7d64a]',
};

function AppBadge({ app }) {
  const a = APPS[app];
  return (
    <span className="shrink-0 h-[18px] min-w-[18px] px-1 rounded-[5px] text-[9px] font-bold text-white flex items-center justify-center" style={{ background: a.bg }}>
      {a.l}
    </span>
  );
}

function Bar({ bar, t }) {
  if (t < bar.start) return null;
  const end = Math.min(bar.end ?? t, t);
  const left = xAt(bar.start, t);
  const right = xAt(end, t);
  if (right < 4) return null;
  const st = stateAt(bar, t);
  const width = right - Math.max(left, -40);
  const wide = width > 210;
  return (
    <div
      className={`absolute top-[12px] h-[34px] rounded-[10px] flex items-center gap-2 px-2.5 text-[14px] font-medium whitespace-nowrap overflow-hidden ${STYLE[st]}`}
      style={{
        left: Math.max(left, -40),
        width,
        ...(st === 'wait' ? { background: 'repeating-linear-gradient(135deg,#eef4ff 0 8px,#ffffff 8px 14px)' } : {}),
      }}
    >
      {st === 'person' ? (
        <span className="shrink-0 w-[18px] h-[18px] rounded-full bg-lm-pop text-[10px] font-bold flex items-center justify-center">A</span>
      ) : (
        <AppBadge app={bar.app} />
      )}
      <span className={`truncate ${st === 'stopped' ? 'line-through decoration-1' : ''}`}>{bar.label}</span>
      <span className="ml-auto flex items-center">
        {st === 'stopped' && wide && <Chip className="bg-white text-lm-accent"><X className="w-3 h-3" /> Already done</Chip>}
        {st === 'reread' && <Chip className="bg-white text-[#c2570c]"><RotateCw className="w-3 h-3" /> Looking again</Chip>}
        {st === 'wait' && wide && <Chip className="bg-white text-[#1f5fd6]">Waiting for Ana</Chip>}
        {st === 'needs' && <Chip className="bg-white text-[#b45309]"><TriangleAlert className="w-3 h-3" /> Needs you</Chip>}
        {st === 'proven' && <Chip className="bg-lm-allowbg text-lm-allow"><Check className="w-3 h-3" /> Proven</Chip>}
        {st === 'failed' && wide && <Chip className="bg-white text-[#c2413b]">Didn’t happen</Chip>}
      </span>
    </div>
  );
}

function Chip({ children, className }) {
  return <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[12px] font-semibold ${className}`}>{children}</span>;
}

function useLoop(active) {
  // `?t=3.6` freezes the scene at that moment (for previews and screenshots).
  const [frozen] = useState(() => {
    const v = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('t');
    return v === null ? null : Number(v);
  });
  const [animate] = useState(() => frozen === null && canAnimate());
  const [t, setT] = useState(frozen ?? (animate ? 0 : STATIC_T));
  const tRef = useRef(t);
  const jump = (to) => {
    tRef.current = to;
    setT(to);
  };
  useEffect(() => {
    if (!animate || !active) return undefined;
    let raf = 0;
    let last = 0;
    const tick = (now) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      tRef.current = (tRef.current + dt) % LOOP;
      setT(tRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, active]);
  return [t, jump, animate, frozen !== null];
}

export function AgentTimeline() {
  const outer = useRef(null);
  const [scale, setScale] = useState(1);
  const [visible, setVisible] = useState(true);
  const [t, jump, animate, frozen] = useLoop(visible);

  useLayoutEffect(() => {
    const el = outer.current;
    // Phones keep a readable size and swipe sideways, opening on "now".
    const ro = new ResizeObserver(([e]) => {
      const sc = Math.min(1, Math.max(0.6, e.contentRect.width / DESIGN_W));
      setScale(sc);
      if (sc > e.contentRect.width / DESIGN_W) requestAnimationFrame(() => { el.scrollLeft = el.scrollWidth; });
    });
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const fade = animate ? Math.min(1, t / 0.35, (LOOP - t) / 0.45) : 1;
  const states = Object.fromEntries(BARS.map((b) => [b.id, t >= b.start ? stateAt(b, t) : null]));
  const needs = states.big === 'needs' ? 1 : 0;
  const running = BARS.filter((b) => !LANES[b.lane].person && ['running', 'reread', 'wait', 'needs'].includes(states[b.id])).length;
  const laneStatus = (i) => {
    const live = BARS.filter((b) => b.lane === i && t >= b.start && t < (b.end ?? Infinity) && ['running', 'reread', 'wait', 'needs', 'person'].includes(states[b.id]));
    if (live.some((b) => states[b.id] === 'needs')) return ['Needs you', 'bg-[#fff1dc] text-[#b45309]'];
    if (live.some((b) => states[b.id] === 'wait')) return ['Waiting', 'bg-[#e8f0ff] text-[#1f5fd6]'];
    if (live.some((b) => states[b.id] === 'person')) return ['Editing', 'bg-[#f3f8df] text-[#5a6b16]'];
    if (!live.length) return LANES[i].person ? null : ['Idle', 'bg-lm-wash text-lm-ink2'];
    return null;
  };

  const bar = (id) => BARS.find((b) => b.id === id);
  const barBox = (id) => {
    const b = bar(id);
    const end = Math.min(b.end ?? t, t);
    return { left: xAt(b.start, t), right: xAt(end, t), top: b.lane * ROW_H };
  };

  const cur = animate || frozen ? cursorAt(t) : null;
  const popOpen = t >= 13.1 && t < 15.55;
  const pressed = t >= 15.15 && t < 15.55;
  const step = STEPS.reduce((acc, s, i) => (t >= s.t - 0.2 ? i : acc), 0);

  // the dashed link between the original refund and the stopped copy
  const showLink = t >= 3.3 && states.refundB === 'stopped';
  const a = barBox('refundA');
  const b = barBox('refundB');

  return (
    <div>
      <div ref={outer} className="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ height: (ROW_H * LANES.length + 128) * scale }}>
        <div style={{ width: DESIGN_W * scale, overflow: 'hidden' }}>
        <div
          className="origin-top-left rounded-[20px] border border-[#ececf0] bg-white shadow-[0_1px_2px_rgba(16,16,30,0.04),0_30px_80px_-40px_rgba(40,30,120,0.28)] overflow-hidden select-none"
          style={{ width: DESIGN_W, transform: `scale(${scale})` }}
        >
          {/* header */}
          <div className="flex items-center gap-3 px-6 h-[60px] border-b border-[#f0f0f3]">
            <Sparkles className="w-[18px] h-[18px] text-lm-accent" />
            <span className="text-[17px] font-semibold">Agents</span>
            <span className="flex items-center gap-1.5 text-[15px] text-lm-ink2"><span className="w-2 h-2 rounded-full bg-[#3b82f6]" />{running} running</span>
            {needs > 0 && <span className="flex items-center gap-1.5 text-[15px] text-[#c2570c]"><span className="w-2 h-2 rounded-full bg-[#f08a24]" />{needs} needs you</span>}
            <span className="flex items-center gap-1.5 text-[15px] text-lm-accent"><span className="w-2 h-2 rounded-full bg-lm-accent" />Lumni checking every action</span>
            <span className="ml-auto rounded-lg bg-lm-wash px-3 py-1 text-[14px] font-medium text-lm-ink2">Last 30m</span>
          </div>

          <div className="relative px-5 pb-4" style={{ opacity: fade }}>
            {/* axis */}
            <div className="relative h-[46px]" style={{ marginLeft: LABEL_W }}>
              {[25, 20, 15, 10, 5].map((m) => (
                <span key={m} className="absolute top-[16px] -translate-x-1/2 text-[13px] text-lm-ink3" style={{ left: TRACK_W * (1 - m / 30) }}>−{m}m</span>
              ))}
              <span className="absolute top-[13px] -translate-x-full rounded-md bg-[#e8f0ff] px-1.5 py-0.5 text-[12px] font-semibold text-[#1f5fd6]" style={{ left: TRACK_W }}>now</span>
            </div>

            <div className="relative">
              {LANES.map((lane, i) => {
                const status = laneStatus(i);
                return (
                  <div key={lane.name} className="flex items-center border-b border-[#f4f4f6] last:border-0" style={{ height: ROW_H }}>
                    <div className="flex items-center gap-3 shrink-0" style={{ width: LABEL_W }}>
                      <span className={`w-9 h-9 rounded-[10px] border flex items-center justify-center ${lane.person ? 'border-[#dfe9b4] bg-[#f6fae6]' : 'border-[#ececf0] bg-white'}`}>
                        <lane.Icon className={`w-[17px] h-[17px] ${lane.person ? 'text-[#5a6b16]' : 'text-lm-ink'}`} />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[15px] font-semibold">{lane.name}</span>
                          {status && <span className={`rounded-md px-1.5 py-px text-[11px] font-semibold ${status[1]}`}>{status[0]}</span>}
                        </div>
                        <div className="text-[13px] text-lm-ink2">{lane.sub}</div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* track with bars, faded at the left edge */}
              <div
                className="absolute top-0 bottom-0"
                style={{ left: LABEL_W, width: TRACK_W, maskImage: 'linear-gradient(90deg,transparent 0,#000 48px)', WebkitMaskImage: 'linear-gradient(90deg,transparent 0,#000 48px)' }}
              >
                {LANES.map((lane, i) => (
                  <div key={lane.name} className="absolute left-0 right-0" style={{ top: i * ROW_H, height: ROW_H }}>
                    {BARS.filter((x) => x.lane === i).map((x) => <Bar key={x.id} bar={x} t={t} />)}
                  </div>
                ))}
              </div>

              {/* overlays, not masked */}
              <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: LABEL_W, width: TRACK_W }}>
                {showLink && a.right > 0 && (
                  <svg className="absolute inset-0 overflow-visible" width={TRACK_W} height={ROW_H * LANES.length}>
                    <path
                      d={`M ${a.right - 10} ${a.top + 46} C ${a.right - 10} ${a.top + 56}, ${b.right - 10} ${b.top + 2}, ${b.right - 10} ${b.top + 12}`}
                      fill="none" stroke="#8578ff" strokeWidth="1.6" strokeDasharray="3 4"
                    />
                  </svg>
                )}

                {TIPS.filter((tip) => t >= tip.from && t < tip.to).map((tip) => {
                  const box = barBox(tip.bar);
                  const k = Math.min(1, (t - tip.from) / 0.2, (tip.to - t) / 0.2);
                  const x = Math.max(8, Math.min(TRACK_W - 330, box.left + 12));
                  return (
                    <div
                      key={tip.title}
                      className="absolute w-[320px] rounded-xl bg-[#17171c] text-white px-3.5 py-3 shadow-xl"
                      style={{ left: x, top: box.top > 3 * ROW_H ? box.top - 74 : box.top + 52, opacity: k, transform: `translateY(${(1 - k) * 6}px)`, zIndex: 5 }}
                    >
                      <div className="text-[12px] font-semibold text-[#b9b2ff] mb-1">{tip.title}</div>
                      {tip.lines.map((l) => (
                        <div key={l} className="flex gap-2 text-[13px] leading-[1.45] text-white/90"><span className="text-white/40">•</span>{l}</div>
                      ))}
                    </div>
                  );
                })}

                {popOpen && (
                  <div
                    className="absolute w-[300px] rounded-2xl bg-white border border-[#ececf0] shadow-[0_20px_50px_-12px_rgba(16,16,30,0.3)] p-4"
                    style={{ left: TRACK_W - 300, top: 5 * ROW_H - 132, opacity: Math.min(1, (t - 13.1) / 0.18, (15.55 - t) / 0.12), zIndex: 6 }}
                  >
                    <div className="text-[15px] font-semibold">Refund $900 to Globex?</div>
                    <p className="mt-1 text-[13px] text-lm-ink2 leading-snug">Over your $500 rule. Ops agent asked 4 min ago. Nothing else touched this order.</p>
                    <div className="mt-3 flex justify-end gap-2">
                      <span className="rounded-lg border border-[#ececf0] px-3 py-1.5 text-[13px] font-medium">Reject</span>
                      <span className={`rounded-lg px-3 py-1.5 text-[13px] font-medium text-white transition-transform ${pressed ? 'bg-black scale-95' : 'bg-lm-ink'}`}>Approve</span>
                    </div>
                  </div>
                )}

                {cur && (
                  <svg className="absolute" width="20" height="24" viewBox="0 0 20 24" style={{ left: cur.x, top: cur.y, opacity: cur.o, zIndex: 7, transform: pressed ? 'scale(0.88)' : 'none' }}>
                    <path d="M2 1.5 L2 19 L6.6 14.8 L9.6 21.6 L12.6 20.3 L9.7 13.6 L16 13.6 Z" fill="#111" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* what's happening, and a way to jump to it */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-5 gap-2">
        {STEPS.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => jump(s.t - 0.25)}
            className={`text-left rounded-xl px-3.5 py-3 transition-colors border ${i === step ? 'bg-white border-lm-accentline shadow-sm' : 'hidden sm:block border-transparent hover:bg-white/60'}`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full text-[11px] font-semibold flex items-center justify-center ${i === step ? 'bg-lm-accent text-white' : 'bg-lm-wash text-lm-ink2'}`}>{i + 1}</span>
              <span className={`text-sm font-semibold ${i === step ? 'text-lm-ink' : 'text-lm-ink2'}`}>{s.label}</span>
            </div>
            <p className={`mt-1.5 text-[13px] leading-snug ${i === step ? 'text-lm-ink2' : 'text-lm-ink3'}`}>{s.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
