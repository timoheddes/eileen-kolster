import { useEffect } from 'react';
import { MessageSquareShareIcon } from '../assets/icons/MessageSquareShare';

import Button from '../components/Button/Button';

import eileen_roof_violin from '../assets/images/photos/eileen-roof-violin.webp';
import { AudioWaveformIcon } from '../assets/icons/AudioWaveform';
import useShareState from '../store/shareState';

import './home.css';

const Home = () => {
  const { sharedTrack, setSharedTrack } = useShareState();

  // Clear shared track state when navigating to home
  useEffect(() => {
    if (sharedTrack) {
      setSharedTrack(null);
    }
  }, [sharedTrack, setSharedTrack]);

  return (
    <section id="home">
      <figure className="header-image image-border overlay">
        <img
          src={eileen_roof_violin}
          sizes="(max-width: 768px) 100vw, 390px"
          fetchPriority="high"
          width="390"
          height="430"
          loading="eager"
          alt="Eileen on a rooftop terrace with her violin"
        />
      </figure>
      <h2>An Amsterdam-based media composer</h2>
      <p className="font-size-1-2 home-description">
        My music ranges from intimate acoustic and ambient textures
        to expansive orchestral and synth-driven soundscapes.
      </p>
      <p className="font-size-1-2 font-style-bold">
        I am passionate about contributing to new and intriguing
        projects.
      </p>
      <div className="font-size-1-5 flex gap-1 mt-1">
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
      </div>
    </section>
  );
};

export default Home;
