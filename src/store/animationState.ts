import { create } from 'zustand';

export type AnimationState = {
  isSplashScreenVisible: boolean;
  splashScreenPlayed: boolean;
  setIsSplashScreenVisible: (isSplashScreenVisible: boolean) => void;
  setSplashScreenPlayed: (splashScreenPlayed: boolean) => void;
};

const useAnimationState = create<AnimationState>((set) => ({
  isSplashScreenVisible: false,
  splashScreenPlayed: false,
  setIsSplashScreenVisible: (isSplashScreenVisible) =>
    set({ isSplashScreenVisible }),
  setSplashScreenPlayed: (splashScreenPlayed) =>
    set({ splashScreenPlayed }),
}));

export default useAnimationState;
