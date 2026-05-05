import { useRef, useState, useEffect } from 'react';
import { Database, Network, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 'ingest',
    number: '01',
    title: 'Ingest',
    description: 'Connect your logs, metrics, and traces from any source. Lumni integrates with your existing observability stack.',
    icon: Database,
  },
  {
    id: 'graph',
    number: '02',
    title: 'Build Graph',
    description: 'Auto-discover service topology and dependencies. Understand how your systems connect and communicate.',
    icon: Network,
  },
  {
    id: 'analyze',
    number: '03',
    title: 'AI Analysis',
    description: 'Find root cause in seconds, not hours. Our AI correlates signals across your entire infrastructure.',
    icon: Zap,
  },
  {
    id: 'resolve',
    number: '04',
    title: 'Resolve',
    description: 'Apply fixes with confidence. Automated remediation with human oversight for critical changes.',
    icon: CheckCircle,
  },
];

// Flowing particles canvas component
function FlowingParticles({ activeStep }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    // Create particles
    const createParticle = () => {
      return {
        x: 0,
        y: Math.random() * canvas.height / window.devicePixelRatio,
        speed: 1 + Math.random() * 2,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.5,
      };
    };

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      const p = createParticle();
      p.x = Math.random() * canvas.width / window.devicePixelRatio;
      particles.push(p);
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      time += 0.01;

      ctx.clearRect(0, 0, width, height);

      // Draw flowing particles
      particles.forEach((p, i) => {
        p.x += p.speed;

        // Reset particle when it goes off screen
        if (p.x > width) {
          p.x = 0;
          p.y = Math.random() * height;
        }

        // Draw particle with trail
        const gradient = ctx.createLinearGradient(p.x - 20, 0, p.x, 0);
        gradient.addColorStop(0, 'rgba(34, 197, 94, 0)');
        gradient.addColorStop(1, `rgba(34, 197, 94, ${p.opacity})`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = p.size;
        ctx.moveTo(p.x - 20, p.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Glowing dot at the head
        ctx.beginPath();
        ctx.fillStyle = `rgba(34, 197, 94, ${p.opacity})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw step connection points (4 dots representing steps)
      const stepPositions = [0.125, 0.375, 0.625, 0.875];
      stepPositions.forEach((pos, i) => {
        const x = pos * width;
        const y = height / 2;
        const isActive = i <= activeStep;

        // Glow effect for active steps
        if (isActive) {
          const glowSize = 20 + Math.sin(time * 3) * 5;
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
          gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
          gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Connection dot
        ctx.beginPath();
        ctx.fillStyle = isActive ? '#22c55e' : '#2a2a2a';
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connection line
      ctx.beginPath();
      ctx.strokeStyle = '#2a2a2a';
      ctx.lineWidth = 2;
      ctx.moveTo(stepPositions[0] * width, height / 2);
      ctx.lineTo(stepPositions[3] * width, height / 2);
      ctx.stroke();

      // Draw active progress line
      if (activeStep >= 0) {
        const progressEnd = stepPositions[Math.min(activeStep, 3)] * width;
        ctx.beginPath();
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.moveTo(stepPositions[0] * width, height / 2);
        ctx.lineTo(progressEnd, height / 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [activeStep]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

export function HowItWorks() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const stepDuration = 800;
    const timeouts = [];

    steps.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setActiveStep(index);
      }, index * stepDuration);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-background/80">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header - Dark themed */}
        <div className="relative bg-canvas rounded-2xl p-8 md:p-12 border border-border mb-12 overflow-hidden">
          {/* Background gradient accents */}
          <div
            className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
          />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface border border-border rounded-lg mb-6">
              <ArrowRight className="w-4 h-4 text-green-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-green-400">
                How it works
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              From data to resolution
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Four simple steps to transform your incident response workflow
            </p>
          </div>

          {/* Particle animation strip */}
          <div className="relative h-16 mt-8 -mx-8 md:-mx-12">
            <FlowingParticles activeStep={activeStep} />
          </div>
        </div>

        {/* Steps - Dark themed cards */}
        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep >= index;
            const isCurrent = activeStep === index;

            return (
              <div
                key={step.id}
                className={`relative bg-canvas rounded-xl p-6 border transition-all duration-500 overflow-hidden group ${
                  isActive ? 'border-border' : 'border-border'
                } ${isCurrent ? 'scale-[1.02]' : ''}`}
              >
                {/* Glow effect on active */}
                {isActive && (
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none transition-opacity"
                    style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }}
                  />
                )}

                {/* Pulse ring on current step */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-xl border-2 border-green-500/30 animate-pulse pointer-events-none" />
                )}

                <div className="relative z-10">
                  {/* Step number badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-mono text-xs px-2 py-1 rounded transition-colors duration-300 ${
                        isActive
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-surface text-muted'
                      }`}
                    >
                      {step.number}
                    </span>
                    {index < steps.length - 1 && (
                      <ArrowRight
                        className={`w-4 h-4 hidden md:block transition-colors duration-300 ${
                          activeStep > index ? 'text-green-400' : 'text-muted/70'
                        }`}
                      />
                    )}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-lg border flex items-center justify-center mb-4 transition-all duration-300 ${
                      isActive
                        ? 'bg-surface border-green-500/50'
                        : 'bg-surface border-border'
                    }`}
                    style={isActive ? { boxShadow: '0 0 20px rgba(34, 197, 94, 0.2)' } : {}}
                  >
                    <Icon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isActive ? 'text-green-400' : 'text-muted'
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <h3
                    className={`font-serif text-lg mb-2 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-muted'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA - Dark themed */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <span className="text-muted text-sm">Ready to get started?</span>
            <a
              href="https://cal.com/anuragvishwa/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-primary-foreground px-6 py-2.5 rounded-md font-mono text-sm font-medium hover:bg-secondary/90 transition-colors"
            >
              Book Demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
