import { useEffect, useLayoutEffect, useState } from 'react';
import { motion } from 'motion/react';

import './Timeline.css';

import { TimelineItem } from './TimelineItem';
import useTimelineScroll from './useTimelineScroll';

export interface TimelineItemType {
  title: string;
  dates: string;
  body: React.ReactNode;
  order?: number;
}

const scrollIntoViewWithOffset = (selector: string, offset: number) => {
  window.scrollTo({
    behavior: 'smooth',
    top:
      (document.getElementById(selector)?.getBoundingClientRect().top ?? 0) -
      document.body.getBoundingClientRect().top -
      offset,
  });
};

const scrollToSection = (section: TimelineItemType) => {
  const sectionElement = document.getElementById(section.title);
  if (sectionElement) {
    scrollIntoViewWithOffset(sectionElement.id, 150);
  }
};

const Timeline = ({ data }: { data: TimelineItemType[] }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { sections, resetSections } = useTimelineScroll();

  useLayoutEffect(() => {
    resetSections();
  }, [data, resetSections]);

  useEffect(() => {
    const lastVisibleSection = sections.findLast((s) => s.visible);
    setActiveSection(lastVisibleSection?.title || null);
  }, [sections]);

  return (
    <div className="timeline">
      <nav
        className="timeline-column column-20"
        tabIndex={-1}
        aria-label="Timeline navigation"
      >
        <motion.ul className="timeline-legend">
          {data
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((item) => (
              <li key={item.title}>
                <motion.button
                  className={`timeline-nav-btn ${activeSection === item.title ? 'active' : ''}`}
                  onClick={() => scrollToSection(item)}
                >
                  <span>{item.title}</span>
                  <br />
                  {item.dates}
                </motion.button>
              </li>
            ))}
        </motion.ul>
      </nav>
      <motion.div className="timeline-column column-70">
        {data
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((item) => (
            <TimelineItem id={item.title} key={item.title} item={item} />
          ))}
        <br />
        <br />
      </motion.div>
    </div>
  );
};

export default Timeline;
