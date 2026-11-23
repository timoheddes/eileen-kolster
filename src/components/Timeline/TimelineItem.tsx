import { memo } from 'react';
import { type TimelineItemType } from './Timeline';

interface TimelineItemProps {
  item: TimelineItemType;
  id: string;
}

export const TimelineItem = memo(function TimelineItem({
  item,
  id,
}: TimelineItemProps) {
  return (
    <div id={id} className="timeline-item">
      {item.body}
    </div>
  );
});
