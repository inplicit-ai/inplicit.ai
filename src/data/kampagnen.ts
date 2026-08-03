// Content for the campaign landing pages under /de/. The components in
// src/components/kampagne/ hold layout and styling only; every visible string
// lives here, so a new campaign page is a new entry plus a thin page file.

export interface KampagneContent {
  slug: string;
  /** Prefix for the PostHog events this page emits. */
  analyticsPrefix: string;
  seo: { title: string; description: string; canonical: string; ogImage: string };
  navCtaLabel: string;
  hero: {
    pill: string;
    /** Three headline lines; the third renders in the muted ghost colour. */
    lines: [string, string, string];
    sub: string;
    ctaLabel: string;
    microcopy: string;
    audience: string;
    video: string;
    poster: string;
    faces: number[];
  };
  problem: {
    eyebrow: string;
    heading: string;
    sub: string;
    cards: { icon: 'user' | 'doc' | 'compass'; title: string; body: string }[];
  };
  process: {
    eyebrow: string;
    heading: string;
    sub: string;
    steps: { num: string; title: string; body: string }[];
  };
  deliverables: {
    eyebrow: string;
    heading: string;
    items: { icon: 'readout' | 'map' | 'list' | 'search'; tag: string; title: string; body: string }[];
  };
  audience: {
    eyebrow: string;
    heading: string;
    /** Second heading line, rendered in the muted ghost colour. */
    headingGhost: string;
    sub: string;
    groups: { label: string; people: number[] }[];
  };
  aiLayer: { eyebrow: string; heading: string; sub: string; points: string[] };
  positioning: {
    eyebrow: string;
    heading: string;
    columns: { title: string; body: string; highlight: boolean }[];
  };
  cta: { eyebrow: string; heading: string; sub: string; microcopy: string; trust: string[] };
  faq: { eyebrow: string; heading: string; items: { q: string; a: string }[] };
}

// Trust hints are only claims the rest of the site already makes
// (Hero meta line, TrustSecurity section).
const TRUST = ['DSGVO-konform', 'Anonymes Feedback', 'Betriebsrat früh einbindbar'];

const MCP_POINT = 'Anschlussfähig an Claude, Gemini, ChatGPT und Copilot über MCP';
const SOURCE_POINT = 'Antworten mit Beleg zur anonymen Quelle statt generischer Auskünfte';

