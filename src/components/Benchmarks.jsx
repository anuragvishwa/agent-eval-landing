import { useRef, useState, useEffect } from 'react';
import { TrendingDown, Layers, Bot, RotateCcw } from 'lucide-react';

const metrics = [
  {
    value: 92,
    suffix: '%',
    label: 'MTTR REDUCTION',
    description: 'From 47 min to 3m 42s',
    icon: TrendingDown,
    color: 'text-secondary',
  },
  {
    value: 7,
    suffix: '-Layer',
    label: 'ROOT CAUSE DEPTH',
    description: 'Full stack coverage',
    icon: Layers,
    color: 'text-violet-400',
  },
  {
    value: 85,
    suffix: '%',
    label: 'AUTO-RESOLUTION',
    description: 'Without human intervention',
    icon: Bot,
    color: 'text-orange-400',
  },
  {
    value: 100,
    suffix: '%',
    label: 'STATE RECOVERY',
    description: 'Resume from any checkpoint',
    icon: RotateCcw,
    color: 'text-secondary',
  },
];

function AnimatedMetric({ metric, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * metric.value));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, metric.value]);

  const Icon = metric.icon;

  return (
    <div className="text-center p-6 rounded-xl border border-border bg-canvas">
      <Icon className={`w-5 h-5 ${metric.color} mx-auto mb-3`} />
      <div className="flex items-baseline justify-center gap-0.5 mb-2">
        <span className={`font-serif text-4xl md:text-5xl font-light ${metric.color}`}>
          {count}
        </span>
        <span className={`font-mono text-lg ${metric.color}`}>
          {metric.suffix}
        </span>
      </div>
      <div className="font-mono text-xs uppercase tracking-widest text-muted mb-1">
        {metric.label}
      </div>
      <div className="text-sm text-muted/70">
        {metric.description}
      </div>
    </div>
  );
}

export function Benchmarks() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="benchmarks" className="py-16 sm:py-24 bg-background/80">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
            Benchmarks
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
            Measurable improvement across every incident metric.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Same agent fleets, same failure scenarios. The only variable is whether Lumniverse is monitoring and resolving.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <AnimatedMetric key={i} metric={metric} inView={inView} />
          ))}
        </div>

        {/* Methodology link */}
        <div className="text-center mt-8">
          <a href="#" className="font-mono text-xs text-muted hover:text-secondary transition-colors underline underline-offset-4">
            Full methodology — token counts, latency measurement, agent loop — in the whitepaper.
          </a>
        </div>
      </div>
    </section>
  );
}
