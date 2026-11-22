import { AudioWave } from '../components/AudioWave';
import { AdaptiveDemo } from '../components/AdaptiveDemo';
import { musicSections } from '../data/music';
import seo from '../data/seo.json';

import './music.css';

const waveOptions = { cursorWidth: 0, height: 56 };

const Music = () => (
  <>
    <title>{seo.pages['/music'].title}</title>
    <meta name="description" content={seo.pages['/music'].description} />
    <section id="music">
      <h2>Music</h2>
      {musicSections.map((section) => (
        <section key={section.id} className="music-section">
          <h3 className="music-section-title">{section.title}</h3>
          {section.tracks.map((track) => (
            <article key={track.id} className="music-track">
              <h4>{track.title}</h4>
              <p className="music-track-info">{track.info}</p>
              {!track.interactive &&
                (track.file ? (
                  <AudioWave
                    tracks={[{ title: track.title, file: track.file }]}
                    theme="footer"
                    options={waveOptions}
                    showMetadata={false}
                    autoAdvance={false}
                    focusOnReady={false}
                  />
                ) : (
                  <p className="music-track-soon">Audio coming soon.</p>
                ))}
              <p>{track.description}</p>
              {track.interactive && <AdaptiveDemo />}
            </article>
          ))}
        </section>
      ))}
    </section>
  </>
);

export default Music;
