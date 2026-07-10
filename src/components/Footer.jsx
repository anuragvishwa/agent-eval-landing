import { Zap, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 bg-background/90 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2 text-foreground mb-4">
              <Zap className="w-5 h-5 text-secondary" />
              <span className="font-mono text-sm font-medium">Lumniverse</span>
            </a>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              AI-powered RCA and incident management for modern AI Agents.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm font-mono">
            © {currentYear} Lumniverse
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/anurag-vishwa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-sm font-mono">LinkedIn</span>
            </a>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full animate-blink" />
              <span className="text-muted text-sm font-mono">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
