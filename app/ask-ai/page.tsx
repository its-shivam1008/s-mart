'use client';

import { useState } from 'react';
import { Message, continueConversation } from '@/actions/askAi';
import { readStreamableValue } from 'ai/rsc';
import { marked } from 'marked';
import { useToast } from '@/components/ui/use-toast';
import { Novatrix } from 'uvcanvas';
import { Send, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fetchCategories, fetchCategory } from '@/actions/categories';

export const maxDuration = 30;

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const { toast } = useToast()

  const [parentCategory, setParentCategory] = useState<any>([])
  const [filterCategory, setFilterCategory] = useState<any>([])
  const [showSelectOption, setShowSelectOption] = useState(false)
  const [showSelectOption2, setShowSelectOption2] = useState(false)

  const handleOnChangeCategory = async (value:string) =>{
    const category = await fetchCategory(value)
      if (category?.success) {
        const categoryObjs = JSON.parse(category?.categoriesObj as string)
        setFilterCategory(categoryObjs)
        setShowSelectOption2(true)
      }
  }

  const handleClickBtn = async () => {
    setShowSelectOption(true)
    const response = await fetchCategories();
    if(response?.success){
      const categoryObjs = JSON.parse(response?.categoriesArray as string)
      setParentCategory(categoryObjs)
    }
  }

  const handleOnChangeOfSubCategory = () => {

  }

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
      <div className=' w-full h-full relative'>
        <Novatrix />

        <div className='absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-fixed z-10'>
          <div className='flex flex-col h-full w-[90%] mx-auto'>
            <div className='flex-1 rounded-[12px] overflow-y-auto bg-[#f2f2f2] shadow-2xl border-2 border-solid border-[rebeccapurple] w-[90%] mx-auto my-20 p-4'>
              <div className='space-y-2'>
                {conversation.length === 0 ? <div className='bg-gradient-to-r from-violet-400 to-pink-600 bg-clip-text text-transparent w-fit font-bold text-lg'>Hii, ask something</div> : conversation.map((message, index) => (
                  <div key={index}>
                    <strong>{message.role}:</strong>
                    <div
                      dangerouslySetInnerHTML={{ __html: marked(message.content) }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-wrap justify-around items-center'>
              <div className={`bg-[#f2f2f2] py-2 px-1 ${showSelectOption ? 'hidden':''}`}>
                <button onClick={handleClickBtn} type='button' className='bg-gradient-to-r from-violet-400 to-pink-600 bg-clip-text text-transparent w-fit font-bold text-lg'>Find a product</button>
              </div>
              <div className={`bg-[#f2f2f2] py-2 px-1 ${showSelectOption ? '':'hidden'}`}>
                <button onClick={() => setShowSelectOption(false)} title='close' type='button' className='bg-gradient-to-r from-violet-400 to-pink-600 bg-clip-text text-transparent w-fit font-bold text-lg'><X /></button>
              </div>
              { showSelectOption &&
                <Select onValueChange={handleOnChangeCategory}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {
                      parentCategory.map((element: any, index: number) => {
                        return (
                          <SelectItem key={index} value={element.name}>{element.name}</SelectItem>
                        )
                      })
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
              }
              { showSelectOption2 && 
                <Select onValueChange={handleOnChangeOfSubCategory}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select a Sub Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{filterCategory?.name}</SelectLabel>
                    {
                      filterCategory?.subCategory?.map((element: any, index: number) => {
                        return (
                          <SelectItem key={index} value={element.name}>{element.name}</SelectItem>
                        )
                      })
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
              }
            </div>
            <div className='flex p-4  items-center'>
              <input
                title='typing.....'
                type="text"
                value={input}
                placeholder={showSelectOption ? "Tell me what you are searching for" : "What's in your mind..."}
                onChange={event => {
                  setInput(event.target.value);
                }}
                className='mr-2 p-2 w-full rounded-2xl border-2 border-solid border-[rebeccapurple]'
              />
              <button type='button' title='send to Ai'
                onClick={handleSendToAi}
                className='cursor-pointer bg-gradient-to-r from-violet-400 to-pink-400 size-10 rounded-full flex justify-center items-center'
              >
                <Send className='text-transparent size-8' fill="#f2f2f2"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