export const wissensbasis: KampagneContent = {
  slug: 'company-brain',
  analyticsPrefix: 'company_brain',
  seo: {
    title: 'Company Brain Kampagne | Inplicit',
    description:
      'Machen Sie verborgenes Erfahrungswissen, informelle Abläufe und kritische Wissensrisiken in Ihrer Organisation sichtbar.',
    canonical: 'https://inplicit.ai/de/wissensbasis',
    ogImage: 'https://inplicit.ai/company-brain-poster.jpg',
  },
  navCtaLabel: 'Kampagne besprechen',
  hero: {
    pill: 'Wissensbasis',
    lines: ['Ein Company Brain,', 'das aus Ihrer Belegschaft', 'entsteht.'],
    sub: 'Machen Sie das Wissen, die Erfahrungen und die informellen Lösungen Ihrer Mitarbeitenden dauerhaft nutzbar, statt darauf zu hoffen, dass sie irgendwann dokumentiert werden.',
    ctaLabel: 'Company Brain Kampagne besprechen',
    microcopy: 'In 20 Minuten klären wir, welche Wissensbereiche Sie zuerst sichtbar machen sollten.',
    audience: 'Für Geschäftsführung, Operations und Transformationsteams',
    video: '/company-brain-hero.mp4',
    poster: '/company-brain-poster.jpg',
    faces: [2, 5, 9, 12, 7],
  },
  problem: {
    eyebrow: 'Ausgangslage',
    heading: 'Das wichtigste Wissen Ihrer Organisation steht selten im Handbuch.',
    sub: 'Wie Arbeit wirklich funktioniert, welche Ausnahmen Teams täglich lösen und wer kritisches Erfahrungswissen besitzt, bleibt oft unsichtbar. Das wird zum Risiko, wenn Organisationen wachsen, sich verändern oder Schlüsselpersonen fehlen.',
    cards: [
      {
        icon: 'user',
        title: 'Wissen hängt an Personen',
        body: 'Erfahrene Mitarbeitende kennen Ausnahmen, Kunden und funktionierende Wege, oft ohne dass dieses Wissen strukturiert verfügbar ist.',
      },
      {
        icon: 'doc',
        title: 'Dokumentation zeigt nicht die Realität',
        body: 'Prozesse beschreiben den Soll-Zustand. Die informellen Lösungen im Arbeitsalltag bleiben unsichtbar.',
      },
      {
        icon: 'compass',
        title: 'Führung entscheidet mit Lücken',
        body: 'Ohne die Perspektive der Belegschaft bleiben Risiken, Engpässe und Chancen oft zu lange verborgen.',
      },
    ],
  },
  process: {
    eyebrow: 'Company Brain Kampagne',
    heading: 'In wenigen Wochen vom verstreuten Wissen zu klaren Entscheidungen.',
    sub: 'Eine fokussierte Kampagne für eine konkrete Organisationseinheit, einen Standort oder ein unternehmensweites Thema.',
    steps: [
      {
        num: '01',
        title: 'Zuhören',
        body: 'Inplicit führt strukturierte, vertrauliche AI-gestützte Gespräche mit den relevanten Mitarbeitenden.',
      },
      {
        num: '02',
        title: 'Verstehen',
        body: 'Wiederkehrende Muster, Wissensrisiken, Reibungspunkte und informelle Expertennetzwerke werden sichtbar.',
      },
      {
        num: '03',
        title: 'Handeln',
        body: 'Leadership erhält eine priorisierte Grundlage für Übergaben, Prozessverbesserungen und nächste Entscheidungen.',
      },
    ],
  },
  deliverables: {
    eyebrow: 'Ergebnisse',
    heading: 'Was am Ende der Kampagne vorliegt.',
    items: [
      {
        icon: 'readout',
        tag: 'Leadership',
        title: 'Executive Readout',
        body: 'Die wichtigsten Muster und Entscheidungen für Führungskräfte.',
      },
      {
        icon: 'map',
        tag: 'Risiko',
        title: 'Wissens- und Risikokarte',
        body: 'Wo kritisches Wissen liegt, fehlt oder an einzelnen Personen hängt.',
      },
      {
        icon: 'list',
        tag: 'Priorisierung',
        title: 'Priorisierte Handlungsfelder',
        body: 'Welche Themen zuerst gesichert, verbessert oder weiter untersucht werden sollten.',
      },
      {
        icon: 'search',
        tag: 'Wissensbasis',
        title: 'Strukturierte Wissensbasis',
        body: 'Eine durchsuchbare Grundlage, die über die Kampagne hinaus nutzbar bleibt.',
      },
    ],
  },
  audience: {
    eyebrow: 'Teilnehmende',
    heading: 'Nicht nur die lautesten Stimmen.',
    headingGhost: 'Die Menschen, die die Arbeit kennen.',
    sub: 'Je nach Fragestellung beziehen wir die Teams ein, die Prozesse täglich ausführen und relevantes Wissen unmittelbar erleben.',
    groups: [
      { label: 'Produktion und operative Teams', people: [1, 4, 8] },
      { label: 'Service und Kundenkontakt', people: [2, 11] },
      { label: 'Vertrieb', people: [7, 3] },
      { label: 'Teamleads und Schlüsselrollen', people: [5, 6, 9] },
      { label: 'Zentrale Funktionen und Schnittstellen', people: [10, 12] },
    ],
  },
  aiLayer: {
    eyebrow: 'KI-Anbindung',
    heading: 'Die menschliche Kontext-Ebene, auf die auch Ihre KI-Tools zugreifen können.',
    sub: 'Das meiste Wissen einer Organisation steht in keinem Dokument. Das Company Brain macht dieses Erfahrungswissen strukturiert verfügbar und übergibt es per MCP an die KI-Tools, mit denen Ihre Teams ohnehin arbeiten.',
    points: ['Erfahrungswissen aus Gesprächen, nicht nur Dokumente und Systeme', MCP_POINT, SOURCE_POINT],
  },
  positioning: {
    eyebrow: 'Einordnung',
    heading: 'Mehr Tiefe als eine Befragung. Wiederholbarer als Beratung.',
    columns: [
      { title: 'Befragungen', body: 'Skalierbar, aber meist vorgegebene und oberflächliche Antworten.', highlight: false },
      { title: 'Beratung', body: 'Tiefgehend, aber häufig langsam, selektiv und einmalig.', highlight: false },
      { title: 'Inplicit', body: 'Qualitative Gespräche in der Breite, als wiederholbare Wissensbasis.', highlight: true },
    ],
  },
  cta: {
    eyebrow: 'Nächster Schritt',
    heading: 'Machen Sie sichtbar, was Ihre Organisation bereits weiß.',
    sub: 'Starten Sie mit einer konkreten Fragestellung. Gemeinsam definieren wir, welche Teams und Wissensbereiche für Ihre nächste Entscheidung relevant sind.',
    microcopy: '20 Minuten. Kein Standard-Pitch. Eine erste Einschätzung Ihrer Wissensrisiken und Potenziale.',
    trust: TRUST,
  },
  faq: {
    eyebrow: 'Häufige Fragen',
    heading: 'Was vor dem Start üblicherweise zu klären ist.',
    items: [
      {
        q: 'Wie lange dauert eine Company Brain Kampagne?',
        a: 'Der genaue Umfang hängt von Fragestellung und Zielgruppe ab. Eine fokussierte Kampagne kann innerhalb weniger Wochen vorbereitet, durchgeführt und ausgewertet werden.',
      },
      {
        q: 'Wer wird interviewt?',
        a: 'Die relevanten Mitarbeitenden, Teams und Schlüsselrollen werden gemeinsam mit Ihnen anhand Ihrer Fragestellung definiert.',
      },
      {
        q: 'Ist das eine Mitarbeiterbefragung?',
        a: 'Nein. Inplicit arbeitet mit strukturierten Gesprächen, die auf Antworten eingehen und Hintergründe, Workarounds sowie konkrete Lösungsvorschläge sichtbar machen.',
      },
      {
        q: 'Was erhält das Management?',
        a: 'Ein verdichtetes Executive Readout, priorisierte Muster und Risiken sowie eine strukturierte Grundlage für nächste Entscheidungen.',
      },
      {
        q: 'Wie funktioniert der Einstieg?',
        a: 'In einem kurzen Scoping-Gespräch definieren wir Ihre Fragestellung, Zielgruppe und den passenden Umfang der Kampagne.',
      },
    ],
  },
};

