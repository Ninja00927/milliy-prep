'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('users').select('*');
      setStudents(data || []);
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
        <div style={{ padding: '8px 9px', borderRadius: 8, background: 'var(--gl)', color: 'var(--gd)', fontWeight: 600, fontSize: 13 }}>
          ⊞ Dashboard
        </div>
      </aside>

      <div style={{ flex: 1, padding: 24 }}>
        <div className="fd" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
          Xush kelibsiz! 👋
        </div>
        <div style={{ color: 'var(--muted)', marginBottom: 24 }}>
          Ro&apos;yxatdan o&apos;tgan barcha o&apos;quvchilar:
        </div>

        <div className="g3">
          {students.map((s) => (
            <div key={s.id} className="card">
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--g)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: 10 }}>
                {s.full_name?.[0] || '?'}
              </div>
              <div className="fd" style={{ fontWeight: 600, fontSize: 14 }}>{s.full_name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.email}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}