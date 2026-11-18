import { InstagramIcon } from '../assets/icons/Instagram';
import { MailIcon } from '../assets/icons/Mail';
import { SoundcloudIcon } from '../assets/icons/Soundcloud';

import { Link } from 'wouter';
import seo from '../data/seo.json';
import { CONTACT_EMAIL, contactPaths, mailtoHref } from '../data/contact';
import eileen_piano2 from '../assets/images/photos/eileen-piano2.webp';

import './contact.css';

const Contact = () => {
  return (
    <>
      <title>{seo.pages['/contact'].title}</title>
      <meta name="description" content={seo.pages['/contact'].description} />
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
        <h2>Let&apos;s make something</h2>
        <p className="font-size-1-2">
          I&apos;m Eileen, a composer based in Amsterdam writing for film,
          documentary and games. If you are making something that needs music, I
          would love to hear about it, whether it is a commission, a student
          film, a non-profit or an indie game.
        </p>
        <p>
          Pick the closest fit and your email app opens with a few questions, so
          your first message already has what I need.
        </p>
        <ul className="contact-paths">
          {contactPaths.map((path) => (
            <li key={path.id}>
              <a href={mailtoHref(path)} className="contact-path">
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                <span className="contact-path-cta">Write to me</span>
              </a>
              {path.more && (
                <Link href={path.more.href} className="contact-path-more">
                  {path.more.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
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
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex gap-0-5 items-center"
          >
            <MailIcon />
            <mark className="highlight">{CONTACT_EMAIL}</mark>
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
