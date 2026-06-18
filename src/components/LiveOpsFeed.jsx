import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const events = [
  {
    chip: 'DETECT',
    icon: '⚡',
    text: 'Failure caught at tool layer',
    chipClass: 'text-secondary border-secondary/40 bg-secondary/10',
  },
  {
    chip: 'RCA',
    icon: '🔬',
    text: 'Layer 3 · schema drift /api/v2 · 82%',
    chipClass: 'text-violet-400 border-violet-400/40 bg-violet-400/10',
  },
  {
    chip: 'EVIDENCE',
    icon: '📋',
    text: 'Expected {items:[]} · Got {data:[]}',
    chipClass: 'text-sky-400 border-sky-400/40 bg-sky-400/10',
  },
  {
    chip: 'FINOPS',
    icon: '💸',
    text: 'Token spend 2.3x daily avg — flagged',
    chipClass: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
  },
  {
    chip: 'POLICY',
    icon: '🛡',
    text: 'Regression gate armed · deploy blocked',
    chipClass: 'text-blue-400 border-blue-400/40 bg-blue-400/10',
  },
  {
    chip: 'FIX',
    icon: '🔧',
    text: 'Schema adapter patch applied',
    chipClass: 'text-secondary border-secondary/40 bg-secondary/10',
  },
  {
    chip: 'REPLAY',
    icon: '🔄',
    text: 'State restored · resumed · 0 data loss',
    chipClass: 'text-secondary border-secondary/40 bg-secondary/10',
  },
];

const metrics = [
  { label: 'MTTR', value: '−92%', color: 'text-secondary' },
  { label: 'Waste saved', value: '$487', color: 'text-amber-400' },
  { label: 'Deploys blocked', value: '3', color: 'text-blue-400' },
];

const STEP_MS = 750;
const HOLD_MS = 2200;

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function LiveOpsFeed() {
  // index of last revealed event; events.length means "all + footer shown"
  const [revealed, setRevealed] = useState(prefersReducedMotion() ? events.length : -1);
  const [showFooter, setShowFooter] = useState(prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let timers = [];

    const run = () => {
      timers.forEach(clearTimeout);
      timers = [];

      setRevealed(-1);
      setShowFooter(false);

      events.forEach((_, i) => {
        timers.push(setTimeout(() => setRevealed(i), 400 + i * STEP_MS));
      });

      const footerAt = 400 + events.length * STEP_MS + 200;
      timers.push(setTimeout(() => setShowFooter(true), footerAt));

      // restart the loop
      timers.push(setTimeout(run, footerAt + HOLD_MS));
    };

    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full max-w-xl">
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-xl border border-border bg-canvas px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-blink" />
          <span className="font-mono text-xs font-medium tracking-wider text-foreground">
            LUMNIVERSE
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          auto-resolving · live
        </span>
      </div>

      {/* Event stream */}
      <div className="rounded-b-xl border-x border-b border-border bg-canvas px-4 pt-3 pb-4 min-h-[320px]">
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {events.map((event, i) =>
              i <= revealed ? (
                <motion.div
                  key={`${event.chip}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex items-center gap-3"
                >
                  <span
                    className={`shrink-0 w-[78px] text-center font-mono text-[10px] font-medium uppercase tracking-wider rounded border px-1.5 py-1 ${event.chipClass}`}
                  >
                    {event.chip}
                  </span>
                  <span className="shrink-0 text-sm">{event.icon}</span>
                  <span className="font-mono text-xs leading-relaxed text-foreground/90">
                    {event.text}
                  </span>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

          {/* Working cursor while streaming */}
          {revealed < events.length - 1 && !showFooter && (
            <div className="flex items-center gap-2 pl-1 pt-1">
              <span className="font-mono text-xs text-muted">analyzing</span>
              <span className="cursor" />
            </div>
          )}
        </div>

        {/* Metrics footer */}
        <AnimatePresence>
          {showFooter && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-4 grid grid-cols-3 gap-2 rounded-lg border border-secondary/30 bg-background/60 p-3"
            >
              {metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className={`font-mono text-lg font-semibold ${m.color}`}>
                    {m.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
