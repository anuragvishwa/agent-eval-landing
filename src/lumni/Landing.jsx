import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Copy, Eye, Github, Play, Plus, ShieldCheck, Terminal } from 'lucide-react';
import { AgentTimeline, STEPS } from './AgentTimeline';
import { Catalog, Features } from './Catalog';
import { SkillCommand, SkillInstall } from './SkillInstall';
import {
  GITHUB_URL, NPM_URL, PRIVACY_URL, SELF_HOST_URL, SIGNIN_URL, SIGNUP_URL, TERMS_URL, TRY_COMMAND,
} from '../lib/links';

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.06 },
});

export function Landing() {
  const film = useRef(null);
  // The hero's "watch the film" scrolls to it and plays it.
  const playFilm = () => {
    const v = film.current;
    if (!v) return;
    v.scrollIntoView({ behavior: 'smooth', block: 'center' });
    v.play().catch(() => {});
  };
  return (
    <div className="min-h-screen bg-lm-paper text-lm-ink font-display antialiased selection:bg-lm-soft">
      <Nav />
      <main>
        <Hero onFilm={playFilm} />
        <Film videoRef={film} />
        <Skill />
        <Why />
        <Catches />
        <How />
        <Console />
        <Pricing />
        <Faq />
        <End />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- pieces ---------- */

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <span className="w-7 h-7 rounded-lg bg-lm-accent flex items-center justify-center">
        <span className="w-2.5 h-2.5 rounded-full bg-lm-pop" />
      </span>
      <span className="text-[17px] font-semibold tracking-tight">Lumni</span>
    </a>
  );
}

function Primary({ children, href = SIGNUP_URL, className = '' }) {
  return (
    <a href={href} className={`inline-flex items-center gap-2 rounded-full bg-lm-ink px-5 py-3 text-[15px] font-medium text-white hover:bg-black transition-colors ${className}`}>
      {children}
    </a>
  );
}

function CopyCommand({ command }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* still selectable */ }
  };
  return (
    <button type="button" onClick={copy} className="group inline-flex items-center gap-3 rounded-full border border-lm-line2 bg-white pl-4 pr-3 py-2.5 font-mono text-[13px] hover:border-lm-ink3">
      <span><span className="text-lm-ink3">$</span> {command}</span>
      {copied ? <Check className="w-4 h-4 text-lm-allow" /> : <Copy className="w-4 h-4 text-lm-ink3 group-hover:text-lm-ink" />}
    </button>
  );
}

function Heading({ kicker, title, lead, center }) {
  return (
    <motion.div {...rise()} className={`max-w-2xl mb-12 ${center ? 'mx-auto text-center' : ''}`}>
      {kicker && <div className="text-sm font-semibold text-lm-accent mb-3">{kicker}</div>}
      <h2 className="text-[34px] sm:text-[44px] font-semibold tracking-[-0.035em] leading-[1.08]">{title}</h2>
      {lead && <p className="mt-4 text-lg text-lm-ink2 leading-relaxed">{lead}</p>}
    </motion.div>
  );
}

/* ---------- nav ---------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'bg-white/85 backdrop-blur border-b border-lm-line' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8 text-[15px] text-lm-ink2">
          <a href="#catches" className="hover:text-lm-ink">What it catches</a>
          <a href="#how" className="hover:text-lm-ink">How it works</a>
          <a href="#pricing" className="hover:text-lm-ink">Pricing</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-lm-ink"><Github className="w-4 h-4" /> GitHub</a>
        </div>
        <div className="flex items-center gap-4">
          <a href={SIGNIN_URL} className="hidden sm:block text-[15px] text-lm-ink2 hover:text-lm-ink">Sign in</a>
          <a href={SIGNUP_URL} className="rounded-full bg-lm-ink px-4 py-2 text-sm font-medium text-white hover:bg-black">Start free</a>
        </div>
      </div>
    </nav>
  );
}

/* ---------- hero ---------- */

