import { useEffect, useRef, useState } from 'react';
import WaveSurfer, { type WaveSurferOptions } from 'wavesurfer.js';

import './AudioWave.css';
import useAudioState from '../../store/audioState';
import { squiglyWave } from './waveRender';
import { RippleOutline } from '../Loaders';

import { PlayIcon } from '../../assets/icons/Play';
import { PauseIcon } from '../../assets/icons/Pause';
import { SkipForwardIcon } from '../../assets/icons/SkipForward';
import { SkipBackIcon } from '../../assets/icons/SkipBack';
import useShareState from '../../store/shareState';
import type { Track } from '../../types/tracks';
import { useLocation } from 'wouter';

export const AudioWave = ({
  tracks,
  theme = 'light',
  style,
  options,
}: {
  tracks: Track[];
  theme?: 'light' | 'dark' | 'footer';
  style?: React.CSSProperties;
  options?: Partial<WaveSurferOptions>;
}) => {
  const [availableTracks, setAvailableTracks] = useState(tracks);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { sharedTrack } = useShareState();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (sharedTrack) {
      setAvailableTracks(
        tracks.filter(
          (t) =>
            t.title.toLowerCase().replace(' ', '') ===
            sharedTrack.toLowerCase().replace(' ', ''),
        ),
      );
    } else {
      setAvailableTracks(tracks.filter((t) => !t.hidden));
    }
  }, [sharedTrack, tracks, navigate]);

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
        await wavesurfer.load(availableTracks[currentTrack].file);
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
      initAudio(mediaElement, availableTracks[currentTrack].file);

      useAudioState.setState({
        isPlaying: true,
        audioFile: availableTracks[currentTrack].file,
      });
      setPlaying(true);
      setActiveAndPlayPause(wavesurfer);
      document.querySelectorAll('video').forEach((video) => video.pause());
    });
    wavesurfer.on('pause', () => {
      useAudioState.setState({ isPlaying: false, audioFile: null });
      setPlaying(false);
    });
    wavesurfer.on('finish', () => {
      // play next track
      changeTrack('next');
      setPlaying(true);
    });
    wavesurfer.on('ready', () => {
      setReady(true);
      playButton.current?.focus();
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
    availableTracks,
    currentTrack,
    initAudio,
    setActiveAndPlayPause,
    theme,
    options,
  ]);

  const changeTrack = (direction: 'previous' | 'next') => {
    destroyMediaElement(availableTracks[currentTrack].file);
    setReady(false);
    setCurrentTrack((prev) =>
      direction === 'previous'
        ? (prev - 1 + availableTracks.length) % availableTracks.length
        : (prev + 1) % availableTracks.length,
    );
  };

  return availableTracks[currentTrack] ? (
    <>
      <div className="metadata">
        <h3 className="font-family-baloo h4 metadata-title">
          <span className="metadata-title-text">
            {availableTracks[currentTrack].title}
          </span>
        </h3>
      </div>
      <div className="player">
        <div className="audio-wave" style={style}>
          <div className={`audio-wave-container theme-${theme}`}>
            <button
              className={
                availableTracks.length === 1 ? 'track-nav--disabled' : ''
              }
              onClick={() =>
                availableTracks.length > 1 && changeTrack('previous')
              }
              aria-label="Previous track"
              aria-disabled={availableTracks.length === 1}
            >
              <SkipBackIcon
                color="white"
                size={
                  options?.height ? `${Number(options.height) * 0.5}px` : '50px'
                }
              />
            </button>
            {!ready ? (
              <RippleOutline
                size={
                  options?.height ? `${Number(options.height) * 0.8}px` : '50px'
                }
              />
            ) : (
              <button
                onClick={() => wavesurferRef.current?.playPause()}
                ref={playButton}
                aria-label="Play/Pause"
              >
                {!playing ? (
                  <PlayIcon
                    color="white"
                    size={
                      options?.height
                        ? `${Number(options.height) * 0.8}px`
                        : '50px'
                    }
                  />
                ) : (
                  <PauseIcon
                    color="white"
                    size={
                      options?.height
                        ? `${Number(options.height) * 0.8}px`
                        : '50px'
                    }
                  />
                )}
              </button>
            )}
            <button
              className={
                availableTracks.length === 1 ? 'track-nav--disabled' : ''
              }
              onClick={() => availableTracks.length > 1 && changeTrack('next')}
              aria-label="Next track"
              aria-disabled={availableTracks.length === 1}
            >
              <SkipForwardIcon
                color="white"
                size={
                  options?.height ? `${Number(options.height) * 0.5}px` : '50px'
                }
              />
            </button>
            <div
              className={`waveform ${playing ? 'playing' : 'paused'}`}
              style={{
                height: options?.height ? `${options.height}px` : '80px',
              }}
              ref={waveformRef}
            ></div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>{navigate('/')}</>
  );
};
