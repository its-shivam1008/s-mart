'use client';

import { useState } from 'react';
import { Message, continueConversation } from '@/actions/askAi';
import { readStreamableValue } from 'ai/rsc';
import { marked } from 'marked';
import { useToast } from '@/components/ui/use-toast';
import { Novatrix } from 'uvcanvas';

export const maxDuration = 30;

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const { toast } = useToast()

  const handleSendToAi = async () => {
    const { messages, newMessage, success } = await continueConversation([ 
      ...conversation,
      { role: 'user', content: input },
    ]);
    setInput('');
    if (!success) {
      toast({
        variant: "destructive",
        title: 'Some error occurred',
      })
    } else {
      let textContent = '';

      for await (const delta of readStreamableValue(newMessage as any)) {
        textContent = `${textContent}${delta}`;

        setConversation(prev => [
          ...messages as Message[],
          { role: 'assistant', content: textContent },
        ]);
      }
    }
  }

  return (
    <div className='h-screen'>
      <div className='bg-green-500 w-full h-full relative'>
        {/* <Novatrix /> */}

        <div className='absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-fixed z-10'>
          <div className='flex flex-col h-full w-[90%] mx-auto'>
            <div className='flex-1 rounded-[12px] overflow-y-auto bg-[#f2f2f2] w-[90%] mx-auto my-20 p-4'>
              <div className='space-y-2'>
                {conversation.length === 0 ? "Hii what can I help you ?" : conversation.map((message, index) => (
                  <div key={index}>
                    <strong>{message.role}:</strong>
                    <div
                      dangerouslySetInnerHTML={{ __html: marked(message.content) }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='flex p-4 bg-yellow-400'>
              <input
                title='textbox'
                type="text"
                value={input}
                placeholder="What's in your mind"
                onChange={event => {
                  setInput(event.target.value);
                }}
                className='mr-2 p-2 w-full rounded-2xl'
              />
              <button
                onClick={handleSendToAi}
                className='p-2 bg-blue-500 text-white'
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
