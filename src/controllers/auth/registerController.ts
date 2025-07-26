import { registerSchema } from '@/validations/auth/registerSchema';
import { hashPassword } from '@/utils/hashPassword';
import { registerUser } from '@/services/auth/registerUser';
import { NextResponse } from 'next/server';

export async function handleRegister(request: Request) {
  try {
    const body = await request.json();

    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Datos inválidos';
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const { name, email, password } = parsed.data;
    const hashedPassword = await hashPassword(password);

    await registerUser(name, email, hashedPassword);

    return NextResponse.json({ success: true, message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    return NextResponse.json({ success: false, error: 'Error en el servidor' }, { status: 500 });
  }
}
