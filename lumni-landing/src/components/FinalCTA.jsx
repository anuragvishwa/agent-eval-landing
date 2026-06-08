import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section id="final-cta" className="relative overflow-hidden border-b border-zinc-200 bg-zinc-950">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#0047FF]/20 to-transparent" />
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-28 lg:px-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
          Start a trace audit
        </div>
        <h2 className="font-display mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
          Your agents are probably wasting money.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
          Connect your traces and see which parts should become workflows, cheaper models, or RCA
          incidents.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="mailto:hello@lumniverse.ai?subject=Trace%20audit"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 font-medium text-zinc-950 transition-colors hover:bg-zinc-100"
          >
            Analyze my agent traces
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="mailto:hello@lumniverse.ai?subject=Book%20a%20demo"
            className="inline-flex items-center justify-center rounded-md border border-white/15 px-5 py-3 font-medium text-white transition-colors hover:bg-white/10"
          >
            Book a demo
          </a>
        </div>
        <p className="mt-5 font-mono text-[11px] text-zinc-500">
          No credit card required · start with a trace audit
        </p>
      </div>
    </section>
  )
}
