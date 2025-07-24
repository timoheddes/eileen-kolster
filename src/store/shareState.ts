import { create } from 'zustand';

export type ShareState = {
  track: string | null;
  setTrack: (track: string) => void;
};

const useShareState = create<ShareState>((set) => ({
  track: null,
  setTrack: (track) => set({ track }),
}));

export default useShareState;
