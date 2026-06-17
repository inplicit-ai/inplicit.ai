# How Inplicit Works — Interaction Loop (Spec)

> **Date:** 2026-06-17
> **Branch:** `feat/how-it-works-loop`
> **Grounding:** every step maps to a real product surface documented in
> [`PRODUCT_AUDIT.md`](./PRODUCT_AUDIT.md) and the agent docs (`Inplicit-Agent/CLAUDE.md`,
> `docs/algorithm.md`). Build status is taken from the verified audit.
> **Linear:** WHY team `Whyr group`, project `inplicit.ai`.

## Goal

Replace the current four generic steps of the "How Inplicit works" section with six steps that
show how a user actually interacts with the system. Each step is a mock UI scene that mirrors the
real dashboard, not a live product embed.

## Definition (scope guardrails)

1. **Mock only.** UI plus mock and animation content. No real backend, no real input fields, no
   live interaction area. Same approach as the existing macOS window mocks, just new scenes.
2. **No knowledge map.** The D3 cluster graph is out of this section.
3. **Loop step is labeled "Beta".** Autonomous research is vision and partially built, so it
   carries a visible Beta badge and is never presented as a working live feature.
4. **Reuse the existing responsive layout** from the current "How Inplicit works" section: the
   three-tier scaffold already built (desktop two-column with one cycling preview, iPad zig-zag,
   mobile stacked full-width). Only the step content and the mock scenes change.
5. **Chats reuse two real UIs, adapted for mobile:** the setup-agent chat and the interviewee
   chat. The knowledge chat and the loop reuse the same chat style.
6. **Copy rules:** bilingual EN and DE. Plain sentences. No contrastive cliché constructions, no
   em dashes, no filler.

## The six steps

Each step lists: the scene, the real surface it mirrors, the mock content direction, and the build
status from the audit.

### 1. Setup
- **Scene:** setup-agent chat. Admin describes the goal, the agent proposes a ready campaign.
- **Mirrors:** `/campaigns/new` builder with the setup agent (`POST /api/orgs/me/setup-sessions`),
  campaign created with company context plus participant list.
- **Mock:** two or three scripted chat turns ending in a "campaign ready" confirmation chip.
- **Status:** built.

### 2. Conversations (interviewee view)
- **Scene:** the participant interview screen. Voice first, anonymous, the agent states it is an AI.
- **Mirrors:** `/interview/[token]` WebSocket voice agent, two-phase protocol (open then validation).
- **Mock:** a voice indicator plus one agent question bubble and one participant answer bubble,
  with an anonymity badge and an AI badge.
- **Status:** built.

### 3. Synthesis
- **Scene:** synthesis in progress. Conversations turn into structured signals.
- **Mirrors:** single-pass Mistral synthesis into triads plus incremental clustering
  (`pipeline/synthesis.rs`, `pipeline/clustering.rs`).
- **Mock:** signals flowing into a hub, a counter ticking up, a short status list (conversations
  read, signals extracted, patterns grouped). No cluster graph.
- **Status:** built. Frame as indexing what the workforce knows. Do not frame as personal profiles
  or digital twins.

### 4. Problem and solution suggestions
- **Scene:** the triad list. Problem, the idea the person already has, the business opportunity.
- **Mirrors:** Insights view, triad model `problem_statement` plus `human_solution` plus
  `business_opportunity` plus origin tag, with click to quote.
- **Mock:** two or three triad cards, each with an origin tag (person or AI), a confidence pill,
  and a visible "view quote" affordance.
- **Status:** built.

### 5. Knowledge chat
- **Scene:** ask the workforce data in plain language, get a cited answer.
- **Mirrors:** RAG chat per campaign and org wide with citation chips (`/chat`, campaign chat
  threads, `POST /api/orgs/me/knowledge-chat`).
- **Mock:** one typed question, one answer, one citation chip back to an anonymous source.
- **Status:** built (vector retrieval live; cited answer is the demonstrated state).

### 6. Autonomous research (Beta)
- **Scene:** the loop closes. When the data does not hold the answer yet, the system runs a focused
  round of interviews and returns with the answer.
- **Mirrors:** the validation loop vision (active hypothesis routing plus targeted interviews). In
  the audit this is partial and planned, not a finished live feature.
- **Mock:** chat shows a "no answer in the data yet" state, then a research animation (interview
  pulses), then the answer returns. Visible Beta badge.
- **Status:** Beta. Present as vision, never as a finished interaction.

## Layout reuse

Reuse the current `HowItWorks.astro` responsive engine without redesigning it:
- **Desktop (>=1024):** step list on the left, one cycling preview on the right. Panels overlap so
  the section height stays fixed. Keep the autocycle plus the is-ready flash guard.
- **iPad (768 to 1023):** zig-zag grid, each step a row, text and scene alternate sides, all shown,
  no cycling.
- **Mobile (<=767):** stacked single column, scenes at full layout width, all shown, no cycling.

