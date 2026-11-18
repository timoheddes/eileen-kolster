export const CONTACT_EMAIL = 'eileen.kolster@gmail.com';

export interface ContactPath {
  id: string;
  title: string;
  description: string;
  subject: string;
  /** Prompts that open the email, so the first message already has what Eileen needs. */
  body: string[];
  /** Optional extra link shown with the path. */
  more?: { label: string; href: string };
}

export const contactPaths: ContactPath[] = [
  {
    id: 'film',
    title: 'Film or documentary',
    description: 'A short, feature or documentary that needs a score.',
    subject: 'Music for my film',
    body: [
      'Hi Eileen,',
      '',
      "I'm working on:",
      'Title / type (short, feature, documentary):',
      'Where it is now (script, rough cut, locked picture):',
      'Deadline:',
      'What I imagine for the music:',
      'Link to a cut or trailer (if you have one):',
      'Budget (if any):',
      '',
      'Thanks,',
    ],
  },
  {
    id: 'game',
    title: 'Game',
    description:
      'An indie game that needs exploration, combat or cutscene music.',
    subject: 'Music for my game',
    body: [
      'Hi Eileen,',
      '',
      "I'm working on:",
      'Game title and genre:',
      'Engine / middleware (Unity, Unreal, FMOD, Wwise...):',
      'How the music should behave (loops, adaptive layers, cutscenes):',
      'Timeline:',
      'Link to footage or a build (if you have one):',
      'Budget (if any):',
      '',
      'Thanks,',
    ],
    more: { label: 'Hear how adaptive music works', href: '/play' },
  },
  {
    id: 'other',
    title: 'Something else',
    description:
      'A non-profit, a study project, or an idea that does not fit the others.',
    subject: 'A music collaboration',
    body: [
      'Hi Eileen,',
      '',
      'Tell me a little about your project:',
      'What it is and who it is for:',
      'Where it is now:',
      'Timeline:',
      'Budget (if any):',
      '',
      'Thanks,',
    ],
  },
];

export const mailtoHref = (path: Pick<ContactPath, 'subject' | 'body'>) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(path.subject)}&body=${encodeURIComponent(path.body.join('\n'))}`;
