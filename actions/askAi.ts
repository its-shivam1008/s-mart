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
  try {
    

    const stream = createStreamableValue();

    try {
      const {textStream} = await streamText({
        model: google('gemini-1.5-flash-latest'),
        messages: history,
        temperature : 1
      });
  
      for await (const text of textStream) {
        stream.update(text);
      }
      // stream.update(textStream.toDataStreamResponse());
  
      stream.done(); 
    } catch (error) {
      console.error('Error streaming text:', error);
      stream.done(); 
    }
    // (async () => {
    // })();
    

    console.log({
      messages: history,
      newMessage: stream.value,
      success: true
    })

    return {
      messages: history,
      newMessage: stream.value,
      success: true
    };
  } catch (err) {
    return { message: 'An error occured', error: JSON.stringify(err), success: false }
  }
}
