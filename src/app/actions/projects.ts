'use server';

import { getDb, saveDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import type { Role } from '@/lib/types';

export async function getProjects() {
  const db = getDb();
  return JSON.parse(JSON.stringify(db.projects.map(p => ({
    ...p,
    _id: p.id,
    members: (p.members || []).map(m => {
      const user = db.users.find(u => u.id === m.userId);
      return {
        ...m,
        userId: user || { id: m.userId, name: 'Unknown User', avatarUrl: '' }
      };
    })
  }))));
}

export async function getProjectById(id: string) {
  const db = getDb();
  const project = db.projects.find(p => p.id === id);
  if (!project) return null;
  return JSON.parse(JSON.stringify({
    ...project,
    _id: project.id,
    members: (project.members || []).map(m => {
      const user = db.users.find(u => u.id === m.userId);
      return {
        ...m,
        userId: user || { id: m.userId, name: 'Unknown User', avatarUrl: '' }
      };
    })
  }));
}

export async function createProject(data: any) {
  const db = getDb();
  const newProject = {
    id: `p${Date.now()}`,
    title: data.title || 'New Project',
    description: data.description || 'Description',
    ownerId: 'u1',
    createdAt: new Date().toISOString(),
    members: [{ userId: 'u1', role: 'Admin' as Role }]
  };
  
  db.projects.push(newProject);
  saveDb(db);
  revalidatePath('/', 'layout');
  return JSON.parse(JSON.stringify({ ...newProject, _id: newProject.id }));
}
