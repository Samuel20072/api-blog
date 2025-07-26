import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function updateUserService(
  userId: number,
  fieldsToUpdate: string[],
  values: any[],
  password?: string
) {
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    fieldsToUpdate.push('password = ?');
    values.push(hashedPassword);
  }

  values.push(userId); // para el WHERE

  const sql = `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;
  await db.query(sql, values);
}
