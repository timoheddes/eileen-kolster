import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import './Cursor.css';

type CursorMode = 'default' | 'zoom' | 'close' | 'play' | 'pause' | 'hidden';

// Height of the native video control bar. Hovering it shows the regular
// cursor instead of the play/pause icon so the controls stay usable.
const VIDEO_CONTROLS_HEIGHT = 56;

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorSmallRef = useRef<HTMLDivElement>(null);
  const cursorLargeRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const currentHoveredElementRef = useRef<HTMLElement | null>(null);
  const cursorModeRef = useRef<CursorMode>('default');
  const hoveredVideoRef = useRef<HTMLVideoElement | null>(null);
  const inLightboxContentRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorSmall = cursorSmallRef.current;
    const cursorLarge = cursorLargeRef.current;

    if (!cursor || !cursorSmall || !cursorLarge) {
      return;
    }

    const applyMode = (newMode: CursorMode) => {
      if (newMode !== cursorModeRef.current) {
        cursorModeRef.current = newMode;
        setCursorMode(newMode);
      }
      // Inside a video lightbox, 'default' means the control bar or the
      // caption: show the system cursor there so it never disappears.
      if (inLightboxContentRef.current && newMode === 'default') {
        document.body.classList.add('native-cursor');
      } else {
        document.body.classList.remove('native-cursor');
      }
    };

    const videoMode = (video: HTMLVideoElement, clientY: number | null) => {
      if (
        clientY !== null &&
        clientY > video.getBoundingClientRect().bottom - VIDEO_CONTROLS_HEIGHT
      ) {
        return 'default';
      }
      return video.paused ? 'play' : 'pause';
    };

    let lastY: number | null = null;

    const updateCursorMode = (target: HTMLElement) => {
      const imageLightbox = target.closest('.image-lightbox');
      const videoLightbox = target.closest('.video-lightbox');
      const videoLightboxContent = target.closest('.video-lightbox-content');
      const zoomElement = target.closest(
        '.image-zoom, .video-player-thumbnail',
      );

      const lightboxVideo = target.closest<HTMLVideoElement>(
        '.video-lightbox-content > video',
      );
      hoveredVideoRef.current = lightboxVideo;
      inLightboxContentRef.current = !!videoLightboxContent;

      let newMode: CursorMode = 'default';
      if (imageLightbox) newMode = 'close';
      else if (videoLightbox && !videoLightboxContent) newMode = 'close';
      else if (zoomElement) newMode = 'zoom';

      if (lightboxVideo) {
        newMode = videoMode(lightboxVideo, lastY);
      }
      applyMode(newMode);
    };

    // Position-only handler — runs on every mousemove and must stay
    // as lean as possible to avoid starving other mousemove listeners
    // (e.g. MagneticWrapper).
    const handleMouseMove = (event: MouseEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      lastY = event.clientY;
      const video = hoveredVideoRef.current;
      if (video) applyMode(videoMode(video, event.clientY));
    };

    // The video toggles between playing and paused while hovered (click or
    // keyboard). Media events do not bubble, so listen in the capture phase.
    const handlePlaybackChange = (event: Event) => {
      const video = hoveredVideoRef.current;
      if (video && event.target === video) {
        applyMode(videoMode(video, lastY));
      }
    };

    // Element-change handlers — only fire when the pointer enters or
    // leaves a DOM node, so DOM traversal (closest) is fine here.
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      updateCursorMode(target);

      const interactableElement = target.closest(
        'button, a',
      ) as HTMLElement | null;

      if (
        interactableElement &&
        interactableElement !== currentHoveredElementRef.current
      ) {
        currentHoveredElementRef.current = interactableElement;
        setHovering(true);

        gsap.to(cursorSmall, {
          scale: 1.5,
          duration: 0.2,
          ease: 'power2.out',
        });
        gsap.to(cursorLarge, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.relatedTarget as HTMLElement | null;
      if (target) updateCursorMode(target);

      if (
        currentHoveredElementRef.current &&
        !currentHoveredElementRef.current.contains(event.relatedTarget as Node)
      ) {
        currentHoveredElementRef.current = null;
        setHovering(false);

        gsap.to(cursorSmall, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
        gsap.to(cursorLarge, {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('play', handlePlaybackChange, true);
    window.addEventListener('pause', handlePlaybackChange, true);

    return () => {
      document.body.classList.remove('native-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('play', handlePlaybackChange, true);
      window.removeEventListener('pause', handlePlaybackChange, true);
    };
  }, []);

  return (
    <div
      className={`cursor ${hovering ? 'cursor--hovering' : ''} ${
        cursorMode !== 'default' ? 'cursor--icon-active' : ''
      }`}
      ref={cursorRef}
    >
      <div className="cursor--small" ref={cursorSmallRef}></div>
      <div className="cursor--large" ref={cursorLargeRef}></div>
      <svg
        className={`cursor--icon ${
          cursorMode === 'zoom' ? 'cursor--icon-zoom' : ''
        } ${cursorMode === 'close' ? 'cursor--icon-close' : ''} ${
          cursorMode === 'play' || cursorMode === 'pause'
            ? 'cursor--icon-media'
            : ''
        }`}
        viewBox="0 0 32 32"
        width="32"
        height="32"
        fill="none"
      >
        <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="1.5" />
        {cursorMode === 'play' && (
          <polygon
            points="13 10.5 22 16 13 21.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        )}
        {cursorMode === 'pause' && (
          <>
            <line
              x1="13"
              y1="10.5"
              x2="13"
              y2="21.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="19"
              y1="10.5"
              x2="19"
              y2="21.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        )}
        {cursorMode !== 'play' && cursorMode !== 'pause' && (
          <>
            <line
              x1="16"
              y1="9"
              x2="16"
              y2="23"
              stroke="white"
              strokeWidth="1.5"
            />
            <line
              x1="9"
              y1="16"
              x2="23"
              y2="16"
              stroke="white"
              strokeWidth="1.5"
            />
          </>
        )}
      </svg>
    </div>
  );
};
