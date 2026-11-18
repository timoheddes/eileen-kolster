import type { StemUrls } from '../lib/adaptive/AdaptiveMusic';
import type { Timing } from '../lib/adaptive/placeholderStems';

/**
 * Setup for the adaptive music demo on /play.
 *
 * TODO(Eileen): add the real stems. Every stem must have the same length
 * (`timing.bars` bars at `timing.bpm`), start on the downbeat and loop
 * cleanly; the stinger is exactly one bar. Import each file like the tracks
 * in tracks.ts and list it in `stems`. Any stem left out is replaced by a
 * synthesised placeholder, so they can be added one at a time.
 */
export const timing: Timing = { bpm: 96, beatsPerBar: 4, bars: 4 };

export const stems: StemUrls = {
  // exploreBase: exploreBaseUrl,
  // exploreLayer: exploreLayerUrl,
  // combatBase: combatBaseUrl,
  // combatLayer: combatLayerUrl,
  // stinger: stingerUrl,
};
