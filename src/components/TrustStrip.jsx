import { Lock, Eye, Server, ShieldCheck } from 'lucide-react';

const frameworks = ['OpenAI', 'Claude', 'Gemini', 'Deepseek', 'LangGraph', 'CrewAI', 'AWS Bedrock'];

const trustPoints = [
  { icon: Server, label: 'Self-hosted option', detail: 'Runs in your own VPC' },
  { icon: Eye, label: 'Read-only by default', detail: 'No write access to prod' },
  { icon: Lock, label: 'Data stays yours', detail: 'No traces leave your cloud' },
  { icon: ShieldCheck, label: 'SOC 2 Type II', detail: 'In progress' },
];

export function TrustStrip() {
  return (
    <section className="py-16 bg-canvas/60 border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* Works with */}
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted mb-6">
          Works with the stack you already run
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {frameworks.map((fw) => (
            <span
              key={fw}
              className="px-3 py-1.5 rounded-full border border-border bg-background font-mono text-xs text-muted"
            >
              {fw}
            </span>
          ))}
        </div>

        {/* Trust points */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPoints.map((tp) => {
            const Icon = tp.icon;
            return (
              <div
                key={tp.label}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3"
              >
                <Icon className="w-4 h-4 text-secondary shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{tp.label}</div>
                  <div className="text-xs text-muted truncate">{tp.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
