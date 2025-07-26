import { NextRequest, NextResponse } from 'next/server';
import { createArticleController } from '@/controllers/article/article.controller';

export async function POST(req: NextRequest) {
  return createArticleController(req);
}
