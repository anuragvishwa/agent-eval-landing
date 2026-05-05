import { useRef, useState, useEffect } from 'react';
import { Shield, Zap, Globe, Database, CheckCircle, Clock, Network, ArrowRight } from 'lucide-react';
import {
  InstantDetectionIllustration,
  AutoResolutionIllustration,
  SmartContextIllustration,
  GlobalCoverageIllustration,
} from './FeatureIllustrations';

const stats = [
  {
    value: 99.9,
    suffix: '%',
    label: 'Uptime Guarantee',
    icon: CheckCircle,
    description: 'Industry-leading reliability',
  },
  {
    value: 222,
    displayValue: '3m 42s',
    label: 'Avg Resolution Time',
    icon: Clock,
    description: 'From alert to resolved',
  },
  {
    value: 50,
    suffix: 'K+',
    label: 'Incidents Resolved',
    icon: Zap,
    description: 'And counting',
  },
];

const steps = [
  {
    id: 'ingest',
    number: '01',
    title: 'Trace',
    description: 'Connect your agent traces, tool executions, and context logs. Lumniverse integrates with your existing framework.',
    icon: Database,
  },
  {
    id: 'graph',
    number: '02',
    title: 'Build Architecture',
    description: 'Auto-discover your 7-layer agent architecture and tool dependencies. Understand how your agents collaborate.',
    icon: Network,
  },
  {
    id: 'analyze',
    number: '03',
    title: 'RCA Analysis',
    description: 'Find the root cause of agent failures. Our AI identifies hallucination loops, schema drift, and context overflows.',
    icon: Zap,
  },
  {
    id: 'resolve',
    number: '04',
    title: 'Replay & Resolve',
    description: 'Replay failed agent states with corrected context. Automated remediation with human-in-the-loop oversight.',
    icon: CheckCircle,
  },
];

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

// Animated stat component with count-up effect and rolling digits
function AnimatedStat({ stat }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (isInView && !stat.displayValue) {
      const duration = 2000;
      const startTime = Date.now();
      const endValue = stat.value;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayCount(easeOut * endValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, stat.value, stat.displayValue]);

  const formatValue = () => {
    if (stat.displayValue) return stat.displayValue;
    if (stat.suffix === '%') return displayCount.toFixed(1);
    return Math.floor(displayCount);
  };

  // Split value into individual characters for animation
  const valueString = formatValue().toString();
  const suffix = stat.suffix || '';

  return (
    <div ref={ref} className="text-center group">
      {/* Value with animated digits */}
      <div className="flex items-baseline justify-center gap-0.5 mb-3">
        {valueString.split('').map((char, i) => (
          <span
            key={i}
            className={`font-serif text-3xl md:text-4xl text-foreground tracking-tight inline-block transition-all duration-300 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {char}
          </span>
        ))}
        {suffix && (
          <span
            className={`font-serif text-2xl md:text-3xl text-secondary ml-0.5 transition-all duration-300 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${valueString.length * 50}ms` }}
          >
            {suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <div
        className={`font-mono text-xs uppercase tracking-widest text-muted mb-1 transition-all duration-500 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '300ms' }}
      >
        {stat.label}
      </div>

      {/* Description */}
      <div
        className={`text-sm text-muted/70 transition-all duration-500 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        {stat.description}
      </div>
    </div>
  );
}

// Step card with subtle animations
function AnimatedStep({ step, index, isActive }) {
  const Icon = step.icon;

  return (
    <div
      className={`group relative rounded-xl transition-all duration-300 p-5
        ${isActive
          ? 'bg-canvas border border-border shadow-sm'
          : 'bg-transparent border border-transparent hover:bg-canvas/50'
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* Step number */}
        <span
          className={`flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full font-mono text-xs font-medium transition-colors duration-300 ${
            isActive
              ? 'bg-secondary text-white'
              : 'bg-muted/10 text-muted'
          }`}
        >
          {index + 1}
        </span>

        <div className="flex-1 min-w-0">
          {/* Icon and Title row */}
          <div className="flex items-center gap-2 mb-2">
            <Icon
              className={`w-5 h-5 transition-colors duration-300 ${
                isActive ? 'text-secondary' : 'text-muted/50'
              }`}
            />
            <h3
              className={`font-medium text-base transition-colors duration-300 ${
                isActive ? 'text-foreground' : 'text-muted'
              }`}
            >
              {step.title}
            </h3>
          </div>

          {/* Description */}
          <p
            className={`text-sm leading-relaxed transition-colors duration-300 ${
              isActive ? 'text-muted' : 'text-muted/40'
            }`}
          >
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Simple connector between steps
function StepConnector({ activeStep, totalSteps }) {
  return (
    <div className="hidden md:flex absolute top-8 left-0 right-0 z-0 justify-between px-[3rem]">
      {[...Array(totalSteps - 1)].map((_, i) => (
        <div key={i} className="flex-1 flex items-center mx-4">
          <div className="relative w-full h-px bg-border rounded-full overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 bg-secondary/50 rounded-full transition-all duration-500 ${
                activeStep > i ? 'w-full' : 'w-0'
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Feature block component - clean light theme with dark illustrations
function FeatureBlock({ feature, index }) {
  const Illustration = feature.Illustration;
  const Icon = feature.icon;
  const isReversed = index % 2 === 1;

  return (
    <div className="py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Content */}
        <div className={isReversed ? 'lg:order-2' : 'lg:order-1'}>
          {/* Label badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-canvas mb-6">
            <Icon className="w-4 h-4 text-secondary" />
            <span className="font-mono text-xs uppercase tracking-widest text-secondary">
              {feature.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4 leading-tight">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-base lg:text-lg text-muted leading-relaxed mb-6 max-w-xl">
            {feature.description}
          </p>

          {/* Bullets */}
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
}

export function Features() {
  const stepsRef = useRef(null);
  const [stepsInView, setStepsInView] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  // Observe when steps section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStepsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (stepsRef.current) {
      observer.observe(stepsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate steps sequentially when in view
  useEffect(() => {
    if (!stepsInView) return;

    const stepDuration = 600;
    const timeouts = [];

    steps.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setActiveStep(index);
      }, index * stepDuration);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [stepsInView]);

  return (
    <section id="features" className="py-24 bg-background/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Clean, light design */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-canvas mb-6">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Features
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-6">
            Agents fail. Your workflows shouldn't.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Lumniverse tracks, diagnoses, and resolves agentic failures in real-time.
          </p>
        </div>

        {/* Stats row - Clean grid with dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 py-12 mb-16 border-y border-border">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${index > 0 ? 'md:border-l md:border-border' : ''}`}
            >
              <AnimatedStat stat={stat} index={index} />
            </div>
          ))}
        </div>

        {/* How It Works - Integrated section */}
        <div ref={stepsRef} id="how-it-works" className="mb-24">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-canvas mb-6">
              <ArrowRight className="w-4 h-4 text-secondary" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                How it works
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4">
              From data to resolution
            </h3>
            <p className="text-muted max-w-xl mx-auto">
              Four simple steps to transform your incident response workflow
            </p>
          </div>

          {/* Steps grid with connectors */}
          <div className="relative">
            <StepConnector activeStep={activeStep} totalSteps={steps.length} />
            <div className="grid md:grid-cols-4 gap-6 relative z-10">
              {steps.map((step, index) => (
                <AnimatedStep
                  key={step.id}
                  step={step}
                  index={index}
                  isActive={activeStep >= index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Feature blocks */}
        <div className="divide-y divide-border">
          {features.map((feature, index) => (
            <FeatureBlock
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