export const wissenstransfer: KampagneContent = {
  slug: 'wissenstransfer',
  analyticsPrefix: 'wissenstransfer',
  seo: {
    title: 'Wissenstransfer-Kampagne | Inplicit',
    description:
      'Sichern Sie das Erfahrungswissen von Schlüsselrollen, bevor es Ihre Organisation verlässt. Wissensrisiken und Übergabeprioritäten sichtbar machen.',
    canonical: 'https://inplicit.ai/de/wissenstransfer',
    ogImage: 'https://inplicit.ai/hero-poster.jpg',
  },
  navCtaLabel: 'Kampagne besprechen',
  hero: {
    pill: 'Wissenstransfer',
    lines: ['Wissen sichern, bevor', 'die Erfahrung das Haus', 'verlässt.'],
    sub: 'Wenn erfahrene Mitarbeitende in den Ruhestand gehen oder die Rolle wechseln, geht undokumentiertes Wissen mit. Machen Sie sichtbar, was an einzelnen Personen hängt, und übersetzen Sie es in eine nutzbare Wissensbasis.',
    ctaLabel: 'Wissenstransfer-Kampagne besprechen',
    microcopy: 'In 20 Minuten klären wir, welche Rollen und Wissensbereiche Sie zuerst sichern sollten.',
    audience: 'Für Geschäftsführung, Personal und Fachbereichsleitung',
    video: '/hero-bg.mp4',
    poster: '/hero-poster.jpg',
    faces: [6, 3, 10, 1, 8],
  },
  problem: {
    eyebrow: 'Ausgangslage',
    heading: 'Der Austritt ist geplant. Das Wissen dahinter meistens nicht.',
    sub: 'Eine Übergabe dauert Wochen, das Erfahrungswissen einer Rolle ist über Jahre gewachsen. Was in eine Checkliste passt, ist selten das, was die Arbeit im Ausnahmefall trägt.',
    cards: [
      {
        icon: 'user',
        title: 'Wissen hängt an einzelnen Rollen',
        body: 'Wer seit Jahren dieselbe Anlage, Kundengruppe oder Sonderfälle betreut, trägt Wissen, das nirgends hinterlegt ist.',
      },
      {
        icon: 'doc',
        title: 'Übergaben decken nur die Routine ab',
        body: 'Standardabläufe lassen sich beschreiben. Ausnahmen, Workarounds und informelle Wege bleiben ungesagt.',
      },
      {
        icon: 'compass',
        title: 'Der Zeitpunkt ist bekannt, die Lücke nicht',
        body: 'Austritte sind planbar. Welches Wissen tatsächlich fehlen wird, zeigt sich meist erst danach.',
      },
    ],
  },
  process: {
    eyebrow: 'Wissenstransfer-Kampagne',
    heading: 'Von der geplanten Nachbesetzung zum gesicherten Wissen.',
    sub: 'Eine fokussierte Kampagne für Schlüsselrollen, ein Team oder einen Standort mit anstehenden Wechseln.',
    steps: [
      {
        num: '01',
        title: 'Zuhören',
        body: 'Inplicit führt strukturierte, vertrauliche AI-gestützte Gespräche mit den ausscheidenden Fachkräften und ihrem direkten Umfeld.',
      },
      {
        num: '02',
        title: 'Verstehen',
        body: 'Sichtbar wird, welches Wissen an einzelnen Personen hängt, wo Ausnahmen und Sonderfälle liegen und wer sonst darüber verfügt.',
      },
      {
        num: '03',
        title: 'Übergeben',
        body: 'Nachfolge und Führung erhalten eine priorisierte Grundlage für Einarbeitung, Übergabe und verbleibende Wissenslücken.',
      },
    ],
  },
  deliverables: {
    eyebrow: 'Ergebnisse',
    heading: 'Was am Ende der Kampagne vorliegt.',
    items: [
      {
        icon: 'readout',
        tag: 'Leadership',
        title: 'Executive Readout',
        body: 'Die wichtigsten Wissensrisiken und Entscheidungen für Führungskräfte.',
      },
      {
        icon: 'map',
        tag: 'Risiko',
        title: 'Wissens- und Risikokarte',
        body: 'Welches Wissen an einzelnen Personen hängt und wo es keine zweite Person gibt.',
      },
      {
        icon: 'list',
        tag: 'Priorisierung',
        title: 'Übergabe-Prioritäten',
        body: 'Welche Themen vor dem Austritt zwingend übergeben werden sollten.',
      },
      {
        icon: 'search',
        tag: 'Wissensbasis',
        title: 'Strukturierte Wissensbasis',
        body: 'Eine durchsuchbare Grundlage, auf die die Nachfolge auch nach der Übergabe zugreift.',
      },
    ],
  },
  audience: {
    eyebrow: 'Teilnehmende',
    heading: 'Nicht nur die ausscheidende Person.',
    headingGhost: 'Auch alle, die täglich mit ihr arbeiten.',
    sub: 'Erfahrungswissen zeigt sich im Zusammenspiel. Wir beziehen die Rolle selbst, ihr direktes Umfeld und die Nachfolge ein.',
    groups: [
      { label: 'Fachkräfte vor dem Austritt', people: [6, 5] },
      { label: 'Nachfolge und Einarbeitung', people: [3, 12] },
      { label: 'Direktes Team und Schnittstellen', people: [1, 4, 8] },
      { label: 'Teamleads und Führung', people: [9, 2] },
      { label: 'Service, Instandhaltung und Sonderfälle', people: [10, 11, 7] },
    ],
  },
  aiLayer: {
    eyebrow: 'KI-Anbindung',
    heading: 'Gesichertes Wissen, auf das auch Ihre KI-Tools zugreifen können.',
    sub: 'Das Wissen einer ausscheidenden Rolle bleibt nicht in einem Übergabedokument liegen. Es wird strukturiert verfügbar und per MCP an die KI-Tools übergeben, mit denen Ihre Teams ohnehin arbeiten.',
    points: ['Erfahrungswissen aus Gesprächen, nicht nur Übergabeprotokolle', MCP_POINT, SOURCE_POINT],
  },
  positioning: {
    eyebrow: 'Einordnung',
    heading: 'Mehr Tiefe als ein Übergabedokument. Schneller als Learning by Doing.',
    columns: [
      { title: 'Übergabedokumente', body: 'Schnell erstellt, aber meist auf Routineabläufe beschränkt.', highlight: false },
      { title: 'Einarbeitung im Alltag', body: 'Wirksam, aber langsam und abhängig davon, wer noch da ist.', highlight: false },
      { title: 'Inplicit', body: 'Strukturierte Gespräche vor dem Austritt, als bleibende Wissensbasis.', highlight: true },
    ],
  },
  cta: {
    eyebrow: 'Nächster Schritt',
    heading: 'Sichern Sie das Wissen, solange es noch im Haus ist.',
    sub: 'Starten Sie mit den Rollen, deren Wechsel bereits feststeht. Gemeinsam definieren wir, welches Wissen zuerst gesichert werden sollte.',
    microcopy: '20 Minuten. Kein Standard-Pitch. Eine erste Einschätzung Ihrer Wissensrisiken bei anstehenden Wechseln.',
    trust: TRUST,
  },
  faq: {
    eyebrow: 'Häufige Fragen',
    heading: 'Was vor dem Start üblicherweise zu klären ist.',
    items: [
      {
        q: 'Wie lange dauert eine Wissenstransfer-Kampagne?',
        a: 'Der genaue Umfang hängt von den betroffenen Rollen und der Zielgruppe ab. Eine fokussierte Kampagne kann innerhalb weniger Wochen vorbereitet, durchgeführt und ausgewertet werden.',
      },
      {
        q: 'Wer wird interviewt?',
        a: 'Die ausscheidenden Fachkräfte, ihr direktes Umfeld und die Nachfolge werden gemeinsam mit Ihnen definiert.',
      },
      {
        q: 'Ersetzt das die klassische Übergabe?',
        a: 'Nein. Inplicit macht sichtbar, was in einer Übergabe üblicherweise nicht zur Sprache kommt, und liefert die Grundlage dafür, dass die Übergabe die richtigen Themen trifft.',
      },
      {
        q: 'Was erhält das Management?',
        a: 'Ein verdichtetes Executive Readout, priorisierte Wissensrisiken sowie eine strukturierte Grundlage für Übergabe und Nachbesetzung.',
      },
      {
        q: 'Wie funktioniert der Einstieg?',
        a: 'In einem kurzen Scoping-Gespräch definieren wir die betroffenen Rollen, die Zielgruppe und den passenden Umfang der Kampagne.',
      },
    ],
  },
};
