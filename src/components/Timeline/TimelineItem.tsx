import { useEffect, useRef, useState, memo } from 'react';
import { type TimelineItemType } from './Timeline';
import useTimelineScroll from './useTimelineScroll';

interface TimelineItemProps {
  item: TimelineItemType;
  id: string;
}

export const TimelineItem = memo(function TimelineItem({
  item,
  id,
}: TimelineItemProps) {
  const { updateSection } = useTimelineScroll();
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.95,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [elementRef, item.title]);

  useEffect(() => {
    updateSection({ title: item.title, visible: isVisible });
  }, [isVisible, item.title, updateSection]);

  return (
    <div
      id={id}
      className="timeline-item"
      key={item.title}
      ref={elementRef}
    >
      {item.body}
    </div>
  );
});
