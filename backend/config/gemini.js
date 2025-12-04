import { GoogleGenAI } from '@google/genai';

const createGeminiClient = () => {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
};

export const geminiModel = 'gemini-2.5-flash';
export default createGeminiClient;
