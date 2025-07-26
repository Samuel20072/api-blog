import { db } from '@/lib/db';

export async function registerUser(name: string, email: string, hashedPassword: string) {
  return db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
}
