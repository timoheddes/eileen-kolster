import migratoryBirdsSuite from '../assets/music/Migratory Birds Suite.mp3';
import tidalPoolsSuite from '../assets/music/Tidal Pools Pitch Suite.mp3';

export interface MusicTrack {
  id: string;
  title: string;
  /** Grey info line under the title. */
  info: string;
  description: string;
  /** Audio file. Leave out until it exists; the page shows "coming soon". */
  file?: string;
  /** Show the interactive adaptive-music player instead of a plain audio player. */
  interactive?: boolean;
}

export interface MusicSection {
  id: string;
  title: string;
  /** One line under the section heading. */
  blurb: string;
  /** Small line under the section name in the side navigation. */
  legend: string;
  tracks: MusicTrack[];
}

export const musicSections: MusicSection[] = [
  {
    id: 'film',
    title: 'Film',
    blurb: 'Suites from the films and documentaries I have scored.',
    legend: 'Suites',
    tracks: [
      {
        id: 'migratory-birds-suite',
        title: 'Migratory Birds: suite',
        file: migratoryBirdsSuite,
        info: 'Short film · 2026',
        description:
          'Four themes from the score: a bittersweet reflection, a nostalgic waltz through Amsterdam, the film’s emotional climax and a tender piano memory.',
      },
      {
        id: 'tidal-pools-suite',
        title: 'Tidal Pools Documentary: pitch suite',
        file: tidalPoolsSuite,
        info: 'Documentary in development',
        description:
          'Themes written for the director’s pitch for a documentary about Cape Town’s tidal pools: their history under apartheid-era segregation, and their life today as places of healing, community and belonging.',
      },
    ],
  },
  {
    id: 'games',
    title: 'Games',
    blurb: 'Music that reacts to the player.',
    legend: 'Interactive demo',
    tracks: [
      {
        id: 'adaptive-score',
        title: 'Adaptive score: exploration and combat',
        info: 'Video game (university brief) · 2026',
        description:
          'Adaptive score for a fictional side-scrolling, Ori-style platformer. Dreamy exploration shifts into energetic combat, with layers added as the action builds.',
        interactive: true,
      },
    ],
  },
];
