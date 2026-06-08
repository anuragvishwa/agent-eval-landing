import { AuditPipeline } from './AnimatedSignals.jsx'
import SectionHeading from './SectionHeading.jsx'

const steps = [
  ['01', 'Connect traces', 'LangSmith, Langfuse, OpenTelemetry, Vercel AI SDK, LangGraph, CrewAI — or upload custom trace JSON.'],
  ['02', 'Detect waste & failures', 'We analyze model calls, prompts, tool usage, retries, latency and failure patterns across production runs.'],
  ['03', 'Classify every step', 'Each step is tagged: workflow candidate, SLM candidate, frontier required, human approval, validation issue, or RCA incident.'],
  ['04', 'Get recommended fixes', 'Replace reasoning with workflows, downgrade models, add validation, create evals, or run replay tests.'],
  ['05', 'Validate before shipping', 'Replay historical traces and compare cost, latency, success rate, and regression risk before deploying changes.'],
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From messy traces to clear fixes."
          description="Five steps from raw production data to actionable cost, reliability and RCA insights."
        />
        <div className="reveal-on-scroll">
          <AuditPipeline />
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 lg:grid-cols-5">
          {steps.map(([number, title, body], index) => (
            <div
              key={title}
              className={`motion-card reveal-on-scroll pipeline-node pipeline-node-delay-${index} bg-white p-6`}
            >
              <div className="font-mono text-[12px] text-[#0047FF]">{number}</div>
              <h3 className="font-display mt-5 text-xl font-bold tracking-[-0.025em] text-zinc-950">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
