// app/api/articles/[id]/route.ts
import { NextRequest } from 'next/server';
import { updateArticleController, deleteArticleController } from '@/controllers/article/article.controller';

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  return updateArticleController(req, context);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  return deleteArticleController(req, context);
}
