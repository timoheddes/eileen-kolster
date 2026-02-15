import Timeline from '../components/Timeline/Timeline';
import { work } from '../data/work';

const Work = () => {
  return (
    <>
      <title>Eileen Kolster - My Work</title>
      <meta
        name="description"
        content="View Eileen Kolster's work as a media composer."
      />
      <Timeline data={work} />
    </>
  );
};

export default Work;
