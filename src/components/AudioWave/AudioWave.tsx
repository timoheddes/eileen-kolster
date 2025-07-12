import { useEffect, useRef, useState } from 'react';
import WaveSurfer, { type WaveSurferOptions } from 'wavesurfer.js';

import './AudioWave.css';
import useAudioState from '../../store/audioState';
import { squiglyWave } from './waveRender';
import { RippleOutline } from '../Loaders';

import {
  Play,
  SkipForward,
  SkipBack,
  Pause,
  // Info,
} from 'lucide-react';

export const AudioWave = ({
  tracks,
  theme = 'light',
  style,
  options,
}: {
  tracks: { file: string; title: string }[];
  theme?: 'light' | 'dark' | 'footer';
  style?: React.CSSProperties;
  options?: Partial<WaveSurferOptions>;
}) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const playButton = useRef<HTMLButtonElement>(null);

  const { initAudio, setActiveAndPlayPause, destroyMediaElement } =
    useAudioState();

  useEffect(() => {
    if (!waveformRef.current) return;

    const wavesurfer = WaveSurfer.create({
      ...squiglyWave(waveformRef.current, theme),
      backend: 'MediaElement',
      ...options,
    });

    const loadAudio = async () => {
      try {
        wavesurferRef.current = wavesurfer;
        await wavesurfer.load(tracks[currentTrack].file);
        if (playing) {
          wavesurfer.play();
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Wavesurfer error:', error);
        }
      }
    };

    loadAudio();

    wavesurfer.on('play', () => {
      const mediaElement = wavesurfer.getMediaElement();
      initAudio(mediaElement, tracks[currentTrack].file);

      useAudioState.setState({
        isPlaying: true,
        audioFile: tracks[currentTrack].file,
      });
      setPlaying(true);
      setActiveAndPlayPause(wavesurfer);
    });
    wavesurfer.on('pause', () => {
      useAudioState.setState({ isPlaying: false, audioFile: null });
      setPlaying(false);
    });
    wavesurfer.on('finish', () => {
      useAudioState.setState({ isPlaying: false, audioFile: null });
      setPlaying(false);
    });
    wavesurfer.on('ready', () => {
      setReady(true);
    });

    return () => {
      if (useAudioState.getState().activeInstance === wavesurfer) {
        useAudioState.setState({
          activeInstance: null,
          isPlaying: false,
        });
      }
      wavesurfer.destroy();
    };
  }, [
    tracks,
    currentTrack,
    initAudio,
    setActiveAndPlayPause,
    theme,
    options,
  ]);

  const previousTrack = () => {
    destroyMediaElement(tracks[currentTrack].file);
    setReady(false);
    setCurrentTrack(
      (prev) => (prev - 1 + tracks.length) % tracks.length
    );
    playButton.current?.focus();
  };
  const nextTrack = () => {
    destroyMediaElement(tracks[currentTrack].file);
    setReady(false);
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    playButton.current?.focus();
  };

  return (
    <>
      <div className="flex flex-col metadata">
        <h4
          className="font-family-baloo"
          style={{
            display: 'flex',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              gap: '0.3em',
            }}
          >
            {tracks[currentTrack].title}
          </span>
        </h4>
      </div>
      <div className="flex flex-col player">
        <div className="audio-wave" style={style}>
          <div className={`audio-wave-container theme-${theme}`}>
            <>
              <button onClick={() => previousTrack()}>
                <SkipBack
                  size={
                    options?.height
                      ? `${Number(options.height) * 0.5}px`
                      : '50px'
                  }
                />
              </button>
              {!ready ? (
                <RippleOutline
                  size={
                    options?.height
                      ? `${Number(options.height) * 0.8}px`
                      : '50px'
                  }
                />
              ) : (
                <button
                  onClick={() => wavesurferRef.current?.playPause()}
                  ref={playButton}
                >
                  {!playing ? (
                    <Play
                      size={
                        options?.height
                          ? `${Number(options.height) * 0.8}px`
                          : '50px'
                      }
                    />
                  ) : (
                    <Pause
                      size={
                        options?.height
                          ? `${Number(options.height) * 0.8}px`
                          : '50px'
                      }
                    />
                  )}
                </button>
              )}
              <button onClick={() => nextTrack()}>
                <SkipForward
                  size={
                    options?.height
                      ? `${Number(options.height) * 0.5}px`
                      : '50px'
                  }
                />
              </button>
            </>
            <div
              className={`waveform ${playing ? 'playing' : 'paused'}`}
              style={{
                height: options?.height
                  ? `${options.height}px`
                  : '80px',
              }}
              ref={waveformRef}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
