export type Mode = 'explore' | 'combat';

export type StemKey =
  | 'exploreBase'
  | 'exploreLayer'
  | 'combatBase'
  | 'combatLayer'
  | 'toCombat'
  | 'toExplore';

export interface Timing {
  bpm: number;
  beatsPerBar: number;
  /** Length of every looping stem, in bars. */
  bars: number;
}

/** How one state change is timed. All values are in seconds. */
export interface TransitionPlan {
  /** Short fade that stops the outgoing loop without a click. */
  outFade: number;
  /** The incoming loop starts from its beginning this long after the transition starts. */
  inAfter: number;
  /** Fade-in of the incoming loop's first play. 0 starts it at full volume. */
  inFade: number;
}

export interface AdaptiveConfig {
  timing: Timing;
  stems: Record<StemKey, string>;
  transitions: { toCombat: TransitionPlan; toExplore: TransitionPlan };
}

const LOOP_KEYS = [
  'exploreBase',
  'exploreLayer',
  'combatBase',
  'combatLayer',
] as const;
type LoopKey = (typeof LOOP_KEYS)[number];

const STATE_STEMS: Record<Mode, { base: LoopKey; layer: LoopKey }> = {
  explore: { base: 'exploreBase', layer: 'exploreLayer' },
  combat: { base: 'combatBase', layer: 'combatLayer' },
};

/** Seconds over which a layer fades when it is added or removed. */
const LAYER_FADE = 0.4;

/**
 * A small vertical-layering engine. Everything is scheduled on the audio clock.
 * - Each state has a base loop and a vertical layer that always start together,
 *   from their own beginning, so they stay in sync. The layer is just a gain.
 * - Changing state waits for the next bar line of the playing loop, stops it
 *   with a very short fade, plays that direction's transition from its
 *   beginning, and starts the new state's loops from their beginning a fixed
 *   time later. The transition's tail keeps playing over the new loop.
 */
export class AdaptiveMusic {
  private ctx: AudioContext;
  private master: GainNode;
  /** Tap on the master output, so visuals (the particles) can react to the music. */
  readonly analyser: AnalyserNode;
  private gains = {} as Record<LoopKey, GainNode>;
  private buffers = {} as Record<StemKey, AudioBuffer>;
  private config: AdaptiveConfig;
  /** When each state's loops last started from their beginning. */
  private stateStart: Record<Mode, number> = { explore: 0, combat: 0 };
  private voices: Partial<Record<Mode, AudioBufferSourceNode[]>> = {};
  private started = false;
  private stopped = false;
  private busyUntil = 0;

  mode: Mode = 'explore';
  layers: Record<Mode, boolean> = { explore: false, combat: false };

  private constructor(ctx: AudioContext, config: AdaptiveConfig) {
    this.ctx = ctx;
    this.config = config;
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(ctx.destination);
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.master.connect(this.analyser);
  }

  /** Fetch and decode every stem. */
  static async create(config: AdaptiveConfig) {
    const ctx = new AudioContext();
    const engine = new AdaptiveMusic(ctx, config);
    const keys = Object.keys(config.stems) as StemKey[];
    try {
      await Promise.all(
        keys.map(async (key) => {
          const response = await fetch(config.stems[key]);
          if (!response.ok) throw new Error(`Could not load ${key}`);
          engine.buffers[key] = await ctx.decodeAudioData(
            await response.arrayBuffer(),
          );
        }),
      );
    } catch (error) {
      await ctx.close().catch(() => undefined);
      throw error;
    }
    return engine;
  }

  get currentTime() {
    return this.ctx.currentTime;
  }
  get beatDuration() {
    return 60 / this.config.timing.bpm;
  }
  get barDuration() {
    return this.beatDuration * this.config.timing.beatsPerBar;
  }
  /** True while a state change is still playing out. */
  get switching() {
    return this.ctx.currentTime < this.busyUntil;
  }

  /** Time of the next beat/bar line of the current state's loop (at least a few ms ahead). */
  private nextBoundary(unit: 'beat' | 'bar') {
    const step = unit === 'bar' ? this.barDuration : this.beatDuration;
    const t0 = this.stateStart[this.mode];
    const elapsed = this.ctx.currentTime - t0;
    return t0 + Math.max(0, Math.ceil((elapsed + 0.02) / step)) * step;
  }

