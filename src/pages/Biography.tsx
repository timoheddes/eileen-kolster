import Timeline from '../components/Timeline/Timeline';
import { bio } from '../data/bio';
import seo from '../data/seo.json';

const Biography = () => {
  return (
    <>
      <title>{seo.pages['/about'].title}</title>
      <meta name="description" content={seo.pages['/about'].description} />
      <Timeline data={bio} />
    </>
  );
};

export default Biography;
