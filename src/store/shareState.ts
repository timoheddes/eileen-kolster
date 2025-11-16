import { create } from 'zustand';

export type ShareState = {
  sharedTrack: string | null;
  setSharedTrack: (track: string | null) => void;
};

const useShareState = create<ShareState>((set) => ({
  sharedTrack: null,
  setSharedTrack: (sharedTrack) => set({ sharedTrack }),
}));

export default useShareState;
