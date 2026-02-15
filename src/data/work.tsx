import type { TimelineItemType } from '../components/Timeline/Timeline';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';

import iMomCooking from '../assets/video/iMomCooking-web.mp4';

export const work: TimelineItemType[] = [
  {
    title: 'iMom',
    dates: '',
    body: (
      <>
        <h2>iMom</h2>
        <VideoPlayer
          src={iMomCooking}
          posterTime={4}
          style={{
            width: '80%',
            maxWidth: '600px',
          }}
        />
      </>
    ),
  },
];