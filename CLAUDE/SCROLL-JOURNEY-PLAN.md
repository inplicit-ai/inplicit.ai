# Scroll Journey — plan (v2: assembly, not zoom)

Replacing `HowItWorks.astro` (764 lines, 6 steps, auto-cycling panels) with a
scroll-driven journey: **Setup → Interviews → Themes → Knowledge chat**.

The 1:1 dashboard UI *constructs itself* as the user scrolls. Each step
assembles along a different axis, so the section is not one effect repeated four
times — it is four beats of one experience.

Reference for the *scroll grammar* (sticky pin, transform-only, no jacking):
simile.com. Reference for the *motion* : none — this is ours.

---

## 1. The core mechanic

A pinned frame. Inside it, the real UI arrives in parts:

- Each part fades `0 → 1`.
- Each part **converges inward** to its final position: parts that belong at the
  top start ~24px above and settle down, parts at the bottom start below and
  settle up, side parts come in from their side.
- The whole frame lifts `scale(0.94 → 1)` across the beat — one transform on the
  container, not per part.
- The surface (white card + hairline border) is there first, at low opacity, so
  the parts have a stage to land on. Border and shadow resolve last.

Everything is a pure function of scroll position. Scroll up and it
disassembles — exactly, frame for frame. That is only true if the animation is
*declarative* (a CSS function of one scroll variable), never event-triggered.
**No IntersectionObserver "play once when visible" anywhere in this section.**

### Why this beats the zoom for us

A pixel-art city is legible at 5% because it is a silhouette. A dashboard mock
at 28% is grey mush. Assembly keeps every part at 1:1 the whole time — no
raster LOD problem, no blurry mid-transform text, and no €X0k illustration
commission to make it look expensive. The craft is in the choreography, which is
code.

---

## 2. Choreography — one axis per step, derived from what the step *is*

Not variety for its own sake. Each axis is what the underlying UI already means.

### 01 · Setup — **vertical assembly**
Header bar settles down, composer settles up, chat turns stagger in from below.
Reads as *a workspace assembling around you*. This is the baseline grammar, so
the first step teaches the user how to read the rest.

### 02 · Interviews — **lateral**
The real room is genuinely 3-column: topic cards + must-ask coverage | orb + HUD
| live transcript. Left column enters from the left, right column from the
right, the orb scales up in the centre and the HUD resolves under it. The x-axis
move is *justified by the actual layout*, not decoration.

### 03 · Themes + cross-validation — **clustering**
Theme cards arrive as a loose deck (offset + slight rotation, ~2°) and settle
into the grid; people-count and department chips count in last. Then the
cross-validation column resolves its VERIFIED / REJECTED / PENDING states.
Reads as *scattered signals collecting into themes* — which is literally what
the pipeline does.

### 04 · Knowledge chat — **temporal, not spatial**
Nothing flies anywhere. The question line appears, the answer streams in line by
line as you scroll, then the citation chips snap into their terminal row under
the "Sources" hairline. Scroll becomes time. Strongest possible ending: it does
not describe the product moment, it *is* the product moment.

Escalation across the section: vertical → lateral → clustering → temporal.

---

## 3. Transitions between steps

Three levels. Pick per boundary; do not do all three everywhere.

1. **Reverse-out.** The outgoing step disassembles along **its own** axis while
   the incoming step assembles along **its**. Step 01 collapses vertically out
   as step 02 opens laterally in. Costs nothing — the exit is the entry played
   backwards along the same vectors.
2. **Frame breath.** The frame dips `scale(1 → 0.985 → 1)` across the boundary.
   ~15px of movement that makes a content swap read as a camera move.
3. **Persistent element** (highest value, highest effort). One element that
   exists in both scenes does not leave — it *travels*. The agent avatar in 01
   becomes the orb in 02. A theme card in 03 becomes the cited source in 04.

**Rule: at most one persistent element per boundary.** Two reads as chaos. If
budget is tight, ship 1 + 2 everywhere and add 3 only on the 03 → 04 boundary,
where it carries the strongest story (a theme becomes a citation).

---

## 4. The rules that separate expensive motion from cheap motion

Assembling ~20 parts is exactly how templated "everything fades up" sections
look. What prevents that:

