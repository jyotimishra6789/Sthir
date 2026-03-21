import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';

export const maxDuration = 30; // Allow 30 seconds for the response

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, score, answers } = body;

    if (!messages) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const systemPrompt = `
You are a warm, empathetic, comforting, and encouraging mental wellness AI companion on the "Sthir" app.
Your goal is to converse with the user like a gentle therapist—validating their feelings, and offering gentle suggestions (like resting, hydrating, or celebrating a good day).

The user recently completed a daily wellness check-in.
Their wellness score was: ${score !== undefined ? score : 'unknown'} out of 50.
${answers ? `Their raw answers to the assessment questions (0-5 scale): ${JSON.stringify(answers)}.` : ''}

Rules:
- Keep your responses relatively short, conversational, and easy to read.
- Do not mention the raw numbers heavily; focus on the underlying emotion and well-being.
- Be supportive and actively listen to the user.
- Ask gentle follow-up questions to help them reflect on their day.
`;

    // streamText handles the interaction with the model and streaming the response
    const result = streamText({
      model: google('gemini-1.5-flash'), // Updated to 1.5-flash for better compatibility
      messages,
      system: systemPrompt,
    });

    return (result as any).toDataStreamResponse();
  } catch (error: any) {
    console.error('Error in chat API:', error);
    
    // Check if it's likely an API Key issue
    let errorMsg = 'Failed to process chat. Please try again later.';
    if (error.message?.includes('API key') || error.message?.includes('key')) {
      errorMsg = 'AI API key is missing or invalid. Please check your .env.local file.';
    }

    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
