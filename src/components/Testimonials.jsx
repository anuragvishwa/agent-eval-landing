const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'VP Engineering',
    company: 'TechFlow',
    content: 'Lumni reduced our incident resolution time by 75%. We went from spending hours debugging to having root causes identified in minutes.',
    avatar: 'SC',
  },
  {
    name: 'Marcus Johnson',
    role: 'CTO',
    company: 'CloudScale',
    content: 'The auto-remediation feature is a game changer. Our team can focus on building features instead of fighting fires.',
    avatar: 'MJ',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Site Reliability Lead',
    company: 'DataHub',
    content: 'We integrated Lumni with our existing stack in under an hour. The onboarding was seamless and the impact was immediate.',
    avatar: 'ER',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background/80">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-6">
            Loved by engineering teams
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            See why hundreds of companies trust Lumni to keep their systems online
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-canvas border border-border rounded-lg p-8 hover:border-border-hover transition-colors"
            >
              {/* Quote */}
              <p className="text-foreground mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary/20 border border-secondary/30 rounded-full flex items-center justify-center font-mono text-sm text-secondary">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-medium text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
