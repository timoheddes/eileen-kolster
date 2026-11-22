import iMomClimax from '../assets/video/iMomClimax-web.mp4';
import iMomCooking from '../assets/video/iMomCooking-web.mp4';
import dieoramaCreativeProcess from '../assets/video/DieoramaCreativeProcess-web.mp4';
import dieoramaPublicPlacements from '../assets/video/Dieoramatown-web.mp4';
import migratoryBirdsPoster from '../assets/images/photos/migratory-birds-poster.webp';

import seo from './seo.json';
import { sanskritiShrivastava } from './testimonials';

const projectSeo = seo.projects;

export type ProjectKind = 'Film' | 'Documentary' | 'Game';

/** How the project came about, shown openly on every card and page. */
export type ProjectContext =
  | 'Independent rescore'
  | 'Study project'
  | 'Non-profit'
  | 'Commission';

export interface Scene {
  title: string;
  goal: string;
  /** Paragraphs describing the sound choices. */
  approach: string[];
  video?: { src: string; posterTime?: number; startAt?: number };
}

export interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  context: ProjectContext;
  status: string;
  /** Original creator, e.g. "Film by Sanskriti Shrivastava". */
  byline: string;
  role: string[];
  summary: string;
  /** Longer intro paragraphs for the project page. */
  intro: string[];
  /** `maxWidth` keeps tall images such as posters from filling the column. */
  image?: { src: string; alt: string; maxWidth?: string };
  scenes: Scene[];
  /** A collaborator's words about working with Eileen. */
  testimonial?: { quote: string; author: string; role: string };
  /** Extra approach paragraphs for projects without scenes yet. */
  approach?: string[];
  /** Order on the index page; lower first. */
  order: number;
  /** Set false to keep a drafted project out of the site until it is ready. */
  published: boolean;
}

