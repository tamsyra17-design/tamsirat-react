export default function TrustBar({ t }) {
  const items = [
    ['fas fa-truck-fast', t.tr1h, t.tr1p],
    ['fas fa-gem', t.tr2h, t.tr2p],
    ['fab fa-whatsapp', t.tr3h, t.tr3p],
    ['fas fa-rotate-left', t.tr4h, t.tr4p],
  ];

  return (
    <div className="trust-bar reveal vis">
      {items.map(([icon, title, body]) => (
        <div className="trust-item" key={title}>
          <div className="trust-icon"><i className={icon} /></div>
          <div><h5>{title}</h5><p>{body}</p></div>
        </div>
      ))}
    </div>
  );
}
