import { InstagramIcon } from '../assets/icons/Instagram';
import { MailIcon } from '../assets/icons/Mail';
import { SoundcloudIcon } from '../assets/icons/Soundcloud';

import eileen_piano2 from '../assets/images/photos/eileen-piano2.webp';

import './contact.css';

const Contact = () => {
  return (
    <>
      <title>Eileen Kolster - Get in Touch</title>
      <meta
        name="description"
        content="Get in touch with Eileen Kolster, a British/Dutch composer based in Amsterdam."
      />
      <section id="contact">
        <figure className="header-image image-border overlay">
          <img
            src={eileen_piano2}
            sizes="(max-width: 768px) 100vw, 400px"
            fetchPriority="high"
            width="400"
            height="301"
            loading="eager"
            alt="Eileen playing piano at home"
          />
        </figure>
        <p>
          Based in Amsterdam, Eileen Kolster is a British/Dutch media composer
          focusing on scoring for film and television.
        </p>
        <p>
          A violinist and pianist, her music ranges from intimate acoustic and
          ambient textures to expansive orchestral and synth-driven soundscapes.
          Her work aims to evoke deep emotion by crafting layered scores to
          capture the intricacies of human narratives.
        </p>
        <p>
          She is currently studying an MA in Professional Media Composition at
          ThinkSpace Education, Arts University Bournemouth, and is always
          interested in contributing to new and intriguing projects.
        </p>
        <div className="contact-link">
          <a
            href="mailto:eileen.kolster@gmail.com"
            className="flex gap-0-5 items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MailIcon />
            <mark className="highlight">eileen.kolster@gmail.com</mark>
          </a>
        </div>
        <div className="contact-link">
          <a
            href="https://www.instagram.com/eileenkolster/"
            className="flex gap-0-5 items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
            <mark className="highlight">@eileenkolster</mark>
          </a>
        </div>
        <div className="contact-link">
          <a
            href="https://soundcloud.com/ai-ling-kolster"
            className="flex gap-0-5 items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SoundcloudIcon />
            <mark className="highlight">Eileen Kolster</mark>
          </a>
        </div>
      </section>
    </>
  );
};

export default Contact;
