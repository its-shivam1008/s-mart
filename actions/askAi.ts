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
  error?:string;
  message?:string
}

export async function continueConversation(history: Message[], flag:boolean, parentCat?:string, subCat?:string):Promise<ConversationResult> {
  'use server';
  try {
    var productsObj:any = []
    if(parentCat && !subCat){
      const products = await fetchAllCategoryProduct(parentCat)
      if(products?.success){
        productsObj = JSON.parse(products.categoryProducts as string)
      }
    }
    if(subCat){
      const products = await filterProducts('name','asc',subCat)
      if(products?.success){
        productsObj = JSON.parse(products.categoryProducts as string)
      }
    }

    const stream = createStreamableValue();

    (async () => {
      const { textStream } = await streamText({
        model: google('gemini-1.5-flash-latest'),
        system:flag ? `You are an ecommerce store manager named Apollo you manage a ecommerce store S-mart, you have a special role and that is you will recommend products to the customers on the basis of the customer needs and its usage described by the customer you will analyse the array of objects which are the array of products you have to analyse each object carefully and match that the product fits according to the customer needs and its usage if yes then give there _id each seprated by the || also include '||' in the begnning of the _id and ending of the _id if none of the products from the given list is the right fit or the nearest fit for the customer then ask him for more details or use cases of the product or ask him to change the category and sub category  and try again, you are an expert and love to help your customers , here is the array ${productsObj} ` : '',
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
      success:true
    };
  } catch (err) {
    return { message: 'Some error occured', error: JSON.stringify(err), success: false }
  }
}