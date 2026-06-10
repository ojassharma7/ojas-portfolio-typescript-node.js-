import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const VIEW_KEY = 'portfolio:views';

// Upstash Redis REST credentials — injected by the Vercel Marketplace integration.
// Supports both the Vercel KV (KV_REST_API_*) and direct Upstash (UPSTASH_REDIS_REST_*) names.
const REDIS_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const useRedis = Boolean(REDIS_URL && REDIS_TOKEN);

async function redis(command: string[]): Promise<number> {
  const res = await fetch(`${REDIS_URL}/${command.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`redis ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return Number(data.result ?? 0);
}

// --- local-dev fallback: a JSON file (resets on serverless, fine for localhost) ---
const DATA_FILE = path.join(process.cwd(), '.data', 'views.json');

async function fileRead(): Promise<number> {
  try {
    const parsed = JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
    return typeof parsed.views === 'number' ? parsed.views : 0;
  } catch {
    return 0;
  }
}

async function fileIncrement(): Promise<number> {
  const views = (await fileRead()) + 1;
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({ views }));
  } catch (err) {
    console.error('view counter write failed:', err);
  }
  return views;
}

export async function GET() {
  try {
    const views = useRedis ? await redis(['get', VIEW_KEY]) : await fileRead();
    return NextResponse.json({ views });
  } catch (err) {
    console.error('view counter read failed:', err);
    return NextResponse.json({ views: 0 });
  }
}

export async function POST() {
  try {
    const views = useRedis ? await redis(['incr', VIEW_KEY]) : await fileIncrement();
    return NextResponse.json({ views });
  } catch (err) {
    console.error('view counter increment failed:', err);
    return NextResponse.json({ views: 0 });
  }
}