Extend the hardcoded order and grid placement rules from four steps (`data-step` 0 to 3) to six
(`data-step` 0 to 5). Keep the section id `#how-it-works`, the eyebrow, and the heading.

## Mock scenes to build

A shared mobile chat component covers steps 1, 2, 5, 6. Two dedicated scenes cover steps 3 and 4.

| Component | Used by | Notes |
|---|---|---|
| `SceneChat` (shared) | 1, 2, 5, 6 | Bubbles, scripted turns, optional typing dot, badges. Adapted from the setup-agent and interviewee chat, mobile first. |
| Setup variant | 1 | Admin to agent, ends in campaign-ready chip. |
| Interview variant | 2 | Voice indicator, anonymity and AI badges, one exchange. |
| Knowledge-chat variant | 5 | Question, cited answer, citation chip. |
| Loop variant | 6 | Beta badge, no-answer state, research pulse animation, returned answer. |
| `SceneSynthesis` | 3 | Signals to hub, counter, status list. Adapt the existing synthesis mock, drop the map. |
| `SceneSuggestions` | 4 | Triad cards with origin tag, confidence pill, view-quote affordance. |

## Proposed copy (draft, refine in review)

Eyebrow and heading stay as they are. Step titles and one-line copy:

| # | EN title | EN copy | DE title | DE copy |
|---|---|---|---|---|
| 1 | Setup | Describe what you want to learn and who gets asked. The setup agent turns it into a ready campaign in minutes. | Setup | Beschreibe, was du erfahren willst und wer befragt wird. Der Setup-Agent macht daraus in Minuten eine fertige Kampagne. |
| 2 | Conversations | Your people talk to the agent. A voice conversation of about 20 minutes, anonymous, on their own schedule. They are told they speak with an AI. | Gespräche | Deine Leute sprechen mit dem Agenten. Ein Sprachgespräch von etwa 20 Minuten, anonym, wann es ihnen passt. Sie wissen, dass sie mit einer KI sprechen. |
| 3 | Synthesis | Every conversation becomes structured signals. The system reads the transcripts and indexes what the workforce knows. | Synthese | Jedes Gespräch wird zu strukturierten Signalen. Das System liest die Transkripte und indexiert, was die Belegschaft weiß. |
| 4 | Suggestions | See the problem, the idea your people already have, and the business opportunity behind it. Every card links to the exact quote. | Vorschläge | Sieh das Problem, die Idee deiner Leute und die Geschäftschance dahinter. Jede Karte führt zum genauen Zitat. |
| 5 | Knowledge chat | Ask your workforce data in plain language. Answers come back with citations to an anonymous source. | Wissens-Chat | Frag deine Belegschaftsdaten in normaler Sprache. Antworten kommen mit Belegen zu einer anonymen Quelle zurück. |
| 6 | Autonomous research (Beta) | If the data does not hold the answer yet, Inplicit goes and finds it. It runs a focused round of interviews and brings the answer back. | Autonome Recherche (Beta) | Wenn die Daten die Antwort noch nicht hergeben, holt Inplicit sie. Es startet eine gezielte Interview-Runde und bringt die Antwort zurück. |

## Implementation plan

- **P1. Scaffold.** On the branch, make the section step-driven. Either refactor `HowItWorks.astro`
  to a data array of six steps, or duplicate the responsive engine into a new section component and
  swap it into `index.astro` and `de/index.astro`. Keep the three-tier media queries and the JS
  cycle plus is-ready guard.
- **P2. Shared chat.** Build `SceneChat` (mobile bubble layout, scripted turns, badges, optional
  typing indicator). Derive the look from the setup-agent and interviewee chat.
- **P3. Dedicated scenes.** Build `SceneSynthesis` (adapt the existing synthesis animation, remove
  the map) and `SceneSuggestions` (triad cards).
- **P4. Wire steps.** Place the six scenes as the panels (`data-step` 0 to 5). Extend the order and
  zig-zag grid rules to six steps. Pass titles and copy through the `lang` prop.
- **P5. Copy plus Beta.** Add EN and DE copy. Style the Beta badge on step 6.
- **P6. Animation and QA.** CSS-first animations, reduced-motion safe. Verify at the three
  breakpoints. `npm run build` clean.

## Acceptance criteria

- Six steps render in the existing three-tier responsive layout (desktop cycling, iPad zig-zag,
  mobile stacked full width).
- Each step shows a mock scene that matches its named dashboard surface. No live interaction.
- The chats are mobile adaptations of the setup-agent and interviewee chat.
- Step 6 carries a visible Beta badge and reads as vision, not a finished feature.
- No knowledge map anywhere in the section.
- Copy is present in EN and DE, with no contrastive cliché phrasing and no em dashes.
- Every step traces to `PRODUCT_AUDIT.md`. Nothing shown is unbuilt except step 6, which is Beta.
- Build passes and renders at `<=767`, `768 to 1023`, and `>=1024`.

## Out of scope

Real backend or live data, real input controls, the knowledge map, the digital twin, finished
autonomous research, and any copy that claims connectors the product does not have.
