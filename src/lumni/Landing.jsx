import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Copy, Github, Play } from 'lucide-react';
import { AgentTimeline, STEPS } from './AgentTimeline';
import { Art, Shot } from './Art';
import { Catalog } from './Catalog';
import { SkillCommand, SkillInstall } from './SkillInstall';
import {
  GITHUB_URL, NPM_URL, PRIVACY_URL, SELF_HOST_URL, SIGNIN_URL, SIGNUP_URL, TERMS_URL, TRY_COMMAND,
} from '../lib/links';

const rise = (i = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
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
    <div className="min-h-screen bg-[#fbfaf7] text-lm-ink font-display antialiased selection:bg-lm-soft">
      <Nav />
      <main>
        <Hero onFilm={playFilm} />
        <Intro videoRef={film} />
        <GetStarted />
        <Features />
        <Problems />
        <Skill />
        <OpenSource />
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
    <button type="button" onClick={copy} className="group inline-flex items-center gap-3 rounded-full border border-lm-line2 bg-white pl-4 pr-3 py-2.5 font-mono text-[13px] hover:border-lm-ink3 transition-colors">
      <span><span className="text-lm-ink3">$</span> {command}</span>
      {copied ? <Check className="w-4 h-4 text-lm-allow" /> : <Copy className="w-4 h-4 text-lm-ink3 group-hover:text-lm-ink" />}
    </button>
  );
}

function Heading({ kicker, title, lead, center }) {
  return (
    <motion.div {...rise()} className={`max-w-2xl mb-12 sm:mb-14 ${center ? 'mx-auto text-center' : ''}`}>
      {kicker && <div className="text-sm font-semibold text-lm-accent mb-3">{kicker}</div>}
      <h2 className="text-[34px] sm:text-[46px] font-semibold tracking-[-0.035em] leading-[1.06]">{title}</h2>
      {lead && <p className="mt-4 text-lg text-lm-ink2 leading-relaxed">{lead}</p>}
    </motion.div>
  );
}

