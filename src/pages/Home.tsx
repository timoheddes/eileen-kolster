import { MessageSquareShareIcon } from '../assets/icons/MessageSquareShare';
import { PlayIcon } from '../assets/icons/Play';

import Button from '../components/Button/Button';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';

import eileen_roof_violin from '../assets/images/photos/eileen-roof-violin.webp';
import { sanskritiShrivastava } from '../data/testimonials';

import './home.css';

const Home = () => {
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
      <h2>Composer for films and indie games</h2>
      <p className="font-size-1-2 home-description">
        Textured, emotionally driven scores, from intimate and ambient to dark
        and uncanny. Live violin, acoustic instruments, found sounds, synths and
        sound design.
      </p>
      <div className="font-size-1-5 flex gap-1 mt-1">
        <Button
          href="/contact"
          icon={<MessageSquareShareIcon size={20} />}
          data-cursor-text="Get in touch"
        >
          Let&apos;s talk
        </Button>
        <VideoPlayer
          src="/media/showreel.mp4"
          caption="Showreel"
          lightboxCaption={
            <figure className="video-lightbox-quote">
              <blockquote>
                <p>&ldquo;{sanskritiShrivastava.short}&rdquo;</p>
              </blockquote>
              <figcaption>
                <strong>{sanskritiShrivastava.author}</strong>, director,{' '}
                <em>Migratory Birds</em>
              </figcaption>
            </figure>
          }
          buttonLabel="View my showreel"
          buttonIcon={<PlayIcon size={20} />}
        />
      </div>
    </section>
  );
};

export default Home;
