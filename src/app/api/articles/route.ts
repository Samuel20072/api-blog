import { NextRequest, NextResponse } from 'next/server';
import { getAllArticlesController } from '@/controllers/article/article.controller';

export async function GET(req: NextRequest) {
  return getAllArticlesController(req);
}
