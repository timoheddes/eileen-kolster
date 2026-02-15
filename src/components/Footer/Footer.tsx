import { AudioWave } from '../AudioWave';
import './Footer.css';

import beneath_the_surface from '../../assets/music/Beneath the Surface.mp3';
import call_of_the_ocean from '../../assets/music/Call of the Ocean.mp3';
import golden_hour_immersion from '../../assets/music/Golden Hour Immersion.mp3';
import shared_shores from '../../assets/music/Shared Shores.mp3';
import timeless_tides from '../../assets/music/Timeless Tides.mp3';
import mystic_trees from '../../assets/music/Mystic Trees.mp3';
import period_drama from '../../assets/music/period Drama.mp3';
import night_flight from '../../assets/music/Night Flight.mp3';
import cave from '../../assets/music/cave.mp3';

const tracks = [
  { title: 'Beneath the Surface', file: beneath_the_surface },
  { title: 'Call of the Ocean', file: call_of_the_ocean },
  { title: 'Golden Hour Immersion', file: golden_hour_immersion },
  { title: 'Shared Shores', file: shared_shores },
  { title: 'Timeless Tides', file: timeless_tides },
  { title: 'Mystic Trees', file: mystic_trees },
  { title: 'Period Drama', file: period_drama },
  { title: 'Night Flight', file: night_flight },
  { title: 'Mycelium', file: cave },
].sort(() => Math.random() - 0.5);

export const Footer = () => {
  return (
    <footer className="footer">
      {/* <button>Open</button> */}
      <div className="footer-content">
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
