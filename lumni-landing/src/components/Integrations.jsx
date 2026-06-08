import { Boxes, ExternalLink } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const integrations = [
  ['LangSmith', 'Native', 'https://www.langchain.com/langsmith'],
  ['Langfuse', 'Native', 'https://langfuse.com/'],
  ['OpenTelemetry', 'Official', 'https://opentelemetry.io/'],
  ['Vercel AI SDK', 'Official', 'https://sdk.vercel.ai/'],
  ['LangGraph', 'Native', 'https://www.langchain.com/langgraph'],
  ['CrewAI', 'Native', 'https://www.crewai.com/'],
  ['Slack', 'Official', 'https://slack.com/'],
  ['Jira', 'Official', 'https://www.atlassian.com/software/jira'],
  ['Linear', 'Official', 'https://linear.app/'],
  ['GitHub', 'Official', 'https://github.com/'],
  ['Custom JSON', 'Native', 'mailto:hello@lumniverse.ai?subject=Custom%20trace%20JSON'],
  ['More via SDK', 'Native', 'mailto:hello@lumniverse.ai?subject=Lumniverse%20SDK%20access'],
]

export default function Integrations() {
  return (
    <section id="integrations" className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50">
      <div className="pointer-events-none absolute inset-0 bg-dot opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Integrations"
          title="Connect to the tools your agent stack already uses."
          description="Start with trace ingestion. Add replay, evals, alerts and workflow recommendations as your agents scale."
          center
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.map(([name, status, href]) => (
            <a
              key={name}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="motion-card reveal-on-scroll group flex items-center justify-between gap-4 bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-700 transition-colors group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-[#0047FF]">
                  <Boxes size={16} />
                </div>
                <span className="font-medium text-zinc-900">{name}</span>
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                {status}
                <ExternalLink size={11} className="opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
