import { useRef, useState, useEffect } from 'react';
import { Activity, GitBranch, BarChart3, Bot, Globe, Network, Zap, Database } from 'lucide-react';
import {
  InstantDetectionIllustration,
  AutoResolutionIllustration,
  SmartContextIllustration,
  GlobalCoverageIllustration,
} from './FeatureIllustrations';

const features = [
  {
    icon: Network,
    label: 'Fleet Monitoring',
    title: 'Monitor your entire agentic workforce',
    description: 'Visualize the health, cost, and activity of all your AI agents in real-time, from support bots to background investigators.',
    bullets: [
      'Real-time token cost and usage tracking',
      'Agent status (Running, Degraded, Failed)',
      'Model and provider performance metrics',
    ],
    Illustration: InstantDetectionIllustration,
  },
  {
    icon: Zap,
    label: '7-Layer RCA',
    title: 'Pinpoint failures across the agent stack',
    description: 'Instantly diagnose issues whether they occur in the Context, Tools, Model, Orchestrator, or Environment layer.',
    bullets: [
      'Categorized failure classes (e.g. Schema drift, Tool timeout)',
      'Detailed evidence and correlation analysis',
      'Automated root cause summaries',
    ],
    Illustration: AutoResolutionIllustration,
  },
  {
    icon: Database,
    label: 'State Replay',
    title: 'Replay and fix failed agent runs',
    description: 'Don\'t lose context when an agent crashes. Modify the state and resume the agent right where it left off.',
    bullets: [
      'Full LangGraph state serialization',
      'Human-in-the-loop context correction',
      'Safe replay environments',
    ],
    Illustration: SmartContextIllustration,
  },
  {
    icon: Globe,
    label: 'Architecture Graph',
    title: 'Understand complex agent collaborations',
    description: 'Automatically map out how your specialized agents interact, handoff tasks, and share data.',
    bullets: [
      'Live topology of agent fleets',
      'Handoff and dependency visualization',
      'Bottleneck detection',
    ],
    Illustration: GlobalCoverageIllustration,
  },
];

function FadeIn({ children, className = '' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Screens() {
  return (
    <section id="features" className="py-24 bg-background/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header — Failure Detection as page title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-canvas mb-6">
            <Activity className="w-4 h-4 text-secondary" />
            <span className="font-mono text-xs uppercase tracking-widest text-secondary">
              Failure Detection
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-6">
            Catch every agent failure as it happens
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Get a complete view of all failures across your agent fleet. See error types, affected models, timestamps, and severity — all in one place.
          </p>
        </div>

        {/* 1. Failure Detection Image — Full width, centered, large */}
        <FadeIn className="mb-20">
          <div className="rounded-xl bg-canvas border border-border overflow-hidden shadow-2xl max-w-5xl mx-auto">
            <img src="/Failures.png" alt="Failure Detection Dashboard" className="w-full h-auto object-cover" />
          </div>
        </FadeIn>

        {/* 2. Quick Summary — left-right layout */}
        <FadeIn className="mb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-canvas mb-6">
                <BarChart3 className="w-4 h-4 text-secondary" />
                <span className="font-mono text-xs uppercase tracking-widest text-secondary">
                  Quick Summary
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4 leading-tight">
                Instant root cause analysis
              </h3>
              <p className="text-base lg:text-lg text-muted leading-relaxed max-w-xl">
                Get AI-generated summaries that pinpoint the root cause, affected components, and recommended fixes — no manual log diving required.
              </p>
            </div>
            <div className="rounded-xl bg-canvas border border-border overflow-hidden shadow-2xl max-w-sm lg:max-w-md mx-auto">
              <img
                src="/Quicksummary.png"
                alt="Quick Summary"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </FadeIn>

        {/* 3. Agent Card — left-right layout (reversed) */}
        <FadeIn className="mb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
            <div className="rounded-xl bg-canvas border border-border overflow-hidden shadow-2xl max-w-sm lg:max-w-md mx-auto lg:order-1">
              <img
                src="/agent-card.png"
                alt="Agent Card"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-canvas mb-6">
                <Bot className="w-4 h-4 text-secondary" />
                <span className="font-mono text-xs uppercase tracking-widest text-secondary">
                  Agent Card
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4 leading-tight">
                Deep-dive into any agent
              </h3>
              <p className="text-base lg:text-lg text-muted leading-relaxed max-w-xl">
                Inspect individual agent runs with full context: inputs, outputs, tool usage, token costs, latency, and failure history at a glance.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* 3. Agent Graph — full width left-right layout */}
        <FadeIn>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-canvas mb-6">
                <GitBranch className="w-4 h-4 text-secondary" />
                <span className="font-mono text-xs uppercase tracking-widest text-secondary">
                  Agent Graph
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4 leading-tight">
                Visualize agent execution paths
              </h3>
              <p className="text-base lg:text-lg text-muted leading-relaxed max-w-xl">
                Trace exactly how your agents execute step by step. Understand branching logic, tool calls, and where failures occur in the workflow graph.
              </p>
            </div>
            <div className="rounded-xl bg-canvas border border-border overflow-hidden shadow-2xl">
              <img
                src="/Graph.png"
                alt="Agent Graph"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </FadeIn>

        {/* Feature blocks with animated illustrations */}
        <div className="divide-y divide-border mt-20">
          {features.map((feature, index) => {
            const Illustration = feature.Illustration;
            const Icon = feature.icon;
            const isReversed = index % 2 === 1;

            return (
              <div key={index} className="py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  {/* Content */}
                  <div className={isReversed ? 'lg:order-2' : 'lg:order-1'}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-canvas mb-6">
                      <Icon className="w-4 h-4 text-secondary" />
                      <span className="font-mono text-xs uppercase tracking-widest text-secondary">
                        {feature.label}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4 leading-tight">
                      {feature.title}
                    </h3>

                    <p className="text-base lg:text-lg text-muted leading-relaxed mb-6 max-w-xl">
                      {feature.description}
                    </p>

                    <ul className="space-y-3">
                      {feature.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm lg:text-base text-muted">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Illustration */}
                  <div className={isReversed ? 'lg:order-1' : 'lg:order-2'}>
                    <div className="rounded-xl bg-canvas border border-border overflow-hidden shadow-2xl">
                      <Illustration />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
