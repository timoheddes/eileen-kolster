import { Link } from 'wouter';
import { publishedProjects } from '../data/projects';

import './work.css';

const Work = () => {
  return (
    <>
      <title>Work | Eileen Kolster</title>
      <meta
        name="description"
        content="Film and documentary scores by Eileen Kolster, a composer based in Amsterdam: the brief, the sound choices and the scored scenes."
      />
      <section id="work">
        <h2>Work</h2>
        <p className="font-size-1-2 work-intro">
          Films and documentaries I have scored, with the thinking behind the
          music.
        </p>
        <ul className="project-list">
          {publishedProjects.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="project-card">
                <small className="project-card-meta">
                  {p.kind} · {p.context} · {p.status}
                </small>
                <h3 className="project-card-title">{p.title}</h3>
                <p>{p.summary}</p>
                <span className="project-card-more">See the project</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Work;
