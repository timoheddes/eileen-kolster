/**
 * Synthesised stand-ins for Eileen's real stems, so the adaptive music demo
 * works (and can be tested) before the recordings exist. Each loop is exactly
 * `bars` bars long and wraps seamlessly; the stinger is exactly one bar.
 */

export type StemKey =
  | 'exploreBase'
  | 'exploreLayer'
  | 'combatBase'
  | 'combatLayer'
  | 'stinger';

export interface Timing {
  bpm: number;
  beatsPerBar: number;
  /** Length of every looping stem, in bars. */
  bars: number;
}

type Shape = 'sine' | 'triangle' | 'square';

const midiToHz = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

const sample = (shape: Shape, phase: number) => {
  switch (shape) {
    case 'sine':
      return Math.sin(phase);
    case 'triangle':
      return (2 / Math.PI) * Math.asin(Math.sin(phase));
    case 'square':
      // Band-limited: first few odd harmonics only, so it stays soft.
      return (
        (Math.sin(phase) + Math.sin(3 * phase) / 3 + Math.sin(5 * phase) / 5) *
        0.8
      );
  }
};

/** Deterministic noise so renders are repeatable. */
const makeNoise = () => {
  let s = 1234567;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return (s / 0xffffffff) * 2 - 1;
  };
};

interface NoteOptions {
  start: number;
  length: number;
  midi: number;
  amp: number;
  shape: Shape;
  attack: number;
  /** Exponential decay time constant in seconds; 0 means a held note. */
  decay?: number;
  release?: number;
  detune?: number;
}

const addNote = (
  out: Float32Array,
  rate: number,
  o: NoteOptions,
  wrap: boolean,
) => {
  const total = out.length;
  const n = Math.floor(o.length * rate);
  const startIdx = Math.floor(o.start * rate);
  const hz = midiToHz(o.midi) * (1 + (o.detune ?? 0));
  const attack = Math.max(o.attack, 0.002);
  const release = o.release ?? 0.01;
  for (let i = 0; i < n; i++) {
    const t = i / rate;
    let env = Math.min(1, t / attack);
    if (o.decay) env *= Math.exp(-t / o.decay);
    const left = o.length - t;
    if (left < release) env *= Math.max(0, left / release);
    const idx = startIdx + i;
    if (!wrap && (idx >= total || idx < 0)) continue;
    // Notes that start before 0 or run past the end wrap around the loop.
    out[((idx % total) + total) % total] +=
      sample(o.shape, 2 * Math.PI * hz * t) * env * o.amp;
  }
};

const normalise = (buf: Float32Array, peak: number) => {
  let max = 0;
  for (const v of buf) max = Math.max(max, Math.abs(v));
  if (max === 0) return buf;
  const k = peak / max;
  for (let i = 0; i < buf.length; i++) buf[i] *= k;
  return buf;
};

const EXPLORE_CHORDS = [
  [57, 60, 64], // Am
  [53, 57, 60], // F
  [48, 55, 64], // C
  [55, 59, 62], // G
];

const COMBAT_ROOTS = [33, 33, 29, 31]; // A1 A1 F1 G1
const COMBAT_CHORDS = [
  [57, 60, 64],
  [57, 60, 64],
  [53, 57, 60],
  [55, 59, 62],
];

