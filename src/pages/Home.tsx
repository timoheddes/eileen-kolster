import { MessageSquareShare, AudioWaveform } from 'lucide-react';

import ImageCollage from '../components/ImageCollage/ImageCollage';
import Button from '../components/Button/Button';

import eileen_colourful from '../assets/images/photos/eileen-colourful.webp';
import eileen_piano2 from '../assets/images/photos/eileen-piano2.webp';
import eileen_roof_violin from '../assets/images/photos/eileen-roof-violin.webp';

const Home = () => {
  return (
    <>
      <ImageCollage
        rotate
        magnetic
        imageSize={260}
        images={[
          {
            file: eileen_roof_violin,
            zIndex: 20,
            description: 'Eileen playing the violin on the roof',
          },
          {
            file: eileen_colourful,
            zIndex: 30,
            description: 'Eileen with a colourful background',
          },
          {
            file: eileen_piano2,
            zIndex: 20,
            description: 'Eileen playing the piano',
          },
        ]}
      />
      <h2>An Amsterdam-based media composer</h2>
      <p className="font-size-1-2" style={{ maxWidth: '800px' }}>
        My music ranges from intimate acoustic and ambient textures to
        expansive orchestral and synth-driven soundscapes.
      </p>
      <p className="font-size-1-2 font-style-bold">
        I am passionate about contributing to new and intriguing
        projects.
      </p>
      <p className="font-size-1-5 flex gap-1 mt-1">
        <Button
          href="/contact"
          icon={<MessageSquareShare size={20} />}
          data-cursor-text="View Details"
        >
          Get in touch
        </Button>
        <Button
          href="/biography"
          variant="secondary"
          icon={<AudioWaveform size={20} />}
        >
          My journey
        </Button>
      </p>
    </>
  );
};

export default Home;
