import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt, identity } from '@/lib/profile';

const MAX_HISTORY = 20;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_RESPONSE_TOKENS = 500;

// Free-tier model served via Hugging Face Inference Providers
const HF_MODEL = 'meta-llama/Llama-3.1-8B-Instruct';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function parseMessages(body: unknown): ChatMessage[] | null {
  const messages = (body as { messages?: unknown })?.messages;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    !messages.every(
      (m) =>
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.length <= MAX_MESSAGE_LENGTH
    )
  ) {
    return null;
  }
  return messages.slice(-MAX_HISTORY);
}

async function askClaude(messages: ChatMessage[]): Promise<string | undefined> {
  const anthropic = new Anthropic();
  const response = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL ?? 'claude-opus-4-8',
    max_tokens: MAX_RESPONSE_TOKENS,
    system: buildSystemPrompt(),
    messages,
  });
  const block = response.content.find((b) => b.type === 'text');
  return block && block.type === 'text' ? block.text.trim() : undefined;
}

async function askHuggingFace(messages: ChatMessage[]): Promise<string | undefined> {
  const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: HF_MODEL,
      max_tokens: MAX_RESPONSE_TOKENS,
      messages: [{ role: 'system', content: buildSystemPrompt() }, ...messages],
    }),
  });
  if (!response.ok) {
    throw new Error(`HF API ${response.status}: ${await response.text()}`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim();
}

export async function POST(req: Request) {
  let messages: ChatMessage[] | null;
  try {
    messages = parseMessages(await req.json());
  } catch {
    messages = null;
  }
  if (!messages) {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY && !process.env.HF_TOKEN) {
    return NextResponse.json(
      { error: `chat is offline right now — email ${identity.email} instead.` },
      { status: 503 }
    );
  }

  try {
    const reply = process.env.ANTHROPIC_API_KEY
      ? await askClaude(messages)
      : await askHuggingFace(messages);
    if (!reply) {
      return NextResponse.json({ error: 'empty response — try again.' }, { status: 502 });
    }
    return NextResponse.json({ response: reply });
  } catch (err) {
    console.error('chat route error:', err);
    return NextResponse.json(
      { error: `something broke on my end — email ${identity.email} instead.` },
      { status: 500 }
    );
  }
}
