import fs from 'fs';
import path from 'path';
import { User, Project, Task } from './types';
import { mockUsers, mockProjects, mockTasks } from './mock-data';

const dataFilePath = path.join(process.cwd(), 'data.json');

export interface Database {
  users: User[];
  projects: Project[];
  tasks: Task[];
}

// Initialize db with mock data if it doesn't exist
function initDb(): Database {
  if (!fs.existsSync(dataFilePath)) {
    const initialData: Database = {
      users: mockUsers,
      projects: mockProjects,
      tasks: mockTasks,
    };
    fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
}

export function getDb(): Database {
  try {
    return initDb();
  } catch (error) {
    console.error('Failed to read db', error);
    return { users: [], projects: [], tasks: [] };
  }
}

export function saveDb(data: Database) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Failed to write db', error);
  }
}
