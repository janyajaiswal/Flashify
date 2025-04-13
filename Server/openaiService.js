import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateFlashcards = async (text) => {
  const prompt = `Turn the following notes into 5 flashcards (Q&A format):\n\n${text}`;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
};
