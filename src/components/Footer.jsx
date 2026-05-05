import { Zap } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    product: ['Features', 'Pricing', 'Integrations', 'Documentation'],
    company: ['About', 'Blog', 'Careers', 'Contact'],
    legal: ['Privacy', 'Terms', 'Security'],
  };

  return (
    <footer className="py-16 bg-background/90 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2 text-foreground mb-4">
              <Zap className="w-5 h-5 text-secondary" />
              <span className="font-mono text-sm font-medium">Lumniverse</span>
            </a>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              AI-powered RCA and incident management for modern AI Agents.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm font-mono">
            © {currentYear} Lumniverse
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full animate-blink" />
            <span className="text-muted text-sm font-mono">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
