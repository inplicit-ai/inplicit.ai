# Landing Page — Full Content Audit

> Every sentence and piece of copy from the current landing page, in both languages.
> Use this file to revise content, then hand it back for implementation.
>
> **Structure:** Each section maps to one component. Within each section, `EN` and `DE` are shown side by side.
> **How to edit:** Change the text under each language. Add notes or structural comments in `[brackets]`.

---

## 0. Navigation (Nav.astro)

| Element | EN | DE |
|---|---|---|
| Logo / Brand | inplicit.ai | inplicit.ai |
| CTA button | Join Waitlist | Zur Warteliste |
| Language toggle | DE | EN |

---

## 1. Hero (Hero.astro)

### Badge (above headline)

| EN | DE |
|---|---|
| AI-powered workforce intelligence | KI-gestützte Workforce Intelligence |

### Headline

| EN | DE |
|---|---|
| Line 1: **The answers are** | Line 1: **Die Antworten sind** |
| Line 2: **already within your organization.** | Line 2: **bereits in Ihrem Unternehmen.** |

### Subline

| EN | DE |
|---|---|
| inplicit.ai gives every person in your organisation a voice. Understand what your workforce truly knows, thinks, and needs. | Unsere KI-Agenten interviewen alle Mitarbeitenden - und liefern Ihnen direkt, was die Belegschaft wirklich weiß, denkt und braucht. |

### CTAs

| Element | EN | DE |
|---|---|---|
| Primary button | Join Waitlist | Zur Warteliste |
| Secondary button | How it works | Wie es funktioniert |

### Trust badges (below CTAs)

| EN | DE |
|---|---|
| ✓ GDPR compliant | ✓ DSGVO-konform |
| ✓ Works-council ready | ✓ Betriebsrat-ready |
| ✓ Data in EU | ✓ Daten in Frankfurt (EU) |
| ✓ EU AI Act compliant | ✓ EU AI Act konform |

---

## 2. The Problem (TheProblem.astro)

### Eyebrow

| EN | DE |
|---|---|
| The Problem | Das Problem |

### Headline

| EN | DE |
|---|---|
| Line 1: **What goes unheard** | Line 1: **Was ungehört bleibt,** |
| Line 2: **costs organisations everything.** | Line 2: **kostet.** |

### Column 1 — The knowledge gap

| Element | EN | DE |
|---|---|---|
| Card title | The knowledge gap | Die Wissenslücke |
| Body | It lives in people's heads. 80% of operational knowledge is never written down. 42% of what each employee knows, no colleague can cover. | Das Wissen steckt in den Köpfen der Menschen: 80% des operativen Wissens wird nie dokumentiert. 42% von dem, was jeder Mitarbeitende weiß, kann kein Kollege abdecken. |
| Callout (italic) | During a merger, a restructuring, a strategic pivot — that's exactly the knowledge that decides whether it works. | Ob Prozessreibung, strategische Lücken oder Expertise, die mit dem nächsten Wechsel verloren geht - es bleibt unsichtbar, bis jemand fragt. |

### Column 2 — Why existing tools fail

| Element | EN | DE |
|---|---|---|
| Card title | Why existing tools fail | Warum bestehende Tools scheitern |
| Body | Your tools only hear what they ask. Surveys ask 12 pre-set questions and get 12 pre-set answers. Consultants interview 20 people over 90 days. Town halls compress insight into consensus. | Was Ihre Mitarbeitenden wirklich denken, hören Sie selten. Meetings produzieren Konsens. Feedback wird abgemildert, bevor es Sie erreicht. |
| Callout (italic) | None of them surface what they didn't know to ask — and that gap is where transformations quietly fail. | Transformationen scheitern nicht an schlechten Plänen - sie scheitern an dem, was niemand ausgesprochen hat. Fortune-500-Unternehmen verlieren dadurch 31,5 Milliarden Dollar pro Jahr. |

### CTA

| EN | DE |
|---|---|
| Solve it now → | Jetzt lösen → |

