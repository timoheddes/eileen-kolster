import { memo, useMemo } from 'react';
import { Link } from 'wouter';
import { AudioWave } from '../components/AudioWave';
import { AdaptiveDemo } from '../components/AdaptiveDemo';
import { musicSections, type MusicTrack } from '../data/music';
import { scrollToSection, useScrollSpy } from '../hooks/useScrollSpy';
import seo from '../data/seo.json';

import '../components/Timeline/Timeline.css';
import './music.css';

const sectionIds = musicSections.map((section) => section.id);
const waveOptions = { cursorWidth: 0, height: 56 };

/**
 * The player is memoised: scrolling re-renders the page to move the section
 * highlight, and a fresh `tracks` array would restart playback.
 */
const TrackPlayer = memo(function TrackPlayer({
  track,
}: {
  track: MusicTrack;
}) {
  const tracks = useMemo(
    () => [{ title: track.title, file: track.file as string }],
    [track],
  );
  return (
    <AudioWave
      tracks={tracks}
      theme="footer"
      options={waveOptions}
      showMetadata={false}
      autoAdvance={false}
      focusOnReady={false}
    />
  );
});

const Music = () => {
  const activeId = useScrollSpy(sectionIds);

  return (
    <>
      <title>{seo.pages['/music'].title}</title>
      <meta name="description" content={seo.pages['/music'].description} />
      <div className="timeline music-layout">
        <nav className="timeline-column column-20" aria-label="Sections">
          <ul className="timeline-legend">
            {musicSections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  className={`timeline-nav-btn ${activeId === section.id ? 'active' : ''}`}
                  aria-current={
                    activeId === section.id ? 'location' : undefined
                  }
                  onClick={() => scrollToSection(section.id)}
                >
                  <span>{section.title}</span>
                  <br />
                  {section.legend}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="timeline-column column-70">
          <section id="music">
            <h2>Listen</h2>
            <p className="font-size-1-2">
              Scores and sound worlds to hear on their own: suites from films, a
              documentary pitch, and an interactive demo of music that reacts to
              a game.
            </p>
            <p>
              Press play on anything below. To see the story behind a score and
              how it was made, head to <Link href="/work">my work</Link>.
            </p>

            {musicSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="music-section"
              >
                <h3>{section.title}</h3>
                <p className="music-section-blurb">{section.blurb}</p>
                {section.tracks.map((track) => (
                  <article key={track.id} className="music-track">
                    <h4>{track.title}</h4>
                    <ul className="music-track-info">
                      {track.info.split(' · ').map((part) => (
                        <li key={part}>{part}</li>
                      ))}
                    </ul>
                    {!track.interactive &&
                      (track.file ? (
                        <TrackPlayer track={track} />
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
        </div>
      </div>
    </>
  );
};

export default Music;
