import { useCallback, useEffect, useRef, useState } from 'react';
import { AdaptiveMusic, type Mode } from '../../lib/adaptive/AdaptiveMusic';
import { adaptiveConfig } from '../../data/adaptiveDemo';
import useAudioState from '../../store/audioState';

import './AdaptiveDemo.css';

type Status = 'idle' | 'loading' | 'ready' | 'error';

const METERS = [
  { key: 'exploreBase', label: 'Exploration, base' },
  { key: 'exploreLayer', label: 'Exploration, layer' },
  { key: 'combatBase', label: 'Combat, base' },
  { key: 'combatLayer', label: 'Combat, layer' },
] as const;

const MODE_LABEL: Record<Mode, string> = {
  explore: 'Exploration',
  combat: 'Combat',
};

export const AdaptiveDemo = () => {
  const engineRef = useRef<AdaptiveMusic | null>(null);
  const meterRef = useRef<Record<string, HTMLDivElement | null>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [mode, setMode] = useState<Mode>('explore');
  const [layers, setLayers] = useState<Record<Mode, boolean>>({
    explore: false,
    combat: false,
  });
  const [message, setMessage] = useState('');
  const [switching, setSwitching] = useState(false);
  const switchTimerRef = useRef<number>(0);

  const stopEngine = useCallback(() => {
    window.clearTimeout(switchTimerRef.current);
    engineRef.current?.stop();
    engineRef.current = null;
    setStatus('idle');
    setMode('explore');
    setSwitching(false);
    setLayers({ explore: false, combat: false });
    setMessage('');
  }, []);

  // Stop when leaving the page, and when the site's own player starts.
  useEffect(() => {
    const onOtherAudio = () => stopEngine();
    window.addEventListener('site-audio:play', onOtherAudio);
    return () => {
      window.removeEventListener('site-audio:play', onOtherAudio);
      window.clearTimeout(switchTimerRef.current);
      engineRef.current?.stop();
      engineRef.current = null;
    };
  }, [stopEngine]);

  // Drive the level meters straight from the audio gains.
  useEffect(() => {
    if (status !== 'ready') return;
    let frame = 0;
    const tick = () => {
      const levels = engineRef.current?.levels();
      if (levels) {
        for (const { key } of METERS) {
          const el = meterRef.current[key];
          if (el) el.style.transform = `scaleX(${levels[key].toFixed(3)})`;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [status]);

  const start = async () => {
    setStatus('loading');
    try {
      // The demo and the site's player should never play over each other.
      useAudioState.getState().activeInstance?.pause();
      const engine = await AdaptiveMusic.create(adaptiveConfig);
      await engine.start();
      engineRef.current = engine;
      setStatus('ready');
      setMessage('Exploration is playing.');
    } catch (error) {
      console.error('Adaptive music failed to start', error);
      setStatus('error');
    }
  };

  const changeMode = (next: Mode) => {
    const engine = engineRef.current;
    if (!engine || next === mode) return;
    const doneAt = engine.setMode(next);
    if (doneAt === null) return;
    setMode(next);
    setSwitching(true);
    setMessage(
      `Switching to ${MODE_LABEL[next].toLowerCase()} on the next bar...`,
    );
    window.clearTimeout(switchTimerRef.current);
    switchTimerRef.current = window.setTimeout(
      () => {
        setSwitching(false);
        setMessage(`${MODE_LABEL[next]} is playing.`);
      },
      Math.max(0, (doneAt - engine.currentTime) * 1000),
    );
  };

  const toggleLayer = () => {
    const engine = engineRef.current;
    if (!engine) return;
    const on = !layers[mode];
    engine.setLayer(mode, on);
    setLayers((prev) => ({ ...prev, [mode]: on }));
  };

  return (
    <div className="adaptive-demo">
      <h5>Try it yourself</h5>
      <p>
        Switch between exploration and combat, and add the intensity layer.
        Every change waits for the next beat or bar so the music stays in time.
      </p>

      {status !== 'ready' && (
        <button
          type="button"
          className="button primary play-start"
          onClick={start}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Loading...' : 'Start the demo'}
        </button>
      )}
      {status === 'error' && (
        <p role="alert">
          Sorry, the audio could not start in this browser. Please try again.
        </p>
      )}

      {status === 'ready' && (
        <div className="play-controls">
          <div role="group" aria-label="Game state" className="play-modes">
            {(['explore', 'combat'] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                className={`play-mode ${mode === m ? 'is-active' : ''}`}
                aria-pressed={mode === m}
                disabled={switching && mode !== m}
                onClick={() => changeMode(m)}
              >
                {MODE_LABEL[m]}
              </button>
            ))}
          </div>

          <label className="play-layer">
            <input
              type="checkbox"
              checked={layers[mode]}
              onChange={toggleLayer}
            />
            <span>
              Add the {MODE_LABEL[mode].toLowerCase()} layer
              <small>
                Adds the vertical layer on top of the{' '}
                {MODE_LABEL[mode].toLowerCase()} loop
              </small>
            </span>
          </label>

          <p className="play-status" role="status" aria-live="polite">
            {message}
          </p>

          <ul className="play-meters" aria-label="Stems playing">
            {METERS.map(({ key, label }) => (
              <li key={key}>
                <span>{label}</span>
                <div className="play-meter-track">
                  <div
                    className="play-meter-fill"
                    ref={(el) => {
                      meterRef.current[key] = el;
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="button secondary"
            onClick={stopEngine}
          >
            Stop
          </button>
        </div>
      )}

      <p>
        <strong>How it works.</strong> Each state has a <strong>base</strong>{' '}
        loop and a <strong>vertical layer</strong> that can be added on top. All
        the loops start together and run at {adaptiveConfig.timing.bpm} BPM, so
        they always stay in sync and only their volume changes. Moving from
        exploration to combat, and back again, plays its own recorded{' '}
        <strong>transition</strong>, and the level meters show which stems are
        sounding.
      </p>
    </div>
  );
};
