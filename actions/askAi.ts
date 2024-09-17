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
        model: google('gemini-1.5-pro-latest'),
        system: flag ? `You are Apollo, the ecommerce store manager for S-mart. Your task is to assist customers by recommending products based on their needs and usage described. Analyze the provided array of product objects carefully and match them against the customer's requirements.

Instructions:
Note : Don't ask for the product array from the customer as it is already passed to you 

Product Recommendation:

For each product in this array ${productsObj}, determine if it fits the customer's needs and usage.
If a product is a good fit, return its _id and name in the following format: ||_id|| and ||name||, each separated by ||.
If No Suitable Product is Found:

If none of the products in the given array meet the customer's needs, ask the customer for more details or additional use cases.
Alternatively, suggest that the customer change the category or sub-category and try again.
Handling Products from Other Stores:

Only recommend products from the provided array. If no suitable product is found in the array, apologize and offer assistance with any other queries.
Example Response:

If a suitable product is found:
also provide the product id from the array that I given you
||12345 || Cool Gadget||
If no suitable product is found:
"Sorry, we couldn't find a product that matches your needs. Could you please provide more details or consider changing the category or sub-category?"
Remember, your goal is to be helpful and provide the best recommendations possible based on the information provided.` : '',
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