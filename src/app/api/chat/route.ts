import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Your resume and experience data
const context = `
Ojas Sharma is a software developer with expertise in:
- Full-stack development with React, Node.js, and TypeScript
- Modern web technologies and frameworks
- Building responsive and user-friendly applications
- Problem-solving and technical implementation

Key skills:
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express, MongoDB
- Tools: Git, Docker, AWS
- Soft Skills: Team collaboration, problem-solving, communication

Projects:
1. Portfolio Website (Current)
   - Built with Next.js and TypeScript
   - Features responsive design and modern UI
   - Includes AI chatbot integration

2. [Add your other projects here]

Experience:
[Add your work experience here]

Education:
[Add your education details here]
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for Ojas Sharma's portfolio website. 
          Your role is to help recruiters and visitors learn more about Ojas's experience, skills, and projects.
          Use the following context to answer questions accurately:
          ${context}
          
          Guidelines:
          1. Be professional and friendly
          2. Focus on Ojas's technical skills and experience
          3. If you don't know something, say so politely
          4. Keep responses concise but informative
          5. Highlight relevant experience when asked about specific roles or skills`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({ 
      response: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
} 