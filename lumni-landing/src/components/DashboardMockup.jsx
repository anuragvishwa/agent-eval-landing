import {
  BadgeCheck,
  CheckCircle2,
  CircleDollarSign,
  GitBranch,
  Route,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'

const metrics = [
  { label: 'Estimated waste', value: '$3,870', suffix: '/mo', color: 'text-[#B45309]' },
  { label: 'Workflow candidates', value: '14', suffix: 'steps', color: 'text-[#0047FF]' },
  { label: 'SLM downgrade', value: '7', suffix: 'steps', color: 'text-[#047857]' },
  { label: 'Failure root causes', value: '5', suffix: 'clusters', color: 'text-[#B91C1C]' },
]

const insights = [
  {
    icon: CircleDollarSign,
    label: 'Waste found',
    value: '$3.8k',
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  {
    icon: SearchCheck,
    label: 'RCA locked',
    value: 'schema',
    className: 'border-red-200 bg-red-50 text-red-700',
  },
  {
    icon: ShieldCheck,
    label: 'Fix queued',
    value: 'validator',
    className: 'border-blue-200 bg-blue-50 text-[#0047FF]',
  },
  {
    icon: CheckCircle2,
    label: 'Projected save',
    value: '42%',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
]

const auditFlow = [
  { icon: Sparkles, label: 'Trace', tone: 'border-zinc-200 bg-white text-zinc-600' },
  { icon: CircleDollarSign, label: 'Waste', tone: 'border-amber-200 bg-amber-50 text-amber-700' },
  { icon: SearchCheck, label: 'RCA', tone: 'border-red-200 bg-red-50 text-red-700' },
  { icon: Wrench, label: 'Fix', tone: 'border-blue-200 bg-blue-50 text-[#0047FF]' },
  { icon: CheckCircle2, label: 'Save', tone: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
]

const wasteChips = [
  ['$0.42', 'left-[13%]', 'hero-leak-delay-0'],
  ['$0.38', 'left-[39%]', 'hero-leak-delay-1'],
  ['$0.51', 'left-[64%]', 'hero-leak-delay-2'],
]

export default function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <div className="relative h-[620px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_24px_80px_rgba(9,9,11,0.12)] sm:h-auto lg:aspect-[1.15/1]">
        <div className="pointer-events-none absolute inset-x-0 top-10 h-40 hero-scan-sweep" />
        <div className="flex h-10 min-w-0 items-center justify-between border-b border-zinc-200 px-3 sm:px-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          </div>
          <div className="min-w-0 flex-1 truncate px-3 text-center font-mono text-[10px] text-zinc-500 sm:text-[11px]">
            trace_id: agt_8f3c·run_27
          </div>
          <div className="hidden font-mono text-[10px] text-zinc-500 min-[390px]:block">last 24h</div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-y divide-zinc-200 sm:grid-cols-4 sm:divide-y-0">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-lift min-w-0 p-3 sm:p-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500 sm:text-[10px] sm:tracking-widest">
                {metric.label}
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className={`font-display text-2xl font-bold tracking-tight sm:text-[1.7rem] ${metric.color}`}>
                  {metric.value}
                </span>
                <span className="font-mono text-[11px] text-zinc-500">{metric.suffix}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="relative border-b border-zinc-200 bg-zinc-50/70 p-3">
          <div className="absolute left-6 right-6 top-1/2 hidden h-px -translate-y-1/2 bg-zinc-200 sm:block" />
          <div className="absolute left-6 right-6 top-1/2 hidden h-px -translate-y-1/2 signal-flow-line sm:block" />
          <div className="relative z-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <div
                  key={insight.label}
                  className={`hero-insight hero-insight-delay-${index} min-w-0 rounded-lg border bg-white px-3 py-2 shadow-sm ${insight.className}`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="shrink-0" />
                    <span className="min-w-0 truncate font-mono text-[9px] uppercase tracking-wider">
                      {insight.label}
                    </span>
                  </div>
                  <div className="mt-1 font-display text-base font-bold tracking-tight text-zinc-950 sm:text-lg">
                    {insight.value}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="relative overflow-hidden bg-zinc-50 p-4 sm:p-5">
          <div className="pointer-events-none absolute inset-0 bg-dot opacity-35" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 hero-scan-sweep" />
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Live trace audit
            </div>
            <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#0047FF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0047FF] pulse-dot" />
              analyzing
            </div>
          </div>

          <div className="relative z-10 mt-5">
            <div className="absolute left-[7%] right-[7%] top-5 h-px bg-zinc-200" />
            <div className="absolute left-[7%] right-[7%] top-5 h-px hero-path-line" />
            <span className="hero-runner absolute left-[7%] top-[0.82rem] h-4 w-4 rounded-full border border-blue-200 bg-white shadow-[0_0_0_6px_rgba(0,71,255,0.08)]" />
            <div className="relative grid grid-cols-5 gap-2">
              {auditFlow.map((step, index) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.label}
                    className={`hero-flow-node hero-flow-delay-${index} flex min-w-0 flex-col items-center gap-1.5 rounded-lg border px-2 py-2 text-center shadow-sm ${step.tone}`}
                  >
                    <Icon size={15} />
                    <span className="font-mono text-[9px] uppercase tracking-wider">{step.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative z-10 mt-4 grid gap-3 sm:grid-cols-3">
            <div className="hero-audit-card hero-cost-node rounded-lg border border-amber-200 bg-white p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-amber-700">
                  <Sparkles size={13} />
                  frontier
                </div>
                <span className="font-mono text-[10px] text-amber-700">$3.8k</span>
              </div>
              <div className="relative mt-3 h-12 overflow-hidden rounded-md bg-amber-50">
                {wasteChips.map(([value, left, delay]) => (
                  <span
                    key={value}
                    className={`hero-leak-chip ${delay} ${left} absolute top-2 rounded-full border border-amber-200 bg-white px-2 py-0.5 font-mono text-[9px] text-amber-700`}
                  >
                    {value}
                  </span>
                ))}
                <div className="absolute bottom-2 left-3 right-3 h-1.5 rounded-full bg-white">
                  <div className="waste-meter h-1.5 w-[86%] rounded-full bg-amber-500" />
                </div>
              </div>
            </div>

            <div className="hero-audit-card hero-rca-card rounded-lg border border-red-200 bg-white p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-red-700">
                  <SearchCheck size={13} />
                  root cause
                </div>
                <span className="rounded-full bg-red-50 px-2 py-0.5 font-mono text-[9px] uppercase text-red-700">
                  schema
                </span>
              </div>
              <div className="relative mt-3 space-y-1.5 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-10 rca-scan" />
                {['prompt ok', 'tool 500', 'retry same'].map((row, index) => (
                  <div
                    key={row}
                    className={`scan-row scan-row-delay-${index} flex justify-between rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-mono text-[9px] text-zinc-600 ${index === 1 ? 'border-red-200 text-red-700' : ''}`}
                  >
                    <span>{row.split(' ')[0]}</span>
                    <span>{row.split(' ').slice(1).join(' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-audit-card hero-fix-node rounded-lg border border-emerald-200 bg-white p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-emerald-700">
                  <GitBranch size={13} />
                  workflow
                </div>
                <span className="font-mono text-[10px] text-emerald-700">−42%</span>
              </div>
              <div className="mt-3 grid gap-2">
                <div className="rounded-md border border-blue-200 bg-blue-50 px-2 py-1 font-mono text-[9px] uppercase text-[#0047FF]">
                  <Route size={12} className="mr-1 inline" />
                  slm route
                </div>
                <div className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 font-mono text-[9px] uppercase text-emerald-700">
                  <BadgeCheck size={12} className="mr-1 inline" />
                  validator
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-3 rounded-lg border border-emerald-200 bg-emerald-50/90 p-3">
            <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-emerald-700">
              <span className="flex min-w-0 items-center gap-1.5">
                <ShieldCheck size={13} className="shrink-0" />
                <span className="truncate">replay impact</span>
              </span>
              <span className="shrink-0">save $1.6k/mo</span>
            </div>
            <div className="h-2 rounded-full bg-white">
              <div className="hero-savings-meter h-2 w-[72%] rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
