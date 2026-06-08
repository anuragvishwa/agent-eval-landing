import {
  AlertTriangle,
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

function MetricPill({ children, className = '' }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest ${className}`}
    >
      {children}
    </span>
  )
}

function SignalNode({ icon: Icon, label, tone = 'default', className = '' }) {
  const isPositioned = /\b(absolute|fixed|sticky)\b/.test(className)
  const tones = {
    default: 'border-zinc-200 bg-white text-zinc-600',
    blue: 'border-blue-200 bg-blue-50 text-[#0047FF]',
    amber: 'border-amber-200 bg-amber-50 text-amber-700',
    red: 'border-red-200 bg-red-50 text-red-700',
    green: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  }

  return (
    <div
      className={`${isPositioned ? 'z-10' : 'relative z-10'} flex min-w-0 items-center gap-2 rounded-lg border px-3 py-2 shadow-sm ${tones[tone]} ${className}`}
    >
      <Icon size={14} className="shrink-0" />
      <span className="min-w-0 truncate font-mono text-[10px] uppercase tracking-wider">{label}</span>
    </div>
  )
}

export function WasteFlow({ compact = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 ${compact ? 'min-h-[128px] p-3' : 'min-h-[156px] p-4'}`}
      aria-hidden="true"
    >
      <div className="absolute left-4 right-4 top-10 h-px bg-zinc-200" />
      <div className="absolute left-4 right-4 top-10 h-px signal-flow-line waste-line" />

      <span className="cost-chip cost-chip-delay-0 left-[7%] top-4">tokens</span>
      <span className="cost-chip cost-chip-delay-1 left-[23%] top-4">route</span>
      <span className="cost-chip cost-chip-delay-2 left-[39%] top-4">extract</span>
      <span className="cost-chip cost-chip-delay-3 left-[55%] top-4">retry</span>

      <div className="absolute right-4 top-5 z-10 rounded-lg border border-amber-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-amber-700">
          <Sparkles size={14} />
          frontier
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-amber-100">
          <div className="waste-meter h-1.5 w-[86%] rounded-full bg-amber-500" />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
        {['$0.42', '$0.38', '$0.51'].map((value, index) => (
          <div
            key={value}
            className={`cost-leak cost-leak-delay-${index} rounded-md border border-amber-200 bg-amber-50 px-2 py-1.5 text-center font-mono text-[10px] text-amber-700`}
          >
            {value}
          </div>
        ))}
      </div>

      {!compact && (
        <MetricPill className="absolute bottom-4 right-4 border-amber-200 bg-white text-amber-700">
          waste
        </MetricPill>
      )}
    </div>
  )
}

