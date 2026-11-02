// Studien fuer die Research-Seite (Preview), als Zeitleiste nach Simile:
// Jahr, Aussage, Paper, was die Studie zeigt, was wir daraus machen, dazu
// eine Grafik je Studie (StudyVisual.astro, nach `id`). Zahlen vor Livegang
// am Original pruefen. `reviewed` nur setzen, wenn die Arbeit begutachtet
// erschienen ist; Preprints, Working Papers und Presseberichte bleiben false.
export interface Bar { l: string; v: number }
export interface Study {
  id: 'usc' | 'illinois' | 'stanford' | 'lmu' | 'harvard' | 'mit';
  logo: string;
  org: string;
  authors: string;
  paper: string;
  year: number;
  venue: string;
  reviewed: boolean;
  title: string;
  stats?: { v: string; l: string }[];
  bars?: { caption: string; items: Bar[] };
  body: string;
  ours: string;
  href: string;
}

// Chronologisch; die Zeitleiste liest von oben nach unten.
export const studiesDe: Study[] = [
  {
    id: 'usc',
    logo: '/research-logos/usc.svg',
    org: 'University of Southern California',
    authors: 'Lucas, Gratch, King, Morency',
    paper: 'It’s only a computer: Virtual humans increase willingness to disclose',
    year: 2014,
    venue: 'Computers in Human Behavior',
    reviewed: true,
    title: 'Wer glaubt, mit einer Maschine zu sprechen, öffnet sich mehr.',
    body: 'Alle sprachen mit derselben virtuellen Person. Wer glaubte, sie werde von einem Computer gesteuert, sprach offener und achtete weniger darauf, wie er wirkt.',
    ours: 'Bei Themen wie Überlastung, Führung oder Fehlern ist das der Unterschied zum Workshop.',
    href: 'https://doi.org/10.1016/j.chb.2014.04.043',
  },
  {
    id: 'illinois',
    logo: '/research-logos/illinois.svg',
    org: 'University of Illinois & IBM',
    authors: 'Xiao, Zhou, Liao et al.',
    paper: 'Tell Me About Yourself: Using an AI-Powered Chatbot to Conduct Conversational Surveys',
    year: 2020,
    venue: 'ACM TOCHI',
    reviewed: true,
    title: 'Im Gespräch kommen bessere offene Antworten als im Fragebogen.',
    body: 'Rund 600 Teilnehmende, Chat gegen Qualtrics-Fragebogen. Die Antworten im Gespräch waren informativer, relevanter, genauer und klarer.',
    ours: 'Unser Interviewer fragt nach, wo ein Fragebogen weiterblättert.',
    href: 'https://doi.org/10.1145/3381804',
  },
  {
    id: 'stanford',
    logo: '/research-logos/stanford.svg',
    org: 'Stanford & Google DeepMind',
    authors: 'Park, Zou, Shaw et al.',
    paper: 'Generative Agent Simulations of 1,000 People',
    year: 2024,
    venue: 'arXiv',
    reviewed: false,
    title: 'Zwei Stunden Gespräch reichen, um die Haltungen eines Menschen nachzubilden.',
    bars: {
      caption: 'Genauigkeit bei den Antworten im General Social Survey, 1.052 Personen',
      items: [{ l: 'Person selbst, zwei Wochen später', v: 100 }, { l: 'Agent aus dem Interview', v: 85 }],
    },
    body: '1.052 Menschen sprachen je zwei Stunden mit einem KI-Interviewer. Agenten aus diesen Transkripten antworteten zu 85 % so genau, wie die Personen sich selbst wiederholten.',
    ours: 'Ein langes Gespräch trägt mehr als jede Skala. Deshalb dauern unsere Interviews 20 bis 30 Minuten.',
    href: 'https://arxiv.org/abs/2411.10109',
  },
  {
    id: 'lmu',
    logo: '/research-logos/lmu.svg',
    org: 'LMU München, Mannheim & Oxford',
    authors: 'Wuttke, Aßenmacher, Klamm et al.',
    paper: 'AI Conversational Interviewing: Transforming Surveys with LLMs as Adaptive Interviewers',
    year: 2024,
    venue: 'arXiv',
    reviewed: false,
    title: 'KI-Interviewer liefern Daten in vergleichbarer Qualität wie Menschen.',
    body: 'Kleine Stichprobe aus Studierenden. Menschen hörten nicht immer aktiv zu, die KI fragte nicht immer passend nach.',
    ours: 'Gutes Nachfragen ist der schwierige Teil. Genau daran arbeitet unsere Gesprächssteuerung.',
    href: 'https://arxiv.org/abs/2410.01824',
  },
  {
    id: 'harvard',
    logo: '/research-logos/harvard.svg',
    org: 'Harvard Business School & BCG',
    authors: 'Dell’Acqua, McFowland, Mollick et al.',
    paper: 'Navigating the Jagged Technological Frontier',
    year: 2026,
    venue: 'Organization Science',
    reviewed: true,
    title: 'Mit KI arbeiten Beraterinnen und Berater schneller, solange die Aufgabe passt.',
    stats: [
      { v: '+12,2 %', l: 'mehr erledigte Aufgaben' },
      { v: '25,1 %', l: 'schneller' },
      { v: '−19 %', l: 'richtige Lösungen bei Aufgaben jenseits der KI' },
    ],
    body: '758 Beraterinnen und Berater der Boston Consulting Group lösten realistische Aufgaben mit und ohne KI. Bei Aufgaben, die KI nicht gut kann, lagen sie mit KI öfter falsch.',
    ours: 'Die KI führt bei uns die Gespräche. Deuten und entscheiden bleibt bei Menschen.',
    href: 'https://doi.org/10.1287/orsc.2025.21838',
  },
  {
    id: 'mit',
    logo: '/research-logos/mit.svg',
    org: 'MIT Sloan & Chicago Booth',
    authors: 'So, Sussman, Yang',
    paper: 'AI Advisers and the Competence-Judgment Tradeoff in Information Disclosure',
    year: 2026,
    venue: 'MIT Sloan',
    reviewed: false,
    title: 'Vor einer KI rechtfertigen sich Menschen seltener.',
    bars: {
      caption: 'Anteil, der seine Angaben rechtfertigte',
      items: [{ l: 'Gegenüber einem Menschen', v: 33 }, { l: 'Gegenüber einer KI', v: 15 }],
    },
    body: 'Sobald ein Anliegen peinliche Details verlangt, wählen Menschen eher die KI, obwohl sie Menschen für kompetenter halten. Der Grund ist die Angst, beurteilt zu werden.',
    ours: 'Unser Interviewer sagt im ersten Satz, dass er eine KI ist. Das ist Pflicht und hilft der Offenheit.',
    href: 'https://mitsloan.mit.edu/ideas-made-to-matter/clients-prefer-ai-to-human-advisers-when-details-are-embarrassing',
  },
];

