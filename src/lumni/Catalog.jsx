import { motion } from 'framer-motion';
import {
  BellRing, Copy, Eye, FileCheck2, Gauge, GitMerge, Hand, Layers, ListOrdered, MailPlus,
  PiggyBank, Receipt, RefreshCw, Siren, Swords, TriangleAlert, UserCheck, Users, Workflow,
} from 'lucide-react';

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4, ease: 'easeOut', delay: i * 0.05 },
});

// The twelve ways agents go wrong, in four families.
const groups = [
  {
    name: 'Doing it twice',
    items: [
      [Copy, 'Same payment, twice', 'A retry after a timeout refunds again.', 'Lets one through'],
      [MailPlus, 'Same email, two answers', 'Two agents reply to one customer.', 'Joins the first'],
      [PiggyBank, 'Paying to redo work', 'Model calls for work already done.', 'Stops it before it spends'],
    ],
  },
  {
    name: 'Acting on old information',
    items: [
      [RefreshCw, 'Writing a stale value', 'Acts on data someone just changed.', 'Makes it re-read'],
      [Layers, 'Plans that changed', 'The customer changed their mind; the agent didn’t.', 'Stops stale work'],
      [ListOrdered, 'Out of order', 'Ticket closed before the refund landed.', 'Waits its turn'],
    ],
  },
  {
    name: 'Getting in each other’s way',
    items: [
      [UserCheck, 'Agent vs. person', 'You fix a record; an agent overwrites it.', 'You always win'],
      [Users, 'Five on one record', 'Many agents edit one account at once.', 'One at a time'],
      [Swords, 'Opposite goals', 'One agent cancels while another upgrades.', 'Waits, then re-checks'],
    ],
  },
  {
    name: 'Saying “done” when it isn’t',
    items: [
      [FileCheck2, 'Never happened', 'The tool said OK. The app has nothing.', 'Proves it in the app'],
      [TriangleAlert, 'Half done', 'Charged the card; the deal never closed.', 'Flags it as an incident'],
      [Workflow, 'Runaway swarm', 'One task fans out to forty agents.', 'Slows it at your limit'],
    ],
  },
];

export function Catalog() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {groups.map((g, gi) => (
        <motion.div key={g.name} {...rise(gi)} className="rounded-3xl bg-white border border-lm-line p-5 sm:p-6">
          <div className="text-sm font-semibold text-lm-accent mb-4">{g.name}</div>
          <div className="divide-y divide-lm-line">
            {g.items.map(([Icon, title, example, fix]) => (
              <div key={title} className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0">
                <span className="w-9 h-9 shrink-0 rounded-xl bg-lm-wash flex items-center justify-center">
                  <Icon className="w-[18px] h-[18px] text-lm-ink" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <span className="font-semibold text-[15px]">{title}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-lm-soft px-2.5 py-0.5 text-xs font-semibold text-lm-accent">
                      {fix}
                    </span>
                  </div>
                  <p className="text-sm text-lm-ink2 mt-0.5">{example}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// What a workspace gets, beyond stopping mistakes.
const features = [
  [Eye, 'Watch before you trust', 'Starts by only watching: see what it would stop, with nothing blocked.'],
  [Hand, 'Approvals', 'Risky actions wait for a person. Approve from the console.'],
  [FileCheck2, 'Proof', 'Reads the result back from the app, so “done” means done.'],
  [Siren, 'Incidents', 'Half-finished work is caught and laid out for you to fix.'],
  [Gauge, 'Limits', 'Set a daily spend limit. Lumni slows agents down when it’s reached.'],
  [BellRing, 'Alerts', 'Slack and email when something needs you.'],
  [Receipt, 'A record of everything', 'Every action, every decision, and why, searchable.'],
  [GitMerge, 'Works with your stack', 'LangGraph, OpenAI Agents, Temporal, MCP, or plain code.'],
];

export function Features() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-lm-line bg-lm-line">
      {features.map(([Icon, title, text], i) => (
        <motion.div key={title} {...rise(i % 4)} className="bg-white p-6">
          <Icon className="w-5 h-5 text-lm-accent mb-4" />
          <div className="font-semibold">{title}</div>
          <p className="text-sm text-lm-ink2 mt-1 leading-relaxed">{text}</p>
        </motion.div>
      ))}
    </div>
  );
}
