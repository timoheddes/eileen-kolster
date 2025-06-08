import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

import './AudioWave.css';
import PlayPauseButton from './PlayPauseButton';
import { squiglyWaveform } from '../utils/waveRender';
import useAudioState from '../state';

const AudioWave = ({
  file,
  title,
}: {
  file: string;
  title: string;
}) => {
  const [playing, setPlaying] = useState(false);

  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  const { initAudio, setActiveAndPlayPause } = useAudioState();

  useEffect(() => {
    if (!waveformRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current, // The CSS selector of the container
      backend: 'MediaElement',
      waveColor: '#343f49', // Color of the unplayed waveform
      progressColor: '#c1a790', // Color of the played waveform
      cursorColor: '#34424b', // Color of the playhead cursor
      cursorWidth: 2, // Width of the playhead cursor
      barWidth: 4, // Width of the waveform bars
      barGap: 1, // Gap between waveform bars
      barRadius: 2, // Radius of the waveform bars for a softer look
      height: 80, // Height of the waveform
      // minPxPerSec: 200,
      // sampleRate: 11025,
      dragToSeek: true,
      renderFunction: squiglyWaveform,
    });

    wavesurferRef.current = wavesurfer;
    wavesurfer.load(file);

    wavesurfer.on('play', () => {
      useAudioState.setState({ isPlaying: true, audioFile: file });
      setPlaying(true);

      const mediaElement = wavesurfer.getMediaElement();
      setActiveAndPlayPause(wavesurfer);
      initAudio(mediaElement, file);
    });
    wavesurfer.on('pause', () => {
      useAudioState.setState({ isPlaying: false, audioFile: null });
      setPlaying(false);
    });
    wavesurfer.on('finish', () => {
      useAudioState.setState({ isPlaying: false, audioFile: null });
      setPlaying(false);
    });

    return () => {
      wavesurfer.destroy();
    };
  }, [file, initAudio, setActiveAndPlayPause]);

  return (
    <>
      <div className="audio-wave">
        <h2 className="audio-wave-title">{title}</h2>
        <div className="audio-wave-container">
          <PlayPauseButton
            status={playing ? 'playing' : 'paused'}
            onClick={() => wavesurferRef.current?.playPause()}
          />
          <div className="waveform" ref={waveformRef}></div>
        </div>
      </div>
    </>
  );
};

export default AudioWave;
