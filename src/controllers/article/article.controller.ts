import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { createArticleSchema, updateArticleSchema } from '@/validations/articles/article.validation';
import {  updateArticleService, deleteArticleService, createArticleService } from '@/services/articles/article.service';

export async function createArticleController(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Token no proporcionado' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return NextResponse.json({ success: false, error: 'Token inválido o expirado' }, { status: 401 });
    }

    const authorId = decoded.id;
    const body = await req.json();

    const { error, value } = createArticleSchema.validate(body, { abortEarly: false });
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    await createArticleService({ ...value, authorId });

    return NextResponse.json({ success: true, message: 'Artículo creado exitosamente' });
  } catch (error) {
    console.error('Error al crear artículo:', error);
    return NextResponse.json({ success: false, error: 'Error del servidor' }, { status: 500 });
  }
}
export async function updateArticleController(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Token no proporcionado' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ success: false, error: 'Token inválido' }, { status: 401 });
    }

    const id = parseInt(params.id);
    const body = await req.json();
    const { error, value } = updateArticleSchema.validate(body, { abortEarly: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    await updateArticleService(id, { ...value });

    return NextResponse.json({ success: true, message: 'Artículo actualizado exitosamente' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error del servidor' }, { status: 500 });
  }
}

export async function deleteArticleController(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Token no proporcionado' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ success: false, error: 'Token inválido' }, { status: 401 });
    }

    const id = parseInt(params.id);
    await deleteArticleService(id);

    return NextResponse.json({ success: true, message: 'Artículo eliminado exitosamente' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error del servidor' }, { status: 500 });
  }
}