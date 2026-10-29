// Studien fuer die Research-Seite (Preview). Jede Karte: Quelle, eine Zahl
// oder ein Vergleich, ein Satz, was wir daraus machen. Zahlen vor Livegang
// am Original pruefen. `reviewed` nur setzen, wenn die Arbeit begutachtet
// erschienen ist; Preprints und Working Papers bleiben false.
export interface Bar { l: string; v: number }
export interface Study {
  id: string;
  org: string;
  year: number;
  venue: string;
  reviewed: boolean;
  title: string;
  stat?: { v: string; l: string };
  stats?: { v: string; l: string }[];
  bars?: { caption: string; items: Bar[] };
  body: string;
  ours: string;
  href: string;
}

export const studiesDe: Study[] = [
  {
    id: 'stanford',
    org: 'Stanford & Google DeepMind',
    year: 2024,
    venue: 'arXiv',
    reviewed: false,
    title: 'Zwei Stunden Gespräch reichen, um die Haltungen eines Menschen nachzubilden.',
    stat: { v: '85 %', l: 'so genau, wie die Personen ihre eigenen Antworten zwei Wochen später wiederholten' },
    body: '1.052 Menschen sprachen je zwei Stunden mit einem KI-Interviewer. Agenten aus diesen Transkripten beantworteten den General Social Survey fast so verlässlich wie die Personen selbst.',
    ours: 'Ein langes Gespräch trägt mehr als jede Skala. Deshalb dauern unsere Interviews 20 bis 30 Minuten.',
    href: 'https://arxiv.org/abs/2411.10109',
  },
  {
    id: 'mit',
    org: 'MIT Sloan',
    year: 2026,
    venue: 'MIT Sloan',
    reviewed: false,
    title: 'Vor einer KI rechtfertigen sich Menschen seltener.',
    bars: {
      caption: 'Anteil, der seine Angaben rechtfertigte (744 Teilnehmende)',
      items: [{ l: 'Gegenüber einem Menschen', v: 33 }, { l: 'Gegenüber einer KI', v: 15 }],
    },
    body: 'Sobald ein Anliegen peinliche Details verlangt, wählen Menschen eher die KI, obwohl sie Menschen für kompetenter halten. Der Grund ist die Angst, beurteilt zu werden.',
    ours: 'Unser Interviewer sagt im ersten Satz, dass er eine KI ist. Das ist Pflicht und hilft der Offenheit.',
    href: 'https://mitsloan.mit.edu/ideas-made-to-matter/clients-prefer-ai-to-human-advisers-when-details-are-embarrassing',
  },
  {
    id: 'usc',
    org: 'University of Southern California',
    year: 2014,
    venue: 'Computers in Human Behavior',
    reviewed: true,
    title: 'Wer glaubt, mit einer Maschine zu sprechen, öffnet sich mehr.',
    body: 'Im Experiment sprachen alle mit derselben virtuellen Person. Wer glaubte, sie werde von einem Computer gesteuert, sprach offener als wer einen Menschen dahinter vermutete.',
    ours: 'Bei Themen wie Überlastung, Führung oder Fehlern ist das der Unterschied zum Workshop.',
    href: 'https://doi.org/10.1016/j.chb.2014.04.043',
  },
  {
    id: 'illinois',
    org: 'University of Illinois & IBM',
    year: 2020,
    venue: 'ACM TOCHI',
    reviewed: true,
    title: 'Ein KI-Gesprächspartner holt bessere offene Antworten als ein Fragebogen.',
    stat: { v: '≈ 600', l: 'Teilnehmende im Feldversuch gegen einen Qualtrics-Fragebogen' },
    body: 'Die Antworten im Gespräch waren informativer, relevanter, genauer und klarer. Die Teilnehmenden blieben engagierter bei der Sache.',
    ours: 'Offene Fragen sind der Kern jedes Interviews. Unser Interviewer fragt nach, wo ein Fragebogen weiterblättert.',
    href: 'https://doi.org/10.1145/3381804',
  },
  {
    id: 'lmu',
    org: 'LMU München, Mannheim & Oxford',
    year: 2024,
    venue: 'arXiv',
    reviewed: false,
    title: 'KI-Interviewer liefern Daten in vergleichbarer Qualität wie Menschen.',
    body: 'Die Stichprobe war klein und bestand aus Studierenden. Menschen hörten nicht immer aktiv zu, die KI fragte nicht immer passend nach.',
    ours: 'Gutes Nachfragen ist der schwierige Teil. Genau daran arbeitet unsere Gesprächssteuerung.',
    href: 'https://arxiv.org/abs/2410.01824',
  },
  {
    id: 'harvard',
    org: 'Harvard Business School & BCG',
    year: 2023,
    venue: 'HBS Working Paper',
    reviewed: false,
    title: 'Mit KI arbeiten Beraterinnen und Berater schneller und besser.',
    stats: [
      { v: '+12,2 %', l: 'mehr Aufgaben' },
      { v: '25 %', l: 'schneller' },
      { v: '40 %', l: 'höhere Qualität' },
    ],
    body: '758 Beraterinnen und Berater der Boston Consulting Group lösten realistische Aufgaben mit und ohne KI. Außerhalb dessen, was KI gut kann, sank die Qualität dagegen.',
    ours: 'Die KI führt bei uns die Gespräche. Deuten und entscheiden bleibt bei Menschen.',
    href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321',
  },
];

