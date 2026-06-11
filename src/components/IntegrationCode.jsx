import { useState } from 'react';

const frameworks = [
  {
    name: 'LangGraph',
    code: [
      { text: 'from ', color: '' },
      { text: 'lumniverse', color: 'text-secondary' },
      { text: ' import ', color: '' },
      { text: 'monitor', color: 'text-violet-400' },
      { text: '\n', color: '' },
      { text: 'from langgraph.graph import StateGraph\n\n', color: '' },
      { text: '# Wrap your existing compiled graph\n', color: 'text-muted/50' },
      { text: 'graph = StateGraph(AgentState)\n', color: '' },
      { text: 'app = graph.compile()\n\n', color: '' },
      { text: 'monitored_app = ', color: '' },
      { text: 'monitor', color: 'text-violet-400' },
      { text: '(app, project=', color: '' },
      { text: '"my-agent-fleet"', color: 'text-secondary' },
      { text: ')', color: '' },
    ],
  },
  {
    name: 'CrewAI',
    code: [
      { text: 'from ', color: '' },
      { text: 'lumniverse', color: 'text-secondary' },
      { text: ' import ', color: '' },
      { text: 'monitor_crew', color: 'text-violet-400' },
      { text: '\n', color: '' },
      { text: 'from crewai import Crew, Agent, Task\n\n', color: '' },
      { text: 'crew = Crew(agents=[...], tasks=[...])\n\n', color: '' },
      { text: '# One line to add full observability\n', color: 'text-muted/50' },
      { text: 'monitored_crew = ', color: '' },
      { text: 'monitor_crew', color: 'text-violet-400' },
      { text: '(crew, project=', color: '' },
      { text: '"support-team"', color: 'text-secondary' },
      { text: ')', color: '' },
    ],
  },
  {
    name: 'OpenAI Agents',
    code: [
      { text: 'from ', color: '' },
      { text: 'lumniverse', color: 'text-secondary' },
      { text: ' import ', color: '' },
      { text: 'LumniverseMiddleware', color: 'text-violet-400' },
      { text: '\n', color: '' },
      { text: 'from openai import OpenAI\n\n', color: '' },
      { text: 'client = OpenAI()\n', color: '' },
      { text: 'mw = ', color: '' },
      { text: 'LumniverseMiddleware', color: 'text-violet-400' },
      { text: '(client, project=', color: '' },
      { text: '"order-bot"', color: 'text-secondary' },
      { text: ')\n\n', color: '' },
      { text: 'with ', color: '' },
      { text: 'mw', color: 'text-violet-400' },
      { text: ':\n', color: '' },
      { text: '    agent.run(', color: '' },
      { text: '"Process the refund"', color: 'text-secondary' },
      { text: ')', color: '' },
    ],
  },
  {
    name: 'Claude Agent SDK',
    code: [
      { text: 'from ', color: '' },
      { text: 'lumniverse', color: 'text-secondary' },
      { text: ' import ', color: '' },
      { text: 'LumniverseMiddleware', color: 'text-violet-400' },
      { text: '\n', color: '' },
      { text: 'import anthropic\n\n', color: '' },
      { text: 'client = anthropic.Anthropic()\n', color: '' },
      { text: 'client = ', color: '' },
      { text: 'LumniverseMiddleware', color: 'text-violet-400' },
      { text: '(client, project=', color: '' },
      { text: '"support-bot"', color: 'text-secondary' },
      { text: ')\n\n', color: '' },
      { text: '# That\'s it. Full tracing, RCA, and replay.\n', color: 'text-muted/50' },
      { text: 'response = client.messages.create(...)', color: '' },
    ],
  },
  {
    name: 'Anthropic SDK',
    code: [
      { text: 'import ', color: '' },
      { text: 'Anthropic', color: 'text-violet-400' },
      { text: ' from ', color: '' },
      { text: '"@anthropic-ai/sdk"', color: 'text-secondary' },
      { text: '\n', color: '' },
      { text: 'import { ', color: '' },
      { text: 'lumniverse', color: 'text-secondary' },
      { text: ' } from ', color: '' },
      { text: '"lumniverse"', color: 'text-secondary' },
      { text: '\n\n', color: '' },
      { text: 'const client = lumniverse(\n', color: '' },
      { text: '  new Anthropic(),\n', color: '' },
      { text: '  { project: ', color: '' },
      { text: '"my-agent"', color: 'text-secondary' },
      { text: ' }\n', color: '' },
      { text: ')', color: '' },
    ],
  },
];

export function IntegrationCode() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="integration" className="py-24 bg-background/80">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary mb-4 block">
            Integration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-4">
            Drops into the agent framework you already use.
          </h2>
          <p className="text-lg text-muted">
            Add Lumniverse in 3 lines. No changes to your agent code.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {frameworks.map((fw, i) => (
            <button
              key={fw.name}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all duration-200 border ${
                i === activeTab
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-transparent text-muted border-border hover:border-muted'
              }`}
            >
              {fw.name}
            </button>
          ))}
        </div>

        {/* Code Block */}
        <div className="rounded-xl bg-canvas border border-border overflow-hidden">
          <div className="p-6">
            <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {frameworks[activeTab].code.map((segment, i) => (
                <span key={i} className={segment.color || 'text-foreground'}>
                  {segment.text}
                </span>
              ))}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center font-mono text-xs text-muted">
          Other framework?{' '}
          <a href="#" className="text-secondary hover:underline underline-offset-4">
            Drop us a line.
          </a>
        </p>
      </div>
    </section>
  );
}
