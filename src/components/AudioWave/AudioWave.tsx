import { useEffect, useRef, useState } from 'react';
import WaveSurfer, { type WaveSurferOptions } from 'wavesurfer.js';

import './AudioWave.css';
import useAudioState from '../../store/audioState';
import { squiglyWave } from './waveRender';
import { RippleOutline } from '../Loaders';

import useShareState from '../../store/shareState';
import type { Track } from '../../types/tracks';
import { Link, useLocation } from 'wouter';
import { getProject } from '../../data/projects';

export const AudioWave = ({
  tracks,
  theme = 'light',
  style,
  options,
  showMetadata = true,
  autoAdvance = true,
  focusOnReady = true,
}: {
  tracks: Track[];
  theme?: 'light' | 'dark' | 'footer';
  style?: React.CSSProperties;
  options?: Partial<WaveSurferOptions>;
  /** Show the title, description and project link next to the player. */
  showMetadata?: boolean;
  /** Move on to the next track when one finishes. */
  autoAdvance?: boolean;
  /** Move keyboard focus to the play button once the track has loaded. */
  focusOnReady?: boolean;
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

  const playingRef = useRef(playing);
  playingRef.current = playing;

  const changeTrack = (direction: 'previous' | 'next') => {
    destroyMediaElement(availableTracks[currentTrack].file);
    setReady(false);
    setCurrentTrack((prev) =>
      direction === 'previous'
        ? (prev - 1 + availableTracks.length) % availableTracks.length
        : (prev + 1) % availableTracks.length,
    );
  };

  const changeTrackRef = useRef(changeTrack);
  changeTrackRef.current = changeTrack;
  const autoAdvanceRef = useRef(autoAdvance);
  autoAdvanceRef.current = autoAdvance;
  const focusOnReadyRef = useRef(focusOnReady);
  focusOnReadyRef.current = focusOnReady;

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
        if (playingRef.current) {
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
      // Let other audio on the site (the adaptive demo) stop itself.
      window.dispatchEvent(new Event('site-audio:play'));
      document.querySelectorAll('video').forEach((video) => video.pause());
    });
    wavesurfer.on('pause', () => {
      useAudioState.setState({ isPlaying: false, audioFile: null });
      setPlaying(false);
    });
    wavesurfer.on('finish', () => {
      if (!autoAdvanceRef.current) return;
      changeTrackRef.current('next');
      setPlaying(true);
    });
    wavesurfer.on('ready', () => {
      setReady(true);
      if (focusOnReadyRef.current) playButton.current?.focus();
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

  const projectSlug = availableTracks[currentTrack]?.projectSlug;
  const project = projectSlug ? getProject(projectSlug) : undefined;

  return availableTracks[currentTrack] ? (
    <>
      {showMetadata && (
        <div className="metadata">
          <h3 className="font-family-baloo h4 metadata-title">
            <span className="metadata-title-text">
              {availableTracks[currentTrack].title}
            </span>
          </h3>
          {availableTracks[currentTrack].description && (
            <p
              className="metadata-description"
              title={availableTracks[currentTrack].description}
            >
              {availableTracks[currentTrack].description}
            </p>
          )}
          {project && (
            <Link
              href={`/work/${project.slug}`}
              className="metadata-project-link"
            >
              From {project.title}
            </Link>
          )}
        </div>
      )}
      <div className="player">
        <div className="audio-wave" style={style}>
          <div className={`audio-wave-container theme-${theme}`}>
            {!ready ? (
              <RippleOutline
                size={
                  options?.height ? `${Number(options.height) * 0.8}px` : '50px'
                }
              />
            ) : (
              <button
                className="button primary audio-wave-toggle"
                onClick={() => wavesurferRef.current?.playPause()}
                ref={playButton}
                aria-pressed={playing}
              >
                {playing ? 'Pause' : 'Play'}
              </button>
            )}
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
