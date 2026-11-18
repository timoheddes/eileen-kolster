import WorkLayout from '../components/WorkLayout/WorkLayout';
import Button from '../components/Button/Button';
import { MessageSquareShareIcon } from '../assets/icons/MessageSquareShare';

const Work = () => {
  return (
    <>
      <title>Work | Eileen Kolster</title>
      <meta
        name="description"
        content="Film and documentary scores by Eileen Kolster, a composer based in Amsterdam: the brief, the sound choices and the scored scenes."
      />
      <WorkLayout>
        <section id="work">
          <h2>My work</h2>
          <p className="font-size-1-2">
            Each project here comes with the story behind the music: what the
            film needed, the sounds I chose to answer it, and the scenes I
            scored.
          </p>
          <p>
            Some are commissions, some are independent rescores of existing
            films and documentaries, and some are for study or non-profit
            projects. Every project says which one it is.
          </p>
          <p>Pick a project from the list to see how it was made.</p>
          <div className="font-size-1-5 flex gap-1 mt-1">
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