function Hero({ onFilm }) {
  const [step, setStep] = useState(0);
  const seek = useRef(null);
  const intro = (d) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });
  return (
    <section className="relative bg-[#f7f7f8] pt-24 sm:pt-28 pb-14 sm:pb-20 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-[minmax(340px,440px)_minmax(0,760px)] gap-10 lg:gap-14 items-center justify-between">
        <div>
          <motion.button
            type="button"
            onClick={onFilm}
            {...intro(0)}
            className="inline-flex items-center gap-2 rounded-full border border-lm-line bg-white pl-1.5 pr-3.5 py-1.5 text-sm text-lm-ink2 hover:text-lm-ink mb-6"
          >
            <span className="rounded-full bg-lm-pop px-2 py-0.5 text-xs font-semibold text-lm-ink">Live</span>
            Watch the 40s film <Play className="w-3 h-3 fill-current" />
          </motion.button>
          <motion.h1 {...intro(0.05)} className="text-[40px] sm:text-[52px] font-semibold tracking-[-0.045em] leading-[1.03]">
            AI agents that don’t step on each other.
          </motion.h1>
          <motion.p {...intro(0.1)} className="mt-5 text-lg text-lm-ink2 leading-relaxed">
            Lumni checks every action before it runs. No double refunds, no stale writes, no surprises.
          </motion.p>
          <motion.div {...intro(0.15)} className="mt-7 flex flex-wrap items-center gap-3">
            <Primary>Start free <ArrowRight className="w-4 h-4" /></Primary>
            <CopyCommand command={TRY_COMMAND} />
          </motion.div>
          <motion.p {...intro(0.2)} className="mt-3 text-sm text-lm-ink3">
            <code className="font-mono text-lm-ink2">try</code> runs sample agents in a sample workspace of your own, so you see Lumni catch real mistakes. Then <code className="font-mono text-lm-ink2">npx lumniverse init</code> connects your agent.
          </motion.p>

          <motion.ol {...intro(0.25)} className="hidden lg:block mt-10 space-y-1">
            {STEPS.map((s, i) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => seek.current?.(i)}
                  className={`w-full text-left rounded-xl px-3 py-2 transition-colors ${i === step ? 'bg-white shadow-sm ring-1 ring-lm-accentline' : 'hover:bg-white/60'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 shrink-0 rounded-full text-[11px] font-semibold flex items-center justify-center ${i === step ? 'bg-lm-accent text-white' : 'bg-lm-wash text-lm-ink3'}`}>{i + 1}</span>
                    <span className={`text-[15px] font-semibold ${i === step ? 'text-lm-ink' : 'text-lm-ink3'}`}>{s.label}</span>
                  </div>
                  {i === step && <p className="mt-0.5 pl-[30px] text-sm text-lm-ink2">{s.text}</p>}
                </button>
              </li>
            ))}
          </motion.ol>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="min-w-0">
          <AgentTimeline onStep={setStep} seekRef={seek} />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- why ---------- */

