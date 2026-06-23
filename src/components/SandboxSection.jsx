import { useRef, useState, useEffect } from 'react';
import { Shield, FlaskConical } from 'lucide-react';

const metadata = [
  { label: 'SOURCE', value: 'run_8291' },
  { label: 'WORKFLOW', value: 'Refund agent' },
  { label: 'FAILURE TYPE', value: 'Tool argument validation' },
  { label: 'TEST STATUS', value: 'Draft', animatedValue: 'Generated', color: 'text-secondary' },
  { label: 'GATE STATUS', value: 'Not enabled', animatedValue: 'Enabled', color: 'text-secondary' },
];

export function SandboxSection() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setAnimated(true), 3000);
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <section ref={ref} id="sandbox" className="py-16 sm:py-24 bg-canvas/80">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left — Product Mock */}
          <div className="rounded-xl bg-background border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-foreground font-bold text-lg">Prevent This Again</h3>
              <p className="text-sm text-muted mt-0.5">Convert failed run into a regression test that blocks future deploys</p>
            </div>

            <div className="p-5 space-y-4">
              {/* Error Display */}
              <div
                className={`rounded-lg bg-canvas border border-border p-4 transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <code className="text-sm text-red-400 font-mono">
                  create_refund failed because payload was missing required field `currency`
                </code>
                <p className="text-xs text-muted/60 mt-2">
                  Block future releases where the agent sends invalid refund payloads
                </p>
              </div>

              {/* Metadata Badges */}
              <div className="flex flex-wrap gap-2">
                {metadata.map((item, i) => (
                  <div
                    key={item.label}
                    className={`px-3 py-1.5 rounded-lg bg-canvas border border-border transition-all duration-500 ${
                      inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                    style={{ transitionDelay: `${400 + i * 100}ms` }}
                  >
                    <div className="font-mono text-[9px] text-muted uppercase tracking-wider">{item.label}</div>
                    <div className={`font-mono text-xs mt-0.5 ${
                      animated && item.animatedValue ? item.color : 'text-foreground'
                    } transition-colors duration-300`}>
                      {animated && item.animatedValue ? item.animatedValue : item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div
                className={`flex flex-wrap gap-3 pt-2 transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '900ms' }}
              >
                <button className="px-4 py-2 rounded-lg bg-secondary text-white font-mono text-xs font-medium hover:bg-secondary/90 transition-colors">
                  Generate Test
                </button>
                <button className="px-4 py-2 rounded-lg border border-border text-foreground font-mono text-xs font-medium hover:bg-canvas transition-colors">
                  Run Test
                </button>
                <button className="px-4 py-2 rounded-lg bg-orange-500 text-white font-mono text-xs font-medium hover:bg-orange-500/90 transition-colors">
                  Add to Gate
                </button>
              </div>
            </div>
          </div>

          {/* Right — Messaging + Comparison */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
              Sandbox & Prevention
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
              Turn every failure into a gate that blocks the next one.
            </h2>
            <p className="text-lg text-muted max-w-xl mb-10">
              Convert failed runs into regression tests. Sandbox environments replay agent behavior safely. Never ship the same bug twice.
            </p>

            {/* Comparison */}
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-canvas p-4">
                <div className="font-mono text-[10px] text-red-400 uppercase mb-2">Without</div>
                <div className="space-y-1 text-sm text-muted">
                  <p>Same failure hits prod <span className="text-red-400">3 more times</span></p>
                  <p>Each time: 47 min MTTR</p>
                  <p>Customer complaints pile up</p>
                  <p className="text-red-400 font-medium">3 repeat outages/month</p>
                </div>
              </div>
              <div className="rounded-lg border border-secondary/30 bg-canvas p-4">
                <div className="font-mono text-[10px] text-secondary uppercase mb-2">With Lumniverse</div>
                <div className="space-y-1 text-sm text-muted">
                  <p>Failure → regression test</p>
                  <p>Test blocks next deploy in CI</p>
                  <p className="text-secondary font-medium">Zero repeat outages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
