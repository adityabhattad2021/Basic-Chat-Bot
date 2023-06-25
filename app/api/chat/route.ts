import { OpenAIStream, StreamingTextResponse } from "ai";
import { createOpenAIClient } from "@/utils/openai";



export const runtime = "edge";

export async function POST(req: any) {
  const { messages,apiKey } = await req.json();
  const openai = createOpenAIClient(apiKey)
  
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens:4000,
    stream: true,
    messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
