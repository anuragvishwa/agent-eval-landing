import { useState, useEffect, useRef } from 'react';
import { Network, Zap, Database, GitBranch, MessageSquare, Search, DollarSign, Shield } from 'lucide-react';

const capabilities = [
  {
    id: 'fleet',
    number: '01',
    icon: Network,
    title: 'Fleet Monitoring',
    description: 'Real-time agent health and cost',
    Demo: FleetMonitoringDemo,
  },
  {
    id: 'rca',
    number: '02',
    icon: Zap,
    title: '7-Layer RCA',
    description: 'Pinpoint failures across the stack',
    Demo: RCADemo,
  },
  {
    id: 'replay',
    number: '03',
    icon: Database,
    title: 'State Replay',
    description: 'Resume from any failure checkpoint',
    Demo: StateReplayDemo,
  },
  {
    id: 'graph',
    number: '04',
    icon: GitBranch,
    title: 'Architecture Graph',
    description: 'Map agent collaborations',
    Demo: ArchitectureGraphDemo,
  },
  {
    id: 'slack',
    number: '05',
    icon: MessageSquare,
    title: 'Slack Resolution',
    description: 'Fix incidents in your workspace',
    Demo: SlackResolutionDemo,
  },
  {
    id: 'evidence',
    number: '06',
    icon: Search,
    title: 'Evidence Correlation',
    description: 'Connect data across sources',
    Demo: EvidenceCorrelationDemo,
  },
  {
    id: 'finops',
    number: '07',
    icon: DollarSign,
    title: 'FinOps',
    description: 'Per-agent cost attribution & alerts',
    Demo: FinOpsDemo,
  },
  {
    id: 'sandbox',
    number: '08',
    icon: Shield,
    title: 'Sandbox & Prevention',
    description: 'Turn failures into regression gates',
    Demo: SandboxDemo,
  },
];

