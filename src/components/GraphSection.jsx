import { useRef, useState, useEffect } from 'react';

const nodes = [
  { id: 'code-reviewer', label: 'Code Reviewer', status: 'healthy', x: 15, y: 8 },
  { id: 'deploy-bot', label: 'Deploy Bot', status: 'degraded', x: 40, y: 25 },
  { id: 'ci-monitor', label: 'CI Monitor', status: 'idle', x: 8, y: 35 },
  { id: 'metrics-collector', label: 'Metrics Collector', status: 'healthy', x: 22, y: 55 },
  { id: 'email-campaign', label: 'Email Campaign', status: 'healthy', x: 65, y: 10 },
  { id: 'growth-analytics', label: 'Growth Analytics', status: 'idle', x: 55, y: 45 },
  { id: 'incident-manager', label: 'Incident Manager', status: 'healthy', x: 40, y: 70 },
  { id: 'security-scanner', label: 'Security Scanner', status: 'healthy', x: 72, y: 40 },
  { id: 'fraud-detector', label: 'Fraud Detector', status: 'degraded', x: 58, y: 78 },
  { id: 'audit-logger', label: 'Audit Logger', status: 'healthy', x: 80, y: 70 },
];

const edges = [
  { from: 'code-reviewer', to: 'deploy-bot', label: 'approved', type: 'collaboration' },
  { from: 'ci-monitor', to: 'deploy-bot', label: '', type: 'dependency' },
  { from: 'deploy-bot', to: 'email-campaign', label: 'welcome', type: 'handoff' },
  { from: 'deploy-bot', to: 'growth-analytics', label: 'analytics', type: 'dependency' },
  { from: 'metrics-collector', to: 'deploy-bot', label: 'metrics', type: 'dependency' },
  { from: 'incident-manager', to: 'fraud-detector', label: 'escalate', type: 'handoff' },
  { from: 'fraud-detector', to: 'audit-logger', label: 'alert', type: 'collaboration' },
  { from: 'security-scanner', to: 'incident-manager', label: '', type: 'dependency' },
  { from: 'growth-analytics', to: 'security-scanner', label: '', type: 'collaboration' },
];

const statusColors = {
  healthy: 'bg-green-500',
  degraded: 'bg-orange-400',
  idle: 'bg-gray-400',
  offline: 'bg-red-500',
};

const edgeStyles = {
  collaboration: 'stroke-muted/40',
  dependency: 'stroke-muted/30 [stroke-dasharray:4_4]',
  handoff: 'stroke-secondary/40',
};

function getNodeCenter(node) {
  return { x: node.x + 5, y: node.y + 3 };
}

export function GraphSection() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <section ref={ref} id="graph" className="py-16 sm:py-24 bg-canvas/80">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
            Architecture Graph
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
            See how your agents collaborate — and where they break.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Live topology of every agent, their dependencies, handoffs, and bottlenecks.
          </p>
        </div>

        {/* Graph Container — scrolls horizontally on mobile so nodes don't overlap */}
        <div className="-mx-6 px-6 overflow-x-auto sm:mx-0 sm:px-0 sm:overflow-visible">
        <div className="relative rounded-xl bg-background border border-border overflow-hidden min-w-[600px] sm:min-w-0 min-h-[360px] sm:min-h-[480px]">
          {/* Legend */}
          <div className="hidden sm:block absolute top-4 right-4 z-10 space-y-3">
            <div>
              <div className="font-mono text-[10px] text-muted uppercase tracking-wider mb-1.5">Status</div>
              <div className="space-y-1">
                {['healthy', 'degraded', 'idle'].map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${statusColors[s]}`} />
                    <span className="font-mono text-[10px] text-muted capitalize">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-muted uppercase tracking-wider mb-1.5">Edges</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-px bg-muted/40" />
                  <span className="font-mono text-[10px] text-muted">Collaboration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-px border-t border-dashed border-muted/40" />
                  <span className="font-mono text-[10px] text-muted">Dependency</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-px bg-secondary/40" />
                  <span className="font-mono text-[10px] text-muted">Handoff</span>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            {edges.map((edge, i) => {
              const from = getNodeCenter(nodeMap[edge.from]);
              const to = getNodeCenter(nodeMap[edge.to]);
              const isDashed = edge.type === 'dependency';
              const isHandoff = edge.type === 'handoff';
              return (
                <line
                  key={i}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  className={`transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                  stroke={isHandoff ? 'rgba(34, 197, 94, 0.4)' : 'rgba(156, 163, 175, 0.3)'}
                  strokeWidth="1"
                  strokeDasharray={isDashed ? '4 4' : 'none'}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => (
            <div
              key={node.id}
              className={`absolute transition-all duration-700 ${
                inView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-canvas border border-border text-xs whitespace-nowrap ${
                node.status === 'degraded' ? 'border-orange-400/40' : ''
              }`}>
                <span className={`w-2 h-2 rounded-full ${statusColors[node.status]} ${
                  node.status === 'degraded' ? 'animate-pulse' : ''
                }`} />
                <span className="font-mono text-foreground">{node.label}</span>
              </div>
            </div>
          ))}

          {/* Edge Labels */}
          {edges.filter(e => e.label).map((edge, i) => {
            const from = getNodeCenter(nodeMap[edge.from]);
            const to = getNodeCenter(nodeMap[edge.to]);
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            return (
              <span
                key={`label-${i}`}
                className={`absolute font-mono text-[9px] text-muted/60 pointer-events-none transition-opacity duration-700 ${
                  inView ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  left: `${midX}%`,
                  top: `${midY}%`,
                  transform: 'translate(-50%, -50%)',
                  transitionDelay: `${800 + i * 100}ms`,
                }}
              >
                {edge.label}
              </span>
            );
          })}
        </div>
        </div>

        {/* Comparison Bar */}
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="rounded-lg border border-border bg-canvas p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] text-red-400 uppercase">Without</span>
            </div>
            <p className="text-sm text-muted">
              Blind to cascading failures. Average detection time: <span className="text-red-400 font-medium">23 minutes</span>.
            </p>
          </div>
          <div className="rounded-lg border border-secondary/30 bg-canvas p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] text-secondary uppercase">With Lumniverse</span>
            </div>
            <p className="text-sm text-muted">
              Bottleneck detected in <span className="text-secondary font-medium">800ms</span>. 3 downstream agents paused automatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
