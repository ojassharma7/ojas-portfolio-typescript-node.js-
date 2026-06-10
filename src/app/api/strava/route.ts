import { NextResponse } from 'next/server';
import { getStravaData } from '@/lib/strava';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(await getStravaData());
  } catch (err) {
    console.error('strava route error:', err);
    return NextResponse.json(
      { configured: false, error: 'strava fetch failed' },
      { status: 200 }
    );
  }
}
