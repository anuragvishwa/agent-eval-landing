import { Flame, GitBranch, Search } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const items = [
  {
    icon: Flame,
    title: 'Expensive reasoning',
    body: 'Frontier models keep getting called for routing, extraction, and validation work that rules or smaller models would handle just fine.',
  },
  {
    icon: Search,
    title: 'Unclear failures',
    body: 'When an agent fails in production, teams burn hours scrolling through traces, prompts, and tool logs to figure out what actually broke.',
  },
  {
    icon: GitBranch,
    title: 'No optimization loop',
    body: 'Prompts and models ship without anyone knowing if cost, latency, or reliability got better or worse after the change.',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <SectionHeading
          eyebrow="The problem"
          title="Most production agents are overthinking simple work."
          description="AI agents are powerful, but a lot of production agents burn frontier-model budget on predictable steps. Logs tell you what happened — they rarely tell you what should become a workflow or why the agent failed."
        />
        <div className="mt-14 grid overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="motion-card reveal-on-scroll bg-white p-8 sm:p-9">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-600">
                  <Icon size={17} />
                </div>
                <h3 className="font-display mt-5 text-xl font-bold leading-7 tracking-[-0.025em] text-zinc-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-600">{item.body}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
