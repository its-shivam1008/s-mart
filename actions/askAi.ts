'use server';

import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { createStreamableValue } from 'ai/rsc';
import { fetchAllCategoryProduct, filterProducts } from './categories';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}


export async function continueConversation(history: Message[]) {
  'use server';
  try {
    

    const stream = createStreamableValue();

    (async () => {
      const { textStream } = await streamText({
        model: google('gemini-1.5-flash-latest'),
        // system: ,
        messages: history,
      });

      for await (const text of textStream) {
        stream.update(text);
      }

      stream.done();
    })();

    return {
      messages: history,
      newMessage: stream.value,
      success: true
    };
  } catch (err) {
    return { message: 'Some error occured', error: JSON.stringify(err), success: false }
  }
}