- **Never move more than ~32px.** It is a settle, not a fly-in. 16–28px for
  most parts.
- **Distance by role.** Structural chrome (header bar, borders, rails) moves
  least — 8–12px. Content (messages, cards, transcript lines) moves most —
  20–32px. Uniform distance is what makes motion read as generated.
- **Group the stagger.** 3–5 stagger groups per scene, not 20 individual
  delays. Grouped stagger reads as choreography; per-element stagger reads as
  noise.
- **Opacity ramps faster than position.** A part is fully opaque while still
  settling the last ~8px. This one thing is most of the difference.
- **Assembly finishes at ~55% of the step.** Scroll has no fixed duration — a
  trackpad flick collapses the whole beat into 200ms. Finishing early means a
  fast scroller still sees the assembled UI hold for a moment instead of a
  smear.
- **One easing.** `--ease-smooth` from `design.css`. No bounce, per corporate
  design §7.

---

## 5. Technical architecture

Unchanged from v1 — dropping the zoom does not change the plumbing, only what
the CSS reads.

### 5.1 The primitive — `src/components/scroll/ScrollStage.astro` (~40 lines)

```html
<section class="stage" data-stage data-travel="440">
  <div class="stage__pin"><slot /></div>
</section>
```
```css
.stage      { height: calc(100svh + var(--travel) * 1svh); }
.stage__pin { position: sticky; top: 0; height: 100svh; contain: paint; }
```

### 5.2 The driver — `src/scripts/scroll-stage.ts` (~40 lines)

One passive `scroll` listener for the whole page → dirty flag → one rAF →
for each `[data-stage]`:
```
t = clamp(0, -rect.top / pinHeight, travel)   // viewport-heights travelled
el.style.setProperty('--t', t.toFixed(3))
```
Write only when `t` moved > 0.002. **No damping / lerp** — it adds trackpad lag
and is not where the smoothness comes from.

JS writes **one property on one element.** All ~80 parts read it in CSS.

### 5.3 Per-part stagger with zero per-part JS

Each part carries only its group index in markup:
```html
<div class="part" style="--i: 2" data-axis="up">…</div>
```
and one CSS rule serves every part of a scene:
```css
.part {
  --start: calc(var(--scene-t0) + var(--i) * 0.07);
  --p: clamp(0, calc((var(--t) - var(--start)) / 0.22), 1);   /* opacity ramp  */
  --q: clamp(0, calc((var(--t) - var(--start)) / 0.34), 1);   /* position ramp */
  opacity: var(--p);
  transform: translateY(calc(var(--dy) * (1 - var(--q))));
}
.part[data-axis="up"]   { --dy:  24px; }
.part[data-axis="down"] { --dy: -24px; }
.part[data-axis="left"] { --dy: 0; --dx: -28px; }
```
`--p` ramping shorter than `--q` *is* the "opacity faster than position" rule,
expressed once. Sub-ranges are written in viewport-heights so they read like the
storyboard and retune without recomputing fractions.

### 5.4 Files

```
src/components/scroll/ScrollStage.astro       pin primitive
src/scripts/scroll-stage.ts                   the one driver
src/components/journey/Journey.astro          orchestrator + captions + rail
src/components/journey/SceneSetup.astro       01  vertical
src/components/journey/SceneInterview.astro   02  lateral (hosts the orb shader)
src/components/journey/SceneThemes.astro      03  clustering
src/components/journey/SceneChat.astro        04  temporal
src/components/journey/StepCaption.astro      num / title / body / teaser
```

`HowItWorks.astro` is deleted — 764 lines against the repo's own ~200-line rule.
The orb shader (its lines 358–466) moves into `SceneInterview.astro`.

A sticky progress rail (01 · 02 · 03 · 04) driven by the same `--t`. Cheap, and
it is the orientation cue that makes a long pin feel intentional rather than
stuck.

---

## 6. Scroll budget

One continuous pin, four sub-ranges. No zoom stage.

| Beat | Assembly | Hold | Travel |
|---|---|---|---|
| 01 Setup | 55vh | 45vh | 100vh |
| 02 Interviews | 55vh | 45vh | 100vh |
| 03 Themes | 60vh | 40vh | 100vh |
| 04 Knowledge chat | 80vh | 20vh | 100vh |
| Exit | | | 40vh |
| **Spacer** | | | `calc(100svh + 440 * 1svh)` |

