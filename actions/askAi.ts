'use server';

import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { createStreamableValue } from 'ai/rsc';
import { fetchAllCategoryProduct, filterProducts } from './categories';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ConversationResult {
  messages?: Message[];
  newMessage?: any;
  success: boolean;
  error?: string;
  message?: string
}

export async function continueConversation(history: Message[], flag: boolean, parentCat?: string, subCat?: string): Promise<ConversationResult> {
  'use server';
  try {
    var productsObj: any = []
    if (parentCat && !subCat) {
      const products = await fetchAllCategoryProduct(parentCat)
      if (products?.success) {
        productsObj = JSON.parse(products.categoryProducts as string)
      }
    }
    if (subCat) {
      const products = await filterProducts('name', 'asc', subCat)
      if (products?.success) {
        productsObj = JSON.parse(products.categoryProducts as string)
      }
    }
    console.log(productsObj)

    const stream = createStreamableValue();

    (async () => {
      const { textStream } = await streamText({
        model: google('gemini-1.5-flash-latest'),
        system: flag ? `You are Apollo, the owner of S-mart. I will provide you with an array of products, each containing the following fields: _id, name, description, specification, quantity, price, discount, and priceAfterDiscount (in INR). Analyze these products based on the user's specific needs or use case. If the user requests a product that is not in your array, kindly apologize and clarify that you won't suggest alternatives outside of the provided array.

If you find the best fit for the user, provide the _id and name of the product. Additionally, if there are similar products that may also interest the user, recommend them in the following format: || _id productName || _id productName2 ||.

Products Array: ${JSON.stringify(productsObj)}` : '',
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