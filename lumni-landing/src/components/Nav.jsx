import Logo from './Logo.jsx'

const links = [
  { label: 'Product', href: '#demo-preview' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'FAQ', href: '#faq' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-700 transition-colors hover:text-zinc-950"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="mailto:hello@lumniverse.ai?subject=Book%20a%20demo"
            className="hidden text-sm text-zinc-700 transition-colors hover:text-zinc-950 sm:inline-flex"
          >
            Book a demo
          </a>
          <a
            href="mailto:hello@lumniverse.ai?subject=Trace%20audit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-zinc-950 px-3.5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:px-4"
          >
            Analyze traces
          </a>
        </div>
      </div>
    </header>
  )
}
