import type { AdaptiveConfig } from '../lib/adaptive/AdaptiveMusic';

import exploreBase from '../assets/stems/Exploration_Base_Layer_92bpm.mp3';
import exploreLayer from '../assets/stems/Exploration_Vertical_Layer_92bpm.mp3';
import combatBase from '../assets/stems/Combat_Base_Layer_92bpm.mp3';
import combatLayer from '../assets/stems/Combat_Vertical_Layer_92bpm.mp3';
import toCombat from '../assets/stems/Transition_Exploration_to_Combat_92bm.mp3';
import toExplore from '../assets/stems/Transition_Combat_to_Exploration_92bpm.mp3';

/**
 * Setup for the adaptive music demo on /play.
 *
 * The files in src/assets/stems are Eileen's recordings, unedited, encoded
 * from the original 24-bit 48 kHz WAVs to 192 kbps MP3 for the web (the WAVs
 * are 17 MB each) with: ffmpeg -i in.wav -codec:a libmp3lame -b:a 192k out.mp3
 * Browsers trim the encoder delay, and the engine wraps each loop at its exact
 * musical length, so the loops stay seamless.
 *
 * The four loops are each exactly 60 s: 92 beats, or 23 bars of 4/4 at 92 BPM.
 * They start on the downbeat, loop cleanly and are always running together;
 * the demo only changes their volume.
 *
 * Transitions (both start on a bar line):
 * - Exploration to combat is 5.5 beats long: a build-up that lasts exactly one
 *   bar, then a tail that rings into combat. Combat arrives on the downbeat
 *   after the build-up.
 * - Combat to exploration is exactly 2 bars: an impact followed by a long
 *   decay. Combat is cut under the impact and exploration fades in over the
 *   second bar.
 * Those entry points are tuned by ear in the `transitions` settings below.
 */
export const adaptiveConfig: AdaptiveConfig = {
  timing: { bpm: 92, beatsPerBar: 4, bars: 23 },
  stems: {
    exploreBase,
    exploreLayer,
    combatBase,
    combatLayer,
    toCombat,
    toExplore,
  },
  transitions: {
    toCombat: {
      // Exploration fades away under the build-up.
      outFadeBars: 1,
      // The combat loop comes in on the downbeat after the build-up.
      inAtBar: 1,
      inFadeBars: 0.05,
    },
    toExplore: {
      // Combat is cut under the impact at the start of the transition.
      outFadeBars: 0.05,
      // Exploration fades in over the second bar of the decay.
      inAtBar: 1,
      inFadeBars: 1,
    },
  },
};
