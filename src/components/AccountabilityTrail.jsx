import { useState, useEffect, useRef } from "react";
import {
  Target,
  Activity,
  CheckCircle2,
  FileSearch,
  AlertTriangle,
  Coins,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

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

/* 01 — Intent */
function IntentDemo() {
  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">Task Spec</span>
          <span className="text-muted">run #8291</span>
        </div>
      </StaggeredRow>
      <StaggeredRow delay={100}>
        <div className="p-3 rounded-lg bg-surface/50 mb-3">
          <div className="text-muted/50 text-[10px] mb-1">USER REQUEST</div>
          <div className="text-foreground">"Refund order #4471 and email the customer a confirmation."</div>
        </div>
      </StaggeredRow>
      <div className="space-y-1.5">
        {[
          "Issue refund for order #4471",
          "Send confirmation email to customer",
          "Log the refund in billing system",
        ].map((c, i) => (
          <StaggeredRow key={i} delay={250 + i * 110}>
            <div className="flex items-center gap-2">
              <span className="text-secondary">◇</span>
              <span className="text-foreground">{c}</span>
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={650}>
        <div className="mt-3 p-2 rounded-lg bg-secondary/5 border border-secondary/20 text-muted">
          Intent parsed into <span className="text-secondary">3 acceptance criteria</span>.
        </div>
      </StaggeredRow>
    </div>
  );
}

/* 02 — Actions */
function ActionsDemo() {
  const actions = [
    { badge: "TOOL", color: "bg-violet-400/10 text-violet-400", text: "create_refund(order=4471, amount=$89.00)" },
    { badge: "API", color: "bg-blue-400/10 text-blue-400", text: "POST stripe.com/v1/refunds → 200" },
    { badge: "DB", color: "bg-orange-400/10 text-orange-400", text: "UPDATE orders SET status='refunded'" },
    { badge: "TOOL", color: "bg-violet-400/10 text-violet-400", text: "send_email(to=customer, tpl=refund)" },
    { badge: "API", color: "bg-blue-400/10 text-blue-400", text: "POST sendgrid.com/v3/mail → 202" },
  ];
  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">Action Log</span>
          <span className="text-muted">5 calls · 2 systems</span>
        </div>
      </StaggeredRow>
      <div className="space-y-1.5">
        {actions.map((a, i) => (
          <StaggeredRow key={i} delay={100 + i * 120}>
            <div className="flex items-start gap-2">
              <span className="text-muted/40 w-4 shrink-0">{i + 1}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] shrink-0 ${a.color}`}>{a.badge}</span>
              <span className="text-foreground flex-1">{a.text}</span>
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={750}>
        <div className="mt-3 pt-2 border-t border-border flex items-center gap-4 text-[10px] text-muted/60">
          <span>Stripe · SendGrid</span>
          <span>orders table</span>
          <span className="text-secondary ml-auto">all writes captured</span>
        </div>
      </StaggeredRow>
    </div>
  );
}

/* 03 — Outcome */
function OutcomeDemo() {
  const checks = [
    { c: "Refund issued for order #4471", ok: true },
    { c: "Confirmation email delivered", ok: true },
    { c: "Refund logged in billing", ok: true },
  ];
  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">Outcome Check</span>
          <span className="text-secondary">● GOAL MET</span>
        </div>
      </StaggeredRow>
      <div className="space-y-1.5">
        {checks.map((ch, i) => (
          <StaggeredRow key={i} delay={120 + i * 150}>
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-surface/40">
              <span className="text-secondary">✓</span>
              <span className="text-foreground flex-1">{ch.c}</span>
              <span className="text-secondary text-[10px]">PASS</span>
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={650}>
        <div className="mt-3 p-3 rounded-lg bg-secondary/5 border border-secondary/20">
          <div className="text-secondary font-medium">● 3 / 3 acceptance criteria satisfied</div>
          <div className="text-muted mt-1">The requested outcome actually happened — verified, not assumed.</div>
        </div>
      </StaggeredRow>
    </div>
  );
}

/* 04 — Evidence */
function EvidenceDemo() {
  const items = [
    { badge: "TEST", color: "bg-secondary/10 text-secondary", text: "refund_flow_test — 4 passed", source: "CI" },
    { badge: "DIFF", color: "bg-blue-400/10 text-blue-400", text: "orders.status: pending → refunded", source: "DB check" },
    { badge: "TRACE", color: "bg-violet-400/10 text-violet-400", text: "stripe refund re_1P9x… confirmed", source: "API read" },
    { badge: "LOG", color: "bg-orange-400/10 text-orange-400", text: "email 250 OK — msg_88a2", source: "SendGrid" },
  ];
  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">Evidence</span>
          <span className="text-secondary">● VERIFIED</span>
        </div>
      </StaggeredRow>
      <div className="space-y-1.5">
        {items.map((it, i) => (
          <StaggeredRow key={i} delay={120 + i * 130}>
            <div className="flex items-start gap-2">
              <span className={`px-1.5 py-0.5 rounded text-[10px] shrink-0 ${it.color}`}>{it.badge}</span>
              <span className="text-foreground flex-1">{it.text}</span>
              <span className="text-muted/30 text-[9px] shrink-0">{it.source}</span>
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={700}>
        <div className="mt-3 p-2 rounded-lg bg-secondary/5 border border-secondary/20 text-muted">
          4 independent artifacts corroborate the outcome. <span className="text-secondary">Nothing self-reported.</span>
        </div>
      </StaggeredRow>
    </div>
  );
}

/* 05 — Risk */
function RiskDemo() {
  const rows = [
    { name: "orders (table)", impact: "write", level: "med", color: "text-orange-400" },
    { name: "billing-service", impact: "downstream", level: "low", color: "text-secondary" },
    { name: "customer email", impact: "external send", level: "med", color: "text-orange-400" },
    { name: "stripe balance", impact: "irreversible", level: "high", color: "text-red-400" },
  ];
  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">Blast Radius</span>
          <span className="text-orange-400">⚠ 1 irreversible</span>
        </div>
      </StaggeredRow>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <StaggeredRow key={i} delay={120 + i * 130}>
            <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-surface/50">
              <span className="text-foreground flex-1">{r.name}</span>
              <span className="text-muted/50 text-[10px] w-24 text-right">{r.impact}</span>
              <span className={`w-12 text-right uppercase ${r.color}`}>{r.level}</span>
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={650}>
        <div className="mt-3 p-2 rounded-lg bg-red-400/5 border border-red-400/20 text-muted">
          <span className="text-red-400">stripe balance</span> touched — flagged for human review before repeat runs.
        </div>
      </StaggeredRow>
    </div>
  );
}

/* 06 — Cost */
function CostDemo() {
  const rows = [
    { label: "Input tokens", value: "18.4K" },
    { label: "Output tokens", value: "3.1K" },
    { label: "Tool calls", value: "5" },
    { label: "Retries", value: "1", warn: true },
    { label: "Wasted loops", value: "0" },
  ];
  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">Cost & Efficiency</span>
          <span className="text-foreground font-medium">$0.14</span>
        </div>
      </StaggeredRow>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <StaggeredRow key={i} delay={100 + i * 110}>
            <div className="flex items-center gap-3 px-2 py-1 rounded-lg">
              <span className="text-muted flex-1">{r.label}</span>
              <span className={`text-right ${r.warn ? "text-orange-400" : "text-foreground"}`}>{r.value}</span>
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={700}>
        <div className="mt-3 p-2 rounded-lg bg-surface/50 flex items-center justify-between">
          <span className="text-muted">Efficiency</span>
          <span className="text-secondary">96% — no wasted work</span>
        </div>
      </StaggeredRow>
      <StaggeredRow delay={820}>
        <div className="mt-2 p-2 rounded-lg bg-orange-400/5 border border-orange-400/20 text-muted">
          <span className="text-orange-400">1 retry</span> on the email step (transient 429) — resolved automatically.
        </div>
      </StaggeredRow>
    </div>
  );
}

/* 07 — Replay */
function ReplayDemo() {
  const steps = [
    { fn: "load_checkpoint(run_8291)", ok: true },
    { fn: "restore_state — 12.4 KB", ok: true },
    { fn: "replay create_refund()", ok: true },
    { fn: "replay send_email()", ok: true },
  ];
  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">Replay</span>
          <span className="text-secondary">● DETERMINISTIC</span>
        </div>
      </StaggeredRow>
      <StaggeredRow delay={100}>
        <div className="mb-2 px-2 py-1.5 rounded-lg bg-surface/50 text-muted text-[10px]">
          $ lumni replay <span className="text-foreground">run_8291</span> --seed <span className="text-foreground">0x4471</span>
        </div>
      </StaggeredRow>
      <div className="space-y-1.5">
        {steps.map((s, i) => (
          <StaggeredRow key={i} delay={220 + i * 130}>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-foreground flex-1">{s.fn}</span>
              <span className="text-secondary">✓</span>
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={800}>
        <div className="mt-3 p-2 rounded-lg bg-secondary/5 border border-secondary/20 text-muted">
          Reproduced byte-for-byte from the saved checkpoint. <span className="text-secondary">Any run is replayable.</span>
        </div>
      </StaggeredRow>
    </div>
  );
}

/* 08 — Regression */
function RegressionDemo() {
  const gates = [
    "assert refund payload includes `currency`",
    "assert confirmation email sent on refund",
    "assert order status = 'refunded' after run",
  ];
  return (
    <div className="font-mono text-xs">
      <StaggeredRow delay={0}>
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="text-muted uppercase tracking-wider">Regression Gate</span>
          <span className="text-secondary">● ARMED</span>
        </div>
      </StaggeredRow>
      <StaggeredRow delay={100}>
        <div className="mb-2 px-2 py-1.5 rounded-lg bg-surface/50 text-muted text-[10px]">
          Generated from <span className="text-foreground">run_8291</span> · added to <span className="text-foreground">CI pipeline</span>
        </div>
      </StaggeredRow>
      <div className="space-y-2">
        {gates.map((g, i) => (
          <StaggeredRow key={i} delay={220 + i * 140}>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary mt-1" />
              <span className="text-foreground flex-1">{g}</span>
              <span className="text-secondary">✓</span>
            </div>
          </StaggeredRow>
        ))}
      </div>
      <StaggeredRow delay={750}>
        <div className="mt-3 p-2 rounded-lg bg-secondary/5 border border-secondary/20">
          <div className="flex items-center justify-between">
            <span className="text-secondary font-medium">● 0 repeat incidents</span>
            <span className="text-muted text-[10px]">runs future deploys automatically</span>
          </div>
        </div>
      </StaggeredRow>
    </div>
  );
}

const steps = [
  { id: "intent", number: "01", icon: Target, title: "Intent", description: "What the agent was asked to do", Demo: IntentDemo },
  { id: "actions", number: "02", icon: Activity, title: "Actions", description: "Every file, tool, and API it touched", Demo: ActionsDemo },
  { id: "outcome", number: "03", icon: CheckCircle2, title: "Outcome", description: "Whether it actually happened", Demo: OutcomeDemo },
  { id: "evidence", number: "04", icon: FileSearch, title: "Evidence", description: "Proof from logs, tests, and traces", Demo: EvidenceDemo },
  { id: "risk", number: "05", icon: AlertTriangle, title: "Risk", description: "What changed that could break", Demo: RiskDemo },
  { id: "cost", number: "06", icon: Coins, title: "Cost", description: "Tokens, retries, and wasted loops", Demo: CostDemo },
  { id: "replay", number: "07", icon: RotateCcw, title: "Replay", description: "Reproduce any run or failure", Demo: ReplayDemo },
  { id: "regression", number: "08", icon: ShieldCheck, title: "Regression", description: "Checks enforced next time", Demo: RegressionDemo },
];

export function AccountabilityTrail() {
  const [active, setActive] = useState(0);
  const [userClicked, setUserClicked] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (userClicked) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [userClicked]);

  const handleClick = (index) => {
    setActive(index);
    setUserClicked(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const ActiveDemo = steps[active].Demo;

  return (
    <section id="accountability" className="py-16 sm:py-24 bg-background/80">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
            The Audit Trail
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
            Every agent run, accountable.
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Eight questions we answer for every run — so you get proof, not vibes.
          </p>
        </div>

        {/* Sidebar + Panel */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-start">
          {/* Sidebar */}
          <div className="space-y-1">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === active;
              return (
                <button
                  key={step.id}
                  onClick={() => handleClick(i)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex items-start gap-3 ${
                    isActive
                      ? "bg-canvas border border-border"
                      : "border border-transparent hover:bg-canvas/50"
                  }`}
                >
                  <span className={`font-mono text-xs mt-0.5 ${isActive ? "text-secondary" : "text-muted/50"}`}>
                    {step.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isActive ? "text-secondary" : "text-muted/50"}`} />
                      <span className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted"}`}>
                        {step.title}
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 ${isActive ? "text-muted" : "text-muted/40"}`}>
                      {step.description}
                    </p>
                  </div>
                  {isActive && <span className="w-1 h-6 bg-secondary rounded-full mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Demo Panel */}
          <div className="rounded-xl bg-canvas border border-border p-4 sm:p-6 relative overflow-hidden min-h-[360px]">
            <div key={steps[active].id} className="animate-fadeIn overflow-x-auto">
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
