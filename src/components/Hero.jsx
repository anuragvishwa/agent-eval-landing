import { motion } from "framer-motion";
import { LiveOpsFeed } from "./LiveOpsFeed";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Messaging */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Announcement Pill */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-canvas mb-8"
            >
              <span className="w-2 h-4 bg-secondary animate-blink rounded-sm" />
              <span className="font-mono text-xs text-muted">
                AI Agent Live
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6 leading-[1.1]"
            >
              Failure Intelligence for Prod AI Agents
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={item}
              className="text-lg md:text-xl text-muted max-w-xl mb-10 leading-relaxed"
            >
              Every agent failure, resolved before your users notice.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a
                href="https://cal.com/anuragvishwa/30min"
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
            </motion.div>

            {/* Integration Pills */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-2"
            >
              {["OpenAI", "Claude", "Gemini", "Deepseek", "LangGraph"].map(
                (label) => (
                  <span
                    key={label}
                    className="px-3 py-1 rounded-full border border-border bg-canvas font-mono text-xs text-muted"
                  >
                    {label}
                  </span>
                ),
              )}
            </motion.div>
          </motion.div>

          {/* Right — Live Ops Feed */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <LiveOpsFeed />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
