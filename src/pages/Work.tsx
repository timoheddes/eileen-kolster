import seo from '../data/seo.json';
import Button from '../components/Button/Button';
import { MessageSquareShareIcon } from '../assets/icons/MessageSquareShare';
import ImageCollage from '../components/ImageCollage/ImageCollage';

import eileen_sofa_violin from '../assets/images/photos/eileen-sofa-violin.webp';
import eileen_violin_scroll from '../assets/images/photos/eileen-violin-scroll.webp';

const Work = () => {
  return (
    <>
      <title>{seo.pages['/work'].title}</title>
      <meta name="description" content={seo.pages['/work'].description} />
      <section id="work">
        <h2>My work</h2>
        <p className="font-size-1-2">
          Each project here comes with the story behind the music: what the film
          needed, the sounds I chose to answer it, and the scenes I scored.
        </p>
        <ImageCollage
          rotate
          magnetic
          zoom
          imageSize={315}
          images={[
            {
              file: eileen_sofa_violin,
              zIndex: 40,
              description: 'Eileen on a sofa holding her violin',
            },
            {
              file: eileen_violin_scroll,
              zIndex: 20,
              description: 'Eileen looking past the scroll of her violin',
            },
          ]}
        />
        <p>
          Some are commissions, some are independent rescores of existing films
          and documentaries, and some are for study or non-profit projects.
          Every project says which one it is.
        </p>
        <p>Pick a project from the list to see how it was made.</p>
        <div className="font-size-1-5 flex gap-1 mt-1">
          <Button href="/contact" icon={<MessageSquareShareIcon size={20} />}>
            Get in touch
          </Button>
        </div>
      </section>
    </>
  );
};

export default Work;
