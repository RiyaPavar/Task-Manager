'use server';

import { getDb, saveDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createUser(data: any) {
  const db = getDb();
  
  // Extract a name from the email
  const email = data.email || 'new@member.com';
  let name = email.split('@')[0];
  name = name.charAt(0).toUpperCase() + name.slice(1).replace(/[^a-zA-Z0-9]/g, ' ');

  const newUser = {
    id: `u${Date.now()}`,
    name,
    email,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
  };
  
  db.users.push(newUser);
  saveDb(db);
  revalidatePath('/', 'layout');
  return JSON.parse(JSON.stringify({ ...newUser, _id: newUser.id }));
}
