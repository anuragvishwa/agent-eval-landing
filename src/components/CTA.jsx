import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="py-24 bg-canvas/80 border-y border-border">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Header */}
        <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
          Get Started
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-6">
          Ready to eliminate agent downtime?
        </h2>
        <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto">
          Join leading AI engineering teams who trust Lumniverse to keep their
          agents reliable.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="https://cal.com/anuragvishwa/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-primary-foreground px-8 py-3 rounded-md font-mono text-sm font-medium hover:bg-secondary/90 transition-colors"
          >
            Book Demo
          </a>

        </div>

        {/* Trust indicators */}
        {/* <p className="font-mono text-xs text-muted">
          No credit card required
        </p> */}
      </div>
    </section>
  );
}
