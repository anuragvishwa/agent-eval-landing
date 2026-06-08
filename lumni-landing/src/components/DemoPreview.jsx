import { GitBranch, Route, ShieldAlert, TrendingUp } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

function Panel({ icon: Icon, label, title, body, children }) {
  return (
    <div className="motion-card reveal-on-scroll relative min-w-0 overflow-hidden bg-white p-5 sm:p-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0047FF]/35 to-transparent" />
      <div className="mb-5 flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-700">
          <Icon size={16} />
        </div>
        <div className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          {label}
        </div>
      </div>
      <h3 className="font-display text-lg font-bold tracking-[-0.025em] text-zinc-950 sm:text-xl">
        {title}
      </h3>
      {body && <p className="mt-2 text-sm leading-relaxed text-zinc-600">{body}</p>}
      <div className="mt-6">{children}</div>
    </div>
  )
}

const bars = [
  ['gpt-frontier', '$2,140', 'w-[82%]', 'bg-[#0047FF]'],
  ['gpt-slm', '$612', 'w-[28%]', 'bg-zinc-950'],
  ['retries · failed runs', '$1,118', 'w-[55%]', 'bg-[#B45309]'],
]

const candidates = [
  ['01', 'Classify support intent', 'P=0.97'],
  ['02', 'Look up order status', 'P=1.00'],
  ['03', 'Format refund response', 'P=0.94'],
]

const routes = [
  ['gpt-frontier → gpt-slm', '4 steps'],
  ['gpt-frontier → rule-based', '6 steps'],
  ['gpt-frontier → human approval', '2 steps'],
]

export default function DemoPreview() {
  return (
    <section id="demo-preview" className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Product preview"
          title="One dashboard for agent cost, waste, and root cause."
          description="See where every agent run spends money, where it fails, and which steps should become deterministic workflows or cheaper models."
        />
        <div className="mt-14 grid overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 md:grid-cols-2">
          <Panel
            icon={TrendingUp}
            label="Panel · Agent FinOps"
            title="Cost per run, model, and failure type"
            body="Track failed-run cost, retry waste, model spend and projected monthly spend."
          >
            <div className="space-y-4">
              {bars.map(([name, value, width, color]) => (
                <div key={name}>
                  <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[12px] text-zinc-700">
                    <span className="min-w-0 truncate">{name}</span>
                    <span>{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-100">
                    <div className={`meter-fill h-2 rounded-full ${width} ${color}`} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel
            icon={GitBranch}
            label="Panel · Workflow candidates"
            title="Predictable steps → deterministic workflows"
            body=""
          >
            <div className="space-y-3">
              {candidates.map(([number, name, score]) => (
                <div
                  key={name}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="font-mono text-[10px] text-zinc-400">{number}</span>
                    <span className="min-w-0 truncate text-sm text-zinc-700">{name}</span>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 font-mono text-[10px] text-[#0047FF]">
                    {score}
                  </span>
                </div>
              ))}
              <div className="relative mt-5 flex flex-wrap items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4 sm:justify-between">
                <span className="absolute left-7 right-7 top-1/2 hidden h-px -translate-y-1/2 bg-zinc-200 sm:block" />
                <span className="absolute left-7 right-7 top-1/2 hidden h-px -translate-y-1/2 trace-flow sm:block" />
                {['trace', 'classify', 'workflow'].map((step, index) => (
                  <span
                    key={step}
                    className={`relative z-10 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase ${
                      index === 1
                        ? 'border-blue-200 bg-blue-50 text-[#0047FF]'
                        : 'border-zinc-200 bg-white text-zinc-500'
                    }`}
                  >
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </Panel>
          <Panel
            icon={Route}
            label="Panel · Model routing"
            title="Right model for the right step"
            body=""
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {routes.map(([name, steps]) => (
                <div key={name} className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <div className="font-mono text-[11px] text-zinc-600">{name}</div>
                  <div className="mt-5 font-display text-2xl font-bold tracking-tight text-zinc-950">
                    {steps.split(' ')[0]}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    {steps.split(' ')[1]}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-3">
              <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                <span>routing confidence</span>
                <span>91%</span>
              </div>
              <div className="h-2 rounded-full bg-zinc-100">
                <div className="meter-fill h-2 w-[91%] rounded-full bg-[#0047FF]" />
              </div>
            </div>
          </Panel>
          <Panel
            icon={ShieldAlert}
            label="Panel · Root cause analysis"
            title="Why did this agent run actually fail?"
            body=""
          >
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-zinc-500">incident_42 · run_27</span>
                <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 font-mono text-[9px] uppercase text-red-700">
                  Tool failure
                </span>
              </div>
              <p className="mt-4 font-mono text-[12px] leading-relaxed text-zinc-700">
                root_cause: search_orders received malformed JSON from upstream LLM; retry loop
                without validation.
              </p>
              <div className="mt-4 rounded-md bg-white px-3 py-2 font-mono text-[11px] text-[#0047FF]">
                fix · insert schema validator before tool call
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  )
}
