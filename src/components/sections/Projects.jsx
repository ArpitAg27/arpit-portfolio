import { useMemo, useState } from 'react';
import { projects, categories } from '../../data/projects';

const Projects = () => {
  const [active, setActive] = useState('All');

  const counts = useMemo(() => {
    const map = { All: projects.length };
    for (const c of categories.filter((x) => x !== 'All')) {
      map[c] = projects.filter((p) => p.category === c).length;
    }
    return map;
  }, []);

  const visible = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="projects" className="editorial-section">
      <div className="marker reveal" data-d="0">
        <span className="num">05</span>
        Projects
      </div>
      <div className="section-body">
        <h2 className="section-title reveal" data-d="80">Selected work, mostly side.</h2>
        <div className="section-sub reveal" data-d="160">
          {projects.length} entries. Filter by category.
        </div>

        <div className="filter-bar reveal" data-d="240">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={active === c ? 'active' : ''}
              onClick={() => setActive(c)}
            >
              {c} <span className="ct">{String(counts[c] || 0).padStart(2, '0')}</span>
            </button>
          ))}
        </div>

        <div>
          {visible.map((p, i) => (
            <article key={p.id} className={`project ${i === 0 ? 'first' : ''}`}>
              <div className="num">
                <span>No.</span>
                <b>{String(p.id).padStart(2, '0')}</b>
                <span className="cat">— {p.category}</span>
              </div>
              <div className="proj-body">
                <h3>
                  {p.demo || p.github ? (
                    <a href={p.demo || p.github} target="_blank" rel="noopener noreferrer">
                      {p.title}
                    </a>
                  ) : (
                    <span>{p.title}</span>
                  )}
                </h3>
                {p.subtitle && <div className="sub">{p.subtitle}</div>}
                <p>{p.description}</p>
                <div className="stack">
                  {p.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="right">
                {p.featured && <span className="yr">Featured</span>}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer">
                    github
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer">
                    demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .filter-bar {
          display: flex;
          gap: 0;
          margin-bottom: 28px;
          border-top: 1px solid var(--rule);
          border-bottom: 1px solid var(--rule);
          flex-wrap: wrap;
        }
        .filter-bar button {
          appearance: none; background: none; border: none;
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--pencil);
          padding: 14px 18px 14px 0;
          margin-right: 14px;
          cursor: pointer;
          position: relative;
          transition: color 0.25s ease;
        }
        .filter-bar button:hover { color: var(--ink); }
        .filter-bar button .ct {
          font-size: 9px;
          color: var(--pencil-soft);
          margin-left: 6px;
          vertical-align: super;
        }
        .filter-bar button.active { color: var(--vermilion); }
        .filter-bar button.active::after {
          content: "";
          position: absolute;
          bottom: -1px; left: 0; right: 14px;
          height: 2px; background: var(--vermilion);
        }

        .project {
          display: grid;
          grid-template-columns: 200px minmax(0, 1fr) auto;
          gap: 48px;
          padding: 30px 0;
          border-top: 1px solid var(--rule);
          align-items: start;
        }
        .project.first { border-top: none; }
        .project .num {
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--pencil);
          text-transform: uppercase;
        }
        .project .num b { color: var(--ink); font-weight: 500; display: block; margin-top: 4px; }
        .project .num .cat { display: inline-block; margin-top: 14px; color: var(--vermilion); }

        .project h3 {
          font-family: var(--f-display);
          font-variation-settings: "opsz" 60, "SOFT" 25;
          font-weight: 360;
          font-size: 2rem;
          line-height: 1.05;
          letter-spacing: -0.014em;
          margin: -4px 0 8px;
        }
        .project h3 a {
          color: var(--ink);
          text-decoration: none;
          background-image: linear-gradient(var(--ink), var(--ink));
          background-repeat: no-repeat;
          background-size: 0% 1px;
          background-position: 0 95%;
          transition: background-size 0.45s cubic-bezier(.2,.7,.2,1), color 0.3s ease;
          padding-bottom: 2px;
        }
        .project h3 a:hover {
          background-size: 100% 1px;
          color: var(--vermilion);
          background-image: linear-gradient(var(--vermilion), var(--vermilion));
        }
        .project .sub {
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--pencil);
          margin: 0 0 12px;
        }
        .project p {
          font-size: 1rem;
          color: var(--ink-soft);
          line-height: 1.6;
          margin: 0 0 12px;
          max-width: 58ch;
        }
        .project .stack {
          font-family: var(--f-mono);
          font-size: 10.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--pencil);
        }
        .project .stack span + span::before {
          content: " · ";
          color: var(--pencil-soft);
        }
        .project .right {
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--pencil);
          text-align: right;
          line-height: 1.8;
          white-space: nowrap;
        }
        .project .right .yr { color: var(--vermilion); display: block; }
        .project .right a {
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1px solid var(--rule);
          padding-bottom: 1px;
          margin-left: 14px;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .project .right a:hover { color: var(--vermilion); border-color: var(--vermilion); }
        .project .right a::after { content: " ↗"; color: var(--vermilion); }
        @media (max-width: 820px) {
          .project { grid-template-columns: 1fr; gap: 14px; }
          .project .right { text-align: left; }
          .project .right a { margin-left: 0; margin-right: 14px; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
