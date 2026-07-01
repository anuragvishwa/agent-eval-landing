# Lumni Payment Outcome Assurance — End-to-End Plan + GTM

> **What this is:** the spec + go-to-market for Lumni's $2k–$8k/mo defensible wedge —
> proving whether a money-touching agent's *claim* actually happened by joining two read-only
> sources: (1) what the agent/customer conversation **claimed**, and (2) what the payment
> gateway (Stripe) says **actually happened** — then blocking the false-success from shipping
> again. Complex, urgent, and not vibe-codeable internally.

---

## 1. Thesis & Context

The current Lumni surface (trace-only detectors, RCA dashboard, trace/cost views) is a
strong free *teardown* and lead-gen asset, but it is largely reproducible by a competent
internal team in days and overlaps with LangSmith / Langfuse / Helicone / Braintrust. It
will not sustain a $2k–$8k/mo price on its own.

**The wedge that will:** prove whether a money-touching agent's *claim* actually happened,
by reading the payment gateway (Stripe first), inside the agent-reliability loop — then
auto-generate a regression case and **block the false-success from shipping again**.

**One-line manifesto** (borrowed from the IMF's 2026 framing): *keep the probabilistic
agent's claims separate from deterministic payment reality, and prove the two match.*

**Killer line:** *"Your agent said it refunded the customer. Lumni reads Stripe and proves
whether it actually happened — and blocks the lie from shipping again."*

Why this clears all four bars:
- **Complex / not vibe-codeable** — claim↔reality reconciliation (entity resolution, async
  settlement, duplicates, wrong-object, partial effects, time windows) + maintained
  read-only connectors + deterministic replay + the regression/gate loop. The happy path is
  a weekend script; the 30% of edge cases + the loop is months and improves with a corpus.
- **Urgent now** — money/customer-facing agents shipped to prod through 2025–26; the first
  wave of "the agent lied and we can't prove what it did" incidents is hitting finance and
  compliance desks this quarter. GTM already cites 132 fake refunds and 23% wrong checkout
  flows.
- **Worth $2k–$8k/mo** — framed as financial liability + recovered dollars, not features. One
  prevented fake-refund batch or one blocked bad release pays for a year.
- **Defensible loop competitors lack** — `claim → readback verdict → auto-regression →
  replay candidate → BLOCK in CI`. Observability stops at the trace; LaunchDarkly judges
  "is the output good"; reconciliation tools reconcile books, not agent claims. Only Lumni
  owns both ends.

---

## 2. Product — End to End

### 2.1 What it does — and why it's two-sided
Any agent that moves money makes claims: *"refund processed," "subscription canceled,"
"$240 charged," "payout sent."* For each claim, Lumni resolves it to a Stripe object, reads
the truth, reconciles, and emits a verdict.

**Critical architecture point: Stripe-only cannot detect false-success.** Stripe tells you a
refund/charge/cancellation exists or doesn't — it never tells you the agent *claimed* it did.
False-success lives in the *gap* between a claim and the truth, so every verdict must join a
**claim source** (what was promised) to a **truth source** (what really happened):

| Claim source (what was promised) | Truth source (what really happened) |
|---|---|
| Agent trace / tool calls (Lumni ingest) | Stripe refund / charge / subscription state |
| Zendesk / Intercom / Gorgias ticket transcript | Stripe state |
| Gmail / support email | Stripe state |
| CRM / support note | Stripe state |
| Chat transcript | Stripe state |

**Two claim-source modes — pick by how the customer is instrumented:**
- **Trace mode (richest).** Claim = the ingested agent run/steps. Required for the full loop
  (ties a failure to a specific agent version → regression → replay → CI gate). Needs agent
  instrumentation, so it's a heavier onboarding.
- **Transcript mode (zero-instrumentation, fastest teardown).** Claim = historical
  support/comms records that already contain the promises ("we've processed your refund").
  No code change — connect Zendesk/Intercom/Gorgias/Gmail/CRM read-only + Stripe read-only and
  reconcile 30 days of history immediately. This is the right **cold diagnostic** path, and it
  **widens the ICP**: many "agents" live *inside* a support tool (Zendesk AI, Intercom Fin)
  with no separate trace to instrument — transcript mode is the only way to verify them.

**The new hard part both modes share — the cross-system join.** Matching a ticket/email claim
to a Stripe object needs an entity key (customer email, order id, charge id in the thread).
Entity resolution across systems is where transcript-mode reconciliation earns its keep — and
where `unverifiable` (no join key) must be reported honestly rather than guessed.

### 2.2 Verdict taxonomy (keep v1 simple)
v1 ships **six verdicts** — answering the only question an early buyer cares about: *did the
agent lie about money or not?* Keep it this simple until customers trust the product.

| Verdict (v1) | Meaning |
|---|---|
| `verified` | Claim matches a real Stripe record (object, amount, customer, window). |
| `false_success` | Agent claimed success; no matching Stripe record exists. |
| `duplicate` | Refund/charge executed twice (idempotency failure). |
| `mismatch` | Right action, wrong customer or wrong amount. |
| `pending` | Initiated but not settled; agent reported done early. |
| `unverifiable` | No identifier to reconcile — reported honestly as a coverage gap. |

**Deferred to v2 (only after trust is earned):** finer granularity such as
`unconfirmed_success` (happened but the agent never verified — a latent near-miss) and
splitting `mismatch` into `wrong_object` vs `wrong_amount`. Useful, but they confuse early
buyers, so hide them in v1.

### 2.3 Pipeline
```
claim source (trace OR ticket / email / chat / CRM)      truth source (Stripe)
        │                                                        │
        └────────────► claim extraction ◄────────────────────────┘
              → entity resolution   (join claim ↔ Stripe object: email / order / charge id)
              → readback            (Stripe API or webhook event)
              → reconciliation      (amount · time window · idempotency · dedup · wrong-object)
              → verdict             (taxonomy above; suspicion/confidence score)
              → on failure: Failure record + SignalCluster + auto-regression case + alert + gate
```

### 2.4 Reconciliation engine (the hard, defensible core)
- **Claim extraction** — pull amount, action verb, object type, customer/identifier from the
  claim source: in trace mode the final agent message + tool-call args/results; in transcript
  mode the ticket/email/chat body. Reuse the word-boundary verb matching already in
  `backend/internal/detect/detect.go` (`containsWord`).
- **Entity resolution (cross-system)** — find the join key (customer email, order id, charge
  id in the thread) and map the claim to a Stripe object via idempotency key, metadata,
  customer id, amount+window heuristics. Handle the multi-step case (PaymentIntent → Refund).
  No join key → `unverifiable`, reported honestly. This cross-system match is the hardest and
  most defensible part in transcript mode.
- **Reconciliation checks** — exact and fuzzy: amount tolerance, time window for async
  settlement, duplicate detection across the window, wrong-customer/wrong-object detection,
  partial/pending state.
- **Confidence score** — reuse the 0–100 `SuspicionScore` pattern on `domain.Failure`.

### 2.5 Reuse of existing machinery (do NOT rebuild)
| Need | Reuse |
|---|---|
| Claim source — trace mode | existing run/step ingest (`/v1/ingest/runs`) |
| Claim source — transcript mode | new read-only connectors: Zendesk / Intercom / Gorgias / Gmail / CRM |
| Failure record + score + detector key | `domain.Failure` (`SuspicionScore`, `DetectorKey`) |
| Grouping repeated verdicts | `SignalCluster` clustering in `service/service.go` |
| Regression case from a failure | existing regression-test machinery (`/regression-tests`) |
| Replay candidate fix in sandbox | `cmd/replay-runner` + `cmd/replay-adapter` (sdk-native, langgraph) |
| CI gate / release block | `/ci-gate`, `/release-verification` frontend + gate logic |
| Verdict UI (already scaffolded) | `/outcome-assurance`, `/verdicts`, `/connectors` |
| Job orchestration | River jobs; add a `verify_outcome` job type |
| Blob storage of evidence | existing `blob/` (MinIO/S3) |

This wedge is mostly a **new connector + reconciliation engine + a verdict job**, wired into
the Failure/cluster/regression/replay loop that already exists.

### 2.6 Stripe scopes & connection
- **Read-only Restricted API key** — scopes: Charges, Refunds, PaymentIntents, Disputes,
  Payouts (read); Customers (read, entity matching); Events (read, webhooks). **No write
  scope is ever required — Lumni can structurally never move money.** Lead with this.
- **Webhooks** (`charge.refunded`, `refund.created`, `payout.paid`, …) for real-time
  reconciliation instead of polling.
- **Stripe Connect / OAuth** only if multi-account / platform model is needed later.
- **Claim-source connectors are also read-only** — Zendesk/Intercom/Gorgias/Gmail/CRM granted
  read scopes on conversations/tickets/messages only. Same "we can never change anything"
  trust posture as Stripe; reinforce it for every connector.

### 2.7 Onboarding ladder (defuse the trust ask, low → high access)
Live read-only access to *both* Stripe and a support tool is a big ask. Climb the ladder —
close the first conversations on the lowest rung, then earn access:

- **Path A — synthetic seeded demo.** Lumni's own data with planted mismatches. Zero customer
  access. Shows the verdict + exposure report in the first call.
- **Path B — customer export (the fast wedge).** Customer drops ~100 tickets/conversations +
  a Stripe CSV export. No live credentials, no security review — runs the real two-sided
  teardown on *their* data same-day. This is how to close the first few deals before asking
  for live access.
- **Path C — read-only connectors.** One claim source + Stripe, both read-only API keys.
  ~5-minute setup; continuous verification turns on. Best for startups post-pilot.
- **Path D — in-VPC verifier.** Lumni ships a verifier that runs in the customer's
  environment; credentials never leave their network, **only the verdict** (object ids +
  true/false + score) is sent to Lumni. Unlocks finance/regulated buyers; itself a
  differentiator.

### 2.8 Compliance posture
- Financial transaction data + customer PII (email, last4). PCI scope largely avoided
  (Stripe tokenizes PANs; Lumni never sees card numbers).
- **SOC 2 Type II is table stakes** once finance is involved — start the roadmap early.
- Store **identifiers + verdicts only**, not full payloads (reuse the redaction approach
  already in the public playground).

### 2.9 Build sequence (thin slice → moat)
1. **M1 — Diagnostic teardown (two-sided, zero-instrumentation).** Connect **one claim source
   + Stripe**, both read-only. Default cold path = **transcript mode**:
   Zendesk/Intercom/Gorgias (or Gmail/CRM) read-only + Stripe read-only → extract
   refund/cancellation/payment claims from 30 days of transcripts → entity-resolve to Stripe →
   exposure report ("N false-success refunds, M duplicates, ~$X exposure, K unverifiable").
   Trace mode is the same pipeline when the customer already ingests traces. **Stripe-only is
   not a valid M1** — with no claim side it cannot detect false-success. No persistence beyond
   verdicts. This is the demo + the paid-pilot hook.
2. **M2 — Continuous verification (both modes).** `verify_outcome` River job fires on **either**
   a new ingested agent run **or** a new support conversation/ticket/email containing a money
   claim; verdicts → Failure + SignalCluster; alerts (Slack). The transcript trigger is often
   the more valuable wedge — e.g. a new Gorgias ticket says *"Refund processed,"* Lumni checks
   Stripe, finds no matching refund, and alerts support/finance **before the ticket is
   closed** — without waiting for full trace integration.
3. **M3 — Outcome of a failure depends on the mode** (see §2.10). Trace mode →
   auto-generate a regression case from each `false_success` and wire into `/ci-gate` so a
   candidate agent version that reproduces it is blocked. Transcript mode → failure report +
   policy assertion + QA checklist + vendor/config fix.
4. **M4 — Replay (trace mode only).** Re-run the failing trace against a candidate fix in the
   replay-adapter sandbox; prove the fix before it ships.
5. **M5 — In-VPC verifier + SOC 2** for enterprise/finance buyers.
6. **M6 — Second gateway** (see §3 ranking): Google Calendar / Adyen / Braintree / Razorpay.

### 2.10 Failure outputs by mode (regression/replay/gate is trace-only)
The full `regression → replay → CI gate` loop requires the agent trace **and control of the
agent runtime**. In transcript mode you often do *not* control the runtime — the "agent"
lives inside Zendesk AI / Intercom Fin / Gorgias — so the output is different:

| Mode | Output on a `false_success` |
|---|---|
| **Trace mode** | Regression test + replay verification + CI/release gate that blocks the bad version. |
| **Transcript mode** | Failure report + **policy assertion** + QA checklist + vendor/config fix recommendation. |

**Example.** Transcript failure: *"Refund processed"* with no Stripe refund →
generated policy: *"Support AI must not say 'refund processed' unless a matching `refund_id`
exists in Stripe."* If the customer later instruments the agent (moves to trace mode), that
same policy becomes an enforceable regression gate — a natural upsell path.

### 2.11 Verification (how to test end-to-end)
- Unit: reconciliation engine against fixtures for each verdict (mirror
  `detect/detect_test.go`).
- Integration: Stripe **test mode** — create refunds/charges, craft traces that
  truthfully/falsely claim them, assert verdicts.
- E2E (trace mode): ingest a synthetic run with a `false_success` refund → assert Failure
  created, SignalCluster formed, regression case generated, CI gate blocks a replayed
  candidate.
- E2E (transcript mode): feed a sample ticket "Refund processed" + a Stripe test account with
  no matching refund → assert `false_success` verdict, alert fired, policy assertion + QA
  checklist generated (no replay/gate).
- Demo dry-run: Path A seeded data and Path B (sample tickets + Stripe CSV) both produce the
  exposure report in `/outcome-assurance` and `/verdicts`.

---

## 3. Payment-gateway / connector ranking

1. **Stripe (refunds/charges)** — START HERE. Highest liability, near-binary verdict
   (record exists + amount matches; idempotency native), best demo, lowest build cost.
   Validate the reconciliation engine on the cleanest ground.
2. **Google Calendar (bookings)** — fast-follow for the voice-agent ICP (Retell/Vapi
   appointment booking); near-binary verdict; OAuth is the main friction.
3. **Adyen / Braintree-PayPal / Square / Razorpay** — same pattern, broadens TAM by
   geography/vertical once the engine is proven.
4. **Salesforce / CRM** — expand into, do not start. Highest ACV but fuzziest verdict
   (which field/value = success?), heaviest integration, longest cycle. Wrong place to
   debut the reconciliation layer.

**Ordering logic:** prove the hard claim↔reality engine on the cheapest/cleanest/most urgent
verdict (Stripe), then widen toward fuzzier records as it matures.

---

## 4. Competition & positioning

| Layer | Players | Why they're not you |
|---|---|---|
| Agent observability/eval | LangSmith, Langfuse, Helicone, Braintrust, Future AGI | See the trace, never read the system of record. Verify vs datasets/judges, not Stripe. |
| Agent runtime control | LaunchDarkly AgentControl, Galileo | Judge "is the output good/compliant"; never ask "is the claim true." Complementary — possible partner. |
| **AI payment reconciliation** | **Ledge, LedgerUp, Rillet, Lunos, Entendre/MoonPay, HighRadius, BlackLine** | **Reconcile PSP/bank vs ledger/ERP for the finance close. Never look at the trace or what the agent told the customer.** The category to fence off most deliberately. |
| Internal build | a 50-line "confirm with Stripe" script | Covers the happy path; will not build duplicate/partial/wrong-object reconciliation, the regression corpus, replay, or the audit trail. |

**Positioning sentence to lead with:** *"We are not reconciliation. We verify whether your
agent told the truth about money it moved — and stop the lie from shipping again."* If a
finance buyer files you under "another Ledge," you lose on their turf.

**Moat:** only Lumni owns *both ends* — trace/claim extraction on one side, regression +
replay + CI gate on the other. Reconciliation tools have no "block the bad agent version";
observability tools have no "read the real refund."

---

## 5. GTM

### 5.1 Ideal Customer Profile
- **Must-haves:** money-touching agents in production, real volume, budget (funded or
  revenue-generating).
- **Verticals:** fintech, marketplaces, e-commerce, subscription/billing, AI customer-support
  that issues refunds/credits, voice agents collecting payments or scheduling paid services.
- **Frameworks (trace mode):** LangChain / CrewAI / OpenAI Agents SDK / Retell / Vapi + the
  Stripe SDK.
- **Support-tool-embedded agents (transcript mode):** teams whose "agent" lives *inside*
  Zendesk AI, Intercom Fin, Gorgias, etc., issuing refunds/cancellations from the help desk.
  No trace to instrument — transcript mode is the only way to verify them, and it's the
  largest, lowest-friction slice of the ICP.

### 5.2 Buyer personas (dual budget)
| Company size | Eng/reliability buyer | Finance/controls buyer |
|---|---|---|
| Seed–Series B | Founder / CTO / founding eng / Head of AI | Founder / Head of Finance (often same person) |
| 50–200 | Head of AI, Head of Eng, AI platform eng | Head of Finance, Controller, RevOps |
| 200+ / regulated | Head of AI Platform, SRE/reliability lead | CFO org, FinOps, Compliance, Internal Audit |

The finance/controls budget is bigger and is what takes you from $1k → $10k+/mo.

### 5.3 Signals — how to find them
**Tier 1 (acute pain, buy this quarter):**
- Job posts combining "AI agent / LLM" **and** "Stripe / payments / refunds / billing."
- Companies detectably on Stripe (BuiltWith/Wappalyzer) **and** shipping an AI support/ops
  agent (changelog, blog "we let our AI handle refunds," launch tweets).
- **Stripe + a support tool (Zendesk/Intercom/Gorgias) + an AI deflection/agent feature** —
  the perfect transcript-mode target: claims and truth both already exist, zero
  instrumentation needed to run the teardown.
- Public incidents: tweets/posts about an agent double-refunding, fake refunds, wrong charges.

**Tier 2 (strong fit):**
- Seed/Series A fintech + "AI agent" customer-support automation funding announcements.
- Retell/Vapi voice-agent builders doing payment collection or paid-appointment booking.
- GitHub repos importing an agent framework **and** the `stripe` SDK together.

**Tier 3 (nurture):**
- AI automation agencies deploying payment/booking agents for SMB clients.
- YC fintech batches; agent-builder communities.

### 5.4 Where to find them
- LinkedIn / job boards (signal queries above); BuiltWith for Stripe detection.
- Stripe developer community, fintech-infra Slacks/Discords, AI-agent builder communities.
- GitHub code search (framework + stripe SDK co-occurrence).
- Funding feeds (fintech + AI agent).
- Conference/launch coverage of agentic payments.

### 5.5 The motion
```
SIGNAL → COMPANY → QUALIFY → DIAGNOSTIC TEARDOWN (export or read-only, two-sided) → CONVERSATION
  → PAID PILOT (claim source + Stripe) → EXPANSION (gate + replay + in-VPC/finance)
```
The **diagnostic teardown is the demo and the close** — and it's quantified in *real dollars*
before they pay, unlike token-waste numbers.

### 5.6 Pitch & messaging
- **The frame to use everywhere — two read-only sources:** *(1) what the agent/customer
  conversation **claimed**, and (2) what Stripe says **actually happened**.* Never describe it
  as Stripe-only, or a buyer rightly asks "how do you know what my agent promised if you only
  see Stripe?"
- **Core line:** "Your agent told the customer it refunded them. Lumni checks what your agent
  said against what Stripe actually did — and flags every claim that wasn't true."
- **Value-first cold outreach (template):** "Teams running refund/billing agents routinely
  have a slice of 'refund processed' messages with no matching Stripe refund — silent, no
  error thrown. We do a free 30-day teardown that joins your support conversations to your
  Stripe records and puts a dollar number on your exposure. Want yours?" — always lead with
  the specific risk + free teardown.
- **Demo:** connect **one claim source + Stripe, both read-only** (or just drop us 100 tickets
  + a Stripe CSV — Path B) → exposure report ("14 false-success refunds, 3 duplicates, ~$X,
  last 30 days"). The artifact sells itself.
- **Objection handling (the trust ask is the chokepoint):**
  - "Start with an export — 100 tickets + a Stripe CSV, no live access — and see the report
    first." (Path B)
  - "You only ever get **read-only** access to both sources — we can never change anything."
  - "Prefer creds never leave your VPC? Run our verifier in-network; only the verdict comes
    to us." (Path D)
  - "We're not reconciliation — we don't touch your books; we verify your agent's claims."

### 5.7 Pricing
| Tier | Price | Includes | Target |
|---|---|---|---|
| Diagnostic | $0 | One-time two-sided 30-day teardown (claim source + Stripe; export or read-only) + exposure $ number. | Lead-gen wedge |
| Pilot / Land | $2–3k/mo (60-day, day-30 walk-away) | Continuous verification + Slack alerts + 1 gateway. | First paying |
| Team | $3–8k/mo (+ usage) | Regression gates in CI, replay, model/version matrix, seats. | Expansion |
| Enterprise | $40–150k+/yr custom | In-VPC verifier, SOC 2, audit/evidence ledger, finance controls, SSO. | Funded/regulated |

Anchor on outcome ("$X exposure caught + a bad release gated"), not features. Usage scales on
claims verified / agents monitored.

### 5.8 Funnel notes
- Keep the **no-auth playground** as top-of-funnel; the **read-only key** is the conversion
  step; the **in-VPC mode** unlocks enterprise.
- Easier to get the first meeting (dollar-quantified hook) than the generic trace teardown;
  slightly slower to close (access + security review); materially higher ACV and stickiness.

---

## 6. Risks
- **Trust/access friction** — biggest funnel risk; mitigated by read-only + in-VPC.
- **Category confusion with reconciliation** — mitigated by the positioning sentence (§4).
- **Platform risk** — Stripe could ship native agent-claim verification; mitigated by owning
  the reliability loop (regression/replay/gate) and going multi-gateway.
- **TAM narrower** than generic observability — accepted trade for higher pain + ACV.
- **Compliance lift** — SOC 2 needed for finance buyers; start early.

---

## 7. Liability & risk posture

If Lumni verifies payments and something goes wrong, will the client blame the platform?
The architecture already makes Lumni **structurally low-liability** — but only if it stays
**read-only, advisory, fail-open, and well-papered**. The danger appears only if it drifts
into executing/authorizing transactions or over-promising certainty.

### 7.1 The core shield
Lumni only *reads* Stripe and *reports*. It can never cause the financial harm — the
client's agent moves the money and the client's agent is what fails. Lumni is the smoke
detector, not the wiring. Every B2B infra tool lives here (Datadog, PagerDuty, Sentry,
LaunchDarkly). The reconciliation category touches the actual books and carries *more*
exposure than read-only verification does. **Reframe:** Lumni *reduces* the client's
liability (earlier detection + an evidence trail for their decisions), it does not assume it.

### 7.2 Risk vectors, ranked
| # | Vector | Severity | Mitigation |
|---|---|---|---|
| 1 | **False negative** — says `verified` but it was wrong/missing | Highest | **Scope the claim:** Lumni verifies the claim *matches the Stripe system-of-record*, not that the transaction was business-correct. Verifiable, defensible promise — never claim more. |
| 2 | **Gate blocks a good release / Lumni in critical path** | High (operational) | Gate is **client-owned and fail-open by default.** Lumni emits verdict + confidence; *their* CI decides to block. If Lumni is down/uncertain, do not block by default. |
| 3 | **False positive / noisy alarms** | Medium (trust) | Confidence scores + honest `unverifiable` verdict + coverage report ("verified 94%, 6% unverifiable"). Transparency about limits is itself a shield. |
| 4 | **Data/security incident** (read-only Stripe access + PII) | Medium | Already designed down: read-only key (can't move money), in-VPC verifier (creds never leave their network), store verdicts + IDs only (not payloads), SOC 2. |

### 7.3 Four layers of protection
- **Structural/product:** read-only · advisory-by-default · client-owned fail-open gate ·
  explicit confidence + `unverifiable` · in-VPC mode.
- **Positioning:** "evidence, not guarantee." Sell verdicts as *evidence the client uses*,
  with an audit ledger — which lowers *their* exposure. Avoid absolutes.
- **Contractual:** MSA/ToS with limitation of liability capped at fees, warranty disclaimer,
  explicit *"informational/advisory tool; does not execute, authorize, or guarantee
  transactions; client retains responsibility for its agents."* Paper this with a lawyer
  before the first paid pilot.
- **Insurance:** carry **tech E&O (errors & omissions)** before going upmarket. Enterprise/
  regulated buyers push liability onto vendors contractually; E&O + the LoL cap absorbs it.

### 7.4 The one trap to avoid
The punchiest lines — *"we **prove** it happened," "we **block** the lie"* — are also the
ones that invite reliance and raise the liability bar. Keep the punch in the **headline**,
but in product copy, contracts, and the UI scope it to **"verifies the claim against your
Stripe records"** and keep blocking **client-configured**. That gap between marketing energy
and contractual precision is where Lumni stays safe without softening the pitch.

---

## 8. Sources (competitive grounding, mid-2026)
- LaunchDarkly AgentControl — [helpnetsecurity.com](https://www.helpnetsecurity.com/2026/05/19/launchdarkly-agentcontrol/), [launchdarkly.com](https://launchdarkly.com/platform/agent-control/)
- Braintrust / Future AGI reliability framing — [braintrust.dev](https://www.braintrust.dev/articles/best-ai-agent-observability-tools-2026), [futureagi.com](https://futureagi.com/blog/best-ai-agent-reliability-solutions-2026/)
- Reconciliation category — [ledge.co](https://www.ledge.co/solutions/payment-reconciliation), [ledgerup.ai](https://www.ledgerup.ai/automate/payment-reconciliation), [rillet.com](https://www.rillet.com/product/bank-reconciliation), [moveo.ai](https://moveo.ai/blog/financial-reconciliation-ai-agents), [MoonPay/Entendre](https://www.prnewswire.com/news-releases/moonpay-acquires-entendre-bringing-agentic-finance-to-the-stablecoin-economy-302805927.html)
- IMF, Agentic AI in payments 2026 — [elibrary.imf.org](https://www.elibrary.imf.org/view/journals/068/2026/004/article-A001-en.xml)
- Production reliability data (56.6% success across 6,259 agents) — [insights.reinventing.ai](https://insights.reinventing.ai/articles/ai-agents-evaluation-production-reliability-2026-04-27)
