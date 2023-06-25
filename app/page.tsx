"use client";
import { useRef, useState } from "react";
import { useChat } from 'ai/react'

export default function Home() {

  const dummy = useRef<any>();
  const [apiKey, setApiKey] = useState("")
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    onFinish: () => {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    },
    body: {
      apiKey: apiKey
    }
  })

  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // @ts-ignore
      handleSubmit(event);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-5">
      <h1 className="text-5xl font-sans">
        Chatter Bot
      </h1>
      <div className="flex h-[35rem] w-[40rem] flex-col items-center bg-gray-600 rounded-xl">
        <div className="h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className={`w-max max-w-[35rem] rounded-md px-4 py-3 h-min ${message.role === "assistant" ? "self-start bg-gray-200 text-gray-800" : "self-end bg-gray-800 text-gray-50"}`}
              >
                {message.content}
              </div>
            )
          })}

          {isLoading && (
            <div className="
              self-start
              bg-gray-200
              text-gray-800
              w-max
              max-w-[18rem]
              rounded-md
              px-4
              py-3
              h-min
            ">
              *thinking*
            </div>
          )}
          <span ref={dummy}></span>
        </div>
        <div className="relative w-[80%] botton-4 flex flex-col pb-5 gap-2 justify-center">
          <textarea
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-[100%] h-10 px-3 py-2 resize-none overflow-y-aupto text-black bg-gray-300 rounded"
            placeholder="Enter your openAI api key"
          />
          <div className="relative w-[100%] botton-4 flex pb-5 gap-2 justify-center">
            <textarea
              value={input}
              onChange={handleInputChange}
              className="w-[85%] h-10 px-3 py-2 resize-none overflow-y-aupto text-black bg-gray-300 rounded"
              onKeyDown={Submit}
            />
            <button
              //@ts-ignore
              onClick={handleSubmit}
              className="w-[15%] bg-blue-500 px-4 py-2 rounded-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}


