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
 * Everything is 92 BPM in 4/4: 1 beat = 0.652 s, 1 bar = 2.609 s.
 *
 * A state change waits for the next bar line of the playing loop, stops it with
 * a very short fade, and plays the transition from its beginning. The incoming
 * loop starts from its own beginning at a fixed time after the transition
 * starts, and the transition's tail rings over it (Eileen's timing):
 * - Exploration to combat: combat starts 2.549 s after the transition.
 * - Combat to exploration: exploration starts 1 bar (2.609 s) after the
 *   transition, with a 0.7 s fade-in on that first play only.
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
    toCombat: { outFade: 0.03, inAfter: 2.549, inFade: 0 },
    toExplore: { outFade: 0.03, inAfter: (60 / 92) * 4, inFade: 0.7 },
  },
};
