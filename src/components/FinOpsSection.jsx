import { useRef, useState, useEffect } from 'react';
import { DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

const agents = [
  { name: 'Support Agent', model: 'Claude Opus 4.5', tokens: '1.2M tokens', time: '2m ago', cost: 4.80, status: 'SUCCESS', statusColor: 'bg-green-500', textColor: 'text-green-400', icon: '🤖' },
  { name: 'RCA Investigator', model: 'GPT-5.5 High', tokens: '860k tokens', time: '8m ago', cost: 3.10, status: 'RUNNING', statusColor: 'bg-blue-500', textColor: 'text-blue-400', icon: '🔍' },
  { name: 'Policy Agent', model: 'Gemini 2.5 Pro', tokens: '310k tokens', time: '21m ago', cost: 0.92, status: 'FAILED', statusColor: 'bg-red-500', textColor: 'text-red-400', icon: '📋' },
  { name: 'Tool Watcher', model: 'AWS Bedrock', tokens: '540k tokens', time: '34m ago', cost: 1.76, status: 'DEGRADED', statusColor: 'bg-orange-400', textColor: 'text-orange-400', icon: '⚙️' },
];

function AnimatedCost({ target, inView }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span>${value.toFixed(2)}</span>;
}

function Sparkline({ inView }) {
  const points = '0,40 15,35 30,38 45,20 55,25 65,15 75,22 85,10 100,12';
  return (
    <svg viewBox="0 0 100 50" className="w-20 h-8" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-secondary"
        strokeDasharray="200"
        strokeDashoffset={inView ? '0' : '200'}
        style={{ transition: 'stroke-dashoffset 2s ease-out' }}
      />
    </svg>
  );
}

export function FinOpsSection() {
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
    <section ref={ref} id="finops" className="py-16 sm:py-24 bg-background/80">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Messaging + Comparison */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
              FinOps
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
              Know exactly what each agent costs — before the bill arrives.
            </h2>
            <p className="text-lg text-muted max-w-xl mb-10">
              Per-agent cost attribution, real-time spend alerts, and trend analysis across every model provider.
            </p>

            {/* Comparison */}
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-canvas p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="font-mono text-xs text-red-400 uppercase">Without</span>
                </div>
                <p className="text-sm text-muted">
                  Month-end surprise: <span className="text-red-400 font-medium">$487 bill</span>. No attribution. "Which agent ran 2M tokens at 3 AM?"
                </p>
              </div>
              <div className="rounded-lg border border-secondary/30 bg-canvas p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                  <span className="font-mono text-xs text-secondary uppercase">With Lumniverse</span>
                </div>
                <p className="text-sm text-muted">
                  Real-time alerts. Per-agent breakdown. <span className="text-secondary font-medium">Cost spike caught at 2:14 PM</span> — before it compounds.
                </p>
              </div>
            </div>
          </div>

          {/* Right — Agent Cost Dashboard */}
          <div className="rounded-xl bg-canvas border border-border overflow-hidden">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted">RCA Engine</span>
                <span className="px-2 py-0.5 rounded bg-surface border border-border font-mono text-[10px] text-muted">RCA</span>
                <span className="px-2 py-0.5 rounded bg-secondary/10 border border-secondary/30 font-mono text-[10px] text-secondary">Agents</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="font-mono text-[10px] text-secondary">LIVE</span>
              </div>
            </div>

            {/* Total Cost */}
            <div className="px-5 py-5 border-b border-border">
              <div className="text-xs text-muted font-mono uppercase tracking-wider mb-1">Total Cost Today</div>
              <div className="flex items-center justify-between">
                <span className="font-serif text-4xl font-light text-foreground">
                  <AnimatedCost target={10.58} inView={inView} />
                </span>
                <Sparkline inView={inView} />
              </div>
              <div className="text-xs text-muted mt-1">4 agents · 2 active · 1 failed · 1 degraded</div>
            </div>

            {/* Agent Rows */}
            <div className="divide-y divide-border">
              {agents.map((agent, i) => (
                <div
                  key={agent.name}
                  className={`flex items-center gap-3 px-5 py-3 transition-all duration-500 ${
                    inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                  style={{ transitionDelay: `${600 + i * 150}ms` }}
                >
                  <span className="text-lg">{agent.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground font-medium truncate">{agent.name}</div>
                    <div className="text-[10px] text-muted">{agent.model} · {agent.tokens} · {agent.time}</div>
                  </div>
                  <span className="font-mono text-sm text-foreground font-medium">
                    <AnimatedCost target={agent.cost} inView={inView} />
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${agent.textColor} bg-current/10`}
                    style={{ backgroundColor: `color-mix(in srgb, currentColor 10%, transparent)` }}
                  >
                    <span className={agent.textColor}>{agent.status}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
