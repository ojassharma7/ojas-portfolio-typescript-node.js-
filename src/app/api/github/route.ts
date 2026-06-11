import { NextResponse } from 'next/server';
import { getGitHubData } from '@/lib/github';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(await getGitHubData());
  } catch (err) {
    console.error('github route error:', err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
