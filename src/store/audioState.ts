import type WaveSurfer from 'wavesurfer.js';
import { create } from 'zustand';

export type AudioState = {
  activeInstance: WaveSurfer | null;
  audioFile: string | null;
  isPlaying: boolean;
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  initAudio: (mediaElement: HTMLAudioElement, file: string) => void;
  destroyMediaElement: (file: string) => void;
  setActiveAndPlayPause: (instance: WaveSurfer) => void;
};

const mediaElements = new Map<
  string,
  {
    element: HTMLAudioElement;
    analyser: AnalyserNode;
    audioCtx: AudioContext;
    source: MediaElementAudioSourceNode;
    file: string;
  }
>();

const useAudioState = create<AudioState>((set) => ({
  activeInstance: null,
  audioFile: null,
  isPlaying: false,
  audioContext: null,
  analyser: null,

  initAudio: (mediaElement: HTMLAudioElement, file: string) =>
    set(() => {
      // const time = new Date().getTime();
      if (!mediaElements.has(file)) {
        const audioCtx = new AudioContext();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        const source =
          audioCtx.createMediaElementSource(mediaElement);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        mediaElements.set(file, {
          element: mediaElement,
          analyser: analyser,
          audioCtx: audioCtx,
          source: source,
          file: file,
        });

        return { audioContext: audioCtx, analyser };
      } else {
        const { audioCtx, analyser } = mediaElements.get(file)!;
        return { audioContext: audioCtx, analyser };
      }
    }),

  setActiveAndPlayPause: (instance: WaveSurfer) =>
    set((state) => {
      const { activeInstance } = state;

      if (activeInstance && activeInstance !== instance) {
        activeInstance.pause();
      }

      return { activeInstance: instance };
    }),

  destroyMediaElement: (file: string) => mediaElements.delete(file),
}));

export default useAudioState;
