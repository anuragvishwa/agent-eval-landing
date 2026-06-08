import {
  BadgeCheck,
  CircleDollarSign,
  ClipboardCheck,
  GitBranch,
  Gauge,
  Repeat,
  Route,
  SearchCheck,
} from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const capabilities = [
  [CircleDollarSign, 'Agent cost monitoring', 'Cost by agent, model, step, tool call, retry and failure type.'],
  [Gauge, 'Waste detection', 'Prompt bloat, repeated reasoning, retry loops, and failed-run waste.'],
  [GitBranch, 'Workflow replacement', 'Find predictable steps that should become deterministic workflows.'],
  [Route, 'Model routing', 'Move steps from frontier models to SLMs, OSS, or structured code.'],
  [SearchCheck, 'Root cause analysis', 'Pinpoint whether failures came from prompt, tool, model, validation, or routing.'],
  [Repeat, 'Replay & evals', 'Test workflow and model changes against historical traces before deploy.'],
  [BadgeCheck, 'Regression detection', 'Catch when a prompt, model, or tool change makes things worse.'],
  [ClipboardCheck, 'Approval gates', 'Flag high-risk actions that should require human approval before execution.'],
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Core capabilities"
          title="Everything you need to make agents cheaper, faster, and more reliable."
          description="Built for teams running production agents. No new SDKs, no rewrites — just better signal on what's actually happening."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(([Icon, title, body]) => (
            <div key={title} className="motion-card reveal-on-scroll bg-white p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-700">
                <Icon size={16} />
              </div>
              <h3 className="font-display mt-5 text-lg font-bold tracking-[-0.025em] text-zinc-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
