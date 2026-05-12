import { personalInfo } from '../../data/personal';

const links = [
  { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { label: 'GitHub', value: personalInfo.social.github.replace(/^https?:\/\//, ''), href: personalInfo.social.github },
  { label: 'LinkedIn', value: personalInfo.social.linkedin.replace(/^https?:\/\//, ''), href: personalInfo.social.linkedin },
];

const Contact = () => {
  return (
    <section id="contact" className="editorial-section">
      <div className="marker reveal" data-d="0">
        <span className="num">07</span>
        Contact
      </div>
      <div className="section-body">
        <h2 className="section-title reveal" data-d="80">Say hello.</h2>
        <div className="section-sub reveal" data-d="160">Best reached via email · slow on socials</div>

        <div className="contact">
          <p className="invitation reveal" data-d="240">
            If you're building <em>quiet, useful software</em> and would like a careful pair of hands, let's talk.
          </p>

          <div className="links reveal" data-d="320">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <span className="ar">→</span>
                <span className="label">{l.label}</span>
                <span className="val">{l.value}</span>
                <span className="arrow">↗</span>
              </a>
            ))}
            {personalInfo.resumeUrl && (
              <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                <span className="ar">→</span>
                <span className="label">Résumé</span>
                <span className="val">{personalInfo.resumeUrl.replace(/^\//, '')}</span>
                <span className="arrow">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          gap: 64px;
          align-items: end;
        }
        .invitation {
          font-family: var(--f-display);
          font-variation-settings: "opsz" 80, "SOFT" 35;
          font-weight: 320;
          font-size: clamp(2rem, 3.6vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.018em;
          color: var(--ink);
          margin: 0;
        }
        .invitation em {
          font-style: italic;
          color: var(--vermilion);
          font-variation-settings: "opsz" 80, "SOFT" 60;
        }
        .links {
          border-top: 1px solid var(--rule);
        }
        .links a {
          display: grid;
          grid-template-columns: 24px 90px 1fr auto;
          gap: 18px;
          align-items: center;
          padding: 18px 0;
          border-bottom: 1px solid var(--rule);
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink);
          text-decoration: none;
          position: relative;
          transition: color 0.25s ease, padding-left 0.35s cubic-bezier(.2,.7,.2,1);
        }
        .links a .ar { color: var(--vermilion); }
        .links a .label { color: var(--pencil); }
        .links a .val {
          font-family: var(--f-body);
          font-size: 1.05rem;
          text-transform: none;
          letter-spacing: 0;
          color: var(--ink);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .links a .arrow {
          color: var(--pencil);
          transition: transform 0.35s cubic-bezier(.2,.7,.2,1), color 0.25s;
        }
        .links a:hover { color: var(--vermilion); padding-left: 12px; }
        .links a:hover .arrow { transform: translateX(6px); color: var(--vermilion); }
        .links a:hover .val { color: var(--vermilion); }
        @media (max-width: 820px) {
          .contact { grid-template-columns: 1fr; gap: 32px; }
          .links a { grid-template-columns: 18px 80px 1fr auto; gap: 12px; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
