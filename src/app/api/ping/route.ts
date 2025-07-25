// src/app/api/ping/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
  const [rows] = await db.query('SELECT 1 + 1 AS result') as [any[], any];
    return NextResponse.json({ success: true, result: rows[0].result });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
