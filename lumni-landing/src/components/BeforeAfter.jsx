import { Check, X } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const before = [
  'Agent uses LLM reasoning for every step',
  'Expensive model used for simple extraction',
  'Tool calls retry without guardrails',
  'Failures require manual trace reading',
  'Prompt changes ship without regression checks',
  'No clear cost per successful run',
]

const after = [
  'Predictable steps become workflows',
  'Simple tasks move to cheaper models',
  'Risky actions get approval gates',
  'Failures come with root cause explanations',
  'Replay tests catch regressions before deploy',
  'Cost, latency and reliability are continuously monitored',
]

function List({ items, icon: Icon, iconClass }) {
  return (
    <ul className="mt-7 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-700">
          <Icon size={17} className={`mt-0.5 shrink-0 ${iconClass}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Flow({ tone }) {
  const isAfter = tone === 'after'
  const nodes = isAfter
    ? ['Workflow', 'SLM', 'Validation', 'Frontier', 'RCA']
    : ['LLM', 'Tool', 'Retry', 'Tool failed', 'Debug']

  return (
    <div className="mt-9 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <div className="relative flex flex-wrap items-center gap-2 overflow-hidden sm:justify-between">
        <span className="absolute left-4 right-4 top-1/2 hidden h-px -translate-y-1/2 bg-zinc-200 sm:block" />
        {isAfter && (
          <span className="absolute left-4 right-4 top-1/2 hidden h-px -translate-y-1/2 trace-flow sm:block" />
        )}
        {nodes.map((node, index) => (
          <span
            key={node}
            className={`relative z-10 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase ${
              isAfter && index > 0
                ? 'border-blue-200 bg-blue-50 text-[#0047FF]'
                : 'border-zinc-200 bg-white text-zinc-500'
            }`}
          >
            {node}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  return (
    <section id="before-after" className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Before / after"
          title="Turn unreliable agent behavior into controlled execution paths."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 md:grid-cols-2">
          <div className="motion-card reveal-on-scroll bg-white p-7 sm:p-9">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#B91C1C]">
              Before · without Lumniverse
            </div>
            <h3 className="font-display mt-3 text-2xl font-bold tracking-[-0.025em] text-zinc-950">
              Probabilistic everything
            </h3>
            <List items={before} icon={X} iconClass="text-[#B91C1C]" />
            <Flow tone="before" />
          </div>
          <div className="motion-card reveal-on-scroll stagger-1 bg-white p-7 sm:p-9">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#047857]">
              After · with Lumniverse
            </div>
            <h3 className="font-display mt-3 text-2xl font-bold tracking-[-0.025em] text-zinc-950">
              Right tool for each step
            </h3>
            <List items={after} icon={Check} iconClass="text-[#047857]" />
            <Flow tone="after" />
          </div>
        </div>
      </div>
    </section>
  )
}
