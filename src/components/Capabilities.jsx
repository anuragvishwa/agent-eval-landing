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

function StaggeredRow({ children, delay }) {
  return (
    <div
      className="animate-staggerRow opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function FleetMonitoringDemo() {
  const agents = [
    { name: 'order-processor', status: 'running', tokens: '12.4K', cost: '$0.18', model: 'gpt-4o', latency: '1.2s' },
    { name: 'support-bot', status: 'running', tokens: '8.2K', cost: '$0.12', model: 'claude-sonnet', latency: '0.8s' },
    { name: 'data-enricher', status: 'degraded', tokens: '24.1K', cost: '$0.36', model: 'gpt-4o', latency: '4.7s' },
    { name: 'fraud-detector', status: 'failed', tokens: '0', cost: '$0.00', model: 'claude-opus', latency: '—' },
    { name: 'email-campaign', status: 'running', tokens: '5.1K', cost: '$0.08', model: 'gpt-4o-mini', latency: '0.4s' },
    { name: 'report-generator', status: 'running', tokens: '18.9K', cost: '$0.28', model: 'claude-sonnet', latency: '2.1s' },
  ];

  const statusColors = { running: 'text-secondary', degraded: 'text-orange-400', failed: 'text-red-400' };
  const statusDots = { running: 'bg-secondary', degraded: 'bg-orange-400', failed: 'bg-red-400' };

  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">Agent Fleet</span>
          <span className="text-muted">6 agents · 3 models · 2 providers</span>
        </div>
      </StaggeredRow>
      <StaggeredRow delay={80}>
        <div className="flex items-center gap-3 px-2 py-1 text-[10px] text-muted/50 uppercase tracking-wider">
          <span className="w-2" />
          <span className="flex-1">Agent</span>
          <span className="w-14 text-right">Tokens</span>
          <span className="w-12 text-right">Cost</span>
          <span className="w-10 text-right">Latency</span>
          <span className="w-16 text-right">Status</span>
        </div>
      </StaggeredRow>
      <div className="space-y-1">
        {agents.map((agent, i) => (
          <StaggeredRow key={agent.name} delay={140 + i * 100}>
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-surface/50">
              <span className={`w-2 h-2 rounded-full ${statusDots[agent.status]}`} />
              <div className="flex-1 min-w-0">
                <span className="text-foreground truncate block">{agent.name}</span>
                <span className="text-muted/40 text-[10px]">{agent.model}</span>
              </div>
              <span className="text-muted w-14 text-right">{agent.tokens}</span>
              <span className="text-muted w-12 text-right">{agent.cost}</span>
              <span className="text-muted w-10 text-right">{agent.latency}</span>
              <span className={`w-16 text-right ${statusColors[agent.status]}`}>{agent.status}</span>
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={800}>
        <div className="mt-3 pt-2 border-t border-border flex items-center justify-between">
          <span className="text-muted">Total cost this hour</span>
          <span className="text-foreground font-medium">$1.02</span>
        </div>
      </StaggeredRow>
      <StaggeredRow delay={900}>
        <div className="mt-2 flex items-center gap-4 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-secondary" /> 4 running</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400" /> 1 degraded</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /> 1 failed</span>
        </div>
      </StaggeredRow>
    </div>
  );
}

function RCADemo() {
  const layers = [
    { num: 1, name: 'Context', status: 'pass', detail: 'Input tokens within limit' },
    { num: 2, name: 'Tools', status: 'pass', detail: 'All tool schemas valid' },
    { num: 3, name: 'Model', status: 'fail', detail: 'Hallucination loop detected' },
    { num: 4, name: 'Orchestrator', status: 'skip', detail: '' },
    { num: 5, name: 'Environment', status: 'skip', detail: '' },
    { num: 6, name: 'Memory', status: 'skip', detail: '' },
    { num: 7, name: 'Planning', status: 'skip', detail: '' },
  ];

  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">RCA Trace</span>
          <span className="text-red-400">● FAILURE DETECTED</span>
        </div>
      </StaggeredRow>
      <StaggeredRow delay={80}>
        <div className="mb-2 px-2 py-1.5 rounded-lg bg-surface/50 text-muted text-[10px]">
          Agent: <span className="text-foreground">order-processor</span> · Run: <span className="text-foreground">#8291</span> · Duration: <span className="text-foreground">14.2s</span>
        </div>
      </StaggeredRow>
      <div className="space-y-1.5">
        {layers.map((layer, i) => (
          <StaggeredRow key={layer.num} delay={160 + i * 90}>
            <div className="flex items-center gap-3">
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
              {layer.detail && (
                <span className={`ml-auto text-[10px] ${layer.status === 'fail' ? 'text-red-400/70' : 'text-muted/40'}`}>
                  {layer.detail}
                </span>
              )}
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={850}>
        <div className="mt-3 p-3 rounded-lg bg-red-400/5 border border-red-400/20">
          <div className="text-red-400 mb-1 font-medium">● ROOT CAUSE IDENTIFIED</div>
          <div className="text-foreground">Model layer: hallucination loop detected.</div>
          <div className="text-muted mt-1">Agent repeated same tool call 4x with identical args.</div>
          <div className="mt-2 flex gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] text-secondary border border-secondary/30 hover:bg-secondary/10 cursor-pointer">Break Loop</span>
            <span className="px-2 py-0.5 rounded text-[10px] text-secondary border border-secondary/30 hover:bg-secondary/10 cursor-pointer">Inject Context</span>
          </div>
        </div>
      </StaggeredRow>
    </div>
  );
}

function StateReplayDemo() {
  const steps = [
    { label: 'Step 1', fn: 'fetch_orders()', status: 'pass', duration: '0.8s', tokens: '1.2K' },
    { label: 'Step 2', fn: 'parse_schema()', status: 'pass', duration: '0.3s', tokens: '0.4K' },
    { label: 'Step 3', fn: 'enrich_context()', status: 'pass', duration: '1.1s', tokens: '2.8K' },
    { label: 'Step 4', fn: 'validate_output()', status: 'fail', duration: '0.2s', tokens: '0.1K' },
    { label: 'Replay', fn: 'validate_output() — schema corrected', status: 'replay', duration: '0.4s', tokens: '0.3K' },
    { label: 'Step 5', fn: 'submit_result()', status: 'pass', duration: '0.6s', tokens: '0.8K' },
    { label: 'Step 6', fn: 'send_confirmation()', status: 'pass', duration: '0.2s', tokens: '0.2K' },
  ];

  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">State Timeline</span>
          <span className="text-secondary">● REPLAY-READY</span>
        </div>
      </StaggeredRow>
      <StaggeredRow delay={80}>
        <div className="mb-2 px-2 py-1.5 rounded-lg bg-surface/50 text-muted text-[10px]">
          Checkpoint: <span className="text-foreground">step_4_pre</span> · State size: <span className="text-foreground">12.4 KB</span> · Serialized: <span className="text-secondary">LangGraph</span>
        </div>
      </StaggeredRow>
      <div className="space-y-1.5">
        {steps.map((step, i) => (
          <StaggeredRow key={i} delay={150 + i * 100}>
            {step.status === 'replay' && <div className="my-1.5 border-t border-dashed border-secondary/40" />}
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${
                step.status === 'pass' ? 'bg-secondary' :
                step.status === 'fail' ? 'bg-red-400' : 'bg-violet-400 animate-pulse'
              }`} />
              <span className="text-muted w-12">{step.label}</span>
              <span className={`flex-1 ${
                step.status === 'fail' ? 'text-red-400' :
                step.status === 'replay' ? 'text-violet-400' : 'text-foreground'
              }`}>{step.fn}</span>
              <span className="text-muted/40 w-8 text-right">{step.duration}</span>
              <span className={`w-8 text-right ${
                step.status === 'fail' ? 'text-red-400' : 'text-secondary'
              }`}>{step.status === 'fail' ? '✗' : '✓'}</span>
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={950}>
        <div className="mt-3 p-3 rounded-lg bg-secondary/5 border border-secondary/20">
          <div className="flex items-center justify-between">
            <span className="text-secondary font-medium">● RESUMED</span>
            <span className="text-muted text-[10px]">Total replay: 4.2s</span>
          </div>
          <div className="text-muted mt-1">Agent completed with 0 data loss. All downstream steps executed.</div>
        </div>
      </StaggeredRow>
    </div>
  );
}

function ArchitectureGraphDemo() {
  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">Agent Topology</span>
          <span className="text-muted">LIVE</span>
        </div>
      </StaggeredRow>
      <div className="space-y-3">
        <StaggeredRow delay={150}>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-secondary/10 border border-secondary/30 text-secondary">orchestrator</span>
            <span className="text-muted">→</span>
            <span className="px-2 py-1 rounded bg-canvas border border-border text-foreground">order-processor</span>
            <span className="text-muted">→</span>
            <span className="px-2 py-1 rounded bg-canvas border border-border text-foreground">validator</span>
          </div>
        </StaggeredRow>
        <StaggeredRow delay={350}>
          <div className="flex items-center gap-2 ml-10 sm:ml-24">
            <span className="text-muted">↘</span>
            <span className="px-2 py-1 rounded bg-canvas border border-border text-foreground">enricher</span>
            <span className="text-muted">→</span>
            <span className="px-2 py-1 rounded bg-red-400/10 border border-red-400/30 text-red-400">fraud-check ●</span>
          </div>
        </StaggeredRow>
        <StaggeredRow delay={500}>
          <div className="flex items-center gap-2 ml-10 sm:ml-24">
            <span className="text-muted">↘</span>
            <span className="px-2 py-1 rounded bg-canvas border border-border text-foreground">notifier</span>
          </div>
        </StaggeredRow>
      </div>
      <StaggeredRow delay={700}>
        <div className="mt-4 p-2 rounded-lg bg-red-400/5 border border-red-400/20">
          <span className="text-red-400">● BOTTLENECK</span>
          <span className="text-muted ml-2">fraud-check blocking 3 downstream agents. Avg wait: 12s.</span>
        </div>
      </StaggeredRow>
    </div>
  );
}

function SlackResolutionDemo() {
  const messages = [
    { border: 'border-red-400', bg: 'bg-red-400/5', label: '🚨 Alert', labelColor: 'text-red-400', time: '2:34 PM', text: 'order-processor failed: schema validation error' },
    { border: 'border-violet-400', bg: 'bg-violet-400/5', label: '🔍 Analysis', labelColor: 'text-violet-400', time: '2:34 PM', text: 'Root cause: API v2 schema change. Fix available.', action: true },
    { border: 'border-secondary', bg: 'bg-secondary/5', label: '✓ Resolved', labelColor: 'text-secondary', time: '2:37 PM', text: 'Agent resumed. MTTR: 3m 12s.' },
  ];

  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted"># incidents-prod</span>
          <span className="text-muted">3 messages</span>
        </div>
      </StaggeredRow>
      <div className="space-y-3">
        {messages.map((msg, i) => (
          <StaggeredRow key={i} delay={200 + i * 250}>
            <div className={`p-2 rounded-lg border-l-2 ${msg.border} ${msg.bg}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`${msg.labelColor} font-medium`}>{msg.label}</span>
                <span className="text-muted ml-auto">{msg.time}</span>
              </div>
              <span className="text-foreground">{msg.text}</span>
              {msg.action && (
                <div className="mt-2">
                  <span className="px-2 py-0.5 rounded bg-secondary/20 text-secondary border border-secondary/30">Apply Fix →</span>
                </div>
              )}
            </div>
          </StaggeredRow>
        ))}
      </div>
    </div>
  );
}

function EvidenceCorrelationDemo() {
  const logs = [
    { time: '14:31', badge: 'DEPLOY', badgeColor: 'bg-blue-400/10 text-blue-400', text: 'api-service v2.4.1 deployed to production', source: 'GitHub Actions' },
    { time: '14:32', badge: 'TRACE', badgeColor: 'bg-violet-400/10 text-violet-400', text: 'API response schema changed: items[] → data[]', source: 'Agent Trace' },
    { time: '14:32', badge: 'TOOL', badgeColor: 'bg-orange-400/10 text-orange-400', text: 'validate_output() received unexpected keys: {data}', source: 'Tool Log' },
    { time: '14:32', badge: 'METRIC', badgeColor: 'bg-violet-400/10 text-violet-400', text: 'Error rate spiked 0.1% → 94% on order-processor', source: 'Datadog' },
    { time: '14:33', badge: 'ERROR', badgeColor: 'bg-red-400/10 text-red-400', text: 'Agent entered retry loop (4 attempts, same payload)', source: 'Agent Trace' },
    { time: '14:33', badge: 'MATCH', badgeColor: 'bg-secondary/10 text-secondary', text: '5 events correlated → single root cause', highlight: true, source: 'Lumniverse' },
  ];

  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">Evidence Log</span>
          <span className="text-secondary">● CORRELATION FOUND</span>
        </div>
      </StaggeredRow>
      <StaggeredRow delay={80}>
        <div className="mb-2 px-2 py-1.5 rounded-lg bg-surface/50 text-muted text-[10px]">
          Sources: <span className="text-foreground">Agent Trace, GitHub Actions, Datadog, Tool Log</span> · Window: <span className="text-foreground">2 min</span>
        </div>
      </StaggeredRow>
      <div className="space-y-1.5">
        {logs.map((log, i) => (
          <StaggeredRow key={i} delay={150 + i * 120}>
            <div className="flex items-start gap-2">
              <span className="text-muted/50 w-10 shrink-0">{log.time}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] shrink-0 ${log.badgeColor}`}>{log.badge}</span>
              <span className={`flex-1 ${log.highlight ? 'text-secondary' : 'text-foreground'}`}>{log.text}</span>
              <span className="text-muted/30 text-[9px] shrink-0">{log.source}</span>
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={900}>
        <div className="mt-3 p-3 rounded-lg bg-secondary/5 border border-secondary/20">
          <div className="flex items-center justify-between">
            <span className="text-secondary font-medium">● ROOT CAUSE FOUND</span>
            <span className="text-secondary text-[10px]">97% confidence</span>
          </div>
          <div className="text-foreground mt-1">Upstream API deployed breaking schema change (items[] → data[]) at 14:31.</div>
          <div className="text-muted mt-1">5 signals correlated across 4 sources within 2-minute window.</div>
        </div>
      </StaggeredRow>
    </div>
  );
}

function FinOpsDemo() {
  const rows = [
    { name: 'Support Agent', model: 'Claude Opus 4.5', tokens: '1.2M', cost: '$4.80', trend: '↑ 12%', status: 'SUCCESS', color: 'text-green-400' },
    { name: 'RCA Investigator', model: 'GPT-5.5 High', tokens: '860K', cost: '$3.10', trend: '→ 0%', status: 'RUNNING', color: 'text-blue-400' },
    { name: 'Policy Agent', model: 'Gemini 2.5 Pro', tokens: '310K', cost: '$0.92', trend: '↓ 8%', status: 'FAILED', color: 'text-red-400' },
    { name: 'Tool Watcher', model: 'AWS Bedrock', tokens: '540K', cost: '$1.76', trend: '↑ 140%', status: 'DEGRADED', color: 'text-orange-400' },
  ];

  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">Cost Attribution</span>
          <span className="text-foreground font-medium">$10.58 today</span>
        </div>
      </StaggeredRow>
      <StaggeredRow delay={80}>
        <div className="mb-2 flex items-center gap-4 text-[10px] text-muted/50">
          <span>Budget: <span className="text-foreground">$15.00/day</span></span>
          <span>Used: <span className="text-orange-400">71%</span></span>
          <span>Projected: <span className="text-red-400">$14.80</span></span>
        </div>
      </StaggeredRow>
      <div className="space-y-1.5">
        {rows.map((row, i) => (
          <StaggeredRow key={row.name} delay={150 + i * 110}>
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-surface/50">
              <div className="flex-1 min-w-0">
                <div className="text-foreground truncate">{row.name}</div>
                <div className="text-muted/40 text-[10px]">{row.model} · {row.tokens} tokens</div>
              </div>
              <span className={`text-[10px] w-12 text-right ${row.trend.includes('↑') ? 'text-orange-400' : 'text-muted/50'}`}>{row.trend}</span>
              <span className="text-foreground font-medium w-12 text-right">{row.cost}</span>
              <span className={`text-[10px] w-16 text-right ${row.color}`}>{row.status}</span>
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={650}>
        <div className="mt-3 p-2 rounded-lg bg-orange-400/5 border border-orange-400/20">
          <div className="flex items-center justify-between">
            <span className="text-orange-400">⚠ COST ALERT</span>
            <span className="text-muted text-[10px]">2:14 PM</span>
          </div>
          <div className="text-muted mt-1">Tool Watcher spend rate 2.3x above daily average. Investigate token spike.</div>
        </div>
      </StaggeredRow>
      <StaggeredRow delay={750}>
        <div className="mt-2 flex items-center justify-between text-[10px] text-muted/50">
          <span>Providers: OpenAI (58%), Anthropic (32%), Google (10%)</span>
        </div>
      </StaggeredRow>
    </div>
  );
}

function SandboxDemo() {
  const steps = [
    { text: 'Test generated from failure trace', detail: 'Asserts: payload must include currency field' },
    { text: 'Sandbox replay passed with fix', detail: 'Validated against 12 historical inputs' },
    { text: 'Gate added to CI pipeline', detail: 'Blocks: refund-agent deploys without currency' },
    { text: 'Next deploy blocked (same payload)', detail: 'Deploy #482 by @sarah — Jun 10 at 3:12 PM' },
  ];

  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">Regression Gate</span>
          <span className="text-secondary">● ACTIVE</span>
        </div>
      </StaggeredRow>
      <StaggeredRow delay={100}>
        <div className="mb-2 px-2 py-1.5 rounded-lg bg-surface/50 text-muted text-[10px]">
          Source: <span className="text-foreground">run_8291</span> · Workflow: <span className="text-foreground">Refund agent</span> · Type: <span className="text-foreground">Tool argument validation</span>
        </div>
      </StaggeredRow>
      <StaggeredRow delay={200}>
        <div className="p-2 rounded-lg bg-red-400/5 border border-red-400/20 mb-3">
          <div className="text-red-400 text-[10px] mb-1">FAILURE CAPTURED</div>
          <div className="text-foreground">create_refund failed because payload was missing required field `currency`</div>
          <div className="text-muted/50 mt-1 text-[10px]">Block future releases where the agent sends invalid refund payloads</div>
        </div>
      </StaggeredRow>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <StaggeredRow key={i} delay={350 + i * 120}>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary mt-1" />
              <div className="flex-1">
                <span className="text-foreground">{step.text}</span>
                <span className="text-muted/40 text-[10px] block">{step.detail}</span>
              </div>
              <span className="text-secondary">✓</span>
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={900}>
        <div className="mt-3 p-2 rounded-lg bg-secondary/5 border border-secondary/20">
          <div className="flex items-center justify-between">
            <span className="text-secondary font-medium">● 0 repeat incidents</span>
            <span className="text-muted text-[10px]">3 deploys blocked this week</span>
          </div>
        </div>
      </StaggeredRow>
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
    <section id="capabilities" className="py-16 sm:py-24 bg-background/80">
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
        <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-stretch">
          {/* Sidebar */}
          <div className="space-y-1">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              const isActive = i === active;
              return (
                <button
                  key={cap.id}
                  onClick={() => handleClick(i)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex items-start gap-3 ${
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
                  {isActive && <span className="w-1 h-6 bg-secondary rounded-full mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Demo Panel */}
          <div className="rounded-xl bg-canvas border border-border p-4 sm:p-6 relative overflow-hidden flex flex-col justify-center">
            <div
              key={capabilities[active].id}
              className="animate-fadeIn overflow-x-auto"
            >
              <div className="min-w-[300px]">
                <ActiveDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
