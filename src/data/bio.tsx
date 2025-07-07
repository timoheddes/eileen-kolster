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
import singapore2 from '../assets/images/photos/singapore2.webp';

import Button from '../components/Button/Button';
import { MessageSquareShare } from 'lucide-react';

export const timeline: TimelineItemType[] = [
  {
    title: 'Early Melodies',
    dates: '1991 — 2004',
    body: (
      <>
        <h2>Early Melodies</h2>
        <p>
          <strong>
            Born in 1986, Eileen's musical journey began at the age of
            five learning the violin with the Suzuki method.
          </strong>
        </p>
        <p>
          A year later she began piano lessons and continued her
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
            },
            { file: eileen_child2, zIndex: 20 },
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
          Driven by a curiosity for how sound works and her love for
          music, maths and physics, she pursued an MEng (Master of
          Engineering) in Acoustic Engineering at the University of
          Southampton.
        </p>

        <figure
          className="image-border overlay"
          style={{
            margin: '2em 0em',
            width: '80%',
          }}
        >
          <figcaption>Testing in an anechoic chamber</figcaption>
          <img
            src={eileen_chamber}
            alt="Testing in an anechoic chamber"
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
          Her engineering career took her into diverse fields, from
          acoustic consultancies to engineering research in underwater
          acoustics and dolphin echolocation at the National
          University of Singapore.
        </p>
        <ImageCollage
          rotate
          magnetic
          imageSize={300}
          images={[
            { file: eileen_fish, zIndex: 10 },
            { file: singapore1, zIndex: 40 },
            { file: singapore2, zIndex: 20 },
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
          During her engineering career, she kept her passion for
          performance alive, regularly playing in vibrant ensembles
          like the London Gypsy Orchestra (2011-2013), folk groups and
          the Paris Fantasy Orchestra (2015-2017).
        </p>
        <iframe
          className="video"
          style={{
            marginTop: '1em',
          }}
          src="https://www.youtube.com/embed/OW-fHJEoXEs?color=white"
          title="Music Discovery Day 2012 - Cecil Sharp House"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <p>
          <small>Eileen can be seen briefly at around 3:32</small>
        </p>
      </>
    ),
  },
  {
    title: 'Composing Her Path',
    dates: '2024 — Present',
    body: (
      <>
        <h2>Composing Her Path</h2>
        <p>
          Now based in Amsterdam, Eileen is currently honing her
          skills in scoring for story-telling through an MA (Master of
          Arts) in Professional Media Composition at ThinkSpace
          Education, Arts University Bournemouth.
        </p>

        <p>
          Meanwhile, she's establishing herself as a freelance
          composer and building her portfolio.
        </p>

        <p>
          She is currently open to new projects and collaborations.
        </p>

        <p className="font-size-1-5 flex gap-1 mt-1">
          <Button
            href="/contact"
            icon={<MessageSquareShare size={20} />}
          >
            Get in touch
          </Button>
        </p>

        <ImageCollage
          rotate
          magnetic
          imageSize={315}
          images={[
            { file: eileen_kenley, zIndex: 40 },
            {
              file: studio,
              zIndex: 30,
            },
            { file: studio2, zIndex: 20 },
          ]}
        />
      </>
    ),
  },
];
