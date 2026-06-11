import { useState, useEffect } from 'react';

const withoutSteps = [
  { icon: '⚠️', label: 'ALERT', text: 'Agent "order-processor" failed', color: 'text-red-400' },
  { icon: '👤', label: 'ENGINEER', text: 'Checking CloudWatch logs...', color: 'text-muted' },
  { icon: '🔍', label: 'DEBUG', text: 'grep -r "order-processor" logs/', color: 'text-muted' },
  { icon: '⏳', label: 'WAIT', text: 'Searching 847 log entries...', color: 'text-muted' },
  { icon: '❓', label: 'GUESS', text: 'Maybe tool timeout? Restarting...', color: 'text-orange-400' },
  { icon: '❌', label: 'FAILED', text: 'Same error. Escalating to on-call.', color: 'text-red-400' },
];

const withSteps = [
  { icon: '⚡', label: 'DETECT', text: 'Failure caught at tool layer', color: 'text-secondary' },
  { icon: '🔬', label: 'RCA', text: 'Layer 3: Schema drift in /api/v2', color: 'text-secondary' },
  { icon: '📋', label: 'EVIDENCE', text: 'Expected: {items: []}, Got: {data: []}', color: 'text-violet-400' },
  { icon: '🔄', label: 'REPLAY', text: 'State restored → schema mapped', color: 'text-secondary' },
  { icon: '✓', label: 'RESOLVED', text: 'Agent resumed. 0 data loss.', color: 'text-secondary' },
];

export function ComparisonDemo() {
  const [withoutIndex, setWithoutIndex] = useState(-1);
  const [withIndex, setWithIndex] = useState(-1);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timers = [];

    withoutSteps.forEach((_, i) => {
      timers.push(setTimeout(() => setWithoutIndex(i), 600 + i * 700));
    });

    const withStart = 600 + withoutSteps.length * 700 + 400;
    withSteps.forEach((_, i) => {
      timers.push(setTimeout(() => setWithIndex(i), withStart + i * 600));
    });

    timers.push(setTimeout(() => setShowResult(true), withStart + withSteps.length * 600 + 300));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full max-w-xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-1 text-center">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">Without</span>
        </div>
        <div className="flex-1 text-center">
          <span className="font-mono text-xs uppercase tracking-wider text-secondary">+ Lumniverse</span>
        </div>
      </div>

      {/* Comparison Panels */}
      <div className="grid grid-cols-2 gap-3">
        {/* Without Panel */}
        <div className="rounded-lg bg-canvas border border-border p-3 min-h-[260px]">
          <div className="space-y-2">
            {withoutSteps.map((step, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 transition-all duration-300 ${
                  i <= withoutIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                <span className="font-mono text-[10px] text-muted shrink-0 w-4 text-right">{i + 1}</span>
                <span className={`font-mono text-xs leading-relaxed ${step.color}`}>
                  <span className="text-muted/60">{step.label}</span>{' '}
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* With Panel */}
        <div className="rounded-lg bg-canvas border border-secondary/30 p-3 min-h-[260px]">
          <div className="space-y-2">
            {withSteps.map((step, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 transition-all duration-300 ${
                  i <= withIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                <span className="font-mono text-[10px] text-muted shrink-0 w-4 text-right">{i + 1}</span>
                <span className={`font-mono text-xs leading-relaxed ${step.color}`}>
                  <span className="text-secondary/70">{step.label}</span>{' '}
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result Bar */}
      <div
        className={`mt-4 rounded-lg border border-border bg-canvas p-3 transition-all duration-500 ${
          showResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-muted uppercase tracking-wider">Mean Time to Resolve</span>
          <span className="text-secondary font-medium">-92%</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] text-muted">WITHOUT</span>
              <span className="font-mono text-sm text-red-400 font-medium">47 min</span>
            </div>
            <div className="h-2 bg-red-400/20 rounded-full overflow-hidden">
              <div className="h-full bg-red-400 rounded-full w-full" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] text-muted">WITH</span>
              <span className="font-mono text-sm text-secondary font-medium">3m 42s</span>
            </div>
            <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full w-[8%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
