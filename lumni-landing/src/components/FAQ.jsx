import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const faqs = [
  {
    q: 'Is this another agent observability tool?',
    a: 'No. Observability tools show traces and logs. We focus on cost waste, workflow replacement, model routing, replay validation, and root cause analysis on top of those signals.',
  },
  {
    q: 'Do you replace LangSmith or Langfuse?',
    a: 'No. We ingest traces from existing tools like LangSmith, Langfuse, OpenTelemetry, and custom logs. Lumniverse sits on top as an optimization and RCA layer.',
  },
  {
    q: 'What does “workflow candidate” mean?',
    a: 'A workflow candidate is an agent step where the next action is predictable enough to be handled by rules, deterministic code, or a workflow engine instead of LLM reasoning.',
  },
  {
    q: 'Can this help reduce LLM costs?',
    a: 'Yes. We detect unnecessary frontier-model usage, repeated reasoning, retry waste, prompt bloat, failed-run waste, and steps that can move to SLMs or workflows.',
  },
  {
    q: 'Can this explain why an agent failed?',
    a: 'Yes. RCA identifies whether the root cause came from prompt behavior, model routing, tool failure, missing validation, bad workflow logic, retry loops, or risky actions without approval.',
  },
  {
    q: 'Do you automatically change my agents?',
    a: 'The initial version recommends fixes and helps validate them through replay tests. Runtime routing and automated workflow generation can be enabled later by teams that want deeper integration.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />
        <div className="reveal-on-scroll mt-10 border-y border-zinc-200">
          {faqs.map((faq, index) => {
            const isOpen = open === index
            return (
              <div key={faq.q} className="border-b border-zinc-200 last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span className="font-display text-[1.05rem] font-semibold tracking-tight text-zinc-950">
                    {faq.q}
                  </span>
                  <span className="mt-1 shrink-0 text-zinc-500">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="-mt-1 pb-5">
                    <p className="max-w-2xl text-sm leading-relaxed text-zinc-600">{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
