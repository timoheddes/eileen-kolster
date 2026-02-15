import Timeline from '../components/Timeline/Timeline';
import { bio } from '../data/bio';

const Biography = () => {
  return (
    <>
      <title>Eileen Kolster - My Journey</title>
      <meta
        name="description"
        content="Born in South London in 1986, Eileen is a British/Dutch composer whose musical journey began at the age of five when she started to learn the violin with the Suzuki method."
      />
      <Timeline data={bio} />
    </>
  );
};

export default Biography;
