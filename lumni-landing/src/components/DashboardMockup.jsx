import { Circle, RotateCcw, Sparkles, UserRound, Wrench } from 'lucide-react'

const metrics = [
  { label: 'Estimated waste', value: '$3,870', suffix: '/mo', color: 'text-[#B45309]' },
  { label: 'Workflow candidates', value: '14', suffix: 'steps', color: 'text-[#0047FF]' },
  { label: 'SLM downgrade', value: '7', suffix: 'steps', color: 'text-[#047857]' },
  { label: 'Failure root causes', value: '5', suffix: 'clusters', color: 'text-[#B91C1C]' },
]

const steps = [
  {
    icon: UserRound,
    title: 'User request',
    detail: 'POST /agent/run',
  },
  {
    icon: Sparkles,
    title: 'LLM reasoning · gpt-frontier',
    detail: '1,840 tokens · 4.2s',
    tag: 'High cost',
    tagClass: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    icon: Wrench,
    title: 'Tool call · search_orders',
    detail: 'schema mismatch · 502',
    tag: 'RCA available',
    tagClass: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    icon: RotateCcw,
    title: 'Retry loop detected',
    detail: '3 retries · same payload',
    tag: 'Waste',
    tagClass: 'bg-zinc-100 text-zinc-600 border-zinc-200',
  },
  {
    icon: Circle,
    title: 'Suggested fix',
    detail: 'Replace step with deterministic workflow',
    tag: 'Add validation',
    tagClass: 'bg-blue-50 text-[#0047FF] border-blue-200',
  },
]

export default function DashboardMockup() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_24px_80px_rgba(9,9,11,0.12)]">
        <div className="flex h-10 items-center justify-between border-b border-zinc-200 px-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          </div>
          <div className="font-mono text-[11px] text-zinc-500">trace_id: agt_8f3c·run_27</div>
          <div className="font-mono text-[10px] text-zinc-500">last 24h</div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-y divide-zinc-200 sm:grid-cols-4 sm:divide-y-0">
          {metrics.map((metric) => (
            <div key={metric.label} className="p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                {metric.label}
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className={`font-display text-3xl font-bold tracking-tight ${metric.color}`}>
                  {metric.value}
                </span>
                <span className="font-mono text-[11px] text-zinc-500">{metric.suffix}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              Trace timeline · run_27
            </div>
            <div className="font-mono text-[10px] text-zinc-500">5 steps · 8.4s</div>
          </div>
          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={step.title}
                  className="timeline-step grid grid-cols-[28px_1fr_auto] items-start gap-3 rounded-lg px-2 py-1.5 -mx-2"
                >
                  <div className="relative flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-500">
                    <Icon size={14} />
                    {index < steps.length - 1 && (
                      <span className="absolute left-1/2 top-7 h-3.5 w-px -translate-x-1/2 bg-zinc-200" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-zinc-400">0{index + 1}</span>
                      <span className="text-sm font-semibold text-zinc-950">{step.title}</span>
                    </div>
                    <div className="ml-7 mt-0.5 font-mono text-[11px] text-zinc-500">{step.detail}</div>
                  </div>
                  {step.tag && (
                    <div
                      className={`mt-0.5 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase ${step.tagClass}`}
                    >
                      {step.tag}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
