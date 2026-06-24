'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CentrePortal() {
  const [students, setStudents] = useState<any[]>([]);
  const [centreName, setCentreName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName') || '';
    setCentreName(name);

    async function load() {
      const { data } = await supabase.from('users').select('*').eq('role', 'student');
      setStudents(data || []);
    }
    load();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ width: 220, background: '#0F1F3D', padding: '16px 10px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '0 6px 16px', borderBottom: '0.5px solid rgba(255,255,255,.08)', marginBottom: 14 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏢</div>
          <div className="fd" style={{ fontWeight: 700, color: '#fff', fontSize: 14 }}>Markaz Portali</div>
        </div>
        <div style={{ padding: '8px 9px', borderRadius: 8, background: 'rgba(59,130,246,.2)', color: '#60A5FA', fontWeight: 600, fontSize: 13 }}>
          👥 O&apos;quvchilar
        </div>
      </aside>

      <div style={{ flex: 1, padding: 24 }}>
        <div className="fd" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
          Xush kelibsiz, {centreName}! 🏢
        </div>
        <div style={{ color: 'var(--muted)', marginBottom: 20 }}>
          Markazingizdagi barcha o&apos;quvchilar:
        </div>

        <div className="g3" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-lbl">Jami o&apos;quvchilar</div>
            <div className="stat-val">{students.length}</div>
          </div>
        </div>

        <div className="card" style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr><th>Ism</th><th>Email</th><th>Ro&apos;yxatdan o&apos;tgan</th></tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.full_name}</td>
                  <td>{s.email}</td>
                  <td>{new Date(s.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}