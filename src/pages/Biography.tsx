import Timeline from '../components/Timeline/Timeline';
import { timeline } from '../data/bio';
import { Helmet } from 'react-helmet';

const Biography = () => {
  return (
    <>
      <Helmet>
        <title>Eileen Kolster - My Journey</title>
        <meta
          name="description"
          content="Born in South London in 1986, Eileen is a British/Dutch composer whose musical journey began at the age of five when she started to learn the violin with the Suzuki method."
        />
      </Helmet>
      <Timeline data={timeline} />
    </>
  );
};

export default Biography;
