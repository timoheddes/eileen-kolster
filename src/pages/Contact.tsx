import { InstagramIcon } from '../assets/icons/Instagram';
import { Mail } from 'lucide-react';
import { SoundcloudIcon } from '../assets/icons/Soundcloud';

const Contact = () => {
  return (
    <div id="contact">
      <p style={{ marginBottom: '1em' }}>
        <a
          href="mailto:eileen.kolster@gmail.com"
          className="flex gap-0-5 items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail />
          <mark className="highlight">eileen.kolster@gmail.com</mark>
        </a>
      </p>
      <p style={{ marginBottom: '1em' }}>
        <a
          href="https://www.instagram.com/eileenkolster/"
          className="flex gap-0-5 items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
          <mark className="highlight">@eileenkolster</mark>
        </a>
      </p>
      <p style={{ marginBottom: '1em' }}>
        <a
          href="https://soundcloud.com/ai-ling-kolster"
          className="flex gap-0-5 items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SoundcloudIcon />
          <mark className="highlight">Eileen Kolster</mark>
        </a>
      </p>
    </div>
  );
};

export default Contact;
