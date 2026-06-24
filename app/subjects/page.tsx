'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Subjects() {
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('subjects').select('*');
      setSubjects(data || []);
    }
    load();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ width: 210, background: 'var(--surf)', borderRight: '0.5px solid var(--brd)', padding: '16px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '0 6px 16px', borderBottom: '0.5px solid var(--brd)', marginBottom: 14 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,var(--g),var(--gd))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎓</div>
          <div className="fd" style={{ fontWeight: 700, color: 'var(--gd)', fontSize: 14 }}>Milliy Prep</div>
        </div>
        <a href="/dashboard" style={{ display: 'block', padding: '8px 9px', borderRadius: 8, color: 'var(--muted)', fontWeight: 500, fontSize: 13, marginBottom: 2 }}>⊞ Dashboard</a>
        <a href="/subjects" style={{ display: 'block', padding: '8px 9px', borderRadius: 8, background: 'var(--gl)', color: 'var(--gd)', fontWeight: 600, fontSize: 13, textDecoration: 'none', marginBottom: 2 }}>📚 Fanlar</a>
        <a href="/pricing" style={{ display: 'block', padding: '8px 9px', borderRadius: 8, color: 'var(--muted)', fontWeight: 500, fontSize: 13, textDecoration: 'none' }}>💳 Obuna rejalari</a>
      </aside>

      <div style={{ flex: 1, padding: 24 }}>
        <div className="fd" style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>Barcha fanlar</div>

        <div className="g3">
          {subjects.map((s) => (
            <a key={s.id} href={`/quiz?subject=${s.id}`} className="card card-h" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
              <div className="fd" style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.total_topics} mavzu</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}