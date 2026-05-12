import { useEffect, useState } from 'react';

const formatDate = () => {
  const d = new Date();
  const month = d.toLocaleString('en-US', { month: 'short' });
  return { month, year: d.getFullYear() };
};

const Topbar = () => {
  const [{ month, year }] = useState(formatDate);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`topbar reveal ${revealed ? 'in' : ''}`}
      style={{
        display: 'grid',
        alignItems: 'center',
        gap: 24,
        padding: '28px 0 22px',
        borderBottom: '1px solid var(--rule)',
        gridTemplateColumns: 'var(--gutter) 1fr auto',
        fontFamily: 'var(--f-mono)',
        fontSize: '11px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--pencil)',
      }}
    >
      <div style={{ color: 'var(--ink)', fontWeight: 500 }}>
        Vol. <b style={{ color: 'var(--vermilion)', fontWeight: 500 }}>04</b>
        &nbsp;·&nbsp; Iss. <b style={{ color: 'var(--vermilion)', fontWeight: 500 }}>26</b>
      </div>
      <div className="topbar-meta" style={{ display: 'flex', gap: 28 }}>
        <span><b style={{ color: 'var(--ink)', fontWeight: 500 }}>Bangalore</b> · IST</span>
        <span><b style={{ color: 'var(--ink)', fontWeight: 500 }}>{month}</b> {year}</span>
        <span>Personal Edition</span>
      </div>
      <div className="topbar-cmdk">
        <span>Press ⌘K to navigate</span>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .topbar { grid-template-columns: 1fr !important; gap: 8px !important; }
          .topbar-meta { flex-wrap: wrap; gap: 18px !important; }
          .topbar-cmdk { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Topbar;
