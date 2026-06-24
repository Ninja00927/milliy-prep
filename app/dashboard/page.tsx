'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [results, setResults] = useState<any[]>([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName') || '';
    const email = localStorage.getItem('userEmail') || '';
    setUserName(name);

    async function load() {
      const { data } = await supabase
        .from('quiz_results')
        .select('*, subjects(name, icon)')
        .eq('user_email', email)
        .order('created_at', { ascending: false });
      setResults(data || []);
    }
    if (email) load();
  }, []);

  const avgScore = results.length
    ? Math.round(results.reduce((sum, r) => sum + r.score_pct, 0) / results.length)
    : 0;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ width: 210, background: 'var(--surf)', borderRight: '0.5px solid var(--brd)', padding: '16px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '0 6px 16px', borderBottom: '0.5px solid var(--brd)', marginBottom: 14 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,var(--g),var(--gd))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎓</div>
          <div className="fd" style={{ fontWeight: 700, color: 'var(--gd)', fontSize: 14 }}>Milliy Prep</div>
        </div>
        <a href="/dashboard" style={{ display: 'block', padding: '8px 9px', borderRadius: 8, background: 'var(--gl)', color: 'var(--gd)', fontWeight: 600, fontSize: 13, textDecoration: 'none', marginBottom: 2 }}>⊞ Dashboard</a>
        <a href="/subjects" style={{ display: 'block', padding: '8px 9px', borderRadius: 8, color: 'var(--muted)', fontWeight: 500, fontSize: 13, textDecoration: 'none', marginBottom: 2 }}>📚 Fanlar</a>
        <a href="/pricing" style={{ display: 'block', padding: '8px 9px', borderRadius: 8, color: 'var(--muted)', fontWeight: 500, fontSize: 13, textDecoration: 'none' }}>💳 Obuna rejalari</a>
      </aside>
      <div style={{ flex: 1, padding: 24 }}>
        <div className="fd" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
          Xush kelibsiz, {userName || 'Foydalanuvchi'}! 👋
        </div>
        <div style={{ color: 'var(--muted)', marginBottom: 20 }}>
          Sizning haqiqiy natijalaringiz:
        </div>

        <div className="g3" style={{ marginBottom: 24 }}>
          <div className="stat-card">
            <div className="stat-lbl">O&apos;rtacha ball</div>
            <div className="stat-val" style={{ color: avgScore >= 70 ? 'var(--g)' : 'var(--a)' }}>{avgScore}%</div>
          </div>
          <div className="stat-card">
            <div className="stat-lbl">Ishlangan testlar</div>
            <div className="stat-val">{results.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-lbl">90%+ natijalar</div>
            <div className="stat-val" style={{ color: 'var(--g)' }}>
              {results.filter((r) => r.score_pct >= 90).length}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="fd" style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>So&apos;nggi testlar</div>
          {results.length === 0 && (
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>
              Hali test ishlamadingiz. <a href="/subjects" style={{ color: 'var(--g)', fontWeight: 600 }}>Fanlar bo&apos;limiga o&apos;ting →</a>
            </div>
          )}
          {results.map((r) => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '0.5px solid var(--brd)' }}>
              <div style={{ fontSize: 20 }}>{r.subjects?.icon || '📘'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{r.subjects?.name || 'Fan'}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{r.correct} / {r.total} to&apos;g&apos;ri</div>
              </div>
              <div className="fd" style={{ fontWeight: 700, color: r.score_pct >= 90 ? 'var(--g)' : r.score_pct >= 70 ? 'var(--a)' : 'var(--r)' }}>
                {r.score_pct}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}