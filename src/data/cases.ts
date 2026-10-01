// Ein Fall laeuft durch die ganze Seite: Frage -> Interview -> Befunde ->
// Ergebnisfenster. Die Umschalter oben in der Loesung setzen den Fall, beide
// Komponenten lesen aus derselben Quelle.
export interface InsightTheme { l: string; v: number; k: 'p' | 'i' | 'c' }
export interface DashTheme { l: string; n: number; d: string }

export interface Case {
  id: string;
  tab: string;
  question: string;
  plan: string[];
  ask: string;
  answer: string;
  followup: string;
  themes: InsightTheme[];
  slices: { l: string; v: number }[];
  dash: {
    crumb: string;
    title: string;
    meta: string;
    participants: number;
    stats: { k: string; v: string; s: string; note?: boolean }[];
    q: string;
    a: string[];
    themes: DashTheme[];
  };
}

export const casesDe: Case[] = [
  {
    id: 'nachfolge',
    tab: 'Wissenstransfer',
    question: 'Welches Wissen geht mit dem Ruhestand?',
    plan: ['Aufgaben ohne Vertretung', 'Kontakte und Lieferanten', 'Sonderfälle und Ausnahmen', 'Dokumentation und Ablage', 'Einarbeitung der Nachfolge'],
    ask: 'Was wüssten Ihre Kolleginnen nicht, wenn Sie morgen aufhören?',
    answer: '„Welche Lieferanten bei welchem Problem wirklich schnell reagieren. Das steht in keiner Liste."',
    followup: 'Woher wissen Sie, wen Sie anrufen müssen?',
    themes: [{ l: 'Keine Vertretung', v: 100, k: 'p' }, { l: 'Kontakte nur im Kopf', v: 88, k: 'p' }, { l: 'Patenmodell vorgeschlagen', v: 62, k: 'i' }, { l: 'Wissen verschriftlichen', v: 48, k: 'c' }],
    slices: [{ l: 'Problem', v: 58 }, { l: 'Idee', v: 24 }, { l: 'Chance', v: 18 }],
    dash: {
      crumb: 'Wissenstransfer',
      title: 'Erfahrungswissen vor dem Ruhestand',
      meta: 'Ausgewertet · DE · 26 Min · 19 von 22 Gesprächen',
      participants: 19,
      stats: [
        { k: 'Teilnehmer', v: '19', s: 'befragt' },
        { k: 'Befunde', v: '14', s: 'Themen' },
        { k: 'Breit belegt', v: '6', s: 'von 14' },
        { k: 'Konfidenz', v: '84 %', s: 'der Befunde', note: true },
      ],
      q: 'Welches Wissen verlässt uns mit den nächsten Ruheständen?',
      a: ['für mehrere Aufgaben gibt es keine eingearbeitete Vertretung', 'die wichtigen Kontakte stehen in keiner gepflegten Liste', 'Sonderfälle werden nach Erfahrung entschieden, nicht nach Regel', 'die Einarbeitung der Nachfolge beginnt meist zu spät'],
      themes: [
        { l: 'Keine Vertretung', n: 16, d: 'Aufgaben hängen an einer Person' },
        { l: 'Kontakte nur im Kopf', n: 14, d: 'Wer bei welchem Problem hilft, ist ungeschrieben' },
        { l: 'Sonderfälle ungeklärt', n: 10, d: 'Ausnahmen folgen Erfahrung, nicht Regel' },
        { l: 'Einarbeitung spät', n: 7, d: 'Nachfolge startet kurz vor dem Austritt' },
      ],
    },
  },
  {
    id: 'ausbildung',
    tab: 'Duale Ausbildung',
    question: 'Wie verbessern wir die Ausbildung?',
    plan: ['Betreuung in den Abteilungen', 'Übergaben zwischen Stationen', 'Verhältnis Theorie und Praxis', 'Feedback und Beurteilung', 'Übernahme nach dem Abschluss'],
    ask: 'Was hat Ihnen in der Ausbildung am meisten gefehlt?',
    answer: '„In der neuen Abteilung wusste niemand, was ich vorher schon konnte. Ich habe drei Wochen zugeschaut."',
    followup: 'Wie wurde die Übergabe damals organisiert?',
    themes: [{ l: 'Betreuung schwankt', v: 100, k: 'p' }, { l: 'Übergaben fehlen', v: 82, k: 'p' }, { l: 'Lernpatenschaften', v: 58, k: 'i' }, { l: 'Übernahme früher klären', v: 44, k: 'c' }],
    slices: [{ l: 'Problem', v: 52 }, { l: 'Idee', v: 33 }, { l: 'Chance', v: 15 }],
    dash: {
      crumb: 'Duale Ausbildung',
      title: 'Ausbildung aus Sicht der Auszubildenden',
      meta: 'Ausgewertet · DE · 18 Min · 34 von 37 Gesprächen',
      participants: 34,
      stats: [
        { k: 'Teilnehmer', v: '34', s: 'befragt' },
        { k: 'Befunde', v: '9', s: 'Themen' },
        { k: 'Breit belegt', v: '5', s: 'von 9' },
        { k: 'Konfidenz', v: '88 %', s: 'der Befunde', note: true },
      ],
      q: 'Wie können wir unsere duale Ausbildung verbessern?',
      a: ['die Betreuungsqualität hängt stark an der einzelnen Abteilung', 'beim Wechsel zwischen Stationen geht der Lernstand verloren', 'Rückmeldung kommt meist erst zur Beurteilung', 'die Perspektive nach dem Abschluss bleibt lange offen'],
      themes: [
        { l: 'Betreuung schwankt', n: 27, d: 'Je nach Abteilung sehr unterschiedlich' },
        { l: 'Übergaben fehlen', n: 22, d: 'Der Lernstand wandert nicht mit' },
        { l: 'Wenig Feedback', n: 16, d: 'Rückmeldung erst zur Beurteilung' },
        { l: 'Perspektive unklar', n: 12, d: 'Übernahme wird spät besprochen' },
      ],
    },
  },
  {
    id: 'merger',
    tab: 'Post-Merger',
    question: 'Wo doppeln sich Abläufe nach dem Merger?',
    plan: ['Doppelte Zuständigkeiten', 'Systeme und Werkzeuge', 'Unterschiedliche Regeln', 'Kundenkontakt und Übergaben', 'Was beide Seiten behalten wollen'],
    ask: 'Welcher Ablauf läuft bei Ihnen anders als auf der anderen Seite?',
    answer: '„Wir geben Rabatte bis zehn Prozent selbst frei, drüben muss das immer die Leitung machen."',
    followup: 'Was passiert, wenn ein Kunde beide Wege kennt?',
    themes: [{ l: 'Doppelte Zuständigkeit', v: 100, k: 'p' }, { l: 'Systeme nebeneinander', v: 79, k: 'p' }, { l: 'Ein System pro Schritt', v: 55, k: 'i' }, { l: 'Bewährtes übernehmen', v: 41, k: 'c' }],
    slices: [{ l: 'Problem', v: 49 }, { l: 'Idee', v: 28 }, { l: 'Chance', v: 23 }],
    dash: {
      crumb: 'Post-Merger',
      title: 'Abläufe nach dem Zusammenschluss',
      meta: 'Ausgewertet · DE · 24 Min · 63 von 70 Gesprächen',
      participants: 63,
      stats: [
        { k: 'Teilnehmer', v: '63', s: 'befragt' },
        { k: 'Befunde', v: '16', s: 'Themen' },
        { k: 'Breit belegt', v: '9', s: 'von 16' },
        { k: 'Konfidenz', v: '93 %', s: 'der Befunde', note: true },
      ],
      q: 'Wo arbeiten die beiden Häuser heute noch aneinander vorbei?',
      a: ['für dieselbe Aufgabe gibt es auf beiden Seiten eine Zuständigkeit', 'zwei Systeme laufen parallel, gepflegt wird mal das eine, mal das andere', 'Freigabegrenzen und Regeln unterscheiden sich deutlich', 'Kunden erleben je nach Ansprechpartner einen anderen Weg'],
      themes: [
        { l: 'Doppelte Zuständigkeit', n: 48, d: 'Zwei Teams für denselben Schritt' },
        { l: 'Systeme nebeneinander', n: 38, d: 'Pflege verteilt sich auf beide' },
        { l: 'Regeln unterschiedlich', n: 32, d: 'Freigabegrenzen weichen voneinander ab' },
        { l: 'Kunde merkt es', n: 21, d: 'Unterschiedlicher Weg je nach Kontakt' },
      ],
    },
  },
  {
    id: 'angebot',
    tab: 'Prozesse',
    question: 'Wie läuft unsere Angebotserstellung?',
    plan: ['Kalkulation und Preisfindung', 'Vorlagen und Textbausteine', 'Freigaben ab welchem Volumen', 'Rückfragen aus dem Vertrieb', 'Übergabe an die Fachabteilung'],
    ask: 'Woran hängt ein Angebot bei Ihnen am längsten?',
    answer: '„Ich suche erst ein altes Angebot, das ungefähr passt. Die Preise darin sind oft nicht mehr aktuell."',
    followup: 'Woher wissen Sie, ob ein Preis noch stimmt?',
    themes: [{ l: 'Zeitverlust', v: 100, k: 'p' }, { l: 'Uneinheitliche Preise', v: 85, k: 'p' }, { l: 'Preisliste pflegen', v: 57, k: 'i' }, { l: 'Freigabegrenzen setzen', v: 43, k: 'c' }],
    slices: [{ l: 'Problem', v: 47 }, { l: 'Idee', v: 31 }, { l: 'Chance', v: 22 }],
    dash: {
      crumb: 'Angebotserstellung',
      title: 'Abläufe bei der Angebotserstellung',
      meta: 'Ausgewertet · DE · 22 Min · 41 von 48 Gesprächen',
      participants: 41,
      stats: [
        { k: 'Teilnehmer', v: '41', s: 'befragt' },
        { k: 'Befunde', v: '12', s: 'Themen' },
        { k: 'Breit belegt', v: '7', s: 'von 12' },
        { k: 'Konfidenz', v: '91 %', s: 'der Befunde', note: true },
      ],
      q: 'Wie läuft die Angebotserstellung heute wirklich ab?',
      a: ['Angebote entstehen überwiegend in Einzelarbeit und ohne gemeinsame Grundlage', 'die Kalkulation hängt an der Erfahrung einzelner Mitarbeitender', 'Preise und Textbausteine werden aus alten Angeboten kopiert, die niemand pflegt', 'Freigaben laufen je nach Volumen über unterschiedliche Wege'],
      themes: [
        { l: 'Zeitverlust', n: 34, d: 'Suche nach Vorlagen, Rückfragen zur Kalkulation' },
        { l: 'Uneinheitliche Preise', n: 29, d: 'Gleiche Leistung, unterschiedliche Angebote' },
        { l: 'Freigaben unklar', n: 23, d: 'Ab welchem Volumen wer zustimmt, ist nicht gesetzt' },
        { l: 'Nacharbeit', n: 17, d: 'Angebote gehen mehrfach zurück in die Fachabteilung' },
      ],
    },
  },
  {
    id: 'ki',
    tab: 'KI im Alltag',
    question: 'Wo würde KI im Alltag wirklich helfen?',
    plan: ['Wiederkehrende Schreibarbeit', 'Suche in Dokumenten', 'Prüfen und Abgleichen', 'Was auf keinen Fall automatisch läuft', 'Werkzeuge, die heute schon genutzt werden'],
    ask: 'Welche Aufgabe würden Sie heute schon abgeben?',
    answer: '„Das Zusammenfassen der Protokolle. Inhaltlich bringt es nichts, es dauert aber jede Woche zwei Stunden."',
    followup: 'Was daran müsste ein Mensch trotzdem prüfen?',
    themes: [{ l: 'Schreibarbeit', v: 100, k: 'p' }, { l: 'Suche in Dokumenten', v: 76, k: 'p' }, { l: 'Protokolle automatisch', v: 68, k: 'i' }, { l: 'Grenze bei Kundenkontakt', v: 45, k: 'c' }],
    slices: [{ l: 'Problem', v: 38 }, { l: 'Idee', v: 44 }, { l: 'Chance', v: 18 }],
    dash: {
      crumb: 'KI im Alltag',
      title: 'Wo KI im Arbeitsalltag entlasten würde',
      meta: 'Ausgewertet · DE · 19 Min · 57 von 62 Gesprächen',
      participants: 57,
      stats: [
        { k: 'Teilnehmer', v: '57', s: 'befragt' },
        { k: 'Befunde', v: '13', s: 'Themen' },
        { k: 'Breit belegt', v: '6', s: 'von 13' },
        { k: 'Konfidenz', v: '89 %', s: 'der Befunde', note: true },
      ],
      q: 'Wo würde KI im Arbeitsalltag wirklich entlasten?',
      a: ['wiederkehrende Schreibarbeit bindet Zeit ohne inhaltlichen Beitrag', 'das Suchen in gewachsenen Ablagen kostet mehr als das Lesen', 'Prüfen und Abgleichen folgt klaren Regeln', 'bei Entscheidungen mit Kundenkontakt soll ein Mensch gegenlesen'],
      themes: [
        { l: 'Schreibarbeit', n: 44, d: 'Protokolle, Zusammenfassungen, Standardtexte' },
        { l: 'Suche in Dokumenten', n: 34, d: 'Gewachsene Ablage ohne Struktur' },
        { l: 'Prüfen und Abgleich', n: 26, d: 'Regelbasiert, heute von Hand' },
        { l: 'Grenze gewünscht', n: 19, d: 'Kundenkontakt bleibt beim Menschen' },
      ],
    },
  },
  {
    id: 'zeit',
    tab: 'Tagesgeschäft',
    question: 'Wo verlieren wir im Alltag Zeit?',
    plan: ['Wartezeiten auf Zuarbeit', 'Suche nach Informationen', 'Doppelte Erfassung', 'Abstimmungen und Meetings', 'Wechsel zwischen Werkzeugen'],
    ask: 'Womit verbringen Sie Zeit, die eigentlich keine sein müsste?',
    answer: '„Ich trage dieselben Daten in zwei Systeme ein, weil die nicht miteinander reden."',
    followup: 'Wie oft kommt das in einer Woche vor?',
    themes: [{ l: 'Doppelte Erfassung', v: 100, k: 'p' }, { l: 'Warten auf Zuarbeit', v: 81, k: 'p' }, { l: 'Systeme verbinden', v: 59, k: 'i' }, { l: 'Zuständigkeiten klären', v: 46, k: 'c' }],
    slices: [{ l: 'Problem', v: 54 }, { l: 'Idee', v: 29 }, { l: 'Chance', v: 17 }],
    dash: {
      crumb: 'Tagesgeschäft',
      title: 'Zeitverluste im Tagesgeschäft',
      meta: 'Ausgewertet · DE · 20 Min · 86 von 94 Gesprächen',
      participants: 86,
      stats: [
        { k: 'Teilnehmer', v: '86', s: 'befragt' },
        { k: 'Befunde', v: '11', s: 'Themen' },
        { k: 'Breit belegt', v: '8', s: 'von 11' },
        { k: 'Konfidenz', v: '95 %', s: 'der Befunde', note: true },
      ],
      q: 'Wo geht im Tagesgeschäft die meiste Zeit verloren?',
      a: ['dieselben Daten werden in mehreren Systemen erfasst', 'Zuarbeit aus anderen Abteilungen kommt ohne feste Frist', 'Informationen werden gesucht statt gefunden', 'Abstimmungen ersetzen fehlende Zuständigkeiten'],
      themes: [
        { l: 'Doppelte Erfassung', n: 71, d: 'Zwei Systeme ohne Verbindung' },
        { l: 'Warten auf Zuarbeit', n: 58, d: 'Keine feste Frist, kein Status' },
        { l: 'Suche nach Infos', n: 51, d: 'Ablage ist historisch gewachsen' },
        { l: 'Abstimmungsschleifen', n: 34, d: 'Treffen klären, was Zuständigkeit klären sollte' },
      ],
    },
  },
  {
    id: 'training',
    tab: 'Wissenslücken',
    question: 'Wo fehlen uns Qualifikationen?',
    plan: ['Neue Anlagen und Werkzeuge', 'Aufgaben ohne sichere Routine', 'Schulungen und ihr Zeitpunkt', 'Lernen von Kolleginnen', 'Was als Nächstes gebraucht wird'],
    ask: 'Bei welcher Aufgabe fühlen Sie sich am unsichersten?',
    answer: '„An der neuen Anlage. Die Schulung war vor einem Jahr, gearbeitet habe ich seitdem dreimal damit."',
    followup: 'Wen fragen Sie, wenn Sie unsicher sind?',
    themes: [{ l: 'Übung fehlt', v: 100, k: 'p' }, { l: 'Schulung zu früh', v: 74, k: 'p' }, { l: 'Kollegiales Lernen', v: 63, k: 'i' }, { l: 'Skill-Matrix aufbauen', v: 49, k: 'c' }],
    slices: [{ l: 'Problem', v: 44 }, { l: 'Idee', v: 37 }, { l: 'Chance', v: 19 }],
    dash: {
      crumb: 'Wissenslücken',
      title: 'Qualifikationen und Trainingsbedarf',
      meta: 'Ausgewertet · DE · 17 Min · 52 von 58 Gesprächen',
      participants: 52,
      stats: [
        { k: 'Teilnehmer', v: '52', s: 'befragt' },
        { k: 'Befunde', v: '10', s: 'Themen' },
        { k: 'Breit belegt', v: '6', s: 'von 10' },
        { k: 'Konfidenz', v: '90 %', s: 'der Befunde', note: true },
      ],
      q: 'Wo fehlen uns Qualifikationen im Alltag?',
      a: ['an neuen Anlagen fehlt die Übung, nicht die Schulung', 'Trainings liegen oft lange vor dem ersten Einsatz', 'Unsicherheit wird unter Kolleginnen gelöst, nicht gemeldet', 'welche Qualifikation wo vorhanden ist, weiß niemand vollständig'],
      themes: [
        { l: 'Übung fehlt', n: 41, d: 'Schulung ja, Anwendung selten' },
        { l: 'Schulung zu früh', n: 31, d: 'Monate vor dem ersten Einsatz' },
        { l: 'Kollegiales Lernen', n: 26, d: 'Fragen gehen an Nachbarn, nicht an HR' },
        { l: 'Überblick fehlt', n: 20, d: 'Keine gepflegte Skill-Matrix' },
      ],
    },
  },
];

