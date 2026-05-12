import { experiences } from '../../data/experience';

const Experience = () => {
  return (
    <section id="experience" className="editorial-section">
      <div className="marker reveal" data-d="0">
        <span className="num">04</span>
        Experience
      </div>
      <div className="section-body">
        <h2 className="section-title reveal" data-d="80">Where I work.</h2>
        <div className="section-sub reveal" data-d="160">Current role, and what I spend my days on.</div>

        {experiences.map((exp, i) => (
          <div key={exp.id} className={`exp-row reveal ${i === 0 ? 'first' : ''}`} data-d={240 + i * 80}>
            <div className="exp-meta">
              <span className="when">{exp.duration}</span>
              <span className="loc">{exp.location}</span>
              {exp.tech && (
                <span className="stack">{exp.tech.join(' · ')}</span>
              )}
            </div>
            <div className="exp-body">
              <h3>
                {exp.role} <span className="at">@ {exp.company}</span>
              </h3>
              <div className="role-sub">{exp.type}</div>
              <ul>
                {exp.description.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .exp-row {
          display: grid;
          grid-template-columns: 200px minmax(0, 1fr);
          gap: 48px;
          padding: 28px 0;
          border-top: 1px solid var(--rule);
        }
        .exp-row.first { border-top: none; padding-top: 4px; }
        .exp-meta {
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--pencil);
          line-height: 1.85;
        }
        .exp-meta .when { color: var(--ink); display: block; margin-bottom: 6px; }
        .exp-meta .loc { display: block; }
        .exp-meta .stack { display: block; margin-top: 14px; color: var(--pencil); }

        .exp-body h3 {
          font-family: var(--f-display);
          font-variation-settings: "opsz" 48, "SOFT" 30;
          font-weight: 360;
          font-size: 1.85rem;
          line-height: 1.1;
          margin: 0 0 4px;
          letter-spacing: -0.012em;
        }
        .exp-body h3 .at {
          color: var(--vermilion);
          font-style: italic;
          font-weight: 320;
        }
        .exp-body .role-sub {
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--pencil);
          margin-bottom: 18px;
        }
        .exp-body ul { list-style: none; padding: 0; margin: 0; }
        .exp-body li {
          position: relative;
          padding-left: 26px;
          margin-bottom: 10px;
          font-size: 1rem;
          line-height: 1.55;
          color: var(--ink-soft);
        }
        .exp-body li::before {
          content: "—";
          position: absolute;
          left: 0; top: 0;
          color: var(--vermilion);
          font-family: var(--f-mono);
        }
        @media (max-width: 820px) {
          .exp-row { grid-template-columns: 1fr; gap: 14px; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
