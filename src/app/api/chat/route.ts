import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  const HF_API_KEY = process.env.HF_API_KEY;

  try {
    console.log('Sending request to Hugging Face API...');
    const response = await fetch(
      'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: message
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      return NextResponse.json(
        { error: `API Error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Hugging Face API Response:', data);
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error('Unexpected API response format:', data);
      return NextResponse.json(
        { error: 'Invalid response format from API' },
        { status: 500 }
      );
    }

    // The model returns an array of results with labels and scores
    const result = data[0];
    const answer = `Sentiment: ${result.label} (confidence: ${(result.score * 100).toFixed(2)}%)`;
    return NextResponse.json({ response: answer });
  } catch (err) {
    console.error('API Route Exception:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 