function Why() {
  const points = [
    ['They can’t see each other.', 'Each agent works from its own context. Two of them will happily refund the same order, answer the same email, or edit the same account at once.'],
    ['They act on old information.', 'An agent reads a price, thinks for a minute, then writes. If anything changed in between, it overwrites the newer truth.'],
    ['They say “done” too easily.', 'A tool call returned OK, so the agent moves on. Whether the refund, the email or the deal actually exists in the app is anyone’s guess.'],
  ];
  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
        <motion.div {...rise()}>
          <div className="text-sm font-semibold text-lm-accent mb-3">Why Lumni</div>
          <h2 className="text-[34px] sm:text-[48px] font-semibold tracking-[-0.035em] leading-[1.06]">
            One agent is a demo. A hundred agents is a company.
          </h2>
          <p className="mt-5 text-lg text-lm-ink2 leading-relaxed">
            The moment you run more than one, you need what every team of people already has: a way to know who is doing what, and a rule that the same thing happens once.
          </p>
        </motion.div>
        <div className="space-y-8">
          {points.map(([t, d], i) => (
            <motion.div key={t} {...rise(i)} className="flex gap-5">
              <span className="font-mono text-sm text-lm-ink3 pt-1">0{i + 1}</span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{t}</h3>
                <p className="mt-2 text-lm-ink2 leading-relaxed">{d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- what it catches ---------- */

function Catches() {
  return (
    <section id="catches" className="bg-[#f7f7f8] py-20 sm:py-28 px-5 sm:px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <Heading center kicker="What Lumni catches" title="Twelve ways agents go wrong, and what Lumni does about each." />
        <Catalog />
        <div className="mt-20 sm:mt-28">
          <Heading center kicker="What you get" title="Everything you need to let agents act on their own." />
          <Features />
        </div>
      </div>
    </section>
  );
}

/* ---------- how ---------- */

function How() {
  const steps = [
    [Eye, 'See it work', <>Sample agents make real mistakes in a sample workspace while Lumni catches them. <code className="block mt-1 font-mono text-[13px] text-lm-ink"><span className="text-lm-ink3">$</span> npx lumniverse try</code></>],
    [Terminal, 'Connect your agent', <>In your agent’s folder. It starts by only watching: nothing is blocked. <code className="block mt-1 font-mono text-[13px] text-lm-ink"><span className="text-lm-ink3">$</span> npx lumniverse init</code></>],
    [ShieldCheck, 'Protect', 'Turn it on, per action, when the record shows it only stops real problems.'],
  ];
  return (
    <section id="how" className="py-20 sm:py-28 px-5 sm:px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Heading kicker="How it works" title="See it work, then connect your agent." lead="No new framework and no rewrite. Wrap the calls that change things: refunds, emails, CRM writes. Leave the rest alone." />
          <div className="-mt-4 space-y-3">
            {steps.map(([Icon, t, d], i) => (
              <motion.div key={t} {...rise(i)} className="flex items-center gap-4 rounded-2xl bg-[#f7f7f8] px-4 py-4">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-white border border-lm-line text-lm-ink flex items-center justify-center"><Icon className="w-5 h-5" /></span>
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-lm-ink2 text-[15px]">{d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div {...rise(1)} className="rounded-2xl bg-lm-ink text-[#e7e7ee] shadow-xl overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" /><span className="w-2.5 h-2.5 rounded-full bg-white/20" /><span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="ml-3 font-mono text-xs text-white/50">refund.ts</span>
          </div>
          <pre className="p-5 sm:p-6 font-mono text-[13px] sm:text-sm leading-7 overflow-x-auto">
<span className="text-[#b9b2ff]">const</span> d = <span className="text-[#b9b2ff]">await</span> lumni.<span className="text-lm-pop">checkAction</span>({'{'}{'\n'}
{'  '}work_id: ticket.id,{'\n'}
{'  '}actor_id: <span className="text-[#9be7b0]">'support-agent'</span>,{'\n'}
{'  '}operation: <span className="text-[#9be7b0]">'stripe.refund'</span>,{'\n'}
{'  '}effect_key: <span className="text-[#9be7b0]">{'`refund:${order.id}`'}</span>,{'\n'}
{'}'}){'\n'}
<span className="text-[#b9b2ff]">if</span> (<span className="text-lm-pop">shouldExecute</span>(d)) {'{'}{'\n'}
{'  '}<span className="text-[#b9b2ff]">await</span> stripe.refunds.create({'{'} charge {'}'}){'\n'}
{'}'}
          </pre>
          <div className="px-5 sm:px-6 py-3 border-t border-white/10 text-xs text-white/50">
            TypeScript · Python · Go · LangGraph, OpenAI Agents, Temporal and MCP adapters · Apache-2.0
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- film ---------- */

function Film({ videoRef }) {
  return (
    <section id="film" className="bg-[#f7f7f8] pb-16 sm:pb-24 px-5 sm:px-6 scroll-mt-16">
      <motion.div {...rise()} className="max-w-5xl mx-auto">
        <div className="rounded-[20px] border border-[#ececf0] bg-white p-2 shadow-[0_30px_80px_-40px_rgba(40,30,120,0.35)]">
          <video
            ref={videoRef}
            className="w-full rounded-[14px] aspect-video bg-lm-ink"
            src="/lumni/lumni-film.mp4"
            poster="/lumni/film-poster.webp"
            controls
            playsInline
            preload="metadata"
          />
        </div>
        <p className="mt-4 text-center text-sm text-lm-ink3">Lumni in 40 seconds: the problems, the console, and how to try it.</p>
      </motion.div>
    </section>
  );
}

/* ---------- skill ---------- */

function Skill() {
  const agents = ['Claude Code', 'Cursor', 'Codex', 'GitHub Copilot', 'Gemini CLI', 'Amp', 'Cline', 'OpenCode', 'Zed', 'Warp'];
  return (
    <section id="skill" className="py-20 sm:py-28 px-5 sm:px-6 scroll-mt-16 border-t border-lm-line">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div {...rise()}>
          <div className="text-sm font-semibold text-lm-accent mb-3">Or let your coding agent do it</div>
          <h2 className="text-[34px] sm:text-[44px] font-semibold tracking-[-0.035em] leading-[1.08]">
            One command teaches your coding agent Lumni.
          </h2>
          <p className="mt-4 text-lg text-lm-ink2 leading-relaxed">
            Install the Lumni skill, then ask: “add Lumni to the refund step”. It knows which calls to wrap, how to name the effect so it happens once, and how to handle every decision.
          </p>
          <div className="mt-7">
            <SkillCommand />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {agents.map((a) => (
              <span key={a} className="rounded-full border border-lm-line bg-white px-3 py-1 text-sm text-lm-ink2">{a}</span>
            ))}
          </div>
          <p className="mt-5 text-sm text-lm-ink3">
            Claude Code: <code className="font-mono text-lm-ink2">/plugin marketplace add lumnihq/lumni</code>. For LLMs: <a href="/llms.txt" className="underline underline-offset-2 hover:text-lm-ink">llms.txt</a>
          </p>
        </motion.div>
        <motion.div {...rise(1)}>
          <SkillInstall />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- console ---------- */

const screens = [
  { key: 'today', label: 'Today', src: '/lumni/today.webp', text: 'What your agents did, what Lumni stopped, and the money it kept.' },
  { key: 'flow', label: 'Flow', src: '/lumni/flow.webp', text: 'Every action, and the check it went through, as one picture.' },
  { key: 'needs-you', label: 'Needs you', src: '/lumni/needs-you.webp', text: 'The few decisions a person should make.' },
  { key: 'incident', label: 'Incidents', src: '/lumni/incident.webp', text: 'What only half happened, and how to fix it.' },
];

function Console() {
  const [active, setActive] = useState(0);
  const s = screens[active];
  return (
    <section id="console" className="bg-[#f7f7f8] py-20 sm:py-28 px-5 sm:px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <Heading center kicker="The console" title="See your whole fleet in one place." />
        <div className="flex justify-center mb-4 overflow-x-auto">
          <div className="inline-flex rounded-full bg-white border border-lm-line p-1">
            {screens.map((x, i) => (
              <button
                key={x.key}
                type="button"
                onClick={() => setActive(i)}
                className={`relative whitespace-nowrap px-3.5 sm:px-5 py-2 rounded-full text-sm font-medium transition-colors ${i === active ? 'text-white' : 'text-lm-ink2 hover:text-lm-ink'}`}
              >
                {i === active && <motion.span layoutId="screen-pill" className="absolute inset-0 rounded-full bg-lm-ink" transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />}
                <span className="relative">{x.label}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="text-center text-lm-ink2 mb-10">{s.text}</p>
        <motion.div {...rise()} className="rounded-[20px] border border-[#ececf0] bg-white shadow-[0_30px_80px_-40px_rgba(40,30,120,0.35)] overflow-hidden">
          <div className="relative aspect-[16/10] bg-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={s.key}
                src={s.src}
                alt={`Lumni console: ${s.label}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </AnimatePresence>
          </div>
        </motion.div>
        <p className="text-center text-sm text-lm-ink3 mt-6">
          Watch your own console fill up: <code className="font-mono text-lm-ink2">npx lumniverse try</code>
        </p>
      </div>
    </section>
  );
}

/* ---------- pricing ---------- */

const plans = [
  { name: 'Trial', price: '$0', unit: 'for 14 days', note: 'No card needed.', items: ['2,000 checks a day', 'Every feature', 'Invite your team'], cta: 'Start the trial', href: SIGNUP_URL },
  { name: 'Team', price: '$49', unit: '/ month', note: '50,000 checks included, then $3 per 1,000.', items: ['Unlimited people and agents', 'Lumni steps in for real', 'Approvals and alerts', 'Cancel anytime'], cta: 'Start free, then subscribe', href: SIGNUP_URL, featured: true },
  { name: 'Self-host', price: 'Free', unit: 'on your servers', note: 'Source available (FSL).', items: ['Docker Compose', 'Your data stays with you', 'Support on request'], cta: 'Read the guide', href: SELF_HOST_URL, external: true },
];

function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 px-5 sm:px-6 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <Heading center kicker="Pricing" title="Simple. You pay for checks." lead="A check is one action an agent asks Lumni about. Everything else is free." />
        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              {...rise(i)}
              className={`flex flex-col rounded-2xl p-7 ${p.featured ? 'bg-lm-ink text-white shadow-2xl md:-my-3' : 'bg-lm-paper border border-lm-line'}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.featured && <span className="rounded-full bg-lm-pop px-2.5 py-0.5 text-xs font-semibold text-lm-ink">Most teams</span>}
              </div>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-5xl font-semibold tracking-tight">{p.price}</span>
                <span className={p.featured ? 'text-white/60' : 'text-lm-ink2'}>{p.unit}</span>
              </div>
              <p className={`mt-2 text-sm ${p.featured ? 'text-white/70' : 'text-lm-ink2'}`}>{p.note}</p>
              <ul className="mt-6 space-y-3 flex-1">
                {p.items.map((it) => (
                  <li key={it} className="flex items-center gap-2.5 text-[15px]">
                    <Check className={`w-4 h-4 shrink-0 ${p.featured ? 'text-lm-pop' : 'text-lm-accent'}`} /> {it}
                  </li>
                ))}
              </ul>
              <a
                href={p.href}
                {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`mt-8 rounded-full px-4 py-3 text-center text-[15px] font-medium transition-colors ${
                  p.featured ? 'bg-lm-accent text-white hover:bg-[#4c3de0]' : 'border border-lm-line2 hover:bg-lm-wash'
                }`}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-lm-ink3 mt-8">
          After the trial without a plan, Lumni keeps watching (500 checks a day) but stops stepping in. Your agents keep running either way.
        </p>
      </div>
    </section>
  );
}

/* ---------- faq ---------- */

const faqs = [
  ['Will Lumni break my agents on day one?', 'No. New workspaces only watch: Lumni records what it would have stopped and lets everything through until you turn protection on.'],
  ['What counts as a check?', 'One call from an agent asking about an action it’s about to take. Reads, dashboards and people using the console are free.'],
  ['Is my data safe?', <>Each workspace is isolated, keys are hashed, and we never sell your data or train on it. Read the <a className="text-lm-accent underline underline-offset-2" href={PRIVACY_URL}>privacy policy</a>.</>],
  ['Is it open source?', 'The SDKs, adapters and CLI are Apache-2.0. The server and console are source available under the FSL and become Apache-2.0 after two years.'],
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#f7f7f8] py-20 sm:py-28 px-5 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Heading center title="Questions" />
        <div className="space-y-3">
          {faqs.map(([q, a], i) => (
            <div key={q} className="rounded-2xl bg-lm-paper border border-lm-line">
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-medium">
                {q}
                <Plus className={`w-5 h-5 shrink-0 text-lm-ink3 transition-transform ${open === i ? 'rotate-45' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                    <p className="px-6 pb-5 -mt-1 text-lm-ink2 leading-relaxed">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- end ---------- */

function End() {
  return (
    <section className="py-24 sm:py-32 px-5 sm:px-6">
      <motion.div {...rise()} className="max-w-3xl mx-auto text-center">
        <h2 className="text-[40px] sm:text-[60px] font-semibold tracking-[-0.045em] leading-[1.02]">
          Give your agents a shared sense of reality.
        </h2>
        <p className="mt-5 text-lg text-lm-ink2">See it catch real mistakes in a minute with sample agents. Then connect yours. No card.</p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Primary>Start free for 14 days <ArrowRight className="w-4 h-4" /></Primary>
          <CopyCommand command={TRY_COMMAND} />
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const links = [
    ['GitHub', GITHUB_URL], ['npm', NPM_URL], ['llms.txt', '/llms.txt'], ['Self-hosting', SELF_HOST_URL], ['Privacy', PRIVACY_URL], ['Terms', TERMS_URL], ['Contact', 'mailto:privacy@lumniverse.com'],
  ];
  return (
    <footer className="border-t border-lm-line py-10 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="text-sm text-lm-ink3">© {new Date().getFullYear()} Chainslice Inc</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-lm-ink2">
          {links.map(([l, h]) => (
            <a key={l} href={h} {...(h.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="hover:text-lm-ink">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
