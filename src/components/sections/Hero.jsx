import { useEffect, useRef, useState } from 'react';
import { personalInfo } from '../../data/personal';
import { projects } from '../../data/projects';
import { experiences } from '../../data/experience';
import { skillCategories } from '../../data/skills';

const FIRST = 'Arpit';
const LAST = 'Agarwal';

const useTypedReveal = () => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let mounted = true;
    let i = 0;
    let j = 0;
    const tickFirst = () => {
      if (!mounted) return;
      if (i <= FIRST.length) {
        setFirst(FIRST.slice(0, i++));
        setTimeout(tickFirst, 70 + Math.random() * 40);
      } else {
        setTimeout(tickSecond, 220);
      }
    };
    const tickSecond = () => {
      if (!mounted) return;
      if (j <= LAST.length) {
        setLast(LAST.slice(0, j++));
        setTimeout(tickSecond, 70 + Math.random() * 40);
      } else {
        setTimeout(() => mounted && setDone(true), 80);
      }
    };
    setTimeout(tickFirst, 280);
    return () => { mounted = false; };
  }, []);

  return { first, last, done };
};

const useStaggeredReveal = (start) => {
  useEffect(() => {
    if (!start) return;
    const els = document.querySelectorAll('.masthead .reveal');
    els.forEach((el) => {
      const d = parseInt(el.dataset.d || '0', 10);
      setTimeout(() => el.classList.add('in'), d);
    });
  }, [start]);
};

const HELP_LINES = [
  'available commands:',
  '  whoami     — about me',
  '  skills     — technical inventory',
  '  tools      — editor, agents, MCPs I use day-to-day',
  '  ls work    — current and past roles',
  '  ls proj    — selected projects',
  '  cat bio    — long-form bio',
  '  contact    — how to reach me',
  '  clear      — clear the screen',
  '  help       — this list',
];

const initialLines = [
  { kind: 'sys', text: '# welcome. this is a real shell, try one of these:' },
  { kind: 'suggest', items: ['whoami', 'skills', 'ls proj', 'tools', 'cat bio', 'contact'] },
];

const PLACEHOLDERS = [
  'type `help` and press enter…',
  'try `whoami` to see who I am…',
  '`ls proj` to list my projects…',
  '`cat bio` for the long version…',
];

const runCommand = (raw) => {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return [];
  if (cmd === 'help') return HELP_LINES;
  if (cmd === 'whoami') return [
    `${personalInfo.name} — ${personalInfo.role}`,
    `based in ${personalInfo.location}`,
    'mostly backend, sometimes frontend, always curious',
  ];
  if (cmd === 'skills' || cmd === 'ls skills') {
    const pad = (s) => s.padEnd(14);
    return skillCategories.map(
      (c) => `${pad(c.title.toLowerCase())}: ${c.skills.map((s) => s.name).join(' · ')}`
    );
  }
  if (cmd === 'ls work' || cmd === 'work' || cmd === 'experience') {
    return experiences.map((e) => `${e.duration.padEnd(20)} ${e.role} @ ${e.company}`);
  }
  if (cmd === 'ls proj' || cmd === 'ls projects' || cmd === 'projects') {
    return projects.map((p, i) => `${String(i + 1).padStart(2, '0')}. ${p.title}  (${p.category})`);
  }
  if (cmd === 'cat bio' || cmd === 'bio') {
    return personalInfo.bio.split('. ').filter(Boolean).map((s) => s.trim() + (s.endsWith('.') ? '' : '.'));
  }
  if (cmd === 'contact') return [
    `email    : ${personalInfo.email}`,
    `github   : ${personalInfo.social.github}`,
    `linkedin : ${personalInfo.social.linkedin}`,
  ];
  if (cmd === 'stack' || cmd === 'cat tools' || cmd === 'tools' || cmd === 'mcps') return [
    'editor    : vim, cursor, vscode + claude code',
    'agents    : claude sonnet, claude opus, gpt — whichever fits the job',
    'mcps      : gitlab, atlassian, grafana, slack, metabase',
    'notes     : notion, obsidian',
  ];
  if (cmd === 'clear') return '__clear__';
  if (cmd === 'sudo make me a sandwich') return ['nice try.'];
  if (cmd === 'date') return [new Date().toString()];
  if (cmd === 'echo') return [''];
  if (cmd.startsWith('echo ')) return [raw.slice(5)];
  return [`zsh: command not found: ${cmd}  —  try \`help\``];
};

