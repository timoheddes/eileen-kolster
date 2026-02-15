import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useAudioState from '../../store/audioState';
import './VideoPlayer.css';

interface VideoPlayerProps {
  src: string;
  caption?: string;
  posterTime?: number;
  startAt?: number;
  style?: React.CSSProperties;
}

export default function VideoPlayer({
  src,
  caption,
  posterTime,
  startAt,
  style,
}: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const activeAudioInstance = useAudioState((state) => state.activeInstance);

  const open = useCallback(() => {
    // Pause any background audio
    if (activeAudioInstance) {
      activeAudioInstance.pause();
    }
    setIsOpen(true);
  }, [activeAudioInstance]);

  const close = useCallback(() => {
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause();
    }
    setIsOpen(false);
  }, []);

  // Lock scroll & close on ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  // Auto-play when lightbox opens
  useEffect(() => {
    if (isOpen && lightboxVideoRef.current) {
      lightboxVideoRef.current.play();
    }
  }, [isOpen]);

  return (
    <>
      <figure
        className="image-border overlay video-border video-player-thumbnail"
        style={style}
        onClick={open}
      >
        {caption && <figcaption>{caption}</figcaption>}
        <video
          src={posterTime != null ? `${src}#t=${posterTime}` : src}
          preload="metadata"
          playsInline
          muted
        />
        <div className="video-player-play-icon" />
      </figure>

      {isOpen &&
        createPortal(
          <div
            className="video-lightbox"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <button
              className="video-lightbox-close"
              onClick={close}
              aria-label="Close video"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="8" y1="16" x2="24" y2="16" />
                <line x1="16" y1="8" x2="16" y2="24" />
              </svg>
            </button>

            <div className="video-lightbox-content">
              <video
                ref={lightboxVideoRef}
                src={startAt != null ? `${src}#t=${startAt}` : src}
                controls
                controlsList="nodownload"
                playsInline
                preload="auto"
              />
              {caption && (
                <div className="video-lightbox-caption">{caption}</div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
