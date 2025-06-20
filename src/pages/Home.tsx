import { MessageSquareShare, AudioWaveform } from 'lucide-react';

import ImageCollage from '../components/ImageCollage/ImageCollage';
import { SplashScreen } from '../components/SplashScreen';
import Button from '../components/Button/Button';

import useAnimationState from '../store/animationState';

import eileen_colourful from '../assets/images/photos/eileen-colourful.webp';
import eileen_piano2 from '../assets/images/photos/eileen-piano2.webp';
import eileen_roof_violin from '../assets/images/photos/eileen-roof-violin.webp';

const Home = () => {
  const { isSplashScreenVisible } = useAnimationState();

  return (
    <>
      {isSplashScreenVisible && (
        <SplashScreen
          duration={4500}
          text="Eileen Kolster"
          size={4}
          effect="construct"
          effectOut="appear"
        />
      )}
      {!isSplashScreenVisible && (
        <>
          <ImageCollage
            rotate
            magnetic
            imageSize={350}
            images={[
              { file: eileen_roof_violin, zIndex: 20 },
              { file: eileen_colourful, zIndex: 30 },
              { file: eileen_piano2, zIndex: 20 },
            ]}
          />
          <p className="font-size-2 font-style-bold">
            An Amsterdam-based media composer
          </p>
          <p className="font-size-1-2" style={{ width: '800px' }}>
            My music ranges from intimate acoustic and ambient
            textures to expansive orchestral and synth-driven
            soundscapes.
          </p>
          <p className="font-size-1-2 font-style-bold">
            I am passionate about contributing to new and intriguing
            projects.
          </p>
          <p className="font-size-1-5 flex gap-1 mt-1">
            <Button
              href="/contact"
              icon={<MessageSquareShare size={20} />}
            >
              Get in touch
            </Button>
            <Button
              href="/my-music"
              variant="secondary"
              icon={<AudioWaveform size={20} />}
            >
              Listen to my music
            </Button>
          </p>
        </>
      )}
    </>
  );
};

export default Home;
