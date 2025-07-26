import { verifyToken } from '@/utils/verifyToken';
import { getUserById } from '@/services/profileService';
import { NextRequest, NextResponse } from 'next/server';

export async function getProfileHandler(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const decoded = verifyToken(authHeader); // ahora no da error

    const user = await getUserById(decoded.id);

    if (!user) {
      return NextResponse.json({ success: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.error('Error al obtener el perfil:', error.message);
    return NextResponse.json({ success: false, error: error.message || 'Token inválido o expirado' }, { status: 401 });
  }
}
