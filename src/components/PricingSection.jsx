import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'For teams exploring agent observability',
    features: [
      'Up to 3 agents',
      '7-day trace retention',
      'Basic RCA (3 layers)',
      'Community support',
      '1,000 replays/month',
    ],
    cta: 'Get Started Free',
    ctaStyle: 'border',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/agent/mo',
    description: 'For teams running agents in production',
    features: [
      'Unlimited agents',
      '90-day trace retention',
      'Full 7-layer RCA',
      'FinOps & cost attribution',
      'Sandbox & regression gates',
      'Slack integration',
      'Priority support',
      'Unlimited replays',
    ],
    cta: 'Start 14-Day Trial',
    ctaStyle: 'primary',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with complex agent fleets',
    features: [
      'Everything in Pro',
      'Unlimited retention',
      'SSO & RBAC',
      'Dedicated support engineer',
      'Custom integrations',
      'SLA guarantee',
      'On-prem deployment option',
      'Architecture graph export',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'border',
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background/80">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
            Pricing
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
            Simple pricing that scales with your fleet.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Start free. Upgrade when your agent fleet grows.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-xl p-8 flex flex-col transition-all duration-300 hover:shadow-lg ${
                tier.highlighted
                  ? 'bg-canvas border-2 border-secondary ring-1 ring-secondary/20'
                  : 'bg-canvas border border-border'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-secondary text-white font-mono text-[10px] font-medium uppercase tracking-wider">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier Name */}
              <h3 className="font-mono text-sm text-muted uppercase tracking-wider mb-4">{tier.name}</h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-serif text-4xl font-light text-foreground">{tier.price}</span>
                {tier.period && (
                  <span className="font-mono text-sm text-muted">{tier.period}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted mb-6">{tier.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={tier.name === 'Enterprise' ? 'https://cal.com/anuragvishwa/30min' : '#'}
                className={`block text-center px-6 py-3 rounded-lg font-mono text-sm font-medium transition-all duration-200 hover:scale-[1.02] ${
                  tier.ctaStyle === 'primary'
                    ? 'bg-secondary text-white hover:bg-secondary/90'
                    : 'border border-border text-foreground hover:bg-surface'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
