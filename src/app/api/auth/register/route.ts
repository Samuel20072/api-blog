import { handleRegister } from '@/controllers/auth/registerController';

export async function POST(request: Request) {
  return handleRegister(request);
}