const Terminal = () => {
  const [lines, setLines] = useState(initialLines);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [hi, setHi] = useState(-1);
  const [touched, setTouched] = useState(false);
  const [phIdx, setPhIdx] = useState(0);
  const [shown, setShown] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (touched) return;
    const id = setInterval(() => setPhIdx((i) => (i + 1) % PLACEHOLDERS.length), 2600);
    return () => clearInterval(id);
  }, [touched]);

  const runEntry = (entry) => {
    const result = runCommand(entry);
    if (result === '__clear__') {
      setLines([]);
    } else {
      setLines((prev) => {
        const cleaned = touched ? prev : prev.filter((l) => l.kind !== 'suggest' && l.kind !== 'sys');
        return [
          ...cleaned,
          { kind: 'cmd', text: entry },
          ...result.map((t) => ({ kind: 'out', text: t })),
        ];
      });
    }
    if (entry.trim()) {
      setHistory((h) => [...h, entry]);
    }
    setHi(-1);
    setValue('');
    setTouched(true);
  };

  const submit = (e) => {
    e.preventDefault();
    runEntry(value);
  };

  const runSuggestion = (s) => {
    inputRef.current?.focus();
    runEntry(s);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const next = hi === -1 ? history.length - 1 : Math.max(0, hi - 1);
      setHi(next);
      setValue(history[next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hi === -1) return;
      const next = hi + 1;
      if (next >= history.length) {
        setHi(-1);
        setValue('');
      } else {
        setHi(next);
        setValue(history[next]);
      }
    }
  };

  return (
    <div
      className={`terminal ${touched ? 'touched' : 'untouched'}`}
      style={{
        marginTop: 40,
        border: '1px solid var(--rule)',
        background: 'var(--paper-2)',
        position: 'relative',
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(8px)',
        transition: 'opacity 0.7s cubic-bezier(.2,.7,.2,1), transform 0.7s cubic-bezier(.2,.7,.2,1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          borderBottom: '1px solid var(--rule)',
          fontFamily: 'var(--f-mono)',
          fontSize: 10.5,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--pencil)',
        }}
      >
        <span>~/portfolio · zsh · <span style={{ color: 'var(--ink)' }}>interactive</span></span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: 'var(--vermilion)' }}>●</span>
          <span style={{ color: 'var(--pencil-soft)' }}>●</span>
          <span style={{ color: 'var(--pencil-soft)' }}>●</span>
        </span>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        style={{
          padding: '18px 18px 14px',
          fontFamily: 'var(--f-mono)',
          fontSize: 13.5,
          lineHeight: 1.7,
          color: 'var(--ink)',
          height: 240,
          overflowY: 'auto',
          cursor: 'text',
        }}
      >
        {lines.map((l, i) => {
          if (l.kind === 'cmd') {
            return (
              <div key={i}>
                <span style={{ color: 'var(--vermilion)' }}>arpit@portfolio</span>
                <span style={{ color: 'var(--pencil)' }}>:</span>
                <span style={{ color: 'var(--ink-soft)' }}>~</span>
                <span style={{ color: 'var(--pencil)' }}>$ </span>
                {l.text}
              </div>
            );
          }
          if (l.kind === 'sys') {
            return <div key={i} style={{ color: 'var(--pencil)' }}>{l.text}</div>;
          }
          if (l.kind === 'suggest') {
            return (
              <div key={i} style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '6px 0 10px' }}>
                {l.items.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="sugg"
                    onClick={(e) => { e.stopPropagation(); runSuggestion(s); }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            );
          }
          return <div key={i} style={{ color: 'var(--ink-soft)', whiteSpace: 'pre-wrap' }}>{l.text}</div>;
        })}

        <form onSubmit={submit} style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
          <span style={{ color: 'var(--vermilion)' }}>arpit@portfolio</span>
          <span style={{ color: 'var(--pencil)' }}>:</span>
          <span style={{ color: 'var(--ink-soft)' }}>~</span>
          <span style={{ color: 'var(--pencil)', marginRight: 6 }}>$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            placeholder={touched ? "type `help` for list of commands" : PLACEHOLDERS[phIdx]}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              color: 'var(--ink)',
              caretColor: 'var(--vermilion)',
            }}
            aria-label="terminal input"
          />
        </form>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
          padding: '8px 14px',
          borderTop: '1px solid var(--rule)',
          fontFamily: 'var(--f-mono)',
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--pencil)',
          flexWrap: 'wrap',
        }}
      >
        <span>
          type <b style={{ color: 'var(--vermilion)', fontWeight: 500 }}>help</b> for commands
          <span style={{ color: 'var(--pencil-soft)', margin: '0 8px' }}>·</span>
          <b style={{ color: 'var(--ink)', fontWeight: 500 }}>↑↓</b> history
          <span style={{ color: 'var(--pencil-soft)', margin: '0 8px' }}>·</span>
          <b style={{ color: 'var(--ink)', fontWeight: 500 }}>clear</b> to reset
        </span>
        <span className="hint-cmdk">⌘K to navigate</span>
      </div>

      <style>{`
        .terminal::after {
          content: "";
          position: absolute;
          inset: -1px;
          pointer-events: none;
          border: 1px solid var(--vermilion);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .terminal.untouched::after {
          opacity: 0.55;
          animation: termPulse 2.2s ease-in-out infinite;
        }
        @keyframes termPulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.7; }
        }
        .sugg {
          appearance: none;
          background: transparent;
          border: 1px solid var(--rule);
          color: var(--ink);
          font-family: var(--f-mono);
          font-size: 12px;
          padding: 4px 10px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .sugg::before { content: "$ "; color: var(--vermilion); }
        .sugg:hover {
          background: var(--vermilion);
          color: var(--paper);
          border-color: var(--vermilion);
        }
        .sugg:hover::before { color: var(--paper); }
        .terminal input::placeholder {
          color: var(--pencil);
          font-style: italic;
          opacity: 1;
        }
        @media (max-width: 600px) {
          .hint-cmdk { display: none; }
        }
      `}</style>
    </div>
  );
};

