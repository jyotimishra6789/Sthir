import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      system: "You are a wellness companion for the 'Sthir' app. Your goal is to generate one very short, highly highly unique, uplifting, and actionable mental well-being or self-care tip. Maximum 2 sentences. Do not use generic phrases. Be creative and unique every single time.",
      prompt: "Give me a fresh, completely unique daily wellness tip.",
    });

    return NextResponse.json({ tip: text.trim() });
  } catch (error: any) {
    if (error?.message?.includes('key') || error?.message?.includes('API')) {
      console.warn('⚠️ AI Tip generation failed: Missing or invalid API Key. Using fallback tip.');
    } else {
      console.error('Error generating tip:', error.message || error);
    }
    // Provide a fallback tip if the API fails or if there's no API key
    return NextResponse.json(
      { error: 'Failed to generate daily tip.', tip: 'Take a deep breath and stay hydrated today (AI offline).' },
      { status: 500 }
    );
  }
}
