'use server';

import { getDb, saveDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import type { TaskStatus } from '@/lib/types';

export async function getTasksByProjectId(projectId: string) {
  const db = getDb();
  const tasks = db.tasks.filter(t => t.projectId === projectId).map(t => {
    const user = db.users.find(u => u.id === t.assignedTo);
    return {
      ...t,
      _id: t.id,
      assignedTo: user || { id: t.assignedTo, name: 'Unknown User', avatarUrl: '' }
    };
  });
  return JSON.parse(JSON.stringify(tasks));
}

export async function updateTaskStatus(taskId: string, status: TaskStatus, projectId: string) {
  const db = getDb();
  const task = db.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = status;
    saveDb(db);
    revalidatePath('/', 'layout');
  }
}

export async function createTask(data: any) {
  const db = getDb();
  const newTask = {
    id: `t${Date.now()}`,
    projectId: data.projectId || 'p1',
    title: data.title || 'New Task',
    description: data.description || 'Description',
    status: 'To Do' as TaskStatus,
    assignedTo: data.assignedTo || 'u1',
    dueDate: data.dueDate || new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
  
  db.tasks.push(newTask);
  saveDb(db);
  revalidatePath('/', 'layout');
  return JSON.parse(JSON.stringify({ ...newTask, _id: newTask.id }));
}
