import { personalInfo } from '../../data/personal';

const About = () => {
  return (
    <section id="about" className="editorial-section" data-screen-label="02 About">
      <div className="marker reveal" data-d="0">
        <span className="num">02</span>
        About
      </div>
      <div className="section-body">
        <h2 className="section-title reveal" data-d="80">A note from the engineer.</h2>
        <div className="section-sub reveal" data-d="160">Filed under — bio, principles, currently</div>

        <div className="about-grid">
          <blockquote className="pullquote reveal" data-d="240">
            I like the kind of code that <em>survives a 3 a.m. page</em>. Small, observable, embarrassingly boring on the inside, useful on the outside.
            <cite className="attr">A working philosophy</cite>
          </blockquote>

          <div className="bio-body reveal" data-d="320">
            <p>
              Based in <b>{personalInfo.location}</b>. I started writing code in school, started writing it for money in college, and somewhere along the way decided that the most interesting problems are the ones nobody notices when you solve them. A retry that swallows a transient failure. An alert that wakes the right person. A migration that goes out on a Tuesday and is forgotten by Thursday.
            </p>
            <p>
              Day-to-day I live on the backend, with regular detours into React when the interface needs care. I keep a notebook of failed ideas, read more papers than I'll admit, and believe most of what gets called "AI" is still a question of good API design. Lately I've been building Claude agents and MCP tooling for the kind of engineering chores my team didn't want to do.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
          gap: 64px;
          align-items: start;
        }
        .pullquote {
          font-family: var(--f-display);
          font-variation-settings: "opsz" 36, "SOFT" 30;
          font-weight: 320;
          font-size: clamp(1.6rem, 2.4vw, 2.15rem);
          line-height: 1.22;
          letter-spacing: -0.012em;
          color: var(--ink);
          margin: 0;
          position: relative;
        }
        .pullquote::before {
          content: "“";
          position: absolute;
          left: -0.5em;
          top: -0.25em;
          font-size: 2.4em;
          line-height: 1;
          color: var(--vermilion);
          font-style: italic;
          font-weight: 300;
        }
        .pullquote em {
          font-style: italic;
          font-variation-settings: "opsz" 36, "SOFT" 60;
        }
        .pullquote .attr {
          display: block;
          margin-top: 28px;
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--pencil);
          font-style: normal;
        }
        .pullquote .attr::before { content: "— "; }

        .bio-body p {
          font-size: 1.02rem;
          line-height: 1.65;
          color: var(--ink-soft);
          margin: 0 0 1em;
        }
        .bio-body p:first-child::first-letter {
          font-family: var(--f-display);
          font-variation-settings: "opsz" 144;
          font-weight: 380;
          font-size: 4.2em;
          float: left;
          line-height: 0.85;
          margin: 0.06em 0.08em -0.05em 0;
          color: var(--ink);
        }
        .bio-body p a {
          color: var(--ink);
          text-decoration: none;
          background-image: linear-gradient(var(--vermilion), var(--vermilion));
          background-size: 100% 1px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          padding-bottom: 1px;
          transition: background-size 0.4s ease, color 0.3s ease;
        }
        .bio-body p a:hover { color: var(--vermilion); }

        @media (max-width: 820px) {
          .about-grid { grid-template-columns: 1fr; gap: 32px; }
          .pullquote::before { left: -0.1em; }
          .bio-body p:first-child::first-letter { font-size: 3.4em; }
        }
      `}</style>
    </section>
  );
};

export default About;
