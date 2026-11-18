import { AudioWave } from '../AudioWave';
import { tracks } from '../../data/tracks';
import './Footer.css';

const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <AudioWave
          tracks={shuffledTracks}
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
