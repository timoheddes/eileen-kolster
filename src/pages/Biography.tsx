import Timeline from '../components/Timeline/Timeline';
import { timeline } from '../data/bio';

const Biography = () => {
  return (
    <>
      <Timeline data={timeline} />
    </>
  );
};

export default Biography;
