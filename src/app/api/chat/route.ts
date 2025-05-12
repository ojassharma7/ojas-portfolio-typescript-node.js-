import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  const HF_API_KEY = process.env.HF_API_KEY;

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/google/flan-t5-large',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: message,
          parameters: { max_new_tokens: 128, return_full_text: false },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.log('Hugging Face API Error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await response.json();
    console.log('Hugging Face API Response:', data);
    const answer = data[0]?.generated_text || "Sorry, I couldn't generate a response.";
    return NextResponse.json({ response: answer });
  } catch (err) {
    console.log('API Route Exception:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 