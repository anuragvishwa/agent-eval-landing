import { ComparisonDemo } from "./ComparisonDemo";

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Messaging */}
          <div>
            {/* Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-canvas mb-8">
              <span className="w-2 h-4 bg-secondary animate-blink rounded-sm" />
              <span className="font-mono text-xs text-muted">AI Agent Live</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6 leading-[1.1]">
              Every agent failure, resolved before your users notice.
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted max-w-xl mb-10 leading-relaxed">
              Lumniverse catches failures mid-run, pinpoints root cause across 7 layers, and replays agents from the exact failure point.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:scale-[1.02] transition-transform"
              >
                Book a demo &rarr;
              </a>
              <a
                href="#capabilities"
                className="px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-canvas transition-colors"
              >
                See how it works
              </a>
            </div>

            {/* Integration Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {["OpenAI", "Claude", "Gemini", "Deepseek", "LangGraph"].map(
                (item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full border border-border bg-canvas font-mono text-xs text-muted"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right — Comparison Demo */}
          <div className="flex justify-center">
            <ComparisonDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
