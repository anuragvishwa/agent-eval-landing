import { useRef, useState, useEffect } from 'react';
import { Wrench, ThumbsUp, ThumbsDown } from 'lucide-react';

const suspects = [
  {
    rank: 1,
    title: 'TOOL SCHEMA DRIFT',
    category: 'TOOL',
    categoryColor: 'text-orange-400 bg-orange-400/10',
    description: 'Tool schema mismatch after deploy',
    detail: 'Direct correlation between schema v13 deploy and 100% of validation errors',
    confidence: 82,
    barColor: 'bg-green-500',
    actions: ['Schema Adapter Patch', 'Rollback to v12'],
  },
  {
    rank: 2,
    title: 'PROMPT REGRESSION',
    category: 'PROMPT',
    categoryColor: 'text-violet-400 bg-violet-400/10',
    description: 'Prompt instructs currency validation not present in schema',
    detail: "Prompt references 'currency' field that schema v13 made required but agent doesn't populate",
    confidence: 45,
    barColor: 'bg-orange-400',
    actions: ['Prompt Edit', 'Schema Alignment'],
  },
  {
    rank: 3,
    title: 'RETRY LOGIC GAP',
    category: 'RUNTIME',
    categoryColor: 'text-red-400 bg-red-400/10',
    description: 'Agent retry logic does not fix payload before retry',
    detail: 'Retry fires but re-sends identical broken payload',
    confidence: 30,
    barColor: 'bg-red-400',
    actions: ['Retry Middleware Patch'],
  },
];

function ConfidenceBar({ confidence, color, inView, delay }) {
  return (
    <div className="h-1.5 bg-border rounded-full overflow-hidden w-24">
      <div
        className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
        style={{
          width: inView ? `${confidence}%` : '0%',
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}

export function FixesSection() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="fixes" className="py-24 bg-background/80">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
          {/* Left — Messaging + Comparison */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
              Root Cause & Fix
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
              From failure to fix in one click.
            </h2>
            <p className="text-lg text-muted max-w-xl mb-10">
              Ranked root-cause suspects with confidence scores. Ready-to-apply remediation — no guesswork, no war rooms.
            </p>

            {/* Comparison */}
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-canvas p-4">
                <div className="font-mono text-[10px] text-red-400 uppercase mb-2">Without</div>
                <div className="space-y-1 text-sm text-muted">
                  <p>Open 6 dashboards</p>
                  <p>Check 3 log services</p>
                  <p>Try 2 wrong fixes</p>
                  <p className="text-red-400 font-medium">Total: 47 minutes</p>
                </div>
              </div>
              <div className="rounded-lg border border-secondary/30 bg-canvas p-4">
                <div className="font-mono text-[10px] text-secondary uppercase mb-2">With Lumniverse</div>
                <div className="space-y-1 text-sm text-muted">
                  <p>Top suspect: <span className="text-secondary">82% confidence</span></p>
                  <p>One-click "Schema Adapter Patch"</p>
                  <p className="text-secondary font-medium">Total: 47 seconds</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Ranked Suspects */}
          <div className="rounded-xl bg-canvas border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-foreground font-semibold">Why Did This Fail?</h3>
              <p className="font-mono text-[10px] text-muted uppercase tracking-wider mt-0.5">Ranked Root-Cause Suspects</p>
            </div>

            <div className="divide-y divide-border">
              {suspects.map((suspect, i) => (
                <div
                  key={suspect.rank}
                  className={`p-5 transition-all duration-700 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  } ${i === 0 ? 'ring-1 ring-inset ring-secondary/20' : ''}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  <div className="flex items-start gap-3">
                    {/* Rank */}
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? 'bg-secondary text-white' : 'bg-surface text-muted'
                    }`}>
                      {suspect.rank}
                    </span>

                    <div className="flex-1 min-w-0">
                      {/* Title + Category */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-foreground">{suspect.title}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${suspect.categoryColor}`}>
                          {suspect.category}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted mb-2">{suspect.description}</p>
                      <p className="text-xs text-muted/60 mb-3">{suspect.detail}</p>

                      {/* Confidence + Actions */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <ConfidenceBar
                          confidence={suspect.confidence}
                          color={suspect.barColor}
                          inView={inView}
                          delay={400 + i * 200}
                        />
                        <span className="font-mono text-xs text-muted">{suspect.confidence}%</span>
                        <ThumbsUp className="w-3 h-3 text-muted/40 hover:text-secondary cursor-pointer transition-colors" />
                        <ThumbsDown className="w-3 h-3 text-muted/40 hover:text-red-400 cursor-pointer transition-colors" />

                        <div className="flex gap-2 ml-auto">
                          {suspect.actions.map(action => (
                            <span
                              key={action}
                              className="px-2 py-0.5 rounded text-[10px] font-mono text-secondary border border-secondary/30 hover:bg-secondary/10 cursor-pointer transition-colors"
                            >
                              {action}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