---

## 3. How It Works (HowItWorks.astro)

### Section header

| Element | EN | DE |
|---|---|---|
| Eyebrow | How it works | Wie es funktioniert |
| Headline line 1 | **Four steps.** | **Vier Schritte.** |
| Headline line 2 | **From setup to clarity.** | **Vom Start zur Klarheit.** |

### Step 01 — Connect your existing knowledge

| Element | EN | DE |
|---|---|---|
| Step label | Step 01 | Schritt 01 |
| Heading | Connect your existing knowledge | Bestehende Wissensquellen anbinden |
| Body | Start by connecting your explicit knowledge sources. Slack, Outlook, Celonis, SAP or anything else your organisation runs on. This gives the interview agent context before the first conversation begins. | Verbinden Sie Ihre vorhandenen Datenquellen: Slack, Outlook, Celonis, SAP oder jedes andere System, auf dem Ihre Organisation läuft. So weiß unsere Interview-KI bereits vor dem ersten Gespräch den nötigen Kontext. |
| Mock UI — window title | Knowledge Sources | Wissensquellen |
| Mock UI — integration labels | Slack · Workspace messages / Microsoft 365 · Outlook & Teams / Celonis · Process data / Google Workspace · Drive & Calendar / inplicit Agent · 4 sources connected | Slack · Workspace-Nachrichten / Microsoft 365 · Outlook & Teams / Celonis · Prozessdaten / Google Workspace · Drive & Kalender / inplicit Agent · 4 Quellen verbunden |
| Status pill | Connected | Verbunden |

### Step 02 — Conversations that actually listen

| Element | EN | DE |
|---|---|---|
| Step label | Step 02 | Schritt 02 |
| Heading | Conversations that actually listen | KI-Interviews mit der gesamten Belegschaft |
| Body | AI agents talk with everyone in the organisation, not just leadership. Every statement is cross-validated, not just recorded. The result is a picture that is honest. | Unsere KI spricht mit allen Mitarbeitenden. Dabei passt sie sich in Echtzeit dem Kontext und den Antworten der interviewten Person an. So kann sie auch gute Nachfragen stellen, um implizites Wissen herauszufinden. |
| Stat 1 | 100+ Conversations in hours | 100+ Gespräche in Stunden |
| Stat 2 | 100% Of workforce reached | 100% der Belegschaft erreichbar |
| Mock chat — agent message 1 | Which process slows your team down the most? | Welcher Prozess bremst Ihr Team am stärksten? |
| Mock chat — user reply 1 | Cross-team sign-offs. No single owner. | Abteilungsübergreifende Freigaben. Keine klare Verantwortung. |
| Mock chat — agent message 2 | How often does that delay a project launch? | Wie oft verzögert das einen Projektstart? |
| Mock chat — user reply 2 | Almost every time. We build in 3 weeks of buffer now. | Fast immer. Wir planen mittlerweile 3 Wochen Puffer ein. |
| Mock UI tab labels | Call / Chat | Call / Chat |

### Step 03 — Results come together

| Element | EN | DE |
|---|---|---|
| Step label | Step 03 | Schritt 03 |
| Heading | Results come together | Muster werden sichtbar |
| Body | Hundreds of conversations happen at once. The AI spots patterns, forms clusters, and separates signal from noise. No manual analysis, no days of waiting. | Unsere KI kann hunderte Gespräche gleichzeitig führen und verarbeiten. Die KI erkennt Muster, bildet Cluster und filtert die wichtigsten Signale heraus - ohne manuelle Auswertung, ohne Wartezeit. |
| Stat 1 | 4 Hours to first insights | 3–4 Tage bis zu ersten Erkenntnissen |
| Stat 2 | 0 Manual analysis needed | 0 Keine manuelle Analyse |
| Mock UI — window title | Synthesis running | Synthese läuft |
| Mock UI — step labels | Conversations completed · 1,247 voices recorded / Cross-validating statements · Matching problems across interviews / Clusters forming · Connecting signal sources / Generating insights · Preparing your output | Gespräche geführt · 1.247 Stimmen erfasst / Aussagen kreuzvalidieren · Probleme über Interviews abgleichen / Cluster werden gebildet · Signalquellen werden verbunden / Erkenntnisse generieren · Bereitet Ergebnisse vor |
| Status labels | Done / Active / Pending | Fertig / Aktiv / Ausstehend |

