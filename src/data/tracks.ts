import type { Track } from '../types/tracks';

import beneath_the_surface from '../assets/music/Beneath the Surface.mp3';
import call_of_the_ocean from '../assets/music/Call of the Ocean.mp3';
import golden_hour_immersion from '../assets/music/Golden Hour Immersion.mp3';
import shared_shores from '../assets/music/Shared Shores.mp3';
import timeless_tides from '../assets/music/Timeless Tides.mp3';
import mystic_trees from '../assets/music/Mystic Trees.mp3';
import period_drama from '../assets/music/period Drama.mp3';
import night_flight from '../assets/music/Night Flight.mp3';
import cave from '../assets/music/cave.mp3';

// TODO(Eileen): replace every placeholder description below with one or two
// sentences on what the piece was written for (a brief, a scene, a game
// moment, a mood) and set `projectSlug` for pieces that belong to a project
// in src/data/projects.tsx, so the player can link to it.
const placeholder = (title: string) =>
  `Placeholder: a sentence or two about what "${title}" was written for and the feeling it aims for.`;

export const tracks: Track[] = [
  { title: 'Beneath the Surface', file: beneath_the_surface },
  { title: 'Call of the Ocean', file: call_of_the_ocean },
  { title: 'Golden Hour Immersion', file: golden_hour_immersion },
  { title: 'Shared Shores', file: shared_shores },
  { title: 'Timeless Tides', file: timeless_tides },
  { title: 'Mystic Trees', file: mystic_trees },
  { title: 'Period Drama', file: period_drama },
  { title: 'Night Flight', file: night_flight },
  { title: 'Mycelium', file: cave },
].map((t) => ({ ...t, description: placeholder(t.title) }));