  private fade(key: LoopKey, to: number, at: number, duration: number) {
    const g = this.gains[key].gain;
    g.cancelScheduledValues(this.ctx.currentTime);
    g.setTargetAtTime(to, at, Math.max(duration, 0.01) / 3);
  }

  /** Start a state's base and layer loops together, from their beginning. */
  private startState(mode: Mode, when: number, fadeIn: number) {
    const { base, layer } = STATE_STEMS[mode];
    const loopLength = this.config.timing.bars * this.barDuration;
    this.stateStart[mode] = when;
    this.voices[mode] = [base, layer].map((key) => {
      const src = this.ctx.createBufferSource();
      src.buffer = this.buffers[key];
      src.loop = true;
      // Wrap at the exact musical length, whatever the decoder adds at the end.
      src.loopStart = 0;
      src.loopEnd = Math.min(loopLength, src.buffer.duration);
      src.connect(this.gains[key]);
      src.start(when);
      return src;
    });
    const g = this.gains[base].gain;
    g.cancelScheduledValues(0);
    if (fadeIn > 0) {
      g.setValueAtTime(0, when);
      g.linearRampToValueAtTime(1, when + fadeIn);
    } else {
      g.setValueAtTime(1, when);
    }
    const l = this.gains[layer].gain;
    l.cancelScheduledValues(0);
    l.setValueAtTime(0, when);
  }

  /** Silence a state's loops at `at` with a very short fade, then stop them. */
  private stopState(mode: Mode, at: number, fade: number) {
    const { base, layer } = STATE_STEMS[mode];
    for (const key of [base, layer]) {
      const g = this.gains[key].gain;
      const now = this.ctx.currentTime;
      const level = g.value;
      g.cancelScheduledValues(now);
      g.setValueAtTime(level, at);
      g.linearRampToValueAtTime(0, at + fade);
    }
    for (const src of this.voices[mode] ?? []) src.stop(at + fade + 0.02);
    this.voices[mode] = [];
  }

  async start() {
    if (this.started) return;
    await this.ctx.resume();
    this.started = true;
    for (const key of LOOP_KEYS) {
      const gain = this.ctx.createGain();
      gain.gain.value = 0;
      gain.connect(this.master);
      this.gains[key] = gain;
    }
    this.startState('explore', this.ctx.currentTime + 0.1, 0);
    this.master.gain.setTargetAtTime(0.8, this.ctx.currentTime, 0.1);
  }

  /**
   * Switch state, starting at the next bar line. Returns the time at which the
   * new loop has started and faded in, or null if the previous change is still
   * under way (clicks during a change are ignored).
   */
  setMode(next: Mode): number | null {
    if (!this.started || next === this.mode || this.switching) return null;
    const at = this.nextBoundary('bar');
    const plan =
      this.config.transitions[next === 'combat' ? 'toCombat' : 'toExplore'];

    const transition = this.ctx.createBufferSource();
    transition.buffer =
      this.buffers[next === 'combat' ? 'toCombat' : 'toExplore'];
    transition.connect(this.master);
    transition.start(at);

    this.stopState(this.mode, at, plan.outFade);
    const enter = at + plan.inAfter;
    this.startState(next, enter, plan.inFade);

    this.mode = next;
    // The new state always begins with its base loop only.
    this.layers[next] = false;
    this.busyUntil = enter;
    return enter + plan.inFade;
  }

  /** Add or remove a state's vertical layer at the next beat. */
  setLayer(mode: Mode, on: boolean) {
    this.layers[mode] = on;
    if (!this.started || mode !== this.mode || this.switching) return;
    this.fade(
      STATE_STEMS[mode].layer,
      on ? 1 : 0,
      this.nextBoundary('beat'),
      LAYER_FADE,
    );
  }

  /** Current gain per looping stem, for the on-screen level meters. */
  levels(): Record<LoopKey, number> {
    const out = {} as Record<LoopKey, number>;
    for (const key of LOOP_KEYS) out[key] = this.gains[key]?.gain.value ?? 0;
    return out;
  }

  async stop() {
    if (this.stopped) return;
    this.stopped = true;
    this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
    await new Promise((r) => setTimeout(r, 250));
    await this.ctx.close().catch(() => undefined);
  }
}
