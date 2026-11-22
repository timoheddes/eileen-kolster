import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useAudioState from '../../store/audioState';
import './VideoPlayer.css';

interface VideoPlayerProps {
  src: string;
  caption?: string;
  /** Image shown on the thumbnail instead of a frame picked from the video. */
  poster?: string;
  posterTime?: number;
  startAt?: number;
  style?: React.CSSProperties;
}

export default function VideoPlayer({
  src,
  caption,
  poster,
  posterTime,
  startAt,
  style,
}: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
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

  // Lock scroll, close on ESC, keep Tab inside the dialog
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab') return;
      const focusable: (HTMLElement | null)[] = [
        closeButtonRef.current,
        lightboxVideoRef.current,
      ];
      const items = focusable.filter((el): el is HTMLElement => el !== null);
      const index = items.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey
        ? items[(index <= 0 ? items.length : index) - 1]
        : items[(index + 1) % items.length];
      e.preventDefault();
      next?.focus();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  // Auto-play when the lightbox opens, move focus into it, and give focus
  // back to the thumbnail when it closes
  useEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;
    closeButtonRef.current?.focus();
    lightboxVideoRef.current?.play();
    return () => trigger?.focus();
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
          poster={poster}
          preload={poster ? 'none' : 'metadata'}
          playsInline
          muted
          aria-hidden="true"
        />
        <div className="video-player-play-icon" />
        <button
          ref={triggerRef}
          type="button"
          className="video-player-trigger"
          aria-label={caption ? `Play video: ${caption}` : 'Play video'}
        />
      </figure>

      {isOpen &&
        createPortal(
          <div
            className="video-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={caption ?? 'Video'}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <button
              ref={closeButtonRef}
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
                aria-label={caption ?? 'Video'}
                src={startAt != null ? `${src}#t=${startAt}` : src}
                poster={poster}
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
