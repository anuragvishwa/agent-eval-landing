import { AlertTriangle, ArrowRight } from 'lucide-react';

const scenarios = [
  {
    failure: 'Tool call timed out on retry #3',
    resolution: 'Replayed from the pre-tool checkpoint with a corrected timeout — 0 data loss.',
    tag: 'State Replay',
  },
  {
    failure: 'Agent looped on malformed JSON',
    resolution: 'Hallucination loop caught mid-run, context injected, loop broken in 3m 12s.',
    tag: '7-Layer RCA',
  },
  {
    failure: 'RAG returned stale context',
    resolution: 'Traced to a vector index lag, correlated across 4 sources at 97% confidence.',
    tag: 'Evidence',
  },
  {
    failure: 'Refund agent sent invalid payload',
    resolution: 'Failure turned into a CI regression gate — 3 bad deploys blocked since.',
    tag: 'Sandbox',
  },
  {
    failure: 'Token spend spiked 2.3x overnight',
    resolution: 'Per-agent cost alert fired before budget breach, traced to one tool.',
    tag: 'FinOps',
  },
  {
    failure: 'Upstream API changed its schema',
    resolution: 'Linked the deploy to the error spike in a 2-minute window, root cause named.',
    tag: 'Correlation',
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-24 bg-background/60 border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
            Real failures
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
            The incidents your agents hit — resolved.
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            No log diving. No guessing. No reproducing in prod. Every failure mode
            below is caught, explained, and fixed automatically.
          </p>
        </div>

        {/* Scenario grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios.map((s) => (
            <div
              key={s.failure}
              className="group rounded-xl border border-border bg-canvas p-5 hover:border-border-hover transition-colors"
            >
              {/* Failure */}
              <div className="flex items-start gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-foreground leading-snug">
                  {s.failure}
                </span>
              </div>

              {/* Connector */}
              <div className="flex items-center gap-2 mb-3 text-muted/60">
                <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                  {s.tag}
                </span>
              </div>

              {/* Resolution */}
              <p className="text-sm text-muted leading-relaxed">
                {s.resolution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
