// services/CommentService.ts
import { db } from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

export class CommentService {
  static async create(commentData: { content: string; articleId: number; userId: number }) {
    const { content, articleId, userId } = commentData;
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO comments (content, article_id, user_id) VALUES (?, ?, ?)`,
      [content, articleId, userId]
    );
    return { id: result.insertId, ...commentData };
  }

  static async getByArticleId(articleId: number) {
    const [rows] = await db.execute(
      `SELECT c.id, c.content, c.created_at, u.nombre AS author 
       FROM comments c
       JOIN users u ON u.id = c.user_id
       WHERE c.article_id = ? ORDER BY c.created_at DESC`,
      [articleId]
    );
    return rows;
  }

  static async delete(id: number) {
    const [result] = await db.execute<ResultSetHeader>(
      `DELETE FROM comments WHERE id = ?`, [id]
    );
    return result.affectedRows > 0;
  }
}
