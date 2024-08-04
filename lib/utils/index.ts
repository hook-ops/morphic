// lib/utils/index.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getGroqResponse } from '../agents/tools/groqclient'
import { CoreMessage } from 'ai'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getModel(useSubModel = false) {
  const groqBaseUrl = process.env.GROQ_BASE_URL
  const groqModel = process.env.GROQ_MODEL
  const groqSubModel = process.env.GROQ_SUB_MODEL

  if (!(groqBaseUrl && groqModel)) {
    throw new Error('Missing environment variables for Groq')
  }

  try {
    // Example prompt for Groq model (adjust as needed)
    const prompt = useSubModel && groqSubModel ? groqSubModel : groqModel;
    const response = await getGroqResponse(prompt);
    return response;
  } catch (error) {
    console.error('Error in getModel function:', error);
    throw error;
  }
}

export function transformToolMessages(messages: CoreMessage[]): CoreMessage[] {
  return messages.map(message =>
    message.role === 'tool'
      ? {
          ...message,
          role: 'assistant',
          content: JSON.stringify(message.content),
          type: 'tool'
        }
      : message
  ) as CoreMessage[]
}

export function sanitizeUrl(url: string): string {
  return url.replace(/\s+/g, '%20')
}
