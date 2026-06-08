import { ArrowRight } from 'lucide-react'
import DashboardMockup from './DashboardMockup.jsx'

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-zinc-200">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-blue-50/70 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="soft-rise lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-zinc-600">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0047FF]" />
              FinOps + RCA for AI agents
            </div>
            <h1 className="font-display mt-6 text-[2.5rem] font-bold leading-[1.02] tracking-[-0.03em] text-zinc-950 sm:text-[3.25rem] lg:text-[3.75rem]">
              Reduce AI agent cost and failures
              <span className="text-zinc-400"> without rebuilding your stack.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
              Connect your traces. We show where agents are overspending, which steps should become
              workflows, and why failures actually happen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:hello@lumniverse.ai?subject=Trace%20audit"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 py-3 font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Analyze my agent traces
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#demo-preview"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-5 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
              >
                View demo
              </a>
            </div>
            <p className="mt-5 max-w-lg text-sm text-zinc-500">
              Connect LangSmith, Langfuse, OpenTelemetry, or upload trace JSON. Get a cost,
              reliability, and RCA report in minutes.
            </p>
          </div>
          <div className="soft-rise soft-rise-delay-1 lg:col-span-6">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
