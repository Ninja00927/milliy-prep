export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <div className="card" style={{ maxWidth: 400, margin: '0 auto' }}>
        <div className="fd" style={{ fontSize: 24, fontWeight: 700, color: 'var(--gd)' }}>
          🎓 Milliy Prep
        </div>
        <p style={{ color: 'var(--muted)', marginTop: 8 }}>
          Agar bu chiroyli ko&apos;rinsa — CSS ishlayapti!
        </p>
        <button className="btn btn-p btn-full" style={{ marginTop: 16 }}>
          Test tugma
        </button>
      </div>
    </div>
  );
}