### Step 04 — You see the full picture

| Element | EN | DE |
|---|---|---|
| Step label | Step 04 | Schritt 04 |
| Heading | You see the full picture | Sie sehen das vollständige Bild |
| Body | Pain points, opportunities, process gaps, and a knowledge map. Organised, prioritised, and ready for decisions. No 60-page report that nobody reads. | Sie erhalten alle Schwachstellen und Prozessineffizienzen, aber auch Innovationspotentiale und konkrete nächste Schritte in einem Maßnahmenplan - strukturiert, priorisiert und mit Einsparpotential. |
| Mock UI — Results window | Pain Points (14, across 5 teams) / Opportunities (8, action areas ready) / Process Gaps (11, prioritised by impact) / Knowledge Map (3 clusters visualised) | Schmerzpunkte (14, in 5 Teams) / Chancen (8, Handlungsfelder bereit) / Prozesslücken (11, priorisiert nach Impact) / Wissenskarte (3 Cluster visualisiert) |
| Mock UI — Opportunities window | Predictive Maintenance Hub · 89 voices · Operations · High / Smart Documentation Engine · 4h/day · Logistics & Admin · High / Internal Expert Network · 140 specialists · HR & R&D · Medium | Predictive Maintenance Hub · 89 Stimmen · Operations · Hoch / Smart Dokumentations-Engine · 4 h/Tag · Logistik & Admin · Hoch / Internes Expertennetzwerk · 140 Spezialisten · HR & F&E · Mittel |

---

## 4. Validation Loop (ValidationLoop.astro)

### Section header

| Element | EN | DE |
|---|---|---|
| Eyebrow | Proprietary process | Proprietärer Prozess |
| Headline line 1 | **The Validation Loop** | **Der Validierungskreislauf** |
| Headline line 2 | **Five stages. Zero noise.** | **Fünf Stufen. Kein Rauschen.** |
| Subline | A proprietary 5-stage process that turns what your workforce knows into action-ready insights. | Ein proprietärer 5-Stufen-Prozess, der das Wissen Ihrer Belegschaft in handlungsfertige Erkenntnisse verwandelt. |

### The 5 stages

| # | Label (EN) | Description (EN) | Label (DE) | Description (DE) |
|---|---|---|---|---|
| 01 | Listen | AI conversations with your entire workforce, cross-validated for honesty | Zuhören | KI-Gespräche mit der gesamten Belegschaft, kreuzvalidiert für Ehrlichkeit |
| 02 | Synthesise | Identify patterns and clusters across conversations and teams | Verdichten | Muster und Cluster über Gespräche und Teams hinweg erkennen |
| 03 | Generate | Derive concrete insights from synthesised signals | Generieren | Konkrete Erkenntnisse aus verdichteten Signalen ableiten |
| 04 | Validate | Test findings against real constraints and strategic goals | Validieren | Erkenntnisse gegen reale Einschränkungen und strategische Ziele prüfen |
| 05 | Converge | Deliver prioritised, action-ready results to decision level | Konvergieren | Priorisierte, handlungsfertige Ergebnisse für die Entscheidungsebene liefern |

---

## 5. Applications / Use Cases (Applications.astro)

### Section header

| Element | EN | DE |
|---|---|---|
| Eyebrow | Applications | Anwendungsfälle |
| Headline line 1 | **For any question** | **Für jede Frage,** |
| Headline line 2 | **your organisation needs to answer.** | **die Ihre Organisation beschäftigt.** |
| Subline | inplicit is not a tool for one use case. It is how organisations understand what their workforce truly knows. | Verwenden Sie inplicit für jede Frage, die Ihr Unternehmen beschäftigt. Es verändert die Art, wie Sie Ihre Organisationen verstehen, durch das was ihre Belegschaft wirklich weiß. |

