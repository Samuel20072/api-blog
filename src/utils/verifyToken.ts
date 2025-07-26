import jwt from 'jsonwebtoken';

export function verifyToken(authHeader?: string | null): { id: number } {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token no proporcionado');
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

  return decoded;
}
