import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

import './AudioWave.css';
import useAudioState from '../../store/audioState';
import { squiglyWave } from './waveRender';
import { PlayPauseButton } from '../Button';
import { RippleOutline } from '../Loaders';

export const AudioWave = ({
  file,
  title,
  theme = 'light',
  style,
}: {
  file: string;
  title?: string | null;
  theme?: 'light' | 'dark';
  style?: React.CSSProperties;
}) => {
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  const { initAudio, setActiveAndPlayPause } = useAudioState();

  useEffect(() => {
    if (!waveformRef.current) return;

    const wavesurfer = WaveSurfer.create({
      ...squiglyWave(waveformRef.current, theme),
      backend: 'MediaElement',
    });

    wavesurferRef.current = wavesurfer;
    wavesurfer.load(file);

    wavesurfer.on('play', () => {
      const mediaElement = wavesurfer.getMediaElement();
      initAudio(mediaElement, file);

      useAudioState.setState({ isPlaying: true, audioFile: file });
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
      wavesurfer.destroy();
    };
  }, [file, initAudio, setActiveAndPlayPause, theme]);

  return (
    <>
      <div className="audio-wave" style={style}>
        {title && <h2 className="audio-wave-title">{title}</h2>}
        <div className={`audio-wave-container theme-${theme}`}>
          {!ready ? (
            <RippleOutline size={'50px'} />
          ) : (
            <PlayPauseButton
              status={playing ? 'playing' : 'paused'}
              theme={theme}
              onClick={() => wavesurferRef.current?.playPause()}
            />
          )}
          <div className="waveform" ref={waveformRef}></div>
        </div>
      </div>
    </>
  );
};
