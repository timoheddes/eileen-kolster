import {
  renderPlaceholderStems,
  type StemKey,
  type Timing,
} from './placeholderStems';

export type Mode = 'explore' | 'combat';
export type StemUrls = Partial<Record<StemKey, string>>;

const LOOP_KEYS: StemKey[] = [
  'exploreBase',
  'exploreLayer',
  'combatBase',
  'combatLayer',
];

/** Seconds over which a stem fades when it is brought in or out. */
const FADE = 0.4;

/**
 * A small vertical-layering engine:
 * - every loop (base and layer of each state) starts at the same instant and
 *   runs for the whole session, so they can never drift out of sync;
 * - "playing" a stem just means opening its gain, quantised to the next beat
 *   (layers) or bar (state changes);
 * - going from exploration to combat plays a one-bar stinger first.
 */
export class AdaptiveMusic {
  private ctx: AudioContext;
  private master: GainNode;
  private gains = {} as Record<StemKey, GainNode>;
  private buffers = {} as Record<StemKey, AudioBuffer>;
  private t0 = 0;
  private started = false;
  private stopped = false;
  private timing: Timing;

  mode: Mode = 'explore';
  layers: Record<Mode, boolean> = { explore: false, combat: false };
  /** True when any stem came from a real file rather than the synth. */
  usesRealStems = false;

  private constructor(ctx: AudioContext, timing: Timing) {
    this.ctx = ctx;
    this.timing = timing;
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(ctx.destination);
  }

  /** Load real stems where URLs are given, synthesised ones for the rest. */
  static async create(timing: Timing, urls: StemUrls = {}) {
    const ctx = new AudioContext();
    const engine = new AdaptiveMusic(ctx, timing);
    const synth = renderPlaceholderStems(ctx.sampleRate, timing);

    const keys = [...LOOP_KEYS, 'stinger'] as StemKey[];
    await Promise.all(
      keys.map(async (key) => {
        const url = urls[key];
        if (url) {
          const data = await (await fetch(url)).arrayBuffer();
          engine.buffers[key] = await ctx.decodeAudioData(data);
          engine.usesRealStems = true;
        } else {
          const buf = ctx.createBuffer(1, synth[key].length, ctx.sampleRate);
          buf.copyToChannel(synth[key] as Float32Array<ArrayBuffer>, 0);
          engine.buffers[key] = buf;
        }
      }),
    );
    return engine;
  }

  get currentTime() {
    return this.ctx.currentTime;
  }
  get beatDuration() {
    return 60 / this.timing.bpm;
  }
  get barDuration() {
    return this.beatDuration * this.timing.beatsPerBar;
  }

  /** Time of the next beat/bar line (at least a few ms ahead). */
  private nextBoundary(unit: 'beat' | 'bar') {
    const step = unit === 'bar' ? this.barDuration : this.beatDuration;
    const elapsed = this.ctx.currentTime - this.t0;
    return this.t0 + Math.max(0, Math.ceil((elapsed + 0.02) / step)) * step;
  }

  private fade(key: StemKey, to: number, at: number, duration = FADE) {
    const g = this.gains[key].gain;
    g.cancelScheduledValues(this.ctx.currentTime);
    g.setTargetAtTime(to, at, duration / 3);
  }

  async start() {
    if (this.started) return;
    await this.ctx.resume();
    this.started = true;
    this.t0 = this.ctx.currentTime + 0.1;
    for (const key of LOOP_KEYS) {
      const gain = this.ctx.createGain();
      gain.gain.value = key === 'exploreBase' ? 1 : 0;
      gain.connect(this.master);
      this.gains[key] = gain;
      const src = this.ctx.createBufferSource();
      src.buffer = this.buffers[key];
      src.loop = true;
      src.connect(gain);
      src.start(this.t0);
    }
    this.master.gain.setTargetAtTime(0.8, this.ctx.currentTime, 0.1);
  }

  /** Switch state at the next bar. Returns when the change will be heard. */
  setMode(next: Mode): number {
    if (!this.started || next === this.mode) return this.ctx.currentTime;
    const at = this.nextBoundary('bar');
    const bar = this.barDuration;
    this.mode = next;

    if (next === 'combat') {
      const stinger = this.ctx.createBufferSource();
      stinger.buffer = this.buffers.stinger;
      stinger.connect(this.master);
      stinger.start(at);
      // Exploration fades away under the stinger, combat arrives on the
      // downbeat after it.
      this.fade('exploreBase', 0, at, bar);
      this.fade('exploreLayer', 0, at, bar);
      this.fade('combatBase', 1, at + bar, 0.05);
      this.fade('combatLayer', this.layers.combat ? 1 : 0, at + bar, 0.05);
      return at + bar;
    }

    this.fade('combatBase', 0, at, bar / 2);
    this.fade('combatLayer', 0, at, bar / 2);
    this.fade('exploreBase', 1, at, bar / 2);
    this.fade('exploreLayer', this.layers.explore ? 1 : 0, at, bar / 2);
    return at;
  }

  /** Add or remove a state's vertical layer at the next beat. */
  setLayer(mode: Mode, on: boolean) {
    this.layers[mode] = on;
    if (!this.started || mode !== this.mode) return;
    const key: StemKey = mode === 'explore' ? 'exploreLayer' : 'combatLayer';
    this.fade(key, on ? 1 : 0, this.nextBoundary('beat'));
  }

  /** Current gain per looping stem, for the on-screen level meters. */
  levels(): Record<(typeof LOOP_KEYS)[number], number> {
    const out = {} as Record<(typeof LOOP_KEYS)[number], number>;
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
