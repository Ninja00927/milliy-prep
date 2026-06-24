import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Email yoki parol noto\'g\'ri' }, { status: 401 });
  }

  const match = await bcrypt.compare(password, data.password);

  if (!match) {
    return NextResponse.json({ error: 'Email yoki parol noto\'g\'ri' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    fullName: data.full_name,
    email: data.email,
    role: data.role || 'student',
  });
}