export const studiesEn: Study[] = [
  {
    ...studiesDe[0],
    title: 'People who think they are talking to a machine open up more.',
    body: 'Everyone spoke to the same virtual human. Those who believed a computer was running it spoke more openly and cared less about how they came across.',
    ours: 'On topics like overload, leadership or mistakes, that is the difference from a workshop.',
  },
  {
    ...studiesDe[1],
    title: 'A conversation gets better open answers than a survey form.',
    body: 'About 600 participants, chat against a Qualtrics survey. Answers in conversation were more informative, relevant, specific and clear.',
    ours: 'Our interviewer follows up where a survey turns the page.',
  },
  {
    ...studiesDe[2],
    title: 'Two hours of conversation are enough to model a person’s attitudes.',
    bars: {
      caption: 'Accuracy on General Social Survey answers, 1,052 people',
      items: [{ l: 'The person, two weeks later', v: 100 }, { l: 'Agent built from the interview', v: 85 }],
    },
    body: '1,052 people each talked to an AI interviewer for two hours. Agents built from the transcripts were 85% as accurate as the people were at repeating themselves.',
    ours: 'A long conversation carries more than any scale. That is why our interviews last 20 to 30 minutes.',
  },
  {
    ...studiesDe[3],
    title: 'AI interviewers deliver data of comparable quality to human interviewers.',
    body: 'Small student sample. Humans did not always listen actively, the AI did not always follow up well.',
    ours: 'Following up well is the hard part. It is exactly what our conversation steering works on.',
  },
  {
    ...studiesDe[4],
    title: 'With AI, consultants work faster, as long as the task fits.',
    stats: [
      { v: '+12.2%', l: 'more tasks completed' },
      { v: '25.1%', l: 'faster' },
      { v: '−19%', l: 'correct answers on tasks beyond the AI' },
    ],
    body: '758 Boston Consulting Group consultants solved realistic tasks with and without AI. On tasks AI does not handle well, they were wrong more often with it.',
    ours: 'With us, the AI runs the conversations. Interpreting and deciding stays with people.',
  },
  {
    ...studiesDe[5],
    title: 'People justify themselves less in front of an AI.',
    bars: {
      caption: 'Share who justified what they said',
      items: [{ l: 'To a person', v: 33 }, { l: 'To an AI', v: 15 }],
    },
    body: 'Once a problem means sharing embarrassing details, people lean towards the AI, even though they rate humans as more competent. The reason is fear of being judged.',
    ours: 'Our interviewer says in its first sentence that it is an AI. That is required, and it helps people open up.',
  },
];
