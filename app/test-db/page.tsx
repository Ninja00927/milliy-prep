import { supabase } from '../lib/supabase';

export default async function TestDb() {
  const { data, error } = await supabase.from('students').select('*');

  return (
    <div style={{ padding: 40 }}>
      <h1 className="fd" style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
        Database test
      </h1>

      {error && <p style={{ color: 'red' }}>Xatolik: {error.message}</p>}

      {data && data.length === 0 && <p>Hech narsa topilmadi.</p>}

      {data && data.map((student) => (
        <div key={student.id} className="card" style={{ maxWidth: 300, marginBottom: 10 }}>
          {student.full_name}
        </div>
      ))}
    </div>
  );
}