export function RcaFlow({ compact = false }) {
  const rows = [
    ['01', 'prompt', 'ok'],
    ['02', 'tool_call', '500'],
    ['03', 'retry', 'same payload'],
    ['04', 'validator', 'missing'],
  ]

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 ${compact ? 'min-h-[128px] p-3' : 'min-h-[156px] p-4'}`}
      aria-hidden="true"
    >
      <div className="absolute inset-x-3 top-0 h-16 rca-scan" />
      <div className="grid gap-2">
        {rows.map(([number, label, status], index) => (
          <div
            key={label}
            className={`scan-row scan-row-delay-${index} flex items-center justify-between gap-3 rounded-md border bg-white px-3 py-2 ${
              index === 1 ? 'border-red-200' : 'border-zinc-200'
            }`}
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="font-mono text-[9px] text-zinc-400">{number}</span>
              <span className="min-w-0 truncate font-mono text-[10px] text-zinc-700">{label}</span>
            </div>
            <span
              className={`font-mono text-[9px] uppercase ${
                index === 1 ? 'text-red-700' : 'text-zinc-500'
              }`}
            >
              {status}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700 shadow-sm rca-cause">
        <AlertTriangle size={14} />
        <span className="font-mono text-[10px] uppercase tracking-wider">root cause</span>
      </div>
    </div>
  )
}

export function SavingsFlow({ compact = false }) {
  const nodes = [
    [GitBranch, 'workflow', 'blue'],
    [Route, 'SLM', 'green'],
    [ShieldCheck, 'guardrail', 'blue'],
  ]

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 ${compact ? 'min-h-[164px] p-3' : 'min-h-[190px] p-4'}`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between gap-3">
        <SignalNode icon={Sparkles} label="frontier" tone="amber" className="cost-compress" />
        <div className="relative hidden h-px flex-1 bg-zinc-200 sm:block">
          <span className="absolute inset-y-0 left-0 w-full signal-flow-line savings-line" />
        </div>
        <SignalNode icon={CheckCircle2} label="saved" tone="green" />
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {nodes.map(([Icon, label, tone], index) => (
          <SignalNode
            key={label}
            icon={Icon}
            label={label}
            tone={tone}
            className={`fix-reveal fix-reveal-delay-${index}`}
          />
        ))}
      </div>

      <div className={`${compact ? 'mt-3' : 'mt-5'} rounded-lg border border-emerald-200 bg-white p-3`}>
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          <span>savings</span>
          <span className="text-emerald-700">42%</span>
        </div>
        <div className="h-2 rounded-full bg-zinc-100">
          <div className="savings-meter h-2 w-[72%] rounded-full bg-emerald-500" />
        </div>
      </div>
    </div>
  )
}

export function FixLoop({ compact = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 ${compact ? 'min-h-[128px] p-3' : 'min-h-[156px] p-4'}`}
      aria-hidden="true"
    >
      <div className="absolute left-8 top-9 h-16 w-16 rounded-full border border-dashed border-red-200 retry-ring" />
      <SignalNode icon={Wrench} label="tool" tone="red" className="absolute left-4 top-4" />
      <SignalNode icon={AlertTriangle} label="retry" tone="amber" className="absolute left-24 top-10" />

      <div className="absolute left-4 right-4 bottom-5 grid grid-cols-3 gap-2">
        {[
          [BadgeCheck, compact ? 'ok' : 'validate', 'blue'],
          [GitBranch, compact ? 'wf' : 'workflow', 'blue'],
          [CheckCircle2, compact ? 'fix' : 'fixed', 'green'],
        ].map(([Icon, label, tone], index) => (
          <SignalNode
            key={label}
            icon={Icon}
            label={label}
            tone={tone}
            className={`fix-reveal fix-reveal-delay-${index}`}
          />
        ))}
      </div>

      <div className="absolute bottom-[4.85rem] left-[42%] right-7 h-px bg-zinc-200" />
      <div className="absolute bottom-[4.85rem] left-[42%] right-7 h-px signal-flow-line" />
    </div>
  )
}

export function AuditPipeline() {
  const steps = [
    [SearchCheck, 'trace', 'default'],
    [CircleDollarSign, 'waste', 'amber'],
    [AlertTriangle, 'cause', 'red'],
    [GitBranch, 'fix', 'blue'],
    [CheckCircle2, 'save', 'green'],
  ]

  return (
    <div className="relative mt-9 overflow-hidden rounded-lg border border-zinc-200 bg-white p-4" aria-hidden="true">
      <div className="absolute left-7 right-7 top-1/2 hidden h-px -translate-y-1/2 bg-zinc-200 sm:block" />
      <div className="absolute left-7 right-7 top-1/2 hidden h-px -translate-y-1/2 signal-flow-line sm:block" />
      <div className="relative z-10 grid gap-3 sm:grid-cols-5">
        {steps.map(([Icon, label, tone], index) => (
          <SignalNode
            key={label}
            icon={Icon}
            label={label}
            tone={tone}
            className={`pipeline-node pipeline-node-delay-${index}`}
          />
        ))}
      </div>
    </div>
  )
}
