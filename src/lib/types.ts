export type Role = 'Admin' | 'Member';

export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Project {
  id: string;
  _id?: string;
  title: string;
  description: string;
  ownerId: string | User;
  createdAt: string;
  members: ProjectMember[];
}

export interface ProjectMember {
  userId: string | User;
  role: Role;
}

export interface Task {
  id: string;
  _id?: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: string | User; // userId or populated User
  dueDate: string;
  createdAt: string;
}