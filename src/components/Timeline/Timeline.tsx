import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import './Timeline.css';

import { TimelineItem } from './TimelineItem';
import useTimelineScroll from './useTimelineScroll';

export interface TimelineItemType {
  title: string;
  dates: string;
  body: React.ReactNode;
}

const scrollIntoViewWithOffset = (
  selector: string,
  offset: number
) => {
  window.scrollTo({
    behavior: 'smooth',
    top:
      (document.getElementById(selector)?.getBoundingClientRect()
        .top ?? 0) -
      document.body.getBoundingClientRect().top -
      offset,
  });
};

const scrollToSection = (section: TimelineItemType) => {
  const sectionElement = document.getElementById(section.title);
  if (sectionElement) {
    scrollIntoViewWithOffset(sectionElement.id, 110);
  }
};

const Timeline = ({ data }: { data: TimelineItemType[] }) => {
  const [activeSection, setActiveSection] = useState<string | null>(
    null
  );
  const { sections } = useTimelineScroll();

  useEffect(() => {
    const lastVisibleSection = sections.findLast((s) => s.visible);
    setActiveSection(lastVisibleSection?.title || null);
  }, [sections]);

  return (
    <div className="timeline">
      <menu
        className="timeline-column column-20"
        tabIndex={-1}
        role="navigation"
      >
        <motion.li className="timeline-legend">
          {data.map((item) => (
            <motion.a
              key={item.title}
              className={activeSection === item.title ? 'active' : ''}
              onClick={() => scrollToSection(item)}
              onKeyDown={(e) => {
                if (e.code === 'Space' || e.code === 'Enter') {
                  e.preventDefault();
                  scrollToSection(item);
                }
              }}
              tabIndex={0}
            >
              <span>{item.title}</span>
              <br />
              {item.dates}
            </motion.a>
          ))}
        </motion.li>
      </menu>
      <motion.div className="timeline-column column-70">
        {data.map((item) => (
          <TimelineItem
            id={item.title}
            key={item.title}
            item={item}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;
