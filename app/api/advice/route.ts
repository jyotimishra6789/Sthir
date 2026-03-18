import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// Initialize the Gemini SDK
// It automatically picks up GEMINI_API_KEY from the environment
const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { score, answers } = await req.json();

    if (score === undefined || score === null) {
      return NextResponse.json(
        { error: 'Score is required' },
        { status: 400 }
      );
    }

    const prompt = `
    You are an empathetic, calm, and encouraging mental wellness AI. 
    A user has completed their daily wellness check-in on the "Sthir" app.
    
    Their total wellness score today is ${score} out of 50.
    ${answers ? `Here are their raw answers to the 10 assessment questions (0-5 scale): ${JSON.stringify(answers)}.` : ''}
    
    Based on their score, provide a short, personalized, and comforting piece of advice or reflection string for them. 
    Keep it mostly under 3-4 sentences. The tone should be similar to a gentle therapist—validating their feelings, and offering a gentle suggestion (like resting, hydrating, or celebrating a good day). 
    Do not mention the raw numbers heavily, focus on the emotion.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ advice: response.text });
  } catch (error: any) {
    console.error('Error generating AI advice:', error);
    return NextResponse.json(
      { error: 'Failed to generate advice. Please try again later.' },
      { status: 500 }
    );
  }
}
