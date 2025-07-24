import { useLocation, useRoute } from 'wouter';
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
import useShareState from '../../store/shareState';

let tracks = [
  { title: 'Beneath the Surface', file: beneath_the_surface },
  { title: 'Call of the Ocean', file: call_of_the_ocean },
  { title: 'Golden Hour Immersion', file: golden_hour_immersion },
  { title: 'Shared Shores', file: shared_shores },
  { title: 'Timeless Tides', file: timeless_tides },
  { title: 'Mystic Trees', file: mystic_trees },
  { title: 'Period Drama', file: period_drama },
  { title: 'Night Flight', file: night_flight, hidden: true },
].sort(() => Math.random() - 0.5);

export const Footer = () => {
  const [shareActive] = useRoute('/share/:track');
  const { track } = useShareState();
  const [, setLocation] = useLocation();

  if (shareActive && track) {
    const sharedTrack = tracks.filter(
      (t) =>
        t.title.toLowerCase().replace(' ', '') ===
        track.toLowerCase().replace(' ', '')
    );
    if (sharedTrack[0]) {
      sharedTrack[0].hidden = false;
      tracks = sharedTrack;
    } else {
      setLocation('/');
    }
  }

  return (
    <footer className="footer">
      <div className="content">
        <AudioWave
          tracks={tracks.filter((t) => !t.hidden)}
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
