import { useMemo } from 'react';
import { motion } from 'motion/react';

import './Timeline.css';

import { TimelineItem } from './TimelineItem';
import { scrollToSection, useScrollSpy } from '../../hooks/useScrollSpy';

export interface TimelineItemType {
  title: string;
  dates: string;
  body: React.ReactNode;
  order?: number;
}

const Timeline = ({ data }: { data: TimelineItemType[] }) => {
  const items = useMemo(
    () => [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [data],
  );
  const activeSection = useScrollSpy(items.map((item) => item.title));

  return (
    <div className="timeline">
      <nav
        className="timeline-column column-20"
        tabIndex={-1}
        aria-label="Timeline navigation"
      >
        <motion.ul className="timeline-legend">
          {items.map((item) => (
            <li key={item.title}>
              <motion.button
                className={`timeline-nav-btn ${activeSection === item.title ? 'active' : ''}`}
                onClick={() => scrollToSection(item.title)}
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
        {items.map((item) => (
          <TimelineItem id={item.title} key={item.title} item={item} />
        ))}
        <br />
        <br />
      </motion.div>
    </div>
  );
};

export default Timeline;
