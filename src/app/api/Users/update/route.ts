// src/app/api/users/update/route.ts
import { updateUserController } from '@/controllers/updateUser.controller';
import { NextRequest } from 'next/server';

export async function PUT(request: NextRequest) {
  return updateUserController(request);
}
