import { useEffect } from 'react';
import useAnimationState from '../../store/animationState';
import { AnimatedTypography } from '../AnimatedTypography';
import './SplashScreen.css';
import type { TypographyEffect } from '../AnimatedTypography/animations';

export const SplashScreen = ({
  duration,
  text,
  size,
  effect,
  effectOut,
}: {
  duration: number;
  text: string;
  size: number;
  effect: TypographyEffect;
  effectOut: TypographyEffect;
}) => {
  const { setIsSplashScreenVisible } = useAnimationState();

  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, duration * 0.65);
  }, [duration, setIsSplashScreenVisible]);

  return (
    <div className="splash-screen">
      <AnimatedTypography
        text={text}
        className="font-family-cute"
        size={size}
        effect={effect}
        effectOut={effectOut}
        options={{
          delay: 0,
          time: duration / 2,
        }}
      />
    </div>
  );
};
