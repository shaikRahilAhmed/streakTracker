import fs from 'fs';
import path from 'path';

// Use /tmp directory on Vercel which is writable
const DATA_DIR = process.env.VERCEL ? '/tmp/data' : path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

function ensureUsersFile() {
  // create data directory if it doesn't exist
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  // create users file if it doesn't exist
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
  }
}

export function getUsers(): User[] {
  ensureUsersFile();
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  const parsed = JSON.parse(data);
  return parsed.users || [];
}

export function getUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find(user => user.email === email);
}

export function getUserById(id: string): User | undefined {
  const users = getUsers();
  return users.find(user => user.id === id);
}

export function createUser(email: string, name: string, hashedPassword: string): User {
  ensureUsersFile();
  const users = getUsers();
  
  // create new user object
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  // save to file
  fs.writeFileSync(USERS_FILE, JSON.stringify({ users }, null, 2));
  
  return newUser;
}
