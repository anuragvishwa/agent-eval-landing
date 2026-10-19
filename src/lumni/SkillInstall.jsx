import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Check, Copy } from 'lucide-react';

// The real `npx skills add lumnihq/lumni` session, typed out, then a coding agent using the skill.
const COMMAND = 'npx skills add lumnihq/lumni';
const LINES = [
  { at: 0.3, text: '◇  Source: https://github.com/lumnihq/lumni.git', dim: true },
  { at: 0.7, text: '◇  Repository cloned', dim: true },
  { at: 1.1, text: '◇  Found 1 skill' },
  { at: 1.6, text: '◇  Which agents do you want to install to?', dim: true },
  { at: 1.9, text: '│  Amp, Cline, Codex, Cursor, Gemini CLI, GitHub Copilot +7 more' },
  { at: 2.5, text: '◇  Installed 1 skill', dim: true },
  { at: 2.8, text: '│  ✓ lumni (copied) → .agents/skills/lumni', ok: true },
  { at: 3.2, text: '└  Done!', ok: true },
];
const ASK = 'Add Lumni to the refund step';
const C = ({ children }) => <code className="font-mono text-[12px] text-lm-ink">{children}</code>;
const REPLY = [
  ['wrap', <>Wrapped <C>stripe.refunds.create</C> with <C>lumni.checkAction</C></>],
  ['key', <>Named the effect <C>{'refund:${order.id}'}</C>, so a second refund is stopped</>],
  ['handle', <>Handles waits, re-reads and approvals, and reports the result</>],
];
const TYPE_MS = 45;
const LOOP_MS = 15000;

export function SkillInstall() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-80px' });
  const [ms, setMs] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const start = performance.now() - ms;
    const id = setInterval(() => setMs((performance.now() - start) % LOOP_MS), 50);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const typed = COMMAND.slice(0, Math.floor(ms / TYPE_MS));
  const after = (ms - COMMAND.length * TYPE_MS - 300) / 1000; // seconds since Enter
  const askStart = 4.4;
  const askTyped = after > askStart ? ASK.slice(0, Math.floor(((after - askStart) * 1000) / TYPE_MS)) : '';
  const replyAt = askStart + (ASK.length * TYPE_MS) / 1000 + 0.6;

  return (
    <div ref={ref} className="space-y-3">
      <div className="rounded-2xl bg-lm-ink text-[#e7e7ee] shadow-xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" /><span className="w-2.5 h-2.5 rounded-full bg-white/20" /><span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="ml-3 font-mono text-xs text-white/50">~/my-agent</span>
        </div>
        <div className="p-5 font-mono text-[12.5px] sm:text-[13px] leading-6 h-[260px] overflow-hidden">
          <div>
            <span className="text-lm-pop">$</span> {typed}
            {typed.length < COMMAND.length && <span className="inline-block w-[7px] h-[14px] -mb-0.5 bg-white/80 animate-pulse" />}
          </div>
          {LINES.filter((l) => after >= l.at).map((l) => (
            <div key={l.text} className={`whitespace-pre truncate ${l.ok ? 'text-[#9be7b0]' : l.dim ? 'text-white/45' : 'text-white/90'}`}>{l.text}</div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-lm-line bg-white p-4 min-h-[148px]">
        <div className="text-xs font-semibold text-lm-ink3 mb-2">Your coding agent</div>
        <div className="flex justify-end">
          <div className={`rounded-2xl rounded-br-md bg-lm-wash px-3.5 py-2 text-sm transition-opacity ${askTyped ? 'opacity-100' : 'opacity-40'}`}>
            {askTyped || <span className="text-lm-ink3">Ask it anything…</span>}
          </div>
        </div>
        <div className="mt-2.5 space-y-1">
          {REPLY.map(([k, r], i) => (
            <div key={k} className={`flex items-start gap-2 text-[13px] transition-all duration-300 ${after > replyAt + i * 0.5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
              <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-lm-allow" />
              <span className="text-lm-ink2">{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillCommand() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(COMMAND); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* selectable */ }
      }}
      className="group inline-flex items-center gap-3 rounded-full border border-lm-line2 bg-white pl-4 pr-3 py-2.5 font-mono text-[13px] hover:border-lm-ink3"
    >
      <span><span className="text-lm-ink3">$</span> {COMMAND}</span>
      {copied ? <Check className="w-4 h-4 text-lm-allow" /> : <Copy className="w-4 h-4 text-lm-ink3 group-hover:text-lm-ink" />}
    </button>
  );
}