const Section = ({ id, className = '', children }) => (
  <section id={id} className={`px-5 sm:px-6 py-20 sm:py-28 scroll-mt-16 ${className}`}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

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
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'bg-[#fbfaf7]/85 backdrop-blur border-b border-lm-line' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-7 text-[15px] text-lm-ink2">
          <a href="#product" className="hover:text-lm-ink">Product</a>
          <a href="#skill" className="hover:text-lm-ink">Skill</a>
          <a href="#open-source" className="hover:text-lm-ink">Open source</a>
          <a href="#pricing" className="hover:text-lm-ink">Pricing</a>
          <a href="/llms.txt" className="hover:text-lm-ink">Docs</a>
        </div>
        <div className="flex items-center gap-4">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hidden sm:block text-lm-ink2 hover:text-lm-ink"><Github className="w-5 h-5" /></a>
          <a href={SIGNIN_URL} className="hidden sm:block text-[15px] text-lm-ink2 hover:text-lm-ink">Log in</a>
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
  const intro = (d) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] } });
  return (
    <section className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-[1320px] mx-auto grid lg:grid-cols-[minmax(340px,430px)_minmax(0,820px)] gap-10 lg:gap-14 items-center justify-between">
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
          <motion.h1 {...intro(0.05)} className="text-[42px] sm:text-[56px] font-semibold tracking-[-0.045em] leading-[1.02]">
            AI agents that don’t step on each other.
          </motion.h1>
          <motion.p {...intro(0.1)} className="mt-5 text-lg sm:text-xl text-lm-ink2 leading-relaxed">
            Lumni checks every action before it runs. No double refunds, no stale writes, no surprises.
          </motion.p>
          <motion.div {...intro(0.15)} className="mt-8 flex flex-wrap items-center gap-3">
            <Primary>Start free <ArrowRight className="w-4 h-4" /></Primary>
            <CopyCommand command={TRY_COMMAND} />
          </motion.div>
          <motion.p {...intro(0.2)} className="mt-3 text-sm text-lm-ink3">
            14 days free, no card · Self-hosting is free
          </motion.p>

          <motion.ol {...intro(0.28)} className="hidden lg:block mt-10 space-y-1">
            {STEPS.map((s, i) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => seek.current?.(i)}
                  className={`w-full text-left rounded-xl px-3 py-2 transition-colors ${i === step ? 'bg-white shadow-sm ring-1 ring-lm-line' : 'hover:bg-white/60'}`}
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

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="min-w-0">
          <Art scene="dawn" className="p-3 sm:p-6 lg:p-8">
            <AgentTimeline onStep={setStep} seekRef={seek} />
          </Art>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- intro + film ---------- */

function Intro({ videoRef }) {
  return (
    <Section id="film" className="pt-6 sm:pt-10">
      <Heading
        center
        title="Everything your agents do, in one calm place."
        lead="Lumni sits between your agents and the apps they change. It checks each action before it runs and proves it after, so a hundred agents behave like one careful team."
      />
      <motion.div {...rise(1)}>
        <Art scene="cloud" className="p-3 sm:p-8 max-w-5xl mx-auto">
          <video
            ref={videoRef}
            className="w-full rounded-[14px] aspect-video bg-lm-ink shadow-[0_30px_70px_-30px_rgba(30,20,60,.45)]"
            src="/lumni/lumni-film.mp4"
            poster="/lumni/film-poster.webp"
            controls
            playsInline
            preload="metadata"
          />
        </Art>
      </motion.div>
    </Section>
  );
}

/* ---------- get started: try, then init ---------- */

function GetStarted() {
  const steps = [
    ['See it work', 'Sample agents make real mistakes in a sample workspace of your own, and you watch Lumni catch them.', 'npx lumniverse try'],
    ['Connect your agent', 'In its folder. Lumni starts by only watching: you see what it would stop, and nothing is blocked.', 'npx lumniverse init'],
    ['Protect', 'When the record shows it only stops real problems, turn it on per action. Approvals land in the console.', null],
  ];
  return (
    <Section className="pt-0 sm:pt-0">
      <div className="grid md:grid-cols-3 gap-4">
        {steps.map(([t, d, cmd], i) => (
          <motion.div key={t} {...rise(i)} className="rounded-3xl bg-white ring-1 ring-lm-line p-6 flex flex-col">
            <div className="font-mono text-sm text-lm-ink3">0{i + 1}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight">{t}</div>
            <p className="mt-2 text-[15px] text-lm-ink2 leading-relaxed flex-1">{d}</p>
            {cmd ? (
              <div className="mt-5"><CopyCommand command={cmd} /></div>
            ) : (
              <div className="mt-5 text-sm font-medium text-lm-accent">Settings → Protect</div>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- features: real screens on soft scenes ---------- */

const features = [
  {
    kicker: 'Stops the repeats',
    title: 'Two agents, one refund. Paid once.',
    text: 'When a retry or a second agent tries the same thing, Lumni lets the first through and stops the copy, and shows what each repeat would have cost.',
    points: ['Same payment, same email, same ticket: once', 'Money kept from going out twice, counted for you'],
    shot: '/lumni/today.webp', scene: 'golden', alt: 'Today: repeats stopped and money kept',
  },
  {
    kicker: 'See every action',
    title: 'Every action, and the check it went through.',
    text: 'One picture of your whole fleet: what went straight through, what looked again, what waited its turn, and what Lumni stopped.',
    points: ['Live, as your agents act', 'Click any line to see the action behind it'],
    shot: '/lumni/flow.webp', scene: 'mist', alt: 'Flow: every action and its check',
  },
  {
    kicker: 'Takes turns',
    title: 'People go first. Agents wait their turn.',
    text: 'When an agent and a person, or five agents, reach for the same record, Lumni makes them take turns, and makes an agent re-read anything that changed under it.',
    points: ['No more agents overwriting your fixes', 'Stale reads caught before they’re written'],
    shot: '/lumni/tower.webp', scene: 'meadow', alt: 'Who is working on what',
  },
  {
    kicker: 'Asks you',
    title: 'The few decisions that need a person.',
    text: 'Risky actions, like a refund over your limit, wait for a yes. Approve or reject in one click, with everything you need to decide.',
    points: ['Rules you set: amounts, apps, customers', 'Slack and email when something needs you'],
    shot: '/lumni/needs-you.webp', scene: 'valley', alt: 'Needs you: approvals',
  },
  {
    kicker: 'Proves it',
    title: 'Proof, not promises.',
    text: 'Lumni reads the result back from the app itself, not the agent’s word. When something only half happened, it becomes an incident with what to do next.',
    points: ['“Done” means the app really shows it', 'Half-finished work flagged, with a fix'],
    shot: '/lumni/incident.webp', scene: 'dawn', alt: 'An incident: what only half happened',
  },
];

function Features() {
  return (
    <Section id="product">
      <Heading center kicker="The product" title="Built for teams that let agents act." />
      <div className="space-y-24 sm:space-y-32">
        {features.map((f, i) => (
          <div key={f.title} className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-center">
            <motion.div {...rise()} className={i % 2 ? 'lg:order-2' : ''}>
              <div className="text-sm font-semibold text-lm-accent mb-3">{f.kicker}</div>
              <h3 className="text-[30px] sm:text-[38px] font-semibold tracking-[-0.03em] leading-[1.08]">{f.title}</h3>
              <p className="mt-4 text-[17px] text-lm-ink2 leading-relaxed">{f.text}</p>
              <ul className="mt-6 space-y-2.5">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[15px]">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-lm-accent" /> {p}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...rise(1)} className={i % 2 ? 'lg:order-1' : ''}>
              <Shot src={f.shot} alt={`Lumni console: ${f.alt}`} scene={f.scene} />
            </motion.div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- the twelve problems ---------- */

function Problems() {
  return (
    <Section id="catches" className="bg-[#f4f2ee]">
      <Heading center kicker="What Lumni catches" title="Twelve ways agents go wrong. One place that handles them." />
      <Catalog />
    </Section>
  );
}

/* ---------- skill ---------- */

function Skill() {
  const steps = [
    ['Install the skill', <SkillCommand key="c" />],
    ['Ask your coding agent', '“Add Lumni to the refund step.” Claude Code, Cursor, Codex, Copilot and more.'],
    ['It wires it in', 'It wraps the call, names the effect so it happens once, and handles every decision.'],
    ['Run it', 'Your agent’s actions show up in Flow. Turn on Protect when you trust it.'],
  ];
  return (
    <Section id="skill">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Heading kicker="Meet the Lumni skill" title="Let your coding agent add it." lead="One command teaches the coding agent you already use how to put Lumni in front of your agent's actions." />
          <ol className="-mt-4 space-y-5">
            {steps.map(([t, d], i) => (
              <motion.li key={t} {...rise(i)} className="flex gap-4">
                <span className="w-8 h-8 shrink-0 rounded-full bg-lm-soft text-lm-accent font-semibold text-sm flex items-center justify-center">{i + 1}</span>
                <div className="min-w-0">
                  <div className="font-semibold text-[17px]">{t}</div>
                  <div className="mt-1.5 text-lm-ink2 text-[15px] leading-relaxed">{d}</div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
        <motion.div {...rise(1)}>
          <Art scene="meadow" className="p-4 sm:p-8">
            <SkillInstall />
          </Art>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------- open source ---------- */

const CODE = {
  TypeScript: (
    <>
<span className="text-[#b9b2ff]">const</span> d = <span className="text-[#b9b2ff]">await</span> lumni.<span className="text-lm-pop">checkAction</span>({'{'}{'\n'}
{'  '}actor_id: <span className="text-[#9be7b0]">'support-agent'</span>, work_id: ticket.id,{'\n'}
{'  '}operation: <span className="text-[#9be7b0]">'stripe.refund'</span>,{'\n'}
{'  '}effect_key: <span className="text-[#9be7b0]">{'`refund:${order.id}`'}</span>,{'\n'}
{'}'});{'\n'}
<span className="text-[#b9b2ff]">if</span> (<span className="text-lm-pop">shouldExecute</span>(d)) {'{'}{'\n'}
{'  '}<span className="text-[#b9b2ff]">await</span> stripe.refunds.create({'{'} charge {'}'});{'\n'}
{'}'}
    </>
  ),
  Python: (
    <>
d = lumni.<span className="text-lm-pop">check_action</span>({'{'}{'\n'}
{'    '}<span className="text-[#9be7b0]">"actor_id"</span>: <span className="text-[#9be7b0]">"support-agent"</span>, <span className="text-[#9be7b0]">"work_id"</span>: ticket_id,{'\n'}
{'    '}<span className="text-[#9be7b0]">"operation"</span>: <span className="text-[#9be7b0]">"stripe.refund"</span>,{'\n'}
{'    '}<span className="text-[#9be7b0]">"effect_key"</span>: <span className="text-[#9be7b0]">{'f"refund:{order_id}"'}</span>,{'\n'}
{'}'}){'\n'}
<span className="text-[#b9b2ff]">if</span> <span className="text-lm-pop">should_execute</span>(d):{'\n'}
{'    '}stripe.Refund.create(charge=charge_id)
    </>
  ),
  Go: (
    <>
key := <span className="text-[#9be7b0]">"refund:"</span> + orderID{'\n'}
d, err := client.<span className="text-lm-pop">CheckAction</span>(ctx, protocol.ActionCheckInput{'{'}{'\n'}
{'    '}ActorID: <span className="text-[#9be7b0]">"support-agent"</span>, WorkID: ticketID,{'\n'}
{'    '}Operation: <span className="text-[#9be7b0]">"stripe.refund"</span>, EffectKey: &amp;key,{'\n'}
{'}'}){'\n'}
<span className="text-[#b9b2ff]">if</span> err == nil &amp;&amp; lumni.<span className="text-lm-pop">RequireExecution</span>(d) == nil {'{'}{'\n'}
{'    '}refund(orderID){'\n'}
{'}'}
    </>
  ),
};

function OpenSource() {
  const [lang, setLang] = useState('TypeScript');
  const term = (
    <>
<span className="text-white/40">$</span> git clone https://github.com/lumnihq/lumni{'\n'}
<span className="text-white/40">$</span> cd lumni/deploy &amp;&amp; cp .env.example .env{'\n'}
<span className="text-white/35"># fill in the four secrets in .env</span>{'\n'}
<span className="text-white/40">$</span> docker compose up -d{'\n'}
<span className="text-[#9be7b0]">✔</span> postgres   <span className="text-white/40">healthy</span>{'\n'}
<span className="text-[#9be7b0]">✔</span> lumnid     <span className="text-white/40">started</span>{'\n'}
<span className="text-[#9be7b0]">✔</span> console    <span className="text-white/40">http://localhost:5200</span>
    </>
  );
  return (
    <Section id="open-source" className="bg-lm-ink text-white">
      <motion.div {...rise()} className="max-w-2xl mb-12 sm:mb-14">
        <div className="text-sm font-semibold text-lm-pop mb-3">Open source</div>
        <h2 className="text-[34px] sm:text-[46px] font-semibold tracking-[-0.035em] leading-[1.06]">Yours to read, run and change.</h2>
        <p className="mt-4 text-lg text-white/60 leading-relaxed">Run Lumni on your own servers with Docker Compose, or use the cloud. The SDKs, the CLI and the skill are Apache-2.0.</p>
      </motion.div>
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div {...rise(0)} className="rounded-3xl bg-white/[0.04] ring-1 ring-white/10 p-6 sm:p-7 flex flex-col">
          <div className="text-lg font-semibold">Self-host with Docker Compose</div>
          <p className="mt-1.5 text-[15px] text-white/55">Postgres, the API and the console, on your infrastructure. Your data never leaves.</p>
          <pre className="mt-5 flex-1 rounded-2xl bg-black/40 ring-1 ring-white/10 p-5 font-mono text-[12.5px] sm:text-[13px] leading-7 overflow-x-auto">{term}</pre>
          <a href={SELF_HOST_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-lm-pop hover:underline">Self-hosting guide <ArrowRight className="w-3.5 h-3.5" /></a>
        </motion.div>
        <motion.div {...rise(1)} className="rounded-3xl bg-white/[0.04] ring-1 ring-white/10 p-6 sm:p-7 flex flex-col">
          <div className="text-lg font-semibold">One check before the actions that matter</div>
          <p className="mt-1.5 text-[15px] text-white/55">TypeScript, Python and Go, with adapters for LangGraph, OpenAI Agents, Temporal and MCP.</p>
          <div className="mt-5 inline-flex self-start rounded-full bg-white/5 p-1 ring-1 ring-white/10">
            {Object.keys(CODE).map((l) => (
              <button key={l} type="button" onClick={() => setLang(l)} className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${l === lang ? 'bg-white text-lm-ink' : 'text-white/60 hover:text-white'}`}>{l}</button>
            ))}
          </div>
          <pre className="mt-3 flex-1 rounded-2xl bg-black/40 ring-1 ring-white/10 p-5 font-mono text-[12.5px] sm:text-[13px] leading-7 overflow-x-auto text-[#e7e7ee]">{CODE[lang]}</pre>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-lm-pop hover:underline">Read the code on GitHub <ArrowRight className="w-3.5 h-3.5" /></a>
        </motion.div>
      </div>
      <div className="mt-10 grid sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
        {[
          ['FSL, then Apache-2.0', 'Use, change and self-host it. Every release becomes Apache-2.0 two years after it ships.'],
          ['Open SDKs', 'The SDKs, the CLI, the skill and the examples are Apache-2.0 today.'],
          ['No AI decides', 'Whether an action runs is decided by plain rules you can read, not a model.'],
        ].map(([t, d]) => (
          <div key={t}>
            <div className="font-semibold">{t}</div>
            <p className="mt-1.5 text-sm text-white/55 leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- pricing ---------- */

const plans = [
  {
    name: 'Free',
    tagline: 'See what your agents would get wrong.',
    price: '$0', per: '/mo',
    usage: '500 checks a day, forever',
    cta: 'Get started free', href: SIGNUP_URL,
    lead: 'Includes',
    features: ['Every action checked and recorded', 'Today, Flow and the whole console', 'SDKs, MCP gateway and the Lumni skill', 'Invite your team'],
    limits: ['Watch only: shows what it would stop, never blocks', '500 checks a day'],
  },
  {
    name: 'Team',
    tagline: 'Let Lumni step in.',
    price: '$49', per: '/mo',
    usage: '50,000 checks/mo included · + $3 per 1,000 after',
    cta: 'Start 14-day free trial', href: SIGNUP_URL, featured: true,
    lead: 'Everything in Free, plus',
    features: ['Protect: stops repeats, stale writes and collisions', 'Approvals for risky actions', 'Proof: results read back from the app', 'Slack and email alerts, daily spend limits'],
    limits: ['Unlimited people and agents', 'Cancel anytime'],
  },
  {
    name: 'Enterprise',
    tagline: 'Your servers, your terms.',
    price: 'Custom', per: '',
    usage: 'Volume pricing for large fleets',
    cta: 'Talk to us', href: 'mailto:privacy@lumniverse.com?subject=Lumni%20Enterprise',
    lead: 'Everything in Team, plus',
    features: ['Self-host on your infrastructure', 'Custom limits and terms', 'Priority support and onboarding', 'Help with your security review'],
    limits: ['Your data never leaves (self-hosted)', 'Higher limits to fit your fleet'],
  },
];

function Pricing() {
  return (
    <Section id="pricing">
      <Heading center kicker="Pricing" title="Get started for free." lead="No credit card required. Upgrade when you want Lumni to step in." />
      <div className="grid md:grid-cols-3 gap-4 items-stretch">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            {...rise(i)}
            className={`relative flex flex-col rounded-3xl p-7 bg-white ${p.featured ? 'ring-2 ring-lm-accent shadow-[0_30px_70px_-35px_rgba(91,75,245,.55)]' : 'ring-1 ring-lm-line'}`}
          >
            {p.featured && <span className="absolute -top-3 left-7 rounded-full bg-lm-accent px-3 py-1 text-xs font-semibold text-white">Most teams</span>}
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="mt-1 text-[15px] text-lm-ink2">{p.tagline}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-[44px] font-semibold tracking-[-0.03em] leading-none">{p.price}</span>
              {p.per && <span className="text-lm-ink2">{p.per}</span>}
            </div>
            <p className="mt-2 font-mono text-[12.5px] text-lm-ink2 min-h-[38px]">{p.usage}</p>
            <a
              href={p.href}
              className={`mt-5 rounded-full px-4 py-3 text-center text-[15px] font-medium transition-colors ${p.featured ? 'bg-lm-accent text-white hover:bg-[#4c3de0]' : 'bg-lm-ink text-white hover:bg-black'}`}
            >
              {p.cta}
            </a>
            <div className="mt-7 border-t border-lm-line pt-6 flex-1">
              <div className="text-xs font-semibold uppercase tracking-[0.08em] text-lm-ink3">{p.lead}</div>
              <ul className="mt-3 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14.5px] leading-snug">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-lm-accent" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-xs font-semibold uppercase tracking-[0.08em] text-lm-ink3">Limits</div>
              <ul className="mt-3 space-y-2.5">
                {p.limits.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-lm-ink2">
                    <span className="mt-[7px] w-1.5 h-1.5 shrink-0 rounded-full bg-lm-line2" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 max-w-3xl mx-auto text-center space-y-2 text-sm text-lm-ink2">
        <p><b className="text-lm-ink">One check</b> is one action an agent asks Lumni about before doing it: a refund, an email, a CRM write. Reads, dashboards and people using the console are free.</p>
        <p>Every account starts with 14 days of Team. Running it yourself? <a href={SELF_HOST_URL} target="_blank" rel="noopener noreferrer" className="text-lm-accent underline underline-offset-2">Self-hosting is free</a>. Need a custom deployment? <a href="mailto:privacy@lumniverse.com?subject=Lumni%20Enterprise" className="text-lm-accent underline underline-offset-2">Get in touch</a>.</p>
      </div>
    </Section>
  );
}

/* ---------- faq ---------- */

const faqs = [
  ['Will Lumni break my agents on day one?', 'No. New workspaces only watch: Lumni records what it would have stopped and lets everything through until you turn protection on, per action.'],
  ['What’s the difference between try and init?', <><code className="font-mono text-lm-ink">try</code> runs sample agents in a sample workspace so you can see Lumni catch real mistakes. <code className="font-mono text-lm-ink">init</code> connects your own agent to your real workspace.</>],
  ['What counts as a check?', 'One call from an agent asking about an action it’s about to take. Reads, dashboards and people using the console are free.'],
  ['Does an AI decide what gets stopped?', 'No. Whether an action runs is decided by plain, deterministic rules: the same effect twice, data that changed, someone else on the record, or a rule you set.'],
  ['Is my data safe?', <>Each workspace is isolated, keys are hashed, and we never sell your data or train on it. Read the <a className="text-lm-accent underline underline-offset-2" href={PRIVACY_URL}>privacy policy</a>.</>],
  ['How do I disconnect a machine?', 'Settings → Machines and keys. Each connected machine has a Disconnect button; it’s refused from its next call.'],
];

function Faq() {
  return (
    <Section className="bg-[#f4f2ee]">
      <div className="grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-16">
        <motion.div {...rise()}>
          <h2 className="text-[34px] sm:text-[44px] font-semibold tracking-[-0.035em] leading-[1.06]">Questions</h2>
          <p className="mt-4 text-lm-ink2">Something else? <a className="text-lm-accent underline underline-offset-2" href="mailto:privacy@lumniverse.com">Write to us</a>.</p>
        </motion.div>
        <div className="divide-y divide-lm-line2/70 border-y border-lm-line2/70">
          {faqs.map(([q, a], i) => (
            <motion.div key={q} {...rise(i % 3)} className="grid grid-cols-[2.5rem_1fr] gap-2 py-6">
              <span className="font-mono text-sm text-lm-ink3 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="font-semibold text-[17px]">{q}</div>
                <p className="mt-2 text-lm-ink2 leading-relaxed">{a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- end ---------- */

function End() {
  return (
    <section className="px-5 sm:px-6 py-20 sm:py-28">
      <motion.div {...rise()} className="max-w-6xl mx-auto">
        <Art scene="golden" className="px-6 py-20 sm:py-28 text-center">
          <h2 className="text-[40px] sm:text-[60px] font-semibold tracking-[-0.045em] leading-[1.02] max-w-3xl mx-auto">
            Let your agents act. Once.
          </h2>
          <p className="mt-5 text-lg text-lm-ink2 max-w-xl mx-auto">See it catch real mistakes in a minute with sample agents. Then connect yours.</p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Primary>Start free <ArrowRight className="w-4 h-4" /></Primary>
            <CopyCommand command={TRY_COMMAND} />
          </div>
        </Art>
      </motion.div>
    </section>
  );
}

function Footer() {
  const cols = [
    ['Product', [['The product', '#product'], ['Pricing', '#pricing'], ['The film', '#film'], ['Log in', SIGNIN_URL]]],
    ['Open source', [['GitHub', GITHUB_URL], ['Self-hosting', SELF_HOST_URL], ['License (FSL)', `${GITHUB_URL}/blob/main/LICENSE`]]],
    ['Developers', [['The Lumni skill', '#skill'], ['llms.txt', '/llms.txt'], ['npm: lumniverse', NPM_URL], ['SDKs', `${GITHUB_URL}/blob/main/docs/sdk.md`]]],
    ['Company', [['Privacy', PRIVACY_URL], ['Terms', TERMS_URL], ['Contact', 'mailto:privacy@lumniverse.com']]],
  ];
  return (
    <footer className="border-t border-lm-line px-5 sm:px-6 pt-14 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-lm-ink2 leading-relaxed max-w-xs">Lumni checks every action your AI agents take, so each one happens once, the way you meant, and is proven after.</p>
          </div>
          {cols.map(([t, links]) => (
            <div key={t}>
              <div className="text-sm font-semibold mb-3">{t}</div>
              <ul className="space-y-2.5">
                {links.map(([l, h]) => (
                  <li key={l}>
                    <a href={h} {...(h.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="text-sm text-lm-ink2 hover:text-lm-ink">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-lm-line flex flex-col sm:flex-row gap-3 justify-between text-sm text-lm-ink3">
          <span>© {new Date().getFullYear()} Chainslice Inc · Lumni</span>
          <span className="flex items-center gap-5">
            <a href="mailto:privacy@lumniverse.com" className="hover:text-lm-ink">privacy@lumniverse.com</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-lm-ink"><Github className="w-4 h-4" /></a>
          </span>
        </div>
      </div>
    </footer>
  );
}
