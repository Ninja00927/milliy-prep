'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '../lib/supabase';

function QuizContent() {
  const params = useSearchParams();
  const subjectId = params.get('subject');

  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('questions').select('*').eq('subject_id', subjectId);
      setQuestions(data || []);
    }
    if (subjectId) load();
  }, [subjectId]);

  useEffect(() => {
    if (done && !saved && questions.length > 0) {
      setSaved(true);
      const pct = Math.round((score / questions.length) * 100);
      const email = localStorage.getItem('userEmail') || 'guest';
      supabase.from('quiz_results').insert({
        user_email: email,
        subject_id: subjectId,
        score_pct: pct,
        correct: score,
        total: questions.length,
      }).then(({ error }) => {
        if (error) console.log('Save error:', error.message);
      });
    }
  }, [done, saved, questions, score, subjectId]);

  if (questions.length === 0) {
    return <div style={{ padding: 40 }}>Yuklanmoqda yoki savollar topilmadi...</div>;
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const pass = pct >= 90;
    return (
      <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
        <div className="card" style={{ maxWidth: 400, textAlign: 'center', padding: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>{pass ? '🎉' : '📚'}</div>
          <div className="fd" style={{ fontSize: 40, fontWeight: 800, color: pass ? 'var(--g)' : 'var(--a)' }}>{pct}%</div>
          <div style={{ color: 'var(--muted)', marginBottom: 16 }}>{score} / {questions.length} to&apos;g&apos;ri</div>
          <div style={{ padding: 14, borderRadius: 10, background: pass ? 'var(--gl)' : 'var(--al)', fontSize: 13, textAlign: 'left' }}>
            {pass
              ? "🎉 Ajoyib! 90% dan yuqori ball — mavzu o'zlashtirildi!"
              : "⚠️ Ball 90% dan past. Qo'shimcha mashq tavsiya etiladi."}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const options = [
    { key: 'A', text: q.option_a },
    { key: 'B', text: q.option_b },
    { key: 'C', text: q.option_c },
    { key: 'D', text: q.option_d },
  ];

  function pick(key: string) {
    if (selected) return;
    setSelected(key);
    if (key === q.correct_option) setScore((s) => s + 1);
  }

  function next() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  }

  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>
            Savol {current + 1} / {questions.length}
          </div>
        </div>
        <div className="card" style={{ marginBottom: 14 }}>
          <div className="fd" style={{ fontSize: 17, fontWeight: 600, marginBottom: 18 }}>{q.question_text}</div>
          {options.map((o) => {
            let bg = 'var(--bg)', border = 'var(--brd)', color = 'var(--ink)';
            if (selected) {
              if (o.key === q.correct_option) { bg = 'var(--gl)'; border = 'var(--g)'; color = 'var(--gd)'; }
              else if (o.key === selected) { bg = 'var(--rl)'; border = 'var(--r)'; color = 'var(--r)'; }
            }
            return (
              <button key={o.key} onClick={() => pick(o.key)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 8, border: `1.5px solid ${border}`, background: bg, color, width: '100%', marginBottom: 8, textAlign: 'left', cursor: 'pointer' }}>
                <span style={{ width: 26, height: 26, borderRadius: 6, border: '1px solid var(--brd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, background: 'var(--surf)' }}>{o.key}</span>
                {o.text}
              </button>
            );
          })}
          {selected && (
            <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: 'var(--bl)', fontSize: 13 }}>
              💡 {q.explanation}
            </div>
          )}
        </div>
        <button className="btn btn-p btn-full" onClick={next} disabled={!selected}>
          {current === questions.length - 1 ? "Natijani ko'rish →" : 'Keyingi savol →'}
        </button>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Yuklanmoqda...</div>}>
      <QuizContent />
    </Suspense>
  );
}