'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Simple demo auth
  if (email && password) {
    const cookieStore = await cookies();
    cookieStore.set('session', JSON.stringify({ email, role: 'Admin', name: 'Alex Rivera' }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    redirect('/dashboard');
  }
  
  return { error: 'Invalid credentials' };
}

export async function signup(formData: FormData) {
  // Similar to login for demo
  return login(formData);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  return session ? JSON.parse(session.value) : null;
}
