import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const {messages} =await req.json()
    const { text } = await generateText({
      model: google('gemini-1.5-flash-latest'),
      prompt: messages,
    });

    return NextResponse.json({ message: "Found the response", result: text, success: true }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "Internal server error", error: err, success: false }, { status: 500 })
  }
}
