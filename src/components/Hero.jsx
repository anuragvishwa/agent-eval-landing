import { Link } from "react-router-dom";
import { Terminal } from "./Terminal";

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden">
      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-canvas mb-8">
          <span className="w-2 h-4 bg-secondary animate-blink rounded-sm" />
          <span className="font-mono text-xs text-muted">AI Agent Live</span>
        </div>

        {/* Headline - Serif */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6 leading-[1.1]">
          Agent Incident &rarr; Verified Fix
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Track, diagnose, and resolve agentic workflow failures in real-time.
          <br className="hidden sm:block" />
          Intelligent incident response for modern AI engineers.
        </p>

        {/* Integration Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
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

      {/* Terminal Demo */}
      <div className="relative max-w-6xl mx-auto mt-16 flex justify-center px-4">
        <Terminal />
      </div>
    </section>
  );
}
