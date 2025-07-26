import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginSchema } from '@/validations/auth/loginSchema';

export async function loginUser(body: any) {
  // Validar entrada
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      error: parsed.error.format()
    };
  }

  const { email, password } = parsed.data;

  const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];

  if (!user) {
    return {
      success: false,
      status: 404,
      error: 'Usuario no encontrado'
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {
      success: false,
      status: 401,
      error: 'Contraseña incorrecta'
    };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return {
    success: true,
    status: 200,
    message: 'Login exitoso',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}