### Card 1 — Strategy

| Element | EN | DE |
|---|---|---|
| Tag | Strategy | Strategie |
| Title | Find hidden opportunities first | Verborgene Chancen frühzeitig erkennen |
| Body | Strategic decisions are built on what gets filtered up. inplicit shows what gets lost along the way. Identify growth potential and white spaces before your competitors do. | Strategische Entscheidungen basieren auf dem, was nach oben gemeldet wird. inplicit zeigt, was dabei verloren geht - und wo Wachstumspotenziale liegen, bevor die Konkurrenz sie entdeckt. |

### Card 2 — Change Management

| Element | EN | DE |
|---|---|---|
| Tag | Change Management | Change Management |
| Title | Understand the real blockers | Echte Widerstände verstehen |
| Body | Transformation projects fail not because of missing budget, but because of unheard concerns. inplicit surfaces where genuine resistance lives before your rollout begins. | Transformationsprojekte scheitern selten an fehlendem Budget - meist an ungehörten Bedenken. inplicit zeigt, wo echter Widerstand sitzt, bevor das Rollout beginnt. |

### Card 3 — Process Improvement

| Element | EN | DE |
|---|---|---|
| Tag | Process Improvement | Prozessoptimierung |
| Title | Surface friction at every level | Reibungen sichtbar machen |
| Body | Process owners see metrics. Employees experience friction. inplicit bridges that gap and shows where work actually breaks down, at every level of the organisation. | Prozessverantwortliche sehen Metriken. Mitarbeitende erleben Reibung. inplicit schließt diese Lücke und zeigt, wo Arbeit wirklich stockt - auf jeder Ebene der Organisation. |

### Card 4 — Knowledge Retention

| Element | EN | DE |
|---|---|---|
| Tag | Knowledge Retention | Wissensmanagement |
| Title | Capture expertise before it walks out | Expertise sichern, bevor sie geht |
| Body | When key people leave, institutional knowledge goes with them. inplicit makes that knowledge visible and structured before it is too late. | Wenn Schlüsselpersonen das Unternehmen verlassen, verschwindet institutionelles Wissen mit ihnen. inplicit macht dieses implizite Wissen sichtbar und strukturiert - bevor es zu spät ist. |

---

## 6. Why inplicit / USP (USP.astro)

### Section header

| Element | EN | DE |
|---|---|---|
| Badge | Why inplicit | Warum inplicit |
| Headline line 1 | **Everything you need** | **Alles, was Sie brauchen,** |
| Headline line 2 | **to understand any organisation.** | **um Ihre Organisation wirklich zu verstehen.** |

### 6 Fact cards

