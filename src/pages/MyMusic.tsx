import { AudioWave } from '../components/AudioWave/AudioWave';
import beneath_the_surface from '../assets/music/Beneath the Surface.wav';
import call_of_the_ocean from '../assets/music/Call of the Ocean.wav';
import golden_hour_immersion from '../assets/music/Golden Hour Immersion.wav';
import shared_shores from '../assets/music/Shared Shores.wav';
import timeless_tides from '../assets/music/Timeless Tides.wav';

const tracks = [
  { title: 'Beneath the Surface', url: beneath_the_surface },
  { title: 'Call of the Ocean', url: call_of_the_ocean },
  { title: 'Golden Hour Immersion', url: golden_hour_immersion },
  { title: 'Shared Shores', url: shared_shores },
  { title: 'Timeless Tides', url: timeless_tides },
];

const MyMusic = () => {
  return (
    <div>
      {tracks.map((track) => (
        <div key={track.title}>
          <AudioWave
            // title={track.title}
            file={track.url}
            options={{
              cursorWidth: 0,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default MyMusic;