function FleetMonitoringDemo() {
  const agents = [
    { name: 'order-processor', status: 'running', tokens: '12.4K', cost: '$0.18', model: 'gpt-4o' },
    { name: 'support-bot', status: 'running', tokens: '8.2K', cost: '$0.12', model: 'claude-sonnet' },
    { name: 'data-enricher', status: 'degraded', tokens: '24.1K', cost: '$0.36', model: 'gpt-4o' },
    { name: 'fraud-detector', status: 'failed', tokens: '0', cost: '$0.00', model: 'claude-opus' },
  ];

  const statusColors = { running: 'text-secondary', degraded: 'text-orange-400', failed: 'text-red-400' };
  const statusDots = { running: 'bg-secondary', degraded: 'bg-orange-400', failed: 'bg-red-400' };

  return (
    <div className="font-mono text-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
        <span className="text-muted uppercase tracking-wider">Agent Fleet</span>
        <span className="text-muted">4 agents · 2 models</span>
      </div>
      <div className="space-y-2">
        {agents.map((agent) => (
          <div key={agent.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface/50">
            <span className={`w-2 h-2 rounded-full ${statusDots[agent.status]}`} />
            <span className="text-foreground flex-1 truncate">{agent.name}</span>
            <span className="text-muted w-16 text-right">{agent.tokens}</span>
            <span className="text-muted w-12 text-right">{agent.cost}</span>
            <span className={`w-16 text-right ${statusColors[agent.status]}`}>{agent.status}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-border flex items-center justify-between">
        <span className="text-muted">Total cost this hour</span>
        <span className="text-foreground font-medium">$0.66</span>
      </div>
    </div>
  );
}

function RCADemo() {
  const layers = [
    { num: 1, name: 'Context', status: 'pass' },
    { num: 2, name: 'Tools', status: 'pass' },
    { num: 3, name: 'Model', status: 'fail' },
    { num: 4, name: 'Orchestrator', status: 'skip' },
    { num: 5, name: 'Environment', status: 'skip' },
    { num: 6, name: 'Memory', status: 'skip' },
    { num: 7, name: 'Planning', status: 'skip' },
  ];

  return (
    <div className="font-mono text-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
        <span className="text-muted uppercase tracking-wider">RCA Trace</span>
        <span className="text-red-400">● FAILURE DETECTED</span>
      </div>
      <div className="space-y-1.5">
        {layers.map((layer) => (
          <div key={layer.num} className="flex items-center gap-3">
            <span className="text-muted/50 w-4">{layer.num}</span>
            <span className={`w-14 ${
              layer.status === 'pass' ? 'text-secondary' :
              layer.status === 'fail' ? 'text-red-400' : 'text-muted/30'
            }`}>
              {layer.status === 'pass' ? '✓ PASS' : layer.status === 'fail' ? '✗ FAIL' : '· SKIP'}
            </span>
            <span className={layer.status === 'fail' ? 'text-red-400 font-medium' : 'text-muted'}>
              {layer.name}
            </span>
            {layer.status === 'fail' && (
              <span className="text-red-400/70 ml-auto">← hallucination loop</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 p-2 rounded-lg bg-red-400/5 border border-red-400/20">
        <div className="text-red-400 mb-1">● ROOT CAUSE</div>
        <div className="text-foreground">Model layer: hallucination loop detected.</div>
        <div className="text-muted mt-1">Agent repeated same tool call 4x with identical args.</div>
      </div>
    </div>
  );
}

function StateReplayDemo() {
  return (
    <div className="font-mono text-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
        <span className="text-muted uppercase tracking-wider">State Timeline</span>
        <span className="text-secondary">● REPLAY-READY</span>
      </div>
      {/* Timeline */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="text-muted w-12">Step 1</span>
          <span className="text-foreground">fetch_orders()</span>
          <span className="text-secondary ml-auto">✓</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="text-muted w-12">Step 2</span>
          <span className="text-foreground">parse_schema()</span>
          <span className="text-secondary ml-auto">✓</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="text-muted w-12">Step 3</span>
          <span className="text-red-400">validate_output()</span>
          <span className="text-red-400 ml-auto">✗ FAILED</span>
        </div>
        <div className="my-2 border-t border-dashed border-secondary/40" />
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-muted w-12">Replay</span>
          <span className="text-violet-400">validate_output() — schema corrected</span>
          <span className="text-secondary ml-auto">✓</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="text-muted w-12">Step 4</span>
          <span className="text-foreground">submit_result()</span>
          <span className="text-secondary ml-auto">✓</span>
        </div>
      </div>
      <div className="mt-3 p-2 rounded-lg bg-secondary/5 border border-secondary/20">
        <span className="text-secondary">● RESUMED</span>
        <span className="text-muted ml-2">Agent completed with 0 data loss. 4.2s total replay time.</span>
      </div>
    </div>
  );
}

function ArchitectureGraphDemo() {
  return (
    <div className="font-mono text-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
        <span className="text-muted uppercase tracking-wider">Agent Topology</span>
        <span className="text-muted">LIVE</span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-secondary/10 border border-secondary/30 text-secondary">orchestrator</span>
          <span className="text-muted">→</span>
          <span className="px-2 py-1 rounded bg-canvas border border-border text-foreground">order-processor</span>
          <span className="text-muted">→</span>
          <span className="px-2 py-1 rounded bg-canvas border border-border text-foreground">validator</span>
        </div>
        <div className="flex items-center gap-2 ml-24">
          <span className="text-muted">↘</span>
          <span className="px-2 py-1 rounded bg-canvas border border-border text-foreground">enricher</span>
          <span className="text-muted">→</span>
          <span className="px-2 py-1 rounded bg-red-400/10 border border-red-400/30 text-red-400">fraud-check ●</span>
        </div>
        <div className="flex items-center gap-2 ml-24">
          <span className="text-muted">↘</span>
          <span className="px-2 py-1 rounded bg-canvas border border-border text-foreground">notifier</span>
        </div>
      </div>
      <div className="mt-4 p-2 rounded-lg bg-red-400/5 border border-red-400/20">
        <span className="text-red-400">● BOTTLENECK</span>
        <span className="text-muted ml-2">fraud-check blocking 3 downstream agents. Avg wait: 12s.</span>
      </div>
    </div>
  );
}

function SlackResolutionDemo() {
  return (
    <div className="font-mono text-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
        <span className="text-muted"># incidents-prod</span>
        <span className="text-muted">3 messages</span>
      </div>
      <div className="space-y-3">
        <div className="p-2 rounded-lg border-l-2 border-red-400 bg-red-400/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-red-400 font-medium">🚨 Alert</span>
            <span className="text-muted ml-auto">2:34 PM</span>
          </div>
          <span className="text-foreground">order-processor failed: schema validation error</span>
        </div>
        <div className="p-2 rounded-lg border-l-2 border-violet-400 bg-violet-400/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-violet-400 font-medium">🔍 Analysis</span>
            <span className="text-muted ml-auto">2:34 PM</span>
          </div>
          <span className="text-foreground">Root cause: API v2 schema change. Fix available.</span>
          <div className="mt-2">
            <span className="px-2 py-0.5 rounded bg-secondary/20 text-secondary border border-secondary/30">Apply Fix →</span>
          </div>
        </div>
        <div className="p-2 rounded-lg border-l-2 border-secondary bg-secondary/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-secondary font-medium">✓ Resolved</span>
            <span className="text-muted ml-auto">2:37 PM</span>
          </div>
          <span className="text-foreground">Agent resumed. MTTR: 3m 12s.</span>
        </div>
      </div>
    </div>
  );
}

function EvidenceCorrelationDemo() {
  return (
    <div className="font-mono text-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
        <span className="text-muted uppercase tracking-wider">Evidence Log</span>
        <span className="text-secondary">● CORRELATION FOUND</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-start gap-2">
          <span className="text-muted/50 w-8 shrink-0">14:32</span>
          <span className="px-1.5 py-0.5 rounded bg-violet-400/10 text-violet-400 text-[10px]">TRACE</span>
          <span className="text-foreground">API response schema changed: v1→v2</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-muted/50 w-8 shrink-0">14:32</span>
          <span className="px-1.5 py-0.5 rounded bg-orange-400/10 text-orange-400 text-[10px]">TOOL</span>
          <span className="text-foreground">validate_output() received unexpected keys</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-muted/50 w-8 shrink-0">14:33</span>
          <span className="px-1.5 py-0.5 rounded bg-red-400/10 text-red-400 text-[10px]">ERROR</span>
          <span className="text-foreground">Agent entered retry loop (4 attempts)</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-muted/50 w-8 shrink-0">14:33</span>
          <span className="px-1.5 py-0.5 rounded bg-secondary/10 text-secondary text-[10px]">MATCH</span>
          <span className="text-secondary">3 events correlated → single root cause</span>
        </div>
      </div>
      <div className="mt-3 p-2 rounded-lg bg-secondary/5 border border-secondary/20">
        <span className="text-secondary">● ROOT CAUSE FOUND</span>
        <div className="text-foreground mt-1">Upstream API deployed breaking schema change at 14:31.</div>
        <div className="text-muted mt-0.5">Confidence: 97% · 3 signals correlated</div>
      </div>
    </div>
  );
}

function FinOpsDemo() {
  const rows = [
    { name: 'Support Agent', model: 'Claude Opus 4.5', cost: '$4.80', status: 'SUCCESS', color: 'text-green-400' },
    { name: 'RCA Investigator', model: 'GPT-5.5 High', cost: '$3.10', status: 'RUNNING', color: 'text-blue-400' },
    { name: 'Policy Agent', model: 'Gemini 2.5 Pro', cost: '$0.92', status: 'FAILED', color: 'text-red-400' },
    { name: 'Tool Watcher', model: 'AWS Bedrock', cost: '$1.76', status: 'DEGRADED', color: 'text-orange-400' },
  ];

  return (
    <div className="font-mono text-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
        <span className="text-muted uppercase tracking-wider">Cost Attribution</span>
        <span className="text-foreground font-medium">$10.58 today</span>
      </div>
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface/50">
            <div className="flex-1 min-w-0">
              <div className="text-foreground truncate">{row.name}</div>
              <div className="text-muted/50 text-[10px]">{row.model}</div>
            </div>
            <span className="text-foreground font-medium">{row.cost}</span>
            <span className={`text-[10px] ${row.color}`}>{row.status}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 p-2 rounded-lg bg-orange-400/5 border border-orange-400/20">
        <span className="text-orange-400">⚠ ALERT</span>
        <span className="text-muted ml-2">Spend rate 2.3x above daily average. Spike at 2:14 PM.</span>
      </div>
    </div>
  );
}

function SandboxDemo() {
  return (
    <div className="font-mono text-xs">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
        <span className="text-muted uppercase tracking-wider">Regression Gate</span>
        <span className="text-secondary">● ACTIVE</span>
      </div>
      <div className="p-2 rounded-lg bg-red-400/5 border border-red-400/20 mb-3">
        <div className="text-red-400 text-[10px] mb-1">FAILURE CAPTURED</div>
        <div className="text-foreground">create_refund: missing field `currency`</div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="text-muted">Test generated</span>
          <span className="text-secondary ml-auto">✓</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="text-muted">Gate added to CI pipeline</span>
          <span className="text-secondary ml-auto">✓</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="text-muted">Next deploy blocked (same payload)</span>
          <span className="text-secondary ml-auto">✓</span>
        </div>
      </div>
      <div className="mt-3 p-2 rounded-lg bg-secondary/5 border border-secondary/20">
        <span className="text-secondary">● 0 repeat incidents</span>
        <span className="text-muted ml-2">Gate has blocked 3 deploys this week.</span>
      </div>
    </div>
  );
}

export function Capabilities() {
  const [active, setActive] = useState(0);
  const [userClicked, setUserClicked] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (userClicked) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % capabilities.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [userClicked]);

  const handleClick = (index) => {
    setActive(index);
    setUserClicked(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const ActiveDemo = capabilities[active].Demo;

  return (
    <section id="capabilities" className="py-24 bg-background/80">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
            Capabilities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
            Eight capabilities. One platform.
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Each targets a specific agent failure mode. None require changes to your agent code.
          </p>
        </div>

        {/* Sidebar + Panel */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-1">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              const isActive = i === active;
              return (
                <button
                  key={cap.id}
                  onClick={() => handleClick(i)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-start gap-3 ${
                    isActive
                      ? 'bg-canvas border border-border'
                      : 'border border-transparent hover:bg-canvas/50'
                  }`}
                >
                  <span className={`font-mono text-xs mt-0.5 ${isActive ? 'text-secondary' : 'text-muted/50'}`}>
                    {cap.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-secondary' : 'text-muted/50'}`} />
                      <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted'}`}>
                        {cap.title}
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 ${isActive ? 'text-muted' : 'text-muted/40'}`}>
                      {cap.description}
                    </p>
                  </div>
                  {isActive && <span className="w-1 h-8 bg-secondary rounded-full mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Demo Panel */}
          <div className="rounded-xl bg-canvas border border-border p-6 min-h-[360px] relative overflow-hidden">
            <div
              key={capabilities[active].id}
              className="animate-fadeIn"
            >
              <ActiveDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
