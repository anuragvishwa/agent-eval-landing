import Logo from './Logo.jsx'

const columns = [
  {
    label: 'Product',
    links: [
      ['How it works', '#how-it-works'],
      ['Capabilities', '#capabilities'],
      ['Integrations', '#integrations'],
      ['Security', '#security'],
    ],
  },
  {
    label: 'Use cases',
    links: [
      ['AI support', '#use-cases'],
      ['AI SDR', '#use-cases'],
      ['DevOps / SRE', '#use-cases'],
      ['Browser agents', '#use-cases'],
      ['Internal automation', '#use-cases'],
    ],
  },
  {
    label: 'Company',
    links: [
      ['FAQ', '#faq'],
      ['Contact', 'mailto:hello@lumniverse.ai?subject=Hello%20Lumniverse'],
      ['Privacy', 'mailto:hello@lumniverse.ai?subject=Privacy%20request'],
      ['Terms', 'mailto:hello@lumniverse.ai?subject=Terms%20request'],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-7 max-w-md text-base leading-relaxed text-zinc-600">
              FinOps + RCA for AI agents. Find the parts of your agent that shouldn't be AI — and
              fix them before they ship.
            </p>
            <a
              href="mailto:hello@lumniverse.ai?subject=Hello%20Lumniverse"
              className="mt-7 inline-block font-mono text-sm text-zinc-950"
            >
              hello@lumniverse.ai
            </a>
          </div>
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((column) => (
              <div key={column.label}>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {column.label}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-sm text-zinc-700 transition-colors hover:text-zinc-950"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center">
          <div className="font-mono text-[11px] text-zinc-500">
            © {new Date().getFullYear()} Lumniverse Labs · All rights reserved
          </div>
          <div className="font-mono text-[11px] text-zinc-500">v0.1 · early access</div>
        </div>
      </div>
    </footer>
  )
}
