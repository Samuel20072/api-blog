import { db } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Obtener token desde headers
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Token no proporcionado' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // Verificar token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Obtener usuario desde base de datos
    const [rows]: any = await db.query('SELECT id, name, email FROM users WHERE id = ?', [decoded.id]);
    const user = rows[0];

    if (!user) {
      return NextResponse.json({ success: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.error('Error al obtener el perfil:', error);
    return NextResponse.json({ success: false, error: 'Token inválido o expirado' }, { status: 401 });
  }
}
