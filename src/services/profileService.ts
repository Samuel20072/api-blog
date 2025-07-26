import { db } from '@/lib/db';

export async function getUserById(id: number) {
  const [rows]: any = await db.query('SELECT id, name, email FROM users WHERE id = ?', [id]);
  return rows[0];
}
