const toRoman = (n) => {
  const map = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let out = '';
  for (const [v, s] of map) {
    while (n >= v) { out += s; n -= v; }
  }
  return out;
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        display: 'grid',
        gridTemplateColumns: 'var(--gutter) 1fr',
        columnGap: 24,
        paddingTop: 56,
        marginTop: 32,
        borderTop: '1px solid var(--rule)',
        fontFamily: 'var(--f-mono)',
        fontSize: 10.5,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--pencil)',
      }}
    >
      <div />
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span>© {toRoman(year)} · Arpit Agarwal · Hand-set in Bangalore</span>
        <span>
          <b style={{ color: 'var(--ink)', fontWeight: 500 }}>End of issue.</b>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
