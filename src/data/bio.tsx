import type { TimelineItemType } from '../components/Timeline/Timeline';

import ImageCollage from '../components/ImageCollage/ImageCollage';

import eileen_child1 from '../assets/images/photos/eileen-child1.webp';
import eileen_child2 from '../assets/images/photos/eileen-child2.webp';
import eileen_chamber from '../assets/images/photos/eileen-chamber.webp';
import studio from '../assets/images/photos/studio.webp';
import studio2 from '../assets/images/photos/studio2.webp';
import eileen_kenley from '../assets/images/photos/eileen-kenley.webp';
import eileen_fish from '../assets/images/photos/eileen-fish.webp';
import singapore1 from '../assets/images/photos/singapore1.webp';
import eileen_engineer from '../assets/images/photos/eileen-engineer.webp';
import eileen_fantasy from '../assets/images/photos/eileen-fantasy.webp';
import fantasy from '../assets/images/photos/fantasy.webp';
import fantasy2 from '../assets/images/photos/fantasy2.webp';

import Button from '../components/Button/Button';
import { MessageSquareShareIcon } from '../assets/icons/MessageSquareShare';

export const timeline: TimelineItemType[] = [
  {
    title: 'Early Melodies',
    dates: '1991 — 2004',
    body: (
      <>
        <h2>Early Melodies</h2>
        <p>
          <strong>
            Born in South London in 1986,{' '}
            <mark className="highlight">
              I'm a British/Dutch composer
            </mark>{' '}
            whose musical journey began at the age of five when I
            started to learn the violin with the Suzuki method.
          </strong>
        </p>
        <p>
          A year later I began piano lessons and continued my
          classical music training throughout school, discovering the
          music of different composers and eras whilst playing in
          youth orchestras.
        </p>
        <ImageCollage
          rotate
          magnetic
          imageSize={315}
          images={[
            {
              file: eileen_child1,
              zIndex: 40,
              description: 'Eileen as a child with her mother',
            },
            {
              file: eileen_child2,
              zIndex: 20,
              description: 'Eileen as a child playing the violin',
            },
          ]}
        />
      </>
    ),
  },
  {
    title: 'Exploring Sound',
    dates: '2004 — 2008',
    body: (
      <>
        <h2>Exploring Sound</h2>
        <p>
          Driven by curiosity and my{' '}
          <mark className="highlight">
            love for sound, maths and physics
          </mark>
          , I pursued an MEng (Master of Engineering) in Acoustic
          Engineering at the University of Southampton.
        </p>

        <p>I graduated with a first class honours degree in 2008.</p>

        <figure
          className="image-border overlay"
          style={{
            margin: '2em 1em',
            width: '80%',
          }}
        >
          <figcaption>Testing in an anechoic chamber</figcaption>
          <img
            src={eileen_chamber}
            alt="Testing in an anechoic chamber"
            loading="lazy"
          />
        </figure>
      </>
    ),
  },
  {
    title: 'Engineering Adventures',
    dates: '2009 — 2024',
    body: (
      <>
        <h2>Engineering Adventures</h2>
        <p>
          My engineering career took me around the world as I worked
          in diverse fields.
        </p>
        <p>
          From acoustic consultancies and risk engineering to research
          in <mark className="highlight">underwater acoustics</mark>{' '}
          and <mark className="highlight">dolphin echolocation</mark>{' '}
          at the National University of Singapore .
        </p>
        <ImageCollage
          rotate
          magnetic
          imageSize={300}
          images={[
            {
              file: eileen_fish,
              zIndex: 10,
              description: 'Eileen holding a fish',
            },
            {
              file: eileen_engineer,
              zIndex: 30,
              description: 'Eileen with hard hat on',
            },
            {
              file: singapore1,
              zIndex: 40,
              description: 'Researching underwater acoustics',
            },
          ]}
        />
      </>
    ),
  },
  {
    title: 'Ensemble Performance',
    dates: '2011 — 2017',
    body: (
      <>
        <h2>Ensemble Performance</h2>
        <p>
          Alongside my engineering career, I always kept my passion
          for performance alive. Following my work, I lived in various
          cities where I regularly played in vibrant ensembles like
          the{' '}
          <mark className="highlight">London Gypsy Orchestra</mark>{' '}
          <small>(2011-2013)</small>, folk groups and the{' '}
          <mark className="highlight">Paris Fantasy Orchestra</mark>{' '}
          <small>(2015-2017)</small>.
        </p>

        <ImageCollage
          rotate
          magnetic
          imageSize={315}
          images={[
            {
              file: eileen_fantasy,
              zIndex: 40,
              description:
                'Eileen playing in the Paris Fantasy Orchestra',
            },
            {
              file: fantasy,
              zIndex: 50,
              description: 'Paris Fantasy Orchestra',
            },
            {
              file: fantasy2,
              zIndex: 20,
              description: 'Paris Fantasy Orchestra',
            },
          ]}
        />
      </>
    ),
  },
  {
    title: 'Composing My Path',
    dates: '2024 — Present',
    body: (
      <>
        <h2>Composing My Path</h2>
        <p>
          Now <mark className="highlight">based in Amsterdam</mark>, I
          have left my corporate career behind to fully focus on my
          passion of creating music.
        </p>
        <p>
          I am currently honing my skills in scoring for story-telling
          through an MA (Master of Arts) in Professional Media
          Composition at ThinkSpace Education, Arts University
          Bournemouth.
        </p>

        <p>I am open to new projects and collaborations.</p>

        <div className="font-size-1-5 flex gap-1 mt-1 mb-2 ml-1">
          <Button
            href="/contact"
            icon={<MessageSquareShareIcon size={20} />}
          >
            Get in touch
          </Button>
        </div>

        <ImageCollage
          rotate
          magnetic
          imageSize={315}
          images={[
            {
              file: eileen_kenley,
              zIndex: 40,
              description: 'Playing the violin in London',
            },
            {
              file: studio,
              zIndex: 30,
              description: 'Studio in Amsterdam',
            },
            {
              file: studio2,
              zIndex: 20,
              description: 'Studio in Amsterdam',
            },
          ]}
        />
      </>
    ),
  },
];
