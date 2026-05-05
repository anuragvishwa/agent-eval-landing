import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-background border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <Zap className="w-5 h-5 text-secondary" />
          <span className="font-mono text-sm font-medium">Lumniverse</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="font-mono text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://cal.com/anuragvishwa/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block bg-secondary text-primary-foreground px-4 py-2 rounded-md font-mono text-sm font-medium hover:bg-secondary/90 transition-colors"
          >
            Book Demo
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block font-mono text-sm text-muted hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="block font-mono text-sm text-muted hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
            <a
              href="https://cal.com/anuragvishwa/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-secondary text-primary-foreground px-4 py-2 rounded-md font-mono text-sm font-medium text-center"
            >
              Book Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
