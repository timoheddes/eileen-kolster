import { useEffect, useRef, useState } from 'react';
import { type TimelineItemType } from './Timeline';
import useTimelineScroll from './useTimelineScroll';

export const TimelineItem = ({
  item,
  id,
}: {
  item: TimelineItemType;
  id: string;
}) => {
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
    <div id={id} key={item.title} ref={elementRef}>
      {item.body}
    </div>
  );
};