≈4.4 screens for the whole section. Never a pinned frame where nothing changes
for more than ~20vh.

**One pin or four?** One. Four separate pins give a breather between steps but
the frame visibly re-seats each time; one pin means the frame never moves and
only its contents change — that is the immersive reading, and the frame-breath
(§3.2) supplies the punctuation instead.

---

## 7. Content rebuild (independent of the motion — ships on its own)

Six steps → four. 06 merges into 05 (same knowledge-chat panel).

**01 · Setup** — agent drafts the guide; role-level context pulled per
participant. Teaser: the context comes from a vault / role graph.
*Fact fix:* participants are **not** optional (`ReviewLaunch.tsx:85` blocks
launch). Do not imply they are.

**02 · Interviews** — voice, anonymous, single-use link, own schedule, AI
disclosed. Teaser: it stays on a topic until covered.
*Fact fixes:* 25 min default (`db/campaigns.rs:478`) — current mock says 20–30.
Coverage drives the interview, not the clock. 70/30 phase split is per-campaign
tunable.

**03 · Themes + cross-validation** (replaces old 03 + 04) — themes with
people-count + department spread; hypotheses marked VERIFIED / REJECTED /
PENDING. Teaser: hypotheses get re-tested in later interviews.
*Fact fix:* headline metric is `interview_count`, triad under a "Belege zeigen"
accordion. **Remove "every card links to the exact quote"** — `utterance_ids`
exists in the type, no UI wires it.

**04 · Knowledge chat + autonomous round** — plain-language question → cited
answer; no-answer → offers a focused interview round → email on results.
Citations are anon-only by construction (`rag.rs:22`). Teaser: mandate /
autonomy level.

**Never claim:** "PII deleted after 30 days". No such job exists in `src/jobs/`
— only manual/staff cascades.

Keep out: anchor geometry, retarget hysteresis, cluster thresholds
(0.82/0.78/0.88), the ≥5/≤1/≥2-dept rule, tool registry, dual ledger, EIG
routing, model vendors.

Both `en` and `de` per repo rule.

Copy the real interfaces from: `SetupChat.tsx` + `ChatTurnRow.tsx` +
`ReviewLaunch.tsx` · `InterviewRoom.tsx` + `StatusHud.tsx` + `TopicCards.tsx` +
`VoiceTranscript.tsx` · `insights/ThemeCard.tsx` ·
`campaigns/[id]/hypotheses/page.tsx` · `ChatConversation.tsx` +
`CitationChip.tsx` + `OrgCitationChip.tsx`.

**Note:** the assembly effect requires the mocks to be built as *discrete parts*
from the start — one element per animatable unit, no part nested inside another
animating part (nested transforms compound). Structure the scenes for
choreography, not just for looks.

---

## 8. Design resync

`Website/implicit/src/styles/design.css` has drifted from the dashboard SSOT
(`inplicit-dashboard/app/design.css`). Confirmed deltas:

| Token | Website now | SSOT |
|---|---|---|
| `--color-cta-bg` | `#FCA157` | `#6468D0` |
| `--color-cta-text` | `#0B0C10` | `#FFFFFF` |
| `--color-cta-hover` | `#F08A3C` | `#5257C4` |
| `--radius-sm` | missing | `6px` (badges/chips; `--radius-full` is avatars/dots/count badges **only**) |
| `--shadow-card` | missing | `none` (cards rest on their hairline border) |

⚠️ This recolours **every CTA on the site**, hero button included, from orange to
periwinkle. Orange stays as accent only. Confirm before doing it.

Mock-level fixes:
- `.tlabel--idea #2f6f8f` is not a token → use `--color-gap: #1E3490`.
- Setup pane has **no header bar**; avatars square/bordered; user side shows the
  org logo. *(Affects 01's choreography — the vertical assembly settles the
  composer and turn rows, there is no header bar to bring down.)*
- Citations = terminal row of square mono chips (`ANON-XXXXXX · #N`) under a
  hairline "Sources" divider. No inline blockquote callout.

---

## 9. Mobile, reduced motion, a11y

