import { useParams } from 'wouter';
import { getProject } from '../data/projects';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import Button from '../components/Button/Button';
import { MessageSquareShareIcon } from '../assets/icons/MessageSquareShare';
import NotFound from './NotFound';

import './work.css';

const videoStyle = { width: '100%', maxWidth: '700px' };
const imageStyle = { ...videoStyle, marginTop: 'var(--space-md)' };

const Project = () => {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <NotFound />;

  return (
    <>
      <title>{`${project.title} | Eileen Kolster`}</title>
      <meta name="description" content={project.summary} />
      <meta property="og:title" content={`${project.title} | Eileen Kolster`} />
      <meta property="og:description" content={project.summary} />
      <article id="project">
        <h2>{project.title}</h2>
        <small>{project.byline}</small>
        <dl className="project-facts">
          <div>
            <dt>Type</dt>
            <dd>{project.kind}</dd>
          </div>
          <div>
            <dt>Context</dt>
            <dd>{project.context}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>{project.role.join(', ')}</dd>
          </div>
        </dl>
        {project.intro.map((t) => (
          <p key={t}>{t}</p>
        ))}
        {project.approach && <h3>My approach</h3>}
        {project.approach?.map((t) => (
          <p key={t}>{t}</p>
        ))}
        {project.image && (
          <figure
            className="image-border overlay"
            style={{
              ...imageStyle,
              maxWidth: project.image.maxWidth ?? imageStyle.maxWidth,
            }}
          >
            <img src={project.image.src} alt={project.image.alt} />
          </figure>
        )}
        {project.scenes.map((scene) => (
          <section key={scene.title} className="project-scene">
            <h3>Scene: {scene.title}</h3>
            <p>
              <strong>Goal:</strong> {scene.goal}
            </p>
            {scene.approach.map((t) => (
              <p key={t}>{t}</p>
            ))}
            {scene.video && (
              <VideoPlayer
                src={scene.video.src}
                posterTime={scene.video.posterTime}
                startAt={scene.video.startAt}
                style={videoStyle}
              />
            )}
          </section>
        ))}
        {project.testimonial && (
          <figure className="project-testimonial">
            <blockquote>
              <p>&ldquo;{project.testimonial.quote}&rdquo;</p>
            </blockquote>
            <figcaption>
              <strong>{project.testimonial.author}</strong>,{' '}
              {project.testimonial.role.toLowerCase()}
            </figcaption>
          </figure>
        )}
        <div className="font-size-1-5 flex gap-1 mt-1">
          <Button href="/contact" icon={<MessageSquareShareIcon size={20} />}>
            Working on something similar?
          </Button>
        </div>
      </article>
    </>
  );
};

export default Project;
