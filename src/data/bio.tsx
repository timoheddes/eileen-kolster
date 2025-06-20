import type { TimelineItemType } from '../components/Timeline/Timeline';

import truffle from '../assets/truffle.jpg';
import bio2 from '../assets/bio2.jpg';
import bio3 from '../assets/bio3.jpeg';
import eileen5 from '../assets/eileen6.jpg';
import timo from '../assets/timo.jpg';

import tides from '../assets/music/Timeless Tides.wav';

import { getRandomPosition } from '../utils';
import { AudioWave } from '../components/AudioWave';
import ImageCollage from '../components/ImageCollage/ImageCollage';

export const timeline: TimelineItemType[] = [
  {
    title: 'Early years',
    dates: '1986 — 1992',
    body: (
      <>
        <ImageCollage
          rotate
          imageSize={315}
          images={[
            {
              file: truffle,
              zIndex: 40,
              caption: 'Truffle, the cat',
            },
            { file: bio2, zIndex: 20, caption: 'Norman' },
            { file: bio3, zIndex: 30 },
            { file: timo, zIndex: 40, caption: 'Timo' },
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
        <p>
          In cursus odio et lectus sagittis, id rhoncus ex semper.
          Nullam ornare nibh purus, id ullamcorper tortor congue in.
          In sollicitudin tortor ac rhoncus consectetur.
        </p>
      </>
    ),
  },
  {
    title: 'Lots of drugs and sex',
    dates: '1992 — 2000',
    body: (
      <>
        <h2>Lots of drugs and sex</h2>
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
          <figcaption>Fun fact: she loves anal sex</figcaption>
          <img src={eileen5} alt="Anal sex" />
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
    title: 'First career',
    dates: '2000 — 2008',
    body: (
      <>
        <h2>First career</h2>
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
    title: 'Burnout',
    dates: '2008 — 2012',
    body: (
      <>
        <h2>Burnout</h2>
        <p>
          Vestibulum luctus justo a erat imperdiet elementum. Aenean
          eget nulla nec nunc mattis accumsan sit amet fringilla leo.
          Aenean interdum maximus ante, quis dignissim magna cursus
          quis
        </p>

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
    title: 'Epiphany',
    dates: '2012 — 2014',
    body: (
      <>
        <h2>Epiphany</h2>
        <p>
          Etiam aliquam vehicula lectus sit amet rutrum. Nunc felis
          nunc, venenatis in turpis in, suscipit molestie eros.
          Phasellus non diam quam. Sed consequat lobortis mi, sed
          aliquam metus ornare vel. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae;
        </p>

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
];
