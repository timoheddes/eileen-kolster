import seo from '../data/seo.json';
import WorkLayout from '../components/WorkLayout/WorkLayout';
import Button from '../components/Button/Button';
import { MessageSquareShareIcon } from '../assets/icons/MessageSquareShare';
import ImageCollage from '../components/ImageCollage/ImageCollage';

import studio from '../assets/images/photos/studio.webp';
import eileen_theatre from '../assets/images/photos/eileen-theatre.webp';

const Work = () => {
  return (
    <>
      <title>{seo.pages['/work'].title}</title>
      <meta name="description" content={seo.pages['/work'].description} />
      <WorkLayout>
        <section id="work">
          <h2>My work</h2>
          <p className="font-size-1-2">
            Each project here comes with the story behind the music: what the
            film needed, the sounds I chose to answer it, and the scenes I
            scored.
          </p>
          <ImageCollage
            rotate
            magnetic
            zoom
            imageSize={315}
            images={[
              {
                file: studio,
                zIndex: 40,
                description: 'Eileen in the studio',
              },
              {
                file: eileen_theatre,
                zIndex: 20,
                description: 'Eileen at the theatre',
              },
            ]}
          />
          <p>
            Some are commissions, some are independent rescores of existing
            films and documentaries, and some are for study or non-profit
            projects. Every project says which one it is.
          </p>
          <p>Pick a project from the list to see how it was made.</p>
          <div className="font-size-1-5 flex gap-1 mt-1 mobile-ml-1">
            <Button href="/contact" icon={<MessageSquareShareIcon size={20} />}>
              Get in touch
            </Button>
          </div>
        </section>
      </WorkLayout>
    </>
  );
};

export default Work;