| # | Title (EN) | Body (EN) | Title (DE) | Body (DE) |
|---|---|---|---|---|
| 1 | Your entire workforce, reached in hours | AI-led conversations scale to every employee. No scheduling, no interviewer fatigue, no hierarchy distorting what gets said. | Die gesamte Belegschaft, erreichbar in Stunden | KI-gestützte Gespräche skalieren auf alle Mitarbeitenden — ohne Terminplanung, ohne Interviewaufwand, ohne Verzerrung durch Hierarchien. |
| 2 | Thousands of voices, automatically clustered | Patterns and signal clusters form across teams and departments. No manual analysis, no days of waiting for results. | Tausende Stimmen, automatisch strukturiert | Muster und Signalcluster entstehen über Teams und Abteilungen hinweg — ohne manuelle Auswertung, ohne tagelange Wartezeit. |
| 3 | Not just problems. Directions. | Concrete areas for action emerge from the signals, not just a list of complaints. The AI shows what can be done next. | Nicht nur Probleme. Konkrete Handlungsfelder. | Aus den Signalen entstehen klare Handlungsfelder - keine bloße Problemliste. inplicit zeigt, wo als nächstes angesetzt werden kann. |
| 4 | First insights in 4 hours | No months-long analysis process. Your first results are ready in 4 hours, action-ready and without detours. | Erste Erkenntnisse in 3–4 Tagen | Kein monatelanger Analyseprozess. Die ersten Ergebnisse liegen in 3–4 Tagen vor - mit klaren Handlungsempfehlungen. |
| 5 | MCP connections for your workflows | Results flow directly into your existing tools and AI workflows. inplicit connects where your work actually happens. | Integration in Ihre bestehenden Tools | Ergebnisse fließen direkt in Ihre vorhandenen Tools und KI-Workflows. inplicit verbindet sich dort, wo Ihre Arbeit stattfindet. |
| 6 | The voice between humans and AI | When AI agents prepare decisions, they need human context. inplicit is the bridge: structured listening that informs AI systems with what people actually think. | Die Stimme zwischen Mensch und KI | Wenn KI-Agenten bei Unterscheidungen fundiert unterstützen sollen, benötigen Sie menschlichen Kontext. inplicit liefert diesen Kontext - strukturiert, geprüft und direkt von Ihren Mitarbeitenden. |

---

## 7. CTA / Pilot Request (DemoCTA.astro)

### Section header

| Element | EN | DE |
|---|---|---|
| Eyebrow | Get started | Jetzt starten |
| Headline line 1 | **Start with a pilot.** | **Starten Sie jetzt.** |
| Headline line 2 | **Results in one day.** | **Erste Erkenntnisse in einem Tag.** |
| Subline | No lengthy onboarding. No setup fee. Just a focused pilot that shows what is hidden inside your organisation. | Kein aufwendiges Onboarding. Keine Setup-Gebühr. Sehen Sie selbst, was in Ihrer Organisation verborgen liegt. |

### Deliverables list

| # | EN | DE |
|---|---|---|
| 1 | 30-minute AI interview session with your team | Unsere KI führt Interviews mit Ihrem gesamten Team |
| 2 | Pilot results overview — your first identified signals | Sie erhalten die Ergebnisse mit identifizierten Signalen |
| 3 | Gap analysis: what your current knowledge strategy is missing | Lückenanalyse: Was Ihrer aktuellen Wissensstrategie fehlt |
| 4 | Next-step recommendation based on your specific situation | Empfehlungen für die nächsten Schritte, basierend auf Ihrer spezifischen Situation |

### CTA button

| EN | DE |
|---|---|
| Join Waitlist | Zur Warteliste |

---

## 8. Footer (Footer.astro)

| Element | EN | DE |
|---|---|---|
| Copyright | © [year] inplicit.ai | © [year] inplicit.ai |
| Links | Imprint · Privacy · Terms | Impressum · Datenschutz · AGB |

---

## Notes & Observations for Revision

> Add your revision notes here before handing back to implementation.

### Content issues to address
- [ ] EN and DE are **not always aligned in intent** — e.g. the stat "4 Hours to first insights" (EN) vs "3–4 Tage" (DE) is inconsistent
- [ ] The hero subline differs significantly between EN and DE — DE is more product-forward, EN is more voice/empowerment-framed
- [ ] "MCP connections for your workflows" (USP card 5) is too technical for a general audience
- [ ] The DemoCTA deliverable list (EN) references "30-minute AI interview" — this conflicts with the scale promise of 100+ conversations made elsewhere
- [ ] "The Validation Loop" section name is internally-facing; consider whether it should be simplified for buyers

### Structural questions for the redesign
- [ ] Should "The Problem" section come before "How It Works" or after?
- [ ] Should the Validation Loop section be merged into How It Works?
- [ ] Does the site need a social proof / testimonial section?
- [ ] Should there be a pricing or ROI indicator section?
- [ ] Is "Applications" the right framing, or should this be buyer personas / industries?
