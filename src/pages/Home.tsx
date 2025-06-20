import ImageCollage from '../components/ImageCollage/ImageCollage';
import { SplashScreen } from '../components/SplashScreen';
import useAnimationState from '../store/animationState';

import eileen from '../assets/eileen.jpg';
import eileen2 from '../assets/eileen7.jpg';
import eileen3 from '../assets/eileen3.jpg';
import eileen4 from '../assets/eileen8.jpg';
import Button from '../components/Button/Button';
import { MessageSquareShare, AudioWaveform } from 'lucide-react';

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
            imageSize={350}
            images={[
              { file: eileen, zIndex: 20 },
              { file: eileen2, zIndex: 30 },
              { file: eileen3, zIndex: 40 },
              { file: eileen4, zIndex: 30 },
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
