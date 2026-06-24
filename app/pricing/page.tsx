export default function Pricing() {
  const plans = [
    { name: '1 Oylik', price: '99 000', unit: "so'm/oy", features: ['Barcha fanlar & testlar', 'Video darslar (SD)', 'Adaptive o\'rganish'] },
    { name: '3 Oylik', price: '249 000', unit: "so'm/3 oy", features: ['Barcha fanlar & testlar', 'Video darslar (HD)', 'Olimpiada bo\'limi'] },
    { name: '6 Oylik', price: '399 000', unit: "so'm/6 oy", popular: true, features: ['Barcha fanlar & testlar', 'Video darslar (HD)', 'Olimpiada bo\'limi', 'AI murabbiyi (beta)'] },
    { name: '1 Yillik', price: '649 000', unit: "so'm/yil", features: ['Barcha fanlar & testlar', 'Video darslar (4K)', 'Olimpiada bo\'limi', "AI murabbiyi (to'liq)"] },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ width: 210, background: 'var(--surf)', borderRight: '0.5px solid var(--brd)', padding: '16px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '0 6px 16px', borderBottom: '0.5px solid var(--brd)', marginBottom: 14 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,var(--g),var(--gd))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎓</div>
          <div className="fd" style={{ fontWeight: 700, color: 'var(--gd)', fontSize: 14 }}>Milliy Prep</div>
        </div>
        <a href="/dashboard" style={{ display: 'block', padding: '8px 9px', borderRadius: 8, color: 'var(--muted)', fontWeight: 500, fontSize: 13, textDecoration: 'none', marginBottom: 2 }}>⊞ Dashboard</a>
        <a href="/subjects" style={{ display: 'block', padding: '8px 9px', borderRadius: 8, color: 'var(--muted)', fontWeight: 500, fontSize: 13, textDecoration: 'none', marginBottom: 2 }}>📚 Fanlar</a>
        <a href="/pricing" style={{ display: 'block', padding: '8px 9px', borderRadius: 8, background: 'var(--gl)', color: 'var(--gd)', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>💳 Obuna rejalari</a>
      </aside>

      <div style={{ flex: 1, padding: 24 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div className="fd" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Obuna rejalari</div>
          <div style={{ color: 'var(--muted)' }}>Milliy Sertifikat va Olimpiadaga tayyorlanish uchun</div>
        </div>

        <div className="g4">
          {plans.map((p) => (
            <div key={p.name} className="card" style={{ textAlign: 'center', border: p.popular ? '2px solid var(--p)' : undefined, position: 'relative' }}>
              {p.popular && (
                <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: 'var(--p)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 11px', borderRadius: 20 }}>
                  ⭐ Eng mashhur
                </div>
              )}
              <div className="fd" style={{ fontSize: 15, fontWeight: 700, marginTop: 8 }}>{p.name}</div>
              <div className="fd" style={{ fontSize: 22, fontWeight: 700, color: p.popular ? 'var(--p)' : 'var(--ink)', margin: '8px 0 2px' }}>{p.price}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>{p.unit}</div>
              <div style={{ textAlign: 'left', fontSize: 12, marginBottom: 14 }}>
                {p.features.map((f) => (
                  <div key={f} style={{ display: 'flex', gap: 6, padding: '3px 0' }}>
                    <span style={{ color: 'var(--g)' }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <button className={p.popular ? 'btn btn-pur btn-full' : 'btn btn-sec btn-full'}>
                Boshlash
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}