import { useState } from 'react'
import SectionHeading from './SectionHeading.jsx'

const cases = [
  {
    label: 'AI support agents',
    body: 'Reduce support-agent cost by replacing repeated triage, refund checks, routing and escalation decisions with workflows.',
    stats: [
      ['Monthly spend', '−42%'],
      ['P95 latency', '−1.8s'],
      ['Failed runs', '−61%'],
    ],
  },
  {
    label: 'AI SDR agents',
    body: 'Find repetitive qualification, enrichment, follow-up, and handoff steps that can move from frontier reasoning into controlled workflows.',
    stats: [
      ['Lead routing cost', '−38%'],
      ['Tool retries', '−54%'],
      ['Bad handoffs', '−32%'],
    ],
  },
  {
    label: 'DevOps / SRE agents',
    body: 'Spot risky remediation loops, missing approvals, and expensive diagnostic chains before they become production incidents.',
    stats: [
      ['Incident RCA time', '−47%'],
      ['Unsafe actions', '−66%'],
      ['Replay coverage', '+81%'],
    ],
  },
  {
    label: 'Browser / computer-use agents',
    body: 'Separate deterministic browser actions from reasoning-heavy steps, then catch brittle selectors, retry loops, and missing validation.',
    stats: [
      ['Browser retries', '−58%'],
      ['Step latency', '−2.1s'],
      ['Validation gaps', '−44%'],
    ],
  },
  {
    label: 'Internal automation agents',
    body: 'Convert predictable routing, extraction, formatting, and approval tasks into durable internal workflows with replay-tested changes.',
    stats: [
      ['Workflow candidates', '+73%'],
      ['Frontier calls', '−39%'],
      ['Regression risk', '−51%'],
    ],
  },
]

export default function UseCases() {
  const [active, setActive] = useState(0)
  const selected = cases[active]

  return (
    <section id="use-cases" className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Use cases"
          title="Built for teams running agents in production."
          description="Pick the agent type — see the typical wins and where Lumniverse catches the waste."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="reveal-on-scroll overflow-hidden rounded-xl border border-zinc-200 bg-white">
              {cases.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`flex w-full items-center gap-4 border-b border-zinc-200 px-5 py-4 text-left last:border-b-0 ${
                    active === index ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-800 hover:bg-zinc-50'
                  }`}
                >
                  <span className="font-mono text-[11px] text-current/60">0{index + 1}</span>
                  <span className="min-w-0 flex-1 font-display text-base font-bold tracking-tight sm:text-lg">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="motion-card reveal-on-scroll stagger-1 h-full rounded-xl border border-zinc-200 bg-white p-7 sm:p-9">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Profile · {selected.label}
              </div>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-700 sm:text-xl">
                {selected.body}
              </p>
              <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
                {selected.stats.map(([label, value]) => (
                  <div key={label} className="bg-zinc-50 p-5">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      {label}
                    </div>
                    <div className="font-display mt-3 text-3xl font-bold tracking-tight text-[#0047FF]">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="mb-4 flex flex-col gap-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
                  <span>audit signal</span>
                  <span>live trace replay</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <div className="rounded-lg border border-zinc-200 bg-white p-3">
                    <div className="font-mono text-[10px] text-zinc-500">agent_step</div>
                    <div className="mt-1 text-sm font-medium text-zinc-900">refund_eligibility_check</div>
                  </div>
                  <div className="hidden h-px w-16 trace-flow sm:block" />
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                    <div className="font-mono text-[10px] text-[#0047FF]">recommendation</div>
                    <div className="mt-1 text-sm font-medium text-zinc-900">replace with workflow</div>
                  </div>
                </div>
              </div>
              <p className="mt-5 font-mono text-[11px] text-zinc-500">
                * indicative ranges from early-access customer audits
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
