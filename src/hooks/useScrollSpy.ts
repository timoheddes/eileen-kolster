import { useEffect, useState } from 'react';

/** Distance from the top of the viewport at which a section counts as "reached". */
const REACHED_AT = 200;
/** Where a section lands when its navigation item is clicked. */
export const SCROLL_TARGET_OFFSET = 150;

export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    behavior: 'smooth',
    top: el.getBoundingClientRect().top + window.scrollY - SCROLL_TARGET_OFFSET,
  });
};

/**
 * Which section is being read, derived from scroll position alone: the last
 * section whose top has passed the reference line. The first section is
 * active until the second is reached, and the last one takes over when the
 * page is scrolled to the bottom (it may be too short to reach the line).
 */
export const useScrollSpy = (ids: string[]) => {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  const key = ids.join('|');

  useEffect(() => {
    const list = key ? key.split('|') : [];
    if (list.length === 0) return;
    let frame = 0;

    const compute = () => {
      frame = 0;
      const { scrollHeight } = document.documentElement;
      const scrollable = scrollHeight > window.innerHeight + 8;
      const atBottom =
        scrollable && window.innerHeight + window.scrollY >= scrollHeight - 4;

      let current = list[0];
      if (atBottom) {
        current = list[list.length - 1];
      } else {
        for (const id of list) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= REACHED_AT) current = id;
        }
      }
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key]);

  return active;
};
