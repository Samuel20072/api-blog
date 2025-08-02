import { db } from '@/lib/db';

interface CreateArticleDTO {
  title: string;
  content: string;
  imageUrl?: string;
  authorId: number;
}

// Crear artículo
export async function createArticleService({ title, content, imageUrl, authorId }: CreateArticleDTO) {
  const sql = `
    INSERT INTO articles (title, content, image_url, author_id)
    VALUES (?, ?, ?, ?)
  `;
  const values = [title, content, imageUrl || null, authorId];
  await db.query(sql, values);
}

// Obtener todos los artículos
export async function getAllArticlesService() {
  const sql = `
    SELECT 
      a.id, a.title, a.content, a.image_url as imageUrl, a.author_id as authorId,
      u.name as authorName
    FROM articles a
    JOIN users u ON u.id = a.author_id
    ORDER BY a.created_at DESC
  `;
  const [rows] = await db.query(sql);
  return rows;
}

// Actualizar artículo
export async function updateArticleService(id: number, data: Partial<CreateArticleDTO>) {
  const fields = [];
  const values = [];

  if (data.title) {
    fields.push('title = ?');
    values.push(data.title);
  }
  if (data.content) {
    fields.push('content = ?');
    values.push(data.content);
  }
  if (data.imageUrl !== undefined) {
    fields.push('image_url = ?');
    values.push(data.imageUrl || null);
  }

  values.push(id);

  const sql = `
    UPDATE articles
    SET ${fields.join(', ')}
    WHERE id = ?
  `;

  await db.query(sql, values);
}

// Eliminar artículo
export async function deleteArticleService(id: number) {
  const sql = `DELETE FROM articles WHERE id = ?`;
  await db.query(sql, [id]);
}
