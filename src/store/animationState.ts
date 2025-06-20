import { create } from 'zustand';

export type AnimationState = {
  isSplashScreenVisible: boolean;
  setIsSplashScreenVisible: (isSplashScreenVisible: boolean) => void;
};

const useAnimationState = create<AnimationState>((set) => ({
  isSplashScreenVisible: true,
  setIsSplashScreenVisible: (isSplashScreenVisible) =>
    set({ isSplashScreenVisible }),
}));

export default useAnimationState;
