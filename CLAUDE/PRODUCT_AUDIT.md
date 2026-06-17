# Inplicit — Product Status Quo vs. Website "How It Works" (Audit)

> **Date:** 2026-06-17
> **Scope:** Audit of the actual product (`Inplicit-Agent/` backend + dashboard) against the
> docs, then compared to the marketing site (`Website/implicit/`). Goal: an honest status-quo
> reference + an assessment of whether the website's *"How Inplicit works"* section is the best
> story we have.
> **Method:** Read the canonical docs (`CLAUDE.md`, `architecture.md`, `algorithm.md`) **and
> verified them against the code** (Rust backend `src/` + 49 migrations; Next.js dashboard
> `app/`). Where docs and code disagreed, code wins and the drift is flagged.
> **Note:** This is documentation + recommendations only. No website change is implied here.

---

## 1. What Inplicit actually is (verified)

A multi-tenant, EU-hosted platform that runs **AI voice interviews with a workforce at scale**,
then turns the transcripts into **falsifiable hypotheses about the organisation that it
validates or kills against further interviews** — with quantified confidence and full
traceability back to quotes. It is *not* a survey tool and *not* a report generator; the
defensible core is the **validate/kill loop with explainable, tunable thresholds.**

- **Backend:** Rust (Axum, Tokio, sqlx). 49 migrations. Multi-tenant (orgs, RBAC).
- **Dashboard:** Next.js 16 (App Router, React 19), Vercel `fra1`. *(Not Deno Fresh — the old
  `architecture.md` says Deno Fresh; that is stale.)*
- **Data:** Postgres (Supabase eu-central-1), Qdrant (EU, collection per campaign), Redis
  Streams (Upstash EU), S3 (Supabase Storage EU).
- **Models:** Groq Llama-3.3-70B (interview), Mistral (synthesis + embeddings), ElevenLabs
  STT+TTS by default (Deepgram / KugelAudio are runtime-swappable alternates).

---

## 2. How it actually works, end-to-end (build status)

Legend: ✅ built · ⚠️ partial/stub · ⏳ planned

1. **Onboarding** ✅ — Admin creates a campaign (company context + CSV of participants, or a
   guided "setup agent"). Per-participant `anon_id` + single-use 7-day token. Org/role context
   lives in a **Vault** (org-level, role-scoped, campaign-scoped sections).
2. **Live interview** ✅ — Browser ↔ Rust WebSocket. PCM16 voice (ElevenLabs STT → Groq → ElevenLabs
   TTS, <~1.5 s to first audio) with a text-chat fallback. Utterances written to Postgres in real
   time; resume-after-disconnect (context replay ⚠️ stubbed).
   - **Two-phase protocol** ✅ — first **70 % open discovery** (Critical Incident Technique, never
     suggests solutions) → last **30 % validation** of pending hypotheses with balanced framing.
     Open-phase insights carry **1.5× weight** (anti-bias). This rigor is real and differentiating.