export const casesEn: Case[] = [
  {
    id: 'nachfolge', tab: 'Knowledge transfer',
    question: 'What knowledge leaves with retirement?',
    plan: ['Tasks without cover', 'Contacts and suppliers', 'Exceptions and special cases', 'Documentation and filing', 'Onboarding the successor'],
    ask: 'What would your colleagues not know if you stopped tomorrow?',
    answer: '“Which suppliers actually respond fast for which problem. That is on no list.”',
    followup: 'How do you know who to call?',
    themes: [{ l: 'No cover', v: 100, k: 'p' }, { l: 'Contacts only in heads', v: 88, k: 'p' }, { l: 'Buddy scheme proposed', v: 62, k: 'i' }, { l: 'Write the knowledge down', v: 48, k: 'c' }],
    slices: [{ l: 'Problem', v: 58 }, { l: 'Idea', v: 24 }, { l: 'Opportunity', v: 18 }],
    dash: {
      crumb: 'Knowledge transfer', title: 'Experience about to retire',
      meta: 'Analysed · EN · 26 min · 19 of 22 conversations', participants: 19,
      stats: [
        { k: 'Participants', v: '19', s: 'interviewed' }, { k: 'Findings', v: '14', s: 'themes' },
        { k: 'Broadly evidenced', v: '6', s: 'of 14' }, { k: 'Confidence', v: '84 %', s: 'of findings', note: true },
      ],
      q: 'What knowledge leaves us with the next retirements?',
      a: ['several tasks have no trained cover', 'the contacts that matter are on no maintained list', 'special cases are decided by experience, not by rule', 'onboarding the successor usually starts too late'],
      themes: [
        { l: 'No cover', n: 16, d: 'Tasks depend on one person' },
        { l: 'Contacts only in heads', n: 14, d: 'Who helps with what is unwritten' },
        { l: 'Exceptions unresolved', n: 10, d: 'Experience decides, not rules' },
        { l: 'Late onboarding', n: 7, d: 'Successor starts shortly before exit' },
      ],
    },
  },
  {
    id: 'ausbildung', tab: 'Apprenticeships',
    question: 'How do we improve our apprenticeships?',
    plan: ['Mentoring across departments', 'Handovers between stations', 'Theory against practice', 'Feedback and assessment', 'What happens after qualifying'],
    ask: 'What did you miss most during your training?',
    answer: '“In the new department nobody knew what I could already do. I watched for three weeks.”',
    followup: 'How was that handover organised?',
    themes: [{ l: 'Mentoring varies', v: 100, k: 'p' }, { l: 'Handovers missing', v: 82, k: 'p' }, { l: 'Peer mentoring', v: 58, k: 'i' }, { l: 'Decide retention earlier', v: 44, k: 'c' }],
    slices: [{ l: 'Problem', v: 52 }, { l: 'Idea', v: 33 }, { l: 'Opportunity', v: 15 }],
    dash: {
      crumb: 'Apprenticeships', title: 'Training seen by the apprentices',
      meta: 'Analysed · EN · 18 min · 34 of 37 conversations', participants: 34,
      stats: [
        { k: 'Participants', v: '34', s: 'interviewed' }, { k: 'Findings', v: '9', s: 'themes' },
        { k: 'Broadly evidenced', v: '5', s: 'of 9' }, { k: 'Confidence', v: '88 %', s: 'of findings', note: true },
      ],
      q: 'How can we improve our apprenticeship programme?',
      a: ['mentoring quality depends heavily on the individual department', 'progress is lost when apprentices move between stations', 'feedback usually arrives only at assessment time', 'the path after qualifying stays open for a long time'],
      themes: [
        { l: 'Mentoring varies', n: 27, d: 'Very different from department to department' },
        { l: 'Handovers missing', n: 22, d: 'Progress does not travel along' },
        { l: 'Little feedback', n: 16, d: 'Only at formal assessment' },
        { l: 'Unclear prospects', n: 12, d: 'Retention is discussed late' },
      ],
    },
  },
  {
    id: 'merger', tab: 'Post-merger',
    question: 'Where do processes double after a merger?',
    plan: ['Duplicate ownership', 'Systems and tools', 'Rules that differ', 'Customer contact and handovers', 'What both sides want to keep'],
    ask: 'Which process runs differently on your side?',
    answer: '“We approve discounts up to ten percent ourselves, over there it always goes to management.”',
    followup: 'What happens when a customer knows both routes?',
    themes: [{ l: 'Duplicate ownership', v: 100, k: 'p' }, { l: 'Parallel systems', v: 79, k: 'p' }, { l: 'One system per step', v: 55, k: 'i' }, { l: 'Adopt the better practice', v: 41, k: 'c' }],
    slices: [{ l: 'Problem', v: 49 }, { l: 'Idea', v: 28 }, { l: 'Opportunity', v: 23 }],
    dash: {
      crumb: 'Post-merger', title: 'Processes after the merger',
      meta: 'Analysed · EN · 24 min · 63 of 70 conversations', participants: 63,
      stats: [
        { k: 'Participants', v: '63', s: 'interviewed' }, { k: 'Findings', v: '16', s: 'themes' },
        { k: 'Broadly evidenced', v: '9', s: 'of 16' }, { k: 'Confidence', v: '93 %', s: 'of findings', note: true },
      ],
      q: 'Where do the two companies still work past each other?',
      a: ['the same task has an owner on each side', 'two systems run in parallel, each maintained some of the time', 'approval limits and rules differ noticeably', 'customers get a different route depending on their contact'],
      themes: [
        { l: 'Duplicate ownership', n: 48, d: 'Two teams for the same step' },
        { l: 'Parallel systems', n: 38, d: 'Maintenance splits across both' },
        { l: 'Rules differ', n: 32, d: 'Approval limits do not match' },
        { l: 'Customers notice', n: 21, d: 'Different route per contact' },
      ],
    },
  },
  {
    id: 'angebot',
    tab: 'Processes',
    question: 'How does our quoting process work?',
    plan: ['Costing and pricing', 'Templates and text blocks', 'Approval thresholds', 'Queries from sales', 'Handover to the department'],
    ask: 'What holds up a quote the longest for you?',
    answer: '“I first look for an old quote that roughly fits. The prices in it are often out of date.”',
    followup: 'How do you know whether a price still holds?',
    themes: [{ l: 'Time lost', v: 100, k: 'p' }, { l: 'Inconsistent pricing', v: 85, k: 'p' }, { l: 'Maintain a price list', v: 57, k: 'i' }, { l: 'Set approval limits', v: 43, k: 'c' }],
    slices: [{ l: 'Problem', v: 47 }, { l: 'Idea', v: 31 }, { l: 'Opportunity', v: 22 }],
    dash: {
      crumb: 'Quoting process', title: 'How quotes actually get written',
      meta: 'Analysed · EN · 22 min · 41 of 48 conversations', participants: 41,
      stats: [
        { k: 'Participants', v: '41', s: 'interviewed' }, { k: 'Findings', v: '12', s: 'themes' },
        { k: 'Broadly evidenced', v: '7', s: 'of 12' }, { k: 'Confidence', v: '91 %', s: 'of findings', note: true },
      ],
      q: 'How does our quoting process actually work today?',
      a: ['quotes are written individually, without a shared basis', 'pricing depends on the experience of a few people', 'prices and text blocks are copied from old quotes nobody maintains', 'approvals take different routes depending on deal size'],
      themes: [
        { l: 'Time lost', n: 34, d: 'Hunting for templates, queries about pricing' },
        { l: 'Inconsistent pricing', n: 29, d: 'Same service, different quotes' },
        { l: 'Unclear approvals', n: 23, d: 'Who signs off at what value is not set' },
        { l: 'Rework', n: 17, d: 'Quotes bounce back to the department repeatedly' },
      ],
    },
  },
  {
    id: 'ki', tab: 'AI at work',
    question: 'Where would AI genuinely help us?',
    plan: ['Repetitive writing', 'Searching documents', 'Checking and reconciling', 'What must never run automatically', 'Tools already in use'],
    ask: 'Which task would you hand over today?',
    answer: '“Summarising the minutes. It adds nothing, but it takes two hours every week.”',
    followup: 'What would a person still have to check?',
    themes: [{ l: 'Writing work', v: 100, k: 'p' }, { l: 'Searching documents', v: 76, k: 'p' }, { l: 'Automate minutes', v: 68, k: 'i' }, { l: 'Boundary at customer contact', v: 45, k: 'c' }],
    slices: [{ l: 'Problem', v: 38 }, { l: 'Idea', v: 44 }, { l: 'Opportunity', v: 18 }],
    dash: {
      crumb: 'AI at work', title: 'Where AI would take weight off',
      meta: 'Analysed · EN · 19 min · 57 of 62 conversations', participants: 57,
      stats: [
        { k: 'Participants', v: '57', s: 'interviewed' }, { k: 'Findings', v: '13', s: 'themes' },
        { k: 'Broadly evidenced', v: '6', s: 'of 13' }, { k: 'Confidence', v: '89 %', s: 'of findings', note: true },
      ],
      q: 'Where would AI genuinely take weight off the working day?',
      a: ['repetitive writing takes time without adding substance', 'searching grown filing costs more than reading', 'checking and reconciling follows clear rules', 'decisions touching customers should still be read by a person'],
      themes: [
        { l: 'Writing work', n: 44, d: 'Minutes, summaries, standard texts' },
        { l: 'Searching documents', n: 34, d: 'Filing grown without structure' },
        { l: 'Checking and matching', n: 26, d: 'Rule-based, done by hand today' },
        { l: 'Boundary wanted', n: 19, d: 'Customer contact stays with people' },
      ],
    },
  },
  {
    id: 'zeit', tab: 'Daily work',
    question: 'Where do we lose time day to day?',
    plan: ['Waiting for input', 'Searching for information', 'Duplicate entry', 'Coordination and meetings', 'Switching between tools'],
    ask: 'What takes time that really should not?',
    answer: '“I enter the same data into two systems because they do not talk to each other.”',
    followup: 'How often does that happen in a week?',
    themes: [{ l: 'Duplicate entry', v: 100, k: 'p' }, { l: 'Waiting for input', v: 81, k: 'p' }, { l: 'Connect the systems', v: 59, k: 'i' }, { l: 'Clarify ownership', v: 46, k: 'c' }],
    slices: [{ l: 'Problem', v: 54 }, { l: 'Idea', v: 29 }, { l: 'Opportunity', v: 17 }],
    dash: {
      crumb: 'Daily work', title: 'Where the working day goes',
      meta: 'Analysed · EN · 20 min · 86 of 94 conversations', participants: 86,
      stats: [
        { k: 'Participants', v: '86', s: 'interviewed' }, { k: 'Findings', v: '11', s: 'themes' },
        { k: 'Broadly evidenced', v: '8', s: 'of 11' }, { k: 'Confidence', v: '95 %', s: 'of findings', note: true },
      ],
      q: 'Where does most of the working day get lost?',
      a: ['the same data is entered into several systems', 'input from other departments arrives without a deadline', 'information is searched for rather than found', 'meetings substitute for missing ownership'],
      themes: [
        { l: 'Duplicate entry', n: 71, d: 'Two systems with no connection' },
        { l: 'Waiting for input', n: 58, d: 'No deadline, no status' },
        { l: 'Searching for info', n: 51, d: 'Filing has grown historically' },
        { l: 'Coordination loops', n: 34, d: 'Meetings settle what ownership should' },
      ],
    },
  },
  {
    id: 'training', tab: 'Skill gaps',
    question: 'Where are we short on skills?',
    plan: ['New machines and tools', 'Tasks without a safe routine', 'Training and its timing', 'Learning from colleagues', 'What will be needed next'],
    ask: 'Which task do you feel least sure about?',
    answer: '“The new machine. Training was a year ago, I have used it three times since.”',
    followup: 'Who do you ask when you are unsure?',
    themes: [{ l: 'Practice missing', v: 100, k: 'p' }, { l: 'Training too early', v: 74, k: 'p' }, { l: 'Peer learning', v: 63, k: 'i' }, { l: 'Build a skill matrix', v: 49, k: 'c' }],
    slices: [{ l: 'Problem', v: 44 }, { l: 'Idea', v: 37 }, { l: 'Opportunity', v: 19 }],
    dash: {
      crumb: 'Skill gaps', title: 'Skills and training needs',
      meta: 'Analysed · EN · 17 min · 52 of 58 conversations', participants: 52,
      stats: [
        { k: 'Participants', v: '52', s: 'interviewed' }, { k: 'Findings', v: '10', s: 'themes' },
        { k: 'Broadly evidenced', v: '6', s: 'of 10' }, { k: 'Confidence', v: '90 %', s: 'of findings', note: true },
      ],
      q: 'Where are we short on skills day to day?',
      a: ['on new machines it is practice that is missing, not training', 'training often happens long before first use', 'uncertainty is solved among colleagues, not reported', 'nobody has a full picture of which skills sit where'],
      themes: [
        { l: 'Practice missing', n: 41, d: 'Trained yes, applied rarely' },
        { l: 'Training too early', n: 31, d: 'Months before first use' },
        { l: 'Peer learning', n: 26, d: 'Questions go to neighbours, not HR' },
        { l: 'No overview', n: 20, d: 'No maintained skill matrix' },
      ],
    },
  },
];
