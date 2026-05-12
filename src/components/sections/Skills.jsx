import { skillCategories } from '../../data/skills';

const Skills = () => {
  return (
    <section id="skills" className="editorial-section">
      <div className="marker reveal" data-d="0">
        <span className="num">03</span>
        Skills
      </div>
      <div className="section-body">
        <h2 className="section-title reveal" data-d="80">An incomplete inventory.</h2>
        <div className="section-sub reveal" data-d="160">Listed in rough order of fluency.</div>

        <div className="skills-grid">
          {skillCategories.map((cat, idx) => (
            <div
              key={cat.id}
              className={`skill-group reveal ${idx < 2 ? 'first-row' : ''}`}
              data-d={240 + idx * 60}
            >
              <h3>
                {cat.title}
                <span className="ct">{String(cat.skills.length).padStart(2, '0')}</span>
              </h3>
              <div className="skill-list">
                {cat.skills.map((s) => (
                  <span key={s.name}>{s.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0 64px;
        }
        .skill-group {
          border-top: 1px solid var(--rule);
          padding: 22px 0 26px;
        }
        .skill-group.first-row { border-top: none; padding-top: 0; }
        .skill-group h3 {
          font-family: var(--f-mono);
          font-size: 10.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--pencil);
          margin: 0 0 14px;
          font-weight: 500;
          display: flex;
          justify-content: space-between;
        }
        .skill-group h3 .ct { color: var(--vermilion); }
        .skill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 18px;
          font-family: var(--f-display);
          font-variation-settings: "opsz" 30, "SOFT" 20;
          font-weight: 360;
          font-size: 1.15rem;
          line-height: 1.35;
          color: var(--ink);
        }
        .skill-list span {
          position: relative;
          cursor: default;
        }
        .skill-list span::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: -2px;
          height: 1px; background: var(--ink);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(.2,.7,.2,1);
        }
        .skill-list span:hover::after { transform: scaleX(1); }
        @media (max-width: 820px) {
          .skills-grid { grid-template-columns: 1fr; }
          .skill-group { border-top: 1px solid var(--rule); padding-top: 22px; }
          .skill-group.first-row:first-child { border-top: none; padding-top: 0; }
          .skill-group.first-row:nth-child(2) { border-top: 1px solid var(--rule); padding-top: 22px; }
        }
      `}</style>
    </section>
  );
};

export default Skills;
