import { FileClock, LockKeyhole, ScanText, Server, ShieldCheck, UserCog, Wand2 } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const items = [
  [ShieldCheck, 'Read-only trace ingestion', 'We pull traces. We never execute against your agents.'],
  [ScanText, 'PII redaction support', 'Mask sensitive fields at ingestion. Configurable per workspace.'],
  [UserCog, 'Workspace access control', 'Role-based access for engineering, ops and leadership.'],
  [FileClock, 'Audit logs', 'Every action — query, export, replay — is logged.'],
  [Server, 'Self-hosting available', 'VPC or single-tenant deployments for enterprise teams.'],
  [LockKeyhole, 'Configurable retention', 'Set retention windows per workspace. Defaults to 30 days.'],
  [Wand2, 'No training on your data', 'Customer traces are never used to train models, by default.'],
]

export default function Security() {
  return (
    <section id="security" className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Security & trust"
          title="Built for production agent teams."
          description="The boring stuff that actually matters when you connect a tool to production traces."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([Icon, title, body], index) => (
            <div
              key={title}
              className={`motion-card reveal-on-scroll ${index === 6 ? 'lg:col-span-3' : ''} bg-white p-6`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-700">
                <Icon size={16} />
              </div>
              <h3 className="font-display mt-5 text-lg font-bold tracking-[-0.025em] text-zinc-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
