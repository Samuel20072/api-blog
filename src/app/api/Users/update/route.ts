// src/app/api/users/update/route.ts
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Token no proporcionado' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // Verificar token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json({ success: false, error: 'Token inválido o expirado' }, { status: 401 });
    }

    const userId = decoded.id;
    const body = await request.json();
    const { name, email, password } = body;

    // Preparar consulta y valores dinámicos
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];

    if (name) {
      fieldsToUpdate.push('name = ?');
      values.push(name);
    }

    if (email) {
      fieldsToUpdate.push('email = ?');
      values.push(email);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fieldsToUpdate.push('password = ?');
      values.push(hashedPassword);
    }

    if (fieldsToUpdate.length === 0) {
      return NextResponse.json({ success: false, error: 'No se proporcionaron datos para actualizar' }, { status: 400 });
    }

    // Agregar ID al final de los valores
    values.push(userId);

    const sql = `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;
    await db.query(sql, values);

    return NextResponse.json({ success: true, message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return NextResponse.json({ success: false, error: 'Error del servidor' }, { status: 500 });
  }
}
