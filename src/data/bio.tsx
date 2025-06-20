import type { TimelineItemType } from '../components/Timeline/Timeline';

import { AudioWave } from '../components/AudioWave';
import ImageCollage from '../components/ImageCollage/ImageCollage';

import tides from '../assets/music/Timeless Tides.wav';

import eileen_child1 from '../assets/images/photos/eileen-child1.webp';
import eileen_child2 from '../assets/images/photos/eileen-child2.webp';
import eileen_piano2 from '../assets/images/photos/eileen-piano2.webp';
import eileen_chamber from '../assets/images/photos/eileen-chamber.webp';
import studio from '../assets/images/photos/studio.webp';
import studio2 from '../assets/images/photos/studio2.webp';
import eileen_kenley from '../assets/images/photos/eileen-kenley.webp';

import { getRandomPosition } from '../utils';
import Button from '../components/Button/Button';
import { MessageSquareShare } from 'lucide-react';

export const timeline: TimelineItemType[] = [
  {
    title: 'Early years',
    dates: '1986 — 1992',
    body: (
      <>
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
        <h2>Early years</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          dapibus nunc sit amet ligula venenatis interdum nec at
          magna. In cursus odio et lectus sagittis, id rhoncus ex
          semper. Nullam ornare nibh purus, id ullamcorper tortor
          congue in. In sollicitudin tortor ac rhoncus consectetur.
        </p>
        <p>
          In cursus odio et lectus sagittis, id rhoncus ex semper.
          Nullam ornare nibh purus, id ullamcorper tortor congue in.
          In sollicitudin tortor ac rhoncus consectetur.
        </p>
      </>
    ),
  },
  {
    title: 'Acoustic engineering',
    dates: '1992 — 2000',
    body: (
      <>
        <h2>Acoustic engineering</h2>
        <p>
          Pellentesque posuere sapien eu porta sagittis. Nam pulvinar
          placerat leo eget rutrum. Sed neque sem, vehicula a felis
          sed, vehicula suscipit augue. Nunc lorem purus, dictum eget
          nisi facilisis, consectetur tempus augue. Curabitur id
          mattis est. Nam scelerisque mauris sed libero eleifend, vel
          egestas turpis interdum. Nullam a faucibus eros. Quisque
          justo leo, bibendum quis pharetra non, rhoncus vitae dolor.
        </p>

        <p>
          In cursus odio et lectus sagittis, id rhoncus ex semper.
          Nullam ornare nibh purus, id ullamcorper tortor congue in.
          In sollicitudin tortor ac rhoncus consectetur.
        </p>

        <figure
          className="image-border overlay"
          style={{
            ...getRandomPosition(0, 300, true, 10),
            margin: '2em 0em',
          }}
        >
          <figcaption>Anechoic chamber</figcaption>
          <img src={eileen_chamber} alt="Anechoic chamber" />
        </figure>

        <p>
          In cursus odio et lectus sagittis, id rhoncus ex semper.
          Nullam ornare nibh purus, id ullamcorper tortor congue in.
          In sollicitudin tortor ac rhoncus consectetur.
        </p>
      </>
    ),
  },
  {
    title: 'Ocean research',
    dates: '2000 — 2008',
    body: (
      <>
        <h2>Ocean research</h2>
        <p>
          Pellentesque porttitor lorem eget metus cursus finibus.
          Donec dui turpis, fringilla sed ante in, egestas sodales
          velit. Donec consequat lacus eget nisi pharetra, et lobortis
          odio tincidunt. Nunc porta leo sed ex pharetra euismod.
          Curabitur volutpat blandit tortor, quis malesuada erat
          efficitur at. Nam condimentum iaculis ultrices. Nulla vitae
          varius ipsum, ac mollis risus.
        </p>

        <p>
          In cursus odio et lectus sagittis, id rhoncus ex semper.
          Nullam ornare nibh purus, id ullamcorper tortor congue in.
          In sollicitudin tortor ac rhoncus consectetur.
        </p>

        <AudioWave
          file={tides}
          style={{ margin: '2em 0em', width: '60%' }}
        />

        <p>
          In cursus odio et lectus sagittis, id rhoncus ex semper.
          Nullam ornare nibh purus, id ullamcorper tortor congue in.
          In sollicitudin tortor ac rhoncus consectetur.
        </p>
      </>
    ),
  },
  {
    title: 'Gypsy orchestra',
    dates: '2008 — 2012',
    body: (
      <>
        <h2>Gypsy orchestra</h2>
        <p>
          Vestibulum luctus justo a erat imperdiet elementum. Aenean
          eget nulla nec nunc mattis accumsan sit amet fringilla leo.
          Aenean interdum maximus ante, quis dignissim magna cursus
          quis
        </p>
        <figure
          className="image-border overlay"
          style={{
            ...getRandomPosition(0, 300, true, 10),
            margin: '2em 0em',
          }}
        >
          <img src={eileen_piano2} alt="Piano" />
        </figure>
        <p>
          In cursus odio et lectus sagittis, id rhoncus ex semper.
          Nullam ornare nibh purus, id ullamcorper tortor congue in.
          In sollicitudin tortor ac rhoncus consectetur.
        </p>

        <p>
          In cursus odio et lectus sagittis, id rhoncus ex semper.
          Nullam ornare nibh purus, id ullamcorper tortor congue in.
          In sollicitudin tortor ac rhoncus consectetur.
        </p>
      </>
    ),
  },
  {
    title: 'A new chapter',
    dates: '2012 — 2014',
    body: (
      <>
        <h2>A new chapter</h2>
        <p>
          Etiam aliquam vehicula lectus sit amet rutrum. Nunc felis
          nunc, venenatis in turpis in, suscipit molestie eros.
          Phasellus non diam quam. Sed consequat lobortis mi, sed
          aliquam metus ornare vel. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae;
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
        <p>
          In cursus odio et lectus sagittis, id rhoncus ex semper.
          Nullam ornare nibh purus, id ullamcorper tortor congue in.
          In sollicitudin tortor ac rhoncus consectetur.
        </p>

        <p>
          In cursus odio et lectus sagittis, id rhoncus ex semper.
          Nullam ornare nibh purus, id ullamcorper tortor congue in.
          In sollicitudin tortor ac rhoncus consectetur.
        </p>

        <p className="font-size-1-5 flex gap-1 mt-1">
          <Button
            href="/contact"
            icon={<MessageSquareShare size={20} />}
          >
            Get in touch
          </Button>
        </p>
      </>
    ),
  },
];
