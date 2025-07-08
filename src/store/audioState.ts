import type WaveSurfer from 'wavesurfer.js';
import { create } from 'zustand';

export type AudioState = {
  activeInstance: WaveSurfer | null;
  audioFile: string | null;
  isPlaying: boolean;
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  initAudio: (
    mediaElement: HTMLAudioElement,
    file: string,
    uuid: string
  ) => void;
  setActiveAndPlayPause: (instance: WaveSurfer) => void;
};

const mediaElements = new Map<
  string,
  {
    element: HTMLAudioElement;
    analyser: AnalyserNode;
    audioCtx: AudioContext;
    file: string;
  }
>();

const useAudioState = create<AudioState>((set) => ({
  activeInstance: null,
  // State for UI controls
  audioFile: null,
  isPlaying: false,

  // The core Web Audio API objects to be shared
  audioContext: null,
  analyser: null, // We will store the analyser here

  initAudio: (
    mediaElement: HTMLAudioElement,
    file: string,
    uuid: string
  ) =>
    set(() => {
      if (!mediaElements.has(uuid)) {
        const audioCtx = new AudioContext();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        const source =
          audioCtx.createMediaElementSource(mediaElement);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        mediaElements.set(uuid, {
          element: mediaElement,
          analyser: analyser,
          audioCtx: audioCtx,
          file: file,
        });

        return { audioContext: audioCtx, analyser };
      } else {
        const { audioCtx, analyser } = mediaElements.get(uuid)!;
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
}));

export default useAudioState;