export const renderPlaceholderStems = (
  rate: number,
  { bpm, beatsPerBar, bars }: Timing,
): Record<StemKey, Float32Array> => {
  const beat = 60 / bpm;
  const bar = beat * beatsPerBar;
  const loopSamples = Math.round(bar * bars * rate);
  const alloc = () => new Float32Array(loopSamples);

  const exploreBase = alloc();
  const exploreLayer = alloc();
  const combatBase = alloc();
  const combatLayer = alloc();

  for (let b = 0; b < bars; b++) {
    const chord = EXPLORE_CHORDS[b % EXPLORE_CHORDS.length];
    const t0 = b * bar;

    // Calm pad: overlapped between bars so the chord changes are smooth and
    // the loop seam is silent.
    for (const midi of chord) {
      for (const detune of [-0.003, 0.003]) {
        addNote(
          exploreBase,
          rate,
          {
            start: t0 - 0.4,
            length: bar + 0.8,
            midi,
            amp: 0.1,
            shape: 'sine',
            attack: 0.5,
            release: 0.5,
            detune,
          },
          true,
        );
      }
    }
    addNote(
      exploreBase,
      rate,
      {
        start: t0,
        length: bar,
        midi: chord[0] - 12,
        amp: 0.18,
        shape: 'sine',
        attack: 0.3,
        release: 0.4,
      },
      true,
    );

    // Vertical layer: gentle plucked arpeggio, one note per half beat.
    for (let i = 0; i < beatsPerBar * 2; i++) {
      addNote(
        exploreLayer,
        rate,
        {
          start: t0 + i * (beat / 2),
          length: beat,
          midi: chord[i % chord.length] + 24,
          amp: 0.2,
          shape: 'triangle',
          attack: 0.004,
          decay: 0.25,
          release: 0.05,
        },
        true,
      );
    }

    // Combat base: driving low pulse and kick-like thumps.
    const root = COMBAT_ROOTS[b % COMBAT_ROOTS.length];
    for (let i = 0; i < beatsPerBar * 2; i++) {
      addNote(
        combatBase,
        rate,
        {
          start: t0 + i * (beat / 2),
          length: beat / 2,
          midi: root + (i % 2 === 1 ? 12 : 0),
          amp: 0.3,
          shape: 'square',
          attack: 0.005,
          decay: 0.12,
          release: 0.03,
        },
        true,
      );
    }
    for (let i = 0; i < beatsPerBar; i++) {
      addNote(
        combatBase,
        rate,
        {
          start: t0 + i * beat,
          length: 0.25,
          midi: 36,
          amp: 0.5,
          shape: 'sine',
          attack: 0.002,
          decay: 0.07,
          release: 0.04,
        },
        true,
      );
    }

    // Combat layer: fast 16th arpeggio an octave or two up.
    const combatChord = COMBAT_CHORDS[b % COMBAT_CHORDS.length];
    for (let i = 0; i < beatsPerBar * 4; i++) {
      addNote(
        combatLayer,
        rate,
        {
          start: t0 + i * (beat / 4),
          length: beat / 4,
          midi:
            combatChord[i % combatChord.length] + 24 + (i % 8 >= 4 ? 12 : 0),
          amp: 0.18,
          shape: 'square',
          attack: 0.003,
          decay: 0.07,
          release: 0.02,
        },
        true,
      );
    }
  }

  // One-bar stinger: rising sweep into a noise hit on the downbeat of combat.
  const stinger = new Float32Array(Math.round(bar * rate));
  const noise = makeNoise();
  const sweepEnd = bar - 0.12;
  let phase = 0;
  for (let i = 0; i < stinger.length; i++) {
    const t = i / rate;
    const p = Math.min(1, t / sweepEnd);
    const hz = 180 * Math.pow(10, p); // 180 Hz up to 1.8 kHz
    phase += (2 * Math.PI * hz) / rate;
    const swell = Math.pow(p, 2) * (t < sweepEnd ? 1 : 0);
    const hit =
      t >= sweepEnd ? Math.exp(-(t - sweepEnd) / 0.05) * noise() * 0.9 : 0;
    stinger[i] = Math.sin(phase) * swell * 0.4 + hit;
  }

  return {
    exploreBase: normalise(exploreBase, 0.5),
    exploreLayer: normalise(exploreLayer, 0.35),
    combatBase: normalise(combatBase, 0.5),
    combatLayer: normalise(combatLayer, 0.35),
    stinger: normalise(stinger, 0.6),
  };
};