const Hero = () => {
  const { first, last, done } = useTypedReveal();
  useStaggeredReveal(done);

  return (
    <header
      id="home"
      className="masthead"
      style={{
        padding: '48px 0 64px',
        borderBottom: '1px solid var(--rule)',
        display: 'grid',
        gridTemplateColumns: 'var(--gutter) 1fr',
        columnGap: 24,
        position: 'relative',
      }}
    >
      <div
        className="marker reveal"
        data-d="80"
        style={{ paddingTop: 12 }}
      >
        <span className="num">01</span>
        Masthead
      </div>

      <div>
        <div
          className="reveal"
          data-d="120"
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--pencil)',
            display: 'flex',
            gap: 18,
            alignItems: 'center',
            margin: '0 0 36px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              background: 'var(--vermilion)',
              borderRadius: '50%',
              boxShadow: '0 0 0 4px rgba(200, 58, 42, 0.14)',
            }}
          />
          <span style={{ color: 'var(--ink)' }}>Open to thoughtful conversations</span>
          <span>·</span>
          <span>Bangalore, India</span>
        </div>

        <div style={{ position: 'relative', padding: '4px 0 8px' }}>
          <h1
            style={{
              fontFamily: 'var(--f-display)',
              fontVariationSettings: '"opsz" 144, "SOFT" 0',
              fontWeight: 360,
              fontSize: 'clamp(4.2rem, 12.5vw, 12rem)',
              lineHeight: 0.86,
              letterSpacing: '-0.035em',
              margin: 0,
              color: 'var(--ink)',
            }}
          >
            <span style={{ display: 'inline-block' }}>{first}</span>
            <br />
            <span
              style={{
                display: 'inline-block',
                fontStyle: 'italic',
                fontVariationSettings: '"opsz" 144, "SOFT" 50',
                fontWeight: 320,
              }}
            >
              {last}
            </span>
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: '0.08em',
                height: '0.78em',
                background: 'var(--vermilion)',
                marginLeft: '0.12em',
                verticalAlign: '-0.07em',
                animation: 'caretBlink 1.05s steps(1, end) infinite',
              }}
            />
          </h1>
        </div>

        <div
          className="reveal standfirst"
          data-d="900"
          style={{
            marginTop: 36,
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(220px, 280px)',
            gap: 56,
            alignItems: 'end',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--f-body)',
              fontSize: 'clamp(1.05rem, 1.45vw, 1.3rem)',
              fontWeight: 380,
              lineHeight: 1.45,
              color: 'var(--ink-soft)',
              maxWidth: '52ch',
              margin: 0,
            }}
          >
            I build <em style={{ fontStyle: 'italic', color: 'var(--vermilion)', fontWeight: 420 }}>resilient backends and the tooling around them</em>. Services that survive bad networks, retry the right things, and stay quiet on weekends. Lately, mostly LLM agents and MCP tooling, with frontends and small ML experiments filling the rest.
          </p>
          <div
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: 10.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--pencil)',
              lineHeight: 1.9,
              borderTop: '1px solid var(--rule)',
              paddingTop: 14,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Role</span><b style={{ color: 'var(--ink)', fontWeight: 500 }}>Software Engineer</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Company</span><b style={{ color: 'var(--ink)', fontWeight: 500 }}>Skit.ai</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Stack</span><b style={{ color: 'var(--ink)', fontWeight: 500 }}>Python · Django · React</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tools</span><b style={{ color: 'var(--ink)', fontWeight: 500 }}>Claude Code · MCP</b></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Since</span><b style={{ color: 'var(--ink)', fontWeight: 500 }}>2025</b></div>
          </div>
        </div>

        <Terminal />
      </div>

      <style>{`
        @keyframes caretBlink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
        @media (max-width: 820px) {
          .masthead { grid-template-columns: 1fr !important; }
          .standfirst { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </header>
  );
};

export default Hero;
