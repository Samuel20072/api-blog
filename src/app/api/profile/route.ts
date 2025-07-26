import { getProfileHandler } from '@/controllers/profileController';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return getProfileHandler(request);
}
