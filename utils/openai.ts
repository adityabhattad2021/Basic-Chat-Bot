import { Configuration, OpenAIApi } from "openai-edge";

export const createOpenAIClient = (apiKey: string): OpenAIApi => {
  let openai;

  try {
    const configuration = new Configuration({ apiKey });
    openai = new OpenAIApi(configuration);
  } catch (error) {
    console.log(error);
  }

  return openai as OpenAIApi;
};
