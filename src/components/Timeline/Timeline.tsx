import { motion } from 'motion/react';
import './Timeline.css';
import { TimelineItem } from './TimelineItem';
import useTimelineScroll from './useTimelineScroll';
import { useEffect, useState } from 'react';

export interface TimelineItemType {
  title: string;
  dates: string;
  body: React.ReactNode;
}

const scrollToSection = (section: TimelineItemType) => {
  const sectionElement = document.getElementById(section.title);
  if (sectionElement) {
    sectionElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'start',
    });
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
      <aside className="timeline-column column-20">
        <motion.div className="timeline-legend">
          {data.map((item) => (
            <motion.h4
              key={item.title}
              className={activeSection === item.title ? 'active' : ''}
              onClick={() => scrollToSection(item)}
            >
              <span>{item.title}</span>
              <br />
              {item.dates}
            </motion.h4>
          ))}
        </motion.div>
      </aside>
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
