import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Simple file-backed counter. Fine for a personal site on a single server;
// swap for a KV store (Vercel KV, Upstash) if deployed serverless.
const DATA_FILE = path.join(process.cwd(), '.data', 'views.json');

async function readViews(): Promise<number> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return typeof parsed.views === 'number' ? parsed.views : 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  return NextResponse.json({ views: await readViews() });
}

export async function POST() {
  const views = (await readViews()) + 1;
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({ views }));
  } catch (err) {
    console.error('view counter write failed:', err);
  }
  return NextResponse.json({ views });
}
