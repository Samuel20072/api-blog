import { NextApiRequest, NextApiResponse } from 'next';
import { createCommentSchema } from '@/validations/comments/commentValidator';
import { CommentService } from '@/services/comments/CommentService';

// Crear comentario
export async function createComment(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Método no permitido' });

  const { error, value } = createCommentSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, error: error.message });

  try {
    const comment = await CommentService.create(value);
    return res.status(201).json({ success: true, data: comment });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Error al crear comentario' });
  }
}

// Obtener comentarios por artículo
export async function getCommentsByArticle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ success: false, error: 'Método no permitido' });

  const { articleId } = req.query;

  if (!articleId || isNaN(Number(articleId)))
    return res.status(400).json({ success: false, error: 'ID de artículo inválido' });

  try {
    const comments = await CommentService.getByArticleId(Number(articleId));
    return res.status(200).json({ success: true, data: comments });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Error al obtener comentarios' });
  }
}

// Eliminar comentario
export async function deleteComment(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).json({ success: false, error: 'Método no permitido' });

  const { id } = req.query;

  if (!id || isNaN(Number(id)))
    return res.status(400).json({ success: false, error: 'ID inválido' });

  try {
    const deleted = await CommentService.delete(Number(id));
    if (!deleted) return res.status(404).json({ success: false, error: 'Comentario no encontrado' });

    return res.status(200).json({ success: true, message: 'Comentario eliminado' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Error al eliminar comentario' });
  }
}
