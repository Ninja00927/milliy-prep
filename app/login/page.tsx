'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState('login');

  // login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    const { error } = await supabase.from('users').insert({
      full_name: regName,
      email: regEmail,
      password: regPassword,
    });

    if (error) {
      setMessage('Xatolik: ' + error.message);
    } else {
      setMessage('Muvaffaqiyatli ro\'yxatdan o\'tdingiz! Endi kirish tabiga o\'ting.');
      setRegName('');
      setRegEmail('');
      setRegPassword('');
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', loginEmail)
      .eq('password', loginPassword)
      .single();

    if (error || !data) {
      setMessage('Email yoki parol noto\'g\'ri');
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#0B4D35,#0D3A6A 55%,#1A1140)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div className="auth-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26, justifyContent: 'center' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: 'linear-gradient(135deg,var(--g),var(--gd))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
            }}
          >
            🎓
          </div>
          <div>
            <div className="fd" style={{ fontSize: 20, fontWeight: 800, color: 'var(--gd)' }}>
              Milliy Prep
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Milliy Sertifikat Platformasi</div>
          </div>
        </div>

        <div className="auth-tabs">
          <div className={'auth-tab' + (tab === 'login' ? ' active' : '')} onClick={() => { setTab('login'); setMessage(''); }}>
            Kirish
          </div>
          <div className={'auth-tab' + (tab === 'register' ? ' active' : '')} onClick={() => { setTab('register'); setMessage(''); }}>
            Ro&apos;yxatdan o&apos;tish
          </div>
        </div>

        {message && (
          <div style={{ padding: '10px 14px', borderRadius: 8, background: 'var(--al)', color: 'var(--ad)', fontSize: 13, marginBottom: 14 }}>
            {message}
          </div>
        )}

        {tab === 'login' && (
          <form onSubmit={handleLogin}>
            <div className="fg">
              <label className="lbl">Email</label>
              <input className="input" type="email" placeholder="email@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            </div>
            <div className="fg">
              <label className="lbl">Parol</label>
              <input className="input" type="password" placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-p btn-full btn-lg">Kirish →</button>
          </form>
        )}

        {tab === 'register' && (
          <form onSubmit={handleRegister}>
            <div className="fg">
              <label className="lbl">Ism Familiya</label>
              <input className="input" placeholder="Aziz Sobirov" value={regName} onChange={(e) => setRegName(e.target.value)} required />
            </div>
            <div className="fg">
              <label className="lbl">Email</label>
              <input className="input" type="email" placeholder="email@example.com" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
            </div>
            <div className="fg">
              <label className="lbl">Parol</label>
              <input className="input" type="password" placeholder="Kamida 6 belgi" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-p btn-full btn-lg">Ro&apos;yxatdan o&apos;tish →</button>
          </form>
        )}
      </div>
    </div>
  );
}