'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminPortal() {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [centres, setCentres] = useState<any[]>([]);
  const [quizResults, setQuizResults] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data: users } = await supabase.from('users').select('*');
      const { data: centresData } = await supabase.from('centres').select('*');
      const { data: results } = await supabase.from('quiz_results').select('*');
      setAllUsers(users || []);
      setCentres(centresData || []);
      setQuizResults(results || []);
    }
    load();
  }, []);

  const students = allUsers.filter((u) => u.role === 'student' || !u.role);
  const centreAdmins = allUsers.filter((u) => u.role === 'centre_admin');
  const avgScore = quizResults.length
    ? Math.round(quizResults.reduce((s, r) => s + r.score_pct, 0) / quizResults.length)
    : 0;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ width: 220, background: '#18181A', padding: '16px 10px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '0 6px 16px', borderBottom: '0.5px solid rgba(255,255,255,.07)', marginBottom: 14 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#8B5CF6,#6D28D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🛡️</div>
          <div className="fd" style={{ fontWeight: 700, color: '#fff', fontSize: 14 }}>Super Admin</div>
        </div>
        <div style={{ padding: '8px 9px', borderRadius: 8, background: 'rgba(139,92,246,.2)', color: '#A78BFA', fontWeight: 600, fontSize: 13 }}>
          📊 Dashboard
        </div>
      </aside>

      <div style={{ flex: 1, padding: 24 }}>
        <div className="fd" style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
          Platform boshqaruvi 🛡️
        </div>

        <div className="g4" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-lbl">Jami o&apos;quvchilar</div>
            <div className="stat-val">{students.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-lbl">O&apos;quv markazlar</div>
            <div className="stat-val" style={{ color: 'var(--b)' }}>{centres.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-lbl">Jami testlar</div>
            <div className="stat-val">{quizResults.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-lbl">O&apos;rtacha ball</div>
            <div className="stat-val" style={{ color: 'var(--g)' }}>{avgScore}%</div>
          </div>
        </div>

        <div className="g2">
          <div className="card">
            <div className="fd" style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>O&apos;quv markazlar</div>
            {centres.map((c) => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid var(--brd)' }}>
                <span style={{ fontSize: 13 }}>{c.name}</span>
                <span className="badge bg-b">{c.access_code}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="fd" style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Barcha foydalanuvchilar</div>
            {allUsers.map((u) => (
              <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid var(--brd)' }}>
                <span style={{ fontSize: 13 }}>{u.full_name}</span>
                <span className="badge bg-gray">{u.role || 'student'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}