export const studiesEn: Study[] = [
  {
    ...studiesDe[0],
    title: 'Two hours of conversation are enough to model a person’s attitudes.',
    stat: { v: '85%', l: 'as accurate as people were at repeating their own answers two weeks later' },
    body: '1,052 people each talked to an AI interviewer for two hours. Agents built from those transcripts answered the General Social Survey almost as reliably as the people themselves.',
    ours: 'A long conversation carries more than any scale. That is why our interviews last 20 to 30 minutes.',
  },
  {
    ...studiesDe[1],
    title: 'People justify themselves less in front of an AI.',
    bars: {
      caption: 'Share who justified what they said (744 participants)',
      items: [{ l: 'To a person', v: 33 }, { l: 'To an AI', v: 15 }],
    },
    body: 'Once a problem means sharing embarrassing details, people lean towards the AI, even though they rate humans as more competent. The reason is fear of being judged.',
    ours: 'Our interviewer says in its first sentence that it is an AI. That is required, and it helps people open up.',
  },
  {
    ...studiesDe[2],
    title: 'People who think they are talking to a machine open up more.',
    body: 'Everyone spoke to the same virtual human. Those who believed a computer was running it spoke more openly than those who thought a person was behind it.',
    ours: 'On topics like overload, leadership or mistakes, that is the difference from a workshop.',
  },
  {
    ...studiesDe[3],
    title: 'An AI conversation partner gets better open answers than a survey form.',
    stat: { v: '≈ 600', l: 'participants in a field study against a Qualtrics survey' },
    body: 'Answers in conversation were more informative, relevant, specific and clear. Participants stayed more engaged.',
    ours: 'Open questions are the core of every interview. Our interviewer follows up where a survey turns the page.',
  },
  {
    ...studiesDe[4],
    title: 'AI interviewers deliver data of comparable quality to human interviewers.',
    body: 'The sample was small and made up of students. Humans did not always listen actively, the AI did not always follow up well.',
    ours: 'Following up well is the hard part. It is exactly what our conversation steering works on.',
  },
  {
    ...studiesDe[5],
    title: 'With AI, consultants work faster and better.',
    stats: [
      { v: '+12.2%', l: 'more tasks' },
      { v: '25%', l: 'faster' },
      { v: '40%', l: 'higher quality' },
    ],
    body: '758 Boston Consulting Group consultants solved realistic tasks with and without AI. Outside what AI does well, quality dropped instead.',
    ours: 'With us, the AI runs the conversations. Interpreting and deciding stays with people.',
  },
];
