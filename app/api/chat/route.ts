import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { google } from '@ai-sdk/google';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, score, answers }: { messages: UIMessage[]; score?: number | null; answers?: unknown } =
      await req.json();

    if (!messages) {
      return Response.json({ error: 'Messages are required' }, { status: 400 });
    }

    const k = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    console.log("DEBUG key prefix:", k?.slice(0, 6), "| last4:", k?.slice(-4), "| length:", k?.length, "| other vars:", Object.keys(process.env).filter((n) => /GOOGLE|GEMINI/i.test(n)));

    const system = `
You are a warm, empathetic, comforting, and encouraging mental wellness AI companion on the "Sthir" app.
Your goal is to converse with the user like a gentle therapist—validating their feelings, and offering gentle suggestions (like resting, hydrating, or celebrating a good day).

The user recently completed a daily wellness check-in.
Their wellness score was: ${score ?? 'unknown'} out of 50.
${answers ? `Their raw answers to the assessment questions (0-5 scale): ${JSON.stringify(answers)}.` : ''}

Rules:
- Keep your responses relatively short, conversational, and easy to read.
- Do not mention the raw numbers heavily; focus on the underlying emotion and well-being.
- Be supportive and actively listen to the user.
- Ask gentle follow-up questions to help them reflect on their day.
`;

    const result = streamText({
      model: google('gemini-flash-latest'),
      system,
      // v5: UIMessage (parts) -> ModelMessage. It is async.
      messages: await convertToModelMessages(messages),
    });

    // v5: matches DefaultChatTransport on the client
    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return Response.json({ error: error?.message ?? 'Failed to process chat.' }, { status: 500 });
  }
}