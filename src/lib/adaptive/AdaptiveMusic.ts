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

/** When the outgoing state leaves and the incoming one arrives, in bars from the start of the transition. */
export interface TransitionPlan {
  /** How long the outgoing state takes to fade out. */
  outFadeBars: number;
  /** When the incoming state starts to arrive. */
  inAtBar: number;
  /** How long the incoming state takes to fade in. */
  inFadeBars: number;
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
 * A small vertical-layering engine:
 * - every loop (base and layer of each state) starts at the same instant and
 *   runs for the whole session, so they can never drift out of sync;
 * - "playing" a stem just means opening its gain, quantised to the next beat
 *   (layers) or bar (state changes);
 * - changing state plays that direction's transition recording, started on a
 *   bar line, and swaps the loops according to the transition plan.
 */
export class AdaptiveMusic {
  private ctx: AudioContext;
  private master: GainNode;
  private gains = {} as Record<LoopKey, GainNode>;
  private buffers = {} as Record<StemKey, AudioBuffer>;
  private config: AdaptiveConfig;
  private t0 = 0;
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

  /** Time of the next beat/bar line (at least a few ms ahead). */
  private nextBoundary(unit: 'beat' | 'bar') {
    const step = unit === 'bar' ? this.barDuration : this.beatDuration;
    const elapsed = this.ctx.currentTime - this.t0;
    return this.t0 + Math.max(0, Math.ceil((elapsed + 0.02) / step)) * step;
  }

  private fade(key: LoopKey, to: number, at: number, duration: number) {
    const g = this.gains[key].gain;
    g.cancelScheduledValues(this.ctx.currentTime);
    g.setTargetAtTime(to, at, Math.max(duration, 0.01) / 3);
  }

  async start() {
    if (this.started) return;
    await this.ctx.resume();
    this.started = true;
    const { timing } = this.config;
    const loopLength = timing.bars * this.barDuration;
    this.t0 = this.ctx.currentTime + 0.1;
    for (const key of LOOP_KEYS) {
      const gain = this.ctx.createGain();
      gain.gain.value = key === 'exploreBase' ? 1 : 0;
      gain.connect(this.master);
      this.gains[key] = gain;
      const src = this.ctx.createBufferSource();
      src.buffer = this.buffers[key];
      src.loop = true;
      // Wrap at the exact musical length, whatever the decoder adds at the end.
      src.loopStart = 0;
      src.loopEnd = Math.min(loopLength, src.buffer.duration);
      src.connect(gain);
      src.start(this.t0);
    }
    this.master.gain.setTargetAtTime(0.8, this.ctx.currentTime, 0.1);
  }

  /**
   * Switch state, starting at the next bar. Returns the time at which the new
   * state is fully in, or null if the previous change is still under way.
   */
  setMode(next: Mode): number | null {
    if (!this.started || next === this.mode || this.switching) return null;
    const at = this.nextBoundary('bar');
    const bar = this.barDuration;
    const plan =
      this.config.transitions[next === 'combat' ? 'toCombat' : 'toExplore'];
    const from = STATE_STEMS[this.mode];
    const to = STATE_STEMS[next];

    const transition = this.ctx.createBufferSource();
    transition.buffer =
      this.buffers[next === 'combat' ? 'toCombat' : 'toExplore'];
    transition.connect(this.master);
    transition.start(at);

    this.fade(from.base, 0, at, plan.outFadeBars * bar);
    this.fade(from.layer, 0, at, plan.outFadeBars * bar);
    const enter = at + plan.inAtBar * bar;
    this.fade(to.base, 1, enter, plan.inFadeBars * bar);
    this.fade(
      to.layer,
      this.layers[next] ? 1 : 0,
      enter,
      plan.inFadeBars * bar,
    );

    this.mode = next;
    const done = Math.max(
      at + transition.buffer.duration,
      enter + plan.inFadeBars * bar,
    );
    this.busyUntil = done;
    return enter + plan.inFadeBars * bar;
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
