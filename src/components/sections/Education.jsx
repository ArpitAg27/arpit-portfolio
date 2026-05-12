import { education, achievementsAndCerts } from '../../data/experience';

const Education = () => {
  return (
    <section id="education" className="editorial-section">
      <div className="marker reveal" data-d="0">
        <span className="num">06</span>
        Education
      </div>
      <div className="section-body">
        <h2 className="section-title reveal" data-d="80">Where I studied.</h2>
        <div className="section-sub reveal" data-d="160">And a few things picked up along the way.</div>

        {education.map((e) => (
          <div key={e.id} className="edu reveal" data-d="240">
            <div className="meta">
              <b>{e.duration}</b>
              <span>{e.location}</span>
            </div>
            <div>
              <h3>{e.institution}</h3>
              <div className="deg">
                <b>{e.degree.split(' in ')[0] || 'Degree'}</b>
                {e.degree.includes(' in ') && <> · {e.degree.split(' in ').slice(1).join(' in ')}</>}
              </div>
              <p>{e.description}</p>
            </div>
            <div className="meta right">
              <b>Honours</b>
              {(e.achievements || []).map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </div>
        ))}

        {achievementsAndCerts && achievementsAndCerts.length > 0 && (
          <div className="cert-block reveal" data-d="320">
            <h4>Achievements &amp; Certifications</h4>
            <ul>
              {achievementsAndCerts.map((c) => (
                <li key={c.id}>
                  <span className="title">{c.title}</span>
                  <span className="issuer">{c.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style>{`
        .edu {
          display: grid;
          grid-template-columns: 200px minmax(0, 1fr) auto;
          gap: 48px;
          padding: 8px 0 4px;
        }
        .edu h3 {
          font-family: var(--f-display);
          font-variation-settings: "opsz" 48, "SOFT" 25;
          font-weight: 360;
          font-size: 1.7rem;
          margin: -4px 0 4px;
          letter-spacing: -0.01em;
        }
        .edu .deg {
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--pencil);
          margin-bottom: 14px;
        }
        .edu .deg b { color: var(--ink); font-weight: 500; }
        .edu p {
          font-size: 1rem;
          color: var(--ink-soft);
          margin: 0;
          max-width: 58ch;
        }
        .edu .meta {
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--pencil);
          line-height: 1.85;
        }
        .edu .meta.right { text-align: right; }
        .edu .meta b { color: var(--ink); font-weight: 500; display: block; }
        .edu .meta span { display: block; }

        .cert-block {
          margin-top: 56px;
          border-top: 1px solid var(--rule);
          padding-top: 28px;
        }
        .cert-block h4 {
          font-family: var(--f-mono);
          font-size: 10.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--pencil);
          margin: 0 0 18px;
          font-weight: 500;
        }
        .cert-block ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .cert-block li {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 24px;
          padding: 14px 0;
          border-top: 1px solid var(--rule-soft);
        }
        .cert-block li:first-child { border-top: none; }
        .cert-block li .title {
          font-family: var(--f-display);
          font-variation-settings: "opsz" 36, "SOFT" 25;
          font-size: 1.15rem;
          font-weight: 360;
          color: var(--ink);
        }
        .cert-block li .issuer {
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--pencil);
          align-self: center;
        }

        @media (max-width: 820px) {
          .edu { grid-template-columns: 1fr; gap: 14px; }
          .edu .meta.right { text-align: left; }
          .cert-block li { grid-template-columns: 1fr; gap: 4px; }
        }
      `}</style>
    </section>
  );
};

export default Education;
