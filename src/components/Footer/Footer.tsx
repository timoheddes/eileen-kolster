import { AudioWave } from '../AudioWave';
import './Footer.css';

import beneath_the_surface from '../../assets/music/Beneath the Surface.wav';
import call_of_the_ocean from '../../assets/music/Call of the Ocean.wav';
import golden_hour_immersion from '../../assets/music/Golden Hour Immersion.wav';
import shared_shores from '../../assets/music/Shared Shores.wav';
import timeless_tides from '../../assets/music/Timeless Tides.wav';

const tracks = [
  { title: 'Beneath the Surface', file: beneath_the_surface },
  { title: 'Call of the Ocean', file: call_of_the_ocean },
  { title: 'Golden Hour Immersion', file: golden_hour_immersion },
  { title: 'Shared Shores', file: shared_shores },
  { title: 'Timeless Tides', file: timeless_tides },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="content">
        <AudioWave
          tracks={tracks}
          theme="footer"
          options={{
            cursorWidth: 0,
            height: 40,
          }}
        />
      </div>
    </footer>
  );
};
