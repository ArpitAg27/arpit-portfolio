import { useEffect, useMemo, useRef, useState } from 'react';
import { personalInfo } from '../../data/personal';

const sectionCommands = [
  { id: 'home', label: 'Masthead', sub: '01 — top of the page', kind: 'section' },
  { id: 'about', label: 'About', sub: '02 — bio & principles', kind: 'section' },
  { id: 'skills', label: 'Skills', sub: '03 — technical inventory', kind: 'section' },
  { id: 'experience', label: 'Experience', sub: '04 — employment history', kind: 'section' },
  { id: 'projects', label: 'Projects', sub: '05 — selected work', kind: 'section' },
  { id: 'education', label: 'Education', sub: '06 — formal training', kind: 'section' },
  { id: 'contact', label: 'Contact', sub: '07 — say hello', kind: 'section' },
];

const linkCommands = [
  { id: 'email', label: 'Email Arpit', sub: personalInfo.email, kind: 'link', href: `mailto:${personalInfo.email}` },
  { id: 'github', label: 'GitHub', sub: personalInfo.social.github, kind: 'link', href: personalInfo.social.github },
  { id: 'linkedin', label: 'LinkedIn', sub: personalInfo.social.linkedin, kind: 'link', href: personalInfo.social.linkedin },
];

const allCommands = [...sectionCommands, ...linkCommands];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery('');
        setIdx(0);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCommands;
    return allCommands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.sub.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
    );
  }, [query]);

  const safeIdx = filtered.length === 0 ? 0 : Math.min(idx, filtered.length - 1);

  const run = (cmd) => {
    setOpen(false);
    if (cmd.kind === 'section') {
      const el = document.getElementById(cmd.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (cmd.kind === 'link') {
      window.open(cmd.href, '_blank', 'noopener,noreferrer');
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIdx((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIdx((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = filtered[safeIdx];
      if (cmd) run(cmd);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(26, 22, 18, 0.45)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '14vh',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(560px, 92vw)',
          background: 'var(--paper)',
          border: '1px solid var(--rule)',
          boxShadow: '0 30px 80px rgba(26,22,18,0.28)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 16px',
            borderBottom: '1px solid var(--rule)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--f-mono)',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--vermilion)',
            }}
          >
            ⌘K
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIdx(0); }}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section, or press enter…"
            spellCheck={false}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'var(--f-body)',
              fontSize: 17,
              color: 'var(--ink)',
              caretColor: 'var(--vermilion)',
            }}
            aria-label="command palette input"
          />
        </div>

        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            maxHeight: 340,
            overflowY: 'auto',
          }}
        >
          {filtered.length === 0 && (
            <li
              style={{
                padding: '18px 16px',
                fontFamily: 'var(--f-mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--pencil)',
              }}
            >
              No matches. Try `about`, `projects`, `email`
            </li>
          )}
          {filtered.map((c, i) => {
            const active = i === safeIdx;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => run(c)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    display: 'grid',
                    gridTemplateColumns: '20px 1fr auto',
                    alignItems: 'center',
                    gap: 14,
                    padding: '12px 16px',
                    border: 'none',
                    borderTop: i === 0 ? 'none' : '1px solid var(--rule-soft)',
                    background: active ? 'var(--paper-2)' : 'transparent',
                    cursor: 'pointer',
                    color: 'var(--ink)',
                    fontFamily: 'var(--f-body)',
                    fontSize: 16,
                  }}
                >
                  <span
                    style={{
                      color: active ? 'var(--vermilion)' : 'var(--pencil)',
                      fontFamily: 'var(--f-mono)',
                      fontSize: 12,
                    }}
                  >
                    {c.kind === 'section' ? '§' : '↗'}
                  </span>
                  <span>
                    <div>{c.label}</div>
                    <div
                      style={{
                        fontFamily: 'var(--f-mono)',
                        fontSize: 10.5,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--pencil)',
                        marginTop: 2,
                      }}
                    >
                      {c.sub}
                    </div>
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: 10.5,
                      letterSpacing: '0.16em',
                      color: active ? 'var(--vermilion)' : 'var(--pencil-soft)',
                    }}
                  >
                    {active ? '↵' : ''}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 16px',
            borderTop: '1px solid var(--rule)',
            fontFamily: 'var(--f-mono)',
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--pencil)',
          }}
        >
          <span>↑↓ navigate · ↵ select · esc close</span>
          <span>{filtered.length} of {allCommands.length}</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