export const projects: Project[] = [
  {
    slug: 'migratory-birds',
    ...projectSeo['migratory-birds'],
    kind: 'Film',
    context: 'Commission',
    status: 'Short film · 2026',
    byline: 'Film by Sanskriti Shrivastava',
    role: ['Composer'],
    intro: [
      'A story of displacement and resilience following Laura, a South African stand-up comedian who relocates to the Netherlands. The film explores how love and memory migrate across borders through the central metaphor of a saree.',
      'Completed in 2026, the film has been selected for several international festivals.',
    ],
    image: {
      src: migratoryBirdsPoster,
      alt: 'Poster for Migratory Birds, with festival laurels: finalist at the 2026 WSXA Amsterdam International Film Festival and official selection at Migration Matters Film Festival, Amsterdam New Cinema Film Festival and SAFICXS International Lesbian Short Film Fest.',
      maxWidth: '440px',
    },
    approach: [
      "The film's narrative is driven by a continuous, intimate voiceover, so the score needed to support Laura's words without intruding. I followed her emotional arc: from the folky, nostalgic warmth of her everyday life in Amsterdam, through a piano waltz and a vintage ragtime for her stand-up scene, to piano and strings for the film's more complex moments of grief. Subtle ambient synths sit underneath to support the strings.",
      'For the ending, I restored a vintage jazz recording and gradually widened its stereo image as the credits roll, opening the sound out from her small private moment into the wider world.',
      'I composed, mixed and delivered over 15 minutes of original score, including foley.',
    ],
    testimonial: {
      quote: sanskritiShrivastava.long,
      author: sanskritiShrivastava.author,
      role: 'Director',
    },
    scenes: [],
    order: 0,
    published: true,
  },
  {
    slug: 'imom',
    ...projectSeo['imom'],
    kind: 'Film',
    context: 'Independent rescore',
    status: 'Completed',
    byline: 'Original film by Ariel Martin',
    role: ['Composer', 'Sound design'],
    intro: [
      'A satirical sci-fi horror that explores the chilling consequences of a world where humanoid technology has replaced traditional parenting.',
    ],
    scenes: [
      {
        title: 'The Climax',
        goal: "To build an escalating sense of doom that mirrors the characters' ambiguous nature.",
        approach: [
          'I blended metallic vibraphone textures and modulated violins to create a sense of tonal instability.',
          'Tactile found-object sounds - including gas stove clicks and flame ignitions - were integrated into a percussive rhythm to foreshadow the reveal with an industrial edge and visceral dark synths.',
        ],
        video: { src: iMomClimax, posterTime: 10, startAt: 0.5 },
      },
      {
        title: 'Cooking',
        goal: "To underscore the iMom's emerging malfunction during a mundane domestic task.",
        approach: [
          'I contrasted organic and synthetic textures by blending and layering East Asian percussion and found-sounds into a lopsided rhythm to create a sense of mechanical instability that reflects the unsettling, odd nature of the character.',
        ],
        video: { src: iMomCooking, posterTime: 4 },
      },
    ],
    order: 1,
    published: true,
  },
  {
    slug: 'dieorama',
    ...projectSeo['dieorama'],
    kind: 'Documentary',
    context: 'Independent rescore',
    status: 'Completed',
    byline: 'Original documentary by Kevin Staake',
    role: ['Composer', 'Sound design'],
    intro: [
      'A portrait of Abigail Goldman, a Criminal Defense Investigator who spends her nights creating intricate, gruesome miniatures of murder scenes.',
    ],
    scenes: [
      {
        title: 'Creative Process',
        goal: 'To capture a sense of creative awe that creates a jarring contrast with the grizzly subject matter of the miniatures.',
        approach: [
          "I utilized mallet percussion to evoke a sense of childlike wonder, paired with a theremin to create an off-kilter, curious atmosphere that mirrors the artist's unusual craft.",
        ],
        video: { src: dieoramaCreativeProcess, posterTime: 26 },
      },
      {
        title: 'Public Placements',
        goal: 'To reflect the surreal, mysterious nature of discovering violent dioramas hidden in everyday public spaces.',
        approach: [
          'I blended ethereal synth textures with tactile, manipulated sounds, including paper tearing and scissor snips, to build a quirky sonic palette that highlights the mystery of her public art.',
        ],
        video: { src: dieoramaPublicPlacements, posterTime: 32 },
      },
    ],
    order: 2,
    published: true,
  },

  // ---------------------------------------------------------------------
  // WORK IN PROGRESS: published for preview on the feat/reimagined branch
  // only, with TODO placeholders. Fill in every TODO (title/summary live in
  // seo.json) before feat/reimagined goes to main. Set published: false to
  // hide one again, and the documentary rescore needs its footage rights
  // confirmed before it goes live.
  // ---------------------------------------------------------------------
  {
    slug: 'documentary-rescore',
    ...projectSeo['documentary-rescore'],
    kind: 'Documentary',
    context: 'Independent rescore',
    status: 'In progress',
    byline: 'Original documentary by TODO',
    role: ['Composer'],
    intro: [
      'TODO: two or three sentences on the documentary and why it was chosen to rescore.',
    ],
    // TODO: add scenes (goal, approach, video) once the rescore is ready.
    // Publishing needs confirmation that the rescored footage can be shown.
    scenes: [],
    order: 3,
    published: true,
  },
  {
    slug: 'indie-game',
    ...projectSeo['indie-game'],
    kind: 'Game',
    context: 'Independent rescore',
    status: 'TODO',
    byline: 'TODO: developer and game',
    role: ['Composer'],
    intro: [
      'TODO: a short description of the game, the brief, and how the music reacts to play.',
    ],
    approach: [
      'TODO: the adaptive approach: a base layer for each state with a vertical layer that adds intensity, and a transition between exploration and combat.',
    ],
    scenes: [
      {
        title: 'Exploration',
        goal: 'TODO: what the exploration music should make the player feel.',
        approach: [
          'TODO: the base layer, and the vertical layer that fades in as the player discovers more.',
        ],
      },
      {
        title: 'Transition',
        goal: 'TODO: how the music moves from exploration into combat.',
        approach: ['TODO: how the transition is built and when it triggers.'],
      },
      {
        title: 'Combat',
        goal: 'TODO: what the combat music should make the player feel.',
        approach: [
          'TODO: the base layer, and the vertical layer that raises intensity.',
        ],
      },
    ],
    order: 4,
    published: true,
  },
];

export const publishedProjects = projects
  .filter((p) => p.published)
  .sort((a, b) => a.order - b.order);

export const getProject = (slug: string) =>
  publishedProjects.find((p) => p.slug === slug);
