import { Link, useRoute } from 'wouter';
import { publishedProjects } from '../../data/projects';

import '../Timeline/Timeline.css';
import './WorkLayout.css';

/**
 * Shared layout for /work and /work/:slug: the same sticky side navigation as
 * the biography timeline, but each entry routes to a project page.
 */
const WorkLayout = ({ children }: { children: React.ReactNode }) => {
  const [, params] = useRoute('/work/:slug');
  const activeSlug = params?.slug;

  return (
    <div className="timeline work-layout">
      <nav className="timeline-column column-20" aria-label="Projects">
        <ul className="timeline-legend">
          <li>
            <Link
              href="/work"
              className={`timeline-nav-btn ${!activeSlug ? 'active' : ''}`}
              aria-current={!activeSlug ? 'page' : undefined}
            >
              <span>Overview</span>
            </Link>
          </li>
          {publishedProjects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className={`timeline-nav-btn ${activeSlug === p.slug ? 'active' : ''}`}
                aria-current={activeSlug === p.slug ? 'page' : undefined}
              >
                <span>{p.title}</span>
                <br />
                {p.context}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="timeline-column column-70">
        {/* The side nav is hidden on small screens, so offer the same links inline. */}
        <nav className="work-mobile-nav" aria-label="Projects">
          <Link href="/work" aria-current={!activeSlug ? 'page' : undefined}>
            Overview
          </Link>
          {publishedProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              aria-current={activeSlug === p.slug ? 'page' : undefined}
            >
              {p.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
};

export default WorkLayout;
