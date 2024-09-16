'use client';

import { useState } from 'react';
import { Message, continueConversation } from '@/actions/askAi';
import { readStreamableValue } from 'ai/rsc';
import { marked } from 'marked';
import { useToast } from '@/components/ui/use-toast';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const { toast } = useToast()

  const handleSendToAi = async () => {
    const {messages, newMessage, success} = await continueConversation([
      ...conversation,
      { role: 'user', content: input },
    ]);
    setInput('');
    if (!success) {
      toast({
        variant: "destructive",
        title: 'Some error occured',
    })
    } else {
      let textContent = '';

      for await (const delta of readStreamableValue(newMessage as any)) {
        textContent = `${textContent}${delta}`;

        setConversation([
          ...messages as Message[],
          { role: 'assistant', content: textContent },
        ]);
      }
    }
  }

  return (
    <div className='bg-blue-500 mt-20'>
      <div>
        {conversation.map((message, index) => (
          <div key={index}>
            <strong>{message.role}:</strong>
            <div
              dangerouslySetInnerHTML={{ __html: marked(message.content) }}
            />
          </div>
        ))}
      </div>

      <div>
        <input
          title='textbox'
          type="text"
          value={input}
          onChange={event => {
            setInput(event.target.value);
          }}
        />
        <button
          onClick={handleSendToAi}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
