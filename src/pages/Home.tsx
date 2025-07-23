import { MessageSquareShareIcon } from '../assets/icons/MessageSquareShare';

import Button from '../components/Button/Button';

import eileen_roof_violin from '../assets/images/photos/eileen-roof-violin.webp';
import { AudioWaveformIcon } from '../assets/icons/AudioWaveform';

const Home = () => {
  return (
    <>
      <figure
        className="image-border overlay"
        style={{
          margin: '0 0 2em 0',
          width: '100%',
          maxWidth: '390px',
        }}
      >
        <img
          src={eileen_roof_violin}
          alt="Eileen on a rooftop terrace with her violin"
        />
      </figure>
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
          icon={<MessageSquareShareIcon size={20} />}
          data-cursor-text="View Details"
        >
          Get in touch
        </Button>
        <Button
          href="/biography"
          variant="secondary"
          icon={<AudioWaveformIcon size={20} />}
        >
          My journey
        </Button>
      </p>
    </>
  );
};

export default Home;
