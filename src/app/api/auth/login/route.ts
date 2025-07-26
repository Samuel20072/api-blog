import { NextResponse } from 'next/server';
import { loginUser } from '@/controllers/auth/loginController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await loginUser(body);

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json({ success: false, error: 'Error en el servidor' }, { status: 500 });
  }
}
