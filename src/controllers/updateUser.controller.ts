import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/verifyToken';
import { validateUpdateUserData } from '@/validations/updateUser.validation';
import { updateUserService } from '@/services/updateUser.service';

export async function updateUserController(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const decoded = verifyToken(authHeader);
    const userId = decoded.id;

    const body = await request.json();
    const { fieldsToUpdate, values, password } = validateUpdateUserData(body);

    await updateUserService(userId, fieldsToUpdate, values, password);

    return NextResponse.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
    });
  } catch (error: any) {
    console.error('Error al actualizar usuario:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error del servidor' },
      { status: error.message === 'Token inválido o expirado' || error.message === 'Token no proporcionado' ? 401 : 400 }
    );
  }
}
