import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createGroq } from '@ai-sdk/groq' // Hypothetical import for Groq SDK
import { CoreMessage } from 'ai'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getModel() {
  const groqBaseUrl = process.env.GROQ_BASE_URL
  const groqApiKey = process.env.GROQ_API_KEY
  const groqModel = process.env.GROQ_MODEL

  if (!(groqBaseUrl && groqApiKey && groqModel)) {
    throw new Error(
      'Missing environment variables for Groq'
    )
  }

  const groq = createGroq({ baseURL: groqBaseUrl, apiKey: groqApiKey })
  return groq(groqModel)
}

/**
 * Takes an array of AIMessage and modifies each message where the role is 'tool'.
 * Changes the role to 'assistant' and converts the content to a JSON string.
 * Returns the modified messages as an array of CoreMessage.
 *
 * @param aiMessages - Array of AIMessage
 * @returns modifiedMessages - Array of modified messages
 */
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

/**
 * Sanitizes a URL by replacing spaces with '%20'
 * @param url - The URL to sanitize
 * @returns The sanitized URL
 */
export function sanitizeUrl(url: string): string {
  return url.replace(/\s+/g, '%20')
}
