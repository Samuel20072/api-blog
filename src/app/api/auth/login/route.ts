import { NextResponse } from 'next/server';
import { loginUser } from '@/controllers/auth/loginController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await loginUser(body);

    return new NextResponse(JSON.stringify(result), {
      status: result.status,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    return new NextResponse(
      JSON.stringify({ success: false, error: 'Error en el servidor' }),
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Credentials': 'true',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// Manejar preflight OPTIONS
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}