**Mobile (< 768px).** Assembly survives the small screen fine — no scale
crispness issue. But the axes must collapse: the 3-column interview room does
not exist on mobile, so 02 becomes vertical like 01. Keep 04 temporal (works at
any width). Halve travel to ~60vh per step (~2.6 screens). Scenes render the
*mobile* layout of the real UI, not a squashed desktop one. `svh` everywhere,
never `vh` — the iOS toolbar collapse otherwise makes the pin jump.

**`prefers-reduced-motion: reduce`.** Pure CSS, no JS branch: spacer height
`auto`, pin `position: static`, parts `opacity: 1; transform: none`, scenes
stacked in flow. The driver bails early too.

**No-JS / pre-hydration.** `--t: 0` renders scene 01 mid-assembly, which is
wrong-looking if JS never runs. So default the *parts* to their end state and
let the driver take over on first rAF — a fully-assembled UI is the correct
degraded state.

**A11y.** Scenes stay `aria-hidden="true"` (decorative mocks). Step captions
carry the real content in normal flow — readable with zero motion. Nothing
focusable inside the scenes, so Tab can never jump into a half-assembled frame.

---

## 10. Perf rules and sticky killers

- One `scroll` listener, `{passive: true}`, for all stages. JS writes one CSS
  property, full stop.
- `transform` / `opacity` only. Never `top`, `height`, `filter`, `box-shadow`.
- **`will-change` only on the active scene's parts** (toggled by a class on the
  scene). ~80 parts with permanent `will-change` is a GPU-memory problem.
- **No nested animating parts.** A moving part inside another moving part
  compounds transforms and is impossible to tune.
- **Never transform an ancestor of the sticky element** — it becomes the
  containing block and the pin breaks. Transforms strictly inside `.stage__pin`.
- **`overflow: hidden` on any ancestor kills `position: sticky`.** `Hero.astro`
  has it — fine, it is a sibling; do not wrap `main` or the journey in it.
- Pause the WebGL orb via IntersectionObserver when 02 is off screen.
- No `content-visibility: auto` inside the pin — interacts badly with sticky.

---

## 11. Phases (each independently shippable)

**Phase 0 — content + tokens, zero motion.** Six steps → four, all fact fixes,
`design.css` resync, mocks rebuilt from the real components **as discrete
parts**. Ships value alone; if the motion slips, the section is already better.

**Phase 1 — primitive + driver + step 01.** `ScrollStage`, the driver, and the
vertical assembly for Setup. Deletes `HowItWorks.astro`. This is where we find
out whether 24px and 0.22 feel right; tune here before multiplying by four.

**Phase 2 — steps 02–04.** Lateral, clustering, temporal. Progress rail.

**Phase 3 — transitions.** Reverse-out + frame breath everywhere; one persistent
element on 03 → 04.

Note: without the zoom there is no hero handoff, so the hero needs no rewrite at
all. The journey stage simply starts below it.

---

## 12. QA matrix

`npm run build` green, then by hand:

- Safari macOS — trackpad inertia, scrollbar drag, **fast flick** (does the
  assembly still read?), and **scroll up** (does it disassemble cleanly?)
- Chrome DevTools Performance — zero layout/paint during the pin
- iOS Safari — toolbar collapse mid-pin, no jump
- `prefers-reduced-motion` on — stacked, complete, no pin
- JS disabled — scenes fully assembled
- Keyboard Tab through the section — no scroll jump
- 390 / 768 / 1280 / 3440px
- Reload while scrolled mid-stage — correct state within a frame

---

## 13. Open decisions

1. **Persistent elements** (§3.3) — ship them, or start with reverse-out +
   frame breath only and add persistence later? Recommendation: add only the
   03 → 04 one (a theme becomes a citation).
2. **CTA recolour** — resync `--color-cta-bg` to `#6468D0` site-wide, or keep
   the website orange and apply periwinkle only inside the mocks?
3. **Scroll budget** — 440vh (~4.4 screens) desktop, 240vh mobile. Right, or
   tighter?
4. **04's temporal beat** — streaming the answer line-by-line on scroll is the
   strongest ending but is the most bespoke to build. Confirm it is worth the
   extra effort versus assembling it like the others.