3. **Synthesis** ✅ — On completion, a Redis event triggers **one Mistral call** (single-pass,
   TOON-compressed transcript) that simultaneously extracts **triads** and falsifies pending
   hypotheses.
   - A **triad** = `problem → human_solution? → business_opportunity?` + `origin` (HUMAN/AI). A
     pure complaint with no solution is still valid (we don't invent).
4. **Clustering** ✅ — Each triad's problem is embedded (Mistral, Qdrant) and **incrementally
   clustered** (`tau_assign 0.82`, `tau_create 0.78`). Thresholds live per-campaign in
   `synthesis_config` (JSONB) → "explainable, tunable decisions."
5. **Hypotheses + evolution** ✅ — A strong cluster (signal ≥ 5, ≥ 2 departments) escalates to a
   hypothesis. State machine **SEED → PENDING → VERIFIED / REJECTED / EVOLVING**, confidence =
   Beta-posterior with Laplace smoothing + a department-diversity penalty (kills single-team echo
   chambers). `EVOLVING` spawns a more specific **child hypothesis** (parent/child lineage).
6. **Query / output** ✅ — Dashboard: triad **Insights**, D3 **Knowledge Map** (clusters), **Hypotheses**
   grouped by state with confidence + evidence counts, **interview transcripts** with
   click-to-quote, and **RAG chat** ("did anyone in legal mention onboarding pain?") per-campaign
   and org-wide, with citations.
7. **Extras built** — **Digital Twin** of roles (validated vs. predicted graph; simulation
   endpoint ⚠️ skeleton), **Workforce Directory**, **Integrations registry** (Connector trait;
   **Notion + Granola** live, generic webhook, Resend email), **MCP server** (`ipk_` keys, read-only
   org research for external AI), **per-org envelope encryption** (AES-256-GCM, master key + per-org
   DEK), **GDPR cascade delete** + anon-by-design.

### Notable gaps (don't market these as done)
- **Pre-flight hypothesis router** ⏳ — picking the 1–3 most informative hypotheses *per participant*
  (relevance × uncertainty × novelty) is **specced but not built**; validation currently injects
  pending hypotheses without that per-person targeting. (Biggest algorithm gap.)
- **Evolution-tree UI** ⏳ — backend lineage exists; no visual tree yet.
- **Synthesis-config tuning UI** ⏳ — API exists; no admin screen (so "tunable" is true via API, not UI).
- **Digital-twin simulation** ⚠️ — persona/graph scaffolding only; LLM fan-out is TODO.
- **External connectors** — only Notion + Granola + generic webhook. **No Slack/Outlook/Celonis/SAP/Google.**

---

## 3. What the website currently says ("How Inplicit works")

| # | Title | Copy (EN) |
|---|---|---|
| 01 | **Connect your knowledge** | "Connect Slack, Outlook, Celonis, SAP or anything else your organisation runs on. The interview agent has context before the first conversation begins." |
| 02 | **AI Interviews** | "AI interviews with the right people. Not the entire workforce — targeted by context and role." |
| 03 | **Pattern recognition** | "Our AI extracts insights and clusters patterns automatically in real time — no manual analysis needed." |
| 04 | **Knowledge map** | "A structured knowledge map with verified insights and original quotes — ready for decisions." |

---

## 4. Website vs. reality — gap analysis

### 4a. Overclaims (accuracy risk — fix before a technical buyer asks)
- **Step 01 names Slack / Outlook / Celonis / SAP.** Not connected. Reality = paste company context,
  upload docs, optional **Notion / Granola** meeting-notes sync. A buyer who asks "do you pull from
  SAP/Celonis?" gets a "no." This is the single most exposed claim on the page.

### 4b. Underclaims (we hide our actual moat)
- **Step 03 ("extracts insights & clusters patterns") is generic AI-summarizer language.** Every
  competitor can say it. It buries the defensible part: **falsifiable hypotheses that get validated
  or killed against the workforce, with Bayesian confidence, department-diversity guards, and
  per-campaign explainable thresholds.** Our own `IDEA.md` calls this a *"generation-and-validation
  engine, not a reporting tool."* The site doesn't say it.
- **No validation loop.** `IDEA.md`'s spine — Extract → Synthesise → Generate → **Validate** →
  Converge — is the thing that makes Inplicit *not a survey*. The 4 steps stop at a static "map" and
  never mention hypotheses or validation. Output is framed as **diagnostic** ("here's a map") instead
  of **invention** ("here are validated, pre-proven cases") — contradicting our positioning.
- **Output is undersold.** "Knowledge map + quotes" omits: hypotheses-by-state with confidence &
  evidence, click-to-quote diarized transcripts, the **RAG chat over the workforce** (a great demo),
  and the Digital Twin. The RAG chat alone is more compelling than a static map.

### 4c. Accurate & strong (keep)
- **Step 02** ("right people, targeted by context and role") — matches the directory + role-scoped
  vaults. Good.
- **EU / GDPR framing** (hero check-marks, Trust & Security section) — matches reality strongly
  (EU-only infra, anon-by-design, AI self-disclosure, per-org encryption). A real moat, well shown.

| Website claim | Reality | Verdict |
|---|---|---|
| Connect Slack/Outlook/Celonis/SAP | Notion + Granola + webhook only | ❌ Overclaim |
| AI interviews, targeted by role | Directory + role vaults | ✅ Accurate |
| Extracts insights, clusters patterns | True, but it's the *floor*, not the moat | ⚠️ Underclaim |
| (validation loop / hypotheses) | Full state machine + evolution + confidence | ❌ Missing |
| Knowledge map + quotes | Map + hypotheses + RAG chat + transcripts + twin | ⚠️ Undersold |
| GDPR / EU / anonymous | EU-only, anon, encrypted, AI-disclosed | ✅ Accurate & strong |

---

## 5. Verdict: is "How It Works" our best marketing content?

**No — it's clean and clear, but a notch below the product.** As written it describes a generic
"connect data → AI interviews → insights → map" pipeline that reads like a research/survey tool,
while the actual, defensible differentiation (the **validate-or-kill hypothesis loop** with
explainable confidence, plus the workforce-RAG and EU-compliance moat) is mostly absent. We are
**simultaneously overclaiming integrations and underclaiming the synthesis rigor** — the worst of
both. The marketing under-sells what is genuinely hard and over-sells what isn't built.

---

## 6. Suggestions (not applied — for discussion)

**Principle: swap the two errors.** Stop leading with integrations we don't have; start (accurately)
leading with the validation rigor we *do* have.

1. **Rewrite Step 01** away from named connectors → honest + still strong:
   *"Give it context — paste your company context, upload documents, optionally sync meeting notes
   (Notion, Granola). The agent walks in informed."*
2. **Reframe Step 03** from "pattern recognition" → the moat:
   *"Validate, don't just summarise — the system forms falsifiable hypotheses and tests each against
   later interviews, tracking confidence and killing the ones that don't hold."*
3. **Add/!reframe Step 04** from a static map → validated output:
   *"Pre-validated cases — verified hypotheses with confidence scores, evidence, and click-to-quote
   back to the exact words. Ask the data anything (RAG chat)."*
4. **Consider mirroring the 5-stage Validation Loop** (Extract → Synthesise → Generate → Validate →
   Converge) from `IDEA.md` as the section's backbone — it's a stronger, more ownable narrative than
   four generic steps, and it's what the product actually does.
5. **Lead with the differentiators in `IDEA.md`/competitive-gap doc:** two-phase interview, Bayesian
   hypothesis lifecycle, department-diversity guard, EU-first compliance, RAG over the workforce.
6. **Guardrail — claim only what's built.** Do **not** market the pre-flight router, evolution-tree
   UI, threshold-tuning UI, or digital-twin simulation as live; they are partial/planned. "Explainable
   thresholds" is fair (config is real); "tune them in the dashboard" is not yet.

---

## 7. Documentation drift found (for the product repo, not the website)
- `architecture.md` (v4.0, Apr 2026) is stale on three points the code contradicts: **Deno Fresh**
  (it's Next.js), **Deepgram/KugelAudio as primary** (ElevenLabs is the default), and the old
  **VSE `semantic_type`** insight model (migration 013 hard-cut to the **triad** model).
  `CLAUDE.md` + `algorithm.md` are current; `architecture.md` should be reconciled.
